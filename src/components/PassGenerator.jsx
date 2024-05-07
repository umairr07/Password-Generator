import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  upperCaseLetters,
  lowerCaseLetters,
  nums,
  uniqueSymbols,
} from "../utils/utils";

export const PassGenerator = () => {
  const [password, setPassword] = useState("");
  const [passLength, setPassLength] = useState(8);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const handleGeneratePassword = () => {
    let charList = "";

    if (upperCase) {
      charList += upperCaseLetters;
    }

    if (lowerCase) {
      charList += lowerCaseLetters;
    }

    if (numbers) {
      charList += nums;
    }

    if (symbols) {
      charList += uniqueSymbols;
    }

    setPassword(randomPasswords(charList));
  };

  const randomPasswords = (charList) => {
    let passwrds = "";
    let charListLength = charList.length;

    for (let i = 0; i < passLength; i++) {
      const charIndex = Math.round(Math.random() * charListLength);
      passwrds += charList.charAt(charIndex);
    }
    return passwrds;
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    if (password) {
      toast.success("Password Copied to Clipboard!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[50%] m-auto mt-24">
      <div>
        <h1 className="text-3xl font-bold pb-6">Password Generator</h1>
      </div>

      <div className="w-[50%] text-xl font-semibold">
        <div className="flex   pb-6">
          <h2 className=" w-full border-black border-2">{password}</h2>
          <FaCopy
            className="h-8 w-6 cursor-pointer"
            onClick={handleCopyPassword}
          />
        </div>

        <p className="text-sm text-center pb-5">
          Select Password Length between (8 - 50 Characters){" "}
        </p>

        <div className="flex justify-between pb-6">
          <span>Password Length</span>
          <input
            type="number"
            min={8}
            max={50}
            className=" w-[75px] border-black border-2"
            defaultValue={passLength}
            onChange={(e) => setPassLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <label htmlFor="">Include Upper Case</label>
            <input
              type="checkbox"
              checked={upperCase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="">Include Lower Case</label>
            <input
              type="checkbox"
              checked={lowerCase}
              onChange={(e) => setLowerCase(e.target.checked)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="">Include Numbers</label>
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="">Include Symbols</label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="bg-[#394198] text-[#fff] p-2 m-auto mt-6 rounded-lg "
            onClick={handleGeneratePassword}
          >
            Generate Password
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
