import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/customApi";
import { API } from "../../api/config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../../context/AuthContext";
import { crewPost } from "../../interface/crewPost";
import "../Write/write.css"


function Update() {
    
    const { state } = useLocation()
    const [post, setPost] = useState<crewPost>(state)
    const { currentUser } = useAuth();
    const navigator = useNavigate()

    
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => {
            return {...prev, title:e.target.value}
        })
    }
    const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost((prev) => {
            return {...prev, content:e.target.value}
        })
    }

    const handleUpdate = async () => {
        try {
            const result = await customAxios.put(`${API.BASE_URL}${API.UPDATE_POST}`, post)
            alert("게시물이 수정되었습니다.")
            navigator("/my")
        } catch(error) {
            console.error(error)           
            navigator("/")
        }
    }

    
    
    // useEffect(() => {    
    //     const fetchPostDetail = async () => {
    //         try {
    //             const result = await customAxios.get(`${API.BASE_URL}${API.POST_DETAIL}`,{params:{postid:postId}})
    //             if(result.status === 201) {
    //                 alert("권한이 없습니다.")
    //                 navigator("/my")
    //                 return
    //             }
    //             setPost(result.data)
    //         } catch(error) {
    //             console.error(error)
    //         }
    //     }
    //     fetchPostDetail()
    // },[])

    return (
        <div className="write">
            <div className="write-wrap">
                <input className = "title" defaultValue={post.title} placeholder="title" onChange={handleTitle}></input>
                <ReactTextareaAutosize className = "content" defaultValue={post.content} placeholder="content" onChange={handleContent}></ReactTextareaAutosize>
                <button onClick={handleUpdate}>수정</button>
            </div>
        </div>
    )
}

export default Update