<!-- api详情 -->
<template>
  <div>
    <ul class="detail_ul">
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>组件名称</span>
          </div>
          <div class="text item">{{compForm.name}}</div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>组件id</span>
          </div>
          <div class="text item">{{compForm.componentId}}</div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>功能简介</span>
          </div>
          <div class="text item">{{compForm.introduce}}</div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>实现类</span>
          </div>
          <div class="text item">{{compForm.impl}}</div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>使用方法</span>
          </div>
          <div class="text item">{{compForm.basicUse}}</div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>输入参数</span>
          </div>
          <el-table :data="compForm.inputParams" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="desc" label="字段描述" width="180"></el-table-column>
            <el-table-column prop="field" label="数据域" width="180"></el-table-column>
            <el-table-column prop="isMust" label="是否必输" width="180"></el-table-column>
            <el-table-column prop="nonte" label="备注"></el-table-column>
          </el-table>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>输出参数</span>
          </div>
          <el-table :data="compForm.outputParams" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="desc" label="字段描述" width="180"></el-table-column>
            <el-table-column prop="field" label="数据域" width="180"></el-table-column>
            <el-table-column prop="isMust" label="是否必输" width="180"></el-table-column>
            <el-table-column prop="nonte" label="备注"></el-table-column>
          </el-table>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>返回值</span>
          </div>
          <div class="text item">{{compForm.result}}</div>
        </el-card>
      </li>
      <li>
        <el-card shadow="hover">
          <div slot="header">
            <span>注意事项</span>
          </div>
          <div class="text item">{{compForm.notices}}</div>
        </el-card>
      </li>
    </ul>
    <el-button style="margin:10px auto;margin-left:50%;" type="primary" @click="openEditer">编辑</el-button>
  </div>
</template>

<script>
import { queryComponentList } from "@/request/api.js";
export default {
  data() {
    return {
      compForm: {
        basicUse: "",
        componentId: "",
        id: "",
        impl: "",
        inputParams: [],
        introduce: "",
        name: "",
        notices: "",
        outputParams: [],
        result: "",
        submitTime: "",
        type: "",
        version: ""
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    let _this = this;
    let params = _this.$route.params;
    // console.log(_this.$route);
    console.log('params', params);
    _this.queryComponentInfo(params);
  },

  methods: {
    queryComponentInfo(params) {
      let _this=this;
      queryComponentList(params).then(res => {
        let midVar = res.data[0];
        midVar.inputParams = JSON.parse(res.data[0].inputParams);
        midVar.outputParams = JSON.parse(res.data[0].outputParams);
        _this.compForm = midVar;
      });
    },
    openEditer() {
      let _this = this;
      _this.$router.push({
        name: "addDetail",
        params: { compForm: _this.compForm,editFlag:true }
      });
    }
  }
};
</script>
<style>
.detail_ul > li {
  margin-top: 5px;
  margin-bottom: 5px;
  list-style: none;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>