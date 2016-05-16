$(document).ready(function(){
	loadCurrentUserInfoThenSetup();

	$('.messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('.messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('.messages').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')

	$('.favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('.favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')
	$('.favorites').append('<div class = "homeObject">Here is some text to fill the page because it looks better if I have something here. Dont you agree? </div>')



})

function loadCurrentUserInfoThenSetup(){
	$.get('/api/current_user', function(result){
  		Horsenet.CurrentUser = result
 		setupPage()
	});
}

function setupPage(){
	setupMakeNewPost();
	if ($('#profileTimeLine').length == 0){
		setupNewsPosts("posts/current_user_news");
	} else {
		loadProfileInfoThenSetup()
	}

	
}

function loadProfileInfoThenSetup(){
	if (document.CurrentProfileType == "User")
	{
		$.get('/api/users/' + document.CurrentProfile, function(result){
  		document.CurrentProfileInfo = result
  		console.log(result)
 		setupProfileInfo()
 		setupNewsPosts("users/" + document.CurrentProfile +"/posts")
		});	
	}
		
}

function setupProfileInfo(){
	$('.profileName').text(document.CurrentProfileInfo.name);
	$('.infoBars').append('<div class = "riderInfo infoBar homeObject"><div class = "infoBarHeader"> Rider Info</div></div>')
		$('.riderInfo').append('<div class = "riderInfoInfo"></div>')
			$('.riderInfoInfo').append('<div class = "profileInfoDetail"> Current Show: ' + document.CurrentProfileInfo.current_show + '</div>')
			$('.riderInfoInfo').append('<div class = "profileInfoDetail"> Next Class: ' + document.CurrentProfileInfo.next_class + '</div>')
			$('.riderInfoInfo').append('<div class = "profileInfoDetail"> Specialty: ' + document.CurrentProfileInfo.specialization + '</div>')

	$('.infoBars').append('<div class = "userInfo infoBar homeObject"><div class = "infoBarHeader">User Info</div></div>')
		$('.userInfo').append('<div class = "userInfoInfo"></div>')
			$('.userInfoInfo').append('<div class = "profileInfoDetail"> Born In: ' + document.CurrentProfileInfo.place_of_birth + '</div>')
			$('.userInfoInfo').append('<div class = "profileInfoDetail"> Lives In: ' + document.CurrentProfileInfo.current_place_of_residence + '</div>')
			$('.userInfoInfo').append('<div class = "profileInfoDetail"> Work: ' + document.CurrentProfileInfo.work + '</div>')
	$('.infoBars').append('<div class = "horsesInfo infoBar homeObject"><div class = "infoBarHeader">Horses </div></div>')
	$('.profileNameAndButtons').append('<div class = "profileBio">' + document.CurrentProfileInfo.bio + '</div>')


}

function setupMakeNewPost(){
	$('.newsFeed').append('<div class = "homeObject" id = "newsUnitNewPost"></div>');
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
	$('.postNewPostButton').click(function(){
		$.ajax({
			url: "api/posts",
			method: "POST",
			error: function(error){console.log(error)},
			data: {
				text: $('.newPostText').val(),
				original_poster_id: Horsenet.CurrentUser.id
			},
			success: function(data){
				$('.newPostText').val("");
				
			}
		})
	})


}	



function setupNewsPosts(posts_source){
	
	$.ajax({
		url: "api/" + posts_source,
		success: fillNews,
		error: function(error){
			console.log(error);
		}
	})
}

var fillNews = function(data){
	console.log(data)

	//to sort you just do a sort function and go deep within the nested structure to find the created at for the post_tag
	for (i in data){
		//console.log(data[i])
		var newsUnitHTML = '<div class = "homeObject" id = "newsUnit' + i + '"></div>'
		var newsUnit = "newsUnit" + i;
		$('.newsFeed').append(newsUnitHTML)
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
			postersHtml += ' and <a href = ""> ' +  othersCount + ' others</a>'
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
