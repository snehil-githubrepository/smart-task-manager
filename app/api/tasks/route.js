import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const loadTasks = () => {
  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem("tasks");
    console.log("task loaded: " + storedTasks);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
};

const saveTasks = (tasks) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

export async function GET() {
  try {
    const tasks = loadTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const newTask = await request.json();

    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.dueDate ||
      !newTask.priority
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const task = { ...newTask, id: uuidv4() };
    const tasks = loadTasks();
    tasks.push(task);

    saveTasks(tasks);

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task." },
      { status: 500 }
    );
  }
}
