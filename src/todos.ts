import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTodos(query?: string) {
  await fakeNetwork(`getTodos:${query}`);
  let todos: any = await localforage.getItem("todos");
  if (!todos) todos = [];
  if (query) {
    todos = matchSorter(todos, query, { keys: ["first", "last"] });
  }
  return todos.sort(sortBy("last", "createdAt"));
}

export async function createTodo() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let todo = { id, createdAt: Date.now() };
  let todos = await getTodos();
  todos.unshift(todo);
  await set(todos);
  return todo;
}

export async function getTodo(id: string) {
  await fakeNetwork(`todo:${id}`);
  let todos: any = await localforage.getItem("todos");
  let todo = todos.find((todo: any) => todo.id === id);
  return todo ?? null;
}

export async function updateTodo(id: any, updates: object) {
  await fakeNetwork();
  let todos: any = await localforage.getItem("todos");
  let todo = todos.find((todo: any) => todo.id === id);
  if (!todo) throw new Error("No todo found for", id);
  Object.assign(todo, updates);
  await set(todos);
  return todo;
}

export async function deleteTodo(id: any) {
  let todos: any = await localforage.getItem("todos");
  let index = todos.findIndex((todo: any) => todo.id === id);
  if (index > -1) {
    todos.splice(index, 1);
    await set(todos);
    return true;
  }
  return false;
}

function set(todos: any) {
  return localforage.setItem("todos", todos);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};

async function fakeNetwork(key?: any): Promise<any> {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}