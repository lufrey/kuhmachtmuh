import type { APIRoute } from "astro";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: import.meta.env.OPENAI_ORGANIZATION,
  apiKey: import.meta.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  // only use first 100 characters of question
  const question = (formData.get("q") as string).slice(0, 100);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Beantworte die folgende Frage als wärst du eine Kuh. Bitte antworte fröhlich, sehr kurz, mache Witze und nutze sehr häufig das Wort "muh".
        
        ${question}`,
      },
    ],

    max_tokens: 150,
  });

  return new Response(JSON.stringify(response.data.choices[0]), {
    status: 200,
  });
};
