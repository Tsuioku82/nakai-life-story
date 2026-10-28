# 中井さんの人生の履歴書

京都・山科で育ち、読書とウクレレに親しむ中井さんを、七年来の友人の目線から紹介する3ページのサイトです。

## ページ構成

1. index.html：山科から続く歩み
2. memories.html：学びの風景と好きなこと
3. message.html：今日を楽しむ言葉

本文は標準24px・大28px・特大32px、メイリオ優先の黒い太字です。選んだ文字サイズは次のページにも引き継がれます。画像はクリックして拡大できます。

## 編集とビルド

編集元はsrc/です。文章はsrc/content.js、表示と操作はsrc/app.js、追加デザインはsrc/nakai.css、共通の文字とデザインはsrc/refined.cssにあります。

`node build.cjs` で公開用dist/を生成します。外部依存ライブラリはありません。dist/はGit管理せず、ソースから生成します。

## 画像

読書の画像は提供画像です。学校の画像は提供されたGoogle Earth画像をもとに、桜並木と疎水を描き加えたAIイラストです。実景や在学当時を正確に再現した記録写真ではありません。元画像のGoogle Earth表示を残しています。

## 閲覧

一般公開サイト：https://tsuioku82.github.io/nakai-life-story/

GitHub Pagesで、ログインせずに3ページを閲覧できます。mainへのpush時にGitHub Actionsがソースからdist/を生成し、公開します。

Sitesの制作版：https://nakai-life-story.smmorita3337.chatgpt.site （所有者限定・ChatGPTログインが必要）

個人情報の追加や写真・文章の変更時は、ご本人の掲載承認を確認してください。
