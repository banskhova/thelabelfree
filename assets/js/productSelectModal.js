/* add to cart modal open logic */
$("#productSelectModal").on("show.bs.modal", function (event) {
  document.getElementById("product_quantity").value = "1";
  document.getElementById("exampleModalLongTitle").value = "test";

  console.log("inside modal listener......");
  let ls = window.localStorage;
  let fragnances = JSON.parse(ls.getItem("varities"));
  var fragnancesContainer = document.getElementById("fragnancesList");
  fragnancesContainer.innerHTML = "";
  for (var i = 0; i < fragnances.length; i++) {
    let div = document.createElement("div");
    div.className = "form-check form-check-inline";
    div.innerHTML = `
        <input class="form-check-input" type="radio" name="fragRadioOptions" id="fragRadio${i}" value="${i}" ${
      fragnances[i] === "Walnut" ? "checked" : null
    }>
        <label class="form-check-label" for="fragRadio${i}">${
      fragnances[i]
    }</label> 
    `;

    fragnancesContainer.appendChild(div);
  }
});

$("#productSelectModal").on("hide.bs.modal", function (event) {
  console.log("hide called");
  window.localStorage.setItem("selectedProduct", "");
});

/* add to cart modal button listener */
document
  .getElementById("addToCartBtnModal")
  .addEventListener("click", function () {
    console.log("add to cart clicked");
    var ls = window.localStorage;
    var orders = JSON.parse(ls.getItem("orders"));
    var products = JSON.parse(ls.getItem("products"));
    let fragnances = JSON.parse(ls.getItem("varities"));

    var radios = document.getElementsByName("fragRadioOptions");
    var selectedProductId = ls.getItem("selectedProduct");

    var selectedFragnance = 0;
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        selectedFragnance = radios[i].value;
        break;
      }
    }

    product_quantity = Number(
      document.getElementById("product_quantity").value
    );
    console.log({
      product_quantity,
      selectedFragnance,
      orders,
      selectedProductId,
      products,
    });

    const existingOrderIndex = _.findIndex(orders, { id: selectedProductId });
    console.log("existingOrderIndex", existingOrderIndex);
    var product = _.find(products, { id: selectedProductId });
    console.log("product", product);
    var selectedFragnance = fragnances[selectedFragnance];

    if (existingOrderIndex !== -1) {
      // product exits in cart
      var existingOrder = _.cloneDeep(orders)[existingOrderIndex];

      console.log("existingOrder", existingOrder);
      existingOrder.varities[selectedFragnance]
        ? (existingOrder.varities[selectedFragnance] += product_quantity)
        : (existingOrder.varities[selectedFragnance] = 1);
      existingOrder.total += existingOrder.price;
      console.log("order after countupdate", orders);
      var newOrders = _.cloneDeep(orders);
      // remove old product order data
      _.remove(newOrders, {
        id: existingOrder.id,
      });
      console.log("newOrders", newOrders);
      // update old order data with current state
      newOrders.push(existingOrder);
    } else {
      // newly added product i.e. doesnot exists in cart

      var order = {
        id: product.id,
        itemName: product.itemName,
        price: product.price,
        varities: { [selectedFragnance]: product_quantity },
        type: product.type,
        total: product.price * product_quantity,
      };
      console.log("new order", order);
      var newOrders = _.cloneDeep(orders);
      newOrders.push(order);
      console.log("else setting new orders", newOrders);
    }
    // refresh cart table

    ls.setItem(
      "orders",
      JSON.stringify(
        _.sortBy(newOrders, function (order) {
          return order.id;
        })
      )
    );
    updateTableLogic();
    updateOrderSummary();
    update_Orders_EmtpyCart_Visibility();
  });
