// Mock data strictly matching PRD and Track D requirements
export const mockCourses = [
  {
    id: "cs-301",
    code: "CS-301",
    title: "Operating Systems & Distributed Systems",
    semester: "Fall 2026",
    instructor: "Dr. Elena Rostova",
    totalMaterials: 14,
    processedMaterials: 14,
    overallMastery: 76,
    weakTopicsCount: 2,
    lastStudied: "2 hours ago",
    topics: ["Process Synchronization", "Virtual Memory & Paging", "Deadlock Prevention", "Distributed Consensus", "File System Architecture"]
  },
  {
    id: "cs-204",
    code: "CS-204",
    title: "Data Structures & Algorithm Design",
    semester: "Fall 2026",
    instructor: "Prof. Arvind Mehta",
    totalMaterials: 9,
    processedMaterials: 9,
    overallMastery: 88,
    weakTopicsCount: 1,
    lastStudied: "Yesterday",
    topics: ["Balanced Trees (AVL & Red-Black)", "Graph Algorithms & BFS/DFS", "Dynamic Programming", "Amortized Analysis"]
  },
  {
    id: "ai-402",
    code: "AI-402",
    title: "Machine Learning & Deep Neural Models",
    semester: "Fall 2026",
    instructor: "Dr. Sarah Chen",
    totalMaterials: 18,
    processedMaterials: 16,
    overallMastery: 69,
    weakTopicsCount: 3,
    lastStudied: "3 days ago",
    topics: ["Attention Mechanisms & Transformers", "Loss Landscapes & Optimization", "Diffusion Models", "RAG & Vector Retrieval"]
  }
];

export const mockMaterials = [
  {
    id: "mat-1",
    name: "Silberschatz_Operating_System_Concepts_Ch8_9.pdf",
    type: "pdf",
    size: "18.4 MB",
    pages: 64,
    status: "indexed",
    topicsExtracted: 8,
    chunks: 142,
    uploadedAt: "Oct 2, 2026, 14:10"
  },
  {
    id: "mat-2",
    name: "Lecture_07_Virtual_Memory_and_TLB.pptx",
    type: "ppt",
    size: "9.2 MB",
    slides: 48,
    status: "indexed",
    topicsExtracted: 6,
    chunks: 78,
    uploadedAt: "Oct 2, 2026, 16:35"
  },
  {
    id: "mat-3",
    name: "Lecture_08_Paging_and_Replacement_Algo.mp4",
    type: "video",
    size: "340 MB",
    duration: "47m 18s",
    status: "indexed",
    transcriptChunks: 84,
    uploadedAt: "Oct 2, 2026, 18:02"
  },
  {
    id: "mat-4",
    name: "Lab_Assignment_3_Deadlock_Detection.pdf",
    type: "pdf",
    size: "2.1 MB",
    pages: 6,
    status: "processing",
    topicsExtracted: 3,
    chunks: 24,
    uploadedAt: "Just now"
  }
];

