import React from "react";
import { TaskData } from "../../types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  task: TaskData;
  index: number;
}

const Container = styled.div<{ isDragging: boolean }>`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 5px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
  align-items: center;
`;

const Handle = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: orangered;
  border-radius: 2px;
  margin-right: 8px;
`;

export function Task(props: Props) {
  const { task, index } = props;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <Handle {...provided.dragHandleProps} />
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
