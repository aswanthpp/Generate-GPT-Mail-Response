console.log("inside the js")

document.addEventListener('DOMContentLoaded', function() {
  console.log("inside the function")
  const form = document.getElementById('myForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const inputValue = form.inputValue.value;

    // Save the value to Chrome local storage
    chrome.storage.local.set({ "gptKey": inputValue }, function() {
      var saveKeyResponse = document.getElementById('saveKeyResponse');

      if (chrome.runtime.lastError) {
        const response=chrome.runtime.lastError
        console.error(response);
        saveKeyResponse.textContent = response;
      } else {
        const response='Key is saved!'
        console.log(response);
        saveKeyResponse.textContent = response;
      }
    });
  });
});