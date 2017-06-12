/**
 * Created by hou on 2017/6/7.
 */
<template>
  <section>
    <router-link :to="{name: 'addCategory'}">添加栏目</router-link>
    <ul>
      <li v-for="item in category">
        {{item.name}} <router-link :to="{name: 'updateCategory', params: {id: item.id}}">修改</router-link>
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
    mounted () {
      postRequest({
        url: '/category',
        data: {
          where: {
            parentid: 0
          }
        }
      }).then(e => {
        this.category = e
      }).catch(e => {
        console.log(e)
      })
    }
  }
</script>
