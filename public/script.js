async function sendMessage() {
    const model = document.getElementById("model").value;
    const message = document.getElementById("user-message").value;
    const responseContainer = document.getElementById("prompt");
  
    if (!message.trim()) {
      const errorBox = document.createElement("div");
      errorBox.style.color = "red";
      errorBox.style.textAlign = "left";
      errorBox.style.marginBottom = "5px";
      errorBox.innerText = "Please enter a message.";
      responseContainer.appendChild(errorBox);
      setTimeout(() => errorBox.remove(), 3000);
      return;
    }
  
    const loadingResponseBox = document.createElement("div");
    loadingResponseBox.innerHTML = "<em>Loading response...</em>";
    loadingResponseBox.style.marginTop = "10px";
    loadingResponseBox.style.textAlign = "right";
    responseContainer.appendChild(loadingResponseBox);
  
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, model })
      });
  
      const data = await response.json();
      console.log("Backend raw response:", data);
  
      loadingResponseBox.remove();
  
      if (data.response) {
        const newResponseBox = document.createElement("div");
        newResponseBox.style.marginTop = "10px";
        newResponseBox.style.padding = "15px";
        newResponseBox.style.border = "1px solid #ccc";
        newResponseBox.style.borderRadius = "5px";
        newResponseBox.style.backgroundColor = "#fff";
        newResponseBox.style.textAlign = "left";
        newResponseBox.style.marginLeft = "auto";
        newResponseBox.style.maxWidth = "80%";
        newResponseBox.style.wordBreak = "break-word";
        newResponseBox.innerHTML = `<strong>${model.toUpperCase()}:</strong><br>${data.response}`;
        responseContainer.appendChild(newResponseBox);
      } else if (data.error) {
        const errorBox = document.createElement("div");
        errorBox.style.color = "red";
        errorBox.style.textAlign = "left";
        errorBox.style.marginBottom = "5px";
        errorBox.innerText = `Error: ${data.error}`;
        responseContainer.appendChild(errorBox);
      } else {
        const noResponseBox = document.createElement("div");
        noResponseBox.style.textAlign = "left";
        noResponseBox.innerText = "No response from AI.";
        responseContainer.appendChild(noResponseBox);
      }
  
    } catch (err) {
      console.error("Fetch error:", err);
      const errorBox = document.createElement("div");
      errorBox.style.color = "red";
      errorBox.style.textAlign = "left";
      errorBox.style.marginBottom = "5px";
      errorBox.innerText = "Server error. Please try again.";
      responseContainer.appendChild(errorBox);
    }
  }
  