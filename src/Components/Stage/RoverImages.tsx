import React from "react";
import Image from "next/image";
import { RoverDataType } from "@/utils/types";

type RoverImagesProps = {
  roverData: RoverDataType[];
  isLoading: boolean;
}

const RoverImages: React.FC<RoverImagesProps> = ({ 
  roverData,
  isLoading,
}) => {

  return (
    <>
      <div className={`grid grid-cols-3 grid-rows-${Math.ceil(roverData.length / 3)} gap-[1px] max-sm:text-xs w-full mt-4`}>
        {isLoading ? (
          [...Array(18)].map((_, index) => (
            <div key={index} className="aspect-square col-span-1 row-span-1 overflow-hidden relative">
              <div className="w-full h-full bg-mainBG animate-pulse"></div>
            </div>
          ))
        ) : roverData.map((photo, index) => (
          <div key={index} className="aspect-square col-span-1 row-span-1 overflow-hidden relative rounded-md">
            <Image
              src={photo.img_src}
              alt={photo.camera.full_name}
              fill
              sizes='(max-width: 640px) 33vw, (max-width: 900px) 256px,(max-width: 1280px) 327px,(max-width: 1536px) 395px, 395px'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default RoverImages;