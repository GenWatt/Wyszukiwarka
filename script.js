import "./SCSS/style.scss";
//fetch data from json file
fetch("https://genwatt.github.io/Wyszukiwarka/data.json")
  .then((res) => res.json())
  .then((res) => {
    searchFilterEngine(res.data);
  });
//search filter engine

function searchFilterEngine(res) {
  let data = res;
  const search = document.getElementById("search");
  const list = document.querySelector(".list");
  const searchFilterBg = document.querySelector(".search-filter");
  const chooseLis = document.querySelectorAll(".choose");
  const dropdownNavTrigger = document.querySelector(".mobile-dropdown-nav");
  let filteredData = res;
  let itemsList = [];
  let orderItemsList;
  let value = "";
  let currentFilter = "brand";
  let isClicked = false;
  let lastConection = data.length;

  function searchForData() {
    value = search.value.toUpperCase();

    lastConection = filteredData.length;
    //filtered data with corect matches
    filteredData = data.filter(
      (type) => type[currentFilter].toUpperCase().indexOf(value) !== -1
    );
    //filtered data with incorect matches
    const mistakenData = data.filter(
      (type) => type[currentFilter].toUpperCase().indexOf(value) === -1
    );
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
      itemsList.forEach((item) => {
        item.classList.remove("show");
      });
    } else animateList();
  }

  search.addEventListener("click", showList);

  //create items
  function createListItems() {
    list.innerHTML = "";
    data.map((i) => {
      //items parameters
      const li = document.createElement("li");
      li.className = "item";
      li.setAttribute("data-id", i.id);
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
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn) => btn.addEventListener("click", deleteItem));
  }
  createListItems();

  function createOrderItems() {
    const orderConteiner = document.querySelector(".order-conteiner");
    orderConteiner.innerHTML = "";
    data.map((data) => {
      const li = document.createElement("li");

      li.className = "order-item red-theme";
      li.setAttribute("data-id", data.id);
      li.setAttribute("data-theme", "red-theme");
      li.innerHTML = `
                <h4>${data.phone}</h4>
                <div>Your Image</div>
                <p>${data.description}</p>
                <span class="brand-order">${data.brand}</span>
                <button class="add-to-cart">Add To Cart</button>
                <span class="price">${data.price}</span>
            `;
      orderConteiner.appendChild(li);
    });

    orderItemsList = document.querySelectorAll(".order-item");
    setTheme();
  }

  createOrderItems();
  // if no macth display info
  const showSearchItems = () => {
    if (filteredData.length === 0)
      list.innerHTML = `<p class="no-result">No Match</p>`;
    else if (lastConection === 0 && filteredData !== 0) {
      createListItems();
      animateList();
    }
  };
  //animate if match
  function showItemIfMatch(elements) {
    if (data.length > 0) {
      const arrayItem = [...elements];
      const showElements = data.map((data) => data.id);

      showElements.forEach((el) => {
        const arrayItemsToShow = arrayItem.filter(
          (item) => item.getAttribute("data-id") == el
        );

        arrayItemsToShow.forEach((el) => {
          el.classList.remove("hide");
          el.classList.add("show");
        });
      });
    }
  }
  // hide wrong matches
  function hideItemIfNoMatch(mistakenData, elements) {
    if (mistakenData.length > 0) {
      const arrayItem = [...elements];
      const hideElements = mistakenData.map((data) => data.id);

      hideElements.forEach((el) => {
        const arrayItemsToHide = arrayItem.filter(
          (item) => item.getAttribute("data-id") == el
        );

        arrayItemsToHide.forEach((el) => {
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
    const orderItem = document.querySelector(".order-item[data-id]");

    parent.classList.remove("show");
    parent.classList.add("hide-scale-down");
    orderItem.classList.add("hide-scale-down");

    setTimeout(() => {
      data = data.filter((data) => data.id !== value);
      parent.remove();
      orderItem.remove();
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
  const changeFilter = (e) => {
    currentFilter = e.target.value;
    searchForData();
  };

  filterRadio.forEach((filter) =>
    filter.addEventListener("change", changeFilter)
  );

  chooseLis.forEach((li) => {
    li.addEventListener("click", function () {
      setTheme(this.dataset.theme);
    });
  });
  // set theme with local storage
  function setTheme(newTheme) {
    let lastTheme = localStorage.getItem("Theme");

    if (lastTheme === "undefined" || lastTheme === "null") {
      localStorage.setItem("Theme", searchFilterBg.dataset.theme);
      newTheme = "red-theme";
    }

    if (newTheme === undefined) {
      newTheme = lastTheme;
      lastTheme = "red-theme";
    }

    document.body.classList.replace(lastTheme, newTheme);

    orderItemsList.forEach((item) =>
      item.classList.replace(lastTheme, newTheme)
    );
    searchFilterBg.dataset.theme = newTheme;
    localStorage.setItem("Theme", newTheme);
  }
  setTheme();
  //show dropdown nav menu to change theme
  dropdownNavTrigger.addEventListener("click", () => {
    searchFilter.classList.toggle("show");
    dropdownNavTrigger.classList.toggle("change-arrow-direction");
  });

  const dropDownMenu = document.querySelector(".drop-down-menu");

  dropDownMenu.addEventListener("click", function () {
    const changeTheme = document.querySelector(".change-theme");

    changeTheme.classList.toggle("show");
    this.classList.toggle("show");
  });

  const sortInput = document.querySelectorAll(".sort-input");
  const iconSets = document.querySelectorAll(".icon-set");
  // sort orders items
  sortInput.forEach((input) => {
    input.addEventListener("change", (e) => {
      const iconSet = input.previousElementSibling;
      const value = e.target.value;
      const sortBy = input.dataset.sortBy;

      iconSets.forEach((set) => set.classList.remove("active-set"));
      iconSet.classList.add("active-set");

      data.sort((a, b) =>
        value === "from lowest" ?
        parseFloat(a[sortBy]) - parseFloat(b[sortBy]) :
        parseFloat(b[sortBy]) - parseFloat(a[sortBy])
      );

      createOrderItems();
    });
  });
  //show sort menu
  const faChevronLeftIcon = document.querySelector(".fa-chevron-left");
  const sortItemsConteiner = document.getElementById("sort-aside");

  faChevronLeftIcon.addEventListener("click", function () {
    this.classList.toggle("active");
    sortItemsConteiner.classList.toggle("active");
  });
}
//position fixed when below visible space
const searchFilter = document.querySelector(".search-filter");

document.addEventListener("scroll", () => {
  const scrollValue = window.scrollY;
  const offsetTop = searchFilter.offsetHeight;

  if (scrollValue >= offsetTop) searchFilter.classList.add("fixed-nav");
  else searchFilter.classList.remove("fixed-nav");
});
