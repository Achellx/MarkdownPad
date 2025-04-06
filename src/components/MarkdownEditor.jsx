import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';

const customDarkTheme = EditorView.theme({
    '&': {
        backgroundColor: '#272113!important',
        color: '#f3eddc !important',
        height: '100%',
        fontSize: '18px',
    },
    '.cm-scroller': {
        fontFamily: 'Inter, sans-serif !important',
        lineHeight: '1.6 !important'
    },
    '.cm-gutters': {
        backgroundColor: '#272113 !important',
        color: '#997814 !important'
    },
    '.cm-activeLine': {
        backgroundColor: '#2a2e3d !important'
    },
    '.cm-line': {
        padding: '2px 15px !important'
    },
    '.cm-activeLineGutter': {
        backgroundColor: '#272113!important'
    }
}, { dark: true });

export default function MarkdownEditor({ content, onChange }) {
    const handleChange = useCallback((value) => onChange(value), [onChange]);

    return (
        <div className="h-full rounded-xl">
            <CodeMirror
                value={content}
                onChange={handleChange}
                extensions={[
                    markdown(),
                    customDarkTheme,
                    EditorView.lineWrapping
                ]}
                basicSetup={{
                    lineNumbers: false,
                    highlightActiveLine: false,
                    highlightSelectionMatches: false
                }}
            />
        </div>
    );
}