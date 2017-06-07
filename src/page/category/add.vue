/**
* Created by hou on 2017/6/7.
*/

<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form :model="addForm" label-width="80px">
          <el-form-item label="栏目名称">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="父级栏目">
            <el-select v-model="addForm.parentid" placeholder="请选择父级栏目">
              <el-option value="0" label="顶级栏目"></el-option>
              <el-option v-for="item in category" :value="item.id" :label="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容模型">
            <el-select v-model="addForm.articletype" placeholder="请选择内容模型">
              <el-option value="1">文章</el-option>
              <el-option value="2">图集</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保存路径">
              <el-input v-model="addForm.folder"></el-input>
          </el-form-item>
          <el-form-item label="排列顺序">
            <el-input type="number" v-model="addForm.sortrank" placeholder="越小越靠前"></el-input>
          </el-form-item>
          <el-form-item label="栏目属性">
            <el-radio-group v-model="addForm.showtype">
              <el-radio label="1">栏目</el-radio>
              <el-radio label="2">封面</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="绑定域名">
            <el-switch on-text="on" off-text="off" v-model="addForm.bindhost"></el-switch>
          </el-form-item>
          <el-form-item label="绑定域名">
            <el-input v-model="addForm.host"></el-input>
          </el-form-item>
          <el-form-item label="SEO标题">
            <el-input v-model="addForm.seotitle"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="addForm.keywords"></el-input>
          </el-form-item>
          <el-form-item label="栏目描述">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :model="addForm" label-width="80px">
          <el-form-item label="模板风格">
            <el-input v-model="addForm.tmpstyle"></el-input>
          </el-form-item>
          <el-form-item label="文章模板">
            <el-input v-model="addForm.atricle_tmp"></el-input>
          </el-form-item>
          <el-form-item label="封面模板">
            <el-input v-model="addForm.category_tmp"></el-input>
          </el-form-item>
          <el-form-item label="列表模板">
            <el-input v-model="addForm.list_tmp"></el-input>
          </el-form-item>
          <el-form-item label="文章命名">
            <el-input v-model="addForm.artrule"></el-input>
          </el-form-item>
          <el-form-item label="列表命名">
            <el-input v-model="addForm.lisrule"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-button type="primary" @click="submit">提交</el-button>
  </section>
</template>
<style>
</style>
<script>
  import { postRequest } from '../../util/request'
  export default{
    data () {
      return {
        category: [],
        addForm: {
          name: '',
          articletype: '',
          sortrank: 100,
          folder: '',
          bindhost: false,
          showtype: '1',
          domain: '',
          parentid: null
        }
      }
    },
    methods: {
      submit () {
        postRequest({
          url: '/addcategory',
          data: this.addForm
        }).then(e => {
          this.$router.push({name: 'category'})
        }).catch(e => {
          console.log(e)
        })
      }
    },
    mounted () {
      postRequest({
        url: '/category'
      }).then(e => {
        this.category = e
      }).catch(e => {
        console.log(e)
      })
    }
  }
</script>
