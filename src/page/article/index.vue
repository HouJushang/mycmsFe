/**
 * Created by hou on 2017/5/23.
 */
<template>
  <section>
    <el-table :data="listData" highlight-current-row>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="keywords" label="关键词">
      </el-table-column>
      <el-table-column prop="description" label="描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="addtime" label="添加时间" :formatter="timeFormat">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="pageChange"
      :current-page="this.current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </section>
</template>
<script>
  import {postRequest} from '../../util/request'
  import dateFormat from '../../util/dateFormat'
  export default{
    data () {
      return {
        listData: [],
        count: 0,
        pageSize: 10,
        current: 1
      }
    },
    methods: {
      getData () {
        postRequest({
          url: '/article',
          data: {
            where: {
              status: 1
            },
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
      timeFormat (e) {
        return dateFormat(new Date(e.addtime), 'yyyy/MM/dd hh:mm')
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>
