import { useState, useEffect } from "react";
export default function LogsReader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    data.map((logs) => console.log(parsePunchState(parseInt(logs[3]))));
  }, [data]);

  const handleFileRead = (e) => {
    const content = e.target.result;
    let lines = content.split("\n");
    let lineData = lines.map((line) => line.split("\t"));
    setData(lineData);
  };

  const handleFileChosen = (file) => {
    const reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Hello world!</h1>
      <input
        type="file"
        id="file"
        accept=".dat"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
      {data.map((line, index) => (
        <p key={index}>{line.join(", ")}</p>
      ))}
    </div>
  );
}

function parsePunchState(punchType) {
  switch (punchType) {
    case 0:
      return "check in";
      break;
    case 1:
      return "check out";
      break;
    case 4:
      return "overtime in";
      break;
    case 5:
      return "overtime out";
      break;
  }
}
