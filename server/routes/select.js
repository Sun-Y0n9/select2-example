var express = require('express');
var router = express.Router();
/* GET users listing. */
const allData =  [
  {
    "name": "资源列表",
    "id": 1,
    "desc": "zylb"
  },{
    "name": "系统设置",
    "id": 2,
    "desc": "xtsz"
  },{
    "name": "用户设置",
    "id": 3,
    "desc": "yhsz"
  },{
    "name": "个人中心",
    "id": 4,
    "desc": "grzx"
  },{
    "name": "运维管理",
    "id": 5,
    "desc": "ywgl"
  },{
    "name": "系统日志",
    "id": 6,
    "desc": "xtrz"
  },{
    "name": "告警信息",
    "id": 7,
    "desc": "gjxx"
  },{
    "name": "智能分析",
    "id": 8,
    "desc": "znfx"
  },{
    "name": "行业信息",
    "id": 9,
    "desc": "hyxx"
  },{
    "name": "在线率",
    "id": 10,
    "desc": "zxl"
  },{
    "name": "属性设置",
    "id": 11,
    "desc": "sxsz"
  },{
    "name": "机构信息",
    "id": 12,
    "desc": "jgxx"
  },{
    "name": "平台信息",
    "id": 13,
    "desc": "ptxx"
  },{
    "name": "添加分组",
    "id": 15,
    "desc": "tjfz"
  },{
    "name": "删除分组",
    "id": 16,
    "desc": "scfz"
  }
]
function filterData(pageIndex, pageSize, serachText){
    let reg = new RegExp(serachText);
    let tmp = allData.filter((ele, ind) => {
      return reg.test(ele.name)
    });
    let data = tmp.slice((pageIndex - 1) * pageSize,pageIndex * pageSize);
    return data;
};
router.get('/', function(req, res, next) {
    var pageIndex = req.query.pageIndex;
    var searchText = req.query.searchText;
    var pageSize = req.query.pageSize;
    let data = filterData(pageIndex, pageSize, searchText || "");
    if(data.length > 0){
      res.json({
        data:data,
        code:200,
        count:data.length,
        pageCount: Math.ceil(data.length / pageSize)
      })
    }else{
      res.json({
        data:[],
        code:200,
        count:0,
        pageCount:0
      })
    }
});
module.exports = router;