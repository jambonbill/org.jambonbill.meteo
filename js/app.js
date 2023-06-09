//https://www.prevision-meteo.ch/services/json/

//Selectors
const selector=document.getElementById('citylist');

const location=document.getElementById('location');
const msg=document.getElementById('msg');
const details=document.getElementById('details');
const imgStatus=document.getElementById("imgStatus");

selector.addEventListener('change',function(e){
	fetchCity(selector.value);
});




function fetchCity(name){	
	//console.log('fetchCity()',name);	
	if (!name) {
		location.innerHTML='';
		msg.innerHTML='';
		return;
	}
	
	let url='https://www.prevision-meteo.ch/services/json/'+name;
	fetchApi(url);
}


function fetchByCoords(lat, lng){
	
	console.log('fetchByCoords(lat, lng)');

	

	if(!lat||!lng){
		console.error("no lat/lng");
		location.innerHTML='no lat/lng';
		return;
	}
	
	//'https://www.prevision-meteo.ch/services/json/lat=46.259lng=5.235';
	//console.log('fetchByCoords', lat, lng);
	
	let url=`https://www.prevision-meteo.ch/services/json/lat=${lat}lng=${lng}`;	
	fetchApi(url);
}

function fetchApi(url){
	//
	//console.log('fetchApi(), please wait',url);
	
	location.innerHTML='please wait';
	msg.innerHTML='please wait';

	let funny_url='https://gifdb.com/images/high/grumpy-loading-cat-u41rwec8mte07hdw.gif';	
	imgStatus.setAttribute("src",funny_url);
	msg.innerHTML='please wait..';

	fetch(url)
		.then(res=>res.json())
		.then(data=>{
			console.log(typeof(data),data);	
			displayResult(data);
		});
}

function displayResult(dat){
	console.log('displayResult()', dat);
	
	let current=dat.current_condition;
	//let key=current.condition_key;
	
	//let info=dat.city_info;
	
	//console.log(info);
	
	/*	
	country: "--"
	elevation: "NA"
	latitude: "48.8582"
	longitude: "2.3387"
	name: "NA"
	*/
	
	//city info
	location.innerText=dat.city_info.name;
	
	msg.innerText=current.condition;
	//details.innerHTML='<pre>'+JSON.stringify(dat)+'</pre>';
	imgStatus.setAttribute("src",current.icon_big);
}


// Get pos //
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert('geolocation is not supported');
    console.error('geolocation is not supported');
}

function showPosition(pos){
	console.log('showPosition(position)',pos);
	let lat=pos.coords.latitude;
	let lng=pos.coords.longitude;
	fetchByCoords(lat,lng);
}

console.log('app.js');
