'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import TextInput from './sandboxTextInput'
import DecimalInput from './sandboxDecimalInput'

const formSchema = z.object({
  itemname: z.string().min(1, '入力してください').max(50),
  price: z
    .string()
    .min(1, '入力してください')
    .regex(/^([+-]?\d+)(\.\d*)?([eE][+-]?\d+)?$/, "数字を入力してください")
    .refine((v)=>Number(v) >= 1, "1円以上を指定してください")
    .refine((v)=>Number(v) <= 1000000, "1000000円以下を指定してください"),

  // price: z.number().min(0).max(1000000),
  count: z
    .string()
    .min(1, '入力してください')
    .regex(/^([+-]?\d+)(\.\d*)?([eE][+-]?\d+)?$/, "数字を入力してください")
}) 

const SandboxForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemname: '',
      price: "1000",
      count: "1",
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    console.log(form.getValues())
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
        onKeyDown={(e) => {
          // エンターキーでsubmitするのを防ぐ
          if (e.key === 'Enter') e.preventDefault()
        }}
      >
        <TextInput form={form} label={'商品名'} name={'itemname'} />
        <DecimalInput
          form={form}
          label={'価格'}
          name={'price'}
        />
        <DecimalInput
          form={form}
          label={'個数'}
          name={'count'}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default SandboxForm
