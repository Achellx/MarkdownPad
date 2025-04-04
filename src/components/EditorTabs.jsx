import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function EditorTabs({ documents, activeDoc, onTabChange, onTabClose }) {
  return (
    <div className="h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-2">
      <div className="flex items-center overflow-x-auto">
        {documents.filter(doc => doc.type === 'file').map((doc) => (
          <div
            key={doc.id}
            onClick={() => onTabChange(doc.id)}
            className={`flex items-center gap-2 px-4 py-2 mr-1 rounded-t-lg cursor-pointer transition-colors ${
              activeDoc === doc.id
                ? 'bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <span className="text-sm">{doc.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(doc.id);
              }}
              className="ml-2 hover:text-red-600 dark:hover:text-red-400"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}