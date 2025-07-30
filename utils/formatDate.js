import { format, isToday, isYesterday } from "date-fns";
// import {  formatDistance,  } from "date-fns";

export const formatMessageTime = (createdAt) => {
  // return formatDistance(new Date(createdAt), new Date(), { addSuffix: true });

  const date = new Date(createdAt);

  if (isToday(date)) {
    return format(date, "h:mm a");
  }

  if (isYesterday(date)) {
    return "Yesterday " + format(date, "h:mm a");
  }

  return format(date, "MMM d, h:mm a");
};
