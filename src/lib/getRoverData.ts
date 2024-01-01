'use server';
import { notFound } from 'next/navigation';

export const getRoverData = async (
  roverName: string,
  sol?: number,
  page?: number
) => {
  try{
    const res: Response = await fetch(
      process.env.NASA_ROVER_DATA_ENDPOINT 
        + 'rovers/' 
        + roverName 
        + '/photos'
        + '?api_key=' 
        + process.env.NASA_API_KEY
        + `&sol=${sol}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 86400,
          tags: [roverName]
        },
      }
    );

    if(!res.ok) throw new Error("Failed to fetch rover data");
    
    const responseBody = await res.json();

    if (responseBody && responseBody?.photos !== null) {
      return responseBody?.photos;
    }   

    throw new Error("Rover not found");
    
  } catch (e) {
    notFound();
  }
}