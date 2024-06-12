import React,{useState, useEffect} from "react"
import { Container, PostCard } from "../components"
import authservice from "../appwrite/config";

function AllPost(){

    const[post,setPost] = useState([]);
    useEffect(() => {
        authservice.getPosts([]).then((posts) => {
            if(posts) setPost(posts.documents);
        })
    } , []);

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {post.map((post) => (
                        <div key={post.$id} className="p-2 w-1"> 
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost