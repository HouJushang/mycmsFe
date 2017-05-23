/**
* Created by hou on 2017/4/13.
*/
<template>
  <section>
    <el-dialog title="筛选条件" v-model="isFrom" size="tiny">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="日期范围">
          <el-date-picker v-model="formData.limtTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </el-form-item>
        <el-form-item label="短信内容">
          <el-input v-model="formData.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="formData.mobile" type="number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="发送结果">
          <el-select v-model="formData.sendflag" placeholder="选择发送结果">
            <el-option v-for="item in sendflag" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="formData.servicetype" placeholder="选择类型">
            <el-option v-for="item in servicetype" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter">搜索</el-button>
          <el-button @click="clearForm">清空</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button type="primary" @click="isFrom = true" style="margin-bottom: 10px;">筛选</el-button>
    <el-table :data="listData.datas" highlight-current-row v-loading="listLoading">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="280">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="140">
      </el-table-column>
      <el-table-column prop="sendflag" label="是否成功" :formatter="sendflagFilter">
      </el-table-column>
      <el-table-column prop="sendtime" label="发送时间" :formatter="dateFilter" width="180">
      </el-table-column>
      <el-table-column prop="servicetype" label="服务类型" :formatter="servicetypeFilter" width="130">
      </el-table-column>
      <el-table-column prop="smstemplate" label="使用模板" width="130">
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="getData"
        :current-page="listData.pageNum"
        :page-sizes="[10, 20, 50, 100]"
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
  import { sendflag, servicetype } from '../../data/map'
  import format from '../../util/dateFormat'
  export default{
    data () {
      return {
        listLoading: false,
        listData: {},
        isFrom: false,
        defaultSize: 20,
        sendflag,
        servicetype,
        formData: {
          limtTime: [],
          content: '',
          mobile: '',
          sendflag: '',
          servicetype: ''
        },
        formDataCopy: null,
        pageSize: 20
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
          requestData.minsendtime = format(new Date(requestData.limtTime[0]))
          requestData.maxsendtime = format(new Date(requestData.limtTime[1]))
        }

        getRequest({
          url: `/smssend/log`,
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
      servicetypeFilter (row) {
        return ['', '注册服务', '点餐服务', '订票服务'][row.servicetype]
      },
      sendflagFilter (row) {
        return ['成功', '失败'][row.sendflag]
      },
      dateFilter (row) {
        const time = new Date(row.sendtime)
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
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
