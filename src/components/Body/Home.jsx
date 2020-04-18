import React from 'react'
import './Home.css'
import UploadBody from './Uploadbody'
import { Modal,Spinner } from "react-bootstrap";
import {connect} from 'react-redux'
import Blog from "./Allblog/Blog";

class Home extends React.Component{
    constructor(props){
        super(props)
        /* console.log(this.props.status,this.props.myname) */
        this.state={
            load:false,
            modal_state:false,
            search_value:'',
            data:[]
        }
    }
    openmodal=(e)=>{
        e.preventDefault()
        if(this.props.status===false){
            alert('please login before uploading')
            return
        }
        this.setState({
            modal_state:true
        })
    }
    closemodal=()=>{
        this.setState({
            load:false,
            modal_state:false
        })
        this.fetcher()
    }
    fetcher=()=>{
        fetch('https://forumbacken.herokuapp.com/get/allblog')
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                load:true,
                data:json
            })
        })
    }
    componentDidMount(){
        this.fetcher();
    }
    searcher=(event)=>{
        this.setState({
            search_value:event.target.value
        })
    }
    render(){
        let {load,data,modal_state,search_value}=this.state
        if(load===false){
            return (
                <div>
                    <button className="Adjustbutton" onClick={this.openmodal}>Create a New Post</button>
                    <div className="inputparent">
                        <input className="inputer" type="text" placeholder="  Search for title" value={search_value} onChange={this.searcher}/>
                    </div>
                    <Modal show={modal_state} onHide={this.closemodal}>
                        <UploadBody closer={this.closemodal}/>
                    </Modal>
                    <center>
                        <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                        <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                        <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                        <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                        <Spinner animation="grow" style={{ width: '3rem', height: '3rem' }}/>
                    </center>
                </div>
            )
        }
        return (
            <div>
                <button className="Adjustbutton" onClick={this.openmodal}>Create a New Post</button>
                <div className="inputparent">
                    <input className="inputer" type="text" placeholder="  Search for Post" value={search_value} onChange={this.searcher}/>
                </div>
                <Modal show={modal_state} onHide={this.closemodal}>
                    <UploadBody closer={this.closemodal}/>
                </Modal>
                <Blog blogjson={data} searchvalueinprops={search_value}/>
            </div>
        )
    }
}

const mapStateToprops = (state)=>{
    return {
        status:state.login
    }
}
export default connect(mapStateToprops)(Home)