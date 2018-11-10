let clickCount = 0;
const countDisplay = document.querySelector('#counter');
const catPic = document.querySelector('#cat-pic');

catPic.addEventListener('click', () => {
  clickCount++;
  countDisplay.innerText = `${clickCount}`;
});