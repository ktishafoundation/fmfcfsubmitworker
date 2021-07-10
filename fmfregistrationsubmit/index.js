 const fmfishapiplatformpushurl1 = "??"
 const fmfishapiplatformpushurl1UAT = "??"
 const fmfishaprspiuspushurl1 = "??"
 const fmfishapikfkurl = "??"
 const fmfstartdate = '2021-06-24'
 const s1tos2jsgstngfmpreflang = {"s":"50","s2":"1"}
 const satsang_tzlang_id_valuemapping = {"1":"Asia/Kolkata","4":"CET","10":"America/Los_Angeles","9":"America/New_York"}
 const satsang_reslang_isocode = {"1":"en","30":"de","35":"hi","27":"fr","77":"es","86":"ta","58":"ru"}
 const fmferrorurl = "https://fmfstaticcontent.isha-static.workers.dev/page_five.html"
 const inithd = {
  headers: {
      "content-type": "text/html;charset=UTF-8",
  },
}

 /**
  * readRequestBody reads in the incoming request body
  * Use await readRequestBody(..) in an async function to get the string
  * @param {Request} request the incoming request to read from
  */
 async function readRequestBody(request) {
   const { headers } = request
   const contentType = headers.get("content-type") || ""
 
   if (contentType.includes("application/json")) {
     return JSON.stringify(await request.json())
   }
   else if (contentType.includes("application/text")) {
     return await request.text()
   }
   else if (contentType.includes("text/html")) {
     return await request.text()
   }
   else if (contentType.includes("form")) {
     const formData = await request.formData()
     const body = {}
     for (const entry of formData.entries()) {
       body[entry[0]] = entry[1]
     }
     return JSON.stringify(body)
   }
   else {
     const myBlob = await request.blob()
     const objectURL = URL.createObjectURL(myBlob)
     return objectURL
   }
 }
 

   class AttributeRewriter {
    constructor(attributeName,datatobesettohtml) {
      this.attributeName = attributeName
      this.datatobesettohtml = datatobesettohtml
    }
    element(element) {
      const attribute = element.getAttribute(this.attributeName)
      console.log("attribute")
      console.log(this.attributeName)
      if (attribute && this.datatobesettohtml) {
        try{
          console.log("inside setattribute")
          console.log(this.datatobesettohtml)
          console.log("inside setattribute done")
        element.setAttribute(
          this.attributeName,
          this.datatobesettohtml,
        )
        }
        catch(exvar1){console.log('exception in attributerewriter')}
      }
    }
  }
