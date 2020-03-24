<template>
    <div class="login_container">
        <div class="login_box">
            <div class="title">研招网欢迎您</div>
            <el-form ref="loginFormRef" :model='loginForm' :rules="loginFormRules" label-width="0px" class="login_form">
                <!--学校-->
                <el-form-item prop="schools">
                    <el-select v-model="loginForm.value1" placeholder="请选择学校" filterable class="select_school"  no-match-text="没有匹配选项">
                        <el-option v-for="item in loginForm.schools" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--用户类型-->
                <el-form-item >
                    <el-select v-model="loginForm.value2" placeholder="请选择用户类型" class="select_type">
                        <el-option v-for="item in loginForm.types" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model='loginForm.username' prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input v-model='loginForm.password' prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <!--忘记密码-->
                <el-form-item class="forget">
                <el-link target="_blank">忘记密码？</el-link>
                </el-form-item>
                <!--按钮区域-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        // 登录表单中的数据
        loginForm: {
          msg: '',
          schools: [{
            value: '1',
            label: '长江大学'
          }, {
            value: '2',
            label: '三峡大学'
          }, {
            value: '3',
            label: '武汉大学'
          }, {
            value: '4',
            label: '武汉纺织大学'
          }, {
            value: '5',
            label: '湖北大学'
          }],
          value1: '',
          value2: '',
          types: [{value: '1', label: '教师'}, {value: '2', label: '管理员'}],
          username: 'admin',
          password: '123456'
        },
        // 表单的验证规则对象
        loginFormRules: {
          // 验证用户名是否合法
          username: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          // 验证密码是否合法
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
          ]
        }
      }

    },
    methods: {
      // 点击重置按钮，重置表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      login() {
        let res = this.loginForm
        // console.log(res.value1);
        // console.log(res.value2);
        // console.log(res.value2);
        if (res.value1.length === 0 || res.value2.length === 0) {
          return this.$message.error('请选择您的学校或用户类型！')
        }else if (res.username === 'admin' && res.password === '123456') {
          // 数据静态定义
          // 编程时导航跳转到主页
          this.$router.push("/home")
          return this.$message.success('登陆成功！')
        }else{
          return this.$message.error('用户名或密码错误！')
        }
        // this.$refs.loginFormRef.validate(async valid => {
        //   if(!valid) return;
        //   const { data: res } = await this.$http.post('login', this.loginForm);
        //   if (res.meta.status !== 200) return this.$message.error('登录失败')
        //   this.$message.success('登陆成功')
        //   // 登陆成功后将token添加到sessionStorage中
        //   window.sessionStorage.setItem("token", res.data.token)
        //   // 编程时导航跳转到主页
        //   this.$router.push("/home")
        // })
      }
    }
  }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 450px;
        background-color: #fff;
        // 圆角
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .title{
        position: absolute;
        left: 25%;
        top: 10%;
        color: #409eff;
        font-weight: 700;
        font-size: 35px;
        margin-bottom: 20px;
        text-align: center;
    }

    .btns {
        display: flex;
        /*尾部对齐*/
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        /*防止输入框右边超出*/
        box-sizing: border-box;
    }

    .select_school, .select_type {
        width: 100%;
    }

    .forget {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
    }
</style>