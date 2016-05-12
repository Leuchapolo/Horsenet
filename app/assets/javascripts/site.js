$(document).ready(function(){
	$.ajax({
		url: "http://localhost:3000/api/posts/current_user_news",
		success: fillNews,
		error: function(error){
			console.log(error);
		}
	})
	$('#messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')

	$('#favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')

})

var fillNews = function(data){
	console.log(data);
	//to sort you just do a sort function and go deep within the nested structure to find the created at for the post_tag
	for (i in data){
		//console.log(data[i])
		$('#newsFeed').append(`<div class = "homeObject" id = "newsUnit${i}"></div>`)
		$(`#newsUnit${i}`).prepend(`<div id = "newsUnit${i}postHeaderInfo"></div>`)
		$(`#newsUnit${i}postHeaderInfo`).append(`<a href = "">${data[i].post.original_poster.name}</a><br>`)
		// $(`#newsUnit${i}postHeaderInfo`).append(`<p> ${data[i].post_tag} </p>
	}
}
