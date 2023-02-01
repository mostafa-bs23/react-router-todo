import { useEffect, useState } from "react";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getTodos, createTodo } from "../todos";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const q: any = url.searchParams.get("q");
  const todos = await getTodos(q);
  return { todos, q };
}

export async function action() {
  const todo = await createTodo();
  return redirect(`/todos/${todo.id}/edit`);
}

export default function Root() {
  const navigation = useNavigation();
  const { todos, q }: any = useLoaderData();
  const [query, setQuery] = useState(q);
  const submit = useSubmit();

  // useEffect(() => {
  //   // setQuery(q);
  //   document.getElementById("q").value = q;
  // }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1>React Router todos</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search todos"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? "loading" : ""}
              defaultValue={q}
              // value={query}
              // onChange={(e) => {
              //   setQuery(e.target.value);
              // }}
              onChange={(event) => {
                // submit(event.currentTarget.form);
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {todos.length ? (
            <ul>
              {todos.map((todo: any) => (
                <li key={todo.id}>
                  <NavLink
                    to={`todos/${todo.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {/* other code */}
                    <Link to={`todos/${todo.id}`}>
                      {todo.first || todo.last ? (
                        <>
                          {todo.first} {todo.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {todo.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No todos</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
