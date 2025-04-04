import { FiFilePlus, FiFolderPlus, FiTrash2, FiEdit } from 'react-icons/fi';

export default function Dashboard({ 
  documents,
  onCreateNew,
  onCreateFolder,
  onDelete,
  onRename
}) {
  return (
    <div className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiFilePlus className="text-lg" />
          Nuevo Documento
        </button>
        
        <button
          onClick={onCreateFolder}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <FiFolderPlus className="text-lg" />
          Nueva Carpeta
        </button>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              {doc.type === 'folder' ? (
                <FiFolder className="text-gray-500 dark:text-gray-400" />
              ) : (
                <FiEdit className="text-gray-500 dark:text-gray-400" />
              )}
              <span className="text-gray-700 dark:text-gray-300">
                {doc.name}
              </span>
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onRename(doc.id)}
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <FiEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(doc.id)}
                className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}