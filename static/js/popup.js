document.getElementById("gpt-key-form").addEventListener("click", updateKey);

function updateKey(){
    let key = document.getElementById('gpt-key-value').value;
    chrome.storage.local.set({"gptApiKey": key}).then(()=>{
        console.log("Key saved");
    });
}