import { Droppable } from "@hello-pangea/dnd";
import styled from "styled-components";
import DraggableCard from "./DragabbleCard"; // ✔️ 오타 수정

const Wrapper = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor || "#dfe6e9"}; // ✔️ fallback
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} index={index} toDo={toDo} /> // ✔️ 이름 수정
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}
export default Board;
