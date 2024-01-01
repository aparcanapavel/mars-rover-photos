import Layout from "@/Components/Layout";
import { MetaDataGeneratorProps } from "@/utils/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import RoverDetails from "@/Components/Aside/RoverDetails";
import RoverStage from "@/Components/Stage/RoverStage";
import { getRoverData } from "@/lib/getRoverData";

const getRoverManifestData = async (roverName: string) => {
  
  try{
    const res: Response = await fetch(
      process.env.NASA_ROVER_DATA_ENDPOINT 
        + '/manifests/' 
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
      return responseBody?.photo_manifest;
    }   

    throw new Error("Rover not found");
    
  } catch (e) {
    notFound();
  }
}

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
  
  const totalPages = 
    Math.ceil(solDetails?.total_photos / 25) || 1;

  const photoStart = initialPage === 1 ? 1 : (initialPage - 1) * 25 + 1;
  const photoEnd = initialPage === totalPages 
    ? totalPhotos
    : initialPage * 25;

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
        photoStart={photoStart}
        photoEnd={photoEnd}
        roverData={rover}
        totalPhotos={totalPhotos}
      />
      <Link href={'/'}>Back to Home</Link>
    </Layout>
  );
};