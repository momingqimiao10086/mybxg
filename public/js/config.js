require.config({
	//配置文件  配置所有的路径
	// 注意路径/表示从根路径开始，否则表示从当前路径，
	baseUrl:'/public/assets',
	paths:{
		jquery:'jquery/jquery.min',
		cookie:'jquery-cookie/jquery.cookie',
		template:'artTemplate/template-web',
		bootstrap:'bootstrap/js/bootstrap',
		common:'../js/common',
		login:'../js/login',
		teacherlist:'../js/teacher-list'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	}
});