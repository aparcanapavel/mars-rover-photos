export type MetaDataGeneratorProps = {
  params: { 
    'rover-name': string;
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type DateTimeFormatOptions = {
  weekday?: "long" | "short" | "narrow" | undefined;
  year?: "numeric" | "2-digit" | undefined;
  month?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
  day?: "numeric" | "2-digit" | undefined;
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