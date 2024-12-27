"use client";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTasksFromStorage } from "@/lib/slices/taskSlice";
import { useAuthMiddleware } from "@/lib/authMiddleware";

export default function Dashboard() {
  const isAuthenticated = useAuthMiddleware();

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadTasksFromStorage());
    }
  }, [isAuthenticated, dispatch]);

  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const overdueTasks = tasks.filter(
    (task) => task.status === "pending" && new Date(task.dueDate) < new Date()
  ).length;

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`mx-auto mt-16 p-6 max-w-6xl rounded-xl transition-colors duration-200 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <h1
        className={`text-3xl font-semibold mb-6 ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Dashboard
      </h1>

      {/* Task Overview */}
      <div
        className={`shadow-lg rounded-xl p-6 ${
          isDarkMode
            ? "bg-gray-700 shadow-gray-900/30"
            : "bg-white shadow-gray-100/50"
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Task Overview
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Tasks
            </div>
            <div
              className={`text-lg font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {tasks.length}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Completed Tasks
            </div>
            <div className="text-lg font-semibold text-green-500">
              {completedTasks}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Pending Tasks
            </div>
            <div className="text-lg font-semibold text-red-500">
              {pendingTasks}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Overdue Tasks
            </div>
            <div className="text-lg font-semibold text-orange-500">
              {overdueTasks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
