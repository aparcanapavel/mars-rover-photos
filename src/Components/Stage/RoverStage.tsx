// component is a server component and it needs to fetch data from NASA API. This data will be used to poplate the dropdown component with sols. 
import { notFound } from "next/navigation";
import React from "react";
import Dropdown from "./Dropdown";
import NumberSelector from "./NumberSelector";

const getRoverData = async (roverName: string) => {
  
  try{
    const res: Response = await fetch(
      process.env.NASA_ROVER_DATA_ENDPOINT 
        + '/rovers/' 
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

type RoverStageProps = {
  roverName: string;
  solTotal: number;
}

const RoverStage: React.FC<RoverStageProps> = async ({ 
  roverName,
  solTotal
}) => {
  // const roverData = await getRoverData(roverName);

  return (
    <div className="cardItem mt-4">
      <h2>Sol</h2>
      {/* <Dropdown solTotal={solTotal}/> */}
      <NumberSelector solTotal={solTotal}/>
    </div>
  )
}

export default RoverStage;