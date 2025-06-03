import React from 'react';
export default function CustomURLModal({ isOpen, setModalOpen, setNewCustomURLAdded, typeToEdit, setTypeToEdit, editID, setEditID, }: {
    isOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewCustomURLAdded: React.Dispatch<React.SetStateAction<boolean>>;
    typeToEdit: any;
    setTypeToEdit: React.Dispatch<React.SetStateAction<string>>;
    editID: string;
    setEditID: React.Dispatch<React.SetStateAction<string>>;
}): import("react/jsx-runtime").JSX.Element;
