import { queryMysql, queryMiddle } from '@/utils/request.js'

export const queryMysqlAPI = (name) => {
  const sql = `select * from cfg_tob_dnnproject_mgr`

  return queryMysql(sql)
}

export const queryMiddleAPI = (name) => {
  const sql = `select * from prestat.mv_st_s_popapp_15min`

  return queryMiddle(sql)
}
