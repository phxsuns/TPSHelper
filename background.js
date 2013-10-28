chrome.extension.onRequest.addListener(function(request, sender, callback){
	if(request.todo == "showIcon"){
		chrome.pageAction.show(sender.tab.id);
	}else if(request.todo == "goCopy"){
		var el = document.createElement('textarea');
        document.body.appendChild(el);
        el.value = request.text;
        el.select();
        rv = document.execCommand("copy");
        document.body.removeChild(el);
		callback && callback();
	}
});