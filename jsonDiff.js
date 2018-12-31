
console.log("[")
let pre = require('./old_addons.json').reduce((obj, item) => ({...obj, [item.name]: item}), {})
let json = ''
require('./addons.json').forEach(postObj=>{
    let preObj = pre[postObj.name]
    if(!preObj)
    json += JSON.stringify(postObj) + ","
    else if(preObj.fileVersion === postObj.fileVersion)
        return
    else if(!isFileVersionDiffrence(preObj.fileVersion,postObj.fileVersion))
        return
    else
        json += JSON.stringify(postObj) + ","
});
if(json != "["){
    console.log(json.slice( 0, -1 ) + "]")
}
function isFileVersionDiffrence(preVer,postVer){
    let preVerArr = preVer.substr(1).split('.')
    let postVerArr = postVer.substr(1).split('.')
    for(let i = 0; i < preVerArr.length; i++){
        if(Number(preVerArr[i]) > Number(postVerArr[i]))
            return false
        else if (Number(preVerArr[i]) < Number(postVerArr[i]))
            return true
    }
    return false
}
