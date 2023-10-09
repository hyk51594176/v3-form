<template>
  <button>{{text}}</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('hello world')
</script>