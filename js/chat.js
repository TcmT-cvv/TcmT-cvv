/* ============================================
   Live Chat Widget
   Simulated agent responses with keyword matching.
   Include this script on any page to add the chat
   floating button and window.
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Inject chat HTML
  const chatHTML = `
    <button class="chat-fab" id="chatFab" title="Chat with us">&#128172;</button>
    <div class="chat-window" id="chatWindow">
      <div class="chat-header">
        <span>PrintPro Support</span>
        <button class="close-chat" id="chatClose">&times;</button>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input-area">
        <input type="text" id="chatInput" placeholder="Type a message..." autocomplete="off" />
        <button id="chatSend">&#10148;</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", chatHTML);

  const fab = document.getElementById("chatFab");
  const win = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("chatClose");
  const messagesEl = document.getElementById("chatMessages");
  const input = document.getElementById("chatInput");
  const sendBtn = document.getElementById("chatSend");

  let isOpen = false;

  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle("open", isOpen);
    if (isOpen) {
      loadHistory();
      if (messagesEl.children.length === 0) {
        appendMsg("agent", "Hello! Welcome to PrintPro Document Services. How can I help you today?");
        Store.addChatMessage("agent", "Hello! Welcome to PrintPro Document Services. How can I help you today?");
      }
      input.focus();
    }
  }

  fab.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  function appendMsg(role, text) {
    const div = document.createElement("div");
    div.className = "chat-msg " + role;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function loadHistory() {
    messagesEl.innerHTML = "";
    const history = Store.getChatHistory();
    history.forEach(m => appendMsg(m.role, m.text));
  }

  function getAgentReply(userText) {
    const lower = userText.toLowerCase();

    if (lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("pricing") || lower.includes("quote")) {
      return "Our pricing depends on the document type, quantity, and finishing options. Business cards start at $29.99/500, flyers from $0.08/each, and brochures from $0.35/each. For a custom quote, please visit our Contact page or tell me what you need!";
    }
    if (lower.includes("track") || lower.includes("order") || lower.includes("status")) {
      return "You can track your order on our Order Tracking page. Just enter your order ID (e.g., ORD-DEMO001) and we'll show you the current status. Need help finding your order ID? Check your confirmation email.";
    }
    if (lower.includes("time") || lower.includes("long") || lower.includes("turnaround") || lower.includes("delivery") || lower.includes("ship")) {
      return "Standard turnaround is 3-5 business days. Rush orders (1-2 days) are available for an additional fee. Shipping typically takes 2-4 business days depending on your location.";
    }
    if (lower.includes("paper") || lower.includes("stock") || lower.includes("material")) {
      return "We offer a wide range of paper stocks: standard 80lb text, 100lb gloss, 14pt cardstock, recycled options, and premium linen. Let me know what type of project you're working on and I can recommend the best option.";
    }
    if (lower.includes("file") || lower.includes("format") || lower.includes("upload") || lower.includes("design")) {
      return "We accept PDF, AI, PSD, PNG, and JPEG files. For best results, please submit print-ready PDFs at 300 DPI with 0.125\" bleed. Need help with your design? We offer design services starting at $49.";
    }
    if (lower.includes("cancel") || lower.includes("refund")) {
      return "Orders can be cancelled before they enter production. For cancellations, please contact us immediately with your order ID. Refunds are processed within 5-7 business days. Visit our Contact page to submit a cancellation request.";
    }
    if (lower.includes("business card")) {
      return "Our business cards come in standard (3.5x2\") or custom sizes. Options include matte, glossy, soft-touch, and spot UV finishes. Prices start at $29.99 for 500 cards. Would you like a quote?";
    }
    if (lower.includes("poster") || lower.includes("banner") || lower.includes("large format")) {
      return "We print posters and banners in sizes ranging from 11x17\" to 48x96\". Available on photo paper, cardstock, vinyl, and fabric. Large format orders typically ship within 5-7 business days.";
    }
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      return "Hi there! How can I help you with your printing needs today?";
    }
    if (lower.includes("thank") || lower.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    if (lower.includes("bye") || lower.includes("goodbye")) {
      return "Thank you for chatting with PrintPro! Have a great day. Feel free to reach out anytime you need us.";
    }
    if (lower.includes("human") || lower.includes("agent") || lower.includes("person") || lower.includes("representative")) {
      return "I'd be happy to connect you with a human representative. Please visit our Contact page to submit a message, or call us at (555) 123-4567 during business hours (Mon-Fri 9AM-6PM EST).";
    }
    return "Thanks for your message! I can help with pricing, order tracking, paper options, file formats, turnaround times, and more. Could you tell me more about what you need? For complex inquiries, our Contact page is also available.";
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMsg("user", text);
    Store.addChatMessage("user", text);
    input.value = "";

    // Simulate typing delay
    setTimeout(() => {
      const reply = getAgentReply(text);
      appendMsg("agent", reply);
      Store.addChatMessage("agent", reply);
    }, 600);
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
