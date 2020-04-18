const iState = {
    name:"",
    login:false,
    email:""
}
if(sessionStorage.getItem('forum_name')){
    iState.name=sessionStorage.getItem('forum_name')
    iState.email=sessionStorage.getItem('forum_email')
    iState.login=true
}

const reducer =(state=iState,action)=>{
    if(action.type==='LOGOUT'){
        sessionStorage.removeItem('forum_name')
        sessionStorage.removeItem('forum_email')
        return {
            name:"",
            login:false,
            email:""
        }
    }
    if(action.type==='LOGIN'){
        sessionStorage.setItem('forum_name',action.username)
        sessionStorage.setItem('forum_email',action.useremail)
        console.log(sessionStorage.getItem('forum_name'),sessionStorage.getItem('forum_email'))
        return {
            name:action.username,
            login:true,
            email:action.useremail
        }
    }
    return state
}

export default reducer