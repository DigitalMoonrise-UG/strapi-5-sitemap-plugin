import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Modal, Grid, Field, SingleSelect, SingleSelectOption, Button, Box, Typography, Flex, Checkbox, Main, LinkButton, Table, Thead, Tr, Th, VisuallyHidden, Tbody, Td, IconButton, TFooter } from "@strapi/design-system";
import { Pencil, Trash, Plus } from "@strapi/icons";
import { g as getTrad, P as PLUGIN_ID } from "./index-CWWNJihn.mjs";
import { getFetchClient } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
function CollectionTypeModal({
  isOpen,
  setModalOpen,
  setNewCollectionTypeAdded,
  typeToEdit = null,
  setTypeToEdit,
  editID = "",
  setEditID
}) {
  const { formatMessage } = useIntl();
  const t = (id, values) => formatMessage({ id: getTrad(id) }, values);
  const [type, setType] = useState("");
  const [langcode, setLangcode] = useState("");
  const [pattern, setPattern] = useState("");
  const [priority, setPriority] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lastModified, setLastModified] = useState("false");
  const [thumbnail, setThumbnail] = useState("");
  const [possibleThumbnailFields, setPossibleThumbnailFields] = useState([]);
  const [populateLinkedModels, setPopulateLinkedModels] = useState("false");
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [locales, setLocales] = useState([]);
  const [patternHint, setPatternHint] = useState("");
  const typeRef = useRef(null);
  const langcodeRef = useRef(null);
  const patternRef = useRef(null);
  const priorityRef = useRef(null);
  const frequencyRef = useRef(null);
  const lastModifiedRef = useRef(null);
  const thumbnailRef = useRef(null);
  const populateLinkedModelsRef = useRef(null);
  const { get, put, post } = getFetchClient();
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
  const handleSelectChange = (setter) => (event) => {
    setter(event);
  };
  const validateFields = () => {
    if (!type) {
      typeRef.current?.focus();
      return false;
    }
    if (!pattern) {
      patternRef.current?.focus();
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
        response = await put(`/${PLUGIN_ID}/admin`, {
          type,
          langcode,
          pattern,
          priority,
          frequency,
          lastModified,
          thumbnail,
          id: editID,
          populateLinkedModels
        });
      } else {
        response = await post(`/${PLUGIN_ID}/admin`, {
          type,
          langcode,
          pattern,
          priority,
          lastModified,
          frequency,
          thumbnail,
          populateLinkedModels
        });
      }
      const data = response.data;
      setNewCollectionTypeAdded(true);
      setType("");
      setLangcode("");
      setPattern("");
      setPriority("");
      setFrequency("");
      setLastModified("false");
      setThumbnail("");
      setEditID("");
      setTypeToEdit("");
      setModalOpen(false);
      setPopulateLinkedModels("false");
    } catch (err) {
      console.error(err);
      alert(t("error.unexpected"));
    }
  };
  useEffect(() => {
    if (typeToEdit) {
      setType(typeToEdit.type || "");
      setLangcode(typeToEdit.langcode || "");
      setPattern(typeToEdit.pattern || "");
      setPriority(typeToEdit.priority?.toString() || "");
      setFrequency(typeToEdit.frequency || "");
      setLastModified(typeToEdit.lastModified || "false");
      setThumbnail(typeToEdit.thumbnail || "");
      setPopulateLinkedModels(typeToEdit.populateLinkedModels || "false");
    } else {
      setType("");
      setLangcode("");
      setPattern("");
      setPriority("");
      setFrequency("");
      setLastModified("false");
      setThumbnail("");
      setEditID("");
      setPopulateLinkedModels("false");
    }
  }, [typeToEdit]);
  useEffect(() => {
    const getContentTypes = async () => {
      try {
        const { data } = await get(`/${PLUGIN_ID}/admin-get-content-types`);
        setCollectionTypes(data.collectionTypes);
      } catch (error) {
        alert(t("error.loading"));
      }
    };
    const getLocales = async () => {
      try {
        const { data } = await get(`/${PLUGIN_ID}/admin-get-locales`);
        setLocales(data);
      } catch (error) {
        alert(t("error.loading"));
      }
    };
    getContentTypes();
    getLocales();
  }, []);
  useEffect(() => {
    if (type) {
      const getAllowedFields = async () => {
        const { data } = await get(`/${PLUGIN_ID}/admin-allowed-fields?type=${type}`);
        setPossibleThumbnailFields(data.mediaFields ?? []);
        setPatternHint(data.allowedFields.map((field) => `[${field}]`).join(", "));
        if (pattern === "") {
          setPattern("/" + data.slug + "/");
        }
      };
      getAllowedFields();
    }
  }, [type]);
  const handleOnOpenChange = (open) => {
    if (!open) {
      setTypeToEdit("");
      setEditID("");
      setModalOpen(false);
    }
  };
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: (e) => handleOnOpenChange(e), children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: typeToEdit ? t("collectionTypeModal.edit") : t("collectionTypeModal.add") }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("collectionTypeModal.typeHint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("collectionTypes.type") }),
        /* @__PURE__ */ jsx(SingleSelect, { name: "type", required: true, onChange: handleSelectChange(setType), ref: typeRef, value: type, placeholder: t("collectionTypeModal.typePlaceholder"), disabled: typeToEdit, children: collectionTypes.map((collectionType) => /* @__PURE__ */ jsx(SingleSelectOption, { value: collectionType.singularName, children: collectionType.displayName }, collectionType.uid)) }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { required: true, width: "100%", hint: t("collectionTypeModal.langcodeHint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("collectionTypes.langcode") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "langcode", onChange: handleSelectChange(setLangcode), ref: langcodeRef, value: langcode, placeholder: t("collectionTypeModal.langcodePlaceholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "-", children: t("common.defaultLanguage") }),
          locales.map((locale) => /* @__PURE__ */ jsx(SingleSelectOption, { value: locale.code, children: locale.code }, locale.id))
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { name: "pattern", required: true, width: "100%", hint: t("collectionTypeModal.patternHint") + (patternHint ? " " + t("collectionTypeModal.possibleFields", { fields: patternHint }) : ""), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("collectionTypes.pattern") }),
        /* @__PURE__ */ jsx(Field.Input, { value: pattern, onChange: handleInputChange(setPattern), ref: patternRef, disabled: type === "" }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("priority.hint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("priority.label") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "priority", required: true, onChange: handleSelectChange(setPriority), ref: priorityRef, value: priority, placeholder: t("priority.placeholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.1", children: "0.1" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.2", children: "0.2" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.3", children: "0.3" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.4", children: "0.4" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.5", children: "0.5" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.6", children: "0.6" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.7", children: "0.7" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.8", children: "0.8" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.9", children: "0.9" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "1", children: "1" })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("frequency.hint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("frequency.label") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "frequency", required: true, onChange: handleSelectChange(setFrequency), ref: frequencyRef, value: frequency, placeholder: t("frequency.placeholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "always", children: t("frequency.always") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "hourly", children: t("frequency.hourly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "daily", children: t("frequency.daily") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "weekly", children: t("frequency.weekly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "monthly", children: t("frequency.monthly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "yearly", children: t("frequency.yearly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "never", children: t("frequency.never") })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("collectionTypeModal.lastModifiedHint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("collectionTypeModal.lastModifiedLabel") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "lastModified", required: true, onChange: handleSelectChange(setLastModified), ref: lastModifiedRef, value: lastModified, placeholder: t("collectionTypeModal.boolPlaceholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "false", children: t("common.false") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "true", children: t("common.true") })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("collectionTypeModal.thumbnailHint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("collectionTypes.thumbnail") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "thumbnail", onChange: handleSelectChange(setThumbnail), ref: thumbnailRef, value: thumbnail, placeholder: t("collectionTypeModal.thumbnailPlaceholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "-", children: t("common.none") }),
          possibleThumbnailFields.map((field) => /* @__PURE__ */ jsx(SingleSelectOption, { value: field, children: field }, field))
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(
        Field.Root,
        {
          width: "100%",
          hint: t("collectionTypeModal.populateHint"),
          children: [
            /* @__PURE__ */ jsx(Field.Label, { children: t("collectionTypeModal.populateLabel") }),
            /* @__PURE__ */ jsxs(
              SingleSelect,
              {
                name: "populateLinkedModels",
                required: true,
                onChange: handleSelectChange(setPopulateLinkedModels),
                ref: populateLinkedModelsRef,
                value: populateLinkedModels,
                placeholder: t("collectionTypeModal.boolPlaceholder"),
                disabled: type === "",
                children: [
                  /* @__PURE__ */ jsx(SingleSelectOption, { value: "false", children: t("common.false") }),
                  /* @__PURE__ */ jsx(SingleSelectOption, { value: "true", children: t("common.true") })
                ]
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, {})
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: () => {
        setTypeToEdit("");
        setModalOpen(false);
      }, children: t("common.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: t("common.confirm") })
    ] })
  ] }) });
}
function CustomURLModal({
  isOpen,
  setModalOpen,
  setNewCustomURLAdded,
  typeToEdit = "",
  setTypeToEdit,
  editID = "",
  setEditID
}) {
  const { formatMessage } = useIntl();
  const t = (id, values) => formatMessage({ id: getTrad(id) }, values);
  const [slug, setSlug] = useState("");
  const [priority, setPriority] = useState("");
  const [frequency, setFrequency] = useState("");
  const slugRef = useRef(null);
  const priorityRef = useRef(null);
  const frequencyRef = useRef(null);
  const { put, post } = getFetchClient();
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
  const handleSelectChange = (setter) => (event) => {
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
          id: editID
        });
      } else {
        response = await post(`/${PLUGIN_ID}/admin-custom-urls`, { slug, priority, frequency });
      }
      const data = response.data;
      setNewCustomURLAdded(true);
      setSlug("");
      setPriority("");
      setFrequency("");
      setEditID("");
      setTypeToEdit("");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(t("error.unexpected"));
    }
  };
  useEffect(() => {
    if (typeToEdit !== "") {
      setSlug(typeToEdit.slug || "");
      setPriority(typeToEdit.priority?.toString() || "");
      setFrequency(typeToEdit.frequency || "");
    } else {
      setSlug("");
      setPriority("");
      setFrequency("");
      setEditID("");
    }
  }, [typeToEdit]);
  const handleOnOpenChange = (open) => {
    if (!open) {
      setTypeToEdit("");
      setEditID("");
      setModalOpen(false);
    }
  };
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: (e) => handleOnOpenChange(e), children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: typeToEdit ? t("customUrlModal.edit") : t("customUrlModal.add") }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("customUrlModal.slugHint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("customUrls.slug") }),
        /* @__PURE__ */ jsx(Field.Input, { value: slug, onChange: handleInputChange(setSlug), ref: slugRef }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("priority.hint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("priority.label") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "priority", required: true, onChange: handleSelectChange(setPriority), ref: priorityRef, value: priority, placeholder: t("priority.placeholder"), children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.1", children: "0.1" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.2", children: "0.2" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.3", children: "0.3" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.4", children: "0.4" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.5", children: "0.5" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.6", children: "0.6" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.7", children: "0.7" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.8", children: "0.8" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0.9", children: "0.9" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "1", children: "1" })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: t("frequency.hint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("frequency.label") }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "frequency", required: true, onChange: handleSelectChange(setFrequency), ref: frequencyRef, value: frequency, placeholder: t("frequency.placeholder"), children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "always", children: t("frequency.always") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "hourly", children: t("frequency.hourly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "daily", children: t("frequency.daily") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "weekly", children: t("frequency.weekly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "monthly", children: t("frequency.monthly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "yearly", children: t("frequency.yearly") }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "never", children: t("frequency.never") })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: () => {
        setTypeToEdit("");
        setModalOpen(false);
      }, children: t("common.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: t("common.confirm") })
    ] })
  ] }) });
}
function SitemapDefinitionModal({
  isOpen,
  onClose,
  onSubmit,
  collectionTypes,
  initialData
}) {
  const { formatMessage } = useIntl();
  const t = (id, values) => formatMessage({ id: getTrad(id) }, values);
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
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
      includeCustomUrls
    });
    onClose();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: initialData ? t("sitemapModal.edit") : t("sitemapModal.add") }) }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsxs(Field.Root, { name: "sitemapName", required: true, marginBottom: 4, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("sitemapModal.nameLabel", { file: "sitemap-{name}.xml" }) }),
        /* @__PURE__ */ jsx(
          Field.Input,
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: t("sitemapModal.namePlaceholder")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Field.Root, { name: "collectionTypes", marginBottom: 4, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("sitemapModal.collectionTypesLabel") }),
        /* @__PURE__ */ jsx(Field.Hint, { children: t("sitemapModal.collectionTypesHint") }),
        /* @__PURE__ */ jsx(Box, { paddingTop: 2, style: { maxHeight: 200, overflow: "auto", border: "1px solid #dcdce4", borderRadius: 4, padding: 8 }, children: collectionTypes.length === 0 ? /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: t("sitemapModal.noCollectionTypes") }) : /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "start", gap: 3, children: collectionTypes.map((ct) => /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: selectedIds.includes(ct.id),
            onCheckedChange: (checked) => {
              if (checked === true) setSelectedIds((prev) => prev.includes(ct.id) ? prev : [...prev, ct.id]);
              else setSelectedIds((prev) => prev.filter((id) => id !== ct.id));
            },
            children: t("sitemapModal.collectionTypeItem", { type: ct.type, langcode: ct.langcode })
          },
          ct.id
        )) }) })
      ] }),
      /* @__PURE__ */ jsx(Field.Root, { name: "includeCustomUrls", children: /* @__PURE__ */ jsx(
        Checkbox,
        {
          checked: includeCustomUrls,
          onCheckedChange: (checked) => setIncludeCustomUrls(checked === true),
          children: t("sitemapModal.includeCustomUrls")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: onClose, children: t("common.cancel") }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: t("common.save") })
    ] })
  ] }) });
}
const Settings = () => {
  const { formatMessage } = useIntl();
  const t = (id, values) => formatMessage({ id: getTrad(id) }, values);
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [customURLs, setCustomURLs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customURLsModalOpen, setCustomURLsModalOpen] = useState(false);
  const [newCollectionTypeAdded, setNewCollectionTypeAdded] = useState(false);
  const [newCustomURLAdded, setNewCustomURLAdded] = useState(false);
  const [typeToEdit, setTypeToEdit] = useState("");
  const [editID, setEditID] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [entryToDeleteType, setEntryToDeleteType] = useState("");
  const [baseURL, setBaseURL] = useState("");
  const [excludedUrlsText, setExcludedUrlsText] = useState("");
  const [useSitemapIndex, setUseSitemapIndex] = useState(false);
  const [sitemapDefinitions, setSitemapDefinitions] = useState([]);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [sitemapEditIndex, setSitemapEditIndex] = useState(null);
  const { get, put, del } = getFetchClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await get(`/${PLUGIN_ID}/admin`);
        setCollectionTypes(data.results);
      } catch (err) {
        console.error(err);
        alert(t("error.unexpected"));
      }
    };
    fetchData();
    const fetchOptions = async () => {
      const { data } = await get(`/${PLUGIN_ID}/admin-get-options`);
      if (data.baseUrl) setBaseURL(data.baseUrl);
      if (Array.isArray(data.excludedUrls) && data.excludedUrls.length > 0) {
        setExcludedUrlsText(data.excludedUrls.join("\n"));
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
  const handleEdit = (entry, type) => {
    if (type === "collectionType") {
      const id = collectionTypes.find((colType) => colType.type === entry.type && colType.langcode === entry.langcode && colType.pattern === entry.pattern && colType.priority === entry.priority && colType.frequency === entry.frequency).id;
      setEditID(id);
      setTypeToEdit(entry);
      setModalOpen(true);
    } else if (type === "customURL") {
      const id = customURLs.find((customURL) => customURL.slug === entry.slug && customURL.priority === entry.priority && customURL.frequency === entry.frequency).id;
      setEditID(id);
      setTypeToEdit(entry);
      setCustomURLsModalOpen(true);
    }
  };
  const handleDelete = (entry, type) => {
    if (type === "collectionType") {
      const id = collectionTypes.find((colType) => colType.type === entry.type && colType.langcode === entry.langcode && colType.pattern === entry.pattern && colType.priority === entry.priority && colType.frequency === entry.frequency).id;
      setEntryToDelete(id);
      setEntryToDeleteType("collection");
      setDeleteModalOpen(true);
    } else if (type === "customURL") {
      const id = customURLs.find((customURL) => customURL.slug === entry.slug && customURL.priority === entry.priority && customURL.frequency === entry.frequency).id;
      setEntryToDelete(id);
      setDeleteModalOpen(true);
      setEntryToDeleteType("customURL");
    }
  };
  const confirmDelete = async () => {
    const url = entryToDeleteType === "collection" ? "admin" : "admin-custom-urls";
    try {
      await del(`/${PLUGIN_ID}/${url}?id=${entryToDelete}`);
      if (entryToDeleteType === "collection") {
        setNewCollectionTypeAdded(true);
      } else if (entryToDeleteType === "customURL") {
        setNewCustomURLAdded(true);
      }
      setDeleteModalOpen(false);
      setEntryToDelete(null);
      setEntryToDeleteType("");
    } catch (err) {
      console.error(err);
      alert(t("error.unexpected"));
    }
  };
  const handleInputChange = (setValue) => (event) => {
    setValue(event.target.value);
  };
  const saveOptions = async () => {
    try {
      const excludedUrls = excludedUrlsText.split("\n").map((line) => line.trim()).filter(Boolean);
      await put(`/${PLUGIN_ID}/admin-put-options`, {
        baseURL,
        excludedUrls,
        useSitemapIndex,
        sitemapDefinitions
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      alert(t("error.unexpected"));
    }
  };
  const getCollectionTypeLabel = (id) => {
    const ct = collectionTypes.find((c) => c.id === id);
    return ct ? `${ct.type} (${ct.langcode})` : String(id);
  };
  const handleSitemapDefinitionSubmit = (data) => {
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
  const handleDeleteSitemapDef = (index) => {
    setSitemapDefinitions((prev) => prev.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Box, { paddingLeft: 10, paddingTop: 8, paddingBottom: 8, paddingRight: 10, children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsxs(Box, { width: "100%", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "alpha", as: "h1", children: t("plugin.name") }),
        /* @__PURE__ */ jsx(Box, { color: "neutral400", children: /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", children: t("page.subtitle") }) })
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsx(Box, { textAlign: "right", width: "100%", children: /* @__PURE__ */ jsx(LinkButton, { variant: "default", marginRight: 2, isExternal: true, href: "/api/strapi-5-sitemap-plugin/sitemap.xml", children: t("page.showSitemap") }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: t("baseUrl.title") }) }),
      /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxs(Field.Root, { name: "baseURL", required: true, width: "100%", hint: t("baseUrl.hint"), children: [
          /* @__PURE__ */ jsx(Field.Label, { children: t("baseUrl.label") }),
          /* @__PURE__ */ jsx(Field.Input, { value: baseURL, onChange: handleInputChange(setBaseURL) }),
          /* @__PURE__ */ jsx(Field.Hint, {})
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "default", marginRight: 2, onClick: saveOptions, children: t("common.save") })
      ] }),
      /* @__PURE__ */ jsxs(Box, { marginTop: 8, children: [
        /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: t("sitemapSettings.title") }) }),
        /* @__PURE__ */ jsx(Box, { marginBottom: 2, children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: useSitemapIndex,
            onCheckedChange: (checked) => setUseSitemapIndex(checked === true),
            children: t("sitemapSettings.useIndex")
          }
        ) }),
        /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", textColor: "neutral600", marginTop: 1, children: t("sitemapSettings.indexHint", { file: "sitemap-{name}.xml" }) }),
        /* @__PURE__ */ jsxs(Box, { marginTop: 3, padding: 3, style: { borderRadius: 4, border: "1px solid #eaeaef" }, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", textColor: "neutral600", children: t("sitemapSettings.permissionHint", { file: "sitemap-{name}.xml" }) }),
          /* @__PURE__ */ jsxs(Typography, { variant: "epsilon", as: "p", textColor: "neutral700", marginTop: 1, children: [
            /* @__PURE__ */ jsx("code", { style: { fontFamily: "monospace", fontSize: "13px", padding: "2px 6px", borderRadius: 4 }, children: "getSitemapBySlug" }),
            " ",
            t("sitemapSettings.permissionLocation")
          ] })
        ] })
      ] }),
      useSitemapIndex && /* @__PURE__ */ jsx(Box, { marginTop: 4, children: /* @__PURE__ */ jsxs(Table, { colCount: 4, rowCount: 4, footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => {
        setSitemapEditIndex(null);
        setSitemapModalOpen(true);
      }, children: t("sitemapSettings.addSitemap") }), children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("sitemapSettings.name") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("sitemapSettings.collectionTypes") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("sitemapSettings.customUrls") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("common.actions") }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: sitemapDefinitions.map((def, index) => /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Typography, { variant: "sigma", children: [
            "sitemap-",
            def.name,
            ".xml"
          ] }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: (def.collectionTypeConfigIds || []).map(getCollectionTypeLabel).join(", ") || "—" }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: def.includeCustomUrls ? t("common.yes") : t("common.no") }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
            /* @__PURE__ */ jsx(IconButton, { onClick: () => {
              setSitemapEditIndex(index);
              setSitemapModalOpen(true);
            }, label: t("common.edit"), children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleDeleteSitemapDef(index), label: t("common.delete"), children: /* @__PURE__ */ jsx(Trash, {}) })
          ] }) })
        ] }, index)) })
      ] }) }),
      /* @__PURE__ */ jsx(Button, { variant: "default", marginTop: 3, onClick: saveOptions, children: t("common.save") })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: t("collectionTypes.title") }) }),
      /* @__PURE__ */ jsxs(Table, { colCount: 10, rowCount: 6, footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => setModalOpen(true), children: t("collectionTypes.addField") }), children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.type") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.langcode") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.pattern") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.priority") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.frequency") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.lastModified") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.thumbnail") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("common.actions") }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: collectionTypes.length > 0 && collectionTypes.map((collectionType, index) => /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.type }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.langcode }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.pattern }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.priority }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.frequency }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.lastModified }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: collectionType.thumbnail }) }),
          /* @__PURE__ */ jsx(Td, {}),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleEdit(collectionType, "collectionType"), label: t("common.edit"), children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleDelete(collectionType, "collectionType"), label: t("common.delete"), children: /* @__PURE__ */ jsx(Trash, {}) })
          ] }) })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: t("customUrls.title") }) }),
      /* @__PURE__ */ jsxs(Table, { colCount: 10, rowCount: 6, footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => setCustomURLsModalOpen(true), children: t("customUrls.add") }), children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("customUrls.slug") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.priority") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: t("collectionTypes.frequency") }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("common.actions") }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: customURLs.length > 0 && customURLs.map((customURL, index) => /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: customURL.slug }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: customURL.priority }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: customURL.frequency }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleEdit(customURL, "customURL"), label: t("common.edit"), children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleDelete(customURL, "customURL"), label: t("common.delete"), children: /* @__PURE__ */ jsx(Trash, {}) })
          ] }) })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxs(Box, { marginBottom: 4, children: [
        /* @__PURE__ */ jsx(Box, { marginBottom: 2, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: t("excludedUrls.title") }) }),
        /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", textColor: "neutral600", children: t("excludedUrls.description") })
      ] }),
      /* @__PURE__ */ jsxs(Field.Root, { name: "excludedUrls", width: "100%", hint: t("excludedUrls.hint"), children: [
        /* @__PURE__ */ jsx(Field.Label, { children: t("excludedUrls.label") }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: excludedUrlsText,
            onChange: (e) => setExcludedUrlsText(e.target.value),
            placeholder: "/index",
            rows: 6,
            style: { width: "100%", padding: "8px", fontSize: "16px", lineHeight: 1.5, borderRadius: "4px", border: "1px solid #dcdce4" }
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "default", marginTop: 2, onClick: saveOptions, children: t("common.saveOptions") })
    ] }),
    modalOpen && /* @__PURE__ */ jsx(CollectionTypeModal, { isOpen: modalOpen, setModalOpen, setNewCollectionTypeAdded, typeToEdit, setTypeToEdit, editID, setEditID }),
    customURLsModalOpen && /* @__PURE__ */ jsx(CustomURLModal, { isOpen: customURLsModalOpen, setModalOpen: setCustomURLsModalOpen, setNewCustomURLAdded, typeToEdit, setTypeToEdit, editID, setEditID }),
    sitemapModalOpen && /* @__PURE__ */ jsx(
      SitemapDefinitionModal,
      {
        isOpen: sitemapModalOpen,
        onClose: () => {
          setSitemapModalOpen(false);
          setSitemapEditIndex(null);
        },
        onSubmit: handleSitemapDefinitionSubmit,
        collectionTypes,
        initialData: sitemapEditIndex !== null ? sitemapDefinitions[sitemapEditIndex] ?? null : null
      }
    ),
    deleteModalOpen && /* @__PURE__ */ jsx(Modal.Root, { open: deleteModalOpen, onOpenChange: setDeleteModalOpen, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: t("delete.title") }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Typography, { children: t("delete.confirm") }) }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: () => {
          setDeleteModalOpen(false);
          setEntryToDelete(null);
          setEntryToDeleteType("");
        }, children: t("common.cancel") }),
        /* @__PURE__ */ jsx(Button, { variant: "danger", onClick: confirmDelete, children: t("common.delete") })
      ] })
    ] }) })
  ] });
};
export {
  Settings as default
};
