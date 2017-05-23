/**
* Created by hou on 2017/4/13.
*/
<template>
  <section>
    <el-dialog title="筛选条件" v-model="isFrom" size="tiny">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="formData.oUser"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="客户端IP">
          <el-input v-model="formData.oClientip"  placeholder="请输入客户端IP"></el-input>
        </el-form-item>
        <el-form-item label="功能描述">
          <el-input v-model="formData.oFunction"  placeholder="请输入功能描述"></el-input>
        </el-form-item>
        <el-form-item label="操作结果">
          <el-select v-model="formData.oStatus" placeholder="选择操作结果">
            <el-option label="全部" value="" ></el-option>
            <el-option label="成功" value="成功" ></el-option>
            <el-option label="失败" value="失败" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日志内容">
          <el-input v-model="formData.oParamdesc"  placeholder="请输入日志内容"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker v-model="formData.limtTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter">搜索</el-button>
          <el-button @click="clearForm">清空</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button type="primary" @click="isFrom = true" style="margin-bottom: 10px;">筛选</el-button>
    <el-table :data="listData.datas" highlight-current-row v-loading="listLoading">
      <el-table-column type="index" width="60" >
      </el-table-column>
      <el-table-column prop="oUser" label="用户" >
      </el-table-column>
      <el-table-column prop="oClientip" label="客户端IP" >
      </el-table-column>
      <el-table-column prop="oFunction" label="功能描述"  >
      </el-table-column>
      <el-table-column prop="oStatus" label="操作结果"  >
      </el-table-column>
      <el-table-column prop="oParamdesc" label="日志内容" width="600">
      </el-table-column>
      <el-table-column prop="uCreateTime" label="操作时间" >
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="getData"
        :current-page="listData.pageNum"
        :page-sizes="[15, 20, 50, 100]"
        :page-size="listData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listData.count">
      </el-pagination>
    </div>
  </section>
</template>
<style lang="sass" scoped>
  .page
    background-color: #fff
    margin-top: 10px
    border: 1px solid #dfe6ec
    padding: 6px
    text-align: center
</style>
<script>
  import { getRequest } from '../../util/request'
  import format from '../../util/dateFormat'

  export default{
    data () {
      return {
        listLoading: false,
        listData: {},
        isFrom: false,
        defaultSize: 15,
        formData: {
          limtTime: [],
          oUser: '',
          oClientip: '',
          oFunction: '',
          oStatus: '',
          oParamdesc: ''
        },
        formDataCopy: null,
        pageSize: 15
      }
    },
    methods: {
      getData (page) {
        this.listLoading = true
        const requestData = {
          pageSize: this.pageSize,
          pageNum: page || 1
        }
        for (const item in this.formData) {
          if (this.formData[item] !== '') {
            requestData[item] = this.formData[item]
          }
        }
        if (requestData.limtTime[0]) {
          requestData.uMinCreateTime = format(new Date(requestData.limtTime[0]))
          requestData.uMaxCreateTime = format(new Date(requestData.limtTime[1]))
        }

        getRequest({
          url: `/system/operlog`,
          data: requestData
        }).then(e => {
          this.listData = e
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      },
      pageSizeChange (e) {
        this.pageSize = e
        this.getData()
      },
      doFilter () {
        this.getData()
        this.isFrom = false
      },
      clearForm () {
        this.formData = Object.assign({}, this.formDataCopy)
      }
    },
    mounted () {
      this.formDataCopy = Object.assign({}, this.formData)
      this.getData()
    }
  }
</script>
