// ------------------ Scroll Progress Bar ------------------ //
window.onscroll = function () {
  scrollTracker();
};

function scrollTracker() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// ------------------ Navbar Tracker ------------------ //
// Listener for section-viewport overlap
window.addEventListener("DOMContentLoaded", () => {
  // Track all sections that have an `id` applied
  const container = document.getElementsByClassName("main")[0];
  const chapters = container.querySelectorAll("h1[id]");

  const ids = []; // all chapter ids
  chapters.forEach((entry) => {
    ids.push(entry.getAttribute("id"));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.sort((a, b) => {
      // sort and get highest overlap
      return b.intersectionRatio - a.intersectionRatio;
    }, 0);
    const max_id = entries[0].target.getAttribute("id");

    if (entries[0].intersectionRatio > 0) {
      ids.forEach((id) => {
        if (id == max_id) {
          // set the newly viewed section as active on navbar
          document
            .getElementById(`a-${id}`)
            .parentElement.classList.add("active-section");
        } else {
          document
            .getElementById(`a-${id}`)
            .parentElement.classList.remove("active-section");
        }
      });
    }
  });

  chapters.forEach((chapter) => {
    // place observer on each chapter
    observer.observe(chapter);
  });
});
