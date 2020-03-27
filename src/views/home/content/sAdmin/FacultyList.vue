<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>院系管理</el-breadcrumb-item>
      <el-breadcrumb-item>院系列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="搜索院系" v-model="queryInfo.query" clearable @clear="getFacultyList">
            <el-button slot="append" icon="el-icon-search" @click="getFacultyList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加院系</el-button>
        </el-col>
      </el-row>

      <!-- 院系列表区域 -->
      <el-table :data="facultyList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="院系名" prop="faculty_name"></el-table-column>
        <el-table-column label="管理员姓名" prop="name"></el-table-column>
        <el-table-column label="管理员状态" prop="u_state"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="removeUserById(scope.row.faculty_id)"></el-button>
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
    <el-dialog title="添加院系" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addFacultyInfo" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="院系名称" prop="facultyName">
          <el-input v-model="addFacultyInfo.faculty_name"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFaculty">确 定</el-button>
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
        facultyList: [
          {
            faculty_id: '1',
            faculty_name: '计算机科学学院',
            u_id: '1',
            name: '计1',
            u_state: '正常'
          },
          {
            faculty_id: '2',
            faculty_name: '电子信息学院',
            u_id: '2',
            name: '电2',
            u_state: '正常'
          },
          {
            faculty_id: '3',
            faculty_name: '机械学院',
            u_id: '3',
            name: '机3',
            u_state: '正常'
          },
          {
            faculty_id: '4',
            faculty_name: '石油学院',
            u_id: '4',
            name: '石4',
            u_state: '限制登录'
          },
          {
            faculty_id: '5',
            faculty_name: '农学院',
            u_id: '5',
            name: '农5',
            u_state: '正常'
          }
        ],
        total: 0,
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 添加用户的表单数据
        addFacultyInfo: {
          faculty_id: '',
          faculty_name: '',
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
      this.getFacultyList()
    },
    methods: {
      cellStyle() {
        return 'font-size: 15px'
      },
      getFacultyList() {
        this.total = this.facultyList.length
        // console.log(this.total)
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getFacultyList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        // console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getFacultyList()
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加学校
      addFaculty() {
        this.addFacultyInfo.faculty_id = parseInt(this.facultyList[this.facultyList.length - 1].school_id) + 1
        this.facultyList.push(this.addFacultyInfo)
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
      },
      // 根据Id删除对应的学校
      async removeUserById(id) {
        // 弹框询问用户是否删除
        const confirmResult = await this.$confirm(
          '此操作将永久删除该院系, 是否继续?',
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
        this.facultyList.splice(id - 1, 1)
        this.$message.success('删除院系成功！')
      },

    }
  }
</script>

<style lang="less">

  .cell {
    text-align: center;
  }

</style>
