
function loginLogic(e){

try{

email = document.getElementById('emailInput').value;
password = document.getElementById('passwordInput').value;
//..
if (!isValidEmail(email)) {throw new Error('Invalid email');}
const rez = isValidPassword(password);

if (rez.status == false){throw new Error(rez.message)}; 

//////////////////////////////////////////////////////////
// ////////////////---axios////////////////
axios.post('http://localhost/signin', {email,password})
.then(function (response) {
// console.log(response);
  // alert(response.data.message);
   window.location.href = 'http://localhost/'; //Here's my redirect - the router is listening for this route and will render accordingly
// return res.status(200).json({"message": "login success"});                
})

.catch(function (error) {
// console.log(error);
// console.log(error.message);
alert(error.response.data.message);
      // console.log(error.data.message);
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
