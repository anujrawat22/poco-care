//get elements
const patient_btn = document.getElementById("patient_btn")
const doctor_btn = document.getElementById("doctor_btn")
const patient_div = document.getElementById("patient")
const doctor_div = document.getElementById("doctor")
const patient_form = document.getElementById("patient_form")
const doctor_form = document.getElementById("doctor_form")
const baseurl = "http://localhost:8080"




//eventlistener
patient_form.addEventListener("submit",patientSignup)

doctor_form.addEventListener("submit",doctorSignup)

patient_btn.addEventListener("click",()=>{
    doctor_div.style.display = 'none'
    patient_div.style.display = 'block'
})

doctor_btn.addEventListener("click",()=>{
    doctor_div.style.display = 'block'
    patient_div.style.display = 'none'
})



// functions


async function patientSignup(e){
    e.preventDefault()
    const form = document.getElementById("patient_form")
 const body = {
    name : form.patient_name.value,
    email : form.patient_email.value,
    age : +form.patient_age.value,
    contact_info : form.patient_contact.value,
    password : form.patient_password.value,
    gender : form.user_gender.value,
    img : form.img.value,
    role : 'patient'
 }
console.log(body)
 const res = await fetch(`${baseurl}/user/register`,{
    method : "POST",
    body : JSON.stringify(body),
    headers : {
        'content-type' : 'application/json'
    }
 })
const data =await res.json()
if(data.msg=="User registered successfully"){
    window.location.href = "login.html"
}else{
    alert(data.msg)
}
}


async function doctorSignup(e){
e.preventDefault()
const form = document.getElementById("doctor_form")

const body = {
    name : form.doctor_name.value,
    email : form.doctor_email.value,
    age : +form.doctor_age.value,
    contact_info : form.contact.value,
    specialties : form.speciality.value,
    bio : form.bio.value,
    img : form.img.value,
    gender : form.doc_gender.value,
    password : form.password.value,
    role : 'doctor',
    availability : "available"
}


 const res = await fetch(`${baseurl}/user/register`,{
    method : "POST",
    body : JSON.stringify(body),
    headers : {
        'content-type' : 'application/json'
    }
 })
const data =await res.json()
if(data.msg=="User registered successfully"){
    alert("SignUp successful")
    window.location.href = "login.html"
}else{
    alert(data.msg)
}
}