/**
 * Created by hou on 2017/5/17.
 */
export default function (paramsObj) {
  var newParam = {}
  for (let item in paramsObj) {
    if (paramsObj[item] !== '') {
      newParam[item] = paramsObj[item]
    }
  }
  return newParam
}
