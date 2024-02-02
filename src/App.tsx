import Forecast from "./components/Forcast";
import Search from "./components/Search";

import useForecast from "./hooks/useForcast";

const App = (): JSX.Element => {
  const { forcast, options, term, onOptionsSelect, onSubmit, onInputChange } =
    useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 to-sky-400 h-full pb-20 w-full">
      {forcast ? (
        <Forecast data={forcast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionsSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};

export default App;
