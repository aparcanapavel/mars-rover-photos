
"use client";
import getImagesByPage from "@/app/actions/getImagesByPage";
import { addSearchParams } from "@/utils/misc";
import React, { startTransition } from "react";
import {
  usePathname, 
  useSearchParams, 
  useRouter 
} from 'next/navigation';
import { stageDetailsType } from "../../utils/types";

type PaginationProps = {
  roverName: string;
  initialSol: number;
  initialPage: number;
  totalPhotos: number;
  setStageDetails: (newDetails: stageDetailsType) => void;
  stageDetails: stageDetailsType
}

const Pagination: React.FC<PaginationProps> = ({
  roverName,
  initialSol,
  initialPage,
  totalPhotos,
  setStageDetails,
  stageDetails
}) => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const handlePagination = async (direction: number) => {
    startTransition(() => {
      setStageDetails({
        isLoading: true
      });
    });
        
    const newPage = Number(searchParams.get('page')) + direction 
      || initialPage + direction;
    
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

  const currentPage = searchParams.get('page') || initialPage;
  const displayIdxStart = ((Number(currentPage) - 1) * 25) + 1;

  const displayIdxEnd = displayIdxStart + 24 < totalPhotos ? displayIdxStart + 24 : totalPhotos;
  
  return (
    <div className="flex flex-row items-center max-sm:mt-4">
      {stageDetails.isLoading ? (
        <div className="w-[110px] h-[27px] flex flex-row items-center">
          <span className="w-5 flex h-full bg-cardBG-400 animate-pulse rounded-sm mr-1"></span>
          -
          <span className="w-5 flex h-full bg-cardBG-400 animate-pulse rounded-sm mx-1"></span>
          of
          <span className="w-7 flex h-full bg-cardBG-400 animate-pulse rounded-sm ml-1"></span>
        </div>
      ) : (
        <p>
          {totalPhotos && displayIdxStart} - {displayIdxEnd} of {totalPhotos}
        </p>
      )}
      <div className="flex flex-row items-center ml-4">
        <div className="group relative flex flex-col items-center">
          <button 
            className="tooltip-btn"
            onClick={() => handlePagination(-1)}
            aria-disabled={stageDetails.isLoading || initialPage === 1}
            aria-labelledby="previous-span"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span
            className="mars-tooltip"
            id="previous-span"
          >
            Previous
          </span>
        </div>
        <div className="group relative flex flex-col items-center">
          <button 
            className="tooltip-btn"
            onClick={() => handlePagination(1)}
            aria-disabled={stageDetails.isLoading || displayIdxEnd === totalPhotos}
            aria-labelledby='next-span'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <span
            className="mars-tooltip right-0"
            id="next-span"
          >
            Next
          </span>
        </div>
      </div>
    </div>
  )
}

export default Pagination;