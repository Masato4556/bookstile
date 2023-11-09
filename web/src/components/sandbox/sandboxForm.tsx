"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import TextInput from "./sandboxTextInput";
import DecimalInput from "./sandboxDecimalInput";

const formSchema = z.object({
  itemname: z.string().min(1, "入力してください").max(50),
  price: z.coerce
    .string()
    .min(1, "入力してください")
    .transform((v) => Number(v))
    .pipe(
      z
        .number({ invalid_type_error: "数値を入力してください" })
        .min(1, "1円以上を指定してください")
        .max(1000000, "1000000円以下を指定してください")
    ),

  // price: z.number().min(0).max(1000000),
  count: z
    .string()
    .min(1, "入力してください")
    .transform((v) => Number(v))
    .pipe(
      z
        .number({ invalid_type_error: "数値を入力してください" })
        .min(1, "1個以上を指定してください")
        .max(20, "20個以下を指定してください")
    ),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemname: "",
      price: 1000,
      count: 1,
    },
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log(form.getValues());
  }

  const zenkakuToHankaku = (x: string) => {
    return String(x).replace(/[０-９，､．。ｅＥ]/g, (s) => {
      // 文字コードを取得し、差分を計算して半角に変換
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };

  const priceFormat = (x: string) => {
    if (x == "") return "";
    const parsedX = Number(x);
    if (isNaN(parsedX)) {
      return x;
    }
    return parsedX.toLocaleString() + "円";
  };

  const countFormat = (x: string) => {
    if (x == "") return "";
    const parsedX = Number(x);
    if (isNaN(parsedX)) {
      return x;
    }
    return parsedX.toLocaleString() + "個";
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        onKeyDown={(e) => {
          // エンターキーでsubmitするのを防ぐ
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <TextInput form={form} label={"商品名"} name={"itemname"} />
        <DecimalInput
          form={form}
          label={"価格"}
          name={"price"}
          blurFormat={priceFormat}
        />
        <DecimalInput
          form={form}
          label={"個数"}
          name={"count"}
          blurFormat={countFormat}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
