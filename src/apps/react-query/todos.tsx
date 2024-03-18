import { useQuery } from "react-query";

interface Todo {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
}

export const Todos = () => {
  const { data, isLoading } = useQuery("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then(
      (res) => res.json() as Promise<Todo[]>,
    ),
  );

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
