/**
 * Axom Xarothi - Official Portal Client Script
 * Complete client-side multilingual updates representation & interaction logic
 */

// BILINGUAL STATIC NEWS DATASET
const ASSAM_NEWS_DATA = [
    {
        id: "adre-recruitment-2026",
        category: "recruitment",
        title: "ADRE Grade 3 & 4 Written Examinations Schedules Released",
        titleAs: "ADRE ৩য় আৰু ৪র্থ শ্ৰেণীৰ লিখিত পৰীক্ষাৰ দিন ঘোষণা",
        status: "Active",
        publishedDate: "June 2026",
        details: "The State Level Recruitment Commission (SLRC) of Assam has officially published the date configurations for Grade 3 and Grade 4 recruitment written examinations. Overall vacancies cross 12,600+ positions. Candidates are requested to check guidelines regarding negative markings.",
        detailsAs: "অসম শক্তি আৰু অন্যান্য বিভাগত অসম পোনপটীয়া নিযুক্তি মেলাৰ অন্তত ৩য় আৰু ৪র্থ বৰ্গৰ ১২,৬০০ তকৈও অধিক পদৰ বাবে গুৰুত্বপূৰ্ণ লিখিত পৰীক্ষাৰ দিন ঘোষণা কৰা হৈছে। ছাত্ৰ-ছাত্ৰীসকলে নেগেটিভ মাৰ্কিং নিৰ্দেশনাৱলী নিশ্চিতভাৱে পঢ়ক।",
        eligibility: [
            "Must be a permanent resident of Assam state.",
            "Class 10 (or equivalent) for Grade 4 positions.",
            "Higher Secondary (10+2) or Degree (BA/BSc/BCom) for Grade 3 positions.",
            "Age limit must be between 18 to 40 years (standard age relaxation rules apply for reserved categories)."
        ],
        eligibilityAs: [
            "আবেদনকাৰী অসমৰ স্থায়ী বাসিন্দা হ'ব লাগিব।",
            "চতুৰ্থ শ্ৰেণীৰ পদৰ বাবে নূন্যতম দশম শ্ৰেণী উত্তীৰ্ণ বিপৰীতে ৩য় শ্ৰেণীৰ বাবে উচ্চতৰ মাধ্যমিক বা স্নাতক ডিগ্ৰী প্ৰয়োজন।",
            "বয়সৰ সীমা ১৮ ৰ পৰা ৪০ বছৰৰ ভিতৰত হ'ব লাগিব চৰকাৰী নিয়মমতে ৰেহাই থাকিব।"
        ],
        benefits: "Official state selection with dynamic basic pay scales from Rs 14,000 to Rs 60,500 along with medical insurance and pension welfare premiums.",
        benefitsAs: "চৰকাৰী স্থায়ী নিয়োজন আৰু ১৪,০০০ টকাৰ পৰা ৬০,৫০০ টকালৈকে নিয়মানুসৰি দৰমহাৰ নিৰিখ লাভ কৰিব লগতে সাহায্য আৰু বীমা লাভ কৰিব।",
        howToApply: [
            "Visit the official website of SEBA at sebaonline.org or Assam Gov Portal.",
            "Locate the SLRC ADRE Apply Online active tab link.",
            "Fill in baseline credentials including name, registration age, and parent details.",
            "Upload verified certificates and photos as per the exact sizing guidelines in the portal."
        ],
        howToApplyAs: [
            "SEBA-ৰ অফিচিয়েল ৱেবচাইট sebaonline.org বা চৰকাৰী নিযুক্তি পৰ্টেল খোলক।",
            "সক্ৰিয় থকা SLRC ADRE Apply Online লিংক বিচাৰি কৰক।",
            "নাম, শিক্ষাগত অৰ্হতা আৰু ফটো সঠিক আকাৰত আপলোড কৰক।",
            "আৱেদন পত্ৰ জমা দি প্ৰিণ্টআউট লওক।"
        ],
        syllabus: [
            "General Mathematics & High School Arithmetic (30 Questions)",
            "Assam History, Geography & Northeast Culture (40 Questions)",
            "English Grammar & Reasoning capability (30 Questions)"
        ],
        syllabusAs: [
            "সাধাৰণ গণিত আৰু পাটীগণিত (৩০ টা নম্বৰ)",
            "অসমৰ বুৰঞ্জী, ভূগোল আৰু উত্তৰ-পূবৰ সংস্কৃতি (৪০ টা নম্বৰ)",
            "ইংৰাজী ব্যাকৰণ আৰু সাধাৰণ তৰ্ক ক্ষমতা (৩০ টা নম্বৰ)"
        ],
        officialLink: "https://sebaonline.org"
    },
    {
        id: "orunodoi-scheme-2026",
        category: "scheme",
        title: "Orunodoi 3.0 Welfare Scheme Registration & Verification Tracker",
        titleAs: "অৰুণোদয় ৩.০ আঁচনি আৰু হিতাধিকাৰী তালিকা সংযোগ",
        status: "Active",
        publishedDate: "June 2026",
        details: "Under the prestigious Orunodoi 3.0 scheme, the government is expanding coverage to targeted vulnerable households, increasing monthly financial benefits to ₹1,400. Preference is assigned to widows, specially-abled citizens, and unmarried women.",
        detailsAs: "অসম চৰকাৰৰ অতি জনপ্ৰিয় আঁচনি অৰুণোদয় ৩.০-ৰ অধীনত এতিয়াৰে পৰা মাহিলী সাহায্যৰ পৰিমাণ সৰ্বমুঠ ১৪০০ টকালৈ বৃদ্ধি কৰা হৈছে। विधवा, অবিবাহিতা আৰু বিশেষভাৱে সক্ষম মহিলাসকলক ইয়াৰ আধাৰত প্ৰাধান্য দিয়া হয়।",
        eligibility: [
            "Permanent family residence in Assam with aggregate annual income less than Rs 2 Lakhs.",
            "Household must nominate a female head of the family as the main beneficiary.",
            "Cannot own a four-wheeler vehicle or heavy diesel tractors.",
            "Must have a valid linked Aadhaar Card for Direct Benefit Transfers (DBT)."
        ],
        eligibilityAs: [
            "অসমৰ স্থায়ী পৰিয়াল হ'ব লাগিব আৰু পৰিয়ালৰ বাৰ্ষিক আয় ২ লাখ টকাতকৈ কম হ'ব লাগিব।",
            "পৰিয়ালৰ হিতাধিকাৰী হিচাপে ঘৰৰ মুৰব্বী মহিলাগৰাকীক নিয়োজিত কৰিব লাগিব।",
            "ঘৰত চাৰিচকীয়া গাড়ী বা গধূৰ যন্ত্ৰচালিত ট্ৰেক্টৰ থাকিব নোৱাৰিব।",
            "বেংক একাউণ্টৰ সৈতে সংযুক্ত সক্ৰিয় আধাৰ কাৰ্ড থকা বাধ্যতামূলক।"
        ],
        benefits: "Direct Cash Benefit of up to Rs 1,400 deposited monthly securely on the 10th of every calendar month.",
        benefitsAs: "অফিচিয়েল নিৰ্দেশনা অনুসৰি প্ৰতিমাহৰ ১০ তাৰিখে পোনপটীয়াকৈ ১৪০০ টকা বেংক একাউণ্টত প্ৰাপ্য হয়।",
        howToApply: [
            "Receive physical Application Form from localized Gaon Panchayat Offices.",
            "Enter bank identification details (IFSC, Account Number) carefully without single cuts.",
            "Attach female head photo and income affidavit certificates verified by local Revenue Inspector.",
            "Submit completed dossier to GP secretary or designated municipal camps."
        ],
        howToApplyAs: [
            "স্থানীয় পঞ্চায়ত কাৰ্যালয় বা ব্লক অফিচৰ পৰা আবেদন পত্ৰ সংগ্ৰহ কৰক।",
            "নাম, বেংক একাউণ্ট নম্বৰ আৰু IFSC ক’ড কোনো ভুল কৰা নোহোৱাকৈ টাইপ কৰক।",
            "ৰাজহ বিভাগৰ স্থায়ী আয়ৰ প্ৰমাণ পত্ৰ আৰু আধাৰ কাৰ্ড সংলগ্ন কৰক।",
            "জিলা পৰ্যায়ৰ সংলগ্ন বিষয়া বা পঞ্চায়ত সচিবৰ হাতত জমা দিওক।"
        ],
        officialLink: "https://orunodoi.assam.gov.in"
    },
    {
        id: "pragyan-free-scooty",
        category: "education",
        title: "Pragyan Bharati Free Scooty Scheme 2026",
        titleAs: "প্ৰজ্ঞান ভাৰতী বিনামূলীয়া স্কুটী আঁচনি ২০২৬",
        status: "Upcoming",
        publishedDate: "June 2026",
        details: "Assam Gov's flagship education support initiative Pragyan Bharati will award brand new scooty to meritorious female and male students who recently cleared HS 2nd year examinations.",
        detailsAs: "শেহতীয়াকৈ উচ্চতৰ মাধ্যমিক চূড়ান্ত পৰীক্ষাত সুখ্যাতিৰে উত্তীৰ্ণ হোৱা ছাত্ৰ-ছাত্ৰীসকলক প্ৰজ্ঞান ভাৰতী আঁচনিৰ অধীনত চৰকাৰে বিনামূলীয়া স্কুটী প্ৰদান কৰিব।",
        eligibility: [
            "Must be a permanent resident of Assam.",
            "Eligible girls: Secured at least 60% marks in HS Science/Arts/Commerce.",
            "Eligible boys: Secured at least 75% marks in HS Science/Arts/Commerce."
        ],
        eligibilityAs: [
            "আবেদনকাৰী অসমৰ স্থায়ী বাসিন্দা হ'ব লাগিব।",
            "ছাত্ৰীৰ অৰ্হতা: উচ্চতৰ মাধ্যমিক পৰীক্ষাত নূন্যতম ৬০% নম্বৰ লাভ কৰিব লাগিব।",
            "ছাত্ৰৰ অৰ্হতা: উচ্চতৰ মাধ্যমিক পৰীক্ষাত নূন্যতম ৭৫% নম্বৰ লাভ কৰিব লাগিব।"
        ],
        benefits: "Free choice of Petrol Scooty or Electric Scooty along with state registration coverage.",
        benefitsAs: "বিনামূলীয়া পেট্ৰ'ল বা ইলেক্ট্ৰিক স্কুটী বাছনিৰ সুযোগ আৰু চৰকাৰী পঞ্জীয়ন খৰচ ৰেহাই।",
        howToApply: [
            "Log on to the pragyanbharati.assam.gov.in web portal when list is active.",
            "Login with HS Roll and Registration details.",
            "Choose variant (Petrol vs Electric) and local dealer name.",
            "Download the allotment letter."
        ],
        howToApplyAs: [
            "তালিকা সক্ৰিয় হ’লে pragyanbharati.assam.gov.in মজিয়া প’ৰ্টেললৈ যাওক।",
            "ৰোল নম্বৰ আৰু পঞ্জীয়ন নম্বৰ দি লগইন কৰক।",
            "পেট্ৰ'ল নে ইলেকট্ৰিক স্কুটী ল'ব আৰু ওচৰৰ ডীলাৰৰ নাম বাছনি কৰক।",
            "স্কুটী বিতৰণ পত্ৰ বা অলটমেণ্ট লেটাৰ ডাউনলোড কৰক।"
        ],
        officialLink: "https://finance.assam.gov.in"
    },
    {
        id: "adre-admit-card-2026",
        category: "admitcard",
        title: "ADRE Grade 3 & 4 Admit Card Portal Live",
        titleAs: "ADRE ৩য় আৰু ৪র্থ শ্ৰেণীৰ প্ৰৱেশ পত্ৰ ডাউনলোড",
        status: "Active",
        publishedDate: "June 2026",
        details: "The State Level Recruitment Commission (SLRC) has enabled the link to download admit cards for the written examinations of Class III and IV. Candidates need their Application Number.",
        detailsAs: "ৰাজ্যিক পৰ্যায়ৰ নিযুক্তি আয়োগে (SLRC) ৩য় আৰু ৪র্থ শ্ৰেণীৰ লিখিত পৰীক্ষাৰ বাবে এডমিট কাৰ্ড অৰ্থাৎ প্ৰৱেশ পত্ৰ ডাউনলোডৰ লিংক সক্ৰিয় কৰি দিছে।",
        eligibility: [
            "Must have successfully submitted online application for SLRC ADRE.",
            "Need Registered Mobile number and Application Password to sign-in."
        ],
        eligibilityAs: [
            "SLRC ADRE ৰ বাবে অনলাইন আবেদন সফলতাৰে জমা দিয়া হ'ব লাগিব।",
            "লগইন কৰিবলৈ পঞ্জীয়ন কৰা মবাইল নম্বৰ আৰু আবেদনৰ পাছৱৰ্ড সক্ৰিয় থাকিব লাগিব।"
        ],
        benefits: "Access to official examination center coordinates, timing schedules, and instructions guides.",
        benefitsAs: "পৰীক্ষা কেন্দ্ৰৰ ঠিকনা, সঠিক সময়সূচী আৰু গুৰুত্বপূৰ্ণ নিৰ্দেশনাৱলী লাভ।",
        howToApply: [
            "Access the SLRC tab on Sebaonline.org.",
            "Enter your ADRE Application Number and password.",
            "Click on 'Download Admit Card' button.",
            "Print double copy of the card (one to carry, keep one backup)."
        ],
        howToApplyAs: [
            "Sebaonline.org অফিচিয়েল ৱেবচাইটৰ SLRC টেব খোলক।",
            "আপোনাৰ ADRE আবেদন নম্বৰ আৰু পাছৱৰ্ড টাইপ কৰক।",
            "'Download Admit Card' বুটামত ক্লিক কৰক।",
            "প্ৰৱেশ পত্ৰখনৰ দুটা কপি প্ৰিণ্ট কৰি লওক।"
        ],
        officialLink: "https://sebaonline.org"
    },
    {
        id: "hslc-results-2026",
        category: "result",
        title: "SEBA HSLC Class 10 Metrik Results Portal",
        titleAs: "মেট্ৰিক পৰীক্ষাৰ ফলাফল - HSLC Class 10 Results",
        status: "New",
        publishedDate: "May 2026",
        details: "The Board of Secondary Education, Assam (SEBA) has declared the Class 10 High School Leaving Certificate (HSLC) results. Overall pass percentage stands at amazing 76.5%.",
        detailsAs: "অসম মাধ্যমিক শিক্ষা পৰিষদে (SEBA) হাইস্কুল শিক্ষান্ত পৰীক্ষা (HSLC)ৰ ফলাফল ঘোষণা কৰিছে। এইবাৰ উত্তীৰ্ণৰ সামগ্ৰিক হাৰ হৈছে ৭৬.৫ শতাংশ।",
        eligibility: [
            "Students who appeared for HSLC Exams 2026 across Assam.",
            "Require Board Roll Code and Number."
        ],
        eligibilityAs: [
            "অসমৰ যিসকল ছাত্ৰ-ছাত্ৰীয়ে মেট্ৰিক পৰীক্ষা ২০২৬ ত অৱতীৰ্ণ হৈছিল।",
            "ফলাผล চাবলৈ ব'ৰ্ডৰ ৰোল ক'ড আৰু ৰোল নম্বৰ প্ৰয়োজন হ'ব।"
        ],
        benefits: "Instant provisional markssheet download, division classification grade, and school-wise toppers lists.",
        benefitsAs: "তাত্ক্ষণিকভাৱে নম্বৰ তালিকা (Marksheet) ডাউনলোড, প্ৰথম/দ্বিতীয়/তৃতীয় বিভাগ বৰ্গীকৰণ আৰু শীৰ্ষ স্থান লাভ কৰা ছাত্ৰ তালিকা প্ৰদৰ্শন।",
        howToApply: [
            "Open resultsassam.nic.in or sebaonline.org.",
            "Select 'HSLC Examination Results 2026' link.",
            "Input Roll and Number as written on application Admit Card.",
            "Click Submit and take markssheet printout."
        ],
        howToApplyAs: [
            "resultsassam.nic.in বা sebaonline.org প’ৰ্টেল খোলক।",
            "'HSLC Examination Results 2026' টেবত ক্লিক কৰক।",
            "প্ৰৱেশ পত্ৰত থকা ৰোল আৰু নম্বৰ স্পষ্টকৈ লিখক।",
            "জমা (Submit) দিওক আৰু নম্বৰ তালিকাৰ প্ৰিণ্টআউট লওক।"
        ],
        officialLink: "http://resultsassam.nic.in"
    },
    {
        id: "dharitree-portal",
        category: "tech",
        title: "Dharitree Live Land Records Portal & ILRMS App",
        titleAs: "ধৰিত্ৰী আৰু ভূমি সংস্কাৰ অনলাইন মবাইল এপ",
        status: "Active",
        publishedDate: "June 2026",
        details: "Assam Land and Revenue department has integrated the 'Dharitree' database and ILRMS (Integrated Land Records Management System). Residents can fetch Dag, Patta, and Mutation Statuses online.",
        detailsAs: "অসম চৰকাৰৰ ৰাজহ আৰু ভূমি সংস্কাৰ বিভাগে 'ধৰিত্ৰী' ডাটাবেচ আৰু ILRMS সংলগ্ন কৰিছে। এতিয়াৰে পৰা ঘৰৰ ডাগ, পত্তা আৰু মিউটেচনৰ স্থিতি অনলাইনযোগে মোবাইলতে চাব পাৰিব।",
        eligibility: [
            "Open to all land owners and citizens of Assam.",
            "Requires district, circle, and village identification."
        ],
        eligibilityAs: [
            "অসমৰ যিকোনো ভূমি পট্টাদাৰ আৰু নাগৰিকৰ বাবে প্ৰযোজ্য।",
            "তথ্য চাবলৈ জিলা, ৰাজহ চক্ৰ আৰু নিজৰ গাঁৱৰ নাম জানিব লাগিব।"
        ],
        benefits: "Instant download of jamabandi copy, mutation request tracking, and zero visits to Circle Office for basic record searches.",
        benefitsAs: "তাত্ক্ষণিকভাৱে জামাবন্দি নকল ডাউনলোড, নামজাৰীৰ আবেদন ট্ৰেক কৰা আৰু ভূমিৰ তথ্য বিশ্লেষণ কৰাৰ সুবিধা।",
        howToApply: [
            "Go to revenueassam.nic.in or download Dharitree App from Google Play Store.",
            "Select your local district, revenue circle, and village code.",
            "Search by Patta Number, Dag Number, or Owner Name.",
            "Save the digital copy of the land jamabandi record (highly secured digital copy)."
        ],
        howToApplyAs: [
            "revenueassam.nic.in ৱেবচাইটলৈ যাওক বা Play Store ৰ পৰা 'Dharitree App' ডাউনলোড কৰক।",
            "জিলা, ৰাজহ চক্ৰ আৰু গাঁৱৰ নাম বাছনি কৰক।",
            "পত্তা নম্বৰ, ডাগ নম্বৰ বা ভূমি উন্নয়নকাৰীৰ নামৰ সহায়ত সন্ধান কৰক।",
            "ডিজিটেল জামাবন্দি কপি সংৰক্ষণ কৰক।"
        ],
        officialLink: "https://revenueassam.nic.in"
    },
    {
        id: "nijut-moina-2025",
        category: "scheme",
        title: "Nijut Moina Financial Stipend Scheme for Female Students",
        titleAs: "নিজুত মইনা আঁচনি - উচ্চ শিক্ষাৰ জলপানী ঘোষণা",
        status: "Active",
        publishedDate: "June 2026",
        details: "An ambitious initiative targeting student retention and stopping child marriage across Assam by providing direct monthly scholarship cash benefits from Rs 1,000 to Rs 2,500 to female students joining higher education blocks.",
        detailsAs: "অসমত বাল্য বিবাহ উৎখাত আৰু ছোৱালীৰ শিক্ষাৰ হাৰ বৃদ্ধিৰ লক্ষ্যৰে 'নিজুত মইনা' নামৰ আঁচনি আৰম্ভ কৰা হৈছে যাৰ অধীনত স্নাতকোত্তৰ আৰু উচ্চতৰ পৰ্যায়ৰ ছাত্ৰীক ১,০০০ পৰা ২,৫০০ টকালৈকে মাহিলী জলপানী চৰকাৰে লাভ কৰাব।",
        eligibility: [
            "Highly localized female students taking admission in Government HS schools, Colleges or Universities.",
            "Must maintain good attendance coordinates (minimum 75%) throughout current semesters.",
            "Must not be married before age 18.",
            "Excludes children of ministers, MLAs, and top government grade gazetted staff."
        ],
        eligibilityAs: [
            " চৰকাৰী শিক্ষানুষ্ঠানত অধ্যয়ন কৰা ছাত্ৰী হ'ব লাগিব।",
            "প্ৰতি ষান্মাসিকত নূন্যতম ৭৫% ৰ উপস্থিতি থকাটো বাধ্যতামূলক।",
            "১৮ বছৰ বয়সৰ পুৰণি বা বিবাহিত হোৱা চলিব নোৱাৰিব।",
            "মন্ত্ৰী, বিধায়ক আৰু প্ৰথম শ্ৰেণীৰ চৰকাৰী বিষয়াৰ পৰিয়াল ইয়াত যোগ্য নহয়।"
        ],
        benefits: "Scholarship slab: HS Joining- ₹1,000/mo, College Degree- ₹1,250/mo, Post-Graduate (PG)- ₹2,500/mo.",
        benefitsAs: "আঁচনিৰ সাহায্য ক্ৰমে: উচ্চতৰ মাধ্যমিক- ১,০০০ টকা, কলেজ ডিগ্ৰী- ১,২৫০ টকা, মহাবিদ্যালয় পিজি- ২,৫০০ টকা প্ৰতিমাহে লাভ কৰিব।",
        howToApply: [
            "Collect specialized checklist guidelines dossier from principal administrative desks.",
            "Nominate valid functional personal savings Bank details.",
            "Submit declaration forms supporting un-married statements signed by local parents.",
            "Verify registration status upon institution recommendation."
        ],
        howToApplyAs: [
            "নিজৰ পঢ়া বিদ্যালয় বা মহাবিদ্যালয়ৰ প্ৰধান বিষয়াৰ পৰা আবেদন পত্ৰ সংগ্ৰহ কৰক।",
            "পান কাৰ্ড আৰু আধাৰ সংলগ্ন বেংক খাতাৰ সবিশেষ দিয়ক।",
            "অভিভাৱকৰ সৈতে অবিবাহিতা ঘোষণা পত্ৰ পুৰণ কৰক।",
            "বিদ্যালয় কর্তৃপক্ষৰ পৰীক্ষণৰ অন্তত পোনপটীয়া DBT সংযোগ লাভ কৰক।"
        ],
        officialLink: "https://highereducation.assam.gov.in"
    },
    {
        id: "kaziranga-safari-dates",
        category: "tourism",
        title: "Kaziranga National Park - One-Horned Rhino Safari Guides",
        titleAs: "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান - জীৱ-জন্তু ও ভ্ৰমণ গাইড",
        status: "Active",
        publishedDate: "October 2025",
        details: "Assam tourism provides majestic views: the one-horned rhino safari across Kaziranga national park. The park features dense tall elephant grass, marshy areas, and several water bodies.",
        detailsAs: "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান এশিঙীয় গঁড়ৰ বাবে পৃথিৱী খ্যাত। ডাঠ ঘাঁহনি পথাৰ আৰু জলাশয়েৰে আবৃত্ত কাজিৰঙাত জীপ আৰু হাতী চাফাৰী সেৱা উপলব্ধ থাকে ভ্ৰমণৰ বাবে।",
        eligibility: [
            "Booking requires government-issued voter verification or Passport credentials.",
            "Open for general public booking from November 1st to April 30th annually."
        ],
        eligibilityAs: [
            "বুকিং কৰিবলৈ পৰিচয় পত্ৰ বা আধা কাৰ্ড বাধ্যতামূলক।",
            "বছৰি ১ নৱেম্বৰৰ পৰা ৩০ এপ্ৰিললৈ উদ্যানখন সৰ্বসাধাৰণৰ বাবে খোলা থাকে।"
        ],
        benefits: "Witness rare Indian rhinos, royal Bengal tigers, wild water buffaloes, swamp deer, and thousands of exotic migratory birds.",
        benefitsAs: "এশিঙীয়া গঁড়, বাঘ, বনৰীয়া ম’হ আৰু দলহৰিণা আদি বিশ্বৰ বিৰল প্ৰজাতি কাষৰ পৰা প্ৰদৰ্শনৰ সুবিধা।",
        howToApply: [
            "Access official Assam Tourism Development Corporation online spot at assamtourism.online.",
            "Pick preferred safari gates (Central Kohora, Western Bagori, Eastern Agaratoli).",
            "Pay standard forest permit fees and safari transport chargers securely via UPI or Cards."
        ],
        howToApplyAs: [
            "অসম পৰ্যটন নিগমৰ অফিচিয়েল ৱেবচাইটৰ মাধ্যমেৰে বুকিং কৰক।",
            "প্ৰিয় জিপ চাফাৰী ৰেঞ্জ (কহৰা, বাগৰি বা অগৰাতলী) বাছনি কৰক।",
            "বন বিভাগৰ পঞ্জীয়ন খৰচ পোনপটীয়াকৈ অনলাইনত জমা কৰক।"
        ],
        officialLink: "https://assamtourism.online"
    }
];

