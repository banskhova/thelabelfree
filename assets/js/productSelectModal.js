/* add to cart modal open logic */
$("#productSelectModal").on("show.bs.modal", function (event) {
  document.getElementById("product_quantity").value = "1";
  document.getElementById("exampleModalLongTitle").value = "test";

  let ls = window.localStorage;
  let fragnances = JSON.parse(ls.getItem("varities"));
  var fragnancesContainer = document.getElementById("fragnancesList");
  fragnancesContainer.innerHTML = "";
  fragnancesContainer.classList.add("col");
  for (var i = 0; i < fragnances.length; i++) {
    let div = document.createElement("div");
    div.className = "form-check form-check-inline col-12";
    div.innerHTML = `
    <label class="form-check-label" for="fragRadio${i}"><input class="form-check-input" type="radio" name="fragRadioOptions" id="fragRadio${i}" value="${i}" ${
      fragnances[i] === "Walnut" ? "checked" : null
    }>${fragnances[i]}
    </label> 
    `;

    fragnancesContainer.appendChild(div);
  }
});

$("#productSelectModal").on("hide.bs.modal", function (event) {
  window.localStorage.setItem("selectedProduct", "");
});

/* add to cart modal button listener */
document
  .getElementById("addToCartBtnModal")
  .addEventListener("click", function () {
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

    const existingOrderIndex = _.findIndex(orders, { id: selectedProductId });
    var product = _.find(products, { id: selectedProductId });
    var selectedFragnance = fragnances[selectedFragnance];

    if (existingOrderIndex !== -1) {
      // product exits in cart
      var existingOrder = _.cloneDeep(orders)[existingOrderIndex];

      existingOrder.varities[selectedFragnance]
        ? (existingOrder.varities[selectedFragnance] += product_quantity)
        : (existingOrder.varities[selectedFragnance] = 1);
      existingOrder.total += existingOrder.price;
      var newOrders = _.cloneDeep(orders);
      // remove old product order data
      _.remove(newOrders, {
        id: existingOrder.id,
      });
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
      var newOrders = _.cloneDeep(orders);
      newOrders.push(order);
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
