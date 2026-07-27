import { db, storage } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

async function saveProduct(){

const name = document.getElementById("name").value;

const category = document.getElementById("category").value;

const price = Number(document.getElementById("price").value);

const description = document.getElementById("description").value;

const rating = Number(document.getElementById("rating").value);

const file = document.getElementById("image").files[0];

if(!file){

alert("اختر صورة");

return;

}

const storageRef = ref(storage, "products/" + Date.now() + "_" + file.name);

await uploadBytes(storageRef, file);

const imageUrl = await getDownloadURL(storageRef);

await addDoc(collection(db, "products"), {

name: name,
category: category,
price: price,
description: description,
rating: rating,
image: imageUrl

});

alert("✅ تم حفظ المنتج بنجاح");

location.reload();

}

window.saveProduct = saveProduct;