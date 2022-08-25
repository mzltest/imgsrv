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
  const response = await fetch(proxyurl,{})
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
