import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Layout } from "./layout";
import { always } from "./utils/always";

const x = {
  a: {
    b: {
      c: 1,
    },
  },
} as const;

console.log(x.a.b.c);

interface Person {
  firstName: string;
  lastName: string;
}

const john: Person = {
  firstName: "John",
  lastName: "Snow",
};

const logPerson = (person: Person) => {
  console.log(`Hello, ${person.firstName} ${person.lastName}`);
};

logPerson(john);

const App = always(
  <BrowserRouter>
    <Layout>
      <Router />
    </Layout>
  </BrowserRouter>,
);

export default App;
