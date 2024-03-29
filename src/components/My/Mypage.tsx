import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/customApi";
import { API } from "../../api/config";
import PostCard from "../PostCard/PostCard";
import { crewPost } from "../../interface/crewPost"
import { useAuth } from "../../context/AuthContext";
import "./mypage.css"
import { board } from "../../interface/board";
import { Link, useSearchParams } from "react-router-dom";

function Mypage() {
    const [posts, setPosts] = useState<board|null>(null)
    const { currentUser } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()

    
    // 본인이 작성한 게시물을 받아옴
    // 또한 로그아웃시, 데이터 삭제를 위해 현재로그인된 계정을 [] 에 넣어줌
    // NOTE 게시물이 없을시 보여줄화면을 만들어함
    useEffect(() => {
        
        if (currentUser === null) {
            setPosts(null)
            return
        }   
        fetchCrewPost()
    }, [currentUser, searchParams.get("page")])

    const fetchCrewPost = async () => {
        try {
            const result = await customAxios.get(`${API.BASE_URL}${API.MY_POST}`, { 
                params: {
                    page: searchParams.get("page")
                }
            })
            setPosts(result.data)
        } catch (error) {
            console.log(error)
            alert("서버에서 에러가 발생했습니다.")
        }
    }
    return (
        <div className="mypage">
            <ul className="mypage-content">
                {
                    posts?.posts.map((post) => {
                        return <PostCard key={post.id} post={post} />
                    })
                }
            </ul>
            <div className="mypage-pagenation">
                {Array.from({ length: posts?.totalPages ?? 1 }).map((_, index) => (
                    <Link
                        key={`page-${index + 1}`}
                        to={`/my?page=${index + 1}`}
                        className= { Number(posts?.currentPage)  === index + 1 ? 'active' : ''}
                        // onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Mypage