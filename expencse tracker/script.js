let loginFormVisible = false; // Variable to track the visibility of the login form
let signinFormVisible = false;

document.getElementById("loginButton").addEventListener("click", function() {
  const loginFormContainer = document.getElementById("loginFormContainer");

  if (!loginFormVisible) {
    loginFormContainer.style.display = "block";
    loginFormVisible = true;
  } else {
    loginFormContainer.style.display = "none";
    loginFormVisible = false;
  }
});

document.getElementById("signinButton").addEventListener("click", function() {
  const loginFormContainer = document.getElementById("signFormContainer");

  if (!signinFormVisible) {
    signFormContainer.style.display = "block";
    signinFormVisible = true;
  } else {
    signFormContainer.style.display = "none";
    signinFormVisible = false;
  }
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Redirect to the expense tracker page
  window.location.href = "index.html";
});
  