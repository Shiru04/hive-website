"use client";

import { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "../i18n.js";

export default function I18nProvider({ lang, children }) {
  const [i18n] = useState(() => createI18n(lang));

  // The [lang] layout persists across client-side navigations, so when the
  // user switches language only the param changes — sync the instance.
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
