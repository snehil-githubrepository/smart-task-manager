"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Calendar, Edit2, Trash2, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

const TaskCard = ({ task }) => {
  const router = useRouter();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const getPriorityStyle = (priority) => {
    const styles = {
      high: {
        light: {
          badge: "bg-red-50 text-red-700 border-red-200",
          button: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100",
        },
        dark: {
          badge: "bg-red-900/30 text-red-400 border-red-800",
          button:
            "bg-red-900/30 text-red-400 border-red-800 hover:bg-red-900/50",
        },
      },
      medium: {
        light: {
          badge: "bg-amber-50 text-amber-700 border-amber-200",
          button:
            "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100",
        },
        dark: {
          badge: "bg-amber-900/30 text-amber-400 border-amber-800",
          button:
            "bg-amber-900/30 text-amber-400 border-amber-800 hover:bg-amber-900/50",
        },
      },
      low: {
        light: {
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          button: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100",
        },
        dark: {
          badge: "bg-blue-900/30 text-blue-400 border-blue-800",
          button:
            "bg-blue-900/30 text-blue-400 border-blue-800 hover:bg-blue-900/50",
        },
      },
    };

    return isDarkMode
      ? styles[priority.toLowerCase()]?.dark
      : styles[priority.toLowerCase()]?.light;
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: {
        light: {
          badge: "bg-green-50 text-green-700 border-green-200",
        },
        dark: {
          badge: "bg-green-900/30 text-green-400 border-green-800",
        },
      },
      pending: {
        light: {
          badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
        },
        dark: {
          badge: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
        },
      },
    };

    return status === "completed"
      ? isDarkMode
        ? styles.completed.dark
        : styles.completed.light
      : isDarkMode
      ? styles.pending.dark
      : styles.pending.light;
  };

  const handleCardClick = (e) => {
    if (!e.target.closest("button")) {
      router.push(`/tasks/${task.id}`);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );
    if (isConfirmed) {
      alert(`Deleted task: ${task.title}`);
    }
  };

  const priorityStyle = getPriorityStyle(task.priority);
  const statusStyle = getStatusStyle(task.status);

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer
        ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-900/30"
            : "bg-white border-gray-100 hover:shadow-lg hover:shadow-gray-100/50"
        }`}
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title and Priority */}
            <div className="flex items-center gap-3 mb-3">
              <h2
                className={`text-lg font-semibold truncate
                ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
              >
                {task.title}
              </h2>
              <div
                className={`px-3 py-1 text-xs rounded-full border ${priorityStyle.badge}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-sm line-clamp-2 mb-4
              ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {task.description}
            </p>

            {/* Due Date */}
            <div
              className={`flex items-center text-sm
              ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>{task.dueDate || "No due date"}</span>
            </div>

            {/* Status */}
            <div>
              <div className="flex items-center space-x-2 mt-3">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${statusStyle.badge} border`}
                >
                  {task.status?.charAt(0).toUpperCase() +
                    task.status?.slice(1) || "Pending"}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleEdit}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${priorityStyle.button}`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Hover Effect */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight
          className={`w-5 h-5 ${
            isDarkMode ? "text-gray-600" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  );
};

export default TaskCard;
