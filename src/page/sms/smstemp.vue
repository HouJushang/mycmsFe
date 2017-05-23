/**
* Created by hou on 2017/4/13.
*/

<template>
  <section>
    <el-button type="primary" style="margin-bottom: 10px" @click="add">添加模板</el-button>
    <el-dialog title="操作" v-model="isAdd" size="tiny">
      <el-form ref="form" label-width="80px">
        <el-form-item label="模板正文">
          <el-input v-model="formData.template" type="textarea" placeholder="模板正文"></el-input>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="formData.id" :disabled="!idIsEdit" type="textarea" placeholder="例如:T01"></el-input>
        </el-form-item>
        <el-form-item label="模板示例">
          <el-input v-model="formData.example" type="textarea" placeholder="模板示例"></el-input>
        </el-form-item>
        <el-form-item label="模板类型">
          <el-input v-model="formData.type" type="text" placeholder="模板类型"></el-input>
        </el-form-item>
        <el-form-item label="模板功能">
          <el-input v-model="formData.function" type="text" placeholder="模板功能"></el-input>
        </el-form-item>
        <el-form-item label="模板分类">
          <el-input v-model="formData.instruction" type="text" placeholder="模板功能"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="listData" highlight-current-row v-loading="listLoading">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="instruction" label="模板分类" min-width="50">
      </el-table-column>
      <el-table-column prop="function" label="模板实例" min-width="50">
      </el-table-column>
      <el-table-column prop="template" label="模板正文" min-width="280">
      </el-table-column>
      <el-table-column prop="example" label="模板示例" min-width="280">
      </el-table-column>
      <el-table-column prop="type" label="模板类型" min-width="50">
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template scope="scope">
          <el-button type="primary" icon="edit" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" icon="delete" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<style>
</style>
<script>
  import { getRequest, postRequest, deleteRequest, putRequest } from '../../util/request'
  export default{
    data () {
      return {
        listData: [],
        listLoading: '',
        isAdd: false,
        formData: {},
        idIsEdit: true
      }
    },
    methods: {
      getData () {
        getRequest({
          url: `/smssend/template`
        }).then(e => {
          this.listData = e
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      },
      del (id) {
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRequest({
            url: `/smssend/template/${id}`
          }).then(e => {
            this.getData()
            this.listLoading = false
          }).catch(e => {
            this.listLoading = false
          })
        })
      },
      add () {
        this.formData = {}
        this.idIsEdit = true
        this.isAdd = true
      },
      edit (obj) {
        this.formData = Object.assign({}, obj)
        this.idIsEdit = false
        this.isAdd = true
      },
      onSubmit () {
        const requestData = this.formData
        if (this.idIsEdit) {
          // 添加
          putRequest({
            url: `/smssend/template`,
            data: requestData
          }).then(e => {
            this.getData()
            this.listLoading = false
          }).catch(e => {
            this.listLoading = false
          })
        } else {
          // 更新
          postRequest({
            url: `/smssend/template/${requestData.id}`,
            data: requestData
          }).then(e => {
            this.getData()
            this.listLoading = false
          }).catch(e => {
            this.listLoading = false
          })
        }
        this.getData()
        this.isAdd = false
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>
