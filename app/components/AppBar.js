"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/lib/slices/themeSlice";
import { setUser, logoutUser } from "@/lib/slices/userSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  ClipboardList,
  LogIn,
  UserPlus,
  LogOut,
  Bell,
  Plus,
} from "lucide-react";

const AppBar = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setUser({ token, userInfo: null }));
    }
  }, [dispatch]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/tasks", label: "Tasks", icon: ClipboardList },
    ...(isAuthenticated
      ? [{ href: "#", label: "Logout", icon: LogOut, onClick: handleLogout }]
      : [
          { href: "/login", label: "Login", icon: LogIn },
          { href: "/signup", label: "Sign Up", icon: UserPlus },
        ]),
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-lg"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/tasks" className="flex items-center group">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-200">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Smart Task Manager
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.onClick}
                  className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center space-x-2 group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={handleToggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <Moon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute w-full transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    item.onClick?.(e);
                  }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  handleToggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span className="font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span className="font-medium">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </>
  );
};

export default AppBar;
