var rellax = new Rellax('.rellax');

        $(document).ready(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 200) {
                    $(".intro_text").css({"opacity": "0"});
                    document.getElementById("scrollbtn").classList.add('fa-angle-down');
                    document.getElementById("scrollbtn").classList.remove('fa-angle-up');
                } else if ($(this).scrollTop() > 0) {
                    $(".textfade").css({"opacity": "0"});
                    $(".menubar").css({"opacity": "0"});

                } else {
                    $(".textfade").css({"opacity": "1"});
                    $(".menubar").css({"opacity": "1"});
                    $(".intro_text").css({"opacity": "1"});
                }
                if ($(this).scrollTop() > 500) {
                document.getElementById("scrollbtn").classList.remove('fa-angle-down');
                document.getElementById("scrollbtn").classList.add('fa-angle-up');
                $(".textload").css({"font-size": "50"});
                }
            })
        });

function smoothscrolldown(){
        var element = document.getElementById("main_content");
        /*element.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});*/
        $("html, body").animate({ scrollTop: $('#main_content').position().top }, 2000);
        document.getElementById("scrollhref").href="javascript:smoothscrollup();";
}
function smoothscrollup(){
        var element = document.getElementById("main_content");
        /*element.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});*/
        $("html, body").animate({ scrollTop: $('.mainbg').position().top }, 2000);
        document.getElementById("scrollhref").href="javascript:smoothscrolldown();";
}
    