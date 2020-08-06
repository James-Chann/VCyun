// 接口定义
// var addressIp = 'http://192.168.20.82:9601'  // 后端服务地址
var addressIp = 'http://hwiiot.cloud.org'  // 后端服务地址
// var imgAddress = 'http://192.168.10.61'      // 后端图片存储位置
var imgAddress = 'http://hwiiot.cloud.org'      // 后端图片存储位置

// 接口根路径
var apiRoot = '/soft-def'

// 接口请求地址
var requestApi = {
    /** ---登录页 ------------------------------------------------------------------------------------- */
    captchaImage: addressIp + apiRoot + '/captchaImage',  // 获取验证码
    userLoginSwaager: addressIp + apiRoot + '/loginSwagger',  // 用户登录(未加密)
    userLogin: addressIp + apiRoot + '/login',  // 用户登录(有加密)

    /** ---DD导弹配置页 --------------------------------------------------------------------------------*/
    ddTypeList: addressIp + apiRoot + '/tbDdType/list',  // 获取dd导弹配置列表
    getDDImg: imgAddress,  // dd图片资源位置
    updateConf: addressIp + apiRoot + '/tbDdType',  // 修改dd软件配置项

    /** ---APP算法库 --------------------------------------------------------------------------------- */
    getAppList: addressIp + apiRoot + '/tbAlgorithmApp/list',  // 获取App算法库列表
    optParentNode: addressIp + apiRoot + '/tbAlgorithmApp', // 添加App算法库父节点
    optChildrenNode: addressIp + apiRoot + '/tbAlgorithmAppExt',  // 添加App算法库子节点

    /** ---运行监控 ---------------------------------------------------------------------------------- */
    addRunApp: addressIp + apiRoot + '/tbRunApp',  // 软件加载添加运行监控
    RunAppList: addressIp + apiRoot + '/tbRunApp/list',  // 软件加载运行监控列表
    logInfo: addressIp + apiRoot + '/tbSystemLog/top',  // 软件加载日志信息列表
    cpuInfo: addressIp + apiRoot + '/tbRunMonitor/top',  // 软件加载CPU信息列表
    cpuMoreInfo: addressIp + apiRoot + '/tbRunMonitor/last',  // 软件加载CPU增量信息列表
    realInfo: addressIp + apiRoot + '/tbRunReal/top',  // 软件加载实时性数据列表
    realMoreInfo: addressIp + apiRoot + '/tbRunReal/last',  // 软件加载实时性增量数据列表
    getInterval: addressIp + apiRoot + '/tbParameter/list',  // 软件加载获取时间间隔

    runStart: addressIp + apiRoot + '/tbRunState',  // 软件加载修改运行状态
    runStartList: addressIp + apiRoot + '/tbRunState/list',  // 软件加载获取运行状态

    /** ---用户登出 -----------------------------------------------------------------------------------*/
    logout: addressIp + apiRoot + '/logout'  // 用户登出
}

// 运行监控数据（CPU信息、实时性、日志信息）
var cpuRunConfig = {
    id: "cpuEcharts",
    title: "CPU利用率",
    xAxisTxt: "时间(s)",
    yAxisTxt: "CPU利用率(%)",
    itemColor: "#fd8c22",
    lineColor: "#fe8e20",
    xDataConfig: {
        startNum: 0,
        time: 1,
        number: 10
    },
    yDatas: [60, 75, 66, 68, 64, 62, 66, 64],
    yMaxVal: 100,
    flushTime: 1000
}

var realConfig = {
    id: "realEcharts",
    title: "实时性",
    xAxisTxt: "次数",
    yAxisTxt: "实时性",
    itemColor: "#28cc85",
    lineColor: "#29af7a",
    xDataConfig: {
        startNum: 100,
        time: 100,
        number: 10
    },
    yDatas: [998, 800, 875, 785, 920, 800, 790],
    yMaxVal: 2500,
    flushTime: 1000
}

var logConfig = {
    "time": 1000,
    "list": [
      "启动运行",
      "运行良好",
      "运行正常",
      "系统监测",
      "检测实时",
      "结束命令"
    ]
}