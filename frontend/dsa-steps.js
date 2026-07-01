// ============================================================
// dsa-steps.js — DATA SECTION (Part 1 of 2)
// Contains: STRUCTURED_DSA_ROADMAP (all 3 levels)
// Beginner weeks 1-4 are here; weeks 5-8 from Part 2A,
// Intermediate from Part 2B, Advanced from Part 2C.
// ============================================================

'use strict';

// ── Day builder helper ──────────────────────────────────────
function d(num, title, goal, explanation, resources, practice, task, time) {
  return { num, title, goal, explanation, resources, practice, task, time };
}

// ── STRUCTURED DSA ROADMAP ──────────────────────────────────
const STRUCTURED_DSA_ROADMAP = (function() {

const beginner = {
  label: "🟢 Beginner", days: 60, totalHours: 120,
  goal: "Core DSA Foundations",
  weeks: [

    // ── Week 1 ──────────────────────────────────────────────
    { week:1, title:"Arrays & Strings Foundations", timeRange:"10–12 hrs",
      days:[
        d(1,"Arrays — Basics & Traversal",
          "Understand array memory layout and master basic traversal patterns.",
          "An array is a contiguous block of memory. In C++: int arr[5] = {1,2,3,4,5}. Zero-indexed. Random access O(1), insertion/deletion O(n). Use size_t or int for indices. Range-based for: for(auto x : arr). STL array: std::array<int,5>. Key operations: find min/max in O(n), reverse in O(n), check sorted in O(n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=arrays+C%2B%2B+beginners+tutorial+data+structures",label:"Arrays C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/array-data-structure/",label:"GFG Arrays Guide"}],
          "Write on paper: traverse array [3,1,4,1,5,9,2,6] finding max, min, and sum.",
          "🚀 TASK: Write C++ programs to (1) find max and min in O(n), (2) reverse array in-place, (3) check if sorted ascending, (4) rotate array right by K positions, (5) find second largest element without sorting.",
          "2 hrs"),
        d(2,"Arrays — Two Pointer Technique",
          "Use two pointers to solve pair problems in O(n) instead of O(n²).",
          "Two pointer technique: use left=0 and right=n-1 pointers moving toward each other. Works on sorted arrays for pair-sum problems. For unsorted: sort first O(n log n). Key insight: if sum too small move left++, if too large move right--. Reduces O(n²) brute force to O(n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=two+pointer+technique+C%2B%2B+array+problems",label:"Two Pointer C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/two-pointers-technique/",label:"GFG Two Pointers"}],
          "On sorted array [1,2,3,4,6,8,9], find all pairs summing to 10 using two pointers on paper.",
          "🚀 TASK: Implement two-pointer solutions for (1) pair with given sum in sorted array, (2) remove duplicates from sorted array in-place, (3) move all zeros to end maintaining relative order, (4) container with most water, (5) three-sum problem.",
          "2 hrs"),
        d(3,"Strings — Basics & Pattern Matching",
          "Master string operations and implement naive pattern matching.",
          "C++ string: std::string. Operations: s.length(), s.substr(i,len), s.find(t), s[i]. Strings are mutable char arrays in C++. Palindrome check: compare s[i] with s[n-1-i]. Anagram: sort both and compare, or use frequency array of 26 chars. Naive pattern matching: O(n*m) — slide pattern over text checking each position.",
          [{type:"yt",url:"https://youtube.com/results?search_query=C%2B%2B+string+manipulation+tutorial+beginners",label:"C++ Strings Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/string-data-structure/",label:"GFG Strings Guide"}],
          "Check if 'racecar' is palindrome by hand. Find pattern 'ab' in 'ababcab' using naive matching.",
          "🚀 TASK: Implement (1) check palindrome, (2) check anagram, (3) count vowels and consonants, (4) reverse words in a sentence, (5) naive pattern search — find all occurrences of pattern in text.",
          "2 hrs"),
        d(4,"Prefix Sums & Sliding Window",
          "Use prefix sums for range queries and sliding window for subarray problems.",
          "Prefix sum: pre[i] = arr[0]+...+arr[i]. Range sum [l,r] = pre[r] - pre[l-1] in O(1) after O(n) build. Sliding window: maintain a window [l,r] expanding r and shrinking l. Fixed window of size k: slide one step at a time — O(n) instead of O(n*k). Variable window: expand until invalid, then shrink.",
          [{type:"yt",url:"https://youtube.com/results?search_query=prefix+sum+sliding+window+C%2B%2B+tutorial+beginners",label:"Prefix Sum & Sliding Window"},{type:"web",url:"https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/",label:"GFG Prefix Sum"}],
          "Build prefix sum for [1,3,5,2,4]. Answer: sum of index 1–3. Find max sum subarray of size 3.",
          "🚀 TASK: Implement (1) build prefix sum and answer range sum queries in O(1), (2) subarray with given sum using prefix sum, (3) maximum sum subarray of size K using sliding window, (4) longest substring with at most K distinct characters, (5) minimum size subarray with sum ≥ S.",
          "2 hrs"),
        d(5,"Sorting — Bubble, Selection, Insertion",
          "Implement O(n²) sorts and understand when they're acceptable.",
          "Bubble sort: swap adjacent out-of-order pairs, repeat n times — O(n²). Optimized: stop early if no swaps. Selection sort: find minimum, place at front, repeat — O(n²), minimum swaps. Insertion sort: insert each element into its correct position in sorted prefix — O(n²) worst, O(n) best for nearly-sorted. All are in-place, O(1) space.",
          [{type:"yt",url:"https://youtube.com/results?search_query=bubble+selection+insertion+sort+C%2B%2B+visualization",label:"O(n²) Sorting Algorithms"},{type:"web",url:"https://visualgo.net/en/sorting",label:"VisuAlgo Sorting"}],
          "Sort [64,25,12,22,11] by hand using selection sort. Count comparisons and swaps.",
          "🚀 TASK: Implement all three with (1) bubble sort with early termination, (2) selection sort counting swaps, (3) insertion sort — also implement binary insertion sort, (4) sort array of strings alphabetically using insertion sort, (5) compare swap counts for all three on same input.",
          "2 hrs"),
        d(6,"Sorting — Merge Sort & Quick Sort",
          "Master O(n log n) sorting: divide and conquer.",
          "Merge sort: split in half recursively, merge two sorted halves — O(n log n) always, O(n) extra space. Stable sort. Quick sort: pick pivot, partition so smaller left, larger right — O(n log n) average, O(n²) worst with bad pivot. In-place, O(log n) stack space. Lomuto partition: simple. Hoare partition: fewer swaps.",
          [{type:"yt",url:"https://youtube.com/results?search_query=merge+sort+quick+sort+C%2B%2B+implementation+tutorial",label:"Merge & Quick Sort C++"},{type:"web",url:"https://www.geeksforgeeks.org/merge-sort/",label:"GFG Merge Sort"}],
          "Trace merge sort on [38,27,43,3,9,82,10]. Draw the recursion tree showing merge steps.",
          "🚀 TASK: Implement (1) merge sort with merge step, (2) quick sort with Lomuto partition, (3) quick sort with random pivot to avoid worst case, (4) count inversions using merge sort, (5) sort linked list using merge sort.",
          "2 hrs"),
        d(7,"Week 1 Review & Practice",
          "Consolidate all Week 1 concepts with timed problem solving.",
          "Review all techniques: two pointers, prefix sums, sliding window, all sorting algorithms. Focus on recognizing which technique applies to which problem type. Time complexity recap: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). Space complexity: always analyze extra space used.",
          [{type:"yt",url:"https://youtube.com/results?search_query=array+string+problems+LeetCode+easy+C%2B%2B+walkthrough",label:"Array Problems Walkthrough"},{type:"web",url:"https://leetcode.com/problemset/?difficulty=EASY&topicSlugs=array",label:"LeetCode Easy Arrays"}],
          "Without code, plan the approach for: (1) find duplicate in array, (2) longest subarray with equal 0s and 1s, (3) sort colors (Dutch flag problem).",
          "🚀 TASK: Timed practice (20 min each): (1) find the missing number in array 1..n, (2) maximum product subarray, (3) longest consecutive sequence, (4) product of array except self, (5) rotate image 90 degrees in-place, (6) spiral matrix traversal.",
          "2 hrs"),
      ],
      project:{ id:"bw1", title:"Array & String Toolkit",
        desc:"A C++ toolkit implementing all Week 1 algorithms: two-pointer pair finder, prefix sum range query engine, variable sliding window analyzer, and all five sorting algorithms with performance comparison. Includes a string processing module for palindrome/anagram detection and pattern search." }
    },

    // ── Week 2 ──────────────────────────────────────────────
    { week:2, title:"Linked Lists & Stacks/Queues", timeRange:"10–12 hrs",
      days:[
        d(8,"Linked Lists — Singly Linked List",
          "Implement singly linked list from scratch with all core operations.",
          "Node struct: {int val; Node* next;}. Head pointer marks start. Operations: insert at head O(1), insert at tail O(n), delete by value O(n), search O(n), reverse O(n). Traversal: while(curr != nullptr) curr = curr->next. Memory: each node allocated separately on heap with new. Must free with delete to avoid memory leaks.",
          [{type:"yt",url:"https://youtube.com/results?search_query=linked+list+C%2B%2B+implementation+from+scratch+tutorial",label:"Linked List C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/data-structures/linked-list/",label:"GFG Linked Lists"}],
          "Draw node chain for 1→2→3→4→5. Trace reverse operation step by step showing pointer changes.",
          "🚀 TASK: Build a complete LinkedList class with (1) insertFront, insertBack, insertAt, (2) deleteFront, deleteBack, deleteByValue, (3) search, length, print, (4) reverse iteratively, (5) check palindrome using slow/fast pointer + stack, (6) find middle node using two pointers.",
          "2.5 hrs"),
        d(9,"Linked Lists — Two Pointer & Cycle Detection",
          "Use Floyd's algorithm and two-pointer techniques on linked lists.",
          "Floyd's cycle detection: slow moves 1 step, fast moves 2 steps. If cycle: they meet inside cycle. No cycle: fast reaches null. Meeting point + head pointer meet at cycle start. Find middle: slow/fast pointers — when fast reaches end, slow is at middle. Nth from end: two pointers gap of n.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Floyd+cycle+detection+linked+list+C%2B%2B+two+pointer",label:"Floyd's Algorithm C++"},{type:"web",url:"https://www.geeksforgeeks.org/floyds-cycle-detection-algorithm/",label:"GFG Floyd's Algorithm"}],
          "Trace Floyd's on list with cycle at node 3. Show slow/fast pointers at each step until meeting.",
          "🚀 TASK: Implement (1) detect cycle using Floyd's, (2) find cycle start node, (3) find middle node, (4) find Kth from end in one pass, (5) merge two sorted linked lists, (6) remove Nth node from end, (7) check if linked list is palindrome.",
          "2 hrs"),
        d(10,"Doubly Linked List & Skip List Intro",
          "Implement doubly linked list; understand skip list structure.",
          "Doubly linked list: each node has prev and next pointers. Enables O(1) deletion if node pointer known, O(1) backward traversal. Sentinel/dummy nodes simplify edge cases. LRU Cache uses doubly LL + hash map: O(1) get/put. Skip list: probabilistic data structure with multiple layers — O(log n) average search/insert/delete, O(n) space.",
          [{type:"yt",url:"https://youtube.com/results?search_query=doubly+linked+list+C%2B%2B+LRU+cache+implementation",label:"Doubly LL & LRU Cache C++"},{type:"web",url:"https://www.geeksforgeeks.org/doubly-linked-list/",label:"GFG Doubly Linked List"}],
          "Draw LRU cache of size 3 with operations: get(1), put(2,2), get(1), put(3,3), put(4,4). Show evictions.",
          "🚀 TASK: Implement (1) doubly linked list with insertFront, insertBack, deleteNode(ptr) in O(1), (2) LRU Cache class with O(1) get and put using doubly LL + unordered_map, (3) flatten a multilevel doubly linked list, (4) sort doubly linked list.",
          "2 hrs"),
        d(11,"Stack — Implementation & Applications",
          "Implement stack and apply to expression evaluation and monotonic problems.",
          "Stack: LIFO — push/pop/top all O(1). Implement with array (fixed) or linked list (dynamic). Applications: balanced parentheses (push open, pop/check on close), next greater element (monotonic stack), expression evaluation (two stacks: operands and operators). Monotonic stack maintains elements in sorted order by popping while invariant violated.",
          [{type:"yt",url:"https://youtube.com/results?search_query=stack+C%2B%2B+monotonic+stack+next+greater+element+tutorial",label:"Stack & Monotonic Stack C++"},{type:"web",url:"https://www.geeksforgeeks.org/stack-data-structure/",label:"GFG Stack"}],
          "Trace next greater element for [4,5,2,25]. Build monotonic stack step by step.",
          "🚀 TASK: Implement (1) stack using array and using linked list, (2) check balanced parentheses, (3) next greater element using monotonic stack, (4) largest rectangle in histogram, (5) evaluate postfix expression, (6) min stack with O(1) getMin.",
          "2 hrs"),
        d(12,"Queue & Deque — Applications",
          "Implement queue/deque and apply to sliding window maximum.",
          "Queue: FIFO — enqueue back, dequeue front — O(1). Circular queue avoids wasted space. Deque (double-ended queue): push/pop at both ends O(1). Sliding window maximum: maintain deque of indices in decreasing order — O(n) total. BFS uses queue. Priority queue (heap) for weighted BFS.",
          [{type:"yt",url:"https://youtube.com/results?search_query=queue+deque+C%2B%2B+sliding+window+maximum+tutorial",label:"Queue & Deque C++"},{type:"web",url:"https://www.geeksforgeeks.org/deque-set-1-introduction-applications/",label:"GFG Deque"}],
          "Find sliding window maximum of [1,3,-1,-3,5,3,6,7] with k=3 using deque on paper.",
          "🚀 TASK: Implement (1) circular queue with array, (2) deque with doubly linked list, (3) sliding window maximum using deque O(n), (4) first negative number in every window of size K, (5) implement queue using two stacks, (6) stock span problem using stack.",
          "2 hrs"),
        d(13,"Hash Maps & Hash Sets",
          "Use unordered_map/unordered_set for O(1) lookups.",
          "Hash map: key→value, O(1) average insert/lookup/delete. unordered_map in C++. Hash set: unique keys only, O(1) operations. Collision handling: chaining (linked lists) or open addressing. Load factor triggers rehashing. Applications: frequency counting, two-sum, anagram grouping, first non-repeating character.",
          [{type:"yt",url:"https://youtube.com/results?search_query=hash+map+unordered_map+C%2B%2B+tutorial+hash+table",label:"Hash Map C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/unordered_map-in-cpp-stl/",label:"GFG unordered_map"}],
          "Manually hash [23,17,46,95,31] into table of size 7 using mod. Show collision for index 3.",
          "🚀 TASK: Use hash maps to solve (1) two sum, (2) group anagrams, (3) longest consecutive sequence in O(n), (4) find first non-repeating character, (5) check if two strings are isomorphic, (6) count distinct elements in every window of size K.",
          "2 hrs"),
        d(14,"Week 2 Review & Practice",
          "Consolidate linked list, stack, queue, and hash map techniques.",
          "Review: linked list pointer manipulation, two-pointer on lists, stack for monotonic problems, deque for sliding window, hash map for O(1) lookups. Common mistakes: forgetting nullptr checks, off-by-one in two pointers, not handling empty structures.",
          [{type:"yt",url:"https://youtube.com/results?search_query=linked+list+stack+queue+problems+LeetCode+C%2B%2B",label:"LL/Stack/Queue Problems"},{type:"web",url:"https://leetcode.com/problemset/?topicSlugs=linked-list",label:"LeetCode Linked List"}],
          "Plan approach for: reorder list L0→Ln→L1→Ln-1... and 'clone list with random pointer'.",
          "🚀 TASK: Timed (25 min each): (1) add two numbers as linked lists, (2) flatten multilevel doubly linked list, (3) trapping rain water using stack, (4) decode string '3[a2[c]]'→'accaccacc' using stack, (5) design hit counter, (6) implement browser history using two stacks.",
          "2 hrs"),
      ],
      project:{ id:"bw2", title:"Data Structures Library",
        desc:"A C++ library implementing LinkedList (singly + doubly), Stack (array + LL), Queue (circular), Deque, and LRU Cache. All with full insert/delete/search. Includes applications: expression evaluator, balanced-parentheses checker, sliding-window-max, and anagram grouper." }
    },

    // ── Week 3 ──────────────────────────────────────────────
    { week:3, title:"Recursion, Binary Search & Heaps", timeRange:"12–14 hrs",
      days:[
        d(15,"Recursion — Foundations & Backtracking",
          "Master recursive thinking; implement backtracking for combinatorics.",
          "Recursion: function calls itself with smaller input. Base case stops recursion. Recursive leap of faith: assume recursive call works, build solution from it. Backtracking: build solution incrementally, abandon partial solutions that cannot work. Pattern: choose → recurse → unchoose. State space tree shows all possibilities.",
          [{type:"yt",url:"https://youtube.com/results?search_query=recursion+backtracking+C%2B%2B+tutorial+beginners+subsets+permutations",label:"Recursion & Backtracking C++"},{type:"web",url:"https://www.geeksforgeeks.org/recursion/",label:"GFG Recursion Guide"}],
          "Draw recursion tree for fibonacci(5). Draw backtracking tree for subsets of {1,2,3}.",
          "🚀 TASK: Implement (1) fibonacci with and without memoization, (2) power(x,n) recursively, (3) generate all subsets of array, (4) generate all permutations, (5) N-Queens problem — place N queens on N×N board, (6) solve Sudoku using backtracking.",
          "2.5 hrs"),
        d(16,"Binary Search — Template & Variants",
          "Master binary search template; apply to search space problems.",
          "Binary search: left=0, right=n-1, mid=(left+right)/2. Compare target with arr[mid]: if equal found, if less right=mid-1, if more left=mid+1. O(log n). Lower bound: first index where arr[i]>=target. Upper bound: first index where arr[i]>target. Search space: apply binary search to answer space (not just arrays).",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+search+C%2B%2B+template+lower+bound+upper+bound+variants",label:"Binary Search Complete Guide C++"},{type:"web",url:"https://www.geeksforgeeks.org/binary-search/",label:"GFG Binary Search"}],
          "Binary search for 7 in [1,3,5,7,9,11,13]. Show mid calculations. Find first and last occurrence of 5 in [1,3,5,5,5,7].",
          "🚀 TASK: Implement (1) standard binary search, (2) find first occurrence, (3) find last occurrence, (4) search in rotated sorted array, (5) find peak element, (6) find minimum in rotated sorted array, (7) koko eating bananas — binary search on answer.",
          "2.5 hrs"),
        d(17,"Heaps & Priority Queue",
          "Implement heap; use priority queue for top-K and scheduling problems.",
          "Min-heap: parent ≤ children. Insert: add at end, bubble up — O(log n). Extract-min: swap root with last, remove, bubble down — O(log n). Build heap from array: O(n). Heap sort: O(n log n). STL priority_queue: max-heap by default. For min-heap: priority_queue<int, vector<int>, greater<int>>. Applications: top-K elements, merge K sorted lists, median stream.",
          [{type:"yt",url:"https://youtube.com/results?search_query=heap+priority+queue+C%2B%2B+implementation+tutorial+heapify",label:"Heap & Priority Queue C++"},{type:"web",url:"https://www.geeksforgeeks.org/heap-data-structure/",label:"GFG Heap Guide"}],
          "Build max-heap from [4,10,3,5,1]. Show heapify process. Extract max twice.",
          "🚀 TASK: Implement (1) min-heap from scratch with insert and extractMin, (2) heap sort, (3) find K largest elements using min-heap of size K, (4) merge K sorted arrays using min-heap, (5) find running median using two heaps (max-heap + min-heap), (6) task scheduler using priority queue.",
          "2.5 hrs"),
        d(18,"Binary Search — Advanced Applications",
          "Apply binary search to complex search-space problems.",
          "Binary search on answer: define feasibility function, binary search over answer range. Key: ensure monotonicity — if K is feasible, K+1 also feasible (or not). Classic problems: allocate books (minimize maximum pages), aggressive cows (maximize minimum distance), capacity to ship within D days.",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+search+on+answer+C%2B%2B+minimize+maximum+allocate+books",label:"BS on Answer Space C++"},{type:"web",url:"https://www.geeksforgeeks.org/binary-search-on-answer/",label:"GFG BS on Answer"}],
          "Model 'ship packages within D days' as binary search: what's the search space? What does feasibility check do?",
          "🚀 TASK: Implement binary search on answer for (1) allocate minimum number of pages, (2) aggressive cows — maximize minimum distance, (3) capacity to ship packages within D days, (4) split array largest sum, (5) find Kth smallest in sorted matrix, (6) median of two sorted arrays O(log(min(m,n))).",
          "2.5 hrs"),
        d(19,"Dynamic Programming — 1D Intro",
          "Understand DP as optimized recursion; solve classic 1D problems.",
          "DP = recursion + memoization (or bottom-up tabulation). Identify: overlapping subproblems + optimal substructure. Top-down: add cache to recursive solution. Bottom-up: fill table from base case. State definition is key. For 1D DP: dp[i] often represents answer for first i elements.",
          [{type:"yt",url:"https://youtube.com/results?search_query=dynamic+programming+introduction+C%2B%2B+1D+dp+memoization+tabulation",label:"DP Introduction C++"},{type:"web",url:"https://www.geeksforgeeks.org/dynamic-programming/",label:"GFG DP Guide"}],
          "Write top-down and bottom-up DP for coin change: coins=[1,2,5], amount=11. Draw dp table.",
          "🚀 TASK: Solve with both top-down and bottom-up DP: (1) climbing stairs (K steps), (2) house robber, (3) minimum coin change, (4) longest increasing subsequence, (5) maximum sum subarray — Kadane's algorithm as DP.",
          "2.5 hrs"),
        d(20,"Greedy Algorithms",
          "Apply greedy strategy: locally optimal choices leading to global optimum.",
          "Greedy: at each step take the locally best choice without looking ahead. Proof required: exchange argument or matroid theory. Classic patterns: activity selection (sort by end time), fractional knapsack (sort by value/weight ratio), Huffman coding (priority queue). Greedy fails when: local optimum ≠ global optimum (0/1 knapsack).",
          [{type:"yt",url:"https://youtube.com/results?search_query=greedy+algorithm+C%2B%2B+activity+selection+fractional+knapsack",label:"Greedy Algorithms C++"},{type:"web",url:"https://www.geeksforgeeks.org/greedy-algorithms/",label:"GFG Greedy Guide"}],
          "Activity selection with [(1,4),(3,5),(0,6),(5,7),(3,9),(5,9),(6,10),(8,11),(8,12),(2,14),(12,16)]. Show greedy choices.",
          "🚀 TASK: Implement greedy for (1) activity selection — maximum non-overlapping intervals, (2) minimum number of coins for change (greedy works for standard denominations), (3) fractional knapsack, (4) job sequencing with deadlines, (5) minimum number of platforms for trains, (6) jump game — can you reach the end?",
          "2 hrs"),
        d(21,"Week 3 Review & Practice",
          "Integrate recursion, binary search, heaps, DP, and greedy.",
          "Pattern recognition: if problem asks for minimum/maximum of something → think DP or binary search on answer. If intervals/scheduling → greedy. If K largest/smallest → heap. If all possibilities needed → backtracking. Distinguishing DP vs greedy: does optimal subproblem solution always combine to optimal overall solution?",
          [{type:"yt",url:"https://youtube.com/results?search_query=dynamic+programming+greedy+binary+search+problems+C%2B%2B+LeetCode",label:"DP/Greedy/BS Problems"},{type:"web",url:"https://leetcode.com/problemset/?topicSlugs=dynamic-programming",label:"LeetCode DP Problems"}],
          "Classify each as DP, Greedy, or BS: (1) edit distance, (2) jump game II (min jumps), (3) search 2D matrix.",
          "🚀 TASK: Timed (25 min each): (1) word break problem, (2) partition equal subset sum, (3) meeting rooms II (min rooms), (4) top K frequent elements, (5) find K closest points to origin, (6) gas station circular route.",
          "2 hrs"),
      ],
      project:{ id:"bw3", title:"Algorithm Toolkit",
        desc:"A C++ algorithm toolkit: binary search engine (all variants), heap-based top-K finder and running median calculator, backtracking suite (subsets, permutations, N-Queens, Sudoku), and DP solver (coin change, LIS, house robber). Includes performance benchmarks comparing approaches." }
    },

    // ── Week 4 ──────────────────────────────────────────────
    { week:4, title:"DP — 2D & Graph Foundations", timeRange:"12–14 hrs",
      days:[
        d(22,"2D Dynamic Programming",
          "Solve 2D grid and string DP problems.",
          "2D DP: dp[i][j] represents answer using first i of one thing and j of another. Grid DP: dp[i][j] = paths to reach (i,j). String DP: dp[i][j] = answer for s1[0..i] and s2[0..j]. LCS: if s1[i]==s2[j] then dp[i][j]=dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]). Edit distance: min of insert/delete/replace.",
          [{type:"yt",url:"https://youtube.com/results?search_query=2D+dynamic+programming+C%2B%2B+LCS+edit+distance+grid+DP",label:"2D DP C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",label:"GFG LCS Guide"}],
          "Fill LCS table for 'ABCBDAB' and 'BDCAB'. Fill edit distance table for 'horse' and 'ros'.",
          "🚀 TASK: Solve with 2D DP: (1) unique paths in grid (with and without obstacles), (2) minimum path sum, (3) longest common subsequence, (4) edit distance, (5) 0/1 knapsack, (6) longest palindromic subsequence.",
          "2.5 hrs"),
        d(23,"Graph Basics — BFS",
          "Represent graphs and implement BFS for shortest path in unweighted graphs.",
          "Graph: vertices + edges. Representation: adjacency list (vector<vector<int>>) for sparse, matrix for dense. BFS: use queue, visit level by level. Guarantees shortest path in unweighted graph. Mark visited to avoid cycles. BFS from source finds distances to all reachable nodes. Applications: shortest path, bipartite check, connected components.",
          [{type:"yt",url:"https://youtube.com/results?search_query=graph+BFS+C%2B%2B+implementation+tutorial+adjacency+list",label:"Graph BFS C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",label:"GFG BFS Guide"}],
          "BFS from node 0 in graph: 0-1, 0-2, 1-3, 2-3, 3-4. Show queue state at each step and distances.",
          "🚀 TASK: Implement (1) BFS on adjacency list, (2) find shortest path in unweighted graph, (3) check if graph is bipartite using BFS, (4) find all connected components, (5) 0-1 matrix — distance of each cell from nearest 0, (6) word ladder: minimum transformations from start to end word.",
          "2.5 hrs"),
        d(24,"Graph — DFS & Topological Sort",
          "Use DFS for cycle detection, topological ordering, and component analysis.",
          "DFS: explore as deep as possible before backtracking. Track visited[] and recursionStack[]. Cycle detection in directed graph: if node in recursion stack → cycle. Topological sort: DFS-based — push to stack on finish, reverse. Only for DAGs. Kahn's algorithm: BFS-based topological sort using in-degree array.",
          [{type:"yt",url:"https://youtube.com/results?search_query=DFS+topological+sort+C%2B%2B+cycle+detection+directed+graph",label:"DFS & Topological Sort C++"},{type:"web",url:"https://www.geeksforgeeks.org/topological-sorting/",label:"GFG Topological Sort"}],
          "DFS from 0 on: 0→1,2; 1→3; 2→3; 3→4. Show discovery/finish times. Topological sort of course prereqs DAG.",
          "🚀 TASK: Implement (1) DFS iterative and recursive, (2) detect cycle in undirected graph, (3) detect cycle in directed graph, (4) topological sort using DFS, (5) topological sort using Kahn's (BFS), (6) find all paths from source to destination in DAG.",
          "2.5 hrs"),
        d(25,"Shortest Paths — Dijkstra's Algorithm",
          "Find shortest paths in weighted graphs using Dijkstra's.",
          "Dijkstra's: greedy algorithm for non-negative weighted graphs. Use min-heap (priority queue). Initialize dist[src]=0, all others=INF. Relax edges: if dist[u]+w < dist[v], update dist[v]. O((V+E)log V) with heap. Fails with negative edges. Applications: GPS routing, network routing, game AI pathfinding.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Dijkstra+algorithm+C%2B%2B+priority+queue+shortest+path",label:"Dijkstra's C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",label:"GFG Dijkstra's"}],
          "Run Dijkstra on weighted graph: src=0, edges: (0,1,4),(0,2,1),(2,1,2),(1,3,1),(2,3,5). Show min-heap and dist array at each step.",
          "🚀 TASK: Implement (1) Dijkstra's with priority queue — return dist array, (2) reconstruct shortest path, (3) Dijkstra on grid (4 or 8 directions), (4) network delay time, (5) cheapest flights with at most K stops using modified Dijkstra/Bellman-Ford.",
          "2.5 hrs"),
        d(26,"Minimum Spanning Tree",
          "Build MST using Prim's and Kruskal's algorithms.",
          "MST: spanning tree with minimum total edge weight. For undirected connected graph. Kruskal's: sort edges by weight, add edge if it doesn't create cycle — use Union-Find. O(E log E). Prim's: grow MST from source using min-heap, always add minimum weight edge to MST — O(E log V). Both yield same weight MST.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Kruskal+Prim+minimum+spanning+tree+C%2B%2B+Union+Find",label:"MST Kruskal's & Prim's C++"},{type:"web",url:"https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",label:"GFG Kruskal's"}],
          "Apply Kruskal's to edges: (1,2,1),(1,3,3),(2,3,1),(2,4,6),(3,5,2),(4,5,5),(4,6,8),(5,6,4). Show Union-Find steps.",
          "🚀 TASK: Implement (1) Union-Find with path compression + union by rank, (2) Kruskal's MST, (3) Prim's MST, (4) number of connected components using Union-Find, (5) connecting cities with minimum cost, (6) redundant connection — find the edge forming a cycle.",
          "2.5 hrs"),
        d(27,"Advanced DP — Interval & Partition DP",
          "Solve problems where DP intervals or partitions are key.",
          "Interval DP: dp[i][j] = answer for subproblem on range [i,j]. Enumerate split point k. Matrix chain: minimize multiplications. Palindrome partitioning: minimum cuts to make all substrings palindromes. Burst balloons: clever reframing — last balloon to burst.",
          [{type:"yt",url:"https://youtube.com/results?search_query=interval+DP+C%2B%2B+matrix+chain+multiplication+palindrome+partition",label:"Interval DP C++ Tutorial"},{type:"web",url:"https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/",label:"GFG Matrix Chain"}],
          "Matrix chain for sizes [30,35,15,5,10,20,25]. Which order minimizes multiplications? Set up dp table.",
          "🚀 TASK: Implement (1) matrix chain multiplication minimum cost, (2) minimum cost to cut a rod, (3) burst balloons, (4) palindrome partitioning minimum cuts, (5) stone merge: minimum cost to merge piles, (6) strange printer — minimum turns to print string.",
          "2.5 hrs"),
        d(28,"Week 4 Review & Practice",
          "Consolidate 2D DP, graph algorithms, and interval DP.",
          "Review: 2D DP state design, BFS/DFS applications, Dijkstra's preconditions (non-negative weights), MST algorithms and Union-Find, interval DP pattern. Graph problem types: shortest path (Dijkstra/BFS), connectivity (BFS/DFS/UF), topological order (DFS/Kahn's), spanning tree (Kruskal/Prim).",
          [{type:"yt",url:"https://youtube.com/results?search_query=graph+dynamic+programming+problems+C%2B%2B+LeetCode+medium",label:"Graph & DP Problems"},{type:"web",url:"https://leetcode.com/problemset/?topicSlugs=graph",label:"LeetCode Graph Problems"}],
          "Choose algorithm for: (1) cheapest route with max 2 stops, (2) islands count in binary matrix, (3) optimal BST construction.",
          "🚀 TASK: Timed (25 min each): (1) number of islands, (2) course schedule II (detect cycle + topo sort), (3) Pacific Atlantic water flow, (4) coin change 2 (count combinations), (5) longest increasing path in matrix, (6) alien dictionary.",
          "2 hrs"),
      ],
      project:{ id:"bw4", title:"Graph & DP Explorer",
        desc:"A C++ graph explorer with adjacency list, BFS shortest path, DFS cycle detection, topological sorter (both DFS and Kahn's), Dijkstra's, Kruskal's MST with Union-Find. DP module covers 2D (grid paths, LCS, 0/1 knapsack) and interval DP (matrix chain). Interactive graph builder." }
    },

  // ← beginner.weeks continues in dsa-part2a-beginner-w5-8.js

