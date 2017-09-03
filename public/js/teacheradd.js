define(['jquery','template','util'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/teacher/teacher_list');
	// 获取地址栏中的ID值
	var tcId=util.qs('tc_id');
	// console.log(tcId);
	// 根据ID查询对应的讲师详细信息
	if(tcId){
		// 编辑讲师
		$.ajax({
		type:'get',
		url:'/api/teacher/edit',
		data:{
			tc_id:tcId
		},
		dataType:'json',
		success:function(data){
			// console.log(data);
			// 渲染页面：
			data.result.operate='讲师编辑';
			var html=template('teacherTpl',data.result);
			$('#teacherInfo').html(html);
			// 绑定编辑的提交事件
			submitForm('/api/teacher/update');
		}
	});
	}else{
		// 添加讲师
		var html=template('teacherTpl',{operate:'讲师添加',tc_gender:1});
			$('#teacherInfo').html(html);
		// 绑定添加的提交事件
		submitForm('/api/teacher/add');
	}

	function submitForm(url){
		$('#formBtn').click(function(){
			$.ajax({
			type:'post',
			url:url,
			// 表单序列化
			data:$('#formId').serialize(),
			dataType:'json',
			success:function(data){
				// console.log(data);
				if(data.code==200){
					// console.log(123)
					location.href='/teacher/teacher_list';
				}
			}
		});
		})
		
	}
	

});