
import conf from "../config/conf"
import { Client ,ID,Account} from "appwrite"

export class AuthService{
    
    client =new Client();
    account;

    Constructor(){
        client=this.client
                   .setEndpoint(conf.appwriteUrl)
                   .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email,password){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getcurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession();
        } catch (error) {
            throw error;
        }
    }

}

const authservice = new AuthService()

export default authservice;
