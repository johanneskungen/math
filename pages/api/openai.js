const { Configuration, OpenAIApi } = require("openai");
const nodemailer = require("nodemailer");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const math = async (prompt) => {
  const mathPrompt = `You are a math expert that consume knowledge like nobody else. A student from a university is asking you some questions and you should reply very detailed. 

  Student: Give an example of a rationell expresion that fulfilles the following conditions: The expression has the value 0 when x is 2, the expression is not defined for x equals 1, The expression is not defined when x equals 5. 
  
  AI: An example of a rational expression that meets the condition is x-2/(x-1)(x+5). When x is 2, the expression evaluates to 0 since 2-2/(2-1)(2+5) = 0. When x is 1, the expression is undefined since it would require dividing by zero. And when x is 5, the expression is undefined since it would require dividing by zero.
  
  Student: ${prompt}
  
  AI: 
  
  `;
  const type = `What type of math problem does this sentence describe: ${prompt}? Answer with words necessary only.`;

  const response1 = await openai.createCompletion({
    prompt: mathPrompt,
    model: "text-davinci-003",
    max_tokens: 500,
    temperature: 0.7,
  });

  const response2 = await openai.createCompletion({
    prompt: type,
    model: "text-davinci-003",
    max_tokens: 200,
    temperature: 0.7,
  });

  return {
    solution: response1.data.choices[0].text,
    type: response2.data.choices[0].text,
  };
};

const mail = (addr) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8b2247d45c5a15",
      pass: "76fa462e944068",
    },
  });

  const mailOptions = {
    from: "Math Helper <johannes.einar.eriksson@gmail.com>",
    to: addr,
    subject: "Related links to your search on MathHelper.io",
    text: "Email service is unavailable at the moment...",
  };

  return transport.sendMail(mailOptions, (erro, info) => {
    if (erro) {
      console.log(erro);
      return erro.message.toString();
    } else {
      console.log(info);
    }
  });
};

export default async function handler(req, res) {
  require("dotenv").config();
  const mathFuncResponse = await math(req.body);

  // const infoArr = await webScraper(mathFuncResponse.type);
  //const mailText = infoArr.map((item, index) => {return `Article number ${index + 1} says ${item.title} and this is the link to the site ${item.link}`;})
  // .join("\n\n");
  // console.log(mailText);
  mail("johannes.foretag@gmail.com");

  return res.status(200).json(mathFuncResponse.solution);
}
