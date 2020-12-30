function placeOrder() {
  if (!validateName() || !validateEmail() || !validatePhone()) {
    // show some error toast
    return false;
  }

  $("#placeOrderModal").modal("hide");
  showLoader();
  ls = window.localStorage;
  var orders = JSON.parse(ls.getItem("orders"));

  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "S=spreadsheet_forms=G9R1HU8340A6yWhl3AtMxeIogU237I6iNTXOQJXfLwg; NID=205=EPEV8OyqHR7w9xjGpttBCSgm_O_RJRs1DleToXNZsrNxrIMJa0MlOMk5P5OqPCsr5YsnnqyQpU1BCzs87nfLYNykvyI5xAx_U2dEEoSiw7RvTT81roOinVcFsS5GprFi2gznzsvx9n1rApeN9N5Nq7mqP4LIy0_VGCkvhYhWocw"
  );

  var fetchArray = [];
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    var formdata = new FormData();
    const name = $("#name")[0].value;
    const email = $("#email")[0].value;
    const number = $("#phone")[0].value;
    const address = $("#address")[0].value;
    formdata.append("entry.608936030", name);
    formdata.append("entry.1873240596", email);
    formdata.append("entry.697626103", number);
    formdata.append("entry.1096580917", address);
    formdata.append("entry.1649099998", order.itemName);

    var walnutQty = order.varities["Walnut"];
    var vanillaQty = order.varities["Vanilla"];
    var greenAppleQty = order.varities["Green Apple"];
    var cocoaButterQty = order.varities["Cocoa Butter"];
    var roseQty = order.varities["Rose"];
    var sandalwoodAmberQty = order.varities["Sandalwood Amber"];

    walnutQty && formdata.append("entry.408696562", walnutQty);
    vanillaQty && formdata.append("entry.1257950400", vanillaQty);
    greenAppleQty && formdata.append("entry.1856202983", greenAppleQty);
    cocoaButterQty && formdata.append("entry.2009171366", cocoaButterQty);
    roseQty && formdata.append("entry.919569271", roseQty);
    sandalwoodAmberQty &&
      formdata.append("entry.889679725", sandalwoodAmberQty);

    var requestOptions = {
      method: "POST",
      mode: "no-cors",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetchArray.push(
      fetch(
        "https://docs.google.com/forms/u/3/d/e/1FAIpQLSc4kS7CfhvcaSULynDPDqX9qM-96QR8AdVYYdha5v0rZhpZqw/formResponse",
        requestOptions
      )
    );
  }
  Promise.all(fetchArray)
    .then((response) => {
      success();
    })
    .catch(() => {
      error();
    });
}

document.getElementById("place_order").addEventListener("click", placeOrder);
