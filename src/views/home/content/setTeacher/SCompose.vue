<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 试卷
        </el-breadcrumb-item>
        <el-breadcrumb-item>组卷</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-card class="box-card1">
        <div class="form-box">
          <div class="exam1">
            <a>自动组卷</a>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <div class="form-box2">
              <div class="form-box3">
                <el-form-item label="试卷标题">
                  <el-input v-model="form.name1"></el-input>
                </el-form-item>
              </div>
              <el-form-item>
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="选择题" name="type"></el-checkbox>
                  <br>
                  <el-checkbox label="填空题" name="type"></el-checkbox>
                  <br>
                  <el-checkbox label="判断题" name="type"></el-checkbox>
                  <br>
                  <el-checkbox label="简答题" name="type"></el-checkbox>
                  <br>
                  <el-checkbox label="算法设计题" name="type"></el-checkbox>
                </el-checkbox-group>
                <div class="inputNumber1">
                  <el-form-item label="题量">
                    <el-input-number v-model="num1" controls-position="right" @change="handleChange" :min="1"
                                     :max="15"></el-input-number>
                  </el-form-item>
                </div>
                <div class="inputNumber2">
                  <el-form-item label="题量">
                    <el-input-number v-model="num2" controls-position="right" :min="1" :max="15"></el-input-number>
                  </el-form-item>
                </div>
                <div class="inputNumber3">
                  <el-form-item label="题量">
                    <el-input-number v-model="num3" controls-position="right" :min="1" :max="15"></el-input-number>
                  </el-form-item>
                </div>
                <div class="inputNumber4">
                  <el-form-item label="题量">
                    <el-input-number v-model="num4" controls-position="right" :min="1" :max="15"></el-input-number>
                  </el-form-item>
                </div>
                <div class="inputNumber5">
                  <el-form-item label="题量">
                    <el-input-number v-model="num5" controls-position="right" :min="1" :max="15"></el-input-number>
                  </el-form-item>
                </div>

              </el-form-item>
            </div>

            <div class="label">
              <el-form-item label="从第1题至">
                <el-col :span="1.4">
                  <el-input v-model="form.name2"></el-input>
                </el-col>
                <el-col :span="11.8">题试题难度</el-col>
                <el-col :span="11.8">
                  <el-select v-model="form.region1" placeholder="请选择">
                    <el-option key="bbk" label="简单" value="bbk"></el-option>
                    <el-option key="xtc" label="一般" value="xtc"></el-option>
                    <el-option key="imoo" label="困难" value="imoo"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <div class="form-box4">
                <el-form-item label="从第">
                  <el-col :span="1.4">
                    <el-input v-model="form.name3"></el-input>
                  </el-col>
                  <el-col :span="1.4">题至</el-col>
                  <el-col :span="11.8">
                    <el-input v-model="form.name4"></el-input>
                  </el-col>
                  <el-col :span="11.8">题试题难度</el-col>
                  <el-col :span="11.8">
                    <el-select v-model="form.region2" placeholder="请选择">
                      <el-option key="bbk" label="简单" value="bbk"></el-option>
                      <el-option key="xtc" label="一般" value="xtc"></el-option>
                      <el-option key="imoo" label="困难" value="imoo"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </div>
            </div>

            <div class="button1">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即组卷</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card">
        <div class="form-box">
          <div class="exam2">
            <a>手动组卷</a>
          </div>
          <div class="exam3">
            <a>组卷所用试题来自"我的选题"</a>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <div class="button2">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即组卷</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SCompose",
    data() {
      return {
        form: {
          region1: '',
          region2: '',
          name1: '',
          name2: '',
          name3: '',
          name4: '',
          type: [],
        },
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1,
        num5: 1,
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      onSubmit() {
        this.$message.success('组卷成功！');
      }
    }
  }
</script>

<style scoped>
  .box-card1 {
    height: 550px;
  }

  .form-box2 {
    width: 307px;
  }

  .form-box3 {
    position: relative;
    left: 70px;
  }

  .form-box4 {
    position: relative;
    left: -38px;
  }

  .label {
    position: relative;
    left: 76px;
    top: -200px;
  }

  .exam1 {
    text-align: center;
  }

  .exam2 {
    position: relative;
    left: 695px;
    top: -5px;
  }

  .exam3 {
    position: relative;
    left: 78px;
    top: -5px;
  }

  .inputNumber1 {
    position: relative;
    left: 300px;
    top: -228px;
  }

  .inputNumber2 {
    position: relative;
    left: 300px;
    top: -220px;
  }

  .inputNumber3 {
    position: relative;
    left: 300px;
    top: -212px;
  }

  .inputNumber4 {
    position: relative;
    left: 300px;
    top: -204px;
  }

  .inputNumber5 {
    position: relative;
    left: 300px;
    top: -196px;
  }

  .button1 {
    position: relative;
    left: 605px;
    top: -200px;
  }

  .button2 {
    position: relative;
    left: 605px;
    top: 20px;
  }
</style>
