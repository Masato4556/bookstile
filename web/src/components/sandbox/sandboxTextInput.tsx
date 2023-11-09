"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  label: string;
  name: Path<T>;
  blurFormat?: (x: string) => string;
};

const TextInput = <T extends FieldValues>({
  form,
  label,
  name,
  blurFormat = (x) => x,
}: Props<T>) => {
  const [focus, setFocus] = useState(false);
  const toggle = () => {
    setFocus(!focus);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {focus ? (
              <Input {...field} onBlur={toggle} />
            ) : (
              <Input value={blurFormat(field.value)} onFocus={toggle} />
            )}
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
