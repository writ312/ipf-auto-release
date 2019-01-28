mkdir -p temp_pack_dir
node jsonDiffToCsv.js | while read row; do
    arr=(`echo $row | tr -s ',' ' '`)
    file=${arr[0]}
    version=${arr[1]}
    releaseTag=${arr[2]}
    fileName=${file}.lua
    releaseFileName=${file}-${version}
    filePath=$(find -name $fileName)
    if [ -z "$filePath" ] ; then
        echo ${fileName}がみつかりません
        continue
    fi
    echo $filePath
    depth=1
    if [[ $filePath =~ addon_d\.ipf ]] ; then
        # ex)addon_d.ipf/hoge/hoge.lua
        # ex)ui.ipf/skin/hoge.tga
        cp -r -f ${filePath%/addon_d.*} temp_pack_dir/${file}
        ls temp_pack_dir/${file}/* -dF | grep -v /$ | xargs rm
        ls temp_pack_dir/${file}/* -dF | grep -v ipf/$ | xargs rm -r
    else
    
        if [[ $filePath =~  src\/.+\/.+\.lua ]] ; then
            # ex)src/hoge/hoge.lua    
            # ex)src/foo/foo.lua    
            mkdir -p temp_pack_dir/${file}/addon_d.ipf
            cp -r -f ${filePath%/*/*}/* temp_pack_dir/${file}/addon_d.ipf/
        else
            mkdir -p temp_pack_dir/${file}/addon_d.ipf/${file}/ 
            cp -r -f -P ${filePath%/*}/* temp_pack_dir/${file}/addon_d.ipf/${file}/
        fi
    fi
    ./libipf/ipf temp_pack_dir/${releaseFileName}.ipf temp_pack_dir/${file}
    ghr $releaseTag ./temp_pack_dir/${releaseFileName}.ipf
done
# rm -rf temp_pack_dir
