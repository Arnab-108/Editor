import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    // Initialize Monaco Editor on mount
    const editorInstance = monaco.editor.create(editorRef.current, {
      value,
      language: 'javascript', // Set the default language, you can change it based on your application
      theme: 'vs-dark', // Set the theme, you can change it to 'light' or other available themes
    });

    setEditor(editorInstance);

    // Update the editor value when the `value` prop changes
    editorInstance.setValue(value);

    // Attach a change event listener to update the parent component state when the editor content changes
    editorInstance.onDidChangeModelContent(() => {
      onChange(editorInstance.getValue());
    });

    return () => {
      // Clean up the editor instance when the component unmounts
      editorInstance.dispose();
    };
  }, [value, onChange]);

  return (
    <div ref={editorRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default CodeEditor;