// STATE ENGINE
let currentLanguage = "en";
let currentDarkMode = false;
let activeCategory = "all";
let currentSearch = "";
let openedArticleId = null;

// BREAKING TICKER NEWS DATA
const TICKER_DATA = {
    en: "💥 Mega Recruitment: ADRE Class 3 & 4 Written Test Schedules Announced • Free Scooty Registrations for Pragyan Bharati starting soon • Govt enhances Orunodoi 3.0 benefits to ₹1,400 per month • Assam Police SI vacancy declaration expected in July! • Kaziranga National Park booking gates currently active.",
    as: "💥 গুৰুত্বপূৰ্ণ ঘোষণা: ADRE ৩য় আৰু ৪র্থ শ্ৰেণীৰ লিখিত পৰীক্ষাৰ দিন ঘোষণা • মেধাৱী শিক্ষাৰ্থীলৈ প্ৰজ্ঞান ভাৰতী আঁচনিৰ বিনামূলীয়া স্কুটীৰ কাম আৰম্ভ • অৰুণোদয় ৩.০-ৰ অধীনত সাহায্যৰ পৰিমাণ ₹১৪০০ লৈ বৃদ্ধি • ধৰিত্ৰী এপ মুকলি ভূমি পত্তা বাচনিৰ সুযোগ!"
};

