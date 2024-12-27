"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskWithStorage } from "@/lib/slices/taskSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function TaskForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [errors, setErrors] = useState({});

  const handleAddTask = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      status: "pending",
    };

    try {
      await dispatch(addTaskWithStorage(newTask));
      toast.success("Task added successfully!");
      router.push("/tasks");
    } catch (err) {
      toast.error("Error adding task");
    }
  };

  const getPriorityColor = (val) => {
    return (
      {
        Low: "text-green-500",
        Medium: "text-yellow-500",
        High: "text-red-500",
      }[val] || "text-gray-500"
    );
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl mx-auto px-4 py-8">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-xl p-6`}
      >
        <div className="flex items-center justify-center mb-6">
          <CheckCircle2 className="w-6 h-6 text-blue-500 mr-2" />
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Create New Task
          </h2>
        </div>

        <form onSubmit={handleAddTask} className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-600"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </div>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.description
                  ? "border-red-500"
                  : isDarkMode
                  ? "border-gray-600"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due Date
                </div>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.dueDate
                    ? "border-red-500"
                    : isDarkMode
                    ? "border-gray-600"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-900"
                }`}
              />
              {errors.dueDate && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dueDate}
                </div>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Priority
                </div>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } ${getPriorityColor(priority)}`}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
