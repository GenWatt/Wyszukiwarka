//fetch data from json file

fetch("./data.json")
  .then((res: Response) => res.json())
  .then((res) => {
    searchFilterEngine(res.data);
    getImg();
  })
  .catch(() => {
    console.log(new Error());
  });
//array of phone img path
const arrImg: string[] = [
  "/Iphone11-Pro.png",
  "/Samsung-Galaxy-S20-Ultra.jpg",
  "/huawei-p40-pro.jpg",
  "/xperia-1.png",
  "/xiaomi-mi-10-pro.png",
  "/asus-zenfone-5-.webp",
  "/oppo-find-x.jpg",
];
// function which put img in order items
async function getImg() {
  arrImg.forEach((url: string, index: number) => {
    setTimeout(() => {
      fetch("./img" + url)
        .then((res: Response) => res.blob())
        .then((myBlob: Blob) => URL.createObjectURL(myBlob))
        .then((URL) => {
          const img: HTMLImageElement = document.createElement("img");
          const preloader: NodeListOf<HTMLElement> = document.querySelectorAll(
            ".preloader"
          );
          const children: HTMLSpanElement[] = Array.from(
            preloader[index].querySelectorAll("span")
          );

          img.src = URL;
          preloader[index].appendChild(img);
          children.forEach((child: HTMLSpanElement) => child.remove());
        })
        .catch(() => {
          console.log(new Error("oops"));
        });
    }, 200 * index);
  });
}
//search filter engine
function searchFilterEngine(res) {
  let data = res;
  const search: HTMLElement = document.getElementById("search");
  const list: HTMLElement = document.querySelector(".list");
  const searchFilterBg: HTMLElement = document.querySelector(".nav-conteiner");
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
    showItemIfMatch([itemsList, orderItemsList]);
    hideItemIfNoMatch(mistakenData, [itemsList, orderItemsList]);
    infoIfNoResult();
  }
  // refresh data by typing
  search.addEventListener("keyup", searchForData);
  // show list by click into input

  function showList() {
    if (value === "") {
      const icon: HTMLElement = document.querySelector(".icon");
      const label: Element = icon.previousElementSibling;
      const itemsListBox: HTMLElement = document.querySelector(
        ".items-list-box"
      );

      itemsListBox.classList.toggle("show");
      search.classList.toggle("on-focus");
      label.classList.toggle("on-focus");
      icon.classList.toggle("on-focus");
    }
    itemsList.forEach((item: HTMLElement) => {
      item.classList.remove("show");
    });
    animateList();
  }

  search.addEventListener("click", showList);
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
      li.className = "order-item red-theme show";
      li.setAttribute("data-id", data.id);
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
  const infoIfNoResult = () => {
    if (filteredData.length === 0)
      list.innerHTML = `<p class="no-result">No Match</p>`;
    else if (lastConection === 0 && filteredData !== 0) {
      createListItems();
      animateList();
    }
  };
  //show correct matches
  function showItemIfMatch(arrayElements: NodeListOf<HTMLElement>[]) {
    console.log(filteredData);
    if (data.length > 0) {
      const idItemsToShow: string[] = filteredData.map((data) => data.id);
      arrayElements.forEach((array: NodeListOf<HTMLElement>) => {
        const arrayItem: HTMLElement[] = Array.from(array);

        arrayItem.forEach((item: HTMLElement) => {
          idItemsToShow.forEach((id: string) => {
            if (item.dataset.id === id) item.classList.replace("hide", "show");
          });
        });
      });
    }
  }
  // hide wrong matches
  function hideItemIfNoMatch(
    mistakenData: any,
    arrayElements: NodeListOf<HTMLElement>[]
  ) {
    if (data.length > 0) {
      const idItemsToShow: string[] = mistakenData.map((data) => data.id);
      arrayElements.forEach((array: NodeListOf<HTMLElement>) => {
        const arrayItem: HTMLElement[] = Array.from(array);

        arrayItem.forEach((item: HTMLElement) => {
          idItemsToShow.forEach((id: string) => {
            if (item.dataset.id === id) item.classList.replace("show", "hide");
          });
        });
      });
    }
  }
  //delete matches
  function deleteItem() {
    const value: string = this.value;
    const parent: HTMLElement = this.parentElement;
    const orderItem: HTMLElement = document.querySelector(
      `.order-item[data-id="${value}"]`
    );

    data = data.filter((data) => data.id !== value);
    filteredData = filteredData.filter((data) => data.id !== value);
    parent.classList.remove("show");
    parent.classList.add("hide-scale-down");
    orderItem.classList.add("hide-scale-down");

    orderItem.addEventListener("transitionend", () => {
      parent.remove();
      orderItem.remove();
    });
    infoIfNoResult();
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
      getImg();
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
const searchFilter: HTMLElement = document.querySelector(".nav-conteiner");

document.addEventListener("scroll", () => {
  const scrollValue: number = window.scrollY;
  const offsetTop: number = searchFilter.offsetHeight;

  if (scrollValue >= offsetTop) searchFilter.classList.add("fixed-nav");
  else searchFilter.classList.remove("fixed-nav");
});

