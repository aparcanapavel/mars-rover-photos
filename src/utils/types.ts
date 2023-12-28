export type MetaDataGeneratorProps = {
  params: { 
    'rover-name': string;
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type DateTimeFormatOptions = {
  weekday?: "long" | "short" | "narrow" | undefined;
  year?: "numeric" | "2-digit" | undefined;
  month?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
  day?: "numeric" | "2-digit" | undefined;
}