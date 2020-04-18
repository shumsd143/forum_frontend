import React from 'react'
import {Form,Button} from 'react-bootstrap'
import './loginsignup.css';
import { Redirect } from "react-router-dom";
import axios from 'axios'
import {connect} from 'react-redux'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            lemail:'',
            lpass:'',
            toDashboard:false
        }
    }
    inputname=(event)=>{
        this.setState({
            lemail:event.target.value
        })
    }
    inputpass=(event)=>{
        this.setState({
            lpass:event.target.value
        })
    }
    loggedin=(event)=>{
        if(this.state.lemail==='' || this.state.lpass===''){
            alert('email or password cannot be empty')
        }
        else{
            let user={
                "email":this.state.lemail,
                "password":this.state.lpass
            }
            axios.post('https://forumbacken.herokuapp.com/user/login',user).then(res=>{
                console.log(res.data.status)
                if(res.data.status==='failed'){
                    alert('Wrong email or password')
                }
                else{
                    this.props.changeLogin(res.data.name,res.data.email)
                    this.setState({
                        toDashboard:true
                    })
                }
            })
        }
        event.preventDefault()
    }
    render(){
        let {lemail,lpass}=this.state
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1 className="login-head"><i>Login Form</i></h1>
                <div className="login-adjust">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={lemail} onChange={this.inputname} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={lpass} onChange={this.inputpass} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button className="login-button" variant="danger" size="lg" type="submit" onClick={this.loggedin}>
                            Login
                        </Button>
                        <Form.Text className="text-muted small-button">
                            Not a member yet, <a href="/signup">Sign Up</a> now
                        </Form.Text>
                    </Form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        changeLogin:(name,email)=>{dispatch({type:'LOGIN',username:name,useremail:email})}
    }
}
export default connect(null,mapDispatchToProps)(Login)