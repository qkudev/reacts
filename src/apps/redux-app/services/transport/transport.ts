import axios from "axios";

export const makeTransport = () => {
  const transport = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  return transport;
};

export type HttpTransport = ReturnType<typeof makeTransport>;
