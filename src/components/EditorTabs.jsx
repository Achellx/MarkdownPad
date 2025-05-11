import TabItem  from "./TabItem";

export default function EditorTabs({
    documents,
    activeDoc,
    onTabChange,
    onTabClose,
    }) {
    return (
        <div className="h-12 bg-[#fbf9fc] dark:bg-[#131316] flex items-center px-4">
        <div className="flex items-center">
            {documents
            .filter((doc) => doc.type === "file")
            .map((doc) => (
                <TabItem
                key={doc.id}
                doc={doc}
                isActive={activeDoc === doc.id}
                onTabChange={onTabChange}
                onTabClose={onTabClose}
                />
            ))}
        </div>
        </div>
    );
}
