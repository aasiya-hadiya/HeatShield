export type AppLocale = 'en' | 'ar';

export interface TranslationDictionary {
  appName: string;
  appArabicName: string;
  tagline: string;
  subtitle: string;
  roles: {
    worker: string;
    rider: string;
    supervisor: string;
  };
  status: {
    live: string;
    simulated: string;
    middayBanActive: string;
    legalStop: string;
  };
  nav: {
    impact: string;
    evidence: string;
    demoControls: string;
    switchLanguage: string;
  };
  riskCard: {
    title: string;
    middayBanTitle: string;
    middayBanDesc: string;
    estimatedWbgt: string;
    safetyMargin: string;
    vsLimit: string;
    airTemp: string;
    relHumidity: string;
    globeTemp: string;
    stullWetBulb: string;
    drivers: string;
    whyAlert: string;
    overrideActive: string;
  };
  alert: {
    title: string;
    verified: string;
    deterministic: string;
    listen: string;
    stop: string;
    clarityTarget: string;
    analysis: string;
    updatingGemini: string;
    protocol: string;
  };
  worker: {
    hydrationTitle: string;
    hydrationTarget: string;
    cupsLogged: string;
    totalLogged: string;
    addCup: string;
    restTitle: string;
    nextBreakIn: string;
    mohreCompliant: string;
    resetTimer: string;
    workRestTitle: string;
    workRestDesc: string;
    nextCoolingBreak: string;
    startBreakNow: string;
    buddyTitle: string;
    buddyBadge: string;
    buddyDesc: string;
    assignedBuddy: string;
    checksCompletedToday: string;
    checkBuddyButton: string;
    acclimTitle: string;
    acclimDesc: string;
    statusLabel: string;
    newWorker14Days: string;
    fullyAcclimatized: string;
    toggleNewWorker: string;
    symptomsTitle: string;
    symptomsBadge: string;
    symptomsDesc: string;
    alertMedic: string;
    clearSymptoms: string;
    privacyLedgerText: string;
    viewDataLedger: string;
    sosModalTitle: string;
    dataLedgerModalTitle: string;
  };
  rider: {
    coolByTitle: string;
    coolByBadge: string;
    coolByDesc: string;
    recommendedCoolBy: string;
    immediatelyNow: string;
    minsLeft: string;
    emergencyRefuge: string;
    highStrain: string;
    goNow: string;
    radarTitle: string;
    gpsLocked: string;
    dubaiDefault: string;
    nearest: string;
    route: string;
    allStationsTitle: string;
    sortedByProximity: string;
    currentRiderPin: string;
  };
  supervisor: {
    overviewTitle: string;
    overviewSubtitle: string;
    threeCrewsActive: string;
    hideWearables: string;
    showWearables: string;
    downloadAuditCsv: string;
    crewGridTitle: string;
    auditThresholdFormula: string;
    smartShiftTitle: string;
    smartShiftBadge: string;
    smartShiftSubtitle: string;
    generatingPlan: string;
    regeneratePlan: string;
    shiftTimelineTitle: string;
    optimizationRationale: string;
    trendTitle: string;
    feedbackTitle: string;
    feedbackSubtitle: string;
    usefulVote: string;
    falseAlarmVote: string;
    leadTimeTitle: string;
    adherenceRateTitle: string;
    usefulRateTitle: string;
    statutoryComplianceTitle: string;
  };
  guestModal: {
    badge: string;
    subtext: string;
    instantAccess: string;
    accessDesc: string;
    chooseRole: string;
    continueBtn: string;
    roleNotice: string;
  };
  footer: {
    disclaimerTitle: string;
    disclaimerText: string;
  };
}

