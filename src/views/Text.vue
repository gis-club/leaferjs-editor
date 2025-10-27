<script setup lang="ts">
import { useRecordStore } from '@/stores/recordStore'

const recordStore = useRecordStore()

</script>

<template>
    <ul>
    <li v-for="(item, index) in recordStore.record" :key="item.id">
      <span>{{ item.shapeType }} - {{ item.operateType }} - {{ item.id }} - {{ index  }}</span>
    </li>
  </ul>
</template>

<style scoped>
</style>