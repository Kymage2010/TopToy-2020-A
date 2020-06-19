var swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    loop: true,
});
$(document).ready(function () {
    $('ul.accord > li.parent > a').click(function (e) {
        e.preventDefault();
        var state = $(this).next('.sub_parent').css("display");
        if (state === "none") {
            $('.sub_parent').slideUp('normal');
            $('ul.accord > li.parent > a').removeClass('active');
            $(this).addClass('active').next('.sub_parent').slideDown('normal');
            setcookie("openMainMenu", $(this).parent("li").index(), (new Date).getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
        } else {
            $(this).addClass('active').next('.sub_parent').slideUp('normal');
        }
        return false;
    });

    $(".sub_parent li a").on("click", function () {
        $(".sub_parent li a").removeClass("active");
        $(this).addClass("active");
        $(".menu_adaptive").removeClass("show");
    });
    $(".icon.burger").on("click", function () {
        var $md = $(".menu_adaptive");
        if ($md.hasClass("show")) {
            $md.removeClass("show");
        } else {
            $md.addClass("show");
        }
    });

    $(".close_box").on("click", function(){
        let $filter = $("#filter_show");
        if($filter.css("display") === "none"){
            $filter.slideDown("fast");
            $(this).addClass("open");
            setcookie("openTopFilter", "1", (new Date).getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
        }else{
            $filter.slideUp("fast");
            $(this).removeClass("open");
            setcookie("openTopFilter", "0", (new Date).getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
        }
    });

    var li = $('ul.accord > li.parent'),
        menuOpenItem = parseInt(getcookie("openMainMenu")),
        filterShow = parseInt(getcookie("openTopFilter"));
    $(li[menuOpenItem]).find("a").click();
    $("#filter_show").css("display", (filterShow === 1) ? "flex" : "none");

});
