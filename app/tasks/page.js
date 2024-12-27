"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import {
  Plus,
  Search,
  Filter,
  Layout,
  LayoutList,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthMiddleware } from "@/lib/authMiddleware";
import { loadTasksFromStorage } from "@/lib/slices/taskSlice";

export default function TasksPage() {
  const isAuthenticated = useAuthMiddleware();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (tasks.length === 0) {
        dispatch(loadTasksFromStorage());
      }
    }
  }, [isAuthenticated, tasks, dispatch]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  // Filter tasks based on search query and priority
  const filteredTasks = (Array.isArray(tasks) ? tasks : [])
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) =>
      filterPriority === "all"
        ? true
        : task.priority.toLowerCase() === filterPriority
    );

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              My Tasks
            </h1>
            <button
              onClick={() => router.push("/tasks/add")}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Task</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                  }`}
              />
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
              <Filter
                className={isDarkMode ? "text-gray-500" : "text-gray-400"}
              />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            {/* View Toggle */}
            <div
              className={`flex items-center gap-2 rounded-lg p-1 border
              ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                }`}
              >
                <Layout
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                }`}
              >
                <LayoutList
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-500 animate-spin" />
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Loading tasks...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Error: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-500 hover:text-blue-400 underline"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <>
            {filteredTasks.length > 0 ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center h-64 rounded-lg border
                ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-gray-400 mb-3">
                  {searchQuery || filterPriority !== "all" ? (
                    <Search className="w-12 h-12 mb-2 mx-auto" />
                  ) : (
                    <Plus className="w-12 h-12 mb-2 mx-auto" />
                  )}
                </div>
                <p
                  className={`text-lg mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {searchQuery || filterPriority !== "all"
                    ? "No tasks match your search"
                    : "No tasks available"}
                </p>
                <p className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                  {searchQuery || filterPriority !== "all"
                    ? "Try adjusting your search or filters"
                    : "Click the 'Add New Task' button to create a task"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
