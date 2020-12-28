ls = window.localStorage;
ls.setItem("orders", "");
const order1 = {
  id: "product1",
  itemName: "Small Scented Candle",
  price: 100,
  varities: {
    Walnut: 1,
    Vanilla: 3,
    "Sandalwood Amber": 5,
  },
  total: 900,
};

const order2 = {
  id: "product2",
  itemName: "Medium Scented Candle",
  price: 350,
  varities: {
    "Sandalwood Amber": 1,
  },
  total: 350,
};

orders = [];

if (ls) {
  ls.setItem("orders", JSON.stringify(orders));
  const data = ls.getItem("orders");
  //console.log(JSON.parse(data));
} else {
  alert("plz use latest browser");
}
