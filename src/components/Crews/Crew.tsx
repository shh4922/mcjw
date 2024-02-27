import React, { useEffect, useState } from "react";
import { customAxios } from "../../api/customApi";
import { API } from "../../api/config";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../interface/User";
import DataTable from "react-data-table-component";
import "./crew.css"
// import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import CrewCard from "../CrewCard/CrewCard";

function Crew() {

    const { currentUser } = useAuth()
    const [crews, setCrews] = useState<User[]>([])
    const [record, setRecord] = useState<User[]>([])

    const [isSorted, setIsSorted] = useState<boolean>(false)

    const columns = [
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true
        },
        {
            name: "userId",
            selector: (row: any) => row.userid,
            sortable: true
        },
        {
            name: "Authorization",
            selector: (row: any) => row.auth,
            sortable: true
        }
    ]

    // 로그아웃시, 데이터삭제
    useEffect(() => {
        if (currentUser === null) {
            return
        }
        if (currentUser.auth === "crew") {
            alert("권한이 없습니다.")
            return
        }
        fetchCrewPost()
    }, [currentUser])

    const fetchCrewPost = async () => {
        try {
            const result = await customAxios.get(`${API.BASE_URL}${API.CREWS}`)
            await setCrews(result.data)
            await setRecord(result.data)

            console.log(result.data)
        } catch (error) {
            alert("서버에서 에러가 발생했습니다.")
            console.log(error)
        }
    }

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = crews.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecord(newData)
    }

    const toggleAuth = () => {
        const copyIsSorted = !isSorted
        setIsSorted(copyIsSorted)
    }
    const handleSorted = () => {
        toggleAuth()
        if (isSorted) {
            const newData = crews.slice().sort((a, b) => a.auth.localeCompare(b.auth))
            setRecord(newData)
        } else {
            const newData = crews.slice().sort((a, b) => b.auth.localeCompare(a.auth))
            setRecord(newData)
        }
    }

    
    return (
        <div className="crew">
            <div className="crew-content">
                <div className="option">
                    <input className="crew-search" type="text" placeholder="search" onChange={handleFilter}></input>
                    <button>delete</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>check</th>
                            <th>Name</th>
                            <th>UserID</th>
                            <th onClick={handleSorted}>Auth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((user) => {
                            return <CrewCard key={user.id} crew={user}></CrewCard>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Crew

// <section className="crew-table">
// <table>
//     <thead>
//         <tr>
//             <th>check</th>
//             <th>Name</th>
//             <th>UserID</th>
//             <th>Auth</th>
//         </tr>
//     </thead>

//     <tbody>
//         {record.map((user) => {
//             return (
//                 <tr key={user.id}>
//                     <td><input type="checkbox"></input></td>
//                     <td>{user.name}</td>
//                     <td>{user.userid}</td>
//                     <td>{user.auth}</td>
//                 </tr>
//             )
//         })

//         }
//     </tbody>
// </table>
// </section>