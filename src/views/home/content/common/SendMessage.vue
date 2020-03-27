<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布通知</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片1-->
    <el-card>
      <div align="center" style="font-size: 20px">发布通知</div>
      <el-form class="msg_form" ref="sendMsgForm" :model="sendMsgForm" label-width="100px" style="margin-top: 15px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="通知标题">
              <el-input max v-model="sendMsgForm.n_title" placeholder="请在此输入通知标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="通知内容">
              <el-input type="textarea" rows="20" v-model="sendMsgForm.n_content" placeholder="请在此输入通知内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div align="center">
              <el-button type="primary" @click="addMsg">发布</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 添加表单数据
        sendMsgForm: {
          n_title: '',
          n_content: '',
          publish_time: '',
        },
      }
    },
    created() {
    },
    methods: {
      // 点击按钮，发布通知
      addMsg() {
        // this.addFAdminInfo.u_id = parseInt(this.fAdminList[this.fAdminList.length - 1].u_id) + 1
        // this.fAdminList.push(this.addFAdminInfo)
        // console.log(this.schoolList);
        // 隐藏添加用户的对话框
        // this.addDialogVisible = false
        let newDate = new Date();
        this.sendMsgForm.publish_time = newDate.toLocaleString();
        console.log(this.sendMsgForm);
        this.$message.success('发布成功！')
      },
    }
  }
</script>

<style lang="less">
  .msg_form {
    margin-top: 100px;
  }
</style>
