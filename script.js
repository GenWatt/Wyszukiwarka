//fetch data from json file
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
fetch("./dist/data.json")
    .then(function (res) { return res.json(); })
    .then(function (res) {
    searchFilterEngine(res.data);
    getImg();
})["catch"](function () {
    console.log(new Error());
});
//array of phone img path
var arrImg = [
    "/Iphone11-Pro.png",
    "/Samsung-Galaxy-S20-Ultra.jpg",
    "/huawei-p40-pro.jpg",
    "/xperia-1.png",
    "/xiaomi-mi-10-pro.png",
    "/asus-zenfone-5-.webp",
    "/oppo-find-x.jpg",
];
// function which put img in order items
function getImg() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            arrImg.forEach(function (url, index) {
                setTimeout(function () {
                    fetch("./dist/img" + url)
                        .then(function (res) { return res.blob(); })
                        .then(function (myBlob) { return URL.createObjectURL(myBlob); })
                        .then(function (URL) {
                        var img = document.createElement("img");
                        var preloader = document.querySelectorAll(".preloader");
                        var children = Array.from(preloader[index].querySelectorAll("span"));
                        img.src = URL;
                        preloader[index].appendChild(img);
                        children.forEach(function (child) { return child.remove(); });
                    })["catch"](function () {
                        console.log(new Error("oops"));
                    });
                }, 200 * index);
            });
            return [2 /*return*/];
        });
    });
}
//search filter engine
function searchFilterEngine(res) {
    var data = res;
    var search = document.getElementById("search");
    var list = document.querySelector(".list");
    var searchFilterBg = document.querySelector(".nav-conteiner");
    var chooseLis = document.querySelectorAll(".choose");
    var dropdownNavTrigger = document.querySelector(".mobile-dropdown-nav");
    var filteredData = res;
    var itemsList;
    var orderItemsList;
    var value = "";
    var currentFilter = "brand";
    var lastConection = data.length;
    function searchForData(e) {
        if (e)
            value = e.target.value.toUpperCase();
        lastConection = filteredData.length;
        //filtered data with corect matches
        filteredData = data.filter(function (type) {
            return type[currentFilter].toUpperCase().indexOf(value) !== -1;
        });
        //filtered data with incorect matches
        var mistakenData = data.filter(function (type) {
            return type[currentFilter].toUpperCase().indexOf(value) === -1;
        });
        showItemIfMatch([itemsList, orderItemsList]);
        hideItemIfNoMatch(mistakenData, [itemsList, orderItemsList]);
        infoIfNoResult();
    }
    // refresh data by typing
    search.addEventListener("keyup", searchForData);
    // show list by click into input
    function showList() {
        if (value === "") {
            var icon = document.querySelector(".icon");
            var label = icon.previousElementSibling;
            var itemsListBox = document.querySelector(".items-list-box");
            itemsListBox.classList.toggle("show");
            search.classList.toggle("on-focus");
            label.classList.toggle("on-focus");
            icon.classList.toggle("on-focus");
        }
        itemsList.forEach(function (item) {
            item.classList.remove("show");
        });
        animateList();
    }
    search.addEventListener("click", showList);
    search.addEventListener("click", showList);
    //create items
    function createListItems() {
        list.innerHTML = "";
        data.map(function (data) {
            //items parameters
            var li = document.createElement("li");
            li.className = "item";
            li.setAttribute("data-id", data.id);
            li.innerHTML = data.phone + "\n        <span class=\"brand\">\n          " + data.brand + "\n        </span>\n        <button class=\"delete-btn\"value=\"" + data.id + "\">\n          <i class=\"fas fa-trash-alt\"></i>\n        </button>";
            //append items to ul
            list.appendChild(li);
        });
        itemsList = document.querySelectorAll(".item");
        document
            .querySelectorAll(".delete-btn")
            .forEach(function (btn) {
            return btn.addEventListener("click", deleteItem);
        });
    }
    createListItems();
    function createOrderItems() {
        var orderConteiner = document.querySelector(".order-conteiner");
        orderConteiner.innerHTML = "";
        data.map(function (data) {
            var li = document.createElement("li");
            li.className = "order-item red-theme show";
            li.setAttribute("data-id", data.id);
            li.innerHTML = "\n                <h4>" + data.phone + "</h4>\n                <div class=\"preloader\">\n                  <span class=\"active\"></span>\n                  <span class=\"active\"></span>\n                  <span class=\"active\"></span>\n                </div>\n                <p>" + data.description + "</p>\n                <span class=\"brand-order\">" + data.brand + "</span>\n                <button class=\"add-to-cart\">Add To Cart</button>\n                <span class=\"price\">" + data.price + "</span>\n            ";
            orderConteiner.appendChild(li);
        });
        orderItemsList = document.querySelectorAll(".order-item");
        setTheme(undefined);
    }
    createOrderItems();
    // if no macth display info
    var infoIfNoResult = function () {
        if (filteredData.length === 0)
            list.innerHTML = "<p class=\"no-result\">No Match</p>";
        else if (lastConection === 0 && filteredData !== 0) {
            createListItems();
            animateList();
        }
    };
    //show correct matches
    function showItemIfMatch(arrayElements) {
        console.log(filteredData);
        if (data.length > 0) {
            var idItemsToShow_1 = filteredData.map(function (data) { return data.id; });
            arrayElements.forEach(function (array) {
                var arrayItem = Array.from(array);
                arrayItem.forEach(function (item) {
                    idItemsToShow_1.forEach(function (id) {
                        if (item.dataset.id === id)
                            item.classList.replace("hide", "show");
                    });
                });
            });
        }
    }
    // hide wrong matches
    function hideItemIfNoMatch(mistakenData, arrayElements) {
        if (data.length > 0) {
            var idItemsToShow_2 = mistakenData.map(function (data) { return data.id; });
            arrayElements.forEach(function (array) {
                var arrayItem = Array.from(array);
                arrayItem.forEach(function (item) {
                    idItemsToShow_2.forEach(function (id) {
                        if (item.dataset.id === id)
                            item.classList.replace("show", "hide");
                    });
                });
            });
        }
    }
    //delete matches
    function deleteItem() {
        var value = this.value;
        var parent = this.parentElement;
        var orderItem = document.querySelector(".order-item[data-id=\"" + value + "\"]");
        data = data.filter(function (data) { return data.id !== value; });
        filteredData = filteredData.filter(function (data) { return data.id !== value; });
        parent.classList.remove("show");
        parent.classList.add("hide-scale-down");
        orderItem.classList.add("hide-scale-down");
        orderItem.addEventListener("transitionend", function () {
            parent.remove();
            orderItem.remove();
        });
        infoIfNoResult();
    }
    //animate when  when creating new items
    function animateList() {
        var duration = 30;
        itemsList.forEach(function (el, i) {
            setTimeout(function () {
                el.classList.add("show");
            }, duration * (i + 1));
        });
    }
    //list scroll bar script
    var scrollBar = document.querySelector("#scroll");
    list.addEventListener("scroll", function () {
        var scrollTop = list.scrollTop;
        var listHeight = list.offsetHeight;
        var listScrollHeight = list.scrollHeight;
        var percentValue = (scrollTop / (listScrollHeight - listHeight)) * 100;
        scrollBar.style.height = percentValue + "%";
    });
    var filterRadio = document.querySelectorAll(".filter");
    //change filter by choosing radio input
    var changeFilter = function (e) {
        currentFilter = e.target.value;
        searchForData(value);
    };
    filterRadio.forEach(function (filter) {
        return filter.addEventListener("change", changeFilter);
    });
    chooseLis.forEach(function (li) {
        li.addEventListener("click", function () {
            setTheme(this.dataset.theme);
        });
    });
    // set theme from local storage
    function setTheme(newTheme) {
        var lastTheme = localStorage.getItem("Theme");
        if (lastTheme === "undefined" || lastTheme === "null") {
            localStorage.setItem("Theme", searchFilterBg.dataset.theme);
            newTheme = "red-theme";
        }
        if (newTheme === undefined) {
            newTheme = lastTheme;
            lastTheme = "red-theme";
        }
        document.body.classList.replace(lastTheme, newTheme);
        orderItemsList.forEach(function (item) {
            return item.classList.replace(lastTheme, newTheme);
        });
        searchFilterBg.dataset.theme = newTheme;
        localStorage.setItem("Theme", newTheme);
    }
    setTheme(localStorage.getItem("Theme"));
    //show dropdown nav menu to change theme
    dropdownNavTrigger.addEventListener("click", function () {
        searchFilter.classList.toggle("show");
        dropdownNavTrigger.classList.toggle("change-arrow-direction");
    });
    var dropDownMenu = document.querySelector(".drop-down-menu");
    dropDownMenu.addEventListener("click", function () {
        var changeTheme = document.querySelector(".change-theme");
        changeTheme.classList.toggle("show");
        this.classList.toggle("show");
    });
    var sortInput = document.querySelectorAll(".sort-input");
    var iconSets = document.querySelectorAll(".icon-set");
    // sort orders items
    sortInput.forEach(function (input) {
        input.addEventListener("change", function (e) {
            var iconSet = input.previousElementSibling;
            var value = e.target.value;
            var sortBy = input.dataset.sortBy;
            iconSets.forEach(function (set) {
                return set.classList.remove("active-set");
            });
            iconSet.classList.add("active-set");
            data.sort(function (a, b) {
                return value === "from lowest"
                    ? parseFloat(a[sortBy]) - parseFloat(b[sortBy])
                    : parseFloat(b[sortBy]) - parseFloat(a[sortBy]);
            });
            createOrderItems();
            getImg();
        });
    });
    //show sort menu
    var faChevronLeftIcon = document.querySelector(".fa-chevron-left");
    var sortItemsConteiner = document.getElementById("sort-aside");
    faChevronLeftIcon.addEventListener("click", function () {
        this.classList.toggle("active");
        sortItemsConteiner.classList.toggle("active");
    });
}
//position fixed when below visible space
var searchFilter = document.querySelector(".nav-conteiner");
document.addEventListener("scroll", function () {
    var scrollValue = window.scrollY;
    var offsetTop = searchFilter.offsetHeight;
    if (scrollValue >= offsetTop)
        searchFilter.classList.add("fixed-nav");
    else
        searchFilter.classList.remove("fixed-nav");
});
function duplicateEncode(word) {
    var capLetters = word.toUpperCase();
    var wordsArr = capLetters.split("");
    var string = "";
    for (var i = 0; i < wordsArr.length; i++) {
        if (i !== wordsArr.indexOf(wordsArr[i])) {
            console.log(wordsArr[i]);
            string += "(";
        }
        else
            string += ")";
    }
    return string;
}
console.log(duplicateEncode("Heeejjj"));
