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
  
  console.log('validatedFields.success', validatedFields.success);
  // await new Promise((res) => setTimeout(res, 5000));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors || '',
    }
  }

  const res = await getRoverData(bindedArgs.roverName, validatedFields.data.sol, bindedArgs.page);

  console.log('res', res);

  return {
    message: 'success'
  }
}