// ============================================================
// dsa-steps PART 2A — BEGINNER Weeks 5–8
// Paste after line 248 of dsa-steps.js (after Week 4 project closing `},`)
// replacing the `  ]` and `};` that close beginner.weeks and beginner.
// ============================================================

    // ── Week 5 ──────────────────────────────────────────────────────────────
    { week:5, title:"Trees — Binary Trees & BST", timeRange:"12–14 hrs",
      days:[
        d(29,"Binary Tree Basics",
          "Understand tree structure and implement all four traversals.",
          "A binary tree is a hierarchical structure where each node has at most two children (left and right). Key terms: root, leaf, height (longest root-to-leaf path), depth (distance from root). Node struct: {int val; Node* left; Node* right;}. Create nodes with 'new Node(val)'. Traversals: Inorder (left→root→right) gives sorted output for BST; Preorder (root→left→right) used for serialization; Postorder (left→right→root) used for deletion; Level order uses a queue for BFS.",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+tree+traversal+C%2B%2B+tutorial+inorder+preorder",label:"Binary Tree Traversals C++"},{type:"web",url:"https://www.geeksforgeeks.org/binary-tree-data-structure/",label:"GFG Binary Tree Guide"}],
          "Build a binary tree of height 3 with 7 nodes manually. Trace all four traversals on paper.",
          "🚀 TASK: Implement (1) binary tree node struct and manual construction of 10 nodes, (2) recursive inorder, preorder, postorder traversal, (3) level order using queue — print each level on a new line, (4) count total nodes, count leaf nodes, find height, (5) check if two trees are identical.",
          "2 hrs"),
        d(30,"Binary Search Tree",
          "Implement BST insert, search, and delete with correct pointer management.",
          "BST property: left subtree values < node < right subtree values. This enables O(log n) average search/insert/delete. Insert: traverse left if value < node, right if value > node. Delete has three cases: leaf (just remove), one child (bypass node), two children (replace with inorder successor). BST degenerates to O(n) with sorted input.",
          [{type:"yt",url:"https://youtube.com/results?search_query=BST+insert+delete+search+C%2B%2B+tutorial",label:"BST Operations C++"},{type:"web",url:"https://visualgo.net/en/bst",label:"VisuAlgo BST"}],
          "Insert [5,3,7,1,4,6,8] into BST step by step. Draw the tree. Delete node 3 (two-children case) — find inorder successor.",
          "🚀 TASK: Build a complete BST class with (1) insert (ignore duplicates), (2) search returning true/false, (3) deleteNode — all three cases, (4) findMin and findMax in O(log n), (5) inorder traversal to verify sorted output, (6) check if a binary tree satisfies BST property, (7) find Kth smallest element.",
          "2 hrs"),
        d(31,"Tree Problems — Height, Diameter & LCA",
          "Solve fundamental tree interview problems.",
          "Height: max(height(left), height(right)) + 1. Diameter: longest path between any two nodes — at each node, diameter through it = height(left) + height(right). Take max over all nodes — O(n) single DFS. Balanced: height difference ≤ 1 at every node. LCA: lowest node that has both p and q as descendants — recurse both sides, if both return non-null the root is LCA.",
          [{type:"yt",url:"https://youtube.com/results?search_query=tree+height+diameter+LCA+C%2B%2B+recursive",label:"Tree Height Diameter LCA"},{type:"web",url:"https://leetcode.com/tag/tree/",label:"LeetCode Tree Problems"}],
          "Find diameter of tree 1→{2,3}, 2→{4,5}. Trace LCA(4,5) and LCA(4,3).",
          "🚀 TASK: Implement (1) height of binary tree (recursive), (2) diameter using O(n) approach, (3) check if tree is balanced — O(n), (4) LCA in BST O(log n), (5) LCA in general binary tree O(n), (6) all root-to-leaf paths, (7) sum of root-to-leaf numbers (path 1→2→3 = 123).",
          "2 hrs"),
        d(32,"Tree Views & Level Order Variants",
          "Solve left/right/top/bottom view and zigzag traversal.",
          "Left view: first node at each level. Right view: last node at each level. Top view: first node at each horizontal distance (assign root=0, left=-1, right=+1). Bottom view: last node at each distance. Zigzag: alternate direction each level using deque. Mirror tree: swap left and right children recursively.",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+tree+top+view+right+view+zigzag+C%2B%2B",label:"Tree Views C++"},{type:"web",url:"https://www.geeksforgeeks.org/print-left-view-binary-tree/",label:"GFG Tree Views"}],
          "Draw a tree of depth 4 and identify left, right, top, bottom view nodes by inspection.",
          "🚀 TASK: Implement (1) left view — first node at each level, (2) right view — last node at each level, (3) top view using BFS + horizontal distance map, (4) bottom view using BFS + horizontal distance map, (5) zigzag level-order traversal, (6) mirror binary tree recursively, (7) check if tree is symmetric.",
          "2 hrs"),
        d(33,"Binary Tree Path Problems",
          "Master path-related tree problems: path sum, max path sum.",
          "Path sum: subtract value at each node, return true when leaf with remaining=0 reached. Max path sum: at each node, max contribution from left and right (use 0 if negative). Max path through node = left_max + val + right_max. Update global max, return val + max(left_max, right_max) to parent. Use DFS with path vector for printing all paths.",
          [{type:"yt",url:"https://youtube.com/results?search_query=path+sum+binary+tree+C%2B%2B+all+paths+root+leaf",label:"Tree Path Problems C++"},{type:"web",url:"https://leetcode.com/problems/path-sum/",label:"LeetCode Path Sum"}],
          "On tree [1,2,3,4,5,null,6] find all root-to-leaf paths. Find paths summing to 7.",
          "🚀 TASK: Solve (1) hasPathSum(root, target), (2) print all root-to-leaf paths, (3) print all paths with given sum, (4) maximum path sum in binary tree (any start/end), (5) count all paths with sum = target using prefix sum + DFS, (6) find nodes at distance K from a given target node.",
          "2 hrs"),
        d(34,"Tries & Intro to Segment Trees",
          "Understand trie for string operations and segment tree for range queries.",
          "Trie: each node has children[26] and isEnd flag. Insert: create node if missing per character. Search: return false if any node missing. Segment Tree: leaf nodes = array values, internal node = combined result (sum/min/max). Build O(n), query/update O(log n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=trie+data+structure+C%2B%2B+implementation+tutorial",label:"Trie C++ Implementation"},{type:"web",url:"https://cp-algorithms.com/data_structures/segment_tree.html",label:"CP-Algorithms Segment Tree"}],
          "Insert ['apple','app','application','apply'] into trie. Build segment tree for [1,3,5,7,9,11] and query range sum [1,4].",
          "🚀 TASK: Implement (1) Trie with insert, search, startsWith, countWordsWithPrefix, (2) find longest common prefix using trie, (3) segment tree for range sum with point updates, (4) segment tree for range minimum (RMQ), (5) autocomplete: return all words with given prefix.",
          "2.5 hrs"),
        d(35,"Week 5 Project Day — File System Simulator",
          "Build a tree-based file system simulator.",
          "A file system is a perfect real-world tree. Directories are internal nodes; files are leaf nodes. This consolidates tree construction, traversal, path finding, and search.",
          [{type:"yt",url:"https://youtube.com/results?search_query=file+system+tree+C%2B%2B+implementation+project",label:"File System Tree C++"},{type:"web",url:"https://leetcode.com/problems/design-file-system/",label:"LeetCode File System"}],
          "Design node struct: name, isFile, children map, parent pointer. Plan mkdir, touch, ls, cd, rm operations.",
          "🚀 PROJECT: Build 'File System Simulator': (1) mkdir path — create directory (with -p for intermediate dirs), (2) touch path/file — create file, (3) ls path — list contents sorted alphabetically, (4) cd path — navigate with .. support, (5) rm path — delete file or empty directory, (6) find name — BFS/DFS to locate all files/dirs with given name, (7) tree — print entire directory with indentation like Unix tree, (8) pwd — print current path from root.",
          "3 hrs"),
      ],
      project:{ id:"bw5", title:"File System Simulator",
        desc:"A C++ console application simulating a hierarchical file system using a custom N-ary tree. Each node stores name, type (file/directory), parent pointer, and a map of children. Implements mkdir (with -p), touch, ls (sorted), cd (with .. support), rm/rmdir, find (BFS), tree (indented display), and pwd. Demonstrates tree construction, parent-pointer traversal, DFS/BFS, and recursive deletion." }
    },

    // ── Week 6 ──────────────────────────────────────────────────────────────
    { week:6, title:"Heaps, Priority Queues & Graph Intro", timeRange:"12–14 hrs",
      days:[
        d(36,"Heap Fundamentals",
          "Understand max-heap and min-heap; implement heapify and heap operations.",
          "Heap: complete binary tree stored as array. Max-heap: every parent ≥ children. Array indices: left child = 2i+1, right child = 2i+2, parent = (i-1)/2. Heapify-down: compare with children, swap with larger child if needed — O(log n). Insert: add at end, heapify-up O(log n). Extract-max: swap root with last, reduce size, heapify-down. Build heap from array: heapify-down on each internal node bottom-up — O(n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=heap+data+structure+max+heap+min+heap+C%2B%2B+implementation",label:"Heap Implementation C++"},{type:"web",url:"https://visualgo.net/en/heap",label:"VisuAlgo Heap"}],
          "Build max-heap from [3,1,6,5,2,4]. Show array after each insertion. Extract max twice.",
          "🚀 TASK: Implement (1) max-heap from scratch — insert, extractMax, heapifyDown, heapifyUp, (2) build heap from array in O(n), (3) heap sort — build max-heap then extract all, (4) find Kth largest using min-heap of size K, (5) merge K sorted arrays using min-heap.",
          "2.5 hrs"),
        d(37,"std::priority_queue & Applications",
          "Master C++ priority_queue for competitive programming problems.",
          "std::priority_queue<int> is a max-heap. Min-heap: priority_queue<int, vector<int>, greater<int>>. For custom types use operator< or a comparator lambda. push() O(log n), pop() O(log n), top() O(1). Common pattern: push {-value, index} to simulate min-heap with max-heap.",
          [{type:"yt",url:"https://youtube.com/results?search_query=priority_queue+C%2B%2B+STL+competitive+programming+tutorial",label:"priority_queue C++ STL"},{type:"web",url:"https://cplusplus.com/reference/queue/priority_queue/",label:"cplusplus priority_queue"}],
          "Create max-heap and min-heap with priority_queue. Push pairs {value, index}. Use custom comparator to sort by second element.",
          "🚀 TASK: Solve using priority_queue (1) top K frequent elements, (2) sort nearly sorted array where each element is at most K positions away, (3) median of a data stream — two heaps, (4) connect N ropes with minimum cost (always merge two shortest), (5) task scheduler: minimum time with cooldown.",
          "2 hrs"),
        d(38,"Graphs — Introduction & Representation",
          "Represent graphs using adjacency list and matrix; understand graph terminology.",
          "Graph G = (V, E). Types: undirected, directed, weighted, unweighted. Adjacency matrix: 2D array O(V²) space, O(1) edge lookup. Adjacency list: vector<vector<int>>, O(V+E) space, efficient for sparse graphs. For weighted: vector<vector<pair<int,int>>>. Degree: number of edges at a vertex. In/out-degree for directed graphs.",
          [{type:"yt",url:"https://youtube.com/results?search_query=graph+representation+adjacency+list+matrix+C%2B%2B+tutorial",label:"Graph Representation C++"},{type:"web",url:"https://www.geeksforgeeks.org/graph-and-its-representations/",label:"GFG Graph Representations"}],
          "Build adjacency list and matrix for 5-node graph with edges {(0,1),(0,4),(1,2),(1,3),(1,4),(2,3),(3,4)}.",
          "🚀 TASK: Implement (1) Graph class with adjacency list for directed and undirected graphs, (2) addEdge, removeEdge, hasEdge, getDegree, (3) print both adjacency list and matrix, (4) count total edges, isolated vertices, degree sequence, (5) check if graph is complete, (6) build graph from edge list.",
          "2 hrs"),
        d(39,"BFS & DFS on Graphs",
          "Implement BFS and DFS; use them for connectivity, cycles, and components.",
          "BFS uses a queue — finds shortest path in unweighted graphs. DFS uses recursion — goes deep before backtracking. Both use a visited[] array. For disconnected graphs run from each unvisited vertex to count components. Cycle detection (undirected): DFS — if visited neighbor is not parent, cycle exists. Bipartite check: BFS 2-coloring.",
          [{type:"yt",url:"https://youtube.com/results?search_query=BFS+DFS+graph+C%2B%2B+cycle+detection+connected+components",label:"BFS & DFS Graph C++"},{type:"web",url:"https://visualgo.net/en/dfsbfs",label:"VisuAlgo BFS/DFS"}],
          "Run BFS and DFS from vertex 0 on a 6-vertex graph. Show queue/stack state at each step.",
          "🚀 TASK: Implement (1) BFS — print traversal and level of each vertex, (2) DFS — print traversal, (3) count connected components, (4) cycle detection in undirected graph, (5) cycle detection in directed graph using in-stack array, (6) bipartite check using BFS 2-coloring, (7) shortest path in unweighted graph — print path.",
          "2 hrs"),
        d(40,"Dijkstra's Shortest Path",
          "Implement Dijkstra's algorithm with a priority queue for weighted graphs.",
          "Dijkstra finds single-source shortest paths for non-negative edge weights. Initialize dist[]=INF, dist[source]=0. Push {0, source} to min-heap. While heap non-empty: pop min, skip if already processed. For each neighbor v: if dist[u]+w < dist[v], update dist[v] and push to heap. O((V+E) log V). Fails with negative weights.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Dijkstra+algorithm+C%2B%2B+priority+queue+implementation",label:"Dijkstra C++ Implementation"},{type:"web",url:"https://cp-algorithms.com/graph/dijkstra.html",label:"CP-Algorithms Dijkstra"}],
          "Trace Dijkstra from source 0 on a 5-node graph. Show heap state and dist[] after each vertex is processed.",
          "🚀 TASK: Implement (1) Dijkstra returning dist[] from source, (2) print shortest path using parent[] array, (3) shortest path between specific source and destination, (4) apply to road network — read graph from input, find fastest route, (5) network delay time: minimum time for signal to reach all nodes.",
          "2 hrs"),
        d(41,"Week 6 Project Day — Social Network Analyzer",
          "Build a graph-based social network with BFS friend suggestions.",
          "Social networks are graphs: users = vertices, friendships = edges. Friend suggestions use BFS at distance 2. Mutual friends = intersection of adjacency lists. Influencer = highest degree vertex.",
          [{type:"yt",url:"https://youtube.com/results?search_query=social+network+graph+C%2B%2B+BFS+friend+suggestion",label:"Social Network Graph C++"},{type:"web",url:"https://www.geeksforgeeks.org/graph-based-recommendation-engine/",label:"GFG Graph Recommendations"}],
          "Model 8 users as a graph. Run BFS from user A — who appears at distance 2? Those are friend suggestions.",
          "🚀 PROJECT: Build 'Social Network Analyzer': (1) addUser, addFriendship, (2) BFS friend suggestions — users exactly 2 hops away not already friends, (3) mutual friends between two users, (4) degrees of separation — BFS shortest path, (5) influencer detection — most connections, (6) community detection — connected components, (7) check if entire network is connected, (8) print stats: total users, friendships, avg degree, most connected user.",
          "3 hrs"),
      ],
      project:{ id:"bw6", title:"Social Network Analyzer",
        desc:"A C++ console application modeling a social network as an undirected graph with adjacency lists. Implements addUser, addFriendship, BFS friend suggestions (distance-2 users), mutual friend counting, degree-of-separation via BFS, influencer detection by degree, connected component counting, and network statistics. All graph algorithms implemented from scratch." }
    },

    // ── Week 7 ──────────────────────────────────────────────────────────────
    { week:7, title:"Dynamic Programming — Foundations", timeRange:"14–16 hrs",
      days:[
        d(43,"DP Introduction — Fibonacci & Memoization",
          "Understand overlapping subproblems; convert recursion to DP.",
          "DP solves problems by breaking them into overlapping subproblems and storing results. Two conditions: optimal substructure and overlapping subproblems. Fibonacci recursive: O(2^n). Memoization (top-down): store results in dp[], return stored value if computed — O(n). Tabulation (bottom-up): fill dp[] iteratively from smallest subproblem — O(n), can optimize to O(1) space.",
          [{type:"yt",url:"https://youtube.com/results?search_query=dynamic+programming+introduction+memoization+tabulation+C%2B%2B",label:"DP Introduction C++"},{type:"web",url:"https://www.geeksforgeeks.org/dynamic-programming/",label:"GFG DP Guide"}],
          "Draw recursion tree for fib(6). Circle all duplicate subproblems. Count calls with vs without memoization.",
          "🚀 TASK: Implement Fibonacci using (1) pure recursion — count calls, (2) memoization, (3) tabulation, (4) space-optimized two variables. Then: (5) climbing stairs — n steps, climb 1 or 2 at a time, (6) count ways using 1/2/3 steps, (7) minimum cost climbing stairs.",
          "2 hrs"),
        d(44,"1D DP — House Robber & Decode Ways",
          "Master classic 1D DP patterns.",
          "House Robber: can't rob adjacent houses. dp[i] = max(dp[i-2]+nums[i], dp[i-1]). Space optimize to two variables. Decode Ways: '12' can be 'AB' or 'L'. dp[i] = ways to decode string[:i]. Add dp[i-1] if single digit valid, dp[i-2] if two-digit number 10-26. Unique Paths: dp[i][j] = paths = dp[i-1][j] + dp[i][j-1].",
          [{type:"yt",url:"https://youtube.com/results?search_query=house+robber+decode+ways+dynamic+programming+C%2B%2B",label:"1D DP Problems C++"},{type:"web",url:"https://leetcode.com/tag/dynamic-programming/",label:"LeetCode DP Problems"}],
          "Trace house robber on [2,7,9,3,1]. Fill dp table. Trace decode ways for '226' — show all valid decodings.",
          "🚀 TASK: Solve (1) house robber, (2) house robber II (circular), (3) decode ways, (4) jump game — can you reach last index?, (5) jump game II — minimum jumps, (6) unique paths in m×n grid, (7) unique paths with obstacles. Print dp table for each.",
          "2.5 hrs"),
        d(45,"Longest Subsequences — LCS & LIS",
          "Master the two most important subsequence DP patterns.",
          "LCS: dp[i][j] = LCS of s1[:i] and s2[:j]. If s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]). O(m*n). LIS O(n²): dp[i] = LIS ending at i = 1 + max(dp[j]) for j<i where arr[j]<arr[i]. LIS O(n log n): maintain 'tails' array, binary search for insertion position.",
          [{type:"yt",url:"https://youtube.com/results?search_query=LCS+LIS+dynamic+programming+C%2B%2B+tutorial+explained",label:"LCS & LIS C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/sequences/longest_increasing_subsequence.html",label:"CP-Algorithms LIS"}],
          "Fill LCS table for 'AGGTAB' and 'GXTXAYB'. Compute LIS of [10,9,2,5,3,7,101,18] both O(n²) and O(n log n).",
          "🚀 TASK: Implement (1) LCS length, (2) print actual LCS by backtracking, (3) shortest common supersequence, (4) LIS in O(n²) — print subsequence, (5) LIS in O(n log n), (6) longest bitonic subsequence, (7) number of distinct subsequences of t in s.",
          "2.5 hrs"),
        d(46,"0/1 Knapsack & Subset Sum",
          "Master the knapsack DP pattern.",
          "0/1 Knapsack: dp[i][w] = max value using first i items with weight limit w. If w[i]>w: dp[i][w]=dp[i-1][w], else max(dp[i-1][w], dp[i-1][w-w[i]]+v[i]). Space optimize to 1D processing right-to-left. Subset Sum: boolean dp — can sum s be formed using first i elements? Partition Equal Subset Sum: target = totalSum/2.",
          [{type:"yt",url:"https://youtube.com/results?search_query=0/1+knapsack+dynamic+programming+C%2B%2B+tutorial",label:"0/1 Knapsack C++"},{type:"web",url:"https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",label:"GFG Knapsack"}],
          "Solve knapsack items [{w:2,v:6},{w:2,v:10},{w:3,v:12}] capacity=5. Fill 2D dp table. Trace back selected items.",
          "🚀 TASK: Implement (1) 0/1 knapsack 2D DP — print table and items, (2) 1D space-optimized knapsack, (3) subset sum, (4) count subsets with given sum, (5) partition equal subset sum, (6) minimum subset sum difference, (7) coin change — minimum coins, (8) coin change 2 — count ways.",
          "2.5 hrs"),
        d(47,"DP on Strings — Edit Distance",
          "Solve classic string DP problems.",
          "Edit Distance: minimum insert/delete/replace operations to convert s1 to s2. If s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1], else 1+min(insert, delete, replace). Longest Palindromic Subsequence: LCS of string with its reverse. Palindrome Partitioning: min cuts, dp[i] = min cuts for s[:i]. Wildcard matching: '?' any char, '*' any sequence — DP.",
          [{type:"yt",url:"https://youtube.com/results?search_query=edit+distance+longest+palindromic+subsequence+C%2B%2B+DP",label:"Edit Distance & Palindrome DP"},{type:"web",url:"https://leetcode.com/problems/edit-distance/",label:"LeetCode Edit Distance"}],
          "Fill edit distance table for 'horse' and 'ros'. Find LPS of 'BBABCBCAB'.",
          "🚀 TASK: Solve (1) edit distance — print table and edit operations, (2) longest palindromic subsequence, (3) minimum insertions to make palindrome, (4) palindrome partitioning — minimum cuts, (5) longest palindromic substring, (6) count all palindromic substrings O(n²), (7) wildcard pattern matching.",
          "2.5 hrs"),
        d(48,"2D Grid DP",
          "Apply DP on grids.",
          "Minimum path sum: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Dungeon game: compute backwards — dp[i][j] = min health needed from cell (i,j). Maximal square: dp[i][j] = side length of largest square with bottom-right at (i,j) = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if grid[i][j]==1.",
          [{type:"yt",url:"https://youtube.com/results?search_query=grid+DP+minimum+path+sum+maximal+square+C%2B%2B",label:"Grid DP C++"},{type:"web",url:"https://leetcode.com/problems/minimum-path-sum/",label:"LeetCode Min Path Sum"}],
          "Find minimum path sum in 3×3 grid [[1,3,1],[1,5,1],[4,2,1]]. Find maximal square in binary matrix.",
          "🚀 TASK: Solve (1) minimum path sum top-left to bottom-right, (2) dungeon game, (3) maximal square of 1s, (4) maximal rectangle in binary matrix, (5) unique paths with obstacles, (6) cherry pickup — maximize cherries collected in two passes, (7) egg drop problem.",
          "2.5 hrs"),
        d(49,"Week 7 Project Day — Optimal Route Planner",
          "Combine multiple DP patterns for route optimization.",
          "Route planning embodies DP: shortest paths, optimal scheduling, knapsack-style resource allocation. Selecting the right DP formulation for each sub-problem is the hardest skill in DP.",
          [{type:"yt",url:"https://youtube.com/results?search_query=route+planning+dynamic+programming+C%2B%2B+project",label:"Route Planning DP C++"},{type:"web",url:"https://leetcode.com/problems/unique-paths/",label:"LeetCode Unique Paths"}],
          "Model a 5×5 city grid. Mark some cells as blocked. Find shortest path using grid DP. Add fuel costs.",
          "🚀 PROJECT: Build 'Optimal Route Planner': (1) grid DP — minimum cost path with road weights, (2) blocked roads — track valid paths only, (3) fuel constraint — route minimizing fuel usage, (4) waypoint routing — must visit K required checkpoints (bitmask DP), (5) TSP on small graph (n≤15) using bitmask DP, (6) print the actual optimal route not just cost, (7) compare greedy vs optimal DP — show when greedy fails.",
          "3 hrs"),
      ],
      project:{ id:"bw7", title:"Optimal Route Planner",
        desc:"A C++ application demonstrating DP on grids and graphs. Implements minimum cost path with obstacles (2D DP), waypoint routing with mandatory checkpoints (bitmask DP), fuel-constrained travel (bounded knapsack), and TSP on small graphs (bitmask DP). Reconstructs actual optimal route by backtracking through the DP table. Shows where greedy approaches fail vs optimal DP." }
    },

    // ── Week 8 ──────────────────────────────────────────────────────────────
    { week:8, title:"Graphs — Shortest Paths, MST & Advanced", timeRange:"14–16 hrs",
      days:[
        d(50,"Bellman-Ford & Topological Sort",
          "Handle negative weights; sort directed acyclic graphs topologically.",
          "Bellman-Ford: relax all edges V-1 times — O(V*E). Detects negative cycles by running one more iteration. Floyd-Warshall: all-pairs shortest paths, dp[i][j] = min(dp[i][j], dp[i][k]+dp[k][j]) for each intermediate k — O(V³). Topological Sort (Kahn's): compute in-degrees, enqueue vertices with in-degree 0, process queue, reduce neighbor in-degrees. If not all vertices processed: cycle exists.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Bellman+Ford+topological+sort+C%2B%2B+tutorial",label:"Bellman-Ford & Topo Sort"},{type:"web",url:"https://cp-algorithms.com/graph/bellman_ford.html",label:"CP-Algorithms Bellman-Ford"}],
          "Run Bellman-Ford on graph with a negative edge. Show dist[] after each of V-1 iterations.",
          "🚀 TASK: Implement (1) Bellman-Ford — return dist[] or report negative cycle, (2) Floyd-Warshall — all-pairs, print matrix, (3) detect negative cycles using Floyd-Warshall, (4) topological sort using Kahn's algorithm, (5) topological sort using DFS, (6) detect cycle in directed graph using Kahn's, (7) course schedule II — return valid course order.",
          "2.5 hrs"),
        d(51,"Minimum Spanning Tree — Kruskal & Prim",
          "Find minimum spanning trees using both algorithms.",
          "MST: spanning tree connecting all V vertices with minimum total weight. V-1 edges, no cycles. Kruskal's: sort all edges by weight, add if no cycle forms — use Union-Find, O(E log E). Prim's: always add minimum weight edge connecting tree to non-tree vertex — use min-heap, O((V+E) log V).",
          [{type:"yt",url:"https://youtube.com/results?search_query=Kruskal+Prim+minimum+spanning+tree+C%2B%2B+tutorial",label:"MST Kruskal & Prim C++"},{type:"web",url:"https://visualgo.net/en/mst",label:"VisuAlgo MST"}],
          "Find MST of 6-node graph using both Kruskal's and Prim's. Verify same total weight.",
          "🚀 TASK: Implement (1) Union-Find with path compression and union by rank, (2) Kruskal's MST, (3) Prim's MST using priority_queue, (4) detect cycle using Union-Find, (5) count connected components using Union-Find, (6) minimum cost to connect all cities, (7) redundant connection — find edge to remove to make tree.",
          "2.5 hrs"),
        d(52,"Graph Problems — Islands & Grid BFS",
          "Apply BFS/DFS to grid-based problems.",
          "Grid graphs: each cell is a vertex connected to 4 (or 8) neighbors. Number of Islands: DFS from each unvisited '1', mark connected '1's visited. Multi-source BFS: start BFS simultaneously from multiple sources (gates, rotten oranges). Surrounded Regions: mark 'O's connected to border safe, flip remaining to 'X'. Pacific Atlantic: run BFS backwards from each ocean.",
          [{type:"yt",url:"https://youtube.com/results?search_query=number+of+islands+BFS+DFS+grid+C%2B%2B+LeetCode",label:"Grid BFS/DFS Problems C++"},{type:"web",url:"https://leetcode.com/problems/number-of-islands/",label:"LeetCode Number of Islands"}],
          "Count islands in a 5×5 grid. Trace DFS showing which cells are visited per island.",
          "🚀 TASK: Solve (1) number of islands using DFS, (2) max area of island, (3) walls and gates — multi-source BFS, (4) surrounded regions — flip non-border 'O' groups, (5) pacific atlantic water flow, (6) rotting oranges — multi-source BFS minimum time, (7) word ladder — BFS on implicit graph.",
          "2.5 hrs"),
        d(53,"Bridges, Articulation Points & SCC",
          "Find structural weak points and strongly connected components.",
          "Bridges: edges whose removal disconnects the graph. Articulation points: vertices whose removal disconnects the graph. Use DFS with discovery time disc[u] and lowest reachable time low[u]. Bridge: edge (u,v) is bridge if low[v] > disc[u]. SCC (Kosaraju's): (1) DFS on original, record finish order; (2) transpose graph; (3) DFS on transposed in reverse finish order — each DFS tree is one SCC.",
          [{type:"yt",url:"https://youtube.com/results?search_query=bridges+articulation+points+SCC+Kosaraju+C%2B%2B+Tarjan",label:"Bridges & SCC C++"},{type:"web",url:"https://cp-algorithms.com/graph/strongly-connected-components.html",label:"CP-Algorithms SCC"}],
          "Find SCCs in graph: 0→1, 1→2, 2→0, 1→3, 3→4. Find bridges in an undirected graph.",
          "🚀 TASK: Implement (1) find all bridges using Tarjan's, (2) find all articulation points, (3) Kosaraju's SCC — print all SCCs, (4) check if directed graph is strongly connected, (5) number of provinces using Union-Find, (6) critical connections in network, (7) build condensation DAG of SCCs.",
          "2.5 hrs"),
        d(54,"Euler Path & Advanced Graph Topics",
          "Find Euler paths; apply remaining advanced graph algorithms.",
          "Euler path: visits every edge exactly once. Exists if exactly 0 or 2 vertices have odd degree. Hierholzer's algorithm: DFS with edge removal, build path in reverse. Hamiltonian path visits every vertex exactly once — NP-complete, solvable with bitmask DP for small n. Union-Find applications: Kruskal's, online connectivity.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Euler+path+Hierholzer+algorithm+C%2B%2B+Hamilton",label:"Euler & Hamilton Path C++"},{type:"web",url:"https://cp-algorithms.com/graph/euler_path.html",label:"CP-Algorithms Euler"}],
          "Check if a graph has an Euler circuit or path by checking odd-degree vertices. Apply Hierholzer's.",
          "🚀 TASK: Implement (1) check existence of Euler path/circuit, (2) Hierholzer's to find Euler path, (3) reconstruct itinerary from airline tickets (Euler path on directed graph), (4) Hamiltonian path with bitmask DP for n≤15, (5) alien dictionary — character ordering via topological sort, (6) longest path in DAG using DP on topological order.",
          "2.5 hrs"),
        d(55,"Shortest Path Advanced — A* & Multi-Source",
          "Apply A* search and multi-source BFS for practical routing problems.",
          "A* extends Dijkstra with a heuristic h(v) estimating distance to goal. f(v) = g(v) + h(v) where g(v) = actual distance from source. Admissible heuristic (never overestimates) guarantees optimality. Manhattan distance is admissible for grid graphs. Multi-source Dijkstra: initialize multiple sources with dist=0 simultaneously — finds nearest source for every vertex.",
          [{type:"yt",url:"https://youtube.com/results?search_query=A+star+search+algorithm+C%2B%2B+heuristic+grid+pathfinding",label:"A* Search C++"},{type:"web",url:"https://www.geeksforgeeks.org/a-search-algorithm/",label:"GFG A* Algorithm"}],
          "Trace A* on a 5×5 grid with obstacles using Manhattan distance heuristic. Compare nodes expanded vs Dijkstra.",
          "🚀 TASK: Implement (1) A* on grid with Manhattan heuristic, (2) compare A* vs Dijkstra — nodes expanded, (3) multi-source Dijkstra: find nearest facility for every vertex, (4) bidirectional Dijkstra: search from both source and destination, (5) K shortest paths using modified Dijkstra, (6) shortest path with exactly K edges using matrix exponentiation.",
          "2.5 hrs"),
        d(56,"Week 8 Project Day — GPS Navigation System",
          "Build a complete GPS system using shortest paths, MST, and topological ordering.",
          "This final Beginner project synthesizes ALL graph algorithms from Weeks 6–8. A GPS system requires Dijkstra for routing, MST for network infrastructure, topological sort for step-by-step directions, and BFS for POI search.",
          [{type:"yt",url:"https://youtube.com/results?search_query=GPS+navigation+Dijkstra+C%2B%2B+graph+project",label:"GPS Navigation C++ Project"},{type:"web",url:"https://www.geeksforgeeks.org/applications-of-graph-data-structure/",label:"GFG Graph Applications"}],
          "Model a city as a weighted graph: intersections=vertices, roads=weighted edges. Plan which algorithm handles each feature.",
          "🚀 PROJECT: Build 'GPS Navigation System': (1) city graph — read intersections and roads with distances/times, (2) shortest route — Dijkstra with path reconstruction, (3) alternative routes — K shortest paths, (4) infrastructure planning — MST for minimum roads to connect all intersections, (5) navigation instructions — topological sort for step-by-step directions, (6) nearest POI — multi-source BFS from all POIs, (7) traffic update — change edge weight and recompute, (8) isochrone map — all locations reachable within T minutes.",
          "3.5 hrs"),
      ],
      project:{ id:"bw8", title:"GPS Navigation System",
        desc:"A C++ GPS routing system on a weighted city graph. Features: Dijkstra shortest route with path reconstruction, K shortest paths, Prim's MST for infrastructure, topological sort for navigation instructions, multi-source BFS for nearest POI, dynamic edge-weight updates, and isochrone computation. Integrates all graph algorithms from Weeks 6–8." }
    },

  ]  // ← closes beginner.weeks array
};   // ← closes beginner object
// ============================================================
// dsa-steps PART 2B — INTERMEDIATE level (90 days, 9 weeks)
// Paste after the beginner closing `};` from Part 2A
// ============================================================

