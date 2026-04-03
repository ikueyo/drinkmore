# 🧋 DrinkMore — 高雄飲料即時查

高雄熱門飲料店菜單即時查詢 Web APP

> 50嵐 × 清心福全 × 迷客夏 — 一站搞定高雄手搖飲！

## ✨ 功能

- 🔍 **即時搜尋** — 依品牌、分類、關鍵字快速篩選
- 💰 **價格一覽** — 中杯/大杯價格清晰對照
- 🍯 **客製化選擇** — 甜度 5 段 × 冰量 6 段
- 📊 **品牌統計** — 均價、最低最高價一覽

## 🗂 專案結構

```
drinkmore/
├── src/
│   ├── App.jsx          # 主程式
│   ├── main.jsx         # 入口
│   └── data/
│       └── drinks.json  # 📌 飲品資料（更新菜單只需改這個檔案）
├── index.html
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Pages 自動部署
```

## 🔄 菜單更新流程

```
1. 拍攝最新菜單照片
2. 上傳到 Claude 對話
3. Claude 辨識後更新 src/data/drinks.json
4. 推送到 GitHub → 自動部署
```

## 🚀 開發

```bash
npm install
npm run dev      # 本地開發 http://localhost:5173
npm run build    # 建置
```

## 📡 部署

推送到 `main` 分支即自動部署至 GitHub Pages。

### 首次設定

1. GitHub 建立 repo `drinkmore`
2. Settings → Pages → Source 選 **GitHub Actions**
3. 推送程式碼後等待 Action 完成

網址：`https://<你的帳號>.github.io/drinkmore/`

## 📋 資料來源

菜單價格參考自各品牌公開資訊（高屏區），實際以門市售價為準。

---

Made with 🧋 in Kaohsiung
