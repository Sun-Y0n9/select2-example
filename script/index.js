$(function(){
	// 常用配置
	$("#normalSetting").select2({
		width:"200px",
		placeholder:"请选择城市",
		allowClear:true,
		language: "zh-CN"
	});
	$("#normalCode").JSONView({
		width:"200px",
		placeholder:"请选择城市",
		allowClear:true,
		language: "zh-CN"
	});
	// 取消搜索
	$("#cancelSearch").select2({
		language: "zh-CN",
		width:"200px",
		minimumResultsForSearch: -1
	});
	$("#cancelSearchCode").JSONView({
		language: "zh-CN",
		width:"200px",
		minimumResultsForSearch: -1
	});
	// 输入搜索长度限制 
	$("#minAndMaxSearchKey").select2({
		language: "zh-CN",
		width:"200px",
		minimumInputLength: 1,
		maximumInputLength: 3
	});
	$("#minAndMaxSearchKeyCode").JSONView({
		language: "zh-CN",
		width:"200px",
		minimumInputLength: 1,
		maximumInputLength: 3
	});
	// js初始初始化option 
	var data = [
	    {
	        id: 0,
	        text: 'enhancement'
	    },
	    {
	        id: 1,
	        text: 'bug'
	    },
	    {
	        id: 2,
	        text: 'duplicate'
	    },
	    {
	        id: 3,
	        text: 'invalid'
	    },
	    {
	        id: 4,
	        text: 'wontfix'
	    }
	];
	$("#useJsInitData").select2({
		language: "zh-CN",
		width:"200px",
		data:data
	});
	$("#useJsInitDataCode").JSONView({
		language: "zh-CN",
		width:"200px",
		data:data
	});
	// ajax请求数据并搜索 
	$("#ajaxGetData").select2({
		language: "zh-CN",
		width:"120px",
		ajax: {
			url:"http://localhost:3000",
			dataType:"json",
			type:"get",
			delay:200,
			data: function(params){
				console.log(params);
				return {
					pageIndex: params.page || 1,
					searchText: params.term || '',
					pageSize: 7
				}
			},
			processResults: function(data, params){
				console.log(data);	
				if(data.code === 200){
					var tmp = [];
					for(var i=0; i< data.data.length; i++){
						tmp.push({
							text: data.data[i].name,
							id: data.data[i].id
						});
					}
					var moreFlag = true;
					console.log(params.page);
					console.log(data.data.length === 0);
					if(data.data.length === 0){
						moreFlag = false;
					}
					return {
	                    results: tmp,
	                    pagination: {
	                        more: moreFlag
	                    }
	                };
				}else{
					return {
	                    results: [],
	                    pagination: {
	                        more: false
	                    }
	                };
				}
			}
		}
	});
	$(".ajaxCode button").on("click", function(){
		$("#ajaxGetDataCode,.bg").fadeIn()
	});
	$(".bg").on("click", function(){
		$("#ajaxGetDataCode,.bg").fadeOut();
	});
	// 多选
	$("#multipleSelect").select2({
		language: "zh-CN",
		width:"200px",
		placeholder:"请选择兴趣, 最多选择三项",
		maximumSelectionLength:3
	});
	// 设置默认选中
	$("#deadDate1").select2({
		language: "zh-CN",
		width:"200px"		
	});
	$("#deadDate2").select2({
		language: "zh-CN",
		width:"200px",
		data: [
			{
				id:"hlj",
				text:"黑龙江"
			},
			{
				id:"jl",
				text:"吉林"
			},
			{
				id:"ln",
				text:"辽宁",
				selected: true
			}
		]		
	});
	$("#sayncData").select2({
		language: "zh-CN",
		width:"400px",
		ajax:{
			url:"http://localhost:3000",
			type:"get",
			data: function(params){
				return {
						pageIndex: params.page || 1,
					searchText: params.term || '',
					pageSize: 7
				}
			},
			processResults: function(data, params){
				console.log(data);
			if(data.code === 200){
				var tmp = [];
				for(var i=0; i< data.data.length; i++){
					tmp.push({
						text: data.data[i].name,
						id: data.data[i].id
					});
				}
				var moreFlag = true;
				if(data.data.length === 0){
					moreFlag = false;
				}
				return {
                    results: tmp,
                    pagination: {
                        more: moreFlag
                    }
                };
			}else{
				return {
                    results: [],
                    pagination: {
                        more: false
                    }
                };
			}
		}	
		}	
	});
	$("<option value='3'>用户设置</option>").appendTo($("#sayncData"));
	// 切换data数据
	var cityDataHlj = [
		{
			id:"Hlj1",
			text:"哈尔滨"
		},{
			id:"Hlj2",
			text:"齐齐哈尔"
		},{
			id:"Hlj3",
			text:"牡丹江"
		},{
			id:"Hlj4",
			text:"大庆"
		}
	];
	var cityDataLn = [
		{
			id:"Hlj1",
			text:"沈阳"
		},{
			id:"Ln2",
			text:"大连"
		},{
			id:"Ln3",
			text:"锦州"
		},{
			id:"Ln4",
			text:"葫芦岛"
		}
	];
	var cityDataJl = [
		{
			id:"Jl1",
			text:"长春"
		},{
			id:"Jl2",
			text:"辽源"
		},{
			id:"Jl3",
			text:"通化"
		},{
			id:"Jl4",
			text:"白城"
		}
	];
	// 初始化省份
	$("#changePropvience").select2({
		language: "zh-CN",
		width:"200px",
		placeholder:"请选择省份"
	});
	// 初始化城市的函数
	function initMainCity(cityData){
		$("#mainCity").empty().select2({
			language: "zh-CN",
			width:"200px",
			data: cityData,
			placeholder:"请选择城市"
		});
	}
	// 首次初始化, 保证样式
	initMainCity([]);
	// 省份切换重新初始化城市
	$("#changePropvience").on("select2:select", function(){
		if($(this).val() == "hlj"){
			initMainCity(cityDataHlj);
		}else if($(this).val() === "ln"){
			initMainCity(cityDataLn);
		}else if($(this).val() === "jl"){
			initMainCity(cityDataJl);
		}
	});
	// 没有选择省份 点击城市的处理
	$("#mainCity").on("select2:open", function(){
		if(!$("#changePropvience").val()){
			alert("请选择省份");
			$("#mainCity").select2("close");
		}
	});
	// api 介绍
	$("#apiSelect").select2({
		language: "zh-CN",
		width:"200px",
		placeholder:"请选择省份",
		allowClear:true
	});
	// 各种事件
	$("#apiSelect").on("select2:open", function(){
		$(".status").text("select展开了");
		console.log("select展开了", $(this).val(), $(this).find("option:selected").text());
	})
	.on("select2:close", function(){
		$(".status").text("select关闭了");
		console.log("select关闭了", $(this).val(), $(this).find("option:selected").text());
	})
	.on("select2:select", function(){
		$(".status").text("点击了option");
		console.log("点击了option" , $(this).val(), $(this).find("option:selected").text());
	})
	.on("select2:clear", function(){
		console.log("点击了清除", $(this).val(), $(this).find("option:selected").text());
	})
	.on("change", function(){
		console.log("change了");
	});
	$("#jsSelected").on("click", function(){
		$("#apiSelect").val("jl").trigger("change");
	});
	// 方法
	$(".openMtd").on("click", function(){
		$("#apiSelect").select2("open");
	});
	$(".closeMtd").on("click", function(){
		$("#apiSelect").select2("close");
	});
	$(".destroyMtd").on("click", function(){
		$("#apiSelect").select2("destroy");
	});
	
	$(".initMtd").on("click", function(){
		$("#apiSelect").select2({
			language: "zh-CN",
			width:"200px",
			placeholder:"请选择省份",
			allowClear:true
		});
	});
	// 语言配置
	$("#settingLanguage").select2({
		width:"200px",
		placeholder:"请选择省份",
		allowClear:true,
		language: {
	        noResults: function() {
	　　　　　　　　　return "语言配置-未找到结果"; // 无结果
	　　　　　　　},
	        searching: function() {
	　　　　　　　　　return "语言配置-数据加载中…"; // 搜索中
	　　　　　　　},
	        errorLoading: function(){
	            return "语言配置-无法载入结果"; // 结果出错
	        },
	        loadingMore: function(){
	            return "语言配置-载入更多结果…"; // 载入更多
	        },
	        inputTooShort: function(e){
	            var t = e.minimum - e.input.length;
	            return "语言配置-请再输入至少" + t + "个字符";  // 输入字符太少
	        },
	        inputTooLong: function(e){
	            var t = e.input.length - e.maximum;
	            return "语言配置-请删除" + t + "个字符";  // 输入字符过多
	        },
	        maximumSelected: function(e){
	            var t = "t语言配置-最多只能选择" + e.maximum + "个项目"; // 多选超项
	            return t;
	        }
	　　　　}
	});
})
