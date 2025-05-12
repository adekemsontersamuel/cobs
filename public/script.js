async function sendMessage() {
  const model = document.getElementById("model").value;
  const message = document.getElementById("user-message").value;
  const responseContainer = document.getElementById("prompt"); // The section to append to

  if (!message.trim()) {
      const errorBox = document.createElement("div");
      errorBox.style.color = "red";
      errorBox.style.textAlign = "left"; // Align error to the left
      errorBox.style.marginBottom = "5px";
      errorBox.innerText = "Please enter a message.";
      responseContainer.appendChild(errorBox);
      setTimeout(() => errorBox.remove(), 3000); // Remove error after a few seconds
      return;
  }

  const loadingResponseBox = document.createElement("div");
  loadingResponseBox.innerHTML = "<em>Loading response...</em>";
  loadingResponseBox.style.marginTop = "10px";
  loadingResponseBox.style.textAlign = "right"; // Align loading to the right
  responseContainer.appendChild(loadingResponseBox);

  try {
      const response = await fetch("https://cobek-intelligence.onrender.com/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, model })
      });

      const data = await response.json();
      console.log("Backend raw response:", data); // For debugging

      loadingResponseBox.remove(); // Remove the loading message

      // Check if the response contains a valid response
      if (data.response) {
          const newResponseBox = document.createElement("div");
          newResponseBox.style.marginTop = "10px";
          newResponseBox.style.padding = "15px";
          newResponseBox.style.border = "1px solid #ccc";
          newResponseBox.style.borderRadius = "5px";
          newResponseBox.style.backgroundColor = "#fff"; // Optional: Add a background color
          newResponseBox.style.textAlign = "left"; // Align text within the box to the left
          newResponseBox.style.marginLeft = "auto"; // Push the box to the right
          newResponseBox.style.maxWidth = "80%"; // Optional: Limit the width
          newResponseBox.style.wordBreak = "break-word"; // Prevent long words from breaking layout
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
