import React from "react";
import Image from 'next/image';
import { nFormatter, parseDate } from "@/utils/misc";
import { RoverManifestDataType } from "@/app/rover/[rover-name]/page";

type RoverImgType = {
  [key: string]: {
    sharp: string,
    blur: string
  }
}

const roverImgs: RoverImgType = {
  'curiosity': {
    sharp: '/curiosity_rover.jpg',
    blur: '/curiosity_rover-blur.jpg'
  },
  'opportunity': {
    sharp: '/opportunity_rover.jpg',
    blur: '/opportunity_rover-blur.jpg'
  },
  'spirit': {
    sharp: '/spirit_rover.jpg',
    blur: '/spirit_rover-blur.jpg'
  }
}

type RoverDetailsProps = {
  roverName: string;
  roverManifestData: RoverManifestDataType
}

const RoverDetails: React.FC<RoverDetailsProps> = ({
  roverName,
  roverManifestData
}: RoverDetailsProps) => (
  <aside className="cardItem max-sm:w-full max-sm:text-xs">
    <div className="flex flex-row items-center mb-4 max-[375px]:flex-col max-[375px]:items-start">
      <div className="rounded-full border-solid border-2 border-mainBG relative aspect-square w-full max-w-[200px] overflow-hidden max-sm:max-w-[100px]">
        <Image 
          src={roverImgs[roverName].sharp} 
          blurDataURL={roverImgs[roverName].blur} 
          fill
          alt={roverManifestData.name}
          sizes='(max-width: 640px) 96px, (max-width: 900px) 196px,(max-width: 1280px) 196px,(max-width: 1536px) 196px, 196px'
        />
      </div>
      <div className="flex flex-row max-[375px]:ml-0 ml-4 max-[375px]:mt-4">
        <div className="flex flex-col items-center">
          <p>{nFormatter(roverManifestData.total_photos)}</p>
          <p className="font-bold">Total Photos</p>
        </div>
        <div className="flex flex-col items-center mx-4 lg:mx-6">
          <p>{roverManifestData.status}</p>
          <p className="font-bold">Status</p>
        </div>
        <div className="flex flex-col items-center">
          <p>{nFormatter(roverManifestData.max_sol)}</p>
          <p className="font-bold">Sol</p>
        </div>
      </div>
    </div>
    <h2 className="font-bold text-lg">{roverManifestData.name}</h2>
    <p>Launch Date: {parseDate(roverManifestData.launch_date)}</p>
    <p>Landing Date: {parseDate(roverManifestData.landing_date)}</p>
  </aside>
);

export default RoverDetails;