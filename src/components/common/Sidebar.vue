<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.menu_href" :key="item.menu_href">
                        <template slot="title">
                            <i :class="item.menu_icon"></i><span slot="title">{{ item.menu_name }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.menu_href" :key="subItem.menu_href">
                                <template slot="title">{{ subItem.menu_name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.menu_href">
                                    {{ threeItem.menu_name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.menu_href" :key="subItem.menu_href">
                                {{ subItem.menu_name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.menu_href" :key="item.menu_href">
                        <i :class="item.menu_icon"></i><span slot="title">{{ item.menu_name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                ],
                other:{
                    menu_icon: 'el-icon-lx-searchlist',
                    menu_href: '0',
                    menu_name: '其他组件',
                    subs: [
                        {
                            menu_href: 'form',
                            menu_name: '基本表单'
                        },
                        {
                            icon: 'el-icon-lx-home',
                            menu_href: 'dashboard',
                            menu_name: '系统首页'
                        },
                        {
                            icon: 'el-icon-lx-cascades',
                            menu_href: 'table',
                            menu_name: '基础表格'
                        },
                        {
                            icon: 'el-icon-lx-copy',
                            menu_href: 'tabs',
                            menu_name: 'tab选项卡'
                        },
                        {
                            icon: 'el-icon-lx-emoji',
                            menu_href: 'icon',
                            menu_name: '自定义图标'
                        },
                        {
                            icon: 'el-icon-lx-favor',
                            menu_href: 'charts',
                            menu_name: 'schart图表'
                        },
                        {
                            icon: 'el-icon-rank',
                            menu_href: 'drag',
                            menu_name: '拖拽列表'
                        },
                        {
                            icon: 'el-icon-lx-warn',
                            menu_href: '9',
                            menu_name: '错误处理',
                            subs: [
                                {
                                    menu_href: 'permission',
                                    menu_name: '权限测试'
                                },
                                {
                                    menu_href: '404',
                                    menu_name: '404页面'
                                }
                            ]
                        },
                        {
                            menu_href: '3-2',
                            menu_name: '三级菜单',
                            subs: [
                                {
                                    menu_href: 'editor',
                                    menu_name: '富文本编辑器'
                                },
                                {
                                    menu_href: 'markdown',
                                    menu_name: 'markdown编辑器'
                                },
                            ]
                        },
                        {
                            menu_href: 'upload',
                            menu_name: '文件上传'
                        }
                    ]
                },
                list:[
                    {
                        "id": 22,
                        "menu_name": "用户权限",
                        "menu_href": "1",
                        "menu_icon": "el-icon-lx-people",
                        "tree_sort": 100,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 23,
                        "menu_name": "用户管理",
                        "menu_href": "user_management",
                        "menu_icon": "",
                        "tree_sort": 110,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 22
                    },
                    {
                        "id": 100,
                        "menu_name": "角色管理",
                        "menu_href": "menu_management",
                        "menu_icon": "",
                        "tree_sort": 130,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 22
                    },
                    {
                        "id": 101,
                        "menu_name": "菜单管理",
                        "menu_href": "menu_management",
                        "menu_icon": "",
                        "tree_sort": 140,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 22
                    },
                    
                    {
                        "id": 24,
                        "menu_name": "角色权限",
                        "menu_href": "menu_management",
                        "menu_icon": "",
                        "tree_sort": 120,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 22
                    },
                    {
                        "id": 25,
                        "menu_name": "系统管理",
                        "menu_href": "2",
                        "menu_icon": "el-icon-lx-apps",
                        "tree_sort": 200,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 26,
                        "menu_name": "项目组管理",
                        "menu_href": "projectPortfolioManagement",
                        "menu_icon": "",
                        "tree_sort": 210,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 25
                    },
                    {
                        "id": 27,
                        "menu_name": "样品类型管理",
                        "menu_href": "sampleTypemManagement",
                        "menu_icon": "",
                        "tree_sort": 220,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 25
                    },
                    {
                        "id": 28,
                        "menu_name": "测试依据",
                        "menu_href": "testStandardManagement",
                        "menu_icon": "",
                        "tree_sort": 230,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 25
                    },
                    {
                        "id": 29,
                        "menu_name": "测试项目",
                        "menu_href": "testItemManagement",
                        "menu_icon": "",
                        "tree_sort": 240,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 25
                    },
                    {
                        "id": 30,
                        "menu_name": "测试类别管理",
                        "menu_href": "testCategoryManagement",
                        "menu_icon": "",
                        "tree_sort": 250,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 25
                    },
                    {
                        "id": 31,
                        "menu_name": "样品储位管理",
                        "menu_href": "sampleStorageManagement",
                        "menu_icon": "",
                        "tree_sort": 260,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 25
                    },
                    {
                        "id": 32,
                        "menu_name": "测试资源",
                        "menu_href": "3",
                        "menu_icon": "el-icon-lx-calendar",
                        "tree_sort": 300,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 33,
                        "menu_name": "实验室设备能力",
                        "menu_href": "laboratoryEquipmentCapability",
                        "menu_icon": "",
                        "tree_sort": 310,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 32
                    },
                    {
                        "id": 34,
                        "menu_name": "设备台账",
                        "menu_href": "equipmentlLedger",
                        "menu_icon": "",
                        "tree_sort": 320,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 32
                    },
                    {
                        "id": 35,
                        "menu_name": "收样管理",
                        "menu_href": "4",
                        "menu_icon": "el-icon-lx-copy",
                        "tree_sort": 400,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 36,
                        "menu_name": "样品确认",
                        "menu_href": "confirmationoOfSample",
                        "menu_icon": "",
                        "tree_sort": 410,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 35
                    },
                    {
                        "id": 37,
                        "menu_name": "样品接收",
                        "menu_href": "sampleReceive",
                        "menu_icon": "",
                        "tree_sort": 420,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 35
                    },
                    {
                        "id": 38,
                        "menu_name": "样品领取",
                        "menu_href": "sampleRent",
                        "menu_icon": "",
                        "tree_sort": 430,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 35
                    },
                    {
                        "id": 39,
                        "menu_name": "样品归还",
                        "menu_href": "sampleReturn",
                        "menu_icon": "",
                        "tree_sort": 440,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 35
                    },
                    {
                        "id": 40,
                        "menu_name": "排配系统",
                        "menu_href": "5",
                        "menu_icon": "el-icon-lx-sort",
                        "tree_sort": 500,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 41,
                        "menu_name": "样品排配",
                        "menu_href": "SampleFillet",
                        "menu_icon": "",
                        "tree_sort": 510,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 40
                    },
                    {
                        "id": 42,
                        "menu_name": "通道信息",
                        "menu_href": "channelInfo",
                        "menu_icon": "",
                        "tree_sort": 520,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 40
                    },
                    {
                        "id": 43,
                        "menu_name": "测试任务",
                        "menu_href": "6",
                        "menu_icon": "el-icon-lx-edit",
                        "tree_sort": 600,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 44,
                        "menu_name": "待领样",
                        "menu_href": "waitGetSamples",
                        "menu_icon": "",
                        "tree_sort": 610,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 43
                    },
                    {
                        "id": 45,
                        "menu_name": "待测试",
                        "menu_href": "waitTest",
                        "menu_icon": "",
                        "tree_sort": 620,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 43
                    },
                    {
                        "id": 46,
                        "menu_name": "测试中",
                        "menu_href": "testInProcess",
                        "menu_icon": "",
                        "tree_sort": 630,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 43
                    },
                    {
                        "id": 47,
                        "menu_name": "数据审核",
                        "menu_href": "7",
                        "menu_icon": "el-icon-lx-punch",
                        "tree_sort": 700,
                        "tree_level": 1,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": null
                    },
                    {
                        "id": 48,
                        "menu_name": "数据审理",
                        "menu_href": "dataAuditing",
                        "menu_icon": "",
                        "tree_sort": 710,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 47
                    },
                    {
                        "id": 49,
                        "menu_name": "异常处理",
                        "menu_href": "exceptionHandling",
                        "menu_icon": "",
                        "tree_sort": 720,
                        "tree_level": 2,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 47
                    },
                    {
                        "id": 50,
                        "menu_name": "样品异常",
                        "menu_href": "SamplesAbnormal",
                        "menu_icon": "",
                        "tree_sort": 721,
                        "tree_level": 3,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 49
                    },
                    {
                        "id": 51,
                        "menu_name": "测试数据异常",
                        "menu_href": "testDataException",
                        "menu_icon": "",
                        "tree_sort": 722,
                        "tree_level": 3,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 49
                    },
                    {
                        "id": 52,
                        "menu_name": "设备异常处理",
                        "menu_href": "deviceExceptionHandling",
                        "menu_icon": "",
                        "tree_sort": 723,
                        "tree_level": 3,
                        "is_show": 1,
                        "status": 0,
                        "remarks": "",
                        "parent": 49
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        async created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });

        //    this.items = this.filterArray(this.list); //本地数据
            this.items =  await this.getdatalist(); // 服务器数据
            this.items.push(this.other);



        },
        mounted:function(){
//


        },
        methods:{
            filterArray(data, parent) {
                let vm = this;
                var tree = [];
                var temp;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent == parent) {
                        var obj = data[i];
                        temp = vm.filterArray(data, data[i].id);
                        if (temp.length > 0) {
                            obj.subs = temp;
                        }
                        tree.push(obj);
                    }
                }
                return tree;
            },
            async getdatalist(){
               let vm =this;
               let list = await vm.$fetch(vm.$path+"users/menu/",{});
               console.log(list);
                if(list.dataInfo.listData){
                  return  vm.filterArray(list.dataInfo.listData);
                }
            }



        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
