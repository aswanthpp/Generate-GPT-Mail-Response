document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const valueInput = document.getElementById("value");
  const messageDiv = document.getElementById("message");

  saveButton.addEventListener("click", function () {
    const value = valueInput.value;
    chrome.storage.local.set({ savedValue: value }, function () {
      messageDiv.textContent = "Value saved!";
    });
  });
});
