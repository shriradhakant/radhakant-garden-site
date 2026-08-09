import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from "react";
import {
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Sparkles,
  Menu,
  ChevronLeft,
  ChevronRight,
  Lock,
  LogOut,
  Flower2,
  UtensilsCrossed,
  Trees,
  Music,
  Clock,
  Trash2,
  CircleCheck,
  CircleDashed,
  CircleSlash,
  BedDouble,
  Briefcase,
  Languages,
  Image as ImageIcon,
  Flame,
  CalendarCheck,
  Search,
} from "lucide-react";

/* ---------------------------------------------------------
   PALETTE  (applied via inline style — no arbitrary Tailwind)
   ivory      #FBF6EE   background
   maroon     #6B1E2B   primary / headers
   maroonDeep #4A1420   hover / dark panels
   gold       #B8863B   accent / borders / buttons
   goldSoft   #E4C989   light accent fills
   ink        #241F1C   body text
   sage       #4B5D42   secondary accent (admin)
--------------------------------------------------------- */
const C = {
  ivory: "#FDF3E4",
  ivoryDim: "#F7E7C8",
  maroon: "#6B1E2B",
  maroonDeep: "#4A1420",
  gold: "#B8863B",
  goldSoft: "#E4C989",
  saffron: "#E67E22",
  ink: "#241F1C",
  inkSoft: "#5B534C",
  sage: "#4B5D42",
  sageSoft: "#DCE3D6",
  white: "#FFFFFF",
};

const FONT_IMPORT_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap";

const HALL_NAME = "Shri Radhakant Garden";
const ADMIN_PASSCODE = "Radhakantji12";
const AVAILABILITY_START = new Date(2026, 10, 1); // November 2026

/* ---------------------------------------------------------
   GALLERY IMAGES — replace `src` with a real photo URL once
   you have one hosted online (e.g. after uploading to your
   own site, Google Drive public link, Imgur, etc). Leave
   `src` empty/null to keep the elegant placeholder tile.
--------------------------------------------------------- */
const GALLERY_IMAGES = [
  { key: "banquet", icon: "UtensilsCrossed", src: "/images/gallery-banquet.jpg" },
  { key: "lawn", icon: "Trees", src: "/images/gallery-lawn.png" },
  { key: "mandap", icon: "Flower2", src: "/images/gallery-mandap.jpg" },
  { key: "deck", icon: "Music", src: "/images/gallery-deck.png" },
  { key: "rooms", icon: "BedDouble", src: "/images/gallery-rooms.jpg" },
  { key: "entrance", icon: "Sparkles", src: "/images/gallery-entrance.jpg" },
];
const DEITY_IMAGE = "/images/deity-image.jpg";
const FOUNDER1_IMAGE = "/images/founder1-image.jpg";
const MEMORIAL_IMAGE = "/images/memorial-image.jpg";
const LOGO_IMAGE = "/images/logo-image.jpg";
const BLESSING_IMAGE = "/images/blessing-image.jpg";

