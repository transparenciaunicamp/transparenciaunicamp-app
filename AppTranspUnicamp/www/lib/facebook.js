var token = "1065023200223770|30f801dea119b03c6b5e530205c4f9fd";
var Facebook = {
    feed: function() {
        FB.api(
          '/OcupaTudoUnicamp/feed',
          'GET',
          {"fields":"object_id,message,created_time","access_token":token},
          function(response) {
              console.log(response);
              for (var i in response.data){
                  Facebook.checkImage(response.data[i].object_id, FeedTable.addRow(response.data[i].message));
              }
              ActivityIndicator.hide();
          }
        );
    },
    start: function() {
        window.fbAsyncInit = function() {
        FB.init({
          appId      : '1065023200223770',
          xfbml      : true,
          version    : 'v2.6'
        });
        Facebook.feed();
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    },
    checkImage: function(objectID, parentCell) {
        FB.api(
          '/'+objectID+'/picture',
          'GET', {"access_token":token},
          function(response) {
              if (response.data != null && response.data.url != null && response.data.url != 'https://fbstatic-a.akamaihd.net/rsrc.php/v2/y6/r/_xS7LcbxKS4.gif') {
                  FeedTable.insertImage(parentCell, response.data.url)
              }
          }
        );
    },
    fillWithProfilePicture: function(user, img) {
        FB.api(
          '/'+user+'/picture',
          'GET',
          {},
          function(response) {
              img.src = response.data.url;
          }
        );
    }
};