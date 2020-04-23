import React from "react";
import { ColumnData, TaskData } from "../../types";
import styled from "styled-components";
import { Task } from "../Task/Task";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  column: ColumnData;
  tasks: TaskData[];
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const Title = styled.h3`
  padding: 8px;
`;
const TasksList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  /* transition: border 0.2s ease; */
  border: ${(props) => (props.isDraggingOver ? "2px dashed green" : "")};
  flex-grow: 1;
  min-height: 100px;
`;

export function Column(props: Props) {
  const { column, tasks } = props;
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TasksList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task: TaskData, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TasksList>
        )}
      </Droppable>
    </Container>
  );
}