async function handleformpost(request) {
  const reqBody = await readRequestBody(request)
  //  const { request2 } = request;
  const retBody = `The request body sent in was ${reqBody}`
  const formobj = JSON.parse(reqBody)
  const formorigjson = JSON.stringify(formobj)
  var formobj2 = JSON.parse(formorigjson)
  var preflangvar
  var preferredtimezonevar
  var statevar = ""
  var jsgstngfmstatecfnamevar = ""
  var jsgstngfmcountrycfisovar = ""
  
  const destinationURL = "https://example.com"
  const statusCode = 301
  var fmfsuccessurl = "https://fmfstaticcontent.isha-static.workers.dev/page_four.html"
  if (formobj.jsgstngfmcountry != "104") {
    return Response.redirect("https://ishangam2.isha.in/onlinesatsang/registrationform?eventtype=pournami", statusCode)
  }



  // CHECK DUPLICATES COMMENTED OUT FOR NOW AS WE ARE GOING ONLY FOR M1 PUSH. DUPLICATES HANDLED BY KAKFKA
  //  try {
  //  const valueoffmfpidkey = await FMFPID.get(formobj2.jsgstngfmprofileid)
  //  if (valueoffmfpidkey === null) {
  //      await FMFPID.put(formobj2.jsgstngfmprofileid, JSON.stringify(formobj2))
  //    }
  //    else {
  //      return new Response("already registered")
  //    }
  //  }
  //  catch (excvari) { }


  // const ssofpurlcon = `${ssofpurl}${getlogprofrespvar.autologin_profile_id}`
  //request.cf.country

  //    if(formobj.jsgstngfmcountry != "104"){

  //    } 
  const postobjvarkfk = { "records": [{ "value": [formobj2] }] }
  const initforkfk = {
    headers: {
      "Content-Type": "application/vnd.kafka.json.v2+json",
      "Accept": "application/vnd.kafka.v2+json"
    },
    method: "POST",
    body: JSON.stringify(postobjvarkfk)
  }
  const responsesforkfk = await fetch(fmfishapikfkurl, initforkfk)
  console.log(postobjvarkfk)
  if (responsesforkfk.status === 200) {
    console.log("kfkgood")
  }
  else {
    const responseforbuilapierrhtml1 = await fetch(fmferrorurl, inithd)
    const resultsforbuilapierrhtml1 = await gatherResponse(responseforbuilapierrhtml1)

    return new Response(await responsesforkfk.text(), inithd)
  }
  const resultsforkfk = await gatherResponse(responsesforkfk)
  console.log("kk" + resultsforkfk)
  try {
    preflangvar = satsang_reslang_isocode[formobj.language_preferred]
    preferredtimezonevar = satsang_tzlang_id_valuemapping[formobj.timezone_preferred]
    if ("jsgstngfmstatecfname" in formobj && formobj.jsgstngfmstatecfname) {
      jsgstngfmstatecfnamevar = formobj.jsgstngfmstatecfname
    }
    if ("jsgstngfmcountrycfiso" in formobj && formobj.jsgstngfmcountrycfiso) {
      jsgstngfmcountrycfisovar = formobj.jsgstngfmcountrycfiso
    }
  }
  catch (ex) { console.log("exception in tz for platform" + ex) }
  console.log(preflangvar)
  console.log(preferredtimezonevar)
  console.log(jsgstngfmstatecfnamevar)
  console.log(jsgstngfmcountrycfisovar)
  const jsgstngfmstatecfname = "jsgstngfmstatecfname" in formobj && formobj.jsgstngfmstatecfname
  const api_info = {
    "fname": formobj.jsgstngfmfirstname,
    "lname": formobj.jsgstngfmlastname,
    "participantemail": formobj.jsgstngfmparticipantemail,
    "phoneno": formobj.jsgstngfmphone,
    "city": formobj.jsgstngfmcity,
    "state": jsgstngfmstatecfnamevar,//jsgstngfmstate
    "country": jsgstngfmcountrycfisovar,//jsgstngfmcountry
    "schedule_name": "Online Pournami Satsang - English - 28 Mar, 2021",
    "start_date": fmfstartdate,
    "reg_status": "CONFIRMED",
    "sso_id": formobj.jsgstngfmprofileid,
    "language": preflangvar,
    "createdate": new Date().toISOString().substr(0, 10),
    "preferredtimezone": preferredtimezonevar,
    'zip': formobj.jsgstngfmpincode,
    "rollNumber": "M1"
  }
  var arrobjvar = []
  arrobjvar.push(api_info)
  const initforplatformpush = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(arrobjvar)
  }
  const responsefromplatform = await fetch(fmfishapiplatformpushurl1, initforplatformpush)
  if (responsefromplatform.status === 200) {
    console.log(api_info)
  }
  else {
    // const responseforbuilapierrhtml2 = await fetch(fmferrorurl, initforhtmlpages)
    // const resultsforbuilapierrhtml2 = await gatherResponse(responseforbuilapierrhtml2)
    // return new Response(resultsforbuilapierrhtml2, initforhtmlpages2)
    return new Response(await responsefromplatform.text(), inithd)
  }
  const responsefromplatformres = await gatherResponse(responsefromplatform)
  console.log(responsefromplatformres)
  console.log("" + formobj.timezone_preferred)
  fmfsuccessurl = fmfsuccessurl + "?tzvalues=" + formobj.timezone_preferred
  console.log(fmfsuccessurl)


  const rewriter = new HTMLRewriter()
    .on("input[name='tzvalueshidden']", new AttributeRewriter("value", formobj.timezone_preferred))
  const responseforhtml = await fetch(fmfsuccessurl, inithd)
  const resultsforhtml = await gatherResponse(responseforhtml)
  return rewriter.transform(new Response(resultsforhtml, inithd))
}
 async function gatherResponse(response) {
   const { headers } = response
   const contentType = headers.get("content-type") || ""
   if (contentType.includes("application/json")) {
     return JSON.stringify(await response.json())
   }
   else if (contentType.includes("application/text")) {
     return await response.text()
   }
   else if (contentType.includes("text/html")) {
     return await response.text()
   }
   else {
     return await response.text()
   }
 }
 
 addEventListener("fetch", event => {
   const { request } = event
   const { url } = request
 

   if (request.method === "POST") {
     return event.respondWith(handleformpost(request))
   }
   else if (request.method === "GET") {
     return new Response(" ", inithd)
 
   }
 })

 
