const token = JSON.parse(localStorage.getItem("token")) || "";
const baseurl = "http://localhost:8080";
const role = JSON.parse(localStorage.getItem("role")) || "";
console.log(role);
if (!token || role !== "doctor") {
  alert("Please Login");
  window.location.href = "login.html";
}

console.log(token);

getDoctorInfo();
async function getDoctorInfo() {
  fetch(`${baseurl}/user/data`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayProfile(data.data);
    })
    .catch((err) => console.log(err));
}

function displayProfile(data) {
  const user_info_div = document.getElementById("doctor_info");
  user_info_div.innerHTML = null;
  user_info_div.append(userCard(data));
}

function userCard(data) {
  const card = document.createElement("div");
  card.className = "card";
  const img_div = document.createElement("div");
  img_div.className = "card_img_div";
  const img = document.createElement("img");
  img.src = data.img;
  img.className = "card_img";
  img_div.append(img);

  const info_div = document.createElement("div");
  info_div.className = 'info_div'
  const name = document.createElement("h1");
  name.innerText = `Dr ${data.name}`;
  const age = document.createElement("p");
  age.innerText = `Age : ${data.age}`;
  const email = document.createElement("p");
  email.innerText = `Email : ${data.email}`;
  const contact = document.createElement("p");
  contact.innerText = `Contact : ${data.contact_info}`;
  const gender = document.createElement("p");
  gender.innerText = `Gender : Male`;
  const availability_div = document.createElement("div");
  const availability = document.createElement("p");
  availability_div.className = 'availability'
  if (data.availability == "available") {
    availability.innerText = "Available";
    availability.style.color = "green";
  } else {
    availability.innerText = "Not available";
    availability.style.color = "red";
  }
  const change = document.createElement("button");
  change.innerText = "Change Availability";
  change.addEventListener("click", () => {
    change_availability(data.availability);
  });
  info_div.append(name, age, email, contact, gender);
  availability_div.append(availability, change);
  card.append(img_div, info_div, availability_div);
  return card;
}

appointmentData();

async function appointmentData() {
  fetch(`${baseurl}/appointments/user`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayAppointments(data.appointments);
    })
    .catch((err) => console.log(err));
}

function displayAppointments(data) {
  const appointment_container = document.getElementById("appointments");
  appointment_container.innerHTML = null;
  const h1 = document.createElement("h1");
  h1.innerText = "Appointments";
  appointment_container.append(h1);
  data.forEach(async (item) => {
    console.log(item);
    const patientData = await get_userData(item.patient);

    const card = document.createElement("div");
    card.className = "card";
    const div1 = document.createElement("div");
    div1.className = "card-div1";
    const img = document.createElement("img");
    img.src = patientData.user.img;
    img.className = "div1-img";
    div1.append(img);
    const div2 = document.createElement("div");
    div2.className = "card-div2";
    const patient = document.createElement("h2");
    patient.innerText = patientData.user.name;
    const date = document.createElement("p");
    date.innerText = `Date - ${item.date.split("T")[0]}`;
    const start = document.createElement("p");
    start.innerText = `Start - ${item.start_time}`;
    const end = document.createElement("p");
    end.innerText = `End - ${item.end_time}`;
    div2.append(patient, date, start, end);
    const div3 = document.createElement("div");
    div3.className = "card-div3";
    const status = document.createElement("p");
    status.innerText = item.status;
    if (item.status == "scheduled") {
      status.style.color = "green";
    } else {
      status.style.color = "red";
    }
    div3.append(status);
    if (item.status == "scheduled") {
      const cancel = document.createElement("button");
      cancel.innerText = "Cancel";
      cancel.className = "cancel";
      cancel.addEventListener("click", () => {
        cancel_appointment(item._id);
      });
      div3.append(cancel);
    }
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "Delete";
    delete_btn.className = "delete";
    delete_btn.addEventListener("click", () => {
      delete_appointment(item._id);
    });
    div3.append(delete_btn);
    card.append(div1, div2, div3);
    appointment_container.append(card);
  });
}

async function cancel_appointment(id) {
  let res = await fetch(`${baseurl}/appointments/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "cancelled",
    }),
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  });

  appointmentData();
}

async function delete_appointment(id) {
  console.log(id);
  let res = await fetch(`${baseurl}/appointments/delete/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  appointmentData();
}

async function get_userData(id) {
  const res = await fetch(`${baseurl}/user/userData/${id}`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
}

async function change_availability(availability) {
  let change = availability;
  console.log(change);
  if (change == "available") {
    change = "not_available";
  } else {
    change = "available";
  }
  await fetch(`${baseurl}/user/update`, {
    method: "PATCH",
    body: JSON.stringify({
      availability: change,
    }),
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  });

  getDoctorInfo();
}
