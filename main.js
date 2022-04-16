// Intersection Observer API listens for an element 
// or (in this case, elements) to enter the viewport

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('swipe')
        }
    })
});

document.querySelectorAll('.highlight').forEach((i) => {
    if (i) {
        observer.observe(i);
    }
});