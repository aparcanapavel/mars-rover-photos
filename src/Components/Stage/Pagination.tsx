
"use client";
import getImagesByPage from "@/app/actions/getImagesByPage";
import { RoverManifestDataType } from "@/app/rover/[rover-name]/page";
import { addSearchParams } from "@/utils/misc";
import React from "react";
import {
  usePathname, 
  useSearchParams, 
  useRouter 
} from 'next/navigation';

type PaginationProps = {
  roverName: string;
  initialSol: number;
  initialPage: number;
  photoStart: number;
  photoEnd: number;
  roverManifestData: RoverManifestDataType;
  totalPhotos: number;
}

const Pagination: React.FC<PaginationProps> = ({
  roverName,
  initialSol,
  initialPage,
  photoStart,
  photoEnd,
  roverManifestData,
  totalPhotos
}) => {
  // const totalPhotos = roverManifestData.photos[initialSol].total_photos;

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const handlePagination = async (direction: number) => {
    const newPage = initialPage + direction;
    if(newPage < 1 || newPage > Math.ceil(totalPhotos / 25)) return;

    addSearchParams(
      initialSol.toString(), 
      newPage.toString(), 
      router, 
      pathname, 
      searchParams
    );
    
    return getImagesByPage({
      roverName, 
      sol: initialSol, 
      page: newPage
    });
  }
  
  return (
    <div className="flex flex-row items-center max-sm:mt-4">
      <p>
        {photoStart} - {photoEnd} of {totalPhotos}
      </p>
      <div className="flex flex-row items-center ml-4">
        <div className="group relative flex flex-col items-center">
          <button 
            className="tooltip-btn"
            onClick={() => handlePagination(-1)}
            aria-disabled={initialPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span
            className="mars-tooltip"
          >
            Previous
          </span>
        </div>
        <div className="group relative flex flex-col items-center">
          <button 
            className="tooltip-btn"
            onClick={() => handlePagination(1)}
            aria-disabled={initialPage === Math.ceil(totalPhotos / 25)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <span
            className="mars-tooltip right-0"
          >
            Next
          </span>
        </div>
      </div>
    </div>
  )
}

export default Pagination;