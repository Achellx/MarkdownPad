import {useState} from 'react';
import {FiFilePlus, FiFolderPlus, FiChevronLeft, FiChevronRight, FiEdit} from 'react-icons/fi';
import DocumentItem from './DocumentItem';

export default function Dashboard({
                                      documents,
                                      onCreateNew,
                                      onDelete,
                                      onRename,
                                      onTabChange,
                                      activeDoc
                                  }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`h-screen p-4 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-[#1b1607] mr-1`}>
            <button
                onClick={toggleCollapse}
                className="flex items-center gap-2 px-4 py-2 bg-[#997814] text-[#f3eddc] rounded-lg hover:bg-[#e8d087] hover:text-[#997814] transition-colors mb-4"
            >
                {isCollapsed ? <FiChevronRight className="text-lg"/> : <FiChevronLeft className="text-lg"/>}
            </button>
            {isCollapsed ? (
                <>
                    <button
                        onClick={onCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-[#997814] text-[#f3eddc] rounded-lg hover:bg-[#e8d087] hover:text-[#997814] transition-colors"
                    >
                        <FiFilePlus className="text-lg"/>
                    </button>
                </>
            ) : null}

            {!isCollapsed && (
                <>
                    <div className="flex flex-col gap-2 mb-6">
                        <button
                            onClick={onCreateNew}
                            className="flex items-center gap-2 px-4 py-2 bg-[#997814] text-[#f3eddc] rounded-lg hover:bg-[#e8d087] hover:text-[#997814] transition-colors"
                        >
                            <FiFilePlus className="text-lg"/>
                            Nuevo Documento
                        </button>
                    </div>

                    <div
                        className="mt-4"

                    >
                        {documents.map((doc) => (
                            <DocumentItem
                                key={doc.id}
                                doc={doc}
                                onRename={onRename}
                                onDelete={onDelete}
                                onTabChange={onTabChange}
                                isActive={activeDoc === doc.id}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}