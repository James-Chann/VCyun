<template>
  <div class="work-wrap">
    <div class="tree-nav">
      <div class="cont-title">
        工程面板
      </div>
      <div class="cont-tree">
        <el-tree 
            id="unSchTree"
            :data="menuList" 
            :props="defaultProps"
            draggable
            :allow-drop="allowDrop"
            default-expand-all
            show-checkbox
            @node-click="handleNodeClick"
            @node-contextmenu="rightClick"
            @node-drag-start="handleDragStart"
            @node-drag-end="handleDragEnd"
        ></el-tree>
        <!--鼠标右键菜单栏 -->
        <div v-show="showRightMenu">
          <ul id="menu"
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
  </div>
</template>

<script>
export default {
  name: 'workSpace',
  data() {
    return {
      menuList: [{
          id: 1,
          label: '工程名称',
          children: [
            {
              id: 2,
              label: '设备',
              children: [
                {
                  id: 4,
                  label: '设备1'
                },
                {
                  id: 5,
                  label: '设备2'
                }
              ]
            },
            {
              id: 3,
              label: '数据',
              children: [
                {
                  id: 6,
                  label: '数据1'
                },
                {
                  id: 7,
                  label: '数据2'
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
      let menu = document.querySelector('#menu')
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
    viewDetail() {},
    // 判断节点是否可拖拽
    allowDrop(moveNode,inNode,type) {
      if(moveNode.level == 1 && inNode.level == 1){
        return type == 'prev';
      }
      if(moveNode.level == 2 && inNode.level == 2){
        return type == 'prev';
      }
      if(moveNode.level == 3 && inNode.level == 3){
        if(moveNode.parent.id == inNode.parent.id){
            return type == 'prev';
        }else{
            //三级分类父级不同不做拖拽
        }
      }
    },
    // 节点拖拽事件
    handleDragStart(node, ev) {
      console.log('拖拽节点', node);
      console.log('拖拽事件', ev);
    },
    handleDragEnd(before, after, inner, ev) {
      console.log('拖拽节点==结束', before.data);
      console.log('拖拽事件==结束', ev);
      let equParams = {
        id: before.data.id,
        name: before.data.label,
        dragX: ev.x,
        dragY: ev.y
      }
      this.$emit('handleDragParams', equParams);
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.work-wrap {
  .tree-nav {
    height: 797px;
    background: #fff;
    padding: 15px;
    .cont-title {
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
}
</style>

<style lang="stylus">
#unSchTree .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner{
    display: inline-block;
  }
  .el-checkbox .el-checkbox__inner{
	display: none;
  }
}
</style>