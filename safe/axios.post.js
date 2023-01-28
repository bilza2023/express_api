
axios.post('http://localhost/api/signup', {email,password})
.then(function (response) {
  // alert(response.data.message);
   window.location.href = 'http://localhost/loginform'; //Here's my redirect - the router is listening for this route and will render accordingly
                
})

.catch(function (error) {
  const err = JSON.parse(error.request.responseText).message;
      alert(err);
});
