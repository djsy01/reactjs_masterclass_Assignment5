import { atom, selector } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: (val: any) => void; onSet: (callback: (newValue: any, oldValue: any, isReset: boolean) => void) => void }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _oldValue: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const categoryListState = atom<string[]>({
  key: "categoryListState",
  default: ["TO_DO", "DOING", "DONE"],
  effects_UNSTABLE: [localStorageEffect("categoryListState")],
});

export const selectedCategoryState = atom<string>({
  key: "selectedCategoryState",
  default: "TO_DO",
  effects_UNSTABLE: [localStorageEffect("selectedCategoryState")],
});

export interface IToDo {
  text: string;
  id: number;
  category: string; // 단일 카테고리명 (string)
}

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("toDoState")],
});

export const toDoSelector = selector<IToDo[]>({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
