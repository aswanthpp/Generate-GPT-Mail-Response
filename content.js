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
    getGptKeyFromLocalStorage();
    getGptModelFromLocalStorage();
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
        return errorResponse;
        }
        const gptResponse=json.choices[0].text;
        return gptResponse;
      }catch (e) {
        console.error(e);
        throw e;
      }
}

function preparePromptForReply(messageView){
  let textPrompt=`I would like to generate responses to email based on the context of the conversation. I would like you to read through the mails and generate the response. The conversation context will be passed in the following manner
   <First Email> <mail content>
   <Response Email> <mail content>
   <Last Email> <mail content>
   and so on.
   The conversation will be passed in the chronological order of emails.  You should generate a email text to the last email. Make sure that you should only the email text and no formatting characters.\n`;
const messageArray=messageView.split("------------------- Original Message -------------------")
const regexPattern = /On[\s\S]*? wrote:/

if(messageArray.length==1){
  const latestMessage=messageArray[0].split(regexPattern);
  textPrompt+="<First Email> <"+latestMessage[1]+">\n";
  textPrompt+="<Last Email> <"+latestMessage[0]+">\n";
}else{
let firstIteraction=true;
for(let i=messageArray.length-1;i>0;i--){
  if(firstIteraction){
      firstIteraction=false;
      const latestMessage=messageArray[0].split(regexPattern);
  textPrompt+="<First Email> <"+latestMessage[1]+">\n";
  textPrompt+="<Response Email> <"+latestMessage[0]+">\n";
  }else if(i==0){
      textPrompt+="<Last Email> <"+latestMessage[0]+">\n";

  }
  else{
      textPrompt+="<Response Email> <"+messageArray[i]+">\n";
  }
}

}
return textPrompt;

}

InboxSDK.load(2, SDK_KEY).then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Generate GPT Mail!",
      iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
      onClick: function(event) {
        if(event.composeView.isReply()){
            console.log("inside the reply")
            sdk.Conversations.registerThreadViewHandler((threadView) => {
              console.log("inside the messageView")
              const messageViews=threadView.getMessageViews()[0].getBodyElement().textContent;
              const textPrompt=preparePromptForReply(messageViews)        
              console.log("Prompt: "+textPrompt);
              generateText(textPrompt).then((response)=> {
                event.composeView.setBodyText(response);
              });
            });

        }else{        
          console.log("Compose inside compose view");
          const form = createInnerHTML();
          event.composeView.insertHTMLIntoBodyAtCursor(form);
          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Get the value of the prompt input field
            const textPrompt = form.querySelector('#textPrompt').value;
            console.log("Compose Email for : "+textPrompt); 
            const responseText = await generateText(textPrompt);
            event.composeView.setBodyText(responseText);
        });  
      } 
      },
    });
  });
});

