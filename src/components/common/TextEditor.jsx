import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const TextEditor = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const handleKeyDown = (event) => {
    // Implement custom key handling logic if needed
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => onChange(newValue)}
    >
      <Editable
        onKeyDown={handleKeyDown}
        placeholder="Type your text here..."
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
          padding: "10px",
        }}
      />
    </Slate>
  );
};

export default TextEditor;
