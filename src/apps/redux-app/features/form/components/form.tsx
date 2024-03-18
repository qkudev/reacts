import { ChangeEvent, FC, FormEvent, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/apps/redux-app/redux-typed";
import { formSlice } from "../data";
import css from "./form.module.css";
import { withAppComponent } from "src/apps/redux-app/services/error-tracker";
import { AppComponent } from "src/apps/redux-app/utils/constants";

export const Form: FC = withAppComponent(() => {
  const input = useAppSelector(formSlice.selectors.getInput);

  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(formSlice.actions.setInput(event.target.value));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("value ", input);
    },
    [input],
  );

  const componentError = useCallback(() => {
    throw new Error("ComponentError");
  }, []);

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input value={input} onChange={handleChange} />
      <button type="submit" disabled={!input}>
        Submit
      </button>
      <button type="button" onClick={componentError}>
        Component error
      </button>
    </form>
  );
}, AppComponent.FORM);
