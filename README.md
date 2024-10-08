# react-web-app-with-openai

# [https://bit.ly/ntu-ai-web-4](https://bit.ly/ntu-ai-web-4)

安裝所需套件
```
npm i
```

啟動開發伺服器
```
npm run dev
```

## 環境變數範例

env.local
```
OPENAI_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
```

## 安裝Git

1. 至 [Git官方網站](https://www.git-scm.com/) 下載並且安裝 Git
2. 設定使用者名稱與Email

```
git config --global user.name "你的使用者名稱"
git config --global user.email 你的EMAIL
```

## 更新至Github
```
git init(在終端機上執行上面的語句，左邊的字會變綠色 ex:app/api, firebase-key.json不能被紀錄到所以是灰色的)
git add .
git commit -m "這次所執行的變更"
git branch -M main (每個專案第一次要執行的)
git push -u origin main(每個專案第一次要執行的)
上面這個執行完，在GitHub就可以看到code

之後更新要執行的語令
git add .
git commit -m "這次所執行的變更"
git push origin main
```