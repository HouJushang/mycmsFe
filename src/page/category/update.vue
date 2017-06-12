/**
* Created by hou on 2017/6/7.
*/
<template>
  <section>
    <category :addForm="category"></category>
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
        category: null
      }
    },
    methods: {
    },
    components: {
      category
    },
    mounted () {
      let catId = this.$route.params.id
      postRequest({
        url: `/categorydetail`,
        data: {
          id: catId
        }
      }).then(e => {
        this.category = e
      }).catch(e => {
        console.log(e)
      })
    }
  }
</script>
