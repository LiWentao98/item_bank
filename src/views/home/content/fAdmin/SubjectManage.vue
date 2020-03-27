<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学科管理</el-breadcrumb-item>
      <el-breadcrumb-item>学科列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 学科列表区域 -->
      <el-table :data="subjectList" border stripe :cell-style="cellStyle">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="学科名称" prop="subject_name"></el-table-column>
        <el-table-column label="所属专业" prop="major_name"></el-table-column>
        <el-table-column label="所属类别" prop="sort"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="removeUserById(scope.row.subject_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加学科-->
      <el-row :gutter="20">
        <el-col :span="24">
          <div align="right" style="margin-right: 30px">
            <el-tooltip class="item" effect="dark" content="新增学科" placement="right">
              <el-button type="primary" @click="addDialogVisible = true">添加学科</el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加学科的对话框 -->
    <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <div align="center">
        <el-tag class="title_a">添加学科</el-tag>
      </div>
      <!-- 内容主体区域 -->
      <el-form :model="addSubjectInfo" ref="addFormRef" label-width="100px">
        <el-form-item label="学科名称" prop="subject">
          <el-input v-model="addSubjectInfo.subject_name" placeholder="请输入新学科名称">
          </el-input>
        </el-form-item>
        <el-form-item label="所属专业" prop="major">
          <el-select v-model="addSubjectInfo.major_name" filterable placeholder="请选择/搜索专业">
            <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="物联网工程" value="物联网工程"></el-option>
            <el-option label="网络工程" value="网络工程"></el-option>
            <el-option label="人工智能" value="人工智能"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属类别" prop="category">
          <el-select v-model="addSubjectInfo.sort" placeholder="请选择类别">
            <el-option label="工学" value="工学"></el-option>
            <el-option label="理学" value="理学"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSubject">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subjectList: [
          {
            subject_id: '1',
            subject_name: '数据结构',
            major_id: '1',
            major_name: '计算机科学与技术',
            sort: '工学'
          },
          {
            subject_id: '2',
            subject_name: '计算机网络',
            major_id: '2',
            major_name: '网络工程',
            sort: '工学'
          },
          {
            subject_id: '3',
            subject_name: '计算机组成',
            major_id: '3',
            major_name: '物联网工程',
            sort: '工学'
          },
          {
            subject_id: '4',
            subject_name: '软件设计',
            major_id: '4',
            major_name: '软件工程',
            sort: '工学'
          },
        ],
        addSubjectInfo: {
          subject_id: '',
          subject_name: '',
          major_id: '',
          major_name: '',
          sort: ''
        },
        // 控制添加用户对话框的显示与隐藏
        addDialogVisible: false,
        addSubjectFormRules: []
      }
    },
    methods: {
      cellStyle() {
        return 'text-align: center'
      },
      async removeUserById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该学科, 是否继续?',
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

        this.subjectList.splice(id - 1, 1)
        this.$message.success('删除学科成功！')
      },
      // 监听添加学校对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      addSubject() {
        this.addSubjectInfo.subject_id = parseInt(this.subjectList[this.subjectList.length - 1].subject_id) + 1
        this.subjectList.push(this.addSubjectInfo)
        console.log(this.subjectList);
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