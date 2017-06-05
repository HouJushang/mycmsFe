/**
 * Created by hou on 2017/4/14.
 */
export default {
  parentNav: [
    {
      name: '常用操作',
      children: [
        {
          name: '文章列表',
          path: 'article'
        },
        {
          name: '添加文章',
          path: 'addArticle'
        },
        {
          name: '采集列表',
          path: 'spriderAtricle'
        }
      ]
    },
    {
      name: '内容管理',
      children: [
        {
          name: '文章列表'
        },
        {
          name: '文章列表'
        },
        {
          name: '回收站'
        }
      ]
    },
    {
      name: '模型和栏目',
      children: [
        {
          name: '栏目管理'
        },
        {
          name: '模型管理',
          path: 'model'
        }
      ]
    },
    {
      name: '采集管理',
      children: [
        {
          name: '采集'
        }
      ]
    },
    {
      name: '系统设置',
      children: [
        {
          name: '管理员管理'
        },
        {
          name: '角色管理'
        }
      ]
    }
  ]
}
