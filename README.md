# v3-form

> 基于vue3的form表单 

# API

```BASH
npm install @hanyk/v3-form
```

```ts
// main.ts
import { createApp } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './components/index.scss'
import '@hanyk/v3-form/dist/style.css'

import { registerComponents } from '@hanyk/v3-form'
import { Input } from 'view-ui-plus'

import App from './App.vue'

registerComponents({
  input: ElInput,
  input2: Input
})

createApp(App).use(ElButton).mount('#app')
```

```html
// app.vue
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
    import {
        ref
    } from 'vue'
    import {
        FormItem,
        Form,
        defineColumns
    } from '@hanyk/v3-form'
    import {
        Icon
    } from 'view-ui-plus'

    const columns = defineColumns([{
            label: '姓名',
            el: 'input',
            field: 'name',
            rules: {
                required: true,
                message: '请输入姓名'
            },
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
            rules: {
                required: true,
                message: '请输入地址'
            }
        },
        {
            label: < h2 style = {
                {
                    display: 'inline-block'
                }
            } > 年龄 < /h2>,
            el: < input / > ,
            field: 'age',
            props: {
                type: 'number',
                value: 20
            },
            slots: {
                prepend: () => < Icon type = "ios-person-outline" / >
            },
            rules: {
                required: true,
                message: '请输入年龄'
            }
        }
    ])
    const form = ref()
    const submit = async () => {
        const data = await form.value.validate()
        console.log('data :', data)
    }
</script>
```
