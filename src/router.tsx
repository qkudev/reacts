import { Routes, Route, Navigate } from "react-router-dom";

import { createElement, memo } from "react";
import { useReactive } from "./reactive";
import { appRegistry } from "./app-registry";

export const Router = memo(() => {
  const registry = useReactive(appRegistry);

  return (
    <Routes>
      {registry.map((app) => (
        <Route
          key={app.name}
          path={`/${encodeURIComponent(app.name)}`}
          element={createElement(app.Component)}
        />
      ))}
      <Route path="*" element={<Navigate to="/counter" />} />
    </Routes>
  );
});
