const tagColors = ["rgba(204,130,115,0.4)", "rgba(226,170,125,0.4)", "rgba(240,207,142,0.4)", "rgba(246,237,206,0.4)", "rgba(168,200,166,0.4)", "rgba(108,141,138,0.4)", "rgba(100,80,88,0.4)"];
        
const header = document.getElementById("header");
const filter = document.getElementById("filter");
const buttonMenu = document.getElementById("buttonMenu");
const buttonContent = document.getElementById("buttonContent");
const buttonFilter = document.getElementById("buttonFilter");
const tagButtons = document.getElementsByClassName("buttonTag");
const items = document.getElementsByClassName("item");

const itemTags = [];
const itemContents = [];
const itemLinks = [];
const itemAnchors = [];
const itemCollapse = [];

let isMenu = false;
let isContent = false;
let isTag = false;
let highlighted = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    buttonMenu.addEventListener("click", () => { toggleMenu() });     
    buttonContent.addEventListener("click", () => { toggleAllContent() });
    buttonFilter.addEventListener("click", () => { toggleTags() })

    for (let i = 0; i < tagButtons.length; i++) {
        const index = tagButtons[i].dataset.index
        tagButtons[i].addEventListener("click", () => { filterByTag(index) });
        tagButtons[i].style.backgroundColor = tagColors[i];
    }

    for (let i = 0; i < items.length; i++) {
        const link = items[i].getElementsByClassName("itemLink")[0];
        itemLinks.push(link);
        itemAnchors.push(link.href.split('#')[1]);
        link.addEventListener("click", () => { expandContent(i); highlight(i) });
        const content = items[i].getElementsByClassName("content")[0];
        itemContents.push(content);
        const collapse = items[i].getElementsByClassName("itemCollapse")[0]
        collapse.addEventListener("click", () => { toggleContent(i) });
        itemCollapse.push(collapse);
        const tags = items[i].getElementsByClassName("tag");

        const arr = []
        for (let j = 0; j < tags.length; j++) {
            arr.push(tags[j].dataset.index);
            // let index = parseInt(tags[j].dataset.index) - 1;
            // tags[j].style.backgroundColor = tagColors[index];
        }
        itemTags.push(arr);
    }
    buttonMenu.classList.toggle("hidden");
    readURLAnchor();
});

function toggleMenu() {
    isMenu = !isMenu;
    buttonContent.classList.toggle("hidden");
    buttonFilter.classList.toggle("hidden");
    if (!isMenu) {
        filter.classList.add("hidden");
    } else if (isTag) {
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

function toggleTags() {
    isTag = !isTag;
    filter.classList.toggle("hidden");
    buttonFilter.classList.toggle("inactive");
    if (isTag) {
        buttonFilter.innerHTML = "All"
    } else {
        filterByTag("0");
        buttonFilter.innerHTML = "Tags";
    }
}

function filterByTag(index) {
    for (let i = 0; i < tagButtons.length; i++) {
        tagButtons[i].classList.remove("active");
    }

    if (index != "0") {
        const tagCurrent = parseInt(index) - 1;
        if(!tagButtons[tagCurrent]){ console.log("Error! Tag ID does not exist!"); return; }

        tagButtons[tagCurrent].classList.add("active");
        for (let i = 0; i < itemTags.length; i++) {
            items[i].classList.remove("hidden");
            if (itemTags[i].indexOf(index) == -1) {
                items[i].classList.add("hidden");
            }
        }
    } else {
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

