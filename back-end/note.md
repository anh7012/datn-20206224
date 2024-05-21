Routes:http://localhost:7012/

**AuthRouter**
- Login: [post] http://localhost:7012/login
    - Req.body: username, password

- Logout: [post] http://localhost:7012/logout
  - Auth: accessToken

**Users Router**
- Create User: [post] http://localhost:7012/users/create
    - Auth: accessToken
    - Req.body: 
      + roleName: 1 trong 3 {"Quản trị viên", "Nhân viên", "Giám đốc"}
      + username
      + password
      + email
      + HoTen
      + NgaySinh
      + GioiTinh: Nam 1, Nữ 0
      + DiaChi

- changeUsername: [post] http://localhost:7012/users/:id/change_username/
    - Auth: accessToken
    - Param: idUser đó
    - Body: username
- changePassword: [post] http://localhost:7012/users/:id/change_password/
    - Auth: accessToken
    - Param: idUser đó
    - Body: old_password, new_password
- updateUser: [put] http://localhost:7012/users/:id
  - Auth: accessToken
  - Param: idUser 
