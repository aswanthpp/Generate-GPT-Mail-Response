import * as InboxSDK from '@inboxsdk/core';
const GPT_MODEL="text-davinci-002"
const SDK_KEY = "sdk_aswanth_app_id_bbe910f9cf"

let API_KEY;


function getGptKeyFromLocalStorage() {
  chrome.storage.local.get('gptKey', result => {
    console.log("Accessing gpt key");
    if (result.gptKey) {
      API_KEY = result.gptKey;
    } else {
      console.error("No 'gptKey' found in local storage.");
    }
  });
}
function createInnerHTML(){
        const form = document.createElement('form');
        form.innerHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Textarea Example</title>
        </head>
        <body>
            <form>
            <textarea rows="4" cols="50" id="textPrompt" name="textPrompt" placeholder="Enter prompt here"></textarea>
            <br>
            <input type="submit" value="Submit">
            </form>
          </body>
          </html>
          
        `;
        return form;
}
async function generateText(prompt,API_KEY) {
    console.log("Calling Open AI Completion API");
    const url = 'https://api.openai.com/v1/completions';
    const options = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${API_KEY}`,
               'Access-Control-Allow-Origin': '*'
             },
             body: JSON.stringify({
               "model": GPT_MODEL,
               "prompt": prompt,
               "max_tokens": 2048
             })
        };
    try{
      // Make the API request
        const response = await fetch(url,options);
        const json = await response.json();
        if(response.status>=400){
        const errorResponse=json.error.message;
        alert("Message from OpenAI: "+errorResponse);
        return null;
        }
        const gptResponse=json.choices[0].text;
        return gptResponse;
      }catch (e) {
        console.error(e);
        throw e;
      }
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
          const form = createInnerHTML();

        // Add the form to the compose view
        event.composeView.insertHTMLIntoBodyAtCursor(form);

        // Add a submit event listener to the form
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          // Get the value of the prompt input field
          const textPrompt = form.querySelector('#textPrompt').value;
          console.log("Compose Email for : "+textPrompt);
          const responseText = await generateText(textPrompt,API_KEY);
          if(event.composeView.isReply){
           event.composeView.setBodyText(responseText);
          }else{
          event.composeView.insertTextIntoBodyAtCursor(responseText);
          }
          });
        },
    });
  });
});