/* =========================================================
   TRANSLATIONS
========================================================= */
const T = {
  en: {
    tagline: "A hall built for the day you'll tell stories about for fifty years.",
    nav: { about: "About", spaces: "Spaces", gallery: "Gallery", memorial: "In Memoriam", founders: "Founders' Message", blessings: "Blessings", packages: "Packages", availability: "Availability", enquire: "Enquire", manage: "Manage", exitAdmin: "Exit admin" },
    hero: { badge: "Opening November 2026", ctaCheck: "Check available dates", ctaPackages: "View packages" },
    bookingBar: {
      date: "Event Date",
      guests: "Guests",
      guestsPh: "e.g. 400",
      eventType: "Event Type",
      cta: "Check Availability",
    },
    about: {
      eyebrow: "Welcome",
      title: "About Us",
      p1: `Welcome to ${HALL_NAME}, where every celebration is transformed into an unforgettable experience. Located in Badkagaon Tola, Alichak, Gopalganj, Bihar, our premium wedding and event venue is dedicated to making your special moments truly memorable. With modern amenities, a spacious venue, and an elegant ambiance, ${HALL_NAME} is the perfect destination for weddings and all types of celebrations.`,
      p2: `With a seating capacity of approximately 2000 guests, ${HALL_NAME} is an ideal venue for weddings, receptions, engagements, Haldi and Sangeet ceremonies, birthdays, anniversaries, family gatherings, social functions, and corporate events.`,
      p3: `Our venue features a grand banquet hall, a beautifully designed stage, ample parking, modern lighting, clean and well-maintained washrooms, reliable power backup, and thoughtfully planned facilities to ensure the comfort of every guest. Our experienced and dedicated team is committed to delivering seamless event management and exceptional hospitality, making every occasion truly memorable.`,
      p4: `${HALL_NAME} is guided by the inspiring leadership of Shri Hemkant Saran Devacharya, the National President of Bharat Sadhu Samaj. His lifelong dedication to preserving spiritual, cultural, and social values serves as the foundation of our principles and inspires our commitment to excellence, integrity, and service.`,
      p5: `The institution is further strengthened by the valuable contribution of Shri Balindra Singh, a respected social activist and the Mukhiya (Village Head) of his Panchayat. His dedication to public service, community development, and responsible leadership reflects the values of hospitality, trust, and social responsibility that define ${HALL_NAME}.`,
      p6: `At ${HALL_NAME}, our mission extends beyond providing a wedding venue — we strive to create extraordinary experiences where every celebration is conducted with elegance, impeccable arrangements, and heartfelt hospitality. Your trust and satisfaction remain our greatest achievement, and we are honored to be a part of your life's most cherished moments.`,
      tagline: "श्री राधाकांत गार्डन — आपकी खुशियों का भव्य और विश्वसनीय गंतव्य।",
      stat1: "guests, approx. capacity",
      stat2: "opening date",
      stat3: "kitchens for live counters",
    },
    spaces: {
      eyebrow: "The venue",
      title: "Six spaces, one property",
      banquetName: "The Banquet Hall",
      banquetDesc: "Pillar-free, air-conditioned, seats 600 across round tables.",
      lawnName: "The Mandap Lawn",
      lawnDesc: "Open-air ceremony lawn beneath old neem trees, seats 1500.",
      deckName: "The Sangeet Deck",
      deckDesc: "Raised stage and dance floor with in-house sound and lighting.",
      roomsName: "AC Guest Rooms",
      roomsDesc: "Spacious air-conditioned rooms on-site for family and out-of-town guests to stay over.",
      corpName: "Corporate Meeting Area",
      corpDesc: "A dedicated, quiet space with AV setup for board meetings, offsites, and conferences.",
      parkingName: "Guest Parking",
      parkingDesc: "On-site parking for 150 cars with valet on request.",
    },
    packages: {
      eyebrow: "Plan your budget",
      title: "Packages",
      mostBooked: "MOST BOOKED",
      enquireAbout: "Enquire about",
      wedding: { name: "Wedding Package", tag: "Full-day hall booking for your wedding", f: ["Hall - full day", "Basic decoration", "Bridal room", "4 guest rooms", "Parking"] },
      engagement: { name: "Engagement Package", tag: "6-hour hall booking with stage decoration", f: ["Hall - 6 hrs", "Stage decoration", "Parking"] },
      reception: { name: "Reception Package", tag: "Hall booking with stage decoration", f: ["Hall - 4 hrs", "Stage decoration", "Bridal room", "2 guest rooms", "Parking"] },
      birthday: { name: "Birthday Package", tag: "4-hour hall booking for celebrations", f: ["Hall, 4 hours", "Basic decoration", "1 guest room", "Parking"] },
      corporate: { name: "Corporate Meeting Package", tag: "Hall booking for meetings & offsites", f: ["Hall - 4 hrs", "Stage", "Parking"] },
    },
    availability: {
      eyebrow: "Check the date",
      title: "Availability",
      desc: "Gold marks a date already promised to another family. Open circles are free — tap one to start your enquiry with the date filled in.",
      legendBooked: "Booked",
      legendBlocked: "Blocked",
      legendOpen: "Open — tap to enquire",
    },
    enquire: {
      eyebrow: "Let's talk dates",
      title: "Send an enquiry",
      name: "Your name", namePh: "Ananya Sharma",
      phone: "Phone", phonePh: "98765 43210",
      email: "Email (optional)", emailPh: "you@email.com",
      date: "Event date",
      guests: "Expected guests", guestsPh: "400",
      eventType: "Event type",
      eventTypes: {
        Wedding: "Wedding", "Sangeet / Reception": "Sangeet / Reception", Engagement: "Engagement", Anniversary: "Anniversary", "Corporate Meeting": "Corporate Meeting", "Other celebration": "Other celebration",
      },
      message: "Anything we should know?", messagePh: "Preferred catering style, décor ideas, questions...",
      submit: "Send enquiry", submitting: "Sending...",
      errName: "Enter a name.", errPhone: "Enter a valid phone number.", errDate: "Pick a date.", errGuests: "Enter expected guests.",
    },
    gallery: {
      eyebrow: "A glimpse inside",
      title: "Gallery",
      note: "Photos coming soon — add your own once the venue is shoot-ready.",
      banquet: "The Banquet Hall",
      lawn: "The Mandap Lawn",
      mandap: "Wedding Mandap",
      deck: "The Sangeet Deck",
      rooms: "AC Guest Rooms",
      entrance: "Main Entrance",
    },
    memorial: {
      eyebrow: "In Loving Memory",
      title: "Late Smt. Sheela Devi",
      subtitle: "Former Mukhiya",
      p1: `This Marriage Hall stands as a heartfelt tribute to the cherished memory of Late Smt. Sheela Devi, Former Mukhiya, whose life was dedicated to public service, compassion, integrity, and the welfare of the community.`,
      p2: "She was widely respected for her humility, kindness, and unwavering commitment to serving others. Her leadership and dedication continue to inspire generations, leaving behind a legacy of love, unity, and selfless service.",
      p3: `Inspired by her values and vision, this Marriage Hall has been established to celebrate life's most precious moments in an atmosphere of warmth, dignity, and excellence. We are committed to providing exceptional hospitality and creating unforgettable memories for every family that celebrates with us.`,
      p4: "May her noble ideals continue to guide us, and may her blessings remain with every guest who walks through our doors.",
      closing: "With deepest respect and everlasting gratitude, we honor the cherished memory of Late Smt. Sheela Devi (Former Mukhiya).",
    },
    blessings: {
      eyebrow: "Blessings",
      title: "Shri Kashinath Singh",
      quote: "May this sacred ground be forever blessed with peace, prosperity, and joy. May every family that steps through these doors find their celebrations filled with divine grace, harmony, and everlasting happiness.",
    },
    founders: {
      eyebrow: "In their own words",
      title: "Founders' Message",
      salutation: "Dear Guests,",
      p1: `Welcome to ${HALL_NAME}. We believe that every celebration is more than just an event — it is a cherished milestone filled with love, tradition, family, and unforgettable memories. With this vision, ${HALL_NAME} was established to provide a venue where elegance, comfort, and exceptional hospitality come together to create truly remarkable experiences.`,
      p2: "Our mission is not only to offer a world-class wedding and event venue but also to ensure that every guest enjoys impeccable service, thoughtful attention to detail, and a warm, welcoming atmosphere. From intimate family gatherings to grand celebrations, we are committed to making every occasion seamless and memorable.",
      p3: `The values of trust, integrity, excellence, and service are at the heart of everything we do. We continually strive to exceed expectations so that every event hosted at ${HALL_NAME} becomes a beautiful memory that lasts a lifetime.`,
      p4: "We sincerely thank you for your trust and look forward to welcoming you and your loved ones to celebrate life's most precious moments with us.",
      closing: "With warm regards,",
      sig1Name: "Shri Hemkant Saran Devacharya",
      sig1Title: "Nimbark Pithadhishwar · President, Bharat Sadhu Samaj",
      sig2Name: "Shri Balindra Singh",
      sig2Title: "Social Activist & Mukhiya",
      venueLine: `${HALL_NAME}`,
      addressLine: "Badkagaon Tola, Alichak, Gopalganj, Bihar, India",
    },
    footer: { address: "Badkagaon Tola, Alichak, Gopalganj (Bihar)" },
    toast: { sent: "Your enquiry has been sent. We'll call you within a day.", saveFail: "Could not save — please try again.", markedAs: "Marked as", removed: "Enquiry removed." },
    admin: {
      signInTitle: "Manager sign-in",
      passcodeHint: "Demo passcode:",
      passcodePlaceholder: "Passcode",
      incorrect: "Incorrect passcode.",
      enter: "Enter dashboard",
      eyebrow: "Manager dashboard",
      title: "Bookings & enquiries",
      tabEnquiries: "Enquiries",
      tabCalendar: "Calendar",
      pending: "Pending", confirmed: "Confirmed", declined: "Declined", total: "Total enquiries",
      filterAll: "all",
      empty: "No enquiries here yet. New ones will appear the moment a family submits the form.",
      confirm: "Confirm", decline: "Decline", reset: "Reset", deleteAria: "Delete enquiry",
      guestsLabel: "guests",
      calendarHint: "Tap a date to block it for maintenance or a private hold. Dates from confirmed enquiries are marked gold automatically and can't be toggled here — change the enquiry's status instead.",
    },
  },
  hi: {
    tagline: "एक ऐसा हॉल, जिसकी कहानियाँ आप पचास साल तक सुनाएँगे।",
    nav: { about: "परिचय", spaces: "स्थान", gallery: "गैलरी", memorial: "श्रद्धांजलि", founders: "संस्थापकों का संदेश", blessings: "आशीर्वाद", packages: "पैकेज", availability: "उपलब्धता", enquire: "पूछताछ", manage: "प्रबंधन", exitAdmin: "बाहर निकलें" },
    hero: { badge: "नवंबर 2026 में शुरुआत", ctaCheck: "उपलब्ध तारीखें देखें", ctaPackages: "पैकेज देखें" },
    bookingBar: {
      date: "कार्यक्रम की तारीख",
      guests: "मेहमान",
      guestsPh: "जैसे 400",
      eventType: "कार्यक्रम का प्रकार",
      cta: "उपलब्धता जांचें",
    },
    about: {
      eyebrow: "स्वागत है",
      title: "हमारे बारे में",
      p1: `${HALL_NAME} में आपका स्वागत है, जहाँ हर उत्सव एक अविस्मरणीय अनुभव में बदल जाता है। बड़कागांव टोला, अलीचक, गोपालगंज, बिहार में स्थित हमारा प्रीमियम विवाह व इवेंट स्थल आपके खास पलों को यादगार बनाने के लिए समर्पित है। आधुनिक सुविधाओं, विशाल परिसर और भव्य माहौल के साथ, ${HALL_NAME} शादियों और हर तरह के आयोजनों के लिए एक आदर्श गंतव्य है।`,
      p2: `लगभग 2000 मेहमानों की बैठक क्षमता के साथ, ${HALL_NAME} शादी, रिसेप्शन, सगाई, हल्दी व संगीत समारोह, जन्मदिन, सालगिरह, पारिवारिक समारोह, सामाजिक कार्यक्रम और कॉर्पोरेट इवेंट के लिए एक आदर्श स्थल है।`,
      p3: `हमारे परिसर में एक भव्य बैंक्वेट हॉल, खूबसूरती से डिज़ाइन किया गया स्टेज, पर्याप्त पार्किंग, आधुनिक लाइटिंग, स्वच्छ व सुव्यवस्थित वॉशरूम, भरोसेमंद पावर बैकअप, और मेहमानों के आराम के लिए सोच-समझकर बनाई गई सुविधाएं शामिल हैं। हमारी अनुभवी और समर्पित टीम सहज इवेंट प्रबंधन और उत्कृष्ट आतिथ्य प्रदान करने के लिए प्रतिबद्ध है, जिससे हर आयोजन सच में यादगार बनता है।`,
      p4: `${HALL_NAME} को भारत साधु समाज के राष्ट्रीय अध्यक्ष श्री हेमकांत सरन देवाचार्य जी के प्रेरणादायक नेतृत्व का मार्गदर्शन प्राप्त है। आध्यात्मिक, सांस्कृतिक और सामाजिक मूल्यों के संरक्षण के प्रति उनका आजीवन समर्पण हमारे सिद्धांतों की नींव है और उत्कृष्टता, ईमानदारी व सेवा के प्रति हमारी प्रतिबद्धता को प्रेरित करता है।`,
      p5: `इस संस्था को श्री बालिंद्र सिंह जी के मूल्यवान योगदान से और अधिक बल मिलता है, जो एक सम्मानित समाजसेवी और अपनी पंचायत के मुखिया हैं। सार्वजनिक सेवा, सामुदायिक विकास और ज़िम्मेदार नेतृत्व के प्रति उनका समर्पण आतिथ्य, विश्वास और सामाजिक ज़िम्मेदारी के उन मूल्यों को दर्शाता है जो ${HALL_NAME} की पहचान हैं।`,
      p6: `${HALL_NAME} में, हमारा मिशन केवल एक विवाह स्थल प्रदान करने से कहीं आगे है — हम हर उत्सव को भव्यता, त्रुटिहीन व्यवस्था और हार्दिक आतिथ्य के साथ संपन्न कराते हुए असाधारण अनुभव रचने का प्रयास करते हैं। आपका विश्वास और संतुष्टि हमारी सबसे बड़ी उपलब्धि है, और हम आपके जीवन के सबसे प्रिय पलों का हिस्सा बनकर सम्मानित महसूस करते हैं।`,
      tagline: "श्री राधाकांत गार्डन — आपकी खुशियों का भव्य और विश्वसनीय गंतव्य।",
      stat1: "मेहमान, अनुमानित क्षमता",
      stat2: "शुरुआत की तारीख",
      stat3: "लाइव काउंटर के लिए रसोई",
    },
    spaces: {
      eyebrow: "परिसर",
      title: "छह स्थान, एक परिसर",
      banquetName: "बैंक्वेट हॉल",
      banquetDesc: "बिना खंभों वाला, वातानुकूलित, गोल मेजों पर 600 मेहमानों की क्षमता।",
      lawnName: "मंडप लॉन",
      lawnDesc: "पुराने नीम के पेड़ों तले खुला समारोह लॉन, 1500 मेहमानों की क्षमता।",
      deckName: "संगीत डेक",
      deckDesc: "मंच और डांस फ्लोर, साथ में साउंड और लाइटिंग की व्यवस्था।",
      roomsName: "एसी गेस्ट रूम",
      roomsDesc: "परिवार और बाहर से आए मेहमानों के ठहरने के लिए विशाल वातानुकूलित कमरे।",
      corpName: "कॉर्पोरेट मीटिंग क्षेत्र",
      corpDesc: "बोर्ड मीटिंग, ऑफसाइट और कॉन्फ्रेंस के लिए एवी सुविधा वाला शांत, समर्पित स्थान।",
      parkingName: "अतिथि पार्किंग",
      parkingDesc: "150 गाड़ियों के लिए ऑन-साइट पार्किंग, वैलेट सुविधा उपलब्ध।",
    },
    packages: {
      eyebrow: "अपना बजट तय करें",
      title: "पैकेज",
      mostBooked: "सबसे ज़्यादा बुक",
      enquireAbout: "पूछताछ करें",
      wedding: { name: "शादी पैकेज", tag: "आपकी शादी के लिए पूरे दिन की हॉल बुकिंग", f: ["हॉल - पूरा दिन", "साधारण सजावट", "दुल्हन का कमरा", "4 गेस्ट रूम", "पार्किंग"] },
      engagement: { name: "सगाई पैकेज", tag: "स्टेज सजावट के साथ 6 घंटे की हॉल बुकिंग", f: ["हॉल - 6 घंटे", "स्टेज सजावट", "पार्किंग"] },
      reception: { name: "रिसेप्शन पैकेज", tag: "स्टेज सजावट के साथ हॉल बुकिंग", f: ["हॉल - 4 घंटे", "स्टेज सजावट", "दुल्हन का कमरा", "2 गेस्ट रूम", "पार्किंग"] },
      birthday: { name: "जन्मदिन पैकेज", tag: "आयोजनों के लिए 4 घंटे की हॉल बुकिंग", f: ["हॉल, 4 घंटे", "साधारण सजावट", "1 गेस्ट रूम", "पार्किंग"] },
      corporate: { name: "कॉर्पोरेट मीटिंग पैकेज", tag: "मीटिंग व ऑफसाइट के लिए हॉल बुकिंग", f: ["हॉल - 4 घंटे", "स्टेज", "पार्किंग"] },
    },
    availability: {
      eyebrow: "तारीख देखें",
      title: "उपलब्धता",
      desc: "सुनहरा रंग दिखाता है कि तारीख पहले से किसी और परिवार को दी जा चुकी है। खाली गोले उपलब्ध हैं — किसी पर टैप करें और उस तारीख के साथ पूछताछ शुरू करें।",
      legendBooked: "बुक हो चुका",
      legendBlocked: "अवरुद्ध",
      legendOpen: "उपलब्ध — पूछताछ के लिए टैप करें",
    },
    enquire: {
      eyebrow: "तारीख़ पर बात करें",
      title: "पूछताछ भेजें",
      name: "आपका नाम", namePh: "अनन्या शर्मा",
      phone: "फ़ोन नंबर", phonePh: "98765 43210",
      email: "ईमेल (वैकल्पिक)", emailPh: "you@email.com",
      date: "कार्यक्रम की तारीख",
      guests: "अनुमानित मेहमान", guestsPh: "400",
      eventType: "कार्यक्रम का प्रकार",
      eventTypes: {
        Wedding: "शादी", "Sangeet / Reception": "संगीत / रिसेप्शन", Engagement: "सगाई", Anniversary: "सालगिरह", "Corporate Meeting": "कॉर्पोरेट मीटिंग", "Other celebration": "अन्य आयोजन",
      },
      message: "हमें और क्या बताना चाहेंगे?", messagePh: "पसंदीदा कैटरिंग शैली, सजावट के विचार, सवाल...",
      submit: "पूछताछ भेजें", submitting: "भेजा जा रहा है...",
      errName: "नाम दर्ज करें।", errPhone: "मान्य फ़ोन नंबर दर्ज करें।", errDate: "तारीख चुनें।", errGuests: "अनुमानित मेहमान दर्ज करें।",
    },
    gallery: {
      eyebrow: "एक झलक",
      title: "गैलरी",
      note: "फ़ोटो जल्द आ रही हैं — जगह तैयार होते ही अपनी असली तस्वीरें यहाँ जोड़ें।",
      banquet: "बैंक्वेट हॉल",
      lawn: "मंडप लॉन",
      mandap: "विवाह मंडप",
      deck: "संगीत डेक",
      rooms: "एसी गेस्ट रूम",
      entrance: "मुख्य प्रवेश द्वार",
    },
    memorial: {
      eyebrow: "श्रद्धांजलि स्वरूप",
      title: "स्व. श्रीमती शीला देवी",
      subtitle: "पूर्व मुखिया",
      p1: "यह मैरिज हॉल स्व. श्रीमती शीला देवी, पूर्व मुखिया, की अमूल्य स्मृति को समर्पित एक हार्दिक श्रद्धांजलि है, जिनका जीवन जनसेवा, करुणा, ईमानदारी और समुदाय के कल्याण के लिए समर्पित रहा।",
      p2: "वे अपनी विनम्रता, दयालुता और दूसरों की सेवा के प्रति अटूट समर्पण के लिए व्यापक रूप से सम्मानित थीं। उनका नेतृत्व और समर्पण आज भी पीढ़ियों को प्रेरित करता है, तथा प्रेम, एकता और निःस्वार्थ सेवा की एक अमिट विरासत छोड़ गया है।",
      p3: "उनके मूल्यों और दृष्टिकोण से प्रेरित होकर, इस मैरिज हॉल की स्थापना जीवन के सबसे अनमोल पलों को गर्मजोशी, गरिमा और उत्कृष्टता के माहौल में मनाने के लिए की गई है। हम हर परिवार को उत्कृष्ट आतिथ्य प्रदान करने और अविस्मरणीय यादें बनाने के लिए प्रतिबद्ध हैं।",
      p4: "उनके उदात्त आदर्श हमारा मार्गदर्शन करते रहें, और उनका आशीर्वाद हमारे द्वार से आने वाले हर अतिथि के साथ बना रहे।",
      closing: "गहरे सम्मान और चिरस्थायी कृतज्ञता के साथ, हम स्व. श्रीमती शीला देवी (पूर्व मुखिया) की स्मृति का सम्मान करते हैं।",
    },
    blessings: {
      eyebrow: "आशीर्वाद",
      title: "श्री काशीनाथ सिंह",
      quote: "यह पावन भूमि सदैव शांति, समृद्धि और आनंद से आशीर्वादित रहे। जो भी परिवार इन द्वारों से होकर गुजरे, उनका हर उत्सव दिव्य कृपा, सद्भाव और चिरस्थायी खुशियों से भरा रहे।",
    },
    founders: {
      eyebrow: "उन्हीं के शब्दों में",
      title: "संस्थापकों का संदेश",
      salutation: "प्रिय अतिथियों,",
      p1: `${HALL_NAME} में आपका स्वागत है। हम मानते हैं कि हर उत्सव केवल एक कार्यक्रम नहीं, बल्कि प्रेम, परंपरा, परिवार और अविस्मरणीय यादों से भरा एक अनमोल पड़ाव है। इसी सोच के साथ ${HALL_NAME} की स्थापना की गई, ताकि एक ऐसा स्थल मिले जहाँ भव्यता, सुविधा और उत्कृष्ट आतिथ्य साथ मिलकर वास्तव में उल्लेखनीय अनुभव रचें।`,
      p2: "हमारा उद्देश्य केवल एक विश्वस्तरीय विवाह व इवेंट स्थल प्रदान करना ही नहीं, बल्कि यह सुनिश्चित करना भी है कि हर मेहमान को त्रुटिहीन सेवा, बारीकी से रखा गया ध्यान, और एक गर्मजोशी भरा स्वागत माहौल मिले। छोटे पारिवारिक जमावड़ों से लेकर भव्य समारोहों तक, हम हर आयोजन को सहज और यादगार बनाने के लिए प्रतिबद्ध हैं।",
      p3: `विश्वास, ईमानदारी, उत्कृष्टता और सेवा के मूल्य हमारे हर कार्य के केंद्र में हैं। हम निरंतर अपेक्षाओं से आगे बढ़ने का प्रयास करते हैं, ताकि ${HALL_NAME} में आयोजित हर कार्यक्रम एक ऐसी सुंदर याद बने जो जीवनभर साथ रहे।`,
      p4: "आपके विश्वास के लिए हम हृदय से आभार व्यक्त करते हैं, और आपके और आपके प्रियजनों के जीवन के सबसे अनमोल पलों का उत्सव मनाने के लिए आपका स्वागत करने हेतु उत्सुक हैं।",
      closing: "सादर,",
      sig1Name: "श्री हेमकांत सरन देवाचार्य",
      sig1Title: "निम्बार्क पीठाधीश्वर · अध्यक्ष, भारत साधु समाज",
      sig2Name: "श्री बालिंद्र सिंह",
      sig2Title: "समाजसेवी एवं मुखिया",
      venueLine: `${HALL_NAME}`,
      addressLine: "बड़कागांव टोला, अलीचक, गोपालगंज, बिहार, भारत",
    },
    footer: { address: "बड़कागांव टोला, अलीचक, गोपालगंज (बिहार)" },
    toast: { sent: "आपकी पूछताछ भेज दी गई है। हम एक दिन में आपको कॉल करेंगे।", saveFail: "सहेजा नहीं जा सका — कृपया फिर से प्रयास करें।", markedAs: "स्थिति बदली गई:", removed: "पूछताछ हटा दी गई।" },
    admin: {
      signInTitle: "प्रबंधक लॉगिन",
      passcodeHint: "डेमो पासकोड:",
      passcodePlaceholder: "पासकोड",
      incorrect: "गलत पासकोड।",
      enter: "डैशबोर्ड में जाएं",
      eyebrow: "प्रबंधक डैशबोर्ड",
      title: "बुकिंग व पूछताछ",
      tabEnquiries: "पूछताछ",
      tabCalendar: "कैलेंडर",
      pending: "लंबित", confirmed: "पुष्ट", declined: "अस्वीकृत", total: "कुल पूछताछ",
      filterAll: "सभी",
      empty: "अभी तक कोई पूछताछ नहीं है। जैसे ही कोई परिवार फ़ॉर्म भेजेगा, वह यहाँ दिखेगी।",
      confirm: "पुष्ट करें", decline: "अस्वीकार करें", reset: "रीसेट करें", deleteAria: "पूछताछ हटाएं",
      guestsLabel: "मेहमान",
      calendarHint: "किसी तारीख को रखरखाव या निजी होल्ड के लिए अवरुद्ध करने के लिए टैप करें। पुष्ट पूछताछ वाली तारीखें अपने आप सुनहरी हो जाती हैं और यहाँ बदली नहीं जा सकतीं — इसके बजाय पूछताछ की स्थिति बदलें।",
    },
  },
};

