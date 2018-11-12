const model = {
  currentCat: { name: 'Start Page', src: 'img/starter.png' },
  cats: [
    { name: 'Shelly', clicks: 0, src: 'img/shelly.jpg' },
    { name: 'Garfield', clicks: 0, src: 'img/garfield.jpg' },
    { name: 'Hobbes', clicks: 0, src: 'img/hobbes.jpg' },
    { name: 'Salem', clicks: 0, src: 'img/salem.jpg' },
    { name: 'Cheshire Cat', clicks: 0, src: 'img/cheshire.jpg' },
  ]
};

const octopus = {
  init() {
    catListView.createList();
    currentCatView.render(true);
    this.listenForListClicks();
    this.listenForCatClicks();
  },
  getCurrentCat() {
    return model.currentCat;
  },
  getCats() {
    return model.cats;
  },
  listenForListClicks() {
    document.querySelector('aside').addEventListener('click', (event) => {
      let listItemClicked = event.target;

      if (listItemClicked.nodeName.toLowerCase() !== 'p') { return; }

      model.currentCat = model.cats.filter(cat => (cat.name === listItemClicked.innerText))[0];
      catListView.highlightSelectedCat(listItemClicked);
      currentCatView.render();
    });
  },
  listenForCatClicks() {
    document.querySelector('#the-cat-pic').addEventListener('click', (event) => {
      let clickedCat = event.target;

      if (clickedCat.nodeName.toLowerCase() !== 'img') { return; }

      model.currentCat.clicks++;
      currentCatView.changeDisplayedClicks();
    });
  }
};

const catListView = {
  createList() {
    let theCats = octopus.getCats();
    let listFragment = document.createDocumentFragment();

    theCats.forEach(cat => {
      let catNameContainer = document.createElement('p');
      let catNameText = document.createTextNode(`${cat.name}`);
      listFragment.appendChild(catNameContainer).appendChild(catNameText);
    });
    
    document.querySelector('aside').appendChild(listFragment);
  },
  highlightSelectedCat(currentCatListEntry) {
    document.querySelectorAll('aside > p').forEach((p) => {
      p.style.background = '';
      p.style.color = 'white';
    });
    currentCatListEntry.style.background = 'white';
    currentCatListEntry.style.color = '#191c57';
  }
};

const currentCatView = {
  render(firstRender) {
    let currentCat = octopus.getCurrentCat();
    document.querySelector('#the-cat-pic > img').src = currentCat.src;
    document.querySelector('#the-cat-pic > img').alt = currentCat.name;
    if (!firstRender) {
      document.querySelector('#count').style.visibility = 'visible';
      document.querySelector('#the-cat-pic > img').style.border = '2px solid white';
      document.querySelector('#the-cat-pic > #count').innerText = `Clicks: ${currentCat.clicks}`;
    }
  },
  changeDisplayedClicks() {
    let currentCat = octopus.getCurrentCat();
    document.querySelector('#the-cat-pic > #count').innerText = `Clicks: ${currentCat.clicks}`;
  }
};

octopus.init();