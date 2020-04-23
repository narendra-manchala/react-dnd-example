import React, { useState, useCallback } from "react";
import "./App.css";
import { INITIAL_DATA } from "../../data/initialData";
import { Column } from "../Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Data } from "../../types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export function App() {
  const [initialData, setInitialData] = useState(INITIAL_DATA);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      ) {
        return;
      }
      const { droppableId: sourceColumnId, index: sourceIndex } = result.source;
      const {
        droppableId: destinationColumnId,
        index: destinationIndex,
      } = result.destination;
      const elementId = result.draggableId;
      if (sourceColumnId === destinationColumnId) {
        const columnCopy = JSON.parse(
          JSON.stringify(initialData.columns[sourceColumnId])
        );
        columnCopy.taskIds.splice(sourceIndex, 1);
        columnCopy.taskIds.splice(destinationIndex, 0, elementId);
        const newState = {
          ...initialData,
          columns: {
            ...initialData.columns,
            [sourceColumnId]: columnCopy,
          },
        };
        console.log(newState);
        setInitialData(newState);
        return;
      }

      const sourceColumnCopy = JSON.parse(
        JSON.stringify(initialData.columns[sourceColumnId])
      );
      const destinationColumnCopy = JSON.parse(
        JSON.stringify(initialData.columns[destinationColumnId])
      );

      // const sourceTaskIds = Array.from(sourceColumnCopy.taskIds);
      // const destinationTaskIds = Array.from(destinationColumnCopy.taskIds);
      sourceColumnCopy.taskIds.splice(sourceIndex, 1);
      destinationColumnCopy.taskIds.splice(destinationIndex, 0, elementId);
      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [sourceColumnId]: sourceColumnCopy,
          [destinationColumnId]: destinationColumnCopy,
        },
      };
      console.log(newState);
      setInitialData(newState);

      // const stateCopy = JSON.parse(JSON.stringify(initialData));
      // const columnCopy = stateCopy.columns[result.source.droppableId];
      // const newTaskIds = Array.from(columnCopy.taskIds);
      // newTaskIds.splice(result.source.index, 1);
      // newTaskIds.splice(result.destination.index, 0, result.draggableId);
      // const newColumn = { ...columnCopy, taskIds: newTaskIds };
      // stateCopy.columns[newColumn.id] = newColumn;
      // setInitialData((initialState: Data) => {
      //   return stateCopy;
      // });
    },
    [initialData]
  );

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {initialData.columnOrder.map((columnId: string) => {
          const column = initialData.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: string) => initialData.tasks[taskId]
          );
          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </Container>
  );
}
