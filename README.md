🧠 Cobek AI
Cobek AI is a unified prompt intelligence system that integrates OpenAI, Meta AI, and GitHub Copilot-style models to deliver seamless AI interactions. It is designed to test and compare outputs from different AI platforms in real-time—perfect for prompt engineering, research, and productivity enhancement.

🚀 Features
🔗 Multi-Model Integration: Connects to OpenAI (GPT models), Meta AI (LLaMA models), Gemini(Google) and Copilot-like code generators.

💬 Real-Time Prompt Testing: Input a prompt once and get responses from all three models.

🧪 Prompt Comparison: Useful for comparing output quality, tone, speed, and accuracy.

🛠️ Built with HTML, CSS, JavaScript and Node.js for backend logic.

📦 Lightweight and responsive UI for quick testing, especially on mobile.

📁 Project Structure
bash
Copy
Edit
Cobek-AI/
├── public/
│   ├── index.html          # Main frontend UI
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic
├── server/
│   ├── server.js              # Node.js Express server
│  
├── .env                    # API keys and secrets
└── README.md               # This file
🧰 Technologies Used
Frontend: HTML5, CSS3, Vanilla JavaScript

Backend: Node.js, Express.js

APIs:

OpenAI API

Meta AI (via Hugging Face or custom API endpoint)

Copilot-like API (can be replicated using GPT models or other code generators)

⚙️ Setup Instructions
Clone the repository:

bash
Copy
Edit
git clone https://github.com/adekemsontersamuel/cobs.git
cd cobek-ai
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and add your API keys:

env
Copy
Edit
OPENAI_API_KEY=your_openai_key
META_API_KEY=your_meta_api_key
COPILOT_API_KEY=your_copilot_key
Run the app:

bash
Copy
Edit
node server/app.js
Visit http://localhost:5000 in your browser.

✅ Use Case Ideas
Prompt engineering & refinement

AI education & benchmarking

Side-by-side model comparisons

Code generation productivity tool

UI for testing AI assistants

📌 Notes
Copilot-style functionality may require code model replication or integration via OpenAI Codex or GPT-4 Turbo.

Meta’s AI (LLaMA) might be hosted via Hugging Face or internal endpoints — adjust the meta.js module accordingly.

Ensure secure handling of API keys in production.

📄 License
MIT License.
Feel free to fork, contribute, and improve!

👨‍💻 Author
Developed by Adeke Msonter Samuel 
Connect on LinkedIn • Twitter • City Hackz
