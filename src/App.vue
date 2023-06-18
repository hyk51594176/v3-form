<template>
  <Form span="12" :columns="columns" ref="form">
    <template #address="row">
      <input v-bind="row" />
    </template>
    <FormItem span="24" label="">
      <el-button type="primary" @click="submit">提交</el-button>
    </FormItem>
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

const columns = defineColumns([
  {
    label: '姓名',
    el: 'input',
    field: 'name',
    rules: { required: true, message: '请输入姓名' },
    props: {
      value: '张三'
    }
  },
  {
    label: '性别',
    field: 'sex',
    el: 'input2',
    props: {
      value: '男'
    }
  },
  {
    label: '地址',
    field: 'address',
    props: {
      value: '浙江'
    },
    rules: { required: true, message: '请输入地址' }
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
  }
])
const form = ref()
const submit = async () => {
  const data = await form.value.validate()
  console.log('data :', data)
}
</script>
