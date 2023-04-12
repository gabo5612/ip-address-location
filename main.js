const inputSearch=document.querySelector('#inputSearch')
const searchButton=document.querySelector('#searchButton')
const ip=document.querySelector('#ip')
const infoLocation=document.querySelector('#location')
const timeZone=document.querySelector('#timeZone')
const isp=document.querySelector('#isp')

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const usuarioIp=data.ip
    getLocation(usuarioIp)
  })
    
  .catch(error => console.error(error));

const map = L.map('map').setView([10.473, -66.91], 11);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

searchButton.addEventListener('click',()=>{
    const inputValue=inputSearch.value
    inputValue.toString
    
    getLocation(inputValue)
})
function getLocation(inputValue){
    
    const apiKey = 'at_xLxFaCi9GE4nNvAGY3UQLuvyHXOhx';
    const ipAddress = inputValue;
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        ip.innerText=data.ip
        const location1=data.location.region
        const location2=data.location.country
        const location3=data.location.city
        infoLocation.innerText=location3 + ' '+ location1 + ' ' +location2
        timeZone.innerText=data.location.timezone
        isp.innerText=data.isp
        const lat=data.location.lat
        const lng=data.location.lng
        map.setView([lat, lng], 15)
        var circle = L.circle([lat, lng], {
            color: 'green',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 500
        }).addTo(map);
        var marker = L.marker([lat, lng]).addTo(map);
      
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API', error);
      });
}
