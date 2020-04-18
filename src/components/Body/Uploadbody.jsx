import React from 'react'
import './Home.css'
import {Modal,Button,FormControl} from 'react-bootstrap'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {connect} from 'react-redux'
import axios from 'axios'

class Uploadbody extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.email,this.props.myname)
        this.state={
            title:'',
            description:'',
            blogbody:''
        }        
    }
    handletitle=(e)=>{
        this.setState({
            title:e.target.value
        })
    }
    handledesc=(e)=>{
        this.setState({
            description:e.target.value
        })
    }
    handlesave=(e)=>{
        e.preventDefault()
        if(this.state.title.length <5){
            alert('title should have atleast 5 character')
            return
        }
        else if(this.state.description.length <15){
            alert('description is too short')
            return
        }
        else if(this.state.blogbody.length <50){
            alert('Blog body should atleast contain 50 characters')
            return
        }
        else{
            let obj={
                email:this.props.email,
                author:this.props.myname,
                title:this.state.title,
                description:this.state.description,
                blogbody:this.state.blogbody
            }
            if(window.confirm('are you sure you want to post data')){
                axios.post('http://localhost:5000/blog/post',obj).then(res=>{
                    console.log(res)
                    alert('your data is posted')
                    this.props.closer()
                })
            }
            else{
                console.log('cancelled')
            }
        }
    }
    render(){
        let {title,description}=this.state
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl aria-label="Small" value={title} onChange={this.handletitle} aria-describedby="inputGroup-sizing-sm" placeholder="Type your title here"/>
                    <textarea type="text" cols="40" 
                        rows="3" 
                        name="Text1" 
                        id="Text1" 
                        className="biginput"
                        placeholder="  Write your description here ......"
                        onChange={this.handledesc}
                        value={description}
                    />
                    <div className="editor-adjust">
                        <CKEditor
                            editor={ ClassicEditor }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({blogbody:data}) ;
                            } }
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closer}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handlesave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </div>
        )
    }
}

const mapStateToprops = (state)=>{
    return {
        myname:state.name,
        email:state.email
    }
}
export default connect(mapStateToprops)(Uploadbody)