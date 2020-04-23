export type TaskData = { id: string; content: string };
export type TasksData = { [key: string]: TaskData };
export type ColumnData = { id: string; title: string; taskIds: string[] };
export type ColumnsData = { [key: string]: ColumnData };

export interface Data {
  tasks: TasksData;
  columns: ColumnsData;
  columnOrder: string[];
  [key: string]: any;
}
