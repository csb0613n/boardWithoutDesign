import { Button, Table } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main(){
    let [boardList, setList] = useState([]);
    useEffect(() =>{
        axios.get('http://127.0.0.1:8080/getBoardList')
        .then(response =>{
            setList(response.data);
        });
    }, []);
    let navigate = useNavigate();
    return(
        <div>
            <Button variant="outline-primary" onClick={() => navigate('/new')}>글 작성</Button>
            <Table striped bordered hover>
            <thead>
            <tr>
                <th style={{width: 10}}></th>
                <th style={{width: 10}}>작성자</th>
                <th style={{width: 80}}>제목</th>
                <th style={{width: 10}}>댓글 수</th>
            </tr>
            </thead>
            <tbody>
            {boardList.map((e, i) =>{
                return(
                    <tr key={i}  onClick={() => navigate({
                        pathname: "/detail/"+ (e.id)
                    })}>
                    <td>{e.id}</td>
                    <td>{e.bwriter}</td>
                    <td>{e.bname}</td>
                    <td>{e.cntComm}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
      </div>
    )
}