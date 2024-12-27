"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTasksFromStorage,
  updateTaskWithStorage,
} from "@/lib/slices/taskSlice";

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-700 border-red-200";
    case "medium":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState({});
  const tasks = useSelector((state) => state.tasks.tasks);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(loadTasksFromStorage());
    }
  }, [dispatch, tasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const foundTask = tasks.find((task) => task.id === id);
      setEditedTask(foundTask || {});
    }
  }, [id, tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    // Dispatch update action
    dispatch(updateTaskWithStorage(editedTask));
    router.push(`/tasks/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="text-lg text-gray-600">Loading task details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!editedTask) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Task Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The task you're trying to edit doesn't exist or has been deleted.
        </p>
        <button
          onClick={() => router.push("/tasks")}
          className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Task List</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.push(`/tasks/${id}`)}
          className={`flex items-center space-x-2 mb-8 group ${
            isDarkMode ? "text-gray-200" : "text-gray-600"
          }`}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Task</span>
        </button>

        <div
          className={`rounded-2xl shadow-sm border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="p-8 space-y-8">
            <h1
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Edit Task
            </h1>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={editedTask.title || ""}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={editedTask.description || ""}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={editedTask.dueDate || ""}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Priority
              </label>
              <select
                name="priority"
                value={editedTask.priority || ""}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Status
              </label>
              <select
                name="status"
                value={editedTask.status ?? editedTask.status}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={handleSaveEdit}
                className="px-6 py-3 rounded-lg border bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => router.push(`/tasks/${id}`)}
                className="px-6 py-3 rounded-lg border text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
