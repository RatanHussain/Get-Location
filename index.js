// /** @format */

const lati = document.querySelector('#lati');
const long = document.querySelector('#long');
const ip = document.querySelector('#ip');
let form = document.getElementById('sheetdb');
let btn = document.querySelector('#btn');
let show = document.querySelector('#text-show');

btn.value = 'Join';

function getLocation() {
	if (navigator.geolocation) {
		// get map location
		navigator.geolocation.watchPosition(showPosition);
	} else {
		show.innerHTML = 'Allow to join us';
	}
}
function showPosition(position) {
	lati.value = 'Latitude: ' + position.coords.latitude;
	long.value = ' Longitude: ' + position.coords.longitude;
}

function showIp() {
	const apiUrl = 'https://api.ipify.org?format=json';

	// Make a request to ipinfo.io to get the user's IP address
	try {
		fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			ip.value = data.ip;
		})
		.then(() => {})
		.catch(() => show.innerHTML = 'Allow to join us');
	} catch(error) {
		show.innerHTML = 'Allow to join us';
	}
}

function callallfun() {
	getLocation();
	showIp();
}

// loaded listener is here
window.addEventListener('DOMContentLoaded', callallfun);

// send to the google sheet function

btn.addEventListener('click', (e) => {
	e.preventDefault();
	fetch(form.action, {
		method: 'POST',
		body: new FormData(document.getElementById('sheetdb')),
	}).then((response) => response.json())
		.catch(()=> show.innerHTML = 'Allow to join us');
});
