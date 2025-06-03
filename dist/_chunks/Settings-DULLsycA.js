"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const index = require("./index-CJQg0Gym.js");
const admin = require("@strapi/strapi/admin");
function CollectionTypeModal({
  isOpen,
  setModalOpen,
  setNewCollectionTypeAdded,
  typeToEdit = null,
  setTypeToEdit,
  editID = "",
  setEditID
}) {
  const [type, setType] = react.useState("");
  const [langcode, setLangcode] = react.useState("");
  const [pattern, setPattern] = react.useState("");
  const [priority, setPriority] = react.useState("");
  const [frequency, setFrequency] = react.useState("");
  const [lastModified, setLastModified] = react.useState("false");
  const [thumbnail, setThumbnail] = react.useState("");
  const [possibleThumbnailFields, setPossibleThumbnailFields] = react.useState([]);
  const [populateLinkedModels, setPopulateLinkedModels] = react.useState("false");
  const [collectionTypes, setCollectionTypes] = react.useState([]);
  const [locales, setLocales] = react.useState([]);
  const [patternHint, setPatternHint] = react.useState("");
  const typeRef = react.useRef(null);
  const langcodeRef = react.useRef(null);
  const patternRef = react.useRef(null);
  const priorityRef = react.useRef(null);
  const frequencyRef = react.useRef(null);
  const lastModifiedRef = react.useRef(null);
  const thumbnailRef = react.useRef(null);
  const populateLinkedModelsRef = react.useRef(null);
  const { get, put, post } = admin.getFetchClient();
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
        response = await put(`/${index.PLUGIN_ID}/admin`, {
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
        response = await post(`/${index.PLUGIN_ID}/admin`, {
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
  react.useEffect(() => {
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
  react.useEffect(() => {
    const getContentTypes = async () => {
      try {
        const { data } = await get(`/${index.PLUGIN_ID}/admin-get-content-types`);
        setCollectionTypes(data.collectionTypes);
      } catch (error) {
        alert("Error while loading!");
      }
    };
    const getLocales = async () => {
      try {
        const { data } = await get(`/${index.PLUGIN_ID}/admin-get-locales`);
        setLocales(data);
      } catch (error) {
        alert("Error while loading!");
      }
    };
    getContentTypes();
    getLocales();
  }, []);
  react.useEffect(() => {
    if (type) {
      const getAllowedFields = async () => {
        const { data } = await get(`/${index.PLUGIN_ID}/admin-allowed-fields?type=${type}`);
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: (e) => handleOnOpenChange(e), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: typeToEdit ? "Edit Collection Type" : "Add Collection Type" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "Select a collection type", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Type" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.SingleSelect,
          {
            name: "type",
            required: true,
            onChange: handleSelectChange(setType),
            ref: typeRef,
            value: type,
            placeholder: "Select Type",
            disabled: typeToEdit,
            children: collectionTypes.map((collectionType) => /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.SingleSelectOption,
              {
                value: collectionType.singularName,
                children: collectionType.displayName
              },
              collectionType.uid
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Field.Root,
        {
          required: true,
          width: "100%",
          hint: "Select a language or leave empty for the default language",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Lang Code" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.SingleSelect,
              {
                name: "langcode",
                onChange: handleSelectChange(setLangcode),
                ref: langcodeRef,
                value: langcode,
                placeholder: "Select Langcode",
                disabled: type === "",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "-", children: "Default Language" }),
                  locales.map((locale) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: locale.code, children: locale.code }, locale.id))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Field.Root,
        {
          name: "pattern",
          required: true,
          width: "100%",
          hint: `How do your links look like? ${patternHint}`,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Pattern" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Field.Input,
              {
                value: pattern,
                onChange: handleInputChange(setPattern),
                ref: patternRef,
                disabled: type === ""
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "The priority of your pages", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Priority" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            name: "priority",
            required: true,
            onChange: handleSelectChange(setPriority),
            ref: priorityRef,
            value: priority,
            placeholder: "Select Priority",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.1", children: "0.1" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.2", children: "0.2" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.3", children: "0.3" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.4", children: "0.4" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.5", children: "0.5" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.6", children: "0.6" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.7", children: "0.7" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.8", children: "0.8" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.9", children: "0.9" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "1", children: "1" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "The changefrequency of your pages", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Change Frequency" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            name: "frequency",
            required: true,
            onChange: handleSelectChange(setFrequency),
            ref: frequencyRef,
            value: frequency,
            placeholder: "Select Frequency",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "always", children: "Always" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "hourly", children: "Hourly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "daily", children: "Daily" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "monthly", children: "Monthly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "yearly", children: "Yearly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "never", children: "Never" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "Add last modification date", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Last Modified" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            name: "lastModified",
            required: true,
            onChange: handleSelectChange(setLastModified),
            ref: lastModifiedRef,
            value: lastModified,
            placeholder: "Select True or False",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "false", children: "False" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "true", children: "True" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "Optional thumbnail image", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Thumbnail" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            name: "thumbnail",
            onChange: handleSelectChange(setThumbnail),
            ref: thumbnailRef,
            value: thumbnail,
            placeholder: "Select Thumbnail",
            disabled: type === "",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "-", children: "None" }),
              possibleThumbnailFields.map((field) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: field, children: field }, field))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Field.Root,
        {
          width: "100%",
          hint: "Enable population of linked models to include related data in the URL. Note that this may significantly increase the time required to generate the sitemap.",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Populate linked models" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.SingleSelect,
              {
                name: "populateLinkedModels",
                required: true,
                onChange: handleSelectChange(setPopulateLinkedModels),
                ref: populateLinkedModelsRef,
                value: populateLinkedModels,
                placeholder: "Select True or False",
                disabled: type === "",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "false", children: "False" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "true", children: "True" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "tertiary",
          onClick: () => {
            setTypeToEdit("");
            setModalOpen(false);
          },
          children: "Cancel"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, children: "Confirm" })
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
  const [slug, setSlug] = react.useState("");
  const [priority, setPriority] = react.useState("");
  const [frequency, setFrequency] = react.useState("");
  const slugRef = react.useRef(null);
  const priorityRef = react.useRef(null);
  const frequencyRef = react.useRef(null);
  const { put, post } = admin.getFetchClient();
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
        response = await put(`/${index.PLUGIN_ID}/admin-custom-urls`, {
          slug,
          priority,
          frequency,
          id: editID
        });
      } else {
        response = await post(`/${index.PLUGIN_ID}/admin-custom-urls`, { slug, priority, frequency });
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
  react.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: (e) => handleOnOpenChange(e), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: typeToEdit ? "Edit Custom URL" : "Add Custom URL" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "The slug of your custom URL", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Slug" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: slug, onChange: handleInputChange(setSlug), ref: slugRef }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "The priority of your pages", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Priority" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            name: "priority",
            required: true,
            onChange: handleSelectChange(setPriority),
            ref: priorityRef,
            value: priority,
            placeholder: "Select Priority",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.1", children: "0.1" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.2", children: "0.2" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.3", children: "0.3" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.4", children: "0.4" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.5", children: "0.5" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.6", children: "0.6" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.7", children: "0.7" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.8", children: "0.8" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0.9", children: "0.9" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "1", children: "1" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: "The changefrequency of your pages", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Change Frequency" }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            name: "frequency",
            required: true,
            onChange: handleSelectChange(setFrequency),
            ref: frequencyRef,
            value: frequency,
            placeholder: "Select Frequency",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "always", children: "Always" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "hourly", children: "Hourly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "daily", children: "Daily" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "monthly", children: "Monthly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "yearly", children: "Yearly" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "never", children: "Never" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "tertiary",
          onClick: () => {
            setTypeToEdit("");
            setModalOpen(false);
          },
          children: "Cancel"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, children: "Confirm" })
    ] })
  ] }) });
}
const Settings = () => {
  const [collectionTypes, setCollectionTypes] = react.useState([]);
  const [customURLs, setCustomURLs] = react.useState([]);
  const [modalOpen, setModalOpen] = react.useState(false);
  const [customURLsModalOpen, setCustomURLsModalOpen] = react.useState(false);
  const [newCollectionTypeAdded, setNewCollectionTypeAdded] = react.useState(false);
  const [newCustomURLAdded, setNewCustomURLAdded] = react.useState(false);
  const [typeToEdit, setTypeToEdit] = react.useState("");
  const [editID, setEditID] = react.useState("");
  const [deleteModalOpen, setDeleteModalOpen] = react.useState(false);
  const [entryToDelete, setEntryToDelete] = react.useState(null);
  const [entryToDeleteType, setEntryToDeleteType] = react.useState("");
  const [baseURL, setBaseURL] = react.useState("");
  const { get, put, del } = admin.getFetchClient();
  react.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await get(`/${index.PLUGIN_ID}/admin`);
        setCollectionTypes(data.results);
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred");
      }
    };
    fetchData();
    const fetchBaseUrl = async () => {
      const { data } = await get(`/${index.PLUGIN_ID}/admin-get-options`);
      if (data.baseUrl) {
        setBaseURL(data.baseUrl);
      }
    };
    fetchBaseUrl();
    const fetchCustomURLs = async () => {
      const { data } = await get(`/${index.PLUGIN_ID}/admin-custom-urls`);
      if (data) {
        setCustomURLs(data.results);
      }
    };
    fetchCustomURLs();
  }, []);
  react.useEffect(() => {
    if (newCollectionTypeAdded) {
      const fetchData = async () => {
        const { data } = await get(`/${index.PLUGIN_ID}/admin`);
        if (data) {
          setCollectionTypes(data.results);
        }
      };
      fetchData();
      setNewCollectionTypeAdded(false);
    }
  }, [newCollectionTypeAdded]);
  react.useEffect(() => {
    if (newCustomURLAdded) {
      const fetchData = async () => {
        const { data } = await get(`/${index.PLUGIN_ID}/admin-custom-urls`);
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
      await del(`/${index.PLUGIN_ID}/${url}?id=${entryToDelete}`);
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
      await put(`/${index.PLUGIN_ID}/admin-put-options`, {
        baseURL
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      alert("An unexpected error occurred.");
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 10, paddingTop: 8, paddingBottom: 8, paddingRight: 10, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", as: "h1", children: "Sitemap" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { color: "neutral400", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", as: "p", children: "Settings for the sitemap XML" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { textAlign: "right", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.LinkButton,
        {
          variant: "default",
          marginRight: 2,
          isExternal: true,
          href: "/api/strapi-5-sitemap-plugin/sitemap.xml",
          children: "Show Sitemap"
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: "Base URL" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Field.Root,
          {
            name: "baseURL",
            required: true,
            width: "100%",
            hint: `What is your base URL? (e. g. https://www.example.com)`,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Base URL" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: baseURL, onChange: handleInputChange(setBaseURL) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
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
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: "Collection Types" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Table,
        {
          colCount: 10,
          rowCount: 6,
          footer: /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: () => setModalOpen(true), children: "Add another field to this collection type" }),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Type" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Lang Code" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Pattern" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Priority" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Change Frequency" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Add last modification date" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Thumbnail" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: "Actions" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: collectionTypes.length > 0 && collectionTypes.map((collectionType, index2) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.type }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.langcode }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.pattern }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.priority }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.frequency }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.lastModified }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: collectionType.thumbnail }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, {}),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => handleEdit(collectionType, "collectionType"),
                    label: "Edit",
                    children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => handleDelete(collectionType, "collectionType"),
                    label: "Delete",
                    children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
                  }
                )
              ] }) })
            ] }, index2)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: "Custom URLs" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Table,
        {
          colCount: 10,
          rowCount: 6,
          footer: /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: () => setCustomURLsModalOpen(true), children: "Add another custom URL" }),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Slug" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Priority" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Change Frequency" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: "Actions" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: customURLs.length > 0 && customURLs.map((customURL, index2) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: customURL.slug }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: customURL.priority }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: customURL.frequency }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => handleEdit(customURL, "customURL"), label: "Edit", children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    onClick: () => handleDelete(customURL, "customURL"),
                    label: "Delete",
                    children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
                  }
                )
              ] }) })
            ] }, index2)) })
          ]
        }
      )
    ] }),
    modalOpen && /* @__PURE__ */ jsxRuntime.jsx(
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
    customURLsModalOpen && /* @__PURE__ */ jsxRuntime.jsx(
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
    deleteModalOpen && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: deleteModalOpen, onOpenChange: setDeleteModalOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "Confirm Delete" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "Are you sure you want to delete this entry?" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
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
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "danger", onClick: confirmDelete, children: "Delete" })
      ] })
    ] }) })
  ] });
};
exports.default = Settings;
