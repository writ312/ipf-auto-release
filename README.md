# IPF-Auto-Relase
これはgitのHook機能を使い、addons.jsonが更新されたときに自動でフォルダをIPF化しGithub Releasにアップロードするものです
いくつか依存関係やフォルダ構造の制限があるため、それを許容できる場合に使用してください。

## フォルダ構造
Tos-Addonというリポジトリで管理していて、AutoReleaseというアドオン作っている場合は
```
Tos-Addon
  └AutoRelease
     │─README.md
     └─autorelease
        └─autorelase.lua
        └─autorelase.xml
```
というファイル構造になります  
この時のaddons.jsonには以下のようになります
```
{
    "name" : "AutoRelease",
    "file" : "autorelase",
    "extension" : "ipf",
    "fileVersion" : "v1.0.0",
    "releaseTag" : "autorelase",
    "unicode" : "⛄",
    "description" : "",
    "updateInfo" :"",
    "tags" : [
        "ui"
    ]
}
```
気を付けていただくのは、*.luaの一つ上のディレクトリ名をaddons.jsonのfileの値と同じにしてください  
nameとかreleaseTagとかは別にどうでもいいです  

## 依存関係
* [tpIpfTool](https://github.com/kuronekotei/IpfTool/releases)
* [ghr](https://github.com/tcnksm/ghr/releases)
* [node.js](https://nodejs.org/ja/)

が必要になります
tpIpfToolおよびghrに関しては上記リンクにバイナリが公開されているので、パスが通っているディレクトリに放り込んでください  
node.jsはなるべく最新のバージョンを適当にインストールしておいてください

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

addons.jsonが更新し、コミットした時に処理が走り、自動でRelease生成とファイルのアップロードが始まります  