// INITIALIZATION
window.addEventListener("DOMContentLoaded", () => {
    // Read cached choices
    if (localStorage.getItem("darkMode") === "true") {
        document.documentElement.classList.add("dark");
        currentDarkMode = true;
    }
    
    currentLanguage = localStorage.getItem("language") || "en";
    updateLanguageUI();

    // Set Footer Year
    document.getElementById("footer-year").textContent = new Date().getFullYear();

    // Render Posts
    renderNewsGrid();
});

// LANGUAGE MANAGER
function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "as" : "en";
    localStorage.setItem("language", currentLanguage);
    updateLanguageUI();
    renderNewsGrid();

    if (openedArticleId) {
        // If single-post currently active, refresh content mapping
        renderSinglePostContent(openedArticleId);
    }
}

function updateLanguageUI() {
    const btnText = document.getElementById("lang-btn-text");
    if (btnText) {
        btnText.textContent = currentLanguage === "en" ? "অসমীয়া" : "English";
    }

    // Dynamic translate marked static labels
    const translatables = document.querySelectorAll(".lang-text");
    translatables.forEach(elem => {
        const enVal = elem.getAttribute("data-en");
        const asVal = elem.getAttribute("data-as");
        if (currentLanguage === "en") {
            elem.textContent = enVal;
        } else {
            elem.textContent = asVal;
        }
    });

    // Update breaking marquee strip
    const tickerBlock = document.getElementById("ticker-text");
    if (tickerBlock) {
        tickerBlock.textContent = TICKER_DATA[currentLanguage];
    }

    // Translate main hero strings
    const heroTitle = document.getElementById("hero-title");
    const heroSub = document.getElementById("hero-subtitle");
    const searchBar = document.getElementById("main-search-input");

    if (currentLanguage === "en") {
        if (heroTitle) heroTitle.textContent = "Your Direct Link to Assam News, Exams & Schemes";
        if (heroSub) heroSub.textContent = "Access official notices for ADRE direct recruitment vacancies, girls scooty stipends, Orunodoi monthly welfare pensions, and high-contrast North East tourism directions.";
        if (searchBar) searchBar.placeholder = "Search ADRE, Orunodoi, Nijut Moina, Scooty, results...";
    } else {
        if (heroTitle) heroTitle.textContent = "নিযুক্তি, চৰকাৰী আঁচনি আৰু অসম পৰ্যটনৰ সম্পূৰ্ণ খতিয়ান";
        if (heroSub) heroSub.textContent = "পোনপটীয়া নিযুক্তি (ADRE) বিজ্ঞাপন, মেধাৱী ছাত্ৰ-ছাত্ৰীৰ বিনামূলীয়া স্কুটী, অৰুণোদয় আঁচনিৰ মাহিলী সাহায্য আৰু অসম চৰকাৰৰ গুৰুত্বপূৰ্ণ জাননী ইয়াতে লাভ কৰক।";
        if (searchBar) searchBar.placeholder = "চাকৰি, চিলেবাচ, ফলাফল বা অৰুণোদয় আঁচনি বিচাৰক...";
    }
}

