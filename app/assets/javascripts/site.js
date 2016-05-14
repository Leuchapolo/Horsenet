$(document).ready(function(){
	loadCurrentUserInfoThenSetup();

	$('#messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')

	$('#favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('#favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')



})

function loadCurrentUserInfoThenSetup(){
	$.get('/api/current_user', function(result){
  		Horsenet.CurrentUser = result
 		setup()
	});
}

function setup(){
	setupMakeNewPost();
	setupNewsPosts();
}

function setupMakeNewPost(){
	$('#newsFeed').append('<div class = "homeObject" id = "newsUnitNewPost"></div>');
	$('#newsUnitNewPost').append('<div class = "newPostPhotoOptions"></div>')
	$('.newPostPhotoOptions').append('<span id = "newPostPhotoOptionUpdateStatus"><a href = "">Update Status </a> </span>')
	$('.newPostPhotoOptions').append('<span id = "newPostPhotoOptionAddPhotoVideo"><a href = "">Add Photo/Video</a> </span>')
	$('.newPostPhotoOptions').append('<span id = "newPostPhotoOptionCreateAlbum"><a href = "">Create Album</a> </span>')
	$('#newsUnitNewPost').append('<div class = "newPostTextProfPic"></div>')
	$('.newPostTextProfPic').append('<img class = "newsPostHeaderProfPic" src = "https://s-media-cache-ak0.pinimg.com/564x/c6/7c/6f/c67c6fd92582294f775b16395de246ea.jpg" height = "40" width = "40">')
	$('.newPostTextProfPic').append('<div class = "newPostTextBox"><textarea class = "newPostText" placeholder = "Write your post here"></textarea></div>')
	autosize($('textarea'))
	$('#newsUnitNewPost').append('<div class = "newPostActions"></div>')
	$('.newPostActions').append('<span class = "newPostActionsTagButtons"><span class="glyphicon glyphicon-tag newPostTagButton" aria-hidden="true"></span></span>')
	$('.newPostActions').append('<button type="button" class="btn btn-primary postNewPostButton">Post</button>');
}	



function setupNewsPosts(){
	
	$.ajax({
		url: "http://localhost:3000/api/posts/current_user_news",
		success: fillNews,
		error: function(error){
			console.log(error);
		}
	})
}

var fillNews = function(data){
	
	//to sort you just do a sort function and go deep within the nested structure to find the created at for the post_tag
	for (i in data){
		//console.log(data[i])
		var newsUnitHTML = '<div class = "homeObject" id = "newsUnit' + i + '"></div>'
		var newsUnit = "newsUnit" + i;
		$('#newsFeed').append(newsUnitHTML)
		var postHeaderInfo = "newsUnit" + i + "postHeaderInfo"
		var postHeaderInfoHTML = '<div class = "newsPostHeaderInfo" id = "' + postHeaderInfo + '"></div>'
		$("#" + newsUnit).prepend(postHeaderInfoHTML)
		
		var postHeaderInfoPosters = postHeaderInfo + "Posters"
		var postHeaderInfoText = postHeaderInfo + "Text";
		var postHeaderInfoPostersHTML = '<div id = "' + postHeaderInfoPosters + '"> <span id = "'  + postHeaderInfoText + '"  class = "newsPostHeaderInfoText">' + '<a href = "">' + data[i].post.original_poster.name + '</a></span></div>'
		$("#" + postHeaderInfo).append(postHeaderInfoPostersHTML)
		var postersHtml = '';
		var taggedList = [];

		var othersCount = 0;
		taggedList[0] = data[i].post.original_poster.id
		for (j in data[i].post_tags.tagged_objects){

			if ( taggedList.includes(data[i].post_tags.tagged_objects[j].id)  === false )
			{
				taggedList[j+1] = data[i].post_tags.tagged_objects[j].id 

				if (postersHtml === ''){
					postersHtml += ' with <a href = "">' + data[i].post_tags.tagged_objects[j].name + '</a>';
				} else {
					othersCount += 1;
				}
			}
		}
		if (othersCount > 0 ){
			postersHtml += ' and <a href = "">' +  othersCount + 'others</a>'
		}
		postersHtml += '<br>'
		$("#" + postHeaderInfo).prepend('<img class = "newsPostHeaderProfPic" src = "https://s-media-cache-ak0.pinimg.com/564x/c6/7c/6f/c67c6fd92582294f775b16395de246ea.jpg" height = "40" width = "40">')
		$("#" + postHeaderInfoText).append(postersHtml);
		$("#" + postHeaderInfoPosters).append('<span class = "newsPostHeaderTime">' + data[i].post.created_at + ' </span>')
		var newsUnitText = newsUnit + "text"
		$("#" + newsUnit).append('<p class = "newsUnitText" id = "' + newsUnitText + '"> ' + data[i].post.text + ' </p>')
		var newsUnitLikeBar = newsUnit + "likeBar"
		$("#" + newsUnit).append('<div id = "' + newsUnitLikeBar +'" class = "likeBar"></div>')
		var newsUnitLikeBarButtons = newsUnitLikeBar + "Buttons";
		$("#" + newsUnitLikeBar).append('<div id = "' + newsUnitLikeBarButtons + '" class = "likeBarButtons"></div>')
		$("#" + newsUnitLikeBarButtons).append('<span class = "likeBarButton"><span class = "glyphicon glyphicon-thumbs-up" ></span></span><span class = "likeBarButton"><span class = "glyphicon glyphicon-comment" ></span></span><span class = "likeBarButton"><span class = "glyphicon glyphicon-share" ></span></span>')
	}
}
