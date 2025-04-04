import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

export default function MarkdownEditor({ content, onChange, darkMode }) {
  const handleChange = useCallback(
    (value) => onChange(value),
    [onChange]
  );

  return (
    <CodeMirror
      value={content}
      onChange={handleChange}
      extensions={[markdown()]}
      theme={darkMode ? oneDark : oneDark}
      basicSetup={{
        lineNumbers: false,
        highlightActiveLine: false,
        autocompletion: true,
      }}
      className="flex-1 h-[calc(100vh-3rem)] text-lg"
    />
  );
}