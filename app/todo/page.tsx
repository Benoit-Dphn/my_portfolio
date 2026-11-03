import { createTask, getTasks, deleteTask } from "@/lib/tasks";

export default async function () {
  const tasks = await getTasks();
  return (
    <>
      <form action={createTask}>
        <label>
          New task: <input name="title" />
        </label>
        <button>Submit</button>
      </form>
      <ul>
        {tasks.map((task, id) => (
          <form action={deleteTask.bind(null, id)} key={id}>
            <li>{task.title}</li>
            <button>Delete task</button>
          </form>
        ))}
      </ul>
    </>
  );
}
