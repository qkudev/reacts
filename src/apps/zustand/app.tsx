import { useCallback } from "react";
import { useCounter } from "./data";
import { useContainer } from "src/container";

export const App = () => {
  const { value, inc } = useCounter();
  const analytics = useContainer("analytics");
  const handleClick = useCallback(() => {
    inc();
    analytics.event({
      name: "counter.inc",
      data: value,
    });
  }, [analytics, inc, value]);

  return (
    <section className="section">
      <h1>Zustand {value}</h1>

      <button type="button" onClick={handleClick}>
        inc
      </button>
    </section>
  );
};

export default App;
