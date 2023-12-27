// src/app/rover/[rover-name]/page.tsx needs to query to the nasa API and get the data for the specific rover. There should also be a button to back to the home page
// next fetch needs to revalidate every day

import Link from "next/link";
import { notFound } from "next/navigation";
import {capitalizeFirstLetter} from "../../../utils/misc";

type MetaDataGeneratorProps = {
  params: { 
    'rover-name': string;
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}


const getRoverData = async (roverName: string) => {
  
  try{
    const res: Response = await fetch(
      process.env.NASA_ROVER_DATA_ENDPOINT + '/manifests/' + roverName + '?api_key=' + process.env.NASA_API_KEY,
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

    if(!res.ok) throw new Error("Failed to fetch rover data");
    
    const responseBody = await res.json();

    if (responseBody && responseBody?.photo_manifest !== null) {
      delete responseBody?.photo_manifest['photos'];
      return responseBody?.photo_manifest;
    }   

    throw new Error("Rover not found");
    
  } catch (e) {
    notFound();
  }
}

export default async function RoverPage({ params }: MetaDataGeneratorProps){
  const roverName = params['rover-name'];

  const roverData = await getRoverData(roverName);
  console.log('roverData',roverData)

  return (
    <div>
      <h1>{roverData.name} Rover Page</h1>
      {/* Add your rover-specific content here */}
      <div>
        <Link href={'/'}>Back to Home</Link>
      </div>
    </div>
  );
};