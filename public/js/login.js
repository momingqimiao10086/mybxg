define(['jquery','cookie'],function($){
	// 实现登录功能
	 $('#loginBtn').click(function(){
            /*console.log('a');
            return false;*/
            // 发送ajax请求
            $.ajax({
                type:'post',
                // 反向代理：后台解决跨域的一种方式
                url: '/api/login',
                // 获取所有表单属性
                data:$('#loginForm').serialize(),
                dataType:'json',
                success:function(data){

                   if(data.code==200){

                    //通过cookie将获取到的后台数据传到aside页面，这样aside页面可以拿到动态的头像、用户信息
                    //JSON.stringify(data.result) cookie只能传字符串，得到的是对象，所以转换一下
                    //path:'/'  设置为根路径下，这样其他页面也可以访问
                    //将登录中从后台得到的信息设置到cookie中
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                        // 设置路径跳转到主页
                        location.href = '/main/index';
                   }else{
                    alert('用户名或密码错误');
                   }
                }
                
            });
            return false;
       });
});