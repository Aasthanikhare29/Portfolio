const challenges = [
  {
    id: 1,
    slug: "build-a-debounce-function",
    title: "Build a Debounce Function",
    subtitle: "Implement a debounce utility from scratch",
    excerpt:
      "Implement a debounce function that delays invoking the provided function until after a specified wait time has elapsed since the last invocation. Essential for search inputs and resize handlers.",
    content: `
## Problem Statement

Implement a debounce function that accepts a function and a delay in milliseconds. The debounced function should delay invoking the original function until after \`delay\` milliseconds have passed since the last time the debounced function was invoked.

## Requirements

- Accept a function and delay time
- Return a debounced version of the function
- The debounced function should accept any arguments
- Support \`cancel\` and \`flush\` methods
- Handle edge cases like rapid invocations

## Example Usage

\`\`\`javascript
const debouncedSearch = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
\`\`\`

## Test Cases

1. **Rapid calls** — Only the last call should execute after the delay
2. **Single call** — Should execute after the delay
3. **Cancel** — Pending execution should be cancelled
4. **Flush** — Should execute immediately with last arguments
5. **Arguments** — Should pass correct arguments to the original function

## Hints

- Use \`setTimeout\` and \`clearTimeout\`
- Store the timeout ID in a closure
- Consider using \`Date.now()\` for leading edge detection

## Difficulty

**Medium** — Requires understanding of closures and timers.

> "Debouncing is one of the most important patterns in frontend development."
`,
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    author: "Narendra",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2025-07-10",
    category: "JavaScript",
    tags: ["JavaScript", "Closures", "Timers", "Utility"],
    difficulty: "Medium",
    points: 50,
    timeLimit: "30 min",
    completions: 234,
    featured: true,
    tableOfContents: [
      { id: "problem-statement", title: "Problem Statement", level: 2 },
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "example-usage", title: "Example Usage", level: 2 },
      { id: "test-cases", title: "Test Cases", level: 2 },
      { id: "hints", title: "Hints", level: 2 },
      { id: "difficulty", title: "Difficulty", level: 2 },
    ],
  },
  {
    id: 2,
    slug: "react-paginated-list",
    title: "React Paginated List",
    subtitle: "Build a paginated data list with infinite scroll",
    excerpt:
      "Create a React component that fetches and displays paginated data with infinite scroll, loading states, error handling, and smooth animations. A classic frontend challenge.",
    content: `
## Problem Statement

Build a paginated list component that fetches data from an API and supports infinite scroll. The component should handle loading states, errors, and provide a smooth user experience.

## Requirements

- Fetch data from a paginated API endpoint
- Implement infinite scroll using IntersectionObserver
- Show loading skeleton during fetch
- Handle network errors gracefully
- Support "retry" on failure
- Smooth scroll animation for new items
- Clean up observers on unmount

## Component API

\`\`\`jsx
<PaginatedList
  fetchFn={fetchPosts}
  renderItem={(item) => <PostCard post={item} />}
  pageSize={20}
  emptyMessage="No posts found"
/>
\`\`\`

## Test Cases

1. **Initial load** — Show loading skeleton, then items
2. **Scroll to bottom** — Load next page automatically
3. **All loaded** — Show "no more items" message
4. **Network error** — Show error with retry button
5. **Empty data** — Show empty state message

## Hints

- Use \`useRef\` for the sentinel element
- Implement \`useInfiniteScroll\` custom hook
- Use \`AbortController\` for request cancellation
- Consider using \`useReducer\` for complex state

## Difficulty

**Hard** — Tests React fundamentals, hooks, and async patterns.

> "Infinite scroll is where React really shines with its declarative model."
`,
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    author: "Narendra",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2025-07-05",
    category: "React",
    tags: ["React", "Hooks", "API", "Infinite Scroll"],
    difficulty: "Hard",
    points: 100,
    timeLimit: "60 min",
    completions: 187,
    featured: false,
    tableOfContents: [
      { id: "problem-statement", title: "Problem Statement", level: 2 },
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "component-api", title: "Component API", level: 2 },
      { id: "test-cases", title: "Test Cases", level: 2 },
      { id: "hints", title: "Hints", level: 2 },
      { id: "difficulty", title: "Difficulty", level: 2 },
    ],
  },
  {
    id: 3,
    slug: "css-only-accordion",
    title: "CSS-Only Accordion",
    subtitle: "Build an accordion with zero JavaScript",
    excerpt:
      "Create a fully functional accordion component using only HTML and CSS. No JavaScript allowed. Tests your understanding of the checkbox hack and CSS transitions.",
    content: `
## Problem Statement

Build an expandable accordion component using only HTML and CSS. The accordion should support expanding/collapsing sections with smooth animations, and optionally allow only one section to be open at a time.

## Requirements

- Pure HTML + CSS, no JavaScript
- Smooth expand/collapse animation
- Accessible with proper ARIA semantics
- Only one section open at a time (optional)
- Keyboard navigable
- Responsive layout

## Solution Structure

\`\`\`html
<div class="accordion">
  <div class="accordion-item">
    <input type="checkbox" id="item-1" class="accordion-toggle" />
    <label for="item-1" class="accordion-header">Section 1</label>
    <div class="accordion-content">
      <p>Content for section 1</p>
    </div>
  </div>
</div>
\`\`\`

## Test Cases

1. **Click header** — Content should expand/collapse
2. **Animation** — Smooth height transition
3. **Accessibility** — Screen reader announces state
4. **Keyboard** — Tab and Enter work correctly
5. **Responsive** — Works on mobile devices

## Hints

- Use hidden checkbox + label technique
- \`max-height\` transition for expand animation
- Use \`sibling selector\` (\`~\`) to toggle content visibility
- Consider \`grid-template-rows: 0fr\` for modern approach

## Difficulty

**Easy** — Great introduction to CSS-only interactivity.

> "The best code is no code at all."
`,
    coverImage:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop",
    author: "Narendra",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2025-06-28",
    category: "CSS",
    tags: ["CSS", "HTML", "Accessibility", "Animation"],
    difficulty: "Easy",
    points: 30,
    timeLimit: "20 min",
    completions: 412,
    featured: false,
    tableOfContents: [
      { id: "problem-statement", title: "Problem Statement", level: 2 },
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "solution-structure", title: "Solution Structure", level: 2 },
      { id: "test-cases", title: "Test Cases", level: 2 },
      { id: "hints", title: "Hints", level: 2 },
      { id: "difficulty", title: "Difficulty", level: 2 },
    ],
  },
  {
    id: 4,
    slug: "implement-promise-all",
    title: "Implement Promise.all",
    subtitle: "Recreate the native Promise.all from scratch",
    excerpt:
      "Implement your own version of Promise.all that takes an iterable of promises and returns a single promise that resolves when all input promises resolve, or rejects with the first rejection.",
    content: `
## Problem Statement

Implement a function \`myPromiseAll\` that behaves exactly like the native \`Promise.all\` method. It should accept an iterable of promises and return a new promise.

## Requirements

- Accept an array/iterable of promises
- Return a promise that resolves with an array of results
- Resolve when ALL promises resolve
- Reject immediately if ANY promise rejects
- Handle non-promise values in the array
- Maintain order of results

## Example Usage

\`\`\`javascript
const promises = [
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

const [user, posts, comments] = await myPromiseAll(promises);
\`\`\`

## Test Cases

1. **All resolve** — Returns array of all results in order
2. **One rejects** — Rejects with that error immediately
3. **Mixed values** — Handles non-promise values
4. **Empty array** — Resolves with empty array
5. **Sequential timing** — Results maintain input order

## Hints

- Track resolved count
- Store results in order
- Use a counter to detect completion
- Wrap each promise with .then()

## Difficulty

**Medium** — Tests understanding of Promises and async patterns.

> "Understanding Promises deeply is the key to mastering async JavaScript."
`,
    coverImage:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=500&fit=crop",
    author: "Narendra",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2025-06-20",
    category: "JavaScript",
    tags: ["JavaScript", "Promises", "Async", "Fundamentals"],
    difficulty: "Medium",
    points: 60,
    timeLimit: "30 min",
    completions: 301,
    featured: false,
    tableOfContents: [
      { id: "problem-statement", title: "Problem Statement", level: 2 },
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "example-usage", title: "Example Usage", level: 2 },
      { id: "test-cases", title: "Test Cases", level: 2 },
      { id: "hints", title: "Hints", level: 2 },
      { id: "difficulty", title: "Difficulty", level: 2 },
    ],
  },
  {
    id: 5,
    slug: "accessible-modal-dialog",
    title: "Accessible Modal Dialog",
    subtitle: "Build a fully accessible modal with focus trapping",
    excerpt:
      "Create a modal dialog component that meets WCAG accessibility standards. Must handle focus trapping, keyboard navigation, screen reader announcements, and backdrop click to close.",
    content: `
## Problem Statement

Build an accessible modal dialog component that works for all users, including those using screen readers and keyboard navigation.

## Requirements

- Focus trap within the modal
- Close on Escape key
- Close on backdrop click
- Return focus to trigger element on close
- Proper ARIA attributes (role="dialog", aria-modal, aria-labelledby)
- Announce to screen readers when opened
- Prevent background scroll
- Support nested modals (bonus)

## Component API

\`\`\`jsx
<Modal
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
  <button onClick={onConfirm}>Yes</button>
  <button onClick={() => setOpen(false)}>No</button>
</Modal>
\`\`\`

## Test Cases

1. **Open** — Focus moves to first focusable element
2. **Tab** — Focus cycles through modal elements only
3. **Escape** — Modal closes, focus returns to trigger
4. **Backdrop** — Click closes modal
5. **Screen reader** — Title and description announced

## Hints

- Use \`useRef\` to track trigger element
- Query all focusable elements with \`querySelectorAll\`
- Use \`inert\` attribute on background content
- Consider using \`<dialog>\` element as base

## Difficulty

**Hard** — Deep accessibility knowledge required.

> "Accessibility is not a feature — it's a social trend and a moral imperative."
`,
    coverImage:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop",
    author: "Narendra",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2025-06-12",
    category: "UI Design",
    tags: ["Accessibility", "React", "WCAG", "Focus Management"],
    difficulty: "Hard",
    points: 80,
    timeLimit: "45 min",
    completions: 156,
    featured: false,
    tableOfContents: [
      { id: "problem-statement", title: "Problem Statement", level: 2 },
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "component-api", title: "Component API", level: 2 },
      { id: "test-cases", title: "Test Cases", level: 2 },
      { id: "hints", title: "Hints", level: 2 },
      { id: "difficulty", title: "Difficulty", level: 2 },
    ],
  },
  {
    id: 6,
    slug: "virtual-scroll-list",
    title: "Virtual Scroll List",
    subtitle: "Render 100k items without breaking the browser",
    excerpt:
      "Implement a virtual scrolling list that can handle 100,000+ items efficiently. Only render visible items in the viewport plus a small buffer. A critical performance challenge.",
    content: `
## Problem Statement

Build a virtual scrolling list component that renders only the visible items in the viewport. The list should handle 100,000+ items with smooth scrolling performance.

## Requirements

- Render only visible items + buffer
- Smooth scrolling at 60fps
- Variable height items (bonus)
- Dynamic item height calculation
- Scroll to index function
- Proper scroll position maintenance
- Accessible to screen readers

## Component API

\`\`\`jsx
<VirtualList
  items={hugeArray}
  height={600}
  itemHeight={80}
  renderItem={(item) => <ListItem data={item} />}
  overscan={5}
/>
\`\`\`

## Test Cases

1. **100k items** — Smooth scroll, no jank
2. **Scroll position** — Maintains correct position
3. **Buffer zone** — Items render before visible
4. **Dynamic heights** — Variable item sizes work
5. **Scroll to** — Programmatic scroll to index

## Hints

- Use \`transform: translateY()\` for scroll container
- Calculate visible range with \`scrollTop / itemHeight\`
- Use \`requestAnimationFrame\` for scroll handling
- Consider \`IntersectionObserver\` as alternative

## Difficulty

**Hard** — Advanced rendering optimization technique.

> "Performance is a feature. Virtual scrolling is how you ship it."
`,
    coverImage:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
    author: "Narendra",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2025-06-01",
    category: "Performance",
    tags: ["Performance", "React", "Optimization", "DOM"],
    difficulty: "Hard",
    points: 120,
    timeLimit: "60 min",
    completions: 98,
    featured: false,
    tableOfContents: [
      { id: "problem-statement", title: "Problem Statement", level: 2 },
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "component-api", title: "Component API", level: 2 },
      { id: "test-cases", title: "Test Cases", level: 2 },
      { id: "hints", title: "Hints", level: 2 },
      { id: "difficulty", title: "Difficulty", level: 2 },
    ],
  },
];

export default challenges;

export const categories = [
  "All",
  "JavaScript",
  "React",
  "CSS",
  "UI Design",
  "Performance",
  "Algorithms",
  "System Design",
];

export const difficulties = ["All", "Easy", "Medium", "Hard"];

export const allTags = [
  ...new Set(challenges.flatMap((c) => c.tags)),
];

export function getChallengeBySlug(slug) {
  return challenges.find((c) => c.slug === slug);
}

export function getRelatedChallenges(challenge, limit = 3) {
  return challenges
    .filter((c) => c.id !== challenge.id && c.category === challenge.category)
    .slice(0, limit);
}

export function getFeaturedChallenge() {
  return challenges.find((c) => c.featured);
}

export function getAdjacentChallenges(slug) {
  const index = challenges.findIndex((c) => c.slug === slug);
  const prev = index < challenges.length - 1 ? challenges[index + 1] : null;
  const next = index > 0 ? challenges[index - 1] : null;
  return { prev, next };
}

export function getStats() {
  const total = challenges.length;
  const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0);
  const totalCompletions = challenges.reduce((sum, c) => sum + c.completions, 0);
  return { total, totalPoints, totalCompletions };
}
