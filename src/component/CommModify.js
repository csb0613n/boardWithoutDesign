import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function postModify(id, writer, content){
    let postdata = {cwriter: writer,  ccontent: content, cid: id};
    
    console.log(postdata);
    return axios
    .post('http://127.0.0.1:8080/modfiyComm',
        JSON.stringify(postdata),
        {headers: { "Content-Type": `application/json`}
    });
}

export default function CommModify(props){
    let [writer, setWriter] = useState('');
    let [content, setContent] = useState('');
    let [id, setId] = useState(0);

    useEffect(e=>{
        setWriter(props.cwriter);
        setContent(props.ccontent);
        setId(props.cid);
    }, [props]);

    function chgWriter(e){
        setWriter(e.target.value);
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
                <InputGroup.Text>댓글 내용</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea"
                value={content}
                onChange={chgContent}/>
            </InputGroup>
            <Button variant="outline-primary" onClick={() => {
                if(!!writer&&!!content){
                    postModify(id, writer, content)
                    .then(e=>{
                        if(e.data === 1){
                            props.setHideNum(null);
                            props.setLoad(true);
                        }else{
                            alert("실패");
                        }
                        e.data===1?props.setHideNum(null):alert("실패")
                    })
                    .catch(e=>console.log(e));
                }else{
                    alert("작성자와 내용을 모두 채워주세요.");
                }
            }}>수정</Button>
            <Button variant="outline-primary" onClick={() => props.setHideNum(null)}>취소</Button>
        </div>
    )
}