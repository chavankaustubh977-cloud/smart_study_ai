// Student-focused academic mock data matching the Stitch visual specification

export const mockCourses = [
  {
    id: "psyc-304",
    code: "PSYC 304",
    title: "Cognitive Psychology",
    term: "Spring Quarter 2025",
    credits: 4,
    instructor: "Prof. Henderson",
    mastery: 74,
    currentTopic: "Working Memory & Central Executive",
    activeModules: 4,
    timeRemaining: "15m remaining",
    summary: "Exploration of human mental architecture: sensory encoding, structural limits of working memory, and neural models."
  },
  {
    id: "cs-320",
    code: "CS 320",
    title: "Computer Networks",
    term: "Spring Quarter 2025",
    credits: 3,
    instructor: "Dr. Rostova",
    mastery: 42,
    currentTopic: "TCP/IP Handshake & Sockets",
    activeModules: 3,
    timeRemaining: "45m remaining",
    summary: "Layered architecture, reliable transport protocols, routing algorithms, and socket programming."
  },
  {
    id: "phil-210",
    code: "PHIL 210",
    title: "Introduction to Philosophy of Mind",
    term: "Spring Quarter 2025",
    credits: 3,
    instructor: "Prof. Wallace",
    mastery: 18,
    currentTopic: "Functionalism & Dualism",
    activeModules: 2,
    timeRemaining: "1h 10m remaining",
    summary: "Historical and contemporary philosophical inquiry into consciousness, qualia, and physicalism."
  }
];

export const mockMaterials = [
  {
    id: "mat-1",
    title: "Chapter 4 — Memory",
    format: "pdf",
    meta: "42 pages • Added Sep 12",
    badge: "Readings",
    highlight: "Full passage notes",
    status: "ready",
    pageCount: 42,
    citationRef: {
      type: "pdf",
      title: "Chapter 4 — Memory (Cognitive Psychology, 8th Ed.)",
      location: "Page 12",
      excerpt: "In Alan Baddeley's model of working memory, both components function as domain-specific buffers coordinated by the central executive. The phonological loop retains speech-based acoustic representations with a decay window of ~2 seconds."
    }
  },
  {
    id: "mat-2",
    title: "Week 04 — Memory Models & Working Memory",
    format: "slides",
    meta: "28 slides • Added Sep 14",
    badge: "Class Slides",
    highlight: "38 diagrams extracted",
    status: "ready",
    slideCount: 28,
    citationRef: {
      type: "ppt",
      title: "Week 04 — Memory Models & Working Memory",
      location: "Slide 18",
      excerpt: "Slide 18: Multi-component Working Memory Architecture. Central Executive regulates attentional focus between Phonological Loop and Visuospatial Sketchpad."
    }
  },
  {
    id: "mat-3",
    title: "Lecture 05 — Working Memory Mechanisms",
    format: "video",
    meta: "48 min • Recorded Oct 24",
    badge: "Recording",
    highlight: "Audio transcript synced",
    status: "ready",
    duration: "48 min",
    citationRef: {
      type: "video",
      title: "Lecture 05 — Working Memory Mechanisms",
      location: "14:32",
      excerpt: "Timestamp 14:32: 'When participants are asked to perform two tasks using the same slave system, performance drops drastically. That demonstrates domain specificity.'"
    }
  },
  {
    id: "mat-4",
    title: "Lecture 06 — Executive Control & Attention",
    format: "video",
    meta: "Video • 52 min",
    badge: "In Progress",
    highlight: "Preparing lecture transcript & key concepts",
    status: "processing",
    progress: 72,
    duration: "52 min"
  }
];

export const mockTutorConversation = [
  {
    id: "msg-1",
    sender: "student",
    time: "10:42 AM",
    text: "Can you explain the difference between the phonological loop and visuospatial sketchpad?"
  },
  {
    id: "msg-2",
    sender: "tutor",
    time: "10:43 AM",
    title: "ScholarAI Tutor",
    badge: "Textbook Verified",
    lead: "In Alan Baddeley's model of working memory, both components function as domain-specific buffers coordinated by the central executive:",
    comparison: [
      {
        icon: "graphic_eq",
        title: "Phonological Loop",
        description: "Dedicated to speech-based, verbal, and acoustic inputs. Comprises an inner voice (articulatory rehearsal) and an inner ear (phonological store) with a decay window of ~2 seconds."
      },
      {
        icon: "view_in_ar",
        title: "Visuospatial Sketchpad",
        description: "Responsible for visual patterns, spatial positions, and kinetic imagery. Handles both static form identification and dynamic mental spatial navigation."
      }
    ],
    showDiagram: true,
    citation: {
      sourceLabel: "Source · Chapter 4, Page 12",
      bookTitle: "(Cognitive Psychology, 8th Ed.)",
      type: "pdf",
      location: "Page 12",
      excerpt: "In Alan Baddeley's model of working memory, both components function as domain-specific buffers coordinated by the central executive. The phonological loop retains acoustic representations for ~2s without active rehearsal."
    }
  }
];

