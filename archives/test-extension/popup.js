console.log("inside the js")

document.addEventListener('DOMContentLoaded', function() {
  console.log("inside the function")
  const form = document.getElementById('myForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const inputValue = form.inputValue.value;

    // Save the value to Chrome local storage
    chrome.storage.local.set({ "gptKey": inputValue }, function() {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Value saved to local:', inputValue);

//        const response=await getAPIResponse();
//        console.log("response from Calle: "+response);
          getAPIResponse().then( response => {
          console.log("response from Calle: "+response);
          }).catch(error => {
          console.error("Error "+error);
          });

      }
    });
  });
});

//
//async function loadApiKey(fn){
//    chrome.storage.local.get("gptApiKey", function (data) {
//        fn(data.gptKey);
//    });
//}
//document.addEventListener('DOMContentLoaded', function(){
//
//    var curValue;
//    chrome.storage.local.get("savedValue", function(result) {
//    window.curValue=result.savedValue;
//    });
//console.log("Saved Result "+curValue);
//});



async function getAPIResponse(){
const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '41555c9a3fmsh582c9aa217f0a1cp174e35jsn5bccb24e7001',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
//	const result = await response.text();
//	console.log(result);
//	return response
	const json = await response.json();
//    const gptResponse=json.choices["0"].text;
    const imDBId=json.d[0].id;
    return imDBId;

} catch (error) {
	console.error(error);
}
}
