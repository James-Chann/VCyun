<template>
  <div class="attr-wrap">
    <div class="cont-title">
      属性面板
    </div>
    <div class="attr-table">
      <el-table :data="attrData">
        <el-table-column prop="attrName" label="属性项">
        </el-table-column>
        <el-table-column prop="attrValue" label="值">
          <template scope="scope" >
            <el-input size="small" v-model="scope.row.attrValue" placeholder="请输入内容"></el-input>
              <span>{{scope.row.attrValue}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="isSensitive" label="敏感字段" width="120">
          <template scope="scope">
            <el-select v-model="scope.row.isSensitive"  @change="handleCellEdit(scope.$index, scope.row)">
                <el-option v-for="item in sensitiveOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'attrPanels',
  data() {
    return {
      attrData: [
        { attrName: 'type', attrValue: ''},
        { attrName: 'type', attrValue: ''},
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.attr-wrap {
  padding: 15px;
  .cont-title{
    padding-left: 10px;
    border-left: 3px solid $color-btn-blue;
    font-size: 16px;
    font-weight: 600;
    color: $color-txt-black;
  }
  .attr-table {
    margin-top: 20px;
  }
}
</style>