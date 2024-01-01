'use server';
import { getRoverData } from '@/lib/getRoverData';
import { z } from 'zod'
 
const schema = z.object({
  sol: z.number({
    required_error: "Sol is required",
    invalid_type_error: "Sol must be a number",
  }).min(0),// needs to validate max sol
});

export type FormStateType = { 
  errors: { sol?: string[] | undefined; }; 
  message?: undefined; 
} | { 
  message: string; 
  errors?: undefined; 
}
 
export default async function getSolImages(
  bindedArgs: {
    roverName: string,
    page: number,
  }, 
  _: FormStateType,
  formData: FormData, 
) {
  const validatedFields = schema.safeParse({
    sol: Number(formData?.get('sol')),
  });
  

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors || '',
    }
  }

  await getRoverData(bindedArgs.roverName, validatedFields.data.sol, bindedArgs.page);

  return {
    message: 'success'
  }
}