<template>
  <div class="ICD-wrap">
    <!-- 导航 -->
    <div class="nav">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">文件</template>
          <el-menu-item index="2-1">新建</el-menu-item>
          <el-menu-item index="2-2">保存</el-menu-item>
          <el-menu-item index="2-3">打开</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">工具</template>
          <el-menu-item index="2-1">导入测试流程</el-menu-item>
          <el-menu-item index="2-2">导出测试流程</el-menu-item>
          <el-menu-item index="2-3">检查ICD配置文件</el-menu-item>
          <el-menu-item index="2-3">加载DataInfo.xml文件</el-menu-item>
          <el-menu-item index="2-3">更新动态参数信息</el-menu-item>
          <el-menu-item index="2-3">版本校验</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- ICD建模 -->
    <div class="icd-wrap">
      <!-- 工作面板 -->
      <div class="work-space">
        <work-space @handleDragParams="handleDragParams"></work-space>
      </div>
      <!-- 数据/属性面板 -->
      <div class="assets-panels">
        <!-- 数据面板 -->
        <div class="data-panels">
          <data-panels></data-panels>
        </div>
        <!-- 属性面板 -->
        <div class="attr-panels">
          <attr-panels></attr-panels>
        </div>
      </div>
      <!-- 绘制设备流程图 -->
      <div class="draw-model">
        <!-- tab切换 -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="设备视图" name="first">
            <draw-board :equParams="equBoardParams"></draw-board>
          </el-tab-pane>
          <el-tab-pane label="流程视图" name="second">
            <draw-access :equParams="equAccessParams"></draw-access>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import drawBoard from './components/draw-board'
import drawAccess from './components/draw-access'
import workSpace from './components/work-space'
import dataPanels from './components/data-panels'
import attrPanels from './components/attr-panels'

export default {
  name: 'ICD建模1',
  components: {
    drawBoard,
    drawAccess,
    workSpace,
    dataPanels,
    attrPanels
  },
  data() {
    return {
      activeIndex: '1',
      equBoardParams: {},
      equAccessParams: {},
      activeName: 'first',
    }
  },
  methods: {
    handleSelect() {

    },
    // 传递拖拽设备信息
    handleDragParams(val) {
      if (this.activeName == 'first') {
        this.equBoardParams = val;
      }
      if (this.activeName == 'second') {
        this.equAccessParams = val;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="stylus" scoped>
.ICD-wrap {
  overflow: auto;
  background-color: #e5e4e5;
  // === 导航 ===================================================================================== /
  .nav {
    height: 50px;
    background: #f3f4f5;
    margin-bottom: 10px;
  }
  .icd-wrap {
    width: 1912px;
    overflow: auto;
    // === 工作面板 ================================================================================== /
    .work-space {
      float: left;
      width: 300px;
      padding: 12px 10px;
    }
    // === 数据/属性面板 ================================================================================== /
    .assets-panels {
      float: left;
      width: 300px;
      padding: 12px 10px;
      .data-panels {
        height: 383px;
        background: #fff;
        margin-bottom: 30px;
      }
      .attr-panels {
        height: 383px;
        background: #fff; 
      }
    }
    // === 设备流程图 ================================================================================== /
    .draw-model {
      float: left;
      // width: calc(100% - 600px);
      width: 1300px;
      // height: 800px;
      padding: 12px 10px;
      .el-tabs {
        background: #fff;
        >>> .el-tabs__nav {
          border: 0!important;
          border-right: 1px solid #E4E7ED!important;
        }
      }
    } 
  }
}
</style>