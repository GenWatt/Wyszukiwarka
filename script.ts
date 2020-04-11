import "./SCSS/style.scss";
//fetch data from json file

fetch("./dist/data.json")
  .then((res: Response) => res.json())
  .then((res) => {
    searchFilterEngine(res.data);
    setTimeout(() => {
      document
        .querySelectorAll(".preloader span")
        .forEach((circle) => circle.classList.remove("active"));
    }, 2000);
  })
  .catch(() => new Error());
//search filter engine

function searchFilterEngine(res) {
  let data = res;
  const search: HTMLElement = document.getElementById("search");
  const list: HTMLElement = document.querySelector(".list");
  const searchFilterBg: HTMLElement = document.querySelector(".search-filter");
  const chooseLis: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".choose"
  );
  const dropdownNavTrigger: HTMLElement = document.querySelector(
    ".mobile-dropdown-nav"
  );
  let filteredData = res;
  let itemsList: NodeListOf<HTMLElement>;
  let orderItemsList: NodeListOf<HTMLElement>;
  let value: string = "";
  let currentFilter: string = "brand";
  let isClicked: boolean = false;
  let lastConection: number = data.length;

  function searchForData(e) {
    if (e) value = e.target.value.toUpperCase();

    lastConection = filteredData.length;
    //filtered data with corect matches
    filteredData = data.filter(
      (type: PropertyDecorator) =>
        type[currentFilter].toUpperCase().indexOf(value) !== -1
    );
    //filtered data with incorect matches
    const mistakenData: object = data.filter(
      (type: PropertyDecorator) =>
        type[currentFilter].toUpperCase().indexOf(value) === -1
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
      const icon: HTMLElement = this.previousElementSibling;
      const label: Element = icon.previousElementSibling;
      const itemsListBox: HTMLElement = this.parentElement.nextElementSibling;

      isClicked = !isClicked;
      itemsListBox.classList.toggle("show");
      this.classList.toggle("on-focus");
      label.classList.toggle("on-focus");
      icon.classList.toggle("on-focus");
    }

    if (!isClicked) {
      search.blur();
      itemsList.forEach((item: HTMLElement) => {
        item.classList.remove("show");
      });
    } else animateList();
  }

  search.addEventListener("click", showList);

  //create items
  function createListItems() {
    list.innerHTML = "";
    data.map((data) => {
      //items parameters
      const li: HTMLElement = document.createElement("li");
      li.className = "item";
      li.setAttribute("data-id", data.id);
      li.innerHTML = `${data.phone}
        <span class="brand">
          ${data.brand}
        </span>
        <button class="delete-btn"value="${data.id}">
          <i class="fas fa-trash-alt"></i>
        </button>`;
      //append items to ul
      list.appendChild(li);
    });
    itemsList = document.querySelectorAll(".item");
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn: HTMLButtonElement) =>
        btn.addEventListener("click", deleteItem)
      );
  }
  createListItems();

  function createOrderItems() {
    const orderConteiner: HTMLElement = document.querySelector(
      ".order-conteiner"
    );
    orderConteiner.innerHTML = "";
    data.map((data) => {
      const li: HTMLElement = document.createElement("li");
      li.className = "order-item red-theme";
      li.setAttribute("data-id", data.id);
      li.setAttribute("data-theme", "red-theme");
      li.innerHTML = `
                <h4>${data.phone}</h4>
                <div class="preloader">
                  <span class="active"></span>
                  <span class="active"></span>
                  <span class="active"></span>
                </div>
                <p>${data.description}</p>
                <span class="brand-order">${data.brand}</span>
                <button class="add-to-cart">Add To Cart</button>
                <span class="price">${data.price}</span>
            `;
      orderConteiner.appendChild(li);
    });

    orderItemsList = document.querySelectorAll(".order-item");
    setTheme(undefined);
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
  function showItemIfMatch(elements: NodeListOf<HTMLElement>) {
    if (data.length > 0) {
      const arrayItem: HTMLElement[] = [...elements];
      const showElements: string[] = data.map((data) => data.id);

      showElements.forEach((el: string) => {
        const arrayItemsToShow = arrayItem.filter(
          (item: HTMLElement) => item.getAttribute("data-id") == el
        );

        arrayItemsToShow.forEach((el: HTMLElement) => {
          el.classList.remove("hide");
          el.classList.add("show");
        });
      });
    }
  }
  // hide wrong matches
  function hideItemIfNoMatch(
    mistakenData: any,
    elements: NodeListOf<HTMLElement>
  ) {
    if (mistakenData.length > 0) {
      const arrayItem: HTMLElement[] = [...elements];
      const hideElements: string[] = mistakenData.map((data) => data.id);

      hideElements.forEach((el: string) => {
        const arrayItemsToHide = arrayItem.filter(
          (item) => item.getAttribute("data-id") == el
        );

        arrayItemsToHide.forEach((el: HTMLElement) => {
          el.classList.remove("show");
          el.classList.add("hide");
        });
      });
    }
  }
  //delete matches
  function deleteItem() {
    const value: string = this.value;
    const parent: HTMLElement = this.parentElement;
    const orderItem: HTMLElement = document.querySelector(
      ".order-item[data-id]"
    );

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
    const duration: number = 30;

    itemsList.forEach((el: HTMLElement, i: number) => {
      setTimeout(() => {
        el.classList.add("show");
      }, duration * (i + 1));
    });
  }
  //list scroll bar script
  const scrollBar: HTMLElement = document.querySelector("#scroll");

  list.addEventListener("scroll", () => {
    const scrollTop: number = list.scrollTop;
    const listHeight: number = list.offsetHeight;
    const listScrollHeight: number = list.scrollHeight;
    const percentValue: number =
      (scrollTop / (listScrollHeight - listHeight)) * 100;

    scrollBar.style.height = percentValue + "%";
  });

  const filterRadio: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    ".filter"
  );
  //change filter by choosing radio input
  const changeFilter = (e) => {
    currentFilter = e.target.value;
    searchForData(value);
  };

  filterRadio.forEach((filter: HTMLInputElement) =>
    filter.addEventListener("change", changeFilter)
  );

  chooseLis.forEach((li: HTMLElement) => {
    li.addEventListener("click", function () {
      setTheme(this.dataset.theme);
    });
  });
  // set theme from local storage
  function setTheme(newTheme: string | undefined) {
    let lastTheme: string = localStorage.getItem("Theme");

    if (lastTheme === "undefined" || lastTheme === "null") {
      localStorage.setItem("Theme", searchFilterBg.dataset.theme);
      newTheme = "red-theme";
    }

    if (newTheme === undefined) {
      newTheme = lastTheme;
      lastTheme = "red-theme";
    }

    document.body.classList.replace(lastTheme, newTheme);

    orderItemsList.forEach((item: HTMLElement) =>
      item.classList.replace(lastTheme, newTheme)
    );
    searchFilterBg.dataset.theme = newTheme;
    localStorage.setItem("Theme", newTheme);
  }
  setTheme(localStorage.getItem("Theme"));
  //show dropdown nav menu to change theme
  dropdownNavTrigger.addEventListener("click", () => {
    searchFilter.classList.toggle("show");
    dropdownNavTrigger.classList.toggle("change-arrow-direction");
  });

  const dropDownMenu: HTMLElement = document.querySelector(".drop-down-menu");

  dropDownMenu.addEventListener("click", function () {
    const changeTheme: HTMLElement = document.querySelector(".change-theme");

    changeTheme.classList.toggle("show");
    this.classList.toggle("show");
  });

  const sortInput: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    ".sort-input"
  );
  const iconSets: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".icon-set"
  );
  // sort orders items
  sortInput.forEach((input: HTMLElement) => {
    input.addEventListener("change", (e) => {
      const iconSet: Element = input.previousElementSibling;
      const value: string = (<HTMLInputElement>e.target).value;
      const sortBy: string = input.dataset.sortBy;

      iconSets.forEach((set: HTMLElement) =>
        set.classList.remove("active-set")
      );
      iconSet.classList.add("active-set");

      data.sort((a: object, b: object) =>
        value === "from lowest"
          ? parseFloat(a[sortBy]) - parseFloat(b[sortBy])
          : parseFloat(b[sortBy]) - parseFloat(a[sortBy])
      );

      createOrderItems();
    });
  });
  //show sort menu
  const faChevronLeftIcon: HTMLElement = document.querySelector(
    ".fa-chevron-left"
  );
  const sortItemsConteiner: HTMLElement = document.getElementById("sort-aside");

  faChevronLeftIcon.addEventListener("click", function () {
    this.classList.toggle("active");
    sortItemsConteiner.classList.toggle("active");
  });
}
//position fixed when below visible space
const searchFilter: HTMLElement = document.querySelector(".search-filter");

document.addEventListener("scroll", () => {
  const scrollValue: number = window.scrollY;
  const offsetTop: number = searchFilter.offsetHeight;

  if (scrollValue >= offsetTop) searchFilter.classList.add("fixed-nav");
  else searchFilter.classList.remove("fixed-nav");
});
