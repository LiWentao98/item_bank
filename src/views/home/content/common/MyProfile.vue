<template>
  <div>
    <el-card class="card0">
      <h3 class="title">个人信息</h3>
      <img src="~assets/imgs/touxiang_2.png" alt="">
      <div>
        <el-link target="_blank">
          <span class="mod" @click="modMessage">修改信息</span>
        </el-link>
      </div>
      <!--个人信息显示-->
      <el-card shadow="always" class="card3">
        <div>
          <li class="common">我的昵称：{{profile.ni_name}}</li>
          <li class="common">我的姓名：{{profile.name}}</li>
          <li class="common">我的学校：{{profile.u_school}}</li>
          <li class="common">所属院系：{{profile.u_faculty}}</li>
          <li class="common">用户类型：{{profile.u_type}}</li>
          <li class="common">用户状态：{{profile.u_state}}</li>
          <li class="common">操作科目：{{profile.operate_subject}}</li>
          <li class="common">我的工号：{{profile.job_number}}</li>
          <li class="common">我的邮箱：{{profile.email}}</li>
          <li class="common">手机号：{{profile.telephone}}</li>
        </div>
      </el-card>

      <!--修改信息-->
      <el-dialog :visible.sync="modMessageDialog" width="40%" @close="modMessageClosed">
        <el-form :model="modMessageFormInfo" :rules="addFormRules" ref="addFormRef" label-width="100px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="modMessageFormInfo.email" filterable placeholder="请输入邮箱">
            </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="modMessageFormInfo.telephone" placeholder="请输入手机号">
            </el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modMessageCommit">确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Message",
    data() {
      return {
        spProfile: {
          ni_name: '我是超级管理员',
          name: '李大仙',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          u_type: '超级管理员',
          u_state: '正常',
          operate_subject: '无',
          job_number: '000001',
          email: '11111111111@qq.com',
          telephone: '11111111111'
        },
        sAProfile: {
          ni_name: '我是校级管理员',
          name: '李二仙',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          u_type: '校级管理员',
          u_state: '正常',
          operate_subject: '无',
          job_number: '000002',
          email: '11111111112@qq.com',
          telephone: '11111111112'
        },
        fAProfile: {
          ni_name: '我是院级管理员',
          name: '李三仙',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          u_type: '院级管理员',
          u_state: '正常',
          operate_subject: '无',
          job_number: '000003',
          email: '11111111113@qq.com',
          telephone: '11111111113'
        },
        rTProfile: {
          ni_name: '我是审题老师',
          name: '李四仙',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          u_type: '审题老师',
          u_state: '正常',
          operate_subject: '无',
          job_number: '000004',
          email: '11111111114@qq.com',
          telephone: '11111111114'
        },
        sTProfile: {
          ni_name: '我是命题老师',
          name: '李五仙',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          u_type: '命题老师',
          u_state: '正常',
          operate_subject: '数据结构',
          job_number: '000005',
          email: '11111111115@qq.com',
          telephone: '11111111115'
        },
        modMessageDialog: false,
        modMessageFormInfo: {},
        showAfterMod: {},
        profile: {}
      }
    },
    created() {
      this.getProfile()
    },
    methods: {
      getProfile() {
        let b = parseInt(window.sessionStorage.getItem("token"))
        switch (b) {
          case 1:
            this.profile = this.sTProfile
            this.modMessageFormInfo = this.sTProfile
            break
          case 2:
            this.profile = this.rTProfile
            this.modMessageFormInfo = this.rTProfile
            break
          case 3:
            this.profile = this.sAProfile
            this.modMessageFormInfo = this.sAProfile
            break
          case 4:
            this.profile = this.fAProfile
            this.modMessageFormInfo = this.fAProfile
            break
          case 5:
            this.profile = this.spProfile
            this.modMessageFormInfo = this.spProfile
        }
      },
      modMessageCommit() {
        let c = parseInt(window.sessionStorage.getItem("token"))
        this.showAfterMod = this.modMessageFormInfo
        switch (c) {
          case 1:
            this.sTProfile = this.showAfterMod
            break
          case 2:
            this.rTProfile = this.showAfterMod
            break
          case 3:
            this.sAProfile = this.showAfterMod
            break
          case 4:
            this.fAProfile = this.showAfterMod
            break
          case 5:
            this.spProfile = this.showAfterMod
        }
        this.getProfile()
        this.$message.success('修改成功')
        this.modMessageDialog = false
      },
      modMessageClosed() {
        this.modMessageDialog = false
      },
      modMessage() {
        this.modMessageDialog = true
      }
    }
  }
</script>

<style lang="less">
  .title {
    margin-top: 5px;
    font-size: 20px;
    color: #3d3d3d;
    height: 50px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
  }

  .card0 {
    height: 740px;

    .card3 {
      //margin-top: 100px;
      font-size: 15px;
      position: absolute;
      left: 395px;
      top: 190px;
      width: 1000px;
      height: 600px;
      background-color: #fdfdfd;
    }
  }

  .common {
    text-align: left;
    height: 55px;
    line-height: 36px;
    font-size: 18px;
    color: #4d4d4d;
  }

  .mod {
    color: blue;
    font-size: 18px;
    margin-left: 30px;
  }
</style>
