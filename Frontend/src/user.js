let token = JSON.parse(localStorage.getItem("token")) || "";
console.log(token)
let doc_email;
const model = document.getElementById("model");
const frontend_url  = 'http://127.0.0.1:5500/'
let url;
let roomId;

if (!token) {
  alert("Please Login");
  window.location.href = "login.html";
}

const baseurl = "http://localhost:8080";
getData();
async function getData() {
  fetch(`${baseurl}/user/doctors`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display_data(data.doctors);
    })
    .catch((err) => console.log(err));
}

async function display_data(data) {
  const container = document.getElementById("container");
  container.innerHTML = null;
  data.forEach((el) => {
    container.append(card(el));
  });
}

function card(item) {
  const card = document.createElement("div");
  card.className = "card";
  const div1 = document.createElement("div");
  div1.className = "card_div1";
  const img = document.createElement("img");
  img.src = item.img;
  img.className = "card_img";
  const div2 = document.createElement("div");
  div2.className = "card_div2";
  const name = document.createElement("h2");
  name.innerText = `Dr. ${item.name}`;
  const specialties = document.createElement("p");
  specialties.innerText = item.specialties;

  specialties.className = "specialties";
  const availability = document.createElement("p");
  const video = document.createElement("button");
  video.innerText = "Video Consultation";
  video.classList = "button";
  if (item.availability === "available") {
    availability.innerText = "Available";
    availability.style.color = "green";
  } else {
    availability.innerText = "Not  Available";
    availability.style.color = "red";
    video.disabled = true;
    video.className = "disabled";
  }
  const div3 = document.createElement("div");
  div3.className = "card_div3";
  const Book_btn = document.createElement("button");
  Book_btn.innerText = "Book an Appointment";
  Book_btn.className = "button";
  Book_btn.addEventListener("click", () => {
    open_model(item);
  });

  video.addEventListener("click", async () => {
    const response = confirm(
      "Are you sure you want an online video consultation "
    );
    if (response) {
      doc_email = item.email
      alert("An email has been sent to the doctor to join the meeting");
      make_videoCall(item);
    }
  });
  div1.append(img);
  div2.append(name, specialties, availability);
  div3.append(video, Book_btn);
  card.append(div1, div2, div3);
  return card;
}

const date = document.getElementById("date");
const today_date = new Date().toJSON();
const day = today_date.split("T")[0];
date.min = day;

function open_model(item) {
  model.style.display = "block";
  const info = document.getElementById("information");
  info.innerHTML = null;
  const name = document.createElement("h1");
  name.innerText = `Dr. ${item.name}`;
  const speciality = document.createElement("p");
  speciality.innerText = "neurology";
  info.append(name, speciality);
  const button_div = document.getElementById("button_div");
  button_div.innerHTML = null;
  const button = document.createElement("button");
  button.className = "button";
  button.innerText = "Confirm Appointment";
  button.addEventListener("click", () => {
    book_appointment(item);
  });
  button_div.append(button);
}

function close_model() {
  model.style.display = "none";
  document.getElementById("date").value = null;
  document.getElementById("description").value = null;
  document.getElementById("time").value = null;
}

async function book_appointment(item) {
  const doctor = item._id;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const status = "scheduled";
  const time = document.getElementById("time").value;
  const start_time = time;
  const time_0 = +time.split(":")[0] + 1;
  let end_time;
  if (time_0 === 12) {
    end_time = `${time_0}:${time.split(":")[1].split("A")[0]}PM`;
  } else {
    end_time = `${time_0}:${time.split(":")[1]}`;
  }
  const body = {
    doctor,
    date,
    description,
    status,
    start_time,
    end_time,
  };

  fetch(`${baseurl}/appointments/create`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.msg == "Appointment created") {
        alert("Appointment created successfully");
        close_model();
      } else {
        alert("Please fill all details correctly");
      }
    })
    .catch((err) => console.log(err));
}

async function make_videoCall(item) {
  fetch(`${baseurl}/video`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      roomId = data.roomId;
      window.location.href = `video.html?roomId=${roomId}`;
      url = `${frontend_url}/video.html?roomId=${roomId}`
      send_email(roomId)
    })
    .catch((err) => console.log(err));
}


async function send_email(id){
  fetch(`${baseurl}/email`,{
    method : "POST",
    body : JSON.stringify({
      email : doc_email,
      url 
    }),
    headers : {
      'content-type' : 'application/json',
      authorization : `bearer ${token}`
    } 
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
}


