import conf from '../conf/conf';
import { Client,ID,Databases,Account, Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;

    Constructor(){
        this.client 
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        databases=new Databases(this.client);
        bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.creatDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // unique- id in order to select,get the document--slug
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                );
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }

    // get multiple documents based on the status
    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false;
        }
    }

    // --------------------------- or --------------------------------

    // async getPosts(){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             [
    //                 Query.equal(
    //                     'status',
    //                     'active'
    //                 )
    //             ]
    //         );
    //     } catch (error) {
    //         console.log("Appwrite serive :: getPosts :: error", error);
    //         return false;
    //     }
    // }


    // file uploading services for images
    // we have created a bucket in order to save images
    // (file)--- it means the actual blog-file is passes  

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
            ); 
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }

    // get file preview
    // it is not a promise in documentation
    // of appwrite, so dont use async await

    async getPreview(fileId){
        try {
            this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite serive :: getPreview :: error", error);
            return false;
        }
    }
     
}

const service= new Service()

export default service;