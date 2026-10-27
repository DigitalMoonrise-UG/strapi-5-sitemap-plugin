import { Button, Field, Modal, Checkbox, Box, Typography, Flex } from "@strapi/design-system";
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { getTrad } from "../utils/getTrad";

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
	const { formatMessage } = useIntl();
	const t = (id: string, values?: Record<string, string>) => formatMessage({ id: getTrad(id) }, values);
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
						{initialData ? t('sitemapModal.edit') : t('sitemapModal.add')}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Field.Root name="sitemapName" required marginBottom={4}>
						<Field.Label>{t('sitemapModal.nameLabel', { file: 'sitemap-{name}.xml' })}</Field.Label>
						<Field.Input
							value={name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
							placeholder={t('sitemapModal.namePlaceholder')}
						/>
					</Field.Root>
					<Field.Root name="collectionTypes" marginBottom={4}>
						<Field.Label>{t('sitemapModal.collectionTypesLabel')}</Field.Label>
						<Field.Hint>{t('sitemapModal.collectionTypesHint')}</Field.Hint>
						<Box paddingTop={2} style={{ maxHeight: 200, overflow: "auto", border: "1px solid #dcdce4", borderRadius: 4, padding: 8 } as React.CSSProperties}>
							{collectionTypes.length === 0 ? (
								<Typography variant="epsilon" textColor="neutral600">{t('sitemapModal.noCollectionTypes')}</Typography>
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
											{t('sitemapModal.collectionTypeItem', { type: ct.type, langcode: ct.langcode })}
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
							{t('sitemapModal.includeCustomUrls')}
						</Checkbox>
					</Field.Root>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="tertiary" onClick={onClose}>{t('common.cancel')}</Button>
					<Button onClick={handleSubmit}>{t('common.save')}</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
}
