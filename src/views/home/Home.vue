<template>
    <el-container class="home-container">
        <!--头部区域-->
        <el-header>
            <div class="in1">
                <img src="../../assets/imgs/shitiku.png" alt="">
                <span class="main_title">研究生招生考试题库</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--页面主体区域-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse ? '64px':'200px'">
                <!--折叠按钮-->
                <div class="toggle-button" @click="toggleCollapse">{{isOpen}}</div>
                <!--侧边栏菜单区域-->
                <el-menu background-color="#333744"
                         text-color="#fff"
                         active-text-color="#409eff" :unique-opened="true" :collapse="isCollapse"
                         :collapse-transition="false" :router="true" :default-active="activePath">
                    <!--一级菜单-->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!--一级菜单的模板区域-->
                        <template slot="title" >
                            <!--图标-->
                            <i :class="iconsObj[item.id]"></i>
                            <!--文本-->
                            <span>{{item.authName}}</span>
                        </template>

                        <!--二级菜单-->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children"
                                      :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <!--图标-->
                                <i class="el-icon-location"></i>
                                <!--文本-->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧内容主体-->
            <el-main>
                <!--路由占位符，为了显示子组件-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        // 左侧菜单数据
        menuList: [],
        // 命题教师对应的列表菜单
        data1: [{
          id: 1,
          authName: '题库',
          children: [
            {
              id: 11,
              authName: '实时题库',
              path: 's_teacher/s_questions_store',
            }
          ]
        }, {
          id: 2,
          authName: '选题',
          children: [
            {
              id: 12,
              authName: '我的选题',
              path: 's_teacher/s_my_topic',
            }
          ]
        }, {
          id: 3,
          authName: '试卷',
          children: [
            {
              id: 13,
              authName: '我的试卷',
              path: 's_teacher/s_my_exam_papers',
            },
            {
              id: 16,
              authName: '组卷',
              path: 's_teacher/s_compose'
            }
          ]
        }, {
          id: 4,
          authName: '试题',
          children: [
            {
              id: 14,
              authName: '上传试题',
              path: 's_teacher/s_upload_question',
            },
            {
              id: 15,
              authName: '我的试题',
              path: 's_teacher/s_my_questions',
            }
          ]
        }, {
          id: 5,
          authName: '个人详情',
          children: [
            {
              id: 16,
              authName: '我的信息',
              path: 's_teacher/s_my_profile',
            }
          ]
        }, {
          id: 6,
          authName: '消息管理',
          children: [
            {
              id: 17,
              authName: '通知',
              path: 's_teacher/s_message',
            }
          ]
        }],

        // 审题教师菜单列表
        data2: [{
          id: 1,
          authName: '审核管理',
          children: [
            {
              id: 11,
              authName: '待审核试题',
              path: 'r_teacher/n_r_questions'
            }
          ]
        }, {
          id: 2,
          authName: '个人详情',
          children: [
            {
              id: 12,
              authName: '我的信息',
              path: 'r_teacher/r_my_profile'
            }
          ]
        }, {id: 3,
          authName: '消息管理',
          children: [
            {
              id: 13,
              authName: '通知',
              path: 'r_teacher/r_message'
            }
          ]
        }
      ],

        // 校级管理员对应的菜单
        data3: [{
          id: 1,
          authName: '用户管理',
          children: [{
            id: 11,
            authName: '用户列表',
            path: 's_admin/f_admin_list',
          }, {
            id: 12,
            authName: '权限管理',
            path: 's_admin/s_admin_authority_manage',
          }]
        }, {
          id: 2,
          authName: '学校管理',
          children: [
            {
              d: 13,
              authName: '学校列表',
              path: 's_admin/school_list',
            }
          ]
        }, {
          id: 3,
          authName: '个人详情',
          children: [
            {
              id: 14,
              authName: '我的信息',
              path: 's_admin/s_admin_profile',
            }
          ]
        }, {
          id: 4,
          authName: '消息管理',
          children: [
            {
              id: 15,
              authName: '通知',
              path: 's_admin/s_admin_message',
            }
          ]
        }],

        // 院级管理员对应的菜单
        data4: [{
          id: 1,
          authName: '教师管理',
          children: [{
            id: 11,
            authName: '教师列表',
            path: 'f_admin/teacher_list',
          }]
        }, {
          id: 2,
          authName: '专业学科管理',
          children: [
            {
              d: 12,
              authName: '专业学科列表',
              path: 'f_admin/f_profession_manage',
            },
          ]
        }, {
          id: 3,
          authName: '个人详情',
          children: [
            {
              id: 13,
              authName: '我的信息',
              path: 'f_admin/s_admin_profile',
            }
          ]
        }, {
          id: 4,
          authName: '消息管理',
          children: [
            {
              id: 14,
              authName: '通知',
              path: 'f_admin/s_admin_message',
            }
          ]
        }],

        // 超级管理员对应的菜单
        data5: [{
          id: 1,
          authName: '用户管理',
          children: [{
            id: 11,
            authName: '用户列表',
            path: 'sp_admin/sp_user_list',
          }]
        }, {
          id: 2,
          authName: '学校管理',
          children: [
            {
              d: 12,
              authName: '学校列表',
              path: 'sp_admin/sp_school_list',
            },
          ]
        },
          {
            id: 3,
            authName: '用户类型管理',
            children: [
              {
                d: 13,
                authName: '用户类型列表',
                path: 'sp_admin/sp_user_type_list',
              },
            ]
          }, {
          id: 4,
          authName: '个人详情',
          children: [
            {
              id: 14,
              authName: '我的信息',
              path: 'sp_admin/sp_admin_profile',
            }
          ]
        }, {
          id: 5,
          authName: '消息管理',
          children: [
            {
              id: 15,
              authName: '通知',
              path: 'sp_admin/sp_admin_message',
            }
          ]
        }],
        iconsObj: {
          '1': 'iconfont icon-user',
          '2': 'iconfont icon-tijikongjian',
          '3': 'iconfont icon-shangpin',
          '4': 'iconfont icon-danju',
          '5': 'iconfont icon-baobiao',
          '6': 'iconfont icon-danju',
        },
        // 是否折叠
        isCollapse: false,
        // 当前子路由的路径，即激活路径
        activePath: ''
      }
    },
    created() {
      // 获取菜单列表
      this.getMenuList()
      // 从sessionStorage中拿到激活路径
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$router.push('/login')
        this.$message.success("已退出！")
      },
      //  获取所有菜单
      getMenuList() {
        let a = parseInt(window.sessionStorage.getItem("token"))
        // console.log(a);
        if (a === 1) {
          this.menuList = this.data1
        }else if(a === 2) {
          this.menuList = this.data2
        }else if(a === 3) {
          this.menuList = this.data3
        }else if(a === 4) {
          this.menuList = this.data4
        }else {
          this.menuList = this.data5
        }
      },
      // 点击按钮切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath
      }
    },
    computed:{
      isOpen(){ // 折叠与展开显示
        if(this.isCollapse) return '展开'
        return '折叠'
      }
    }
  }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        /*让文本居中*/
        align-items: center;
        /*字体*/
        color: #fff;
        font-size: 20px;
        .in1 {
            display: flex;
            align-items: center;
            margin-left: 50px;
            span {
                margin-left: 15px;
            }
        }
    }

    .main_title {
        font-family: '华文行楷';
        font-size: 30px;
    }

    .el-aside{
        background-color: #333744;
        .el-menu {
            // 去掉边框多出的问题
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    /*一级菜单图标和文本设置间距*/
    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        // 放上去变小手
        cursor: pointer;
    }
</style>