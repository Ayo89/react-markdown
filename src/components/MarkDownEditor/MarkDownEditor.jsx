import React, { useState } from "react";
import './MarkDownEditor.css'

function MarkdownEditor({onChange, value}) {

  return (
    <>
      <textarea
        id="editor"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default MarkdownEditor;
