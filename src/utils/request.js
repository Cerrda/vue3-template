import axios from 'axios'
// mysql查询 -------------------------------------------------------------------------------------------
const queryMysqlEntity = axios.create({
  baseURL: '/brdcontrol-service/getRequestServer',
  timeout: 5000,
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})

queryMysqlEntity.interceptors.response.use(function (res) {
  if (res.status === 200) {
    return res.data
  }
})

/**
 * mysql查询
 * @param {String} sql sql语句
 * @param {String} type get:查询，execute:其它
 * @returns {Function}
 */
export function queryMysql(sql, type) {
  const data = {
    requestParams: JSON.stringify({
      serviceName: 'brd-mysql-8086',
      serviceMethod: `/brdmysql/${type ? 'execute' : 'get'}?sid=142459827452`,
      serviceParam: JSON.stringify({
        dataSourceType: '1',
        sql
      }),
      requesttype: 'get'
    })
  }

  return queryMysqlEntity({
    data
  })
}
// 中间层查询 -------------------------------------------------------------------------------------------
const queryMiddlePreEntity = axios.create({
  baseURL: '/brdcontrol-service/data/prep',
  timeout: 5000,
  method: 'POST',
  headers: { 'content-type': 'application/json' }
})

const queryMiddleEntity = axios.create({
  baseURL: '/brdcontrol-service/data/query',
  timeout: 5000,
  method: 'POST',
  headers: { 'content-type': 'application/json' }
})

queryMiddleEntity.interceptors.response.use(function (res) {
  if (res.status === 200) {
    return res.data
  }
})

/**
 * 中间层查询
 * @param {String} sql sql语句
 * @param {Number} dataSetId 数据集ID
 * @param {Number} tblId 表ID
 */
export async function queryMiddle(sql, tblId) {
  const data = {
    dataSetId: 10080000538,
    tblId: 10080000765,
    directQuerySQL: sql,
    directSQLDataSource: 'presto',
    webModuleId: 9999
  }

  const res = await queryMiddlePreEntity({
    data
  })

  if (res.data.result) {
    const data = {
      startPosi: 1,
      endPosi: 500,
      queryId: res.data.queryId
    }
    return queryMiddleEntity({
      data
    })
  }
}
