InboxSDK.load(2, 'YOUR_SDK_API_ID').then(function(sdk){
    // the SDK has been loaded, now do something with it!
    console.log("compose view exists!");
    sdk.Compose.registerComposeViewHandler(function(composeView){
      // a compose view has come into existence, do something with it!
      composeView.addButton({
        title: "Magic Wand!",
        iconUrl: 'https://img.icons8.com/?size=512&id=6mIR8nIuhBsJ&format=png',
        onClick: function(event) {

          console.log("Compose inside compose view");
        //   console.log("this is the subject: "+event.composeView.getSubject());
        var textPrompt=event.composeView.getSelectedBodyText();
        console.log("Compose Response from Test func : "+textPrompt);
        var response = callGPT(textPrompt);
        event.composeView.insertTextIntoBodyAtCursor(response);
          
        },
      });
    });
  });


  function callGPT(prompt){
    console.log("Getting GPT Response for : "+prompt);
    var response="GPT Response: "+prompt;
    return response;
  }