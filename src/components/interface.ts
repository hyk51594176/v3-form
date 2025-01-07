import { RuleItem } from "async-validator"
import { CSSProperties, VNode } from "vue"

type Layout = {
  span?: string | number
  offset?: string | number
}

export interface Context {
  size?: string
  span?: number | string
  offset?: number | string
  labelAlign?: 'left' | 'right' | 'top'
  labelWidth?: string
  minItemWidth?: string
  xs?: string | number | Layout
  sm?: string | number | Layout
  md?: string | number | Layout
  lg?: string | number | Layout
  xl?: string | number | Layout
  disabled?: boolean
}
export interface FormProps extends Context {
  formData?: Record<string, any>
  columns?: FormItemProps[]
}
export interface Rule extends RuleItem {
  trigger?: string
}
export interface FormItemProps extends Context {
  el?: string | VNode,
  field?: string,
  label?: string | VNode,
  rules?: Rule | Rule[]
  required?: boolean
  props?: Record<string, any>
  slots?: any
  style?: CSSProperties
}

export const defineColumns = (columns: FormItemProps[]) => columns

type Params = {
  rules?: Required<FormItemProps>['rules'],
  setError: (msg: string) => void
}
export type ItemRules = {
  [k: string]: Params
}
export interface ValidateParams {
  rule: {
    [k: string]: Required<FormItemProps>['rules']
  }
  source: {
    [k: string]: any
  }
}


export interface RegisterRules {
  (field: string, item: Params): () => void
}

export interface Validate {
  (fields: string[]): Promise<any>
}