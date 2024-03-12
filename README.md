### 2024/3/12
dockerに仮対応。git cloneをして下記でフロントエンドのみ起動。  
```docker-compose run --service-ports app```  
http://localhost:8080/ にアクセス  
MySQLは未対応。  
動画: https://drive.google.com/file/d/1LeiNpp9AAGp-RiZ8zgDrjjlnnCQUHVER/view?usp=sharing  

## グルメマッピングアプリ stamp
行ってみたいお店やお気に入りのレストランのある場所にマーカーを付けて保存できるアプリです。
Node.js, Express, Leaflet.js, Bootstrapで作成しています。
制作時間: 約2週間

## 作成した機能
- ユーザー登録機能
- ユーザーログイン・ログアウト機能
- 地図の作成機能
- マーカー作成・編集・削除機能
- 感想コメント機能
- ぐるなびAPIを使用してレストランを検索
- レスポンシブ対応(スマホ未対応)
- マイページ(β)
- レストラン検索で取得したデータを地図に挿入する機能
- 地図名の変更機能
- 地図の公開/非公開機能

## 追加予定の機能
- 地図の削除機能
- 地図のいいね機能
- アカウント削除機能
- 管理ページ

## 修正予定箇所
- ~~トップページのスタイル修正~~ 済
- ~~フォームを中央寄せに~~ 済
- ~~テストログイン情報をログイン画面に貼り付け~~ 済
- ~~用語の統一~~ 済
- ~~SQLインジェクション対策~~ 済
- ~~登録時パスワードのハッシュ化~~ 済
- routesから渡す文字を定数化
