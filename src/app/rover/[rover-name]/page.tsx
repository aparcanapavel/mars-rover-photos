import Layout from "@/Components/Layout";
import { MetaDataGeneratorProps } from "@/utils/types";
import RoverDetails from "@/Components/Aside/RoverDetails";
import RoverStage from "@/Components/Stage/RoverStage";
import { getRoverData } from "@/lib/getRoverData";
import { getRoverManifestData } from "@/lib/getRoverManifest";

type RoverManifestPhotosType = {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: Array<
    "FHAZ" 
    | "RHAZ" 
    | "MAST" 
    | "CHEMCAM" 
    | "MAHLI"
    | "MARDI"
    | "NAVCAM" 
    | "PANCAM"
    | "MINITES"
  >;
}
export type RoverManifestDataType = {
  name: string;
  total_photos: number;
  status: string;
  max_sol: number;
  launch_date: string;
  landing_date: string;
  photos: RoverManifestPhotosType[];
}

export default async function RoverPage({ params, searchParams }: MetaDataGeneratorProps){
  const roverName: string = params['rover-name'];
  const isMobile = searchParams?.viewport === 'mobile';
  const initialSol = searchParams?.sol ? Number(searchParams?.sol) : 0;
  const initialPage = searchParams?.page ? Number(searchParams?.page) : 1;

  const roverManifestData = getRoverManifestData(roverName);
  const roverData = getRoverData(roverName, initialSol, initialPage);

  const [rover, roverManifest] = await Promise.all([roverData, roverManifestData]);
  
  const solDetails = roverManifest.photos
    .find((sols: RoverManifestPhotosType) => sols.sol === initialSol);
  
  const totalPhotos = solDetails?.total_photos || 0;

  return (
    <Layout isMobile={isMobile}>
      <RoverDetails 
        roverName={roverName}
        roverManifestData={roverManifest}
      />
      <RoverStage 
        roverName={roverName}
        initialSol={initialSol}
        initialPage={initialPage}
        roverManifestData={roverManifest}
        roverData={rover}
        totalPhotos={totalPhotos}
      /> 
    </Layout>
  );
}