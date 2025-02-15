import {any, z , object} from 'zod'

export const categoryValidation = z.object({
    body : object({
    name : z.string().min(3).max(50) , 
    description : z.string().min(12).max(250) , 
    updated_at : z.date().optional() , 
    created_at : z.date().optional(),
    })
})

