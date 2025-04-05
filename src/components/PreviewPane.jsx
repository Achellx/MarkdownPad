import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useEffect, useMemo } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css';

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: (code, lang) => hljs.highlightAuto(code).value
});

export default function PreviewPane({ content, darkMode }) {
  const htmlContent = useMemo(() => {
    const rawHtml = marked(content);
    return DOMPurify.sanitize(rawHtml);
  }, [content]);

  useEffect(() => {
    hljs.highlightAll();
  }, [htmlContent]);

  return (
    <div className={`flex-1 h-[calc(100vh-3rem)] overflow-y-auto p-6 prose 
      ${darkMode ? 
        'prose-invert bg-gray-900' : 
        'bg-gray-900'
      } max-w-none`}
    >
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}