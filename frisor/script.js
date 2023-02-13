const header = document.getElementById("imgHeader");
let images = [
  ["img/img1.webp", "Boka tid"],
  ["img/img2.webp", "Image 2"],
  ["img/img3.webp", "Image 3"],
  ["img/img4.webp", "Färga håret?"],
];
let index = 0;

function imgHeaderLoop() {
  console.log(index);
  //Kolla om vi är större än längden av images
  if (index >= images.length || index < 0) {
    index = 0;
  }
  //Hämta bilden från index.
  console.log(images[index][0]);
  header.style.backgroundImage = `url(${images[index][0]})`;
  for (const child of header.children) {
    if (child.tagName === "H1") {
      child.innerText = images[index][1];
    }
  }
  //Lägg till en på index.
  index++;
  //Sätt en timeout på 5 sekunder (5000ms)
  setTimeout(imgHeaderLoop, 5000);
}

/*
Improvise, adapt, overcome.
*/
function fixImages(url) {
  /*
    Om vi är vi "hem" (dvs inte contact el. bokning), gör inget.
    Om vi inte är där, lägg till "../".
  */
  if (
    !(
      window.location.pathname.includes("about") ||
      window.location.pathname.includes("bokning") ||
      window.location.pathname.includes("contact")
    )
  ) {
    return url;
  } else {
    return `../${url}`;
  }
}
for (let i = 0; i < images.length; i++) {
  let element = images[i][0];
  element = fixImages(element);
  images[i][0] = element;
}
console.log(images);
imgHeaderLoop();

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
  constructor(id, name, items) {
    this.id = id;
    this.name = name;
    this.items = items;
  }

  AddToCart(item) {
    this.items.push(item);
  }

  RemoveFromCart(item) {
    if (item in this.items) {
      this.items.pop();
    }
    console.log(this.items);
    this.CreateCartAsElements();
  }

  ReturnCart() {
    return this.items;
  }

  CreateCartAsElements() {
    cartElement.innerHTML = ``;
    if (this.items.length > 0) {
      for (const item of this.items) {
        const a = document.createElement("li");
        a.innerText = `${item.ToString()}`;
        a.classList.add("dropdown-item");
        a.onclick = () => {
          this.RemoveFromCart(item);
        };
        cartElement.appendChild(a);
      }
    } else {
      console.log(this.name);
    }
  }
}
const newCart = new cart(0, "test", []);
newCart.AddToCart(new cartItem(0, "test", 5));
newCart.AddToCart(new cartItem(0, "Test 2", 15));
newCart.CreateCartAsElements();
