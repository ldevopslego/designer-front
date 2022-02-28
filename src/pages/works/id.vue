<template>
  <div></div>
</template>

<script setup lang="ts">import { getWorksInfo } from '@/api/works';

const info = ref({})
const getQueryVariable = (variable: string) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

const getList = () => {
  getWorksInfo(getQueryVariable('id')).then(res => {
    info.value = res.data
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
</style>