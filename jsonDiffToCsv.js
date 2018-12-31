
let pre = require('./old_addons.json').reduce((obj, item) => ({...obj, [item.name]: item}), {})
require('./addons.json').forEach(postObj=>{
    let preObj = pre[postObj.name]
    if(!preObj)
    console.log(`${postObj.file},${postObj.fileVersion},${postObj.releaseTag}`)
    else if(preObj.fileVersion === postObj.fileVersion)
        return
    else if(!isFileVersionDiffrence(preObj.fileVersion,postObj.fileVersion))
        return
    else
    console.log(`${postObj.file},${postObj.fileVersion},${postObj.releaseTag}`)
});

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