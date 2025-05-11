import { useEffect, useState } from 'react';
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
  
  const [hiddenTabs, setHiddenTabs] = useState([]);

  const hideTab = (docId) => {
    setHiddenTabs((prev) => [...prev, docId]);
  }

  const restoreTabs = (docId) => {
    setHiddenTabs((prev) => prev.filter(id => id !== docId));
  }

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
      <div className="flex h-screen overflow-hidden bg-[#fbf9fc] dark:bg-[#131316]">
        <div className="flex-shrink-0 h-full select-none">
          <Dashboard
            documents={documents}
            activeDoc={activeDoc}
            onCreateNew={() => createFile(`Documento ${documents.length + 1}`)}
            onDelete={deleteDocument}
            onRename={renameDocument}
            onTabChange={(id) =>
              hiddenTabs.includes(id) ? restoreTabs(id) : setActiveDocument(id)
            }
          />
      </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-[#fbf9fc] dark:bg-[#131316] mt-3 select-none ">
          <div>
            <EditorTabs
                documents={documents.filter(d => d.type === 'file' && !hiddenTabs.includes(d.id))}
                activeDoc={activeDoc}
                onTabChange={setActiveDocument}
                onTabClose={hideTab}
            />
          </div>

          <div className="flex-1 m-4 mt-1 !important p-4 bg-[#f5f3f6] dark:bg-[#131316] rounded-[32px] border-2 border-[#f2f0f3] dark:border-[1px] dark:border-[#303033] shadow-xl animate-tab-in overflow-auto no-scrollbar">
            <MarkdownEditor
                content={currentContent}
                onChange={(content) => updateFileContent(activeDoc, content)}
            />
          </div>
        </div>
      </div>
  );
}