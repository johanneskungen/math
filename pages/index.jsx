import React, { useState } from "react";

function index() {
  const dev = true;
  const endpoint = dev
    ? "http://127.0.0.1:5001/mathmailer-dc63c/us-central1/sendMail"
    : "https://us-central1-mathmailer-dc63c.cloudfunctions.net/sendMail";
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState({
    q: "",
    email: "",
  });
  const [ai, setAi] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const fb = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt.q),
    });
    const rfb = await fb.json();
    setAi(rfb);
    setLoading(false);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <p className="input_label">Explain your math problem</p>
            <textarea
              required
              placeholder="mathquestion"
              rows={5}
              value={prompt.q}
              onChange={(e) => setPrompt({ ...prompt, q: e.target.value })}
            />
          </label>
          <label className="flex flex-col">
            <p className="input_label">Email to recieve math-links</p>
            <input
              type={"email"}
              placeholder="email address"
              value={prompt.email}
              onChange={(e) => setPrompt({ ...prompt, email: e.target.value })}
            />
          </label>
          <button type="submit">{loading ? <div className="lds-facebook scale-50"><div></div><div></div><div></div></div> : "submit"}</button>
        </form>
        <div className="aicontainer">
          <div className="aiheading">{ai && "AI response"}</div>
          <div className="ai_response text-black">{ai && ai}</div>
        </div>
    </div>
  );
}

export default index;
