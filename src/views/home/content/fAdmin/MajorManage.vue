<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>专业管理</el-breadcrumb-item>
      <el-breadcrumb-item>专业列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 专业列表区域 -->
      <el-table :data="majorList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="专业名称" prop="major_name"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="removeUserById(scope.row.major_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加专业-->
      <el-row :gutter="20">
        <el-col :span="24">
          <div align="right" style="margin-right: 30px">
            <el-tooltip class="item" effect="dark" content="新增专业" placement="right">
              <el-button type="primary" @click="addDialogVisible = true">添加专业</el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加专业的对话框 -->
    <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <div align="center">
        <el-tag class="title_a">添加专业</el-tag>
      </div>
      <!-- 内容主体区域 -->
      <el-form :model="addMajorInfo" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="专业名称" prop="uSchool">
          <el-input v-model="addMajorInfo.major_name" placeholder="请输入新专业名称">
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMajor">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "MajorManage",
    data() {
      return {
        majorList: [
          {
            major_id: '1',
            major_name: '计算机科学与技术'
          },
          {
            major_id: '2',
            major_name: '软件工程'
          },
          {
            major_id: '3',
            major_name: '物联网工程'
          },
          {
            major_id: '4',
            major_name: '网络工程'
          },
        ],
        addMajorInfo: {
          major_id: '',
          major_name: '',
          faculty_id: '1'
        },
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false
      }
    },
    methods: {
      cellStyle() {
        return 'text-align: center'
      },
      async removeUserById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该专业, 是否继续?',
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

        this.majorList.splice(id - 1, 1)
        this.$message.success('删除专业成功！')
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      addMajor() {
        this.addMajorInfo.u_id = parseInt(this.majorList[this.majorList.length - 1].major_id) + 1
        this.majorList.push(this.addMajorInfo)
        console.log(this.majorList);
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
      },
    }
  }
</script>

<style lang="less">
  .el-form {
    margin-top: 20px;
  }

  .el-tag {
    font-size: 20px;
  }

  .cell {
    text-align: center;
  }
</style>