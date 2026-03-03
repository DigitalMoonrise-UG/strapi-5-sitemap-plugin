import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Modal, Grid, Field, SingleSelect, SingleSelectOption, Button, Box, Typography, Flex, Checkbox, Main, LinkButton, Table, Thead, Tr, Th, VisuallyHidden, Tbody, Td, IconButton, TFooter } from "@strapi/design-system";
import { Pencil, Trash, Plus } from "@strapi/icons";
import { P as PLUGIN_ID } from "./index-mND2TReZ.mjs";
import { getFetchClient } from "@strapi/strapi/admin";
function CollectionTypeModal({
  isOpen,
  setModalOpen,
  setNewCollectionTypeAdded,
  typeToEdit = null,
  setTypeToEdit,
  editID = "",
  setEditID
}) {
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
      alert("An unexpected error occurred.");
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
        alert("Error while loading!");
      }
    };
    const getLocales = async () => {
      try {
        const { data } = await get(`/${PLUGIN_ID}/admin-get-locales`);
        setLocales(data);
      } catch (error) {
        alert("Error while loading!");
      }
    };
    getContentTypes();
    getLocales();
  }, []);
  useEffect(() => {
    if (type) {
      const getAllowedFields = async () => {
        const { data } = await get(`/${PLUGIN_ID}/admin-allowed-fields?type=${type}`);
        setPossibleThumbnailFields(data.allowedFields);
        setPatternHint("Possible fields: " + data.allowedFields.map((field) => `[${field}]`).join(", "));
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
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: typeToEdit ? "Edit Collection Type" : "Add Collection Type" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "Select a collection type", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Type" }),
        /* @__PURE__ */ jsx(SingleSelect, { name: "type", required: true, onChange: handleSelectChange(setType), ref: typeRef, value: type, placeholder: "Select Type", disabled: typeToEdit, children: collectionTypes.map((collectionType) => /* @__PURE__ */ jsx(SingleSelectOption, { value: collectionType.singularName, children: collectionType.displayName }, collectionType.uid)) }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { required: true, width: "100%", hint: "Select a language or leave empty for the default language", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Lang Code" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "langcode", onChange: handleSelectChange(setLangcode), ref: langcodeRef, value: langcode, placeholder: "Select Langcode", disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "-", children: "Default Language" }),
          locales.map((locale) => /* @__PURE__ */ jsx(SingleSelectOption, { value: locale.code, children: locale.code }, locale.id))
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { name: "pattern", required: true, width: "100%", hint: `How do your links look like? ${patternHint}`, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Pattern" }),
        /* @__PURE__ */ jsx(Field.Input, { value: pattern, onChange: handleInputChange(setPattern), ref: patternRef, disabled: type === "" }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The priority of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Priority" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "priority", required: true, onChange: handleSelectChange(setPriority), ref: priorityRef, value: priority, placeholder: "Select Priority", disabled: type === "", children: [
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
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The changefrequency of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Change Frequency" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "frequency", required: true, onChange: handleSelectChange(setFrequency), ref: frequencyRef, value: frequency, placeholder: "Select Frequency", disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "always", children: "Always" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "hourly", children: "Hourly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "daily", children: "Daily" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "weekly", children: "Weekly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "monthly", children: "Monthly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "yearly", children: "Yearly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "never", children: "Never" })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "Add last modification date", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Last Modified" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "lastModified", required: true, onChange: handleSelectChange(setLastModified), ref: lastModifiedRef, value: lastModified, placeholder: "Select True or False", disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "false", children: "False" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "true", children: "True" })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "Optional thumbnail image", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Thumbnail" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "thumbnail", onChange: handleSelectChange(setThumbnail), ref: thumbnailRef, value: thumbnail, placeholder: "Select Thumbnail", disabled: type === "", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "-", children: "None" }),
          possibleThumbnailFields.map((field) => /* @__PURE__ */ jsx(SingleSelectOption, { value: field, children: field }, field))
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(
        Field.Root,
        {
          width: "100%",
          hint: "Enable population of linked models to include related data in the URL. Note that this may significantly increase the time required to generate the sitemap.",
          children: [
            /* @__PURE__ */ jsx(Field.Label, { children: "Populate linked models" }),
            /* @__PURE__ */ jsxs(
              SingleSelect,
              {
                name: "populateLinkedModels",
                required: true,
                onChange: handleSelectChange(setPopulateLinkedModels),
                ref: populateLinkedModelsRef,
                value: populateLinkedModels,
                placeholder: "Select True or False",
                disabled: type === "",
                children: [
                  /* @__PURE__ */ jsx(SingleSelectOption, { value: "false", children: "False" }),
                  /* @__PURE__ */ jsx(SingleSelectOption, { value: "true", children: "True" })
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
      }, children: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: "Confirm" })
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
      alert("An unexpected error occurred.");
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
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: typeToEdit ? "Edit Custom URL" : "Add Custom URL" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The slug of your custom URL", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Slug" }),
        /* @__PURE__ */ jsx(Field.Input, { value: slug, onChange: handleInputChange(setSlug), ref: slugRef }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The priority of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Priority" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "priority", required: true, onChange: handleSelectChange(setPriority), ref: priorityRef, value: priority, placeholder: "Select Priority", children: [
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
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The changefrequency of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Change Frequency" }),
        /* @__PURE__ */ jsxs(SingleSelect, { name: "frequency", required: true, onChange: handleSelectChange(setFrequency), ref: frequencyRef, value: frequency, placeholder: "Select Frequency", children: [
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "always", children: "Always" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "hourly", children: "Hourly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "daily", children: "Daily" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "weekly", children: "Weekly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "monthly", children: "Monthly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "yearly", children: "Yearly" }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "never", children: "Never" })
        ] }),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: () => {
        setTypeToEdit("");
        setModalOpen(false);
      }, children: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: "Confirm" })
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
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: initialData ? "Edit sitemap" : "Add sitemap" }) }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsxs(Field.Root, { name: "sitemapName", required: true, marginBottom: 4, children: [
        /* @__PURE__ */ jsxs(Field.Label, { children: [
          "Name (slug for sitemap-",
          "{name}",
          ".xml)"
        ] }),
        /* @__PURE__ */ jsx(
          Field.Input,
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "e.g. blog, pages"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Field.Root, { name: "collectionTypes", marginBottom: 4, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Collection Types (multiple selection)" }),
        /* @__PURE__ */ jsx(Field.Hint, { children: "Which configured collection types should appear in this sitemap?" }),
        /* @__PURE__ */ jsx(Box, { paddingTop: 2, style: { maxHeight: 200, overflow: "auto", border: "1px solid #dcdce4", borderRadius: 4, padding: 8 }, children: collectionTypes.length === 0 ? /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: "First add collection types above." }) : /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "start", gap: 3, children: collectionTypes.map((ct) => /* @__PURE__ */ jsxs(
          Checkbox,
          {
            checked: selectedIds.includes(ct.id),
            onCheckedChange: (checked) => {
              if (checked === true) setSelectedIds((prev) => prev.includes(ct.id) ? prev : [...prev, ct.id]);
              else setSelectedIds((prev) => prev.filter((id) => id !== ct.id));
            },
            children: [
              ct.type,
              " (lang: ",
              ct.langcode,
              ")"
            ]
          },
          ct.id
        )) }) })
      ] }),
      /* @__PURE__ */ jsx(Field.Root, { name: "includeCustomUrls", children: /* @__PURE__ */ jsx(
        Checkbox,
        {
          checked: includeCustomUrls,
          onCheckedChange: (checked) => setIncludeCustomUrls(checked === true),
          children: "Include custom URLs (pages) in this sitemap"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: "Save" })
    ] })
  ] }) });
}
const Settings = () => {
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
        alert("An unexpected error occurred");
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
      alert("An unexpected error occurred.");
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
      alert("An unexpected error occurred.");
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
        /* @__PURE__ */ jsx(Typography, { variant: "alpha", as: "h1", children: "Sitemap" }),
        /* @__PURE__ */ jsx(Box, { color: "neutral400", children: /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", children: "Settings for the sitemap XML" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsx(Box, { textAlign: "right", width: "100%", children: /* @__PURE__ */ jsx(LinkButton, { variant: "default", marginRight: 2, isExternal: true, href: "/api/strapi-5-sitemap-plugin/sitemap.xml", children: "Show Sitemap" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Base URL" }) }),
      /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxs(Field.Root, { name: "baseURL", required: true, width: "100%", hint: `What is your base URL? (e. g. https://www.example.com)`, children: [
          /* @__PURE__ */ jsx(Field.Label, { children: "Base URL" }),
          /* @__PURE__ */ jsx(Field.Input, { value: baseURL, onChange: handleInputChange(setBaseURL) }),
          /* @__PURE__ */ jsx(Field.Hint, {})
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "default", marginRight: 2, onClick: saveOptions, children: "Save" })
      ] }),
      /* @__PURE__ */ jsxs(Box, { marginTop: 8, children: [
        /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Sitemap Settings" }) }),
        /* @__PURE__ */ jsx(Box, { marginBottom: 2, children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: useSitemapIndex,
            onCheckedChange: (checked) => setUseSitemapIndex(checked === true),
            children: "Use sitemap index with multiple sitemaps"
          }
        ) }),
        /* @__PURE__ */ jsxs(Typography, { variant: "epsilon", as: "p", textColor: "neutral600", marginTop: 1, children: [
          "When enabled, sitemap.xml becomes the index; each entry below generates sitemap-",
          "{name}",
          ".xml."
        ] }),
        /* @__PURE__ */ jsxs(Box, { marginTop: 3, padding: 3, style: { borderRadius: 4, border: "1px solid #eaeaef" }, children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "epsilon", as: "p", textColor: "neutral600", children: [
            "For public access to individual sitemaps (sitemap-",
            "{name}",
            ".xml), enable the permission:"
          ] }),
          /* @__PURE__ */ jsxs(Typography, { variant: "epsilon", as: "p", textColor: "neutral700", marginTop: 1, children: [
            /* @__PURE__ */ jsx("code", { style: { fontFamily: "monospace", fontSize: "13px", padding: "2px 6px", borderRadius: 4 }, children: "getSitemapBySlug" }),
            " ",
            "in Users & Permissions → Public → Strapi-5-sitemap-plugin"
          ] })
        ] })
      ] }),
      useSitemapIndex && /* @__PURE__ */ jsx(Box, { marginTop: 4, children: /* @__PURE__ */ jsxs(Table, { colCount: 4, rowCount: 4, footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => {
        setSitemapEditIndex(null);
        setSitemapModalOpen(true);
      }, children: "Add sitemap" }), children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Name" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Collection Types" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Custom URLs" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: sitemapDefinitions.map((def, index) => /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Typography, { variant: "sigma", children: [
            "sitemap-",
            def.name,
            ".xml"
          ] }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: (def.collectionTypeConfigIds || []).map(getCollectionTypeLabel).join(", ") || "—" }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: def.includeCustomUrls ? "Yes" : "No" }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
            /* @__PURE__ */ jsx(IconButton, { onClick: () => {
              setSitemapEditIndex(index);
              setSitemapModalOpen(true);
            }, label: "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleDeleteSitemapDef(index), label: "Delete", children: /* @__PURE__ */ jsx(Trash, {}) })
          ] }) })
        ] }, index)) })
      ] }) }),
      /* @__PURE__ */ jsx(Button, { variant: "default", marginTop: 3, onClick: saveOptions, children: "Save" })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Collection Types" }) }),
      /* @__PURE__ */ jsxs(Table, { colCount: 10, rowCount: 6, footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => setModalOpen(true), children: "Add another field to this collection type" }), children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Type" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Lang Code" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Pattern" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Priority" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Change Frequency" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Add last modification date" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Thumbnail" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: "Actions" }) })
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
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleEdit(collectionType, "collectionType"), label: "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleDelete(collectionType, "collectionType"), label: "Delete", children: /* @__PURE__ */ jsx(Trash, {}) })
          ] }) })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Custom URLs" }) }),
      /* @__PURE__ */ jsxs(Table, { colCount: 10, rowCount: 6, footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => setCustomURLsModalOpen(true), children: "Add another custom URL" }), children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Slug" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Priority" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Change Frequency" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: customURLs.length > 0 && customURLs.map((customURL, index) => /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: customURL.slug }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: customURL.priority }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: customURL.frequency }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleEdit(customURL, "customURL"), label: "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(IconButton, { onClick: () => handleDelete(customURL, "customURL"), label: "Delete", children: /* @__PURE__ */ jsx(Trash, {}) })
          ] }) })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxs(Box, { marginBottom: 4, children: [
        /* @__PURE__ */ jsx(Box, { marginBottom: 2, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Excluded URLs" }) }),
        /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", textColor: "neutral600", children: "URL paths to exclude from the sitemap (one per line). E.g. /index if you use Custom URL for / and want to avoid duplicate or 404 entries." })
      ] }),
      /* @__PURE__ */ jsxs(Field.Root, { name: "excludedUrls", width: "100%", hint: "One path per line, e.g. /index", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Excluded paths" }),
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
      /* @__PURE__ */ jsx(Button, { variant: "default", marginTop: 2, onClick: saveOptions, children: "Save options" })
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
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Confirm Delete" }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Typography, { children: "Are you sure you want to delete this entry?" }) }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: () => {
          setDeleteModalOpen(false);
          setEntryToDelete(null);
          setEntryToDeleteType("");
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "danger", onClick: confirmDelete, children: "Delete" })
      ] })
    ] }) })
  ] });
};
export {
  Settings as default
};
