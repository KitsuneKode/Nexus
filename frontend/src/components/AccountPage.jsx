"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Calendar,
  CheckCircle,
  Circle,
  ArrowLeft,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MyAccount() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    joinDate: "January 15, 2023",
    avatarUrl: "/placeholder.svg?height=128&width=128",
  });
  const [todoStats, setTodoStats] = useState({
    total: 15,
    completed: 8,
  });

  const completionPercentage = (todoStats.completed / todoStats.total) * 100;
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem("theme");

    // If theme is set in localStorage, use it
    if (storedTheme === "dark") {
      setIsDarkTheme(true);
    } else if (storedTheme === "light") {
      setIsDarkTheme(false);
    } else {
      // If not set in localStorage, use system preference
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkTheme(prefersDarkScheme);
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
        isDarkTheme
          ? "bg-gray-900"
          : "bg-gradient-to-br from-teal-50 to-blue-50"
      }`}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute transform rotate-45 ${
              isDarkTheme ? "bg-teal-400" : "bg-teal-500"
            }`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>
      <Card
        className={`w-full max-w-2xl p-8 ${
          isDarkTheme ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"
        } backdrop-blur-lg border-gray-200 shadow-2xl rounded-3xl relative overflow-hidden`}
      >
        {/* Animated geometric shapes */}
        <div
          className={`absolute top-0 left-0 w-32 h-32 ${
            isDarkTheme
              ? "bg-gradient-to-br from-teal-700 to-blue-700"
              : "bg-gradient-to-br from-teal-200 to-blue-200"
          } rounded-br-full opacity-50 animate-pulse`}
        />
        <div
          className={`absolute bottom-0 right-0 w-48 h-48 ${
            isDarkTheme
              ? "bg-gradient-to-tl from-teal-700 to-blue-700"
              : "bg-gradient-to-tl from-teal-200 to-blue-200"
          } rounded-tl-full opacity-50 animate-pulse`}
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-3xl font-bold ${
                isDarkTheme ? "text-white" : "text-gray-800"
              }`}
            >
              Account Information
            </h1>
            <Button
              onClick={() => {
                setIsDarkTheme(!isDarkTheme);
                localStorage.theme = isDarkTheme ? "light" : "dark";
              }}
              variant="outline"
              size="icon"
              className={`rounded-full ${
                isDarkTheme
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {isDarkTheme ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="w-32 h-32 border-4 border-teal-500">
              <AvatarImage src={userInfo.avatarUrl} alt={userInfo.name} />
              <AvatarFallback>
                {userInfo.name
                  .split("")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div
                className={`mb-4 ${
                  isDarkTheme ? "text-white" : "text-gray-800"
                }`}
              >
                <p className="flex items-center mb-2">
                  <User className="mr-2" /> {userInfo.name}
                </p>
                <p className="flex items-center mb-2">
                  <Mail className="mr-2" /> {userInfo.email}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2" /> Joined: {userInfo.joinDate}
                </p>
              </div>
              <div
                className={`mb-4 ${
                  isDarkTheme ? "text-white" : "text-gray-800"
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">Todo Statistics</h2>
                <p className="flex items-center mb-2">
                  <Circle className="mr-2" /> Total Todos: {todoStats.total}
                </p>
                <p className="flex items-center mb-2">
                  <CheckCircle className="mr-2" /> Completed Todos:{" "}
                  {todoStats.completed}
                </p>
              </div>
              <div className="mb-4">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkTheme ? "text-white" : "text-gray-800"
                  }`}
                >
                  Completion Progress
                </h3>
                <Progress
                  value={completionPercentage}
                  className="h-2 bg-gray-300"
                  indicatorClassName="bg-teal-500"
                />
                <p
                  className={`text-sm mt-1 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {completionPercentage.toFixed(1)}% Complete
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-row justify-between">
            <Button
              className="flex items-center bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Button
              className="flex items-center bg-teal-700 hover:bg-teal-600 text-white"
              onClick={() => navigate("/login")}
            >
              Logout
              <LogOut className="mx-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
