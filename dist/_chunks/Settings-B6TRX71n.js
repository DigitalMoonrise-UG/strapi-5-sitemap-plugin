"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const index = require("./index-DFtGYtSg.js");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
function CollectionTypeModal({
  isOpen,
  setModalOpen,
  setNewCollectionTypeAdded,
  typeToEdit = null,
  setTypeToEdit,
  editID = "",
  setEditID
}) {
  const { formatMessage } = reactIntl.useIntl();
  const t = (id, values) => formatMessage({ id: index.getTrad(id) }, values);
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
      alert(t("error.unexpected"));
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
        alert(t("error.loading"));
      }
    };
    const getLocales = async () => {
      try {
        const { data } = await get(`/${index.PLUGIN_ID}/admin-get-locales`);
        setLocales(data);
      } catch (error) {
        alert(t("error.loading"));
      }
    };
    getContentTypes();
    getLocales();
  }, []);
  react.useEffect(() => {
    if (type) {
      const getAllowedFields = async () => {
        const { data } = await get(`/${index.PLUGIN_ID}/admin-allowed-fields?type=${type}`);
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: (e) => handleOnOpenChange(e), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: typeToEdit ? t("collectionTypeModal.edit") : t("collectionTypeModal.add") }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("collectionTypeModal.typeHint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("collectionTypes.type") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelect, { name: "type", required: true, onChange: handleSelectChange(setType), ref: typeRef, value: type, placeholder: t("collectionTypeModal.typePlaceholder"), disabled: typeToEdit, children: collectionTypes.map((collectionType) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: collectionType.singularName, children: collectionType.displayName }, collectionType.uid)) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { required: true, width: "100%", hint: t("collectionTypeModal.langcodeHint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("collectionTypes.langcode") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "langcode", onChange: handleSelectChange(setLangcode), ref: langcodeRef, value: langcode, placeholder: t("collectionTypeModal.langcodePlaceholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "-", children: t("common.defaultLanguage") }),
          locales.map((locale) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: locale.code, children: locale.code }, locale.id))
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "pattern", required: true, width: "100%", hint: t("collectionTypeModal.patternHint") + (patternHint ? " " + t("collectionTypeModal.possibleFields", { fields: patternHint }) : ""), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("collectionTypes.pattern") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: pattern, onChange: handleInputChange(setPattern), ref: patternRef, disabled: type === "" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("priority.hint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("priority.label") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "priority", required: true, onChange: handleSelectChange(setPriority), ref: priorityRef, value: priority, placeholder: t("priority.placeholder"), disabled: type === "", children: [
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
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("frequency.hint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("frequency.label") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "frequency", required: true, onChange: handleSelectChange(setFrequency), ref: frequencyRef, value: frequency, placeholder: t("frequency.placeholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "always", children: t("frequency.always") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "hourly", children: t("frequency.hourly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "daily", children: t("frequency.daily") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "weekly", children: t("frequency.weekly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "monthly", children: t("frequency.monthly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "yearly", children: t("frequency.yearly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "never", children: t("frequency.never") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("collectionTypeModal.lastModifiedHint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("collectionTypeModal.lastModifiedLabel") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "lastModified", required: true, onChange: handleSelectChange(setLastModified), ref: lastModifiedRef, value: lastModified, placeholder: t("collectionTypeModal.boolPlaceholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "false", children: t("common.false") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "true", children: t("common.true") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("collectionTypeModal.thumbnailHint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("collectionTypes.thumbnail") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "thumbnail", onChange: handleSelectChange(setThumbnail), ref: thumbnailRef, value: thumbnail, placeholder: t("collectionTypeModal.thumbnailPlaceholder"), disabled: type === "", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "-", children: t("common.none") }),
          possibleThumbnailFields.map((field) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: field, children: field }, field))
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Field.Root,
        {
          width: "100%",
          hint: t("collectionTypeModal.populateHint"),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("collectionTypeModal.populateLabel") }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.SingleSelect,
              {
                name: "populateLinkedModels",
                required: true,
                onChange: handleSelectChange(setPopulateLinkedModels),
                ref: populateLinkedModelsRef,
                value: populateLinkedModels,
                placeholder: t("collectionTypeModal.boolPlaceholder"),
                disabled: type === "",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "false", children: t("common.false") }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "true", children: t("common.true") })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: () => {
        setTypeToEdit("");
        setModalOpen(false);
      }, children: t("common.cancel") }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, children: t("common.confirm") })
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
  const { formatMessage } = reactIntl.useIntl();
  const t = (id, values) => formatMessage({ id: index.getTrad(id) }, values);
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
      alert(t("error.unexpected"));
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
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: typeToEdit ? t("customUrlModal.edit") : t("customUrlModal.add") }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, col: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("customUrlModal.slugHint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("customUrls.slug") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: slug, onChange: handleInputChange(setSlug), ref: slugRef }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("priority.hint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("priority.label") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "priority", required: true, onChange: handleSelectChange(setPriority), ref: priorityRef, value: priority, placeholder: t("priority.placeholder"), children: [
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
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { width: "100%", hint: t("frequency.hint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("frequency.label") }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SingleSelect, { name: "frequency", required: true, onChange: handleSelectChange(setFrequency), ref: frequencyRef, value: frequency, placeholder: t("frequency.placeholder"), children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "always", children: t("frequency.always") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "hourly", children: t("frequency.hourly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "daily", children: t("frequency.daily") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "weekly", children: t("frequency.weekly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "monthly", children: t("frequency.monthly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "yearly", children: t("frequency.yearly") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "never", children: t("frequency.never") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: () => {
        setTypeToEdit("");
        setModalOpen(false);
      }, children: t("common.cancel") }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, children: t("common.confirm") })
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
  const { formatMessage } = reactIntl.useIntl();
  const t = (id, values) => formatMessage({ id: index.getTrad(id) }, values);
  const [name, setName] = react.useState("");
  const [selectedIds, setSelectedIds] = react.useState([]);
  const [includeCustomUrls, setIncludeCustomUrls] = react.useState(false);
  react.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: initialData ? t("sitemapModal.edit") : t("sitemapModal.add") }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Body, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "sitemapName", required: true, marginBottom: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("sitemapModal.nameLabel", { file: "sitemap-{name}.xml" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Field.Input,
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: t("sitemapModal.namePlaceholder")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "collectionTypes", marginBottom: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("sitemapModal.collectionTypesLabel") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: t("sitemapModal.collectionTypesHint") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 2, style: { maxHeight: 200, overflow: "auto", border: "1px solid #dcdce4", borderRadius: 4, padding: 8 }, children: collectionTypes.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", textColor: "neutral600", children: t("sitemapModal.noCollectionTypes") }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "start", gap: 3, children: collectionTypes.map((ct) => /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Checkbox,
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
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { name: "includeCustomUrls", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Checkbox,
        {
          checked: includeCustomUrls,
          onCheckedChange: (checked) => setIncludeCustomUrls(checked === true),
          children: t("sitemapModal.includeCustomUrls")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: onClose, children: t("common.cancel") }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, children: t("common.save") })
    ] })
  ] }) });
}
const Settings = () => {
  const { formatMessage } = reactIntl.useIntl();
  const t = (id, values) => formatMessage({ id: index.getTrad(id) }, values);
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
  const [excludedUrlsText, setExcludedUrlsText] = react.useState("");
  const [useSitemapIndex, setUseSitemapIndex] = react.useState(false);
  const [sitemapDefinitions, setSitemapDefinitions] = react.useState([]);
  const [sitemapModalOpen, setSitemapModalOpen] = react.useState(false);
  const [sitemapEditIndex, setSitemapEditIndex] = react.useState(null);
  const { get, put, del } = admin.getFetchClient();
  react.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await get(`/${index.PLUGIN_ID}/admin`);
        setCollectionTypes(data.results);
      } catch (err) {
        console.error(err);
        alert(t("error.unexpected"));
      }
    };
    fetchData();
    const fetchOptions = async () => {
      const { data } = await get(`/${index.PLUGIN_ID}/admin-get-options`);
      if (data.baseUrl) setBaseURL(data.baseUrl);
      if (Array.isArray(data.excludedUrls) && data.excludedUrls.length > 0) {
        setExcludedUrlsText(data.excludedUrls.join("\n"));
      }
      setUseSitemapIndex(Boolean(data.useSitemapIndex));
      setSitemapDefinitions(Array.isArray(data.sitemapDefinitions) ? data.sitemapDefinitions : []);
    };
    fetchOptions();
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
      alert(t("error.unexpected"));
    }
  };
  const handleInputChange = (setValue) => (event) => {
    setValue(event.target.value);
  };
  const saveOptions = async () => {
    try {
      const excludedUrls = excludedUrlsText.split("\n").map((line) => line.trim()).filter(Boolean);
      await put(`/${index.PLUGIN_ID}/admin-put-options`, {
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
  const handleDeleteSitemapDef = (index2) => {
    setSitemapDefinitions((prev) => prev.filter((_, i) => i !== index2));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 10, paddingTop: 8, paddingBottom: 8, paddingRight: 10, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", as: "h1", children: t("plugin.name") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { color: "neutral400", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", as: "p", children: t("page.subtitle") }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { textAlign: "right", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.LinkButton, { variant: "default", marginRight: 2, isExternal: true, href: "/api/strapi-5-sitemap-plugin/sitemap.xml", children: t("page.showSitemap") }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: t("baseUrl.title") }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "baseURL", required: true, width: "100%", hint: t("baseUrl.hint"), children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("baseUrl.label") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: baseURL, onChange: handleInputChange(setBaseURL) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "default", marginRight: 2, onClick: saveOptions, children: t("common.save") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { marginTop: 8, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: t("sitemapSettings.title") }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Checkbox,
          {
            checked: useSitemapIndex,
            onCheckedChange: (checked) => setUseSitemapIndex(checked === true),
            children: t("sitemapSettings.useIndex")
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", as: "p", textColor: "neutral600", marginTop: 1, children: t("sitemapSettings.indexHint", { file: "sitemap-{name}.xml" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { marginTop: 3, padding: 3, style: { borderRadius: 4, border: "1px solid #eaeaef" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", as: "p", textColor: "neutral600", children: t("sitemapSettings.permissionHint", { file: "sitemap-{name}.xml" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "epsilon", as: "p", textColor: "neutral700", marginTop: 1, children: [
            /* @__PURE__ */ jsxRuntime.jsx("code", { style: { fontFamily: "monospace", fontSize: "13px", padding: "2px 6px", borderRadius: 4 }, children: "getSitemapBySlug" }),
            " ",
            t("sitemapSettings.permissionLocation")
          ] })
        ] })
      ] }),
      useSitemapIndex && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 4, rowCount: 4, footer: /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: () => {
        setSitemapEditIndex(null);
        setSitemapModalOpen(true);
      }, children: t("sitemapSettings.addSitemap") }), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("sitemapSettings.name") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("sitemapSettings.collectionTypes") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("sitemapSettings.customUrls") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: t("common.actions") }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: sitemapDefinitions.map((def, index2) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "sigma", children: [
            "sitemap-",
            def.name,
            ".xml"
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: (def.collectionTypeConfigIds || []).map(getCollectionTypeLabel).join(", ") || "—" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: def.includeCustomUrls ? t("common.yes") : t("common.no") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => {
              setSitemapEditIndex(index2);
              setSitemapModalOpen(true);
            }, label: t("common.edit"), children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => handleDeleteSitemapDef(index2), label: t("common.delete"), children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}) })
          ] }) })
        ] }, index2)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "default", marginTop: 3, onClick: saveOptions, children: t("common.save") })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: t("collectionTypes.title") }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 10, rowCount: 6, footer: /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: () => setModalOpen(true), children: t("collectionTypes.addField") }), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.type") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.langcode") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.pattern") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.priority") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.frequency") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.lastModified") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.thumbnail") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: t("common.actions") }) })
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
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => handleEdit(collectionType, "collectionType"), label: t("common.edit"), children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => handleDelete(collectionType, "collectionType"), label: t("common.delete"), children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}) })
          ] }) })
        ] }, index2)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: t("customUrls.title") }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 10, rowCount: 6, footer: /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: () => setCustomURLsModalOpen(true), children: t("customUrls.add") }), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("customUrls.slug") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.priority") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: t("collectionTypes.frequency") }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: t("common.actions") }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: customURLs.length > 0 && customURLs.map((customURL, index2) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: customURL.slug }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: customURL.priority }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: customURL.frequency }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => handleEdit(customURL, "customURL"), label: t("common.edit"), children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { onClick: () => handleDelete(customURL, "customURL"), label: t("common.delete"), children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}) })
          ] }) })
        ] }, index2)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { marginBottom: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: t("excludedUrls.title") }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", as: "p", textColor: "neutral600", children: t("excludedUrls.description") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "excludedUrls", width: "100%", hint: t("excludedUrls.hint"), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: t("excludedUrls.label") }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "textarea",
          {
            value: excludedUrlsText,
            onChange: (e) => setExcludedUrlsText(e.target.value),
            placeholder: "/index",
            rows: 6,
            style: { width: "100%", padding: "8px", fontSize: "16px", lineHeight: 1.5, borderRadius: "4px", border: "1px solid #dcdce4" }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "default", marginTop: 2, onClick: saveOptions, children: t("common.saveOptions") })
    ] }),
    modalOpen && /* @__PURE__ */ jsxRuntime.jsx(CollectionTypeModal, { isOpen: modalOpen, setModalOpen, setNewCollectionTypeAdded, typeToEdit, setTypeToEdit, editID, setEditID }),
    customURLsModalOpen && /* @__PURE__ */ jsxRuntime.jsx(CustomURLModal, { isOpen: customURLsModalOpen, setModalOpen: setCustomURLsModalOpen, setNewCustomURLAdded, typeToEdit, setTypeToEdit, editID, setEditID }),
    sitemapModalOpen && /* @__PURE__ */ jsxRuntime.jsx(
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
    deleteModalOpen && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: deleteModalOpen, onOpenChange: setDeleteModalOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: t("delete.title") }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: t("delete.confirm") }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: () => {
          setDeleteModalOpen(false);
          setEntryToDelete(null);
          setEntryToDeleteType("");
        }, children: t("common.cancel") }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "danger", onClick: confirmDelete, children: t("common.delete") })
      ] })
    ] }) })
  ] });
};
exports.default = Settings;
