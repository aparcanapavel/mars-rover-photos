import { getRoverData } from './getRoverData';
import * as nextNavigation from 'next/navigation';
jest.mock('next/navigation');

describe('getRoverData.ts', () => {
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

    await getRoverData('roverName');

    expect(consoleSpy).toHaveBeenCalledWith(
      "getRoverData.ts: ", 
      new Error ("Failed to fetch rover data")
    );
    expect(notFoundMock).toHaveBeenCalled();
  });

  it('should throw an error and call notFound() if the response JSON does not contain a photos key', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
    
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const notFoundMock = jest.spyOn(nextNavigation, 'notFound');

    await getRoverData('roverName');

    expect(consoleSpy).toHaveBeenCalledWith(
      "getRoverData.ts: ", 
      new Error ("Rover not found")
    );
    expect(notFoundMock).toHaveBeenCalled();
  });

  it('should return the photo_manifest if the response JSON contains a photos key', async () => {
    const roverData = {
      name: 'curiosity',
      total_photos: 1000,
      status: 'Active',
      max_sol: 500,
      launch_date: '2011-11-26',
      landing_date: '2012-08-06',
      photos: []
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ photos: roverData }),
    });

    const result = await getRoverData('roverName');
    expect(result).toEqual(roverData);
  });
});