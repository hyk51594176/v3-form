<template>
  <div :class="className" :style="style" v-if="show" :data-field="field">
    <div v-bind="labelProps" v-if="label">
      <component :is="label" />
    </div>
    <div class="v3-form-item-container">
      <component
        :is="child"
        v-bind="childProps"
        @update:modelValue="onUpdateModelValue"
      />
      <span class="v3-form-item-error">{{ errorMsg }} </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  inject,
  ref,
  h,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
  isVNode,
  useSlots
} from 'vue'
import { FormItemProps, FormProps, RegisterRules, Validate } from './interface'
import { components } from './const'

import { get, set } from 'lodash'
let unRegisterRules: Function | undefined

const context = inject<FormProps>('context', {})
const registerRules = inject<RegisterRules>('registerRules')
const validate = inject<Validate>('validate')
const parentSlots = inject<Record<string, any>>('slots')
const props = defineProps<FormItemProps>()
const slots = useSlots()
const textAlign = computed(() => props.labelAlign ?? context?.labelAlign)
const errorMsg = ref()
const show = ref(true)
const triggerType = computed(() => {
  if (props.field && props.rules) {
    let arr = Array.isArray(props.rules) ? props.rules : [props.rules]
    return arr.find(obj => obj?.trigger)?.trigger ?? 'oninput'
  }
  return null
})
const className = computed(() => {
  const str: string[] = ['v3-form-item']
  const span = props.span ?? context?.span
  const offset = props.offset ?? context?.offset
  const topClass = textAlign.value === 'top' ? 'hyk-form-item-top' : ''
  const errorClass = errorMsg.value ? 'item_error' : ''
  if (span) {
    str.push(`col-${span}`)
  }
  if (offset) {
    str.push(`col-offset-${offset}`)
  }
  const arr = ['xs', 'sm', 'md', 'lg', 'xl']
  arr.forEach(key => {
    const o = props[key as 'xs'] ?? context?.[key as 'xs']
    if (!o) return ''
    if (typeof o === 'object') {
      if (o.span) {
        str.push(`col-${key}-${o.span}`)
      }
      if (o.offset) {
        str.push(`col-${key}-offset-${o.offset}`)
      }
    } else {
      str.push(`col-${key}-${o}`)
    }
  })
  if (topClass) {
    str.push(topClass)
  }
  if (errorClass) {
    str.push(errorClass)
  }
  return str.join(' ')
})
const getEl = (el?: FormItemProps['label'], defaultEl = 'div'): any => {
  if (!el) return defaultEl
  if (isVNode(el)) {
    return el
  }
  const key = components[el as keyof typeof components]
  if (typeof key === 'object') return key
  return getCurrentInstance()?.appContext.app.component(key ?? el) ?? defaultEl
}

const setVal = (e: any) => {
  const val = e?.target?.value ?? e
  if (props.field) {
    set(context.formData ?? {}, props.field, val)
  }
}
const _validate = () => {
  validate?.([props.field as string])
    .then(() => {
      errorMsg.value = ''
    })
    .catch(errors => {
      errorMsg.value = errors?.[0]?.message
    })
}
const onUpdateModelValue = (...args: any[]) => {
  setVal(args[0])
  props.props?.['onupdate:modelValue']?.(...args)
  _validate()
}
const childProps = computed(() => {
  const value = props.field ? get(context.formData, props.field) : undefined

  const p = {
    size: context.size,
    disabled: context.disabled,
    ...props.props,
    value,
    modelValue: value,
    oninput(...args: any[]) {
      setVal(args[0])
      props.props?.oninput?.(...args)
      if (triggerType.value === 'oninput') {
        _validate()
      }
    },
    onchange(...args: any[]) {
      setVal(args[0])
      props.props?.onchange?.(...args)
      if (triggerType.value === 'onchange') {
        _validate()
      }
    }
  }
  return p
})
const style = computed(() => {
  return {
    ...props.style,
    minWidth: props.minItemWidth ?? context?.minItemWidth
  }
})
const child = computed(() => {
  if (props.field && parentSlots?.[props.field]) {
    return parentSlots[props.field]
  }
  const el = (slots as unknown as any).default ?? getEl(props.el)
  return h(
    el,
    null,
    props?.slots ?? (el === 'div' ? childProps.value.value : undefined)
  )
})

const isRequired = computed(() => {
  if (!props.rules) return props.required
  if (Array.isArray(props.rules)) return props.rules.some(item => item.required)
  return props.rules.required
})
const labelProps = computed(() => {
  return {
    title: typeof props.label === 'string' ? props.label : '',
    class: `v3-form-item-label ${isRequired.value ? 'required' : ''}`,
    style: {
      marginRight: props.label ? undefined : '0px',
      width: props.labelWidth ?? context.labelWidth,
      textAlign: textAlign.value === 'top' ? 'left' : textAlign.value
    }
  }
})
const label = computed(() => {
  if (props.label === undefined) return
  const el = getEl(props.label, 'label')
  if (isVNode(el)) return el
  return h(el, null, props.label as any)
})
watch(
  [() => props.rules, () => props.field, () => show.value],
  () => {
    unRegisterRules?.()
    if (props.field && show.value) {
      unRegisterRules = registerRules?.(props.field, {
        rules: props.rules,
        setError(msg: string) {
          errorMsg.value = msg
        }
      })
    }
  },
  {
    immediate: true
  }
)
watch(
  [() => props.props?.value, () => props.field],
  () => {
    if (
      props.field &&
      Object.prototype.hasOwnProperty.call(props.props ?? {}, 'value')
    ) {
      set(context.formData ?? {}, props.field, props.props?.value)
    }
  },
  {
    immediate: true
  }
)
onBeforeUnmount(() => {
  unRegisterRules?.()
})
</script>
