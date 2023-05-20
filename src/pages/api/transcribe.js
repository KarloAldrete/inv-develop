import { SpeechClient } from '@google-cloud/speech';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Sorry, only POST requests please' });
    return;
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error parsing form' });
      return;
    }
  
    console.log(files);

    if (!files.audio) {
      res.status(400).json({ error: 'No audio file' });
      return;
    }

    const audioPath = files.audio.filepath;
    const audio = fs.readFileSync(audioPath); 

    const client = new SpeechClient({
      keyFilename: path.resolve('src/invenire-test-386107-1f3cf2feb1eb.json'),
    });

    try {
      const config = {
        encoding: 'webm',
        sampleRateHertz: 48000,
        languageCode: 'es-ES',
      };

      const request = {
        audio: {
          content: audio,
        },
        config: config,
      };

      const [response] = await client.recognize(request);

      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Transcripcion: ${transcription}`);

      res.status(200).json({ transcription });
    } catch (error) {
      console.error('Error en la solicitud de reconocimiento:', error);
      res.status(500).json({ error: 'Error en la solicitud de reconocimiento' });
    }
  });
};

