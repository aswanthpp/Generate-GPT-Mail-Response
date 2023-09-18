import * as InboxSDK from '@inboxsdk/core';
var keysJson = [];
try {

    keysJson = require('./keys.json');

} catch (e) {
    console.log(e);
}
const SDK_KEY = keysJson['InBoxSDK'];
const GPT_MODEL="text-davinci-002"
let API_KEY;

const GPT_RESPONSE={
  "warning": "This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service. Learn more https://platform.openai.com/docs/deprecations",
  "id": "cmpl-807PSQ6pQMCzjJ09ST8y5WqTXRznQ",
  "object": "text_completion",
  "created": 1695039174,
  "model": "text-davinci-002",
  "choices": [
    {
      "text": "\n\nHappy birthday, Sumith! Wishing you all the best on your special day. May all your dreams and aspirations come true. Enjoy every moment!",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 7,
    "completion_tokens": 32,
    "total_tokens": 39
  }
}
const jsonString=JSON.stringify(GPT_RESPONSE);
const response = new Response(jsonString, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

function getGptKeyFromLocalStorage() {
  chrome.storage.local.get('gptKey', result => {
    console.log("Accessing gpt key");
    console.log(result.gptKey);
    if (result.gptKey) {
      API_KEY = result.gptKey;
    } else {
      console.error("No 'gptKey' found in local storage.");
    }
  });
}

InboxSDK.load(2, SDK_KEY).then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Magic Wand!",
      iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
        onClick: function(event) {
          console.log("Compose inside compose view");
          getGptKeyFromLocalStorage();
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
          response = await generateText(textPrompt,API_KEY);
          console.log(response)
          event.composeView.insertTextIntoBodyAtCursor(response);
          });
        },
    });
  });
});

async function generateText(prompt,API_KEY) {
    console.log("inside POST Call");
    try{
      // Make the API request
//        const response = await fetch('https://api.openai.com/v1/completions', {
//            method: 'POST',
//            headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${API_KEY}`,
//               'Access-Control-Allow-Origin': '*'
//             },
//             body: JSON.stringify({
//               "model": ${GPT_MODEL},
//               "prompt": prompt,
//               "max_tokens": 2048
//             })
//        });

        const json = await response.json();
        const gptResponse=json.choices["0"].text;
        return gptResponse;
      }catch (e) {
        console.error(e);
        throw e;
      }
}