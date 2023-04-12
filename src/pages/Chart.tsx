import { useEffect, useState } from "react";
import CurrencyFlag from "react-currency-flags";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FcLineChart } from "react-icons/fc";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  scales,
} from "chart.js";

export const Chart = () => {
  const [baseCurrency, setBaseCurrency] = useState("CHF");
  const [isopen, setOpen] = useState(false);

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
      })
      .catch((error) => console.log(error));
  }, []);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const currencies = [
    { code: "USD", flag: "usd" },
    { code: "EUR", flag: "eur" },
    { code: "GBP", flag: "gbp" },
    { code: "JPY", flag: "jpy" },
    { code: "AUD", flag: "aud" },
  ];

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }>({
    labels: ["Select options to load chart!"],
    datasets: [
      {
        label: "",
        data: [0],
        fill: false,
        borderColor: "rgba(0, 0, 0, 0)",
        tension: 0.1,
      },
    ],
  });

  const [selectedRange, setSelectedRange] = useState("");

  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const subtractDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - days);
    return newDate;
  };

  const subtractMonths = (date: Date, months: number) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - months);
    return newDate;
  };

  const subtractYears = (date: Date, years: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - years);
    return newDate;
  };

  const handleChange = async (selectedRange: string) => {
    const startDate =
      selectedRange === "1W"
        ? getFormattedDate(subtractDays(new Date(), 7))
        : selectedRange === "1M"
        ? getFormattedDate(subtractMonths(new Date(), 1))
        : selectedRange === "1Y"
        ? getFormattedDate(subtractYears(new Date(), 1))
        : getFormattedDate(subtractYears(new Date(), 10));

    const response = await fetch(
      `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${todayDate}&symbols=${selectedCurrency}&base=${baseCurrency}`
    );
    const data = await response.json();

    type Rate = {
      [currency: string]: number;
    };

    const newChartData = {
      labels: Object.keys(data.rates),
      datasets: [
        {
          label: selectedCurrency,
          data: Object.values(data.rates).map(
            (rate) => (rate as Rate)[selectedCurrency]
          ),
          fill: false,
          borderColor: "#4B5563",
          tension: 0.1,
        },
      ],
    };

    setChartData(newChartData);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    zoomPlugin
  );

  return (
    <section className="h-full bg-gray-100 dark:bg-slate-900 lg:flex lg:items-center">
      <div className="container flex flex-col py-16 mx-auto">
        <h1 className="col-span-2 mx-2 my-20 text-3xl inline-flex justify-center lg:mb-24 lg:text-7xl text-extrabold text-slate-700 dark:text-slate-300">
          Currency Chart <FcLineChart />
        </h1>

        <div className="grid grid-cols-1 gap-5 m-5 md:grid-cols-12 md:m-2 lg:m-0">
          <div className="relative md:col-span-3">
            <button
              type="button"
              onClick={() => setOpen(!isopen)}
              className="flex items-center px-3 py-4 w-full text-left text-gray-900 rounded-md bg-slate-400 dark:bg-slate-700 dark:text-white"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <CurrencyFlag currency={baseCurrency} size="lg" />
              <span className="block ml-3 truncate">
                {baseCurrency ? baseCurrency : "Select currency..."}
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
                      setBaseCurrency(code);
                      setOpen(!isopen);
                      handleChange(code);
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

          <div className="relative md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 px-4 w-full inline-flex items-center justify-center text-gray-900 rounded-md bg-slate-400 dark:bg-slate-700 dark:text-white">
            {currencies.map((currency) => (
              <label
                key={currency.code}
                className={`flex items-center p-3 py-3 md:py-2 md:my-2 ${
                  selectedCurrency === currency.code
                    ? "bg-slate-300 dark:bg-slate-600 rounded"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="currency"
                  value={currency.code}
                  checked={selectedCurrency === currency.code}
                  onChange={() => {
                    setSelectedCurrency(currency.code);
                    handleChange(currency.code);
                  }}
                />
                <CurrencyFlag currency={currency.code} size="lg" />
              </label>
            ))}
          </div>

          <div className="relative md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-3 px-4 w-full inline-flex items-center justify-center text-gray-900 rounded-md bg-slate-400 dark:bg-slate-700 dark:text-white">
            {["1W", "1M", "1Y", "10Y"].map((range) => (
              <label
                key={range}
                className={`flex items-center p-4 py-3 md:py-2 md:my-2 ${
                  selectedRange === range
                    ? "bg-slate-300 dark:bg-slate-600 rounded p-2"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  value={range}
                  checked={selectedRange === range}
                  onChange={() => {
                    setSelectedRange(range);
                    handleChange(range);
                  }}
                />
                {range}
              </label>
            ))}
          </div>
        </div>

        <hr className="m-3 mb-5 rounded-full border-2 border-slate-200 dark:border-slate-800 lg:mb-20 lg:mt-10 lg:m-0" />

        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: true,
                ticks: {
                  autoSkip: false,
                },
              },
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  drag: {
                    enabled: true,
                    drawTime: "beforeDraw",
                  },
                  pinch: {
                    enabled: true,
                  },
                  wheel: {
                    enabled: true,
                  },
                  mode: "x",
                },
              },
            },
          }}
        />
      </div>
    </section>
  );
};
