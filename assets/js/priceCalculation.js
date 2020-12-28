function updateOrderSummary() {
  var orderSubtotalDiv = document.getElementById("totalPrice");
  var orderSubtotal = 0;
  var orderTotalAmountDiv = document.getElementById("totalAmout");
  var orderTotalAmount = 0;
  console.log({ orderSubtotalDiv, orderTotalAmountDiv });
  var ls = window.localStorage;
  var orders = JSON.parse(ls.getItem("orders"));
  console.log("orders", orders);
  for (var i = 0; i < orders.length; i++) {
    orderSubtotal += orders[i].total;
  }

  if (orderSubtotalDiv && orderTotalAmountDiv) {
    console.log("object");
    orderSubtotalDiv.innerText = `Rs ${orderSubtotal}`;
    orderTotalAmountDiv.innerText = `Rs ${orderSubtotal + 50}`;
  }
}
