import { useState } from "react";

export function useDocumentManager() {
  const [documents, setDocuments] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);

  const createFile = (name) => {
    const newFile = {
      id: Date.now().toString(),
      type: "file",
      name: name,
      content: "# Nuevo Documento\nEmpieza a escribir...",
      createdAt: new Date().toISOString(),
    };

    setDocuments([...documents, newFile]);
    setActiveDoc(newFile.id);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    if (activeDoc === id) setActiveDoc(null);
  };

  const renameDocument = (id, newName) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, name: newName } : doc))
    );
  };

  const updateFileContent = (id, content) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, content } : doc))
    );
    localStorage.setItem("documents", JSON.stringify(documents));
  };

  return {
    documents,
    activeDoc,
    createFile,
    deleteDocument,
    renameDocument,
    updateFileContent,
    setDocuments,
    setActiveDocument: setActiveDoc,
  };
}
