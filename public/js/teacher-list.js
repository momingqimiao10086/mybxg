define(['jquery','template','util','bootstrap'],function($,template,u){
	
	// 选中当前点击的这个a标签，并添加类名
	u.setMenu(location.pathname);
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
				var tcId=$(this).closest('td').attr('data-id');
				$.ajax({
					type:'get',
					url:'/api/teacher/view',
					data:{
						tc_id:tcId
					},
					dataType:'json',
					success:function(data){
						// console.log(data);
						var html=template('modalTpl',data.result);
						// console.log(html);
						$('#modalInfo').html(html);
						// 显示弹框
						$('#teacherModal').modal();
					}
				});
			});
			$('.eod').click(function(){
				//console.log(123);
				var td=$(this).closest('td');
				var tcId=td.attr('data-id');
				//console.log(tcId);
				var tcStatus=td.attr('data-status');
				var that=this;
				$.ajax({
					type:'post',
					url:'/api/teacher/handle',
					
					data:{
						tc_id:tcId,
						tc_status:tcStatus
					},
					dataType:'json',
					success:function(data){
						console.log(data);
						td.attr('data-status',data.result.tc_status);
						if(data.result.tc_status==0){
							$(that).html('注 销');
						}else{
							$(that).html('启 用')
						}
					},
					error: function(aaa){
						console.log(aaa);
					}
				});
				
			});
		}
	});
});