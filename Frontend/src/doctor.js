const token = JSON.parse(localStorage.getItem('token')) || ''

if(!token){
    alert("Please Login")
    window.location.href = 'login.html'
}