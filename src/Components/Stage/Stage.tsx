import React, { ReactElement } from "react";

type StageProps = {
  children: ReactElement | ReactElement[];
  isMobile: boolean;
}

export default function Stage({ children, isMobile }: StageProps) {
  return (
    <div className='lg:m-4 md:m-0 lg:mt-0 lg:mr-0 lg:basis-4/5 md:basis-5/5 -mb-1  max-sm:flex max-sm:flex-col max-sm:items-center max-lg:w-full'>
      {children}
    </div>
  )
}