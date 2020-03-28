<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片1-->
    <el-card>
      <div align="center">教师查询</div>

      <el-form ref="teacherSearchForm" :model="searchTeacherForm" label-width="100px" style="margin-top: 15px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户状态">
              <el-select v-model="searchTeacherForm.u_state" placeholder="请选择用户状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="限制登录" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作科目">
              <el-select v-model="searchTeacherForm.operate_subject" placeholder="请选择操作学科">
                <el-option label="数据结构" value="1"></el-option>
                <el-option label="计算机网络" value="2"></el-option>
                <el-option label="高等数学" value="3"></el-option>
                <el-option label="操作系统" value="4"></el-option>
                <el-option label="离散数学" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input v-model="searchTeacherForm.name" placeholder="请输入用户姓名" clearable></el-input>
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
      <el-table :data="teacherList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="教师类型" prop="u_type"></el-table-column>
        <el-table-column label="操作科目" prop="operate_subject"></el-table-column>
        <el-table-column label="职工号" prop="job_number"></el-table-column>
        <el-table-column label="用户状态" prop="u_state"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 详情按钮 -->
            <el-button type="primary" size="mini" @click="openShowTeacherDetailDialog(scope.row)">详情</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="removeUserById(scope.row.u_id)">删除
            </el-button>
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
          <div style="margin-top: 5px">
            <el-tooltip class="item" effect="dark" content="新添教师" placement="right">
              <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>

    </el-card>

    <!--详情-->
    <el-dialog :visible.sync="showTeacherDetails" width="40%" @close="showTeacherDetailsClosed">
      <div class="details">
        <div align="center"><h3>教师用户信息</h3></div>
        <el-row>
          <el-col :span="12">
            用户姓名：{{showTeacherDetailsInfo.name}}
          </el-col>
          <el-col :span="12">
            所属学校：{{showTeacherDetailsInfo.u_school}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            所属院系：{{showTeacherDetailsInfo.u_faculty}}
          </el-col>
          <el-col :span="12">
            用户类型：{{showTeacherDetailsInfo.u_type}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            用户状态：{{showTeacherDetailsInfo.u_state}}
          </el-col>
          <el-col :span="12">
            操作科目：{{showTeacherDetailsInfo.operate_subject}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            用户工号：{{showTeacherDetailsInfo.job_number}}
          </el-col>
          <el-col :span="12">
            绑定邮箱：{{showTeacherDetailsInfo.email}}
          </el-col>
        </el-row>
        <el-row>
          绑定手机：{{showTeacherDetailsInfo.telephone}}
        </el-row>
      </div>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTeacherDetails = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 添加教师的对话框 -->
    <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <div align="center">
        <el-tag class="title_a">添加教师</el-tag>
      </div>
      <!-- 内容主体区域 -->
      <el-form :model="addTeacherInfo" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="所属学校" prop="uSchool">
          <el-select v-model="addTeacherInfo.u_school" disabled placeholder="长江大学">
          </el-select>
        </el-form-item>
        <el-form-item label="所属院系" prop="uFaculty">
          <el-select v-model="addTeacherInfo.u_faculty" disabled placeholder="计算机科学学院">
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" prop="uType">
          <el-select v-model="addTeacherInfo.u_type" placeholder="请选择教师类型">
            <el-option label="审题教师" value="4"></el-option>
            <el-option label="命题教师" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作学科" prop="operateSubject">
          <el-select v-model="addTeacherInfo.operate_subject" filterable placeholder="请选择/搜索学科">
            <el-option label="数据结构" value="1"></el-option>
            <el-option label="计算机网络" value="2"></el-option>
            <el-option label="高等数学" value="3"></el-option>
            <el-option label="操作系统" value="4"></el-option>
            <el-option label="离散数学" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addTeacherInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="职工号" prop="jobNumber">
          <el-input v-model="addTeacherInfo.job_number"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="addTeacherInfo.id_number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addTeacherInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="绑定手机号" prop="telephone">
          <el-input v-model="addTeacherInfo.telephone"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchTeacherForm: {
          name: '',
          operate_subject: '',
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
        // 存储详情数据
        showTeacherDetailsInfo: {},
        teacherList: [{
          u_id: '1',
          u_type: '命题教师',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          operate_subject: '数据结构',
          name: '计1',
          job_number: '000011',
          telephone: '11111111111',
          email: '11111111111@qq.com',
          u_state: '正常',
        }, {
          u_id: '2',
          u_type: '命题教师',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          operate_subject: '数据结构',
          name: '电2',
          job_number: '000012',
          telephone: '22222222222',
          email: '22222222222@qq.com',
          u_state: '正常',
        }, {
          u_id: '3',
          u_type: '命题教师',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          operate_subject: '数据结构',
          name: '机3',
          job_number: '000013',
          telephone: '33333333333',
          email: '33333333333@qq.com',
          u_state: '正常',
        }, {
          u_id: '4',
          u_type: '审题教师',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          operate_subject: '无',
          name: '石4',
          job_number: '000014',
          telephone: '44444444444',
          email: '44444444444@qq.com',
          u_state: '限制登录',
        }, {
          u_id: '5',
          u_type: '审题教师',
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          operate_subject: '无',
          name: '农5',
          job_number: '000015',
          telephone: '55555555555',
          email: '55555555555@qq.com',
          u_state: '正常',
        }],
        total: 0,
        showTeacherDetails: false,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 添加用户的表单数据
        addTeacherInfo: {
          u_school: '长江大学',
          u_faculty: '计算机科学学院',
          operate_subject: '',
          u_type: '',
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
      this.total = this.teacherList.length
    },
    methods: {
      cellStyle() {
        return 'font-size: 15px'
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

        this.teacherList.splice(id - 1, 1)
        this.$message.success('删除用户成功！')
        this.getTeacherList()
      },
      getTeacherList() {
        this.total = this.teacherList.length
        console.log(this.total);
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getTeacherList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getTeacherList()
      },
      openShowTeacherDetailDialog(obj) {
        this.showTeacherDetails = true
        this.showTeacherDetailsInfo = obj
      },
      showTeacherDetailsClosed() {
        this.showTeacherDetails = false
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮
      addTeacher() {
        this.addTeacherInfo.u_id = parseInt(this.teacherList[this.teacherList.length - 1].u_id) + 1
        this.teacherList.push(this.addTeacherInfo)
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
      },
    }
  }
</script>

<style lang="less">
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
