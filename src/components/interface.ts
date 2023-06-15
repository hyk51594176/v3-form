type Layout = {
  span?: string | number
  offset?: string | number
}

export interface Context {
  size?: string
  span?: number
  offset?: number
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
export interface FormProps extends Context{
  formData?: Record<string,any>
}
export interface FormItemProps extends Context{

}
