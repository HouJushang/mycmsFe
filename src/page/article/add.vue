/**
* Created by hou on 2017/5/23.
*/

<template>
  <section>
    <el-form ref="form" label-width="80px" style="width: 500px">
      <div>
        <el-input v-model="form.title" placeholder="标题"></el-input>
        <el-input v-model="form.author" placeholder="作者"></el-input>
        <el-input v-model="form.keywords" placeholder="标签"></el-input>
        <el-input v-model="form.description" placeholder="描述"></el-input>
        <el-input type="textarea" v-model="form.content" placeholder="内容"></el-input>
      </div>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
    <el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </section>
  </template>
  <script>
  import {dataBaseType} from '../../data/map'
  import {postRequest} from '../../util/request'
  import config from '../../config'
  export default{
    data () {
      return {
        isAdd: false,
        dataBaseType,
        uploadUrl: config.uploadUrl,
        form: {
          title: '',
          keywords: '',
          description: '',
          content: ''
        }
      }
    },
    methods: {
      onSubmit () {
        postRequest({
          url: '/addarticle',
          data: this.form
        }).then(e => {
          console.log(e)
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      }
    }
  }
</script>
