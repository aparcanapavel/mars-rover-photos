import React from 'react';
import { render, screen } from '@testing-library/react';
import RoverDetails from './RoverDetails';
import * as misc from '../../utils/misc';
jest.mock('../../utils/misc');

const roverManifestData = {
  name: 'curiosity',
  total_photos: 1000,
  status: 'Active',
  max_sol: 500,
  launch_date: '2011-11-26',
  landing_date: '2012-08-06',
  photos: []
};

beforeAll(() => {
  jest.resetAllMocks();
})

describe('RoverDetails', () => {
  it('renders the Image component with Rover name as alt', () => {
    render(<RoverDetails 
      roverName="curiosity" 
      roverManifestData={roverManifestData} 
    />);
    
    const imageElement = screen.getByAltText('curiosity');
    expect(imageElement).toBeInTheDocument();
  });

  it('calls nFormatter function with total_photos and max_sol', () => {
    const nFormatterSpy = jest.spyOn(misc, 'nFormatter');

    render(
      <RoverDetails
        roverName="curiosity"
        roverManifestData={{
          ...roverManifestData,
          total_photos: 1500,
          max_sol: 700
        }}
      />
    );
    expect(nFormatterSpy).toHaveBeenCalledWith(1500);
    expect(nFormatterSpy).toHaveBeenCalledWith(700);
  });

  it('calls parseDate function with launch_date and landing_date', () => {
    const parseDateSpy = jest.spyOn(misc, 'parseDate');
    render(
      <RoverDetails
        roverName="curiosity"
        roverManifestData={{
          ...roverManifestData,
          launch_date: '2011-11-16',
          landing_date: '2022-08-06'
        }}
      />
    );
    expect(parseDateSpy).toHaveBeenCalledWith('2011-11-16');
    expect(parseDateSpy).toHaveBeenCalledWith('2022-08-06');
  });

  it('renders the correct strings', () => {
    render(<RoverDetails roverName="curiosity" roverManifestData={roverManifestData} />);

    expect(screen.getByText('curiosity')).toBeInTheDocument();
    expect(screen.getByText('Total Photos')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Sol')).toBeInTheDocument();
    expect(screen.getByText('Launch Date:')).toBeInTheDocument();
    expect(screen.getByText('Landing Date:')).toBeInTheDocument();
  });
});