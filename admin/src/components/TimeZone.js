import React, { useState, useEffect } from "react";
import { SingleSelect, SingleSelectOption, Typography } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";

const TimeZone = ({ attribute, disabled, intlLabel, name, onChange, required, value }) => {
  const { formatMessage } = useIntl();  
  const [hasError, setHasError] = useState(false);

  const labelStyle = "original";
  const displayValue = "UTC";
  const timezones = {
    ...allTimezones,
    "Europe/Berlin": "Frankfurt",
  };
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle,
    timezones,
    displayValue,
  });

  useEffect(() => {
    if (required && (!value || value === "")) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [value, required]);

  const handleChange = (selectedOption) => {
    // If required, check if the value is empty
    if (required && !selectedOption) {
      setHasError(true);
    } else {
      setHasError(false);
    }

    onChange({
      target: { name, type: attribute.type, value: selectedOption },
    });
  };

  return (
    <div className="Timezone sc-bdvvtL sc-gsDKAQ bOQZK hFpgBC">
      <Typography textColor="neutral800">
        {formatMessage(intlLabel)}
      </Typography>
      <SingleSelect
        name={name}
        onChange={handleChange}
        value={value || ""}
        required={required}
        disabled={disabled}
      >
         {/* Default option for placeholder */}
         <SingleSelectOption value="" >
          {formatMessage({ id: "select.any.timezone", defaultMessage: "Select any timezone" })}
        </SingleSelectOption>
        {options.map((timezone, index) => (
          <SingleSelectOption key={index} value={timezone?.value}>{timezone?.label}</SingleSelectOption>
        ))}
      </SingleSelect>
      {required && hasError && (
        <p style={{ color: 'red' }}>This field is required.</p> // Display error message
      )}
    </div>
  );
};

export default TimeZone;