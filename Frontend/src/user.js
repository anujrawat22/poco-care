const token = JSON.parse(localStorage.getItem("token")) || "";

const model = document.getElementById("model")




if (!token) {
  alert("Please Login");
  window.location.href = "login.html";
}

const baseurl = "http://localhost:8080";
getData()
async function getData() {
  fetch(`${baseurl}/user/doctors`,{
    headers : {
        authorization : `bearer ${token}`
    }
  }).then((res) => res.json())
  .then((data) =>{
    console.log(data)
    display_data(data.doctors)
  } )
  .catch(err => console.log(err));
}

async function display_data(data) {
    const container = document.getElementById("container")
    container.innerHTML = null
    data.forEach((el)=>{
    container.append(card(el))
    })
}


function card(item){
  
    const card = document.createElement('div')
    card.className = 'card'
    const div1 = document.createElement("div")
    div1.className = 'card_div1'
    const img  = document.createElement("img")
    img.src = item.img
    img.className = 'card_img'
    const div2 = document.createElement("div")
    div2.className = 'card_div2'
     const name = document.createElement("h2")
     name.innerText = `Dr. ${item.name}`
     const specialties = document.createElement("p")
     specialties.innerText = 'Neurology'
     specialties.className = 'specialties'
    const div3 = document.createElement("div")
    div3.className = 'card_div3'
    const Book_btn = document.createElement("button")
    Book_btn.innerText = 'Book an Appointment'
    Book_btn.className = 'button'
    Book_btn.addEventListener("click",()=>{
        open_model(item)
    })
    div1.append(img)
    div2.append(name,specialties)
    div3.append(Book_btn)
    card.append(div1,div2,div3)
    return card
}

const date = document.getElementById("date")
const today_date = new Date().toJSON()
const day = today_date.split("T")[0]
date.min = day





function open_model(item){
  model.style.display = 'block'
  const info = document.getElementById("information")
  info.innerHTML = null
  const name = document.createElement("h1")
  name.innerText = `Dr. ${item.name}`
  const speciality = document.createElement("p")
  speciality.innerText = 'neurology'
  info.append(name,speciality)
  const button_div = document.getElementById("button_div")
 button_div.innerHTML = null
  const button = document.createElement("button")
  button.className = 'button'
  button.innerText ='Confirm Appointment'
  button.addEventListener("click",()=>{
    book_appointment(item)
  })
  button_div.append(button)
 
}

function close_model(){
model.style.display = 'none'
document.getElementById("date").value = null
document.getElementById("description").value = null
document.getElementById("time").value = null
}

async function book_appointment(item){
    
const doctor = item._id
const date = document.getElementById("date").value;
const description = document.getElementById("description").value;
const status = 'scheduled'
const time = document.getElementById("time").value
const start_time = time;
const time_0 = (+time.split(":")[0])+1
let end_time
if(time_0===12){
     end_time = `${time_0}:${time.split(":")[1].split("A")[0]}PM`
}else{
   end_time = `${time_0}:${time.split(":")[1]}`
}
    const body = {
      doctor,date,description,status,start_time,end_time
    }
    console.log(body)

    fetch(`${baseurl}/appointments/create`,{
        method : "POST",
        body : JSON.stringify(body),
        headers : {
            'content-type' : 'application/json',
            authorization : `bearer ${token}`
        }
    }).then(res => res.json())
    .then(data => {
        if(data.msg == 'Appointment created'){
            alert("Appointment created successfully")
            close_model()
        }else{
            alert("Please fill all details correctly")
        }
    })
    .catch(err=>
        console.log(err)
    )
}