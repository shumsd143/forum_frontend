import React from 'react'
import { Spinner } from "react-bootstrap";
import './blogdetail.css'
import ReactHtmlParser from "react-html-parser";

class Blogdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            load:false,
            _id:this.props.match.params.id,
            data:[]
        }
    }
    fetcher=()=>{
        fetch('http://localhost:5000/get/eachblog/'+this.state._id)
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                load:true,
                data:json[0]
            })
        })
    }
    componentDidMount(){
        this.fetcher()
    }
    render(){
        let {load,data}=this.state
        console.log(data)
        if(load===false){
            return (
                <center>
                    <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                    <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                    <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                    <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                    <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                </center>
            )
        }
        return (
            <div className="container">
                <br></br>
                <div className="title-adjust-detail">{data.title.toUpperCase()}</div>
                <div>
                    <span className="author-adjust-detail">Posted by {data.author}</span>
                    <div className="date-adjust-detail">{data.date}</div>
                </div>
                <div className="desc-header"><p className="description-adjust-detail">{data.description}</p></div>
        <div className="body-header">{ReactHtmlParser(data.blogbody)}</div>
            </div>
        )
    }
}
export default Blogdetail