## Travis CI
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

※ 初回ビルドは動作が不安定な場合があります。キャンセルした方がいいかもしれません。
