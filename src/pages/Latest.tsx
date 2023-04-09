import { useEffect, useState } from "react";
import CurrencyFlag from "react-currency-flags";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const Latest = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [isopen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  interface Currency {
    code: string;
    description: string;
  }

  interface Symbols {
    [key: string]: Currency;
  }

  const [symbols, setSymbols] = useState<Symbols>({});

  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((response) => response.json())
      .then((data) => {
        setSymbols(data.symbols);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  type ExchangeRate = [string, number];
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.exchangerate.host/latest?base=" + selectedCurrency)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(Object.entries(data.rates));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [selectedCurrency]);

  return (
    <section className="h-full bg-gray-100 dark:bg-slate-900 lg:flex lg:items-center">
      <div className="container flex flex-col py-16 mx-auto">
        <h1 className="col-span-2 mx-2 my-20 text-3xl text-center lg:mb-24 lg:text-7xl text-extrabold text-slate-700 dark:text-slate-300">
          Latest rates for{" "}
          <CurrencyFlag currency={selectedCurrency} height={44} />{" "}
          {selectedCurrency}
        </h1>

        <div className="grid grid-cols-1 gap-5 m-5 md:grid-cols-12 md:m-2 lg:m-0">
          <div className="relative md:col-span-4">
            <button
              type="button"
              onClick={() => setOpen(!isopen)}
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
                {!isopen ? <FaChevronDown /> : <FaChevronUp />}
              </span>
            </button>
            <ul
              className={`${
                isopen ? "block animate-fade-in" : "hidden"
              } absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-300 dark:bg-slate-600 text-gray-900 dark:text-white`}
              role="listbox"
              aria-labelledby="listbox-label"
            >
              {symbols &&
                Object.entries(symbols).map(([code, currency]) => (
                  <li
                    className="flex relative items-center py-2 pr-9 pl-3 select-none hover:bg-slate-400 hover:dark:bg-slate-500"
                    onClick={() => {
                      setSelectedCurrency(code);
                      setOpen(!isopen);
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

        <hr className="m-3 mb-5 rounded-full border-2 border-slate-200 dark:border-slate-800 lg:mb-20 lg:mt-10 lg:m-0" />

        <div className="grid grid-cols-2 gap-5 items-center m-5 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10 3xl:grid-cols-12 md:m-2 lg:m-0">
          {isLoading ? (
            <p className="py-2 px-4 text-2xl rounded-3xl text-slate-900 bg-slate-300 dark:bg-slate-600 dark:text-slate-300">
              Loading...
            </p>
          ) : (
            exchangeRates.map(([currency, rate]) => (
              <p
                key={currency}
                className="p-2 text-slate-900 rounded-md bg-slate-300 dark:bg-slate-600 dark:text-slate-300 hover:dark:bg-slate-700 hover:bg-slate-400"
              >
                <CurrencyFlag currency={currency} size="md" /> {currency}
                <p>{rate}</p>
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
