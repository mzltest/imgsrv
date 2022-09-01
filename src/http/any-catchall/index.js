let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser
const fetch = require('node-fetch');
async function handler (req) {
 // console.log(req)
  proxyurl=req.rawPath.substring(1)
 
  if (req.rawQueryString!=''){
    proxyurl+='?'+req.rawQueryString
  }
 
  const response = await fetch(proxyurl,{ headers: {
   
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'dnt': '1',
    'if-modified-since': 'Wed, 24 Aug 2022 11:07:36 GMT',
    'referer': 'https://cn.bing.com/',
    'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63'
}})
  text=await response.text()
  rheads=Object(response.headers.raw())
  return {statusCode: 200,
    headers: { 'content-type':rheads['content-type'][0]},
  body: text
  }
}
exports.handler = arc.http.async(handler)
