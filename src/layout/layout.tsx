import { FC, PropsWithChildren, Suspense } from "react";
import css from "./layout.module.css";

import { Link } from "react-router-dom";
import { useReactive } from "../reactive";
import { appRegistry } from "../app-registry";

type Props = PropsWithChildren;

export const Layout: FC<Props> = ({ children }) => {
  const registry = useReactive(appRegistry);

  return (
    <div className={css.root}>
      <aside className={css.aside}>
        <p>Apps</p>
        <nav>
          {registry.map((app) => (
            <Link key={app.name} to={`/${encodeURIComponent(app.name)}`}>
              {app.name}
            </Link>
          ))}{" "}
        </nav>
      </aside>
      <main className={css.main}>
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};
