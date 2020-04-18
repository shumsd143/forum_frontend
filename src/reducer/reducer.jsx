const iState = {
    name:"",
    login:false,
    email:""
}

const reducer =(state=iState,action)=>{
    if(action.type==='LOGOUT'){
        return {
            name:"",
            login:false,
            email:""
        }
    }
    if(action.type==='LOGIN'){
        return {
            name:action.username,
            login:true,
            email:action.useremail
        }
    }
    return state
}

export default reducer