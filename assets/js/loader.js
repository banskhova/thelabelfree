ls = window.localStorage;
localStorage.setItem("status", "");

function showLoader() {
  $("#loaderModal").modal("show");
}

function hideLoader() {
  $("#loaderModal").modal("show");
}

function hideLoader() {
  $("#loaderModal").modal("hide");
  $(".modal-backdrop").remove();
}

function success() {
  showToast("Order placed !! 🥳");
  hideLoader();
  resetOrders();
  update_Orders_EmtpyCart_Visibility();
}

function error() {
  showToast("Something went wrong !! 😞");
  hideLoader();
}

function showToast(msg) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.innerText = msg;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
