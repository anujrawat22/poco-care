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
        displayProfile(data.data)
    })
    .catch(err => console.log(err))
}

function displayProfile(data){

const user_info_div = document.getElementById("user_info")
user_info_div.innerHTML = null
user_info_div.append(userCard(data))
}

function userCard(data){
    const card = document.createElement('div')
    card.className = 'card'
    const img_div = document.createElement("div")
    img_div.className = 'card_img_div'
    const img = document.createElement("img")
    img.src = data.img
    img.className = 'card_img'
    img_div.append(img)

    const info_div = document.createElement("div")
    const name = document.createElement("h1")
    name.innerText = data.name
    const age = document.createElement("p")
    age.innerText = `Age : ${data.age}`
    const email = document.createElement("p")
    email.innerText = `Email : ${data.email}`
    const contact = document.createElement("p")
    contact.innerText = `Contact : ${data.contact_info}`
    const gender = document.createElement("p")
    gender.innerText = `Gender : Male`
 

    info_div.append(name,age,email,contact,gender)
    card.append(img_div,info_div)
    return card
}

appointmentData()

async function appointmentData(){
  fetch(`${baseurl}/appointments/user`,{
    headers : {
        authorization : `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
   
    displayAppointments(data.appointments)})
  .catch(err => console.log(err))
}

function displayAppointments(data){
    const appointment_container = document.getElementById("appointments")
    appointment_container.innerHTML = null;
   data.forEach((item)=>{
    const card = document.createElement("div")
    card.className = 'card'
    
   })
   
}