'use strict';

$(function(){

});

const socket = io();
const query = document.querySelector('#comment');
const html = document.querySelector('#conversation');






document.querySelector('#chat-send').addEventListener('click', () => {
	var date = new Date();
	var htmlResponse	=	"<div class=\"row message-body\">\
	<div class=\"col-sm-12 message-main-sender\">\
	<div class=\"sender\">\
	<div class=\"message-text\">" +
	query.value +
	"</div>\
	<span class=\"message-time pull-left\">"
	+ date.getHours() + ":" + date.getMinutes() +
	"</span>\
	</div>\
	</div>\
	</div>";
	query.value = '';
	console.log(query.value);
	html.innerHTML = html.innerHTML + htmlResponse;
	
});

function replyMain(e){
	var key = e.which || e.keyCode;
    if (key === 13 && query.value != "") { // 13 is enter
    	var date = new Date();
    	var htmlResponse	=	"<div class=\"row message-body\">\
    	<div class=\"col-sm-12 message-main-sender\">\
    	<div class=\"sender\">\
    	<div class=\"message-text\">" +
    	query.value +
    	"</div><span class=\"message-time pull-left\">"
    	+ date.getHours() + ":" + date.getMinutes() +
    	"</span>\
    	</div>\
    	</div>\
    	</div>";
    	html.innerHTML = html.innerHTML + htmlResponse;
    	socket.emit('chat request', query.value);
    	query.value = '';
    	console.log(query.value);
    	
    	
    console.log($('#conversation').innerHeight())

 $('#conversation').scrollTop($('#conversation')[0].scrollHeight);
    	}
};


socket.on('ai response', function(response) {

	var date = new Date();
	if(response == '') response = '(No answer...)';
	var htmlResponse = "<div class=\"row message-body\">\
	<div class=\"col-sm-12 message-main-receiver\">\
	<div class=\"receiver\">\
	<div class=\"message-text\">" +
	response +
	"</div>\
	<span class=\"message-time pull-left\">"
	+ date.getHours() + ":" + date.getMinutes() +
	"</span>\
	</div>\
	</div>\
	</div>";
	html.innerHTML = html.innerHTML + htmlResponse;
	 console.log($('#conversation').innerHeight())

 $('#conversation').scrollTop($('#conversation')[0].scrollHeight);

});

