"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  Trash2,
  List,
  RotateCcw,
  Clock,
  AlignStartVertical,
} from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllTask } from "@/lib/task/task";
import { formatMessageTime } from "@/utils/formatDate";
import { DialogTask } from "../component/createTask";

export default function TaskoDashboard() {
  const [category, setCategory] = useState([
    { name: "Arts and craft", checked: false },
    { name: "nature", checked: false },
    { name: "family", checked: false },
    { name: "Sport", checked: false },
    { name: "friends", checked: false },
    { name: "meditation", checked: false },
  ]);

  const [status, setStatus] = useState([
    { name: "All Task", checked: false },
    { name: "ongoing", checked: false },
    { name: "pending", checked: false },
    { name: "collaborate task", checked: false },
    { name: "done", checked: false },
  ]);

  const [task, setTask] = useState([]);
  const { isLoading, isAuthenticated, user, logout } = useAuthContext();

  const toggleCategory = (index) => {
    setCategory((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const toggleStatus = (index) => {
    setStatus((prev) =>
      prev.map((s, i) => (i === index ? { ...s, checked: !s.checked } : s))
    );
  };

  const selectedCategories = category
    .filter((c) => c.checked)
    .map((c) => c.name);
  const selectedStatuses = status.filter((s) => s.checked).map((s) => s.name);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTask({
          category: selectedCategories.join(","), // e.g., "Family,Nature"
          status: selectedStatuses.join(","),
        });

        if (response.success) {
          setTask(response.tasks);
        }
      } catch (error) {
        console.error(`Error fetching task: ${error.message}`);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected by AuthProvider
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 from-5% via-slate-800 via-50% to-emerald-500">
        <header className="max-w-6xl m-auto flex items-center justify-between py-4 text-white">
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 rounded-sm p-1">
              <Clock className="w-4 h-4 text-gray-300 " />
            </div>
            <span className="text-lg font-semibold">Tasko</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-teal-200 hover:text-white">
              <List className="w-4 h-4" />
              <span>Task List</span>
            </button>
            <button className="flex items-center gap-2 text-teal-200 hover:text-white">
              <RotateCcw className="w-4 h-4" />
              <span>Spin</span>
            </button>
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-orange-500 text-white text-sm">
                      TM
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => logout()}>logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="max-w-6xl m-auto pt-10 pb-20">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-lg">Hi {user.name}</p>
              <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6">
        <Card className="max-w-6xl m-auto mt-[-40px] bg-white/95 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            {/* Task List Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                All Task List
              </h2>

              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Task Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-4 space-y-3">
                      {category.map((cat, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${index}`}
                            checked={cat.checked}
                            onCheckedChange={() => toggleCategory(index)}
                            className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                          />
                          <label
                            htmlFor={`category-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {cat.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Pending" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-4 space-y-3">
                      {status.map((s, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`status-${index}`}
                            checked={s.checked}
                            onCheckedChange={() => toggleStatus(index)}
                            className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                          />
                          <label
                            htmlFor={`status-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {s.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </SelectContent>
                </Select>

                {/* Add New Task Button */}
                <DialogTask />
              </div>
            </div>

            {/* Task Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {task.map((task) => (
                <Card
                  key={task.id}
                  className="border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <CardContent className="py-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start  gap-3">
                        <div className="p-2 bg-teal-500 rounded-full">
                          <AlignStartVertical className="text-gray-700" />
                        </div>
                        <div className="">
                          <h3 className="font-semibold text-2xl text-gray-800">
                            {task.category}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {task.title}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4" />
                        <span>{formatMessageTime(task.createdAt)}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-pink-100 text-pink-700 hover:bg-pink-200"
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
