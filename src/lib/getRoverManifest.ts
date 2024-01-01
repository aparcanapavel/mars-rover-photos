'use server';
import { notFound } from 'next/navigation';

export const getRoverManifestData = async (roverName: string) => {
  
  try{
    const res: Response = await fetch(
      process.env.NASA_ROVER_DATA_ENDPOINT 
        + '/manifests/' 
        + roverName 
        + '?api_key=' 
        + process.env.NASA_API_KEY,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 86400
        },
      }
    );

    if(!res.ok) throw new Error("Failed to fetch rover manifest data");
    
    const responseBody = await res.json();

    if (responseBody && responseBody.photo_manifest !== undefined) {
      return responseBody?.photo_manifest;
    }   

    throw new Error("Rover manifest not found");
    
  } catch (e) {
    console.error("getRoverManifestData.ts: ",e);
    notFound();
  }
}