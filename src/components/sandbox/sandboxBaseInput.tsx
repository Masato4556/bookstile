'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FieldPathValue, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export type FieldByType<T extends FieldValues, K> = {
  [P in Path<T>]: K extends FieldPathValue<T, P> ? P : never;
}[Path<T>];

type Props<T extends FieldValues, K> = {
  form: UseFormReturn<T, any, undefined>
  label: string
  name: FieldByType<T, K>
  convert?: (x: PathValue<T, FieldByType<T, K>>) => PathValue<T, FieldByType<T, K>>
  onBlurFormat?: (x: PathValue<T, FieldByType<T, K>>) => PathValue<T, FieldByType<T, K>>
}

export const SandboxBaseInput = <T extends FieldValues, K>({
  form,
  label,
  name,
  convert = (x) => x,
  onBlurFormat = (x) => x,
}: Props<T, K>) => {
  const [focus, setFocus] = useState(false)
  const toggle = () => {
    setFocus(!focus)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {focus ? (
              <Input {...field} onBlur={()=>{
                form.setValue(name, convert(field.value), {shouldDirty: true, shouldValidate: true})
                toggle()
              }} />
            ) : (
              <Input value={onBlurFormat(field.value)} readOnly onFocus={toggle} />
            )}
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

