//fetch data from json file
fetch("./data.json")
    .then((res) => res.json())
    .then((res) => {
        searchFilterEngine(res.data);
    })
    .catch((error) => {
        throw new Error(error)
    })

//search filter engine

function searchFilterEngine(res) {
    let data = res;
    const search = document.getElementById("search");
    const list = document.querySelector(".list");
    let itemsList = [];
    let value = "";
    let currentFilter = "brand";
    let isClicked = false;
    let filteredData = data;
    let lastConection = data.length;

    function searchForData() {
        value = search.value.toUpperCase();

        lastConection = filteredData.length;
        //filtered data with corect matches
        filteredData = data.filter(
            type => type[currentFilter].toUpperCase().indexOf(value) !== -1
        );
        //filtered data with incorect matches
        const mistakenData = data.filter(
            type => type[currentFilter].toUpperCase().indexOf(value) === -1
        );

        showItemIfMatch();
        hideItemIfNoMatch(mistakenData);
        showSearchItems();
    };
    // refresh data by typing
    search.addEventListener("keyup", searchForData);
    // show list by click into input
    function showList() {
        if (value === "") {
            const icon = this.previousElementSibling;
            const label = icon.previousElementSibling;
            const itemsListBox = this.parentElement.nextElementSibling;

            isClicked = !isClicked;
            itemsListBox.classList.toggle("show");
            this.classList.toggle("on-focus");
            label.classList.toggle("on-focus");
            icon.classList.toggle("on-focus");
        }

        if (!isClicked) {
            search.blur();
            itemsList.forEach(item => {
                item.classList.remove("show");
            });
        } else animateList();
    };

    search.addEventListener("click", showList);

    //create items
    function createListItems() {
        list.innerHTML = "";
        data.map(i => {
            //items parameters
            const li = document.createElement("li");
            li.className = "item";
            li.id = i.id;
            li.innerHTML = `${i.phone}
        <span class="brand">
          ${i.brand}
        </span>
        <button class="delete-btn"value="${i.id}">
          <i class="fas fa-trash-alt"></i>
        </button>`;
            //append items to ul
            list.appendChild(li);
        });

        itemsList = document.querySelectorAll(".item");
        deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => btn.addEventListener("click", deleteItem));
    }

    createListItems();
    // if no macth display info
    const showSearchItems = () => {
        if (filteredData.length === 0)
            list.innerHTML = `<p class="no-result">No Match</p>`;
        else if (lastConection === 0 && filteredData !== 0) {
            createListItems();
            animateList();
        };
    };
    //animate if match
    function showItemIfMatch() {
        if (filteredData.length > 0) {
            const arrayItem = [...itemsList];
            const showElements = filteredData.map(data => data.id);

            showElements.forEach(el => {
                const arrayItemsToShow = arrayItem.filter(item => item.id == el);

                arrayItemsToShow.forEach(el => {
                    el.classList.remove("hide");
                    el.classList.add("show");
                });
            });
        }
    }
    // hide wrong matches
    function hideItemIfNoMatch(mistakenData) {
        if (mistakenData.length > 0) {
            const arrayItem = [...itemsList];
            const hideElements = mistakenData.map(data => data.id);

            hideElements.forEach(el => {
                const arrayItemsToHide = arrayItem.filter(item => item.id == el);

                arrayItemsToHide.forEach(el => {
                    el.classList.remove("show");
                    el.classList.add("hide");
                });
            });
        }
    }
    //delete matches
    function deleteItem() {
        const value = this.value;
        const parent = this.parentElement;

        parent.classList.remove("show");
        parent.classList.add("hide-scale-down");

        setTimeout(() => {
            data = filteredData.filter(data => data.id !== value);
            parent.remove();
        }, 200);
    }
    //animate when  when creating new items
    function animateList() {
        const duration = 30;

        itemsList.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("show");
            }, duration * (i + 1));
        });
    }
    //list scroll bar script
    const scrollBar = document.querySelector("#scroll");

    list.addEventListener("scroll", () => {
        const scrollTop = list.scrollTop;
        const listHeight = list.offsetHeight;
        const listScrollHeight = list.scrollHeight;
        const percentValue = (scrollTop / (listScrollHeight - listHeight)) * 100;

        scrollBar.style.height = percentValue + "%";
    });

    const filterRadio = document.querySelectorAll(".filter");
    //change filter by choosing radio input
    const changeFilter = e => {
        currentFilter = e.target.value;
        searchForData();
    };

    filterRadio.forEach(filter => filter.addEventListener("change", changeFilter));
}