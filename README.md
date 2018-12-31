# IPF-Auto-Relase
## ToS アドオン開発者用  
## [Travis CI](./travis)
Travis CIのサービスを利用した方法です
環境などによる制限はありません  
フォルダ構造による制限がほぼありません  
commitをGithubにpushしたときにビルドが走り、問題なければGithub ReleaseにPushされます  
ファイルがローカルに生成されないため、確認のためにリリースからダウンロード又はアドオンマネージャーからインストールする必要があります  
また、Pushした段階でアドオンマネージャーに登録されるため注意してください  


### 許容可能なフォルダ構造
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
1. 基本となる構造． luaファイルを格納するフォルダ名は何でもよい
2. 複数のアドオンを含む構造． **src**フォルダにそれぞれのアドオンフォルダをを格納してください．必ずsrcフォルダに格納してください．
3. addon_d.ipfとui.ipfなど複数のコンテナを含む構造． srcなどのフォルダに格納し、REMADEなどがaddon_d.ipfと同じディレクト上に含まれないように気をつけてください

### 使い方
1. [.travis.yml](travis/.travis.yml)を自分のリポジトリに保存してください
1. https://travis-ci.org/　へアクセスしGithubのアカウントでログインしてください
1. アドオンを管理しているリポジトリを登録してください
1. https://github.com/settings/tokens から新しいトークンを生成してください
1. Travisで登録したリポジトリの設定画面を開き、Environment VariablesのNameに`GITHUB_TOKEN`,valueに先ほど生成したトークンを貼り付けてください
1. addons.jsonを更新し、GithubにPushした段階でビルドが走り、1分ほどでReleaseにファイルが登録されます

トークンはrepoにチェックを入れておいてください
<img src="post-commit/token.png" width="600">

※ 初回ビルドは動作が不安定な場合があります。キャンセルした方がいいかもしれません。


## [Post-Commit \(for windows\)](./post-commit)
gitのHook機能を使い、addons.jsonが更新されたときに自動でフォルダをIPF化しGithub Releasにアップロードするものです
いくつか依存関係やフォルダ構造の制限があります
コミット時生成されるため、Pushするまではアドオンマネージャーに登録されません

### 許容可能なフォルダ構造
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
1. 基本となる構造． luaファイルを格納するフォルダ名は何でもよい
2. 複数のアドオンを含む構造． **src**フォルダにそれぞれのアドオンフォルダをを格納してください．必ずsrcフォルダに格納してください．


## 依存関係
* [tpIpfTool](https://github.com/kuronekotei/IpfTool/releases)
* [ghr](https://github.com/tcnksm/ghr/releases)
* [node.js](https://nodejs.org/ja/)
* git bash
が必要になります
tpIpfToolおよびghrに関しては上記リンクにバイナリが公開されているので、環境変数のパスが通っているフォルダに放り込んでください  
node.jsはなるべく最新のバージョンを適当にインストールしておいてください
また、`git push`はgit bashで実行してください(cmd.exe,powershellでは動きません)

## 使い方
まずはGithub Releaseに放り込むために、トークンを取得します  
https://github.com/settings/tokens から新しいトークンを作成します  
適当な名前とrepoにチェックを入れて作成してください  
<img src="post-commit/token.png" width="600">  
この後トークンが生成されるのでコピーし、git configのgithub.tokenにセットします  
`git config --global github.token "....."`

あとは、このリポジトリのpost-commitをダウンロードし、アドオンを管理しているフォルダに  
`.git/hook/post-commit`  
となるようにpost-commitを移動させてください  

addons.jsonを更新し、コミットした時に処理が走り、自動でRelease生成とファイルのアップロードが始まります  
