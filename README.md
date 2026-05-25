# Anime Age Recognition

這是一個以 `React + Vite + Express` 製作的角色圖片分析 Demo。
使用者可以上傳圖片，後端會把圖片送到 Gemini，回傳角色名稱、外觀年齡、視覺特徵與角色卡資訊。

## 本機執行

需求：

- Node.js 20+

步驟：

1. 安裝依賴：`npm install`
2. 建立 `.env.local`，並設定 `GEMINI_API_KEY`
3. 啟動開發環境：`npm run dev`
4. 開啟 `http://localhost:3000`

## 可用指令

- `npm run dev`：啟動 Express 與 Vite 開發伺服器
- `npm run build`：建置前端並打包後端
- `npm run start`：執行建置後的伺服器
- `npm run lint`：執行 TypeScript 型別檢查
- `npm run clean`：刪除 `dist`
