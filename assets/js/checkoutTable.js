/*  
  //////////////    delete icon listener    
*/
function deleteIconListener(evt) {
  evt.stopPropagation();
  let td = evt.target.closest("td");
  let orderId = td.getAttribute("orderId");
  ls = window.localStorage;
  orders = JSON.parse(ls.getItem("orders"));
  let updatedOrders = _.cloneDeep(orders);

  _.remove(updatedOrders, function (order) {
    return order.id == orderId;
  });
  ls.setItem("orders", JSON.stringify(updatedOrders));
  // ls.setItem("orders", updatedOrders);
  updateTableLogic();
  updateOrderSummary();
  update_Orders_EmtpyCart_Visibility();
}

/*  
  //////////////    table update logic    
*/
function updateTableLogic() {
  let ls = window.localStorage;
  var orders = JSON.parse(ls.getItem("orders"));
  var tbdy = document.getElementById("checkoutTableBody");
  tbdy.innerHTML = "";
  for (var i = 0; i < orders.length; i++) {
    let order = orders[i];
    var tr = document.createElement("tr");
    tr.className = "checkoutTableRow";

    // td product column
    var td1 = document.createElement("td");
    td1.className = "border-0 align-middle";
    td1.setAttribute("scope", "row");
    td1.innerHTML = `
    <div class="">
        <div class="ml-1 d-inline-block align-middle">
             <a class="text-dark d-inline-block align-middle">${order.itemName}</a>
        </div>
    </div>
    `;

    // td price column
    var td2 = document.createElement("td");
    td2.className = "border-0 align-middle text-center";
    td2.setAttribute("scope", "row");
    td2.innerHTML = `
    <strong>${order.price}</strong>
    `;

    // td qty column
    var td3 = document.createElement("td");
    td3.className = "border-0 align-middle text-center";
    td3.setAttribute("scope", "row");

    var ul = document.createElement("ul");
    ul.className = "cartFragnances list-group";
    var varities = Object.keys(order.varities);

    for (k = 0; k < varities.length; k++) {
      var li = document.createElement("li");
      li.className =
        "ist-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${varities[k]}
        <span class="rounded-pill">${order.varities[varities[k]]}</span>
      `;
      ul.appendChild(li);
    }
    td3.appendChild(ul);

    // td total column
    var td4 = document.createElement("td");
    td4.className = "border-0 align-middle text-center";
    td4.setAttribute("scope", "row");
    td4.innerHTML = `
    <strong>${order.total}</strong>
  `;

    // td delete column
    var td5 = document.createElement("td");
    td5.className = "px-2 border-0 align-middle text-center";
    td5.setAttribute("scope", "row");
    td5.innerHTML = `
  <a class="text-dark">
    <i class="bx bxs-trash"></i>
  </a>
  `;
    td5.setAttribute("orderId", order.id);
    td5.addEventListener("click", deleteIconListener, false);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbdy.appendChild(tr);
  }
}
updateTableLogic();
