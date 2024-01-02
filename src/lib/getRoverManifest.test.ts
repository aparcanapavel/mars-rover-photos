import { getRoverManifestData } from './getRoverManifest';
import * as nextNavigation from 'next/navigation';
jest.mock('next/navigation');

describe('getRoverManifestData.ts', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error and call notFound() if the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const notFoundMock = jest.spyOn(nextNavigation, 'notFound');

    await getRoverManifestData('roverName');

    expect(consoleSpy).toHaveBeenCalledWith(
      "getRoverManifestData.ts: ", 
      new Error ("Failed to fetch rover manifest data")
    );
    expect(notFoundMock).toHaveBeenCalled();
  });

  it('should throw an error and call notFound() if the response JSON does not contain a photo_manifest key', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
    
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const notFoundMock = jest.spyOn(nextNavigation, 'notFound');

    await getRoverManifestData('roverName');

    expect(consoleSpy).toHaveBeenCalledWith(
      "getRoverManifestData.ts: ", 
      new Error ("Rover manifest not found")
    );
    expect(notFoundMock).toHaveBeenCalled();
  });

  it('should return the photo_manifest if the response JSON contains a photo_manifest key', async () => {
    const roverManifestData = {
      name: 'curiosity',
      total_photos: 1000,
      status: 'Active',
      max_sol: 500,
      launch_date: '2011-11-26',
      landing_date: '2012-08-06',
      photos: []
    };

    // Mock the fetch function to return a response with JSON that contains a photo_manifest key
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ photo_manifest: roverManifestData }),
    });

    const result = await getRoverManifestData('roverName');
    expect(result).toEqual(roverManifestData);
  });
});