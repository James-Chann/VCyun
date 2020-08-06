<template>
  <div class="data-wrap">
    <div class="cont-title">
      数据面板
    </div>
    <div class="cont-tree">
      <el-tree
          :data="menuList" 
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
          @node-contextmenu="rightClick"
      ></el-tree>
      <!--鼠标右键菜单栏 -->
      <div v-show="showRightMenu">
        <ul id="dataMenu"
            class="right-menu">
          <li class="menu-item"
              @click="editDevHandle">
            复制
          </li>
          <li class="menu-item"
              @click="addDevHandle">
            新建
          </li>
          <li class="menu-item"
              @click="delDevHandle">
            删除
          </li>
          <li class="menu-item"
              @click="viewDetail">
            属性
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataPanels',
  data() {
    return {
      menuList: [{
          id: 1,
          label: '数据块名称B',
          children: [
            {
              id: 2,
              label: '数据帧B1',
              children: [
                {
                  id: 4,
                  label: '数据参数B1-1'
                },
                {
                  id: 5,
                  label: '数据参数B1-2'
                }
              ]
            },
            {
              id: 3,
              label: '数据帧B2',
              children: [
                {
                  id: 6,
                  label: '新建数据参数'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      showRightMenu: false
    }
  },
  methods: {
    handleNodeClick() {
      this.showRightMenu = false
      // 及时关掉鼠标监听事件
      document.removeEventListener('click', this.closeRightMenu)
    },
    // 右键点击
    rightClick(event, data, node, obj) {
      this.showRightMenu = false // 先把模态框关死，目的是：第二次或者第n次右键鼠标的时候 它默认的是true
      this.showRightMenu = true
      let menu = document.querySelector('#dataMenu')
      menu.style.left = event.clientX + 'px'
      menu.style.top = event.clientY - 5 + 'px'
      // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
      document.addEventListener('click', this.closeRightMenu)
      console.log('event', event, event.clientX, event.clientY)
      console.log('data', data)
      console.log(node)
    },
    closeRightMenu() {
      this.showRightMenu = false
      // 及时关掉鼠标监听事件
      document.removeEventListener('click', this.closeRightMenu)
    },
    addDevHandle() {
    },
    editDevHandle() {
    },
    // 删除操作
    delDevHandle() {
    },
    viewDetail() {}
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.data-wrap {
  padding: 15px;
  .cont-title{
    padding-left: 10px;
    border-left: 3px solid $color-btn-blue;
    font-size: 16px;
    font-weight: 600;
    color: $color-txt-black;
  }
  .cont-tree {
    width: 100%;
    margin-top: 20px;
    .right-menu {
      z-index: 1;
      position: absolute;
      width: 100px;
      position: absolute;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: white;
      .menu-item {
        line-height: 35px;
        height: 35px;
        text-align: center;
        font-size: 14px;
        color: #606266;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
      }
      li:hover {
        background-color: #edf6ff;
        color: #606266;
      }
    }
  }
}
</style>