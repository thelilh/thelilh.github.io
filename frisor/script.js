const header = document.getElementById("imgHeader");
const phoneNumber = document.querySelector("#randomNumber");
const headerClick = document.getElementById("headerClick");
const headerLink = document.getElementById("headerLink");
const existingItems = document.getElementById("existingItemsUl");
let images = [
  ["img/img1.webp", "Boka tid", "/bokning"],
  ["img/img2.webp", "Om Saxalagom", "/about"],
  ["img/img3.webp", "Kontakta oss", "/contact"],
];
let index = 0;

function imgHeaderLoop() {
  if (
    !(
      window.location.pathname.includes("about") ||
      window.location.pathname.includes("bokning") ||
      window.location.pathname.includes("contact")
    )
  ) {
    header.style.backgroundImage = `url(img/img1.webp)`;
  } else {
    header.style.backgroundImage = `url(../img/img1.webp)`;
  }
}

/*
Random Number
*/
if (typeof phoneNumber != "undefined" && phoneNumber != null) {
  phoneNumber.innerText = randomPhoneNumber();
}

function randomPhoneNumber() {
  let tmpArray = [
    "071-979 64 91",
    "079-954 76 44",
    "071-004 36 36",
    "071-911 24 63",
    "071-829 03 81",
    "071-420 69 30",
  ];
  let min = 0;
  let max = tmpArray.length;
  let num = tmpArray[Math.floor(Math.random() * (max - min)) + min];
  return num;
}
/*
Kundvagn
*/
const cartElement = document.querySelector("#cart");
class cartItem {
  constructor(id, name, cost) {
    this.id = id;
    this.name = name;
    this.cost = cost;
  }

  ToString() {
    return `${this.name} - ${this.cost}`;
  }
}
class cart {
  constructor() {
    this.existingItems = [
      new cartItem(0, "Herrklippning (30 min)", 200),
      new cartItem(1, "Herrklippning (60 min)", 250),
      new cartItem(2, "Herrklippning (90 min)", 300),
      new cartItem(3, "Dammklippning (30 min)", 200),
      new cartItem(4, "Dammklippning (60 min)", 250),
      new cartItem(5, "Dammklippning (90 min)", 300),
      new cartItem(6, "Färgning/Blekning", 200),
    ];
    this.items = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
  }

  AddToCart(key) {
    this.items[key]++;
    this.CreateCartAsElements();
  }

  RemoveFromCart(key) {
    this.items[key]--;
    console.log(this.items);
    this.CreateCartAsElements();
  }

  ReturnCart() {
    return this.items;
  }

  TotalPrice() {
    let price = 0;
    for (let key in this.items) {
      if (this.items[key] > 0) {
        price += this.existingItems[key].cost * this.items[key];
      }
    }
    return price.toString();
  }

  AnyDictLargerThanZero() {
    for (var key in this.items) {
      if (this.items[key] > 0) {
        return true;
      }
    }
    return false;
  }

  CreateCartAsElements() {
    cartElement.innerHTML = ``;
    if (this.AnyDictLargerThanZero()) {
      for (let key in this.items) {
        if (this.items[key] > 0) {
          const p = document.createElement("p");
          p.innerText = `${this.existingItems[key].ToString()} x${
            this.items[key]
          }`;
          p.classList.add("dropdown-item");
          p.onclick = () => {
            this.RemoveFromCart(key);
          };
          cartElement.appendChild(p);
        }
      }
      const p = document.createElement("p");
      p.innerText = `Total Price: ${this.TotalPrice()}`;
      cartElement.appendChild(p);
    } else {
      const p = document.createElement("p");
      p.innerText = "Add something to your cart!";
      p.classList.add("dropdown-item");
      cartElement.appendChild(p);
    }

    //Existing Items
    if (existingItems != null && this.existingItems.length > 0) {
      existingItems.innerHTML = ``;
      for (const item of this.existingItems) {
        const li = document.createElement("li");
        li.innerText = `${item.ToString()}`;
        li.onclick = () => {
          this.AddToCart(item.id);
        };
        existingItems.appendChild(li);
      }
    }
  }
}
const newCart = new cart();
newCart.CreateCartAsElements();
