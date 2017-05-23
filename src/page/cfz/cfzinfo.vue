<template>
  <section>
    <el-button type="primary" style="margin-right: 10px;" @click="addItem">添加餐服长</el-button>
    <el-button type="primary" @click="isFilter = true">筛选</el-button>
    <el-dialog title="添加餐服长" v-model="isShow" size="tiny">
      <el-form ref="form" label-width="80px" v-if="addForm">
        <el-input v-model="addForm.mealsgrpleadName" placeholder="输入餐服长姓名"></el-input>
        <el-input v-model="addForm.mealsgrpleadMobile" placeholder="输入手机号"></el-input>
        <el-select v-model="addForm.bureauId" placeholder="请选择交路">
          <el-option
            v-for="item in bureauId"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="addForm.isactive" placeholder="请选择激活状态">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="未激活" :value="0"></el-option>
        </el-select>
      </el-form>
      <el-button type="primary" @click="submitAdd" v-if="formType === 'add'">提交</el-button>
      <el-button type="primary" @click="submitUpdate" v-if="formType === 'update'">确认修改</el-button>
    </el-dialog>

    <el-dialog title="筛选" v-model="isFilter" size="tiny" class="filterBox">
      <el-input v-model="filterDataCopy.mealsgrpleadName" placeholder="输入餐服长姓名"></el-input>
      <el-input v-model="filterDataCopy.mealsgrpleadMobile" placeholder="输入手机号"></el-input>
      <el-select v-model="filterDataCopy.bureauId" placeholder="请选择交路">
        <el-option
          v-for="item in bureauId"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="filterDataCopy.isactive" placeholder="请选择激活状态">
        <el-option label="激活" :value="1"></el-option>
        <el-option label="未激活" :value="0"></el-option>
      </el-select>

      <el-button type="primary" @click="filterFn">筛选</el-button>
    </el-dialog>
    <el-table :data="listData.datas" highlight-current-row v-loading="listLoading" style="margin-top: 10px;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="mealsgrpleadName" label="姓名">
      </el-table-column>
      <el-table-column prop="mealsgrpleadMobile" label="手机号">
      </el-table-column>
      <el-table-column prop="isactive" label="是否激活" :formatter="isactiveFilter">
      </el-table-column>
      <el-table-column prop="bureauId" label="交路" :formatter="bureauIdFilter">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="danger" @click="delItem(scope.row.mealsgrpleadMobile)">
            删除
          </el-button>
          <el-button type="primary" @click="editItem(scope.row)">
            编辑
          </el-button>
        </template>
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
  .el-form
    & > div
      margin-bottom: 13px
  .filterBox
    .el-dialog__body
      &>div
        margin-bottom: 13px
</style>
<script>
  import { getRequest, putRequest, deleteRequest, postRequest } from '../../util/request'
  import { bureauId } from '../../data/map'
  import paramsFilter from '../../util/paramsFilter'
  export default{
    name: 'cfzinfo',
    data () {
      return {
        bureauId,
        listData: [],
        listLoading: '',
        isShow: false,
        isFilter: false,
        formType: 'add',
        addList: [],
        addForm: null,
        phoneNum: '',
        addFormCopy: {
          bureauId: 3,
          isactive: 1
        },
        filterDataCopy: {
          name: '',
          mobile: '',
          bureauId: 3,
          isactive: 1
        },
        filterData: null
      }
    },
    methods: {
      isShow () {
        return this.isAdd || this.isUpdate
      },
      addInput () {
        this.addList.push(null)
      },
      openAdd () {
        this.addList = this.listData.slice()
        this.isAdd = true
      },
      pageSizeChange (e) {
        this.pageSize = e
        this.getData(1)
      },
      isactiveFilter (row) {
        return row.isactive ? '激活' : '未激活'
      },
      bureauIdFilter (row) {
        let label = '其他'
        this.bureauId.forEach(e => {
          if (e.value === row.bureauId) {
            label = e.label
          }
        })
        return label
      },
      delItem (row) {
        this.$confirm('此操作将永久删除该餐服长, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRequest({
            url: `/cfzmng/info/${row}`
          }).then(e => {
            this.getData()
          })
        })
      },
      addItem () {
        this.isShow = true
        this.formType = 'add'
        this.addForm = this.addFormCopy
      },
      editItem (row) {
        this.isShow = true
        this.formType = 'update'
        this.addForm = row
        this.phoneNum = row.mealsgrpleadMobile
      },
      submitAdd () {
        putRequest({
          url: `/cfzmng/info`,
          data: this.addForm
        }).then(e => {
          this.isShow = false
          this.listLoading = false
          this.getData()
        }).catch(e => {
          this.listLoading = false
        })
      },
      submitUpdate () {
        postRequest({
          url: `/cfzmng/info/${this.phoneNum}`,
          data: this.addForm
        }).then(e => {
          this.isShow = false
          this.listLoading = false
          this.getData()
        }).catch(e => {
          this.listLoading = false
        })
      },
      filterFn () {
        this.isFilter = false
        this.filterData = this.filterDataCopy
        this.getData()
      },
      getData (page) {
        this.listLoading = true
        const requestData = {
          pageSize: 10,
          pageNum: page
        }
        Object.assign(requestData, this.filterData)
        console.log(paramsFilter(requestData))
        getRequest({
          url: `/cfzmng/infos`,
          data: paramsFilter(requestData)
        }).then(e => {
          this.listData = e
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      }
    },
    mounted () {
      this.getData(1)
    }
  }
</script>
