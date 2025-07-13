# 版本管理指南

## Git基础命令
```bash
# 查看当前状态
git status

# 查看提交历史
git log --oneline

# 创建并切换到新分支
git checkout -b feature/new-feature

# 添加文件到暂存区
git add .

# 提交更改
git commit -m "描述信息"

# 切换分支
git checkout branch-name

# 合并分支
git merge branch-name

# 查看分支
git branch
```

## 版本管理最佳实践

### 1. 提交频率
- 每完成一个功能点就提交一次
- 每次UI优化后提交
- 每修复一个bug后提交

### 2. 提交信息规范
```
feat: 新功能
fix: 修复bug
style: UI/样式优化
refactor: 代码重构
docs: 文档更新
```

### 3. 分支策略
- `master`: 主分支，保持稳定
- `feature/ui-optimization`: UI优化分支
- `feature/new-module`: 新功能开发分支
- `hotfix/bug-name`: 紧急修复分支

### 4. 安全保障
- 定期备份到远程仓库
- 重要节点打标签：`git tag v1.0.0`
- 保持开发日志同步更新

## 回滚操作
```bash
# 回退到上一个提交
git reset --hard HEAD~1

# 回退到指定提交
git reset --hard commit-id

# 创建回滚提交（推荐）
git revert commit-id
```

## 当前项目状态
- 初始提交ID: 0bf21c6
- 当前分支: master
- 文件总数: 55个
- 项目运行正常: ✅
