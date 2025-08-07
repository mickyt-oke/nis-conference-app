const translations = {
  en: {
    // Navigation
    home: "Home",
    conferences: "Conferences",
    speakers: "Speakers",
    documents: "Documents",
    gallery: "Gallery",
    login: "Login",
    register: "Register",

    // Hero Section
    annualConference: "Annual Conference 2025",
    heroTitle: "Nigeria Immigration Service",
    heroSubtitle: "Conference Management",
    heroDescription: "Advancing Immigration Excellence Through Innovation, Collaboration, and Professional Development",
    registerNow: "Register Now",
    viewProgram: "View Program",

    // Stats
    registeredParticipants: "Registered Participants",
    expertSpeakers: "Expert Speakers",
    stakeholdersRepresented: "Stakeholders Represented",
    daysOfLearning: "Days of Learning",

    // Sections
    upcomingConferences: "Upcoming Conferences",
    upcomingConferencesDesc: "Join us for these exciting conferences and networking opportunities",
    featuredSpeakers: "Featured Speakers",
    featuredSpeakersDesc: "Learn from industry experts and thought leaders",

    // Common
    loading: "Loading...",
    viewAll: "View All",
    learnMore: "Learn More",
    contactUs: "Contact Us",

    // Time units
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },

  fr: {
    // Navigation
    home: "Accueil",
    conferences: "Conférences",
    speakers: "Intervenants",
    documents: "Documents",
    gallery: "Galerie",
    login: "Connexion",
    register: "S'inscrire",

    // Hero Section
    annualConference: "Conférence Annuelle 2025",
    heroTitle: "Service d'Immigration du Nigeria",
    heroSubtitle: "Gestion de Conférence",
    heroDescription:
      "Faire progresser l'excellence de l'immigration grâce à l'innovation, à la collaboration et au développement professionnel",
    registerNow: "S'inscrire Maintenant",
    viewProgram: "Voir le Programme",

    // Stats
    registeredParticipants: "Participants Inscrits",
    expertSpeakers: "Experts Intervenants",
    stakeholdersRepresented: "Parties Prenantes Représentées",
    daysOfLearning: "Jours d'Apprentissage",

    // Sections
    upcomingConferences: "Conférences à Venir",
    upcomingConferencesDesc: "Rejoignez-nous pour ces conférences passionnantes et opportunités de réseautage",
    featuredSpeakers: "Intervenants Vedettes",
    featuredSpeakersDesc: "Apprenez des experts de l'industrie et des leaders d'opinion",

    // Common
    loading: "Chargement...",
    viewAll: "Voir Tout",
    learnMore: "En Savoir Plus",
    contactUs: "Nous Contacter",

    // Time units
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
  },

  ar: {
    // Navigation
    home: "الرئيسية",
    conferences: "المؤتمرات",
    speakers: "المتحدثون",
    documents: "الوثائق",
    gallery: "المعرض",
    login: "تسجيل الدخول",
    register: "التسجيل",

    // Hero Section
    annualConference: "المؤتمر السنوي 2025",
    heroTitle: "دائرة الهجرة النيجيرية",
    heroSubtitle: "إدارة المؤتمرات",
    heroDescription: "تطوير التميز في الهجرة من خلال الابتكار والتعاون والتطوير المهني",
    registerNow: "سجل الآن",
    viewProgram: "عرض البرنامج",

    // Stats
    registeredParticipants: "المشاركون المسجلون",
    expertSpeakers: "المتحدثون الخبراء",
    stakeholdersRepresented: "أصحاب المصلحة الممثلون",
    daysOfLearning: "أيام التعلم",

    // Sections
    upcomingConferences: "المؤتمرات القادمة",
    upcomingConferencesDesc: "انضم إلينا في هذه المؤتمرات المثيرة وفرص التواصل",
    featuredSpeakers: "المتحدثون المميزون",
    featuredSpeakersDesc: "تعلم من خبراء الصناعة وقادة الفكر",

    // Common
    loading: "جاري التحميل...",
    viewAll: "عرض الكل",
    learnMore: "اعرف المزيد",
    contactUs: "اتصل بنا",

    // Time units
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
  },
}

class TranslationManager {
  constructor() {
    this.currentLanguage = localStorage.getItem("language") || "en"
    this.init()
  }

  init() {
    this.updatePageDirection()
    this.translatePage()
    this.setupLanguageSelector()
  }

  setLanguage(lang) {
    this.currentLanguage = lang
    localStorage.setItem("language", lang)
    this.updatePageDirection()
    this.translatePage()
  }

  updatePageDirection() {
    document.documentElement.lang = this.currentLanguage
    document.documentElement.dir = this.currentLanguage === "ar" ? "rtl" : "ltr"
  }

  translate(key) {
    return translations[this.currentLanguage][key] || translations.en[key] || key
  }

  translatePage() {
    const elements = document.querySelectorAll("[data-translate]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate")
      element.textContent = this.translate(key)
    })
  }

  setupLanguageSelector() {
    const selector = document.getElementById("languageSelector")
    if (selector) {
      selector.value = this.currentLanguage
      selector.addEventListener("change", (e) => {
        this.setLanguage(e.target.value)
      })
    }
  }
}

// Initialize translation manager
const translator = new TranslationManager()
