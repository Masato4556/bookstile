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

const DecimalInput = <T extends FieldValues>({
  form,
  label,
  name,
  blurFormat = (x) => x,
}: Props<T>) => {
  const [focus, setFocus] = useState(false);
  const toggle = () => {
    setFocus(!focus);
  };
  const zenkakuToHankaku = (x: string) => {
    // TODO: 小数点、桁区切りも対応する
    return String(x).replace(/[０-９]/g, (s) => {
      // 文字コードを取得し、差分を計算して半角に変換
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };

  const removeComma = (x: string) => {
    // TODO: 正しい位置に桁区切りがあるときだけ除去する
    return String(x).replace(/[,]/g, "");
  };

  const format = (x: string) => {
    return removeComma(zenkakuToHankaku(x));
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
              <Input
                {...field}
                onBlur={() => {
                  toggle();
                  form.setValue(name, format(field.value) as any, {
                    shouldValidate: true,
                  }); // FIXME: 型の指定がうまくいっていないのanyを用いている誤魔化さないようにする
                }}
              />
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

export default DecimalInput;
