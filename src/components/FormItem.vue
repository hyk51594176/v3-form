<script lang="ts" setup>
import { computed, createElementVNode, inject, ref } from 'vue'
import { FormItemProps, FormProps } from './interface'

const contextData = inject<FormProps>('context', {})
const props = defineProps<FormItemProps>()
const textAlign = computed(() => props.labelAlign ?? contextData?.labelAlign)
const errorMsg = ref()
const show = ref()
const className = computed(() => {
  const str: string[] = ['v3-form-item']
  const span = props.span ?? contextData?.span
  const offset = props.offset ?? contextData?.offset
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
    const o = props[key as 'xs'] ?? contextData?.[key as 'xs']
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
const style = computed(() => {
  return {
    minWidth: props.minItemWidth ?? contextData?.minItemWidth
  }
})
console.log(123123)

const render = () => {
  console.log(123123)
  return createElementVNode('div', {
    value: 123,
    style,
    class: className
  })
}
defineExpose({
  render
})
</script>
