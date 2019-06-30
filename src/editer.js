// 功能：
// 上一步，下一步，加粗，倾斜，下划线，删除线，上标，下标，字体颜色，主题颜色，
// 清除格式，有序|无序列表，段落格式，字体，字号，左|中|右对齐，创建|取消超链接，
// 表情，图片，视频，音乐，分隔线

// 初始化编辑器,init()函数传入编辑器容器
function init(editerContainer = null) {
    //是否显示源码状态
    let iscode = false;
    //获取容器,创建编辑器元素
    editerContainer.innerHTML = '<section class="editer-tools" id="editer-tools"></section><article id="editer" contentEditable><p><br></p></article>';
    let toolsContainer = document.getElementById("editer-tools");
    let editer = document.getElementById("editer");

    //编辑器默认设置
    editer.focus();
    editer.spellcheck = false;
    document.execCommand("defaultParagraphSeparator", false, "P");
    // 功能名称
    let icons = "失活编辑器_源码_上一步_下一步_加粗_倾斜_下划线_删除线_上标_下标_字体_字体大小_字体颜色_主题颜色_清除格式_有序列表_无序列表_左对齐_右对齐_居中对齐_两端对齐_创建链接_取消链接_插入图片_插入视频_插入音乐_插入分隔线_首行缩进";
    // 功能识别码
    let iconsId = "active_code_undo_redo_bold_italic_underline_deleteline_subup_subdown_fontname_fontsize_fontcolor_backgrandcolor_cleanformat_ol_ul_left_right_center_full_createlink_deletelink_image_video_audio_hr_indent";
    icons = icons.split("_");
    iconsId = iconsId.split("_");
    // 添加功能按钮
    for (let i in icons) {
        let btn = document.createElement("BUTTON");
        btn.innerHTML = icons[i];
        btn.setAttribute("title", icons[i]);
        btn.setAttribute("id", iconsId[i]);
        toolsContainer.appendChild(btn);
    }

    //动态调整元素宽高以获得最佳显示效果
    toolsContainer.style['width'] = toolsContainer.parentNode.offsetWidth + 'px';
    editer.style['padding-top'] = '5px';
    editer.style['min-height'] = editer.parentNode.offsetHeight - 16 + "px";

    //获取颜色RGB值
    function pickcolor() {
        //
    }

    // 按钮功能实现
    toolsContainer.onclick = function(e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case "active":
                    (function() {
                        let btns = toolsContainer.childNodes;
                        if (!editer.isContentEditable) {
                            editer.contentEditable = true;
                            for (let btn of btns) {
                                if (btn.nodeName == "BUTTON" && btn.id != "active") {
                                    btn.disabled = false;
                                }
                            }
                            editer.focus();
                            document.getElementById("active").innerHTML = "失活编辑器";
                        } else {
                            editer.contentEditable = false;
                            for (let btn of btns) {
                                if (btn.nodeName == "BUTTON" && btn.id != "active") {
                                    btn.disabled = true;
                                }
                            }
                            document.getElementById("active").innerHTML = "激活编辑器";
                        }
                    })();
                    break;
                case "code":
                    (function() {
                        let btns = toolsContainer.childNodes;
                        if (!iscode) {
                            editer.innerText = formatCode(editer.innerHTML);
                            for (let btn of btns) {
                                if (btn.nodeName == "BUTTON" && btn.id != "code") {
                                    btn.disabled = true;
                                }
                            }
                            editer.focus();
                            document.getElementById("code").innerHTML = "效果";
                            iscode = !iscode;
                        } else {
                            editer.innerHTML = editer.innerText;
                            for (let btn of btns) {
                                if (btn.nodeName == "BUTTON" && btn.id != "code") {
                                    btn.disabled = false;
                                }
                            }
                            editer.focus();
                            document.getElementById("code").innerHTML = "源码";
                            iscode = !iscode;
                        }
                    })();
                    break;
                case "undo":
                    (function() {
                        document.execCommand("undo", false, null);
                    })();
                    break;
                case "redo":
                    (function() {
                        document.execCommand("redo", false, null);
                    })();
                    break;
                case "bold":
                    (function() {
                        document.execCommand("bold", false, null);
                    })();
                    break;
                case "italic":
                    (function() {
                        document.execCommand("italic", false, null);
                    })();
                    break;
                case "underline":
                    (function() {
                        document.execCommand("underline", false, null);
                    })();
                    break;
                case "deleteline":
                    (function() {
                        // document.execCommand("formatblock", false, "<del>");
                    })();
                    break;
                case "subup":
                    (function() {
                        document.execCommand("superscript", false, null);
                        editer.focus();
                    })();
                    break;
                case "subdown":
                    (function() {
                        document.execCommand("subscript", false, null);
                        editer.focus();
                    })();
                    break;
                case "fontname":
                    (function() {
                        let thefont = prompt("请输入字体名称，如Arial");
                        if (thefont) {
                            document.execCommand("fontName", false, thefont);
                        }
                    })();
                    break;
                case "fontsize":
                    (function() {
                        let thefont = prompt("请输入字体大小，1-7");
                        if (thefont) {
                            document.execCommand("fontSize", false, thefont);
                        }
                    })();
                    break;
                case "fontcolor":
                    (function() {
                        let thefont = prompt("请输入字体颜色RGB值或HEX值");
                        if (thefont) {
                            document.execCommand("foreColor", false, thefont);
                        }
                    })();
                    break;
                case "backgrandcolor":
                    (function() {
                        let thefont = prompt("请输入主题颜色RGB值或HEX值");
                        if (thefont) {
                            document.execCommand("backColor", false, thefont);
                        }
                    })();
                    break;
                case "cleanformat":
                    (function() {
                        document.execCommand("removeFormat", false, null);
                    })();
                    break;
                case "ol":
                    document.execCommand("insertOrderedList", false, null);
                    editer.focus();
                    break;
                case "ul":
                    document.execCommand("insertUnorderedList", false, null);
                    editer.focus();
                    break;
                case "left":
                    document.execCommand("justifyLeft", false, null);
                    break;
                case "right":
                    document.execCommand("justifyRight", false, null);
                    break;
                case "center":
                    document.execCommand("justifyCenter", false, null);
                    break;
                case "full":
                    document.execCommand("justifyFull", false, null);
                    break;
                case "createlink":
                    (function() {
                        let theUrl = prompt("请输入链接URL");
                        if (theUrl) {
                            document.execCommand("createlink", false, theUrl);
                        }
                    })();
                    break;
                case "deletelink":
                    document.execCommand("unlink", false, null);
                    break;
                case "image":
                    (function() {
                        let theUrl = prompt("请输入图片URL和图片描述，用 # 号分开");
                        if (theUrl) {
                            let imageTitle = theUrl.split("#")[1];
                            let imageUrl = theUrl.split("#")[0];
                            let htmlCode = imageTitle ?
                                '<img src="' + imageUrl + '" alt="' + imageTitle + '" title="' + imageTitle + '">' : '<img src="' + imageUrl + '">';
                            document.execCommand("insertHTML", false, htmlCode);
                        }
                    })();
                    break;
                case "video":
                    (function() {
                        let theUrl = prompt("请输入视频URL和封面图片URL，用 # 号分开");
                        if (theUrl) {
                            let videoUrl = theUrl.split("#")[0];
                            let posterUrl = theUrl.split("#")[1] ||  "#";
                            let videoType = videoUrl.split(".")[videoUrl.split(".").length - 1];
                            let htmlCode = "";
                            if (videoType == "flv") {
                                htmlCode = '<video src="' + videoUrl + '" poster=' + posterUrl + ' preload="none"></video>';
                            } else {
                                htmlCode = '<video src="' + videoUrl + '" poster=' + posterUrl + ' autoplay controls></video>';
                            }
                            document.execCommand("insertHTML", false, htmlCode);
                        }
                    })();
                    break;
                case "audio":
                    (function() {
                        let theUrl = prompt("请输入音频资源URL");
                        if (theUrl) {
                            let htmlCode = '<audio src="' + theUrl + '" controls autoplay></audio>';
                            document.execCommand("insertHTML", false, htmlCode);
                        }
                    })();
                    break;
                case "hr":
                    document.execCommand("inserthorizontalrule", false, null);
                    break;
                case "indent":
                    document.execCommand("indent", false, null);
                    break;
                default:
                    break;
            }
        }
        //返回编辑器el对象
    return editer;
}
//调整工具栏宽度
window.onresize = function() {
  let toolsContainer = document.getElementById("editer-tools");
  let editer = document.getElementById("editer");
  toolsContainer.style['width'] = toolsContainer.parentNode.offsetWidth + 'px';
  editer.style['padding-top'] = '5px';
  editer.style['min-height'] = editer.parentNode.offsetHeight - 16 + "px";
}

// 格式化源代码
function formatCode(code) {
    let indentChar = "    "; //四个空格缩进
    let startTag = /<[\!]*?[^<>]*?>(?!\r\n|\n)/ig;
    let endTag = /<[\/]+[^<>]*?>(?!\r\n|\n| )/ig;
    code = code.replace(endTag, "\r\n" + "$&" + "\r\n");
    code = code.replace(startTag, "$&" + "\r\n");
    return code;
}
