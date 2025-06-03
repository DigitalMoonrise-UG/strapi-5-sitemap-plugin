import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Modal, Grid, Field, SingleSelect, SingleSelectOption, Button, Main, Box, Typography, LinkButton, Flex, Table, Thead, Tr, Th, VisuallyHidden, Tbody, Td, IconButton, TFooter } from "@strapi/design-system";
import { Pencil, Trash, Plus } from "@strapi/icons";
import { P as PLUGIN_ID } from "./index-0jqR-UT_.mjs";
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
        setPatternHint(
          "Possible fields: " + data.allowedFields.map((field) => `[${field}]`).join(", ")
        );
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
        /* @__PURE__ */ jsx(
          SingleSelect,
          {
            name: "type",
            required: true,
            onChange: handleSelectChange(setType),
            ref: typeRef,
            value: type,
            placeholder: "Select Type",
            disabled: typeToEdit,
            children: collectionTypes.map((collectionType) => /* @__PURE__ */ jsx(
              SingleSelectOption,
              {
                value: collectionType.singularName,
                children: collectionType.displayName
              },
              collectionType.uid
            ))
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(
        Field.Root,
        {
          required: true,
          width: "100%",
          hint: "Select a language or leave empty for the default language",
          children: [
            /* @__PURE__ */ jsx(Field.Label, { children: "Lang Code" }),
            /* @__PURE__ */ jsxs(
              SingleSelect,
              {
                name: "langcode",
                onChange: handleSelectChange(setLangcode),
                ref: langcodeRef,
                value: langcode,
                placeholder: "Select Langcode",
                disabled: type === "",
                children: [
                  /* @__PURE__ */ jsx(SingleSelectOption, { value: "-", children: "Default Language" }),
                  locales.map((locale) => /* @__PURE__ */ jsx(SingleSelectOption, { value: locale.code, children: locale.code }, locale.id))
                ]
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, {})
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(
        Field.Root,
        {
          name: "pattern",
          required: true,
          width: "100%",
          hint: `How do your links look like? ${patternHint}`,
          children: [
            /* @__PURE__ */ jsx(Field.Label, { children: "Pattern" }),
            /* @__PURE__ */ jsx(
              Field.Input,
              {
                value: pattern,
                onChange: handleInputChange(setPattern),
                ref: patternRef,
                disabled: type === ""
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, {})
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The priority of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Priority" }),
        /* @__PURE__ */ jsxs(
          SingleSelect,
          {
            name: "priority",
            required: true,
            onChange: handleSelectChange(setPriority),
            ref: priorityRef,
            value: priority,
            placeholder: "Select Priority",
            disabled: type === "",
            children: [
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
            ]
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The changefrequency of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Change Frequency" }),
        /* @__PURE__ */ jsxs(
          SingleSelect,
          {
            name: "frequency",
            required: true,
            onChange: handleSelectChange(setFrequency),
            ref: frequencyRef,
            value: frequency,
            placeholder: "Select Frequency",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "always", children: "Always" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "hourly", children: "Hourly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "daily", children: "Daily" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "monthly", children: "Monthly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "yearly", children: "Yearly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "never", children: "Never" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "Add last modification date", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Last Modified" }),
        /* @__PURE__ */ jsxs(
          SingleSelect,
          {
            name: "lastModified",
            required: true,
            onChange: handleSelectChange(setLastModified),
            ref: lastModifiedRef,
            value: lastModified,
            placeholder: "Select True or False",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "false", children: "False" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "true", children: "True" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "Optional thumbnail image", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Thumbnail" }),
        /* @__PURE__ */ jsxs(
          SingleSelect,
          {
            name: "thumbnail",
            onChange: handleSelectChange(setThumbnail),
            ref: thumbnailRef,
            value: thumbnail,
            placeholder: "Select Thumbnail",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "-", children: "None" }),
              possibleThumbnailFields.map((field) => /* @__PURE__ */ jsx(SingleSelectOption, { value: field, children: field }, field))
            ]
          }
        ),
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
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "tertiary",
          onClick: () => {
            setTypeToEdit("");
            setModalOpen(false);
          },
          children: "Cancel"
        }
      ) }),
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
        /* @__PURE__ */ jsxs(
          SingleSelect,
          {
            name: "priority",
            required: true,
            onChange: handleSelectChange(setPriority),
            ref: priorityRef,
            value: priority,
            placeholder: "Select Priority",
            children: [
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
            ]
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { children: /* @__PURE__ */ jsxs(Field.Root, { width: "100%", hint: "The changefrequency of your pages", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Change Frequency" }),
        /* @__PURE__ */ jsxs(
          SingleSelect,
          {
            name: "frequency",
            required: true,
            onChange: handleSelectChange(setFrequency),
            ref: frequencyRef,
            value: frequency,
            placeholder: "Select Frequency",
            children: [
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "always", children: "Always" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "hourly", children: "Hourly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "daily", children: "Daily" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "monthly", children: "Monthly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "yearly", children: "Yearly" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "never", children: "Never" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "tertiary",
          onClick: () => {
            setTypeToEdit("");
            setModalOpen(false);
          },
          children: "Cancel"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, children: "Confirm" })
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
    const fetchBaseUrl = async () => {
      const { data } = await get(`/${PLUGIN_ID}/admin-get-options`);
      if (data.baseUrl) {
        setBaseURL(data.baseUrl);
      }
    };
    fetchBaseUrl();
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
      const id = collectionTypes.find(
        (colType) => colType.type === entry.type && colType.langcode === entry.langcode && colType.pattern === entry.pattern && colType.priority === entry.priority && colType.frequency === entry.frequency
      ).id;
      setEditID(id);
      setTypeToEdit(entry);
      setModalOpen(true);
    } else if (type === "customURL") {
      const id = customURLs.find(
        (customURL) => customURL.slug === entry.slug && customURL.priority === entry.priority && customURL.frequency === entry.frequency
      ).id;
      setEditID(id);
      setTypeToEdit(entry);
      setCustomURLsModalOpen(true);
    }
  };
  const handleDelete = (entry, type) => {
    if (type === "collectionType") {
      const id = collectionTypes.find(
        (colType) => colType.type === entry.type && colType.langcode === entry.langcode && colType.pattern === entry.pattern && colType.priority === entry.priority && colType.frequency === entry.frequency
      ).id;
      setEntryToDelete(id);
      setEntryToDeleteType("collection");
      setDeleteModalOpen(true);
    } else if (type === "customURL") {
      const id = customURLs.find(
        (customURL) => customURL.slug === entry.slug && customURL.priority === entry.priority && customURL.frequency === entry.frequency
      ).id;
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
  const saveBaseURL = async () => {
    try {
      await put(`/${PLUGIN_ID}/admin-put-options`, {
        baseURL
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      alert("An unexpected error occurred.");
    }
  };
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Box, { paddingLeft: 10, paddingTop: 8, paddingBottom: 8, paddingRight: 10, children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsxs(Box, { width: "100%", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "alpha", as: "h1", children: "Sitemap" }),
        /* @__PURE__ */ jsx(Box, { color: "neutral400", children: /* @__PURE__ */ jsx(Typography, { variant: "epsilon", as: "p", children: "Settings for the sitemap XML" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsx(Box, { textAlign: "right", width: "100%", children: /* @__PURE__ */ jsx(
        LinkButton,
        {
          variant: "default",
          marginRight: 2,
          isExternal: true,
          href: "/api/strapi-5-sitemap-plugin/sitemap.xml",
          children: "Show Sitemap"
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Base URL" }) }),
      /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxs(
          Field.Root,
          {
            name: "baseURL",
            required: true,
            width: "100%",
            hint: `What is your base URL? (e. g. https://www.example.com)`,
            children: [
              /* @__PURE__ */ jsx(Field.Label, { children: "Base URL" }),
              /* @__PURE__ */ jsx(Field.Input, { value: baseURL, onChange: handleInputChange(setBaseURL) }),
              /* @__PURE__ */ jsx(Field.Hint, {})
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "default",
            marginRight: 2,
            onClick: () => {
              saveBaseURL();
            },
            children: "Save"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Collection Types" }) }),
      /* @__PURE__ */ jsxs(
        Table,
        {
          colCount: 10,
          rowCount: 6,
          footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => setModalOpen(true), children: "Add another field to this collection type" }),
          children: [
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
                /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    onClick: () => handleEdit(collectionType, "collectionType"),
                    label: "Edit",
                    children: /* @__PURE__ */ jsx(Pencil, {})
                  }
                ),
                /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    onClick: () => handleDelete(collectionType, "collectionType"),
                    label: "Delete",
                    children: /* @__PURE__ */ jsx(Trash, {})
                  }
                )
              ] }) })
            ] }, index)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(Box, { marginBottom: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: "Custom URLs" }) }),
      /* @__PURE__ */ jsxs(
        Table,
        {
          colCount: 10,
          rowCount: 6,
          footer: /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: () => setCustomURLsModalOpen(true), children: "Add another custom URL" }),
          children: [
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
                /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    onClick: () => handleDelete(customURL, "customURL"),
                    label: "Delete",
                    children: /* @__PURE__ */ jsx(Trash, {})
                  }
                )
              ] }) })
            ] }, index)) })
          ]
        }
      )
    ] }),
    modalOpen && /* @__PURE__ */ jsx(
      CollectionTypeModal,
      {
        isOpen: modalOpen,
        setModalOpen,
        setNewCollectionTypeAdded,
        typeToEdit,
        setTypeToEdit,
        editID,
        setEditID
      }
    ),
    customURLsModalOpen && /* @__PURE__ */ jsx(
      CustomURLModal,
      {
        isOpen: customURLsModalOpen,
        setModalOpen: setCustomURLsModalOpen,
        setNewCustomURLAdded,
        typeToEdit,
        setTypeToEdit,
        editID,
        setEditID
      }
    ),
    deleteModalOpen && /* @__PURE__ */ jsx(Modal.Root, { open: deleteModalOpen, onOpenChange: setDeleteModalOpen, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Confirm Delete" }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Typography, { children: "Are you sure you want to delete this entry?" }) }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "tertiary",
            onClick: () => {
              setDeleteModalOpen(false);
              setEntryToDelete(null);
              setEntryToDeleteType("");
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "danger", onClick: confirmDelete, children: "Delete" })
      ] })
    ] }) })
  ] });
};
export {
  Settings as default
};
