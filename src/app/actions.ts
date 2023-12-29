'use server';
import { getRoverData } from '@/lib/getRoverData';
import { z } from 'zod'
 
const schema = z.object({
  sol: z.number({
    required_error: "Sol is required",
    invalid_type_error: "Sol must be a number",
  }).positive().min(1),
});
 
export default async function getSolImages({...args}) {
  const formData = args.formData;
  const roverName = args.roverName;
  const page = args.page;

  const validatedFields = schema.safeParse({
    sol: Number(formData?.get('sol')),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors || '',
    }
  }

  await getRoverData(roverName, validatedFields.data.sol, page);

  return {
    message: 'success'
  }
}