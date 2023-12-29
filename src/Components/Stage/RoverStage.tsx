import React from "react";
import { getRoverData } from "@/lib/getRoverData";

type RoverStageProps = {
  roverName: string;
  solTotal: number;
  sol: number;
  page: number;
}

const RoverStage: React.FC<RoverStageProps> = async ({ 
  roverName,
  sol,
  page
}) => {
  const roverData = await getRoverData(roverName, sol, page);

  return (
    <div className="mt-4">
      total {roverData.length}
    </div>
  )
}

export default RoverStage;