define(['jquery','template','cookie'],function($,template){

// 所有的自己写的公共样式,处了login，login自己写了一个


 /* NProgress.start();

  NProgress.done();*/

// 控制左侧导航菜单的折叠和展开
  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });

  // 实现退出功能
  // 此处的$要依靠jq的存在
   $('#logoutBtn').click(function(){
    // console.log(111);
            /*console.log('a');
            return false;*/
            // 发送ajax请求
            $.ajax({
                type:'post',
                // 反向代理：后台解决跨域的一种方式
                url : '/api/logout',
        
                dataType:'json',
                success:function(data){
                   if(data.code==200){
                    // 退出成功
                    location.href='/main/login';
                   }
                }
                
            });
            return false;
       });

// 验证是否登录
   var sessionID=$.cookie('PHPSESSID');
   // console.log(sessionID);
   if(!sessionID&&location.pathname!='/main/login'){
    //sessionID不存在，说明退出了登录，路径名称是/main/login就不用在跳到login页面了
    //所以就是没登录且不位于登录页面就跳转到登录页面
    // location.pathname可以获取路径
    // $.cookie('PHPSESSID')可以得到session的ID，只有登录时才有
      location.href='/main/login'
   }

  // 获取登录信息  跳转到首页， 因为这个是公共页面，index也会引入，所以写在这也可以
  //将获取到的用户信息转换成对象，并填充到页面中
  var cookie=$.cookie('loginInfo');
  // 判断一下是否有数据，有再转字符串
  var loginInfo=cookie?JSON.parse(cookie):{};
  // console.log(loginInfo);
 /* $('.profile img').attr('src',loginInfo.tc_avatar);
  $('.profile h4').html(loginInfo.tc_name);
*/
  var tpl='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
  var html=template.render(tpl,loginInfo);
  $('#profileInfo').html(html);
});
	
