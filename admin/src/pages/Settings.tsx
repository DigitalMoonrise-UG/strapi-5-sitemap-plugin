import React, {useEffect, useState} from 'react';
import {Main, Box, Typography, Button, Table, Thead, Tr, Th, VisuallyHidden, Tbody, TFooter, Td, IconButton, Flex, Field, LinkButton} from '@strapi/design-system';
import {Grid} from '@strapi/design-system';
import {Pencil, Plus, Trash} from "@strapi/icons";
import CollectionTypeModal from "../components/CollectionTypeModal";
import {PLUGIN_ID} from "../pluginId";
import { Modal, Checkbox } from '@strapi/design-system';
import CustomURLModal from "../components/CustomURLModal";
import SitemapDefinitionModal, { SitemapDefinition } from "../components/SitemapDefinitionModal";
import { getFetchClient } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { getTrad } from '../utils/getTrad';

const Settings = () => {
	const { formatMessage } = useIntl();
	const t = (id: string, values?: Record<string, string>) => formatMessage({ id: getTrad(id) }, values);
	const [collectionTypes, setCollectionTypes] = useState<any[]>([]);
	const [customURLs, setCustomURLs] = useState<any[]>([]);

	const [modalOpen, setModalOpen] = useState(false);
	const [customURLsModalOpen, setCustomURLsModalOpen] = useState(false);

	const [newCollectionTypeAdded, setNewCollectionTypeAdded] = useState(false);
	const [newCustomURLAdded, setNewCustomURLAdded] = useState(false);

	const [typeToEdit, setTypeToEdit] = useState('');
	const [editID, setEditID] = useState('');

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [entryToDelete, setEntryToDelete] = useState(null);
	const [entryToDeleteType, setEntryToDeleteType] = useState('');

	const [baseURL, setBaseURL] = useState('');
	const [excludedUrlsText, setExcludedUrlsText] = useState('');
	const [useSitemapIndex, setUseSitemapIndex] = useState(false);
	const [sitemapDefinitions, setSitemapDefinitions] = useState<SitemapDefinition[]>([]);
	const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
	const [sitemapEditIndex, setSitemapEditIndex] = useState<number | null>(null);

	const { get, put, del } = getFetchClient();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await get(`/${PLUGIN_ID}/admin`);
				setCollectionTypes(data.results);
			} catch (err) {
				console.error(err);
				alert(t('error.unexpected'));
			}
		};

		fetchData();

		const fetchOptions = async () => {
			const { data } = await get(`/${PLUGIN_ID}/admin-get-options`);
			if (data.baseUrl) setBaseURL(data.baseUrl);
			if (Array.isArray(data.excludedUrls) && data.excludedUrls.length > 0) {
				setExcludedUrlsText(data.excludedUrls.join('\n'));
			}
			setUseSitemapIndex(Boolean(data.useSitemapIndex));
			setSitemapDefinitions(Array.isArray(data.sitemapDefinitions) ? data.sitemapDefinitions : []);
		};
		fetchOptions();

		const fetchCustomURLs = async () => {
			const { data } = await get(`/${PLUGIN_ID}/admin-custom-urls`);
			if (data) {
				setCustomURLs(data.results);
			}
		};
		fetchCustomURLs();
	}, []);

	useEffect(() => {
		if (newCollectionTypeAdded) {
			const fetchData = async () => {
				const { data } = await get(`/${PLUGIN_ID}/admin`);
				if (data) {
					setCollectionTypes(data.results);
				}
			};
			fetchData();
			setNewCollectionTypeAdded(false);
		}
	}, [newCollectionTypeAdded]);

	useEffect(() => {
		if (newCustomURLAdded) {
			const fetchData = async () => {
				const { data } = await get(`/${PLUGIN_ID}/admin-custom-urls`);
				if (data) {
					setCustomURLs(data.results);
				}
			};
			fetchData();
			setNewCustomURLAdded(false);
		}
	}, [newCustomURLAdded]);

	const handleEdit = (entry: any, type: string) => {
		if (type === 'collectionType') {
			const id = collectionTypes.find((colType) => colType.type === entry.type && colType.langcode === entry.langcode && colType.pattern === entry.pattern && colType.priority === entry.priority && colType.frequency === entry.frequency).id;
			setEditID(id);
			setTypeToEdit(entry);
			setModalOpen(true);
		} else if (type === 'customURL') {
			const id = customURLs.find((customURL) => customURL.slug === entry.slug && customURL.priority === entry.priority && customURL.frequency === entry.frequency).id;
			setEditID(id);
			setTypeToEdit(entry);
			setCustomURLsModalOpen(true);
		}
	};

	const handleDelete = (entry: any, type: string) => {
		if (type === 'collectionType') {
			const id = collectionTypes.find((colType) => colType.type === entry.type && colType.langcode === entry.langcode && colType.pattern === entry.pattern && colType.priority === entry.priority && colType.frequency === entry.frequency).id;
			setEntryToDelete(id);
			setEntryToDeleteType('collection');
			setDeleteModalOpen(true);
		} else if (type === 'customURL') {
			const id = customURLs.find((customURL) => customURL.slug === entry.slug && customURL.priority === entry.priority && customURL.frequency === entry.frequency).id;
			setEntryToDelete(id);
			setDeleteModalOpen(true);
			setEntryToDeleteType('customURL');
		}
	};

	const confirmDelete = async () => {
		const url = entryToDeleteType === 'collection' ? 'admin' : 'admin-custom-urls';

		try {
			await del(`/${PLUGIN_ID}/${url}?id=${entryToDelete}`);

			if (entryToDeleteType === 'collection') {
				setNewCollectionTypeAdded(true);
			} else if (entryToDeleteType === 'customURL') {
				setNewCustomURLAdded(true);
			}
			setDeleteModalOpen(false);
			setEntryToDelete(null);
			setEntryToDeleteType('');
		} catch (err) {
			console.error(err);
			alert(t('error.unexpected'));
		}
	};

	const handleInputChange = (setValue: any) => (event: any) => {
		setValue(event.target.value);
	};

	const saveOptions = async () => {
		try {
			const excludedUrls = excludedUrlsText
				.split('\n')
				.map((line) => line.trim())
				.filter(Boolean);
			await put(`/${PLUGIN_ID}/admin-put-options`, {
				baseURL: baseURL,
				excludedUrls,
				useSitemapIndex,
				sitemapDefinitions,
			});
		} catch (err) {
			console.error(JSON.stringify(err));
			alert(t('error.unexpected'));
		}
	};

	const getCollectionTypeLabel = (id: number) => {
		const ct = collectionTypes.find((c: any) => c.id === id);
		return ct ? `${ct.type} (${ct.langcode})` : String(id);
	};

	const handleSitemapDefinitionSubmit = (data: SitemapDefinition) => {
		if (sitemapEditIndex !== null) {
			setSitemapDefinitions((prev) => {
				const next = [...prev];
				next[sitemapEditIndex] = data;
				return next;
			});
			setSitemapEditIndex(null);
		} else {
			setSitemapDefinitions((prev) => [...prev, data]);
		}
	};

	const handleDeleteSitemapDef = (index: number) => {
		setSitemapDefinitions((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<Main>
			<Box paddingLeft={10} paddingTop={8} paddingBottom={8} paddingRight={10}>
				<Grid.Root gap={4}>
					<Grid.Item col={6}>
						<Box width="100%">
							<Typography variant="alpha" as="h1">
								{t('plugin.name')}
							</Typography>
							<Box color="neutral400">
								<Typography variant="epsilon" as="p">
									{t('page.subtitle')}
								</Typography>
							</Box>
						</Box>
					</Grid.Item>
					<Grid.Item col={6}>
						<Box textAlign="right" width="100%">
							<LinkButton variant="default" marginRight={2} isExternal href={"/api/strapi-5-sitemap-plugin/sitemap.xml"}>{t('page.showSitemap')}</LinkButton>
						</Box>
					</Grid.Item>
				</Grid.Root>
			</Box>
			<Box paddingLeft={10} paddingRight={10} paddingBottom={10}>
				<Box marginBottom={4}>
					<Typography variant="beta" as="h2">
						{t('baseUrl.title')}
					</Typography>
				</Box>
				<Flex gap={2}>
					<Field.Root name="baseURL" required width='100%' hint={t('baseUrl.hint')}>
						<Field.Label>{t('baseUrl.label')}</Field.Label>
						<Field.Input value={baseURL} onChange={handleInputChange(setBaseURL)}/>
						<Field.Hint />
					</Field.Root>
					<Button variant="default" marginRight={2} onClick={saveOptions}>{t('common.save')}</Button>
				</Flex>
				<Box marginTop={8}>
					<Box marginBottom={4}>
						<Typography variant="beta" as="h2">{t('sitemapSettings.title')}</Typography>
					</Box>
					<Box marginBottom={2}>
					<Checkbox
						checked={useSitemapIndex}
						onCheckedChange={(checked: boolean | 'indeterminate') => setUseSitemapIndex(checked === true)}
					>
						{t('sitemapSettings.useIndex')}
					</Checkbox>
					</Box>
					<Typography variant="epsilon" as="p" textColor="neutral600" marginTop={1}>
						{t('sitemapSettings.indexHint', { file: 'sitemap-{name}.xml' })}
					</Typography>
					<Box marginTop={3} padding={3} style={{ borderRadius: 4, border: '1px solid #eaeaef' } as React.CSSProperties}>
						<Typography variant="epsilon" as="p" textColor="neutral600">
							{t('sitemapSettings.permissionHint', { file: 'sitemap-{name}.xml' })}
						</Typography>
						<Typography variant="epsilon" as="p" textColor="neutral700" marginTop={1}>
							<code style={{ fontFamily: 'monospace', fontSize: '13px', padding: '2px 6px', borderRadius: 4 }}>getSitemapBySlug</code>
							{' '}{t('sitemapSettings.permissionLocation')}
						</Typography>
					</Box>
				</Box>
				{useSitemapIndex && (
					<Box marginTop={4}>
						<Table colCount={4} rowCount={4} footer={<TFooter icon={<Plus />} onClick={() => { setSitemapEditIndex(null); setSitemapModalOpen(true); }}>{t('sitemapSettings.addSitemap')}</TFooter>}>
							<Thead>
								<Tr>
									<Th><Typography variant="sigma">{t('sitemapSettings.name')}</Typography></Th>
									<Th><Typography variant="sigma">{t('sitemapSettings.collectionTypes')}</Typography></Th>
									<Th><Typography variant="sigma">{t('sitemapSettings.customUrls')}</Typography></Th>
									<Th><VisuallyHidden>{t('common.actions')}</VisuallyHidden></Th>
								</Tr>
							</Thead>
							<Tbody>
								{sitemapDefinitions.map((def, index) => (
									<Tr key={index}>
										<Td><Typography variant="sigma">sitemap-{def.name}.xml</Typography></Td>
										<Td><Typography variant="sigma">{(def.collectionTypeConfigIds || []).map(getCollectionTypeLabel).join(', ') || '—'}</Typography></Td>
										<Td><Typography variant="sigma">{def.includeCustomUrls ? t('common.yes') : t('common.no')}</Typography></Td>
										<Td>
											<Flex gap={1}>
												<IconButton onClick={() => { setSitemapEditIndex(index); setSitemapModalOpen(true); }} label={t('common.edit')}><Pencil /></IconButton>
												<IconButton onClick={() => handleDeleteSitemapDef(index)} label={t('common.delete')}><Trash /></IconButton>
											</Flex>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				)}
				<Button variant="default" marginTop={3} onClick={saveOptions}>{t('common.save')}</Button>
			</Box>
			<Box paddingLeft={10} paddingRight={10} paddingBottom={10}>
				<Box marginBottom={4}>
					<Typography variant="beta" as="h2">
						{t('collectionTypes.title')}
					</Typography>
				</Box>
				<Table colCount={10} rowCount={6} footer={<TFooter icon={<Plus />} onClick={() => setModalOpen(true)}>{t('collectionTypes.addField')}</TFooter>}>
					<Thead>
						<Tr>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.type')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.langcode')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.pattern')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.priority')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.frequency')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.lastModified')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.thumbnail')}</Typography>
							</Th>
							<Th>
								<VisuallyHidden>{t('common.actions')}</VisuallyHidden>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{collectionTypes.length > 0 && collectionTypes.map((collectionType: any, index: number) => (
							<Tr key={index}>
								<Td>
									<Typography variant="sigma">{collectionType.type}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{collectionType.langcode}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{collectionType.pattern}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{collectionType.priority}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{collectionType.frequency}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{collectionType.lastModified}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{collectionType.thumbnail}</Typography>
								</Td>
							<Td>
							</Td>
								<Td>
									<Flex gap={1}>
									<IconButton onClick={() => handleEdit(collectionType, 'collectionType')} label={t('common.edit')}>
											<Pencil />
										</IconButton>
									<IconButton onClick={() => handleDelete(collectionType, 'collectionType')} label={t('common.delete')}>
											<Trash />
										</IconButton>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
			<Box paddingLeft={10} paddingRight={10} paddingBottom={10}>
				<Box marginBottom={4}>
					<Typography variant="beta" as="h2">
						{t('customUrls.title')}
					</Typography>
				</Box>
				<Table colCount={10} rowCount={6} footer={<TFooter icon={<Plus />} onClick={() => setCustomURLsModalOpen(true)}>{t('customUrls.add')}</TFooter>}>
					<Thead>
						<Tr>
							<Th>
								<Typography variant="sigma">{t('customUrls.slug')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.priority')}</Typography>
							</Th>
							<Th>
								<Typography variant="sigma">{t('collectionTypes.frequency')}</Typography>
							</Th>
							<Th>
								<VisuallyHidden>{t('common.actions')}</VisuallyHidden>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{customURLs.length > 0 && customURLs.map((customURL: any, index: number) => (
							<Tr key={index}>
								<Td>
									<Typography variant="sigma">{customURL.slug}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{customURL.priority}</Typography>
								</Td>
								<Td>
									<Typography variant="sigma">{customURL.frequency}</Typography>
								</Td>
								<Td>
									<Flex gap={1}>
										<IconButton onClick={() => handleEdit(customURL, 'customURL')} label={t('common.edit')}>
											<Pencil />
										</IconButton>
									<IconButton onClick={() => handleDelete(customURL, 'customURL')} label={t('common.delete')}>
											<Trash />
										</IconButton>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
			<Box paddingLeft={10} paddingRight={10} paddingBottom={10}>
				<Box marginBottom={4}>
					<Box marginBottom={2}>
					<Typography variant="beta" as="h2">
						{t('excludedUrls.title')}
					</Typography>
					</Box>
					<Typography variant="epsilon" as="p" textColor="neutral600">
						{t('excludedUrls.description')}
					</Typography>
				</Box>
				<Field.Root name="excludedUrls" width="100%" hint={t('excludedUrls.hint')}>
					<Field.Label>{t('excludedUrls.label')}</Field.Label>
					<textarea
						value={excludedUrlsText}
						onChange={(e) => setExcludedUrlsText(e.target.value)}
						placeholder="/index"
						rows={6}
						style={{ width: '100%', padding: '8px', fontSize: '16px', lineHeight: 1.5, borderRadius: '4px', border: '1px solid #dcdce4' }}
					/>
					<Field.Hint />
				</Field.Root>
				<Button variant="default" marginTop={2} onClick={saveOptions}>{t('common.saveOptions')}</Button>
			</Box>

			{modalOpen && <CollectionTypeModal isOpen={modalOpen} setModalOpen={setModalOpen} setNewCollectionTypeAdded={setNewCollectionTypeAdded} typeToEdit={typeToEdit} setTypeToEdit={setTypeToEdit} editID={editID} setEditID={setEditID} />}
			{customURLsModalOpen && <CustomURLModal isOpen={customURLsModalOpen} setModalOpen={setCustomURLsModalOpen} setNewCustomURLAdded={setNewCustomURLAdded} typeToEdit={typeToEdit} setTypeToEdit={setTypeToEdit} editID={editID} setEditID={setEditID} />}
			{sitemapModalOpen && (
				<SitemapDefinitionModal
					isOpen={sitemapModalOpen}
					onClose={() => { setSitemapModalOpen(false); setSitemapEditIndex(null); }}
					onSubmit={handleSitemapDefinitionSubmit}
					collectionTypes={collectionTypes}
					initialData={sitemapEditIndex !== null ? sitemapDefinitions[sitemapEditIndex] ?? null : null}
				/>
			)}

			{deleteModalOpen && (
				<Modal.Root open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
					<Modal.Content>
						<Modal.Header>
							<Modal.Title>{t('delete.title')}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Typography>{t('delete.confirm')}</Typography>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="tertiary" onClick={() => {
								setDeleteModalOpen(false);
								setEntryToDelete(null);
								setEntryToDeleteType('');
							}}>
								{t('common.cancel')}</Button>
							<Button variant="danger" onClick={confirmDelete}>{t('common.delete')}</Button>
						</Modal.Footer>
					</Modal.Content>
				</Modal.Root>
			)}
		</Main>
	);
};

export default Settings;
