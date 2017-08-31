define(['jquery','template','bootstrap'],function($,template){
	// 请求后台接口，调用数据
	$.ajax({
		type:'get',
		url:'/api/teacher',
		datatype:'json',
		success:function(data){
			// 解析数据，渲染模板
			var html=template('teacherTpl',{list:data.result});
			// console.log(html)
			$('#teacherInfo').html(html);
			// 绑定预览点击事件
			$('.preveiw').click(function(){
				// 通过接口获取数据
				var tcId=$(this).closest('td').attr('data_tcId');
				$.ajax({
					type:'get',
					url:'/api/teacher/view',
					data:{
						tc_id:tcId
					},
					datatype:'json',
					success:function(data){
						var html=template('modalTpl',data.result);
						// console.log(html);
						$('#modalInfo').html(html);
						// 显示弹框
						$('#teacherModal').modal();
					}
				});
			});
		}
	})
});