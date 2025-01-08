<template>
  <div class="v3-form">
    <FormItem v-for="item in $props.columns" v-bind="item" :key="item.field" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive, useSlots } from 'vue'
import {
  FormProps,
  ItemRules,
  RegisterRules,
  Validate,
  ValidateParams
} from './interface'
// @ts-ignore
import FormItem from './FormItem.vue'
import Schema from 'async-validator'
import { get, set } from 'lodash'

// props 默认值
const props = withDefaults(defineProps<FormProps>(), {
  labelAlign: 'right',
  labelWidth: '80px',
  minItemWidth: '200px',
  formData: () => reactive({})
})

// 表单项
const itemRules = reactive<ItemRules>({})

const registerRules: RegisterRules = (field, rules) => {
  itemRules[field] = rules
  return () => {
    if (itemRules[field]) {
      delete itemRules[field]
    }
  }
}

const validate: Validate = (fields = []) => {
  let arr = fields.length ? fields : Object.keys(itemRules)
  const data: any = {}
  const { rule, source } = arr.reduce(
    (obj, key) => {
      const val = get(props.formData, key)
      if (itemRules[key] && itemRules[key].rules) {
        obj.rule[key] = itemRules[key].rules!
        obj.source[key] = val
      }
      set(data, key, val)
      return obj
    },
    { rule: {}, source: {} } as ValidateParams
  )
  return new Schema(rule)
    .validate(source)
    .then(() => data)
    .catch(error => {
      let isScroll = false

      error?.errors?.forEach((obj: any) => {
        itemRules[obj.field]?.setError?.(obj.message)
        if (!isScroll) {
          const dom = document.querySelector(`[data-field='${obj.field}']`)
          if (dom) {
            isScroll = true
            dom?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'start'
            })
          }
        }
      })
      return Promise.reject(error?.errors)
    })
}
const slots = useSlots()
provide('registerRules', registerRules)
provide('context', props)
provide('validate', validate)
provide('slots', slots)
defineExpose({
  validate
})
</script>
