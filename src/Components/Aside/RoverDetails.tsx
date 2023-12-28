import React from "react";
import Image from 'next/image';
import { nFormatter, parseDate } from "@/utils/misc";

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
  roverManifestData: {
    name: string;
    total_photos: number;
    status: string;
    max_sol: number;
    launch_date: string;
    landing_date: string;
  }
}

const RoverDetails: React.FC<RoverDetailsProps> = ({
  roverName,
  roverManifestData
}: RoverDetailsProps) => (
  <aside className="cardItem">
    <div className="flex flex-row items-center mb-4">
      <Image 
        src={roverImgs[roverName].sharp} 
        blurDataURL={roverImgs[roverName].blur} 
        width={200} 
        height={200} 
        alt={roverManifestData.name}
        className="rounded-full border-solid border-2 border-mainBG"
      />
      <div className="flex flex-row ml-4">
        <div className="flex flex-col items-center">
          <p>{nFormatter(roverManifestData.total_photos)}</p>
          <p className="font-bold">Total Photos</p>
        </div>
        <div className="flex flex-col items-center md:mx-4 lg:mx-6">
          <p>{roverManifestData.status}</p>
          <p className="font-bold">Status</p>
        </div>
        <div className="flex flex-col items-center">
          <p>{roverManifestData.max_sol}</p>
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