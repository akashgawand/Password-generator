import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*?";

    for (let index = 0; index < length; index++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select(password);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto my-6 h-auto mt-20 shadow-xl rounded-xl bg-gradient-to-r from-gray-700 to-black">
        <h1 className="text-white text-4xl flex justify-center p-4">
          Password Generator
        </h1>

        <div className="flex items-center justify-center overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            className="w-full outline-none h-10 px-4 rounded-xl flex flex-col items-center mt-5 mb-5 ml-5"
            readOnly
          />
          <button
            className="text-white text-xl bg-teal-500 h-10 rounded-xl mx-5 shrink-0 p-2 outline-none flex items-center"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            className="text-white text-xl bg-blue-500 h-10 rounded-xl mx-5 p-2 outline-none flex items-center"
            onClick={passwordGenerator}
          >
            Generate
          </button>
        </div>

        <div className="flex gap-x-2 text-lg text-white p-4">
          <div className="flex items-center gap-x-1 p-2">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label className="p-1">length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 p-2">
            <input
              type="checkbox"
              checked={numAllowed}
              id="numInput"
              className="cursor-pointer"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput"> Numbers </label>
          </div>

          <div className="flex items-center gap-x-1 p-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput"> Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
