import {
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import CurrencyFlag from "react-currency-flags";

export const Convert = () => {
  const [isConvertedFrom, setConvertFrom] = useState(false);
  const [isConvertedTo, setConvertTo] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("ALL");
  const [selectedCurrency1, setSelectedCurrency1] = useState("AED");

  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setInputValue(event.target.value);
  }

  interface Currency {
    code: string;
    description: string;
  }

  interface Symbols {
    [key: string]: Currency;
  }

  const [symbols, setSymbols] = useState<Symbols | null>(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((response) => response.json())
      .then((data) => setSymbols(data.symbols))
      .catch((error) => console.log(error));
  }, []);

  const [apiResult, setApiResult] = useState("");

  async function convert() {
    const response = await fetch(
      "https://api.exchangerate.host/convert?from=" +
        selectedCurrency +
        "&to=" +
        selectedCurrency1 +
        "&amount=" +
        inputValue
    );
    const data = await response.json();
    setApiResult(data.result);
  }

  return (
    <section className="bg-gray-100 dark:bg-slate-900 h-screen lg:flex lg:items-center">
      <div className="container flex flex-col py-16 mx-auto">
        <h1 className="col-span-2 mx-2 mb-16 text-3xl text-center lg:mb-24 lg:text-7xl text-extrabold text-slate-700 dark:text-slate-300">
          Convert from <CurrencyFlag currency={selectedCurrency} size="xl" /> to{" "}
          <CurrencyFlag currency={selectedCurrency1} size="xl" />
        </h1>
        <div className="grid grid-cols-1 gap-5 m-5 md:grid-cols-12 md:m-2 lg:m-0">
          <div className="md:col-span-3">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 bg-slate-300 dark:bg-slate-600 py-3.5 px-3 text-left text-xl text-gray-900 dark:text-white"
              placeholder="Enter value here..."
            />
          </div>

          <div className="relative md:col-span-4">
            <button
              type="button"
              onClick={() => setConvertFrom(!isConvertedFrom)}
              className="flex items-center px-3 py-4 w-full text-left text-gray-900 rounded-md bg-slate-400 dark:bg-slate-700 dark:text-white"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <CurrencyFlag currency={selectedCurrency} size="lg" />
              <span className="block ml-3 truncate">
                {selectedCurrency ? selectedCurrency : "Select currency..."}
              </span>
              <span className="flex absolute inset-y-0 right-0 items-center pr-4 ml-3 pointer-events-none">
                {!isConvertedFrom ? <FaChevronDown /> : <FaChevronUp />}
              </span>
            </button>
            <ul
              className={`${
                isConvertedFrom ? "block animate-fade-in" : "hidden"
              } absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-300 dark:bg-slate-600 text-gray-900 dark:text-white`}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              {symbols &&
                Object.entries(symbols).map(([code, currency]) => (
                  <li
                    className="flex relative items-center py-2 pr-9 pl-3 select-none hover:bg-slate-400 hover:dark:bg-slate-500"
                    onClick={() => {
                      setSelectedCurrency(code);
                      setConvertFrom(!isConvertedFrom);
                    }}
                    id="listbox-option-0"
                    role="option"
                  >
                    <CurrencyFlag currency={code} size="lg" />
                    <span
                      className="block ml-3 font-normal truncate"
                      key={code}
                    >
                      {currency.description}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="hidden justify-center items-center mx-4 text-5xl text-slate-400 dark:text-slate-600 md:flex">
            <FaArrowCircleRight />
          </div>

          <div className="flex justify-center mx-4 text-4xl text-slate-400 dark:text-slate-600 md:hidden">
            <FaArrowCircleDown />
          </div>

          <div className="relative md:col-span-4">
            <button
              type="button"
              onClick={() => setConvertTo(!isConvertedTo)}
              className="flex items-center px-3 py-4 w-full text-left text-gray-900 rounded-md bg-slate-400 dark:bg-slate-700 dark:text-white"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <CurrencyFlag currency={selectedCurrency1} size="lg" />
              <span className="block ml-3 truncate">
                {selectedCurrency1 ? selectedCurrency1 : "Select currency..."}
              </span>
              <span className="flex absolute inset-y-0 right-0 items-center pr-4 ml-3 pointer-events-none">
                {!isConvertedTo ? <FaChevronDown /> : <FaChevronUp />}
              </span>
            </button>
            <ul
              className={`${
                isConvertedTo ? "block animate-fade-in" : "hidden"
              } absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-300 dark:bg-slate-600 text-gray-900 dark:text-white`}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              {symbols &&
                Object.entries(symbols).map(([code, currency]) => (
                  <li
                    className="flex relative items-center py-2 pr-9 pl-3 select-none hover:bg-slate-400 hover:dark:bg-slate-500"
                    onClick={() => {
                      setSelectedCurrency1(code);
                      setConvertTo(!isConvertedTo);
                    }}
                    id="listbox-option-0"
                    role="option"
                  >
                    <CurrencyFlag currency={code} size="lg" />
                    <span
                      className="block ml-3 font-normal truncate"
                      key={code}
                    >
                      {currency.description}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <hr className="m-3 my-5 rounded-full border-2 border-slate-200 dark:border-slate-800 lg:my-20 lg:m-0" />

        <div className="grid grid-cols-2 gap-5 items-center m-5 md:grid-cols-4 md:m-2 lg:m-0">
          <h2 className="col-span-2 text-lg md:col-span-3 text-slate-700 lg:text-2xl xl:text-3xl dark:text-slate-300 text-center md:text-left">
            {apiResult} <CurrencyFlag currency={selectedCurrency1} size="lg" />{selectedCurrency1}
          </h2>
          <button
            onClick={convert}
            className="col-span-2 px-3 py-4 text-gray-100 rounded-md md:col-span-1 bg-slate-700 dark:bg-slate-400 dark:text-slate-900 hover:dark:bg-slate-500 hover:bg-slate-500"
          >
            Convert
          </button>
        </div>
      </div>
    </section>
  );
};
