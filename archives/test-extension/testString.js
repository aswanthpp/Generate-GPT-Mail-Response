let messageView=`Thanks a lot. On Wed, Feb 22, 2023 at 5:43 PM Customer Care – MagmaHDI <customercare@magma-hdi.co.in> wrote:





Dear
 Customer,
 
This is with reference to your request pertaining to soft copy of Magma HDI General Insurance policy held by you.
 
As desired, please find attached the digital copy of policy document for your reference.
 
We hope we’ve served you well this year! Click https://bit.ly/3iezrsC
and leave us a rating on Google! Magma HDI
 
In case you need any assistance, please feel free to write to us at customercare@magma-hdi.co.in
 
Yours truthfully,
Jyoti
 Kumari 
Customer Service Team
Magma HDI General Insurance


 
 
------------------- Original Message -------------------
From: Aswanth P P <aswanthbhavan@gmail.com>;
Received: Tue Feb 21 2023 10:10:33 GMT+0530 (India Standard Time)
To: Customer Care – MagmaHDI <customercare@magma-hdi.co.in>; Customer Care Magma HDI <customercare@magma-hdi.co.in>;
Subject: Re: Download policy document CRM:03762099


I am looking for an portal to download my policy documents, Could you please assist me for the same
 

On Mon, Feb 20, 2023 at 11:21 PM Customer Care – MagmaHDI <customercare@magma-hdi.co.in> wrote:




Dear Customer,
 
We hope you are doing well!
 
As we still haven’t heard back from you since our last email regarding, we are regrettably closing your request in our records.
 
For assistance, write to us at 
customercare@magma-hdi.co.in.
 
Please do not change the subject line of this email; it will help us track your request better.
 
Yours truthfully,
Raj Mahadik. 
Customer Service Team
Magma HDI General Insurance"
 
 
 
------------------- Original Message -------------------
From: Customer Care Magma HDI <customercare@magma-hdi.co.in>;
Received: Thu Feb 16 2023 23:45:28 GMT+0530 (India Standard Time)
To: Aswanth P P <aswanthbhavan@gmail.com>;
Subject: Re: Download policy document CRM:03762099
 


Dear
 Customer,
 
This
 is with reference to your request pertaining to soft copy of Magma HDI General Insurance policy held by you.
 
We
 request you to share the RC copy and Insured Id proof for further process.
 
Incase
 you need any assistance, please feel free to write to us at 
customercare@magma-hdi.co.in
 
Yours
 truthfully,
Raj
 Mahadik.
Customer
 Service Team
Magma
 HDI General Insurance

 
 
------------------- Original Message -------------------
From: Aswanth P P <aswanthbhavan@gmail.com>;
Received: Wed Feb 15 2023 21:49:29 GMT+0530 (India Standard Time)
To: Customer Care – MagmaHDI <customercare@magma-hdi.co.in>; Customer Care Magma HDI <customercare@magma-hdi.co.in>;
Subject: Re: Download policy document CRM:03762099
 

Can I download the softcopy from website ?
 

On Sun, Feb 12, 2023 at 5:55 PM Customer Care – MagmaHDI <customercare@magma-hdi.co.in> wrote:



Dear Customer,
 
This is with reference to your request pertaining to soft copy of Magma HDI General Insurance policy held by you.
 
We request you to share the RC copy and Insured Id proof for further process.
 
Incase you need any assistance, please feel free to write to us at 
customercare@magma-hdi.co.in
 
Yours truthfully,
Raj Mahadik.
Customer Service Team
Magma HDI General Insurance

 
 
------------------- Original Message -------------------
From: Aswanth P P <aswanthbhavan@gmail.com>;
Received: Thu Feb 09 2023 00:26:49 GMT+0530 (India Standard Time)
To: Customer Care – MagmaHDI <customercare@magma-hdi.co.in>; Customer Care Magma HDI <customercare@magma-hdi.co.in>;
Subject: Re: Download policy document CRM:03762099
 

Policy number: P0021300027/4113/125407
Vehicle number: KL 58 AD 4677
 

On Tue, 7 Feb 2023 at 12:24 AM, Customer Care – MagmaHDI <customercare@magma-hdi.co.in> wrote:




Dear Customer,
 
This is with reference to your request pertaining to soft copy of Magma HDI General Insurance policy held by you.
 
We request you to share the RC copy and policy details with us for further process.
 

Please do not change the subject line of this email; it will help us track your request better.
 
Yours truthfully,
Pragnya Dhawle.
Customer Service Team
Magma HDI General Insurance

 

 
------------------- Original Message -------------------
From: Aswanth P P <aswanthbhavan@gmail.com>;
Received: Sun Feb 05 2023 15:58:49 GMT+0530 (India Standard Time)
To: Customer Care – MagmaHDI <customercare@magma-hdi.co.in>; Customer Care Magma HDI <customercare@magma-hdi.co.in>;
Subject: Download policy document
 

 
Hi,

I have a two wheeler magma hdi insurance policy. I would like to download the policy document and Certificate of insurance cum schedule for the same.

Could you please help me to download the above documents
--



Regards
Aswanth P P


No virus found in this incoming message.






--



Regards
Aswanth P P

No virus found in this incoming message.





 
 
--



Regards
Aswanth P P

No virus found in this incoming message.








 
 
--



Regards
Aswanth P P

No virus found in this incoming message.




-- RegardsAswanth P P`

// let messageView=`Hi Aswanth, happy to hear from you. I am not available on the 15th, but would be glad to meet you on the 16th.Could you give me a brief agenda for the meeting?On Tue, Oct 3, 2023 at 7:09 PM Aswanth P P <aswanthbhavan@gmail.com> wrote:

// Hi Jerry,

// Hope you're doing well! I'm reaching out to invite you to a lunch meeting on October 15th, 2023 to discuss my consulting services. This would be a great opportunity to learn more about what I can offer and how it can benefit your business. I look forward to meeting with you and further discussing my services.`

let textPrompt=`I would like to generate responses to email based on the context of the conversation. I would you to read through the mails and generate the response. The conversation context will be passed in the following manner
   <Recent Reply> <mail content>
   <Preivous reply> <mail content>
   <Preivous reply> <mail content>
   and so on.
   The conversation will be passed in the order of most recent email first.  You should generate the reply mail to the most recent email exchange\n`;
const messageArray=messageView.split("------------------- Original Message -------------------")
const regexPattern = /On[\s\S]*? wrote:/
let firstIteraction=true;
messageArray.forEach((message) => {
    if(firstIteraction){
        firstIteraction=false;
        const latestMessage=messageArray[0].split(regexPattern);
        textPrompt+="<Recent Reply> <"+latestMessage[0]+">\n";
        textPrompt+="<Preivous reply> <"+latestMessage[1]+">\n";
    }else{
        textPrompt+="<Preivous reply> <"+message+">\n";
    }
});

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
