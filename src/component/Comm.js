import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Tab, Table, Tabs } from "react-bootstrap";
import CommModify from "./CommModify";

function insertComm(cwriter, ccontent, bid){
    let postdata = {cwriter: cwriter, bid: bid, ccontent: ccontent};

    return(
    axios.post(
        'http://127.0.0.1:8080/setComm', 
        JSON.stringify(postdata), 
        {headers: { "Content-Type": `application/json`}}
    )
    )
}

function ShowTable(props){
    let cwriter = props.cwriter;
    let ccontent = props.ccontent;
    let submit_date = props.submit_date;
    let cid = props.cid;
    let hideNum = props.i;
    return(
        <>
            <Table striped bordered hover>
            <tbody>
                <tr>
                <td>작성자: </td>
                <td style={{width:1000}}>{cwriter}</td>
                </tr>
                <tr>
                <td>댓글 내용: </td>
                <td>{ccontent}
                </td>
                </tr>
                <tr>
                <td>작성 날짜:</td>
                <td>{submit_date}</td>
                </tr>
            </tbody>
            </Table>
            <Button variant="outline-primary" size="sm" onClick={() => {
                props.setHideNum(hideNum);
            }}>수정하기</Button>
            <Button variant="outline-primary" size="sm" onClick={() => {
                if(window.confirm('정말 삭제?')){
                    axios.get(
                        'http://127.0.0.1:8080/deleteComm?cid='+cid+'&bid='+props.bid
                    )
                    .then(e =>
                        e.data===1?props.setLoad(true):alert("실패"))
                }
            }}>삭제하기</Button>
            <div className="bg-Secondary border"></div><br />
        </>
    )
}

export default function Comm(props){
    let [comm, setComm] = useState([]);
    let [cwriter, setCwriter] = useState('');
    let [ccontent, setCcontent] = useState('');
    let [hideNum, setHideNum] = useState(null);
    let [pReload, setLoad] = useState(false);
    const [key, setKey] = useState('comList');
    useEffect(e =>{
        axios.get('http://127.0.0.1:8080/getCommList?bid='+props.id)
        .then(e=>{
            setComm(e.data);
        })
        .catch(e=> console.log(e));
        setLoad(false);
        setKey('comList');
    }, [props.id, pReload])

    
    function chgCwriter(e){
        setCwriter(e.target.value);
    }
    function chgCcontent(e){
        setCcontent(e.target.value);
    }

    return(
        <div>
            <Tabs
            activeKey={key}
            defaultActiveKey="comList"
            onSelect={(k) => setKey(k)}
            id="uncontrolled-tab-example"
            className="mb-3"
            >
                <Tab eventKey="comList" title="댓글 목록">
                {comm.length===0? 
                <div>등록된 댓글이 없습니다.</div>
                    :
                comm.map((e, i) => {
                    return(
                        <div key={i}>
                            {hideNum !== i? 
                                <ShowTable cwriter={e.cwriter} ccontent={e.ccontent} submit_date={e.submit_date} cid={e.cid} i={i} setLoad={setLoad} setHideNum={setHideNum} bid={props.id}/>
                                :
                                <CommModify cwriter={e.cwriter} ccontent={e.ccontent} submit_date={e.submit_date} cid={e.cid} setHideNum={setHideNum} setLoad={setLoad}/>
                                }
                        </div>
                    )
                })}
                </Tab>
                <Tab eventKey="commInput" title="댓글 달기">
                <div className="bg-Secondary border"></div><br />
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="이름" value={cwriter} onChange={chgCwriter}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={3} placeholder="내용" value={ccontent} onChange={chgCcontent}/>
                    </Form.Group>
                    </Form>
                    <Button variant="outline-primary" size="sm" onClick={() => {
                        insertComm(cwriter, ccontent, props.id).then(e=>console.log(e));
                        setLoad(true);
                        setCwriter('');
                        setCcontent('');
                    }}>등록하기</Button>
                    <div className="bg-Secondary border"></div>
                </Tab>
            </Tabs>
        </div>
    )
}
