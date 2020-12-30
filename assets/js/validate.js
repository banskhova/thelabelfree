function validateName() {
  var name = document.getElementById("name").value;
  if (name.length == 0) {
    showToast("Name can't be blank");
    return false;
  }
  if (!name.match(/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/)) {
    showToast("Please enter your correct name"); //Validation Message
    return false;
  }
  return true;
}

function validatePhone() {
  var phone = document.getElementById("phone").value;
  if (phone.length == 0) {
    showToast("Phone number can't be blank"); //Validation Message
    return false;
  }

  if (!phone.match(/^[0]?[789]\d{9}$/)) {
    showToast("Please enter a correct phone number"); //Validation Message
    return false;
  }

  return true;
}

function validateEmail() {
  var email = document.getElementById("email").value;
  if (email.length == 0) {
    showToast("Email can't be blank"); //Validation Message
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    showToast("Please enter a correct email address"); //Validation Message
    return false;
  }

  return true;
}
