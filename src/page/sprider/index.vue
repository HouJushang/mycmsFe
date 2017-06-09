/**
 * Created by hou on 2017/5/23.
 */
<template>
  <section>
    <el-button @click="isure" :disabled="!dataSelection.length > 0">
      发布
    </el-button>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="pageChange"
      :current-page="this.current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
    <el-table ref="multipleTable" :data="listData" highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="keywords" label="关键词">
      </el-table-column>
      <el-table-column prop="addtime" label="添加时间">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click="">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  import {getRequest, postRequest} from '../../util/request'
  export default{
    data () {
      return {
        listData: [],
        count: 0,
        pageSize: 10,
        current: 1,
        dataSelection: []
      }
    },
    methods: {
      getData () {
        getRequest({
          url: '/spriderarticle',
          data: {
            where: {},
            offset: (this.current - 1) * this.pageSize,
            limit: this.pageSize
          }
        }).then(e => {
          this.listData = e.rows
          this.count = e.count
        })
      },
      pageSizeChange (e) {
        this.pageSize = e
        this.getData()
      },
      pageChange (e) {
        this.current = e
        this.getData()
      },
      handleSelectionChange (val) {
        this.dataSelection = []
        val.forEach(e => {
          this.dataSelection.push(e.id)
        })
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      isure () {
        postRequest({
          url: '/issue',
          data: this.dataSelection
        }).then(e => {
          this.listData = e.rows
          this.count = e.count
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>