// THEME / DARK MODE MANAGER
function toggleDarkMode() {
    currentDarkMode = !currentDarkMode;
    localStorage.setItem("darkMode", String(currentDarkMode));
    if (currentDarkMode) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

// SEARCH HANDLER
function handleSearch(val) {
    currentSearch = val.toLowerCase().trim();
    renderNewsGrid();
}

function handleQuickSearch(keyword) {
    const searchBar = document.getElementById("main-search-input");
    if (searchBar) {
        searchBar.value = keyword;
        currentSearch = keyword.toLowerCase();
        renderNewsGrid();
        
        // Scroll smoothly to filter region
        document.getElementById("posts-count-badge").scrollIntoView({ behavior: "smooth" });
    }
}

function triggerSearchClear() {
    const searchBar = document.getElementById("main-search-input");
    if (searchBar) {
        searchBar.value = "";
    }
    currentSearch = "";
    activeCategory = "all";
    
    // reset tab style highlights
    resetTabHighlights();
    document.getElementById("tab-all").classList.add("bg-navy", "text-white", "border-navy");
    document.getElementById("tab-all").classList.remove("bg-white", "text-slate-700", "border-slate-200");

    renderNewsGrid();
}

// CATEGORY FILTERS
function filterByCategory(category) {
    activeCategory = category;
    
    // Update visual tab highlighted state
    resetTabHighlights();
    const targetTab = document.getElementById(`tab-${category}`);
    if (targetTab) {
        targetTab.classList.add("bg-navy", "text-white", "border-navy", "dark:bg-slate-850", "dark:border-slate-800");
        targetTab.classList.remove("bg-white", "text-slate-700", "border-slate-200");
    }

    renderNewsGrid();
}

function resetTabHighlights() {
    const tabs = document.querySelectorAll(".category-tab-btn");
    tabs.forEach(tab => {
        tab.classList.remove("bg-navy", "text-white", "border-navy", "dark:bg-slate-850", "dark:border-slate-800");
        tab.classList.add("bg-white", "text-slate-700", "border-slate-200", "dark:bg-slate-900", "dark:border-slate-800");
    });
}

// NEWS RENDER COMPONENT
function renderNewsGrid() {
    const grid = document.getElementById("latest-posts-grid");
    const emptyView = document.getElementById("empty-posts-view");
    const countBadge = document.getElementById("posts-count-badge");

    if (!grid) return;

    // Filter Logic
    const filtered = ASSAM_NEWS_DATA.filter(item => {
        const matchesCategory = activeCategory === "all" || item.category === activeCategory;
        
        if (!currentSearch) return matchesCategory;

        const matchesQuery = 
            item.title.toLowerCase().includes(currentSearch) ||
            item.titleAs.includes(currentSearch) ||
            item.details.toLowerCase().includes(currentSearch) ||
            item.detailsAs.includes(currentSearch);

        return matchesCategory && matchesQuery;
    });

    // Update count indicator
    countBadge.textContent = `${filtered.length} ${currentLanguage === 'en' ? 'Bulletins' : 'বিজ্ঞপ্তি'}`;

    if (filtered.length === 0) {
        grid.innerHTML = "";
        emptyView.classList.remove("hidden");
        return;
    }

    emptyView.classList.add("hidden");

    let itemsHtml = "";
    filtered.forEach(item => {
        const titleText = currentLanguage === "en" ? item.title : item.titleAs;
        const detailsText = currentLanguage === "en" ? item.details : item.detailsAs;
        const requirementsText = currentLanguage === "en" ? "Requirements:" : "প্ৰাথমিক অৰ্হতা সমূহ:";
        const badgeLabel = currentLanguage === "en" ? item.category.toUpperCase() : getBilingualCategory(item.category);

        // Status badge colors
        let statusStyle = "bg-green-150 text-green-800 border-green-200";
        if (item.status === "New") statusStyle = "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20";
        if (item.status === "Upcoming") statusStyle = "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20";

        itemsHtml += `
        <article class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:border-assam-green/40 transition-all duration-300 flex flex-col justify-between group">
            <div class="p-5">
                <div class="flex items-center justify-between mb-3.5">
                    <span class="text-[9px] font-black tracking-widest bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 px-2.5 py-1 rounded border border-slate-250 dark:border-slate-800 transition-colors">
                        ${badgeLabel}
                    </span>
                    <span class="text-[10px] text-slate-400 font-bold flex items-center">
                        <i class="fa-regular fa-calendar-days mr-1.5 text-slate-400"></i> ${item.publishedDate}
                    </span>
                </div>

                <h4 class="text-base sm:text-lg font-black text-navy dark:text-white leading-tight group-hover:text-assam-green transition-colors cursor-pointer" onclick="readFullArticle('${item.id}')">
                    ${titleText}
                </h4>

                <div class="mt-2.5 flex items-center space-x-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span class="text-[10px] uppercase font-black tracking-widest text-[#2e7d32] bg-[#2e7d32]/10 px-2 py-0.5 rounded">${item.status}</span>
                </div>

                <p class="text-[12px] sm:text-[13px] text-slate-550 dark:text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                    ${detailsText}
                </p>

                <!-- Bullet pointers -->
                <div class="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-900/60 space-y-1.5">
                    <p class="text-[10px] text-slate-450 dark:text-slate-500 uppercase tracking-widest font-black">${requirementsText}</p>
                    <div class="flex items-start text-xs text-slate-650 dark:text-slate-350">
                        <i class="fa-solid fa-circle-check text-assam-green text-xs mr-2 mt-0.5"></i>
                        <span class="line-clamp-1 font-medium">${currentLanguage === 'en' ? item.eligibility[0] : item.eligibilityAs[0]}</span>
                    </div>
                </div>
            </div>

            <!-- Card Bottom CTA -->
            <div class="bg-slate-50 dark:bg-slate-900/40 p-4.5 p-4 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between gap-2">
                <button onclick="handleQuickBotInquiry('${item.title}')" class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:text-assam-green hover:bg-emerald-50/50 p-2 text-[10px] text-slate-600 dark:text-slate-350 font-bold rounded-xl flex items-center gap-1 active:scale-95 transition-all cursor-pointer">
                    <i class="fa-solid fa-sparkles text-assam-green"></i> <span class="lang-text" data-en="Ask AI Helper" data-as="সুধক">Ask AI Helper</span>
                </button>
                <button onclick="readFullArticle('${item.id}')" class="bg-assam-green hover:bg-assam-darkgreen text-white font-extrabold px-3.5 py-2 rounded-xl text-[11px] tracking-wide shadow-sm flex items-center gap-1 transition-all active:scale-95 cursor-pointer">
                    <span class="lang-text" data-en="View Guidelines" data-as="বিতং তথ্য">View Guidelines</span> <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
            </div>
        </article>
        `;
    });

    grid.innerHTML = itemsHtml;
}

function getBilingualCategory(cat) {
    const list = {
        recruitment: "চাকৰি বিজ্ঞাপন",
        scheme: "কল্যাণ আঁচনি",
        education: "শিক্ষা বৃত্তিসমূহ",
        admitcard: "প্ৰৱেশ পত্ৰ",
        result: "নম্বৰ তালিকা",
        tech: "ডিজিটেল প’ৰ্টেল",
        tourism: "পৰ্যটন ধাম"
    };
    return list[cat] || "তথ্য তালিকা";
}

// MOBILE MENU
function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
}

