// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Manage the OpenAI API
const OpenAI = require("openai");
let openai = null;
let openaiErr = undefined;

export default async function POST(req, res) {
  const input = req.body.input;
  const openaiApiKey = req.body.apiKey ? req.body.apiKey : undefined;
  openaiErr = undefined;

  // console.log("input : ", input);
  // console .log("openaiApiKey : ", openaiApiKey);

  try {
    if(openai === null) {
      openai = new OpenAI({
        apiKey: openaiApiKey,
      }); 
    }
  
    if(openaiApiKey === undefined) {
      throw new Error("OpenAI API key missing.");
    }
  } catch(e) {
    // console.log("openpai key : ", e.message );
    openaiErr = e.message;
  }

  if(openaiErr) {
    res.status(500).json({
      error: {
        message: "OpenAI API key missing."
      }
    })
  } else if(input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter an input."
      }
    })
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: "gpt-3.5-turbo",
    });

    res.status(200).json({
      result: completion.choices[0].message.content
    })
  } catch(e) {
    res.status(500).json({
      error: {
        message: "An error occurred during the request"
      }
    })
  }

}
