//别看了 下面都是屎山
var $ = mdui.$;
$("#check").hide()
var i = 0 //单词随机变量
var wrongtime = 0 //临时错误计数
var confirm_enabled = true
var choosebutton_enabled = true
var light = true // 夜间模式
var wrote_process = 0 //听写进度
var choose_process = 0 //听写进度
var write_wrong_words = new Array() //错误单词列表
var choose_wrong_words = new Array() //错误单词列表
$("#check")[0].onclick = function () { for (i = 0; i < ChineseWordsList.length; i++) { console.log(ChineseWordsList[i] + "    " + EnglishWordsList[i]) } }
$("#usersinput")[0].addEventListener("keyup", function (event) { //回车触发事件
    event.preventDefault();
    if (event.keyCode === 13 && confirm_enabled) {
        $("#confirm")[0].click();
    }
});
$("#dict_input")[0].onkeyup = function () {
    $("#dict_list").empty()
    var wordslimit = 0
    for (var i = 0; i < EnglishWordsList.length; i++) {
        if ((EnglishWordsList[i].toLowerCase().indexOf($("#dict_input")[0].value.toLowerCase()) != -1 || ChineseWordsList[i].indexOf($("#dict_input")[0].value) != -1) && ($("#dict_input")[0].value.length >= 1)) {
            $("#dict_list")[0].innerHTML += ('<li class="mdui-list-item mdui-ripple">' + EnglishWordsList[i] + "        " + ChineseWordsList[i] + '</li>')
            wordslimit++
            if (wordslimit >= 50) return;
        }
    }
}
function shownext() {
    if (confirm_enabled) {
        if ($("#usersinput")[0].value.toLowerCase() != EnglishWordsList[i].toLowerCase()) { //化为小写比对
            if ($("#is_wrongtimeselector_enabled")[0].checked) {
                if (wrongtime >= $("#wrongtimeselector")[0].selectedIndex) { //错误提示
                    window.write_wrong_words.push(i)
                    $("#usersinput")[0].value = EnglishWordsList[i]
                    $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-yellow"
                    $("#confirm")[0].innerHTML = ">_<"
                    confirm_enabled = false
                    setTimeout(function () { $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; $("#confirm")[0].innerHTML = "确定"; confirm_enabled = true }, 3000);
                } else {
                    $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-red"
                    $("#confirm")[0].innerHTML = "ⅹ"
                    setTimeout(function () { $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; $("#confirm")[0].innerHTML = "确定" }, 700);
                    wrongtime++;
                    return;
                }
            } else {
                window.wrote_process++
                window.write_wrong_words.push(i)
                $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-red"
                $("#confirm")[0].innerHTML = "ⅹ"
                setTimeout(function () {i = Math.floor(Math.random() * ChineseWordsList.length);$("#show")[0].innerHTML = ChineseWordsList[i]; $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; $("#confirm")[0].innerHTML = "确定" }, 700);
                $("#usersinput")[0].value = "";
            }
        } else {
            window.wrote_process++
            i = Math.floor(Math.random() * ChineseWordsList.length)
            $("#show")[0].innerHTML = ChineseWordsList[i];
            $("#usersinput")[0].value = "";
            $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-green"
            $("#confirm")[0].innerHTML = "√"
            setTimeout(function () { $("#confirm")[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; $("#confirm")[0].innerHTML = "确定" }, 700);
        }
        if (window.wrote_process == $("#words_count_bar")[0].value) {
            $("#write_panel")[0].style = "display: none;"
            $("#words_wrong_list").empty()
            $("#words_wrong_list")[0].innerHTML += ('<li class="mdui-list-item mdui-ripple">错误单词：</li>')
            for (var ii = 0; ii < window.write_wrong_words.length; ii++) {
                $("#words_wrong_list")[0].innerHTML += ('<li class="mdui-list-item mdui-ripple">' + EnglishWordsList[window.write_wrong_words[ii]] + "        " + ChineseWordsList[window.write_wrong_words[ii]] + '</li>')
            }
            $("#write_right_rate_div")[0].innerHTML = "正确率:" + Number($("#words_count_bar")[0].value - window.write_wrong_words.length) + "/" + $("#words_count_bar")[0].value
            $("#write_result_panel")[0].style = ""
            window.wrote_process = 0
            window.write_wrong_words = []
        }
    }
}
$("#choose_start")[0].onclick = function () {
    $("#choose_select_panel")[0].style = "display: none;"
    $("#choose_panel")[0].style = ""
    for (j = 1; j <= 4; j++) {
        $("#choosebutton" + j)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"
    }
    shownext_choose()
}
$("#write_again")[0].onclick = function () {
    $("#write_result_panel")[0].style = "display: none;"
    $("#write_select_panel")[0].style = ""
}
$("#choose_again")[0].onclick = function () {
    $("#choose_result_panel")[0].style = "display: none;"
    $("#choose_select_panel")[0].style = ""
}
$("#write_start")[0].onclick = function () {
    i = Math.floor(Math.random() * ChineseWordsList.length);
    $("#show")[0].innerHTML = ChineseWordsList[i];
    $("#write_select_panel")[0].style = "display: none;"
    $("#write_panel")[0].style = ""
}
$("#choose_count_bar")[0].onchange = function () {
    $("#choose_show_count")[0].innerHTML = "题目数量:" + $("#choose_count_bar")[0].value
}
$("#words_count_bar")[0].onchange = function () {
    $("#write_show_count")[0].innerHTML = "听写单词数量:" + $("#words_count_bar")[0].value
}
function shownext_choose() {
    if (!$("#getlangselector")[0].checked) { //检测看中还是看英
        i = Math.floor(Math.random() * EnglishWordsList.length);
        $("#choose_show")[0].innerHTML = ChineseWordsList[i]
        for (j = 1; j <= 4; j++) { //随机取4个不同
            do { k = Math.floor(Math.random() * ChineseWordsList.length) } while (i == k)
            $("#choosebutton" + j)[0].innerHTML = EnglishWordsList[k]
        }
        j = Math.floor(1 + Math.random() * 4)
        $("#choosebutton" + j)[0].innerHTML = EnglishWordsList[i];//将随机一个修改为正确
    } else { //偷懒
        i = Math.floor(Math.random() * ChineseWordsList.length)
        $("#choose_show")[0].innerHTML = EnglishWordsList[i]
        for (j = 1; j <= 4; j++) { //随机取4个不同
            do { k = Math.floor(Math.random() * ChineseWordsList.length) } while (i == k)
            $("#choosebutton" + j)[0].innerHTML = ChineseWordsList[k]
        }
        j = Math.floor(1 + Math.random() * 4)
        $("#choosebutton" + j)[0].innerHTML = ChineseWordsList[i];//将随机一个修改为正确
    }
}

function chooseword(id) {
    if (choosebutton_enabled) {
        choosebutton_enabled = false
        if (id == j) { //选对
            $("#choosebutton" + id)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-green"
            setTimeout(function () { $("#choosebutton" + id)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; shownext_choose(); choosebutton_enabled = true }, 1000);
        } else {
            window.choose_wrong_words.push(i)
            $("#choosebutton" + id)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-red"
            $("#choosebutton" + j)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-green"
            setTimeout(function () { $("#choosebutton" + id)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; $("#choosebutton" + j)[0].className = "mdui-btn mdui-btn-raised mdui-btn-block mdui-color-theme"; shownext_choose(); choosebutton_enabled = true }, 2000);
        }
        window.choose_process++
        if (window.choose_process == $("#choose_count_bar")[0].value) {
            $("#choose_panel")[0].style = "display: none;"
            $("#choose_wrong_list").empty()
            $("#choose_wrong_list")[0].innerHTML += ('<li class="mdui-list-item mdui-ripple">错误单词：</li>')
            for (var ii = 0; ii < window.choose_wrong_words.length; ii++) {
                $("#choose_wrong_list")[0].innerHTML += ('<li class="mdui-list-item mdui-ripple">' + EnglishWordsList[window.choose_wrong_words[ii]] + "        " + ChineseWordsList[window.choose_wrong_words[ii]] + '</li>')
            }
            $("#choose_right_rate_div")[0].innerHTML = "正确率:" + Number($("#choose_count_bar")[0].value - window.choose_wrong_words.length) + "/" + $("#choose_count_bar")[0].value
            $("#choose_result_panel")[0].style = ""
            window.choose_process = 0
            window.choose_wrong_words = []
        }
    }
}
function changebrightness() {
    light = !light;
    if (light) {
        $("#body")[0].className = "mdui-theme-primary-light-blue mdui-theme-accent-blue"
        $('.material-icons').first()[0].innerHTML = "brightness_2"
        return;
    }
    $("#body")[0].className = "mdui-theme-primary-light-blue mdui-theme-accent-blue mdui-theme-layout-dark"
    $('.material-icons').first()[0].innerHTML = "wb_sunny"
}
