module.exports = async function (context, req) {
    if (!req.body) context.res.status(400).send("Please provide image.")

    const fetch = require('node-fetch')
    const controller = new AbortController()
    const url = System.Environment.GetVairable("READAPI_READ", EnvironmentVariableTarget.Process)
    const keyname = System.Environment.GetVairable("READAPI_KEY_NAME", EnvironmentVariableTarget.Process)
    const key = System.Environment.GetVairable("READAPI_KEY_VALUE", EnvironmentVariableTarget.Process) 
    

    // payload
    const opt = {
        method: 'POST',
        body: blob,
        headers: {
           'Content-Type': 'application/octet-stream', 
           [keyname]: key
        },
        signal: controller.signal
    }




    //  send to read
    //  =======================================================
    const readDL = new Promise(res => {
        fetch(url, opt)
        .then(d => {
            if (d.headers.has('Operation-Location')) {
                controller.abort()
                res(d.headers.get('Operation-Location'))
            }
        })
        .catch(err => {
            console.log(err)
        })
    })






    //  get results from read
    //  =======================================================
    readDL.then(getRead => {
        new Promise(res => checkResult(getRead,keyname,key,res))
        .then(r => {
            let result;
            new Promise((res,rej) => getInfo(r,res,rej))
            .then(r => {
                result = r
                res(r)
            }).catch(() => {
                console.log("Not enough lines. this is the result")
                return result
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    context.res = { body: data }
}