(function () {
    'use strict';
    CKEDITOR.plugins.add('googleDocPastePlugin', {
        requires: 'clipboard',
        init: function (editor) {
            editor.on('paste', function (evt) {
                if ("data" in evt && "dataValue" in evt.data && evt.data.dataValue.indexOf("docs-internal-guid") > -1 && "dataTransfer" in evt.data && "_" in evt.data.dataTransfer && "data" in evt.data.dataTransfer._ && "text/html" in evt.data.dataTransfer._.data) {
                    evt.data.dataValue = formatting(evt.data.dataTransfer._.data['text/html']);
                }
            });
        }
    });
})();

function recursiveFormatting(context) {
    for(const childNode of context.childNodes){
        var clonedEle, ele;
      //for italicity
        if (childNode.style.fontStyle !== "") {
            if (childNode.style.fontStyle === "italic") {
                childNode.style.fontStyle = null;
                clonedEle = childNode.cloneNode(true);
                ele = document.createElement("em");
                ele.append(clonedEle)
                context.replaceChild(ele, childNode);
            } else {
                childNode.style.fontStyle = null;
            }
        }
     //for underline
        if (childNode.style.textDecoration !== "") {
            if (childNode.style.textDecoration === "underline") {
                childNode.style.textDecoration = null;
                clonedEle = childNode.cloneNode(true);
                ele = document.createElement("u");
                ele.append(clonedEle)
                context.replaceChild(ele, childNode);
            } else {
                childNode.style.textDecoration = null;
            }
        }
       //for bold
        if (childNode.style.fontWeight !== "") {
            if (childNode.style.fontWeight > "400") {
                childNode.style.fontWeight = null;
                clonedEle = childNode.cloneNode(true);
                ele = document.createElement("strong");
                ele.append(clonedEle)
                context.replaceChild(ele, childNode);
            } else {
                childNode.style.fontWeight = null;
            }
        }
        if (childNode.children.length > 0) {
            recursiveFormatting(childNode);
        }
    }
}


function formatting(str) {
    var parent = document.createElement("div");
    var parentCopy = document.createElement("div");
    parentCopy.innerHTML = str;
    var len = parentCopy.childNodes[0].children.length;
    for(var i = 0; i<len; i++ ) {
        parent.appendChild(parentCopy.childNodes[0].children[i].cloneNode(true));
    }
    recursiveFormatting (parent);
    return parent.innerHTML;
}