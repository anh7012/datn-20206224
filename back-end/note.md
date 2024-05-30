Routes:http://localhost:7012/

**AuthRouter**
- Login: [post] http://localhost:7012/login
    - Req.body: username, password

- Logout: [post] http://localhost:7012/logout
  - Auth: accessToken

**Users Router**
- Create User: [post] http://localhost:7012/users/createUser
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

- changeUsername: [post] http://localhost:7012/users/:id/changeUsername
    - Auth: accessToken
    - Param: idUser đó
    - Body: username
- changePassword: [post] http://localhost:7012/users/:id/changePassword
    - Auth: accessToken
    - Param: idUser đó
    - Body: new_password
- updateUser: [put] http://localhost:7012/users/:id/updateUser
  - Auth: accessToken
  - Param: idUser 
  - Body:
    + email
    + HoTen
    + NgaySinh
    + GioiTinh
    + DiaChi
- deleteUser: [delete] http://localhost:7012/users/:id/deleteUser
  - Auth: accessToken
  - Param: idUser
- changeRole: [post] http://localhost:7012/users/:id/changeRole
  - Auth: accessToken
  - Param: idUser
  - Body: roleName: 1 trong 3 {"Quản trị viên", "Nhân viên", "Giám đốc"}
- listUser: [get] http://localhost:7012/users/listUser
  - Auth: accessToken
- getUser: [get] http://localhost:7012/users/:id/getUser
  - Auth: accessToken
- getUserAll: [get] http://localhost:7012/users/:id/getUserAll
  - Auth: accessToken
- changeStatus: [post] http://localhost:7012/users/:id/changeStatus
    - Auth: accessToken
    - Param: idUser
    - Body: status: 1 trong 2 {"active", "close"}
