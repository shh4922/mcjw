import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./postdetail.css"
import { useAuth } from "../../context/AuthContext";
import { customAxios } from "../../api/customApi";
import axios from "axios";
import { API } from "../../api/config";

function PostDetail() {
    const { postId } = useParams();
    const { state } = useLocation()
    const {currentUser} = useAuth()
    const navigator = useNavigate()
    const handleDelete = async () => {
        try {
            const result = await customAxios.delete(`${API.BASE_URL}${API.POST_DELETE}`,{
                params: {
                    postid: postId
                }
            })
            if(result.status === 200) {
                alert("삭제가 완료되었습니다.")
                navigator("/my")
            }
        } catch(error) {
            console.error(error)
        }
    }

    if(state === null) {
        return (<h1>올바른 경로로 입장 바랍니다.</h1>)
    }
    return (
        <div className="postdetail">
            <div className="postdetail-content">

                <span className="title">{state.title}</span>
                <div className="content-info">
                    {
                    state.userid === currentUser?.userid 
                    ? (
                        <>
                            <Link className="editbutton" to={`/update/${postId}`} state={state}>수정하기</Link> 
                            <button onClick={handleDelete}>삭제</button>
                        </>
                        
                    )
                    : <></>
                    }
                    
                    <span className="date">{state.date}</span>
                </div>
                <span className="content">{state.content}</span>
            </div>
        </div>
    )

}

export default PostDetail