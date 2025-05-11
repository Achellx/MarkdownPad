import { useState, useRef } from "react";
import { FiEdit, FiCheck, FiTrash } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { gsap } from "gsap";

export default function DocumentItem({
  doc,
  onRename,
  onDelete,
  onTabChange,
  isActive,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(doc.name);
  const ref = useRef(null);

  const handleSave = () => {
    if (newName.trim()) {
      onRename(doc.id, newName.trim());
    }
    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isEditing) {
      onTabChange(doc.id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const el = ref.current;
    // gsap.set(el, {overflow: "hidden"});
    gsap
      .timeline({
        defaults: { duration: .2, ease: "power2.inOut" },
        onComplete: () => onDelete(doc.id)
      })
      .to(el, { opacity: 0, y: 10, scale: 0.95 })
      .to(
        el,
        {
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
      );
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className="
            animate-tab-in
            group flex items-center justify-between p-2 mb-1 rounded-[16px] font-semibold  hover:bg-[#e1e2eb]   hover:text-black dark:hover:bg-[#44474e] hover:scale-[1.10] ease-in-out duration-300 cursor-default transition-all"
    >
      {/* <FiEdit className="text-[#75777e] dark:text-[#c5c6ce] mr-1 font-bold group-hover:text-black dark:group-hover:text-[#b4c7ed] group-hover:scale-125 transition-all ease-in-out" /> */}
      <span className="material-symbols-outlined text-[#75777e] dark:text-[#c5c6ce] mr-1 font-bold group-hover:text-black dark:group-hover:text-[#b4c7ed] group-hover:scale-125 transition-all ease-in-out">
        edit_square
      </span>
      <md-ripple aria-hidden="true" className=" hover:blur-sm"></md-ripple>
      <div className="flex items-center flex-1">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="flex-1 bg-transparent border-b border-black focus:outline-none w-1 px-1 mr-2 "
            autoFocus
          />
        ) : (
          <span className="text-[#75777e] dark:text-[#c5c6ce] group-hover:text-black dark:group-hover:text-[#b4c7ed] transition-all">
            {doc.name}
          </span>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isEditing) {
              setIsEditing(true);
              setNewName(doc.name);
            }
          }}
          className="text-[#75777e] hover:text-black dark:hover:text-[#b4c7ed] hover:scale-150 transition-all ease-in-out cursor-pointer"
        >
          {isEditing ? (
            <FiCheck className="w-4 h-4" />
          ) : (
            <GrEdit className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={handleDelete}
          className="text-[#75777e] hover:text-red-400 hover:scale-150 transition-all cursor-pointer"
        >
          <FiTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
