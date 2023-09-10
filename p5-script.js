$(document).ready(function () {
    var API_KEY = "AIzaSyD1_CBjdlenYfBwGv-R7D1RTriqdOJrKFA";
    var video = "";
    var player; 
    var videoId;

    $("#form").submit(function (event) {
        event.preventDefault();
        var search = $("#search").val();
        videoSearch(API_KEY, search, 20);
    });

    function videoSearch(key, search, maxResults) {
        $("#videos").empty();

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
            console.log(data);

            data.items.forEach(item => {
                video = `
                <iframe width="420" height="315" src ="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `;

                $("#videos").append(video);
            });

           
            $("iframe").click(function () {
                var videoUrl = $(this).attr("src");
                var videoId = videoUrl.split("/").pop();
                player.cueVideoById(videoId);
                player.playVideo();
            });
        });
    }


    function onYouTubeIframeAPIReady() {
        console.log("api is loaded");
        player = new YT.Player("player", {
            height: 400,
            width: 900,
            videoId: "",
            playerVars: {
                playersinline: 1,
                autoplay: 0,
                controls: 1
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    }

    function onPlayerReady() {
        console.log('ready');
    }

    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
        }
    }
})
