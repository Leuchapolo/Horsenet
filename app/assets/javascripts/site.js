$(document).on('ready page:load', function () {
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
  		
 		setupProfileInfo()
 		setupNewsPosts("users/" + document.CurrentProfile +"/posts")
		});	
	} else if (document.CurrentProfileType == "Horse"){

		$.get('/api/horses/' + document.CurrentProfile, function(result){
  		document.CurrentProfileInfo = result
  		
 		setupHorseProfileInfo()
 		setupNewsPosts("horses/" + document.CurrentProfile +"/posts")
		});

	}
		
}

function setupProfileInfo(){
	$('.profileName').text(document.CurrentProfileInfo.user.name);
	var currentUserPicture = ""
	if (document.CurrentProfileInfo.user.profile_picture.url == null){
			currentUserPicture = "http://orig06.deviantart.net/e0a5/f/2010/221/e/7/darth_vader_facebook_by_piorun.png";
		} else {
			currentUserPicture = document.CurrentProfileInfo.user.profile_picture.url;
		}
	$('.profilePictureHolder').append('<img class = "currentProfilePicture" height = "160" width = "160" src = "' + currentUserPicture + '">')
	$('.infoBars').append('<div class = "riderInfo infoBar homeObject"><div class = "infoBarHeader"> Rider Info</div></div>')
		$('.riderInfo').append('<div class = "riderInfoInfo"></div>')
			$('.riderInfoInfo').append('<div class = "profileInfoDetail"> Current Show: ' + document.CurrentProfileInfo.user.current_show + '</div>')
			$('.riderInfoInfo').append('<div class = "profileInfoDetail"> Next Class: ' + document.CurrentProfileInfo.user.next_class + '</div>')
			$('.riderInfoInfo').append('<div class = "profileInfoDetail"> Specialty: ' + document.CurrentProfileInfo.user.specialization + '</div>')
	$('.infoBars').append('<div class = "horsesInfo infoBar homeObject"><div class = "infoBarHeader">Horses </div></div>')
	for (i in document.CurrentProfileInfo.horses)
	{	
		$('.horsesInfo').append('<div class = "usersHorse profileInfoDetail"> <img class = "newsPostHeaderProfPic" src = "' + document.CurrentProfileInfo.horses[i].profile_picture.url + '" height = "40" width = "40"> <div class = "usersHorseText"><a href = "/profile/horse/' + document.CurrentProfileInfo.horses[i].id + '">' + document.CurrentProfileInfo.horses[i].name + '</a>  - <span class = "horseSpecialty"> ' + document.CurrentProfileInfo.horses[i].specialty + '</span></div></div>')
	}
	$('.infoBars').append('<div class = "userInfo infoBar homeObject"><div class = "infoBarHeader">User Info</div></div>')
		$('.userInfo').append('<div class = "userInfoInfo"></div>')
			$('.userInfoInfo').append('<div class = "profileInfoDetail"> Born In: ' + document.CurrentProfileInfo.user.place_of_birth + '</div>')
			$('.userInfoInfo').append('<div class = "profileInfoDetail"> Lives In: ' + document.CurrentProfileInfo.user.current_place_of_residence + '</div>')
			$('.userInfoInfo').append('<div class = "profileInfoDetail"> Work: ' + document.CurrentProfileInfo.user.work + '</div>')
	$('.profileNameAndButtons').append('<div class = "profileBio">' + document.CurrentProfileInfo.user.bio + '</div>')


}

function setupHorseProfileInfo(){
	$('.profileName').text(document.CurrentProfileInfo.horse.name);
	var currentUserPicture = ""
	if (document.CurrentProfileInfo.horse.profile_picture.url == null){
		currentUserPicture = "http://orig06.deviantart.net/e0a5/f/2010/221/e/7/darth_vader_facebook_by_piorun.png";
	} else {
		currentUserPicture = document.CurrentProfileInfo.horse.profile_picture.url;
	}
	$('.profilePictureHolder').append('<img class = "currentProfilePicture" height = "160" width = "160" src = "' + currentUserPicture + '">')
	$('.infoBars').append('<div class = "horseInfo infoBar homeObject"><div class = "infoBarHeader"> Horse Info</div></div>')
		$('.horseInfo').append('<div class = "horseInfoInfo"></div>')
			$('.horseInfoInfo').append('<div class = "profileInfoDetail"> Birth Year: ' + document.CurrentProfileInfo.horse.birth_year + '</div>')
			$('.horseInfoInfo').append('<div class = "profileInfoDetail"> Specialty: ' + document.CurrentProfileInfo.horse.specialty + '</div>')
	$('.infoBars').append('<div class = "riderInfo infoBar homeObject"><div class = "infoBarHeader">Rider </div></div>')
	$('.riderInfo').append('<div class = "horsesRider profileInfoDetail"> <img class = "newsPostHeaderProfPic" src = "' + document.CurrentProfileInfo.rider.profile_picture.url + '" height = "40" width = "40"> <div class = "usersHorseText"><a href = "/profile/user/' + document.CurrentProfileInfo.rider.id + '">' + document.CurrentProfileInfo.rider.name + '</a>  - <span class = "horseSpecialty"> ' + document.CurrentProfileInfo.rider.specialization + '</span></div></div>')

}

