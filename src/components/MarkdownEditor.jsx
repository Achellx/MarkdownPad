import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import ExportPdfButton from "./ExportPdfButton";

const customDarkTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#131316!important",
      color: "#FFF !important",
      height: "100%",
      fontSize: "18px",
      outline: "none !important",
    },
    ".cm-scroller": {
      fontFamily: "Inter, sans-serif !important",
      lineHeight: "1.6 !important",
    },
    ".cm-gutters": {
      backgroundColor: "#131316 !important",
      color: "#FFF !important",
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "#131316 !important",
    },
    ".cm-line": {
      padding: "2px 15px !important",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#131316 !important",
    },
  },
  { dark: true }
);

const customLightTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#f5f3f6!important",
      color: "#000 !important",
      height: "100%",
      fontSize: "18px",
      outline: "none !important",
    },
    ".cm-scroller": {
      fontFamily: "Inter, sans-serif !important",
      lineHeight: "1.6 !important",
    },
    ".cm-gutters": {
      backgroundColor: "#f5f3f6 !important",
      color: "#000 !important",
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "#2a2e3d !important",
    },
    ".cm-line": {
      padding: "2px 15px !important",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#f5f3f6!important",
    },
  },
  { dark: false }
);

export default function MarkdownEditor({ content, onChange }) {
  const handleChange = useCallback((value) => onChange(value), [onChange]);
  const [markdownContent, setMarkdownContent] = useState(content);

  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const cmTheme = isDarkMode ? customDarkTheme : customLightTheme;

  return (
    <div className="h-full rounded-[36px] ">
      <CodeMirror
        value={content}
        onChange={handleChange}
        extensions={[markdown(), cmTheme, EditorView.lineWrapping]}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          highlightSelectionMatches: false,
        }}
      />

      <div className="animate-tab-in absolute bottom-10 right-10 z-10">
        <ExportPdfButton markdownContent={content} />
      </div>
    </div>
  );
}
