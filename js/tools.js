//setcookie('cookie2years', 'Cookie будет жить 2 года', (new Date).getTime() + (2 * 365 * 24 * 60 * 60 * 1000));
// alert(getCookie('cookie2years'));
var mobileWidth = false;
function setcookie(name, value, expires, path, domain, secure)
{
    document.cookie =	name + "=" + escape(value) +
        ((expires) ? "; expires=" + (new Date(expires)) : "") +
        ((path) ? "; path=/" : "; path=/") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}


/**
 * Получить значение куки по имени name
 *
 */
function getcookie(name)
{
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;

    if (cookie.length > 0)
    {
        offset = cookie.indexOf(search);

        if (offset !== -1)
        {
            offset += search.length;
            end = cookie.indexOf(";", offset)

            if (end === -1)
            {
                end = cookie.length;
            }

            setStr = unescape(cookie.substring(offset, end));
        }
    }

    return(setStr);
}

function array_unique(a) {
    //var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function arrayItemCompare(field, order) {
    var len = arguments.length;
    if(len === 0) {
        return function(a, b){ return (a < b && -1) || (a > b && 1) || 0 };
    }
    if(len === 1) {
        switch(typeof field) {
            case 'number':
                return field < 0 ?
                    function(a, b){ return (a < b && 1) || (a > b && -1) || 0} :
                    function(a, b) { return (a < b && -1) || (a > b && 1) || 0};
            case 'string':
                return function(a, b) { return (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0};
        }
    }
    if(len === 2 && typeof order === 'number') {
        return order < 0 ?
            function(a, b){ return ((a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) }:
            function(a, b){ return ((a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0)};
    }
    var fields, orders;
    if(typeof field === 'object') {
        fields = Object.getOwnPropertyNames(field);
        orders = fields.map(function(key){ return field[key]});
        len = fields.length;
    } else {
        fields = new Array(len);
        orders = new Array(len);
        for(let i = len; i--;) {
            fields[i] = arguments[i];
            orders[i] = 1;
        }
    }
    return function(a, b) {
        for(let i = 0; i < len; i++) {
            if(a[fields[i]] < b[fields[i]]) return orders[i];
            if(a[fields[i]] > b[fields[i]]) return -orders[i];
        }
        return 0;
    };
}

function el_postfix(number, one, two, five) {
    number = typeof number != "undefined" ? parseInt(number) : 0;
    var out = '';
    if (number > 20) {
        var numArr = String(number);
        number = numArr[numArr.length - 1];
        out = el_postfix(number, one, two, five);
    } else if (number === 1) {
        out = one;
    } else if (number > 1 && number < 5) {
        out = two;
    } else if (number >= 5 || number === 0) {
        out = five;
    }
    return out;
}


function floatRound(num, presicion){
    /*presicion = (presicion != undefined) ? presicion : 1;
    var m = Math.pow(10, parseInt(presicion));
    return (parseInt(num * m)) / m;
    var d = presicion || 1,
        m = Math.pow(10, d),
        n = +(d ? num * m : num).toFixed(8),
        i = Math.floor(n), f = n - i,
        e = 1e-8,
        r = (f > 0.5 - e && f < 0.5 + e) ?
            ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;*/
    decimals = (presicion !== undefined) ? presicion : 1;
    return Number(Math.round(num+'e'+decimals)+'e-'+decimals);

}

function addExportFrame(path) {
    var $ef = $("#export_frame");
    if (!$ef.is("iframe")) {
        $("body").after("<iframe id='export_frame' width='0' height='0' frameborder='0'></iframe>");
    }
    $ef.attr("src", path);
}

// использование Math.round() даст неравномерное распределение!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function function_exists(function_name) {
    if (typeof function_name == 'string') {
        return (typeof window[function_name] == 'function');
    } else {
        return (function_name instanceof Function);
    }
}

function genPass(maxChars) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < maxChars; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function copyToClipboard(fieldId) {
    $(fieldId).focus().select();
    return document.execCommand('copy');
}

/*PopUp*/
function showPopup(mode, id) {
    if(!requestMode) {
        $("#popup-" + mode).html("<p style='height:400px'>&nbsp;</p>");
        $("body").addClass("no-scroll");
        $.post("/", {getPopup: 1, ajax: 1, mode: mode, id: id}, function (data) {
            //console.log(data);
            $("#popup-" + mode).html(data);
            $("#popup-" + mode + ", #popup-overlay").css("display", "block");
            centerPopup(mode);
            slidersInit("popup-" + mode);
            $(".hotel-event[data-value='" + id + "'] .ui.loader").remove();
            //initForms();
        });
    }
}

function centerPopup(mode) {
    var $popup = $("#popup-" + mode),
    $body = $("body");
    var windowWidth = parseInt($popup.css("width").replace("px")),
        windowHeight = parseInt($popup.css("height").replace("px")),
        screenWidth = $body.width(),
        screenHeight = $body.height();
    $popup.css({"left": (screenWidth / 2) - (windowWidth / 2), "top": (screenHeight / 2) - (windowHeight / 2)});
}

function notify(result, title, html){
    $("body").append('<div class="modal_container">' +
        '<div class="modal ' + result + '">' +
        '<div class="title">' + title + '</div>' +
        '<div class="modal_content">' + html + '<input type="submit" class="submit-button close" value="Закрыть"></div></div></div>');
    $(".modal_container, .close").on("click", function(){
        $(".popup").fadeOut(200);	// Медленно убираем всплывающее окн
        setTimeout(function () {	// Выставляем таймер
            $(".modal_container, .modal").remove(); // Удаляем разметку всплывающего окна
        }, 200);
    });

}

var uploadedFiles;
function initForms() {
    $("form.ajaxFrm").on("submit", function (e) {
        e.preventDefault();
        var form = $(this);
        form.find("button[type=submit]").addClass("loading");
        /*form.addClass("disabled");
        setTimeout(function () {
            form.find("input, select").attr("disabled", true).addClass("disabled");
        }, 500);*/
        var data = new FormData(form[0]);
        if(uploadedFiles.length > 0) {
            $.each(uploadedFiles, function (key, value) {
                data.append(key, value);
            });
        }

        $.ajax({
            url: '/',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function( respond ){

                if( typeof respond.error === 'undefined' ){
                    if (respond.result === true) {
                        if(typeof respond.resultText != "undefined") {
                            notify("success", "Отлично!", respond.resultText);
                            form.removeClass("disabled").trigger("reset");
                            form.find(".hide").html("");
                            if(uploadedFiles.length > 0) {
                                $("#attachZone .removeUpload").click();
                            }
                        }
                    } else {
                        if(typeof respond.resultText != "undefined") {
                            notify("error", "Ошибка", respond.resultText);
                            if(typeof respond.errorFields != "undefined"){
                                highlightFields(respond.errorFields);
                            }
                        }
                    }
                    form.find("button[type=submit]").removeClass("loading");
                    form.removeClass("disabled");
                    setTimeout(function () {
                        form.find("input, select").attr("disabled", false).removeClass("disabled");
                    }, 500);
                }
                else{
                    console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
                }
            },
            error: function( jqXHR, textStatus ){
                console.log('ОШИБКИ AJAX запроса: ' + textStatus );
            }
        });

        return false;
    });
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = "0" + dd
    }

    if (mm < 10) {
        mm = "0" + mm
    }

    return dd + "." + mm + "." + yyyy;
}

function decodeHtml(text) {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/, '<')
        .replace(/&gt;/, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}


function htmlspecialchars(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&/g, "&amp;");
        /* must do &amp; first */
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }
    return str;
}

function highlightFields(fieldNameArr) {
    $(".error").removeClass("error");
    for (var i = 0; i < fieldNameArr.length; i++) {
        $("*[name=" + fieldNameArr[i] + "]").addClass("error");
    }
}



$(document).ready(function(){
    //$("input[type=tel]").mask('+7 (999) 999-99-99');
    initForms();
});
