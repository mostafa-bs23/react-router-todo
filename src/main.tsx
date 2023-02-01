import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Todo, {
  loader as todoLoader,
  action as todoAction,
} from "./routes/todo";
import EditTodo, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

const router2 = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "todos/:todoId",
            element: <Todo />,
            loader: todoLoader,
            action: todoAction,
          },
          {
            path: "todos/:todoId/edit",
            element: <EditTodo />,
            loader: todoLoader,
            action: editAction,
          },
          {
            path: "todos/:todoId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="todos/:todoId"
          element={<Todo />}
          loader={todoLoader}
          action={todoAction}
        />
        <Route
          path="todos/:todoId/edit"
          element={<EditTodo />}
          loader={todoLoader}
          action={editAction}
        />
        <Route path="todos/:todoId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
