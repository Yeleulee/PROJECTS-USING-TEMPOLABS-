import React from "react";
import { Calendar } from "../ui/calendar";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EventForm from "./EventForm";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
}

export default function CalendarView() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, event]);
    setIsDialogOpen(false);
  };

  const getDayEvents = (day: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === day.toDateString(),
    );
  };

  return (
    <motion.div
      className="w-full bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Schedule</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm onSubmit={handleAddEvent} selectedDate={date} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-5">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-3">
            {date
              ? date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Select a date"}
          </h3>
          <div className="space-y-2">
            {date &&
              getDayEvents(date).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-3 rounded-md border border-gray-200 shadow-sm"
                >
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500">
                    {event.startTime} - {event.endTime}
                  </p>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
