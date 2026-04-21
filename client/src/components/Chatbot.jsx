import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Welcome to EarlyBird! How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  /* AUTO SCROLL */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* BOT RESPONSE LOGIC */
  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("product"))
      return "We offer chai, cosmetics, wellness & more 🛍️";

    if (msg.includes("price"))
      return "Prices start from ₹99 and vary by product 💰";

    if (msg.includes("order"))
      return "You can order directly from the Products page 📦";

    if (msg.includes("profit"))
      return "Our platform helps you earn 20-40% profit 📈";

    return "I'm here to help! Try asking about products, orders or profits 😊";
  };

  /* SEND MESSAGE */
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { text, sender: "user" };
    const botMsg = { text: getBotReply(text), sender: "bot" };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  /* QUICK REPLIES */
  const quickReplies = [
    "Show products",
    "Prices?",
    "How to order?",
    "Profit margin"
  ];

  return (
    <>
      {/* FLOAT BUTTON */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="chat-container">

          {/* HEADER */}
          <div className="chat-header">
            EarlyBird Assistant
          </div>

          {/* MESSAGES */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK BUTTONS */}
          <div className="quick-replies">
            {quickReplies.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}>Send</button>
          </div>

        </div>
      )}
    </>
  );
}