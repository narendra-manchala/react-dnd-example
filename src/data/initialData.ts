import { Data } from "../types";

export const INITIAL_DATA: Data = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "My First task",
    },
    "task-2": {
      id: "task-2",
      content: "My Second task",
    },
    "task-3": {
      id: "task-3",
      content: "My Third task",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  // To reorder columns
  columnOrder: ["column-1", "column-2", "column-3"],
};
