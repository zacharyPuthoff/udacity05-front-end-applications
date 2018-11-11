/* this function is used later to make the name and click count
   info appear overlayed on the images; at the starting welcome
   image, we don't want that though; this allows us to set it as
   hidden in the css, and the make it visible after the first
   click here*/
let firstTimeThrough = true;
function makeInfoVisible() {
  document.querySelector('#name').style.visibility = 'visible';
  document.querySelector('#count').style.visibility = 'visible';
  document.querySelector('#the-cat-pic > img').style.border = '2px solid white';
}

// an object class with all relevant data for each picture object
class Cat {
  constructor(name, source) {
    this.name = name;
    this.source = source;
    this.clicks = 0;
  }
  fillInHTML() {
    document.querySelector('#the-cat-pic > img').src = this.source;
    document.querySelector('#the-cat-pic > img').alt = this.name;
    document.querySelector('#the-cat-pic > #name').innerText = this.name;
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
let listFragment =document.createDocumentFragment();
for (let eachCat of theCatList) {
  let picNameNode = document.createElement('p');
  let picName = document.createTextNode(`${eachCat.name}`);
  listFragment.appendChild(picNameNode).appendChild(picName);
}
document.querySelector('aside').appendChild(listFragment);

/* this is the event listener that records the clicks a user performs; 
   the first part checks to be sure that an image was clicked on, and if
   not then it exits; otherwise, the id of the clicked image is pulled, and
   modified to reflect it's index in the array of cat picture objects; I then 
   use that info to increment the clicks property in that particular cat picture
   object, and then use the built in method to change the HTML on the page so 
   the click count displays accurately
*/
document.querySelector('aside').addEventListener('click', (event) => {

  let clickedElement = event.target;

  // makes sure text is clicked on
  if (clickedElement.nodeName.toLowerCase() !== 'p') {
    return;
  }

  // matches what was clicked on to one of the cat objects in our array
  // and then increments the click count and changes the relevant HTML
  for (let thisCat of theCatList) {
    if (thisCat.name === clickedElement.innerText) {
      thisCat.clicks++;
      thisCat.fillInHTML();
    }
  }
  
  // only runs the first time this code is called and makes the information
  // for the name and click count visible on the image
  if (firstTimeThrough === true) {
    makeInfoVisible();
    firstTimeThrough = false;
  }
});