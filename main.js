// Target all project gifs.
// if not on mobile device, add lazy loading
if (!navigator.userAgent.toLowerCase().match(/mobile/i)) {
  const projectGifs = document.querySelectorAll('.active')

  projectGifs.forEach((gif) => {
    gif.setAttribute('loading', 'lazy')
  })
}

// Intersection Observer API listens for elements to enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('swipe')
    }
  })
})

// Swipe class gets added to each
// element of the highlight class as it enters the viewport
document.querySelectorAll('.highlight').forEach((i) => {
  if (i) {
    observer.observe(i)
  }
})
