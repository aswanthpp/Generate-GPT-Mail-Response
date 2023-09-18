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
        console.log('Value saved to local storage:', inputValue);
      }
    });
  });
});