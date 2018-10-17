import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import RoleManage from '@/views/user/RoleManage'
import UserManage from '@/views/user/UserManage'
import MenuManage from '@/views/user/MenuManage'
import OperateManage from '@/views/user/OperateManage'
import RoleRelMenu from '@/views/user/RoleRelMenu'
import RoleRelOperate from '@/views/user/RoleRelOperate'
import UserRelRole from '@/views/user/UserRelRole'


import page404 from '@/components/com/404'
import Login from '@/views/login'


Vue.use(Router)

//noinspection Eslint
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children:[{
        path: '/users/userManage',
        component:UserManage,
      },{
        path: '/users/roleManage',
        component:RoleManage,
      },{
        path: '/users/menuManage',
        component:MenuManage,
      },{
        path: '/users/operateManage',
        component:OperateManage,
      },{
        path: '/users/roleRelMenu',
        component:RoleRelMenu,
      },{
        path: '/users/roleRelOperate',
        component:RoleRelOperate,
      },{
        path: '/users/userRelRole',
        component:UserRelRole,
      },


        {
        path: '*',
        component:page404,
      },

      ]
    },

  ]
})
