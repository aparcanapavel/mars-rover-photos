import React, { ReactElement } from "react";

type StageProps = {
  children: ReactElement | ReactElement[];
}

export default function Stage({ children }: StageProps) {
  return (
    <div data-testid='stage'  className='lg:mx-4 md:m-0 lg:mt-0 lg:mr-0 lg:mb-1 lg:basis-4/5 md:basis-5/5 max-sm:flex max-sm:flex-col max-sm:items-center max-lg:w-full'>
      {children}
    </div>
  )
}