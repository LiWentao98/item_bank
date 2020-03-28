<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学校管理</el-breadcrumb-item>
      <el-breadcrumb-item>学校列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索学校" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加学校</el-button>
        </el-col>
      </el-row>

      <!-- 学校列表区域 -->
      <el-table :data="schoolList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="学校名" prop="school_name"></el-table-column>
        <el-table-column label="管理员姓名" prop="name"></el-table-column>
        <el-table-column label="管理员状态" prop="u_state"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="removeUserById(scope.row.school_id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加学校的对话框 -->
    <el-dialog title="添加学校" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addSchoolInfo" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="学校名称" prop="schoolName">
          <el-input v-model="addSchoolInfo.school_name"></el-input>
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
        // 获取学校列表的参数对象
        queryInfo: {
          query: '',
          // 当前的页数
          pageNum: 1,
          // 当前每页显示多少条数据
          pageSize: 2
        },
        schoolList: [
          {
            school_id: '1',
            school_name: '长江大学',
            name: '测试2',
            u_state: '整除'
          },
          {
            school_id: '2',
            school_name: '三峡大学',
            name: '张三',
            u_state: '正常'
          },
          {
            school_id: '3',
            school_name: '武汉大学',
            name: '李四',
            u_state: '正常'
          },
          {
            school_id: '4',
            school_name: '武汉纺织大学',
            name: '王五',
            u_state: '限制登录'
          },
          {
            school_id: '5',
            school_name: '湖北大学',
            name: '胡六',
            u_state: '正常'
          }
        ],
        total: 0,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 添加用户的表单数据
        addSchoolInfo: {
          school_id: '',
          school_name: '',
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
        // 已选中的角色Id值
        selectedRoleId: ''
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      cellStyle() {
        return 'font-size: 15px'
      },
      getUserList() {
        this.total = this.schoolList.length
        // console.log(this.total)
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        // console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getUserList()
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加学校
      addSchool() {
        this.addSchoolInfo.school_id = parseInt(this.schoolList[this.schoolList.length - 1].school_id) + 1
        this.schoolList.push(this.addSchoolInfo)
        // console.log(this.schoolList);
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
      },
      // 根据Id删除对应的学校
      async removeUserById(id) {
        // 弹框询问用户是否删除
        const confirmResult = await this.$confirm(
          '此操作将永久删除该学校, 是否继续?',
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
        this.schoolList.splice(id - 1, 1)
        this.$message.success('删除学校成功！')
      },

    }
  }
</script>

<style lang="less">
  .cell {
    text-align: center;
  }
</style>
