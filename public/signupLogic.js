
function signupLogic(e){

try{

email = document.getElementById('emailInput').value;
password = document.getElementById('passwordInput').value;
//..
// if (!isValidEmail(email)) {throw new Error('Invalid email');}
// const rez = isValidPassword(password);
// if (rez.status == false){throw new Error(rez.message)}; 
//////////////////////////////////////////////////////////
// ////////////////---axios////////////////
axios.post('http://localhost/signup', {email,password})
.then(function (response) {
  alert(response.data.message);
})

.catch(function (error) {
  const err = JSON.parse(error.request.responseText).message;
      alert(err);
});

//////////////////////////////////////////////////////////
}catch(error) {
    alert(error);
}


}//function ends

/////////////////////////////////////////////////////////
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

////////////////////////////////////////////////////////////////////////
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9-_.]{8,})$/;
  if (!passwordRegex.test(password)) {
    return { status: false, message: "Password must contain at least 8 characters, including one letter and one number, and can also contain special characters" }
  }
  if(/\s/.test(password)) {
    return { status: false, message: "Password must not contain any whitespace characters" }
  }
  return { status: true, message: "Password is valid" }
}