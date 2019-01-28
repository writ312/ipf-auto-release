# IPF-Auto-Relase
### ToS アドオン開発者用  
これはgitのHook機能を使い、addons.jsonが更新されたときに自動でフォルダをIPF化しGithub Releasにアップロードするものです  
いくつか依存関係やフォルダ構造の制限があるため、それを許容できる場合に使用してください。  

## フォルダ構造
Tos-Addonというリポジトリで管理していて、AutoReleaseというアドオン作っている場合は  

1.
```
Tos-Addon
  └AutoRelease
     │─README.md
     └─autorelease (or anything)
        └─autorelase.lua
        └─autorelase.xml
```

2.
```
Tos-Addon
  └AutoRelease
     │─README.md
     └─src
        └─autorelase
        │ └─autorelase.lua
        │ └─autorelase.xml
        │
        └─autorelase2
          └─autorelase2.lua
          └─autorelase2.xml
```

3.
```
Tos-Addon
  └AutoRelease
   |─README.md
   └─src 
     └─addon_d.ipf
     │  └─autorelase
     │  │ └─autorelase.lua
     │  │ └─autorelase.xml
     │  │
     │  └─autorelase2
     │    └─autorelase2.lua
     │    └─autorelase2.xml
     └─ui.ipf
      └─skin
          └─autorelase.tga
```

## 依存関係
* [tpIpfTool v2.2](https://github.com/kuronekotei/IpfTool/releases)  
* [ghr](https://github.com/tcnksm/ghr/releases)  
* git bash  
が必要になります  
tpIpfToolおよびghrに関しては上記リンクにバイナリが公開されているので、環境変数のパスが通っているフォルダに放り込んでください  
また、`git push`はgit bashで実行してください(cmd.exe,powershellでは動きません)

## 使い方
まずはGithub Releaseに放り込むために、トークンを取得します  
[このリンク](https://github.com/settings/tokens)から新しいトークンを作成します  
適当な名前とrepoにチェックを入れて作成してください  
<img src="token.png" width="600">  
この後トークンが生成されるのでコピーし、git configのgithub.tokenにセットします  
`git config --global github.token "....."`

あとは、このリポジトリのpost-commitをダウンロードし、アドオンを管理しているフォルダに  
`.git/hook/post-commit`  
となるようにpost-commitを移動させてください  

addons.jsonを更新し、コミットした時に処理が走り、自動でRelease生成とファイルのアップロードが始まります  
作成したipfファイルはReleaseIPFというフォルダに移動されます  
必要に応じて.gitignoreに追加して下さい。
