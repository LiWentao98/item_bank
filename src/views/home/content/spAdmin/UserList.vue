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
                            <el-input v-model="searchForm.id" placeholder="请输入用户id" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="用户姓名">
                            <el-input v-model="searchForm.name" placeholder="请输入用户姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="用户职工号">
                            <el-input v-model="searchForm.job_number" placeholder="请输入用户职工号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="用户状态">
                            <el-select v-model="searchForm.u_state" placeholder="请选择用户状态">
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="限制登录" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属学校">
                            <el-select v-model="searchForm.u_school" placeholder="请选择学校">
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
                            <el-select v-model="searchForm.u_type" placeholder="请选择用户类型">
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
                        <div align="right">
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
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="用户类型" prop="u_type"></el-table-column>
                <el-table-column label="所在学校" prop="u_school"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="电话" prop="telephone"></el-table-column>
                <el-table-column label="职工号" prop="job_number"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="用户状态" prop="u_state"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 详情按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        searchForm: {
          id: '',
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
        userList: [{
          id: '1',
          u_type: '超级管理员',
          u_school: '长江大学',
          name: '测试1',
          telephone: '11111111111',
          job_number: '000001',
          email: '11111111111@qq.com',
          u_state: '正常',
        }, {
          id: '2',
          u_type: '校级管理员',
          u_school: '长江大学',
          name: '测试2',
          telephone: '22222222222',
          job_number: '000002',
          email: '22222222222@qq.com',
          u_state: '正常',
        }, {
          id: '3',
          u_type: '院级管理员',
          u_school: '长江大学',
          name: '测试3',
          telephone: '33333333333',
          job_number: '000003',
          email: '33333333333@qq.com',
          u_state: '正常',
        }, {
          id: '4',
          u_type: '审题教师',
          u_school: '长江大学',
          name: '测试4',
          telephone: '44444444444',
          job_number: '000004',
          email: '44444444444@qq.com',
          u_state: '限制登录',
        }, {
          id: '5',
          u_type: '命题教师',
          u_school: '长江大学',
          name: '测试5',
          telephone: '55555555555',
          job_number: '000005',
          email: '55555555555@qq.com',
          u_state: '正常',
        }],
        total: 0,
      }
    },
    created() {
    },
    methods: {
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getUserList()
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

        this.$message.success('删除用户成功！')
        this.getUserList()
      },
      getUserList() {
        this.total = this.userList.length
        console.log(this.total);
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getUserList()
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
</style>
