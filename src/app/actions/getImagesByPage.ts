'use server';
import { z } from 'zod';
import { getRoverData } from '../../lib/getRoverData';
 
const schema = z.object({
  sol: z.number({
    required_error: "Sol is required",
    invalid_type_error: "Sol must be a number",
  }).positive().min(0),
  page: z.number({
    required_error: "Page is required",
    invalid_type_error: "Page must be a number",
  }).positive().min(1),
  roverName: z.string({
    required_error: "roverName is required",
    invalid_type_error: "roverName must be a string",
  })
});

type GetImagesByPageArgs = z.infer<typeof schema>;
 
export default async function getImagesByPage({
  roverName,
  page,
  sol
}: GetImagesByPageArgs) {

  const validatedFields = schema.safeParse({
    sol,
    page,
    roverName
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors || '',
    }
  }

  await getRoverData(
    validatedFields.data.roverName, 
    validatedFields.data.sol,
    validatedFields.data.page
  );

  return {
    message: 'success'
  }
}