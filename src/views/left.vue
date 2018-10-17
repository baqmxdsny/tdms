<template>
  <el-menu
    default-active="2"
    router
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="/manage" v-show="urlList.indexOf('/manage')!=-1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>系统管理</span>
      </template>
      <!--<el-menu-item-group title="分组2">-->
        <!--<template slot="title">用户管理</template>-->
        <el-menu-item index="/users/userManage" v-show="urlList.indexOf('/users/userManage')!=-1">用户管理</el-menu-item>
        <el-menu-item index="/users/menuManage" v-show="urlList.indexOf('/users/menuManage')!=-1">菜单管理</el-menu-item>
        <el-menu-item index="/users/roleManage" v-show="urlList.indexOf('/users/roleManage')!=-1">角色管理</el-menu-item>
        <el-menu-item index="/users/operateManage" v-show="urlList.indexOf('/users/operateManage')!=-1">操作管理</el-menu-item>
        <el-menu-item index="/users/userRelRole" v-show="urlList.indexOf('/users/userRelRole')!=-1">用户角色关联</el-menu-item>
        <el-menu-item index="/users/roleRelMenu" v-show="urlList.indexOf('/users/roleRelMenu')!=-1">角色菜单关联</el-menu-item>
        <el-menu-item index="/users/roleRelOperate" v-show="urlList.indexOf('/users/roleRelOperate')!=-1">角色操作关联</el-menu-item>


      <!--</el-menu-item-group>-->
      <!--<el-menu-item-group title="分组2">-->
        <!--<template slot="title">用户管理</template>-->

      <!--</el-menu-item-group>-->
      <!--<el-submenu index="1-4">-->
        <!--<template slot="title">选项4</template>-->
      <!--</el-submenu>-->

    </el-submenu>
    <el-menu-item index="2" @click="isShow=!isShow">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" :disabled="isShow"  >
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      token: "",
      isShow: true,
      menuList: [],
      urlList: ["manage"]
    };
  },
  created: function() {
    this.token = this.$utils.getToken();
  },
  mounted: function() {
    console.log("mounted");
    var that = this;

    this.$api.get(
      "/users/userMenu/",
      null,
      that.token,
      function success(data) {
        console.log("成功");
        that.menuList = data.DataInfo.listData;
        console.log(that.menuList)

        var urlList = [];
        for (var index in that.menuList) {
          urlList.push(that.menuList[index]["menu_href"]);
        }
        that.urlList = urlList;
        console.log(urlList)
      },
      function fail(data) {
        console.log("失败");
        console.log(data);
      }
    );
  },
  method: {}
};
</script>

<style>
</style>
