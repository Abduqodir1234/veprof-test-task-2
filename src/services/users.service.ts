import Users, { UserDocument } from "../models/user";
import hashing from "../middlewares/hashing";
import admin from "../middlewares/firebase";


interface User{
    email:string;
    password:string;
    role:"super"|"ordinary"
}

class UserService{
    async createSuperUser(data:User){
        try{
            if(!await Users.exists({email:data.email}))
            {
                const firebase= await admin.auth().createUser({
                    password:data.password,
                    email:data.email
                })
                await Users.create({...firebase,role:"super"})
                await admin.auth().setCustomUserClaims(firebase.uid,{admin:data.role==="super"})
                return {error:false,msg:"Created",status:201}
            }
            else{
                return{error:true,msg:"User exists with this email",status:400}
            }
        }
        catch(e){
            return{error:true,msg:e,status:500}
        }
    }


    async createUser(data:UserDocument){
        try{
            await Users.create(data)
            return {error:false,msg:"Created",status:201}
        }
        catch(e){
            return{error:true,msg:e,status:500}
        }
    }
}
export default UserService