export const mockGeneratingPipeline = {
  screenId: "7d0c29a09ca8448ca8f5e54a6603d497",
  projectId: "4675670754854073210",
  projectTitle: "ScholarAI Student Interface Redesign",
  targetCourse: "CS-301: Operating Systems & Distributed Systems",
  targetUnit: "Unit 4: Multilevel Paging, Inverted Tables & Page Fault Resolution",
  status: "in_progress",
  progressPercent: 78,
  elapsedSeconds: 24,
  estimatedRemaining: 8,
  totalTokensGenerated: 3410,
  stages: [
    {
      id: "ingestion",
      label: "Multimodal Document Ingestion & OCR",
      subtext: "PyMuPDF parsing, PPTX layout analysis & PaddleOCR diagram recognition",
      status: "completed",
      duration: "6.2s",
      itemsProcessed: "3 files (118 pages, 48 slides, 1 video)",
      details: [
        { name: "Silberschatz_Ch8_9.pdf", result: "112 text blocks, 6 memory layout diagrams OCR-extracted" },
        { name: "Lecture_07_TLB.pptx", result: "48 slides parsed with visual hierarchy preserved" },
        { name: "Lecture_08_Video.mp4", result: "Whisper speech-to-text synced to 0.1s accuracy" }
      ]
    },
    {
      id: "chunking_graph",
      label: "Concept Extraction & Prerequisite Graphing",
      subtext: "Boundary-aware semantic chunking with strict source metadata tagging",
      status: "completed",
      duration: "8.4s",
      itemsProcessed: "244 grounded chunks, 18 core concepts mapped",
      details: [
        { name: "Concept Taxonomy", result: "Extracted: [TLB Hit Rate], [Multi-level Paging], [Page Fault Handler], [Inverted Page Table]" },
        { name: "Prerequisite Edges", result: "Linked: [Logical Address Translation] → [TLB Cache] → [Demand Paging]" },
        { name: "Source Metadata Integrity", result: "100% of chunks retain exact Page/Slide/Timestamp coordinates" }
      ]
    },
    {
      id: "embedding_indexing",
      label: "Dense Vector Embedding & Rerank Indexing",
      subtext: "Jina AI v3 multimodal embeddings (1024-dim) & HNSW vector partition",
      status: "completed",
      duration: "5.1s",
      itemsProcessed: "244 vectors indexed in pgvector, similarity metric: cosine",
      details: [
        { name: "Vector Index", result: "HNSW index generated with efSearch=64, m=16" },
        { name: "Reranker Model", result: "Cross-encoder ready for hybrid dense + BM25 keyword fusion" }
      ]
    },
    {
      id: "adaptive_synthesis",
      label: "Diagnostic Assessment & Grounded Tutor Synthesis",
      subtext: "Synthesizing calibrated MCQ items and Bloom-taxonomy misconception probes",
      status: "processing",
      duration: "4.3s (active)",
      itemsProcessed: "Generating 8 adaptive test items with exact source verification...",
      details: [
        { name: "Item Gen #1", result: "Verified against Textbook p. 248 & Lecture Slide #14" },
        { name: "Item Gen #2", result: "Bloom Level 4: Analyze effective memory access time with TLB hit=92%" },
        { name: "Misconception Probing", result: "Synthesizing distractor for inverted page table search penalty..." }
      ]
    },
    {
      id: "mastery_linking",
      label: "Learner Model & Forgetting Curve Calibration",
      subtext: "Mapping question weights to student's historical mastery vectors",
      status: "queued",
      duration: "--",
      itemsProcessed: "Awaiting stage 4 completion",
      details: []
    }
  ],
  liveLogs: [
    "[00:01.2] Connected to ScholarAI Ingestion Worker node #4 (FastAPI + Groq)",
    "[00:03.5] PDF Ingestion: Silberschatz Chapter 8-9 parsed (64 pages, 142 chunks)",
    "[00:06.1] OCR Engine (PaddleOCR): Processed 6 memory architecture diagrams",
    "[00:09.4] Audio Pipeline: Whisper transcript extracted for 47m18s lecture video",
    "[00:12.8] Knowledge Graph: 18 concepts created with 29 directional prerequisite edges",
    "[00:15.3] Metadata Preserver: Attached exact source bounds (page/slide/timestamp)",
    "[00:18.0] Vector Store: 244 embeddings pushed to pgvector knowledge base",
    "[00:21.4] Assessment Synthesizer: Constructing Bloom-calibrated diagnostic items...",
    "[00:23.9] Grounding Check: Citation verification pass on synthesized question #3... PASS (100% ground rate)",
    "[00:24.1] Active: Synthesizing adaptive question #4 (Inverted Page Tables)..."
  ]
};

export const mockTutorChat = [
  {
    id: "msg-1",
    sender: "student",
    text: "Can you explain why multi-level paging is preferred over a single large page table when dealing with a 64-bit architecture?",
    timestamp: "10:14 AM"
  },
  {
    id: "msg-2",
    sender: "ai",
    text: "In a 64-bit system, a single contiguous linear page table would be prohibitively huge. If each page is 4 KB ($2^{12}$ bytes), a 64-bit address space contains $2^{52}$ page table entries. Even at 8 bytes per entry, that would require over **33 million gigabytes (32 Petabytes)** of physical memory just to store the page table itself!\n\n**Multi-level paging** solves this because most processes only use a tiny fraction of their virtual address space. By splitting the address into multiple hierarchical levels (e.g. 4-level or 5-level page tables in x86-64), the operating system **only allocates page tables for regions of memory that the process actually accesses**. Unused subtrees in the page table remain unallocated, saving vast amounts of physical RAM.",
    citations: [
      {
        id: "cit-1",
        label: "Silberschatz OS Ch. 9",
        page: 242,
        docType: "pdf",
        snippet: "Page 242: 'Hierarchical Paging. A 32-bit logical address space requires 4MB of memory for the page table. A 64-bit space requires an astronomical amount...'"
      },
      {
        id: "cit-2",
        label: "Lecture 7: Virtual Memory",
        slide: 28,
        docType: "ppt",
        snippet: "Slide 28: 'Hierarchical Page Tables: Break logical address into multiple indices. If an outer page table entry is NULL, no inner page table is allocated.'"
      },
      {
        id: "cit-3",
        label: "Lecture 8 Recording",
        timestamp: "21:40",
        videoSeconds: 1300,
        docType: "video",
        snippet: "Timestamp 21:40: 'Notice how multi-level paging avoids allocating millions of empty page table entries for sparse virtual address spaces.'"
      }
    ],
    timestamp: "10:14 AM",
    groundingConfidence: 98.4,
    groundedStatus: "VERIFIED_COURSE_GROUNDED"
  },
  {
    id: "msg-3",
    sender: "student",
    text: "What about quantum entanglement in memory chips? Does that speed up paging?",
    timestamp: "10:16 AM"
  },
  {
    id: "msg-4",
    sender: "ai",
    text: "⚠️ **Unsupported in Course Material**: The uploaded materials for *CS-301 (Silberschatz Chapters 8-9, Lecture 7 Slides, and Lecture 8 Recording)* do not mention quantum entanglement or quantum memory architecture.\n\nPer ScholarAI course-grounding rules, I do not present ungrounded speculations as course facts. If you'd like, we can explore how hardware TLB (Translation Lookaside Buffers) caches speed up multi-level paging, which is extensively covered in your course material (Lecture 7, Slides 14–22).",
    isUnsupported: true,
    citations: [],
    timestamp: "10:16 AM",
    groundingConfidence: 12.0,
    groundedStatus: "FLAGGED_OFF_SYLLABUS"
  }
];

