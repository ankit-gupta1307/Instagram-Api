
	$(document).ready(function(e){
		
		var redirectedUrl = window.location.href;
		var index = redirectedUrl.indexOf("=");
		var accessToken = redirectedUrl.substr(index+1);
		
	/* This function will load the basic information of the user.	*/
		function loadBasicInformation() {	
			var basicInfoUrl = 'https://api.instagram.com/v1/users/self/?access_token='+accessToken ;
			$.ajax({
				type: 'GET',
				dataType: "jsonp",
				cache: false,
				url: basicInfoUrl,
				
				success: function(data) {
					var userName = data.data.username;
					var name = data.data.full_name;
					var image = data.data.profile_picture;
					var userID = data.data.id;
					var followerCount = data.data.counts.followed_by;
					var followingCount = data.data.counts.follows;
					$('#basicInfo').append( '<img src = "' + image + '"/>' );
					$('#basicInfo').append('<p> UserName: '+ userName + '</p>');
					$('#basicInfo').append('<p> Name: ' + name + '</p>');
					$('#basicInfo').append('<p> UserID: '+ userID + '</p>');
					$('#basicInfo').append('<p> Number of followers: '+ followerCount + '</p>');
					$('#basicInfo').append('<p> Number of following: '+ followingCount + '</p>');
					 
				}
				});
				};
				loadBasicInformation();
				
			 
		/* This function will load the media uploaded by the user 5 at a times */	
		function loadMedia() {
		var newUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&count=5';

		displayImages(newUrl);
    /* This number and click are used so that we can implement pagination property */
		var number = 0, click = 1;
			function displayImgages(url) {
				$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: url,
				success: function(data) {
				 
					for(var i=0;i<data.data.length; i++) {
						var pictures = data.data[i].images.low_resolution.url;
						var likes = data.data[i].likes.count;
						var comments = data.data[i].comments.count;
						$("#gallery").append('<img src = "'+data.data[i].images.standard_resolution.url+'"/>' + '<h3 class = "likes"> Above picture details' + '<li>Number of likes: ' + likes +'</li>'+'<li>Number of comments: '+ comments +'</li>');
					};
					 
					if(number<click) {
						newUrl = data.pagination.next_url ;
						return newUrl;
					}
				}
			});
		}
			/*binding Load more button to click function of jQuery */
			 $('#more').click(function(){
				 number++;
				 click++;
				 displayImgs(newUrl);
			 });
		 };
		 loadMedia();
		
		 
	});
	

    











