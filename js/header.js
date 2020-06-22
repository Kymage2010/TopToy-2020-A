function Header() {
    0 < $(window).scrollTop() ? ($("header").css("position", "sticky").css("box-shadow", "0 -3px 6px 4px var(--icon)").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend")) : ($("header").css("position", "inherit").css("box-shadow", "none").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend"))
}
Header(), $(window).scroll(function () {
    Header()
});