// SINGLE POST ROUTING MANAGER
function readFullArticle(articleId) {
    openedArticleId = articleId;
    
    // Hide standard homepage
    document.getElementById("app-homepage").classList.add("hidden");
    
    // Scroll header up and reveal post view
    document.getElementById("single-post-view").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    renderSinglePostContent(articleId);
}

function closeFullArticle() {
    openedArticleId = null;
    document.getElementById("single-post-view").classList.add("hidden");
    document.getElementById("app-homepage").classList.remove("hidden");
}

function showHomepage(e) {
    if (e) e.preventDefault();
    closeFullArticle();
}

// INJECT SINGLE POST WRAPPER DETAILS
function renderSinglePostContent(id) {
    const data = ASSAM_NEWS_DATA.find(item => item.id === id);
    if (!data) return;

    // Set core text items
    document.getElementById("single-post-category").textContent = currentLanguage === 'en' ? data.category.toUpperCase() : getBilingualCategory(data.category);
    document.getElementById("single-post-date").innerHTML = `<i class="fa-regular fa-calendar-check mr-1 text-slate-400"></i> ${data.publishedDate}`;
    document.getElementById("single-post-title").textContent = currentLanguage === 'en' ? data.title : data.titleAs;

    // Build the sub-points article body elegantly
    const overviewTitle = currentLanguage === 'en' ? "1. General Overview" : "১. মূল বাৰ্তাৰ সাৰাংশ";
    const overviewBody = currentLanguage === 'en' ? data.details : data.detailsAs;

    const eligibilityTitle = currentLanguage === 'en' ? "2. Eligibility Checklist & Criteria" : "২. যোগ্যতাৰ অৰ্হতা আৰু মাপকাঠি";
    const eligArray = currentLanguage === 'en' ? data.eligibility : data.eligibilityAs;
    let eligibilityListHtml = `<ol class="list-decimal pl-4.5 pl-4 space-y-2 font-medium">`;
    eligArray.forEach(elig => {
        eligibilityListHtml += `<li>${elig}</li>`;
    });
    eligibilityListHtml += `</ol>`;

    const benefitsTitle = currentLanguage === 'en' ? "3. Financial or Structural Benefits" : "৩. আঁচনি বা নিযুক্তি সংলগ্ন আৰ্থিক লাভালাভ";
    const benefitsBody = currentLanguage === 'en' ? (data.benefits || "No financial updates provided in source.") : (data.benefitsAs || "উৎসত বৰ্তমান কোনো আৰ্থিক খতিয়ান পোৱা হোৱা নাই।");

    const applyTitle = currentLanguage === 'en' ? "4. Step-By-Step Application Guides" : "৪. কেনেকৈ আবেদন কৰিব তাৰ ধাপে ধাপে নিয়মসূচী";
    const applyArray = currentLanguage === 'en' ? data.howToApply : data.howToApplyAs;
    let applyListHtml = `<ul class="list-none pl-1 space-y-3">`;
    applyArray.forEach((step, idx) => {
        applyListHtml += `
        <li class="flex items-start">
            <span class="w-5.5 h-5.5 rounded-lg bg-assam-green text-white text-[11px] font-black flex items-center justify-center mr-3 mt-0.5 shrink-0">${idx+1}</span>
            <span class="mt-0.5 font-medium text-slate-705 text-slate-700 dark:text-slate-350">${step}</span>
        </li>`;
    });
    applyListHtml += `</ul>`;

    // Syllabus if any
    let syllabusSectionHtml = "";
    if (data.syllabus) {
        const syllabusTitle = currentLanguage === 'en' ? "5. General Exam Pattern Specifications" : "৫. পৰীক্ষাৰ বিতং সংগতি চিলেবাচ";
        const syllArray = currentLanguage === 'en' ? data.syllabus : data.syllabusAs;
        let syllList = `<ul class="list-disc pl-5 space-y-1 text-slate-650 dark:text-slate-300 font-medium font-sans">`;
        syllArray.forEach(patternItem => {
            syllList += `<li>${patternItem}</li>`;
        });
        syllList += `</ul>`;

        syllabusSectionHtml = `
        <h3 id="toc-syllabus" class="text-sm sm:text-base font-extrabold text-navy dark:text-white mt-6 mb-2 uppercase tracking-wide border-l-4 border-assam-green pl-2">${syllabusTitle}</h3>
        <div class="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
            ${syllList}
        </div>
        `;
    }

    // Official Web Link Tab Button
    const linkBtnText = currentLanguage === 'en' ? 'GO TO OFFICIAL WEB PORTAL' : 'অফিচিয়েল ৱেবচাইটলৈ যাওক';
    const officialBtnHtml = data.officialLink ? `
    <div class="mt-8 pt-4 border-t border-slate-150 dark:border-slate-850 flex justify-end">
        <a href="${data.officialLink}" target="_blank" rel="noreferrer" class="bg-assam-green hover:bg-assam-darkgreen text-white font-extrabold px-6 py-3 rounded-xl text-xs tracking-wide flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
            <span>${linkBtnText}</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
    </div>` : "";

    // Assemble Content Body inside parent `#article-main-body`
    document.getElementById("article-main-body").innerHTML = `
        <div id="toc-overview">
            <h3 class="text-sm sm:text-base font-extrabold text-navy dark:text-white mb-2 uppercase tracking-wide border-l-4 border-assam-green pl-2">${overviewTitle}</h3>
            <p class="font-sans leading-relaxed text-slate-700 dark:text-slate-350 font-medium">${overviewBody}</p>
        </div>

        <div id="toc-eligibility" class="mt-8">
            <h3 class="text-sm sm:text-base font-extrabold text-navy dark:text-white mb-2.5 uppercase tracking-wide border-l-4 border-assam-green pl-2">${eligibilityTitle}</h3>
            ${eligibilityListHtml}
        </div>

        <div id="toc-benefits" class="mt-8 border-l-4 border-emerald-600 bg-emerald-50/50 dark:bg-slate-905 p-3.5 rounded-r-xl dark:bg-slate-900 dark:border-emerald-700">
            <span class="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest block mb-1">${benefitsTitle}</span>
            <p class="font-sans italic leading-relaxed text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm">${benefitsBody}</p>
        </div>

        <div id="toc-howto" class="mt-8">
            <h3 class="text-sm sm:text-base font-extrabold text-navy dark:text-white mb-3.5 uppercase tracking-wide border-l-4 border-assam-green pl-2">${applyTitle}</h3>
            ${applyListHtml}
        </div>

        ${syllabusSectionHtml}

        ${officialBtnHtml}
    `;

    // FAQ ACCORDIONS GENERATOR
    const faqContainer = document.getElementById("faq-accordion-container");
    const faqDataMap = [
        {
            q: "How often are lists checked on Axom Xarothi?",
            qAs: "Axom Xarothi প’ৰ্টেলৰ তথ্য কিমান সঘনাই চাব লাগে?",
            ans: "Every single post published on this platform represents reliable educational research derived directly from state notifications.",
            ansAs: "অসম চৰকাৰৰ জাননী বা অধিসূচনাৰ লগে লগেই ইয়াত তথ্য সংলগ্ন কৰা হয়, সেয়েহে নিতৌ পৰীক্ষা কৰাটো হিতকাৰী।"
        },
        {
            q: "Do I have to pay any fees to apply for schemes linked here?",
            qAs: "ইয়াত থকা আঁচনিবোৰত আৱেদন কৰিবলৈ কিমান পইচা দিব লাগে?",
            ans: "Absolutely null. All core central and state government schemes (like Orunodoi, Nijut Moina, free Scooty) are completely free. Never pay to agents.",
            ansAs: "সম্পূৰ্ণ বিনামূলীয়া। অৰুণোদয় বা স্কুটী আঁচনিৰ বাবে কাকো কোনো ধন আদি দিব নালাগে। ভুৱা মানুহৰ পৰা দূৰত থাকক।"
        },
        {
            q: "How to prepare effectively for SLRC ADRE exams?",
            qAs: "ADRE ৩য় আৰু ৪র্থ বৰ্গৰ লিখিত পৰীক্ষাৰ বাবে কেনেকৈ প্ৰস্তুত হ'ব পাৰি?",
            ans: "We highly recommend mastering static Assam General Knowledge, river maps, state rulers history, and high secondary mathematical formulae. Launch our AI Assistant bot below for daily quizzes!",
            ansAs: "অসমৰ সাধাৰণ জ্ঞান কুইজ অনুশীলন কৰাৰ বাবে আমাৰ ভাসমান সুন্দৰ এআই সহায়িকা ব্যৱহাৰ কৰিব পাৰে, যিয়ে প্ৰশ্ন উত্তৰ প্ৰদান কৰিব।"
        }
    ];

    let faqHtml = "";
    faqDataMap.forEach((faqItem, idx) => {
        const qText = currentLanguage === 'en' ? faqItem.q : faqItem.qAs;
        const ansText = currentLanguage === 'en' ? faqItem.ans : faqItem.ansAs;

        faqHtml += `
        <div class="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/40">
            <button onclick="toggleFaqIndex(${idx})" id="faq-header-${idx}" class="w-full text-left p-4 sm:p-5 font-bold flex items-center justify-between text-[#001f3f] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 active:bg-slate-100 transition-all font-sans text-xs sm:text-sm">
                <span>${qText}</span>
                <i class="fa-solid fa-chevron-down transition-transform duration-200" id="faq-arrow-${idx}"></i>
            </button>
            <div id="faq-body-${idx}" class="hidden p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-355 text-xs sm:text-sm leading-relaxed font-sans font-medium dark:text-slate-300">
                ${ansText}
            </div>
        </div>
        `;
    });
    faqContainer.innerHTML = faqHtml;

    // RELATED POSTS PREVIEW GENERATOR
    const relatedContainer = document.getElementById("related-posts-grid");
    const updatesNotCurrent = ASSAM_NEWS_DATA.filter(item => item.id !== id).slice(0, 2);
    let relatedHtml = "";
    updatesNotCurrent.forEach(relatedItem => {
        const titleLabel = currentLanguage === 'en' ? relatedItem.title : relatedItem.titleAs;
        relatedHtml += `
        <div onclick="readFullArticle('${relatedItem.id}')" class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4.5 p-4 rounded-xl hover:border-assam-green/45 cursor-pointer shadow-xs transition-all flex flex-col justify-between">
            <p class="text-[12px] font-extrabold text-navy dark:text-white line-clamp-2 leading-tight">${titleLabel}</p>
            <span class="text-[9px] text-slate-450 dark:text-slate-500 font-bold block mt-3 uppercase">${relatedItem.publishedDate} &bull; ${relatedItem.category}</span>
        </div>
        `;
    });
    relatedContainer.innerHTML = relatedHtml;
}

