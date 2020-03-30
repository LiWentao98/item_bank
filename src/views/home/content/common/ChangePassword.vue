<template>
  <div>
    <el-card class="card0">
      <h3 class="title">修改密码</h3>
      <img src="../../../../assets/imgs/touxiang_2.png" alt="">
      <el-card shadow="always" class="card1">
        <el-form ref="modPwForm" :model="modPwInfo" label-width="100px" style="margin-top: 15px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="旧密码">
                <el-input v-model="modPwInfo.oldPw" placeholder="请输入旧密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="新密码">
                <el-input v-model="modPwInfo.newPw" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="确认密码">
                <el-input v-model="modPwInfo.rNewPw" placeholder="请输入新密码" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div align="center">
                <el-button type="primary" @click="modifyPw">确认修改</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Message",
    data() {
      return {
        modPwInfo: {
          oldPw: '',
          newPw: '',
          rNewPw: ''
        }
      }
    },
    created() {

    },
    methods: {
      modifyPw() {
        this.$message.success('修改成功！')
        this.$router.push('/login')
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

    .card1 {
      //margin-top: 100px;
      font-size: 15px;
      position: absolute;
      left: 395px;
      top: 190px;
      width: 700px;
      height: 400px;
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

  .common_input {

  }
</style>
