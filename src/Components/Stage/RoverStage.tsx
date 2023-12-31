"use client";
import React, { useOptimistic } from "react";
import { RoverManifestDataType } from "@/app/rover/[rover-name]/page";
import RoverImages from "./RoverImages";
import SolSelector from "./SolSelector";
import Pagination from "./Pagination";

type RoverStageProps = {
  roverName: string;
  roverManifestData: RoverManifestDataType;
  initialSol: number;
  initialPage: number;
  roverData: RoverDataType[];
  photoStart: number;
  photoEnd: number;
  totalPhotos: number;
}

export type RoverDataType = {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export type stageDetailsType = {
  isLoading: boolean;
}

const RoverStage: React.FC<RoverStageProps> = ({ 
  roverName,
  initialSol,
  initialPage,
  roverManifestData,
  roverData,
  photoStart,
  photoEnd,
  totalPhotos
}) => {

  const [stageDetails, setStageDetails] = useOptimistic(
    { isLoading: false },
    (state: stageDetailsType, optimisticState: stageDetailsType) => ({
      ...state,
      isLoading: optimisticState.isLoading
    })
  );

  return (
    <>
      <div className="flex max-sm:w-full max-sm:flex-col max-sm:items-start flex-row items-center mt-4 cardItem justify-between">
        <SolSelector 
          roverManifestData={roverManifestData}
          roverName={roverName}
          initialSol={initialSol}
          initialPage={initialPage}
          setStageDetails={setStageDetails}
        />
        <Pagination
          initialSol={initialSol}
          roverName={roverName}
          photoStart={photoStart}
          initialPage={initialPage}
          photoEnd={photoEnd}
          roverManifestData={roverManifestData}
          totalPhotos={totalPhotos}
        />
      </div>
      <RoverImages 
        initialSol={initialSol}
        initialPage={initialPage}
        roverData={roverData}
        roverManifestData={roverManifestData}
        roverName={roverName}
        isLoading={stageDetails.isLoading}
        totalPhotos={totalPhotos}
      />
    </>
  );
}

export default RoverStage;