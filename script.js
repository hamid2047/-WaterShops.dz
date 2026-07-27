// ==========================
// Firebase
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDc2jyTOHm93pYrXbLLteOc_XPqu9J-x4k",
authDomain: "watershop-dz.firebaseapp.com",
projectId: "watershop-dz",
storageBucket: "watershop-dz.firebasestorage.app",
messagingSenderId: "354274691175",
appId: "1:354274691175:web:5391c1ffcb35735fa5acc2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================
// المنتجات
// ==========================

let products = [];

async function loadProducts(){

const querySnapshot = await getDocs(collection(db,"products"));

products = [];

querySnapshot.forEach((doc)=>{

products.push({
id:doc.id,
...doc.data()
});

});

displayProducts(products);

}

function displayProducts(list){

let box=document.getElementById("products-list");

if(!box) return;

box.innerHTML="";

list.forEach(product=>{

box.innerHTML+=`

<div class="product">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p>${product.price} دج</p>

<button onclick="addToCart('${product.id}')">
🛒 أضف للسلة
</button>

</div>

`;

});

}

loadProducts();

// ==========================
// السلة
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}

function addToCart(id){

let product = products.find(p=>p.id==id);

if(!product) return;

let item = cart.find(p=>p.id==id);

if(item){

item.quantity++;

}else{

cart.push({

...product,
quantity:1

});

}

saveCart();

updateCart();

alert("✅ تمت إضافة المنتج");

}

function updateCart(){

let box=document.getElementById("cart-items");

if(!box) return;

box.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total += item.price * item.quantity;

box.innerHTML += `

<div>

<b>${item.name}</b>

<br>

${item.price} دج

<br>

${item.quantity}

<button onclick="changeQuantity(${index},1)">+</button>

<button onclick="changeQuantity(${index},-1)">-</button>

<button onclick="removeItem(${index})">🗑️</button>

</div>

`;

});

document.getElementById("total").innerHTML=total;

document.getElementById("cart-count").innerHTML=

cart.reduce((s,i)=>s+i.quantity,0);

}

updateCart();

// ==========================
// تغيير الكمية
// ==========================

function changeQuantity(index,value){

cart[index].quantity += value;

if(cart[index].quantity <= 0){

cart.splice(index,1);

}

saveCart();

updateCart();

}

// ==========================
// حذف منتج
// ==========================

function removeItem(index){

cart.splice(index,1);

saveCart();

updateCart();

}

// ==========================
// البحث
// ==========================

function searchProducts(){

let text = document.getElementById("search").value.toLowerCase();

let result = products.filter(product =>

product.name.toLowerCase().includes(text)

);

displayProducts(result);

}

// ==========================
// الأقسام
// ==========================

function filterCategory(category){

if(category==="الكل"){

displayProducts(products);

return;

}

let result = products.filter(product=>

product.category===category

);

displayProducts(result);

}

// ==========================
// فتح وإغلاق السلة
// ==========================

function openCart(){

document.getElementById("cart").classList.add("active");

}

function closeCart(){

document.getElementById("cart").classList.remove("active");

}

// ==========================
// الوضع الليلي
// ==========================

function toggleMode(){

document.body.classList.toggle("dark");

}

// ==========================
// إتمام الطلب
// ==========================

function goCheckout(){

alert("سنربط الطلبات بـ Firebase في الخطوة القادمة.");

}