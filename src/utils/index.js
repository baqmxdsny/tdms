/**
 * @Created by: Chenjh
 * @Date: 2018/10/14
 * @Project: tdms
 */
export default {
  //存储token
  storageToken (token){
    console.log(token)
    window.localStorage.setItem('token', token)
  },

  //获取token
  getToken () {
    var token = window.localStorage.getItem('token')
    console.log(token)
    return token
  },


  //存储用户信息
  storageUserInfo(userInfo){
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },

  //获取用户信息
  getUserInfo(){
    return JSON.parse(window.localStorage.getItem('userInfo'))
  },

  //删除存储数据
  delStorage(key){
    if (window.localStorage.getItem(key)){
      window.localStorage.removeItem('userInfo')
    }
  },

  //获取某个用户是否拥有某个页面的权限
  getPagePermission(vm,url){
    var token = this.getToken();
    if (token) {
      console.log(this.$router);
      vm.$router.push("/404/");

    } else {
      vm.$api.get(
        "/users/userMenu/",
        null,
        token,
        function success(data) {
          console.log("成功");
          menuList = data.DataInfo.listData;
          var urlList = [];
          for (var index in menuList) {
            urlList.push(menuList[index]["menu_href"]);
          }
          if (urlList.indexOf(url)!=-1){

          }else {
            this.$router.push("/404/");
          }
        },
        function fail(data) {
          console.log("失败");
          console.log(data);
          this.$router.push("/404/");

        }
      );
    }
  }
}
