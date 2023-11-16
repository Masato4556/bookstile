'use client'

import { FieldPathValue, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { SandboxBaseInput } from './sandboxBaseInput'

type FieldByType<T extends FieldValues, K> = {
  [P in Path<T>]: K extends FieldPathValue<T, P> ? P : never;
}[Path<T>];

type Props<T extends FieldValues, K> = {
  form: UseFormReturn<T, any, undefined>
  label: string
  name: FieldByType<T, K>
}

const DecimalInput = <T extends FieldValues>(props: Props<T, string>) => {
  // FIXME: asを用いないようにする
  const onBlurFormat = (x: PathValue<T, FieldByType<T, string>>): PathValue<T, FieldByType<T, string>> => {
    if (x == '') return '' as PathValue<T, FieldByType<T, string>>
    const parsedX = Number(x)
    if (isNaN(parsedX)) {
      return x
    }
    return parsedX.toLocaleString() as PathValue<T, FieldByType<T, string>>
  }

  const removeComma = (x: string) => {
    if (!/^[+-]?0*[1-9]\d{0,2}(,\d{3})*(\.\d*)?([eE][+-]?\d+)?$/.test(x)) return x
    return x.replace(/[,]/g, '')
  }

  const zenkakuToHankaku = (x: string) => {
    // TODO: 小数点、桁区切りも対応する
    return String(x).replace(/[０-９]/g, (s) => {
      // 文字コードを取得し、差分を計算して半角に変換
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
  }

  // FIXME: asを用いないようにする
  const convert = (x: PathValue<T, FieldByType<T, string>>): PathValue<T, FieldByType<T, string>> => {
    return removeComma(zenkakuToHankaku(x)) as PathValue<T, FieldByType<T, string>>
  }

  return (
    <SandboxBaseInput {...props} convert={convert} onBlurFormat={onBlurFormat} />
  )
}

export default DecimalInput