export const UI_TRANSLATIONS: Record<AppLocale, TranslationDictionary> = {
  en: {
    appName: 'HeatShield AI',
    appArabicName: 'دِرْعُ الحَرَارَةِ الذَّكِيّ',
    tagline: 'Heat-risk early warning & SmartShift system for Dubai outdoor workers',
    subtitle: 'Decision support system for outdoor construction crews & delivery riders in Dubai & the UAE',
    roles: {
      worker: 'Outdoor Worker',
      rider: 'Delivery Rider',
      supervisor: 'Site Coordinator',
    },
    status: {
      live: 'LIVE SENSOR (ESP32)',
      simulated: 'SIMULATED SENSOR',
      middayBanActive: 'MIDDAY BAN ACTIVE (12:30–15:00)',
      legalStop: 'LEGAL WORK STOP',
    },
    nav: {
      impact: 'Impact Metrics',
      evidence: 'Evidence & ESP32',
      demoControls: 'Demo Controls',
      switchLanguage: 'العربية (دبي)',
    },
    riskCard: {
      title: 'Real-Time Thermal Risk Assessment',
      middayBanTitle: 'UAE Legal Midday Ban Active (12:30–15:00)',
      middayBanDesc: 'All outdoor work under direct sun is strictly prohibited by UAE Ministry Decree. Mandatory work stoppage and shaded rest.',
      estimatedWbgt: 'Estimated WBGT Index',
      safetyMargin: 'Thermal Safety Margin',
      vsLimit: 'vs limit',
      airTemp: 'Air Temp (Ta)',
      relHumidity: 'Relative Humidity',
      globeTemp: 'Globe Temp (Tg)',
      stullWetBulb: 'Stull Wet-Bulb',
      drivers: 'Drivers:',
      whyAlert: 'Why this alert?',
      overrideActive: 'Override Active',
    },
    alert: {
      title: 'Multilingual Worker Advisory',
      verified: 'Gemini Verified',
      deterministic: 'Deterministic Template',
      listen: 'Listen',
      stop: 'Stop',
      clarityTarget: 'Target: <25 words, high-clarity vocabulary for outdoor noise & rapid comprehension.',
      analysis: 'Thermal Strain Analysis',
      updatingGemini: '(Updating with Gemini...)',
      protocol: 'Immediate Safety Protocol:',
    },
    worker: {
      hydrationTitle: 'Hydration Tracker',
      hydrationTarget: 'Target: 250ml cold water every 15–20 mins',
      cupsLogged: 'Cups',
      totalLogged: 'Total logged',
      addCup: 'Add Cup (250ml)',
      restTitle: 'Shaded Rest Recovery',
      nextBreakIn: 'Next Break In',
      mohreCompliant: 'MoHRE Compliant Rest Cycle',
      resetTimer: 'Reset Timer',
      workRestTitle: 'Work / Rest Ratio',
      workRestDesc: 'ISO 7243 calibrated for metabolic exertion',
      nextCoolingBreak: 'Next Cooling Break',
      startBreakNow: 'Start Break Now',
      buddyTitle: 'Teammate Safety Check',
      buddyBadge: 'Buddy System',
      buddyDesc: 'Monitor signs of heat strain in your designated peer partner',
      assignedBuddy: 'Assigned Buddy',
      checksCompletedToday: 'Checks logged today',
      checkBuddyButton: 'Log Buddy Check (All Good)',
      acclimTitle: 'Acclimatization Guard',
      acclimDesc: 'Enhanced heat strain prevention for workers in their first 14 days',
      statusLabel: 'Worker Status',
      newWorker14Days: 'New Worker (Days 1-14)',
      fullyAcclimatized: 'Fully Acclimatized',
      toggleNewWorker: 'Mark as New Worker (<14 Days on Site)',
      symptomsTitle: 'Voluntary Heat Strain Check-In',
      symptomsBadge: 'Confidential',
      symptomsDesc: 'Reporting symptoms automatically triggers assistance and elevates safety margins',
      alertMedic: 'ALERT SITE MEDIC',
      clearSymptoms: 'Clear symptoms',
      privacyLedgerText: 'Zero-Telemetry Tracking: Anonymous on-device storage only',
      viewDataLedger: 'View Data Ledger',
      sosModalTitle: 'Site Medic Dispatched',
      dataLedgerModalTitle: 'Privacy & Data Ledger',
    },
    rider: {
      coolByTitle: 'Cool-by Routing & Rest Sanctuaries',
      coolByBadge: 'Predictive Window',
      coolByDesc: 'Dynamic route advisory calculating safe riding minutes before thermal strain peaks',
      recommendedCoolBy: 'Recommended Cool-by',
      immediatelyNow: 'IMMEDIATELY (NOW)',
      minsLeft: 'left',
      emergencyRefuge: 'Emergency Refuge Pinned',
      highStrain: 'High Heat Strain',
      goNow: 'GO NOW – OPEN MAPS DIRECTIONS',
      radarTitle: 'Rider Distance Radar',
      gpsLocked: 'GPS LOCKED',
      dubaiDefault: 'DUBAI DEFAULT',
      nearest: 'NEAREST',
      route: 'Directions',
      allStationsTitle: 'Dubai Municipality Cooling Hubs',
      sortedByProximity: 'Sorted by proximity',
      currentRiderPin: 'Your Location',
    },
    supervisor: {
      overviewTitle: 'Site Operations & Crew Heat Safety',
      overviewSubtitle: 'Calibrated workload thresholds across active Dubai construction zones',
      threeCrewsActive: '3 Crews Monitored',
      hideWearables: 'Hide Wearables',
      showWearables: 'Show Wearables',
      downloadAuditCsv: 'Download Compliance CSV',
      crewGridTitle: 'Active Construction Crews',
      auditThresholdFormula: 'Audit ISO 7243 Formulas',
      smartShiftTitle: 'SmartShift AI Schedule Optimizer',
      smartShiftBadge: 'Gemini Engine',
      smartShiftSubtitle: 'Optimizes high-effort tasks into cooler hours with 12:30–15:00 Midday Ban hard stop',
      generatingPlan: 'Generating Plan...',
      regeneratePlan: 'Optimize Schedule',
      shiftTimelineTitle: 'Optimized Shift Schedule',
      optimizationRationale: 'Optimization Rationale',
      trendTitle: '5-Minute Rolling WBGT Trend',
      feedbackTitle: 'Alert Calibration Feedback',
      feedbackSubtitle: 'Field feedback tunes false-alarm tolerance without compromising legal safety floors',
      usefulVote: 'Useful Alert',
      falseAlarmVote: 'False Alarm',
      leadTimeTitle: 'Average Lead Time',
      adherenceRateTitle: 'Worker Adherence',
      usefulRateTitle: 'Validation Rate',
      statutoryComplianceTitle: 'Regulatory Compliance',
    },
    guestModal: {
      badge: 'Future Health Digital Innovation Challenge 2026',
      subtext: 'Privacy-first heat-risk early-warning & SmartShift planning system for outdoor workers and delivery riders in Dubai & the UAE.',
      instantAccess: 'Instant Guest Access • Zero Login Barrier',
      accessDesc: 'Judges and coordinators can evaluate all features immediately without accounts, passwords, or data collection.',
      chooseRole: 'Choose Your Initial View:',
      continueBtn: 'Continue as Guest',
      roleNotice: 'Role switcher remains accessible in the top navigation bar at all times.',
    },
    footer: {
      disclaimerTitle: 'Important Decision-Support & Non-Medical Device Notice',
      disclaimerText: 'HeatShield AI (درع الحرارة الذكي) is an operational decision-support tool, NOT a certified medical device. It does not diagnose, predict heat stroke, or replace professional clinical judgment. Thresholds displayed are based on ISO 7243 and UAE MoHRE guidelines.',
    },
  },
  ar: {
    appName: 'درع الحرارة الذكي',
    appArabicName: 'HeatShield AI',
    tagline: 'منظومة حماية عمال الميدان وسائقي التوصيل من الإجهاد الحراري والتخطيط الذكي للمناوبات',
    subtitle: 'نظام دعم القرار لحماية العمال الميدانيين وسائقي التوصيل في إمارة دبي ودولة الإمارات العربية المتحدة',
    roles: {
      worker: 'عامل الميدان',
      rider: 'سائق التوصيل',
      supervisor: 'مشرف الموقع',
    },
    status: {
      live: 'مباشر (ESP32)',
      simulated: 'وضع المحاكاة',
      middayBanActive: 'حظر الظهيرة مفعّل (12:30 – 15:00)',
      legalStop: 'وقف قانوني ملزم',
    },
    nav: {
      impact: 'مؤشرات الأثر',
      evidence: 'الأدلة والعتاد',
      demoControls: 'لوحة التحكم',
      switchLanguage: 'English',
    },
    riskCard: {
      title: 'التقييم اللحظي لمستوى الإجهاد الحراري',
      middayBanTitle: 'حظر العمل وقت الظهيرة سارٍ الآن (12:30 – 15:00)',
      middayBanDesc: 'يحظر العمل في الأماكن المكشوفة تحت أشعة الشمس المباشرة بموجب قرار وزارة الموارد البشرية والتوطين.',
      estimatedWbgt: 'مؤشر الحرارة الرطبة الكروية (WBGT)',
      safetyMargin: 'هامش الأمان الحراري',
      vsLimit: 'مقارنة بالحد الأقصى',
      airTemp: 'درجة حرارة الهواء (Ta)',
      relHumidity: 'الرطوبة النسبية (RH)',
      globeTemp: 'الحرارة الإشعاعية الكروية (Tg)',
      stullWetBulb: 'الحرارة الرطبة (Stull)',
      drivers: 'مسببات الإجهاد الحراري:',
      whyAlert: 'لماذا هذا التنبيه؟',
      overrideActive: 'تفعيل الاستثناء الإلزامي',
    },
    alert: {
      title: 'التوجيه الميداني متعدد اللغات للعمال',
      verified: 'معتمد عبر الذكاء الاصطناعي (Gemini)',
      deterministic: 'قالب حسابي حتمي معتمد',
      listen: 'استمع للتنبيه',
      stop: 'إيقاف الصوت',
      clarityTarget: 'المعيار: أقل من 25 كلمة بعبارات واضحة ومباشرة لتناسب ظروف الضوضاء الميدانية.',
      analysis: 'تحليل الإجهاد الحراري اللحظي',
      updatingGemini: '(جاري التحديث عبر Gemini...)',
      protocol: 'إجراءات السلامة الفورية الواجب اتخاذها:',
    },
    worker: {
      hydrationTitle: 'نظام الترطيب وشرب السوائل',
      hydrationTarget: 'المستهدف: 250 مل ماء بارد كل 15 إلى 20 دقيقة',
      cupsLogged: 'أكواب',
      totalLogged: 'إجمالي السوائل المسجلة اليوم',
      addCup: '+1 كوب ماء (250 مل)',
      restTitle: 'استراحة التبريد والراحة المظللة',
      nextBreakIn: 'موعد الاستراحة القادمة بعد',
      mohreCompliant: 'دورة استراحة معتمدة من وزارة الموارد البشرية والتوطين',
      resetTimer: 'إعادة ضبط المؤقت',
      workRestTitle: 'نسبة العمل إلى الراحة',
      workRestDesc: 'معايرة طبية معتمدة وفق معيار ISO 7243',
      nextCoolingBreak: 'الاستراحة المبردة القادمة',
      startBreakNow: 'بدء الاستراحة الآن',
      buddyTitle: 'فحص سلامة الزميل الميداني',
      buddyBadge: 'نظام الرفيق',
      buddyDesc: 'تفقد أعراض الإجهاد الحراري لدى زميلك المعين في الفريق',
      assignedBuddy: 'الزميل المعين لك',
      checksCompletedToday: 'الفحوصات المسجلة اليوم',
      checkBuddyButton: 'تسجيل فحص الزميل (الوضع سليم)',
      acclimTitle: 'برنامج حماية العمال الجدد والتأقلم',
      acclimDesc: 'بروتوكول وقائي مخفض العتبة للعمال في أول 14 يوماً من العمل الميداني',
      statusLabel: 'حالة العامل',
      newWorker14Days: 'عامل جديد (أول 14 يوماً)',
      fullyAcclimatized: 'متأقلم بالكامل',
      toggleNewWorker: 'تحديد كعامل جديد (أقل من 14 يوماً في الموقع)',
      symptomsTitle: 'الفحص الذاتي للأعراض الصحية (سري للغاية)',
      symptomsBadge: 'سري وخاص',
      symptomsDesc: 'تحديد أي عرض يرفع مستوى التنبيه فوراً لطلب الدعم وتوفير التبريد دون مساءلة',
      alertMedic: 'طلب مسعف الموقع فوراً',
      clearSymptoms: 'إلغاء تحديد الأعراض',
      privacyLedgerText: 'أمان تام للبيانات: تخزين مشفر محلياً دون أي تتبع حيوي عقابي',
      viewDataLedger: 'عرض سجل الخصوصية',
      sosModalTitle: 'تم إرسال إشعار لطاقم الإسعاف',
      dataLedgerModalTitle: 'سجل خصوصية البيانات الفيدرالي',
    },
    rider: {
      coolByTitle: 'مسار التبريد التنبؤي ومحطات الاستراحة المبردة',
      coolByBadge: 'النافذة التنبؤية',
      coolByDesc: 'توجيه تنبؤي لمسار سائقي التوصيل يربط بين موعد بلوغ مستوى الخطر المرتفع وأقرب نقطة تبريد',
      recommendedCoolBy: 'موعد التبريد الإلزامي الأقصى',
      immediatelyNow: 'فوراً (الآن)',
      minsLeft: 'متبقية',
      emergencyRefuge: 'محطة استراحة طارئة مثبتة في القمة',
      highStrain: 'إجهاد حراري شديد',
      goNow: 'توجه الآن – فتح المسار الملاحي في الخرائط',
      radarTitle: 'رادار المسافة التخطيطي لسائقي التوصيل',
      gpsLocked: 'تم تحديد الموقع عبر GPS',
      dubaiDefault: 'موقع دبي الافتراضي',
      nearest: 'الأقرب إليك',
      route: 'الملاحة والاتجاهات',
      allStationsTitle: 'محطات استراحة بلدية دبي المكيفة',
      sortedByProximity: 'مرتبة حسب المسافة الأقرب',
      currentRiderPin: 'موقعك التقديري',
    },
    supervisor: {
      overviewTitle: 'إدارة العمليات الميدانية وسلامة الفرق',
      overviewSubtitle: 'معايرة دقيقة لحدود الإجهاد الحراري حسب نوع الجهد في مشاريع دبي',
      threeCrewsActive: '3 فرق نشطة تحت المراقبة',
      hideWearables: 'إخفاء البيانات الحيوية',
      showWearables: 'إظهار البيانات الحيوية',
      downloadAuditCsv: 'تصدير تقرير الامتثال والتوثيق (CSV)',
      crewGridTitle: 'فرق العمل الميدانية النشطة',
      auditThresholdFormula: 'معادلات ISO 7243 المعتمدة',
      smartShiftTitle: 'مخطط المناوبات الذكي (SmartShift)',
      smartShiftBadge: 'تحليل Gemini الذكي',
      smartShiftSubtitle: 'جدولة المهام الشاقة تلقائياً في الساعات الصباحية والمسائية مع التطبيق الصارم لحظر الظهيرة',
      generatingPlan: 'جاري التوليد...',
      regeneratePlan: 'إعادة تحسين الجدول',
      shiftTimelineTitle: 'الجدول الزمني للعمليات اليومية (06:00 – 18:00)',
      optimizationRationale: 'المسوغ التشغيلي لخطة المناوبات',
      trendTitle: 'مسار مؤشر WBGT التراكمي لآخر 5 دقائق',
      feedbackTitle: 'تقييم المشرف لدقة التنبيهات',
      feedbackSubtitle: 'تقييم دقة التنبيه يساعد النموذج على تقليل الإنذارات الكاذبة دون المساس بحد الأمان المعتمد',
      usefulVote: 'تنبيه دقيق ومفيد',
      falseAlarmVote: 'إنذار غير مبرر',
      leadTimeTitle: 'متوسط زمن الإشعار المسبق',
      adherenceRateTitle: 'معدل الالتزام بفترات الراحة',
      usefulRateTitle: 'نسبة التنبيهات الدقيقة',
      statutoryComplianceTitle: 'الامتثال للوائح بلدية دبي',
    },
    guestModal: {
      badge: 'تحدي صحة المستقبل للابتكار الرقمي 2026',
      subtext: 'أداة مبتكرة لدعم القرار والإنذار المبكر من الإجهاد الحراري وتخطيط المناوبات لعمال الميدان وسائقي التوصيل في دبي والإمارات.',
      instantAccess: 'دخول فوري كزائر • دون الحاجة لتسجيل أو كلمة مرور',
      accessDesc: 'متاح للجان التحكيم والمنسقين والعمال للاطلاع وتجربة كافة الميزات مباشرة وبكل سلاسة.',
      chooseRole: 'اختر واجهة البداية الخاصة بك:',
      continueBtn: 'المتابعة كزائر',
      roleNotice: 'يمكنك التبديل بين واجهات العمال والمشرفين في أي وقت من الشريط العلوي.',
    },
    footer: {
      disclaimerTitle: 'إشعار قانوني وطبي: أداة لدعم القرار وليست جهازاً طبياً',
      disclaimerText: 'مشروع "درع الحرارة الذكي" (HeatShield AI) أداة تشغيلية لدعم القرار الميداني وليست جهازاً تشخيصياً أو طبياً معتمداً. الحدود المعروضة هي قيم إرشادية وتجريبية مستندة إلى إرشادات منظمة العمل الدولية (ISO 7243) وقرارات وزارة الموارد البشرية والتوطين في دولة الإمارات العربية المتحدة.',
    },
  },
};
