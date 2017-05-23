/**
* Created by hou on 2017/4/13.
*/

<template>
  <section>
    <el-button type="primary" style="margin-bottom: 10px;" @click="openAdd">配置白名单</el-button>
    <el-dialog title="配置白名单" v-model="isAdd" size="tiny">
      <el-form ref="form" label-width="80px">
        <el-form-item label="添加项" style="cursor: pointer">
          <div @click="addInput">
            <i class="el-icon-plus"></i> 添加

          </div>
        </el-form-item>
        <el-form-item v-for="(item , index) in addList" :label="index + 1 + '.白名单'">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="addList[index]" placeholder="输入ip"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="warning" @click="addList.splice(index, 1)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="listData" highlight-current-row v-loading="listLoading">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column label="内容" min-width="280">
        <template scope="scope">
          {{scope.row}}
        </template>
      </el-table-column>
    </el-table>
  </section>

</template>
<style>
</style>
<script>
  import { getRequest, postRequest } from '../../util/request'
  export default{
    data () {
      return {
        listData: [],
        listLoading: '',
        isAdd: false,
        addList: []
      }
    },
    methods: {
      getData () {
        getRequest({
          url: `/smssend/ips`
        }).then(e => {
          this.listData = e
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      },
      addInput () {
        this.addList.push(null)
      },
      openAdd () {
        this.addList = this.listData.slice()
        this.isAdd = true
      },
      onSubmit () {
        postRequest({
          url: `/smssend/ips`,
          data: {
            ips: this.addList
          }
        }).then(e => {
          this.isAdd = false
          this.listLoading = false
          this.getData()
        }).catch(e => {
          this.listLoading = false
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>
