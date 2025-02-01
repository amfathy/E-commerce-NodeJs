import {z} from 'zod'
import {objectIdSchema} from './objectIdValidation'


const subcategorySchema = z.object({
    name : z.string()
    .min(3).max(50) , 

    category_id : objectIdSchema,

    updated_at : z.date().optional() , 
    created_at : z.date().optional()

})

export default subcategorySchema ;