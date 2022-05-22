import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface TextareaProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  className,
  placeholder,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <textarea
      name={name}
      ref={inputRef}
      className={className}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
};

export { Textarea };
