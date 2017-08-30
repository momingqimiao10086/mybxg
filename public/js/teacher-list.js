define(['jquery','template'],function($,template){
	// 请求后台接口，调用数据
	$.ajax({
		type:'get',
		url:'/api/teacher',
		datatype:'json',
		success:function(data){
			// 解析数据，渲染模板
			var html=template('teacherTpl',{list:data.result});
			$('#teacherInfo').html(html);
		}
	})
});