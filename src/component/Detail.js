import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import Comm from "./Comm";

export default function Detail(){
    let { id } = useParams();
    let navigate = useNavigate();
    let [oneBoard, setOne] = useState({bname: '', bwriter: '', bcontent: ''});
    useEffect(() =>{
        axios.get('http://127.0.0.1:8080/getOneBoard?id='+id)
        .then(response =>{
            setOne(response.data);
        });
    }, [id]);
    return(
        <div>
            <Button variant="outline-primary" onClick={() => {
                navigate('/modify', {state: oneBoard})
            }}>수정하기</Button>
            <Button variant="outline-primary" onClick={() => {
                let mes = window.confirm('삭제할거?');
                if(mes){
                    axios.get('http://127.0.0.1:8080/deleteBoard?id='+id)
                    .then(e => {alert('삭제되었습니다.'); navigate('/');})
                }
            }}>삭제하기</Button>

            <Table striped="columns" >
            <thead>
            <tr>
                <th style={{width: 10}}>제목: </th>
                <th style={{width: 100}}>{oneBoard.bname}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>작성자: </td>
                <td>{oneBoard.bwriter}</td>
            </tr>
            <tr style={{height: 500}}>
                <td>내용: </td>
                <td>{oneBoard.bcontent}</td>
            </tr>
            <tr>
                <td>글 번호: </td>
                <td>{oneBoard.id}</td>
            </tr>
            </tbody>
        </Table>
        <Comm id={id} />
      </div>
    )
}