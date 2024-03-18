import { FC } from "react";
import { useReactive } from "../../reactive";
import {
  $counter,
  $double,
  $doubleSquare,
  $square,
  inc,
  $combined,
  $megaCombined,
} from "./data";

export const Counter: FC = () => {
  const count = useReactive($counter);
  const square = useReactive($square);
  const double = useReactive($double);
  const doubleSquare = useReactive($doubleSquare);
  const combined = useReactive($combined);
  const megaCombined = useReactive($megaCombined);

  return (
    <section style={{ padding: "2em" }}>
      <h1>Count {count}</h1>

      <button type="button" onClick={inc}>
        increment
      </button>

      <p>Square: {square}</p>
      <p>Double: {double}</p>
      <p>Double square: {doubleSquare}</p>
      <p>
        Combined.double {combined.double} Combined.square {combined.square}{" "}
        Combined.string {combined.string}
      </p>

      <table>
        <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>megaCombined.combined</td>
            <td>{JSON.stringify(megaCombined.combined)}</td>
          </tr>

          <tr>
            <td>megaCombined.reversed</td>
            <td>{megaCombined.reversed}</td>
          </tr>
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => {
          $square(123);
        }}
      >
        manually change pipe
      </button>
    </section>
  );
};

export default Counter;
