let messageView=`Hi Aswanth, happy to hear from you. I am not available on the 15th, but would be glad to meet you on the 16th.Could you give me a brief agenda for the meeting?On Tue, Oct 3, 2023 at 7:09 PM Aswanth P P <aswanthbhavan@gmail.com> wrote:

Hi Jerry,

Hope you're doing well! I'm reaching out to invite you to a lunch meeting on October 15th, 2023 to discuss my consulting services. This would be a great opportunity to learn more about what I can offer and how it can benefit your business. I look forward to meeting with you and further discussing my services.`

let textPrompt=`I would like to generate responses to email based on the context of the conversation. I would like you to read through the mails and generate the response. The conversation context will be passed in the following manner
   <First Email> <mail content>
   <Response Email> <mail content>
   <Last Email> <mail content>
   and so on.
   The conversation will be passed in the chronological order of emails.  You should generate a email text to the last email. Make sure that you should only the email text and no formatting characters.\n`;
const messageArray=messageView.split("------------------- Original Message -------------------")
const regexPattern = /On[\s\S]*? wrote:/
// messageArray.forEach((message) => {
//     if(firstIteraction){
//         firstIteraction=false;
//         const latestMessage=messageArray[0].split(regexPattern);
//         textPrompt+="<Recent Reply> <"+latestMessage[0]+">\n";
//         textPrompt+="<Preivous reply> <"+latestMessage[1]+">\n";
//     }else{
//         textPrompt+="<Preivous reply> <"+message+">\n";
//     }
// });
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
            textPrompt+="<Response Email> <"+message+">\n";
        }
    }

}
console.log(textPrompt);
// const latestMessage=messageArray[0].split(regexPattern);
// console.log(latestMessage.length);
// console.log(latestMessage[0]);
// console.log("-------------------------");

// console.log(latestMessage[1]);

// console.log(messageArray[0]);
// console.log(messageView);


// const inputString = 'On Wed, Feb 22, 2023 at 5:43 PM';
// // const regexPattern = /^On (\w{3}, \w{3} \d{1,2}, \d{4} at \d{1,2}:\d{2} (?:AM|PM))$/;
// const regexPattern = /\bOn (\w{3}, \w{3} \d{1,2}, \d{4} at \d{1,2}:\d{2} .*) wrote\:\b/;
// const regexPattern = /\bOn (\w{3}, \w{3} \d{1,2}, \d{4}) at\b/;
// const regexPattern = /On[\s\S]*? wrote:/;

// const resultArray = messageArray[0].split(regexPattern);
// console.log(resultArray.length);
// console.log(resultArray);

// const str = `Hi Aswanth, happy to hear from you. I am not available on the 15th, but would be glad to meet you on the 16th. Could you give me a brief agenda for the meeting?On Tue, Oct 3, 2023 at 7:09 PM Aswanth P P <aswanthbhavan@gmail.com> wrote:

// Hi Jerry,

// Hope you're doing well! I'm reaching out to invite you to a lunch meeting on October 15th, 2023 to discuss my consulting services. This would be a great opportunity to learn more about what I can offer and how it can benefit your business. I look forward to meeting with you and further discussing my services.`;

// // const regexPattern = /\bOn.{26}\b/;


// const resultArray = str.split(regexPattern);
// resultArray.forEach((result)=> {
//     console.log("\n---"+result);
// });
// console.log(resultArray.length); // This will correctly give you 2 because there are two matching patterns.
