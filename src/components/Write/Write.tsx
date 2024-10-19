import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/customApi";
import { API } from "../../api/config";
import { useNavigate } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../../context/AuthContext";
import "./write.css"
import { error } from "console";


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
    const writePost = async (body: Object) => {
        try {
            const reuslt = customAxios.post(`${API.BASE_URL}${API.WRITE_POST}`, body)
            if ((await reuslt).status === 200) {
                alert("게시물에 등록되었습니다.")
                navigator("/my")
            } else {
                alert("게시물등록에 실패했습니다.")
                navigator("/")
            }

        } catch (error) {
            if (error === "402") {
                alert("세션이만료되어")
                navigator("/login")
                return
            }

            navigator("/")
        }
    }
    const handlePost = () => {
        const body = {
            title: title,
            content: content
        }

        writePost(body)
    }

    return (
        <div className="write">
            <div className="write-wrap">
                <input className="title" defaultValue={title} placeholder="title" onChange={handleTitle}></input>
                <ReactTextareaAutosize className="content" defaultValue={content} placeholder="content" onChange={handleContent}></ReactTextareaAutosize>
                <button onClick={handlePost}>게시</button>
            </div>
        </div>
    )
}

export default Write