import * as InboxSDK from '@inboxsdk/core';
var keysJson = [];
try {

    keysJson = require('./keys.json');

} catch (e) {
    console.log(e);
}
const SDK_KEY = keysJson['InBoxSDK'];
const API_KEY = keysJson['Open_AI'];

InboxSDK.load(2, SDK_KEY).then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Magic Wand!",
      iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
        onClick: function(event) {
          console.log("Compose inside compose view");
          chrome.storage.local.get('gptApiKey', result => {
  console.log(result.key);
});
           const form = document.createElement('form');
        form.innerHTML = `
          <label for="prompt">Create Prompt?</label><br>
          <input type="text" id="textPrompt" name="textPrompt"><br>
          <input type="submit" value="Submit">
        `;
        // Add the form to the compose view
        event.composeView.insertHTMLIntoBodyAtCursor(form);

        // Add a submit event listener to the form
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          // Get the value of the prompt input field
          const textPrompt = form.querySelector('#textPrompt').value;
          console.log("Compose Response from Test func : "+textPrompt);
          response = await generateText(textPrompt);
          console.log(response)
          event.composeView.insertTextIntoBodyAtCursor(response);
          });
        },
    });
  });
});

async function generateText(prompt) {
try{
  // Make the API request
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${API_KEY}`,
       'Access-Control-Allow-Origin': '*'
     },
     body: JSON.stringify({
       "model": "text-davinci-002",
       "prompt": prompt,
       "max_tokens": 2048
     })
  });

  const json = await response.json();
  console.log(json)
  console.log(json.choices.text)

  console.log(json.choices)
  console.log(json.choices["0"].text)


  return json.choices["0"].text;
  }catch (e) {
  console.log(e);
  return "Got Exception";
  }

}