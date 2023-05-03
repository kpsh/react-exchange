export const About = () => {
  return (
    <section className="bg-gray-100 dark:bg-slate-900 h-screen lg:flex lg:items-end">
      <div className="container flex flex-col py-16 mx-auto">
        <h1 className="col-span-2 mx-2 mb-8 text-3xl text-center lg:text-7xl text-extrabold text-slate-700 dark:text-slate-300">
          About
        </h1>
        <div className="mx-10 text-slate-400 lg:text-xl xl:text-2xl dark:text-slate-600">
          <p className="text-slate-700 lg:text-xl xl:text-2xl dark:text-slate-300">
            React-Exchange is a platform that uses{" "}
            <a
              href="https://exchangerate.host"
              className="text-orange-500 hover:underline underline-offset-4"
            >
              https://exchangerate.host
            </a>{" "}
            API to offer various currency-related functionalities.
          </p>
          <br />
          <h2 className="text-slate-500 lg:text-xl xl:text-2xl dark:text-slate-400">
            Functionalities:
          </h2>
          <ul>
            <li>- Convert currency</li>
            <li>- View latest rates</li>
            <li>- View currency chart over different periods of time</li>
          </ul>
          <br />
          <h2 className="text-slate-500 lg:text-xl xl:text-2xl dark:text-slate-400">
            Technologies Used:
          </h2>
          <ul>
            <li>- React</li>
            <li>- React Router</li>
            <li>- Vite</li>
            <li>- Tailwind CSS and Flowbite</li>
            <li>- Chart.js</li>
            <li>- React Currency Flags</li>
            <li>- React Icons</li>
          </ul>
          <br />
          <br />
          <h2 className="text-slate-700 lg:text-xl xl:text-2xl dark:text-slate-400">
            This is a personal project to showcase my skills with React,
            Tailwind and other libraries/tools. I wanted to use an api service
            and decided on Exchangerate. The data is updated every 24 hours as
            stated in{" "}
            <a
              href="https://exchangerate.host/#/#faq"
              className="text-orange-500 hover:underline underline-offset-4"
            >
              Exchange Rate FAQ
            </a>
            , check it out for more details.
          </h2>
        </div>
      </div>
    </section>
  );
};
