const header = document.getElementById("header");
const buttonCollapse = document.getElementById("buttonCollapse");
const items = document.getElementsByClassName("item");
const itemContents = [];

let isMenu = false;
let isContent = false;
let isTag = false;
let highlighted = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    buttonCollapse.addEventListener("click", () => { toggleAllContent() });
    for (let i = 0; i < items.length; i++) {
        const content = items[i].getElementsByClassName("content")[0];
        itemContents.push(content);

    }
    buttonCollapse.classList.toggle("hidden");
});

function toggleMenu() {
    isMenu = !isMenu;
    buttonContent.classList.toggle("hidden");

    if (!isMenu) {
        filter.classList.add("hidden");
    } else {
        filter.classList.remove("hidden");
    }
}

function expandContent(index) {
    itemContents[index].classList.remove("hidden");
}

function toggleContent(index) {
    itemContents[index].classList.toggle("hidden");
}

function toggleAllContent() {
    isContent = !isContent;
    if (isContent) {
        for (let i = 0; i < itemContents.length; i++) {
            itemContents[i].classList.add("hidden");
        }
    } else {
        for (let i = 0; i < itemContents.length; i++) {
            itemContents[i].classList.remove("hidden");
        }
    }
    header.classList.toggle("hidden");
    buttonContent.innerHTML = (isContent) ? "Expand" : "Collapse";
}

function filterByTag(index) {
    for (let i = 0; i < tagButtons.length; i++) {
        tagButtons[i].classList.remove("active");
    }

    const tagCurrent = parseInt(index);
    if(!tagButtons[tagCurrent]){ console.log("Error! Tag ID does not exist!"); return; }
    tagButtons[tagCurrent].classList.add("active");

    if (index != "0"){
        for (let i = 0; i < itemTags.length; i++) {
            items[i].classList.remove("hidden");
            if (itemTags[i].indexOf(index) == -1) {
                items[i].classList.add("hidden");
            }
        }
    }else{
        for (let i = 0; i < itemTags.length; i++) {
            items[i].classList.remove("hidden");
        }
    }

}

function readURLAnchor() {
    if(document.URL.split('#').length > 1){
        let anchor = document.URL.split('#')[1];
        console.log(anchor);

        for(let i=0; i<itemAnchors.length; i++){
            if(itemAnchors[i] == anchor){
                highlight(i);
                return;
            }
        }
    };
}

function highlight(index){
    itemLinks[highlighted].classList.remove("highlight");
    itemLinks[index].classList.add("highlight");
    highlighted = index;
}

