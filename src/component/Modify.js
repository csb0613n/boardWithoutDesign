import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function postModify(id, writer, name, content){
    let postdata = {bwriter: writer, bname: name, bcontent: content, id: id};
    
    console.log(postdata);
    return axios
    .post('http://127.0.0.1:8080/modifyOneBoard',
        JSON.stringify(postdata),
        {headers: { "Content-Type": `application/json`}
    });
}

export default function Modify(props){
    let [writer, setWriter] = useState('');
    let [name, setName] = useState('');
    let [content, setContent] = useState('');
    let [id, setId] = useState(0);
    let location = useLocation();
    let navigate = useNavigate();
    const board = location.state;
    useEffect(e=>{
        setWriter(board.bwriter);
        setName(board.bname);
        setContent(board.bcontent);
        setId(board.id);
    }, [board]);

    function chgWriter(e){
        setWriter(e.target.value);
    }
    function chgName(e){
        setName(e.target.value);
    }
    function chgContent(e){
        setContent(e.target.value);
    }
    return(
        <div>
            <InputGroup>
                <InputGroup.Text id="basic-addon1">작성자</InputGroup.Text>
                <Form.Control
                placeholder="작성자"
                aria-label="writer"
                aria-describedby="basic-addon1"
                value={writer}
                onChange={chgWriter}
                /> 
            </InputGroup><br/>
            <InputGroup>
                <InputGroup.Text id="basic-addon1">제목</InputGroup.Text>
                <Form.Control
                placeholder="제목"
                aria-label="name"
                aria-describedby="basic-addon1"
                value={name}
                onChange={chgName}
                />
            </InputGroup><br/>
            <InputGroup>
                <InputGroup.Text>글 내용</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea"
                value={content}
                onChange={chgContent}/>
            </InputGroup>
            <Button variant="outline-primary" onClick={() => {
                postModify(id, writer, name, content)
                .then(e=>{
                    if(e.data === 1)
                    {navigate('/detail/'+id);}
                    else{
                        alert('서버오류');
                    }
                })
                .catch(e=>console.log(e));
            }}>수정</Button>
            <Button variant="outline-primary" onClick={() => {setContent(''); setName(''); setWriter('');}}>취소</Button>
        </div>
    )
}