import React from "react";
import { useRecoilState } from "recoil";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";
import { toDoState } from "./atoms"; // atom 타입: { [key: string]: string[] }
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    setToDos((allBoards) => {
      // 출발 보드 배열 복사
      const sourceBoard = [...allBoards[source.droppableId]];
      // 도착 보드 배열 복사
      const destinationBoard = [...allBoards[destination.droppableId]];
      // 이동할 아이템
      const taskObj = sourceBoard[source.index];

      if (source.droppableId === destination.droppableId) {
        // 같은 보드 내 이동
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      } else {
        // 다른 보드로 이동
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
