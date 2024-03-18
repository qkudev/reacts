import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/apps/redux-app/redux-typed";
import { TodosFilter, todosActions, todosSlice } from "../data";
import css from "./todos.module.css";
import { withAppComponent } from "src/apps/redux-app/services/error-tracker";
import { AppComponent } from "src/apps/redux-app/utils/constants";

export const Todos: FC = withAppComponent(() => {
  const [filter, setFilter] = useState<TodosFilter>(TodosFilter.ALL);
  const todos = useAppSelector((state) =>
    todosSlice.selectors.getTodosWithFilter(state, filter),
  );

  const selectRef = useRef<HTMLSelectElement>(null);
  const handleForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const select = selectRef.current;
      if (!select) {
        return;
      }

      setFilter(select.value as unknown as TodosFilter);
    },
    [setFilter],
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(todosActions.fetch());
  }, [dispatch]);

  useEffect(() => {
    dispatch(todosActions.fetchError());
  }, [dispatch]);

  const reducerError = useCallback(() => {
    dispatch(todosActions.setWithError());
  }, []);

  return (
    <>
      <form onSubmit={handleForm} className={css.form}>
        <select name="filter" ref={selectRef}>
          {Object.values(TodosFilter).map((filterType) => (
            <option key={filterType}>{filterType}</option>
          ))}
        </select>

        <button type="submit">Filter</button>

        <button type="button" onClick={reducerError}>
          Reducer error
        </button>
      </form>

      <ul className={css.todos}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>

            <span>{todo.completed ? "✅" : null}</span>
          </li>
        ))}
      </ul>
    </>
  );
}, AppComponent.TODOS);