const intermediate = {
  label: "🟡 Intermediate", days: 90, totalHours: 180,
  goal: "Advanced DSA + Problem Solving",
  weeks: [

    // ── Week 1 ──────────────────────────────────────────────────────────────
    { week:1, title:"Advanced Sorting & Divide and Conquer", timeRange:"14–16 hrs",
      days:[
        d(1,"Counting Sort, Radix Sort & Bucket Sort",
          "Master linear-time sorting algorithms and understand when O(n) sorting is possible.",
          "Comparison-based sorting has lower bound O(n log n). Counting Sort: frequency array of size (max-min+1), compute prefix sums for positions — O(n+k). Radix Sort: sort digit by digit from least to most significant using stable counting sort — O(d*(n+k)). Bucket Sort: distribute into buckets, sort each with insertion sort, concatenate — O(n) average for uniform input.",
          [{type:"yt",url:"https://youtube.com/results?search_query=counting+sort+radix+sort+bucket+sort+C%2B%2B+linear+time",label:"Linear Sort Algorithms C++"},{type:"web",url:"https://www.geeksforgeeks.org/counting-sort/",label:"GFG Counting Sort"}],
          "Sort [4,2,2,8,3,3,1] with counting sort — show frequency array and prefix sums. Sort ['abc','def','aac','aab'] with radix sort.",
          "🚀 TASK: Implement (1) counting sort with negative number handling, (2) radix sort for positive integers, (3) bucket sort for floats in [0,1), (4) sort strings using radix sort, (5) quickselect for Kth smallest in O(n) average, (6) sort 0s 1s 2s in one pass — Dutch National Flag, (7) sort array where all elements are within [0, n²-1] efficiently.",
          "2.5 hrs"),
        d(2,"Divide and Conquer — Advanced Problems",
          "Apply divide and conquer beyond sorting: closest pair and fast power.",
          "Closest Pair of Points: divide by median x, find closest in each half, check crossing strip — O(n log n) vs O(n²) brute force. Fast Power: a^n = a^(n/2)*a^(n/2) if n even — O(log n). Matrix Exponentiation: a^n using binary exponentiation on matrices — enables Fibonacci in O(log n). Karatsuba: multiply large numbers in O(n^1.585).",
          [{type:"yt",url:"https://youtube.com/results?search_query=closest+pair+points+divide+conquer+C%2B%2B+Strassen",label:"D&C Advanced Problems C++"},{type:"web",url:"https://www.geeksforgeeks.org/closest-pair-of-points-using-divide-and-conquer-algorithm/",label:"GFG Closest Pair"}],
          "Trace closest pair on 8 points. What happens in the strip-crossing phase?",
          "🚀 TASK: Implement (1) fast power a^n mod p in O(log n), (2) matrix exponentiation — Fibonacci in O(log n), (3) closest pair of points in O(n log n), (4) count inversions using merge sort, (5) median of medians in O(n) worst case, (6) Strassen's 2×2 matrix multiply, (7) Karatsuba large number multiplication.",
          "2.5 hrs"),
        d(3,"Two Pointers & Sliding Window Advanced",
          "Master all variants of two-pointer and sliding window.",
          "3Sum: fix one element, apply two-pointer for remaining pair O(n²). Trapping rain water: two pointers tracking maxLeft and maxRight — O(n) time O(1) space. Variable sliding window: expand right, shrink left when constraint violated. Minimum window substring: find smallest window in s containing all chars of t.",
          [{type:"yt",url:"https://youtube.com/results?search_query=two+pointers+sliding+window+advanced+C%2B%2B+3sum+rain+water",label:"Two Pointers Advanced C++"},{type:"web",url:"https://leetcode.com/tag/two-pointers/",label:"LeetCode Two Pointers"}],
          "Trace trapping rain water on [0,1,0,2,1,0,1,3,2,1,2,1]. Show maxLeft/maxRight at each step — total should be 6.",
          "🚀 TASK: Solve (1) 3Sum, (2) 4Sum, (3) container with most water, (4) trapping rain water O(n) O(1), (5) minimum window substring, (6) longest substring with at most K distinct characters, (7) maximum of all subarrays of size K, (8) find all anagrams of pattern in string.",
          "2.5 hrs"),
        d(4,"Binary Search Advanced — Search on Answer",
          "Apply binary search on the answer space for optimization problems.",
          "Binary search on answer: when the answer is monotonic — if value X is achievable, X-1 is also achievable. lo=min_possible, hi=max_possible, check(mid) = can we achieve mid? Koko Eating Bananas: binary search on speed. Minimizing maximum: split array into K parts minimizing largest sum.",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+search+on+answer+C%2B%2B+koko+bananas+painter+partition",label:"Binary Search on Answer"},{type:"web",url:"https://leetcode.com/discuss/study-guide/786126/",label:"LeetCode BS on Answer"}],
          "Koko bananas: piles=[3,6,7,11], hours=8. Trace binary search on speed values 1 to 11.",
          "🚀 TASK: Apply binary search on answer for (1) Koko eating bananas, (2) ship packages within D days, (3) split array largest sum, (4) book allocation, (5) sqrt using binary search with 10^-6 precision, (6) aggressive cows — maximize minimum distance, (7) painter's partition.",
          "2.5 hrs"),
        d(5,"Bit Manipulation",
          "Master bitwise operations for optimization.",
          "Key tricks: check bit i: (n>>i)&1. Set: n|(1<<i). Clear: n&~(1<<i). Toggle: n^(1<<i). n&(n-1) clears lowest set bit. Power of 2: n&(n-1)==0. XOR properties: a^a=0, a^0=a. XOR of same numbers cancels — find single element. Bitmask: integer bit i = whether item i is in set.",
          [{type:"yt",url:"https://youtube.com/results?search_query=bit+manipulation+tricks+C%2B%2B+XOR+bitmask+tutorial",label:"Bit Manipulation C++"},{type:"web",url:"https://www.geeksforgeeks.org/bits-manipulation-important-tactics/",label:"GFG Bit Tricks"}],
          "Work out: 29&15, 29|15, 29^15. Find single number in [4,1,2,1,2] using XOR. Is 64 a power of 2?",
          "🚀 TASK: Solve (1) count set bits — Brian Kernighan, (2) power of 2 check, (3) single number in array where all appear twice, (4) two non-repeating elements using XOR + bit grouping, (5) reverse bits of 32-bit integer, (6) generate all subsets using bitmask (0 to 2^n-1), (7) bitmask DP TSP for n≤15, (8) XOR of all numbers 1 to N using pattern.",
          "2.5 hrs"),
        d(6,"Advanced Recursion & Backtracking with Pruning",
          "Solve harder backtracking with aggressive pruning.",
          "Efficient backtracking prunes branches that cannot lead to solutions. N-Queens with bitmask: three bitmasks for column, diagonal, anti-diagonal — O(1) conflict check. Sudoku with constraint propagation: maintain possible values per cell, update on placement. Word break: can string be segmented into dictionary words — memoized recursion.",
          [{type:"yt",url:"https://youtube.com/results?search_query=advanced+backtracking+pruning+sudoku+N-queens+bitmask+C%2B%2B",label:"Advanced Backtracking C++"},{type:"web",url:"https://www.geeksforgeeks.org/backtracking-introduction/",label:"GFG Backtracking Advanced"}],
          "Solve 4-Queens with bitmask approach. How many branches are pruned vs naive?",
          "🚀 TASK: Implement (1) N-Queens with bitmask O(1) conflict check — count solutions for N=8, (2) Sudoku solver with constraint propagation, (3) knight's tour on NxN board, (4) generate valid IP addresses from digit string, (5) expression add operators to reach target, (6) palindrome partitioning — all ways, (7) word break II — all valid segmentations.",
          "2.5 hrs"),
        d(7,"Week 1 Project — Algorithm Benchmark Suite",
          "Build a comprehensive benchmarking tool comparing all sorting algorithms.",
          "Generate random, sorted, reverse-sorted, nearly-sorted inputs. Measure actual runtime using chrono, count comparisons and swaps. Visualize results with ASCII bar charts.",
          [{type:"yt",url:"https://youtube.com/results?search_query=C%2B%2B+algorithm+benchmarking+chrono+sorting+comparison",label:"C++ Benchmarking"},{type:"web",url:"https://en.cppreference.com/w/cpp/chrono",label:"cppreference chrono"}],
          "Plan metrics: time, comparisons, swaps. Plan four input types at sizes 1K, 10K, 100K.",
          "🚀 PROJECT: Build 'Algorithm Benchmark Suite': (1) all sorting algorithms: bubble, selection, insertion, merge, quick (3 pivot strategies), heap, counting, radix, (2) generate test data: random, sorted, reverse, nearly-sorted at 1K/10K/100K, (3) measure time via chrono::high_resolution_clock, count comparisons and swaps, (4) results table: algorithm × input_type × metric, (5) binary search variants: recursive, iterative, lower_bound, upper_bound, (6) detect which algorithm excels on which input type, (7) ASCII bar chart comparing runtimes.",
          "3 hrs"),
      ],
      project:{ id:"iw1", title:"Algorithm Benchmark Suite",
        desc:"A C++ benchmarking application measuring all major sorting algorithms across four input types (random, sorted, reverse, nearly-sorted) at 1K/10K/100K sizes. Measures wall-clock time via chrono, comparison counts, and swap counts. Formatted results table and ASCII bar chart. Includes all quicksort pivot strategies and binary search variant benchmarks." }
    },

    // ── Week 2 ──────────────────────────────────────────────────────────────
    { week:2, title:"Advanced Trees — Segment Trees & BIT", timeRange:"14–16 hrs",
      days:[
        d(8,"AVL Trees",
          "Implement AVL rotations to maintain O(log n) on all inputs.",
          "AVL tree: BST with balance factor (height difference left/right) ≤ 1 everywhere. After insert/delete check balance on path to root. Four rotation cases: LL (right rotation), RR (left rotation), LR (left+right), RL (right+left). Store height in each node. Guarantees O(log n) regardless of insertion order.",
          [{type:"yt",url:"https://youtube.com/results?search_query=AVL+tree+rotations+C%2B%2B+implementation+insert+delete",label:"AVL Tree C++"},{type:"web",url:"https://visualgo.net/en/bst",label:"VisuAlgo AVL"}],
          "Insert [1,2,3,4,5] into AVL tree. Show imbalance after each insertion and which rotation fixes it.",
          "🚀 TASK: Build AVL tree with (1) insert with all four rotations, (2) delete with rebalancing, (3) search O(log n), (4) print balance factors at each node, (5) verify AVL property after every operation, (6) compare height: AVL vs BST on sorted input [1..10], (7) demonstrate: 100 sorted inserts, height stays ≤ 7.",
          "2.5 hrs"),
        d(9,"Segment Tree with Lazy Propagation",
          "Master lazy propagation for range update + range query in O(log n).",
          "Without lazy propagation, range updates require O(n). Lazy propagation defers updates — store pending update in lazy[] array. Before querying/updating a node, push its lazy value to children first. Build O(n). Update range [l,r]: O(log n). Query range [l,r]: O(log n). Applications: range sum + range add, range min + range set.",
          [{type:"yt",url:"https://youtube.com/results?search_query=segment+tree+lazy+propagation+C%2B%2B+range+update+query",label:"Lazy Propagation C++"},{type:"web",url:"https://cp-algorithms.com/data_structures/segment_tree.html",label:"CP-Algorithms Segment Tree"}],
          "Build segment tree for [1,3,5,7,9,11]. Range update: add 3 to indices 1-4. Show lazy[] state. Query sum [0-5].",
          "🚀 TASK: Implement segment tree with lazy propagation for (1) range sum + range add update, (2) range min + range set update, (3) range XOR + range XOR update, (4) count elements > X in range, (5) range flip (0↔1) with count-of-1s query, (6) merge sort tree — segment tree where each node stores sorted subarray for O(log²n) range count queries.",
          "2.5 hrs"),
        d(10,"Fenwick Tree (BIT)",
          "Implement BIT for prefix sums in O(log n) with minimal code.",
          "BIT: each index i is responsible for range determined by lowbit(i) = i&(-i). Update(i, delta): i += lowbit(i). Query(i): prefix sum 1 to i — i -= lowbit(i). O(log n) both operations. 2D BIT for rectangular range sums. Inversion count: coordinate compress then count greater elements using BIT.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Fenwick+tree+binary+indexed+tree+C%2B%2B+tutorial+implementation",label:"Fenwick Tree C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/data_structures/fenwick.html",label:"CP-Algorithms BIT"}],
          "Build BIT for [3,2,4,5,1,6]. Query prefix sum [1..4]. Update index 3 by +2.",
          "🚀 TASK: Implement (1) BIT with update and prefix query, (2) range sum using two BITs, (3) count inversions using BIT, (4) Kth smallest via binary search on BIT, (5) 2D BIT for rectangular range sums, (6) smaller elements to the right using BIT + coordinate compression, (7) compare BIT vs segment tree — code length, limitations.",
          "2.5 hrs"),
        d(11,"Sparse Table & Binary Lifting LCA",
          "O(1) RMQ after O(n log n) preprocessing; LCA using binary lifting.",
          "Sparse Table: table[i][j] = min of interval [i, i+2^j-1]. Build O(n log n). Query [l,r]: find k = floor(log2(r-l+1)), min of table[l][k] and table[r-2^k+1][k] — O(1). Binary Lifting for LCA: precompute ancestors at powers of 2. To find LCA(u,v): equalize depths, then binary-lift both simultaneously until they meet.",
          [{type:"yt",url:"https://youtube.com/results?search_query=sparse+table+RMQ+binary+lifting+LCA+C%2B%2B+tutorial",label:"Sparse Table & Binary Lifting"},{type:"web",url:"https://cp-algorithms.com/data_structures/sparse-table.html",label:"CP-Algorithms Sparse Table"}],
          "Build sparse table for [2,4,3,1,6,7,8,9,1,7]. Query RMQ for all ranges of length 4.",
          "🚀 TASK: Implement (1) sparse table O(n log n) build and O(1) RMQ, (2) binary lifting LCA — precompute ancestors at powers of 2, (3) LCA queries in O(log n), (4) verify sparse table vs brute force on random inputs, (5) RMQ to LCA reduction via Euler tour, (6) max element in every window of K using sparse table vs deque.",
          "2.5 hrs"),
        d(12,"Heavy-Light Decomposition",
          "Efficient path queries on trees using HLD + segment tree.",
          "HLD decomposes tree paths into O(log n) chains. Each node's heavy child has the largest subtree. Heavy edges form chains with contiguous positions in a flattened array. Build segment tree on this array. Path query (u to v): find LCA, decompose into chains, query segment tree on each — O(log²n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=heavy+light+decomposition+HLD+C%2B%2B+tutorial+tree+paths",label:"HLD C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/graph/hld.html",label:"CP-Algorithms HLD"}],
          "Decompose a 10-node tree into heavy chains. Show the flattened array positions for each node.",
          "🚀 TASK: Implement (1) HLD preprocessing: parent, depth, subtree size, heavy child, chain head, position, (2) segment tree on HLD positions, (3) path sum query u to v, (4) path max query u to v, (5) point update + propagate, (6) subtree sum using DFS in/out times, (7) combine HLD with LCA for weighted-edge path queries.",
          "2.5 hrs"),
        d(13,"Treap & DSU Advanced",
          "Randomized self-balancing BST; weighted and rollback DSU.",
          "Treap: BST + heap combined. Each node has key (BST property) and random priority (heap property). Fundamental operations: split and merge. Insert = split + merge. Delete = split around key + merge parts. Expected O(log n). Rollback DSU: union by rank WITHOUT path compression — stores union history on stack for undo operations.",
          [{type:"yt",url:"https://youtube.com/results?search_query=treap+DSU+rollback+C%2B%2B+implementation",label:"Treap & Rollback DSU"},{type:"web",url:"https://cp-algorithms.com/data_structures/treap.html",label:"CP-Algorithms Treap"}],
          "Insert [5,3,7,1,6,4,2] into treap with random priorities. Show how heap + BST properties are maintained.",
          "🚀 TASK: Implement (1) treap with split and merge, (2) insert, delete, search using split/merge, (3) Kth element using subtree size augmentation, (4) range count using treap, (5) rollback DSU with undo() using stack, (6) offline LCA using DSU, (7) implicit treap — array with O(log n) split, merge, reverse.",
          "2.5 hrs"),
        d(14,"Week 2 Project — Range Query Engine",
          "Build a benchmarked library of all range query data structures.",
          "Compare Sparse Table, Segment Tree, Lazy Segment Tree, and BIT for correctness and performance on 10^5 elements and 10^5 queries.",
          [{type:"yt",url:"https://youtube.com/results?search_query=range+query+data+structures+comparison+C%2B%2B+segment+tree+BIT",label:"Range Query Structures C++"},{type:"web",url:"https://codeforces.com/blog/entry/18051",label:"Codeforces Range Query Guide"}],
          "Plan which structure supports which queries: Sparse Table (RMQ, no updates), BIT (prefix sums), Seg Tree (any op), Lazy Seg Tree (range updates).",
          "🚀 PROJECT: Build 'Range Query Engine': (1) all four structures: Sparse Table O(1) RMQ, BIT O(log n) prefix sum, Segment Tree, Lazy Segment Tree, (2) benchmark: 10^5 elements + 10^5 queries — measure time per structure, (3) support: range min, max, sum, XOR, GCD, (4) stress test vs brute-force O(n) for correctness, (5) demonstrate lazy propagation speedup vs naive range updates, (6) 2D BIT for rectangular range sums.",
          "3.5 hrs"),
      ],
      project:{ id:"iw2", title:"Range Query Engine",
        desc:"A C++ library benchmarking four range query structures: Sparse Table (O(1) RMQ), BIT (O(log n) point update + prefix sum), Segment Tree (O(log n) any associative operation), Lazy Segment Tree (O(log n) range update + query). Benchmarks on 10^5 queries for min/max/sum/XOR/GCD. Correctness verified by stress testing against O(n) brute force. Demonstrates lazy propagation speedup." }
    },

    // ── Week 3 ──────────────────────────────────────────────────────────────
    { week:3, title:"Advanced Graph Algorithms", timeRange:"14–16 hrs",
      days:[
        d(15,"Network Flow — Edmonds-Karp",
          "Compute maximum flow using BFS augmenting paths.",
          "Max flow: maximum flow from source to sink in a capacitated directed graph. Residual graph: for edge (u,v) with capacity c and flow f, add forward edge with remaining c-f and backward edge with capacity f. Edmonds-Karp: BFS for augmenting path, send bottleneck flow, repeat — O(VE²). Max-flow min-cut theorem: max flow = min cut.",
          [{type:"yt",url:"https://youtube.com/results?search_query=max+flow+Ford+Fulkerson+Edmonds+Karp+C%2B%2B+tutorial",label:"Max Flow C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/graph/edmonds_karp.html",label:"CP-Algorithms Edmonds-Karp"}],
          "Find max flow in a 6-node network step by step. After each augmenting path update residual graph.",
          "🚀 TASK: Implement (1) Edmonds-Karp with BFS augmenting paths, (2) find min cut after max flow, (3) bipartite matching using max flow, (4) maximum bipartite matching, (5) project selection: profitable projects with machine costs — max flow, (6) Dinic's algorithm O(V²E) using level graph.",
          "2.5 hrs"),
        d(16,"Topological Sort Applications",
          "Apply topological sort for scheduling and dependency resolution.",
          "Kahn's algorithm: in-degree array, enqueue 0-degree vertices, process reducing neighbor in-degrees. All vertices processed = valid topo order; else cycle exists — O(V+E). Longest path in DAG: relax edges in topological order O(V+E). Alien dictionary: given sorted alien words, determine character ordering using topological sort.",
          [{type:"yt",url:"https://youtube.com/results?search_query=topological+sort+Kahn+algorithm+applications+C%2B%2B",label:"Topo Sort Applications C++"},{type:"web",url:"https://www.geeksforgeeks.org/topological-sorting/",label:"GFG Topological Sort"}],
          "Find topological order for course graph with prerequisites. Apply both Kahn's and DFS-based.",
          "🚀 TASK: Implement (1) Kahn's topological sort, (2) DFS-based topo sort, (3) course schedule: can you finish all courses? (4) course schedule II: return valid order, (5) longest path in DAG, (6) alien dictionary character ordering, (7) detect all cycles in directed graph.",
          "2.5 hrs"),
        d(17,"Graph Coloring & Bipartite Matching",
          "Color graphs and find maximum bipartite matchings.",
          "Graph coloring: assign colors so no adjacent vertices share color. Greedy coloring processes vertices in some order. Bipartite: 2-colorable. Hopcroft-Karp bipartite matching: O(√V * E) using BFS to find multiple augmenting paths in each phase. König's theorem: max matching = min vertex cover in bipartite graphs.",
          [{type:"yt",url:"https://youtube.com/results?search_query=graph+coloring+bipartite+matching+Hopcroft+Karp+C%2B%2B",label:"Bipartite Matching C++"},{type:"web",url:"https://cp-algorithms.com/graph/kuhn_algorithm.html",label:"CP-Algorithms Bipartite Matching"}],
          "Find max bipartite matching with Hungarian/Kuhn's algorithm. Verify König's theorem.",
          "🚀 TASK: Implement (1) greedy graph coloring, (2) check bipartite and 2-color, (3) m-coloring with backtracking, (4) Kuhn's bipartite matching (DFS augmenting path), (5) Hopcroft-Karp O(√V * E), (6) verify König's theorem on example, (7) exam scheduling as graph coloring.",
          "2.5 hrs"),
        d(18,"Aho-Corasick Multi-Pattern Matching",
          "Build automaton for simultaneous multi-pattern search in O(n+m+z).",
          "Aho-Corasick: build trie of patterns, compute failure links (like KMP) and output links. Process text character-by-character following trie transitions (or failure links on mismatch) — collect all pattern matches. Build O(sum of pattern lengths), search O(n + total matches). Used in network intrusion detection, spam filtering.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Aho+Corasick+algorithm+C%2B%2B+multi+pattern+matching",label:"Aho-Corasick C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/string/aho_corasick.html",label:"CP-Algorithms Aho-Corasick"}],
          "Build Aho-Corasick for patterns {'he','she','his','hers'}. Search 'ushers' — trace state transitions.",
          "🚀 TASK: Implement (1) build trie with failure and output links, (2) search text reporting all occurrences with positions, (3) count each pattern's occurrences, (4) find which patterns appear in text, (5) DNA sequence multi-pattern search, (6) dictionary text compression using Aho-Corasick, (7) compare KMP single-pattern vs Aho-Corasick multi-pattern.",
          "2.5 hrs"),
        d(19,"Suffix Arrays & LCP",
          "Build suffix arrays for O(n log n) sorting and O(m log n) pattern matching.",
          "Suffix array SA: sorted array of all suffixes by starting index. Build in O(n log n) using doubling. LCP array: LCP[i] = longest common prefix of SA[i-1] and SA[i]. Kasai's algorithm builds LCP in O(n). Pattern matching: binary search on SA in O(m log n). Longest repeated substring: max value in LCP array. Distinct substrings: n*(n+1)/2 - sum(LCP).",
          [{type:"yt",url:"https://youtube.com/results?search_query=suffix+array+LCP+C%2B%2B+construction+tutorial",label:"Suffix Array C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/string/suffix-array.html",label:"CP-Algorithms Suffix Array"}],
          "Build suffix array for 'banana'. Sort all suffixes. Compute LCP array. Find longest repeated substring.",
          "🚀 TASK: Implement (1) suffix array O(n log n) via doubling, (2) LCP via Kasai's, (3) count pattern occurrences using SA binary search, (4) find longest repeated substring, (5) longest common substring of two strings, (6) count distinct substrings, (7) find all pattern occurrences using SA + LCP.",
          "2.5 hrs"),
        d(20,"Computational Geometry Basics",
          "Apply geometric primitives for competitive programming.",
          "Point as struct or complex<double>. Cross product: check collinearity (=0) and orientation (positive=CCW, negative=CW). Dot product: check perpendicularity and angle type. Segment intersection: cross products for orientation test. Graham scan convex hull: sort by polar angle, maintain CCW stack — O(n log n). Polygon area: shoelace formula.",
          [{type:"yt",url:"https://youtube.com/results?search_query=computational+geometry+C%2B%2B+cross+product+convex+hull+Graham+scan",label:"Computational Geometry C++"},{type:"web",url:"https://cp-algorithms.com/geometry/basic-geometry.html",label:"CP-Algorithms Geometry"}],
          "Find orientation of triangle (0,0),(4,0),(2,3) using cross product. Run Graham scan on 8 random points.",
          "🚀 TASK: Implement (1) point struct with dot, cross, distance, (2) check if three points are collinear, (3) check if two line segments intersect, (4) Graham scan convex hull O(n log n), (5) polygon area using shoelace formula, (6) point inside convex polygon in O(log n), (7) point inside arbitrary polygon using ray casting, (8) closest pair of points O(n log n).",
          "2.5 hrs"),
        d(21,"Week 3 Project — Route Network Optimizer",
          "Apply max flow, shortest paths, and graph algorithms to a delivery network.",
          "Delivery network requires multiple graph algorithms: max flow for throughput, Dijkstra for routing, MST for infrastructure, topological sort for scheduling. This mirrors real logistics software.",
          [{type:"yt",url:"https://youtube.com/results?search_query=delivery+network+optimization+graph+algorithms+C%2B%2B",label:"Network Optimizer C++"},{type:"web",url:"https://www.geeksforgeeks.org/applications-of-graph-data-structure/",label:"GFG Graph Applications"}],
          "Model a 10-node delivery network. Plan which algorithm handles each feature.",
          "🚀 PROJECT: Build 'Route Network Optimizer': (1) max throughput — Edmonds-Karp max flow from warehouse to delivery zones, (2) bottleneck analysis — min cut, (3) optimal routing — Dijkstra with time/cost criteria, (4) infrastructure — Kruskal's MST for minimum connection cost, (5) dependency scheduling — topological sort, (6) capacity planning — which edges need upgrade?, (7) dynamic routing — update weights on road closure, (8) print stats: throughput, bottleneck, optimal routes.",
          "3.5 hrs"),
      ],
      project:{ id:"iw3", title:"Route Network Optimizer",
        desc:"A C++ logistics optimization app applying six graph algorithms. Edmonds-Karp max flow finds max throughput and bottleneck via min-cut. Dijkstra provides optimal routing with time/cost objectives. Kruskal's MST suggests minimum infrastructure. Topological sort handles sequential deliveries. Dynamic re-routing updates on road closure. Capacity analysis identifies edges needing upgrade." }
    },

    // ── Week 4 ──────────────────────────────────────────────────────────────
    { week:4, title:"Advanced Dynamic Programming", timeRange:"14–16 hrs",
      days:[
        d(22,"DP on Trees",
          "Apply DP on tree structures for subtree-based optimization.",
          "Tree DP: define state per subtree, compute child states first (post-order DFS), combine for parent. Maximum independent set on tree: dp[v][0] = max set not including v, dp[v][1] = max including v. Rerooting technique: two DFS passes to compute subtree DP for all roots.",
          [{type:"yt",url:"https://youtube.com/results?search_query=tree+DP+dynamic+programming+C%2B%2B+diameter+independent+set",label:"Tree DP C++"},{type:"web",url:"https://codeforces.com/blog/entry/20935",label:"Codeforces Tree DP"}],
          "Compute max independent set DP on an 8-node tree. Fill dp[v][0] and dp[v][1] bottom-up.",
          "🚀 TASK: Solve (1) tree diameter via single DFS DP, (2) max independent set on tree, (3) min vertex cover on tree, (4) tree knapsack — pick subset with constraints, (5) sum of distances in tree using two DFS passes, (6) max path sum starting/ending anywhere in tree.",
          "2.5 hrs"),
        d(23,"Bitmask DP",
          "Master bitmask DP for O(2^n * n) exponential-state problems.",
          "TSP: dp[mask][v] = minimum cost to visit all cities in mask ending at v. Transition: dp[mask][v] = min over u in mask of dp[mask^(1<<v)][u] + cost[u][v]. Base: dp[1<<start][start]=0. Answer: min of dp[(1<<n)-1][v] + cost[v][start]. O(2^n * n²). Assignment: dp[mask] = min cost to assign tasks in mask to first popcount(mask) workers.",
          [{type:"yt",url:"https://youtube.com/results?search_query=bitmask+DP+TSP+assignment+problem+C%2B%2B+tutorial",label:"Bitmask DP C++"},{type:"web",url:"https://codeforces.com/blog/entry/47094",label:"Codeforces Bitmask DP"}],
          "Solve TSP for 4 cities. Fill dp table for all 16 states. Trace back optimal tour.",
          "🚀 TASK: Implement (1) TSP bitmask DP, (2) print TSP tour via backtracking, (3) assignment problem, (4) bitmask DP — cover all cells of NxM grid with minimum shapes, (5) broken profile DP — count ways to tile NxM with 1×2 dominoes, (6) max XOR subset using Gaussian elimination, (7) set cover with minimum sets.",
          "2.5 hrs"),
        d(24,"Interval DP",
          "Apply DP on intervals for parenthesization and merging problems.",
          "Interval DP: dp[i][j] = optimal answer for interval [i,j]. Traverse by increasing interval length. Matrix chain: try all split points k: cost = dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]. Burst Balloons: dp[i][j] = max coins bursting all in [i,j] — try last balloon to burst. Stone merging: dp[i][j] = min cost to merge stones i to j.",
          [{type:"yt",url:"https://youtube.com/results?search_query=interval+DP+burst+balloons+matrix+chain+C%2B%2B+tutorial",label:"Interval DP C++"},{type:"web",url:"https://leetcode.com/problems/burst-balloons/",label:"LeetCode Burst Balloons"}],
          "Solve burst balloons on [3,1,5,8]. Fill dp table. Trace optimal burst order.",
          "🚀 TASK: Solve (1) matrix chain multiplication with reconstruction, (2) burst balloons, (3) stone merging, (4) optimal BST, (5) palindrome partitioning II — minimum cuts, (6) strange printer, (7) remove boxes.",
          "2.5 hrs"),
        d(25,"Convex Hull Trick (CHT)",
          "Apply CHT for O(n log n) DP where naive is O(n²).",
          "CHT: when dp[i] = min over j<i of (dp[j] + cost(i,j)) and cost is of the form m[j]*x[i] + b[j] (linear in j). Maintain convex hull of lines. Offline CHT (sorted x queries): deque of lines, query in O(1) amortized. Li Chao tree: online CHT supporting arbitrary query order in O(log n). Divide and Conquer DP: when optimal split point is monotone — O(n log n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=convex+hull+trick+CHT+DP+optimization+C%2B%2B+tutorial",label:"CHT DP Optimization C++"},{type:"web",url:"https://cp-algorithms.com/dynamic_programming/convex_hull_trick.html",label:"CP-Algorithms CHT"}],
          "Identify which DP transitions qualify for CHT by checking if cost is m*x+b form.",
          "🚀 TASK: Implement (1) offline CHT (monotone slopes) with deque, (2) Li Chao tree for online CHT, (3) D&C DP for monotone opt problems, (4) apply CHT to cut-stick problem O(n log n), (5) min cost to hire workers using CHT, (6) Knuth's optimization O(n²) for interval DP with quadrangle inequality, (7) slope trick: solve min cost to make array non-decreasing.",
          "2.5 hrs"),
        d(26,"Probability DP & Expected Value",
          "Compute expected values using DP on states.",
          "Expected value DP: E[state] = sum over transitions of (probability * (cost + E[next_state])). Knight probability: dp[i][j][k] = probability at (i,j) after k moves. Game theory: minimax with DP for 2-player zero-sum games. Geometric distribution: expected rolls to first success = 1/p (memoryless property).",
          [{type:"yt",url:"https://youtube.com/results?search_query=probability+DP+expected+value+C%2B%2B+LeetCode+tutorial",label:"Probability DP C++"},{type:"web",url:"https://leetcode.com/problems/knight-probability-in-chessboard/",label:"LeetCode Knight Probability"}],
          "Compute expected rolls to first get a 6: E = 1 + (5/6)*E → E = 6. Extend to expected rolls for both 5 and 6.",
          "🚀 TASK: Solve (1) knight probability on NxN board after K moves, (2) dice roll simulation counting rolls per face constraint, (3) frog jump expected hops across river, (4) card game win probability via DP on deck state, (5) soup servings probability, (6) Predict the Winner — 2-player array ends game.",
          "2.5 hrs"),
        d(27,"Game Theory — Grundy & Minimax",
          "Compute Grundy values; implement minimax with alpha-beta pruning.",
          "Grundy value g(position) = mex of positions reachable in one move. g=0 means losing for player to move. Nim: g = XOR of pile sizes. Compound games: g = XOR of individual Grundy values. Minimax: maximizer picks max of children, minimizer picks min. Alpha-beta pruning eliminates branches that can't affect outcome — reduces O(b^d) to O(b^(d/2)).",
          [{type:"yt",url:"https://youtube.com/results?search_query=Grundy+numbers+Sprague+Grundy+minimax+alpha+beta+C%2B%2B",label:"Game Theory C++"},{type:"web",url:"https://cp-algorithms.com/game_theory/sprague-grundy-nim.html",label:"CP-Algorithms Sprague-Grundy"}],
          "Compute Grundy values for Nim [3,4,5]. Compute mex for 5 game positions.",
          "🚀 TASK: Implement (1) Grundy value for any impartial game, (2) Nim winner using XOR, (3) misère Nim (last move loses), (4) stone game: take 1/2/3 stones, (5) minimax for Tic-Tac-Toe, (6) alpha-beta pruning — count pruned nodes, (7) Predict the Winner: array endpoints game.",
          "2.5 hrs"),
        d(28,"Week 4 Project — Game AI Engine",
          "Build an AI for two-player games using minimax and Grundy theory.",
          "Game AI combines Grundy theory for optimal moves with minimax for look-ahead. Alpha-beta pruning makes search practical. Memoization prevents re-evaluating same positions.",
          [{type:"yt",url:"https://youtube.com/results?search_query=minimax+alpha+beta+game+AI+C%2B%2B+Tic+Tac+Toe+project",label:"Game AI C++ Project"},{type:"web",url:"https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/",label:"GFG Alpha-Beta"}],
          "Plan state representation for Connect 4. How many states? Why is memoization critical?",
          "🚀 PROJECT: Build 'Game AI Engine': (1) Tic-Tac-Toe with minimax — AI never loses, (2) alpha-beta pruning — compare nodes pruned vs unpruned, (3) memoize visited board states, (4) Connect 4 with minimax + alpha-beta to depth 6, (5) evaluation heuristic for non-terminal positions, (6) Nim using Grundy theory — always optimal, (7) iterative deepening with time limit, (8) stats: nodes searched, depth reached, time taken.",
          "3.5 hrs"),
      ],
      project:{ id:"iw4", title:"Game AI Engine",
        desc:"A C++ game AI framework. Tic-Tac-Toe uses complete minimax with memoization — never loses. Connect 4 uses minimax + alpha-beta to depth 6 with positional heuristic. Nim uses Sprague-Grundy for instant optimal play. Includes iterative deepening, performance instrumentation (nodes searched, pruning ratio), and interactive play mode." }
    },

    // ── Week 5 ──────────────────────────────────────────────────────────────
    { week:5, title:"Advanced Strings & Search Engine", timeRange:"12–14 hrs",
      days:[
        d(29,"Manacher's Algorithm & Rolling Hash",
          "Find all palindromes in O(n); O(1) substring comparison.",
          "Manacher's: insert '#' between chars, maintain center c and right boundary r. For each i: use mirror value as starting point, expand manually, update c/r — O(n). Rolling hash: h = sum s[i]*p^i mod M. Prefix hashes enable O(1) substring hash comparison. Double hash reduces collision probability.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Manacher+algorithm+rolling+hash+string+hashing+C%2B%2B",label:"Manacher's & Rolling Hash"},{type:"web",url:"https://cp-algorithms.com/string/manacher.html",label:"CP-Algorithms Manacher"}],
          "Run Manacher's on 'abacaba'. Compute rolling hash for 'hello world' and verify substring hash matches.",
          "🚀 TASK: Implement (1) Manacher's — find longest palindromic substring, (2) count all palindromic substrings, (3) polynomial hash with prefix sums, (4) O(1) substring hash query, (5) Rabin-Karp pattern matching, (6) find all duplicate substrings of length K, (7) longest common substring using binary search + hashing O(n log n).",
          "2 hrs"),
        d(30,"Suffix Automaton",
          "O(n) structure accepting all substrings with applications.",
          "SAM: minimal DFA accepting all substrings. States have suffix links, children map, endpos sets. Build incrementally — O(n) total states and transitions. Applications: count distinct substrings, find occurrences of any substring, longest common substring. endpos(s) = set of ending positions of s in string.",
          [{type:"yt",url:"https://youtube.com/results?search_query=suffix+automaton+SAM+C%2B%2B+implementation+tutorial",label:"Suffix Automaton C++"},{type:"web",url:"https://cp-algorithms.com/string/suffix-automaton.html",label:"CP-Algorithms SAM"}],
          "Build SAM for 'abab' step by step. After each character show states added and suffix links.",
          "🚀 TASK: Implement (1) SAM construction, (2) count distinct substrings, (3) count occurrences of pattern, (4) longest common substring of two strings, (5) Kth lexicographically smallest substring, (6) shortest common superstring approximation, (7) compare SAM vs suffix array.",
          "2 hrs"),
        d(31,"Huffman Coding & String Compression",
          "Implement optimal prefix codes and LZ-based compression.",
          "Huffman: build optimal prefix-free code. Assign shorter codes to frequent chars. Build tree by repeatedly merging two lowest-frequency nodes via min-heap. RLE: encode consecutive repeated chars as count+char. LZ77: sliding window — output (offset, length, next_char) triples. LZW: dictionary-based, build as encoding proceeds.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Huffman+coding+C%2B%2B+implementation+compression+tutorial",label:"Huffman Coding C++"},{type:"web",url:"https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/",label:"GFG Huffman Coding"}],
          "Build Huffman tree for {a:5,b:9,c:12,d:13,e:16,f:45}. What codes are assigned? What is the compression ratio?",
          "🚀 TASK: Implement (1) RLE encode and decode, (2) Huffman: build tree, generate codes, encode, decode, (3) compression ratio on sample texts, (4) LZ77 basic sliding window, (5) LZW dictionary compression, (6) compare compression ratios: natural language vs DNA vs code, (7) Burrows-Wheeler Transform.",
          "2 hrs"),
        d(32,"NFA/DFA & Regex Matching",
          "Build finite automata from regex; implement wildcard and regex DP matching.",
          "Thompson's construction: single char → two-state NFA. Operators: concat (connect), union (split+merge), Kleene star (loop). NFA to DFA: subset construction — DFA state = set of NFA states reachable after input + epsilon closure. DP regex matching: '.' matches any char, '*' matches zero or more of preceding. dp[i][j] = does s[:i] match p[:j].",
          [{type:"yt",url:"https://youtube.com/results?search_query=NFA+DFA+regex+matching+C%2B%2B+DP+implementation",label:"NFA/DFA & Regex C++"},{type:"web",url:"https://www.geeksforgeeks.org/theory-of-computation-conversion-from-nfa-to-dfa/",label:"GFG NFA to DFA"}],
          "Build NFA for (a|b)*abb. Compute epsilon closures. Convert to DFA. Test 'aabb'.",
          "🚀 TASK: Implement (1) NFA simulation tracking state sets, (2) Thompson's construction for basic regex, (3) NFA to DFA subset construction, (4) DFA string matching, (5) wildcard matching DP: '?' and '*', (6) regular expression matching DP: '.' and '*', (7) simple lexer tokenizing arithmetic expressions.",
          "2.5 hrs"),
        d(33,"Week 5 Project — Search Engine Core",
          "Build a text search engine using suffix arrays, Aho-Corasick, and rolling hashes.",
          "Implement the algorithmic core of a search engine: inverted index, boolean queries, Aho-Corasick for multi-keyword matching, suffix array for phrase search, TF-IDF ranking, and trie autocomplete.",
          [{type:"yt",url:"https://youtube.com/results?search_query=search+engine+implementation+C%2B%2B+suffix+array+inverted+index",label:"Search Engine C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Inverted_index",label:"Wikipedia Inverted Index"}],
          "Plan: inverted index (word→doc list), suffix array (phrase search), rolling hash (deduplication), TF-IDF (ranking).",
          "🚀 PROJECT: Build 'Search Engine Core': (1) read multiple text files, tokenize, build inverted index, (2) boolean AND/OR/NOT queries, (3) multi-keyword search using Aho-Corasick, (4) phrase search using suffix array, (5) near-duplicate detection using rolling hash fingerprinting, (6) TF-IDF ranking, (7) trie-based prefix autocomplete, (8) search analytics: most common queries, miss rate.",
          "3.5 hrs"),
      ],
      project:{ id:"iw5", title:"Search Engine Core",
        desc:"A C++ search engine with inverted index for O(1) word lookup, boolean query evaluation, Aho-Corasick multi-keyword matching, suffix array phrase search, rolling hash near-duplicate detection, TF-IDF relevance ranking, trie prefix autocomplete, and search analytics. Processes multiple text documents and returns ranked results." }
    },

    // ── Week 6 ──────────────────────────────────────────────────────────────
    { week:6, title:"Mathematics for Competitive Programming", timeRange:"12–14 hrs",
      days:[
        d(34,"Number Theory — GCD, Primes & Modular Arithmetic",
          "Master GCD, Sieve, modular arithmetic, and Chinese Remainder Theorem.",
          "GCD: Euclidean algorithm O(log min). Extended GCD: find x,y with ax+by=gcd. Sieve of Eratosthenes: O(n log log n). Modular inverse: a^(m-2) mod m when m is prime (Fermat). CRT: solve system of congruences with unique solution mod lcm.",
          [{type:"yt",url:"https://youtube.com/results?search_query=number+theory+GCD+sieve+modular+arithmetic+C%2B%2B+competitive",label:"Number Theory C++"},{type:"web",url:"https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html",label:"CP-Algorithms Sieve"}],
          "Compute gcd(48,18) step by step. Find 7^(-1) mod 13 using Fermat. Apply CRT to solve x≡2(mod 3), x≡3(mod 5).",
          "🚀 TASK: Implement (1) GCD/LCM Euclidean, (2) extended GCD with Bezout coefficients, (3) sieve up to 10^7, (4) fast power a^b mod m, (5) modular inverse — Fermat and extended GCD, (6) CRT for system of congruences, (7) count divisors, sum of divisors, Euler's totient for N.",
          "2 hrs"),
        d(35,"Combinatorics & Inclusion-Exclusion",
          "Compute C(n,k), Catalan numbers, and apply inclusion-exclusion.",
          "Precompute factorials and inverse factorials mod p for O(1) C(n,k). Lucas' theorem for C(n,k) mod prime with large n. Catalan C(n) = C(2n,n)/(n+1). Inclusion-exclusion: |A∪B∪C| = |A|+|B|+|C|-|A∩B|-|A∩C|-|B∩C|+|A∩B∩C|. Derangements: permutations with no fixed point.",
          [{type:"yt",url:"https://youtube.com/results?search_query=combinatorics+Catalan+inclusion+exclusion+C%2B%2B+competitive",label:"Combinatorics C++"},{type:"web",url:"https://cp-algorithms.com/combinatorics/catalan-numbers.html",label:"CP-Algorithms Catalan"}],
          "Compute C(10,4) using precomputed factorials mod 10^9+7. Apply inclusion-exclusion to count ≤100 divisible by 2, 3, or 5.",
          "🚀 TASK: Implement (1) precompute factorials for O(1) C(n,k) mod p, (2) Lucas' theorem for large n, (3) first 20 Catalan numbers, (4) derangements count, (5) inclusion-exclusion: count integers not divisible by any of given primes, (6) Burnside's lemma: distinct necklaces with n beads k colors, (7) Stirling numbers.",
          "2 hrs"),
        d(36,"Matrix Exponentiation & FFT",
          "Linear recurrences via matrix exp; polynomial multiplication via FFT.",
          "Matrix exponentiation: A^n in O(matrix_size³ * log n). Fibonacci in O(log n): [[1,1],[1,0]]^n. FFT: evaluate polynomials at roots of unity O(n log n), multiply pointwise, inverse FFT for coefficients. NTT: FFT mod prime for exact integer results.",
          [{type:"yt",url:"https://youtube.com/results?search_query=matrix+exponentiation+FFT+polynomial+C%2B%2B+competitive",label:"Matrix Exp & FFT C++"},{type:"web",url:"https://cp-algorithms.com/algebra/matrix-exp.html",label:"CP-Algorithms Matrix Exp"}],
          "Set up Fibonacci as matrix equation. Multiply polynomials (1+2x+3x²) and (4+5x) naively, then verify FFT gives same result.",
          "🚀 TASK: Implement (1) matrix multiply mod p, (2) matrix exponentiation O(n³ log k), (3) Fibonacci in O(log n), (4) count paths of length n using adjacency matrix power, (5) 2×n tiling using matrix exp, (6) Gaussian elimination for Ax=b, (7) FFT polynomial multiplication, (8) NTT — FFT mod prime.",
          "2 hrs"),
        d(37,"Randomized Algorithms",
          "Apply probability and randomization to algorithm design.",
          "Reservoir sampling: select k items from unknown-length stream uniformly. Fisher-Yates shuffle: uniform random permutation O(n). Bloom filter: space-efficient membership using k hash functions. Miller-Rabin: probabilistic primality in O(k log² n). Randomized QuickSelect: expected O(n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=randomized+algorithms+reservoir+sampling+bloom+filter+C%2B%2B",label:"Randomized Algorithms C++"},{type:"web",url:"https://www.geeksforgeeks.org/reservoir-sampling/",label:"GFG Reservoir Sampling"}],
          "Verify birthday paradox by simulation: 10000 groups of 23 people, count how often two share birthday (~50.7%).",
          "🚀 TASK: Implement (1) reservoir sampling, (2) Fisher-Yates shuffle, (3) Bloom filter with configurable false positive rate, (4) randomized QuickSelect for Kth smallest, (5) Monte Carlo π estimation, (6) random graph generation — Erdős-Rényi G(n,p), (7) Miller-Rabin primality test.",
          "2 hrs"),
        d(38,"Week 6 Project — Mathematical Toolkit",
          "Build a competitive programming math library.",
          "Consolidate every math topic into a single well-tested library handling large inputs (N up to 10^18, primes up to 10^9) with edge case coverage.",
          [{type:"yt",url:"https://youtube.com/results?search_query=competitive+programming+math+library+C%2B%2B+number+theory",label:"CP Math Library C++"},{type:"web",url:"https://codeforces.com/blog/entry/18051",label:"Codeforces Math CP"}],
          "Plan API: which functions take mod parameter, which use long long, which need precomputation.",
          "🚀 PROJECT: Build 'Mathematical Toolkit': (1) number theory: gcd, lcm, extended gcd, modular inverse, fast power, sieve, prime factorization, (2) combinatorics: factorials, C(n,k), Catalan, derangements, (3) matrix: multiply, power, Gaussian elimination, determinant, (4) FFT/NTT: polynomial multiply, large number multiply, (5) geometry: convex hull, point operations, polygon area, (6) stress tester vs brute force, (7) benchmark with large inputs, (8) documentation with complexity and requirements.",
          "3.5 hrs"),
      ],
      project:{ id:"iw6", title:"Mathematical Toolkit",
        desc:"A comprehensive C++ CP math library. Number theory: GCD, LCM, extended Euclidean, modular inverse, fast power, sieve, Euler's totient. Combinatorics: precomputed factorials for O(1) C(n,k), Lucas', Catalan, derangements. Linear algebra: matrix multiply, matrix exp, Gaussian elimination, determinant. FFT and NTT for polynomial multiplication. Convex hull geometry. Includes stress tester and benchmarks." }
    },

    // ── Week 7 ──────────────────────────────────────────────────────────────
    { week:7, title:"System Design Data Structures", timeRange:"12–14 hrs",
      days:[
        d(39,"LRU & LFU Cache",
          "Implement O(1) LRU and LFU caches.",
          "LRU (Least Recently Used): hash map {key→list_iterator} + doubly linked list (most recent at front). Get: move node to front. Put: if exists update+move; if full remove from back; add to front. LFU (Least Frequently Used): three hash maps {key→value, key→freq, freq→linked_list} + min_freq tracker. O(1) all operations.",
          [{type:"yt",url:"https://youtube.com/results?search_query=LRU+LFU+cache+C%2B%2B+O1+implementation+doubly+linked+list",label:"LRU & LFU Cache C++"},{type:"web",url:"https://leetcode.com/problems/lru-cache/",label:"LeetCode LRU Cache"}],
          "Trace LRU capacity=3: put(1,1),put(2,2),get(1),put(3,3),put(4,4). Which key is evicted?",
          "🚀 TASK: Implement (1) LRU with O(1) get and put, (2) test LRU eviction order, (3) LFU with O(1) all operations, (4) LRU using std::list + unordered_map, (5) TTL cache — entries expire after T seconds, (6) write-through vs write-back simulation, (7) hit rate measurement on realistic access patterns.",
          "2.5 hrs"),
        d(40,"Monotonic Stack Advanced & Persistent Segment Tree",
          "Sum of subarray minimums; versioned segment tree for historical queries.",
          "Sum of subarray minimums: for each element find left/right boundaries (nearest smaller) using monotonic stack — contribution = A[i] * left_count * right_count. O(n). Persistent Segment Tree: on update create new nodes only along root-to-leaf path (O(log n) new nodes). All old nodes off-path are shared. Query any past version in O(log n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=monotonic+stack+sum+subarray+minimums+persistent+segment+tree+C%2B%2B",label:"Monotonic Stack & Persistent Tree"},{type:"web",url:"https://leetcode.com/problems/sum-of-subarray-minimums/",label:"LeetCode Subarray Minimums"}],
          "Compute sum of subarray minimums for [3,1,2,4] using contribution technique.",
          "🚀 TASK: Solve (1) sum of subarray minimums O(n), (2) sum of subarray maximums, (3) 132 pattern using monotonic stack, (4) online stock span, (5) persistent segment tree — build and query any past version for range sum, (6) Kth smallest in range [l,r] using persistent segment tree, (7) range mode query using persistent structures.",
          "2.5 hrs"),
        d(41,"B-Tree & Database Index Concepts",
          "Implement B-tree for O(log n) insert/delete/search with cache efficiency.",
          "B-tree of order t: each internal node has t-1 to 2t-1 keys and t to 2t children. Leaf nodes have 1 to 2t-1 keys. Split on overflow (insert), merge/borrow on underflow (delete). Height O(log_t n). Cache-efficient: large branching factor means few disk reads. B+-tree: data only in leaves, internal nodes for routing — better range scans.",
          [{type:"yt",url:"https://youtube.com/results?search_query=B+tree+database+index+C%2B%2B+implementation+tutorial",label:"B-Tree C++ Implementation"},{type:"web",url:"https://en.wikipedia.org/wiki/B-tree",label:"Wikipedia B-Tree"}],
          "Design B-tree node (order 3): keys array, children array, isLeaf, count. Trace insert with split.",
          "🚀 TASK: Implement B-tree (order 3) with (1) search, (2) insert with node splitting, (3) range scan — iterate keys in [lo,hi], (4) bulk load from sorted input O(n), (5) index statistics: height, node count, fill factor, (6) prefix search, (7) benchmark: B-tree range scan vs sorted array binary search vs hash map.",
          "2.5 hrs"),
        d(42,"Week 7 Project — Database Index Engine",
          "Build a B-tree index with range queries and versioning.",
          "Database indexes are the most important algorithmic component in RDBMS. Adding versioning enables MVCC used in PostgreSQL and MySQL InnoDB.",
          [{type:"yt",url:"https://youtube.com/results?search_query=B+tree+database+index+versioning+C%2B%2B+MVCC",label:"Database Index Engine C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Multiversion_concurrency_control",label:"Wikipedia MVCC"}],
          "Plan B-tree operations: insert (split overflow), delete (merge/borrow underflow), range scan (in-order traversal).",
          "🚀 PROJECT: Build 'Database Index Engine': (1) B-tree (order 4): insert, delete, search, (2) range scan [lo, hi] in sorted order, (3) bulk load from sorted input O(n), (4) persistent versioning — each transaction creates new version, old versions queryable, (5) index statistics: height, fill factor, node count, (6) prefix search, (7) concurrent-read snapshot: readers see consistent version while writes proceed, (8) benchmark vs sorted array and hash map.",
          "3.5 hrs"),
      ],
      project:{ id:"iw7", title:"Database Index Engine",
        desc:"A C++ B-tree index (configurable order) with insert (node splitting), delete (merge/borrow), range scan, and bulk loading. Version control implements snapshot isolation preserving old tree roots. Index statistics report height, node utilization, fill factor. Prefix search iterates sorted structure. Benchmarks compare B-tree vs sorted array vs hash map across read/write workloads." }
    },

    // ── Week 8 ──────────────────────────────────────────────────────────────
    { week:8, title:"Competitive Programming Techniques", timeRange:"14–16 hrs",
      days:[
        d(43,"Meet in the Middle & Offline Queries",
          "Split exponential problems for O(2^(n/2)) solutions; process queries offline for speedup.",
          "Meet in middle: split problem into two halves n/2, solve each in O(2^(n/2)), combine. Subset sum with large values: enumerate sums from each half, sort first half, binary search for complement — O(2^(n/2) log). Bidirectional BFS: O(b^(d/2)). Mo's algorithm: offline range queries in O((n+q)√n). Sort by block of left endpoint, then right endpoint within block.",
          [{type:"yt",url:"https://youtube.com/results?search_query=meet+in+the+middle+algorithm+Mo+offline+queries+C%2B%2B",label:"Meet in Middle & Mo's C++"},{type:"web",url:"https://cp-algorithms.com/data_structures/mos_algorithm.html",label:"CP-Algorithms Mo's"}],
          "Subset sum [3,34,4,12,5,2] target=9 using meet in middle. Sort queries using Mo's on n=10 array (block size 3).",
          "🚀 TASK: Implement (1) subset sum with large values using meet in middle, (2) 4Sum using meet in middle, (3) bidirectional BFS — compare nodes vs unidirectional, (4) Mo's algorithm for range mode query, (5) Mo's for range distinct count, (6) Mo's with modifications (updates), (7) offline LCA using Tarjan's.",
          "2.5 hrs"),
        d(44,"Sqrt Decomposition",
          "O(√n) per operation for problems resisting O(log n).",
          "Block decomposition: split array into √n blocks of size √n. Precompute block aggregates. Update element + recompute block O(1). Range query: partial blocks at ends O(√n) + complete block aggregates O(√n) = O(√n) total. Range update + range query: use block lazy values. Good alternative when segment tree would be complex.",
          [{type:"yt",url:"https://youtube.com/results?search_query=sqrt+decomposition+block+decomposition+C%2B%2B+tutorial",label:"Sqrt Decomposition C++"},{type:"web",url:"https://cp-algorithms.com/data_structures/sqrt_decomposition.html",label:"CP-Algorithms Sqrt Decomp"}],
          "Build block decomposition for [1,3,5,7,9,11,2,4,6,8] block size 3. Query range sum [2,8]. Update index 5 to 100.",
          "🚀 TASK: Implement (1) sqrt blocks for range sum + point update, (2) range update + range query with lazy block values, (3) range minimum with sqrt, (4) count distinct elements in range [l,r], (5) sqrt batching for bulk edge updates, (6) Mo's algorithm is itself sqrt-based — verify connection, (7) benchmark: sqrt decomp vs segment tree — when does sqrt win?",
          "2.5 hrs"),
        d(45,"Simulated Annealing & Local Search",
          "Apply metaheuristics for NP-hard optimization.",
          "Local search: start from feasible solution, make local improvements until local optimum. Simulated annealing: accept worse solutions with probability e^(-delta/T), cool T over time — escapes local optima. 2-opt for TSP: reverse a segment if it reduces tour length. Approximation: 2-approx vertex cover (both endpoints of unmatched edge). Greedy log-approx set cover.",
          [{type:"yt",url:"https://youtube.com/results?search_query=simulated+annealing+local+search+approximation+C%2B%2B+TSP",label:"Simulated Annealing C++"},{type:"web",url:"https://www.geeksforgeeks.org/vertex-cover-problem-set-1-introduction-approximate-algorithm-2/",label:"GFG Approximation Algorithms"}],
          "Apply 2-approx vertex cover to a 6-node graph. Compare to optimal.",
          "🚀 TASK: Implement (1) simulated annealing for TSP: swap → accept if better, accept worse with e^(-d/T), cool T, (2) 2-opt TSP improvement, (3) 2-approx vertex cover, (4) greedy log-approx set cover, (5) random restart hill climbing, (6) compare exact ILP vs simulated annealing on TSP, (7) quality vs time tradeoff analysis.",
          "2.5 hrs"),
        d(46,"Week 8 Project — Competitive Programming Judge",
          "Build an online judge system for evaluation and analytics.",
          "Apply algorithms across all domains: parsing (string), execution (system calls), evaluation (comparison), leaderboard (data structures), plagiarism detection (rolling hash).",
          [{type:"yt",url:"https://youtube.com/results?search_query=online+judge+system+design+C%2B%2B+implementation",label:"Online Judge Design C++"},{type:"web",url:"https://www.geeksforgeeks.org/how-does-an-online-judge-work/",label:"GFG Online Judge"}],
          "Plan pipeline: input parsing → compile → execute with timeout → compare output → verdict.",
          "🚀 PROJECT: Build 'CP Judge': (1) problem store with test cases (hash map + file I/O), (2) solution evaluator: compile C++, run with time limit, compare output, (3) verdicts: AC/WA/TLE/RE/CE, (4) leaderboard using BIT for rank computation, (5) difficulty rating: Elo-like update based on AC rate, (6) plagiarism detection using rolling hash, (7) submission stats: most failed test cases, runtime distribution, (8) Mo's algorithm on query logs for analytics.",
          "3.5 hrs"),
      ],
      project:{ id:"iw8", title:"Competitive Programming Judge",
        desc:"A C++ online judge simulator. Compiles submitted C++ via system calls, runs with time limits, detects TLE/RE/CE/WA. BIT-based leaderboard for O(log n) rank queries. Elo-inspired difficulty rating. Rolling hash plagiarism detection. Submission analytics using Mo's algorithm on query logs." }
    },

    // ── Week 9 ──────────────────────────────────────────────────────────────
    { week:9, title:"Interview Preparation & Mock Contests", timeRange:"14–16 hrs",
      days:[
        d(47,"FAANG Interview Patterns — Arrays, Strings & Trees",
          "Systematically solve the most common FAANG interview problems.",
          "Interview approach: (1) clarify constraints 5 min, (2) identify pattern, (3) brute force first, (4) optimize, (5) code cleanly, (6) test edge cases. Array patterns: two-pointer, sliding window, prefix sum. String patterns: palindrome expansion, anagram window, KMP matching. Tree patterns: DFS for paths, BFS for levels, BST binary search.",
          [{type:"yt",url:"https://youtube.com/results?search_query=FAANG+interview+array+string+tree+problems+C%2B%2B+patterns",label:"FAANG Interview Patterns"},{type:"web",url:"https://neetcode.io/",label:"NeetCode Practice"}],
          "Solve each problem first 20 min without looking. State time complexity before and after optimization.",
          "🚀 TASK: Solve timed (20 min each) — Array: (1) two sum, (2) three sum, (3) product except self, (4) max product subarray, (5) min in rotated sorted array. String: (6) longest substring without repeating, (7) min window substring, (8) group anagrams, (9) valid parentheses, (10) longest palindromic substring. Tree: (11) validate BST, (12) binary tree max path sum, (13) serialize/deserialize, (14) LCA, (15) construct from preorder+inorder.",
          "3 hrs"),
        d(48,"FAANG Patterns — Graphs & DP",
          "Solve graph and DP problems under interview conditions.",
          "Graph patterns: BFS for shortest path, DFS for connectivity/cycle, Dijkstra for weighted, Union-Find for dynamic connectivity, grid BFS/DFS for regions. Most graph problems are: (a) connectivity, (b) shortest path, (c) topological, (d) cycle detection. DP: state → recurrence → base case → space optimize. Common: 1D (Fibonacci-like), 2D grid, string, knapsack, bitmask.",
          [{type:"yt",url:"https://youtube.com/results?search_query=FAANG+graph+DP+design+interview+problems+C%2B%2B",label:"FAANG Graph & DP Problems"},{type:"web",url:"https://neetcode.io/practice",label:"NeetCode DP & Graphs"}],
          "For each problem: write pattern type and algorithm choice before coding. No hints for 25 min.",
          "🚀 TASK: Solve timed (25 min each) — Graph: (1) clone graph, (2) pacific atlantic, (3) course schedule II, (4) word ladder BFS, (5) number of islands. DP: (6) word break, (7) coin change, (8) LIS, (9) edit distance, (10) burst balloons. Design: (11) LRU cache, (12) Trie, (13) stack with getMin O(1), (14) median from data stream, (15) serialize BST.",
          "3 hrs"),
        d(49,"Mock Contest — Full Simulation",
          "Conduct full competitive programming mock contests.",
          "Contest strategy: read ALL problems first 10 min, solve easiest first, upsolved problems after contest. Template: fast I/O (ios_base::sync_with_stdio(false), cin.tie(NULL)), common types (ll, pii, vi), modular arithmetic helpers. Debug macros: print only when DEBUG flag set.",
          [{type:"yt",url:"https://youtube.com/results?search_query=competitive+programming+contest+strategy+Codeforces+template+C%2B%2B",label:"CP Contest Strategy"},{type:"web",url:"https://codeforces.com/blog/entry/66909",label:"Codeforces CP Guide"}],
          "Build contest template with fast I/O, types, macros, and utility functions.",
          "🚀 TASK: (1) build complete contest template, (2) virtual contest: Codeforces Div2 A/B/C in 90 min, (3) analyze mistakes — which problems took too long and why, (4) debug macro printing variable name+value when DEBUG set, (5) solve 10 Codeforces 1400-1600 problems in your weakest topics, (6) topic weakness tracker, (7) 3 back-to-back mock interviews (45 min each): hard array, hard tree/graph, hard DP.",
          "3 hrs"),
        d(50,"Week 9 Project — DSA Portfolio Problems",
          "Solve 20 curated hard problems for portfolio demonstration.",
          "A strong DSA portfolio shows mastery across all topics. These 20 problems require combining multiple algorithms, appear frequently in FAANG interviews, and cover the full spectrum of problem types.",
          [{type:"yt",url:"https://youtube.com/results?search_query=hard+LeetCode+problems+solutions+C%2B%2B+medium+hard+FAANG",label:"Hard LeetCode Solutions"},{type:"web",url:"https://neetcode.io/",label:"NeetCode 150"}],
          "Think 20 min without hints per problem. Write 3-line key insight after each. Track which topics need more work.",
          "🚀 PROJECT: Solve and document 20 portfolio problems: DP: (1) regular expression matching, (2) distinct subsequences, (3) cherry pickup II, (4) stone game IV. Graph: (5) swim in rising water, (6) cheapest flights K stops, (7) city with smallest reachable set. String: (8) shortest palindrome (KMP), (9) word break II, (10) minimum window substring. Tree: (11) binary tree cameras, (12) recover BST. Data Structures: (13) in-memory file system, (14) max frequency stack. Math: (15) largest rectangle histogram, (16) trapping rain water II. Advanced: (17) alien dictionary, (18) number of ways same place, (19) count palindromic subsequences, (20) remove boxes. Write key insight for each.",
          "3.5 hrs"),
      ],
      project:{ id:"iw9", title:"DSA Portfolio Problems",
        desc:"A collection of 20 hard DSA problems with C++ solutions and documented insights. Spans DP (regex matching, distinct subsequences, cherry pickup), graph (Dijkstra with constraints, connectivity), strings (KMP palindrome, word break II), trees (camera coverage DP, BST recovery), and data structures (LFU cache, frequency stack). Each includes complexity analysis, key insight, and tested edge cases." }
    },

  ]  // end intermediate.weeks
};   // end intermediate
// ============================================================
// dsa-steps PART 2C — ADVANCED level (120 days, 12 weeks)
//                   + ROADMAP object + APP wiring
// Paste after the intermediate closing `};` from Part 2B
// ============================================================

