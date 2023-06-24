const token = JSON.parse(localStorage.getItem('token')) 
const baseurl = 'http://localhost:8080'
if(!token){
    alert("Please Login")
    window.location.href = 'login.html'
}
console.log(token)
getUserInfo()
async function getUserInfo(){
    fetch(`${baseurl}/user/data`,{
        headers : {
            authorization : `bearer ${token}`
        }
    }).then(res => res.json())
    .then(data =>{
        console.log(data)
    })
    .catch(err => console.log(err))
}