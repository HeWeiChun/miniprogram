const rq = require('request-promise')
exports.main = async (event, context) => {

  return await rq({
    method: 'POST',
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    form: {
      "grant_type":"client_credentials",
      "client_id":"yj0oDFe0RWA3zLLtQoiF71vx",
      "client_secret":"KoUenxiLoVamw244z5KoiLDGUUikRbeU"
    },
    json: true
  }).then(data => {
    return Promise.resolve({
      code: 0,
      data,
      info: '操作成功！'
    })
  }).catch(error => {
    console.log(error)
    if (!error.code) {
      return Promise.reject(error)
    }
    return error
  })
}