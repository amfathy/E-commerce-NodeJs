import {z} from 'zod'


const validateId = (data : any)=>{
  return objectIdSchema.safeParse(data);
}

 const objectIdSchema = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid MongoDB ObjectId format",
});

export default {
  validateId , 
  objectIdSchema
}
