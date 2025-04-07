import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import EditorTabs from './components/EditorTabs';
import MarkdownEditor from './components/MarkdownEditor';
import { useDocumentManager } from './utils/documentManager';

export default function App() {
  const {
    documents,
    activeDoc,
    createFile,
    deleteDocument,
    renameDocument,
    updateFileContent,
    setActiveDocument,
    setDocuments,
  } = useDocumentManager();

  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('documents', JSON.stringify(documents));
    }
  }, [documents]);

  useEffect(() => {
    const documentSaved = localStorage.getItem('documents');
    if (documentSaved) {
      setDocuments(JSON.parse(documentSaved));
    }
  }, [setDocuments]);

  const currentContent = documents.find(doc => doc.id === activeDoc)?.content || '';

  return (
      <div className="flex h-full bg-[#1b1607]">
        <Dashboard
            documents={documents}
            activeDoc={activeDoc}
            onCreateNew={() => createFile(`Documento ${documents.length + 1}`)}
            onDelete={deleteDocument}
            onRename={renameDocument}
            onTabChange={setActiveDocument}
        />

        <div className="flex-1 flex flex-col bg-[#1b1607] mt-3">
          <div>
            <EditorTabs
                documents={documents}
                activeDoc={activeDoc}
                onTabChange={setActiveDocument}
                onTabClose={deleteDocument}
            />
          </div>

          <div className="flex-1 m-2 p-4 bg-[#272113] rounded-xl">
            <MarkdownEditor
                content={currentContent}
                onChange={(content) => updateFileContent(activeDoc, content)}
            />
          </div>
        </div>
      </div>
  );
}