export const mockQuizQuestions = [
  {
    id: "q-1",
    number: 3,
    totalQuestions: 10,
    remainingTime: "4 mins",
    unit: "Unit 4: Memory Architecture",
    category: "MULTIPLE CHOICE · Baddeley & Hitch Model",
    tag: "Core Concept",
    question: "Which component of working memory temporarily stores auditory and verbal information?",
    options: [
      { id: "A", text: "Central executive", key: "1" },
      { id: "B", text: "Phonological loop", key: "2" },
      { id: "C", text: "Visuospatial sketchpad", key: "3" },
      { id: "D", text: "Episodic buffer", key: "4" }
    ],
    correctOption: "B",
    explanation: "The phonological loop is specialized for holding verbal and acoustic materials briefly. It consists of two subcomponents: the phonological store (which acts as an inner ear, holding representations for 1.5–2 seconds) and the articulatory rehearsal mechanism (an active inner voice preventing memory decay via subvocal repetition).",
    sourceCitation: {
      book: "Cognitive Psychology: Mind and Brain (4th Ed.)",
      location: "Chapter 4, Page 13",
      type: "pdf",
      excerpt: "Chapter 4, Page 13: 'The phonological loop handles acoustic and verbal material, relying on the phonological store and subvocal articulatory rehearsal.'"
    }
  },
  {
    id: "q-2",
    number: 4,
    totalQuestions: 10,
    remainingTime: "3 mins",
    unit: "Unit 4: Memory Architecture",
    category: "MULTIPLE CHOICE · Acoustic Decay Window",
    tag: "Temporal Limit",
    question: "What is the typical decay threshold of representations in the phonological store without active subvocal rehearsal?",
    options: [
      { id: "A", text: "Approximately 1.5 to 2 seconds", key: "1" },
      { id: "B", text: "About 30 seconds", key: "2" },
      { id: "C", text: "5 to 10 minutes", key: "3" },
      { id: "D", text: "Less than 200 milliseconds", key: "4" }
    ],
    correctOption: "A",
    explanation: "Empirical studies by Baddeley and colleagues demonstrate that passive phonological store traces decay after approximately 1.5 to 2 seconds unless refreshed by the articulatory rehearsal loop.",
    sourceCitation: {
      book: "Cognitive Psychology: Mind and Brain (4th Ed.)",
      location: "Chapter 4, Page 15",
      type: "pdf",
      excerpt: "Page 15: 'The phonological store holds acoustic traces for roughly 1.5 to 2 seconds, as demonstrated by the word-length effect.'"
    }
  }
];

export const mockProgressData = {
  courseTitle: "Cognitive Psychology",
  term: "Spring Quarter · Week 4",
  overallMastery: 74,
  masteryDelta: "+4% this week",
  paceNote: "Ahead of cohort pace by 3 days",
  currentFocus: {
    title: "Working Memory",
    detail: "Baddeley model & Central Executive capacity mechanics",
    recommendation: "Active recall recommended"
  },
  topicsNeedingReviewCount: 2,
  needsPractice: [
    {
      id: "np-1",
      topic: "Working Memory",
      badge: "Baddeley",
      subtext: "Phonological Loop & Visuospatial Sketchpad interactions",
      retention: 62,
      lastRevised: "Last revised 6 days ago"
    },
    {
      id: "np-2",
      topic: "Long-Term Memory",
      badge: "Consolidation",
      subtext: "Declarative vs. Procedural encoding schemas",
      retention: 58,
      lastRevised: "Last revised 8 days ago"
    }
  ],
  strongTopics: [
    {
      id: "st-1",
      topic: "Attention",
      subtext: "Selective filters & Broadbent early selection model",
      mastery: 90,
      accuracy: "Quiz accuracy: 18/20 concepts",
      reviewDue: "Spaced review in 12 days"
    },
    {
      id: "st-2",
      topic: "Sensory Encoding",
      subtext: "Iconic vs. echoic persistence & Sperling's partial-report",
      mastery: 85,
      accuracy: "Quiz accuracy: 17/20 concepts",
      reviewDue: "Spaced review in 9 days"
    }
  ],
  weeklyStudyHours: "4.2 hrs this week",
  weeklyActivity: [
    { day: "Mon", minutes: 30, height: "35%" },
    { day: "Tue", minutes: 50, height: "60%" },
    { day: "Wed", minutes: 80, height: "95%" },
    { day: "Thu", minutes: 60, height: "70%" },
    { day: "Fri", minutes: 15, height: "20%" },
    { day: "Sat", minutes: 75, height: "90%" },
    { day: "Sun", minutes: 0, height: "10%" }
  ]
};
