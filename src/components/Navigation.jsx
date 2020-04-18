import React from 'react'
import './Navigation.css'
import {Navbar,Nav,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Navigation extends React.Component{
    constructor(props){
        super(props)
    }
    handleclick=(event)=>{
        if(window.confirm('Are you sure you want to logout')){
            this.props.changeName()
        }
        event.preventDefault()
    }
    render(){
        if(this.props.status===true){
            return (
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Link to="/"><Navbar.Brand>Forum</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <div>
                            <Navbar.Text className="modify-text-show">Hi, {this.props.myname}</Navbar.Text>
                            <Link to="/"><Button variant="info" onClick={this.handleclick}>Logout</Button></Link>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
        else{
            return (
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Link to="/"><Navbar.Brand>Forum</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <div>
                            <Link to="/signup"><Button className="modify-button-show" variant="outline-secondary">Signup</Button></Link>
                            <Link to="/login"><Button variant="info">Login</Button></Link>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
    }
}
const mapStateToprops = (state)=>{
    return {
        myname:state.name,
        status:state.login
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        changeName:()=>{dispatch({type:'LOGOUT'})}
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(Navigation)