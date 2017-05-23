/**
* Created by hou on 2017/5/23.
*/
<template>
  <el-form ref="form" label-width="80px" style="width: 500px">
    <div>
      <el-form-item label="主体">
        <el-input v-model="form.name" placeholder="模型名称"></el-input>
        <el-input v-model="form.table" placeholder="表名"></el-input>
        <el-input v-model="form.templete" placeholder="模板"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onAdd" style="margin-bottom: 10px;">添加</el-button>
      <el-form-item label="添加字段" v-for="item in form.config">
        <el-input placeholder="名称" v-model="item.name"></el-input>
        <el-select v-model="item.type" placeholder="字段类型">
          <el-option v-for="item in dataBaseType" :label="item" value="item"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form>
</template>
<script>
  import {dataBaseType} from '../../data/map'
  import {postRequest} from '../../util/request'
  export default{
    data () {
      return {
        isAdd: false,
        dataBaseType,
        form: {
          config: [{
            name: '',
            type: ''
          }]
        }
      }
    },
    methods: {
      onAdd () {
        this.form.config.push({
          name: '',
          type: ''
        })
      },
      onSubmit () {
        postRequest({
          url: '/addmodel',
          data: this.form
        }).then(e => {
          console.log(e)
        })
      }
    }
  }
</script>
