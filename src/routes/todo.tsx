import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getTodo, updateTodo } from "../todos";

export async function loader({ params }: any) {
  const todo = await getTodo(params.todoId);
  if (!todo) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return todo;
}

export async function action({ request, params }: any) {
  let formData = await request.formData();
  return updateTodo(params.todoId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function todo() {
  const todo: any = useLoaderData();

  return (
    <div id="todo">
      <div>
        <img key={todo?.avatar} src={todo?.avatar || null} />
      </div>

      <div>
        <h1>
          {todo.first || todo.last ? (
            <>
              {todo.first} {todo.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {/* <Favorite todo={todo} /> */}
        </h1>

        {todo.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${todo.twitter}`}>
              {todo.twitter}
            </a>
          </p>
        )}

        {todo.notes && <p>{todo.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ todo }: any) {
  const fetcher = useFetcher();

  // yes, this is a `let` for later
  let favorite = todo.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </Form>
    </fetcher.Form>
  );
}