// COLLAPSIBLE ACCORDION LOGIC
function toggleFaqIndex(index) {
    const body = document.getElementById(`faq-body-${index}`);
    const arrow = document.getElementById(`faq-arrow-${index}`);

    if (body.classList.contains("hidden")) {
        body.classList.remove("hidden");
        arrow.style.transform = "rotate(180deg)";
    } else {
        body.classList.add("hidden");
        arrow.style.transform = "rotate(0deg)";
    }
}

// COPY TRIGGER WITH STICKY TOAST MESSAGE
function copyArticleLink() {
    const mockLink = window.location.origin + "/index.html?id=" + (openedArticleId || "latest");
    navigator.clipboard.writeText(mockLink).then(() => {
        // Show Toast
        const toast = document.getElementById("share-toast");
        const msg = document.getElementById("share-toast-msg");
        msg.textContent = currentLanguage === 'en' ? "Link copied safely to clipboard!" : "প্ৰবন্ধৰ লিংক ক্লিপবৰ্ডত সংৰক্ষণ হ’ল!";
        
        toast.style.transform = "translateX(0)";
        setTimeout(() => {
            toast.style.transform = "translateX(150%)";
        }, 3000);
    });
}

function triggerShareMessage(platformName) {
    // Show quick alert toast representing share action
    const toast = document.getElementById("share-toast");
    const msg = document.getElementById("share-toast-msg");
    msg.textContent = currentLanguage === 'en' ? `Opening ${platformName} share dialog...` : `${platformName} যোগে বন্ধু বৰ্গলৈ পঠোৱা হৈছে...`;
    
    toast.style.transform = "translateX(0)";
    setTimeout(() => {
        toast.style.transform = "translateX(150%)";
    }, 2500);
}

