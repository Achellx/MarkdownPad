import {useState} from 'react'
import {FiEdit, FiCheck, FiTrash} from 'react-icons/fi'

export default function DocumentItem({doc, onRename, onDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(doc.name);

    const handleSave = () => {
        if (newName.trim()) {
            onRename(doc.id, newName.trim());
        }
        setIsEditing(false);
    };

    return (
        <div
            className="group flex items-center justify-between p-2 mb-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <FiEdit className="text-gray-500 dark:text-gray-400 mr-1" />
            <div className="flex items-center flex-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="flex-1 bg-transparent border-b border-blue-500 dark:border-blue-400 focus:outline-none w-1 px-1 mr-2 text-gray-700 dark:text-gray-200"
                        autoFocus
                    />
                ) : (
                    <span className="text-gray-700 dark:text-gray-200 truncate">
            {doc.name}
          </span>
                )}
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => {
                        if (!isEditing) {
                            setIsEditing(true);
                            setNewName(doc.name);
                        }
                    }}
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                    {isEditing ? (
                        <FiCheck className="w-4 h-4"/>
                    ) : (
                        <FiEdit className="w-4 h-4"/>
                    )}
                </button>

                <button
                    onClick={() => onDelete(doc.id)}
                    className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
                >
                    <FiTrash className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};
