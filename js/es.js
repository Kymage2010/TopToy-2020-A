var swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.next'
        , prevEl: '.prev'
    , }
    , loop: true
, });
$(document).ready(function () {
    var li = $('ul.accord > li.parent')
        , menuOpenItem = parseInt(getcookie("openMainMenu"))
        , filterShow = parseInt(getcookie("openTopFilter"))
        , $close_box = $(".close_box")
        , $filter_show = $("#filter_show");
    $('ul.accord > li.parent > a').click(function (e) {
        var $child = $(this).next('.sub_parent');
        if($child.is("ul")) {
            e.preventDefault();
            var state = $child.css("display");
            if (state === "none") {
                $('.sub_parent').slideUp('normal');
                $('ul.accord > li.parent > a').removeClass('active');
                $(this).addClass('active').next('.sub_parent').slideDown('normal');
                setcookie("openMainMenu", $(this).parent("li").index(), (new Date).getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
            } else {
                $(this).addClass('active').next('.sub_parent').slideUp('normal');
            }
            return false;
        }
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
        }
        else {
            $md.addClass("show");
        }
    });
    $close_box.on("click", function () {
        let $filter = $("#filter_show");
        if ($filter.css("display") === "none") {
            $filter.slideDown("fast");
            $(this).addClass("open");
            setcookie("openTopFilter", "1", (new Date).getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
        }
        else {
            $filter.slideUp("fast");
            $(this).removeClass("open");
            setcookie("openTopFilter", "0", (new Date).getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
        }
    });
    $(li[menuOpenItem]).find("a").click();
    if (filterShow === 1) {
        $filter_show.css("display", "flex");
        $close_box.addClass("open");
    }
    else {
        $filter_show.css("display", "none");
        $close_box.removeClass("open");
    }
    /*header stick*/
   // function Header() {
   //   65 < $(window).scrollTop() ? ($("header").css("position", "sticky").css("box-shadow", "0 -3px 6px 4px var(--icon)").css("padding", //"0").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend")) : ($("header").css("position", "inherit").css("box-shadow", //"none").css("padding", "0.75rem 0").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend"))
   // }
   // Header(), $(window).scroll(function () {
   //     Header()
   // });
    
});

/*кривые ручки*/
    $(document).ready(function () {
        //Скрыть PopUp при загрузке страницы    
        shopHide();
    });
    //Функция отображения PopUp
    function shopShow() {
        $("#shop").slideDown("slow").css("top","0");
    }
    //Функция скрытия PopUp
    function shopHide() {
        $("#shop").slideUp("slow");
    }
    /**/

/*кривые ручки 2*/
    $(document).ready(function () {
        //Скрыть PopUp при загрузке страницы    
        favoreHide();
    });
    //Функция отображения PopUp
    function favoreShow() {
        $("#favore").slideDown("slow").css("top","0");
    }
    //Функция скрытия PopUp
    function favoreHide() {
        $("#favore").slideUp("slow");
    }
    /**/

