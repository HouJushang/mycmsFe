/**
* Created by hou on 2017/6/7.
*/
<template>
  <section>
    <category :addForm="addForm"></category>
  </section>
</template>
<style>
</style>
<script>
  import { postRequest } from '../../util/request'
  import category from '../../component/category.vue'
  export default{
    data () {
      return {
        category: [],
        addForm: {
          name: '',
          articletype: '',
          sortrank: 100,
          folder: '',
          bindhost: false,
          showtype: '1',
          domain: '',
          parentid: 0
        }
      }
    },
    methods: {
    },
    components: {
      category
    },
    mounted () {
      postRequest({
        url: '/category'
      }).then(e => {
        this.category = e
      }).catch(e => {
        console.log(e)
      })
    }
  }
</script>
