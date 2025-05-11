require('dotenv').config();
const axios = require('axios');

async function listGeminiModels() {
  try {
    const response = await axios.get(
      'https://generative-language.googleapis.com/v1beta/models',
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );
    console.log('✅ Available Gemini Models:', response.data.models);
  } catch (error) {
    console.error('❌ Error listing models:', error.response?.data || error.message);
  }
}

listGeminiModels();
