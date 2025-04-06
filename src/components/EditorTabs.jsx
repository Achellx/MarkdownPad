import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function EditorTabs({ documents, activeDoc, onTabChange, onTabClose }) {

  return (
    <div className="h-12 dark:bg-[#1b1607] flex items-center px-2">
      <div className="flex items-center overflow-x-auto">
        {documents.filter(doc => doc.type === 'file').map((doc) => (
          <div
            key={doc.id}
            onClick={() => onTabChange(doc.id)}
            className={`flex items-center gap-2 px-4 py-2 mr-1 rounded-lg cursor-pointer transition-colors ${
              activeDoc === doc.id
                ? 'dark:bg-[#272113] dark:text-[#f3eddc]'
                : 'dark:hover:bg-[#282008] dark:text-[#f3eddc]'
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