// --- CLIENT OFFLINE BOT ASSISTANT MOCK GENERATION ---
const OFFLINE_BOT_ANSWERS = {
    orunodoi: {
        en: "Orunodoi 3.0 scheme transfers direct cash benefits of ₹1,400 on the 10th of every month. Eligible households must nominate a female family head. You can collect GP verified application forms from Panchayat or Municipal camps.",
        as: "অৰুণোদয় ৩.০ আঁচনিৰ অধীনত হিতাধিকাৰী মহিলাই মাহিলী সৰ্বমুঠ ১৪০০ টকা লাভ কৰে। আবেদনকাৰী অসমৰ স্থায়ী বাসিন্দা হ'ব লাগিব আৰু বাৰ্ষিক আয় ২ লাখতকৈ কম হোৱাটো বাঞ্চনীয়।"
    },
    adre: {
        en: "SLRC ADRE Level 3 & 4 written test syllabus contains High School General Math, Assam History & Geography, English levels, and reasoning analytics. Negative marking exists, so build a sound practice before attempting.",
        as: "SLRC ADRE পৰীক্ষাৰ চিলেবাচত সাধাৰণ গণিত, অসমৰ বুৰঞ্জী ও ভূগোল, আৰু তৰ্ক দক্ষতা অন্তৰ্ভুক্ত হৈছে। ইয়াত নেগেটিভ নম্বৰ কটাৰ ব্যৱস্থা আছে, অতি সাৱধানে উত্তৰ কৰিব।"
    },
    scooty: {
        en: "The Pragyan Bharati Scooty Scheme rewards boys with 75% marks and girls with 60% marks in high secondary board results with petrol or electric variants. Check listings at pragyanbharati.assam.gov.in.",
        as: "মেট্ৰিক ও উচ্চ মাধ্যমিকৰ পাছত মেধাৱী ছাত্ৰীক ৬০% বৰ্গ বা ছাত্ৰক ৭৫% অৰ্হতাত বিনামূলীয়া স্কুটী চৰকাৰে প্ৰদান কৰে।"
    },
    kaziranga: {
        en: "Kaziranga National Park is located across Golaghat and Nagaon. Jeep and Elephant Safaris are active from November to April annually. Best gate Kohora or Bagori! Pre-book at official assamtourism.online portal.",
        as: "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান গোলাঘাট আৰু নগাঁও অৱস্থিত আৰু এশিঙীয়া গঁড় চাবৰ বাবে নৱেম্বৰৰ পৰা এপ্ৰিল মাহ আটাইতকৈ উপযুক্ত।"
    },
    moina: {
        en: "Nijut Moina scheme stops child marriages by retaining girls in college (degree: ₹1,250/month) and Post Graduate schemes (₹2,500/month). Minimum 75% attendance is required.",
        as: "নিজুত মইনা আঁচনিৰ জৰিয়তে উচ্চ শিক্ষাত পঢ়া ছাত্ৰীক মাহিলী বৃত্তি দিয়া হয় যাতে বাল্য বিবাহ বন্ধ কৰিব পাৰি।"
    },
    default: {
        en: "Thank you for asking! For deep questions, competitive exam preps, or complex status check coordinates, launch the fully active live AI assistant on our portal with your secrets configurator.",
        as: "প্ৰশ্ন কৰাৰ বাবে ধন্যবাদ! সঠিক ফলাফল বা তালিকাৰ বাবে চৰকাৰী ৱেবচাইট বা আমাৰ প’ৰ্টেলৰ মূল লাইভ এআই সহায়িকাৰ ব্যৱহাৰ কৰিব।"
    }
};

