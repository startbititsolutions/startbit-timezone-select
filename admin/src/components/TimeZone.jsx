import React, { forwardRef, useState, useEffect } from "react";
import { Field, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";

const TimeZone = forwardRef((props, ref) => {
  const {
    name,
    value,
    onChange,
    attribute,
    required,
    disabled,
    intlLabel,
    description,
  } = props;

  const { formatMessage } = useIntl();
  const [error, setError] = useState("");

  const { options } = useTimezoneSelect({
    labelStyle: "original",
    timezones: allTimezones,
    displayValue: "UTC",
  });

  useEffect(() => {
    if (required && !value) {
      setError("This field is required");
    } else {
      setError("");
    }
  }, [value, required]);

  const handleChange = (timezoneValue) => {
    if (required && !timezoneValue) {
      setError("This field is required");
    } else {
      setError("");
    }

    onChange({
      target: {
        name,
        type: attribute.type,
        value: timezoneValue,
      },
    });
  };

  return (
    <Field.Root name={name} error={error} hint={description ? formatMessage(description) : ""}>
      
      <Field.Label required={required}>
        {intlLabel ? formatMessage(intlLabel) : name}
      </Field.Label>

      <SingleSelect
        ref={ref}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
      >
        <SingleSelectOption value="">
          Select any timezone
        </SingleSelectOption>

        {options.map((tz) => (
          <SingleSelectOption key={tz.value} value={tz.value}>
            {tz.label}
          </SingleSelectOption>
        ))}
      </SingleSelect>

      <Field.Hint />

      <Field.Error />

    </Field.Root>
  );
});

export default TimeZone;