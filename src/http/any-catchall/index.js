let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser
const fetch = require('node-fetch');
async function handler (req) {
 // console.log(req)
 prevhost=false
  proxyurl=req.rawPath.substring(1)
 
  if(proxyurl.slice(0,4)!='http' && 'host' in req.session){
    proxyurl=req.session.host+req.rawPath.substring(1)
    console.log('>>>using prev url'+proxyurl)
    prevhost=true
  }else{
    proxyurl=req.rawPath.substring(1)
  }
  currhost=proxyurl
  if (req.rawQueryString!=''){
    proxyurl+='?'+req.rawQueryString
  }
  else{
    if (proxyurl.substring(proxyurl.length-1)!='/'&&prevhost!=true){
      console.log('*****'+proxyurl.substring(proxyurl.length-1))
    proxyurl+='/'}}
    proxyhost=''
    proxyhostarr=proxyurl.split('/')
    proxyhostarr[proxyhostarr.length-1]=''
    console.log(proxyhostarr)

    proxyhost=proxyhostarr.join('/')
  console.log(proxyhost)
  console.log('))'+proxyurl)
  const response = await fetch(proxyurl,{ headers: {
    'authority': 'askjavascript.com',
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
  console.log()
  return {statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
  body: text,
  session:{host:proxyhost}
  }
}
exports.handler = arc.http.async(handler)
