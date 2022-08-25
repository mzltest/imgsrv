let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser
const fetch = require('node-fetch');
exports.handler = async function http (req) {
  proxyurl=req.rawPath.substring(1)
  if (req.rawQueryString!=''){
    proxyurl+='?'+req.rawQueryString
  }
  console.log(proxyurl)
  const response = await fetch('https://baidu.com')
  text=await response.text()
  rheads=Object(response.headers.raw())
  console.log()
  return {
  headers:rheads,
 // statusCode: response.status,
  body: text
  }
}
