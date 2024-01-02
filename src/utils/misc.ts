import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DateTimeFormatOptions } from "./types";
import { ReadonlyURLSearchParams } from "next/navigation";

export function capitalizeFirstLetter(s: string) {
  if (typeof s !== 'string') return ''; 
  const lS = s.toLowerCase();
  return lS.toLowerCase()[0].toUpperCase() + lS.slice(1);
}

// from https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900

export function nFormatter(num: number): string | number {
  if (typeof num !== 'number') return num;

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return num;
}

const dateOpts: DateTimeFormatOptions = { 
  year: "numeric", 
  month: "long", 
  day: 'numeric',
  timeZone: "UTC"
};

export function parseDate(date: string): string {
  const dateOut = new Date((date)).toLocaleDateString(
    "en-US", 
    dateOpts
  );

 return dateOut;
}

const setParams = (
  params: URLSearchParams,
  newSol: string, 
  newPage: string, 
) => {
  params.set('sol', newSol);
  params.set('page', newPage);

  return params.toString();
}

export const addSearchParams = (
  newSol: string,
  newPage: string,
  router: AppRouterInstance,
  pathname: string,
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams);

  return router.push(
    pathname 
    + '?' 
    + setParams(params, newSol, newPage)
  );
}