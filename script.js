// =========================
// قاعدة المنتجات
// =========================

let products = JSON.parse(localStorage.getItem("products")) || [

{
id:1,
name:"ساعة فاخرة",
category:"إكسسوارات",
price:4500,
image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d",
rating:5,
description:"ساعة أنيقة مناسبة لكل المناسبات"
},


{
id:2,
name:"عطر فاخر",
category:"عطور",
price:6000,
image:"https://images.unsplash.com/photo-1541643600914-78b084683601",
rating:5,
description:"عطر برائحة جذابة وثبات ممتاز"
},


{
id:3,
name:"هاتف ذكي",
category:"إلكترونيات",
price:35000,
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
rating:4,
description:"هاتف عصري بأداء قوي"
},


{
id:4,
name:"قميص أنيق",
category:"ملابس",
price:3000,
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
rating:5,
description:"قميص بجودة عالية"
}

];

if(!localStorage.getItem("products")){
localStorage.setItem(
"products",
JSON.stringify(products)
);
}




// =========================
// السلة
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];




// عرض المنتجات

function displayProducts(list = products){

let box = document.getElementById("products-list");

if(!box) return;


box.innerHTML="";


list.forEach(product=>{


box.innerHTML += `

<div class="product">


<img src="${product.image}">


<h3>${product.name}</h3>


<p>${product.category || ""}</p>


<div class="rating">

${"⭐".repeat(product.rating)}
<span>(${product.rating}/5)</span>

</div>


<button onclick="location.href='product.html?id=${product.id}'">
👁️ عرض التفاصيل
</button>

<button onclick="event.stopPropagation(); addToCart(${product.id})">
🛒 أضف للسلة
</button>


</div>

`;


});


}



displayProducts();






// إضافة للسلة

function addToCart(id){


let product =
products.find(p=>p.id===id);



let item =
cart.find(p=>p.id===id);



if(item){

item.quantity++;

}

else{

cart.push({

...product,
quantity:1

});

}


saveCart();

updateCart();

showToast("✅ تمت إضافة المنتج إلى السلة");

}







// تحديث السلة

function updateCart(){


let box =
document.getElementById("cart-items");


if(!box) return;


box.innerHTML="";


let total=0;


cart.forEach((item,index)=>{


total += item.price * item.quantity;



box.innerHTML += `

<div>


<strong>${item.name}</strong>

<br>

${item.price} دج

<br>

الكمية:
<button onclick="changeQuantity(${index},-1)">-</button>

${item.quantity}

<button onclick="changeQuantity(${index},1)">+</button>


<br>

<button onclick="removeItem(${index})">

حذف

</button>


</div>

`;


});



let totalBox=document.getElementById("total");

if(totalBox){
totalBox.innerHTML=total;
}


let count=document.getElementById("cart-count");

if(count){
count.innerHTML =
cart.reduce((sum,item)=>sum+item.quantity,0);
}

}


// تغيير الكمية

function changeQuantity(index,value){


cart[index].quantity += value;


if(cart[index].quantity <=0){

cart.splice(index,1);

}


saveCart();

updateCart();

showToast("تم تغيير الكمية  ✅");

}





// حذف

function removeItem(index){

cart.splice(index,1);

saveCart();

updateCart();

showToast("🗑️ تم حذف المنتج من السلة");

}





// حفظ السلة

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}





// فتح وإغلاق السلة

function openCart(){

let cartBox = document.getElementById("cart");

if(cartBox){
cartBox.classList.add("active");
}

}


function closeCart(){

let cartBox = document.getElementById("cart");

if(cartBox){
cartBox.classList.remove("active");
}

}






// البحث

function searchProducts(){


let value =
document.getElementById("search").value
.toLowerCase();


let result =
products.filter(product=>

product.name.toLowerCase()
.includes(value)

);


displayProducts(result);


}






// إرسال واتساب

function sendWhatsApp(){


if(cart.length===0){

showToast("⚠️ السلة فارغة");

return;

}



let name =
document.getElementById("customer-name").value;


let address =
document.getElementById("customer-address").value;



let message =
"💧 Water Shop\n🛒 طلب جديد\n\n";


message +=
"👤 الاسم: "+name+"\n";


message +=
"📍 العنوان: "+address+"\n\n";


message +=
"📦 المنتجات:\n";



let total=0;


cart.forEach(item=>{


message +=

"- "+item.name+
" × "+item.quantity+
" = "+
(item.price*item.quantity)+
" دج\n";


total += item.price*item.quantity;


});


message +=

"\n💰 المجموع: "+
total+
" دج";



window.open(

"https://wa.me/213778196483?text="+
encodeURIComponent(message)

);


}



updateCart();
function filterCategory(category){

let result = products.filter(product =>
product.category === category
);

displayProducts(result);

}
function goCheckout(){

    if(cart.length === 0){

showToast("⚠️ السلة فارغة");

        return;

    }

    window.location.href = "checkout.html";

}

function openProduct(id){

window.location.href =
"product.html?id=" + id;

}

function showToast(message){

let toast =
document.getElementById("toast");

toast.innerHTML = message;

toast.classList.add("show");

setTimeout(function(){

toast.classList.remove("show");

},2500);

}