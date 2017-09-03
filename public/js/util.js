define(['jquery'],function($){
	// 封装菜单工具函数
	return {
		setMenu:function(path){
		$('.navs a[href="'+path+'"]').addClass('active');
	},
	qs :function(key){
		// 获取地址栏中的属性值
		//截去？ locaton.search获取地址栏参数信息（包括？）
		var param=location.search.substring(1);
		var result=null;
		if(param){
			// 把每一个键值对截取出来 就是item
			var kvs=param.split('&');
			// 再遍历得到每一个key，获取到值
			$.each(kvs,function(i,item){
				var kv=item.split('=');
				if(kv[0]==key){
					result=kv[1];
					return false;
				}
			});
			return result;
		}
	}
	}

	
});