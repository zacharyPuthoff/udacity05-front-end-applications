/* this function is used later to make the name and click count
   info appear overlayed on the images; at the starting welcome
   image, we don't want that though; this allows us to set it as
   hidden in the css, and the make it visible after the first
   click here*/
let firstTimeThrough = true;

function makeInfoVisible() {
  document.querySelector('#count').style.visibility = 'visible';
  document.querySelector('#the-cat-pic > img').style.border = '2px solid white';
}

// an object class with all relevant data for each picture object
class Cat {
  constructor(name, source) {
    this.name = name;
    this.clicks = 0;
    this.source = source;
  }
  fillInCatPic() {
    document.querySelector('#the-cat-pic > img').src = this.source;
    document.querySelector('#the-cat-pic > img').alt = this.name;
    document.querySelector('#the-cat-pic > #count').innerText = `Clicks: ${this.clicks}`;
  }
  updateClickCountDisplay() {
    document.querySelector('#the-cat-pic > #count').innerText = `Clicks: ${this.clicks}`;    
  }
}

/* this creates an array we'll use to store all our cat objects, and
   then creates those objects using our constructor function while
   pushing them into our array */
let theCatList = [];
theCatList.push(new Cat('Shelly', 'img/shelly.jpg'));
theCatList.push(new Cat('Garfield', 'img/garfield.jpg'));
theCatList.push(new Cat('Hobbes', 'img/hobbes.jpg'));
theCatList.push(new Cat('Salem', 'img/salem.jpg'));
theCatList.push(new Cat('Cheshire Cat', 'img/cheshire.jpg'));

/* for each cat in the array, we create a p node and then add a child node that
   is populated with the name of the cat using literal notation; that p node
   is then appended to a document fragment, which is appended to the aside tag
   after the for loop is done; this ensures that our DOM is only redrawn once
*/
let listFragment = document.createDocumentFragment();
for (let eachCat of theCatList) {
  let picNameNode = document.createElement('p');
  let picName = document.createTextNode(`${eachCat.name}`);
  listFragment.appendChild(picNameNode).appendChild(picName);
}
document.querySelector('aside').appendChild(listFragment);

/* this event listener runs when someone clicks in the aside section
   of the page; it checks to be sure that a text name was clicked, and
   then matches the name that was clicked to a name in our cat object
   array and then calls the appropriate method for that cat object to 
   populate the 'the-cat-pic' area with that picture's image and data
*/
document.querySelector('aside').addEventListener('click', (event) => {
  let clickedListItem = event.target;

  // makes sure text is clicked on
  if (clickedListItem.nodeName.toLowerCase() !== 'p') { return; }

  // matches what was clicked on to one of the cat objects in our array
  // and then increments the click count and changes the relevant HTML
  for (let thisCat of theCatList) {
    if (thisCat.name === clickedListItem.innerText) {
      document.querySelectorAll('aside > p').forEach((p) => {
        p.style.background = '';
        p.style.color = 'white';
      });
      clickedListItem.style.background = 'white';
      clickedListItem.style.color = '#191c57';
      thisCat.fillInCatPic();
    }
  }

  // only runs the first time this code is called and makes the information
  // for the name and click count visible on the image
  if (firstTimeThrough === true) {
    makeInfoVisible();
    firstTimeThrough = false;
  }
});

/* this listens for a click on the-cat-pic area of the page; it first
   confirms that the image was clicked, and then pulls the name of the
   cat in the image from the alt attribute (that is set as part of the
   constructor function) and increments it's click count and calls the 
   cat-object method to display the new click count on the page
*/
document.querySelector('#the-cat-pic').addEventListener('click', (event) => {
  let clickedCat = event.target;

  if (clickedCat.nodeName.toLowerCase() !== 'img') { return; }

  for (let thisCat of theCatList) {
    if (thisCat.name === clickedCat.alt) {
      thisCat.clicks++;
      thisCat.updateClickCountDisplay();
    }
  }
});