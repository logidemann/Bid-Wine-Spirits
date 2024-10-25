// Imports
import {set, update, read} from "./database.js";
import {set as setImg} from "./storage.js";


const reponse = await fetch("../../../Back_end/src/data/all-countries-cities.json")
const countries_cities = await reponse.json()

const title = document.getElementById('titre-annonce');
const type = document.getElementById('type-select');
const condition = document.getElementById('etat-select');
const price = document.getElementById('prix-input');

var file_path_value = null;
const file_path = document.getElementById('file');
file_path.addEventListener('change', (event) => {
    file_path_value = event.target.files[0]; 
  });

const countrys = document.getElementById('country');
const cities = document.getElementById('city');
const cp = document.getElementById('cp');
const end_date = document.getElementById('end-date');
const hand_delivered = document.getElementById('main-propre');
const delivery = document.getElementById('livraison');
const description = document.getElementById('description-produit');
const contact = document.getElementById('contact-input');
const year = document.getElementById('year');
const brand = document.getElementById('brand');

const submit = document.getElementById('submit');

hand_delivered.addEventListener('click', function(){
    delivery.checked = false;
});

delivery.addEventListener('click', function(){
    hand_delivered.checked = false;
});

countrys.options[0].disabled = true;
cities.options[0].disabled = true;

for(let country in countries_cities){
    var option = document.createElement('option');
    option.value = country;
    option.innerHTML = country;
    countrys.appendChild(option);
}

countrys.addEventListener('change', function(){
    cities.innerHTML = "";
    countries_cities[countrys.value].forEach(function(city){
        var option = document.createElement('option');
        option.value = city;
        option.innerHTML = city;
        cities.appendChild(option);
    });
});

read("/users/"+localStorage.getItem('uid'))
.then((data) => {
    contact.value = data.tel;
});

submit.addEventListener('click', create_bid);

function create_bid(){
    const title_value = title.value;
    const type_value = type.value;
    const condition_value = condition.value;
    const price_value = price.value;
    const country_value = countrys.value;
    const place_value = cities.value;
    const cp_value = cp.value;
    const hand_delivered_value = hand_delivered.checked;
    const delivery_value = delivery.checked
    const description_value = description.value;
    const contact_value = contact.value;
    const year_value = year.value;
    const brand_value = brand.value;
    const uuid4 = generate_uuid_v4();

    setImg(file_path_value, "/imgs/"+uuid4+"/img.png")
    .then((downloadURL) => {
        //Get username success
        //Set username in local storage
        const data = {
            "title": title_value,
            "type": type_value,
            "condition": condition_value,
            "price": parseFloat(price_value),
            "img_URL": downloadURL,
            "country": (country_value == "Country") ? (alert("Please enter your country !"), null)  : country_value,
            "place": (place_value == "Cities") ? (alert("You must enter your city !"), null) : place_value,
            "cp": (cp_value == "") ? "No postal code entered" : cp_value,
            "end_date": end_date.value,
            "hand_delivered": hand_delivered_value,
            "delivery": delivery_value,
            "description": description_value,
            "contact": contact_value,
            "creator": localStorage.getItem('uid'),
            "timestamp_creation": String(new Date().getTime()),
            "timestamp_end_date": String(new Date(end_date.value).getTime()),
            "bidder": "null",
            "bid_price": parseFloat(price_value),
            "status": "open",
            "winner": "null",
            "year": parseInt(year_value),
            "brand": brand_value
        };
    
        set('/bids/'+uuid4, data); 
        update('/users/'+localStorage.getItem('uid')+"/created_bids/", {[uuid4]:"owner"}); 
        //Redirect to acceuil page
        document.location.href = "./home.html";
    }) .catch((error) => {
        //Get username error
        console.log(error);
    });
}

function generate_uuid_v4() {
    var uuid = "";
    var characters = "0123456789abcdef";
    
    for (var i = 0; i < 32; i++) {
        var random_int = Math.floor(Math.random() * characters.length);
        var random_string = characters.charAt(random_int);

        if (i === 12) {
            random_string = "4";
        }
        uuid += random_string;
    }
    
    uuid = uuid.substring(0, 8) + "-" + uuid.substring(8, 12) + "-" + uuid.substring(12, 16) + "-" + uuid.substring(16, 20) + "-" + uuid.substring(20);
    
    return uuid;
}