const LangContext = createContext({ lang: "en", t: T.en });
const useLang = () => useContext(LangContext);

/* ---------------------- date helpers ---------------------- */
const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const monthLabel = (d, lang) =>
  d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { month: "long", year: "numeric" });
const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};

function buildMonthGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

/* ---------------------- toran (festive bunting) ---------------------- */
function Toran() {
  const colors = [C.saffron, C.maroon, C.gold];
  return (
    <div aria-hidden="true">
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
      <div
        style={{ display: "flex", justifyContent: "center", overflow: "hidden", background: C.ivoryDim, borderBottom: `1px solid ${C.goldSoft}`, padding: "5px 0 0" }}
      >
        <div style={{ display: "flex" }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `10px solid ${colors[i % colors.length]}`,
                margin: "0 3px",
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------- ornament divider ---------------------- */
function Divider({ color = C.gold }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.5 }} />
      <Flower2 size={16} color={color} />
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.5 }} />
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */
export default function App() {
  const [view, setView] = useState("site"); // 'site' | 'admin'
  const [lang, setLang] = useState("en"); // 'en' | 'hi'
  const [enquiries, setEnquiries] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prefill, setPrefill] = useState(null); // { date, guestCount, eventType }
  const [toast, setToast] = useState(null);

  const t = T[lang];

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/enquiries");
      setEnquiries(res.ok ? await res.json() : []);
    } catch {
      setEnquiries([]);
    }
    try {
      const res = await fetch("/.netlify/functions/blocked-dates");
      setBlockedDates(res.ok ? await res.json() : []);
    } catch {
      setBlockedDates([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addEnquiry = async (form) => {
    try {
      const res = await fetch("/.netlify/functions/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      const created = await res.json();
      setEnquiries((prev) => [created, ...prev]);
    } catch {
      showToast(t.toast.saveFail);
    }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      const res = await fetch("/.netlify/functions/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("failed");
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    } catch {
      showToast(t.toast.saveFail);
    }
  };

  const deleteEnquiry = async (id) => {
    try {
      const res = await fetch("/.netlify/functions/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("failed");
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      showToast(t.toast.saveFail);
    }
  };

  const toggleBlockedDate = async (dateKey) => {
    const isBlocked = blockedSet.has(dateKey);
    try {
      const res = await fetch("/.netlify/functions/blocked-dates", {
        method: isBlocked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateKey }),
      });
      if (!res.ok) throw new Error("failed");
      setBlockedDates((prev) => (isBlocked ? prev.filter((d) => d !== dateKey) : [...prev, dateKey]));
    } catch {
      showToast(t.toast.saveFail);
    }
  };

  const confirmedDateSet = useMemo(() => {
    const s = new Set();
    enquiries.forEach((e) => {
      if (e.status === "confirmed") s.add(e.date);
    });
    return s;
  }, [enquiries]);

  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates]);

  const dateStatus = (dateKey) => {
    if (confirmedDateSet.has(dateKey)) return "booked";
    if (blockedSet.has(dateKey)) return "blocked";
    return "available";
  };

  return (
    <LangContext.Provider value={{ lang, t }}>
      <div style={{ background: C.ivory, minHeight: "100vh", color: C.ink, fontFamily: lang === "hi" ? "'Noto Sans Devanagari', 'Jost', sans-serif" : "'Jost', sans-serif", backgroundImage: `repeating-linear-gradient(135deg, ${C.gold}0d 0px, ${C.gold}0d 1px, transparent 1px, transparent 22px), repeating-linear-gradient(45deg, ${C.gold}0d 0px, ${C.gold}0d 1px, transparent 1px, transparent 22px)` }}>
        <style>{`
          @import url('${FONT_IMPORT_URL}');
          * { box-sizing: border-box; }
          .display-font { font-family: ${lang === "hi" ? "'Noto Sans Devanagari', serif" : "'Cormorant Garamond', serif"}; }
          .btn-primary { transition: background .2s ease, transform .15s ease; }
          .btn-primary:hover { transform: translateY(-1px); }
          .btn-primary:active { transform: translateY(0); }
          .link-underline { position: relative; }
          .link-underline::after {
            content: ''; position: absolute; left: 0; bottom: -3px; height: 1px; width: 0%;
            background: ${C.gold}; transition: width .25s ease;
          }
          .link-underline:hover::after { width: 100%; }
          .day-cell { transition: transform .15s ease, box-shadow .15s ease; }
          .day-cell:not(.day-disabled):hover { transform: scale(1.08); }
          input:focus, textarea:focus, select:focus { outline: 2px solid ${C.gold}; outline-offset: 1px; }
          @media (prefers-reduced-motion: reduce) {
            .btn-primary, .day-cell, .link-underline::after { transition: none !important; }
          }
        `}</style>

        <Nav view={view} setView={setView} lang={lang} setLang={setLang} />
        {view === "site" && <Toran />}

        {view === "site" ? (
          <SiteView
            loading={loading}
            dateStatus={dateStatus}
            onPickDate={(k) => {
              setPrefill({ date: k });
              document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
            }}
            onCheckAvailability={(data) => {
              setPrefill(data);
              document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
            }}
            prefill={prefill}
            onSubmitEnquiry={async (form) => {
              await addEnquiry(form);
              showToast(t.toast.sent);
              setPrefill(null);
            }}
          />
        ) : (
          <AdminView
            enquiries={enquiries}
            blockedDates={blockedDates}
            dateStatus={dateStatus}
            onUpdateStatus={async (id, status) => {
              await updateEnquiryStatus(id, status);
              showToast(`${t.toast.markedAs} ${status}.`);
            }}
            onDeleteEnquiry={async (id) => {
              await deleteEnquiry(id);
              showToast(t.toast.removed);
            }}
            onToggleBlock={async (key) => {
              await toggleBlockedDate(key);
            }}
          />
        )}

        <Footer />

        {toast && (
          <div
            role="status"
            style={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: C.maroonDeep,
              color: C.ivory,
              padding: "12px 22px",
              borderRadius: 999,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              zIndex: 100,
              border: `1px solid ${C.gold}`,
              maxWidth: "90vw",
              textAlign: "center",
            }}
          >
            {toast}
          </div>
        )}
      </div>
    </LangContext.Provider>
  );
}