const advanced = {
  label: "🔴 Advanced", days: 120, totalHours: 240,
  goal: "Competitive Programming + Expert DSA",
  weeks: [

    // ── Week 1 ──────────────────────────────────────────────────────────────
    { week:1, title:"Expert Graph Theory", timeRange:"16–18 hrs",
      days:[
        d(1,"2-SAT & SCC",
          "Solve 2-satisfiability using implication graphs and Tarjan's SCC.",
          "2-SAT: given 2-CNF formula, build implication graph (for each (a OR b) add ¬a→b and ¬b→a). Unsatisfiable iff some variable x and ¬x are in same SCC. Solution: run Tarjan's SCC, topo-order SCCs, assign x=true iff SCC(x) comes after SCC(¬x). O(n+m). Applications: graph orientation, scheduling with conflicts.",
          [{type:"yt",url:"https://youtube.com/results?search_query=2-SAT+implication+graph+SCC+C%2B%2B+Tarjan+tutorial",label:"2-SAT C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/graph/2SAT.html",label:"CP-Algorithms 2-SAT"}],
          "Solve (x₁ OR ¬x₂) AND (¬x₁ OR x₃) AND (x₂ OR ¬x₃). Build implication graph, find SCCs, determine assignment.",
          "🚀 TASK: Implement (1) 2-SAT solver: implication graph + Tarjan's + assignment extraction, (2) check satisfiability and output valid assignment, (3) meeting scheduling with conflicts modeled as 2-SAT, (4) graph orientation: orient edges to make all vertices even out-degree, (5) XOR constraint 2-SAT, (6) k-coloring: check if graph is 2-colorable using 2-SAT.",
          "2.5 hrs"),
        d(2,"Min-Cost Max-Flow",
          "Solve assignment, transportation, and scheduling with MCMF.",
          "MCMF: find maximum flow with minimum total cost. Edges have capacity c and cost w. Successive shortest paths: find min-cost augmenting path (SPFA for negative costs), send flow, update residual graph — O(V*E*flow). Applications: optimal assignment, transportation, bipartite matching with weights.",
          [{type:"yt",url:"https://youtube.com/results?search_query=minimum+cost+maximum+flow+MCMF+C%2B%2B+SPFA",label:"MCMF C++ Tutorial"},{type:"web",url:"https://cp-algorithms.com/graph/min_cost_flow.html",label:"CP-Algorithms MCMF"}],
          "Solve assignment: 3 workers, 3 jobs, cost [[3,1,2],[5,4,8],[2,7,6]]. Find optimal assignment.",
          "🚀 TASK: Implement (1) MCMF using SPFA for shortest path in residual graph, (2) optimal assignment: n workers to n jobs, (3) transportation problem, (4) weighted bipartite matching, (5) project selection with resource constraints, (6) Hungarian algorithm O(n³), (7) combine MCMF with Dinic's level graph for speed.",
          "2.5 hrs"),
        d(3,"Centroid Decomposition",
          "Efficient path queries on trees in O(n log² n).",
          "Centroid: removing it splits tree into components each ≤ n/2. Build centroid tree recursively. Any path between two nodes passes through their LCA in the centroid tree. Use hash maps at each centroid: store distances from centroid to all nodes in its component. Path query (u,v): sum contributions from each common centroid. O(n log n) preprocessing, O(log² n) per query.",
          [{type:"yt",url:"https://youtube.com/results?search_query=centroid+decomposition+C%2B%2B+tutorial+competitive+programming",label:"Centroid Decomp C++"},{type:"web",url:"https://cp-algorithms.com/graph/centroid-decomposition.html",label:"CP-Algorithms Centroid Decomp"}],
          "Find centroid of 15-node tree. After removing, show component sizes ≤ n/2. Show centroid tree depth is O(log n).",
          "🚀 TASK: Implement (1) centroid decomposition — build centroid tree, (2) count pairs with path length exactly K, (3) sum of distances between all pairs O(n log n), (4) virtual tree construction from K query nodes O(K log n), (5) query sum of distances from important nodes using virtual tree, (6) paths through each node count, (7) centroid decomp + segment trees for complex path queries.",
          "2.5 hrs"),
        d(4,"Advanced Matching — Hopcroft-Karp & Gale-Shapley",
          "Efficient bipartite matching; stable matching for assignment problems.",
          "Hopcroft-Karp: O(√V * E) bipartite matching using BFS to find all augmenting paths simultaneously in each phase. Each phase O(E), at most O(√V) phases. Gale-Shapley stable matching: men propose in order of preference, women hold best proposal — O(n²). Stable: no blocking pair (man+woman who prefer each other over current partners). Applications: college admissions, hospital-resident matching.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Hopcroft+Karp+Gale+Shapley+stable+matching+C%2B%2B",label:"Hopcroft-Karp & Gale-Shapley"},{type:"web",url:"https://cp-algorithms.com/graph/kuhn_algorithm.html",label:"CP-Algorithms Matching"}],
          "Run Hopcroft-Karp on a bipartite graph. Verify König's theorem: max matching = min vertex cover.",
          "🚀 TASK: Implement (1) Hopcroft-Karp bipartite matching O(√V * E), (2) verify König's theorem, (3) Gale-Shapley stable matching, (4) check output: no blocking pair, (5) college admissions with capacities, (6) weighted bipartite matching, (7) maximum weight independent set in bipartite graph.",
          "2.5 hrs"),
        d(5,"Network Flow Advanced — Dinic's Algorithm",
          "Compute max flow in O(V²E) using level graphs and blocking flows.",
          "Dinic's: build level graph via BFS (layers based on distance from source). Find blocking flow in level graph using DFS — no path can be augmented twice in same phase. Repeat until no augmenting path exists. O(V²E) general, O(E√V) for unit capacity graphs. Much faster than Edmonds-Karp in practice. Key optimization: advance/retreat/retreat pointers to avoid revisiting dead ends.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Dinic+algorithm+max+flow+C%2B%2B+level+graph+blocking+flow",label:"Dinic's Algorithm C++"},{type:"web",url:"https://cp-algorithms.com/graph/dinic.html",label:"CP-Algorithms Dinic's"}],
          "Run Dinic's on a 6-node network. Show level graph after first BFS. Trace blocking flow DFS.",
          "🚀 TASK: Implement (1) Dinic's with level graph BFS + blocking flow DFS, (2) advance/retreat optimization for dead ends, (3) unit capacity Dinic's achieving O(E√V), (4) compare Dinic's vs Edmonds-Karp on large network, (5) max bipartite matching using Dinic's, (6) project selection with max flow, (7) minimum path cover in DAG using max flow.",
          "2.5 hrs"),
        d(6,"Bridges, SCC Applications & Graph Decomposition",
          "Apply bridge/SCC theory to harder problems.",
          "Bridge tree: contract 2-edge-connected components into nodes, bridges become edges — a tree. Any query about edge-connectivity reduces to path queries on bridge tree. Block-cut tree: contract biconnected components into nodes, articulation points become edges — a tree. Ear decomposition: decompose graph into ears (simple paths/cycles). DFS tree + back edges is an ear decomposition.",
          [{type:"yt",url:"https://youtube.com/results?search_query=bridge+tree+block+cut+tree+biconnected+components+C%2B%2B",label:"Bridge Tree & Block-Cut Tree"},{type:"web",url:"https://cp-algorithms.com/graph/bridge-searching.html",label:"CP-Algorithms Bridges"}],
          "Find bridge tree of a graph with multiple 2-edge-connected components. Build block-cut tree showing articulation points.",
          "🚀 TASK: Implement (1) find all bridges and build bridge tree, (2) find all articulation points and build block-cut tree, (3) count paths between u and v passing through at least K bridges, (4) make graph 2-edge-connected by adding minimum edges, (5) dominators: find dominator tree of directed graph, (6) ear decomposition of 2-connected graph.",
          "2.5 hrs"),
        d(7,"Week 1 Project — Network Analysis Platform",
          "Build a comprehensive network analysis tool with all advanced graph algorithms.",
          "Enterprise network analysis requires every advanced graph technique: max flow for throughput, MCMF for cost optimization, 2-SAT for configuration validation, matching for resource assignment, centroid decomposition for path analytics.",
          [{type:"yt",url:"https://youtube.com/results?search_query=network+analysis+graph+algorithms+C%2B%2B+advanced+project",label:"Network Analysis Platform"},{type:"web",url:"https://www.geeksforgeeks.org/graph-based-network-analysis/",label:"GFG Network Analysis"}],
          "Model a 15-node enterprise network. Plan which algorithm handles each analysis.",
          "🚀 PROJECT: Build 'Network Analysis Platform': (1) max throughput — Dinic's max flow, (2) min-cost routing — MCMF for cheapest K-unit path, (3) reliability — bridge tree weakest link, (4) configuration validation — 2-SAT for router settings consistency, (5) resource assignment — MCMF-based optimal task-server assignment, (6) centroid decomp for path count queries, (7) bottleneck: which edge removal most degrades max-flow?, (8) incremental edge additions with partial recomputation.",
          "3.5 hrs"),
      ],
      project:{ id:"aw1", title:"Network Analysis Platform",
        desc:"A C++ enterprise network analysis system. Dinic's max flow for throughput. MCMF for min-cost K-unit routing. Bridge tree for reliability analysis. 2-SAT for router configuration validation. Centroid decomposition for O(log²n) path-count queries. MCMF-based resource assignment. Bottleneck identification by edge removal impact. Supports incremental edge additions." }
    },

    // ── Week 2 ──────────────────────────────────────────────────────────────
    { week:2, title:"Advanced DP Optimization", timeRange:"16–18 hrs",
      days:[
        d(8,"Divide & Conquer DP & Knuth Optimization",
          "Reduce O(n³) DP to O(n² log n) or O(n²) when opt is monotone.",
          "D&C DP: when dp[i][j] = min over k<j of (dp[i-1][k] + cost[k][j]) and opt(i,j) ≤ opt(i,j+1). Compute dp[i] layer by recurse(lo,hi,opt_lo,opt_hi). O(n log n) per layer. Knuth optimization: additionally requires cost to satisfy quadrangle inequality — opt[i][j] ≤ opt[i+1][j] (monotone in both arguments) → O(n²).",
          [{type:"yt",url:"https://youtube.com/results?search_query=divide+conquer+DP+optimization+Knuth+C%2B%2B+tutorial",label:"D&C DP & Knuth Opt C++"},{type:"web",url:"https://cp-algorithms.com/dynamic_programming/divide-and-conquer-dp.html",label:"CP-Algorithms D&C DP"}],
          "Identify a DP where opt(i,j) is monotone. Apply D&C recursion. Show how each subproblem narrows the opt search range.",
          "🚀 TASK: Implement (1) D&C DP framework for monotone opt problems, (2) apply to 1D partition DP where cost[i][j] qualifies, (3) Knuth optimization for interval DP with quadrangle inequality verification, (4) optimal BST using Knuth O(n²), (5) stone merging using Knuth optimization, (6) diagnose why naive O(n³) and D&C O(n² log n) and Knuth O(n²) differ in practice with benchmarks.",
          "2.5 hrs"),
        d(9,"Aliens Trick (WQS Binary Search)",
          "Solve k-constrained DP in O(n log n log C) when cost is convex in k.",
          "Aliens trick: if dp[n][k] (optimize using exactly k operations) is convex in k, then for some penalty λ the unconstrained problem selects exactly k operations. Binary search on λ: unconstrained DP is usually O(n log n). O(n log n log C) total. Named after IOI 2016 Aliens problem. Applications: k-partition, k-median, minimum cost k-edge path.",
          [{type:"yt",url:"https://youtube.com/results?search_query=aliens+trick+WQS+binary+search+DP+optimization+C%2B%2B",label:"Aliens Trick WQS DP"},{type:"web",url:"https://codeforces.com/blog/entry/49691",label:"Codeforces WQS Binary Search"}],
          "Solve 'divide array into k parts minimizing sum of squares of sums' using aliens trick.",
          "🚀 TASK: Apply aliens trick to (1) minimum cost k-partition of array, (2) IOI Aliens: min cost to photograph k non-overlapping ranges, (3) k-means 1D clustering, (4) minimum jumps with penalty per jump, (5) resource allocation of exactly k units among n items, (6) prove convexity for a chosen DP by showing second differences are non-negative.",
          "2.5 hrs"),
        d(10,"SOS DP & Bitmask Convolution",
          "Compute sum over all subsets in O(n * 2^n).",
          "SOS DP: for each mask m, f[m] = sum of g[s] for all s ⊆ m. dp[m][i] = sum over s differing from m only in bits 0..i-1. Transition: if bit i set: dp[m][i] = dp[m][i-1] + dp[m^(1<<i)][i-1]. O(n * 2^n). AND/OR/XOR convolution (Fast Walsh-Hadamard Transform) for subset/superset convolutions.",
          [{type:"yt",url:"https://youtube.com/results?search_query=SOS+DP+sum+over+subsets+bitmask+convolution+C%2B%2B",label:"SOS DP & FWHT C++"},{type:"web",url:"https://codeforces.com/blog/entry/45223",label:"Codeforces SOS DP"}],
          "Compute SOS DP for g=[1,2,3,4,5,6,7,8] indexed by bitmask 0-7. Verify f[7] = sum of all g[s] for s ⊆ 111₂.",
          "🚀 TASK: Implement (1) SOS DP in O(n * 2^n), (2) AND convolution, (3) OR convolution, (4) XOR convolution using Fast Walsh-Hadamard Transform, (5) count complete bipartite graphs using SOS on adjacency bitmasks, (6) minimum number of sets to cover all items, (7) subset sum reachability in O(2^n) using SOS.",
          "2.5 hrs"),
        d(11,"Slope Trick & Digit DP",
          "Piecewise linear DP; count numbers with digit constraints.",
          "Slope trick: represent convex piecewise linear functions by slope breakpoints (sorted list). Add |x-a|: push a to both heaps with correction — O(log n). Shift all: lazy offset O(1). Min value at transition. Digit DP: count numbers in [0,N] satisfying property. State: position, tight (≤ N's digit), accumulated property, leading zeros.",
          [{type:"yt",url:"https://youtube.com/results?search_query=slope+trick+digit+DP+C%2B%2B+tutorial+optimization",label:"Slope Trick & Digit DP"},{type:"web",url:"https://codeforces.com/blog/entry/77404",label:"Codeforces Slope Trick"}],
          "Apply slope trick to 'min cost make array non-decreasing' on [10,20,5,15]. Show function shape after each element.",
          "🚀 TASK: Apply slope trick to (1) min cost non-decreasing array, (2) USACO Landscaping: level terrain, (3) min ops to make all elements equal. Digit DP: (4) count numbers in [1,N] with digit sum divisible by K, (5) count numbers with no two adjacent equal digits, (6) count beautiful numbers (even≥odd digits), (7) count palindromic numbers in range.",
          "2.5 hrs"),
        d(12,"Li Chao Tree & SMAWK",
          "Dynamic CHT in O(log n); row minima of totally monotone matrices in O(n+m).",
          "Li Chao tree: segment tree on x-coordinates. Each node stores line best at segment midpoint. Insert O(log C), query O(log C) — handles online arbitrary-order insertions. SMAWK: finds row minima of totally monotone matrix in O(n+m). Verify totally monotone: every submatrix is monotone (row min column non-decreasing).",
          [{type:"yt",url:"https://youtube.com/results?search_query=Li+Chao+tree+SMAWK+algorithm+C%2B%2B+DP+optimization",label:"Li Chao Tree & SMAWK"},{type:"web",url:"https://cp-algorithms.com/dynamic_programming/convex_hull_trick.html",label:"CP-Algorithms Li Chao"}],
          "Insert lines y=2x+3, y=-x+10, y=3x-2 into Li Chao tree on [0,10]. Query min at x=2,5,8.",
          "🚀 TASK: Implement (1) Li Chao tree with addLine and queryMin, (2) Li Chao tree for line segments, (3) online DP: add line per state, query min at point, (4) SMAWK for row minima of totally monotone matrix, (5) verify matrix is totally monotone, (6) k-partition DP using SMAWK O(n log n), (7) nearest colored ancestor on tree using auxiliary Li Chao trees.",
          "2.5 hrs"),
        d(13,"Persistent Structures & Offline Algorithms",
          "Historical version queries; process queries in optimal offline order.",
          "Persistent segment tree: O(log n) new nodes per update, O(n + k log n) total space. Query any version in O(log n). Applications: Kth smallest in range [l,r] using two version roots (coordinate-compressed). Offline divide & conquer: process queries by dividing time range in half, handle cross-boundary queries at midpoint — O(n log n) for many problems.",
          [{type:"yt",url:"https://youtube.com/results?search_query=persistent+segment+tree+offline+divide+conquer+C%2B%2B",label:"Persistent Tree & Offline D&C"},{type:"web",url:"https://cp-algorithms.com/data_structures/persistent-segment-tree.html",label:"CP-Algorithms Persistent"}],
          "Build persistent segment tree. After updating index 2, show shared vs new nodes.",
          "🚀 TASK: Implement (1) persistent segment tree, (2) Kth smallest in range [l,r] using persistent seg tree, (3) count inversions in range [l,r] using persistent BIT, (4) range mode query using persistence, (5) offline D&C for dynamic connectivity (add/remove edges), (6) rollback segment tree for undo operations, (7) compare persistent vs non-persistent overhead.",
          "2.5 hrs"),
        d(14,"Week 2 Project — DP Optimization Engine",
          "Build a library applying all DP optimization techniques with recognizers.",
          "Each optimization requires recognizing when it applies. Library includes recognizers (analyze transition, suggest optimization) and optimized solvers. This is what CF 2800+ rated programmers build as their personal library.",
          [{type:"yt",url:"https://youtube.com/results?search_query=DP+optimization+library+competitive+programming+C%2B%2B",label:"DP Optimization Library"},{type:"web",url:"https://codeforces.com/blog/entry/8219",label:"Codeforces DP Optimization Guide"}],
          "For each optimization state the condition: CHT (linear cost in j), D&C (monotone opt), Knuth (quadrangle inequality), SMAWK (totally monotone), Aliens (convex in k).",
          "🚀 PROJECT: Build 'DP Optimization Engine': (1) offline CHT (sorted slopes) with deque, (2) online CHT with Li Chao tree, (3) D&C DP for monotone opt, (4) Knuth optimization with quadrangle check, (5) SMAWK solver, (6) aliens/WQS for k-constrained problems, (7) slope trick solver, (8) benchmark naive vs optimized — show actual speedup on large n.",
          "3.5 hrs"),
      ],
      project:{ id:"aw2", title:"DP Optimization Engine",
        desc:"A C++ library with optimized solvers for all major DP optimizations: offline CHT O(n) monotone queue, online CHT Li Chao tree O(n log C), D&C DP O(n log n), Knuth O(n²), SMAWK O(n+m), WQS/aliens trick O(n log n log C), slope trick O(n log n). Includes correctness verification against naive solutions and runtime benchmarks." }
    },

    // ── Weeks 3–12 (condensed — full content in weeks 3-12) ─────────────────
    { week:3, title:"Expert Strings & Automata", timeRange:"16–18 hrs",
      days:[
        d(15,"Palindromic Tree (Eertree)",
          "Store all distinct palindromic substrings in O(n) space and time.",
          "Palindromic tree: n+2 nodes (at most n+1 distinct palindromes plus roots). Each node = unique palindromic substring; stores length, suffix link (longest proper palindromic suffix), children map. Build online: for each new char find longest palindromic suffix via suffix links, extend or create new node. O(n) total. Applications: count/enumerate distinct palindromes, palindrome factorization.",
          [{type:"yt",url:"https://youtube.com/results?search_query=palindromic+tree+eertree+C%2B%2B+implementation+tutorial",label:"Palindromic Tree C++"},{type:"web",url:"https://cp-algorithms.com/string/eertree.html",label:"CP-Algorithms Eertree"}],
          "Build palindromic tree for 'abacaba'. Show each node and suffix link. Count distinct palindromes.",
          "🚀 TASK: Implement (1) palindromic tree online construction, (2) count distinct palindromes, (3) count total palindromic substrings, (4) longest palindromic substring O(n), (5) minimum palindrome factorization, (6) palindromic series — periodic palindromes, (7) compare eertree vs Manacher's — what extra info each gives.",
          "2.5 hrs"),
        d(16,"Generalized Suffix Automaton",
          "SAM for multiple strings — cross-string substring queries in O(n).",
          "GSAM: build SAM on multiple strings. Reset last pointer to initial state between strings. Accepts all substrings of all input strings. Applications: longest common substring of K strings, substrings in at least K strings. At most 2*(sum of lengths) states.",
          [{type:"yt",url:"https://youtube.com/results?search_query=generalized+suffix+automaton+multiple+strings+C%2B%2B",label:"Generalized SAM C++"},{type:"web",url:"https://cp-algorithms.com/string/suffix-automaton.html",label:"CP-Algorithms SAM Generalized"}],
          "Build GSAM for 'abc' and 'bcd'. Which substrings appear in both? What is LCS?",
          "🚀 TASK: Implement (1) GSAM for multiple strings, (2) LCS of K strings, (3) substrings in at least K of N strings, (4) find which strings contain given pattern, (5) streaming GSAM with queries between additions, (6) compare GSAM vs Aho-Corasick — when each is preferred.",
          "2 hrs"),
        d(17,"Lyndon Factorization & String Regularities",
          "Duval's algorithm; find all periods, borders, and runs.",
          "Lyndon word: string strictly smaller than all rotations. Duval's algorithm: O(n) time O(1) space — maintain current attempt, extend or restart. Lexicographically smallest rotation: Booth's algorithm O(n). Runs (maximal repetitions): O(n) runs in any string. Find all runs using suffix array + LCP in O(n log n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=Lyndon+factorization+Duval+string+regularities+C%2B%2B",label:"Lyndon & Runs C++"},{type:"web",url:"https://cp-algorithms.com/string/lyndon_factorization.html",label:"CP-Algorithms Lyndon"}],
          "Find Lyndon factorization of 'mississippi' using Duval's. Find smallest rotation.",
          "🚀 TASK: Implement (1) Duval's Lyndon factorization, (2) Booth's smallest rotation, (3) all borders using KMP failure function, (4) minimal period, (5) check if string is a power of another, (6) find all runs O(n log n), (7) Lyndon array — length of longest Lyndon word starting at each position.",
          "2 hrs"),
        d(18,"Advanced Hashing & Bloom Filters",
          "Randomized hashing; approximate membership with Bloom filters.",
          "Anti-hack hashing: randomize p and M at runtime. Double hashing with two (p,M) pairs: collision probability ~1/(M₁*M₂). Bloom filter: k hash functions, k bits per insert. False positive rate = (1-e^(-kn/m))^k. MinHash for Jaccard similarity. SimHash for cosine similarity. LSH for approximate nearest neighbor.",
          [{type:"yt",url:"https://youtube.com/results?search_query=advanced+hashing+bloom+filter+MinHash+LSH+C%2B%2B",label:"Advanced Hashing C++"},{type:"web",url:"https://cp-algorithms.com/string/string-hashing.html",label:"CP-Algorithms Hashing"}],
          "Compute MinHash signature for {a,b,c,d} and {b,c,d,e}. Estimate Jaccard similarity.",
          "🚀 TASK: Implement (1) randomized polynomial hashing at runtime, (2) double hashing with collision analysis, (3) Bloom filter with configurable false positive rate, (4) MinHash for Jaccard similarity, (5) SimHash for near-duplicate documents, (6) stress test — generate adversarial inputs for single hash, verify double hashing resists.",
          "2 hrs"),
        d(19,"Week 3 Project — Bioinformatics Sequence Analyzer",
          "Apply all expert string algorithms to DNA sequence analysis.",
          "Bioinformatics is the premier string algorithms application domain. DNA = strings over {A,C,G,T}. Finding repeats requires suffix arrays. Aligning sequences requires edit distance. Conserved regions across species require GSAM.",
          [{type:"yt",url:"https://youtube.com/results?search_query=bioinformatics+string+algorithms+C%2B%2B+DNA+sequence+analysis",label:"Bioinformatics Sequence Algs"},{type:"web",url:"https://en.wikipedia.org/wiki/Bioinformatics_algorithms",label:"Wikipedia Bioinformatics Algs"}],
          "Plan pipeline: parse FASTA → suffix array indexing → GSAM multi-species queries → output report.",
          "🚀 PROJECT: Build 'Bioinformatics Sequence Analyzer': (1) FASTA parser, (2) repeat finder — all maximal repeats using suffix array + LCP, (3) tandem repeat detection — microsatellites via runs, (4) GSAM conserved regions across multiple species, (5) global alignment (Needleman-Wunsch) + local alignment (Smith-Waterman), (6) palindromic tree for hairpin structures, (7) BWT + suffix array compression, (8) Aho-Corasick for known motif matching against genome.",
          "3.5 hrs"),
      ],
      project:{ id:"aw3", title:"Bioinformatics Sequence Analyzer",
        desc:"C++ bioinformatics toolkit. FASTA parser. Suffix array + LCP maximal repeat finding. GSAM for cross-species conserved regions. Needleman-Wunsch global alignment and Smith-Waterman local alignment. Palindromic tree for hairpin motifs. BWT-based compression. Aho-Corasick multi-motif search against genome sequences." }
    },

    { week:4, title:"Computational Geometry Advanced", timeRange:"14–16 hrs",
      days:[
        d(20,"Rotating Calipers & Line Sweep",
          "Convex hull diameter in O(n); segment intersection in O(n log n).",
          "Rotating calipers: rotate parallel supporting lines around convex polygon. Diameter: farthest point pair — rotate 180°, check antipodal pairs — O(n). Line sweep (Shamos-Hoey): detect any segment intersection — sort by x, maintain active set by y, check adjacent pairs at events — O(n log n). Bentley-Ottmann: find all k intersections in O((n+k) log n).",
          [{type:"yt",url:"https://youtube.com/results?search_query=rotating+calipers+line+sweep+segment+intersection+C%2B%2B",label:"Rotating Calipers & Line Sweep"},{type:"web",url:"https://en.wikipedia.org/wiki/Rotating_calipers",label:"Wikipedia Rotating Calipers"}],
          "Find diameter of convex hull of [(0,0),(4,0),(4,3),(0,3),(1,1)] using rotating calipers.",
          "🚀 TASK: Implement (1) convex hull diameter via rotating calipers, (2) minimum bounding rectangle, (3) Shamos-Hoey boolean intersection O(n log n), (4) area of union of rectangles via line sweep + segment tree, (5) skyline problem — sweep + max-heap, (6) closest pair via sweep O(n log n), (7) Minkowski sum of two convex polygons.",
          "2.5 hrs"),
        d(21,"Half-plane Intersection & Polygon Clipping",
          "Find intersection of half-planes; clip polygons against convex regions.",
          "Half-plane intersection: sort by angle, rotate sweep maintaining deque of active half-planes — O(n log n). Result is convex polygon. Applications: LP feasibility, kernel of polygon. Sutherland-Hodgman: clip convex polygon against each half-plane of convex region — O(n*m).",
          [{type:"yt",url:"https://youtube.com/results?search_query=half+plane+intersection+Sutherland+Hodgman+C%2B%2B+geometry",label:"Half-Plane Intersection C++"},{type:"web",url:"https://cp-algorithms.com/geometry/halfplane-intersection.html",label:"CP-Algorithms Half-plane"}],
          "Clip triangle (0,0)-(4,0)-(2,3) against y≥1. Apply Sutherland-Hodgman. Resulting polygon?",
          "🚀 TASK: Implement (1) Sutherland-Hodgman polygon clipping, (2) half-plane intersection O(n log n), (3) check if half-plane intersection is non-empty (LP feasibility), (4) kernel of polygon, (5) max inscribed circle using binary search + half-plane, (6) 2D LP using half-plane intersection, (7) visibility polygon from interior point.",
          "2.5 hrs"),
        d(22,"Week 4 Project — GIS Engine",
          "Build a Geographic Information System applying all geometry algorithms.",
          "GIS applies every geometry algorithm: spatial indexing, polygon operations, shortest path. This powers Google Maps, OpenStreetMap, and Uber's routing engine.",
          [{type:"yt",url:"https://youtube.com/results?search_query=GIS+computational+geometry+C%2B%2B+spatial+index",label:"GIS C++ Implementation"},{type:"web",url:"https://en.wikipedia.org/wiki/Geographic_information_system",label:"Wikipedia GIS"}],
          "Plan engine layers: coordinate representation → polygon storage → spatial index → query interface.",
          "🚀 PROJECT: Build 'GIS Engine': (1) grid-based spatial index for fast region queries, (2) point-in-polygon batch query, (3) polygon overlay: intersection/union via half-plane intersection, (4) buffer zones via Minkowski sum, (5) shortest path avoiding obstacles on visibility graph + Dijkstra, (6) Voronoi nearest facility O(log n) query, (7) line sweep coverage area, (8) convex hull of region.",
          "3.5 hrs"),
      ],
      project:{ id:"aw4", title:"GIS Engine",
        desc:"C++ GIS engine. Grid spatial index for batch point-in-polygon. Polygon overlay (intersection/union/difference) via Sutherland-Hodgman. Minkowski sum buffer zones. Visibility graph + Dijkstra for obstacle-aware routing. Voronoi nearest-facility queries. Line sweep total coverage area computation." }
    },

    { week:5, title:"Linear Programming & Approximation", timeRange:"14–16 hrs",
      days:[
        d(23,"Simplex Method",
          "Solve general linear programs using the simplex algorithm.",
          "LP: maximize c·x s.t. Ax≤b, x≥0. Simplex: pivot between feasible vertices. Standard form with slack variables. Tableau: augmented [A|I|b] with objective row. Pivot: select entering variable (most negative obj coefficient), leaving variable (min ratio test), row operations. Phase 1 for initial BFS. Duality: strong duality theorem.",
          [{type:"yt",url:"https://youtube.com/results?search_query=simplex+method+linear+programming+C%2B%2B+implementation",label:"Simplex Method C++"},{type:"web",url:"https://cp-algorithms.com/linear_algebra/linear-programming.html",label:"CP-Algorithms LP"}],
          "Solve LP: max 5x+4y s.t. 6x+4y≤24, x+2y≤6, x,y≥0. Build tableau, pivot to optimality.",
          "🚀 TASK: Implement (1) simplex with tableau, (2) Phase 1 for initial BFS, (3) detect infeasibility and unboundedness, (4) dual LP verification, (5) integer LP via branch and bound, (6) diet problem, (7) max flow as LP — compare solution.",
          "2.5 hrs"),
        d(24,"Approximation Algorithms",
          "Design and analyze approximation algorithms for NP-hard problems.",
          "2-approx vertex cover: both endpoints of each unmatched edge. Log-approx set cover: greedy add most-covering set. Christofides 3/2-approx TSP: MST + min-weight matching on odd-degree vertices + Euler circuit + shortcutting. FPTAS knapsack: scale values for (1+ε)-approx in O(n²/ε).",
          [{type:"yt",url:"https://youtube.com/results?search_query=approximation+algorithms+vertex+cover+Christofides+TSP+C%2B%2B",label:"Approximation Algorithms C++"},{type:"web",url:"https://www.geeksforgeeks.org/approximation-algorithms/",label:"GFG Approximation Algorithms"}],
          "Apply Christofides to 6-city metric graph: MST → odd-degree vertices → min matching → Euler → shortcut.",
          "🚀 TASK: Implement (1) 2-approx vertex cover, (2) greedy log-approx set cover, (3) Christofides-like 3/2-approx metric TSP, (4) FPTAS for 0/1 knapsack, (5) k-center clustering 2-approx, (6) compare approx ratios achieved vs worst-case guarantees.",
          "2.5 hrs"),
        d(25,"Week 5 Project — Operations Research Solver",
          "Combine LP, approximation, and exact algorithms for OR problems.",
          "OR problems: scheduling, logistics, resource allocation. This project shows when LP is exact, when approximation suffices, and when branch-and-bound is needed.",
          [{type:"yt",url:"https://youtube.com/results?search_query=operations+research+solver+C%2B%2B+scheduling+linear+programming",label:"OR Solver C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Operations_research",label:"Wikipedia Operations Research"}],
          "Model a warehouse routing problem. Which parts need LP, approx, exact?",
          "🚀 PROJECT: Build 'OR Solver': (1) LP simplex, (2) ILP branch and bound, (3) job shop scheduling approximation, (4) vehicle routing with Christofides + 2-opt, (5) Hungarian assignment, (6) bin packing: FFD approx vs ILP exact, (7) facility location greedy, (8) comparison mode: exact vs approx — quality vs time.",
          "3.5 hrs"),
      ],
      project:{ id:"aw5", title:"OR Solver",
        desc:"C++ OR solver combining simplex LP, branch-and-bound ILP, job-shop scheduling approximation, capacitated VRP with Christofides + 2-opt, Hungarian assignment, bin packing (FFD + ILP), and greedy facility location. Comparison mode shows quality vs time tradeoff for each method." }
    },

    { week:6, title:"Advanced Data Structures II", timeRange:"14–16 hrs",
      days:[
        d(26,"Van Emde Boas Tree",
          "O(log log U) operations on integers in universe [0,U).",
          "vEB tree: predecessor/successor/insert/delete/min/max in O(log log U). Structure: root summary has √U clusters of size √U, plus min/max shortcuts. Insert: if empty set min=max=x; else check if cluster empty, if so insert high(x) into summary; insert low(x) into cluster. Recursion depth O(log log U).",
          [{type:"yt",url:"https://youtube.com/results?search_query=van+Emde+Boas+tree+vEB+C%2B%2B+implementation",label:"Van Emde Boas Tree C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Van_Emde_Boas_tree",label:"Wikipedia vEB Tree"}],
          "Trace insert(3), insert(7), insert(5) into vEB universe=16. Query predecessor(6).",
          "🚀 TASK: Implement (1) vEB tree with insert, delete, member, min, max, predecessor, successor, (2) verify O(log log U) recursion depth, (3) Dijkstra with vEB priority queue, (4) integer sort using vEB, (5) compare vEB vs sorted array vs BST on different patterns.",
          "2.5 hrs"),
        d(27,"Streaming Algorithms",
          "Process data too large for memory using single-pass streaming.",
          "Boyer-Moore majority vote: candidate + count, replace when count=0. Count-min sketch: 2D array of hash functions, O(1) update/query with guaranteed overestimate. HyperLogLog: estimate distinct elements using O(log log n) bits. Reservoir sampling: uniform k-sample from unknown-length stream. Misra-Gries: elements with frequency > n/k.",
          [{type:"yt",url:"https://youtube.com/results?search_query=streaming+algorithms+count+min+sketch+HyperLogLog+C%2B%2B",label:"Streaming Algorithms C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Streaming_algorithm",label:"Wikipedia Streaming Algorithms"}],
          "Count-min sketch width=1000, depth=5. Process 10^6 elements. Measure overestimate error.",
          "🚀 TASK: Implement (1) Boyer-Moore majority vote, (2) count-min sketch, (3) HyperLogLog, (4) reservoir sampling, (5) Misra-Gries frequent elements, (6) streaming median — two heaps, (7) compare memory and accuracy: exact vs CMS vs HLL.",
          "2.5 hrs"),
        d(28,"Cache-Oblivious Algorithms",
          "Design algorithms optimal for all cache sizes without knowing cache parameters.",
          "Cache-oblivious: optimal for all memory hierarchy levels simultaneously. Recursive matrix multiply: quadrant decomposition achieves O(n³/B√M) cache misses automatically. Cache-oblivious merge sort: recursive halving achieves optimal O(n/B log_{M/B}(n/B)) cache misses. Van Emde Boas tree layout: pack tree nodes recursively for cache-efficient traversal.",
          [{type:"yt",url:"https://youtube.com/results?search_query=cache+oblivious+algorithms+matrix+multiply+merge+sort+C%2B%2B",label:"Cache-Oblivious Algorithms"},{type:"web",url:"https://en.wikipedia.org/wiki/Cache-oblivious_algorithm",label:"Wikipedia Cache-Oblivious"}],
          "Count cache misses: naive vs recursive matrix multiply on 64×64 matrix with cache line B=8.",
          "🚀 TASK: Implement (1) cache-oblivious matrix multiply (recursive quadrant), (2) cache-oblivious merge sort, (3) measure cache misses using valgrind --cachegrind, (4) vEB tree layout for static tree, (5) cache-oblivious transpose, (6) demonstrate optimal block size B=√(cache_size) matches cache-oblivious performance.",
          "2.5 hrs"),
        d(29,"Week 6 Project — High Performance DSA Library",
          "Build a production-grade library with SIMD, cache efficiency, and benchmarks.",
          "High-performance computing requires hardware-aware implementations. This library demonstrates that implementation quality matters as much as algorithm choice.",
          [{type:"yt",url:"https://youtube.com/results?search_query=high+performance+data+structures+C%2B%2B+SIMD+cache+benchmarks",label:"High Perf DSA Library"},{type:"web",url:"https://abseil.io/",label:"Abseil High-Perf C++"}],
          "Profile existing code with perf. Which structures have the most cache misses? Which benefit from SIMD?",
          "🚀 PROJECT: Build 'High Performance DSA Library': (1) cache-oblivious segment tree: vEB recursive layout, (2) B+-tree with 64-byte aligned nodes for cache line efficiency, (3) CSR graph format for sequential BFS/DFS access, (4) memory pool allocator: slab-based for same-size objects, (5) benchmark suite: compare each vs standard library with perf measurements, (6) document cache miss rates and throughput for each structure.",
          "3.5 hrs"),
      ],
      project:{ id:"aw6", title:"High Performance DSA Library",
        desc:"C++ high-performance DSA library. Cache-oblivious segment tree with vEB recursive layout reduces cache misses significantly. B+-tree with cache-line aligned nodes for fast scans. CSR graph format for sequential access in BFS/DFS. Slab memory pool eliminates malloc overhead. Benchmark suite measures latency, throughput, and cache miss rates." }
    },

    { week:7, title:"ICPC/IOI Level Problem Solving", timeRange:"16–18 hrs",
      days:[
        d(30,"ICPC Problem Solving Techniques",
          "Solve ICPC-difficulty problems requiring combined advanced algorithms.",
          "ICPC requires: quickly identifying which algorithm applies, handling mathematical edge cases, implementing cleanly under time pressure. Key skill: recognizing reductions — 'optimal assignment' → matching, 'feasible config' → 2-SAT, 'min-cost path with constraints' → MCMF. Build contest template with fast I/O.",
          [{type:"yt",url:"https://youtube.com/results?search_query=ICPC+level+problems+C%2B%2B+competitive+programming+advanced",label:"ICPC Problem Solving"},{type:"web",url:"https://codeforces.com/problemset?tags=*2500",label:"Codeforces 2500+ Problems"}],
          "Read 3 ICPC problems in 5 min each. Identify algorithmic reduction for each before attempting to solve.",
          "🚀 TASK: Solve (each within 45 min): (1) CF 2400+ problem involving flow + matching, (2) ICPC problem involving 2-SAT + geometry, (3) DP with CHT/D&C optimization, (4) HLD + segment tree on trees, (5) suffix automaton + DP. For each: write reduction before coding, clean implementation, test examples.",
          "3 hrs"),
        d(31,"IOI Subtask Strategy",
          "Incremental solutions for IOI partial scoring; subtask ladder approach.",
          "IOI strategy: (1) read all subtasks, (2) solve smallest first for guaranteed points, (3) incrementally improve. Subtask ladder: n≤10 (brute force) → n≤1000 (O(n²)) → n≤10^5 (O(n log n)) → n≤10^6 (O(n)). Interactive problems: binary search. Output-only problems. Full-score techniques: DP optimization, HLD, SAM.",
          [{type:"yt",url:"https://youtube.com/results?search_query=IOI+problem+solving+subtask+partial+scoring+C%2B%2B+strategy",label:"IOI Subtask Strategy"},{type:"web",url:"https://oi-wiki.org/",label:"OI Wiki"}],
          "Take an IOI problem with 4 subtasks. Write brute force for subtask 1. Identify structural property needed for each larger subtask.",
          "🚀 TASK: Solve 3 IOI-style problems with subtasks (60 min each): (1) IOI 2019 Shoes, (2) IOI 2017 Prize (interactive), (3) IOI 2020 Stations. Get full points on small subtasks, improve incrementally. Document which subtask required which insight.",
          "3 hrs"),
        d(32,"Advanced CP Research Problems",
          "Solve frontier problems; implement recent algorithmic research.",
          "Cutting edge: some problems require original insight. Skills: literature search (arxiv, ACM DL), reading editorial blogs, translating research to implementation. Recent advances: streaming algorithms, near-linear max flow, compressed string structures. Practice implementing algorithms from papers.",
          [{type:"yt",url:"https://youtube.com/results?search_query=competitive+programming+research+frontier+problems+advanced",label:"CP Research Problems"},{type:"web",url:"https://codeforces.com/blog/entry/92021",label:"CF Advanced CP Blog"}],
          "Read a recent CF Div 1 E/F editorial. Identify any technique not in standard textbooks.",
          "🚀 TASK: (1) solve a CF Div 1 F problem (3000+) — use editorial if needed but understand every line, (2) implement HyperLogLog from the original paper, (3) sublinear algorithm: estimate most frequent element with O(√n) passes, (4) write your own tutorial explaining one advanced algorithm you learned this week.",
          "3 hrs"),
        d(33,"Week 7 Project — CP Archive (30 Problems)",
          "Solve and document 30 hard problems across all advanced topics.",
          "These 30 problems, solved and understood deeply, represent mastery of the advanced curriculum. Each solution should be production-quality with documented key insight.",
          [{type:"yt",url:"https://youtube.com/results?search_query=competitive+programming+problem+archive+Codeforces+hard",label:"CP Problem Archive"},{type:"web",url:"https://codeforces.com/",label:"Codeforces"}],
          "Organize by topic. No hints first 30 min. Read editorial. Re-solve from scratch. Document key insight.",
          "🚀 PROJECT: Solve and document 30 advanced problems: Graph (1-5): Gomory-Hu tree, 2-SAT+geometry, MCMF assignment, centroid decomp, Dinic's max flow. String (6-10): SAM+DP, Aho-Corasick+DP, palindromic tree, suffix array, eertree. DP (11-15): aliens trick, SOS DP, slope trick, broken profile, bitmask TSP. Geometry (16-18): half-plane, rotating calipers, convex hull trick. Math (19-21): FFT, matrix exp, NTT. Data Structures (22-25): Li Chao, HLD+segtree, centroid+segtree, persistent tree. Misc (26-30): pick weakest topics. Record: key insight, algorithm, time taken.",
          "3.5 hrs"),
      ],
      project:{ id:"aw7", title:"CP Archive — 30 Hard Problems",
        desc:"Documented solutions to 30 advanced CP problems. Each includes: key insight (1 sentence), algorithms used, time complexity, tricky edge cases, and time to solve. Covers all expert topics: max flow + matching, 2-SAT, MCMF, centroid decomp, SAM+DP, palindromic tree, aliens trick, SOS DP, slope trick, half-plane intersection, FFT convolution, Li Chao tree, HLD, persistent segment tree." }
    },

    { week:8, title:"Parallel & Distributed Algorithms", timeRange:"14–16 hrs",
      days:[
        d(34,"Parallel Algorithms — OpenMP",
          "Design parallel algorithms for modern multi-core CPUs.",
          "Parallel prefix (scan): O(log n) depth, O(n) work. Parallel merge sort. Work stealing for load balancing. OpenMP pragmas: #pragma omp parallel for, reduction, critical. Amdahl's law: speedup = 1/(s + (1-s)/p) where s = serial fraction. Cache coherency: false sharing when threads write adjacent cache lines.",
          [{type:"yt",url:"https://youtube.com/results?search_query=parallel+algorithms+OpenMP+C%2B%2B+parallel+prefix+merge+sort",label:"Parallel Algorithms OpenMP C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Parallel_RAM",label:"Wikipedia Parallel Algorithms"}],
          "Compute parallel prefix sum of [3,1,4,1,5,9,2,6] using tree-based up/down sweep.",
          "🚀 TASK: Implement using OpenMP: (1) parallel prefix sum, (2) parallel merge sort, (3) parallel matrix multiplication, (4) parallel BFS with thread-safe queue, (5) parallel reduction sum/max, (6) measure speedup on 4/8 cores, (7) fix false sharing issue and measure improvement.",
          "2.5 hrs"),
        d(35,"Distributed Consensus — Raft",
          "Understand Raft consensus for fault-tolerant distributed systems.",
          "Raft: leader election (highest term + most up-to-date log wins), log replication (leader replicates entries to majority quorum), safety (log matching property). FLP impossibility: no deterministic consensus in async networks. Raft vs Paxos: Raft is more understandable, separates leader election from log replication. Used in: etcd, Consul, CockroachDB.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Raft+consensus+distributed+systems+algorithm+simulation+C%2B%2B",label:"Raft Consensus C++"},{type:"web",url:"https://raft.github.io/",label:"Raft Consensus Website"}],
          "Simulate Raft with 3 servers. Node 2 fails. Show leader election and log replication recovery.",
          "🚀 TASK: Implement (1) Raft leader election using randomized timeouts, (2) Raft log replication to followers, (3) verify log matching property on concurrent writes, (4) simulate node failure and recovery, (5) single-decree Paxos simulator for comparison, (6) Byzantine fault tolerance: simple agreement for 3f+1 nodes, (7) compare Raft vs Paxos message complexity.",
          "2.5 hrs"),
        d(36,"Week 8 Project — Distributed System Simulator",
          "Simulate a consensus cluster with streaming analytics.",
          "Combine Raft consensus with streaming algorithms for a realistic distributed analytics system: leaders coordinate, followers replicate, streaming analytics process the data stream.",
          [{type:"yt",url:"https://youtube.com/results?search_query=distributed+system+simulator+consensus+streaming+C%2B%2B",label:"Distributed System Simulator"},{type:"web",url:"https://en.wikipedia.org/wiki/Distributed_computing",label:"Wikipedia Distributed Computing"}],
          "Design the system: Raft cluster (3-5 nodes) + count-min sketch for frequency analytics + reservoir sampling for random sampling.",
          "🚀 PROJECT: Build 'Distributed Analytics Cluster': (1) Raft cluster: leader election + log replication among 5 simulated nodes, (2) failure injection: kill leader mid-operation, verify recovery, (3) count-min sketch analytics: distributed frequency estimation across nodes, (4) reservoir sampling: maintain uniform sample of stream across cluster, (5) consensus-based deduplication: deduplicate events using Raft-agreed sequence numbers, (6) split-brain detection: if network partition, detect and halt unsafe operations, (7) metrics: throughput, latency, consistency verification.",
          "3.5 hrs"),
      ],
      project:{ id:"aw8", title:"Distributed Analytics Cluster",
        desc:"A C++ distributed system simulator. Raft consensus cluster (5 nodes) with leader election and log replication. Failure injection tests recovery. Count-min sketch distributed frequency estimation. Reservoir sampling across nodes. Consensus-based event deduplication. Split-brain detection on network partition. Throughput/latency/consistency metrics." }
    },

    { week:9, title:"Advanced Mathematics & Number Theory", timeRange:"14–16 hrs",
      days:[
        d(37,"Advanced Number Theory",
          "Primality testing, factorization, and discrete logarithm.",
          "Miller-Rabin: O(k log² n) probabilistic primality — test a^(d) mod n for witnesses. Pollard's rho: O(n^(1/4)) factorization using Floyd's cycle detection on polynomial f(x) = x²+c mod n. Baby-step giant-step: solve a^x ≡ b (mod p) for discrete log in O(√p). Index calculus: sub-exponential DLP for large p.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Miller+Rabin+Pollard+rho+discrete+log+C%2B%2B+number+theory",label:"Advanced Number Theory C++"},{type:"web",url:"https://cp-algorithms.com/algebra/primality_tests.html",label:"CP-Algorithms Primality"}],
          "Run Miller-Rabin on n=341 with base 2. Show why it's a pseudoprime. Run Pollard's rho on n=8051.",
          "🚀 TASK: Implement (1) deterministic Miller-Rabin for n<3.3*10^24, (2) Pollard's rho factorization, (3) complete factorization combining trial division + Pollard's rho, (4) baby-step giant-step for discrete log, (5) primitive root finder for prime p, (6) quadratic sieve (simplified), (7) apply to cryptographic: verify RSA modulus is hard to factor.",
          "2.5 hrs"),
        d(38,"Advanced Combinatorics & Polynomial Methods",
          "Generating functions, polynomial operations, and combinatorial identities.",
          "Generating function: encode sequence as coefficients of polynomial. OGF (ordinary): a(n) = coefficient of x^n. EGF (exponential): a(n)/n! = coefficient. Multiplication = convolution of sequences. Formal power series: compose, invert, sqrt, log, exp — all using Newton's method O(n log n). Catalan, Bell numbers, Stirling via GFs.",
          [{type:"yt",url:"https://youtube.com/results?search_query=generating+functions+polynomial+methods+combinatorics+C%2B%2B",label:"Generating Functions C++"},{type:"web",url:"https://cp-algorithms.com/algebra/polynomial.html",label:"CP-Algorithms Polynomial"}],
          "Find OGF for Fibonacci numbers. Verify first 6 terms by expanding. Find EGF for derangements.",
          "🚀 TASK: Implement (1) formal power series multiplication via FFT, (2) power series inversion using Newton's method, (3) power series exp and log, (4) solve linear recurrence using GF in O(n log n), (5) count labeled trees of n vertices (Cayley's formula n^(n-2)) — verify via GF, (6) partition function p(n): count integer partitions using Euler's product formula.",
          "2.5 hrs"),
        d(39,"Week 9 Project — Cryptography Library",
          "Implement core cryptographic primitives using number theory.",
          "Cryptography is applied number theory. RSA, Diffie-Hellman, and ElGamal are direct applications of modular arithmetic, discrete logarithm, and primality. This project implements the mathematical foundations — not production security, but algorithmically correct.",
          [{type:"yt",url:"https://youtube.com/results?search_query=RSA+Diffie+Hellman+C%2B%2B+implementation+number+theory",label:"Crypto Number Theory C++"},{type:"web",url:"https://en.wikipedia.org/wiki/RSA_(cryptosystem)",label:"Wikipedia RSA"}],
          "Review RSA: key generation, encryption, decryption. How does Euler's theorem guarantee decryption works?",
          "🚀 PROJECT: Build 'Cryptography Library': (1) big integer arithmetic: add, multiply, modular ops for 512-bit numbers, (2) Miller-Rabin for primality of large primes, (3) RSA: key generation (find p,q using Miller-Rabin), encrypt, decrypt, (4) Diffie-Hellman: key exchange using discrete log hardness, (5) ElGamal encryption, (6) Baby-step giant-step attack on small DH parameters, (7) Pollard's rho factoring attack on weak RSA modulus, (8) timing analysis: measure how operations scale with key size.",
          "3.5 hrs"),
      ],
      project:{ id:"aw9", title:"Cryptography Library",
        desc:"C++ cryptographic primitives with number theory foundations. Big integer arithmetic for 512-bit numbers. Deterministic Miller-Rabin primality. RSA key generation, encryption, decryption. Diffie-Hellman key exchange. ElGamal encryption. Cryptanalysis: baby-step giant-step attack on small DH parameters, Pollard's rho attack on weak RSA. Performance scaling analysis." }
    },

    { week:10, title:"Research-Level Algorithms", timeRange:"14–16 hrs",
      days:[
        d(40,"Parameterized Complexity & FPT Algorithms",
          "Fixed-parameter tractable algorithms for NP-hard problems.",
          "Parameterized complexity: f(k) * poly(n) — exponential only in parameter k. Vertex cover FPT: bounded search tree 2^k * n. Kernel: reduce instance to poly(k) size. Vertex cover kernel: 2k vertices via LP relaxation. Color coding: find path of length k in O(2^k * m). Treewidth: many hard problems polynomial for bounded treewidth.",
          [{type:"yt",url:"https://youtube.com/results?search_query=parameterized+complexity+FPT+vertex+cover+kernel+C%2B%2B",label:"FPT Algorithms C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Parameterized_complexity",label:"Wikipedia Parameterized Complexity"}],
          "Solve vertex cover ≤ 3 on 10-node graph using bounded search tree. Count subproblems explored.",
          "🚀 TASK: Implement (1) vertex cover FPT: bounded search tree 2^k, (2) vertex cover 2k-kernel via LP relaxation, (3) color coding: detect path of length k in O(2^k * m), (4) feedback vertex set FPT in k, (5) tree decomposition: compute treewidth, (6) independent set FPT on bounded-treewidth graphs.",
          "2.5 hrs"),
        d(41,"Online & Competitive Algorithms",
          "Design algorithms for adversarial input sequences.",
          "Online algorithm: must process input one item at a time without future knowledge. Competitive ratio: cost(online) / cost(optimal offline). Ski rental: buy skis after B days of renting — 2-competitive. Paging (k-page cache): LRU is k-competitive, optimal offline is OPT (Belady's algorithm). List ordering: move-to-front is 2-competitive for accessing elements in varying order. Randomized competitive: reduce ratio using randomization.",
          [{type:"yt",url:"https://youtube.com/results?search_query=online+algorithms+competitive+ratio+ski+rental+LRU+C%2B%2B",label:"Online Algorithms C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Competitive_analysis_(online_algorithm)",label:"Wikipedia Competitive Analysis"}],
          "Ski rental: B=100 days to buy. What is the optimal break-even strategy? Prove 2-competitive.",
          "🚀 TASK: Implement (1) ski rental optimal threshold strategy, (2) LRU cache and verify k-competitive bound empirically, (3) Belady's optimal offline paging, (4) move-to-front list ordering and verify 2-competitive, (5) online bipartite matching: arrive one side at a time, (6) randomized ski rental for 1.58-competitive ratio.",
          "2.5 hrs"),
        d(42,"Week 10 Project — Algorithm Research Paper Implementation",
          "Implement a recent competitive programming algorithm from a research paper.",
          "Read, understand, and implement a recent algorithmic result. This is the highest-level skill: translating mathematical notation to working code, testing for correctness, optimizing for speed.",
          [{type:"yt",url:"https://youtube.com/results?search_query=competitive+programming+research+paper+implementation+C%2B%2B+tutorial",label:"Research Paper Implementation"},{type:"web",url:"https://arxiv.org/",label:"arXiv Research Papers"}],
          "Search arxiv or CF blog for a 2024 algorithm paper. Read abstract and introduction. Identify the core algorithmic idea.",
          "🚀 PROJECT: Choose one of: (1) implement near-linear max flow (King-Rao-Tarjan or Orlin's algorithm), (2) implement compressed suffix tree from latest construction paper, (3) implement the fastest known 3-sum algorithm with sub-quadratic improvement, (4) implement a recent string matching automaton construction. For your choice: implement from the paper, test on provided examples from paper, benchmark vs the complexity claimed, write a blog-post style explanation.",
          "3.5 hrs"),
      ],
      project:{ id:"aw10", title:"Research Algorithm Implementation",
        desc:"Implementation of a recent competitive programming / theoretical algorithm from a research paper. Includes reading the paper, implementing the core algorithm, testing against examples from the paper, benchmarking vs claimed complexity, and a blog-post style explanation of the key ideas in accessible language." }
    },

    { week:11, title:"System Design & Interview Mastery", timeRange:"14–16 hrs",
      days:[
        d(43,"System Design — Distributed Data Structures",
          "Design distributed systems using DSA principles.",
          "Consistent hashing: distribute keys among servers, minimize reshuffling when servers added/removed. Virtual nodes for balance. Chord DHT: each node responsible for keys between predecessor and itself, O(log n) lookup using finger table. Cassandra: consistent hashing + SSTable + Bloom filters. Google Bigtable: sorted string table (SSTable) + memtable + LSM tree. Redis: sorted sets using skip list + hash map.",
          [{type:"yt",url:"https://youtube.com/results?search_query=consistent+hashing+DHT+distributed+systems+design+C%2B%2B",label:"Distributed System Design"},{type:"web",url:"https://en.wikipedia.org/wiki/Consistent_hashing",label:"Wikipedia Consistent Hashing"}],
          "Design consistent hashing ring with 5 servers and virtual nodes. Add a server and show which keys migrate.",
          "🚀 TASK: Implement (1) consistent hashing ring with virtual nodes, (2) Chord DHT simplified: predecessor/successor lookup, finger table, O(log n) routing, (3) LSM tree: memtable + immutable SSTable + compaction, (4) skip list: the data structure powering Redis sorted sets, (5) design a distributed counter with strong consistency using Raft, (6) eventually-consistent counter using CRDTs (conflict-free replicated data types).",
          "2.5 hrs"),
        d(44,"Expert Interview Problems — Hardest Patterns",
          "Solve the hardest interview problems across all domains.",
          "Expert patterns: hard DP requires combining multiple DP ideas (bitmask + tree DP, interval + probability DP). Hard graph requires reduction to non-obvious problem type. Hard design requires custom data structure with multiple O(1) operations. Approach: 10 min problem analysis, 5 min complexity planning, 25 min coding, 5 min testing.",
          [{type:"yt",url:"https://youtube.com/results?search_query=expert+interview+problems+hard+LeetCode+FAANG+C%2B%2B",label:"Expert Interview Problems"},{type:"web",url:"https://leetcode.com/problemset/?difficulty=HARD",label:"LeetCode Hard Problems"}],
          "For each hard problem: state 3 approaches (brute force, better, optimal) with complexity before coding.",
          "🚀 TASK: Solve timed (30 min each): (1) Regular expression matching, (2) minimum window substring, (3) trapping rain water II (3D), (4) word ladder II (all shortest paths), (5) critical connections in network, (6) maximum frequency stack, (7) count palindromic subsequences, (8) smallest range covering K lists, (9) remove boxes (3D interval DP), (10) strange printer. For each: state approach before coding.",
          "3 hrs"),
        d(45,"Week 11 Project — System Design Deep Dive",
          "Design and implement core components of a distributed system.",
          "Combine distributed system concepts with expert DSA: design a system that uses consistent hashing for partitioning, Raft for consensus, Bloom filters for membership, LSM trees for storage, and skip lists for sorted operations.",
          [{type:"yt",url:"https://youtube.com/results?search_query=distributed+key+value+store+design+C%2B%2B+implementation",label:"KV Store Design C++"},{type:"web",url:"https://en.wikipedia.org/wiki/Distributed_hash_table",label:"Wikipedia DHT"}],
          "Design the system architecture on paper. Which DSA handles each component? What are the consistency/performance tradeoffs?",
          "🚀 PROJECT: Build 'Distributed Key-Value Store': (1) consistent hashing ring for key-to-node mapping, (2) LSM tree storage engine per node, (3) Bloom filter for fast negative lookups, (4) Raft replication between 3 replicas per shard, (5) range queries using skip list ordered index, (6) CRDT counters for eventually-consistent statistics, (7) rebalancing: add/remove nodes with minimal data movement, (8) benchmark: read/write throughput, p99 latency, consistency under failures.",
          "3.5 hrs"),
      ],
      project:{ id:"aw11", title:"Distributed Key-Value Store",
        desc:"A C++ distributed KV store integrating all expert DSA. Consistent hashing ring with virtual nodes partitions keys. LSM tree (memtable + SSTable + compaction) handles per-node storage. Bloom filters accelerate negative lookups. Raft ensures 3-replica consistency. Skip list supports O(log n) range queries. CRDT counters for eventual consistency. Live rebalancing with minimal migration on node add/remove." }
    },

    { week:12, title:"Final Capstone & Mastery Verification", timeRange:"14–16 hrs",
      days:[
        d(46,"Mastery Verification — All Topics",
          "Solve one expert problem from every major topic to verify complete mastery.",
          "True mastery means being able to solve any problem in each category within 45 minutes. This day tests whether you can solve cold problems across all 12 weeks of advanced material. No warm-up, no hints — cold problem solving is the target skill.",
          [{type:"yt",url:"https://youtube.com/results?search_query=competitive+programming+mastery+ICPC+IOI+problems+C%2B%2B",label:"CP Mastery Verification"},{type:"web",url:"https://codeforces.com/",label:"Codeforces Contests"}],
          "Do not look at categories before starting each problem. Solve cold. Time yourself.",
          "🚀 TASK: Solve one from each (45 min limit, cold): (1) expert graph (CF 2800+), (2) advanced DP optimization, (3) expert string algorithm, (4) computational geometry, (5) max flow application, (6) advanced math/number theory, (7) data structure design, (8) parallel algorithm. Score: how many solved within time limit?",
          "3 hrs"),
        d(47,"Capstone Project Planning",
          "Design and plan a full-stack project demonstrating all DSA mastery.",
          "A capstone project synthesizes everything: data structures power the backend, graph algorithms handle routing/recommendations, string algorithms enable search, DP handles optimization, and system design principles ensure scalability. This is the kind of project you put in your portfolio to demonstrate expert-level DSA.",
          [{type:"yt",url:"https://youtube.com/results?search_query=capstone+DSA+project+system+design+full+stack+C%2B%2B",label:"Capstone Project Design"},{type:"web",url:"https://github.com/",label:"GitHub Portfolio Projects"}],
          "Plan which DSA component handles each feature. Write the architecture document before any code.",
          "🚀 TASK: Design your capstone: choose from (a) competitive programming judge (full), (b) distributed search engine, (c) graph-based recommendation system, (d) real-time analytics platform. Create: (1) architecture diagram, (2) DSA component map — which algorithm handles each feature, (3) complexity analysis of each component, (4) scalability plan — how does each component scale with 10× more data?, (5) implementation timeline: 4 weeks, 2 features per week.",
          "2 hrs"),
        d(48,"Week 12 Capstone Project — DSA Mastery Showcase",
          "Build the capstone project demonstrating complete mastery of all DSA.",
          "This is your magnum opus: a production-quality system that demonstrates mastery of every topic in the Advanced curriculum. It should be something you're proud to show in any technical interview or put on GitHub.",
          [{type:"yt",url:"https://youtube.com/results?search_query=advanced+DSA+capstone+project+portfolio+competitive+programming",label:"DSA Capstone Project"},{type:"web",url:"https://github.com/",label:"GitHub Portfolio"}],
          "Review your architecture plan. Start with the core data structure layer, then add algorithms, then build the interface.",
          "🚀 CAPSTONE PROJECT: Build your chosen system fully, incorporating: (1) at least 3 expert graph algorithms, (2) at least 2 DP optimization techniques, (3) at least 1 advanced string structure (SAM or suffix array), (4) at least 1 computational geometry algorithm, (5) a segment tree or BIT for range queries, (6) system design concepts: consistent hashing or distributed consensus, (7) comprehensive benchmarking showing all algorithms' performance, (8) clean documentation explaining each algorithmic choice and its complexity. Submit to GitHub with a full README.",
          "4 hrs"),
      ],
      project:{ id:"aw12", title:"DSA Mastery Capstone",
        desc:"A production-quality C++ system demonstrating mastery of the complete Advanced DSA curriculum. Incorporates at least 3 expert graph algorithms, 2 DP optimization techniques, an advanced string structure (SAM or suffix array), computational geometry, range query structures, and distributed system design concepts. Includes comprehensive benchmarking, Big-O analysis for each component, and full GitHub documentation with architecture diagrams." }
    },

  ]  // end advanced.weeks
};   // end advanced

