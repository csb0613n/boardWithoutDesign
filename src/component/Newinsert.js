import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function postBoard(writer, name, content){
    let postdata = {bwriter: writer, bname: name, bcontent: content};
    
    console.log(postdata);
    return axios
    .post('http://127.0.0.1:8080/setOneBoard',
        JSON.stringify(postdata),
        {headers: { "Content-Type": `application/json`}
    });
}

export default function Newinsert(){
    let [writer, setWriter] = useState('');
    let [name, setName] = useState('');
    let [content, setContent] = useState('');
    let navigate = useNavigate();

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
                if(!!writer&&!!name&&!!content){
                    postBoard(writer, name, content)
                    .then(e =>
                        {let result =  e.data;
                        if(result > 0){
                            navigate({pathname: "/detail/"+ result});
                        }else{
                            alert('서버오류. 관리자에게 문의하시오.');
                        }}
                    )
                }else{
                    alert("작성자, 제목, 내용을 모두 작성해주세요.");
                }
            }}>글 올리기</Button>
            <Button variant="outline-primary" onClick={() => {setContent(''); setName(''); setWriter('');}}>취소</Button>
        </div>
    )
}