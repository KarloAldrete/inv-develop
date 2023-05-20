const textToSpeech = require('@google-cloud/text-to-speech');

async function synthesizeText(req, res) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = 'src/invenire-test-386107-1f3cf2feb1eb.json';

  const client = new textToSpeech.TextToSpeechClient();

  const { text } = req.body;

  if (typeof text !== 'string') {
    console.error('Invalid input:', text);
    res.status(400).json({ error: 'Invalid input type. Type has to be text.' });
    return;
  }

  try {
    console.log('Synthesizing speech...');
    console.log('Text: ', text);
    const [response] = await client.synthesizeSpeech({
      input: { text: text },
      voice: { languageCode: 'es-US', name: 'es-US-Neural2-B', ssmlGender: "MALE" },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const audioContent = response.audioContent;
    console.log('Audio content written to file: output.mp3');

    res.status(200).json({ audio: audioContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error synthesizing speech.' });
  }
}

module.exports = synthesizeText;