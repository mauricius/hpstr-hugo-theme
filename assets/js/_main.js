var entryImg = document.querySelector('.entry-image img');

if (entryImg) {
  window.addEventListener('scroll', function() {
    var filterVal = window.pageYOffset / 40;
    var filter = 'blur(' + filterVal + 'px)';

    entryImg.style.filter = filter;
    entryImg.style.webkitFilter = filter;
    entryImg.style.mozFilter = filter;
    entryImg.style.oFilter = filter;
    entryImg.style.msFilter = filter;
  });
}
