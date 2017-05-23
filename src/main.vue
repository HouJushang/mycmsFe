/**
* Created by hou on 2017/4/13.
*/
<template>
  <section class="main">
    <section class="top">
      <router-link :to="{name: 'welcome'}" class="title">
        CMS管理后台
      </router-link>
      <div class="loginOut" @click="loginOut">
        退出登录
      </div>
    </section>
    <section class="left">
      <el-menu class="el-menu-vertical-demo">
        <el-submenu v-for="(item, index) in menuData.parentNav"
                    :index="''+index">
          <template slot="title">
            <i class="el-icon-menu"></i>{{item.name}}
          </template>
          <el-menu-item v-for="(item2, index2) in item.children" :index="index + '-' + index2">
            {{item2.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </section>
    <section class="right">
      <router-view></router-view>
    </section>
  </section>
</template>
<style lang="sass" scoped>
  $topHeight: 50px
  $leftWidth: 250px
  .main
    height: 100%
    .top
      position: absolute
      top: 0px
      left: 0px
      right: 0px
      height: $topHeight
      background-color: #373d41
      color: #fff
      .title
        display: block
        width: $leftWidth
        background: #4a5064
        line-height: $topHeight
        text-align: center
        font-size: 20px
        color: #fff
      .parentNav
        position: absolute
        left: $leftWidth
        bottom: 0px
        right: 0px
        dd
          float: left
          width: 100px
          height: 30px
          box-sizing: border-box
          margin-left: 10px
          text-align: center
          background-color: #4a5064
          color: #fff
          line-height: 30px
          &.active
            border-left: 3px solid #4a5064
            border-right: 3px solid #4a5064
            border-top: 3px solid #4a5064
            background-color: #7f87a2
      .loginOut
        position: absolute
        right: 10px
        bottom: 10px
        cursor: pointer
        &:hover
          color: #7f87a2
    .left
      position: absolute
      box-sizing: border-box
      width: $leftWidth - 10px
      top: $topHeight + 10px
      left: 10px
      bottom: 10px
      background-color: #eef1f6
      padding: 10px
      color: #7f87a2
    .right
      position: absolute
      top: $topHeight + 10px
      left: $leftWidth + 10px
      bottom: 10px
      right: 10px
      padding: 10px
      background-color: #eef1f6
      overflow: auto
      -webkit-overflow-scrolling: touch
</style>
<script>
  import menuData from './data/menu'
  import {router} from './main'
  export default{
    data () {
      return {
        menuData: menuData
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!sessionStorage.getItem('username')) {
        router.push({name: 'login'})
      } else {
        next()
      }
    },
    methods: {
      loginOut () {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('menu')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('leveOne')
        this.$router.push({name: 'login'})
      },
      goDetail (url) {
        this.$router.push({name: url})
      },
      checkLeveOne (e) {
        this.leveOne = e
        sessionStorage.setItem('leveOne', e)
      }
    }
  }
</script>
