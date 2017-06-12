<template>
  <section>
    <el-button @click="updateIndex">
      更新首页
    </el-button>
    <ul>
      <li v-for="item in category">
        {{ item.name }}
        <el-button>更新封面</el-button>
        <el-button>更新列表</el-button>
        <el-button>更新文章</el-button>
      </li>
    </ul>
  </section>
</template>
<style>
</style>
<script>
  import { postRequest } from '../../util/request'
  export default{
    data () {
      return {
        category: []
      }
    },
    methods: {
      updateIndex () {
        postRequest({
          url: '/update/index'
        }).then(e => {
          console.log(e)
        }).catch(e => {
        })
      }
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
