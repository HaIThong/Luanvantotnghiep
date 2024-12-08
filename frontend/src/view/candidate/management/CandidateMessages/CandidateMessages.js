import { useState, useEffect } from "react";
import "./CandidateMessages.css";

export default function CandidateMessages({ candidateId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessages =
      JSON.parse(localStorage.getItem("candidateMessages")) || [];
    const candidateMessages = allMessages.find(
      (item) => item.candidateId === candidateId
    );

    setMessages(candidateMessages ? candidateMessages.messages : []);
  }, [candidateId]);

  return (
    <div className="candidate-messages">
      <h2>Tin nhắn đã nhận</h2>
      {messages.length > 0 ? (
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="message-item">
              <div className="message-header">
                <img
                  src={msg.companyLogo || "https://via.placeholder.com/50"}
                  alt={msg.sender}
                  className="company-logo"
                />
                <div>
                  <p>
                    <strong>{msg.sender}</strong>
                  </p>
                  <a
                    href={msg.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-link"
                  >
                    Xem thông tin công ty
                  </a>
                </div>
              </div>
              <p className="message-content">{msg.content}</p>
              <small className="message-timestamp">
                {new Date(msg.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có tin nhắn nào.</p>
      )}
    </div>
  );
}
