import React from "react";
import { RoverManifestDataType } from "@/app/rover/[rover-name]/page";
import Image from "next/image";
import { RoverDataType } from "./RoverStage";

type RoverImagesProps = {
  roverName: string;
  roverManifestData: RoverManifestDataType;
  initialSol: number;
  initialPage: number;
  roverData: RoverDataType[];
  isLoading: boolean;
  totalPhotos: number;
}

const RoverImages: React.FC<RoverImagesProps> = ({ 
  roverData,
  isLoading,
  totalPhotos
}) => {

  return (
    <div className="mt-4 max-sm:text-xs">
      total {roverData.length}
      pages: {Math.ceil(totalPhotos / 25) || 0}
      <div className={`grid grid-cols-3 grid-rows-${Math.ceil(roverData.length / 3)} gap-1`}>
        {isLoading ? (
          [...Array(18)].map((_, index) => (
            <div key={index} className="aspect-square col-span-1 row-span-1 overflow-hidden relative">
              <div className="w-full h-full bg-mainBG animate-pulse"></div>
            </div>
          ))
        ) : roverData.map((photo, index) => (
          <div key={index} className="aspect-square col-span-1 row-span-1 overflow-hidden relative">
            <Image
              src={photo.img_src}
              alt={photo.camera.full_name}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoverImages;