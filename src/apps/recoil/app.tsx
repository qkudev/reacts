import { FC } from "react";
import { RecoilRoot } from "recoil";
import { Counter } from "./counter";

export const App: FC = () => {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
};
