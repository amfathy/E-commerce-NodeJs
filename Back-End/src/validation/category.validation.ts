import {any, z} from 'zod'

const catSchemValidation = z.object({
    name : z.string().min(3).max(50) , 
    description : z.string().min(12).max(250) , 
    updated_at : z.date().optional() , 
    created_at : z.date().optional(),
})

export function categoryValidation(body: any){
    return catSchemValidation.safeParse(body); 
} 