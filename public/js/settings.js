define(['jquery','template','util','ckeditor','datepicker','language','uploadify','region','validate','form'],function($,template,util,EDITOR){
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
			$('#upfile').uploadify({
				// 可以设置图片宽高
				width:120,
				height:120,
				//设置文本信息，（按钮上的文字）
				buttonText:'',
				// 进度条设置
				// itemTemplate:'<span></span>',
				// 后台根据这个名字调用接口/得到文件
				fileObjName:'tc_avatar',
				// flash的工具文件 位置就是存放的路径
				swf:'/public/assets/uploadify/uploadify.swf',
				// 后台接口，文件传给谁  接收上传文件的后台接口
				uploader:'/api/uploader/avatar',
				// 成功回调函数 film对象 数据
				onUploadSuccess:function(f,data){
					// console.log(33);
					// 将字符串转换成对象
					var data=JSON.parse(data);
					// 设置图片的路径来添加图片
					$('.preview img').attr('src',data.result.path);
				}
				
			});
			// 省市县三级联动
			$('#pcd').region({
				url:'/public/assets/jquery-region/region.json',
				
			});
			//chuliwenben
			CKEDITOR.replace('editor',{
				
      			toolbarGroups :[
          			{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          			{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          			{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
          			{ name: 'others', groups: [ 'others' ] }
        		]
    
			});
			// chulibiaodantijiao
			$('#settingForm').validate({
				sendForm:false,
				valid:function(){
					// tongbu fuwenbenxinxidao textarea
					for(var instance in CKEDITOR.instances){
						// huoqu dangqiande shili   updateElement()   tijiaodao fuwenben
						CKEDITOR.instances[instance].updateElement();
					}
					// huoqubeixuanzhongd p de neirong
					var p=$('#p').find('option:selected').text();
					var c=$('#c').find('option:selected').text();
					var d=$('#d').find('option:selected').text();

					var hometown=p+'|'+c+'|'+d;
					$(this).ajaxSubmit({
						type:'post',
						url:'/api/teacher/modify',
						data:{tc_hometown:hometown},
						dataType:'json',
						success:function(data){
							console.log(data);
						}

					});
				}
			})
		}
	});
})