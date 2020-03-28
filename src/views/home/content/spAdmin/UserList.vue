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
      <el-form ref="userSearchForm" :model="searchForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户id">
              <el-input class="common_input" v-model="searchForm.u_id" placeholder="请输入用户id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input class="common_input" v-model="searchForm.name" placeholder="请输入用户姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户职工号">
              <el-input class="common_input" v-model="searchForm.job_number" placeholder="请输入用户职工号"
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户状态">
              <el-select class="common_select" v-model="searchForm.u_state" placeholder="请选择用户状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="限制登录" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属学校">
              <el-select class="common_select" v-model="searchForm.u_school" filterable placeholder="请选择/搜索院校">
                <el-option label="长江大学" value="1"></el-option>
                <el-option label="三峡大学" value="2"></el-option>
                <el-option label="武汉大学" value="3"></el-option>
                <el-option label="武汉纺织大学" value="4"></el-option>
                <el-option label="湖北大学" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户类型">
              <el-select class="common_select" v-model="searchForm.u_type" placeholder="请选择用户类型">
                <el-option label="超级管理员" value="1"></el-option>
                <el-option label="校级管理员" value="2"></el-option>
                <el-option label="院级管理员" value="3"></el-option>
                <el-option label="审题教师" value="4"></el-option>
                <el-option label="命题教师" value="5"></el-option>
              </el-select>
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
      <el-table :data="sAdminList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户类型" prop="u_type"></el-table-column>
        <el-table-column label="所在学校" prop="u_school"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="telephone"></el-table-column>
        <el-table-column label="职工号" prop="job_number"></el-table-column>
        <el-table-column label="邮箱" prop="email" min-width="180px"></el-table-column>
        <el-table-column label="用户状态" prop="u_state"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 详情按钮 -->
            <el-button type="primary" size="mini" @click="openShowSAdminDetailDialog(scope.row)">详情</el-button>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除用户" placement="right">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="removeUserById(scope.row.u_id)">删除
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-row :gutter="20">
        <el-col :span="21">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5]" :page-size="queryInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
        <el-col :span="3">
          <div style="margin-top: 5px">
            <el-tooltip class="item" effect="dark" content="添加校级管理员" placement="right">
              <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!--详情-->
    <el-dialog :visible.sync="showSAdminDialog" width="40%" @close="showSAdminDetailsClosed">
      <div class="details">
        <div align="center"><h3>用户信息</h3></div>
        <el-row>
          <el-col :span="12">
            用户姓名：{{showSAdminDetailsInfo.name}}
          </el-col>
          <el-col :span="12">
            所属学校：{{showSAdminDetailsInfo.u_school}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            所属院系：{{showSAdminDetailsInfo.u_faculty}}
          </el-col>
          <el-col :span="12">
            用户类型：{{showSAdminDetailsInfo.u_type}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            用户状态：{{showSAdminDetailsInfo.u_state}}
          </el-col>
          <el-col :span="12">
            操作科目：{{showSAdminDetailsInfo.operate_subject}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            用户工号：{{showSAdminDetailsInfo.job_number}}
          </el-col>
          <el-col :span="12">
            绑定邮箱：{{showSAdminDetailsInfo.email}}
          </el-col>
        </el-row>
        <el-row>
          绑定手机：{{showSAdminDetailsInfo.telephone}}
        </el-row>
      </div>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSAdminDialog = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 添加校级管理员的对话框 -->
    <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <div align="center">
        <el-tag class="title_a">添加校级管理员</el-tag>
      </div>
      <!-- 内容主体区域 -->
      <el-form :model="addSAdminInfo" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="所属学校" prop="uSchool">
          <el-select v-model="addSAdminInfo.u_school" filterable placeholder="请选择/搜索学校">
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addSAdminInfo.name" placeholder="请输入姓名">
          </el-input>
        </el-form-item>
        <el-form-item label="绑定手机号" prop="telephone">
          <el-input v-model="addSAdminInfo.telephone" placeholder="请输入电话号码">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addSAdminInfo.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchForm: {
          u_id: '',
          name: '',
          job_number: '',
          u_school: '',
          u_type: '',
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
        sAdminList: [{
          u_id: '1',
          u_type: '超级管理员',
          u_school: '长江大学',
          name: '测试1',
          operate_subject: '无',
          u_faculty: '计算机科学学院',
          telephone: '11111111111',
          job_number: '000001',
          email: '11111111111@qq.com',
          u_state: '正常',
        }, {
          u_id: '2',
          u_type: '校级管理员',
          u_school: '长江大学',
          name: '测试2',
          operate_subject: '无',
          u_faculty: '计算机科学学院',
          telephone: '22222222222',
          job_number: '000002',
          email: '22222222222@qq.com',
          u_state: '正常',
        }, {
          u_id: '3',
          u_type: '院级管理员',
          u_school: '长江大学',
          name: '测试3',
          operate_subject: '无',
          u_faculty: '计算机科学学院',
          telephone: '33333333333',
          job_number: '000003',
          email: '33333333333@qq.com',
          u_state: '正常',
        }, {
          u_id: '4',
          u_type: '审题教师',
          u_school: '长江大学',
          name: '测试4',
          u_faculty: '计算机科学学院',
          telephone: '44444444444',
          job_number: '000004',
          operate_subject: '五',
          email: '44444444444@qq.com',
          u_state: '限制登录',
        }, {
          u_id: '5',
          u_type: '命题教师',
          u_school: '长江大学',
          name: '测试5',
          operate_subject: '数据结构',
          u_faculty: '计算机科学学院',
          telephone: '55555555555',
          job_number: '000005',
          email: '55555555555@qq.com',
          u_state: '正常',
        }],
        total: 0,
        showSAdminDialog: false,
        showSAdminDetailsInfo: {},
        addDialogVisible: false,
        addSAdminInfo: {
          u_id: '',
          u_type: '校级管理员',
          u_school: '',
          name: '',
          telephone: '',
          job_number: '',
          email: '',
          u_state: '正常'
        }
      }
    },
    created() {
      this.getSAdminList()
    },
    cellStyle() {
      return 'font-size: 15px'
    },
    methods: {
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getSAdminList()
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

        this.sAdminList.splice(id - 1, 1)
        this.$message.success('删除用户成功！')
        this.getSAdminList()
      },
      getSAdminList() {
        this.total = this.sAdminList.length
        console.log(this.total);
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getSAdminList()
      },
      openShowSAdminDetailDialog(obj) {
        this.showSAdminDialog = true
        this.showSAdminDetailsInfo = obj
      },
      showSAdminDetailsClosed() {
        this.showSAdminDialog = false
      },
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加校级管理员
      addSAdmin() {
        this.addSAdminInfo.u_id = parseInt(this.sAdminList[this.sAdminList.length - 1].u_id) + 1
        this.addSAdminInfo.job_number = parseInt(this.sAdminList[this.sAdminList.length - 1].job_number) + 1
        this.sAdminList.push(this.addSAdminInfo)
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
      },
    }
  }
</script>

<style lang="less">
  .common_select, .common_input {
    width: 280px;
  }

</style>