function setupMakeNewPost(){
	$('.newsFeed').append('<div class = "homeObject" id = "newsUnitNewPost"></div>');
	$('#newsUnitNewPost').append('<div class = "newPostPhotoOptions"></div>')
	$('.newPostPhotoOptions').append('<span id = "newPostPhotoOptionUpdateStatus"><a class = "temporaryDisableNewPostOption" href = ""><span class = "glyphicon glyphicon-pencil newPostPhotoOptionIcon"></span>  Update Status</a> </span>')
	$('.newPostPhotoOptions').append('<span id = "newPostPhotoOptionAddPhotoVideo"><input type = "file" onchange = "handleFile(this.files)" id = "postFileUploadInput"><a class = "addPhotoLink" href = ""><span class = "glyphicon glyphicon-picture newPostPhotoOptionIcon"></span>  Add Photo/Video</a> </span>')
	$('.newPostPhotoOptions').append('<span id = "newPostPhotoOptionCreateAlbum"><a class = "temporaryDisableNewPostOption" href = ""><span class = "glyphicon glyphicon-book newPostPhotoOptionIcon"></span>  Create Album</a> </span>')
	$('.temporaryDisableNewPostOption').click(function(event){
		event.preventDefault()
		
	})
	$('.addPhotoLink').click(function(event){
		event.preventDefault()
		$('#postFileUploadInput').trigger('click');
		
	})
	$('#newsUnitNewPost').append('<div class = "newPostTextProfPic"></div>')
	$('.newPostTextProfPic').append('<img class = "newsPostHeaderProfPic" src = "' + Horsenet.CurrentUser.profile_picture.url + '" height = "40" width = "40">')
	$('.newPostTextProfPic').append('<div class = "newTextBox" id = "newPostTextBox"><textarea class = "newPostText" placeholder = "Write your post here"></textarea></div>')
	autosize($('textarea'))
	$('#newsUnitNewPost').append('<div class = "newPostActions"></div>')
	$('.newPostActions').append('<span class = "newPostActionsTagButtons"><span class="glyphicon glyphicon-tag newPostTagButton" aria-hidden="true"></span></span>')
	$('.newPostActions').append('<button type="button" class="btn btn-primary postNewPostButton">Post</button>');
	

	$('.postNewPostButton').click(function(){
		var file = document.NewPostFile
		if (file == undefined){
			file = "null";
		}

		var formData = new FormData()
		
		formData.append('post[media_file]', file);
		formData.append('post[text]', $('.newPostText').val());
		formData.append('post[original_poster_id]', Horsenet.CurrentUser.id);
		

		$.ajax({
		  url: "api/posts",
		  data: formData,
		  cache: false,
		  contentType: false,
		  processData: false,
		  method: 'POST',
		  success: function(data){
		  	$('.newPostText').val("");
			location.reload()
		  },
		  error: function(error){
		  	
		  	console.log(error)
		  }
		});

	})


}	



