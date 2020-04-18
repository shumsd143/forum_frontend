import React from 'react'
import Eachblog from './Eachblog'
import './blogdetail.css'

class Blog extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.searchvalueinprops)
        this.state={
            data:this.props.blogjson
        }
    }
    changedata=(searchvalue)=>{
        let data=this.state.data
        let newdata=data.filter(eve=>{
            let title=eve.title.toLowerCase()
            let url=searchvalue.toLowerCase()
            if(title.includes(url)===true){
                console.log(title)
                return eve
            }
        })
        return newdata
    }
    render(){
        let data=this.changedata(this.props.searchvalueinprops)
        return (
            <div className="container">
                <div className="inside-container">
                    {data.map(el=>
                        <Eachblog bloginfo={el} id={el._id}/>
                    )}
                </div>
            </div>
        )
    }
}
export default Blog