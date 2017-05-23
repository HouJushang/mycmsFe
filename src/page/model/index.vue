/**
 * Created by hou on 2017/5/23.
 */
<template>
  <section>
    <router-link :to = "{name: 'addModel'}">
      添加model
    </router-link>
    <el-table :data="listData" highlight-current-row v-loading="false">
    </el-table>
  </section>
</template>
<script>
  export default{
    data () {
      return {
        isAdd: false,
        listData: []
      }
    }
  }
</script>