function setupNewsPosts(posts_source){
	
	$.ajax({
		url: "/api/" + posts_source,
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
		var opURL = ""
		
		opURL = "/profile/user/" + data[i].post.original_poster.id;
		var newsUnitHTML = '<div class = "newsUnit" id = "newsUnit' + i + '"></div>'
		var newsUnit = "newsUnit" + i;
		$('.newsFeed').append(newsUnitHTML)
		var newsUnitPost = "newsUnitPost" + [i]
		$("#" + newsUnit).prepend('<div class = "homeObject newsUnitPost" id = "' + newsUnitPost + '"> </div>')
		var postHeaderInfo = "newsUnit" + i + "postHeaderInfo"
		var postHeaderInfoHTML = '<div class = "newsPostHeaderInfo" id = "' + postHeaderInfo + '"></div>'
		$("#" + newsUnitPost).prepend(postHeaderInfoHTML)
		
		var postHeaderInfoPosters = postHeaderInfo + "Posters"
		var postHeaderInfoText = postHeaderInfo + "Text";
		var postHeaderInfoPostersHTML = '<div id = "' + postHeaderInfoPosters + '"> <span id = "'  + postHeaderInfoText + '"  class = "newsPostHeaderInfoText">' + '<a href = "' + opURL + '">' + data[i].post.original_poster.name + '</a></span></div>'
		$("#" + postHeaderInfo).append(postHeaderInfoPostersHTML)
		var postersHtml = '';
		var taggedList = [];
		
		var othersCount = 0;
		taggedList[0] = data[i].post.original_poster.id
		for (j in data[i].post_tags.tagged_objects){
			var taggedProfileURL = "/profile/";
			if ( taggedList.includes(data[i].post_tags.tagged_objects[j].id)  === false )
			{
				taggedList[j+1] = data[i].post_tags.tagged_objects[j].id 
				if (data[i].post_tags.tagged_objects[j].taggable_type != "User" ){
					taggedProfileURL += "user/"
				} else {
					taggedProfileURL += "horse/"
				}
				taggedProfileURL += data[i].post_tags.post_tags[j].taggable_id
				if (postersHtml === ''){
					postersHtml += ' with <a href = "' + taggedProfileURL + '">' + data[i].post_tags.tagged_objects[j].name + '</a>';
				} else {
					othersCount += 1;
				}
			}
		}
		if (othersCount > 0 ){
			postersHtml += ' and <a href = ""> ' +  othersCount + ' others</a>'
		}
		postersHtml += '<br>'
		var opPicture = ""
		if (data[i].post.original_poster.profile_picture.url == null){
			opPicture = "http://orig06.deviantart.net/e0a5/f/2010/221/e/7/darth_vader_facebook_by_piorun.png";
		} else {
			opPicture = data[i].post.original_poster.profile_picture.url;
		}
		$("#" + postHeaderInfo).prepend('<img class = "newsPostHeaderProfPic" src = "' + opPicture + '" height = "40" width = "40">')
		$("#" + postHeaderInfoText).append(postersHtml);
		$("#" + postHeaderInfoPosters).append('<span class = "newsPostHeaderTime">' + data[i].post.created_at + ' </span>')
		var newsUnitText = newsUnit + "text"
		$("#" + newsUnitPost).append('<p class = "newsUnitText" id = "' + newsUnitText + '"> ' + data[i].post.text + ' </p>')
		var newsUnitLikeBar = newsUnit + "likeBar"
		$("#" + newsUnitPost).append('<div id = "' + newsUnitLikeBar +'" class = "likeBar"></div>')
		var newsUnitLikeBarButtons = newsUnitLikeBar + "Buttons";
		$("#" + newsUnitLikeBar).append('<div id = "' + newsUnitLikeBarButtons + '" class = "likeBarButtons"></div>')
		$("#" + newsUnitLikeBarButtons).append('<span class = "likeBarButton"><span class = "glyphicon glyphicon-thumbs-up" ></span>  Like</span><span class = "likeBarButton"><span class = "glyphicon glyphicon-comment" ></span>  Comment</span><span class = "likeBarButton"><span class = "glyphicon glyphicon-share" ></span>  Share</span>')
		var postLikesAndComments = newsUnit + 'postLikesAndComments'
		$("#" + newsUnit).append('<div class = "postLikesAndComments" id = "'+ postLikesAndComments + '"><a> <span class = "glyphicon glyphicon-heart"></span> Taco and 12 others </a></div>')
		//adding Comment box
		var commentBox = newsUnit + "commentBox"
		$('#' + postLikesAndComments).append('<div class = "newPostTextProfPic" id = "' + commentBox +'"></div>')
		var currentUserPicture = ""
		if (Horsenet.CurrentUser.profile_picture.url == null){
			currentUserPicture = "http://orig06.deviantart.net/e0a5/f/2010/221/e/7/darth_vader_facebook_by_piorun.png";
		} else {
			currentUserPicture = Horsenet.CurrentUser.profile_picture.url;
		}
		$('#' + commentBox).append('<img class = "newsPostHeaderProfPic" src = "' + currentUserPicture + '" height = "40" width = "40">')
		$('#' + commentBox).append('<div class = "newTextBox"><textarea class = "newPostText" placeholder = "Write your post here"></textarea></div>')
		autosize($('textarea'))
	}
}

function handleFile(file){
	
	
  	var url = ""
  	var file    = file[0];
 	var reader  = new FileReader();

  	reader.addEventListener("load", function () {
  		document.NewPostFile = reader.result
    	$('#newPostTextBox').after('    + <img src = "' + reader.result + '" height = "40" width = "40">')
  	}, false);

 	if (file) {
    	reader.readAsDataURL(file);
  	}

	
}
