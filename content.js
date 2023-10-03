import * as InboxSDK from '@inboxsdk/core';
const SDK_KEY = "sdk_aswanth_app_id_bbe910f9cf"

let API_KEY;
let GPT_MODEL;

function getGptModelFromLocalStorage(){
  chrome.storage.local.get("gptModel", result => {
    console.log("Accessing gpt model");
    if (result.gptKey) {
      GPT_MODEL = result.gptModel;
    } else {
      GPT_MODEL="text-davinci-002";
      console.log("Model not found in local storage. Assigining default model");
    }
  });
}
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
async function generateText(prompt) {
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
      title: "Generate GPT Mail!",
      iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
      onClick: function(event) {
        console.log("Compose inside compose view");
        getGptKeyFromLocalStorage();
        getGptModelFromLocalStorage();

        const form = createInnerHTML();
        // Add the form to the compose view
        event.composeView.insertHTMLIntoBodyAtCursor(form);

        // Add a submit event listener to the form
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          // Get the value of the prompt input field
          const textPrompt = form.querySelector('#textPrompt').value;
          console.log("Compose Email for : "+textPrompt); 
          const responseText = await generateText(textPrompt);
          event.composeView.setBodyText(responseText);
        });   
      },
    });
  });
  sdk.Conversations.registerMessageViewHandler((messageView) => {
    messageView.addToolbarButton({
      section: "MORE",
        title: "Generate GPT Mail!",
        iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
        onClick: function(event) {
          console.log("inside the Message View");
          getGptKeyFromLocalStorage();
          getGptModelFromLocalStorage();
          let textPrompt="Create an email reply for \"";
      
          const emailContent=messageView.getBodyElement().textContent;
          textPrompt+=emailContent+" \"";
        
          console.log("Compose Email for : "+textPrompt);
          generateText(textPrompt).then((response)=> {
            console.log(response);
            // sdk.Compose.openNewComposeView((replyComposeView) => {
            //   replyComposeView.setBodyText(response);
            // })
          });
          
        },
        orderHint: 1
    });
  });
  
});

