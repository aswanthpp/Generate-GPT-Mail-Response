import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, "YOUR_API_KEY").then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Magic Wand!",
      iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
        onClick: function(event) {
          console.log("Compose inside compose view");
          //   console.log("this is the subject: "+event.composeView.getSubject());
          var textPrompt=event.composeView.getSelectedBodyText();
          console.log("Compose Response from Test func : "+textPrompt);
          var response = getGptResponse(textPrompt);
          event.composeView.insertTextIntoBodyAtCursor(response);
        },
    });
  });
});

  // function callGPT(prompt){
  //   console.log("Getting GPT Response for : "+prompt);
  //   var response="GPT Response: "+prompt;
  //   return response;
  // }


const axios = require('axios');

// // Set up your API key and endpoint
const apiKey = 'YOUR_OPEN_AI_KEY';
const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// // Function to make the GPT-3.5 request
async function getGptResponse(prompt) {
  try {
    const response = await axios.post(apiEndpoint, {
      prompt: prompt,
      max_tokens: 100, // Adjust the number of tokens for the desired response length
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text; // Extract and return the generated text
  } catch (error) {
    console.error('Error making GPT request:', error);
    throw error;
  }
}

