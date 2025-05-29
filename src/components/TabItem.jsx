import { useRef } from "react";
import { FiX } from "react-icons/fi";
import gsap from "gsap";

export default function TabItem({ doc, isActive, onTabChange, onTabClose }) {
  const ref = useRef(null);

    const handleClose = (e) => {
    e.stopPropagation();
    const el = ref.current;
    // asegurarnos de poder animar la altura
    gsap.set(el, { overflow: "hidden" });

    gsap
      .timeline({
        defaults: { duration: 0.2, ease: "power2.inOut" },
        onComplete: () => onTabClose(doc.id),
      })
      // Fade + slide + scale
      .to(el, { opacity: 0, y: 10, scale: 0.95, filter: "blur(24px)" })
      // Colapsar la altura
      .to(
        el,
        {
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
      );
  };

  // const handleClose = (e) => {
  //   e.stopPropagation();
  //   gsap
  //     .to(ref.current, {
  //       keyframes: {
  //         "0%":   { opacity: 1, y:0, scale:1 },
  //         "100%": { opacity: 0, y:20, scale:0.95}
  //       },
  //       duration: 0.3,
  //       ease: "sine.inOut",
  //     })
  //     .then(() => onTabClose(doc.id));
  // };

  return (
    <div
      ref={ref}
      onClick= {() => onTabChange(doc.id)}
      className={`
        animate-tab-in
        flex items-center gap-2 px-4 py-2 mr-1 rounded-[32px] border-2
        cursor-default transition-all ease-in-out hover:scale-[1.05] duration-300 
        ${
          isActive
            ? "bg-[#e0e6f8] text-[#75777e] dark:bg-[#373d4b] dark:text-[#cad0e2] border-[#e0e6f8] dark:border-[#373d4b]"
            : "bg-[#f5f3f6] dark:bg-[#1f1f22] text-[#75777e] dark:text-[#c5c6ce] border-[#f2f0f3] dark:border-[#1f1f22] hover:bg-[#000] dark:hover:border-black hover:text-white"
        }
      `}
    >
      <md-ripple></md-ripple>
      <span className="text-sm font-semibold">
        {doc.name}</span>
      <button
        onClick={handleClose}
        className="ml-1 hover:text-red-600 hover:scale-150 cursor-pointer transition-all ease-in-out"
      >
        <FiX className="w-4 h-4 font-medium" />
      </button>
    </div>
  );
}

// import { useRef, useState } from "react";
// import { FiX } from "react-icons/fi";
// import { gsap } from "gsap";

// export default function TabItem({
//   doc,
//   isActiveDoc,
//   onTabChange,
//   onTabClose,
// }) {
//   const tabRef = useRef(null);

//   return (
//     <div className="h-12 bg-[#fbf9fc] dark:bg-[#131316] flex items-center px-4">
//       <div className="flex items-center">
//         {documents
//           .filter((doc) => doc.type === "file")
//           .map((doc) => (
//             <div
//               key={doc.id}
//               onClick={() => onTabChange(doc.id)}
//               className={`
//               animate-tab-in
//               flex items-center gap-2 px-4 py-2 mr-1 rounded-[32px] border-2 cursor-default transition-all ease-in-out ${
//                 isActiveDoc === doc.id
//                   ? "bg-[#e0e6f8] text-[#75777e] dark:text-[#1e304f] border-[#e0e6f8] hover:scale-[1.05] trasnition-all ease-in-out"
//                   : "bg-[#f5f3f6] dark:bg-[#1f1f22] text-[#75777e] dark:text-[#c5c6ce] border-[#f2f0f3] dark:border-[#1f1f22] hover:bg-[#000] hover:text-white hover:scale-[1.05] transition-all ease-in-out"
//               }`}
//             >
//               <span className="text-sm font-semibold">{doc.name}</span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   gsap.to(tabRef.current, {
//                     opacity: 0,
//                     y: -10,
//                     duration: 0.3,
//                     ease: "power1.out",
//                     onComplete: () => {
//                       onTabClose(doc.id);
//                     },
//                   });

//                 }}
//                 className="ml-1 hover:text-red-600 hover:scale-150 cursor-pointer  transition-transform ease-in-out"
//               >
//                 <FiX className="w-4 h-4 font-medium" />
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
