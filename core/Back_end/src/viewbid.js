import {read, set, update} from "./database.js";

//Get bid key in local storage
const bid_id = localStorage.getItem('bid_id');
//Get username in local storage
const username = localStorage.getItem('username');
//Get user uid in local storage
const uid = localStorage.getItem('uid');

//Get bid data
const img = document.getElementById('bid_img');
const title = document.getElementById('title');
const description = document.getElementById('description');
const type = document.getElementById('type');
const brand = document.getElementById('brand');
const year = document.getElementById('year');
const condition = document.getElementById('condition');
const remise = document.getElementById('remise');
const current_price = document.getElementById('current_price');
const bid_btn = document.getElementById('bid_btn');
const status = document.getElementById('status');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const city = document.getElementById('city');
const cp = document.getElementById('cp');
const country = document.getElementById('country');
const phone = document.getElementById('phone');
const bidder = document.getElementById('bidder');

//Function
function set_data_page(){
    let price = 0;
    read('bids/'+bid_id)
    .then((data) => {
        img.src = data.img_URL;
        title.innerHTML = data.title;
        description.innerHTML = data.description;
        type.innerHTML = data.type;
        brand.innerHTML = data.brand;
        year.innerHTML = data.year;

        if(data.condition == "Abîmé"){
            condition.innerHTML = "Damaged";
        } else if(data.condition == "Très abîmé"){
            condition.innerHTML = "Very Damaged";
        } else{
            condition.innerHTML = "New";
        }
        
        if(data.delivery){
            remise.innerHTML = "Delivery"
        }else{
            remise.innerHTML = "Hand-delivered"
        }

        current_price.value = data.bid_price;
        current_price.min = data.bid_price;
        price = data.bid_price;
        if(data.bidder == "null"){
            bidder.innerHTML = "No bidders";
        }else{  
            bidder.innerHTML = "<b>Highest bidder :</b> " + data.bidder;
        }

        if(data.status == "open"){
            status.innerHTML = "<b>Status :</b> Open";
        }else{
            status.innerHTML = "<b>Status :</b> Closed";
        }

        city.innerHTML = "<b>City :</b> " + data.place;
        cp.innerHTML = "<b>Zip code :</b> " + data.cp;
        country.innerHTML = "<b>Country :</b> " + data.country;
        phone.innerHTML = "<b>Phone number :</b> " + data.contact;

        /*initMap(data.place);*/

        bid_btn.addEventListener('click', () => {
            if(current_price.value > price){
                set('bids/'+bid_id + "/bidder", username);
                bidder.innerHTML = "<b>Highest bidder :</b> " + username;
                set('bids/'+bid_id + "/bid_price", current_price.value);
                var obj = {}
                obj[bid_id] = current_price.value;
                update('users/'+uid+"/bidding", obj);
                alert("You're definitely the highest bidder !")
            }else{
                alert("The new price must be strictly higher than the current price !")
                current_price.value = price
            }
        });
        setInterval(function() {
            timer(data.end_date)
        }, 1000);
    });
}

function timer(startDate){
    const now = new Date().getTime();
    const endTime = new Date(startDate).getTime();
    const delatTime = endTime - now;

    const daysValue = Math.floor(delatTime / (1000 * 60 * 60 * 24))
    const hoursValue = Math.floor(delatTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutesValue = Math.floor(delatTime % (1000 * 60 * 60) / (1000 * 60));
    const secondesValue = Math.floor(delatTime % (1000 * 60) / 1000);
    
    days.innerHTML = daysValue.toString().padStart(2, "0");
    hours.innerHTML = hoursValue.toString().padStart(2, "0");
    minutes.innerHTML = minutesValue.toString().padStart(2, "0");
    seconds.innerHTML = secondesValue.toString().padStart(2, "0");
    
}

// Initialize and add the map
/*let map;

async function initMap(city) {
    //Get latitude and longitude of the city
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${"AIzaSyAHfIpnzMcPTo37nJKpVgSmpXwQJON1Q2s"}`;
    let latitude;
    let longitude;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng; 

    } catch(error) {
        console.log(error);
    }

    const position = { lat: latitude, lng: longitude};

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    // Create the map
    map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: position,
        mapId: "MAP",
    });

    // Create marker for the city
    new AdvancedMarkerView({
        map: map,
        position: position,
        title: city,
    });
    
}*/

set_data_page();

