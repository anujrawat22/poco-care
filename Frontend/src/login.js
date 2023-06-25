

const login_form = document.getElementById("login_form")
const baseurl = "https://pococare-97y0.onrender.com"


login_form.addEventListener("submit",user_login)

async function user_login(event){
    
    event.preventDefault()
    const form = document.getElementById("login_form")
   const body ={
    email : form.email.value,
    password : form.password.value
   }
console.log(body)
   const res = await fetch(`${baseurl}/user/login`,
   {
    method : "POST",
    body : JSON.stringify(body),
    headers : {
        'content-type' : 'application/json'
    }
   })

   const data = await res.json()
   const token = data.token
   const role = data.role
   localStorage.setItem("token" , JSON.stringify(token))
   localStorage.setItem("role",JSON.stringify(role))
   if(token && role == 'patient'){
    window.location.href = "patient.html"
   }else if(token && role == 'doctor'){
    window.location.href = "doctor.html"
   }else if(token && role == 'admin'){
    window.location.href = ""
   }else{
    alert(data.msg)
   }

}