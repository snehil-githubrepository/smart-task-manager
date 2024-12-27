"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  Edit2,
  Trash2,
  ArrowLeft,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTaskWithStorage,
  deleteTaskWithStorage,
  loadTasksFromStorage,
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

export default function SinglePage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  const { tasks, loading } = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t.id === id);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    dispatch(loadTasksFromStorage());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    const updatedTask = { ...task, ...editedTask };
    await dispatch(updateTaskWithStorage(updatedTask));
    setEditedTask({});
    setIsEditModalOpen(false);
  };

  const handleDeleteTask = async (e) => {
    e.preventDefault();
    await dispatch(deleteTaskWithStorage(id));
    router.push("/tasks");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 text-gray-400 animate-spin" />
          <span className="text-lg text-gray-600">Loading task details...</span>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Task Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The task you're looking for doesn't exist or has been deleted.
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
          onClick={() => router.push("/tasks")}
          className={`flex items-center space-x-2 mb-8 group ${
            isDarkMode ? "text-gray-200" : "text-gray-600"
          }`}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Tasks</span>
        </button>

        <div
          className={`rounded-2xl shadow-sm border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div
            className={`p-8 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <h1
                className={`text-2xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {task.title}
              </h1>
              <div
                className={`px-4 py-2 rounded-full border ${getPriorityColor(
                  task.priority
                )} text-sm font-medium`}
              >
                {task.priority}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3
                className={`text-sm font-medium mb-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Description
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {task.description}
              </p>
            </div>

            <div>
              <h3
                className={`text-sm font-medium mb-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Due Date
              </h3>
              <div className="flex items-center space-x-2">
                <Calendar
                  className={
                    isDarkMode
                      ? "w-5 h-5 text-gray-400"
                      : "w-5 h-5 text-gray-400"
                  }
                />
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {task.dueDate || "No due date set"}
                </span>
              </div>
            </div>

            <div>
              <h3
                className={`text-sm font-medium mb-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Status
              </h3>
              <div className="flex items-center space-x-2">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === "completed"
                      ? isDarkMode
                        ? "bg-green-900/30 text-green-400 border-green-800"
                        : "bg-green-50 text-green-700 border-green-200"
                      : isDarkMode
                      ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  } border`}
                >
                  {task.status?.charAt(0).toUpperCase() +
                    task.status?.slice(1) || "Pending"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "text-blue-400 border-blue-600 hover:bg-blue-900/30"
                    : "text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Task</span>
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className={`w-full max-w-lg m-4 rounded-2xl shadow-xl overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              <h3 className="text-lg font-semibold">
                Are you sure you want to delete this task?
              </h3>
              <p className="mt-2">This action is irreversible.</p>
            </div>
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className={`w-full max-w-lg m-4 rounded-2xl shadow-xl overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-6 border-b flex justify-between items-center ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}
            >
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Edit Task
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className={`p-2 hover:bg-gray-100 rounded-full ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
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
                  value={editedTask.title ?? task.title}
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
                  value={editedTask.description ?? task.description}
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
                  value={editedTask.dueDate ?? task.dueDate}
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
                  value={editedTask.priority ?? task.priority}
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
                  value={editedTask.status ?? task.status}
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
            </div>

            <div
              className={`p-6 border-t flex justify-end space-x-4 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}
            >
              <button
                onClick={() => setIsEditModalOpen(false)}
                className={`px-6 py-2 border rounded-lg transition-colors ${
                  isDarkMode
                    ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
