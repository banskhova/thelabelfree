function update_Orders_EmtpyCart_Visibility() {
  console.log("update visibility");
  ls = window.localStorage;
  var orders = JSON.parse(ls.getItem("orders"));
  console.log("orders", orders);
  const orders_grid_summary_div = document.getElementById(
    "orders_grid_summary"
  );
  const emtpy_cart_div = document.getElementById("emtpy_cart");
  console.log({ orders_grid_summary_div, emtpy_cart_div });
  if (orders.length) {
    emtpy_cart_div.style.display = "none";
    orders_grid_summary_div.style.display = "block";
    return;
  }

  emtpy_cart_div.style.display = "block";
  orders_grid_summary_div.style.display = "none";
}

update_Orders_EmtpyCart_Visibility();
