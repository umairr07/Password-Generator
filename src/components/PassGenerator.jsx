import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  upperCaseLetters,
  lowerCaseLetters,
  nums,
  uniqueSymbols,
} from "../utils/utils";
import "../index.css";

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

    if (charList.length === 0) {
      toast.error("Please select atleast one option", {
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

    if (passLength < 8 || passLength > 50) {
      toast.error("Password length should be between 8 and 50", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
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

    if (password === "") {
      toast.warn("Please Generate Password", {
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
    <div className="flex flex-col justify-center items-center w-[500px] h-[600px] m-auto mt-12 bg-[#fff] shadow-3xl rounded-lg">
      <div>
        <h1 className="text-3xl font-bold pb-6">Password Generator</h1>
      </div>

      <div className="w-[90%] ">
        <div className="flex mb-6 p-2 border-black border-2">
          <h2 className=" w-full font-semibold">{password}</h2>
          <FaRegCopy
            className="h-8 w-6 cursor-pointer  "
            onClick={handleCopyPassword}
          />
        </div>

        <p className="text-sm text-center pb-5 italic font-medium">
          Select Password Length between (8 - 50 Characters){" "}
        </p>

        <div className="flex justify-between pb-6">
          <span className="text-xl font-bold">Password Length</span>
          <input
            type="number"
            min={8}
            max={50}
            className=" w-[75px] border-black border-2"
            defaultValue={passLength}
            onChange={(e) => setPassLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5 font-semibold">
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