/* =========================================================
   NAV
========================================================= */
function Nav({ view, setView, lang, setLang }) {
  const { t } = useLang();
  const links = [
    [t.nav.about, "about"],
    [t.nav.spaces, "spaces"],
    [t.nav.gallery, "gallery"],
    [t.nav.memorial, "memorial"],
    [t.nav.founders, "founders"],
    [t.nav.blessings, "blessings"],
    [t.nav.packages, "packages"],
    [t.nav.availability, "availability"],
    [t.nav.enquire, "enquire"],
  ];
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: C.ivory,
        borderBottom: `1px solid ${C.goldSoft}`,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <button
          onClick={() => setView("site")}
          className="display-font"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 24,
            fontWeight: 700,
            color: C.maroon,
            letterSpacing: 0.5,
          }}
        >
          {LOGO_IMAGE && (
            <img
              src={LOGO_IMAGE}
              alt={HALL_NAME}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
                border: `1px solid ${C.goldSoft}`,
                flexShrink: 0,
              }}
            />
          )}
          <span>{HALL_NAME}</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="nav-links" style={{ display: "flex", gap: 22 }}>
            {view === "site" &&
              links.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="link-underline nav-link-item"
                  style={{ color: C.ink, textDecoration: "none", fontSize: 14 }}
                >
                  {label}
                </a>
              ))}
          </div>

          {view === "site" && (
            <a
              href="#enquire"
              className="btn-primary"
              aria-label={t.hero.ctaCheck}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
                color: C.maroonDeep,
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <CalendarCheck size={15} />
              {t.enquire.title}
            </a>
          )}

          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            aria-label="Toggle language"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: `1px solid ${C.goldSoft}`,
              color: C.ink,
              borderRadius: 999,
              padding: "7px 12px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <Languages size={13} />
            {lang === "en" ? "हिन्दी" : "English"}
          </button>

          <button
            onClick={() => setView(view === "site" ? "admin" : "site")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: `1px solid ${C.gold}`,
              color: C.maroon,
              borderRadius: 999,
              padding: "7px 14px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {view === "site" ? <Lock size={13} /> : <LogOut size={13} />}
            {view === "site" ? t.nav.manage : t.nav.exitAdmin}
          </button>
        </div>
      </div>
      <style>{`
        @media (min-width: 860px) { .nav-links { display: flex !important; } }
        @media (max-width: 859px) { .nav-links { display: none !important; } }
      `}</style>
    </header>
  );
}

