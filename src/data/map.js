/**
 * Created by hou on 2017/4/19.
 */
const sendflag = [
  {
    label: '成功',
    value: 0
  },
  {
    label: '失败',
    value: 1
  }
]
const servicetype = [
  {
    label: '注册服务',
    value: 1
  },
  {
    label: '点餐服务',
    value: 2
  }, {
    label: '订票服务',
    value: 3
  }
]
const bureauId = [
  {
    label: '广西分公司',
    value: 3
  }
]
const dataBaseType = ['DATE', 'STRING', 'TEXT', 'INTEGER', 'CHAR', 'JSON', 'ARRAY']

export { sendflag, servicetype, bureauId, dataBaseType }
