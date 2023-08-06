import * as InboxSDK from '@inboxsdk/core';

const SDK_KEY = "sdk_aswanth_app_id_bbe910f9cf";
const API_KEY = "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";

InboxSDK.load(2, SDK_KEY).then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Magic Wand!",
      iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
        onClick: function(event) {
          console.log("Compose inside compose view");
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
          response=callGPT(textPrompt);
          console.log(response)
          event.composeView.insertTextIntoBodyAtCursor(response);
          });
        },
    });
  });
});

async function generateText(prompt) {

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

}