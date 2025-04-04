import { useState } from 'react';

export function useDocumentManager() {
  const [documents, setDocuments] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);

  const createFile = (name) => {
    const newFile = {
      id: Date.now().toString(),
      type: 'file',
      name: name,
      content: '# Nuevo Documento\nEmpieza a escribir...',
      createdAt: new Date().toISOString()
    };
    
    setDocuments([...documents, newFile]);
    setActiveDoc(newFile.id);
  };

  const createFolder = (name) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      type: 'folder',
      name: name,
      createdAt: new Date().toISOString(),
      children: []
    };
    
    setDocuments([...documents, newFolder]);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    if (activeDoc === id) setActiveDoc(null);
  };

  const renameDocument = (id, newName) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, name: newName } : doc
    ));
  };

  const updateFileContent = (id, content) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, content } : doc
    ));
  };

  return {
    documents,
    activeDoc,
    createFile,
    createFolder,
    deleteDocument,
    renameDocument,
    updateFileContent,
    setActiveDocument: setActiveDoc
  };
}