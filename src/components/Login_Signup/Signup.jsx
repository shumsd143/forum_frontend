import React from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from "axios";

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            confirmpassword:"",
        }
    }
    onsubmit=(e)=>{
        this.props.history.push('/login')
        e.preventDefault()
    }
    changefirstname=(e)=>{
        this.setState({
            firstname:e.target.value
        })
    }
    changesecondname=(e)=>{
        this.setState({
            lastname:e.target.value
        })
    }
    changeemail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    changepassword=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    changeconfirmpass=(e)=>{
        this.setState({
            confirmpassword:e.target.value
        })
    }
    onsubmit=(event)=>{
        event.preventDefault()
        if(this.state.email==='' || this.state.firstname==='' || this.state.lastname==='' || this.state.password==="" || this.state.confirmpassword===""){
            alert("Please fill the form, fields are empty")
            return
        }
        var checkpass=this.state.password
        if(checkpass.length<8){
            alert('password should have atleast 8 characters')
            return
        }
        if(this.state.password!==this.state.confirmpassword){
            alert('password are not matching')
            return
        }
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(this.state.email) === false)
        {
            alert('please enter a valid email')
            return
        }
        var data={
            'name':this.state.firstname+' '+this.state.lastname,
            'password':this.state.password,
            'email':this.state.email
        }
        fetch('https://forumbacken.herokuapp.com/user/validity/'+this.state.email)
        .then(res=>res.json())
        .then(json=>{
            if(json.presence===false){        
                axios.post('https://forumbacken.herokuapp.com/user',data).then(res=>{
                    this.props.history.push('/login');
                })
            }
            else{
                alert('E-mail is already registered')
                return
            }
        })
    }
    render(){
        let {firstname,lastname,email,password,confirmpassword} = this.state
        return (
            <div>
                <h1 className="login-head"><i>Signup Form</i></h1>
                <div className="login-adjust">
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Control type="text" placeholder="First name" value={firstname} onChange={this.changefirstname}/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="Last name" value={lastname} onChange={this.changesecondname}/>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={this.changeemail}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Row>
                                <Col>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={this.changepassword}/>
                                </Col>
                                <Col>
                                    <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={this.changeconfirmpass}/>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button className="signup-button" variant="danger" size="lg" type="submit" onClick={this.onsubmit}>
                            Create Account
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Signup