export const mockQuizQuestions = [
  {
    id: "q-1",
    question: "Suppose an OS uses a two-level page table on a 32-bit system with 4-KB pages. The logical address is split into a 10-bit outer page table index, 10-bit inner page table index, and 12-bit offset. If a process uses only 8 MB of contiguous virtual memory, how many total 4-KB frames are needed to store its page tables (outer + inner)?",
    difficulty: "Medium",
    topic: "Virtual Memory & Paging",
    bloomLevel: "Analyze / Calculate",
    options: [
      { id: "A", text: "1 frame for outer table + 2 frames for inner tables = 3 frames total" },
      { id: "B", text: "1 frame for outer table + 1024 frames for inner tables = 1025 frames total" },
      { id: "C", text: "2 frames for outer table + 4 frames for inner tables = 6 frames total" },
      { id: "D", text: "8 frames total, one for each megabyte" }
    ],
    correctOption: "A",
    explanation: "Each inner page table contains 2^10 = 1024 entries. Each entry maps one 4-KB page, so one inner page table covers 1024 * 4 KB = 4 MB of virtual address space. Since the process uses 8 MB, exactly 2 inner page tables are needed (2 frames). The outer page table takes 1 frame. Total = 1 + 2 = 3 frames.",
    sourceCitation: {
      docName: "Silberschatz OS Concepts (Ch. 9)",
      location: "Page 244, Example 9.3",
      slideRef: "Lecture 7, Slide 31"
    },
    commonMisconception: "Students often mistakenly assume that all 1024 inner page tables must be allocated even when memory is sparse, confusing total possible capacity with dynamic demand allocation."
  },
  {
    id: "q-2",
    question: "In demand paging, what hardware mechanism triggers the operating system to load a page from disk into physical memory?",
    difficulty: "Easy",
    topic: "Virtual Memory & Paging",
    bloomLevel: "Understand",
    options: [
      { id: "A", text: "A timer interrupt sent by the hardware clock" },
      { id: "B", text: "A page fault trap triggered by accessing a page table entry with valid-invalid bit set to 0" },
      { id: "C", text: "A DMA controller signal indicating memory saturation" },
      { id: "D", text: "A context-switch instruction generated by the scheduler" }
    ],
    correctOption: "B",
    explanation: "When an address references an entry marked invalid (bit 0), the MMU hardware generates a page fault trap to the OS kernel, which locates the page in swap/backing store.",
    sourceCitation: {
      docName: "Lecture 8 Video Recording",
      location: "Timestamp 14:15 - 15:40",
      slideRef: "Lecture 7, Slide 8"
    },
    commonMisconception: "Confusing page faults with CPU hardware interrupts or context switching overhead."
  }
];

export const mockLearnerProfile = {
  studentName: "Kaustubh Chavan",
  studentId: "STU-88291",
  streakDays: 6,
  totalQuizzesTaken: 14,
  averageAccuracy: 81.5,
  course: "CS-301: Operating Systems & Distributed Systems",
  topicMastery: [
    { topic: "Process Synchronization", mastery: 92, status: "Mastered", weakAreas: [] },
    { topic: "Virtual Memory & Paging", mastery: 78, status: "Proficient", weakAreas: ["Inverted Page Table lookups"] },
    { topic: "Deadlock Prevention & Avoidance", mastery: 46, status: "Needs Practice", weakAreas: ["Banker's Algorithm State Matrix", "Resource Allocation Graph cycles"] },
    { topic: "File System Implementation", mastery: 84, status: "Proficient", weakAreas: ["Indexed Allocation Inodes"] },
    { topic: "Distributed Consensus (Raft/Paxos)", mastery: 38, status: "Critical Weakness", weakAreas: ["Log Compaction", "Split-brain partition handling"] }
  ],
  forgettingCurveSchedule: [
    { topic: "Virtual Memory - TLB Reach", dueIn: "Today (Due)", priority: "High", sourceRef: "Lecture 7, Slide 18" },
    { topic: "Deadlock Banker's Matrix", dueIn: "Tomorrow", priority: "Urgent", sourceRef: "Silberschatz Ch. 8, p. 320" },
    { topic: "Process Scheduling (CFS)", dueIn: "In 4 days", priority: "Normal", sourceRef: "Lecture 4, Slide 22" }
  ],
  recommendedAction: "Take a 5-question targeted diagnostic on Banker's Algorithm to reinforce state matrix calculation before tomorrow's review cycle."
};
