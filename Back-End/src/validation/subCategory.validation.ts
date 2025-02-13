import {z} from 'zod'
import idValidation from './objectIdValidation'


const subcategorySchema = z.object({
    name : z.string()
    .min(3).max(50) , 

    category_id : idValidation.objectIdSchema,

    updated_at : z.date().optional() , 
    created_at : z.date().optional()

})

export function subcategoryValidation (data : any) {
    return subcategorySchema.safeParse(data); 
};

