require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// Load API keys
const API_KEYS = {
    chatgpt: process.env.OPENAI_API_KEY,
    meta_ai: process.env.META_AI_API_KEY || "dummy_meta_key",
    deepseek: process.env.DEEPSEEK_API_KEY || "dummy_deepseek_key",
    gemini: process.env.GEMINI_API_KEY || "dummy_gemini_key"
};

// Define AI endpoints
const AI_ENDPOINTS = {
    chatgpt: "https://api.openai.com/v1/chat/completions",
    meta_ai: "https://meta.ai/api", // Placeholder
    deepseek: "https://api.deepseek.com/v1/chat/completions", // Correct if available
    gemini: "https://generativelanguage.googleapis.com/v1/models", // Updated base URL
    gemini_list: "https://generativelanguage.googleapis.com/v1/models" // Updated base URL
};

// GET /list-models - Gemini model list
app.get('/list-models', async (req, res) => {
    const model = "gemini";

    if (!API_KEYS[model]) {
        return res.status(400).json({ error: `No API key found for the selected model: ${model}.` });
    }

    try {
        const response = await axios.get(
            `${AI_ENDPOINTS.gemini}?key=${API_KEYS[model]}`,
            { headers: { "Content-Type": "application/json" } }
        );
        res.json(response.data);
    } catch (error) {
        console.error("🔴 Gemini List Models Error:", error.response?.data || error.message);
        res.status(500).json({
            error: error.response?.data?.error?.message || "Failed to fetch Gemini models."
        });
    }
});

// POST /send-message - Handle AI messages
app.post('/send-message', async (req, res) => {
    const { message, model } = req.body;

    if (!message || !model) {
        return res.status(400).json({ error: "Message and model are required." });
    }

    if (model === 'gemini-2.0-flash' && !API_KEYS['gemini']) {
        return res.status(400).json({ error: `No API key found for the selected model: ${model}.` });
    } else if (!API_KEYS[model] && model !== 'gemini-2.0-flash') {
        return res.status(400).json({ error: `No API key found for the selected model: ${model}.` });
    }

    try {
        let responseText = "";
        const geminiRequestBody = {
            contents: [{
                parts: [{ text: message }]
            }]
        };

        if (model === "chatgpt") {
            console.log("🔑 ChatGPT API Key loaded:", API_KEYS.chatgpt ? "✅ Yes" : "❌ No");
            const response = await axios.post(
                AI_ENDPOINTS.chatgpt,
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful AI for secondary school students." },
                        { role: "user", content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 100
                },
                {
                    headers: {
                        "Authorization": `Bearer ${API_KEYS.chatgpt}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            responseText = response.data.choices[0].message.content.trim();
        } else if (model === "meta_ai") {
            responseText = `Meta AI placeholder: "${message}"`;
        } else if (model === "deepseek-chat") {
            console.log("🔑 DeepSeek API Key loaded:", API_KEYS.deepseek ? "✅ Yes" : "❌ No");
            const response = await axios.post(
                AI_ENDPOINTS.deepseek,
                { query: message },
                {
                    headers: {
                        "Authorization": `Bearer ${API_KEYS.deepseek}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            responseText = response.data.answer || "No answer found";
        } else if (model === "gemini-2.0-flash") {
            console.log("🔑 Gemini API Key loaded:", API_KEYS.gemini ? "✅ Yes" : "❌ No");
            const response = await axios.post(
                `${AI_ENDPOINTS.gemini}/gemini-2.0-flash:generateContent?key=${API_KEYS.gemini}`,
                geminiRequestBody,
                { headers: { "Content-Type": "application/json" } }
            );
            responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";
        }

        res.json({ response: responseText });

    } catch (error) {
        console.error("🔴 AI Request Error:", error.response?.data || error.message);
        res.status(500).json({
            error: error.response?.data?.error?.message || "Network error please connect to internet."
        });
    }
});

// app.listen(5000, () => {
//     console.log("✅ Server running on http://localhost:5000");
// });
module.exports = app; // Export the app for testing purposes