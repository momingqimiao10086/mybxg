define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
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
	// ajax 的方式提交
	/*function submitForm(url){
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
	*/
	// 用插件的方式提交表单
	function submitForm(url){
		$('#formId').validate({
			// 禁止默认提交
			sendForm:false,
			valid:function(){
				// console.log(111);
				// 有数据说明可以提交，要做验证处理，添加属性
				$(this).ajaxSubmit({
					type:'post',
					url:url,
					success:function(data){
						// console.log(data);
						if(data.code==200){
							location.href='/teacher/teacher_list';
						}
					}
				});
			},
			// tc_name的提示信息 定制属性
			description:{
				tc_name:{
					required:'用户名不能为空',
					valid:'用户名可以使用'
				},
				tc_pass:{
					required:'密码不能为空',
					valid:'密码可以使用',
					pattern:'必须是6位数字'
				},
				tc_join_date:{
					required:'日期不能为空',
					valid:'日期可以使用'
				}
			}
		});
	}
});