未提交的情况下
git add . (把所有改动暂存)

git stash (把暂存的文件提交到git的暂存栈)

git checkout 本该提交代码的分支

git stash pop (将暂存栈中的代码放出来)

至于是继续改还是提交就随你了

已提交的情况下
git checkout 不该提交代码提交了代码的分支

git reset HEAD~1 （最近一次提交放回暂存区, 并取消此次提交）

git stash (把暂存的文件提交到git的暂存栈)

git checkout 该提交代码的分支

git stash pop

下面一顿操作随你猛了，等你把代码提交到了正确的分支后，再次切到刚刚错的分支

git push origin 错误的分支 -f (把不该上去的文件回退掉)