<template>
  <!-- ICD建模设备图 -->
  <div class="draw-wrap">
    <div class="draw-box">
      <div class="left-tools-box">
        <ul id="toolsulAccess" class="tools">
          <li style="font-size: 14px;" data-type="pen" class="active">
            <i class="" data-default=""></i>画画
          </li>
          <li style="font-size: 14px;" data-type="line">
            <i class="" data-default=""></i>连线
          </li>
          <li style="font-size: 14px;" data-type="drag">
            <i class="" data-default=""></i>选中
          </li>
          <li style="font-size: 14px;" data-type="back">
            <i class="" data-default=""></i>上一步
          </li>
          <li style="font-size: 14px;" data-type="next">
            <i class="" data-default=""></i>下一步
          </li>
          <li style="font-size: 14px;" data-type="clear">
            <i class="" data-default=""></i>清空
          </li>
        </ul>
      </div>
      <div id="canvasDiv" class="right-draw-canvas">
        <!-- <div class="cont-title">
          设备视图
        </div> -->
        <canvas id="d" class="canvas-container" width="1170" height="727">请使用支持HTML5的浏览器</canvas>
      </div>
    </div>
    <!-- 图片添加预备项 -->
    <div style="display: none">
      <img :src="equImgUrl" alt="" id="addForCanvas">
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'drawBorad',
  mounted() {
    this._init_canvas()
  },
  props: ["equParams"],
  data() {
    return {
      // 变量声明
      __mouseFrom: {},
      __mouseTo: {},
      __drawType: null,
      __canvasObjectIndex: 0,
      __textbox: null,
      // 画板配置
      config: {
        height: 1080, //默认画板高、宽
        width: 1920,
        canvasParentId: "canvasDiv",
        canvasId: "c"
      },
      // 画图配置
      __draw_config: {
        drawWidth: 2,  // 笔触宽度
        color: "#E34F51",  // 笔触颜色
        drawingObject: null,  // 当前绘制对象
        moveCount: 1,   // 绘制移动计数器
        doDrawing: false, // 绘制状态
        fabricHistoryJson: [],
        mods: 0,
        replayllist: []
      },
      __canvas: null,  // canvas对象
      equImgUrl: require('../../../common/images/equipment.png') // 设备图片
    }
  },
  watch: {
    equParams(newVal, oldVal) {
      this._addEquipment(newVal)
    }
  },
  methods: {
    _init_canvas() {
      // 初始化画图
      this._init_draw_board();
      // 初始化画板
      // this._set_zoom(window.canvas);
    },
    _init_draw_board() {
      this.$data.__canvas = new fabric.Canvas("d", {
        isDrawingMode: true,  // 设置成 true 一秒变身小画家
      })
      window.canvas = this.$data.__canvas
      window.zoom = 1;
      this.$data.__canvas.freeDrawingBrush.color = this.$data.__draw_config.color  // 设置自由绘图刷
      this.$data.__canvas.freeDrawingBrush.width = this.$data.__draw_config.drawWidth

      // 绑定画板事件 (鼠标按下)
      this.$data.__canvas.on("mouse:down", (options) => {
        var xy = {}
        if (!options.pointer.x) {
          xy = this._transformMouse(options.e.offsetX, options.e.offsetY)
        } else {
          xy = this._transformMouse(options.pointer.x, options.pointer.y)
        }
        this.$data.__mouseFrom.x = xy.x
        this.$data.__mouseFrom.y = xy.y
        this.$data.__draw_config.doDrawing = true
      })
      // 鼠标抬起
      this.$data.__canvas.on("mouse:up", (options) => {
        var xy = {}
        if (!options.pointer.x) {
          xy = this._transformMouse(options.e.offsetX, options.e.offsetY)
        } else {
          xy = this._transformMouse(options.pointer.x, options.pointer.y)
        }
        this.$data.__mouseTo.x = xy.x
        this.$data.__mouseTo.y = xy.y
        this.$data.__draw_config.drawingObject = null
        this.$data.__draw_config.moveCount = 1
        this.$data.__draw_config.doDrawing = false
      })
      // 鼠标移动
      this.$data.__canvas.on("mouse:move", (options) => {
        if (this.$data.__draw_config.moveCount % 2 && !this.$data.__draw_config.doDrawing) {
          // 减少绘制频率
          return
        }
        this.$data.__draw_config.moveCount++
        var xy = {}
        if (!options.pointer.x) {
          xy = this._transformMouse(options.e.offsetX, options.e.offsetY)
        } else {
          xy = this._transformMouse(options.pointer.x, options.pointer.y)
        }
        this.$data.__mouseTo.x = xy.x
        this.$data.__mouseTo.y = xy.y
        var dataTo = {
          drawType: this.__drawType,
          mouseFormX: this.$data.__mouseFrom.x,
          mouseFormY: this.$data.__mouseFrom.y,
          mouseToX: this.$data.__mouseTo.x,
          mouseToY: this.$data.__mouseTo.y
        }
        this._drawing()
      })

      // 绑定工具事件
      this._set_tool_box()
    },
    // 设置画板大小放大缩小比例
    _set_zoom(canvas) {
      var canvasDiv = $("#" + this.config.canvasParentId);
      var zoom = 1;
      var eleHeight = canvasDiv.height(),
          eleWidth = canvasDiv.width()
      this.$data.__canvas.setZoom(zoom);
      this.$data.__canvas.setWidth(eleWidth);
      this.$data.__canvas.setHeight(eleHeight);

      window.zoom = zoom;
      this.$data.__canvas.renderAll();
    },
    // 坐标转换
    _transformMouse(mouseX, mouseY) {
      return { x: mouseX / window.zoom, y: mouseY / window.zoom }
    },
    // 绑定工具箱
    _set_tool_box() {
      var _this = this
      $("#toolsulAccess").find("li").on("click", function() {
        // 设置样式
        $("#toolsulAccess").find("li>i") && $("#toolsulAccess").find("li>i").each(() => {
          $(this).attr("class", $(this).attr("data-default"))
        })
        $(this).addClass("active").siblings().removeClass("active")
        // $(this).find("i") && $(this).find("i").attr("class",$(this).find("i").attr("class").replace("black", "select"))
        _this.__drawType = $(this).attr("data-type")
        _this.$data.__canvas.isDrawingMode = false
        if (_this.__drawType == "clear") {
          _this.$data.__canvas.clear()
        } else if (_this.__drawType == "drag") {
          _this.$data.__canvas.selection = true
          _this.$data.__canvas.skipTargetFind = false
          _this.$data.__canvas.selectable = true
        } else {
          _this.$data.__canvas.skipTargetFind = true //画板元素不能被选中
          _this.$data.__canvas.selection = false //画板不显示选中
        }
      })
    },
    // 绘画方法
    _drawing() {
      if (this.$data.__draw_config.drawingObject) {
        this.$data.__canvas.remove(this.$data.__draw_config.drawingObject)
      }
      var canvasObject = null
      switch (this.__drawType) {
        case "pen":   // 画画
          this.$data.__canvas.isDrawingMode = true;
          break
        case "line":   // 连线
          canvasObject = new fabric.Line(
            [this.$data.__mouseFrom.x, this.$data.__mouseFrom.y, this.$data.__mouseTo.x, this.$data.__mouseTo.y],
            {
              stroke: this.$data.__draw_config.color,
              strokeWidth: this.$data.__draw_config.drawWidth,
            }
          )
          break
        default:
          break
      }
      if (canvasObject) {
        this.$data.__canvas.add(canvasObject) // .setActiveObject(canvasObject)
        this.$data.__draw_config.drawingObject = canvasObject
      }
    },
    // 添加设备
    _addEquipment(params) {
      let canvasDivCont = document.querySelector('.draw-model')
      let canvasX = canvasDivCont.offsetLeft + 30
      let canvasY = canvasDivCont.offsetTop + 12 + 41 + 15 + 15
      let x = params.dragX - canvasX
      let y = params.dragY - canvasY
      var imgElement = document.getElementById('addForCanvas')
      // 绘制设备图片
      var equipmentImg = new fabric.Image(imgElement, {
        originX: 'center',
        originY: 'bottom',
        left: x,
        top: y,
        scaleX: 1,
        scaleY: 1,
        lockMovementX: false,
        lockMovementY: false,
        selectable: true
      })
      // 绘制设备文字
      var equipmentTxt = new fabric.Textbox(params.name, {
        left: x-20,
        top: y,
        width: 50,
        fontSize: 14,
        borderColor: "#2c2c2c",
        fill: 'red',
        hasControls: false
      })
      //进行组合
      var group = new fabric.Group([equipmentImg, equipmentTxt], {
        left: x,
        top: y,
        angle: 0
      })
      this.$data.__canvas.add(group)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.draw-wrap {
  overflow: auto;
  .draw-box {
    margin-top: 15px;
    // === 左边工具箱 ===========================================================//
    .left-tools-box {
      width: 50px;
      float: right;
      margin-right: 15px;
      .tools {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 28px;
          border-top: #dad7d9 solid 1px;
          background: #fefefe;
          cursor: pointer;
          position: relative;
        }
        li:hover {
          background: #f2f1f2;
        }
        li.active {
          background: #e34f51;
        }
      }
    }
    // === 右边画版 ===========================================================//
    .right-draw-canvas {
      position: relative;
      width: 1200px;
      height: 730px;
      background-color: #fff;
      padding: 0 15px;
      .cont-title {
        padding-left: 10px;
        border-left: 3px solid $color-btn-blue;
        font-size: 16px;
        font-weight: 600;
        color: $color-txt-black;
        margin-bottom: 20px;
      }
      .canvas-container {
        width: 100%;
        background-color: rgb(250, 250, 230);
      }
    }
  }
}
</style>