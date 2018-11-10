// an object class with all relevant data for each picture object
class Cat {
  constructor(name, position) {
    this.position = position;
    this.name = name;
    this.clicks = 0;
  }
  updateHTML() {
    document.querySelectorAll('.count')[this.position].innerText = `Clicks: ${this.clicks}`;
  }
}

/* the following selects all div's of the class 'cat-pics', and I also 
   create an array to hold all the cat picture objects 
*/ 
const catPics = document.querySelectorAll('.cat-pics');
let theCatList = [];

/* this code cycles through all the catPics and pulls out the name & position 
   (the numbering starts with 0), then creates a new cat picture object and
   assigns those values to it, and then pushes it into our array of  
   cat picture objects which we'll reference in a moment
*/ 
for (let eachCat of catPics) {
  let theName = eachCat.querySelector('.name').innerText;
  let thePosition = eachCat.querySelector('img').id;
  let newCat = new Cat(theName, thePosition);

  theCatList.push(newCat);
}

/* this is the event listener that records the clicks a user performs; 
   the first part checks to be sure that an image was clicked on, and if
   not then it exits; otherwise, the id of the clicked image is pulled, and 
   i've coded the id for each pipcture to correspond to it's position in the
   lineup of cat pictures; we then use that info to increment the clicks
   property in that particular cat picture object, and then use the built in
   method to change the HTML on the page so the click count display properly 
*/ 
document.querySelector('#the-click-area').addEventListener('click', (event) => {
  let clickedElement = event.target.nodeName.toLowerCase();

  if (clickedElement !== 'img') {
    return;
  }

  let picID = event.target.id;

  theCatList[picID].clicks++;
  theCatList[picID].updateHTML();
});