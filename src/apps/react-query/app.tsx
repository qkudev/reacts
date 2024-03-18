import { FC } from "react";
import { QueryClientProvider } from "react-query";
import { client } from "./client";
import { Todos } from "./todos";

export const App: FC = () => {
  return (
    <QueryClientProvider client={client}>
      <div>
        <h1>React Query</h1>

        <Todos />
      </div>
    </QueryClientProvider>
  );
};
