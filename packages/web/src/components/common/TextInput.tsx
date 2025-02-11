import React from "react";

interface TextInputProps {
  id?: string;
  name?: string;
  placeHolder?: string;
}
const TextInput = ({ placeHolder, id, name }: TextInputProps) => {
  return (
    <input
      id={id}
      name={name}
      className="bg-gray-100 px-4 py-2 rounded-xl w-full placeholder:text-gray-400 placeholder:text-sm"
      type="text"
      placeholder={placeHolder}
    />
  );
};

export default TextInput;
