# 0) 看看目前位置（應該停在 ecommerce-cart 專案資料夾內）
pwd
git --version

# 1) 初始化（如已存在 .git 會跳過。若之前初始化過，可略過 init）
git init

# 2) 設定 Git 使用者（若你全機已有就可略過）
git config user.name "fromeastale"
git config user.email "你的GitHub註冊Email"

# 3) 建立 .gitignore（避免把 node_modules / .env 推上去）
@"
# Node / Vite
node_modules/
dist/
.vite/
*.log

# Env
.env
.env.*
!.env.example

# Editor
.vscode/
.DS_Store

# Misc
coverage/
"@ | Out-File -Encoding UTF8 .gitignore

# (可選) 提供環境變數範例檔
@"
VITE_SUPABASE_URL=YOUR_URL_HERE
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
"@ | Out-File -Encoding UTF8 .env.example

# 4) 建立 README（可自訂內容）
@"
# e_commerce_cart

Vite + React + TypeScript + Tailwind 的電商清單 + 購物車 Demo  
含：分類/排序/搜尋(相似詞)/收藏/購物車(LocalStorage)、Supabase 登入(Email/Password)。

## 開發
\`\`\`bash
npm install
npm run dev
\`\`\`

## 環境變數
請在專案根目錄建立 \`.env\`：
\`\`\`
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
\`\`\`

"@ | Out-File -Encoding UTF8 README.md

# 5) 加入檔案並提交
git add .
git commit -m "chore: init project & auth scaffolding"

# 6) 設定預設分支為 main（若還沒）
git branch -M main

# 7) 連到你的遠端 repo（若已設定過就跳過或先移除再加）
git remote remove origin 2>$null
git remote add origin https://github.com/fromeastale/e_commerce_cart.git
git remote -v

# 8) 推上 GitHub（第一次會要你登入；建議用 PAT）
git push -u origin main
