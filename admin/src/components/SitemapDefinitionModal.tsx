import { Button, Field, Modal, Checkbox, Box, Typography, Flex } from "@strapi/design-system";
import React, { useState, useEffect } from "react";

export interface SitemapDefinition {
	name: string;
	collectionTypeConfigIds: number[];
	includeCustomUrls: boolean;
}

export default function SitemapDefinitionModal({
	isOpen,
	onClose,
	onSubmit,
	collectionTypes,
	initialData,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: SitemapDefinition) => void;
	collectionTypes: Array<{ id: number; type: string; langcode: string }>;
	initialData: SitemapDefinition | null;
}) {
	const [name, setName] = useState("");
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [includeCustomUrls, setIncludeCustomUrls] = useState(false);

	useEffect(() => {
		if (initialData) {
			setName(initialData.name);
			setSelectedIds(initialData.collectionTypeConfigIds || []);
			setIncludeCustomUrls(initialData.includeCustomUrls || false);
		} else {
			setName("");
			setSelectedIds([]);
			setIncludeCustomUrls(false);
		}
	}, [initialData, isOpen]);

	const handleSubmit = () => {
		const trimmed = (name || "").trim();
		if (!trimmed) return;
		onSubmit({
			name: trimmed,
			collectionTypeConfigIds: selectedIds,
			includeCustomUrls,
		});
		onClose();
	};

	if (!isOpen) return null;

	return (
		<Modal.Root open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>
						{initialData ? "Edit sitemap" : "Add sitemap"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Field.Root name="sitemapName" required marginBottom={4}>
						<Field.Label>Name (slug for sitemap-{"{name}"}.xml)</Field.Label>
						<Field.Input
							value={name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
							placeholder="e.g. blog, pages"
						/>
					</Field.Root>
					<Field.Root name="collectionTypes" marginBottom={4}>
						<Field.Label>Collection Types (multiple selection)</Field.Label>
						<Field.Hint>Which configured collection types should appear in this sitemap?</Field.Hint>
						<Box paddingTop={2} style={{ maxHeight: 200, overflow: "auto", border: "1px solid #dcdce4", borderRadius: 4, padding: 8 } as React.CSSProperties}>
							{collectionTypes.length === 0 ? (
								<Typography variant="epsilon" textColor="neutral600">First add collection types above.</Typography>
							) : (
								<Flex direction="column" alignItems="start" gap={3}>
									{collectionTypes.map((ct) => (
										<Checkbox
											key={ct.id}
											checked={selectedIds.includes(ct.id)}
											onCheckedChange={(checked: boolean | 'indeterminate') => {
												if (checked === true) setSelectedIds((prev) => (prev.includes(ct.id) ? prev : [...prev, ct.id]));
												else setSelectedIds((prev) => prev.filter((id) => id !== ct.id));
											}}
										>
											{ct.type} (lang: {ct.langcode})
										</Checkbox>
									))}
								</Flex>
							)}
						</Box>
					</Field.Root>
					<Field.Root name="includeCustomUrls">
						<Checkbox
							checked={includeCustomUrls}
							onCheckedChange={(checked: boolean | 'indeterminate') => setIncludeCustomUrls(checked === true)}
						>
							Include custom URLs (pages) in this sitemap
						</Checkbox>
					</Field.Root>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="tertiary" onClick={onClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Save</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
}
