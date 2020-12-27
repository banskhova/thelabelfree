console.log("data", data);
let ls = window.localStorage;
ls.setItem("products", JSON.stringify(data.products));
ls.setItem("varities", JSON.stringify(data.varities));

function renderProducts() {
  let ls = window.localStorage;
  var products = JSON.parse(ls.getItem("products"));
  var varities = JSON.parse(ls.getItem("varities"));

  console.log("products", products);
  console.log("varities", varities);
  var productsContainer = document.getElementById("products_container");

  for (var i = 0; i < products.length; i++) {
    let product = products[i];
    console.log("product", i, product);
    var productDiv = document.createElement("div");

    productDiv.className = `col-lg-4 col-md-6  filter-app portfolio-item ${
      product.type === "candle" ? "filter-candles" : "filter-bars"
    }`;
    productDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${product.url}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.itemName}</h5>
                <p class="card-text">${product.description}.</p>
            </div>
            <div class="card-body mx-auto">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Add To Cart</button>
            </div>
        </div>
    `;
    productsContainer.appendChild(productDiv);
  }
}

renderProducts();
