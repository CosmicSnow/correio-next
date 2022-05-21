import React, { useRef, useEffect } from "react";

import { useField } from "@unform/core";

interface RadioOptions {
  label: string;
  value: string;
  id: string;
}

interface RadioProps {
  options: RadioOptions[];
  inputClassName: string;
  labelClassName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

const Radio: React.FC<RadioProps> = ({
  className,
  inputClassName,
  labelClassName,
  onChange,
  options,
  name,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {
    fieldName,
    registerField,
    defaultValue = "bg-blue-200",
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs) => {
        return refs.current.find((input: HTMLInputElement) => input?.checked)
          ?.value;
      },
      setValue: (refs, id) => {
        const inputRef = refs.current.find(
          (ref: HTMLInputElement) => ref.id === id
        );
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs) => {
        const inputRef = refs.current.find(
          (ref: HTMLInputElement) => ref.checked === true
        );
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className={className}>
      {options.map((option, index) => (
        <span key={option.id}>
          <input
            type="radio"
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            id={option.id}
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            className={inputClassName}
            onChange={onChange}
          ></input>
          <label htmlFor={option.id} key={option.id} className={labelClassName}>
            {option.label}
          </label>
        </span>
      ))}
    </div>
  );
};

export { Radio };
