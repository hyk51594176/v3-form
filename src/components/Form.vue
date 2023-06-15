<template>
  <form class="v3-form">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { FormProps } from './interface'

const props = withDefaults(defineProps<FormProps>(), {
  labelAlign: 'right',
  labelWidth: '80px'
})
inject('context', props)

</script>

