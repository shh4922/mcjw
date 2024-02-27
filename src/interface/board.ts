import { crewPost } from "./crewPost"

export interface board {
    posts: [crewPost],
	currentPage: number,
    totalPages: number
}


