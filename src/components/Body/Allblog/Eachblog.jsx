import { Card,Button } from "react-bootstrap";
import React from 'react'
import {Link} from 'react-router-dom'
import './eachblog.css'
import { connect } from "react-redux";
import axios from 'axios'

class Eachblog extends React.Component{
    constructor(props){
        super(props)
        /* console.log(this.props.bloginfo) */
        this.state={
            likecount:'',
            likevalue:'Like'
        }
    }
    fetcher=()=>{
        fetch('http://localhost:5000/like/get/'+this.props.id)
        .then(res=>res.json())
        .then(json=>{
            let obj=json[0].likename
            if(obj[this.props.myemail]){
                this.setState({
                    likecount:Object.keys(obj).length,
                    likevalue:'Unlike'
                })
            }
            else{
                this.setState({
                    likecount:Object.keys(obj).length,
                    likevalue:'Like'
                })
            }
        })
    }
    clickpost=(e)=>{
        e.preventDefault()
        if(this.props.myemail){
            let object={
                email:this.props.myemail,
                blogid:this.props.id
            }
            axios.post('https://forumbacken.herokuapp.com/like/post',object).then(res=>{
                if(this.state.likevalue==='Like'){
                    this.setState({
                        likecount:this.state.likecount+1,
                        likevalue:'Unlike'
                    })
                }
                else{
                    this.setState({
                        likecount:this.state.likecount-1,
                        likevalue:'Like'
                    })
                }   
            })
        }
        else{
            alert('you need to login to like the blog')
        }
    }
    componentDidMount(){
        this.fetcher();
    }
    render(){
        let {likecount,likevalue}=this.state
        let url="/blog/"+this.props.id
        return (
            <div className="margin-provider">
                <Card className="text-center">
                    <Card.Header className="blog-header">Posted by {this.props.bloginfo.author}</Card.Header>
                    <Card.Body>
                        <Link to={url}><Card.Title>{this.props.bloginfo.title}</Card.Title></Link>
                        <Card.Text>
                            {this.props.bloginfo.description}
                        </Card.Text>
                        <Button variant="primary" onClick={this.clickpost}>{likecount} {likevalue}</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Posted at {this.props.bloginfo.date}</Card.Footer>
                </Card>
            </div>
        )
    }
}

const mapStateToprops = (state)=>{
    return {
        status:state.login,
        myemail:state.email
    }
}
export default connect(mapStateToprops)(Eachblog)