function toggleFloatingChat() {
    const box = document.getElementById("portal-chatbox-widget");
    if (box.classList.contains("hidden")) {
        box.classList.remove("hidden");
    } else {
        box.classList.add("hidden");
    }
}

function handleQuickBotInquiry(title) {
    toggleFloatingChat();
    sendQuickChatMsg("Inquiry related to: " + title);
}

function sendFloatingChatMsg() {
    const field = document.getElementById("chat-input-field");
    const text = field.value.trim();
    if (!text) return;
    
    field.value = "";
    sendQuickChatMsg(text);
}

function sendQuickChatMsg(msg) {
    const container = document.getElementById("chat-messages-container");
    const userBubble = `
    <div class="flex justify-end animate-fadeIn">
        <div class="max-w-[85%] bg-slate-900 text-white rounded-2xl rounded-br-none p-3 shadow-xs font-semibold">
            ${msg}
        </div>
    </div>
    `;
    container.innerHTML += userBubble;

    // Scroll
    container.scrollTop = container.scrollHeight;

    // Simulate assistant typing
    setTimeout(() => {
        let answerObj = OFFLINE_BOT_ANSWERS.default;
        const low = msg.toLowerCase();
        if (low.includes("orunodoi")) answerObj = OFFLINE_BOT_ANSWERS.orunodoi;
        else if (low.includes("adre") || low.includes("syllabus")) answerObj = OFFLINE_BOT_ANSWERS.adre;
        else if (low.includes("scooty")) answerObj = OFFLINE_BOT_ANSWERS.scooty;
        else if (low.includes("kaziranga") || low.includes("rhino")) answerObj = OFFLINE_BOT_ANSWERS.kaziranga;
        else if (low.includes("moina") || low.includes("nijut")) answerObj = OFFLINE_BOT_ANSWERS.moina;

        const responseString = currentLanguage === 'en' ? answerObj.en : answerObj.as;
        const botBubble = `
        <div class="flex justify-start animate-fadeIn">
            <div class="max-w-[85%] bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100 rounded-2xl rounded-bl-none p-3 shadow-xs border border-slate-200 dark:border-slate-900 leading-normal font-sans">
                ${responseString}
            </div>
        </div>
        `;
        container.innerHTML += botBubble;
        container.scrollTop = container.scrollHeight;
    }, 800);
}
