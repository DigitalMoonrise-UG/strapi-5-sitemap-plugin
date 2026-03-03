export interface SitemapDefinition {
    name: string;
    collectionTypeConfigIds: number[];
    includeCustomUrls: boolean;
}
export default function SitemapDefinitionModal({ isOpen, onClose, onSubmit, collectionTypes, initialData, }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SitemapDefinition) => void;
    collectionTypes: Array<{
        id: number;
        type: string;
        langcode: string;
    }>;
    initialData: SitemapDefinition | null;
}): import("react/jsx-runtime").JSX.Element | null;
