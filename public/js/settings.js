define(['jquery','template','util'],function($,template,util){
	// 设置导航菜单
	util.setMenu('/main/index');
	// 调用后台接口获取所有的个人信息
	$.ajax({
		type:'get',
		url:'/api/teacher/profile',
		dataType:'json',
		success:function(data){
			// console.log(data);
			// 渲染页面
			var html=template('settingsTpl',data.result);
			$('#settingsInfo').html(html);
		}
	})
})