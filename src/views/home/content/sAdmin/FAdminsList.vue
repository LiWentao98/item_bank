<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片1-->
    <el-card>
      <div align="center">院级管理员查询</div>

      <el-form ref="userSearchForm" :model="searchFAdminForm" label-width="100px" style="margin-top: 15px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户状态">
              <el-select v-model="searchFAdminForm.u_state" placeholder="请选择用户状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="限制登录" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属院系">
              <el-select v-model="searchFAdminForm.u_faculty" placeholder="请选择院系">
                <el-option label="计算机科学学院" value="1"></el-option>
                <el-option label="电子信息学院" value="2"></el-option>
                <el-option label="机械学院" value="3"></el-option>
                <el-option label="石油学院" value="4"></el-option>
                <el-option label="农学院" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input v-model="searchFAdminForm.name" placeholder="请输入用户姓名" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div align="center">
              <el-button type="primary">检索用户</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--卡片2-->
    <el-card class="card2">
      <div align="center">检索结果</div>

      <!-- 用户列表区域 -->
      <el-table :data="fAdminList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="所在院系" prop="u_faculty"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="telephone"></el-table-column>
        <el-table-column label="职工号" prop="job_number"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="用户状态" prop="u_state"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 详情按钮 -->
            <el-button type="primary" size="mini">详情</el-button>
            <el-tooltip class="item" effect="dark" content="删除院级管理员" placement="right">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="removeUserById(scope.row.u_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-row :gutter="20">
        <el-col :span="21">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5]" :page-size="queryInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
        <el-col :span="3">
          <el-tooltip class="item" effect="dark" content="新添院级管理员" placement="right">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-tooltip>
        </el-col>
      </el-row>

    </el-card>

    <!-- 添加院级管理员的对话框 -->
    <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <div align="center">
        <el-tag class="title_a">添加院级管理员</el-tag>
      </div>
      <!-- 内容主体区域 -->
      <el-form :model="addFAdminInfo" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="所属学校" prop="uSchool">
          <el-select v-model="searchFAdminForm.u_school" disabled placeholder="长江大学">
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" prop="uType">
          <el-select v-model="addFAdminInfo.u_faculty" disabled placeholder="院级管理员">
          </el-select>
        </el-form-item>
        <el-form-item label="所属院系" prop="uFaculty">
          <el-select v-model="addFAdminInfo.u_faculty" filterable placeholder="请选择/搜索院系">
            <el-option label="文学院" value="6"></el-option>
            <el-option label="园艺园林学院" value="7"></el-option>
            <el-option label="法学院" value="8"></el-option>
            <el-option label="经济学院" value="9"></el-option>
            <el-option label="体育学院" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addFAdminInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="职工号" prop="jobNumber">
          <el-input v-model="addFAdminInfo.job_number"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="addFAdminInfo.id_number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFAdminInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="绑定手机号" prop="telephone">
          <el-input v-model="addFAdminInfo.telephone"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSchool">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchFAdminForm: {
          name: '',
          u_faculty: '',
          u_state: ''
        },
        // 获取用户列表的参数对象
        queryInfo: {
          query: '',
          // 当前的页数
          pageNum: 1,
          // 当前每页显示多少条数据
          pageSize: 2
        },
        fAdminList: [{
          u_id: '1',
          u_faculty: '计算机科学学院',
          name: '计1',
          telephone: '11111111111',
          job_number: '000001',
          email: '11111111111@qq.com',
          u_state: '正常',
        }, {
          u_id: '2',
          u_faculty: '电子信息学院',
          name: '电2',
          telephone: '22222222222',
          job_number: '000002',
          email: '22222222222@qq.com',
          u_state: '正常',
        }, {
          u_id: '3',
          u_faculty: '机械学院',
          name: '机3',
          telephone: '33333333333',
          job_number: '000003',
          email: '33333333333@qq.com',
          u_state: '正常',
        }, {
          u_id: '4',
          u_faculty: '石油学院',
          name: '石4',
          telephone: '44444444444',
          job_number: '000004',
          email: '44444444444@qq.com',
          u_state: '限制登录',
        }, {
          u_id: '5',
          u_faculty: '农学院',
          name: '农5',
          telephone: '55555555555',
          job_number: '000005',
          email: '55555555555@qq.com',
          u_state: '正常',
        }],
        total: 0,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 添加用户的表单数据
        addFAdminInfo: {
          u_school: '长江大学',
          u_type: '院级管理员',
          u_faculty: '',
          name: '',
          job_number: '',
          id_number: '',
          email: '',
          telephone: '',
        },
        // 添加表单的验证规则对象
        addFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {
              min: 3,
              max: 10,
              message: '用户名的长度在3~10个字符之间',
              trigger: 'blur'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              min: 6,
              max: 15,
              message: '用户名的长度在6~15个字符之间',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.total = this.fAdminList.length
    },
    methods: {
      cellStyle() {
        return 'font-size: 15px'
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getFAdminList()
      },
      async removeUserById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        // 如果用户确认删除，则返回值为字符串 confirm
        // 如果用户取消了删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }

        this.fAdminList.splice(id - 1, 1)
        this.$message.success('删除用户成功！')
        this.getFAdminList()
      },
      getFAdminList() {
        this.total = this.fAdminList.length
        console.log(this.total);
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getFAdminList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getFAdminList()
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加学校
      addSchool() {
        this.addFAdminInfo.u_id = parseInt(this.fAdminList[this.fAdminList.length - 1].u_id) + 1
        this.fAdminList.push(this.addFAdminInfo)
        // console.log(this.schoolList);
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        this.$message.success('添加成功！')
      },
    }
  }
</script>

<style lang="less">
  .cell {
    font-size: 15px;
  }

  .el-select, .el-input {
    width: 285.69px;
  }

  .card2 {
    margin-top: 10px;
  }

  .el-form {
    margin-top: 20px;
  }

  .title_a {
    font-size: 20px;
  }
</style>
