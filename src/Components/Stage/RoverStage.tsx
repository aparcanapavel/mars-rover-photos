"use client";
import React, { useOptimistic } from "react";
import { RoverManifestDataType } from "@/app/rover/[rover-name]/page";
import RoverImages from "./RoverImages";
import SolSelector from "./SolSelector";
import Pagination from "./Pagination";
import { RoverDataType, stageDetailsType } from "@/utils/types";


type RoverStageProps = {
  roverName: string;
  roverManifestData: RoverManifestDataType;
  initialSol: number;
  initialPage: number;
  roverData: RoverDataType[];
  totalPhotos: number;
}

type ImagesPagniatorProps = {
  setStageDetails: (newDetails: stageDetailsType) => void;
  stageDetails: stageDetailsType 
}

const ImagesPaginator: React.FC<Omit<RoverStageProps, 'roverData'> & ImagesPagniatorProps> = ({ 
  roverName,
  initialSol,
  initialPage,
  roverManifestData,
  totalPhotos,
  setStageDetails,
  stageDetails
}) => {
  return (
    <div className="flex max-sm:w-full max-sm:flex-col max-sm:items-start flex-row items-center mt-4 cardItem justify-between">
      <SolSelector 
        roverManifestData={roverManifestData}
        roverName={roverName}
        initialSol={initialSol}
        initialPage={initialPage}
        setStageDetails={setStageDetails}
        stageDetails={stageDetails}
      />
      <Pagination
        initialSol={initialSol}
        roverName={roverName}
        initialPage={initialPage}
        totalPhotos={totalPhotos}
        setStageDetails={setStageDetails}
        stageDetails={stageDetails}
      />
    </div>
  )
}


const RoverStage: React.FC<RoverStageProps> = ({ 
  roverName,
  initialSol,
  initialPage,
  roverManifestData,
  roverData,
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
      <ImagesPaginator
        roverManifestData={roverManifestData}
        roverName={roverName}
        initialSol={initialSol}
        initialPage={initialPage}
        setStageDetails={setStageDetails}
        stageDetails={stageDetails}
        totalPhotos={totalPhotos}
      />
      <RoverImages 
        roverData={roverData}
        isLoading={stageDetails.isLoading}
      />
      {totalPhotos > 0 && (
        <ImagesPaginator
          roverManifestData={roverManifestData}
          roverName={roverName}
          initialSol={initialSol}
          initialPage={initialPage}
          setStageDetails={setStageDetails}
          stageDetails={stageDetails}
          totalPhotos={totalPhotos}
        />
      )}
    </>
  );
}

export default RoverStage;