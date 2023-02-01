import { redirect } from "react-router-dom";
import { deleteTodo } from "../todos";

export async function action({ params }: any) {
  await deleteTodo(params.todoId);
  return redirect("/");
}
