ls = window.localStorage;
ls.setItem("orders", "");
const order1 = {
  id: "order1",
  itemName: "Rose Small Candle",
  price: "10.00",
  varities: {
    Rose: 1,
    Vanilla: 3,
    Lavender: 5,
  },
  total: 90,
};

const order2 = {
  id: "order2",
  itemName: "Rose Medium Candle",
  price: "20.00",
  varities: {
    Rose: 2,
    Vanilla: 4,
    Lavender: 6,
  },
  total: 240,
};

const order3 = {
  id: "order3",
  itemName: "Rose Large Candle",
  price: "30.00",
  varities: {
    Rose: 2,
    Vanilla: 4,
    Lavender: 6,
  },
  total: 340,
};

orders = [order1, order2];

if (ls) {
  ls.setItem("orders", JSON.stringify(orders));
  const data = ls.getItem("orders");
  //console.log(JSON.parse(data));
} else {
  alert("plz use latest browser");
}
