require("dotenv").config({
  path: "./.env",
});

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  // const prompt = req.body.prompt;
  const question = "what is 2+2?";
  const prompt = `Q: ${question}`;

  try {
    if (!prompt) {
      return res.send("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const completion = response.data.choices;
    console.log(completion[0].text);
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
