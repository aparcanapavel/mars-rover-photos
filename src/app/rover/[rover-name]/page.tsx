import Layout from "@/Components/Layout";
import { MetaDataGeneratorProps } from "@/utils/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import RoverDetails from "@/Components/Aside/RoverDetails";
import { Suspense } from "react";
import RoverStage from "@/Components/Stage/RoverStage";
import NumberSelector from "@/Components/Stage/NumberSelector";


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
      delete responseBody?.photo_manifest['photos'];
      return responseBody?.photo_manifest;
    }   

    throw new Error("Rover not found");
    
  } catch (e) {
    notFound();
  }
}


export default async function RoverPage({ params, searchParams }: MetaDataGeneratorProps){
  const roverName: string = params['rover-name'];
  const isMobile = searchParams?.viewport === 'mobile';
  const sol = searchParams?.sol ? Number(searchParams?.sol) : 1;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;

  const roverManifestData = await getRoverManifestData(roverName);

  return (
    <Layout isMobile={isMobile}>
      <RoverDetails 
        roverName={roverName}
        roverManifestData={roverManifestData}
      />
      <NumberSelector 
        solTotal={roverManifestData?.max_sol}
        roverName={roverName}
        initialSol={sol}
        page={page}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <RoverStage 
          roverName={roverName}
          solTotal={roverManifestData?.max_sol}
          sol={sol}
          page={page}
        />
      </Suspense>
      <Link href={'/'}>Back to Home</Link>
    </Layout>
  );
};