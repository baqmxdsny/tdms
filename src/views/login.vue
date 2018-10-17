
<template>
  <!--背景图-->
  <div class = "note" :style="note">

    <!--login框，表单+tab标签页的组合-->
    <div class = "loginFrame">

      <!--表单组件放在外面，标签栏在里面-->
      <el-form ref = "AccountForm" :model = "AccountForm" :rules = "rules2"  class = "demo-ruleForm login-container">

        <!--tab标签-->

        <div class = "formGroup">
          <el-form-item  label = "账号" prop = "username" >
            <el-input type = "text" v-model="AccountForm.username" autocomplete="off" placeholder = "请输入您的账号" class = "form-control" ></el-input></el-form-item>
          <el-form-item label = "密码" prop = "password" class = "form-inline">
            <el-input type = "password" v-model="AccountForm.password" autocomplete="off" placeholder = "请输入密码" class = "form-control" ></el-input></el-form-item>
        </div>
        <div class = "remFor">
          <el-checkbox v-model = "checked" class="remember" @change="rememberUserInfo">记住密码</el-checkbox>
          <a href ="'https://blog.csdn.net/Vanadis_outlook/article/details/72823024.html'" class = "forget">忘记密码？</a>
        </div>

        <div class = "formButton">
          <el-form-item style = "width:100%;">
            <el-button type = "primary" style = "width:100%;" @click="onSubmit">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>



<script>
export default {
  name: "login",
  data() {
    return {
      logining: false,
      note: {
        //          'min-width':'1000px',
        "min-height": "500px"
      },
      AccountForm: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入账号", trigger: ["blur", "change"] }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: false
    };
  },
  created: function() {
    console.log(screen);
    this.note["min-height"] = screen.availHeight - 100 + "px";
    //      this.note['min-width'] = screen.availWidth-100+'px';
    if (this.$utils.getUserInfo()) {
      this.AccountForm = this.$utils.getUserInfo();
    }
  },
  methods: {
    //      登录点击事件
    onSubmit() {
      console.log(this.AccountForm);
      var that = this;
      this.$api.post(
        "/login/",
        this.AccountForm,
        null,
        function success(data) {
          console.log("postsuccess");
          console.log(data);
          var token = "JWT " + data.token;
          that.$utils.storageToken(token);
          if (that.checked) {
            that.$utils.storageUserInfo(that.AccountForm);
          } else {
            that.$utils.delStorage("userInfo");
          }
          that.$router.push("/Main");
        },
        function fail(data) {
          console.log(data);
        },
        function errorMethod(data) {
          window.alert("账号密码错误");
        }
      );
    },
    //      是否记住密码点击事件
    rememberUserInfo(val) {
      console.log(val);
    }
  }
};
</script>

<style>
.note {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: url("../assets/girl.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 15px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label {
  width: 70px;
  text-align: left;
}

.form-control {
  width: 270px;
  flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
}
.remember {
  width: 250px;
  text-align: left;
}
.forget {
  width: 500px;
  text-align: right;
  font-size: 14px;
  font-family: PingFang SC;
}
.remFor {
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.tabsUser {
  display: inline-block;
  margin-left: 0px;
  margin-right: 0px;
  text-align: center;
  font-size: 25px;
}
</style>
