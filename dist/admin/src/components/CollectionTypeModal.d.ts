import React from 'react';
export default function CollectionTypeModal({ isOpen, setModalOpen, setNewCollectionTypeAdded, typeToEdit, setTypeToEdit, editID, setEditID, }: {
    isOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewCollectionTypeAdded: React.Dispatch<React.SetStateAction<boolean>>;
    typeToEdit: any | null;
    setTypeToEdit: React.Dispatch<React.SetStateAction<string>>;
    editID: string;
    setEditID: React.Dispatch<React.SetStateAction<string>>;
}): import("react/jsx-runtime").JSX.Element;
