<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户类型管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户类型列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <!-- 学校列表区域 -->
      <el-table :data="typeList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#" width="100px"></el-table-column>
        <el-table-column label="类型名称" prop="u_type_name"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showTypeDetail(scope.row)">详情</el-button>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除用户类型" placement="right">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="removeUserById(scope.row.u_type)">删除
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="21">
          <!-- 分页区域 -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
        <el-col :span="3">
          <el-button class="btn" type="primary" @click="addDialogVisible = true">添加类型</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog :visible.sync="showTypeDialog" width="40%" @close="showTypeDetailClosed">
      <div align="center"><h2>{{typeInfo}}</h2></div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTypeDialog = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 添加学校的对话框 -->
    <el-dialog title="添加类型" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addTypeInfo" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="类型名称" prop="schoolName">
          <el-input v-model="addTypeInfo.u_type_name"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addType">确 定</el-button>
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
        typeList: [
          {
            u_type: '1',
            u_type_name: '超级管理员',
          },
          {
            u_type: '2',
            u_type_name: '校级管理员',
          },
          {
            u_type: '3',
            u_type_name: '院级管理员',
          },
          {
            u_type: '4',
            u_type_name: '审题教师',
          },
          {
            u_type: '5',
            u_type_name: '命题教师',
          }
        ],
        total: 0,
        showTypeDialog: false,
        showTypeDetailInfo: {},
        typeInfo: '',
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        // 添加用户的表单数据
        addTypeInfo: {
          u_type: '',
          u_type_name: '',
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
        },
        // 已选中的角色Id值
        selectedRoleId: ''
      }
    },
    created() {
      this.getTypeList()
    },
    methods: {
      cellStyle() {
        return 'font-size: 15px'
      },
      getTypeList() {
        this.total = this.typeList.length
        // console.log(this.total)
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getTypeList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        // console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getTypeList()
      },
      showTypeDetail(obj) {
        this.showTypeDialog = true
        console.log(obj.u_type);
        this.typeInfo = obj.u_type_name

      },
      showTypeDetailClosed() {
        this.showTypeDialog = false
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 点击按钮，添加类型
      addType() {
        this.addTypeInfo.u_type = parseInt(this.typeList[this.typeList.length - 1].u_type) + 1
        this.typeList.push(this.addTypeInfo)
        this.addDialogVisible = false
      },
      // 根据Id删除对应的类型
      async removeUserById(id) {
        // 弹框询问用户是否删除
        const confirmResult = await this.$confirm(
          '此操作将永久删除该类型, 是否继续?',
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
        this.typeList.splice(id - 1, 1)
        this.$message.success('删除类型成功！')
      },

    }
  }
</script>

<style lang="less">
  .cell {
    text-align: center;
  }

  .btn {
    margin-top: 10px;

  }


</style>
