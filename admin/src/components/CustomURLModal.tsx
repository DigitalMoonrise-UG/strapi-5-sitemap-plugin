import { Button, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { Grid } from '@strapi/design-system';
import { Field } from '@strapi/design-system';
import { Modal } from '@strapi/design-system';
import React, { useEffect, useRef, useState } from 'react';
import { PLUGIN_ID } from '../pluginId';
import { getFetchClient } from '@strapi/strapi/admin';
export default function CustomURLModal({
	isOpen,
	setModalOpen,
	setNewCustomURLAdded,
	typeToEdit = '',
	setTypeToEdit,
	editID = '',
	setEditID,
}: {
	isOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setNewCustomURLAdded: React.Dispatch<React.SetStateAction<boolean>>;
	typeToEdit: any;
	setTypeToEdit: React.Dispatch<React.SetStateAction<string>>;
	editID: string;
	setEditID: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [slug, setSlug] = useState('');
	const [priority, setPriority] = useState('');
	const [frequency, setFrequency] = useState('');

	const slugRef = useRef<HTMLInputElement>(null);
	const priorityRef = useRef<HTMLInputElement>(null);
	const frequencyRef = useRef<HTMLInputElement>(null);

	const { put, post } = getFetchClient();

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setter(event.target.value);
		};
	const handleSelectChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) => (event: string) => {
			setter(event);
		};
	const validateFields = () => {
		if (!slug) {
			slugRef.current?.focus();
			return false;
		}
		if (!priority) {
			priorityRef.current?.focus();
			return false;
		}
		if (!frequency) {
			frequencyRef.current?.focus();
			return false;
		}
		return true;
	};

	const handleSubmit = async () => {
		if (!validateFields()) return;
		let response = null;

		try {
			if (typeToEdit && editID) {
				response = await put(`/${PLUGIN_ID}/admin-custom-urls`, {
					slug,
					priority,
					frequency,
					id: editID,
				});
			} else {
				response = await post(`/${PLUGIN_ID}/admin-custom-urls`, { slug, priority, frequency });
			}

			const data = response.data;
			setNewCustomURLAdded(true);
			setSlug('');
			setPriority('');
			setFrequency('');
			setEditID('');
			setTypeToEdit('');
			setModalOpen(false);
		} catch (err) {
			console.error(err);
			alert('An unexpected error occurred.');
		}
	};

	useEffect(() => {
		if (typeToEdit !== '') {
			setSlug(typeToEdit.slug || '');
			setPriority(typeToEdit.priority?.toString() || '');
			setFrequency(typeToEdit.frequency || '');
		} else {
			setSlug('');
			setPriority('');
			setFrequency('');
			setEditID('');
		}
	}, [typeToEdit]);

	const handleOnOpenChange = (open: boolean) => {
		if (!open) {
			setTypeToEdit('');
			setEditID('');
			setModalOpen(false);
		}
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={(e: boolean) => handleOnOpenChange(e)}>
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>{typeToEdit ? 'Edit Custom URL' : 'Add Custom URL'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Grid.Root gap={4} col={1}>
						<Grid.Item>
							<Field.Root width="100%" hint="The slug of your custom URL">
								<Field.Label>Slug</Field.Label>
								<Field.Input value={slug} onChange={handleInputChange(setSlug)} ref={slugRef} />
								<Field.Hint />
							</Field.Root>
						</Grid.Item>
						<Grid.Item>
							<Field.Root width="100%" hint="The priority of your pages">
								<Field.Label>Priority</Field.Label>
								<SingleSelect
									name="priority"
									required
									onChange={handleSelectChange(setPriority)}
									ref={priorityRef}
									value={priority}
									placeholder="Select Priority"
								>
									<SingleSelectOption value="0.1">0.1</SingleSelectOption>
									<SingleSelectOption value="0.2">0.2</SingleSelectOption>
									<SingleSelectOption value="0.3">0.3</SingleSelectOption>
									<SingleSelectOption value="0.4">0.4</SingleSelectOption>
									<SingleSelectOption value="0.5">0.5</SingleSelectOption>
									<SingleSelectOption value="0.6">0.6</SingleSelectOption>
									<SingleSelectOption value="0.7">0.7</SingleSelectOption>
									<SingleSelectOption value="0.8">0.8</SingleSelectOption>
									<SingleSelectOption value="0.9">0.9</SingleSelectOption>
									<SingleSelectOption value="1">1</SingleSelectOption>
								</SingleSelect>
								<Field.Hint />
							</Field.Root>
						</Grid.Item>
						<Grid.Item>
							<Field.Root width="100%" hint="The changefrequency of your pages">
								<Field.Label>Change Frequency</Field.Label>
								<SingleSelect
									name="frequency"
									required
									onChange={handleSelectChange(setFrequency)}
									ref={frequencyRef}
									value={frequency}
									placeholder="Select Frequency"
								>
									<SingleSelectOption value="always">Always</SingleSelectOption>
									<SingleSelectOption value="hourly">Hourly</SingleSelectOption>
									<SingleSelectOption value="daily">Daily</SingleSelectOption>
									<SingleSelectOption value="weekly">Weekly</SingleSelectOption>
									<SingleSelectOption value="monthly">Monthly</SingleSelectOption>
									<SingleSelectOption value="yearly">Yearly</SingleSelectOption>
									<SingleSelectOption value="never">Never</SingleSelectOption>
								</SingleSelect>
								<Field.Hint />
							</Field.Root>
						</Grid.Item>
					</Grid.Root>
				</Modal.Body>
				<Modal.Footer>
					<Modal.Close>
						<Button
							variant="tertiary"
							onClick={() => {
								setTypeToEdit('');
								setModalOpen(false);
							}}
						>
							Cancel
						</Button>
					</Modal.Close>
					<Button onClick={handleSubmit}>Confirm</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
}