/* =========================================================
   SITE VIEW
========================================================= */
function SiteView({ loading, dateStatus, onPickDate, onCheckAvailability, prefill, onSubmitEnquiry }) {
  const { t } = useLang();
  return (
    <main>
      <Hero />
      <BookingBar onCheckAvailability={onCheckAvailability} />
      <InMemoriam />
      <About />
      <FoundersMessage />
      <Blessings />
      <Spaces />
      <Gallery />
      <Packages />
      <div
        aria-hidden="true"
        style={{
          height: 14,
          backgroundImage: `radial-gradient(circle at 10px 0, transparent 9px, ${C.ivoryDim} 9px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "top",
        }}
      />
      <section id="availability" style={{ padding: "70px 20px", background: C.ivoryDim }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHeading eyebrow={t.availability.eyebrow} title={t.availability.title} />
          <p style={{ maxWidth: 560, color: C.inkSoft, marginBottom: 30, fontSize: 15 }}>
            {t.availability.desc}
          </p>
          <AvailabilityCalendar dateStatus={dateStatus} onPickDate={onPickDate} interactive />
          <Legend />
        </div>
      </section>
      <Enquire prefill={prefill} onSubmit={onSubmitEnquiry} />
    </main>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${C.maroon} 0%, ${C.maroonDeep} 100%)`,
        color: C.ivory,
        padding: "110px 20px 90px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: `inset 0 0 0 1px ${C.goldSoft}55`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 10,
          border: `1px solid ${C.goldSoft}40`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 35%, ${C.maroonDeep}bb 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, ${C.goldSoft}22 0, transparent 40%), radial-gradient(circle at 80% 70%, ${C.saffron}22 0, transparent 45%), repeating-conic-gradient(from 0deg at 50% 0%, ${C.goldSoft}14 0deg 6deg, transparent 6deg 24deg)`,
          backgroundPosition: "center, center, top center",
          backgroundSize: "auto, auto, 480px 240px",
        }}
      />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        {DEITY_IMAGE && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <div
              style={{
                position: "relative",
                width: 200,
                height: 200,
                borderRadius: "50%",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -34,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${C.saffron}55 0%, ${C.gold}22 45%, transparent 72%)`,
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: `1px solid ${C.goldSoft}88`,
                }}
              />
              <img
                src={DEITY_IMAGE}
                alt="Shri Radhakant"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  position: "relative",
                  border: `3px solid ${C.gold}`,
                  boxShadow: `0 0 30px ${C.saffron}66, 0 8px 24px rgba(0,0,0,0.4)`,
                }}
              />
            </div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 18, color: C.goldSoft }}>
          <Sparkles size={16} />
          <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>{t.hero.badge}</span>
          <Sparkles size={16} />
        </div>
        <h1 className="display-font" style={{ fontSize: "clamp(40px, 7vw, 68px)", fontWeight: 700, lineHeight: 1.05, margin: 0 }}>
          {HALL_NAME}
        </h1>
        <p style={{ marginTop: 18, fontSize: 18, color: C.goldSoft, fontWeight: 300 }}>{t.tagline}</p>
        <div style={{ marginTop: 38, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#availability"
            className="btn-primary"
            style={{
              background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
              color: C.maroonDeep,
              padding: "13px 28px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            {t.hero.ctaCheck}
          </a>
          <a
            href="#packages"
            className="btn-primary"
            style={{
              border: `1px solid ${C.goldSoft}`,
              color: C.ivory,
              padding: "13px 28px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t.hero.ctaPackages}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- booking bar (hotel-style search widget) ---------------------- */
function BookingBar({ onCheckAvailability }) {
  const { t } = useLang();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const eventTypeKeys = ["Wedding", "Engagement", "Sangeet / Reception", "Anniversary", "Corporate Meeting", "Other celebration"];

  const inputWrapStyle = { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140 };
  const labelStyle = { fontSize: 11, color: C.inkSoft, letterSpacing: 0.5, textTransform: "uppercase" };
  const fieldStyle = { border: "none", borderBottom: `2px solid ${C.goldSoft}`, background: "transparent", fontSize: 14.5, color: C.ink, padding: "4px 0", fontFamily: "inherit" };

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            marginTop: -46,
            background: C.white,
            borderRadius: 16,
            border: `1px solid ${C.goldSoft}`,
            boxShadow: "0 20px 44px rgba(74,20,32,0.22)",
            padding: "22px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: 20,
          }}
        >
          <div style={inputWrapStyle}>
            <label style={labelStyle}>{t.bookingBar.date}</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={fieldStyle} />
          </div>
          <div style={inputWrapStyle}>
            <label style={labelStyle}>{t.bookingBar.guests}</label>
            <input type="number" min="1" placeholder={t.bookingBar.guestsPh} value={guests} onChange={(e) => setGuests(e.target.value)} style={fieldStyle} />
          </div>
          <div style={inputWrapStyle}>
            <label style={labelStyle}>{t.bookingBar.eventType}</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={fieldStyle}>
              {eventTypeKeys.map((k) => (
                <option key={k} value={k}>{t.enquire.eventTypes[k]}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => onCheckAvailability({ date: date || undefined, guestCount: guests || undefined, eventType })}
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
              color: C.maroonDeep,
              border: "none",
              borderRadius: 10,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Search size={16} />
            {t.bookingBar.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontWeight: 500 }}>
        {eyebrow}
      </div>
      <h2 className="display-font" style={{ fontSize: 38, color: C.maroon, margin: "6px 0 0", fontWeight: 700 }}>
        {title}
      </h2>
    </div>
  );
}

function About() {
  const { t } = useLang();
  const stats = [
    ["2,000", t.about.stat1],
    ["Nov 2026", t.about.stat2],
    ["3", t.about.stat3],
  ];
  return (
    <section id="about" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
        <div style={{ maxWidth: 720 }}>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          <div style={{ color: C.inkSoft, fontSize: 16, lineHeight: 1.75, marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0 }}>{t.about.p1}</p>
            <p style={{ margin: 0 }}>{t.about.p2}</p>
            <p style={{ margin: 0 }}>{t.about.p3}</p>
            <p style={{ margin: 0 }}>{t.about.p4}</p>
            <p style={{ margin: 0 }}>{t.about.p5}</p>
            <p style={{ margin: 0 }}>{t.about.p6}</p>
          </div>
          <p className="display-font" style={{ marginTop: 20, fontSize: 20, color: C.maroon, fontWeight: 600, fontStyle: "italic" }}>
            {t.about.tagline}
          </p>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 10 }}>
            {stats.map(([n, l]) => (
              <div key={l}>
                <div className="display-font" style={{ fontSize: 30, color: C.maroon, fontWeight: 700 }}>
                  {n}
                </div>
                <div style={{ fontSize: 13, color: C.inkSoft }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FoundersMessage() {
  const { t } = useLang();
  return (
    <section id="founders" style={{ padding: "20px 20px 90px", background: C.ivory }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <SectionHeading eyebrow={t.founders.eyebrow} title={t.founders.title} />
        <div
          style={{
            marginTop: 30,
            background: C.ivoryDim,
            border: `1px solid ${C.goldSoft}`,
            borderLeft: `4px solid ${C.gold}`,
            borderRadius: 14,
            padding: "34px 30px",
            boxShadow: "0 12px 28px rgba(74,20,32,0.06)",
          }}
        >
          <p className="display-font" style={{ fontSize: 20, color: C.maroon, fontWeight: 600, margin: 0 }}>{t.founders.salutation}</p>
          <div style={{ color: C.inkSoft, fontSize: 15.5, lineHeight: 1.8, marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ margin: 0 }}>{t.founders.p1}</p>
            <p style={{ margin: 0 }}>{t.founders.p2}</p>
            <p style={{ margin: 0 }}>{t.founders.p3}</p>
            <p style={{ margin: 0 }}>{t.founders.p4}</p>
          </div>
          <div style={{ height: 1, background: C.goldSoft, margin: "26px 0 20px" }} />
          <p style={{ fontSize: 14, color: C.inkSoft, margin: "0 0 18px" }}>{t.founders.closing}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {FOUNDER1_IMAGE && (
                <img
                  src={FOUNDER1_IMAGE}
                  alt={t.founders.sig1Name}
                  style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.gold}`, boxShadow: `0 0 14px ${C.saffron}44`, flexShrink: 0 }}
                />
              )}
              <div>
                <div className="display-font" style={{ fontSize: 18, color: C.maroon, fontWeight: 700 }}>{t.founders.sig1Name}</div>
                <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{t.founders.sig1Title}</div>
              </div>
            </div>
            <div>
              <div className="display-font" style={{ fontSize: 18, color: C.maroon, fontWeight: 700 }}>{t.founders.sig2Name}</div>
              <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{t.founders.sig2Title}</div>
            </div>
          </div>
          <div style={{ height: 1, background: C.goldSoft, margin: "22px 0 14px" }} />
          <div style={{ fontSize: 12.5, color: C.inkSoft }}>
            <div className="display-font" style={{ fontSize: 15, color: C.gold, fontWeight: 600 }}>{t.founders.venueLine}</div>
            {t.founders.addressLine}
          </div>
        </div>
      </div>
    </section>
  );
}

function InMemoriam() {
  const { t } = useLang();
  const ink2 = "#2E2B27";
  const inkDeep = "#1C1A17";
  return (
    <section id="memorial" style={{ padding: "70px 20px", background: `linear-gradient(180deg, ${ink2} 0%, ${inkDeep} 100%)`, color: "#E7E1D5" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          {MEMORIAL_IMAGE ? (
            <div
              style={{
                position: "relative",
                width: 128,
                height: 128,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -12,
                  borderRadius: "50%",
                  border: `1px solid ${C.goldSoft}55`,
                }}
              />
              <img
                src={MEMORIAL_IMAGE}
                alt={t.memorial.title}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${C.goldSoft}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                  filter: "grayscale(15%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -6,
                  right: -6,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: inkDeep,
                  border: `1px solid ${C.goldSoft}77`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Flame size={15} color={C.goldSoft} />
              </div>
            </div>
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: `1px solid ${C.goldSoft}77`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle, rgba(184,134,59,0.18), transparent 70%)",
              }}
            >
              <Flame size={20} color={C.goldSoft} />
            </div>
          )}
        </div>
        <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.goldSoft, fontWeight: 500 }}>
          {t.memorial.eyebrow}
        </div>
        <h2 className="display-font" style={{ fontSize: 34, margin: "8px 0 2px", fontWeight: 700, color: "#F3ECDC" }}>
          {t.memorial.title}
        </h2>
        <div style={{ fontSize: 13.5, color: C.goldSoft, letterSpacing: 1, marginBottom: 26 }}>{t.memorial.subtitle}</div>

        <div style={{ height: 1, width: 60, background: `${C.goldSoft}66`, margin: "0 auto 26px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.85, color: "#D9D2C3" }}>
          <p style={{ margin: 0 }}>{t.memorial.p1}</p>
          <p style={{ margin: 0 }}>{t.memorial.p2}</p>
          <p style={{ margin: 0 }}>{t.memorial.p3}</p>
          <p style={{ margin: 0 }}>{t.memorial.p4}</p>
        </div>

        <div style={{ height: 1, width: 60, background: `${C.goldSoft}66`, margin: "28px auto 20px" }} />

        <p className="display-font" style={{ fontSize: 15.5, fontStyle: "italic", color: C.goldSoft, lineHeight: 1.7, margin: 0 }}>
          {t.memorial.closing}
        </p>
      </div>
    </section>
  );
}

function Blessings() {
  const { t } = useLang();
  return (
    <section id="blessings" style={{ padding: "20px 20px 90px", background: C.ivory }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontWeight: 500, marginBottom: 8 }}>
          {t.blessings.eyebrow}
        </div>
        {BLESSING_IMAGE && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: 8 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -14,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${C.saffron}33 0%, ${C.gold}18 45%, transparent 72%)`,
                }}
              />
              <img
                src={BLESSING_IMAGE}
                alt={t.blessings.title}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  position: "relative",
                  border: `3px solid ${C.gold}`,
                  boxShadow: "0 10px 26px rgba(74,20,32,0.2)",
                }}
              />
            </div>
          </div>
        )}
        <div
          style={{
            background: C.ivoryDim,
            border: `1px solid ${C.goldSoft}`,
            borderRadius: 14,
            padding: "28px 26px",
            boxShadow: "0 12px 28px rgba(74,20,32,0.06)",
          }}
        >
          <Flower2 size={18} color={C.gold} style={{ marginBottom: 12 }} />
          <p className="display-font" style={{ fontSize: 18, fontStyle: "italic", color: C.maroon, lineHeight: 1.7, margin: 0 }}>
            "{t.blessings.quote}"
          </p>
          <div style={{ height: 1, background: C.goldSoft, margin: "20px auto", width: 50 }} />
          <div className="display-font" style={{ fontSize: 18, color: C.maroon, fontWeight: 700 }}>{t.blessings.title}</div>
        </div>
      </div>
    </section>
  );
}

function Spaces() {
  const { t } = useLang();
  const spaces = [
    { icon: UtensilsCrossed, name: t.spaces.banquetName, desc: t.spaces.banquetDesc },
    { icon: Trees, name: t.spaces.lawnName, desc: t.spaces.lawnDesc },
    { icon: Music, name: t.spaces.deckName, desc: t.spaces.deckDesc },
    { icon: BedDouble, name: t.spaces.roomsName, desc: t.spaces.roomsDesc },
    { icon: Briefcase, name: t.spaces.corpName, desc: t.spaces.corpDesc },
    { icon: MapPin, name: t.spaces.parkingName, desc: t.spaces.parkingDesc },
  ];
  return (
    <section id="spaces" style={{ padding: "20px 20px 90px", background: C.ivory }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SectionHeading eyebrow={t.spaces.eyebrow} title={t.spaces.title} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20, marginTop: 34 }}>
          {spaces.map(({ icon: Icon, name, desc }) => (
            <div
              key={name}
              style={{
                border: `1px solid ${C.goldSoft}`,
                borderRadius: 14,
                padding: 26,
                background: C.ivoryDim,
                boxShadow: "0 10px 24px rgba(74,20,32,0.06)",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.saffron}, ${C.maroon})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Icon size={19} color={C.goldSoft} />
              </div>
              <div className="display-font" style={{ fontSize: 20, fontWeight: 700, color: C.maroon }}>{name}</div>
              <p style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 8, lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useLang();
  const iconMap = { UtensilsCrossed, Trees, Flower2, Music, BedDouble, Sparkles };
  return (
    <section id="gallery" style={{ padding: "20px 20px 90px", background: C.ivory }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 30 }}>
          {GALLERY_IMAGES.map((img) => {
            const Icon = iconMap[img.icon] || ImageIcon;
            const label = t.gallery[img.key] || img.key;
            return (
              <div
                key={img.key}
                style={{
                  aspectRatio: "4 / 3",
                  borderRadius: 14,
                  overflow: "hidden",
                  position: "relative",
                  border: `1px solid ${C.goldSoft}`,
                  boxShadow: "0 10px 24px rgba(74,20,32,0.06)",
                }}
              >
                {img.src ? (
                  <img src={img.src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDeep})`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    <Icon size={26} color={C.goldSoft} />
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "10px 12px",
                    background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent)",
                    color: C.ivory,
                    fontSize: 12.5,
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 18 }}>{t.gallery.note}</p>
      </div>
    </section>
  );
}

function Packages() {
  const { t } = useLang();
  const packages = [
    { key: "wedding", price: "₹1,50,000", highlight: true, ...t.packages.wedding },
    { key: "engagement", price: "₹51,000", ...t.packages.engagement },
    { key: "reception", price: "₹85,000", ...t.packages.reception },
    { key: "birthday", price: "₹45,000", ...t.packages.birthday },
    { key: "corporate", price: "₹25,000", ...t.packages.corporate },
  ];
  return (
    <section id="packages" style={{ padding: "20px 20px 90px", background: C.ivory }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <SectionHeading eyebrow={t.packages.eyebrow} title={t.packages.title} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22, marginTop: 34 }}>
          {packages.map((p) => (
            <div
              key={p.key}
              style={{
                borderRadius: 16,
                padding: 30,
                background: p.highlight ? C.maroon : C.white,
                color: p.highlight ? C.ivory : C.ink,
                border: p.highlight ? "none" : `1px solid ${C.goldSoft}`,
                position: "relative",
                boxShadow: p.highlight ? "0 20px 40px rgba(74,20,32,0.25)" : "0 12px 28px rgba(74,20,32,0.08)",
              }}
            >
              {p.highlight && (
                <div style={{ position: "absolute", top: -12, right: 22, background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`, color: C.maroonDeep, fontSize: 11, padding: "4px 12px", borderRadius: 999, fontWeight: 600, letterSpacing: 0.5 }}>
                  {t.packages.mostBooked}
                </div>
              )}
              <div className="display-font" style={{ fontSize: 24, fontWeight: 700, color: p.highlight ? C.goldSoft : C.maroon }}>{p.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 8, marginBottom: 20 }}>{p.tag}</div>
              <div style={{ height: 1, background: p.highlight ? `${C.goldSoft}55` : C.goldSoft, marginBottom: 18 }} />
              {p.f.map((f) => (
                <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13.5, marginBottom: 10 }}>
                  <Check size={15} color={p.highlight ? C.goldSoft : C.sage} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span>{f}</span>
                </div>
              ))}
              <a
                href="#enquire"
                className="btn-primary"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 22,
                  padding: "11px 0",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontSize: 13.5,
                  fontWeight: 600,
                  background: p.highlight ? C.gold : C.maroon,
                  color: p.highlight ? C.maroonDeep : C.ivory,
                }}
              >
                {t.packages.enquireAbout} {p.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- calendar (signature element) ---------------------- */
function AvailabilityCalendar({ dateStatus, onPickDate, interactive, onToggleBlock }) {
  const { lang } = useLang();
  const [month, setMonth] = useState(() => new Date(AVAILABILITY_START.getFullYear(), AVAILABILITY_START.getMonth(), 1));
  const today = startOfToday();
  const minDate = AVAILABILITY_START > today ? AVAILABILITY_START : today;
  const cells = buildMonthGrid(month);
  const weekdayLabels = lang === "hi" ? ["र", "सो", "मं", "बु", "गु", "शु", "श"] : ["S", "M", "T", "W", "T", "F", "S"];
  const atEarliestMonth = month.getFullYear() === AVAILABILITY_START.getFullYear() && month.getMonth() === AVAILABILITY_START.getMonth();

  const dotColor = (status) => {
    if (status === "booked") return C.gold;
    if (status === "blocked") return C.inkSoft;
    return "transparent";
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <button
          aria-label="Previous month"
          disabled={atEarliestMonth}
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          style={{ background: "none", border: `1px solid ${C.goldSoft}`, borderRadius: "50%", width: 34, height: 34, cursor: atEarliestMonth ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: atEarliestMonth ? 0.35 : 1 }}
        >
          <ChevronLeft size={16} color={C.maroon} />
        </button>
        <div className="display-font" style={{ fontSize: 22, color: C.maroon, fontWeight: 700 }}>{monthLabel(month, lang)}</div>
        <button
          aria-label="Next month"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          style={{ background: "none", border: `1px solid ${C.goldSoft}`, borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronRight size={16} color={C.maroon} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
        {weekdayLabels.map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 11, color: C.inkSoft, letterSpacing: 1 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const key = toKey(date);
          const status = dateStatus(key);
          const isPast = date < minDate;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => {
                if (isPast) return;
                if (onToggleBlock) onToggleBlock(key);
                else if (interactive && status === "available") onPickDate(key);
              }}
              className={`day-cell ${isPast ? "day-disabled" : ""}`}
              title={`${key} — ${status}`}
              style={{
                aspectRatio: "1",
                borderRadius: "50%",
                border: `1px solid ${isPast ? "#e4dcc9" : status === "booked" ? C.gold : status === "blocked" ? C.inkSoft : C.goldSoft}`,
                background: status === "available" || isPast ? "transparent" : dotColor(status),
                color: isPast ? "#c9bfa8" : status === "available" ? C.ink : C.ivory,
                cursor: isPast ? "default" : "pointer",
                fontSize: 12.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Legend() {
  const { t } = useLang();
  const items = [
    [C.gold, t.availability.legendBooked],
    [C.inkSoft, t.availability.legendBlocked],
    ["transparent", t.availability.legendOpen],
  ];
  return (
    <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 22 }}>
      {items.map(([color, label]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: C.inkSoft }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: color, border: `1px solid ${color === "transparent" ? C.goldSoft : color}`, display: "inline-block" }} />
          {label}
        </div>
      ))}
    </div>
  );
}

/* ---------------------- enquiry form ---------------------- */
function Enquire({ prefill, onSubmit }) {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    eventType: "Wedding",
    guestCount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prefill) {
      setForm((f) => ({
        ...f,
        date: prefill.date ?? f.date,
        guestCount: prefill.guestCount ?? f.guestCount,
        eventType: prefill.eventType ?? f.eventType,
      }));
    }
  }, [prefill]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t.enquire.errName;
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) errs.phone = t.enquire.errPhone;
    if (!form.date) errs.date = t.enquire.errDate;
    if (!form.guestCount || Number(form.guestCount) <= 0) errs.guestCount = t.enquire.errGuests;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
    setForm({ name: "", phone: "", email: "", date: "", eventType: "Wedding", guestCount: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 13px",
    borderRadius: 8,
    border: `1px solid ${C.goldSoft}`,
    background: C.white,
    fontSize: 14,
    fontFamily: "inherit",
    color: C.ink,
  };
  const labelStyle = { fontSize: 12.5, color: C.inkSoft, marginBottom: 6, display: "block" };
  const eventTypeKeys = ["Wedding", "Sangeet / Reception", "Engagement", "Anniversary", "Corporate Meeting", "Other celebration"];

  return (
    <section id="enquire" style={{ padding: "80px 20px", background: C.maroonDeep, color: C.ivory }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontWeight: 500 }}>{t.enquire.eyebrow}</div>
        <h2 className="display-font" style={{ fontSize: 34, margin: "6px 0 26px", fontWeight: 700 }}>{t.enquire.title}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>{t.enquire.name}</label>
              <input style={inputStyle} value={form.name} onChange={set("name")} placeholder={t.enquire.namePh} />
              {errors.name && <div style={{ color: C.goldSoft, fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
            </div>
            <div>
              <label style={labelStyle}>{t.enquire.phone}</label>
              <input style={inputStyle} value={form.phone} onChange={set("phone")} placeholder={t.enquire.phonePh} />
              {errors.phone && <div style={{ color: C.goldSoft, fontSize: 12, marginTop: 4 }}>{errors.phone}</div>}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>{t.enquire.email}</label>
            <input style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder={t.enquire.emailPh} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>{t.enquire.date}</label>
              <input style={inputStyle} type="date" value={form.date} onChange={set("date")} />
              {errors.date && <div style={{ color: C.goldSoft, fontSize: 12, marginTop: 4 }}>{errors.date}</div>}
            </div>
            <div>
              <label style={labelStyle}>{t.enquire.guests}</label>
              <input style={inputStyle} type="number" min="1" value={form.guestCount} onChange={set("guestCount")} placeholder={t.enquire.guestsPh} />
              {errors.guestCount && <div style={{ color: C.goldSoft, fontSize: 12, marginTop: 4 }}>{errors.guestCount}</div>}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>{t.enquire.eventType}</label>
            <select style={inputStyle} value={form.eventType} onChange={set("eventType")}>
              {eventTypeKeys.map((k) => (
                <option key={k} value={k}>{t.enquire.eventTypes[k]}</option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>{t.enquire.message}</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={form.message} onChange={set("message")} placeholder={t.enquire.messagePh} />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{
              marginTop: 24,
              width: "100%",
              background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
              color: C.maroonDeep,
              border: "none",
              padding: "14px 0",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              cursor: submitting ? "default" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? t.enquire.submitting : t.enquire.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ padding: "40px 20px", background: C.ink, color: C.ivoryDim }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "center" }}>
        <div className="display-font" style={{ fontSize: 18, color: C.goldSoft }}>{HALL_NAME}</div>
        <div style={{ display: "flex", gap: 22, fontSize: 13, color: "#c9c0b3", flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={13} /> +91 96610 99001</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={13} /> shriradhakantgarden@gmail.com</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={13} /> {t.footer.address}</span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   ADMIN VIEW
========================================================= */
function AdminView({ enquiries, blockedDates, dateStatus, onUpdateStatus, onDeleteEnquiry, onToggleBlock }) {
  const { t } = useLang();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("enquiries"); // 'enquiries' | 'calendar'

  if (!authed) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === ADMIN_PASSCODE) {
              setAuthed(true);
              setPassError("");
            } else {
              setPassError(t.admin.incorrect);
            }
          }}
          style={{ background: C.white, border: `1px solid ${C.goldSoft}`, borderRadius: 16, padding: 34, width: "100%", maxWidth: 340, textAlign: "center" }}
        >
          <Lock size={26} color={C.maroon} style={{ marginBottom: 12 }} />
          <div className="display-font" style={{ fontSize: 22, color: C.maroon, fontWeight: 700, marginBottom: 4 }}>{t.admin.signInTitle}</div>
          <p style={{ fontSize: 12.5, color: C.inkSoft, marginBottom: 18 }}>{t.admin.passcodeHint} <strong>{ADMIN_PASSCODE}</strong></p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={t.admin.passcodePlaceholder}
            style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: `1px solid ${C.goldSoft}`, fontSize: 14, textAlign: "center" }}
          />
          {passError && <div style={{ color: C.maroon, fontSize: 12, marginTop: 8 }}>{passError}</div>}
          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: 16, width: "100%", background: C.maroon, color: C.ivory, border: "none", padding: "12px 0", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            {t.admin.enter}
          </button>
        </form>
      </div>
    );
  }

  const counts = {
    pending: enquiries.filter((e) => e.status === "pending").length,
    confirmed: enquiries.filter((e) => e.status === "confirmed").length,
    declined: enquiries.filter((e) => e.status === "declined").length,
  };
  const filtered = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 20px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 26 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.sage, fontWeight: 500 }}>{t.admin.eyebrow}</div>
          <h2 className="display-font" style={{ fontSize: 32, color: C.maroon, margin: "4px 0 0", fontWeight: 700 }}>{t.admin.title}</h2>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["enquiries", t.admin.tabEnquiries], ["calendar", t.admin.tabCalendar]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "9px 18px",
                borderRadius: 999,
                border: `1px solid ${C.gold}`,
                background: tab === id ? C.maroon : "transparent",
                color: tab === id ? C.ivory : C.maroon,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 30 }}>
        <StatCard icon={CircleDashed} label={t.admin.pending} value={counts.pending} color={C.gold} />
        <StatCard icon={CircleCheck} label={t.admin.confirmed} value={counts.confirmed} color={C.sage} />
        <StatCard icon={CircleSlash} label={t.admin.declined} value={counts.declined} color={C.inkSoft} />
        <StatCard icon={Users} label={t.admin.total} value={enquiries.length} color={C.maroon} />
      </div>

      {tab === "enquiries" ? (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {[["all", t.admin.filterAll], ["pending", t.admin.pending], ["confirmed", t.admin.confirmed], ["declined", t.admin.declined]].map(([f, label]) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${C.goldSoft}`,
                  background: filter === f ? C.goldSoft : "transparent",
                  fontSize: 12.5,
                  color: C.ink,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {sorted.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sorted.map((e) => (
                <EnquiryRow key={e.id} enquiry={e} onUpdateStatus={onUpdateStatus} onDelete={onDeleteEnquiry} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ background: C.white, border: `1px solid ${C.goldSoft}`, borderRadius: 16, padding: 28, maxWidth: 640 }}>
          <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 20 }}>
            {t.admin.calendarHint}
          </p>
          <AvailabilityCalendar
            dateStatus={dateStatus}
            onToggleBlock={(key) => {
              if (dateStatus(key) === "booked") return;
              onToggleBlock(key);
            }}
          />
          <Legend />
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.goldSoft}`, borderRadius: 14, padding: 18, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={17} color={color} />
      </div>
      <div>
        <div className="display-font" style={{ fontSize: 22, fontWeight: 700, color: C.ink, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11.5, color: C.inkSoft }}>{label}</div>
      </div>
    </div>
  );
}

function EmptyState() {
  const { t } = useLang();
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", border: `1px dashed ${C.goldSoft}`, borderRadius: 16, color: C.inkSoft }}>
      <CalendarIcon size={26} color={C.gold} style={{ marginBottom: 10 }} />
      <div style={{ fontSize: 14 }}>{t.admin.empty}</div>
    </div>
  );
}

function EnquiryRow({ enquiry, onUpdateStatus, onDelete }) {
  const { t } = useLang();
  const statusColor = { pending: C.gold, confirmed: C.sage, declined: C.inkSoft }[enquiry.status];
  const statusLabel = { pending: t.admin.pending, confirmed: t.admin.confirmed, declined: t.admin.declined }[enquiry.status];
  const eventTypeLabel = t.enquire.eventTypes[enquiry.eventType] || enquiry.eventType;
  return (
    <div style={{ background: C.white, border: `1px solid ${C.goldSoft}`, borderRadius: 14, padding: "18px 20px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ minWidth: 200, flex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{enquiry.name}</span>
          <span style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: statusColor, border: `1px solid ${statusColor}`, borderRadius: 999, padding: "2px 8px" }}>
            {statusLabel}
          </span>
        </div>
        <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 4, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CalendarIcon size={12} /> {enquiry.date}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {enquiry.guestCount} {t.admin.guestsLabel}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Phone size={12} /> {enquiry.phone}</span>
          <span>{eventTypeLabel}</span>
        </div>
        {enquiry.message && <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 6, fontStyle: "italic" }}>"{enquiry.message}"</div>}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {enquiry.status !== "confirmed" && (
          <ActionBtn label={t.admin.confirm} color={C.sage} onClick={() => onUpdateStatus(enquiry.id, "confirmed")} />
        )}
        {enquiry.status !== "declined" && (
          <ActionBtn label={t.admin.decline} color={C.inkSoft} onClick={() => onUpdateStatus(enquiry.id, "declined")} />
        )}
        {enquiry.status !== "pending" && (
          <ActionBtn label={t.admin.reset} color={C.gold} onClick={() => onUpdateStatus(enquiry.id, "pending")} />
        )}
        <button
          onClick={() => onDelete(enquiry.id)}
          aria-label={t.admin.deleteAria}
          style={{ border: `1px solid #e2b8b8`, background: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#a33", display: "flex", alignItems: "center" }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function ActionBtn({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ border: `1px solid ${color}`, background: "none", color, borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
