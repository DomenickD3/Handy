import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../hooks/useSettings";
import { Input } from "../ui/Input";

interface WakeWordInputProps {
  grouped?: boolean;
}

export const WakeWordInput: React.FC<WakeWordInputProps> = React.memo(
  ({ grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const wakeWord = getSetting("wake_word") || "dude";
    const [value, setValue] = useState(wakeWord);

    useEffect(() => {
      setValue(wakeWord);
    }, [wakeWord]);

    const save = async () => {
      const normalized = value.trim();
      if (!normalized || normalized === wakeWord) {
        setValue(wakeWord);
        return;
      }

      await updateSetting("wake_word", normalized);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.currentTarget.blur();
      }
    };

    const content = (
      <>
        <div className="min-w-0">
          <div className="text-sm font-medium text-text">
            {t("settings.advanced.wakeWord.label")}
          </div>
          <div className="text-xs text-mid-gray mt-0.5">
            {t("settings.advanced.wakeWord.description")}
          </div>
        </div>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          disabled={isUpdating("wake_word")}
          aria-label={t("settings.advanced.wakeWord.label")}
          className="w-36"
        />
      </>
    );

    if (grouped) {
      return (
        <div className="flex items-center justify-between gap-4 p-4">
          {content}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between gap-4">{content}</div>
    );
  },
);
