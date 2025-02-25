import {Model , Document} from "mongoose"
interface Ipaginate <T> {
    data : T[] , 
    page : number , 
    limit : number , 
    skip : number 
}

export const Pagination = async < T extends Document> ( model : Model<T> , page: number = 1 , limit : number = 10 , queryString :Record<string , any> )=>{
    const skip = (page -1 ) * limit ;
    const data = await model.find(queryString).skip(skip).limit(limit); 
    const totalItems = await model.countDocuments(queryString) ; 
    const totalPages = Math.ceil(totalItems/limit)
    if(!data) 
        return {
            sucess : false , 
            message : "unsuccesfful operattion in pagination", 
            data : undefined 
    }
    return {
        success : true , 
        message : "Data retrieved successfully" , 
        currentPage : page ,
        totalPages : totalPages,
        data : data
    }
}

