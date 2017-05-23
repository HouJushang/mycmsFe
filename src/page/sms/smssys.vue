/**
* Created by hou on 2017/4/13.
*/

<template>
  <section>
    <el-form ref="form" label-width="80px" style="max-width: 500px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" placeholder="填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="URl">
        <el-input v-model="formData.url" placeholder="模板示例"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<style>
</style>
<script>
  import { postRequest, getRequest } from '../../util/request'
  export default{
    data () {
      return {
        formData: {}
      }
    },
    methods: {
      getData () {
        getRequest({
          url: `/smssend/system`
        }).then(e => {
          this.formData = e
        })
      },
      submit () {
        postRequest({
          url: `/smssend/system`,
          data: this.formData
        }).then(e => {
          this.$notify({
            title: '成功',
            message: '系统配置更新成功',
            type: 'success',
            duration: 1600
          })
        }).catch(e => {
          this.$notify.error({
            title: '失败',
            message: '系统配置更新失败',
            type: 'error'
          })
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>
