# my gulp template
メモ、忘備録、色々

## npmパッケージインストール

```
$ cd projectName
$ sudo npm install
```


## gulp起動
```
$ gulp
```

## スプライト画像
下記のコマンドでスプライト画像を生成。

```
$ gulp sprite
```
style.scssで「@importで_sprite.scss」とmixinを呼び出し。

## ejs使う場合

```
ejs格納先→/app/dev/ejs
html出力先→/ ※ディレクトリ直下
```


## ディレクトリ構成

```
├── app
│   └── dev
│   　   └── ejs（index.ejs など。.htmlはディレクトリ直下に生成）│├── images
│   └── sprite （スプライト用png）│├── node_modules
│   └── （パッケージ各種）│├── css
│├── sass
│├── gulpfile.js│├── package.json
│
└── README.md
```