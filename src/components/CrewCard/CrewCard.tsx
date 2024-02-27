import React, { useEffect, useState } from "react";
import { User } from "../../interface/User";
import "./crewcard.css"
type propUser = {
    crew: User
}
// NOTE DataTable 공부완료시, 컴포넌트 삭제해야함
function CrewCard({ crew }: propUser) {
    return (
        <tr>
            <td><input type="checkbox"></input></td>
            <td>{crew.name}</td>
            <td>{crew.userid}</td>
            <td>{crew.auth}</td>
        </tr>
    )
}

export default CrewCard