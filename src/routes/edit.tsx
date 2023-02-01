import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateTodo } from "../todos";

export async function action({ request, params }: any) {
  const formData = await request.formData();
  const todoName = formData.get("name");
  const updates = Object.fromEntries(formData);
  updates.name;
  await updateTodo(params.todoId, updates);
  return redirect(`/todos/${params.todoId}`);
}

export default function editTodo() {
  const navigate = useNavigate();
  const todo: any = useLoaderData();

  return (
    <Form method="post" id="todo-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={todo.first}
        />
      </p>
      <label>
        <span>Task Image URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={todo.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={todo.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
