document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  initHeroCarousel()
  initCountdownTimer()
  initBackToTop()
  loadUpcomingConferences()
  loadFeaturedSpeakers()

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

function initHeroCarousel() {
  const heroImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=600&fit=crop",
  ]

  const carousel = document.getElementById("heroCarousel")
  let currentIndex = 0

  // Create image elements
  heroImages.forEach((src, index) => {
    const img = document.createElement("div")
    img.className = `absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === 0 ? "opacity-100" : "opacity-0"}`
    img.style.backgroundImage = `url(${src})`
    carousel.appendChild(img)
  })

  // Auto-rotate images
  setInterval(() => {
    const current = carousel.children[currentIndex]
    currentIndex = (currentIndex + 1) % heroImages.length
    const next = carousel.children[currentIndex]

    current.classList.remove("opacity-100")
    current.classList.add("opacity-0")
    next.classList.remove("opacity-0")
    next.classList.add("opacity-100")
  }, 5000)
}

function initCountdownTimer() {
  const targetDate = new Date("2025-03-15T09:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance < 0) {
      document.getElementById("countdownTimer").innerHTML = '<p class="text-xl">Conference has started!</p>'
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("days").textContent = days.toString().padStart(2, "0")
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove("opacity-0", "invisible")
    } else {
      backToTopBtn.classList.add("opacity-0", "invisible")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

const api = {
  getUpcomingConferences: async () => {
    // Mock implementation for demonstration purposes
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Conference 1",
          description: "Description of Conference 1",
          status: "Upcoming",
          start_date: "2025-03-10",
          location: "Location 1",
          registration_fee: 10000,
        },
        {
          id: 2,
          name: "Conference 2",
          description: "Description of Conference 2",
          status: "Upcoming",
          start_date: "2025-03-12",
          location: "Location 2",
          registration_fee: 15000,
        },
        // Add more conference data as needed
      ],
    }
  },
  getSpeakers: async () => {
    // Mock implementation for demonstration purposes
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Speaker 1",
          title: "Title 1",
          organization: "Organization 1",
          expertise: "Expertise 1",
          photo_url: "https://example.com/photo1.jpg",
          linkedin: "linkedin1",
          twitter: "twitter1",
        },
        {
          id: 2,
          name: "Speaker 2",
          title: "Title 2",
          organization: "Organization 2",
          expertise: "Expertise 2",
          photo_url: "",
          linkedin: "linkedin2",
          twitter: "twitter2",
        },
        // Add more speaker data as needed
      ],
    }
  },
}

async function loadUpcomingConferences() {
  const grid = document.getElementById("conferencesGrid")

  try {
    const response = await api.getUpcomingConferences()

    if (response.success && response.data.length > 0) {
      grid.innerHTML = response.data
        .slice(0, 6)
        .map(
          (conference) => `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                ${conference.status}
                            </span>
                            <span class="text-sm text-gray-500">
                                ${new Date(conference.start_date).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">${conference.name}</h3>
                        <p class="text-gray-600 mb-4 line-clamp-3">${conference.description}</p>
                        
                        <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                ${conference.location}
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                ₦${conference.registration_fee.toLocaleString()}
                            </div>
                        </div>
                        
                        <div class="flex space-x-2">
                            <a href="register.html?conference=${conference.id}" class="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition-colors">
                                Register
                            </a>
                            <a href="conferences.html#${conference.id}" class="flex-1 border border-green-600 text-green-600 hover:bg-green-50 text-center py-2 px-4 rounded transition-colors">
                                Details
                            </a>
                        </div>
                    </div>
                </div>
            `,
        )
        .join("")
    } else {
      grid.innerHTML =
        '<div class="col-span-full text-center py-8 text-gray-500">No upcoming conferences available.</div>'
    }
  } catch (error) {
    console.error("Error loading conferences:", error)
    grid.innerHTML = '<div class="col-span-full text-center py-8 text-red-500">Failed to load conferences.</div>'
  }
}

async function loadFeaturedSpeakers() {
  const grid = document.getElementById("speakersGrid")

  try {
    const response = await api.getSpeakers()

    if (response.success && response.data.length > 0) {
      grid.innerHTML = response.data
        .slice(0, 6)
        .map(
          (speaker) => `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6 text-center">
                        <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                            ${
                              speaker.photo_url
                                ? `<img src="${speaker.photo_url}" alt="${speaker.name}" class="w-full h-full object-cover">`
                                : `<div class="w-full h-full flex items-center justify-center bg-green-100 text-green-600">
                                    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>`
                            }
                        </div>
                        
                        <h3 class="text-xl font-semibold text-gray-900 mb-1">${speaker.name}</h3>
                        <p class="text-green-600 font-medium mb-2">${speaker.title}</p>
                        <p class="text-gray-600 text-sm mb-4">${speaker.organization}</p>
                        <p class="text-gray-700 text-sm line-clamp-3">${speaker.expertise}</p>
                        
                        <div class="mt-4 flex justify-center space-x-2">
                            ${
                              speaker.linkedin
                                ? `
                                <a href="${speaker.linkedin}" target="_blank" class="text-blue-600 hover:text-blue-800">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            `
                                : ""
                            }
                            ${
                              speaker.twitter
                                ? `
                                <a href="https://twitter.com/${speaker.twitter}" target="_blank" class="text-blue-400 hover:text-blue-600">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                                    </svg>
                                </a>
                            `
                                : ""
                            }
                        </div>
                    </div>
                </div>
            `,
        )
        .join("")
    } else {
      grid.innerHTML = '<div class="col-span-full text-center py-8 text-gray-500">No speakers available.</div>'
    }
  } catch (error) {
    console.error("Error loading speakers:", error)
    grid.innerHTML = '<div class="col-span-full text-center py-8 text-red-500">Failed to load speakers.</div>'
  }
}
