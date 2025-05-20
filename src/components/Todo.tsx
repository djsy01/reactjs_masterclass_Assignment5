import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoryListState, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoryListState);
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = e.currentTarget.name;
    setToDos((oldToDos) =>
      oldToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: newCategory } : toDo
      )
    );
  };

  return (
    <li>
      <span>{text}</span>
      <div>
        {categories
          .filter((cat) => cat !== category)
          .map((cat) => (
            <button key={cat} name={cat} onClick={onClick}>
              {cat}
            </button>
          ))}
      </div>
    </li>
  );
}

export default ToDo;


/*import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
*/

/*
import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

//function ToDo({ text }: IToDo) {
function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
    };
    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && (
                <button name="DOING" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== "TO_DO" && (
                <button name="TO_DO" onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== "DONE" && (
                <button name="DONE" onClick={onClick}>
                    Done
                </button>
            )}
        </li>
    );
}

export default ToDo;
*/