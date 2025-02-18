import {Request} from 'express'

interface Authreq extends Request {
    user? : {
        role : String , 
        userId : String
    }
} 

export default Authreq ; 