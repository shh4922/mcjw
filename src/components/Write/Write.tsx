import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/customApi";
import { API } from "../../api/config";
import { useNavigate } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../../context/AuthContext";
import "./write.css"

function Write() {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigator = useNavigate()
    
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyTitle = e.target.value
        setTitle(copyTitle)
    }
    const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const copyContent = e.target.value
        setContent(copyContent)
    }

    const handlePost =  () => {
        if(title === "" || content === "") {
            alert("제목과 내용을 입력해주세요")
            return
        }   
        writePost()
    }

    const writePost = async () => {
        try {
            const body = {
                title : title,
                content : content
            }
            const reuslt = await customAxios.post(`${API.BASE_URL}${API.WRITE_POST}`, body)
            
            alert("게시물에 등록되었습니다.")
            navigator("/my")
        } catch(error) {
            console.error(error)           
            navigator("/")
        }
    }

    // 글작성 은 크루권한만 가능.
    useEffect(() => {
        if(currentUser?.auth !== "crew") {
            alert("권한이없습니다")
            navigator("/")
            return
        }
    },[])

    return (
        <div className="write">
            <div className="write-wrap">
                <input className = "title" defaultValue={title} placeholder="title" onChange={handleTitle}></input>
                <ReactTextareaAutosize className = "content" defaultValue={content} placeholder="content" onChange={handleContent}></ReactTextareaAutosize>
                <button onClick={handlePost}>게시</button>
            </div>
        </div>
    )
}

export default Write