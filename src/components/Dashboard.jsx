import {FiFilePlus, FiFolderPlus} from 'react-icons/fi';
import DocumentItem from './DocumentItem';

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
                    <FiFilePlus className="text-lg"/>
                    Nuevo Documento
                </button>

                <button
                    onClick={onCreateFolder}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                    <FiFolderPlus className="text-lg"/>
                    Nueva Carpeta
                </button>
            </div>

            <div className="mt-4">
                {documents.map((doc) => (
                    <DocumentItem
                        key={doc.id}
                        doc={doc}
                        onRename={onRename}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}