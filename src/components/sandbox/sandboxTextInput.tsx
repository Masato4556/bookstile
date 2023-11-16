'use client'

import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {SandboxBaseInput, FieldByType} from './sandboxBaseInput'

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>
  label: string
  name: FieldByType<T, string>
}

const TextInput = <T extends FieldValues>(props: Props<T>) => {
  return (
    <SandboxBaseInput {...props}/>
  )
}

export default TextInput
