import Layout from "@/Components/Layout";
import { MetaDataGeneratorProps } from "@/utils/types";
import Link from "next/link";


export default function NotFound({ searchParams }: MetaDataGeneratorProps) {
  const isMobile = searchParams?.viewport === 'mobile';
  
  return (
    <Layout
      isMobile={isMobile}
    >
      <div className="flex flex-col items-center justify-center w-full h-[calc(100dvh-7rem)] text-lg font-medium ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <h2 className="mt-2">Page Not Found</h2>
        <p className="mt-2 text-sm text-center">We couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href={'/'} className="mt-4 text-sm bg-accent-300 px-4 py-2 rounded-md flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Go back home
        </Link>
      </div>
    </Layout>
  );
}