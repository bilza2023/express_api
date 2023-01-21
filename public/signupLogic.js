
function signupLogic(e){

try{

email = document.getElementById('emailInput').value;
password = document.getElementById('passwordInput').value;
password2 = document.getElementById('passwordInput2').value;
//..
if (!isValidEmail(email)) {throw new Error('Invalid email');}
const rez = isValidPassword(password);
if (rez.status == false){throw new Error(rez.message)}; 
if (!(password2 === password)) {throw new Error('both the password strings need to be identical');}
//////////////////////////////////////////////////////////
// ////////////////---axios////////////////
axios.post('http://localhost/signup', {email,password})
.then(function (response) {
  // alert(response.data.message);
   window.location.href = 'http://localhost/loginform'; //Here's my redirect - the router is listening for this route and will render accordingly
                
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
    if(/\s/.test(password)) {
      return { status: false, message: "Password must not contain any whitespace characters" }
    }
    if(password.length < 6) {
      return { status: false, message: "Password must be at least 6 characters long" }
    }
    return { status: true, message: "Password is valid" }
}
