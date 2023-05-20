const axios = require('axios');

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
console.log(apiKey);

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
});

const formValues = JSON.parse(localStorage.getItem('formValues'));

let conversation = [
  {
    role: "system",
    content: `Eres un entrevistador empático y comprensivo con los candidatos. Vas a llevar a cabo una entrevista para el cargo de ${formValues.cargo}. El salario ofrecido es de ${formValues.salario}. Se requiere una experiencia mínima de ${formValues.experiencia} años. Las habilidades necesarias para este puesto incluyen ${formValues.habilidad}. Los requisitos son los siguientes: ${formValues.requisitos}. Los estudios mínimos necesarios son ${formValues.estudios}. Las preguntas clave de esta entrevista son las siguientes: ${formValues.preguntas_claves}.`
  }
];

async function sendMessage(message) {
  try {
    conversation.push({
      role: "user",
      content: message
    });

    const response = await openai.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: conversation,
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ["\n", " Human:", " AI:"]
    });

    const aiReply = response.data.choices[0].message.content;
    console.log(aiReply);

    conversation.push({
      role: "system",
      content: aiReply
    });

    const synthesizeResponse = await axios.post('/api/synthesize', {
      text: aiReply
    });

    // muestrame la conversacion y aparte los tokens utilizados por toda la conversacion
    console.log(conversation + "\n" + response.data.choices[0].tokens);

    return synthesizeResponse;

  } catch (error) {
    // console.error(error);
  }
}

module.exports = {
  sendMessage
};