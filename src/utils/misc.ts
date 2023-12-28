import { DateTimeFormatOptions } from "./types";

export function capitalizeFirstLetter(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

// from https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900

export function nFormatter(num: number) {
  if (num >= 1000000000) {
     return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
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
  day: 'numeric'
};

export function parseDate(date: string) {
  return new Date(date).toLocaleDateString(
   "en-US", 
   dateOpts
 )
}