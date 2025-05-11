import { useState } from "react";
import DocumentItem from "./DocumentItem"; 
import "@material/web/button/filled-tonal-button.js";

export default function Dashboard({
  documents,
  onCreateNew,
  onDelete,
  onRename,
  onTabChange,
  activeDoc,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`animate-tab-in h-screen relative p-4 transition-all ${
        isCollapsed ? "w-16" : "w-64"
      } bg-[#fbf9fc] dark:bg-[#131316] mr-1`}
    >
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-center h-[56px] w-[56px] bg-transparent text-black dark:text-[#c5c6ce] rounded-[16px] mb-4 hover:rounded-[64px] hover:bg-[rgba(0,0,0,0.06)] dark:hover:bg-[#ffffff28] cursor-pointer hover:scale-[1.05] ease-in duration-300"
      >
        <md-ripple className=" hover:blur-sm"></md-ripple>
        {isCollapsed ? (
          <span className="material-symbols-outlined">menu</span>
        ) : (
          <span className="material-symbols-outlined">arrow_back</span>
        )}
      </button>
      {isCollapsed ? (
        <>
          <button
            onClick={onCreateNew}
            className="
                        animate-tab-in
                        flex items-center justify-center h-[56px] w-[56px] bg-[#000] dark:bg-[#b4c7ed] text-[#FFF] dark:text-[#1e304f] rounded-[16px] hover:rounded-[64px] hover:scale-[1.05] ease-in-out duration-150 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
          {/* <div className="absolute bottom-4 left-4">
            <ExportPdfButton onExport={() => console.log("Exporting PDF...")} />
          </div> */}
        </>
      ) : null}

      {!isCollapsed && (
        <>
          <div className="flex flex-col relative gap-2 mb-6 transition-all">
            <button
              onClick={onCreateNew}
              className="
                            animate-tab-in
                            flex items-center justify-center gap-2 px-4 py-2 bg-[#000] dark:bg-[#b4c7ed] text-[#FFF] dark:text-[#1e304f] font-semibold rounded-[16px] cursor-pointer shadow-[0_0px_32px_10px_rgba(0,0,0,0.25)] dark:shadow-[0_0px_32px_1px] dark:shadow-blue-200/50 hover:scale-[1.05] transition-all ease-in-out group"
            >
              <span className="material-symbols-outlined group-hover:scale-125 transition-all ease-in-out">
                add
              </span>
              <md-ripple></md-ripple>
              Nuevo Documento
            </button>
          </div>

          <div className="mt-4">
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
          {/* <div className="absolute bottom-4 left-4 justify-center items-center">
            <ExportPdfButton />
          </div> */}
        </>
      )}
    </div>
  );
}
