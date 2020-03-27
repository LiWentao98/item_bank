<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div class="in1">
        <div class="in2">
          <img src="../../assets/imgs/4.png" width="140px" height="170px" alt="">
        </div>
        <span class="main_title">研究生招生考试题库</span>
      </div>

      <div class="welcome_user">欢迎您：{{userType}}</div>
      <!--头像下拉组件-->
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <img src="../../assets/imgs/touxiang.png"/>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="message">个人信息</el-dropdown-item>
          <el-dropdown-item command="modPw">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
            <template slot="title">
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
              path: 'home/s_teacher/questions_store',
            }
          ]
        }, {
          id: 2,
          authName: '选题',
          children: [
            {
              id: 12,
              authName: '我的选题',
              path: 'home/s_teacher/my_topic',
            }
          ]
        }, {
          id: 3,
          authName: '试卷',
          children: [
            {
              id: 13,
              authName: '我的试卷',
              path: 'home/s_teacher/my_exam_papers',
            },
            {
              id: 16,
              authName: '组卷',
              path: 'home/s_teacher/compose'
            }
          ]
        }, {
          id: 4,
          authName: '试题',
          children: [
            {
              id: 14,
              authName: '上传试题',
              path: 'home/s_teacher/upload_question',
            },
            {
              id: 15,
              authName: '我的试题',
              path: 'home/s_teacher/my_questions',
            }
          ]
        }, {
          id: 5,
          authName: '个人详情',
          children: [
            {
              id: 16,
              authName: '我的信息',
              path: 'home/s_teacher/my_profile',
            }
          ]
        }, {
          id: 6,
          authName: '消息管理',
          children: [
            {
              id: 17,
              authName: '通知列表',
              path: 'home/s_teacher/message',
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
              path: 'home/r_teacher/n_r_questions'
            }
          ]
        }, {
          id: 3,
          authName: '消息管理',
          children: [
            {
              id: 13,
              authName: '通知列表',
              path: 'home/r_teacher/message'
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
            path: 'home/s_admin/f_admin_list',
          }, {
            id: 12,
            authName: '权限管理',
            path: 'home/s_admin/authority_manage',
          }]
        }, {
          id: 2,
          authName: '院系管理',
          children: [
            {
              d: 13,
              authName: '院系列表',
              path: 'home/s_admin/faculty_list',
            }
          ]
        }, {
          id: 4,
          authName: '消息管理',
          children: [
            {
              id: 15,
              authName: '通知列表',
              path: 'home/s_admin/message',
            },
            {
              id: 16,
              authName: '发送通知',
              path: 'home/s_admin/send_message'
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
            path: 'home/f_admin/teacher_list',
          }]
        }, {
          id: 2,
          authName: '专业管理',
          children: [
            {
              id: 12,
              authName: '专业列表',
              path: 'home/f_admin/major_manage',
            },
          ]
        }, {
          id: 5,
          authName: '学科管理',
          children: [
            {
              id: 15,
              authName: '学科列表',
              path: 'home/f_admin/subject_manage',
            }
          ]
        }, {
          id: 4,
          authName: '消息管理',
          children: [
            {
              id: 14,
              authName: '通知列表',
              path: 'home/f_admin/message',
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
            path: 'home/sp_admin/user_list',
          }]
        }, {
          id: 2,
          authName: '学校管理',
          children: [
            {
              d: 12,
              authName: '学校列表',
              path: 'home/sp_admin/school_list',
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
                path: 'home/sp_admin/user_type_list',
              },
            ]
          }, {
            id: 5,
            authName: '消息管理',
            children: [
              {
                id: 15,
                authName: '通知列表',
                path: 'home/sp_admin/message',
              },
              {
                id: 16,
                authName: '发送通知',
                path: 'home/sp_admin/send_message',
              },
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
        activePath: '',
        skipPath: ''
      }
    },
    created() {
      this.skipPath = this.routerStr()
      // 获取菜单列表
      this.getMenuList()
      // 从sessionStorage中拿到激活路径
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      // 判断用户类型，跳转到首页
      routerStr() {
        let c = parseInt(window.sessionStorage.getItem("token"))
        switch (c) {
          case 1:
            return 'home/s_teacher'
          case 2:
            return 'home/r_teacher'
          case 3:
            return 'home/s_admin'
          case 4:
            return 'home/f_admin'
          case 5:
            return 'home/sp_admin'
        }
      },
      handleCommand(command) {
        if (command === 'logout') {
          window.sessionStorage.clear();
          this.$router.push('/login')
          this.$message.success("已退出！")
        } else if (command === 'message') {
          this.$router.push('/' + this.skipPath + '/my_profile')
        } else if (command === 'modPw') {
          this.$router.push('/' + this.skipPath + '/change_password')
        }
      },
      // logout(command) {
      //   window.sessionStorage.clear();
      //   this.$router.push('/login')
      //   this.$message.success("已退出！")
      // },
      //  获取所有菜单
      getMenuList() {
        let a = parseInt(window.sessionStorage.getItem("token"))
        // console.log(a);
        if (a === 1) {
          this.menuList = this.data1
        } else if (a === 2) {
          this.menuList = this.data2
        } else if (a === 3) {
          this.menuList = this.data3
        } else if (a === 4) {
          this.menuList = this.data4
        } else {
          this.menuList = this.data5
        }
      },
      // 点击按钮切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    },
    computed: {
      isOpen() { // 折叠与展开显示
        if (this.isCollapse) return '展开'
        return '折叠'
      },
      userType() {
        let a = parseInt(window.sessionStorage.getItem("token"))
        switch (a) {
          case 1:
            return '命题教师'
          case 2:
            return '审题教师'
          case 3:
            return '校级管理员'
          case 4:
            return '院级管理员'
          case 5:
            return '超级管理员'
        }
      }
    }
  }
</script>

<style lang="less">
  .home-container {
    height: 100%;
  }

  .el-header {
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
      margin-left: 20px;
      span {
        margin-left: 15px;
      }
    }
    .in2 {
      position: relative;
      top: 10px;
      left: 10px;
    }
  }

  .main_title {
    font-family: '华文行楷';
    font-size: 30px;
  }

  .el-aside {
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

  .el-dropdown-link {
    margin-right: 10px;
  }

  .welcome_user {
    margin-top: 1px;
    font-size: 15px;
    position: absolute;
    right: 90px;
    top: 20px;
  }


</style>