// ─── Return all three levels ─────────────────────────────────────────────────
return { beginner, intermediate, advanced };
})();

// ============================================================
// dsa-steps.js — APP LOGIC (Part 2 of 2)
// Depends on: STRUCTURED_DSA_ROADMAP (defined in data section)
// ============================================================

const APP = (function() {
  'use strict';

  // ── Storage Keys ──────────────────────────────────────────
  const KEYS = {
    DSA_PROGRESS:  'roadmapDSA',
    REVISIONS:     'revisions',
    POMO_STATS:    'pomodoroStats',
    STREAKS:       'streaks',
    PROJECTS:      'projects',
    DSA_NOTES:     'dsaNotes',
    LAST_TAB:      'lastTab',
    POMO_DURATION: 'pomoDuration',
  };

  // ── State ─────────────────────────────────────────────────
  let dsaCurrentLevel = null;
  let dsaCurrentWeek  = null;

  // ── localStorage helpers ──────────────────────────────────
  function load(key, def) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch(e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  // ── Utility helpers ───────────────────────────────────────
  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function toast(msg, type='info') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg; el.className = 'show ' + type;
    setTimeout(() => el.className = '', 2800);
  }
  function openModal(id)  { document.getElementById(id)?.classList.add('show'); }
  function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }

  // ── Navigation ────────────────────────────────────────────
  function showDSAScreen(id) {
    ['dsa-screen-levels','dsa-screen-weeks','dsa-screen-days'].forEach(sid => {
      const el = document.getElementById(sid);
      if (el) el.style.display = sid === id ? 'block' : 'none';
    });
  }

  function selectDSALevel(levelKey) {
    dsaCurrentLevel = levelKey;
    localStorage.setItem('dsaCurrentLevel', levelKey);
    const levelData = STRUCTURED_DSA_ROADMAP[levelKey];
    if (!levelData) return;

    const titleEl = document.getElementById('dsa-weeks-title');
    if (titleEl) titleEl.textContent = levelData.label + ' (' + levelData.days + ' Days)';

    // Level summary bar
    const prog = load('dsa_struct_' + levelKey, {});
    let totalDays = 0, doneDays = 0;
    (levelData.weeks || []).forEach(w => {
      (w.days || []).forEach(d => {
        totalDays++;
        const key = 'w' + w.week + 'd' + d.num;
        if (prog[key] && prog[key].done) doneDays++;
      });
    });
    const pct = totalDays ? Math.round(doneDays / totalDays * 100) : 0;
    const summaryEl = document.getElementById('dsa-level-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="${levelKey}-summary ai-level-summary-bar">
          <div class="ai-sum-stat"><span class="ai-sum-val">${doneDays}</span><span class="ai-sum-lbl">Done</span></div>
          <div class="ai-sum-stat"><span class="ai-sum-val">${totalDays - doneDays}</span><span class="ai-sum-lbl">Left</span></div>
          <div class="ai-sum-stat"><span class="ai-sum-val">${pct}%</span><span class="ai-sum-lbl">Progress</span></div>
          <div class="ai-sum-prog-wrap">
            <div class="ai-sum-prog-bar">
              <div class="ai-sum-prog-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--c2),var(--c7))"></div>
            </div>
          </div>
        </div>`;
    }

    // Render weeks
    const weeksEl = document.getElementById('dsa-weeks-list');
    if (weeksEl) weeksEl.innerHTML = renderDSAWeeksList(levelData, prog);

    showDSAScreen('dsa-screen-weeks');
    renderInlineRevisions('dsa-inline-rev-weeks', 'dsa');
  }

  function renderDSAWeeksList(levelData, prog) {
    let html = '';
    (levelData.weeks || []).forEach(w => {
      let weekTotal = w.days ? w.days.length : 0;
      let weekDone = 0;
      (w.days || []).forEach(d => {
        const key = 'w' + w.week + 'd' + d.num;
        if (prog[key] && prog[key].done) weekDone++;
      });
      const weekPct = weekTotal ? Math.round(weekDone / weekTotal * 100) : 0;
      const complete = weekDone === weekTotal && weekTotal > 0;
      html += `
        <div class="ai-week-card${complete ? ' week-complete' : ''}" onclick="APP.selectDSAWeek(${w.week})">
          <div class="ai-week-header">
            <div class="ai-week-num">
              <span class="ai-week-num-lbl">WK</span>
              <span class="ai-week-num-val" style="color:var(--c2)">${w.week}</span>
            </div>
            <div class="ai-week-info">
              <div class="ai-week-title">${esc(w.title)}</div>
              <div class="ai-week-sub">${esc(w.timeRange || '')}</div>
              <span class="ai-week-time-badge">${weekDone}/${weekTotal} days</span>
            </div>
            <div class="ai-week-right">
              <div class="ai-week-prog-txt">${weekPct}%</div>
              <div class="ai-week-mini-prog"><div class="ai-week-mini-fill" style="width:${weekPct}%;background:linear-gradient(90deg,var(--c2),var(--c7))"></div></div>
            </div>
          </div>
        </div>`;
    });
    return html;
  }

  function selectDSAWeek(weekNum) {
    dsaCurrentWeek = weekNum;
    localStorage.setItem('dsaCurrentWeek', String(weekNum));
    const levelData = STRUCTURED_DSA_ROADMAP[dsaCurrentLevel];
    if (!levelData) return;
    const weekData = (levelData.weeks || []).find(w => w.week === weekNum);
    if (!weekData) return;

    const titleEl = document.getElementById('dsa-days-title');
    if (titleEl) titleEl.textContent = 'Week ' + weekNum + ' — ' + weekData.title;

    const prog = load('dsa_struct_' + dsaCurrentLevel, {});
    let totalDays = weekData.days ? weekData.days.length : 0;
    let doneDays = 0;
    (weekData.days || []).forEach(d => {
      const key = 'w' + weekNum + 'd' + d.num;
      if (prog[key] && prog[key].done) doneDays++;
    });
    const pct = totalDays ? Math.round(doneDays / totalDays * 100) : 0;

    const wkSumEl = document.getElementById('dsa-week-summary');
    if (wkSumEl) {
      wkSumEl.innerHTML = `
        <div class="ai-week-summary-bar">
          <div class="ai-wsum-stat"><span class="ai-wsum-val">${doneDays}</span><span class="ai-wsum-lbl">Done</span></div>
          <div class="ai-wsum-stat"><span class="ai-wsum-val">${totalDays - doneDays}</span><span class="ai-wsum-lbl">Left</span></div>
          <div class="ai-wsum-stat"><span class="ai-wsum-val">${pct}%</span><span class="ai-wsum-lbl">Week</span></div>
          <div class="ai-wsum-prog-wrap">
            <div class="ai-wsum-prog-bar">
              <div class="ai-wsum-prog-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--c2),var(--c7))"></div>
            </div>
          </div>
        </div>`;
    }

    const listEl = document.getElementById('dsa-structured-days-list');
    if (listEl) listEl.innerHTML = renderDSADayCards(weekData, prog, weekNum);

    showDSAScreen('dsa-screen-days');
    renderInlineRevisions('dsa-inline-rev-days', 'dsa');
  }

  function renderDSADayCards(weekData, prog, weekNum) {
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    let html = '';
    (weekData.days || []).forEach(d => {
      const key = 'w' + weekNum + 'd' + d.num;
      const state = prog[key] || {};
      const isDone = !!state.done;
      const isRevDue = revs.some(r => r.source === 'dsa' && !r.done && r.date <= todayStr && r.topicDay == d.num);

      html += `
        <div class="ai-s-day-card${isDone ? ' s-done' : ''}${isRevDue ? ' topic-rev-due' : ''}" id="dsa-sday-${weekNum}-${d.num}">
          <div class="ai-s-day-header" onclick="APP.toggleDSADay(${weekNum},${d.num})">
            <div class="ai-s-day-num">
              <span class="ai-s-day-lbl">DAY</span>
              <span class="ai-s-day-val" style="color:var(--c2)">${d.num}</span>
            </div>
            <div class="ai-s-day-info">
              <div class="ai-s-day-title">${esc(d.title)}</div>
              <div class="ai-s-day-meta">
                ${d.time ? `<span class="ai-s-time-badge">⏱ ${esc(d.time)}</span>` : ''}
                ${isDone ? '<span class="ai-s-done-badge">✓ Done</span>' : ''}
                ${isRevDue ? '<span class="ai-s-rev-badge">📖 Review Due</span>' : ''}
              </div>
            </div>
            <div class="ai-s-day-right">
              <div class="cb${isDone ? ' cb-checked' : ''}" onclick="event.stopPropagation();APP.toggleDSADone(${weekNum},${d.num})" title="${isDone ? 'Mark incomplete' : 'Mark complete'}">
                ${isDone ? '✓' : ''}
              </div>
              <div class="ai-s-expand-btn">›</div>
            </div>
          </div>
          <div class="ai-s-day-body">
            <div class="ai-s-body-inner">
              <div class="ai-s-section">
                <div class="ai-s-section-title">🎯 Goal</div>
                <div class="ai-s-text">${esc(d.goal)}</div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">📖 Explanation</div>
                <div class="ai-s-text">${esc(d.explanation)}</div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">🔗 Resources</div>
                <div class="ai-s-text">
                  ${(d.resources||[]).map(r => `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`).join('')}
                </div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">🧠 Practice</div>
                <div class="ai-s-practice ai-s-text">${esc(d.practice)}</div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">⚡ Task</div>
                <div class="ai-s-task ai-s-text">${esc(d.task)}</div>
              </div>
              ${d.time ? `
              <div class="ai-s-time-box">
                <span class="ai-s-time-ico">⏱</span>
                <span class="ai-s-time-text">Estimated time: ${esc(d.time)}</span>
              </div>` : ''}
            </div>
          </div>
        </div>`;
    });

    // Project card
    if (weekData.project) {
      const p = weekData.project;
      const projStatus = prog['proj_' + p.id] || 'not-started';
      const isOpen = false;
      html += `
        <div class="ai-proj-divider"><div class="ai-proj-divider-line"></div><div class="ai-proj-divider-label">Week Project</div><div class="ai-proj-divider-line"></div></div>
        <div class="ai-proj-card ai-proj-status-${projStatus}" id="dsa-proj-${esc(p.id)}">
          <div class="ai-proj-header" onclick="APP.toggleDSAProject('${esc(p.id)}')">
            <div class="ai-proj-icon">🚀</div>
            <div class="ai-proj-info">
              <span class="ai-proj-badge">PROJECT</span>
              <div class="ai-proj-title">${esc(p.title)}</div>
              <div class="ai-proj-meta">Week ${weekNum} Capstone</div>
            </div>
            <div class="ai-proj-status-pill">
              <span class="ai-proj-status">${projStatus.replace('-',' ')}</span>
              <span class="ai-proj-chevron">›</span>
            </div>
          </div>
          <div class="ai-proj-body">
            <div class="ai-proj-body-inner">
              <div class="ai-proj-desc-box">
                <div class="ai-proj-desc-label">Description</div>
                <div class="ai-proj-desc-text">${esc(p.desc)}</div>
              </div>
              <div class="ai-proj-status-btns">
                <button class="dsa-proj-status-btn spb-not-started${projStatus==='not-started'?' active':''}" onclick="APP.setDSAProjectStatus('${esc(p.id)}','not-started')">Not Started</button>
                <button class="dsa-proj-status-btn spb-in-progress${projStatus==='in-progress'?' active':''}" onclick="APP.setDSAProjectStatus('${esc(p.id)}','in-progress')">In Progress</button>
                <button class="dsa-proj-status-btn spb-completed${projStatus==='completed'?' active':''}" onclick="APP.setDSAProjectStatus('${esc(p.id)}','completed')">Completed</button>
              </div>
            </div>
          </div>
        </div>`;
    }
    return html;
  }

  function dsaGoBack() {
    if (dsaCurrentWeek !== null) {
      dsaCurrentWeek = null;
      selectDSALevel(dsaCurrentLevel);
    } else if (dsaCurrentLevel !== null) {
      dsaCurrentLevel = null;
      showDSAScreen('dsa-screen-levels');
    } else {
      window.location.href = 'index.html';
    }
  }

  // ── Sub-tab switching ─────────────────────────────────────
  function switchDSASub(sub, btn) {
    const subs = ['roadmap','revision','pomo','notes','projects'];
    subs.forEach(s => {
      const el = document.getElementById('dsa-sub-' + s);
      if (el) el.style.display = s === sub ? '' : 'none';
    });
    document.querySelectorAll('#dsa-subtab-bar .section-subtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else { const b = document.getElementById('dsa-subtab-' + sub); if (b) b.classList.add('active'); }
    if (sub === 'notes')    renderDSANotes();
    if (sub === 'projects') renderSectionProjects('dsa');
    if (sub === 'pomo')     { updateDSAPomoDisplay(); renderDSAPomoStats(); }
    if (sub === 'revision') renderDSARevisions();
  }

  // ── Day interaction ───────────────────────────────────────
  function toggleDSADay(weekNum, dayNum) {
    const el = document.getElementById('dsa-sday-' + weekNum + '-' + dayNum);
    if (el) el.classList.toggle('s-open');
  }

  function toggleDSADone(weekNum, dayNum) {
    const levelData = STRUCTURED_DSA_ROADMAP[dsaCurrentLevel];
    if (!levelData) return;
    const weekData = (levelData.weeks || []).find(w => w.week === weekNum);
    if (!weekData) return;
    const dayData = (weekData.days || []).find(d => d.num === dayNum);
    if (!dayData) return;

    const progKey = 'dsa_struct_' + dsaCurrentLevel;
    const prog = load(progKey, {});
    const key = 'w' + weekNum + 'd' + dayNum;
    if (!prog[key]) prog[key] = {};
    const wasDone = !!prog[key].done;
    prog[key].done = !wasDone;
    if (prog[key].done) {
      prog[key].completedDate = prog[key].completedDate || today();
      scheduleRevisions('dsa', dayNum, prog[key].completedDate, dayData.title);
      updateStreak('dsa', true);
      toast('✅ Day ' + dayNum + ' completed! Revisions scheduled 🔁', 'success');
    } else {
      toast('↩️ Day ' + dayNum + ' marked incomplete', 'info');
    }
    save(progKey, prog);
    selectDSAWeek(weekNum);
    updateHeader();
  }

  // ── Project ───────────────────────────────────────────────
  function toggleDSAProject(projId) {
    const card = document.getElementById('dsa-proj-' + projId);
    if (card) card.classList.toggle('ai-proj-open');
  }

  function setDSAProjectStatus(projId, status) {
    const progKey = 'dsa_struct_' + dsaCurrentLevel;
    const prog = load(progKey, {});
    prog['proj_' + projId] = status;
    save(progKey, prog);
    selectDSAWeek(dsaCurrentWeek);
    if (status === 'completed') toast('🚀 Project completed!', 'success');
  }

  // ── Search ────────────────────────────────────────────────
  function filterDSARoadmap() {
    const q = (document.getElementById('dsa-search')?.value || '').toLowerCase();
    document.querySelectorAll('#dsa-weeks-list .ai-week-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  }

  // ── Inline Revisions ──────────────────────────────────────
  function renderInlineRevisions(containerId, source) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    const due = revs.filter(r => r.source === source && !r.done && r.date <= todayStr);
    if (!due.length) { el.innerHTML = ''; return; }
    el.innerHTML = `
      <div class="inline-rev-panel">
        <div class="inline-rev-toggle" onclick="this.parentElement.classList.toggle('irp-open')">
          📖 <span>${due.length} revision${due.length > 1 ? 's' : ''} due</span>
          <span class="inline-rev-count">${due.length}</span>
          <span class="inline-rev-arrow">›</span>
        </div>
        <div class="inline-rev-list">
          ${due.map(r => `
            <div class="inline-rev-item">
              <div class="inline-rev-day">Day ${r.topicDay}</div>
              <div class="inline-rev-info">
                <div class="inline-rev-title">${esc(r.topicTitle)}</div>
                <div class="inline-rev-date">${r.date} · +${r.interval}d</div>
              </div>
              <button class="inline-rev-done-btn" onclick="APP.markDSAInlineRevDone(${r.id})">✓</button>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function markDSAInlineRevDone(id) {
    markDSARevDone(id);
  }

  // ── Pomodoro ──────────────────────────────────────────────
  const _dsaPomoState = {
    running: false, isBreak: false, seconds: 25*60, duration: 25,
    interval: null, alarmRinging: false
  };

  function updateDSAPomoDisplay() {
    const m = Math.floor(_dsaPomoState.seconds / 60);
    const s = _dsaPomoState.seconds % 60;
    const timeStr = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    const el = document.getElementById('dsa-pomo-time');
    if (el) el.textContent = timeStr;
    const btn = document.getElementById('dsa-pomo-toggle-btn');
    if (btn) btn.textContent = _dsaPomoState.running ? '⏸ Pause' : '▶ Start';
    const phase = document.getElementById('dsa-pomo-phase');
    if (phase) phase.textContent = _dsaPomoState.isBreak ? '☕ Break' : '🍅 Focus';
    const ring = document.getElementById('dsa-pomo-ring');
    if (ring) ring.style.display = _dsaPomoState.alarmRinging ? 'flex' : 'none';
  }

  function renderDSAPomoStats() {
    const stats = load(KEYS.POMO_STATS, {});
    const s = stats.dsa || { sessions: 0, totalMinutes: 0 };
    const el = document.getElementById('dsa-pomo-stats');
    if (el) el.innerHTML = `
      <div class="pomo-stat-row">
        <span class="pomo-stat-label">Sessions today</span>
        <span class="pomo-stat-val">${s.sessions || 0}</span>
      </div>
      <div class="pomo-stat-row">
        <span class="pomo-stat-label">Total focus time</span>
        <span class="pomo-stat-val">${s.totalMinutes || 0} min</span>
      </div>`;
    const badge = document.getElementById('dsa-notes-pomo-badge');
    if (badge) badge.textContent = (s.sessions || 0) + ' pomos';
  }

  function dsaPomoToggle() {
    if (_dsaPomoState.alarmRinging) {
      _dsaPomoState.alarmRinging = false;
      updateDSAPomoDisplay();
      return;
    }
    if (_dsaPomoState.running) {
      clearInterval(_dsaPomoState.interval);
      _dsaPomoState.interval = null;
      _dsaPomoState.running = false;
    } else {
      _dsaPomoState.running = true;
      _dsaPomoState.interval = setInterval(() => {
        _dsaPomoState.seconds--;
        if (_dsaPomoState.seconds <= 0) {
          clearInterval(_dsaPomoState.interval);
          _dsaPomoState.running = false;
          _dsaPomoState.alarmRinging = true;
          if (!_dsaPomoState.isBreak) {
            const stats = load(KEYS.POMO_STATS, {});
            if (!stats.dsa) stats.dsa = { sessions: 0, totalMinutes: 0 };
            stats.dsa.sessions++;
            stats.dsa.totalMinutes += _dsaPomoState.duration;
            save(KEYS.POMO_STATS, stats);
            toast('🍅 Pomodoro complete! Take a break.', 'success');
          } else {
            toast('☕ Break over! Back to work.', 'info');
          }
          _dsaPomoState.isBreak = !_dsaPomoState.isBreak;
          _dsaPomoState.seconds = _dsaPomoState.isBreak ? 5*60 : _dsaPomoState.duration*60;
          renderDSAPomoStats();
        }
        updateDSAPomoDisplay();
      }, 1000);
    }
    updateDSAPomoDisplay();
  }

  function dsaPomoReset() {
    clearInterval(_dsaPomoState.interval);
    _dsaPomoState.interval = null;
    _dsaPomoState.running = false;
    _dsaPomoState.alarmRinging = false;
    _dsaPomoState.isBreak = false;
    _dsaPomoState.seconds = _dsaPomoState.duration * 60;
    updateDSAPomoDisplay();
  }

  function dsaPomoSkip() {
    clearInterval(_dsaPomoState.interval);
    _dsaPomoState.interval = null;
    _dsaPomoState.running = false;
    _dsaPomoState.alarmRinging = false;
    _dsaPomoState.isBreak = !_dsaPomoState.isBreak;
    _dsaPomoState.seconds = _dsaPomoState.isBreak ? 5*60 : _dsaPomoState.duration*60;
    updateDSAPomoDisplay();
  }

  function setDSAPomoDuration() {
    const inp = document.getElementById('dsa-pomo-duration-inp');
    if (!inp) return;
    let val = parseInt(inp.value) || 25;
    val = Math.max(1, Math.min(120, val));
    _dsaPomoState.duration = val;
    save(KEYS.POMO_DURATION + '_dsa', val);
    if (!_dsaPomoState.running && !_dsaPomoState.isBreak) {
      _dsaPomoState.seconds = val * 60;
    }
    updateDSAPomoDisplay();
    toast('⏱ Duration set to ' + val + ' min', 'info');
  }

  // ── Notes ─────────────────────────────────────────────────
  function renderDSANotes() {
    const notes = load(KEYS.DSA_NOTES, []);
    const el = document.getElementById('dsa-notes-list');
    if (!el) return;
    if (!notes.length) { el.innerHTML = '<div class="notes-empty">No saved notes yet.</div>'; return; }
    el.innerHTML = notes.map(n => `
      <div class="note-card">
        <div class="note-card-header">
          <span class="note-date">${esc(n.date)}</span>
          <button class="note-del-btn" onclick="APP.deleteDSANote(${n.id})" title="Delete">✕</button>
        </div>
        <div class="note-content">${esc(n.text)}</div>
      </div>`).join('');
  }

  function dsaAutoSaveNotes() {
    const ta = document.getElementById('dsa-notes-ta');
    if (!ta) return;
    const words = ta.value.trim().split(/\s+/).filter(Boolean).length;
    const wc = document.getElementById('dsa-notes-wc');
    if (wc) wc.textContent = words + ' word' + (words !== 1 ? 's' : '');
    // Auto-save draft
    localStorage.setItem('dsaNotesDraft', ta.value);
  }

  function dsaSaveNotes() {
    const ta = document.getElementById('dsa-notes-ta');
    if (!ta || !ta.value.trim()) { toast('Write something first!', 'info'); return; }
    const notes = load(KEYS.DSA_NOTES, []);
    notes.unshift({ id: Date.now(), date: today(), text: ta.value.trim() });
    save(KEYS.DSA_NOTES, notes);
    ta.value = '';
    localStorage.removeItem('dsaNotesDraft');
    dsaAutoSaveNotes();
    renderDSANotes();
    toast('📝 Note saved!', 'success');
  }

  function deleteDSANote(id) {
    const notes = load(KEYS.DSA_NOTES, []);
    const idx = notes.findIndex(n => n.id === id);
    if (idx < 0) return;
    notes.splice(idx, 1);
    save(KEYS.DSA_NOTES, notes);
    renderDSANotes();
    toast('🗑️ Note deleted', 'info');
  }

  // ── Revision System ───────────────────────────────────────
  function scheduleRevisions(source, dayNum, completedDate, topicTitle) {
    const revs = load(KEYS.REVISIONS, []);
    const intervals = [1, 3, 7, 14, 30];
    const baseDate = new Date(completedDate);
    intervals.forEach(interval => {
      const revDate = new Date(baseDate);
      revDate.setDate(revDate.getDate() + interval);
      const dateStr = revDate.getFullYear() + '-' + String(revDate.getMonth()+1).padStart(2,'0') + '-' + String(revDate.getDate()).padStart(2,'0');
      // Don't duplicate
      const exists = revs.some(r => r.source === source && r.topicDay == dayNum && r.interval === interval);
      if (!exists) {
        revs.push({ id: Date.now() + interval, source, topicDay: dayNum, topicTitle, date: dateStr, interval, done: false, doneDate: null });
      }
    });
    save(KEYS.REVISIONS, revs);
  }

  let _dsaRevFilter = 'all';

  function renderDSARevisions() {
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    let filtered = revs.filter(r => r.source === 'dsa');
    if (_dsaRevFilter === 'due') filtered = filtered.filter(r => !r.done && r.date <= todayStr);
    else if (_dsaRevFilter === 'upcoming') filtered = filtered.filter(r => !r.done && r.date > todayStr);
    else if (_dsaRevFilter === 'done') filtered = filtered.filter(r => r.done);

    const el = document.getElementById('dsa-revision-list');
    if (!el) return;
    if (!filtered.length) {
      el.innerHTML = '<div class="rev-empty">No revisions ' + (_dsaRevFilter === 'due' ? 'due' : '') + ' yet.</div>';
      return;
    }
    filtered.sort((a,b) => a.date.localeCompare(b.date));
    el.innerHTML = filtered.map(r => {
      const isOverdue = !r.done && r.date < todayStr;
      const isDueToday = !r.done && r.date === todayStr;
      return `
        <div class="rev-card${r.done ? ' rev-done' : ''}${isOverdue ? ' rev-overdue' : ''}">
          <div class="rev-header">
            <div class="rev-date-badge${isDueToday ? ' rev-today' : ''}${isOverdue ? ' rev-late' : ''}">${r.date}</div>
            <div class="rev-info">
              <div class="rev-title">Day ${r.topicDay}: ${esc(r.topicTitle)}</div>
              <div class="rev-meta">+${r.interval}d interval · ${r.source.toUpperCase()}</div>
            </div>
            <button class="rev-done-btn${r.done ? ' done' : ''}" onclick="APP.markDSARevDone(${r.id})">${r.done ? '↩️' : '✓'}</button>
          </div>
        </div>`;
    }).join('');
  }

  function setDSARevFilter(f, btn) {
    _dsaRevFilter = f;
    document.querySelectorAll('#dsa-sub-revision .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderDSARevisions();
  }

  function markDSARevDone(id) {
    const revs = load(KEYS.REVISIONS, []);
    const r = revs.find(r => r.id == id);
    if (!r) return;
    r.done = !r.done;
    r.doneDate = r.done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderDSARevisions();
    renderInlineRevisions('dsa-inline-rev-weeks', 'dsa');
    renderInlineRevisions('dsa-inline-rev-days', 'dsa');
    toast(r.done ? '✅ Revision done!' : '↩️ Revision undone', r.done ? 'success' : 'info');
  }

  // ── Streak ────────────────────────────────────────────────
  function updateStreak(source, increment) {
    const streaks = load(KEYS.STREAKS, {});
    if (!streaks[source]) streaks[source] = { current: 0, max: 0, lastDate: null };
    const todayStr = today();
    if (increment) {
      if (streaks[source].lastDate !== todayStr) {
        streaks[source].current++;
        streaks[source].lastDate = todayStr;
        if (streaks[source].current > streaks[source].max) streaks[source].max = streaks[source].current;
      }
    }
    save(KEYS.STREAKS, streaks);
  }

  // ── Projects ──────────────────────────────────────────────
  function renderSectionProjects(section) {
    const projects = load(KEYS.PROJECTS, []);
    const filtered = projects.filter(p => p.source === section);
    const el = document.getElementById(section + '-projects-list');
    if (!el) return;
    if (!filtered.length) {
      el.innerHTML = '<div class="proj-empty">No projects yet. Add your first one!</div>';
      return;
    }
    el.innerHTML = filtered.map(p => `
      <div class="proj-card">
        <div class="proj-card-header">
          <div class="proj-card-title">${esc(p.name)}</div>
          <button class="proj-del-btn" onclick="APP.deleteProject(${p.id})" title="Delete">✕</button>
        </div>
        ${p.notes ? `<div class="proj-desc">${esc(p.notes)}</div>` : ''}
        <div class="proj-meta-row">
          ${p.tags ? `<span class="proj-tag">${esc(p.tags)}</span>` : ''}
          ${p.progress ? `<span class="proj-progress">${p.progress}%</span>` : ''}
          ${p.github ? `<a class="resource-link" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
          ${p.demo ? `<a class="resource-link" href="${esc(p.demo)}" target="_blank" rel="noopener">Demo</a>` : ''}
        </div>
      </div>`).join('');
  }

  function openProjectModal(source) {
    document.getElementById('proj-source').value = source;
    ['proj-name','proj-github','proj-demo','proj-files','proj-notes','proj-tags','proj-progress'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    openModal('modal-project');
  }

  function saveProject() {
    const source = document.getElementById('proj-source')?.value || 'dsa';
    const name   = document.getElementById('proj-name')?.value?.trim();
    if (!name) { toast('Enter a project name', 'info'); return; }
    const projects = load(KEYS.PROJECTS, []);
    projects.push({
      id:       Date.now(),
      source,
      name,
      github:   document.getElementById('proj-github')?.value?.trim() || '',
      demo:     document.getElementById('proj-demo')?.value?.trim() || '',
      files:    document.getElementById('proj-files')?.value || '',
      notes:    document.getElementById('proj-notes')?.value?.trim() || '',
      tags:     document.getElementById('proj-tags')?.value?.trim() || '',
      progress: document.getElementById('proj-progress')?.value || 0,
      date:     today(),
    });
    save(KEYS.PROJECTS, projects);
    closeModal('modal-project');
    renderSectionProjects(source);
    toast('🚀 Project added!', 'success');
  }

  function deleteProject(id) {
    const confirmText = document.getElementById('confirm-text');
    const confirmOk   = document.getElementById('confirm-ok');
    if (confirmText) confirmText.textContent = 'Delete this project? This cannot be undone.';
    if (confirmOk) confirmOk.onclick = () => {
      const projects = load(KEYS.PROJECTS, []);
      const idx = projects.findIndex(p => p.id === id);
      if (idx >= 0) {
        const src = projects[idx].source;
        projects.splice(idx, 1);
        save(KEYS.PROJECTS, projects);
        renderSectionProjects(src);
      }
      closeModal('modal-confirm');
      toast('🗑️ Project deleted', 'info');
    };
    openModal('modal-confirm');
  }

  // ── Header ────────────────────────────────────────────────
  function updateHeader() {
    // streak display removed — shown only on home page
  }

  // ── AI Modal stubs (for HTML compatibility) ───────────────
  function openAIModal()  { openModal('ai-modal-overlay'); }
  function closeAIModal() { closeModal('ai-modal-overlay'); }
  function setAITab(tab, btn) {
    document.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  function askAI() { toast('AI Mentor: Connect your API key in settings.', 'info'); }
  function saveAINote() { toast('AI note saved!', 'success'); }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    updateHeader();

    // Restore saved pomodoro duration
    const savedDur = load(KEYS.POMO_DURATION + '_dsa', 25);
    _dsaPomoState.duration = savedDur;
    _dsaPomoState.seconds  = savedDur * 60;
    const durInp = document.getElementById('dsa-pomo-duration-inp');
    if (durInp) durInp.value = savedDur;
    updateDSAPomoDisplay();

    // Restore saved note draft
    const draft = localStorage.getItem('dsaNotesDraft');
    const ta = document.getElementById('dsa-notes-ta');
    if (ta && draft) { ta.value = draft; dsaAutoSaveNotes(); }

    // Restore saved level/week
    try {
      const savedLevel = localStorage.getItem('dsaCurrentLevel');
      if (savedLevel && STRUCTURED_DSA_ROADMAP[savedLevel]) {
        selectDSALevel(savedLevel);
        const savedWeek = localStorage.getItem('dsaCurrentWeek');
        if (savedWeek !== null) selectDSAWeek(parseInt(savedWeek));
      }
    } catch(e) {}

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(o => {
      o.addEventListener('click', e => { if (e.target === o) o.classList.remove('show'); });
    });
  }

  // ── Public API ────────────────────────────────────────────
  return {
    // Navigation
    selectDSALevel, selectDSAWeek, dsaGoBack,
    showAILevels: function() { showDSAScreen('dsa-screen-levels'); dsaCurrentLevel = null; dsaCurrentWeek = null; },
    // Sub-tabs
    switchDSASub,
    // Day interaction
    toggleDSADay, toggleDSADone,
    // Projects
    toggleDSAProject, setDSAProjectStatus,
    openProjectModal, saveProject, deleteProject,
    // Search
    filterDSARoadmap,
    // Revision
    setDSARevFilter, markDSARevDone, markDSAInlineRevDone,
    // Pomo
    dsaPomoToggle, dsaPomoReset, dsaPomoSkip, setDSAPomoDuration,
    // Notes
    dsaAutoSaveNotes, dsaSaveNotes, deleteDSANote,
    // Modals
    openModal, closeModal, openAIModal, closeAIModal, setAITab, askAI, saveAINote,
    // Init
    init,
    // Alias for HTML onclick compatibility
    sectionPomoToggle: (s) => { if (s === 'dsa') dsaPomoToggle(); },
    sectionPomoReset:  (s) => { if (s === 'dsa') dsaPomoReset(); },
    sectionPomoSkip:   (s) => { if (s === 'dsa') dsaPomoSkip(); },
    setSectionPomoDuration: (s) => { if (s === 'dsa') setDSAPomoDuration(); },
    goBack: dsaGoBack,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  // Force #tab-dsa visible
  const panel = document.getElementById('tab-dsa');
  if (panel) { panel.classList.add('active'); panel.style.display = ''; }
  try { if (typeof APP !== 'undefined' && APP.init) APP.init(); } catch(e) { console.error(e); }
});
