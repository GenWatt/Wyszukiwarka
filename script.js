"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("./SCSS/style.scss");
//fetch data from json file
fetch("./dist/data.json")
    .then(function (res) { return res.json(); })
    .then(function (res) {
    searchFilterEngine(res.data);
    setTimeout(function () {
        document
            .querySelectorAll(".preloader span")
            .forEach(function (circle) { return circle.classList.remove("active"); });
    }, 2000);
})["catch"](function () { return new Error(); });
//search filter engine
function searchFilterEngine(res) {
    var data = res;
    var search = document.getElementById("search");
    var list = document.querySelector(".list");
    var searchFilterBg = document.querySelector(".search-filter");
    var chooseLis = document.querySelectorAll(".choose");
    var dropdownNavTrigger = document.querySelector(".mobile-dropdown-nav");
    var filteredData = res;
    var itemsList;
    var orderItemsList;
    var value = "";
    var currentFilter = "brand";
    var isClicked = false;
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
        showItemIfMatch(itemsList);
        showItemIfMatch(orderItemsList);
        hideItemIfNoMatch(mistakenData, itemsList);
        hideItemIfNoMatch(mistakenData, orderItemsList);
        showSearchItems();
    }
    // refresh data by typing
    search.addEventListener("keyup", searchForData);
    // show list by click into input
    function showList() {
        if (value === "") {
            var icon = this.previousElementSibling;
            var label = icon.previousElementSibling;
            var itemsListBox = this.parentElement.nextElementSibling;
            isClicked = !isClicked;
            itemsListBox.classList.toggle("show");
            this.classList.toggle("on-focus");
            label.classList.toggle("on-focus");
            icon.classList.toggle("on-focus");
        }
        if (!isClicked) {
            search.blur();
            itemsList.forEach(function (item) {
                item.classList.remove("show");
            });
        }
        else
            animateList();
    }
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
            li.className = "order-item red-theme";
            li.setAttribute("data-id", data.id);
            li.setAttribute("data-theme", "red-theme");
            li.innerHTML = "\n                <h4>" + data.phone + "</h4>\n                <div class=\"preloader\">\n                  <span class=\"active\"></span>\n                  <span class=\"active\"></span>\n                  <span class=\"active\"></span>\n                </div>\n                <p>" + data.description + "</p>\n                <span class=\"brand-order\">" + data.brand + "</span>\n                <button class=\"add-to-cart\">Add To Cart</button>\n                <span class=\"price\">" + data.price + "</span>\n            ";
            orderConteiner.appendChild(li);
        });
        orderItemsList = document.querySelectorAll(".order-item");
        setTheme(undefined);
    }
    createOrderItems();
    // if no macth display info
    var showSearchItems = function () {
        if (filteredData.length === 0)
            list.innerHTML = "<p class=\"no-result\">No Match</p>";
        else if (lastConection === 0 && filteredData !== 0) {
            createListItems();
            animateList();
        }
    };
    //animate if match
    function showItemIfMatch(elements) {
        if (data.length > 0) {
            var arrayItem_1 = __spreadArrays(elements);
            var showElements = data.map(function (data) { return data.id; });
            showElements.forEach(function (el) {
                var arrayItemsToShow = arrayItem_1.filter(function (item) { return item.getAttribute("data-id") == el; });
                arrayItemsToShow.forEach(function (el) {
                    el.classList.remove("hide");
                    el.classList.add("show");
                });
            });
        }
    }
    // hide wrong matches
    function hideItemIfNoMatch(mistakenData, elements) {
        if (mistakenData.length > 0) {
            var arrayItem_2 = __spreadArrays(elements);
            var hideElements = mistakenData.map(function (data) { return data.id; });
            hideElements.forEach(function (el) {
                var arrayItemsToHide = arrayItem_2.filter(function (item) { return item.getAttribute("data-id") == el; });
                arrayItemsToHide.forEach(function (el) {
                    el.classList.remove("show");
                    el.classList.add("hide");
                });
            });
        }
    }
    //delete matches
    function deleteItem() {
        var value = this.value;
        var parent = this.parentElement;
        var orderItem = document.querySelector(".order-item[data-id]");
        parent.classList.remove("show");
        parent.classList.add("hide-scale-down");
        orderItem.classList.add("hide-scale-down");
        setTimeout(function () {
            data = data.filter(function (data) { return data.id !== value; });
            parent.remove();
            orderItem.remove();
        }, 200);
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
var searchFilter = document.querySelector(".search-filter");
document.addEventListener("scroll", function () {
    var scrollValue = window.scrollY;
    var offsetTop = searchFilter.offsetHeight;
    if (scrollValue >= offsetTop)
        searchFilter.classList.add("fixed-nav");
    else
        searchFilter.classList.remove("fixed-nav");
});
