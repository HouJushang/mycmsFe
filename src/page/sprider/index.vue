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
      <el-table-column prop="addtime" label="添加时间">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click="">发布</el-button>
        </template>
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
  import {getRequest} from '../../util/request'
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
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>
