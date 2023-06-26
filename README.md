

# Poco-care_assignment


# dependencies 
   * "bcrypt": "^5.1.0",
   * "cors": "^2.8.5",
   * "dotenv": "^16.3.1",
   * "express": "^4.18.2",
   * "jsonwebtoken": "^9.0.0",
   * "mongoose": "^7.3.1",
   * "nodemailer": "^6.9.3",
   * "nodemon": "^2.0.22",
   * "socket.io": "^4.7.0",
   * "uuid": "^9.0.0"

## A Doctor's Appointment Booking System - lets you register and Login and be able to view Doctors, book appointments and also delete appointments.



 # patient-dummy data : email : ritikverma@gmail.com  password : ritikverma
# doctor-dummy data : email : ar.16ce16@thdcihet.ac.in password : anujrawat

## You can use the above emails credentials to verify CRUD operations



### Features Implemented:
* Authentication - JWT-based token
* Register/Login - Doctors and Patients
* Logout using blacklist
* Patient - Book Appointment POST
* Patient - Edit Appointment PATCH
* Patient & Doctors - Delete Appointment DELETE
* Patients - Start Video call instantly with the Doctors available
* Doctors can toggle between Video call availability
* Nodemailer feature to let the Doctor know the video call link via email

## Flow of this Application:
*  Register as a Patient or Doctor
*  Login as Patient
*  View All Doctors
*  Book an appointment to any of the Doctor
*  Able to modify or delete a booked appointment
*  If Doctor has made Video call availability YES then patient can start a Video call
*  Once about to start, Video call meet link will be sent to Doctor of their email address
*  Doctor joins meet using the received meet link via email
*  Patient and Doctor can have a video chat in unique room
*  Able to start/stop video & mute/unmute audio
*  End video and back to Dashboard

*  Login as Doctor
*  Able to change Videocall availability
*  View appointments booked
*  Cancel appointments








# Backend deployed using RENDER https://pococare-97y0.onrender.com/








## API end points

api - https://pococare1.onrender.com/


| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | api/patients/signup | This endpoint allow Patients to register. | 201 |
| POST | api/patients/login | This endpoint allow Patients to login. | 201 |
| PATCH | api/patients/update/:id | To update user
| DELETE | api/patients/delete/:id | To delete user
| GET | api/patients/all | To get all users | 200
| POST | api/patients/logout | To log user out
| POST | api/doctors/signup | This endpoint allow Doctors to register. | 201 |
| POST | api/doctors/login | This endpoint allow Doctors to login. | 201 |
| PATCH | api/doctors/update/:id | To update user
| DELETE | api/doctors/delete/:id | To delete user
| GET | api/doctors/all | To get all users | 200
| POST | api/doctors/logout | To log user out
| GET | api/appointments/ | To get all appointments | 200
| POST | api/appointments/add | This endpoint allow patients to add appointment. | 201 |
| PATCH | api/appointments/update/:id | To update appointment
| DELETE | api/appointments/delete/:id | To delete appointment
| GET | api/appointments/docapp/:id | To get the appointments based on specific Doctor | 200
| GET | api/appointments/patapp/:id | To get the appointments based on specific Patient | 200



# Thanks for your time, have a nice day!!!!


