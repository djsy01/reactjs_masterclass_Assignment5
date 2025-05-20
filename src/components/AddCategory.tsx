import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { categoryListState } from "../atoms";

function AddCategory() {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useRecoilState(categoryListState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !categories.includes(input.trim())) {
      setCategories([...categories, input.trim()]);
    }
    setInput("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={input} onChange={onChange} placeholder="New Category" />
      <button>Add Category</button>
    </form>
  );
}

export default AddCategory;
