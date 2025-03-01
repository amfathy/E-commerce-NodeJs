import {Model , Document} from "mongoose"
interface Ipaginate <T> {
    data : T[] , 
    page : number , 
    limit : number , 
    skip : number 
}

export const Pagination = async <T extends Document>(
    model: Model<T>,
    page: number = 1,
    limit: number = 10,
    queryString: Record<string, any>
  ) => {

    const skip = (page - 1) * limit;
    const hasFilters = Object.keys(queryString).length > 0; 

    const data = hasFilters?  await model.find().skip(skip).limit(limit)
    : await model.find(queryString).skip(skip).limit(limit);
    console.log("Fetched Data:", data); 
  
    const totalItems = await model.countDocuments();
    console.log("Total Items:", totalItems); 
  
    const totalPages = Math.ceil(totalItems / limit);
  
    if (data.length === 0) {
      return {
        success: false,
        message: "Unsuccessful operation in pagination",
        data: undefined
      };
    }
  
    return {
      success: true,
      message: "Data retrieved successfully",
      currentPage: page,
      totalPages: totalPages,
      data: data
    };
  };

