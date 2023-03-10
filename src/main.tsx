import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { loader as rootLoader, action as rootAction } from "./routes/root";
import ErrorPage from "./error-page";
import { loader as todoLoader, action as todoAction } from "./routes/todo";
import { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

const Root = React.lazy(() => import("./routes/root"));
const Todo = React.lazy(() => import("./routes/todo"));
const EditTodo = React.lazy(() => import("./routes/edit"));

const router2 = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    element: (
      <React.Suspense
        fallback={
          <p>
            <i>Loading...</i>
          </p>
        }
      >
        <Root />
      </React.Suspense>
    ),
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
            // element: <Todo />,
            element: (
              <React.Suspense
                fallback={
                  <p>
                    <i>Loading...</i>
                  </p>
                }
              >
                <Todo />
              </React.Suspense>
            ),
            loader: todoLoader,
            action: todoAction,
          },
          {
            path: "todos/:todoId/edit",
            // element: <EditTodo />,
            element: (
              <React.Suspense
                fallback={
                  <p>
                    <i>Loading...</i>
                  </p>
                }
              >
                <EditTodo />
              </React.Suspense>
            ),
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
      // element={<Root />}
      element={
        <React.Suspense
          fallback={
            <p>
              <i>Loading...</i>
            </p>
          }
        >
          <Root />
        </React.Suspense>
      }
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="todos/:todoId"
          // element={<Todo />}
          element={
            <React.Suspense
              fallback={
                <p>
                  <i>Loading...</i>
                </p>
              }
            >
              <Todo />
            </React.Suspense>
          }
          loader={todoLoader}
          // action={todoAction}
        />
        <Route
          path="todos/:todoId/edit"
          // element={<EditTodo />}
          element={
            <React.Suspense
              fallback={
                <p>
                  <i>Loading...</i>
                </p>
              }
            >
              <EditTodo />
            </React.Suspense>
          }
          loader={todoLoader}
          action={editAction}
        />
        <Route path="todos/:todoId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
