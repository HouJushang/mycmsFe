/**
* Created by hou on 2017/4/13.
*/
<template>
  <section class="loginBox">
    <p class="title">
      CMS后台登录
  </p>
    <el-input v-model="form.username" placeholder="用户名" class="inputCom"></el-input>
    <el-input v-model="form.password" type="password" placeholder="密码" class="inputCom"></el-input>
    <el-button @click="submit" type="primary" class="submitBtn" :loading="loading">登录</el-button>
  </section>
</template>
<style lang="sass" scoped>
  .loginBox
    width: 400px
    height: 280px
    background-color: #fff
    border-radius: 5px
    position: absolute
    top: 50%
    left: 50%
    margin-top: -190px
    margin-left: -200px
    box-sizing: border-box
    padding: 0 30px
    .title
      text-align: center
      font-size: 26px
    .inputCom
      margin-bottom: 20px
    .submitBtn
      width: 100%
</style>
<script>
  import { postRequest } from '../util/request'
  export default{
    data () {
      return {
        loading: false,
        form: {
          username: 'hou',
          password: '123123'
        }
      }
    },
    methods: {
      submit () {
        this.loading = true
        postRequest({
          url: '/login',
          data: this.form
        }).then(e => {
          console.log(e.username)
          sessionStorage.setItem('username', e.username)
          this.loading = false
          this.$router.push({name: 'welcome'})
        }).catch(e => {
          this.loading = false
        })
      }
    }
  }
</script>
