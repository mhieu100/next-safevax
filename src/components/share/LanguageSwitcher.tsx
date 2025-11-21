"use client";

import { changeLanguage } from "@/i18n";
import { Select } from "antd";

const { Option } = Select;

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

export default function LanguageSelect() {
  const currentLang =
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";
  return (
    <Select
      defaultValue={currentLang}
      style={{ width: 150 }}
      onChange={(value) => changeLanguage(value)}
      optionLabelProp="label"
    >
      {languages.map((lang) => (
        <Option
          key={lang.value}
          value={lang.value}
          label={`${lang.flag} ${lang.label}`}
        >
          <span>{`${lang.flag} ${lang.label}`}</span>
        </Option>
      ))}
    </Select>
  );
}
