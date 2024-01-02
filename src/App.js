import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    const params = {
      q: input,
      source: from,
      target: to,
      api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    };

    axios.post("https://libretranslate.de/translate", params).then((res) => {
      console.log(res.data);
      setOutput(res.data.translatedText);
    });
  };
  const data = () => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">From ({from}):</label>
              <select
                className="form-select"
                onChange={(e) => setFrom(e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">To ({to}):</label>
              <select
                className="form-select"
                onChange={(e) => setTo(e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="8"
                placeholder="Enter text to translate"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="8"
                value={output}
                readOnly
              ></textarea>
            </div>

            <div>
              <button className="btn btn-primary" onClick={translate}>
                Translate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
