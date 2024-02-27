import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/customApi";
import { API } from "../../api/config";
import PostCard from "../PostCard/PostCard";
import { useAuth } from "../../context/AuthContext";
import { crewPost } from "../../interface/crewPost";
import "./board.css"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { board } from "../../interface/board";


function Board() {
    const [posts, setPosts] = useState<board|null>(null)
    const { currentUser } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
        // 로그아웃시, 데이터삭제
        if (currentUser === null) {
            setPosts(null)
            return
        }
        if (currentUser.auth !== "storemanager") {
            alert("권한이없습니다.")
            return
        }
        fetchCrewPost()
    }, [currentUser, searchParams.get("page")])

    const fetchCrewPost = async () => {
        try {
            const result = await customAxios.get(`${API.BASE_URL}${API.MY_POST}`,{
                params: {
                    page: searchParams.get("page")
                }
            })
            setPosts(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="board">
            <ul className="board-content">
                {
                    posts?.posts.map((post) => {
                        return <PostCard key={post.id} post={post} />
                    })
                }
            </ul>
            <div className="board-pagenation">
                {Array.from({ length: posts?.totalPages ?? 1 }).map((_, index) => (
                    <Link
                        key={`page-${index + 1}`}
                        to={`/board?page=${index + 1}`}
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

export default Board