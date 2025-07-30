"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useForm from "@/hook/useFrom";
import { createTask } from "@/lib/task/task";
import { Plus } from "lucide-react";
import { useState } from "react";

export function DialogTask() {
  const { input, setInput, inputValue, formReset } = useForm({
    title: "",
    description: "",
    category: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await createTask(input);

      if (response.success === true) {
        formReset();
        // Close dialog or show success message
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreateTask} className="space-y-3">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Make your task here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {error ? <p className="text-base text-red-800">{error}</p> : ""}
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">title</Label>
              <Input
                id="name-1"
                name="title"
                placeholder="enter your title"
                value={input.title}
                onChange={inputValue}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">description</Label>
              <Input
                id="description"
                name="description"
                placeholder="enter your description"
                value={input.description}
                onChange={inputValue}
              />
            </div>
            <div className="flex flex-row gap-3">
              <Select
                name="category"
                value={input.category}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>category</SelectLabel>
                    <SelectItem value="Arts and craft">
                      Arts and Craft
                    </SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="Sport">Sport</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="meditation">Meditation</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                name="status"
                value={input.status}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>status</SelectLabel>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="collaborate task">
                      Collaborate task
                    </SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              className=" bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isLoading ? "Save changes..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
