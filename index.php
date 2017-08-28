<?php 
	// 后端路由
	// 路由：根据url的不同导航到不同的页面
	// 默认文件夹名称
	$dir='main';
	// 默认文件名称
	$filename='index';
	// 判断数组$_SEVEN中是否包含指定属性 array_key_exists('PATH_INFO',$_SERVERS)
	// 判断路径是否存在
	if(array_key_exists('PATH_INFO',$_SERVER)){
		//获取路径
		$path=$_SERVER['PATH_INFO'];
		// 去掉第一个斜杠  php中从第二个开始截取,先去掉第一个斜杠  main/index
		$str=substr($path,1);
		// 路径 格式 /main/index
		//按照/分割目录名称和文件名称  main   index
		$arr=explode('/',$str);
		if(count($arr)==2){
			// 说明分开了
			// 覆盖默认的目录名称
			$dir=$arr[0];
			// 覆盖默认的文件名称
			$filename=$arr[1];
		}else{
			//如果没拆分开， 跳转到登录页面
			$filename='login';
		}
		
		
	}
	// 嵌入一个页面
		include('./view/'.$dir.'/'.$filename.'.html');

	//可以嵌入其他页面（html），如果其他页面中含有php代码，也可以解析出来
	// include('./view/main/index.html');
?>