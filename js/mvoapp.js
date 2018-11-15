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
    this.listClickListener();
    this.currentCatClickListener();
    this.adminButtonListener();
    this.saveButtonListener();
    this.cancelButtonListener();
  },
  getCurrentCat() {
    return model.currentCat;
  },
  getCats() {
    return model.cats;
  },
  listClickListener() {
    document.querySelector('#cat-list').addEventListener('click', (event) => {
      let listItemClicked = event.target;

      if (listItemClicked.nodeName.toLowerCase() !== 'p') { return; }

      model.currentCat = model.cats.filter(cat => (cat.name === listItemClicked.innerText))[0];
      catListView.highlightSelectedCat(listItemClicked);
      currentCatView.render();
    });
  },
  currentCatClickListener() {
    document.querySelector('#cat-display').addEventListener('click', (event) => {
      if (event.target.id !== 'cat-pic') { return; }
      model.currentCat.clicks++;
      currentCatView.changeDisplayedClicks();
    });
  },
  adminButtonListener() {
    document.querySelector('#admin-button').addEventListener('click', () => {
      catAdminView.toggle();
    });
  },
  saveButtonListener() {
    document.querySelector('#save-button').addEventListener('click', () => {
      let currentCat = this.getCurrentCat();

      currentCat.name = document.querySelector('#new-name').value;
      currentCat.src = document.querySelector('#new-pic-url').value;
      currentCat.clicks = document.querySelector('#new-click-count').value;

      currentCatView.render();
      catListView.update();
      catAdminView.toggle();
    });
  },
  cancelButtonListener() {
    document.querySelector('#cancel-button').addEventListener('click', () => {
      catAdminView.toggle();
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

    document.querySelector('#cat-list').appendChild(listFragment);
  },
  highlightSelectedCat(currentCatListEntry) {
    document.querySelectorAll('#cat-list > p').forEach((p) => {
      p.style.background = '';
      p.style.color = 'white';
    });
    currentCatListEntry.style.background = 'white';
    currentCatListEntry.style.color = '#191c57';
  },
  update() {
    let theCats = octopus.getCats();
    let listEntries = document.querySelectorAll('#cat-list > p');

    theCats.forEach(cat => {
      listEntries[theCats.indexOf(cat)].innerText = cat.name; 
    });
  }
};

const catAdminView = {
  toggle() {
    let adminView = document.querySelector('#admin');
    let listView = document.querySelector('#cat-list');

    if (octopus.getCurrentCat().name === 'Start Page') {return;}

    if (adminView.style.display == 'block') {
      adminView.style.display = 'none';
      listView.style.display = 'block';
    } else { 
      this.fillValues();
      adminView.style.display = 'block';
      listView.style.display = 'none';
    }
  },
  fillValues() {
    let currentCat = octopus.getCurrentCat();
    if (octopus.getCurrentCat().name === 'Start Page') {return;}
    document.querySelector('#new-name').value = currentCat.name;
    document.querySelector('#new-pic-url').value = currentCat.src;
    document.querySelector('#new-click-count').value = currentCat.clicks;
  }
};

const currentCatView = {
  render(firstRender) {
    let currentCat = octopus.getCurrentCat();
    let catPic = document.querySelector('#cat-pic');
    let clickCount = document.querySelector('#click-count');

    catPic.src = currentCat.src;
    catPic.alt = currentCat.name;
    if (!firstRender) {
      catPic.style.border = '2px solid white';
      clickCount.style.visibility = 'visible';
      clickCount.innerText = `Clicks: ${currentCat.clicks}`;
    }
  },
  changeDisplayedClicks() {
    let currentCat = octopus.getCurrentCat();
    document.querySelector('#click-count').innerText = `Clicks: ${currentCat.clicks}`;
    document.querySelector('#new-click-count').value = currentCat.clicks;
  }
};

octopus.init();