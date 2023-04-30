# project-management-website
Project II - Group 1

Chúng mình là nhóm 1 nè

git init #tạo git trong folder đang chọn<br>
git remote add origin <URL mới> #add remote vào máy

# push code
git add --all # add code mới <br>
git commit -m "msg" # commit code kèm thèm theo message <br>
git push -u origin master # pull code lên github <br>
git pull --rebase origin master #lỗi k truy cập được link <br>
git push origin master <br>

# pull code
git pull

# status
git log # lịch sử git <br>
git status # trạng thái các file trong folder chứa git <br>

# remote/merge <br>
git fetch origin master<br>
git merge origin master<br>

git remote -v # xem link remote<br>
git remote rm origin # remove remote gốc<br><br><br>
git show-ref # hiển thị các thành phần trong ref<br><br>

# git branch<br>
git branch<br>
git branch master<br>
git branch -d main<br>
git branch -m master<br>

# Các lỗi có thể gặp <br>
1. lỗi master -> master (fetch first)
    - đã có người khác push code lên github trước bạn. bạn cần 'git pull' trước để cập nhật code của họ rồi mới 'git push'