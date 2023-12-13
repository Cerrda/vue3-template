import { queryMysql, queryMiddle, exportOrImport } from '@/utils/request.js'
import { Encrypt } from '@/utils/cryption'

export const queryMysqlAPI = (name) => {
  const sql = `select * from cfg_tob_dnnproject_mgr`

  return queryMysql(sql)
}

export const queryMiddleAPI = (name) => {
  const sql = `select * from prestat.mv_st_s_popapp_15min`

  return queryMiddle(sql)
}

export const exportAPI = async () => {
  const sql = Encrypt(`select * from energy.dl_gateway`)

  const res = await exportOrImport({ url: 'export', data: sql })
  if (res.status !== 200) return

  let blob = res.data
  let a = document.createElement('a')
  let href = window.URL.createObjectURL(blob)
  a.href = href
  a.download = res.headers['content-disposition'].match(/=(\S*)/)[1]
  a.click()
  window.URL.revokeObjectURL(href)
}
