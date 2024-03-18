import { MouseEvent, useState } from "react";
import css from "./app.module.css";
import { Link } from "react-router-dom";
import { Form } from "./features/form";
import { Todos } from "./features/todos/components";
import { AppComponent } from "./utils/constants";

export const App = () => {
  const [tab, setTab] = useState<AppComponent>(AppComponent.TODOS);

  const onLinkClick =
    (nextTab: typeof tab) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setTab(nextTab);
    };

  return (
    <>
      <nav className={css.nav}>
        <Link
          to="/todos"
          className={tab === "todos" ? css.active : ""}
          onClick={onLinkClick(AppComponent.TODOS)}
        >
          Todos
        </Link>

        <Link
          to="/form"
          className={tab === "form" ? css.active : ""}
          onClick={onLinkClick(AppComponent.FORM)}
        >
          Form
        </Link>
      </nav>

      <section className={css.root}>
        {tab === "form" ? <Form /> : null}
        {tab === "todos" ? <Todos /> : null}
      </section>
    </>
  );
};
