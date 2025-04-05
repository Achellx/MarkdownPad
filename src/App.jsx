import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import EditorTabs from './components/EditorTabs';
import MarkdownEditor from './components/MarkdownEditor';
import PreviewPane from './components/PreviewPane';
import { useDocumentManager } from './utils/documentManager';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const {
    documents,
    activeDoc,
    createFile,
    createFolder,
    deleteDocument,
    renameDocument,
    updateFileContent,
    setActiveDocument,
    setDocuments
  } = useDocumentManager();

  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('documents', JSON.stringify(documents));

      console.log("Guardado");
    }
  }, [documents]);

  useEffect(() => {
    const documentSaved = localStorage.getItem('documents');
    if (documentSaved) {
      setDocuments(JSON.parse(documentSaved));
      console.log("Cargado");
    }
    console.log(documentSaved);
  }, [setDocuments]);

  const currentContent = documents.find(doc => doc.id === activeDoc)?.content || '';

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <Dashboard
        documents={documents}
        onCreateNew={() => createFile(`Documento ${documents.length + 1}`)}
        onCreateFolder={() => createFolder(`Carpeta ${documents.length + 1}`)}
        onDelete={deleteDocument}
        onRename={renameDocument}
      />

      <div className="flex-1 flex flex-col">
        <EditorTabs
          documents={documents}
          activeDoc={activeDoc}
          onTabChange={setActiveDocument}
          onTabClose={deleteDocument}
        />

        <div className="flex flex-1 overflow-hidden">
          <MarkdownEditor
            content={currentContent}
            onChange={(content) => updateFileContent(activeDoc, content)}
            darkMode={darkMode}
          />
          
          <div className="w-px bg-gray-200 dark:bg-gray-800" />
          
          <PreviewPane 
            content={currentContent}
            darkMode={darkMode}
          />
        </div>

        {/*<div className="absolute bottom-4 right-4">*/}
        {/*  <button*/}
        {/*    onClick={() => setDarkMode(!darkMode)}*/}
        {/*    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"*/}
        {/*  >*/}
        {/*    {darkMode ? '🌞' : '🌙'}*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}