npm run dev

# 🛠️ Git 指令備忘錄（Flutter 專案同步 GitHub）

git init
git add .
git commit -m "每日單字"

git remote set-url origin https://github.com/fromeastale/e_commerce_cart.git


git push -u origin main


# 加入所有重要變更
git add android/ ios/ lib/ pubspec.yaml assets/icons/

# 提交功能更新
git commit -m "✨ 更新地圖 icon 顯示模組與頁面邏輯"

# 推送到遠端
git push origin main



## ✅ 常用同步流程

```bash
# 1. 查看目前有哪些檔案被修改、刪除或新增
git status

# 2. 將所有變更加入 Git 暫存區（準備提交）
git add .

# 3. 提交變更，並加上描述（請用具體說明這次改了什麼）
git commit -m "新增 InfoPage UI 並修正路由設定"

# 4. 將本地的 commit 推送到 GitHub 的遠端 repo
git push
# 拉取遠端更新，避免推送時發生衝突
git pull origin main --allow-unrelated-histories

# 查看 commit 歷史（確認是否成功提交）
git log --oneline

# 查看目前的遠端 repo 設定（確認推送目標）
git remote -v
