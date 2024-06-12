import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import authservice from "../appwrite/config";
import { Container, PostForm} from "../components"

function EditPost(){

    const [post,setPost] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();
    useEffect( () => { 
        if(slug){
            authservice.getPost(slug).then((post)=>{
                if(post) setPost(post);
            })
        }else{
            navigate('/')
        }
    } , [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container >
                <postForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost