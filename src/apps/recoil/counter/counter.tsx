import { FC } from "react";
import { useCounter } from "./data";
import css from "./counter.module.css";

export const Counter: FC = () => {
  const { counter, inc, square, powerOfTwo } = useCounter();
  return (
    <div style={{ padding: "2em" }}>
      <h1>Counter</h1>

      <div>
        <p>Value: {counter}</p>
        <button type="button" onClick={inc}>
          inc
        </button>

        <table className={css.table}>
          <tr>
            <th>Selector</th>
            <th>Value</th>
          </tr>

          <tr>
            <td>Square</td>
            <td>{square}</td>
          </tr>

          <tr>
            <td>Power of 2</td>
            <td>{powerOfTwo}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
