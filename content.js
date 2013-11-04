(function(){
	
	chrome.extension.sendRequest({todo:"showIcon"});//通知后端显示图标
	
	var ifm = document.getElementById('tps-upload');
	ifm.onload = function(){
		
		var d = ifm.contentDocument;
		//上传信息
		var btn = d.getElementById('J_UploadBtn');
		var configString = btn.getAttribute('data-config');
		var config = JSON.parse(configString);
		var servconf = config.serverConfig;
		//console.log(config);
		var action = servconf.action;
		var data = servconf.data;
		
		d.body.addEventListener("paste", function(e){
			var item = e.clipboardData.items[0];
			if(!item) return;
			var file = item.getAsFile();
			var xhr = new XMLHttpRequest();
			xhr.onload =  function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var r = (xhr.responseText);
					console.log(r);
					var json_r = JSON.parse(r)
					chrome.extension.sendRequest({todo:"goCopy",text:json_r.url},function(){
						ifm.contentWindow.location.reload();
					});
				}
			};

			if(xhr.upload){
				xhr.open("POST", action, true);
				var formData = new FormData();
				formData.append('photo', file,'剪贴板图.png');
				for(v in data){
					formData.append(v,data[v]);
				}
				xhr.send(formData);
			}
			
		});
		
	}

}).call(this);