<template>
  <Form :formData="data" span="12" :columns="columns" ref="form">
    <template #submit>
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </Form>
</template>
<script setup lang="tsx">
import { ref } from 'vue'
// @ts-ignore
import Form from './components/Form.vue'
// @ts-ignore
import FormItem from './components/FormItem.vue'
import { defineColumns } from './components/interface'
import { Icon } from 'view-ui-plus'

const data = ref({ name: '张三' })
const columns = defineColumns([
  {
    label: '姓名',
    el: 'input',
    field: 'name',
    rules: { required: true, message: '请输入姓名' }
  },
  {
    label: '性别',
    field: 'sex',
    props: {
      value: '男'
    },
    rules: { required: true, message: '请输入性别' }
  },
  {
    label: <h2 style={{ display: 'inline-block' }}>年龄</h2>,
    el: <input />,
    field: 'age',
    props: {
      type: 'number',
      value: 20
    },
    slots: {
      prepend: () => <Icon type="ios-person-outline" />
    },
    rules: { required: true, message: '请输入年龄' }
  },
  {
    field: 'submit',
    label: '',
    span: 24
  }
])
const form = ref()
const submit = async () => {
  const data = await form.value.validate()
  console.log('data :', data)
}
</script>
