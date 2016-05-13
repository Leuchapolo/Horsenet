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
		$(`#newsUnit${i}`).prepend(`<span class = "newsPostHeaderInfo" id = "newsUnit${i}postHeaderInfo"></span>`)
		$(`#newsUnit${i}postHeaderInfo`).append(`<span id = "newsUnit${i}postHeaderInfoPosters"> <span id = "newsUnit${i}postHeaderInfoText" class = "newsPostHeaderInfoText"><a href = "">${data[i].post.original_poster.name}</a></span><br></span>`)
		var postersHtml = ``
		var taggedList = [];

		var othersCount = 0;
		taggedList[0] = data[i].post.original_poster.id
		for (j in data[i].post_tags.tagged_objects){

			if ( taggedList.includes(data[i].post_tags.tagged_objects[j].id)  === false )
			{
				taggedList[j+1] = data[i].post_tags.tagged_objects[j].id 

				if (postersHtml === ``){
					postersHtml += ` with <a href = "">${data[i].post_tags.tagged_objects[j].name}</a>`;
				} else {
					othersCount += 1;
				}
			}
		}
		if (othersCount > 0 ){
			postersHtml += ` and <a href = ""> ${othersCount} others</a>` 
		}
		postersHtml += `<br>`
		$(`#newsUnit${i}`).prepend(`<img src = "https://s-media-cache-ak0.pinimg.com/564x/c6/7c/6f/c67c6fd92582294f775b16395de246ea.jpg" height = "40" width = "40">`)
		$(`#newsUnit${i}postHeaderInfoText`).append(postersHtml);
		$(`#newsUnit${i}postHeaderInfoText`).append(`<span class = "newsPostHeaderTime"> ${data[i].post.created_at} </span>`)

		$(`#newsUnit${i}`).append(`<p class = "newsUnitText" id = "newsUnit${i}text"> ${data[i].post.text} </p>`)
		$(`#newsUnit${i}`).append(`<div id = "newsUnit${i}likeBar" class = "likeBar"></div>`)
		$(`#newsUnit${i}likeBar`).append(`<span class = "likeBarButton"><span class = "glyphicon glyphicon-thumbs-up" ></span></span><span class = "likeBarButton"><span class = "glyphicon glyphicon-comment" ></span></span><span class = "likeBarButton"><span class = "glyphicon glyphicon-share" ></span></span>`)
	}
}
