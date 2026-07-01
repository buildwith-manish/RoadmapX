// ═══════════════════════════════════════════════════════
//  ROADMAPX — FRONTEND NORMAL ROADMAP
//  File: normal-rm-fe.js  (data + logic, combined)
//  localStorage key: fe_normal_progress
// ═══════════════════════════════════════════════════════

const STRUCTURED_FE_ROADMAP = (function () {

function d(day, title, goal, explanation, resources, practice, task, time) {
  return { day, title, goal, explanation, resources, practice, task, time };
}

// ─────────────────────────────────────────────────────
//  🟢 BEGINNER — 45 Days / ~90 hrs
// ─────────────────────────────────────────────────────
const beginner = {
  label: '🟢 Beginner', days: 45, totalHours: 90,
  goal: 'HTML + CSS + JS Foundations',
  weeks: [

    // ── WEEK 1: HTML Basics ──
    {
      week: 1, title: 'HTML Basics — Structure & Semantics', timeRange: '10–12 hrs',
      days: [
        d(1, 'HTML Document Structure',
          'Understand what HTML is and how a web page is structured.',
          'HTML (HyperText Markup Language) is the skeleton of every web page. The document starts with <!DOCTYPE html>, followed by <html>, <head> (meta info), and <body> (visible content). Every element is a tag pair: <tag>content</tag>.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+document+structure+beginners+2024', label: 'HTML Structure Tutorial' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML', label: 'MDN HTML Introduction' }],
          'Create an HTML file. Add DOCTYPE, html, head (with title), and body tags. Open in browser.',
          'Build a simple "About Me" page with a title, your name as heading, and a paragraph describing yourself.', '1.5 hrs'),

        d(2, 'Headings, Paragraphs & Text Tags',
          'Use HTML text elements to structure content properly.',
          'HTML has 6 heading levels (h1–h6), paragraph tags (p), and inline text tags: <strong> (bold), <em> (italic), <mark> (highlight), <small>, <del>, <ins>. Headings create document hierarchy — h1 is most important.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+text+tags+headings+paragraphs', label: 'HTML Text Elements' }, { type: 'web', url: 'https://www.w3schools.com/html/html_headings.asp', label: 'W3Schools Headings' }],
          'Create a page with all 6 heading sizes. Add paragraphs with bold, italic, and marked text.',
          'Build a "Blog Post" page with an h1 title, author info with <small>, 3 paragraphs with emphasized keywords, and a conclusion section.', '1.5 hrs'),

        d(3, 'Links & Images',
          'Add clickable links and images to web pages.',
          'The <a href="url"> tag creates links. Use target="_blank" to open in new tab. rel="noopener noreferrer" is a security best practice. Images use <img src="url" alt="description"> — always include alt for accessibility. Use width/height attributes or CSS.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+links+and+images+tutorial', label: 'HTML Links & Images' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML', label: 'MDN Images Guide' }],
          'Create 3 links — one internal, one external (opens new tab), one mailto. Add 2 images with alt text.',
          'Build a "Travel Blog" page with a featured image, 3 destination cards each with an image, description, and "Read More" link.', '1.5–2 hrs'),

        d(4, 'Lists — Ordered, Unordered & Description',
          'Organize content using HTML list elements.',
          'Unordered lists (<ul>) use bullet points. Ordered lists (<ol>) use numbers (type="a" for letters, "I" for Roman). List items use <li>. Description lists (<dl>) pair terms <dt> with definitions <dd>. Lists can be nested.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+lists+ul+ol+dl+tutorial', label: 'HTML Lists Tutorial' }, { type: 'web', url: 'https://www.w3schools.com/html/html_lists.asp', label: 'W3Schools Lists' }],
          'Create a nested unordered list of your favourite categories with 3 items each. Build a numbered recipe steps list.',
          'Build a "Recipe Page" with an ingredients list (unordered), cooking steps (ordered, numbered), and a "Nutrition Info" description list.', '1.5 hrs'),

        d(5, 'HTML Tables',
          'Build data tables with proper structure and accessibility.',
          'Tables organize data in rows and columns. Structure: <table> > <thead> > <tr> > <th>, then <tbody> > <tr> > <td>. colspan merges columns, rowspan merges rows. Always use <caption> and scope attributes for accessibility.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+tables+complete+tutorial', label: 'HTML Tables Complete' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table', label: 'MDN Table Element' }],
          'Build a 5-column, 5-row table with a header row and caption. Add a cell that spans 2 columns.',
          'Create a "Class Schedule" table with days as columns, time slots as rows, subjects as data. Use colspan for double periods.', '1.5 hrs'),

        d(6, 'HTML Forms — Inputs & Validation',
          'Build interactive forms with various input types.',
          'Forms collect user data: <form action="" method=""> contains inputs. Input types: text, email, password, number, date, checkbox, radio, range, file, textarea, select. The <label for="id"> links labels to inputs. required, minlength, pattern attributes add built-in validation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=HTML+forms+inputs+complete+guide', label: 'HTML Forms Complete' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms', label: 'MDN Web Forms Guide' }],
          'Build a form with text, email, password, date, checkbox, radio buttons, a select dropdown, and a textarea. Add required validation.',
          'Build a "Job Application Form" with: full name, email, phone, position (select), experience level (radio), cover letter (textarea), CV upload, and a submit button.', '2 hrs'),

        d(7, 'Semantic HTML5 & Accessibility',
          'Use semantic elements for meaningful, accessible page structure.',
          'Semantic HTML5 elements tell the browser (and screen readers) what content means: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. ARIA attributes (role, aria-label, aria-describedby) improve accessibility. Use <figure> + <figcaption> for images.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=semantic+HTML5+elements+accessibility', label: 'Semantic HTML5' }, { type: 'web', url: 'https://web.dev/learn/html/semantic-html/', label: 'web.dev Semantic HTML' }],
          'Rebuild yesterday\'s form page replacing all <div> containers with appropriate semantic elements.',
          '🚀 PROJECT: Build a fully semantic "Portfolio Home" page with header/nav (anchor links), main (hero section, about section, projects section), aside (skills sidebar), and footer. Zero divs for layout containers.', '2 hrs'),
      ],
      project: { id: 'bfw1', title: 'Semantic Portfolio Homepage', desc: 'Build a fully semantic HTML5 portfolio page with header, nav, main, sections for hero/about/projects, an aside for skills, and a footer. Include proper heading hierarchy, at least one table, a contact form with validation, and images with alt text. No CSS yet — focus purely on correct HTML structure and semantics.' }
    },

    // ── WEEK 2: CSS Foundations ──
    {
      week: 2, title: 'CSS Foundations — Selectors, Box Model & Typography', timeRange: '10–12 hrs',
      days: [
        d(8, 'CSS Selectors & Specificity',
          'Target HTML elements precisely using CSS selectors.',
          'CSS selectors: element (p), class (.btn), id (#header), attribute ([type="text"]), pseudo-class (:hover, :nth-child), pseudo-element (::before, ::after), combinators (descendant " ", child ">", adjacent "+", sibling "~"). Specificity order: inline > ID > class > element.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+selectors+specificity+complete+guide', label: 'CSS Selectors Guide' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors', label: 'MDN CSS Selectors' }],
          'Style 10 different elements using 5 different selector types. Test specificity by overriding styles.',
          'Create a page with 10 elements. Style each using a different selector type. Document which selector "wins" when two target the same element.', '1.5 hrs'),

        d(9, 'The CSS Box Model',
          'Master content, padding, border, and margin spacing.',
          'Every element is a box: content → padding → border → margin. box-sizing: border-box makes width include padding+border (essential for modern layouts). Margin collapse happens between vertical margins of sibling/parent-child block elements.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+box+model+explained', label: 'CSS Box Model' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model', label: 'MDN Box Model' }],
          'Open DevTools on any page. Inspect the box model panel for 5 different elements. Create 3 boxes with different margin/padding combinations.',
          'Build 5 "card" components each demonstrating different box model configurations. Show: content-only, padded, bordered, shadowed, and margin-collapsed examples.', '1.5 hrs'),

        d(10, 'Colors, Backgrounds & Gradients',
          'Apply colors and backgrounds with CSS.',
          'Colors: named (red), hex (#ff0000), rgb(), rgba(), hsl(), hsla(). Backgrounds: background-color, background-image, background-size (cover/contain), background-position, background-repeat. Linear-gradient(direction, color1, color2), radial-gradient(). CSS variables: --my-color: #fff; use with var(--my-color).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+colors+gradients+backgrounds', label: 'CSS Colors & Gradients' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors', label: 'MDN CSS Colors' }],
          'Create a color palette using CSS variables. Make 5 gradient backgrounds (linear and radial). Apply a background image with cover sizing.',
          'Build a "Color Theme Showcase" page using only CSS variables for all colors. Include a hero with a gradient, a section with a background image, and 6 color swatches. Add a :root theme block.', '1.5 hrs'),

        d(11, 'Typography — Fonts, Size & Spacing',
          'Control text appearance with CSS typography properties.',
          'font-family (stack), font-size (px/em/rem/%), font-weight (100–900), font-style, line-height (unitless best: 1.5), letter-spacing, text-align, text-transform, text-decoration. Google Fonts: import via @import or <link>. rem is relative to root (16px default).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+typography+fonts+complete+guide', label: 'CSS Typography' }, { type: 'web', url: 'https://web.dev/learn/css/typography/', label: 'web.dev Typography' }],
          'Import 2 Google Fonts. Create a typographic scale with 5 sizes (sm/base/lg/xl/2xl). Test rem vs em vs px.',
          'Design a "Typography Specimen" page showcasing your chosen font pair. Include heading scale, body text, blockquote, caption, code block — all with proper line-height and spacing.', '1.5–2 hrs'),

        d(12, 'CSS Units & Display Properties',
          'Understand CSS units and how display affects layout flow.',
          'Units: px (absolute), em (relative to parent font), rem (relative to root), % (parent), vw/vh (viewport), min()/max()/clamp() for responsive. Display: block (full width, stacks), inline (flows with text, no width/height), inline-block (flow but respects width), none (hidden). position: static/relative/absolute/fixed/sticky.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+units+display+position+tutorial', label: 'CSS Units & Display' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/display', label: 'MDN Display Property' }],
          'Create elements with each display type. Use clamp() for a responsive font size. Build a sticky header.',
          'Build a layout with: sticky header, absolutely-positioned badge on a card, inline-block navigation items, and a footer that uses viewport height to always stay at the bottom.', '1.5 hrs'),

        d(13, 'CSS Transitions & Hover Effects',
          'Add smooth animations to user interactions.',
          'transition: property duration easing delay. Properties: all, color, background-color, transform, opacity. Easings: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(). Transform: translate(), scale(), rotate(), skew(). opacity: 0 fades out, visibility: hidden hides without collapsing space.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+transitions+hover+effects', label: 'CSS Transitions' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions', label: 'MDN Transitions' }],
          'Create 5 buttons each with a different hover transition effect. Build a card with a smooth scale-up hover.',
          'Build an "Interactive Card Gallery" with 6 cards. Each card: smooth background-color transition, scale transform on hover, and a hidden "view details" overlay that slides up on hover.', '1.5 hrs'),

        d(14, 'CSS Pseudo-classes & Pseudo-elements',
          'Style elements based on state and add decorative content with CSS.',
          'Pseudo-classes select elements by state: :hover, :focus, :active, :visited, :first-child, :last-child, :nth-child(n), :not(), :checked, :disabled. Pseudo-elements add virtual content: ::before, ::after (require content: ""), ::first-line, ::first-letter, ::placeholder, ::selection.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+pseudo+classes+pseudo+elements', label: 'CSS Pseudo' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes', label: 'MDN Pseudo-classes' }],
          'Style a list where every odd item is a different color. Use ::before to add a decorative icon to headings. Style form :focus states.',
          '🚀 PROJECT: Style the Week 1 HTML portfolio page: add hover effects to nav links using :hover/:focus, style alternating table rows with :nth-child, add decorative ::before icons to section headings, style form inputs with :focus/:invalid states.', '2 hrs'),
      ],
      project: { id: 'bfw2', title: 'Styled Portfolio — CSS Foundations', desc: 'Apply CSS Foundations to your Week 1 HTML portfolio. Use a Google Font pair, define a :root color palette with CSS variables, style the box model for all cards, add transitions to all interactive elements, use pseudo-elements for decorative effects, and make the form beautiful with :focus and :invalid states. No layouts yet — just properties and styling.' }
    },

    // ── WEEK 3: CSS Layout ──
    {
      week: 3, title: 'CSS Layout — Flexbox, Grid & Responsive Design', timeRange: '12–14 hrs',
      days: [
        d(15, 'Flexbox — Container Properties',
          'Learn flex container properties to align and distribute children.',
          'Apply display: flex to a container. Container properties: flex-direction (row/column/reverse), flex-wrap (nowrap/wrap), justify-content (space-between/around/evenly/center/flex-start/end), align-items (stretch/center/flex-start/end/baseline), align-content (for multi-line), gap.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+flexbox+container+properties+tutorial', label: 'Flexbox Container' }, { type: 'web', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', label: 'CSS-Tricks Flexbox Guide' }],
          'Build a navigation bar with flexbox (logo left, links right). Build a centered card. Build a row that wraps.',
          'Recreate 5 common layout patterns using only flexbox: navbar, hero section, card row, sidebar + content, centered modal.', '2 hrs'),

        d(16, 'Flexbox — Item Properties',
          'Control individual flex item sizing and alignment.',
          'Item properties: flex-grow (how much to grow), flex-shrink (how much to shrink), flex-basis (starting size), flex shorthand (grow shrink basis). align-self overrides container align-items. order changes visual order without HTML change. flex: 1 is the "fill available space" pattern.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+flexbox+item+properties+flex+grow+shrink', label: 'Flexbox Items' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex', label: 'MDN Flex Property' }],
          'Create a pricing card row where one card is highlighted and grows larger. Build a flex layout where sidebar is fixed width and main content fills remaining space.',
          'Build a "Dashboard Layout" using only flexbox: fixed sidebar (240px), main content area (flex:1), top header spanning full width, and a stats row where cards grow equally.', '2 hrs'),

        d(17, 'CSS Grid — Template Columns & Rows',
          'Create two-dimensional layouts with CSS Grid.',
          'display: grid creates a grid container. grid-template-columns: repeat(3, 1fr) creates 3 equal columns. fr unit = fraction of available space. grid-template-rows defines row heights. gap adds gutters. minmax(min, max) for flexible ranges. auto-fill vs auto-fit for implicit columns.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+grid+layout+complete+tutorial', label: 'CSS Grid Tutorial' }, { type: 'web', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', label: 'CSS-Tricks Grid Guide' }],
          'Create a 3-column equal grid. Then a 12-column grid. Then a grid with mixed fixed + fr columns.',
          'Build a "Magazine Layout" using CSS Grid: a hero spanning all 3 columns, 2 featured articles, 4 small cards, and a full-width footer. Use named grid areas.', '2 hrs'),

        d(18, 'CSS Grid — Placement & Named Areas',
          'Place and span grid items across multiple cells.',
          'grid-column: 1 / 3 spans from column line 1 to 3. grid-row shorthand works the same. span keyword: grid-column: span 2. grid-template-areas uses string syntax to name regions. grid-area on items references named zones. justify-items and align-items control item alignment within cells.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+grid+placement+named+areas', label: 'Grid Placement & Areas' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_template_areas', label: 'MDN Grid Areas' }],
          'Build a layout using grid-template-areas with header, sidebar, main, and footer named regions.',
          'Build a full page layout with named grid areas: header (full width), nav (left 200px), main (flex:1), aside (right 200px), footer (full width). Switch areas using two different grid-template-areas definitions.', '2 hrs'),

        d(19, 'Responsive Design & Media Queries',
          'Adapt layouts for different screen sizes.',
          'Mobile-first design: start with small screen styles, use min-width media queries to add complexity: @media (min-width: 768px) {}. Common breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop). viewport meta tag (already in HTML). Don\'t forget: images max-width: 100%, flexible units.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=responsive+design+media+queries+tutorial', label: 'Responsive Design' }, { type: 'web', url: 'https://web.dev/learn/design/media-queries/', label: 'web.dev Media Queries' }],
          'Take your portfolio and add 3 media query breakpoints. Test in DevTools device emulator.',
          'Make your portfolio fully responsive: mobile-first single column → tablet 2 columns → desktop 3 columns. Navigation collapses to a hamburger icon on mobile (CSS only, use checkbox hack).', '2 hrs'),

        d(20, 'Flexbox vs Grid — When to Use Which',
          'Know when to use Flexbox vs CSS Grid for different layouts.',
          'Flexbox is one-dimensional (axis-based) — ideal for: navbars, card rows, button groups, centring. Grid is two-dimensional (rows AND columns) — ideal for: full page layouts, card grids, magazine layouts, overlapping elements. They work together: Grid for macro layout, Flexbox for micro components.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=flexbox+vs+css+grid+when+to+use', label: 'Flex vs Grid' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Relationship_of_grid_layout_with_other_layout_methods', label: 'MDN Grid & Flex' }],
          'Take a complex design and rebuild it twice — once with Flexbox, once with Grid. Compare the code.',
          'Rebuild the following 3 components: (1) Pricing table — Grid for structure, Flex for each card internals. (2) Navigation — Flex for horizontal layout, Grid for dropdown menu. (3) Article layout — Grid for page, Flex for metadata row.', '2 hrs'),

        d(21, 'CSS Animations & Keyframes',
          'Build complex multi-step animations with @keyframes.',
          '@keyframes name { 0% { ... } 50% { ... } 100% { ... } }. Apply with animation: name duration easing delay iteration-count direction fill-mode. animation-iteration-count: infinite for loops. animation-fill-mode: forwards keeps end state. animation-play-state: paused for JS control.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+keyframes+animations+tutorial', label: 'CSS Keyframes' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations', label: 'MDN CSS Animations' }],
          'Create: a loading spinner, a pulsing button, a slide-in banner animation, and a bouncing ball.',
          '🚀 PROJECT: Add animations to your portfolio: a hero text slide-in on load, a pulsing CTA button, an animated skill bar that fills on scroll (use CSS animation-delay to stagger), and a page loader spinner.', '2–3 hrs'),
      ],
      project: { id: 'bfw3', title: 'Fully Responsive Portfolio', desc: 'Make your portfolio fully responsive and animated. Use CSS Grid for the overall page layout (header, main, aside, footer with named areas), Flexbox for all components (navbar, card rows, form fields). Add 3 media query breakpoints. Include a CSS-only hamburger menu for mobile. Add smooth CSS animations for the hero, skill bars, and card hover effects.' }
    },

    // ── WEEK 4: JavaScript Fundamentals ──
    {
      week: 4, title: 'JavaScript Fundamentals — Variables, Data & Logic', timeRange: '12–14 hrs',
      days: [
        d(22, 'Variables, Data Types & Operators',
          'Declare variables and understand JavaScript\'s type system.',
          'Variables: let (block-scoped, reassignable), const (block-scoped, single assignment), var (function-scoped, avoid). Types: string, number, boolean, null, undefined, object, symbol, bigint. typeof operator. Template literals: `Hello ${name}`. Comparison: == (loose) vs === (strict — always use ===).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+variables+data+types+beginners', label: 'JS Variables & Types' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures', label: 'MDN Data Structures' }],
          'Declare 5 variables with different types. Use typeof on each. Create a template literal with 3 variables.',
          'Build a "Variable Explorer": declare one of each type, log them with typeof, demonstrate === vs ==, and use template literals to print a summary sentence.', '1.5 hrs'),

        d(23, 'Conditionals — if, else, switch, ternary',
          'Write decision-making logic in JavaScript.',
          'if/else if/else chains for branching. switch(value) { case x: break; } for multiple exact matches. Ternary: condition ? valueIfTrue : valueIfFalse — great for one-liners. Logical operators: && (AND), || (OR), ! (NOT). Truthy/falsy: "", 0, null, undefined, NaN, false are falsy.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+conditionals+if+else+switch', label: 'JS Conditionals' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else', label: 'MDN If...Else' }],
          'Build a grade calculator (A/B/C/D/F). Convert it to a switch. Then write a ternary for pass/fail.',
          'Build a "Day Advisor": input hour (0–23), output: "Good morning ☀️" (6–11), "Good afternoon 🌤" (12–17), "Good evening 🌙" (18–23), "Get some sleep! 😴" (0–5).', '1.5 hrs'),

        d(24, 'Loops — for, while, for...of, for...in',
          'Repeat code execution efficiently with loops.',
          'for(init; condition; update) — classic. while(condition) — unknown iteration count. do...while — runs at least once. for...of — iterates array values. for...in — iterates object keys (use with caution). break exits loop, continue skips iteration. Array methods forEach, map, filter are preferred over traditional loops.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+loops+for+while+for+of', label: 'JS Loops' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration', label: 'MDN Loops' }],
          'Print FizzBuzz (1–100). Build a multiplication table. Iterate an array with for...of and an object with for...in.',
          'Build a "Star Rating System": loop to generate 5 stars (★), allow user to input a rating (1–5), highlight that many stars. Print a summary.', '1.5 hrs'),

        d(25, 'Arrays — Methods & Manipulation',
          'Master JavaScript arrays and their powerful built-in methods.',
          'Array creation: [], Array.from(). Access: arr[0], arr.at(-1). Mutating: push, pop, shift, unshift, splice, sort, reverse. Non-mutating: slice, concat, flat, indexOf, includes. Iteration: forEach, map (transform), filter (subset), find (first match), reduce (accumulate), some, every.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+array+methods+complete', label: 'JS Array Methods' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', label: 'MDN Array' }],
          'Given [3,7,1,9,2,5,8]: sort, reverse, find numbers > 5, sum all with reduce, check if any > 10.',
          'Build a "Student Gradebook": array of {name, score} objects. Use filter for passing (≥60), map to add grade letter, sort by score, reduce to get class average, find top scorer.', '2 hrs'),

        d(26, 'Objects — Properties, Methods & Destructuring',
          'Create and work with JavaScript objects.',
          'Object literal: {key: value}. Access: dot notation obj.key or bracket obj["key"]. Add/update/delete properties. Methods are functions as values. this keyword refers to the object. Destructuring: const {name, age} = person. Computed keys. Object.keys/values/entries/assign/spread {...obj}.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+objects+destructuring+tutorial', label: 'JS Objects' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects', label: 'MDN Objects' }],
          'Create a "car" object with properties and a describe() method. Destructure it. Spread it to create a modified copy.',
          'Build a "Contact Card" system: create 3 person objects, destructure their properties, merge two objects with spread, extract an array of all names with Object.values, and display a formatted "vCard" string.', '2 hrs'),

        d(27, 'Functions — Declaration, Expression & Arrow',
          'Write reusable code blocks with functions.',
          'Function declaration: function name() {} (hoisted). Function expression: const fn = function() {} (not hoisted). Arrow: const fn = () => {} (no own "this", implicit return for single expressions). Parameters, default values: function(x, y = 10). Rest: function(...args). Return values. Pure functions.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+functions+arrow+functions+tutorial', label: 'JS Functions' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', label: 'MDN Functions' }],
          'Write the same function as declaration, expression, and arrow. Convert a multi-line arrow to implicit return.',
          'Build a "Math Utility Library": 10 pure functions (add, subtract, multiply, divide, power, factorial, fibonacci, isPrime, clamp, lerp). Write all 3 ways, test each.', '2 hrs'),

        d(28, 'Scope, Closures & Higher-Order Functions',
          'Understand variable scope and powerful functional patterns.',
          'Scope: global → function → block. Closures: inner functions "remember" outer scope even after outer returns. Practical: counter(), memoize(), partial application. Higher-order functions take or return functions: map, filter, reduce, setTimeout. Immediately Invoked Function Expression (IIFE): (function(){})().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+closures+scope+higher+order+functions', label: 'Closures & HOF' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', label: 'MDN Closures' }],
          'Build a counter using closure. Create a makeMultiplier(n) that returns a function. Use reduce to implement a pipeline.',
          '🚀 PROJECT: Build a functional "Task Filter App" using only arrays, objects, and higher-order functions: add tasks, filter by status/priority, sort by date, search by keyword — all using map/filter/reduce/sort chains. No DOM yet.', '2 hrs'),
      ],
      project: { id: 'bfw4', title: 'Functional Task Manager (CLI)', desc: 'Build a JavaScript task manager that runs in the browser console. Use arrays of task objects, implement add/remove/edit functions, filter by status (pending/done/in-progress), sort by priority and date, search by keyword — all using higher-order functions (map, filter, reduce). Include a makeTask() factory function and a closure-based ID generator.' }
    },

    // ── WEEK 5: DOM & Events ──
    {
      week: 5, title: 'JavaScript DOM — Selection, Manipulation & Events', timeRange: '12–14 hrs',
      days: [
        d(29, 'DOM Selection & Traversal',
          'Select and navigate HTML elements with JavaScript.',
          'The DOM is a tree of nodes. Selection: getElementById, querySelector (first match), querySelectorAll (NodeList). Traversal: parentElement, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling, closest(selector). NodeList.forEach() works; convert to Array with Array.from() for all methods.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+DOM+selection+traversal', label: 'DOM Selection' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector', label: 'MDN querySelector' }],
          'Open any website console. Select 10 elements using different methods. Traverse from a child to its grandparent.',
          'Build a "DOM Explorer": select elements by ID, class, attribute, and CSS selector. Log their tagName, className, id, textContent, and children count.', '1.5 hrs'),

        d(30, 'DOM Manipulation — Create, Modify & Remove',
          'Dynamically create and modify the DOM with JavaScript.',
          'Create: document.createElement(tag), textContent vs innerHTML (avoid innerHTML with user data — XSS risk). Modify: element.classList.add/remove/toggle/contains, element.style.property, element.setAttribute/getAttribute/removeAttribute. Insert: appendChild, prepend, insertBefore, insertAdjacentHTML. Remove: element.remove(), removeChild.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+DOM+manipulation+create+elements', label: 'DOM Manipulation' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement', label: 'MDN createElement' }],
          'Dynamically create 5 list items. Toggle a class on click. Change text content from JS. Remove an element.',
          'Build a dynamic "To-Do List": input to add tasks, render each as a <li> with a checkbox and delete button, check off to mark done, delete to remove. No frameworks.', '2 hrs'),

        d(31, 'Events — Listeners, Bubbling & Delegation',
          'Handle user interactions with JavaScript events.',
          'addEventListener(event, handler). Common events: click, dblclick, mouseenter/leave, keydown/keyup/keypress, input, change, submit, focus/blur, scroll, resize. Event object: e.target (what was clicked), e.currentTarget (where listener is), e.preventDefault() (stop default), e.stopPropagation() (stop bubble). Event delegation: one listener on parent.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+events+event+delegation+bubbling', label: 'JS Events' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener', label: 'MDN addEventListener' }],
          'Add click listener to a button. Add keyboard listener to document. Use event delegation on a list.',
          'Build an "Event Playground": test click, dblclick, mouseover, keydown, focus, blur, scroll — log event.type, target.tagName for each. Add event delegation to a dynamically generated list.', '2 hrs'),

        d(32, 'Forms & Input Validation with DOM',
          'Handle form submission and validate inputs with JavaScript.',
          'Intercept submit with e.preventDefault(). Access input values via element.value, checkboxes with element.checked, selects with element.value. Validate: required fields, email regex, password length. Show errors by adding/removing CSS classes and error elements. HTML5 setCustomValidity().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+form+validation+DOM', label: 'Form Validation' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation', label: 'MDN Form Validation' }],
          'Build a login form. Validate email format with regex. Show red error messages. Prevent submission if invalid.',
          'Build a "Registration Form" with JS validation: required fields, email format (regex), password min 8 chars + must match confirm, username no spaces, and real-time feedback as user types (oninput).', '2 hrs'),

        d(33, 'Local Storage & Session Storage',
          'Persist data in the browser without a backend.',
          'localStorage: persists after tab close, ~5MB, key-value strings. sessionStorage: cleared when tab closes. Methods: setItem(key, value), getItem(key), removeItem(key), clear(). Always JSON.stringify() to save objects, JSON.parse() to read. Check for null when reading (key doesn\'t exist yet).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+localStorage+sessionStorage+tutorial', label: 'localStorage Tutorial' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage', label: 'MDN localStorage' }],
          'Save a user object to localStorage. Read it back. Delete one key. Clear all. Compare with sessionStorage.',
          'Upgrade your to-do list to persist in localStorage: save on every change, load on page start, support clearing all done tasks. Add a "note" that saves automatically on blur.', '1.5 hrs'),

        d(34, 'Timers, Scroll & Window APIs',
          'Use browser APIs for timing, scrolling, and window information.',
          'setTimeout(fn, ms) — one-time delay. setInterval(fn, ms) — repeat; clear with clearInterval(id). requestAnimationFrame(fn) — smooth 60fps loop. window.scrollY, scrollX for scroll position. element.getBoundingClientRect() for position. IntersectionObserver for scroll-into-view. window.innerWidth/Height.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+setTimeout+setInterval+scroll+API', label: 'JS Timer & Scroll APIs' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver', label: 'MDN IntersectionObserver' }],
          'Build a countdown timer with setInterval. Build a scroll progress bar. Add a "back to top" button that appears after 300px scroll.',
          'Build a "Reading Progress" bar that fills as user scrolls. Add a floating "Back to Top" button that appears after 300px. Use IntersectionObserver to animate sections in as they enter the viewport.', '2 hrs'),

        d(35, 'Dark Mode & Theme Toggle',
          'Implement a theme system with DOM manipulation and localStorage.',
          'Theme toggling patterns: (1) toggle class on <body>: body.classList.toggle("dark"), (2) change CSS custom properties via JS: document.documentElement.style.setProperty("--bg", "#000"), (3) use data-theme attribute. Persist preference in localStorage. Detect system preference: window.matchMedia("(prefers-color-scheme: dark)").',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+dark+mode+toggle+localStorage', label: 'Dark Mode Toggle' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme', label: 'MDN prefers-color-scheme' }],
          'Add a theme toggle to your portfolio. Persist it in localStorage. Auto-detect system preference on first load.',
          '🚀 PROJECT: Add a full dark/light theme system to your portfolio: toggle button in header, smooth CSS transitions on theme switch, persist choice in localStorage, auto-detect prefers-color-scheme on first visit, and animate the toggle icon with CSS.', '2 hrs'),
      ],
      project: { id: 'bfw5', title: 'Interactive Portfolio with DOM + Storage', desc: 'Bring your portfolio to life with JavaScript. Add: a dynamic project filter (All/Frontend/Backend/Design) using DOM manipulation and event delegation, a working contact form with full JS validation and localStorage save, a scroll progress bar, IntersectionObserver-based section animations, dark/light theme toggle with localStorage persistence, and a scroll-to-top button.' }
    },

    // ── WEEK 6: Capstone ──
    {
      week: 6, title: 'Beginner Capstone — Fetch, GitHub Pages & Portfolio Polish', timeRange: '10–12 hrs',
      days: [
        d(36, 'Fetch API — GET Requests & JSON',
          'Fetch data from an API and display it dynamically.',
          'fetch(url) returns a Promise. Chain with .then(res => res.json()).then(data => ...). Always handle errors with .catch(). Loading states: show spinner while fetching. Common free APIs: JSONPlaceholder, OpenWeatherMap, GitHub API, CoinGecko. CORS errors happen with some APIs.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+fetch+API+GET+JSON+tutorial', label: 'Fetch API Tutorial' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', label: 'MDN Fetch API' }],
          'Fetch posts from jsonplaceholder.typicode.com/posts. Display titles as a list. Add a loading spinner.',
          'Build a "User Card App": fetch users from jsonplaceholder.typicode.com/users, render each as a card (name, email, company, city). Add a loading spinner and error message if fetch fails.', '2 hrs'),

        d(37, 'Fetch API — POST, Error Handling & Loading States',
          'Send data to APIs and handle all request states gracefully.',
          'POST request: fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }). Response status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error). Always check res.ok before .json(). try/catch with async/await.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=fetch+POST+request+error+handling+JavaScript', label: 'Fetch POST & Errors' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', label: 'MDN Fetch API' }],
          'Send a POST to jsonplaceholder.typicode.com/posts. Handle 3 different error codes. Show different UI states.',
          'Upgrade your User Card App: add a "Create User" form that POST\'s to the API, shows success/error toast, displays loading state on the button, and handles network failure with a retry button.', '2 hrs'),

        d(38, 'Promises & async/await',
          'Write clean asynchronous JavaScript with async/await.',
          'Callback hell → Promises (.then/.catch/.finally) → async/await (syntactic sugar over Promises). async function always returns a Promise. await pauses until Promise resolves. try/catch for error handling. Promise.all([p1, p2]) — parallel execution. Promise.allSettled — all complete regardless of failure. Promise.race — first to resolve/reject.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+Promises+async+await+complete', label: 'Async/Await Tutorial' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous', label: 'MDN Async JS' }],
          'Convert your .then() fetch chain to async/await. Use Promise.all to fetch users AND posts simultaneously.',
          'Build a "Dashboard Loader": use Promise.all to fetch 3 different API endpoints simultaneously (users, posts, todos from JSONPlaceholder), show a single loading state, render all 3 sections when all complete.', '2 hrs'),

        d(39, 'ES6+ Modern JavaScript',
          'Use modern JS features to write cleaner code.',
          'Destructuring: arrays [a,b]=arr, objects {x,y}=obj. Spread: [...arr1, ...arr2], {...obj1, ...obj2}. Rest: function(a, ...rest). Optional chaining: user?.address?.city (no error if null). Nullish coalescing: value ?? "default" (only falls back for null/undefined, not 0 or ""). Logical assignment: ||=, &&=, ??=.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=ES6+modern+JavaScript+features+tutorial', label: 'ES6+ Features' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators', label: 'MDN Modern JS' }],
          'Refactor your User Card App using destructuring in all fetch callbacks. Use optional chaining on API responses.',
          'Refactor your entire portfolio JS using ES6+: destructure all object/array accesses, use spread to merge arrays, optional chaining for API data, nullish coalescing for defaults, and template literals throughout.', '1.5 hrs'),

        d(40, 'CSS: Smooth Scroll, Sticky Nav & Scroll Animations',
          'Add professional polish and scroll-based interactions.',
          'scroll-behavior: smooth on html element. Sticky positioning: position: sticky; top: 0 with a z-index. Scroll-based class toggling: add class when scrollY > 100px. Staggered animations with animation-delay. will-change: transform for GPU acceleration. prefers-reduced-motion media query for accessibility.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+smooth+scroll+sticky+nav+animations', label: 'Scroll Animations' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior', label: 'MDN scroll-behavior' }],
          'Add smooth scroll to all anchor links. Make header sticky and add a shadow on scroll. Stagger-animate 6 cards.',
          'Polish your portfolio: smooth scroll everywhere, sticky header with scroll-triggered box-shadow, staggered card reveal animations, a "typed text" effect for your hero title using setInterval, and a skills progress bar that animates when scrolled into view.', '2 hrs'),

        d(41, 'GitHub & GitHub Pages Deployment',
          'Deploy your portfolio live on the internet for free.',
          'Git basics: git init, git add ., git commit -m "message", git push. GitHub Pages: Settings → Pages → Source: Deploy from branch → main → /root. Custom domain setup. .gitignore file. README.md with project description. Semantic commit messages: feat:, fix:, docs:, style:. GitHub Actions for CI.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GitHub+Pages+deploy+static+website+free', label: 'GitHub Pages Deploy' }, { type: 'web', url: 'https://docs.github.com/en/pages', label: 'GitHub Pages Docs' }],
          'Create a GitHub repo. Push your portfolio. Enable GitHub Pages. Share the live URL.',
          'Deploy your portfolio to GitHub Pages. Add a README with: project description, live demo link, screenshots, and features list. Write proper semantic commit messages for the deployment.', '1.5 hrs'),

        d(42, 'Performance & Accessibility Basics',
          'Optimize your page for speed and all users.',
          'Performance: lazy load images with loading="lazy", minify CSS/JS, use WebP images, defer scripts with async/defer. Accessibility: sufficient color contrast (4.5:1), keyboard navigation (focus styles), skip-to-content link, alt text, ARIA labels for icon-only buttons. Lighthouse audit in Chrome DevTools.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=web+performance+accessibility+Lighthouse', label: 'Performance & a11y' }, { type: 'web', url: 'https://web.dev/learn/accessibility/', label: 'web.dev Accessibility' }],
          'Run Lighthouse on your portfolio. Fix the top 3 performance and top 3 accessibility issues.',
          '🚀 CAPSTONE: Run Lighthouse on your live portfolio. Achieve 90+ on Performance, Accessibility, and Best Practices. Add lazy loading, skip link, ARIA labels, focus styles, and optimize images to WebP format.', '2 hrs'),

        d(43, 'Beginner Capstone — Personal Portfolio Website',
          'Build and deploy a complete responsive personal portfolio.',
          'Bring together everything from Weeks 1–6: semantic HTML, CSS Flexbox/Grid layout, responsive design, JavaScript DOM, fetch API (GitHub API to show your repos), localStorage (dark mode, form data), smooth animations, and GitHub Pages deployment.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=complete+personal+portfolio+website+HTML+CSS+JS', label: 'Portfolio Tutorial' }, { type: 'web', url: 'https://github.com/topics/portfolio', label: 'Portfolio Examples' }],
          'Audit your portfolio against the checklist: semantic HTML ✓, responsive ✓, dark mode ✓, animations ✓, fetch API ✓, deployed ✓.',
          '🏆 FINAL: Your portfolio must include: (1) Responsive layout, (2) Dark/light toggle, (3) GitHub API integration showing your repos, (4) Working contact form with validation, (5) Smooth scroll + animations, (6) Lighthouse 90+ scores, (7) Live on GitHub Pages.', '3 hrs'),

        d(44, 'Code Review & Refactoring',
          'Write cleaner, more maintainable JavaScript code.',
          'DRY (Don\'t Repeat Yourself): extract repeated code to functions. KISS (Keep It Simple). Meaningful variable names. Comments for "why", not "what". Avoid magic numbers — use named constants. Separate concerns: HTML (structure), CSS (style), JS (behavior). Code formatting with Prettier.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+code+review+refactoring+clean+code', label: 'Clean Code JS' }, { type: 'web', url: 'https://github.com/ryanmcdermott/clean-code-javascript', label: 'Clean Code JS Guide' }],
          'Review your portfolio JS. Find 3 areas to refactor. Extract repeated code into reusable functions.',
          'Refactor your portfolio JS: name all magic numbers as constants, extract fetch logic into a separate function, create a renderCard() function used by all card-rendering code, add JSDoc comments to all public functions.', '1.5 hrs'),

        d(45, 'Beginner Level Wrap-Up & Next Steps',
          'Reflect on what you\'ve learned and plan your intermediate journey.',
          'You\'ve mastered: HTML5 semantics, CSS Box Model, Flexbox, Grid, responsive design, JavaScript fundamentals, DOM manipulation, fetch API, async/await, localStorage, and deployed a live portfolio. Next up: ES6 modules, React, TypeScript, backend APIs. Build 1–2 more projects to cement your skills.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=what+to+learn+after+HTML+CSS+JavaScript+beginner', label: 'After Beginner JS' }, { type: 'web', url: 'https://roadmap.sh/frontend', label: 'Frontend Roadmap' }],
          'List 10 things you\'ve learned. List 5 things you\'re still unsure about. Pick 1 project to build this week.',
          '🎉 WRAP-UP: Update your GitHub portfolio with a complete README. Share your live portfolio link. Plan your next project. Start the Intermediate level roadmap!', '1 hr'),
      ],
      project: { id: 'bfw6', title: '🎓 Responsive Portfolio — Capstone', desc: 'Your complete Beginner Capstone: a fully-featured personal portfolio website. Must include: semantic HTML5, CSS Grid/Flexbox layout, 3 responsive breakpoints, dark/light theme toggle, GitHub API integration (live repos), working contact form with validation, localStorage for preferences, smooth scroll + scroll-triggered animations, CSS keyframe animations, and deployed live on GitHub Pages with Lighthouse 90+ scores.' }
    },

  ]
};

// ─────────────────────────────────────────────────────
//  🟡 INTERMEDIATE — 60 Days / ~120 hrs
// ─────────────────────────────────────────────────────
const intermediate = {
  label: '🟡 Intermediate', days: 60, totalHours: 120,
  goal: 'JavaScript Deep Dive + Frameworks',
  weeks: [

    // ── WEEK 1: Advanced JS ──
    {
      week: 1, title: 'Advanced JavaScript — ES6+ Deep Dive', timeRange: '12–14 hrs',
      days: [
        d(1, 'Destructuring — Arrays, Objects & Nested',
          'Master all forms of destructuring assignment.',
          'Array destructuring: const [a, b, ...rest] = arr with default values. Object destructuring: const {name: alias, age = 18} = obj. Nested: const {address: {city}} = user. Function parameter destructuring. Swap variables: [a, b] = [b, a]. Ignore values with commas: const [,second] = arr.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+destructuring+complete+guide+ES6', label: 'Destructuring Complete' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', label: 'MDN Destructuring' }],
          'Destructure a nested API response 3 levels deep. Rename properties. Use defaults. Destructure in function params.',
          'Refactor a complex API response handler using destructuring at every step: top-level object, nested arrays, function parameters, and rename 3 ambiguous property names.', '2 hrs'),

        d(2, 'Spread, Rest & Optional Chaining',
          'Use modern operators for flexible data manipulation.',
          'Spread: ...array copies or concatenates arrays; ...object merges/overrides properties. Rest params: function(a, b, ...rest) collects remaining args. Arguments object vs rest. Optional chaining: obj?.prop?.nested safely accesses properties that might not exist. Nullish coalescing: ?? vs ||. Logical assignment: ||=, &&=, ??=.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+spread+rest+optional+chaining', label: 'Spread & Rest' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining', label: 'MDN Optional Chaining' }],
          'Merge 3 configuration objects with spread. Write a variadic sum function with rest. Chain 5 levels of optional access.',
          'Build a "Config Merger" utility: takes multiple config objects, deep merges with spread, uses optional chaining to safely access nested properties, and provides defaults with ??.', '1.5 hrs'),

        d(3, 'ES6 Modules — import & export',
          'Organize code into reusable modules.',
          'Named exports: export const fn = () => {}; import { fn } from "./module.js". Default exports: export default fn; import anyName from "./module.js". Re-exports: export { fn } from "./other.js". Barrel files (index.js). Dynamic imports: import("./module.js").then(). Module scope vs global scope. CORS and .js extension requirements.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+ES6+modules+import+export', label: 'JS Modules' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', label: 'MDN JS Modules' }],
          'Split your portfolio JS into 3 modules: api.js, render.js, utils.js. Import and use them in main.js.',
          'Architect a modular "Weather App": modules for API fetching, data transformation, UI rendering, localStorage, and utilities — each with named exports, assembled in main.js.', '2 hrs'),

        d(4, 'Iterators, Generators & Symbols',
          'Understand advanced iteration protocols.',
          'Iterables implement [Symbol.iterator](). Iterators have .next() returning {value, done}. for...of uses the iterator protocol. Generators: function* with yield. Lazy evaluation — generate values on demand. yield* delegates to another generator. Infinite sequences. Use cases: paginated data, custom iteration, state machines.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+iterators+generators+tutorial', label: 'Generators' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators', label: 'MDN Generators' }],
          'Write a generator that produces Fibonacci numbers indefinitely. Create a custom iterable class.',
          'Build a "Paginated Data Generator": a generator function that yields pages of API results, pausing between fetches. Consume it with for...of to render results progressively.', '2 hrs'),

        d(5, 'Closures, Currying & Partial Application',
          'Master advanced functional programming patterns.',
          'Closures enable private state and function factories. Currying: transforms f(a,b,c) into f(a)(b)(c). Partial application: pre-fill some arguments. Memoization: cache results. Function composition: compose(f,g)(x) = f(g(x)). Pipe vs compose. Pure functions and side effects. These patterns underlie React hooks.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+currying+partial+application+closures', label: 'Currying & Closures' }, { type: 'web', url: 'https://javascript.info/currying-partials', label: 'JS.info Currying' }],
          'Write a curry() function. Build a memoize() utility. Create a compose() that chains 4 transformations.',
          'Build a "Functional Utilities Library": curry, memoize, compose, pipe, once, debounce, throttle — each as a pure function. Test with real-world examples.', '2 hrs'),

        d(6, 'Prototypes, Classes & Inheritance',
          'Understand JavaScript\'s object system and ES6 classes.',
          'Prototype chain: every object has __proto__ linking to its prototype. Object.create(proto). ES6 class is syntax sugar: constructor, methods on prototype, static methods, private fields (#field). extends for inheritance: super() calls parent constructor. instanceof check. Mixins for multiple inheritance.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+classes+prototypes+inheritance+OOP', label: 'JS Classes & OOP' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', label: 'MDN Classes' }],
          'Create an Animal class, extend to Dog and Cat. Add static and private methods. Use instanceof.',
          'Build an "Event System" using classes: EventEmitter class with on(), off(), emit() methods — then extend to TypedEventEmitter that validates event types.', '2 hrs'),

        d(7, 'Error Handling & Debugging',
          'Handle errors gracefully and debug JavaScript effectively.',
          'try/catch/finally. Custom errors: class AppError extends Error {}. Error types: TypeError, RangeError, ReferenceError. Async error handling with try/catch in async functions. Unhandled promise rejections. console.log, console.table, console.group, console.time. Chrome DevTools: breakpoints, call stack, scope inspection. Source maps.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+error+handling+debugging+DevTools', label: 'Error Handling & Debug' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling', label: 'MDN Error Handling' }],
          'Create 3 custom error classes. Add try/catch to all your fetch calls. Set breakpoints in DevTools.',
          '🚀 PROJECT: Add comprehensive error handling to your portfolio app: custom AppError class, typed errors for network/validation/auth failures, global unhandledRejection handler, user-friendly error messages, and retry logic for failed API calls.', '2 hrs'),
      ],
      project: { id: 'ifw1', title: 'Modular Weather Dashboard', desc: 'Build a modular weather dashboard with 5+ JS modules (api.js, render.js, storage.js, utils.js, errors.js). Use: ES6 imports/exports, optional chaining on API responses, generator for city suggestions, closure-based rate limiter, custom error classes, and full error handling. Style with pure CSS (no framework yet).' }
    },

    // ── WEEK 2: Async JavaScript ──
    {
      week: 2, title: 'Async JavaScript — Promises, Async/Await & APIs', timeRange: '12–14 hrs',
      days: [
        d(8, 'Promise Deep Dive',
          'Master Promise creation, chaining, and combinators.',
          'new Promise((resolve, reject) => {}). .then(onFulfilled, onRejected). .catch(). .finally(). Promise states: pending → fulfilled/rejected. Promise.all (fail fast), Promise.allSettled (always resolves), Promise.race (first settles), Promise.any (first fulfills). Promisify callback functions.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=JavaScript+Promises+deep+dive+complete', label: 'Promises Deep Dive' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', label: 'MDN Promises' }],
          'Create 3 Promises (one that rejects). Chain them. Use all 4 combinators. Promisify setTimeout.',
          'Build a "Multi-API Dashboard" using Promise.all to fetch weather, news, and stock data simultaneously. Handle partial failures with Promise.allSettled.', '2 hrs'),

        d(9, 'async/await & Error Handling Patterns',
          'Write clean async code and handle all error scenarios.',
          'async functions return Promises. await pauses execution until resolved. Multiple awaits in sequence vs Promise.all in parallel. IIFE async pattern. Error boundary pattern: wrap entire async function body in try/catch. Re-throw with context. Async iteration: for await...of. Top-level await (ESM).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=async+await+error+handling+patterns+JavaScript', label: 'Async/Await Patterns' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function', label: 'MDN Async Functions' }],
          'Convert 3 Promise chains to async/await. Make 3 sequential awaits then refactor to parallel with Promise.all.',
          'Build an "API Request Manager": async functions for GET/POST/PUT/DELETE, retry logic (3 attempts with exponential backoff), request timeout using Promise.race + AbortController.', '2 hrs'),

        d(10, 'Fetch API — Advanced Patterns',
          'Master advanced fetch patterns for real-world apps.',
          'Request/Response objects. Headers object. AbortController for cancellable requests. Fetch timeout pattern. Interceptors with wrapper functions. File upload with FormData. Streaming responses with response.body. CORS headers. withCredentials equivalent. Response types: json(), text(), blob(), arrayBuffer().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Fetch+API+advanced+patterns+AbortController', label: 'Advanced Fetch' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController', label: 'MDN AbortController' }],
          'Implement a fetch with timeout. Cancel a fetch on user navigation. Upload a file with FormData.',
          'Build a "Smart Fetch" wrapper: automatic JSON parsing, configurable timeout, request cancellation with AbortController, retry on 429/503, and auth header injection.', '2 hrs'),

        d(11, 'Web APIs — Geolocation, Notifications & Clipboard',
          'Use powerful browser APIs in your web apps.',
          'Geolocation: navigator.geolocation.getCurrentPosition(). Notifications: Notification.requestPermission(), new Notification(). Clipboard: navigator.clipboard.writeText/readText. Web Share: navigator.share(). Vibration: navigator.vibrate(). Speech: SpeechSynthesis, SpeechRecognition. Battery: navigator.getBattery().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=browser+Web+APIs+JavaScript+tutorial', label: 'Web APIs' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API', label: 'MDN Web APIs' }],
          'Get the user\'s location and show it on a map embed. Request notification permission and show one.',
          'Build a "Browser Capabilities Demo": geolocation map, desktop notifications, clipboard copy button, Web Share for articles, and a speech synthesis text reader.', '2 hrs'),

        d(12, 'WebSockets & Real-Time Data',
          'Add real-time communication to web apps.',
          'WebSocket: bidirectional persistent connection. new WebSocket(url). Events: open, message, error, close. ws.send(JSON.stringify(data)). Parse with JSON.parse(e.data). Reconnection logic. Server-Sent Events (SSE): one-way server→client streaming, EventSource API. Long polling as fallback.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=WebSocket+JavaScript+real+time+tutorial', label: 'WebSockets Tutorial' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', label: 'MDN WebSockets' }],
          'Connect to wss://echo.websocket.org. Send and receive messages. Add reconnection logic.',
          'Build a "Real-Time Chat UI" that connects to a WebSocket echo server. Show connection status, handle reconnection, display sent/received messages with timestamps.', '2 hrs'),

        d(13, 'IndexedDB & Cache API',
          'Store structured data and assets in the browser.',
          'IndexedDB: NoSQL database in the browser. Stores objects with indexes. Works with: open(), createObjectStore(), transaction(). Better than localStorage for large/structured data. Cache API: for storing network responses (used in PWAs). caches.open(), cache.add(), cache.match().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=IndexedDB+JavaScript+tutorial', label: 'IndexedDB' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API', label: 'MDN IndexedDB' }],
          'Store 100 records in IndexedDB. Add an index. Query by index. Delete a record.',
          'Upgrade your To-Do app to use IndexedDB: store tasks as objects with id, title, status, priority, createdAt. Add query by status and sort by date.', '2 hrs'),

        d(14, 'Performance — Debounce, Throttle & Virtual DOM',
          'Optimize JavaScript performance for smooth UIs.',
          'Debounce: delay execution until N ms after last call (search input). Throttle: limit to once per N ms (scroll handlers). requestAnimationFrame for smooth animations. Web Workers for CPU-heavy tasks off main thread. Virtual DOM concept (why React uses it). Lazy loading with IntersectionObserver.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=debounce+throttle+JavaScript+performance', label: 'Debounce & Throttle' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/Performance', label: 'MDN Performance' }],
          'Implement debounce from scratch. Apply to a search input. Implement throttle and apply to scroll.',
          '🚀 PROJECT: Performance-optimize your portfolio: debounced search, throttled scroll handler, lazy-loaded images with IntersectionObserver, requestAnimationFrame for animations, and measure before/after with Chrome Performance tab.', '2 hrs'),
      ],
      project: { id: 'ifw2', title: 'Real-Time News + Weather Dashboard', desc: 'Build a real-time dashboard: fetch news (NewsAPI or similar) and weather (OpenWeatherMap) with Promise.all, WebSocket for live data updates, AbortController for cancelling stale requests, debounced search, IndexedDB for caching results, and desktop notifications for breaking news. Full error handling and retry logic.' }
    },

    // ── WEEK 3: React Fundamentals ──
    {
      week: 3, title: 'React Fundamentals — Components, Props & State', timeRange: '14–16 hrs',
      days: [
        d(15, 'React Setup — Vite + First Component',
          'Set up a React project and write your first component.',
          'Create React app: npm create vite@latest my-app -- --template react. File structure: src/main.jsx (entry), App.jsx (root component). JSX: JavaScript + HTML-like syntax. JSX rules: className not class, htmlFor not for, single root element (or Fragment <>), camelCase events. Babel transpiles JSX to React.createElement().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Vite+setup+first+component+2024', label: 'React Vite Setup' }, { type: 'web', url: 'https://react.dev/learn', label: 'React Official Docs' }],
          'Create a Vite React app. Write 3 functional components. Use className, fragment, and camelCase events.',
          'Build a "Profile Card" React component: accepts props (name, role, avatar, bio), renders a styled card, and is used 3 times with different data in App.jsx.', '2 hrs'),

        d(16, 'Props — Passing & Validating Data',
          'Pass and validate data between parent and child components.',
          'Props flow down: parent passes, child receives as first argument. Destructuring props in parameters. Default props with default parameters: function Btn({ color = "blue" }). children prop for composition. PropTypes library for runtime type checking. Spreading props: <Child {...props} />. Avoid prop drilling by thinking about structure.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+props+tutorial+beginners', label: 'React Props' }, { type: 'web', url: 'https://react.dev/learn/passing-props-to-a-component', label: 'React Props Docs' }],
          'Pass 5 different prop types to a component (string, number, boolean, array, function). Add PropTypes validation.',
          'Build a "Button Component Library": one Button component that accepts variant (primary/secondary/danger), size (sm/md/lg), disabled, loading, onClick props — renders correctly for all combinations.', '2 hrs'),

        d(17, 'State — useState Hook',
          'Manage component state with the useState hook.',
          'useState(initialValue) returns [state, setState]. React re-renders when state changes. Functional updates: setState(prev => prev + 1) — use when new state depends on old. State is immutable: don\'t mutate directly, replace with new value. State per component instance. Controlled components: input value tied to state.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useState+hook+tutorial', label: 'useState Hook' }, { type: 'web', url: 'https://react.dev/reference/react/useState', label: 'React useState Docs' }],
          'Build a counter with increment/decrement/reset. Build a controlled text input. Track 3 state values in one component.',
          'Build a "Shopping Cart": products list with Add button, cart shows count badge, sidebar lists items with quantity +/- controls, calculates running total.', '2 hrs'),

        d(18, 'useEffect — Side Effects & Lifecycle',
          'Run side effects in function components.',
          'useEffect(callback, dependencies). Runs after render. Empty [] runs once (mount). [dep] runs when dep changes. No array runs every render (rare). Cleanup function prevents memory leaks: return () => clearInterval(id). Common uses: fetch data, subscribe, set document title, setup timers. Strict Mode double-invocation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useEffect+hook+tutorial+2024', label: 'useEffect Hook' }, { type: 'web', url: 'https://react.dev/reference/react/useEffect', label: 'React useEffect Docs' }],
          'Fetch data in useEffect on mount. Update document title when state changes. Clean up an interval.',
          'Build a "User Profile Fetcher": fetch user data when userId prop changes, show loading/error states, update document title to user\'s name, clean up any pending requests on unmount.', '2 hrs'),

        d(19, 'Lists, Keys & Conditional Rendering',
          'Render dynamic lists and conditionally show content.',
          'Array.map() returns JSX array. key prop must be unique and stable (not index if list can reorder/change). Key helps React identify changed items. Conditional: ternary (condition ? <A/> : <B/>), short-circuit (condition && <A/>), early return, switch for multiple conditions. Fragment avoids unnecessary DOM nodes.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+lists+keys+conditional+rendering', label: 'Lists & Conditional' }, { type: 'web', url: 'https://react.dev/learn/rendering-lists', label: 'React Lists Docs' }],
          'Render a list of 10 items from an array. Add a filter button (show all / active / done). Handle empty state.',
          'Build a "Task Manager" React app: fetch tasks, render list with status badges, filter tabs (All/Active/Done), empty state illustration, and loading skeleton.', '2 hrs'),

        d(20, 'Event Handling & Forms in React',
          'Handle user interaction and form data in React.',
          'Event handlers: onClick, onChange, onSubmit, onKeyDown — all camelCase. e.preventDefault() still needed. Controlled inputs: value={state} onChange={e => setState(e.target.value)}. Uncontrolled: ref.current.value. Form validation in onSubmit. Array of inputs with object state. Complex forms with useReducer (preview).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+forms+controlled+inputs+event+handling', label: 'React Forms' }, { type: 'web', url: 'https://react.dev/learn/responding-to-events', label: 'React Events Docs' }],
          'Build a controlled form with 5 different input types. Validate on submit. Show error messages.',
          'Build a "Multi-Step Registration Form" in React: 3 steps (Personal Info, Account Details, Preferences), state for all fields, validation per step, progress indicator, summary on submit.', '2 hrs'),

        d(21, 'Component Composition & children',
          'Build flexible components with composition patterns.',
          'children prop holds nested JSX. Composition over inheritance in React. Slot pattern: specific children props (header, footer, sidebar). Render props pattern (preview). Container components vs presentational components. Layout components. Card component as a wrapper. Avoid deep prop drilling with good component structure.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+composition+children+prop+tutorial', label: 'React Composition' }, { type: 'web', url: 'https://react.dev/learn/passing-jsx-as-children', label: 'React Children Docs' }],
          'Build a Modal, Card, and Layout component that all use children prop. Compose complex UIs from simple components.',
          '🚀 PROJECT: Build a component library: Modal (with children, header, footer slots), Card (icon, title, body, actions), Layout (sidebar, main, header via children), Button — compose them into a dashboard UI.', '2 hrs'),
      ],
      project: { id: 'ifw3', title: 'React Task Manager App', desc: 'Build a full React Task Manager: components for TaskList, TaskItem, TaskForm, FilterBar, EmptyState, and LoadingSpinner. Features: add/edit/delete tasks, filter by status/priority, controlled form with validation, useEffect for initial data fetch, localStorage persistence, and a statistics card showing counts by status.' }
    },

    // ── WEEK 4: React Advanced Hooks ──
    {
      week: 4, title: 'React Advanced — Hooks, Context & React Router', timeRange: '14–16 hrs',
      days: [
        d(22, 'useContext — Global State Without Props',
          'Share state across the component tree without prop drilling.',
          'createContext() creates a context. <Context.Provider value={...}> wraps the tree. useContext(Context) reads the value. Common patterns: ThemeContext, AuthContext, LanguageContext. Context re-renders all consumers on value change — optimize with useMemo. Separate contexts for unrelated state.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useContext+tutorial+global+state', label: 'useContext Hook' }, { type: 'web', url: 'https://react.dev/reference/react/useContext', label: 'React useContext Docs' }],
          'Create a ThemeContext. Toggle theme from a button anywhere in the tree. Check it in a deeply nested child.',
          'Build a "Theme + Language System" using two contexts: ThemeContext (dark/light) and LanguageContext (en/es/fr). Any component can read/update either. Persist both in localStorage.', '2 hrs'),

        d(23, 'useReducer — Complex State Management',
          'Manage complex state transitions with useReducer.',
          'useReducer(reducer, initialState) returns [state, dispatch]. reducer(state, action) returns new state. action = { type: "INCREMENT", payload: data }. switch/case in reducer. When to use: multiple related state values, complex transitions, next state depends on current, state logic shared between components.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useReducer+tutorial+2024', label: 'useReducer Hook' }, { type: 'web', url: 'https://react.dev/reference/react/useReducer', label: 'React useReducer Docs' }],
          'Convert a multi-field form from useState to useReducer. Add 5 action types. Verify state transitions.',
          'Build a "Shopping Cart" with useReducer: actions for ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART, APPLY_COUPON. State: items[], total, discount, itemCount.', '2 hrs'),

        d(24, 'useRef & useImperativeHandle',
          'Access DOM nodes and persist mutable values.',
          'useRef(initial) returns {current: initial}. Doesn\'t trigger re-render. Uses: (1) DOM refs: ref={myRef}, then myRef.current.focus(), (2) Store mutable value without re-render (timers, previous value). forwardRef lets parent access child\'s DOM. useImperativeHandle exposes custom ref API.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useRef+tutorial+DOM+access', label: 'useRef Hook' }, { type: 'web', url: 'https://react.dev/reference/react/useRef', label: 'React useRef Docs' }],
          'Use useRef to focus an input on mount. Track previous state value with useRef. Create a stopwatch using useRef for the interval ID.',
          'Build a "Rich Text Editor" component: useRef for the textarea, auto-focus on mount, track cursor position, expose focus/blur/select methods via forwardRef.', '2 hrs'),

        d(25, 'useMemo & useCallback — Performance Optimization',
          'Prevent unnecessary re-renders with memoization.',
          'useMemo(fn, deps) memoizes an expensive calculation. useCallback(fn, deps) memoizes a function reference. React.memo(Component) skips re-render if props unchanged. When to use: expensive calculations, referential equality in deps, passing callbacks to memoized children. Don\'t over-optimize — profile first.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+useMemo+useCallback+optimization', label: 'useMemo & useCallback' }, { type: 'web', url: 'https://react.dev/reference/react/useMemo', label: 'React useMemo Docs' }],
          'Add useMemo to an expensive sort. Wrap a callback in useCallback. Wrap a child in React.memo. Verify with React DevTools Profiler.',
          'Optimize a "Data Table" component: useMemo for sorting/filtering 10k rows, useCallback for row click handlers, React.memo on TableRow, profile before/after in DevTools.', '2 hrs'),

        d(26, 'Custom Hooks',
          'Extract and reuse stateful logic with custom hooks.',
          'Custom hook: any function starting with "use" that calls other hooks. Must follow Rules of Hooks. Common patterns: useLocalStorage(key, default), useFetch(url), useDebounce(value, delay), useWindowSize(), useOnClickOutside(ref, handler), useMediaQuery(query). Custom hooks enable sharing logic without JSX.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+custom+hooks+tutorial+2024', label: 'Custom Hooks' }, { type: 'web', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', label: 'React Custom Hooks' }],
          'Build useLocalStorage. Build useFetch. Build useDebounce. Use all 3 in a single component.',
          'Build a hooks library with 6 custom hooks: useLocalStorage, useFetch (with loading/error/data), useDebounce, useWindowSize, useOnClickOutside, useKeyboard. Publish as a barrel file.', '2 hrs'),

        d(27, 'React Router v6 — Routing & Navigation',
          'Build multi-page React applications with client-side routing.',
          'npm install react-router-dom. BrowserRouter, Routes, Route, Link, NavLink, Outlet for nested routes. useNavigate() for programmatic navigation. useParams() for URL parameters. useSearchParams() for query strings. Loaders and Actions (v6.4+). Protected routes pattern. 404 Not Found route.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Router+v6+tutorial+2024', label: 'React Router v6' }, { type: 'web', url: 'https://reactrouter.com/en/main/start/tutorial', label: 'React Router Docs' }],
          'Set up routes for /, /about, /users, /users/:id. Add NavLink with active styling. Navigate programmatically after form submit.',
          'Build a "Blog App" with React Router: route /posts (list), /posts/:id (detail), /posts/new (form), /categories/:name (filter), protected /admin route, and a 404 page.', '2 hrs'),

        d(28, 'Data Fetching Patterns in React',
          'Handle async data in React components correctly.',
          'useEffect fetch pattern: mount fetch, cleanup abort. Loading/error/success states. Data fetching in route loaders (React Router v6.4). SWR (stale-while-revalidate) concept. Race conditions and why they matter. Optimistic updates. Infinite scroll. Pagination. Cache invalidation strategies.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+data+fetching+patterns+useEffect', label: 'React Data Fetching' }, { type: 'web', url: 'https://react.dev/learn/synchronizing-with-effects', label: 'React Effects Docs' }],
          'Fix a race condition in a search-as-you-type component. Implement optimistic delete (remove from UI before API confirms).',
          '🚀 PROJECT: Build a "React Blog" with full CRUD: list posts (paginated), view detail, create/edit form, delete with optimistic UI, abort controller for cancellation, and error boundaries.', '2 hrs'),
      ],
      project: { id: 'ifw4', title: 'Full React Blog with Auth Flow', desc: 'Build a multi-page React Blog: React Router v6 with nested routes, AuthContext for login state, protected routes, useReducer for post CRUD, useMemo for search/filter, custom useLocalStorage and useFetch hooks, React.memo on list items, and full data fetching with loading/error states. Deploy on Vercel.' }
    },

    // ── WEEK 5: State Management & APIs ──
    {
      week: 5, title: 'State Management & API Integration', timeRange: '14–16 hrs',
      days: [
        d(29, 'Redux Toolkit — Setup & Slices',
          'Manage global state with Redux Toolkit.',
          'npm install @reduxjs/toolkit react-redux. configureStore(), createSlice() (reducers + actions in one). Provider wraps app. useSelector(state => state.slice.value) reads state. useDispatch() sends actions. Immer under the hood allows "mutating" syntax in reducers. createAsyncThunk for async actions.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Redux+Toolkit+tutorial+2024+React', label: 'Redux Toolkit' }, { type: 'web', url: 'https://redux-toolkit.js.org/tutorials/quick-start', label: 'Redux Toolkit Docs' }],
          'Create a Redux store with 2 slices (counter + todos). Connect to React. Dispatch 5 different actions.',
          'Build a "Shopping Cart" with Redux Toolkit: cartSlice (add/remove/update quantity), userSlice (login/logout), productSlice (fetch/filter). Compute total in a selector.', '2 hrs'),

        d(30, 'Redux Toolkit — createAsyncThunk & RTK Query',
          'Handle async operations and API caching with Redux Toolkit.',
          'createAsyncThunk: pending/fulfilled/rejected lifecycle actions. extraReducers handles async. RTK Query: createApi(), defineEndpoints — auto-generates hooks like useGetPostsQuery, useMutation. Caching, invalidation, polling. Normalized state with createEntityAdapter. Dev Tools integration.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=RTK+Query+createAsyncThunk+tutorial', label: 'RTK Query' }, { type: 'web', url: 'https://redux-toolkit.js.org/rtk-query/overview', label: 'RTK Query Docs' }],
          'Convert a fetch useEffect to createAsyncThunk. Then convert again to RTK Query endpoint.',
          'Build an "API-powered Todo App" using RTK Query: endpoints for list, create, update, delete — auto-generated hooks, optimistic updates, and cache invalidation.', '2 hrs'),

        d(31, 'Zustand — Lightweight State Management',
          'Use Zustand as a simpler Redux alternative.',
          'npm install zustand. create(set => ({ state, actions })) — no boilerplate. Slice pattern for multiple stores. Immer middleware. Persist middleware (localStorage). Devtools middleware. Computed values with subscriptions. When to use Zustand vs Redux: smaller apps, less boilerplate.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Zustand+React+state+management+tutorial', label: 'Zustand Tutorial' }, { type: 'web', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction', label: 'Zustand Docs' }],
          'Build the same shopping cart with Zustand. Compare code length with Redux version.',
          'Build a "Note-Taking App" with Zustand: notes store (add/edit/delete/search), tags store, UI store (selected note, dark mode). Persist to localStorage via middleware.', '2 hrs'),

        d(32, 'Axios & API Integration',
          'Use Axios for advanced API communication.',
          'npm install axios. axios.get/post/put/patch/delete. axios.create() for base URL + headers. Interceptors: request (add auth token), response (handle 401 globally). CancelToken / AbortController. Automatic JSON. Error response: error.response.data vs error.request vs error.message. Concurrent with axios.all.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Axios+React+API+tutorial+interceptors', label: 'Axios Tutorial' }, { type: 'web', url: 'https://axios-http.com/docs/intro', label: 'Axios Docs' }],
          'Create an axios instance with base URL and auth header. Add request and response interceptors. Handle token refresh.',
          'Build an "API Service Layer": axios instance, request interceptor adds JWT, response interceptor handles 401 with token refresh, retry mechanism, and typed request/response.', '2 hrs'),

        d(33, 'React Query (TanStack Query)',
          'The best library for server state management in React.',
          'npm install @tanstack/react-query. QueryClient + QueryClientProvider. useQuery(key, fetchFn) — automatic loading/error/data. useMutation for writes. Query keys are the cache key. Stale time, refetch on focus/window, background refetch. Invalidate queries. Infinite queries for pagination.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Query+TanStack+tutorial+2024', label: 'React Query Tutorial' }, { type: 'web', url: 'https://tanstack.com/query/latest/docs/framework/react/overview', label: 'TanStack Query Docs' }],
          'Replace a useEffect fetch with useQuery. Convert a form submit to useMutation. Add optimistic update.',
          'Build a "CRUD Dashboard" with React Query: list with useQuery, create/edit/delete with useMutation, optimistic updates, loading skeletons, error handling, and refetch on focus.', '2 hrs'),

        d(34, 'Authentication & Protected Routes',
          'Implement auth flow with JWT and protected routes.',
          'Auth flow: login form → POST credentials → receive JWT → store token → send in Authorization header. Token storage: httpOnly cookie (secure) vs localStorage (XSS vulnerable). Refresh token pattern. React Router protected routes using Context + Outlet. Redirect after login. Logout clears token.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+JWT+authentication+protected+routes', label: 'React Auth' }, { type: 'web', url: 'https://reactrouter.com/en/main/start/faq', label: 'React Router Auth' }],
          'Build login form, store JWT in localStorage, add to axios interceptor, protect 3 routes, redirect to login if 401.',
          'Build a full "Auth System": login/register pages, JWT storage, axios interceptor, AuthContext, protected routes, persistent login on refresh, logout.', '2 hrs'),

        d(35, 'Intermediate Capstone Planning & Architecture',
          'Plan and architect your intermediate capstone project.',
          'Project: Full React SPA — Task Manager with auth, React Router, Redux Toolkit or Zustand, React Query for API, axios service layer, component library. Component architecture: Atomic Design (atoms → molecules → organisms → pages). Folder structure: feature-based. State: server state (React Query) vs client state (Zustand).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+project+architecture+folder+structure+2024', label: 'React Architecture' }, { type: 'web', url: 'https://www.robinwieruch.de/react-folder-structure/', label: 'React Folder Structure' }],
          'Draw the component tree for your capstone. Identify which state lives where. List all API endpoints.',
          '🚀 PLANNING: Create a project plan: wireframes, component tree diagram, state management strategy, API endpoints list, folder structure, and a 3-day implementation schedule.', '2 hrs'),
      ],
      project: { id: 'ifw5', title: 'Full-Stack Ready React SPA', desc: 'Build a complete React SPA: Zustand for client state, React Query for server state, axios service layer with interceptors, JWT auth with protected routes, React Router v6, and a polished UI. Features: auth, task CRUD with filters, optimistic updates, loading skeletons, error handling, and deploy to Vercel.' }
    },

    // ── WEEK 6: CSS Frameworks & Tooling ──
    {
      week: 6, title: 'CSS Frameworks & Modern Tooling', timeRange: '14–16 hrs',
      days: [
        d(36, 'Tailwind CSS — Utility-First Fundamentals',
          'Style React apps efficiently with Tailwind CSS.',
          'npm install -D tailwindcss. Utility classes: flex, grid, p-4, m-2, text-lg, font-bold, bg-blue-500, rounded-lg. Responsive: sm:, md:, lg:, xl:, 2xl: prefixes. Dark mode: dark: prefix. Hover/focus: hover:, focus: prefixes. JIT mode. tailwind.config.js for customization. @apply for extracting repeated utilities.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Tailwind+CSS+tutorial+2024+React', label: 'Tailwind CSS Tutorial' }, { type: 'web', url: 'https://tailwindcss.com/docs', label: 'Tailwind Docs' }],
          'Rebuild a card component using Tailwind only. Make it responsive with sm:/md:/lg:. Add dark: variants.',
          'Rebuild your Task Manager UI with Tailwind CSS: responsive layout, dark mode, hover/focus states, custom colors in tailwind.config.js, and extract repeated patterns with @apply.', '2 hrs'),

        d(37, 'Tailwind CSS — Components & Customization',
          'Build design systems with Tailwind\'s customization features.',
          'tailwind.config.js: extend colors, fonts, spacing, breakpoints. Custom utilities with plugins. shadcn/ui components (Tailwind + Radix). Component variants with clsx and class-variance-authority (cva). Headless UI for accessible components. Tailwind Forms plugin. Container queries with @container.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Tailwind+CSS+component+customization+2024', label: 'Tailwind Components' }, { type: 'web', url: 'https://ui.shadcn.com/', label: 'shadcn/ui' }],
          'Add custom brand colors, custom font, and custom spacing to tailwind.config.js. Install shadcn/ui and use 3 components.',
          'Build a "Design System" with Tailwind: custom brand tokens, Button with cva variants, Card, Badge, Modal — all with consistent design via config.', '2 hrs'),

        d(38, 'CSS Modules & Styled Components',
          'Use scoped styles with CSS Modules and CSS-in-JS.',
          'CSS Modules: import styles from "./Card.module.css"; className={styles.card}. Auto-scoped class names. Composes rule for mixins. Styled Components: npm install styled-components. const Button = styled.button`CSS here`. Template literal syntax. Dynamic styles via props: ${props => props.primary ? "#00e" : "#fff"}. Theme Provider.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+Modules+Styled+Components+React', label: 'CSS Modules & SC' }, { type: 'web', url: 'https://styled-components.com/docs', label: 'Styled Components Docs' }],
          'Convert 3 components to CSS Modules. Then convert to Styled Components. Compare both approaches.',
          'Build a "Themed Component Kit": 5 components in Styled Components, ThemeProvider with light/dark theme, dynamic color variants via props, and a theme toggle.', '2 hrs'),

        d(39, 'Vite — Build Tool Deep Dive',
          'Master Vite for fast development and optimized production builds.',
          'Vite dev server: native ES modules, instant HMR. vite.config.js: plugins, resolve.alias, proxy for API. Environment variables: .env, import.meta.env.VITE_API_URL. Production build: npm run build → dist/. Preview: npm run preview. Code splitting: dynamic import(). Vite plugins: @vitejs/plugin-react, vite-imagetools.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Vite+build+tool+tutorial+React+2024', label: 'Vite Tutorial' }, { type: 'web', url: 'https://vitejs.dev/guide/', label: 'Vite Docs' }],
          'Add path aliases (@ → src/). Set up .env files. Configure API proxy. Analyze bundle with rollup-plugin-visualizer.',
          'Configure a production-grade Vite setup: path aliases, multiple .env files (dev/staging/prod), API proxy, bundle analysis, and image optimization plugin.', '2 hrs'),

        d(40, 'ESLint, Prettier & Code Quality',
          'Enforce code style and catch errors automatically.',
          'ESLint: npm install -D eslint eslint-plugin-react. Rules: no-unused-vars, react-hooks/rules-of-hooks, react-hooks/exhaustive-deps. eslint.config.js. Prettier: consistent formatting. .prettierrc config. eslint-config-prettier to avoid conflicts. Husky + lint-staged: run linting on git commit. EditorConfig for cross-editor consistency.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=ESLint+Prettier+React+setup+2024', label: 'ESLint + Prettier' }, { type: 'web', url: 'https://eslint.org/docs/latest/', label: 'ESLint Docs' }],
          'Set up ESLint + Prettier in your project. Fix all errors. Add husky pre-commit hook.',
          'Configure a full code quality setup: ESLint with react and hooks plugins, Prettier with your style prefs, Husky + lint-staged for pre-commit, and fix all 20+ ESLint errors in a provided code sample.', '2 hrs'),

        d(41, 'npm, package.json & Dependency Management',
          'Understand Node package management for frontend projects.',
          'package.json: dependencies vs devDependencies. Scripts: build, dev, test, lint. Semantic versioning: ^1.2.3 (minor updates), ~1.2.3 (patch only), exact 1.2.3. package-lock.json / yarn.lock. npm audit for vulnerabilities. Workspaces for monorepos. pnpm for performance. npx for one-time tools.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=npm+package+json+tutorial+Node', label: 'npm Tutorial' }, { type: 'web', url: 'https://docs.npmjs.com/', label: 'npm Docs' }],
          'Audit a package.json. Update 5 packages. Add a new custom npm script. Run npm audit fix.',
          'Clean up your project\'s package.json: move 3 packages to devDependencies, pin 2 critical packages, add custom scripts (format, lint:fix, build:analyze), and write a commit hook.', '1.5 hrs'),

        d(42, 'React DevTools & Performance Profiling',
          'Debug and optimize React apps with DevTools.',
          'React DevTools browser extension: Component tree inspection, props/state viewer, hooks viewer. Profiler: record renders, identify most expensive components, check for unnecessary renders. Flame graph vs Ranked chart. Why-did-you-render library. Performance marks with React.Profiler component. Memory leak detection.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+DevTools+Profiler+tutorial', label: 'React DevTools' }, { type: 'web', url: 'https://react.dev/learn/react-developer-tools', label: 'React DevTools Docs' }],
          'Profile your Task Manager app. Find the 3 most expensive renders. Fix at least 2 with memoization.',
          '🚀 PROJECT: Profile and optimize your largest React app: identify 5 unnecessary re-renders with DevTools Profiler, fix with React.memo/useMemo/useCallback, measure improvement, and document the before/after comparison.', '2 hrs'),
      ],
      project: { id: 'ifw6', title: 'Polished React App with Tailwind + Vite', desc: 'Take your Task Manager SPA and: (1) migrate styles to Tailwind CSS with custom tokens, (2) set up Vite with aliases + proxy + env vars, (3) add ESLint + Prettier + Husky, (4) profile and fix 3 unnecessary re-renders, (5) deploy optimized production build to Vercel with a CI/CD GitHub Actions workflow.' }
    },

    // ── WEEK 7: Testing ──
    {
      week: 7, title: 'Testing — Jest, RTL & Mocking', timeRange: '12–14 hrs',
      days: [
        d(43, 'Testing Fundamentals & Jest',
          'Set up Jest and write your first unit tests.',
          'Unit tests: test individual functions. Integration tests: test components together. E2E: test full flows. Jest: test(), describe(), expect() matchers (toBe, toEqual, toBeTruthy, toContain, toThrow). beforeEach/afterEach lifecycle. --coverage flag. AAA pattern: Arrange, Act, Assert.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Jest+testing+JavaScript+tutorial+2024', label: 'Jest Tutorial' }, { type: 'web', url: 'https://jestjs.io/docs/getting-started', label: 'Jest Docs' }],
          'Write tests for 5 pure functions: 2 passing, 1 failing, 1 edge case, 1 error throw.',
          'Write a full test suite for your utility functions: test all edge cases, use describe blocks to group related tests, check error handling with toThrow.', '2 hrs'),

        d(44, 'React Testing Library',
          'Test React components from the user\'s perspective.',
          'npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event. render(), screen queries: getByText, getByRole, getByTestId, queryBy (not found = null), findBy (async). user-event vs fireEvent (user-event simulates real browser events). act() for state updates. a11y-aware queries.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Testing+Library+tutorial+2024', label: 'RTL Tutorial' }, { type: 'web', url: 'https://testing-library.com/docs/react-testing-library/intro/', label: 'RTL Docs' }],
          'Render a Button. Assert it\'s visible. Click it with user-event. Assert the handler was called.',
          'Write tests for: Button (renders, disabled, onClick), Input (controlled, validation), TaskList (renders items, empty state, filter works).', '2 hrs'),

        d(45, 'Mocking APIs & Async Tests',
          'Test async behavior and mock external dependencies.',
          'jest.fn() for function mocks. jest.mock("./module") for module mocking. Mock fetch: jest.spyOn(global, "fetch"). Mock Service Worker (MSW): intercept network requests with realistic handlers. Async tests: await findBy*, async/await in test fn. waitFor() for delayed assertions. Test loading and error states.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Jest+mock+API+async+testing+React', label: 'Mocking in Tests' }, { type: 'web', url: 'https://mswjs.io/docs/', label: 'MSW Docs' }],
          'Mock fetch for a user list component. Test loading state, success state, and error state.',
          'Set up MSW with handlers for your API. Test a data-fetching component: loading spinner appears, data renders, error message shows on failure.', '2 hrs'),

        d(46, 'Integration Testing & Coverage',
          'Test component interactions and measure test quality.',
          'Integration tests combine multiple units. Test user flows: type in form → submit → see result. Coverage: statements, branches, functions, lines. Jest --coverage report. 80% is a common target. What NOT to test: third-party libraries, implementation details, styling. Test behavior, not code.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+integration+testing+tutorial', label: 'Integration Tests' }, { type: 'web', url: 'https://kentcdodds.com/blog/write-tests', label: 'Kent C. Dodds Testing' }],
          'Write an integration test: fill a registration form, submit, mock the API, assert success message.',
          'Write 3 integration tests: (1) Login flow, (2) Add + filter + delete task, (3) Fetch + display + error. Reach 80% coverage.', '2 hrs'),

        d(47, 'Snapshot Testing & Accessibility Testing',
          'Catch unintended UI changes and test for accessibility.',
          'Snapshot: toMatchSnapshot() saves HTML structure, fails if it changes — good for "lock" not "logic". jest-axe for accessibility testing: await expect(results).toHaveNoViolations(). @testing-library/jest-dom a11y matchers: toBeVisible, toHaveFocus, toHaveAttribute, toBeDisabled. Test ARIA roles and labels.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+snapshot+testing+accessibility+jest', label: 'Snapshot & a11y Tests' }, { type: 'web', url: 'https://github.com/nicolo-ribaudo/jest-axe', label: 'jest-axe' }],
          'Add snapshot tests for 3 components. Add jest-axe checks to 5 components. Fix any a11y violations found.',
          'Audit your component library for accessibility: jest-axe checks on every component, fix role/label/focus issues, add snapshot tests for visual stability.', '2 hrs'),

        d(48, 'Testing Custom Hooks & Context',
          'Test custom hooks and context-dependent components.',
          'renderHook from @testing-library/react for testing hooks in isolation. act() wraps state updates. Testing context: wrap render with Provider. Test useLocalStorage, useFetch, useAuth. Mock context values. Test error boundaries. Testing with React Router: MemoryRouter wrapper.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+testing+custom+hooks+context', label: 'Testing Hooks & Context' }, { type: 'web', url: 'https://testing-library.com/docs/react-testing-library/api/#renderhook', label: 'renderHook Docs' }],
          'Test useLocalStorage: set value, get value, update value, persist on re-render. Test a protected route component.',
          '🚀 PROJECT: Full test suite for your app: unit tests for all utilities, RTL tests for all components, hook tests for all custom hooks, integration tests for 3 user flows, 80%+ coverage. Run in CI with GitHub Actions.', '2 hrs'),
      ],
      project: { id: 'ifw7', title: 'Fully Tested React App', desc: 'Add comprehensive tests to your Task Manager: Jest unit tests for utilities (100%), React Testing Library for all components, MSW for API mocking, renderHook for custom hooks, jest-axe for accessibility, integration tests for login/task CRUD flows, snapshot tests, and 80%+ coverage. Set up GitHub Actions to run tests on every PR.' }
    },

    // ── WEEK 8: Intermediate Capstone ──
    {
      week: 8, title: 'Intermediate Capstone — Full React SPA', timeRange: '12–14 hrs',
      days: [
        d(49, 'Capstone: Project Setup & Architecture',
          'Set up your full intermediate capstone project.',
          'Project: Full-featured React Task Manager with auth. Stack: Vite + React + TypeScript (optional) + Tailwind + React Router + Zustand/Redux + React Query + Axios + Jest/RTL. Architecture: feature-based folders (auth/, tasks/, ui/). Design tokens. API base URL in .env.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+project+architecture+2024', label: 'React Architecture' }, { type: 'web', url: 'https://react.dev/learn/thinking-in-react', label: 'Thinking in React' }],
          'Bootstrap the project. Set up all dependencies. Create folder structure. Add ESLint/Prettier/Husky.',
          'Set up your capstone: Vite config, Tailwind, React Router routes, Zustand store, React Query client, Axios instance, and folder structure.', '2 hrs'),

        d(50, 'Capstone: Authentication Flow',
          'Build complete login, register, and protected routes.',
          'Auth: login form → POST /auth/login → JWT → store → axios header. Register: POST /auth/register → redirect to login. Protected routes: AuthGuard component. Persistent auth: read token on app load. Refresh token: interceptor. Profile page. Logout clears all state.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+authentication+JWT+complete+tutorial', label: 'React Auth Complete' }, { type: 'web', url: 'https://jwt.io/', label: 'JWT.io' }],
          'Build the complete auth flow end-to-end. Test with MockServiceWorker.',
          'Complete auth: login + register forms with validation, JWT persistence, protected routes, profile page, logout.', '2 hrs'),

        d(51, 'Capstone: Task CRUD & Filtering',
          'Build the core task management features.',
          'Task list with React Query. Create: modal form with validation. Edit: inline or modal. Delete: optimistic remove. Filters: All/Active/Completed/Priority. Sort: by date, priority, name. Search: debounced. Drag-to-reorder with @dnd-kit or react-beautiful-dnd. Keyboard shortcuts.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+CRUD+task+manager+tutorial', label: 'React CRUD' }, { type: 'web', url: 'https://tanstack.com/query/latest', label: 'TanStack Query' }],
          'Build full task CRUD with React Query mutations. Add optimistic updates.',
          'Complete task features: list with pagination, create/edit modal, delete with undo, filter/sort/search, and drag-to-reorder.', '2 hrs'),

        d(52, 'Capstone: UI Polish & Dark Mode',
          'Add a professional look with Tailwind and animations.',
          'Design system with Tailwind tokens. Light/dark mode with class strategy. Smooth transitions on theme change. Loading skeletons. Empty states. Toast notifications with react-hot-toast. Framer Motion for page transitions. Responsive mobile layout. Print stylesheet.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Tailwind+dark+mode+animations+React', label: 'Tailwind Polish' }, { type: 'web', url: 'https://www.framer.com/motion/', label: 'Framer Motion Docs' }],
          'Add dark mode. Add loading skeletons for all data-fetching views. Add page transition animations.',
          'Polish the UI: dark mode, animated route transitions, task card animations, toast for all operations, mobile responsive layout, and print view.', '2 hrs'),

        d(53, 'Capstone: Testing Suite',
          'Add a comprehensive test suite to your capstone.',
          'Unit tests for utilities. RTL tests for all components. MSW handlers for all API endpoints. Integration tests for auth flow and task CRUD. Custom hook tests. Snapshot tests. jest-axe accessibility checks. GitHub Actions CI.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+testing+complete+tutorial+2024', label: 'Testing Complete' }, { type: 'web', url: 'https://testing-library.com/', label: 'Testing Library' }],
          'Reach 80% test coverage on your capstone.',
          'Write full test suite: unit + component + integration + hook tests. Run in CI.', '3 hrs'),

        d(54, 'Capstone: Deployment & CI/CD',
          'Deploy your capstone and set up automated pipelines.',
          'Vercel deployment: connect GitHub → auto-deploy on push. Environment variables in Vercel dashboard. Preview deployments for PRs. GitHub Actions: on push → lint → test → build → deploy. Branch protection: require CI to pass before merge.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Vercel+deployment+GitHub+Actions+CI', label: 'Deploy + CI/CD' }, { type: 'web', url: 'https://vercel.com/docs', label: 'Vercel Docs' }],
          'Deploy to Vercel. Set up GitHub Actions to run tests on every PR.',
          '🚀 CAPSTONE FINAL: Deploy your app with CI/CD. Production URL, passing tests, clean ESLint, 90+ Lighthouse.', '2 hrs'),

        d(55, 'Intermediate Level Wrap-Up & Portfolio Update',
          'Update your portfolio and plan your advanced path.',
          'Add your capstone to GitHub with a detailed README (screenshots, demo link, tech stack, installation guide). Update your portfolio website with a new "Projects" section. Key skills gained: React ecosystem, state management, testing, Tailwind, Vite, deployment. Next: TypeScript, Next.js, performance, production architecture.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+developer+portfolio+2024', label: 'Developer Portfolio' }, { type: 'web', url: 'https://www.patterns.dev/', label: 'Patterns.dev' }],
          'Write a detailed README. Deploy a live demo. Share it on LinkedIn.',
          '🎉 WRAP-UP: Portfolio update, LinkedIn post, GitHub README — ready for the Advanced level!', '2 hrs'),
      ],
      project: { id: 'ifw8', title: '🎓 Full React SPA — Intermediate Capstone', desc: 'Your Intermediate Capstone: a production-ready React Task Manager. Features: JWT auth with protected routes, full task CRUD with React Query + optimistic updates, Zustand for client state, React Router v6 nested routes, Tailwind CSS with dark mode, Framer Motion animations, 80%+ test coverage, CI/CD with GitHub Actions, deployed on Vercel. Live demo required.' }
    },

  ]
};

// ─────────────────────────────────────────────────────
//  🔴 ADVANCED — 90 Days / ~180 hrs
// ─────────────────────────────────────────────────────
const advanced = {
  label: '🔴 Advanced', days: 90, totalHours: 180,
  goal: 'Performance, Architecture & Production',
  weeks: [
    // ── WEEK 1: TypeScript ──
    {
      week: 1, title: 'TypeScript — Types, Interfaces & Generics', timeRange: '14–16 hrs',
      days: [
        d(1, 'TypeScript Setup & Basic Types',
          'Set up TypeScript and learn fundamental type annotations.',
          'npm install -D typescript ts-node @types/node. tsconfig.json: strict mode, target, module. Types: string, number, boolean, array (number[] or Array<number>), tuple [string, number], enum, any (avoid), unknown, never, void, null, undefined. Type inference. Union: string | number. Intersection: A & B.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+tutorial+beginners+2024', label: 'TypeScript Basics' }, { type: 'web', url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html', label: 'TS Handbook' }],
          'Add TypeScript to a Vite React project. Type all 10 utility functions from your JS library.',
          'Convert your weather app to TypeScript: type all props, state, API responses, and function signatures.', '2 hrs'),

        d(2, 'Interfaces & Type Aliases',
          'Define custom types with interfaces and type aliases.',
          'Interface: interface User { name: string; age?: number; } — optional with ?, readonly keyword. Type alias: type Point = { x: number; y: number }. Differences: interface can be extended/merged, type can be union/intersection/mapped. extends for interface inheritance. implements for class interfaces.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+interfaces+type+aliases', label: 'Interfaces & Types' }, { type: 'web', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html', label: 'TS Object Types' }],
          'Write 5 interfaces for: User, Product, ApiResponse, Config, Event. Extend 2 of them.',
          'Define a complete type system for your Task Manager: Task, User, Project, Comment, ApiResponse<T> interfaces.', '2 hrs'),

        d(3, 'Generics — Reusable Type-Safe Code',
          'Write flexible, reusable functions and types with generics.',
          'Generic function: function identity<T>(arg: T): T {}. Generic interfaces: interface Repository<T> {}. Generic constraints: <T extends object>. Multiple generics: <T, K extends keyof T>. Generic classes. Utility types using generics. Default generic parameters. Conditional types.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+generics+tutorial+complete', label: 'TypeScript Generics' }, { type: 'web', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', label: 'TS Generics' }],
          'Write a generic fetch<T>() function. A generic Stack<T> class. A generic filter<T>() with constraint.',
          'Build a generic "API Response Handler" that works with any resource type: ApiClient<T>, Repository<T extends {id: string}>, and PaginatedResponse<T>.', '2 hrs'),

        d(4, 'Utility Types & Mapped Types',
          'Transform and compose types with TypeScript utilities.',
          'Built-in utilities: Partial<T>, Required<T>, Readonly<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Exclude<T, U>, Extract<T, U>, NonNullable<T>, ReturnType<F>, Parameters<F>, InstanceType<C>. Mapped types: { [K in keyof T]: ... }. Conditional types: T extends U ? X : Y. Template literal types.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+utility+types+Partial+Pick+Omit', label: 'TS Utility Types' }, { type: 'web', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html', label: 'TS Utility Types Docs' }],
          'Use Partial, Pick, Omit, Record on your Task interface. Create a mapped type for form state.',
          'Build a "Type Transform Library": CreateDTO<T> (Omit id/createdAt), UpdateDTO<T> (Partial + Required id), FormState<T> (Record<keyof T, {value, error}>).', '2 hrs'),

        d(5, 'TypeScript with React — Props, Hooks & Events',
          'Type React components, hooks, and events with TypeScript.',
          'Component props: interface ButtonProps { label: string; onClick: () => void; variant?: "primary" | "secondary"; }. React.FC<Props> or explicit function typing. useState<Type>. useRef<HTMLInputElement>(null). Event types: React.MouseEvent<HTMLButtonElement>, React.ChangeEvent<HTMLInputElement>. Children: React.ReactNode.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+React+components+hooks+2024', label: 'TypeScript + React' }, { type: 'web', url: 'https://react-typescript-cheatsheet.netlify.app/', label: 'React TS Cheatsheet' }],
          'Type 5 components: Button, Input, Modal, Card, and a custom hook. Handle all event types.',
          'Convert your Task Manager component library to full TypeScript: typed props, hooks, events, context value, and Redux/Zustand store.', '2 hrs'),

        d(6, 'Strict Mode & Advanced TypeScript Patterns',
          'Master strict TypeScript and advanced type patterns.',
          'Strict mode enables: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply. Discriminated unions for type narrowing. Type guards: typeof, instanceof, in, custom (is) predicates. Exhaustive checking with never. Branded types for validation. Declaration merging. Module augmentation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+advanced+patterns+strict+mode', label: 'Advanced TypeScript' }, { type: 'web', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', label: 'TS Narrowing' }],
          'Enable strict mode. Fix all type errors. Add 3 type guards. Create a discriminated union for API states.',
          'Refactor your codebase with strict mode: fix all errors, add discriminated unions for async states (Loading | Success | Error), custom type guards, and branded types for IDs.', '2 hrs'),

        d(7, 'TypeScript Configuration & Declaration Files',
          'Configure TypeScript for different project needs.',
          'tsconfig.json deep dive: target (ES2020), lib, module (ESNext), moduleResolution (bundler), paths for aliases, composite for project references. Declaration files (.d.ts): for third-party JS libraries. @types/* packages. Declaration merging. ambient modules. Writing custom .d.ts. tsc --showConfig.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=TypeScript+tsconfig+declaration+files', label: 'tsconfig Deep Dive' }, { type: 'web', url: 'https://www.typescriptlang.org/tsconfig', label: 'tsconfig Reference' }],
          'Configure path aliases in tsconfig. Write a .d.ts for an untyped library. Enable project references.',
          '🚀 PROJECT: Full TypeScript migration of your React SPA: strict mode, all types, path aliases, and custom declarations for any untyped dependencies.', '2 hrs'),
      ],
      project: { id: 'afw1', title: 'TypeScript React App — Full Migration', desc: 'Fully migrate your React Task Manager to TypeScript: strict mode tsconfig, typed props/state/events/hooks, generic ApiClient<T>, utility types for DTOs and form states, discriminated unions for async states, branded types for entity IDs, custom type guards, and 0 TypeScript errors.' }
    },

    // ── WEEK 2: Next.js ──
    {
      week: 2, title: 'Next.js — App Router, SSR, SSG & Server Components', timeRange: '14–16 hrs',
      days: [
        d(8, 'Next.js Setup & App Router Basics',
          'Set up Next.js 14 and understand the App Router.',
          'npx create-next-app@latest. App Router: app/ directory. layout.tsx (persistent UI), page.tsx (route), loading.tsx (Suspense), error.tsx (error boundary), not-found.tsx. File-based routing: app/blog/[slug]/page.tsx → /blog/anything. Route groups: (marketing)/. Template files. Metadata API.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+14+App+Router+tutorial+2024', label: 'Next.js App Router' }, { type: 'web', url: 'https://nextjs.org/docs', label: 'Next.js Docs' }],
          'Create a Next.js app. Set up 5 routes: /, /about, /blog, /blog/[slug], /dashboard. Add layout with nav.',
          'Build a "Blog Platform" skeleton: shared layout (header, nav, footer), home with featured post, blog list page, dynamic [slug] page, and dashboard with nested layout.', '2 hrs'),

        d(9, 'Server Components vs Client Components',
          'Understand when to use Server and Client Components.',
          'Server Components (default): run on server, can be async, access DB/files directly, can\'t use hooks/events. Client Components ("use client"): interactive, can use hooks/events/browser APIs. Boundary: "use client" directive. Pass server data as props to client components. Composition: server wraps client. No waterfall for server data.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+Server+Components+Client+Components+2024', label: 'RSC vs Client' }, { type: 'web', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components', label: 'RSC Docs' }],
          'Build a page that fetches data in a Server Component and passes it to a Client Component for interaction.',
          'Build a "Product Catalog": Server Component fetches products (no loading state needed), Client Component handles cart add, filters, and search (useState).', '2 hrs'),

        d(10, 'SSR, SSG & ISR — Rendering Strategies',
          'Choose the right rendering strategy for each use case.',
          'SSR: async Server Component or generateMetadata fetches on each request. SSG: generateStaticParams() + dynamic segments = pre-built at build time. ISR: revalidate = seconds in fetch options. Dynamic = "force-dynamic" for always server render. Parallel routes, intercepting routes. Understanding the streaming model.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+SSR+SSG+ISR+rendering+strategies', label: 'SSR SSG ISR' }, { type: 'web', url: 'https://nextjs.org/docs/app/building-your-application/rendering', label: 'Next.js Rendering' }],
          'Build 3 pages: one SSR (dashboard), one SSG (blog), one ISR (products, revalidate 60s).',
          'Build an e-commerce site with: SSG home page, ISR product catalog (revalidate 300s), SSR user cart/account, and streaming product details.', '2 hrs'),

        d(11, 'Next.js API Routes & Server Actions',
          'Build backend API endpoints and server mutations.',
          'Route Handlers: app/api/route.ts with GET/POST/PUT/DELETE exports. Request/Response from Web API. Middleware: middleware.ts at root, matches URL patterns, can redirect/rewrite. Server Actions: "use server", async functions called from Client Components, form action= attribute, progressive enhancement.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+API+routes+Server+Actions+2024', label: 'Next.js API Routes' }, { type: 'web', url: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers', label: 'Route Handlers Docs' }],
          'Create API routes for GET/POST /api/tasks. Add middleware for auth check. Create a Server Action for form submit.',
          'Build a "Full API Layer" for your blog: API routes for CRUD, Server Actions for create/edit, middleware for auth, and rate limiting.', '2 hrs'),

        d(12, 'Next.js Image, Font & Metadata Optimization',
          'Leverage Next.js built-in optimizations.',
          'next/image: automatic WebP, lazy loading, size optimization, blur placeholder, fill mode. next/font: self-hosted Google Fonts with 0 layout shift, font-display swap. Metadata API: export const metadata = { title, description, openGraph }. generateMetadata for dynamic. JSON-LD for structured data. Sitemap and robots.txt.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+Image+Font+optimization+SEO+2024', label: 'Next.js Optimization' }, { type: 'web', url: 'https://nextjs.org/docs/app/building-your-application/optimizing', label: 'Next.js Optimizing' }],
          'Replace all <img> with next/image. Set up Google Font with next/font. Add metadata to all pages.',
          'Optimize your Next.js blog: all images via next/image with blur placeholders, next/font for typography, dynamic metadata per post, OpenGraph images, sitemap.xml, robots.txt.', '2 hrs'),

        d(13, 'Authentication in Next.js — Auth.js / NextAuth',
          'Add auth to Next.js with Auth.js.',
          'npm install next-auth@beta (v5). configure in auth.ts. Providers: Google, GitHub, Credentials. session() in Server Components. getSession() for client. Middleware-based route protection. JWT vs database sessions. Role-based access control. Auth.js callbacks for custom data.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=NextAuth+Auth.js+Next.js+tutorial+2024', label: 'NextAuth Tutorial' }, { type: 'web', url: 'https://authjs.dev/getting-started/installation', label: 'Auth.js Docs' }],
          'Set up GitHub OAuth. Protect /dashboard route. Display user info from session.',
          'Build complete auth: GitHub + Google providers, protected routes via middleware, user profile from session, role-based nav, sign in/out UI.', '2 hrs'),

        d(14, 'Deploying Next.js — Vercel & Edge',
          'Deploy Next.js to production with Vercel.',
          'vercel deploy from CLI or GitHub push. Environment variables: Vercel dashboard → Settings → Env Vars. Edge runtime for middleware and API routes. Edge Config for feature flags. Vercel Analytics for Core Web Vitals. Preview deployments. Domain configuration. Caching headers. Incremental Static Regeneration in production.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+Vercel+deployment+production+2024', label: 'Next.js Deployment' }, { type: 'web', url: 'https://vercel.com/docs/deployments/overview', label: 'Vercel Deployment Docs' }],
          'Deploy to Vercel with environment variables. Enable Vercel Analytics. Test ISR revalidation in production.',
          '🚀 PROJECT: Deploy your Next.js blog to Vercel: production env vars, Vercel Analytics, preview deployment for feature branches, custom domain, and performance audit.', '2 hrs'),
      ],
      project: { id: 'afw2', title: 'Next.js Blog Platform with Auth', desc: 'Build a production Next.js 14 blog: App Router with shared layout, Server Components for data, Client Components for interactions, SSG for post pages, ISR for catalog, Server Actions for comments, Auth.js for login, next/image & next/font optimization, dynamic metadata, API routes, and deployed on Vercel with analytics.' }
    },

    // ── WEEK 3: Advanced React Patterns ──
    {
      week: 3, title: 'Advanced React Patterns — Compound, HOC & Suspense', timeRange: '14–16 hrs',
      days: [
        d(15, 'Compound Components Pattern',
          'Build flexible, expressive component APIs.',
          'Compound components share state via Context. Example: <Select><Select.Option value="a">A</Select.Option></Select>. Step 1: createContext. Step 2: parent provides state/dispatch. Step 3: children consume via useContext. Benefits: flexible composition, clear API. Used by: Radix UI, Headless UI, React Aria.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+compound+components+pattern', label: 'Compound Components' }, { type: 'web', url: 'https://kentcdodds.com/blog/compound-components-with-react-hooks', label: 'Kent C. Dodds Compound' }],
          'Build a compound Accordion: <Accordion><Accordion.Item><Accordion.Trigger><Accordion.Content>.',
          'Build a compound Tabs component: Tabs, Tabs.List, Tabs.Tab, Tabs.Panel — with Context, keyboard navigation, and ARIA attributes.', '2 hrs'),

        d(16, 'Render Props & HOC Patterns',
          'Share logic with render props and higher-order components.',
          'Render props: <Mouse render={pos => <Cursor x={pos.x} />} />. Children as function: children(data). HOC: function withAuth(Component) { return function AuthComponent(props) {...} }. HOC conventions: pass through all props, hoist statics, displayName. Both patterns are largely replaced by custom hooks but still found in libraries.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+render+props+higher+order+components', label: 'Render Props & HOC' }, { type: 'web', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', label: 'React Sharing Logic' }],
          'Convert a HOC withLoading to a custom hook useLoading. Build a renderProp DataFetcher component.',
          'Refactor legacy patterns: convert withAuth HOC → useAuth hook, convert DataProvider render prop → useData hook, document the migration.', '2 hrs'),

        d(17, 'Portals & Error Boundaries',
          'Render outside the DOM hierarchy and catch React errors.',
          'React.createPortal(children, domNode): renders to a different DOM node. Used for: modals (above stacking context), tooltips, drawers. Still part of React tree for events/context. Error boundaries: class component with componentDidCatch and getDerivedStateFromError. Granular error boundaries per feature. react-error-boundary library.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+portals+error+boundaries+tutorial', label: 'Portals & Error Boundaries' }, { type: 'web', url: 'https://react.dev/reference/react/createPortal', label: 'React Portals Docs' }],
          'Build a Modal using createPortal. Add an ErrorBoundary around each major section of your app.',
          'Build a "Notification System": Portal-based toast that renders at body level, ErrorBoundary per route, fallback UI for broken sections, error reporting.', '2 hrs'),

        d(18, 'Suspense & Lazy Loading',
          'Optimize load time with code splitting and Suspense.',
          'React.lazy(() => import("./Component")) for code splitting. Suspense fallback while lazy component loads. React Query integrates with Suspense. useSuspenseQuery. Concurrent features in React 18. startTransition for non-urgent updates. useTransition hook. useDeferredValue for deprioritized computation.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Suspense+lazy+loading+code+splitting', label: 'Suspense & Lazy' }, { type: 'web', url: 'https://react.dev/reference/react/Suspense', label: 'React Suspense Docs' }],
          'Lazy load 5 route components. Wrap a data-fetching component with Suspense. Use startTransition for search.',
          'Optimize your app: lazy load all routes, Suspense boundaries with skeletons, startTransition for search/filter, useDeferredValue for a large computed list.', '2 hrs'),

        d(19, 'Controlled vs Uncontrolled Components',
          'Choose the right form control strategy.',
          'Controlled: React state is single source of truth. Predictable, easier validation. Uncontrolled: DOM is source of truth, accessed via refs. React Hook Form (uncontrolled): useForm(), register(), handleSubmit(). Schema validation with Zod. FormProvider for nested forms. watch(), setValue(), reset().',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Hook+Form+Zod+validation+2024', label: 'React Hook Form + Zod' }, { type: 'web', url: 'https://react-hook-form.com/', label: 'React Hook Form Docs' }],
          'Convert a controlled form to React Hook Form. Add Zod schema validation. Handle nested fields.',
          'Build a "Complex Job Application Form" with React Hook Form + Zod: multi-step, nested arrays (work history), file upload, conditional fields, and real-time error messages.', '2 hrs'),

        d(20, 'State Machines with XState',
          'Model complex UI states with state machines.',
          'State machines: finite states, defined transitions, no impossible states. XState: createMachine(), useMachine(). States: idle/loading/success/error. Guards, actions, services. Statechart visualization. When to use: complex forms, multi-step flows, real-time connections, async operations with retries.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=XState+React+state+machine+tutorial', label: 'XState Tutorial' }, { type: 'web', url: 'https://stately.ai/docs/xstate', label: 'XState Docs' }],
          'Model a traffic light with XState. Then model an async fetch with loading/success/error/retry states.',
          'Build a "Multi-step Checkout" using XState: cart → shipping → payment → confirmation → success/error, with guards for validation and retry on payment failure.', '2 hrs'),

        d(21, 'Advanced Patterns Project — UI Library',
          'Apply advanced patterns to build a component library.',
          'Combine: compound components, render props, HOCs, portals, error boundaries, Suspense. Build accessible, composable components. Storybook for component documentation. Design tokens. Tree-shakeable exports. TypeScript declarations. Changelog and versioning.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+component+library+advanced+patterns', label: 'Component Library' }, { type: 'web', url: 'https://storybook.js.org/tutorials/', label: 'Storybook Tutorial' }],
          'Set up Storybook. Write stories for 5 components with all variants and states.',
          '🚀 PROJECT: Build a mini UI library with 8 components using advanced patterns: compound Select, HOC withSuspense, Portal Modal, ErrorBoundary, lazy LazyRoute, Hook Form Input, XState AsyncButton.', '2 hrs'),
      ],
      project: { id: 'afw3', title: 'Advanced UI Component Library', desc: 'Build a reusable React UI library: compound Tabs & Accordion, Portal-based Modal & Toast, ErrorBoundary, React.lazy route wrapper, React Hook Form + Zod Input, XState-powered AsyncButton, and all documented in Storybook with TypeScript declarations. Publish as an npm package.' }
    },

    // ── WEEK 4: Web Performance ──
    {
      week: 4, title: 'Web Performance — Core Web Vitals & Optimization', timeRange: '14–16 hrs',
      days: [
        d(22, 'Core Web Vitals — LCP, CLS & INP',
          'Understand and measure the key performance metrics.',
          'LCP (Largest Contentful Paint): how fast the largest visible element loads. Target: < 2.5s. CLS (Cumulative Layout Shift): how much elements shift unexpectedly. Target: < 0.1. INP (Interaction to Next Paint): responsiveness to input. Target: < 200ms. Measure with: Lighthouse, Chrome DevTools Performance, PageSpeed Insights, web-vitals.js.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Core+Web+Vitals+LCP+CLS+INP+2024', label: 'Core Web Vitals' }, { type: 'web', url: 'https://web.dev/articles/vitals', label: 'web.dev Vitals' }],
          'Run Lighthouse on 3 sites. Record all 3 CWV scores. Identify the top issue for each.',
          'Audit your Next.js app: measure CWV with PageSpeed Insights, identify LCP element, find CLS causes, test INP with slow CPU throttle, document 5 improvements.', '2 hrs'),

        d(23, 'Code Splitting & Bundle Optimization',
          'Reduce bundle size for faster load times.',
          'Bundle analysis: rollup-plugin-visualizer or @next/bundle-analyzer. Tree shaking: named imports only, avoid import *. Dynamic imports for code splitting. Route-based and component-based splitting. Lazy loading vendor libraries. Chunk naming. Module federation preview. Differential loading (modern vs legacy).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=code+splitting+bundle+optimization+React+Vite', label: 'Bundle Optimization' }, { type: 'web', url: 'https://web.dev/articles/code-splitting-libraries', label: 'web.dev Code Splitting' }],
          'Analyze your bundle. Find the 3 largest chunks. Lazy-load 2 of them. Measure JS bundle size reduction.',
          'Reduce your app\'s JS bundle: analyze with visualizer, lazy-load heavy libraries (charting, date library), split vendor chunks, achieve 30% bundle size reduction.', '2 hrs'),

        d(24, 'Image Optimization',
          'Optimize images for performance and visual quality.',
          'Format: WebP (40% smaller than JPEG), AVIF (50% smaller). Responsive: srcset and sizes attributes. Lazy loading: loading="lazy" or IntersectionObserver. LQIP (Low Quality Image Placeholder) or blur-up technique. Sprites for icons. CDN for serving images. next/image automates most of this.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=image+optimization+web+performance+WebP', label: 'Image Optimization' }, { type: 'web', url: 'https://web.dev/learn/images/', label: 'web.dev Images' }],
          'Convert 5 JPEG images to WebP. Add srcset for 3 responsive images. Test lazy loading.',
          'Optimize all images in your app: convert to WebP/AVIF, add srcset for different viewport sizes, blur placeholder on all images, ensure no images block LCP.', '2 hrs'),

        d(25, 'Caching Strategies & Service Workers',
          'Implement smart caching for instant repeat visits.',
          'Browser cache: Cache-Control headers (max-age, immutable, no-store). Service Worker: cache.addAll() for precache, cache.match() for offline. Strategies: Cache First (static assets), Network First (API), Stale While Revalidate (content). Workbox library for Service Worker management.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Service+Worker+caching+strategies+web', label: 'Caching Strategies' }, { type: 'web', url: 'https://web.dev/articles/service-worker-caching-and-http-caching', label: 'web.dev Caching' }],
          'Write a Service Worker with Cache First strategy for static assets and Network First for API.',
          'Add Workbox to your Next.js app: precache shell, Network First for API routes, Cache First for images, background sync for failed mutations.', '2 hrs'),

        d(26, 'Rendering Performance — Layout & Paint',
          'Eliminate jank and ensure smooth 60fps interactions.',
          'The pixel pipeline: JS → Style → Layout → Paint → Composite. Avoid: layout thrash (reading then writing DOM in a loop), forced reflows. Use: will-change: transform for GPU layers, transform instead of top/left, opacity instead of visibility. requestAnimationFrame batching. CSS containment: contain: layout.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+layout+paint+performance+web+jank', label: 'Rendering Performance' }, { type: 'web', url: 'https://web.dev/articles/rendering-performance', label: 'web.dev Rendering' }],
          'Record a Performance trace. Identify a long task. Find a layout thrash. Fix both.',
          'Fix 3 performance issues in your app: batch DOM reads/writes, replace JS animations with CSS transform/opacity, add CSS containment to list items.', '2 hrs'),

        d(27, 'Lighthouse CI & Performance Budgets',
          'Automate performance monitoring.',
          'Lighthouse CI: run Lighthouse in CI pipeline on every PR. Performance budgets: fail CI if LCP > 2.5s. @lhci/cli configuration. GitHub Actions integration. Performance budget for: JS bundle (200KB), CSS (50KB), images (500KB per page). Monitoring: Chrome UX Report, Sentry performance monitoring.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Lighthouse+CI+performance+budget+GitHub+Actions', label: 'Lighthouse CI' }, { type: 'web', url: 'https://github.com/GoogleChrome/lighthouse-ci', label: 'Lighthouse CI Docs' }],
          'Set up Lighthouse CI in GitHub Actions. Set budgets for LCP, CLS, JS size. Make a PR and watch it pass/fail.',
          'Add performance automation: Lighthouse CI in GitHub Actions with budgets, Sentry for real user monitoring, weekly performance report via API, and alert on regression.', '2 hrs'),

        d(28, 'Font Loading & Critical Rendering Path',
          'Optimize how browsers load and render your page.',
          'Critical rendering path: HTML → DOM → CSSOM → Render Tree → Layout → Paint. Render-blocking resources: CSS in <head> (needed), JS in <body> or async/defer. Critical CSS: inline above-the-fold styles. Font loading: preconnect, preload, font-display: swap/optional. Resource hints: prefetch, preload, preconnect.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=critical+rendering+path+font+loading+performance', label: 'Critical Path' }, { type: 'web', url: 'https://web.dev/articles/critical-rendering-path', label: 'web.dev CRP' }],
          'Add preconnect for your font provider. Preload your LCP image. Defer 3 non-critical scripts.',
          '🚀 PROJECT: Achieve 95+ Lighthouse on all pages: preload LCP image, defer non-critical JS, inline critical CSS, preconnect fonts, set correct Cache-Control headers.', '2 hrs'),
      ],
      project: { id: 'afw4', title: 'Performance-Optimized Next.js App', desc: 'Achieve 95+ Lighthouse on your Next.js app: analyze and reduce bundle by 30%, optimize all images to WebP with blur placeholders, implement Service Worker with Workbox caching, eliminate layout thrash, set up Lighthouse CI in GitHub Actions with performance budgets, and add Sentry real user monitoring.' }
    },

    // ── WEEK 5: Accessibility & Security ──
    {
      week: 5, title: 'Accessibility & Security — WCAG & XSS Prevention', timeRange: '14–16 hrs',
      days: [
        d(29, 'WCAG 2.1 AA — Core Principles',
          'Understand web accessibility standards.',
          'WCAG principles: Perceivable, Operable, Understandable, Robust (POUR). Level A (minimum), AA (standard), AAA (enhanced). 2.1 new requirements: reflow (400% zoom), orientation, identify input purpose. ARIA in HTML5: native semantics preferred. Screen readers: VoiceOver (Mac), NVDA (Windows), TalkBack (Android).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=WCAG+2.1+web+accessibility+tutorial', label: 'WCAG 2.1' }, { type: 'web', url: 'https://www.w3.org/WAI/WCAG21/quickref/', label: 'WCAG Quick Ref' }],
          'Run your app with VoiceOver/NVDA. Test at 400% zoom. List 5 accessibility violations you find.',
          'Accessibility audit: test with VoiceOver, NVDA, and at 400% zoom. Document all violations and their WCAG criterion. Fix top 5.', '2 hrs'),

        d(30, 'ARIA Roles, Labels & Live Regions',
          'Add ARIA attributes for screen reader support.',
          'ARIA roles: main, navigation, banner, contentinfo, dialog, alert, status, search. aria-label, aria-labelledby, aria-describedby. aria-expanded, aria-selected, aria-checked, aria-disabled. aria-live="polite" for dynamic content, "assertive" for urgent. aria-hidden="true" for decorative. role="presentation". Using wrong ARIA is worse than no ARIA.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=ARIA+roles+labels+accessibility+HTML', label: 'ARIA Tutorial' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA', label: 'MDN ARIA' }],
          'Add aria-live to your toast notifications. Add aria-expanded to accordion. Test with screen reader.',
          'Add ARIA to 10 interactive components: modal (dialog role), dropdown (listbox), tabs (tablist/tab/tabpanel), search result count (live region), and status messages.', '2 hrs'),

        d(31, 'Keyboard Navigation & Focus Management',
          'Ensure full keyboard operability.',
          'All interactive elements must be keyboard accessible. Tab order follows DOM order (don\'t use tabindex > 0). tabindex="0" adds to tab order. tabindex="-1" focusable by JS only. Focus trap in modals: Tab wraps within dialog. Focus restoration on modal close. Skip links. Visible focus styles (never outline: none!). Arrow key navigation for menus.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=keyboard+navigation+focus+management+accessibility', label: 'Keyboard Navigation' }, { type: 'web', url: 'https://web.dev/learn/accessibility/focus/', label: 'web.dev Focus' }],
          'Test your app with Tab only (no mouse). Find 3 keyboard traps. Add focus trap to your modal.',
          'Make your app fully keyboard operable: visible focus ring on all elements, focus trap in modal, skip-to-content link, arrow key navigation in dropdown menus.', '2 hrs'),

        d(32, 'Color Contrast & Visual Accessibility',
          'Meet color contrast requirements and visual design standards.',
          'Normal text: 4.5:1 contrast ratio. Large text (18pt/14pt bold): 3:1. UI components: 3:1. Test with: WebAIM Contrast Checker, Chrome DevTools accessibility panel. Never use color as the only indicator. Support forced colors mode (Windows High Contrast). Motion: prefers-reduced-motion. Text spacing override test.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=color+contrast+accessibility+WCAG', label: 'Color Contrast' }, { type: 'web', url: 'https://webaim.org/resources/contrastchecker/', label: 'Contrast Checker' }],
          'Check 10 color combinations in your app. Fix any below 4.5:1. Test with Windows High Contrast mode.',
          'Audit all color pairs in your design system: fix contrast violations, add non-color indicators (icons for errors), support prefers-reduced-motion.', '2 hrs'),

        d(33, 'XSS Prevention & Content Security Policy',
          'Protect your app from injection attacks.',
          'XSS (Cross-Site Scripting): injecting malicious scripts. Prevention: never use innerHTML with user input, use textContent instead, sanitize with DOMPurify. React\'s JSX escapes by default (dangerouslySetInnerHTML is explicit). CSP: Content-Security-Policy header restricts allowed script sources. Helmet.js for Node. Nonce-based CSP.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=XSS+prevention+Content+Security+Policy+web', label: 'XSS & CSP' }, { type: 'web', url: 'https://owasp.org/www-community/attacks/xss/', label: 'OWASP XSS' }],
          'Find 3 potential XSS vectors in a sample codebase. Fix them. Add a CSP header.',
          'Security audit: replace all innerHTML with textContent/DOMPurify, add CSP header via Next.js headers config, test with security scanner.', '2 hrs'),

        d(34, 'Input Validation & CSRF Protection',
          'Validate all inputs and prevent cross-site request forgery.',
          'Never trust client-side validation alone — always validate server-side. Input sanitization: strip HTML tags, escape special chars, validate types. CSRF: attacker tricks logged-in user into making unintended requests. Defense: CSRF tokens, SameSite cookie attribute, checking Origin header. JWT in Authorization header (not cookie) is CSRF-safe.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=input+validation+CSRF+protection+web+security', label: 'Input Validation & CSRF' }, { type: 'web', url: 'https://owasp.org/www-community/attacks/csrf', label: 'OWASP CSRF' }],
          'Add Zod validation on all API route inputs. Implement CSRF token for a form. Check cookie SameSite attributes.',
          'Harden your API routes: Zod validation on all inputs, CSRF token for state-changing requests, SameSite=Strict cookies, and security headers via Next.js config.', '2 hrs'),

        d(35, 'Security Headers & HTTPS',
          'Configure HTTP security headers for production.',
          'Security headers: Strict-Transport-Security (HSTS), X-Frame-Options (clickjacking), X-Content-Type-Options (MIME sniffing), Referrer-Policy, Permissions-Policy. Next.js headers() in next.config.js. Test with: Security Headers (securityheaders.com), Mozilla Observatory. HTTPS: always required. Certificate management.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=security+headers+HTTPS+web+production', label: 'Security Headers' }, { type: 'web', url: 'https://securityheaders.com/', label: 'Security Headers Checker' }],
          'Add all 6 security headers to your Next.js app. Test with securityheaders.com. Get an A grade.',
          '🚀 PROJECT: Get A+ on both Lighthouse accessibility and securityheaders.com: all ARIA added, full keyboard nav, WCAG AA contrast, all security headers, CSP, CSRF protection, and Zod validation on all inputs.', '2 hrs'),
      ],
      project: { id: 'afw5', title: 'Accessible & Secure React App', desc: 'Achieve WCAG 2.1 AA on your app: jest-axe tests pass, full keyboard navigation with focus trap, ARIA on all components, 4.5:1 contrast on all text, prefers-reduced-motion support. Security: CSP headers, XSS prevention via DOMPurify, CSRF tokens, input validation with Zod, and A+ on security headers scan.' }
    },

    // ── WEEK 6: Advanced CSS & Animations ──
    {
      week: 6, title: 'Advanced CSS — Custom Properties, Animations & Framer Motion', timeRange: '14–16 hrs',
      days: [
        d(36, 'CSS Custom Properties — Design Tokens System',
          'Build a scalable design token system with CSS variables.',
          'CSS custom properties: --token-name: value; inherit through the cascade. Overridable per selector. JavaScript access: getComputedStyle(el).getPropertyValue("--color"). setProperty for dynamic theming. Design token levels: global → semantic → component. Automatic dark mode with @media (prefers-color-scheme). CSS env() variables.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+custom+properties+design+tokens+system', label: 'CSS Design Tokens' }, { type: 'web', url: 'https://www.smashingmagazine.com/2021/05/css-custom-properties-design-tokens/', label: 'CSS Design Tokens Article' }],
          'Build a 3-tier token system: globals → semantics → components. Switch themes by overriding semantic tokens.',
          'Build a "Token-Based Design System": global tokens (colors, spacing), semantic tokens (--color-background, --color-text-primary), component tokens (--button-bg), 3 themes.', '2 hrs'),

        d(37, 'Advanced CSS Animations',
          'Create complex, performant CSS animations.',
          'Multi-step keyframes. animation-fill-mode: both. animation-composition. Offset-path for motion paths. CSS scroll-driven animations: @scroll-timeline, animation-timeline: scroll(). View transitions API. CSS Houdini: CSS.paintWorklet, CSS.animationWorklet. Animation performance: composited layers only (transform, opacity).',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=advanced+CSS+animations+scroll+driven+2024', label: 'Advanced CSS Animations' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations', label: 'Scroll-Driven Animations' }],
          'Build a scroll-progress bar using scroll-driven animations. Create a motion path animation.',
          'Build an "Animated Landing Page": scroll-driven section reveals, CSS motion path for a logo orbit, staggered text animations, and View Transitions for page navigation.', '2 hrs'),

        d(38, 'Framer Motion — Declarative Animations in React',
          'Add professional animations to React with Framer Motion.',
          'npm install framer-motion. motion.div, motion.button etc. animate, initial, exit props. variants for shared animation states. AnimatePresence for exit animations. whileHover, whileTap, whileFocus. layout for smooth layout changes. MotionValue for scroll-linked animations. useSpring, useTransform. Gestures: drag, pan, pinch.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Framer+Motion+React+tutorial+2024', label: 'Framer Motion' }, { type: 'web', url: 'https://www.framer.com/motion/', label: 'Framer Motion Docs' }],
          'Add AnimatePresence to a list. Create a shared layout animation. Build a drag-to-sort list.',
          'Build an animated "Card Game" with Framer Motion: drag cards, shared layout transitions, spring physics, scroll-linked parallax, and page transitions.', '2 hrs'),

        d(39, 'GSAP — Professional JavaScript Animations',
          'Create high-performance animations with GSAP.',
          'npm install gsap. gsap.to(), gsap.from(), gsap.fromTo(). TimelineLite for sequenced animations. ScrollTrigger plugin: animate on scroll enter/leave. Stagger arrays of elements. ease options: power2, elastic, bounce. React integration: gsap + useRef + useLayoutEffect. SplitText for character-by-character.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GSAP+animation+tutorial+React+2024', label: 'GSAP Tutorial' }, { type: 'web', url: 'https://gsap.com/docs/', label: 'GSAP Docs' }],
          'Create a GSAP timeline with 5 stages. Add ScrollTrigger to animate on scroll. Use stagger on 10 elements.',
          'Build a "GSAP Showcase Page": hero text split animation, ScrollTrigger section reveals with parallax, staggered card entries, and a pinned scroll-jacking section.', '2 hrs'),

        d(40, 'CSS Architecture — BEM, ITCSS & Atomic CSS',
          'Scale CSS with proven architectural methodologies.',
          'BEM: Block__Element--Modifier naming. No specificity wars. ITCSS: layers (settings, tools, generic, elements, objects, components, utilities). Atomic CSS (Tailwind approach): single-purpose classes. SMACSS: Base, Layout, Module, State, Theme. Which to choose: BEM for large teams without framework, ITCSS for scalability, Atomic for speed.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+architecture+BEM+ITCSS+scalable', label: 'CSS Architecture' }, { type: 'web', url: 'https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/', label: 'BEM Article' }],
          'Refactor a component using strict BEM naming. Organize your CSS into ITCSS layers.',
          'Organize your design system: ITCSS layer structure, BEM naming for all components, document CSS architecture decisions in a STYLE_GUIDE.md.', '2 hrs'),

        d(41, 'CSS Container Queries & Modern Layout',
          'Use container queries for truly component-responsive design.',
          '@container (min-width: 400px) {} — styles based on parent container width, not viewport. container-type: inline-size. Named containers. @container style() for style queries. CSS subgrid: grid-column: subgrid lets children align to grandparent grid. CSS anchor positioning (2024). :has() relational selector.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=CSS+container+queries+2024+tutorial', label: 'Container Queries' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries', label: 'MDN Container Queries' }],
          'Make a Card component respond to its container size (not viewport) using container queries.',
          'Rebuild 3 components using container queries: a Card that adapts from single-column to horizontal layout, a Sidebar that collapses, and a Gallery grid using subgrid.', '2 hrs'),

        d(42, 'Advanced CSS Project — Animated Design System',
          'Build an animated, accessible design system.',
          'Combine: CSS custom properties (tokens), Framer Motion (React animations), container queries (responsive components), scroll-driven animations, accessibility (prefers-reduced-motion). Dark mode with token swap. Storybook with motion stories.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=design+system+animation+CSS+React', label: 'Animated Design System' }, { type: 'web', url: 'https://storybook.js.org/', label: 'Storybook' }],
          'Add Framer Motion to your component library. Ensure all animations respect prefers-reduced-motion.',
          '🚀 PROJECT: Animated design system: token-based theming, Framer Motion for all interactions, container query responsive components, scroll-driven list reveals, prefers-reduced-motion fallbacks, and Storybook documentation.', '2 hrs'),
      ],
      project: { id: 'afw6', title: 'Animated Design System with Framer Motion', desc: 'Build a production design system: 3-tier CSS custom properties (global → semantic → component), Framer Motion page transitions and micro-interactions, scroll-driven animations with CSS, GSAP text reveal on hero, container query responsive components, CSS subgrid gallery, full dark mode support, prefers-reduced-motion fallbacks, and Storybook documentation.' }
    },

    // ── WEEK 7: Build Tools & DevOps ──
    {
      week: 7, title: 'Build Tools & DevOps — Webpack, Docker & CI/CD', timeRange: '14–16 hrs',
      days: [
        d(43, 'Webpack Deep Dive',
          'Configure Webpack for custom build requirements.',
          'webpack.config.js: entry, output, module (rules for loaders), plugins, optimization. Loaders: babel-loader (JS), css-loader + style-loader (CSS), file-loader (images). Plugins: HtmlWebpackPlugin, MiniCssExtractPlugin, BundleAnalyzerPlugin. Optimization: splitChunks, runtimeChunk, minimize with TerserPlugin. Webpack DevServer with HMR.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Webpack+5+configuration+tutorial+2024', label: 'Webpack Tutorial' }, { type: 'web', url: 'https://webpack.js.org/concepts/', label: 'Webpack Docs' }],
          'Configure Webpack from scratch: transpile React JSX, handle CSS/images, split vendor bundle, analyze bundle.',
          'Build a custom Webpack config: React + TypeScript, CSS Modules, image optimization, vendor chunk splitting, bundle analysis, and production optimizations.', '2 hrs'),

        d(44, 'Vite Plugins & Advanced Config',
          'Extend Vite with plugins for advanced use cases.',
          'vite.config.ts: plugins array, build options, server config, resolve.alias. Writing a custom Vite plugin: { name, transform, load, resolveId }. Key plugins: vite-plugin-pwa, vite-plugin-svgr, vite-imagetools, @vitejs/plugin-react (options), rollup options. Library mode for publishing components. SSR with Vite.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Vite+plugins+advanced+configuration', label: 'Vite Advanced Config' }, { type: 'web', url: 'https://vitejs.dev/guide/api-plugin.html', label: 'Vite Plugin API' }],
          'Write a custom Vite plugin that logs file sizes on build. Add vite-plugin-pwa. Configure library mode.',
          'Add 5 Vite plugins to your app: PWA, SVG import, image optimization, bundle visualizer, and write a custom markdown-to-HTML loader plugin.', '2 hrs'),

        d(45, 'Docker for Frontend Developers',
          'Containerize your frontend application.',
          'Docker basics: image, container, Dockerfile. Multi-stage build for React: stage 1 (node build), stage 2 (nginx serve). Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD. docker build, docker run, docker-compose. Nginx config for SPA (fallback to index.html). Environment variables in Docker. .dockerignore.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Docker+React+tutorial+multi+stage+build', label: 'Docker for Frontend' }, { type: 'web', url: 'https://docs.docker.com/guides/reactjs/', label: 'Docker React Guide' }],
          'Write a Dockerfile for your React app. Build the image. Run it locally. Verify it serves the SPA correctly.',
          'Containerize your Next.js app: multi-stage Dockerfile, nginx config with SPA fallback, docker-compose for local dev, and push to Docker Hub.', '2 hrs'),

        d(46, 'CI/CD with GitHub Actions',
          'Automate testing, building, and deployment.',
          'GitHub Actions: .github/workflows/ci.yml. Triggers: push, pull_request, schedule. Jobs: steps with runs-on, uses (actions), run. Secrets: store API keys. Matrix strategy for multiple Node versions. Artifacts for build outputs. Cache for node_modules. Environment protection rules for production deploys.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GitHub+Actions+CI+CD+React+tutorial', label: 'GitHub Actions' }, { type: 'web', url: 'https://docs.github.com/en/actions', label: 'GitHub Actions Docs' }],
          'Set up a CI workflow: install → lint → test → build → deploy. Add a matrix for Node 18 + 20.',
          'Full CI/CD pipeline: lint (ESLint), type check (tsc), test (Jest with coverage), Lighthouse CI, build, and deploy to Vercel (main) and preview (PRs).', '2 hrs'),

        d(47, 'Monorepos with Turborepo / Nx',
          'Manage multiple packages and apps in one repository.',
          'Monorepo benefits: shared code, unified tooling, atomic commits. Turborepo: turbo.json pipeline (build depends on ^build), caching, parallel tasks. Nx: nx.json, project.json, generators, executors, affected commands. Workspace packages: apps/, packages/ (ui, utils, config). Changesets for versioning.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Turborepo+monorepo+tutorial+2024', label: 'Turborepo Tutorial' }, { type: 'web', url: 'https://turbo.build/repo/docs', label: 'Turborepo Docs' }],
          'Create a Turborepo with 2 apps (web, docs) and 1 shared package (ui). Build with turbo build.',
          'Set up a Turborepo: web app, storybook docs app, shared UI package, shared utils package, shared TypeScript config, and CI that only rebuilds affected packages.', '2 hrs'),

        d(48, 'Monitoring, Error Tracking & Analytics',
          'Add observability to production apps.',
          'Sentry: error tracking, performance monitoring. npm install @sentry/nextjs. Capture exceptions, user context, breadcrumbs. Source maps for readable stack traces. Vercel Analytics for Core Web Vitals. Posthog for product analytics. Custom events. Logging: console too much, structured logging with Pino. Feature flags with LaunchDarkly.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Sentry+error+tracking+Next.js+tutorial', label: 'Sentry Tutorial' }, { type: 'web', url: 'https://docs.sentry.io/platforms/javascript/guides/nextjs/', label: 'Sentry Next.js Docs' }],
          'Add Sentry to your Next.js app. Capture a test error. View it in the Sentry dashboard.',
          '🚀 PROJECT: Full observability: Sentry errors + performance, Vercel Analytics, custom product events, source maps, error boundary reporting, and a monitoring dashboard.', '2 hrs'),
      ],
      project: { id: 'afw7', title: 'Fully Automated CI/CD Pipeline', desc: 'Set up complete DevOps for your Next.js app: custom Webpack config for a micro-frontend, multi-stage Docker build, full GitHub Actions CI/CD (lint + type check + test + Lighthouse CI + deploy), Turborepo monorepo structure, Sentry error tracking, and automated dependency updates with Dependabot.' }
    },

    // ── WEEK 8: GraphQL & Advanced APIs ──
    {
      week: 8, title: 'GraphQL & Advanced APIs', timeRange: '14–16 hrs',
      days: [
        d(49, 'GraphQL Fundamentals',
          'Understand GraphQL queries, mutations, and schemas.',
          'GraphQL: query language for APIs — ask for exactly what you need. Schema: type definitions. Query: read data. Mutation: write data. Subscription: real-time. Resolver functions. vs REST: one endpoint, no over/under-fetching. Playground (GraphiQL). Introspection. Scalar types + custom scalars. Input types.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GraphQL+tutorial+beginners+2024', label: 'GraphQL Basics' }, { type: 'web', url: 'https://graphql.org/learn/', label: 'GraphQL Docs' }],
          'Write 5 queries on a public GraphQL API (GitHub API, SpaceX). Write 2 mutations.',
          'Query the GitHub GraphQL API: fetch your repos with stars/forks, filter by language, query user profile, and paginate with cursors.', '2 hrs'),

        d(50, 'Apollo Client with React',
          'Integrate GraphQL into React with Apollo Client.',
          'npm install @apollo/client graphql. ApolloClient, InMemoryCache, ApolloProvider. useQuery(QUERY) — data, loading, error. useMutation(MUTATION) — mutate function, optimistic response. useSubscription for real-time. Cache normalization: automatic deduplication by ID. fetchPolicy options. Apollo DevTools.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Apollo+Client+React+GraphQL+tutorial', label: 'Apollo Client' }, { type: 'web', url: 'https://www.apollographql.com/docs/react/', label: 'Apollo React Docs' }],
          'Set up Apollo Client. Fetch a list with useQuery. Create a record with useMutation. Show loading/error.',
          'Build a "GitHub Explorer" with Apollo Client: query repos, stars, issues. Mutations for starring a repo. Real-time subscription for new issue. Cache update on mutation.', '2 hrs'),

        d(51, 'GraphQL — Fragments, Variables & Caching',
          'Write maintainable GraphQL with fragments and cache strategies.',
          'Variables: pass dynamic values safely (no string interpolation). Fragments: reusable field sets. Inline fragments for interfaces/unions. Directives: @skip(if:), @include(if:). Cache: readQuery/writeQuery for local cache updates. Local-only fields with @client directive. Reactive variables for local state.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=GraphQL+fragments+variables+Apollo+cache', label: 'GraphQL Fragments' }, { type: 'web', url: 'https://www.apollographql.com/docs/react/data/fragments/', label: 'Apollo Fragments' }],
          'Extract 3 shared fragments. Use variables in all queries. Manually update cache after a mutation.',
          'Refactor your GitHub Explorer: extract UserFragment, RepoFragment, IssueFragment. Update Apollo cache optimistically after starring.', '2 hrs'),

        d(52, 'REST vs GraphQL — API Design Decisions',
          'Choose the right API paradigm for your use case.',
          'REST strengths: caching (HTTP), simplicity, tooling, file uploads. REST weaknesses: over/under-fetching, N+1 problem, versioning. GraphQL strengths: flexible queries, single endpoint, schema documentation, strong typing. GraphQL weaknesses: caching complexity, file upload, learning curve. tRPC: type-safe RPC for full-stack TypeScript.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=REST+vs+GraphQL+comparison+2024', label: 'REST vs GraphQL' }, { type: 'web', url: 'https://www.apollographql.com/blog/graphql/basics/graphql-vs-rest/', label: 'GraphQL vs REST' }],
          'Build the same "User + Posts" endpoint in both REST and GraphQL. Compare query flexibility and bundle impact.',
          'Case study: evaluate whether to migrate your app from REST to GraphQL or tRPC. Write a technical decision document with pros/cons.', '2 hrs'),

        d(53, 'WebSocket & Server-Sent Events',
          'Add real-time features to your production app.',
          'WebSocket: full-duplex, persistent, good for: chat, live updates, collaborative editing. SSE (Server-Sent Events): one-way server push, HTTP-based, auto-reconnect, good for: notifications, live dashboards. Socket.io: WebSocket library with fallbacks. GraphQL Subscriptions over WebSocket. Reconnection and heartbeat patterns.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=WebSocket+Server+Sent+Events+real+time+Next.js', label: 'WebSocket & SSE' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events', label: 'MDN SSE' }],
          'Build a live notification feed with SSE. Build a real-time chat with WebSocket. Compare both.',
          'Add real-time to your dashboard: SSE for live data updates, WebSocket for collaborative comments, and GraphQL subscription for new posts.', '2 hrs'),

        d(54, 'API Security & Rate Limiting',
          'Secure and protect your APIs from abuse.',
          'Rate limiting: limit requests per IP per time window. Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. Retry-After header. Client-side: exponential backoff. API key management: rotate, scope, log usage. OAuth 2.0 scopes. CORS configuration. Input validation on API (Zod). Response size limits.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=API+security+rate+limiting+Next.js', label: 'API Security' }, { type: 'web', url: 'https://owasp.org/www-project-api-security/', label: 'OWASP API Security' }],
          'Add rate limiting to 3 API routes. Implement exponential backoff in your API client. Check OWASP API Top 10.',
          '🚀 PROJECT: Secure all API routes: Zod validation, rate limiting with Upstash Redis, CORS headers, auth middleware, response filtering, and handle all OWASP API Top 10 risks.', '2 hrs'),
      ],
      project: { id: 'afw8', title: 'GraphQL Dashboard with Real-Time Updates', desc: 'Build a GraphQL-powered dashboard: Apollo Client with normalized cache, fragments for all shared types, optimistic mutations, GraphQL Subscriptions for real-time, SSE for live notifications, rate limiting with Upstash Redis, and full TypeScript types generated from the schema with graphql-codegen.' }
    },

    // ── WEEK 9: Micro-Frontends & Architecture ──
    {
      week: 9, title: 'Micro-Frontends, Module Federation & Design Systems', timeRange: '14–16 hrs',
      days: [
        d(55, 'Micro-Frontend Architecture',
          'Understand and implement micro-frontend patterns.',
          'Micro-frontends: split large frontend into independently deployable pieces. Patterns: iframes (isolated but limited), Web Components (native encapsulation), Module Federation (Webpack), single-spa framework. Benefits: independent deploys, team autonomy. Challenges: shared state, routing, styling isolation, performance.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=micro+frontend+architecture+tutorial+2024', label: 'Micro-Frontends' }, { type: 'web', url: 'https://micro-frontends.org/', label: 'Micro-Frontends.org' }],
          'Draw a micro-frontend architecture for a large e-commerce app: shell, catalog, cart, checkout, account.',
          'Design a micro-frontend architecture document: team ownership boundaries, shared component library, communication strategy, and routing approach.', '2 hrs'),

        d(56, 'Module Federation with Webpack 5',
          'Share code between separately deployed apps.',
          'Webpack 5 Module Federation: exposes/remotes config. Host app consumes remote components dynamically. Shared dependencies (React, lodash) de-duplicated. Versioning and fallbacks. Dynamic remotes (runtime URL). Type sharing with @module-federation/typescript. Vite plugin-federation alternative.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Webpack+5+Module+Federation+tutorial', label: 'Module Federation' }, { type: 'web', url: 'https://webpack.js.org/concepts/module-federation/', label: 'Webpack Module Federation' }],
          'Set up 2 apps with Module Federation: host consumes a Button component from remote. Both run simultaneously.',
          'Build a Module Federation demo: shell app + 2 remotes (products, cart). Shell renders both. Shared React and design system. Deploy to 2 Vercel projects.', '2 hrs'),

        d(57, 'Design Systems — Tokens, Docs & Versioning',
          'Build and maintain a scalable design system.',
          'Design system layers: foundations (tokens), components, patterns, templates. Token pipeline: Figma Tokens → Style Dictionary → CSS variables + TS constants. Component API design: composition, polymorphism, variants. Documentation: Storybook autodocs. Versioning: semver, changelogs with changesets. Publishing to npm.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=design+system+token+pipeline+2024', label: 'Design System' }, { type: 'web', url: 'https://storybook.js.org/docs/get-started/setup', label: 'Storybook Setup' }],
          'Set up Style Dictionary. Generate CSS variables and TypeScript constants from JSON tokens.',
          'Build a design system: Style Dictionary token pipeline (colors/spacing/typography), 10 components in Storybook, changesets for versioning, published to npm.', '2 hrs'),

        d(58, 'Storybook — Component Documentation',
          'Document your component library with Storybook.',
          'Storybook 7: Component Story Format 3 (CSF3). Stories: export default (meta), named exports (stories). Controls: argTypes for interactive props. Actions for event logging. Decorators for wrapping. Docs addon: autodocs. Accessibility addon: a11y. Visual regression with Chromatic. Storybook Test.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Storybook+tutorial+React+2024', label: 'Storybook Tutorial' }, { type: 'web', url: 'https://storybook.js.org/docs/writing-stories', label: 'Storybook Stories' }],
          'Write stories for 5 components with all variants. Add Controls for interactive props. Enable a11y checks.',
          'Full Storybook documentation: every component has Default, AllVariants, Loading, Error, and Accessibility stories. Deploy to Chromatic for visual regression.', '2 hrs'),

        d(59, 'Component-Driven Development',
          'Build UIs from the bottom up using components.',
          'Component-Driven UI: build smallest component first, compose up. Atomic Design: atoms (Button), molecules (SearchInput = Input + Icon), organisms (SearchBar = SearchInput + Results), templates (PageLayout), pages. Benefits: isolated development, thorough testing, reusability. Tools: Storybook, Bit, Ladle.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=component+driven+development+atomic+design+React', label: 'Component-Driven Dev' }, { type: 'web', url: 'https://www.componentdriven.org/', label: 'CDD Guide' }],
          'Apply Atomic Design to your design system: categorize all components into atoms/molecules/organisms.',
          'Restructure your component library with Atomic Design: atoms (10), molecules (8), organisms (6), templates (3). Document hierarchy in Storybook.', '2 hrs'),

        d(60, 'Nx — Advanced Monorepo Management',
          'Manage large-scale monorepos with Nx.',
          'Nx workspace: apps/ and libs/ directories. Generators: nx generate component. Executors: build, serve, test, lint per project. Affected: nx affected:test only runs tests for changed code. Distributed task execution. Computation caching. Nx Cloud for remote caching. Enforce module boundaries with eslint-plugin-nx.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Nx+monorepo+tutorial+2024', label: 'Nx Tutorial' }, { type: 'web', url: 'https://nx.dev/getting-started/intro', label: 'Nx Docs' }],
          'Create an Nx workspace. Add 2 apps and 2 libs. Run affected:build. Enable Nx Cloud caching.',
          'Migrate your Turborepo to Nx: enforce module boundaries, add Nx Cloud, set up distributed CI with affected, and generate a dependency graph.', '2 hrs'),

        d(61, 'Architecture Project — Micro-Frontend E-Commerce',
          'Apply micro-frontend architecture to a real project.',
          'Build a micro-frontend e-commerce: shell/orchestrator, product catalog remote, cart remote, and shared UI library. Shared React version. Independent CI/CD. Cross-app communication via CustomEvent or state in shell. Type sharing. End-to-end testing with Playwright across all apps.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=micro+frontend+ecommerce+module+federation', label: 'MFE E-Commerce' }, { type: 'web', url: 'https://www.martinfowler.com/articles/micro-frontends.html', label: 'Martin Fowler MFE' }],
          'Deploy all 3 apps independently. Verify the shell loads both remotes. Test cross-app navigation.',
          '🚀 PROJECT: Full micro-frontend e-commerce: shell + 2 remotes via Module Federation, shared UI library, independent CI/CD, cross-app state, and Playwright E2E tests.', '2 hrs'),
      ],
      project: { id: 'afw9', title: 'Micro-Frontend Architecture + Design System', desc: 'Build a micro-frontend e-commerce: Webpack 5 Module Federation connecting shell, product catalog, and cart apps. Shared UI library with Storybook docs and Chromatic visual regression. Style Dictionary token pipeline. Nx monorepo with enforced boundaries. Independent CI/CD pipelines. Playwright E2E across all apps.' }
    },

    // ── WEEK 10: PWA & Mobile Web ──
    {
      week: 10, title: 'PWA, Service Workers & Mobile Web', timeRange: '14–16 hrs',
      days: [
        d(62, 'Progressive Web App Fundamentals',
          'Turn your web app into a PWA.',
          'PWA criteria: HTTPS, Web App Manifest, Service Worker. Web App Manifest: name, short_name, icons (192/512px), start_url, display: standalone, theme_color, background_color. Install prompt: beforeinstallprompt event. Install button. Scope. Related applications. Manifest in Next.js via metadata API.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Progressive+Web+App+PWA+tutorial+2024', label: 'PWA Tutorial' }, { type: 'web', url: 'https://web.dev/learn/pwa/', label: 'web.dev PWA' }],
          'Add a manifest.json to your app. Make it installable on mobile. Test with Lighthouse PWA audit.',
          'Convert your app to a PWA: manifest with all required icons, themed status bar, install prompt UI, and pass Lighthouse PWA checklist.', '2 hrs'),

        d(63, 'Service Workers — Registration & Lifecycle',
          'Understand and implement Service Workers.',
          'Service Worker lifecycle: install → activate → fetch. register() in app. Skip waiting, claim clients. Cache during install. Network interception in fetch event. Background sync. Push notifications: PushManager.subscribe(), Notification constructor. SW scope limits. HTTPS required. sw.js separate from app bundle.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Service+Worker+lifecycle+registration+tutorial', label: 'Service Worker' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API', label: 'MDN Service Worker' }],
          'Write a Service Worker that caches shell and handles offline. Test by going offline in DevTools.',
          'Implement a full Service Worker: precache app shell, cache-first for static assets, network-first for API, offline fallback page.', '2 hrs'),

        d(64, 'Workbox — Production-Ready Service Workers',
          'Use Workbox for robust Service Worker management.',
          'Workbox: Google\'s SW library. Precaching with workbox-precaching. Routing with workbox-routing. Strategies: CacheFirst, NetworkFirst, StaleWhileRevalidate. Background sync: queue failed requests. Expiration: max entries, max age. Broadcast update: notify app of cache updates. Integration: vite-plugin-pwa.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Workbox+Service+Worker+tutorial+2024', label: 'Workbox Tutorial' }, { type: 'web', url: 'https://developer.chrome.com/docs/workbox/', label: 'Workbox Docs' }],
          'Replace your manual SW with Workbox. Use StaleWhileRevalidate for API. Add background sync for form submissions.',
          'Production Service Worker with Workbox: precache shell, CacheFirst for images, StaleWhileRevalidate for API, background sync for mutations, expiration for old caches.', '2 hrs'),

        d(65, 'Push Notifications & Background Sync',
          'Add push notifications to your PWA.',
          'Push: server sends to SW via Push API → SW shows Notification. Permission: Notification.requestPermission(). Subscribe: PushManager.subscribe({ userVisibleOnly, applicationServerKey }). Send from server with web-push library. VAPID keys. Background sync: sync event fired when online. register("sync-name").',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Push+Notifications+PWA+tutorial', label: 'Push Notifications' }, { type: 'web', url: 'https://web.dev/articles/push-notifications-overview', label: 'web.dev Push' }],
          'Request notification permission. Subscribe to push. Send a test push from a server script.',
          'Build a push notification system: subscribe, store endpoint, send from Next.js API route, handle in SW, click opens app to relevant content.', '2 hrs'),

        d(66, 'Mobile Web — Touch, Gestures & Viewport',
          'Optimize for mobile browsers and touch interactions.',
          'Viewport meta: width=device-width, initial-scale=1. Touch events: touchstart, touchmove, touchend. Pointer events (unified mouse + touch). Gesture detection: swipe, pinch, long press. Passive event listeners for scroll performance. -webkit-tap-highlight-color. 300ms click delay (fixed by touch-action). iOS Safari quirks: safe area insets, 100vh, position:fixed.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=mobile+web+touch+events+iOS+Safari+tutorial', label: 'Mobile Web' }, { type: 'web', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Touch_events', label: 'MDN Touch Events' }],
          'Add swipe-to-delete gesture to your task list. Handle iOS safe area with env(safe-area-inset-*). Test on real iPhone.',
          'Add mobile-native UX: swipe gestures with Framer Motion, iOS safe area support, haptic feedback (Vibration API), pull-to-refresh, and bottom sheet drawer.', '2 hrs'),

        d(67, 'React Native — Mobile App Intro',
          'Get a taste of building native mobile apps with React Native.',
          'React Native: same React concepts, but native components instead of HTML. <View>, <Text>, <Image>, <ScrollView>, <FlatList>, <TextInput>. StyleSheet.create() for styles. No CSS — subset of Flexbox. Expo for easy setup. Navigation with React Navigation. Platform-specific code: Platform.OS.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+Native+tutorial+beginners+Expo+2024', label: 'React Native Intro' }, { type: 'web', url: 'https://reactnative.dev/docs/getting-started', label: 'React Native Docs' }],
          'Set up Expo. Build a simple screen with View, Text, Image, and a button. Run on your phone.',
          'Build a "React Native Task Manager": screens for list, detail, add. FlatList, TextInput, TouchableOpacity. Local state (AsyncStorage). Navigation.', '2 hrs'),

        d(68, 'PWA Project — Full-Featured Offline App',
          'Build a complete PWA with offline support.',
          'Combine: Web App Manifest, Workbox (precache + strategies), background sync, push notifications, offline fallback, install prompt, and mobile-optimized UI. Measure PWA score in Lighthouse.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=PWA+full+tutorial+offline+push+2024', label: 'PWA Complete' }, { type: 'web', url: 'https://web.dev/articles/offline-cookbook', label: 'Offline Cookbook' }],
          'Achieve 100/100 on Lighthouse PWA audit. Test offline on a real device.',
          '🚀 PROJECT: Deploy a 100% Lighthouse PWA: installable, offline-capable, push notifications, background sync, mobile-native UX, and passing all PWA criteria.', '2 hrs'),
      ],
      project: { id: 'afw10', title: 'Full-Featured PWA', desc: 'Convert your app to a production PWA: Web App Manifest with all icons, Workbox Service Worker (precache + CacheFirst + StaleWhileRevalidate + background sync), push notifications with VAPID, install prompt UI, full offline mode with fallback page, mobile touch gestures, iOS safe area support, and 100/100 Lighthouse PWA score.' }
    },

    // ── WEEK 11: Advanced Testing ──
    {
      week: 11, title: 'Advanced Testing — Cypress, Playwright & Visual Regression', timeRange: '14–16 hrs',
      days: [
        d(69, 'Cypress — E2E Testing',
          'Write end-to-end tests that run in a real browser.',
          'npm install -D cypress. cypress/e2e/*.cy.js files. cy.visit(), cy.get(), cy.contains(), cy.type(), cy.click(), cy.should(). Cypress chains are synchronous-looking but async. Custom commands in cypress/support/commands.js. Intercept: cy.intercept() for network mocking. Fixtures for test data. Screenshots and videos.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Cypress+E2E+testing+tutorial+2024', label: 'Cypress Tutorial' }, { type: 'web', url: 'https://docs.cypress.io/', label: 'Cypress Docs' }],
          'Write 5 Cypress tests: visit home, login flow, create a task, filter tasks, delete task.',
          'Full Cypress E2E suite: auth flow, CRUD operations, search/filter, error states — with fixtures and custom commands.', '2 hrs'),

        d(70, 'Playwright — Cross-Browser Testing',
          'Test across Chrome, Firefox, and WebKit with Playwright.',
          'npm install -D @playwright/test. Playwright uses async/await natively. page.goto(), page.fill(), page.click(), expect(page.locator()).toBeVisible(). Multiple browser contexts. Video recording. Trace viewer. Component testing. API testing with request context. Playwright Test: parallel tests, retry, workers.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Playwright+testing+tutorial+2024', label: 'Playwright Tutorial' }, { type: 'web', url: 'https://playwright.dev/docs/intro', label: 'Playwright Docs' }],
          'Run your Cypress tests as Playwright tests on Chrome, Firefox, and Safari.',
          'Full Playwright cross-browser suite: 10 test scenarios running on 3 browsers in parallel with video recording on failure.', '2 hrs'),

        d(71, 'Visual Regression Testing',
          'Catch unintended visual changes with screenshot comparison.',
          'Visual regression: compare screenshots pixel by pixel. Tools: Chromatic (Storybook), Percy, Playwright screenshots + pixelmatch. Chromatic: publish Storybook, compare component screenshots, review changes in UI. Baseline management: approve intentional changes. CI integration: fail on unapproved diff.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=visual+regression+testing+Chromatic+Playwright', label: 'Visual Regression' }, { type: 'web', url: 'https://www.chromatic.com/docs/', label: 'Chromatic Docs' }],
          'Set up Chromatic for your Storybook. Add Playwright screenshot tests for 5 pages. Review diffs.',
          'Set up full visual regression: Chromatic for component library, Playwright screenshot per route, automatic PR review, and baseline update workflow.', '2 hrs'),

        d(72, 'Performance Testing',
          'Measure and automate performance testing.',
          'Lighthouse CI: performance budgets on every PR. k6 for load testing API routes: virtual users, ramp-up, throughput. WebPageTest for detailed filmstrip analysis. Performance API in browser: PerformanceObserver, navigation timing, resource timing. User Timing: performance.mark/measure for custom metrics.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=web+performance+testing+Lighthouse+CI+k6', label: 'Performance Testing' }, { type: 'web', url: 'https://k6.io/docs/', label: 'k6 Docs' }],
          'Run k6 load test on your API. Add performance.mark() to your key user flows. Measure with PerformanceObserver.',
          'Performance testing suite: Lighthouse CI budgets, k6 API load test (100 VU for 60s), custom User Timing marks for key interactions, and WebPageTest filmstrip analysis.', '2 hrs'),

        d(73, 'Accessibility Testing — Automated & Manual',
          'Systematically test for accessibility issues.',
          'Automated tools: axe-core (jest-axe, @axe-core/playwright), Lighthouse a11y, IBM Equal Access Checker. Manual testing: keyboard-only navigation, screen reader (VoiceOver, NVDA, JAWS), zoom to 200%+, check motion sensitivity. Accessibility statement. VPAT documentation. Color blindness simulators.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=accessibility+testing+automated+manual+axe', label: 'A11y Testing' }, { type: 'web', url: 'https://www.deque.com/axe/', label: 'axe-core' }],
          'Run @axe-core/playwright on all your routes. Fix all violations. Test with VoiceOver.',
          'Full a11y test suite: axe-core in Playwright for all routes (0 violations), VoiceOver manual test checklist, color blindness check with Sim Daltonism, motion sensitivity test.', '2 hrs'),

        d(74, 'Contract Testing with MSW',
          'Test API contracts between frontend and backend.',
          'Contract testing: verify frontend and backend agree on API shape. MSW (Mock Service Worker): intercept at network level, works in tests and dev. Define handlers: http.get/post/put/delete. Context: passthrough for some routes. Server-side MSW for Next.js. Request validation in handlers. Consumer-driven contracts with Pact.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=MSW+Mock+Service+Worker+contract+testing', label: 'MSW Contract Testing' }, { type: 'web', url: 'https://mswjs.io/docs/', label: 'MSW Docs' }],
          'Set up MSW handlers that match your actual API contract. Add Zod validation inside handlers.',
          'Full contract testing: MSW handlers for all API endpoints with Zod schema validation, consumer-driven tests with Pact, and CI-enforced contract verification.', '2 hrs'),

        d(75, 'Test Architecture & Quality Metrics',
          'Design a sustainable test architecture.',
          'Testing pyramid: many unit → some integration → few E2E. Testing diamond (for React): unit + component + E2E. Coverage: not a goal in itself, track trends. Flaky tests: identify and fix with retry logic, fixed data. Test organization: co-locate with components. TDD vs BDD. Mutation testing with Stryker.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=test+architecture+testing+pyramid+React+2024', label: 'Test Architecture' }, { type: 'web', url: 'https://kentcdodds.com/blog/the-testing-trophy', label: 'Testing Trophy' }],
          'Review your test suite. Identify flaky tests. Add mutation testing with Stryker.',
          '🚀 PROJECT: Complete test audit: fix all flaky tests, achieve testing trophy distribution, add Stryker mutation testing, document testing strategy in TESTING.md.', '2 hrs'),
      ],
      project: { id: 'afw11', title: 'Full QA Test Suite', desc: 'Complete quality assurance: Cypress E2E for critical flows, Playwright cross-browser for all routes with visual regression screenshots, Chromatic for component library, k6 load testing, axe-core accessibility (0 violations), MSW contract tests, Lighthouse CI budgets, and Stryker mutation testing. All in CI/CD.' }
    },

    // ── WEEK 12: Advanced Capstone ──
    {
      week: 12, title: 'Advanced Capstone — Production Next.js App', timeRange: '14–16 hrs',
      days: [
        d(76, 'Capstone Architecture & Planning',
          'Design a production-grade Next.js application architecture.',
          'Project: E-commerce / SaaS Dashboard. Stack: Next.js 14, TypeScript, Tailwind, Prisma/Drizzle (DB ORM), GraphQL (Apollo), Stripe, Auth.js, Redis (caching + rate limiting), Sentry, Vercel. Architecture: App Router with Server Components, Server Actions, Micro-frontend for checkout.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+SaaS+dashboard+architecture+2024', label: 'SaaS Architecture' }, { type: 'web', url: 'https://nextjs.org/docs/app', label: 'Next.js App Router' }],
          'Create complete architecture doc: system diagram, component tree, data flow, DB schema, API design.',
          'Plan your capstone: architecture diagram, ERD, API spec, tech stack justification, CI/CD plan, and week-by-week implementation schedule.', '2 hrs'),

        d(77, 'Capstone: Database & API Layer',
          'Set up database, ORM, and API routes.',
          'Prisma with PostgreSQL (or SQLite for dev). Schema: User, Organization, Product, Order, Subscription. Migrations. Seed data. API routes for CRUD. GraphQL schema + resolvers. Server Actions for mutations. Type-safe DB queries with Prisma client. Connection pooling.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Prisma+Next.js+database+tutorial+2024', label: 'Prisma + Next.js' }, { type: 'web', url: 'https://www.prisma.io/docs', label: 'Prisma Docs' }],
          'Set up Prisma schema. Run migrations. Seed data. Build 5 API routes. Test with Postman.',
          'Build the data layer: Prisma schema, migrations, API routes for all resources, Server Actions for mutations, and type-safe queries.', '3 hrs'),

        d(78, 'Capstone: Auth, Billing & Subscriptions',
          'Implement enterprise auth and Stripe billing.',
          'Auth.js with multiple providers (Google, GitHub, email). Middleware route protection. Organization/team support. Role-based access control. Stripe: products, prices, checkout session, webhooks, customer portal, subscription management. Webhook validation. Usage-based billing.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Stripe+Next.js+subscription+billing+2024', label: 'Stripe + Next.js' }, { type: 'web', url: 'https://stripe.com/docs', label: 'Stripe Docs' }],
          'Set up Stripe checkout. Handle subscription webhook. Gate features behind subscription status.',
          'Complete auth + billing: multi-provider auth, RBAC, Stripe plans (free/pro/enterprise), checkout flow, webhook processing, customer portal.', '3 hrs'),

        d(79, 'Capstone: Dashboard UI & Data Visualization',
          'Build a complex analytics dashboard.',
          'Dashboard with: metrics cards (KPIs), line chart (revenue over time), bar chart (users by country), donut chart (plan distribution), data table with sort/filter/pagination. Charts: Recharts or Chart.js in React. Server Component fetches data, Client Component renders chart. Loading skeletons for every section. Real-time with SSE.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=React+dashboard+charts+Recharts+2024', label: 'React Dashboard' }, { type: 'web', url: 'https://recharts.org/', label: 'Recharts' }],
          'Build KPI cards with Framer Motion count-up. Add a Recharts line chart with live data.',
          'Build full dashboard: KPI cards, 3 Recharts charts, data table, date range picker, export to CSV, and SSE for live updates.', '3 hrs'),

        d(80, 'Capstone: Performance, A11y & SEO',
          'Optimize the capstone for production quality.',
          'Achieve 95+ on all Lighthouse categories. Core Web Vitals within targets. WCAG 2.1 AA. Structured data (JSON-LD for product/organization). OpenGraph for all pages. Sitemap and robots.txt. Internationalization (next-intl). Edge caching with stale-while-revalidate. Preload critical resources.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+SEO+performance+accessibility+production', label: 'Next.js Production' }, { type: 'web', url: 'https://nextjs.org/docs/app/building-your-application/optimizing', label: 'Next.js Optimizing' }],
          'Run Lighthouse. Fix all issues. Achieve 95+ performance, 95+ accessibility, 100 SEO.',
          'Optimize to production: Lighthouse 95+, 0 a11y violations, all SEO tags, Core Web Vitals passing, internationalization (en/es), and edge caching.', '2 hrs'),

        d(81, 'Capstone: CI/CD, Monitoring & Launch',
          'Deploy and monitor your production application.',
          'GitHub Actions: lint + type check + tests + Lighthouse CI + build + deploy. Branch strategy: main (prod), develop (staging), feature branches. Sentry for errors + performance. Upstash Redis for rate limiting and caching. Vercel Analytics. Datadog or PostHog for product analytics. Incident runbook.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=Next.js+production+deployment+monitoring+2024', label: 'Production Deploy' }, { type: 'web', url: 'https://vercel.com/docs', label: 'Vercel Docs' }],
          'Deploy to production. Verify all monitoring is active. Run a synthetic load test.',
          '🚀 CAPSTONE LAUNCH: Full CI/CD pipeline, Sentry monitoring, Upstash rate limiting, Vercel Analytics, load test with k6, and a launch checklist sign-off.', '3 hrs'),

        d(82, 'Advanced Level Wrap-Up — Career & Open Source',
          'Celebrate your achievement and plan your career trajectory.',
          'You\'ve mastered: TypeScript, Next.js App Router, advanced React patterns, performance, accessibility, security, micro-frontends, GraphQL, PWA, comprehensive testing, CI/CD, and production deployment. Career paths: Senior FE Engineer, FE Architect, Full-Stack, DevRel. Contributing to open source: find good-first-issues, write docs, submit PRs.',
          [{ type: 'yt', url: 'https://youtube.com/results?search_query=senior+frontend+engineer+career+2024', label: 'Senior FE Career' }, { type: 'web', url: 'https://roadmap.sh/frontend', label: 'Frontend Roadmap' }],
          'Update your portfolio. Write a blog post about your journey. Find an open source issue to fix.',
          '🎉 CONGRATULATIONS: You\'re an Advanced Frontend Developer. Share your capstone, contribute to open source, and continue learning!', '1 hr'),
      ],
      project: { id: 'afw12', title: '🎓 Production Next.js SaaS — Advanced Capstone', desc: 'Your Advanced Capstone: a production-grade Next.js 14 SaaS dashboard with TypeScript (strict), App Router with Server Components, Prisma + PostgreSQL, Auth.js (multi-provider + RBAC), Stripe subscriptions, GraphQL API, Recharts dashboard, PWA features, 95+ Lighthouse on all metrics, WCAG 2.1 AA, full CI/CD with GitHub Actions, Sentry monitoring, and deployed on Vercel. Live demo required.' }
    },

  ]
};

return { beginner, intermediate, advanced };

})(); // END STRUCTURED_FE_ROADMAP
// ═══════════════════════════════════════════════════════
//  LOGIC
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     CONSTANTS / STATE
  ───────────────────────────────────────── */
  const LS_KEY      = 'fe_normal_progress';
  const LS_REV      = 'fe_normal_revision';
  const LS_NOTES    = 'fe_normal_notes';
  const LS_PROJ     = 'fe_normal_projects';
  const LS_STREAK   = 'fe_normal_streak';
  const LS_POMO_DUR = 'fe_pomo_dur';

  const state = {
    level   : null,   // 'beginner' | 'intermediate' | 'advanced'
    week    : null,   // week index (0-based)
    tab     : 'roadmap',
    progress: {},     // { 'beginner_d1': true, ... }
    revision: {},     // { 'beginner_d1': true, ... }
    notes   : {},     // { 'beginner_d1': 'text...' }
    projects: {},     // { 'bfw1': 'not-started' | 'in-progress' | 'completed' }
    streak  : { count: 0, lastDate: null },
  };

  /* ─────────────────────────────────────────
     STORAGE HELPERS
  ───────────────────────────────────────── */
  function loadState() {
    try { state.progress = JSON.parse(localStorage.getItem(LS_KEY)   || '{}'); } catch(e){}
    try { state.revision = JSON.parse(localStorage.getItem(LS_REV)   || '{}'); } catch(e){}
    try { state.notes    = JSON.parse(localStorage.getItem(LS_NOTES) || '{}'); } catch(e){}
    try { state.projects = JSON.parse(localStorage.getItem(LS_PROJ)  || '{}'); } catch(e){}
    try { state.streak   = JSON.parse(localStorage.getItem(LS_STREAK)|| '{"count":0,"lastDate":null}'); } catch(e){}
  }
  function saveProgress()  { try { localStorage.setItem(LS_KEY,  JSON.stringify(state.progress)); } catch(e){} }
  function saveRevision()  { try { localStorage.setItem(LS_REV,  JSON.stringify(state.revision)); } catch(e){} }
  function saveNotes()     { try { localStorage.setItem(LS_NOTES, JSON.stringify(state.notes));    } catch(e){} }
  function saveProjects()  { try { localStorage.setItem(LS_PROJ,  JSON.stringify(state.projects)); } catch(e){} }
  function saveStreak()    { try { localStorage.setItem(LS_STREAK,JSON.stringify(state.streak));   } catch(e){} }

  function progressKey(level, day) { return level + '_d' + day; }

  /* ─────────────────────────────────────────
     STREAK
  ───────────────────────────────────────── */
  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function touchStreak() {
    const today = todayStr();
    if (state.streak.lastDate === today) return;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
    const yStr = yesterday.getFullYear() + '-' + String(yesterday.getMonth()+1).padStart(2,'0') + '-' + String(yesterday.getDate()).padStart(2,'0');
    if (state.streak.lastDate === yStr) {
      state.streak.count++;
    } else if (state.streak.lastDate !== today) {
      state.streak.count = 1;
    }
    state.streak.lastDate = today;
    saveStreak();
    renderStreak();
  }
  function renderStreak() {
    // streak display removed — shown only on home page
  }

  /* ─────────────────────────────────────────
     LEVEL DATA HELPER
  ───────────────────────────────────────── */
  function getLevelData(level) {
    return STRUCTURED_FE_ROADMAP[level];
  }
  function allDaysForLevel(level) {
    const ld = getLevelData(level);
    if (!ld) return [];
    let all = [];
    ld.weeks.forEach(w => { all = all.concat(w.days || []); });
    return all;
  }
  function levelProgress(level) {
    const days = allDaysForLevel(level);
    if (!days.length) return 0;
    const done = days.filter(d => state.progress[progressKey(level, d.day)]).length;
    return Math.round((done / days.length) * 100);
  }
  function weekProgress(level, weekIdx) {
    const ld = getLevelData(level);
    if (!ld) return { done: 0, total: 0, pct: 0 };
    const week = ld.weeks[weekIdx];
    if (!week) return { done: 0, total: 0, pct: 0 };
    const total = week.days.length;
    const done  = week.days.filter(d => state.progress[progressKey(level, d.day)]).length;
    return { done, total, pct: total ? Math.round((done/total)*100) : 0 };
  }

  /* ─────────────────────────────────────────
     PANEL SWITCHING
  ───────────────────────────────────────── */
  function showPanel(id) {
    document.querySelectorAll('.fe-panel').forEach(p => {
      p.classList.remove('active');
      p.style.display = '';
    });
    const el = document.getElementById(id);
    if (el) {
      el.style.display = '';
      el.classList.add('active');
    }
  }
  function setTab(name) {
    state.tab = name;
    document.querySelectorAll('.fe-nav-item').forEach(n => n.classList.remove('active'));
    const nav = document.getElementById('fe-nav-' + name);
    if (nav) nav.classList.add('active');

    if (name === 'roadmap') {
      if (!state.level) { showPanel('fe-levels-panel'); updateBackBtn(false); }
      else if (state.week === null) { renderWeeks(); showPanel('fe-weeks-panel'); updateBackBtn(true); }
      else { renderDays(); showPanel('fe-days-panel'); updateBackBtn(true); }
    } else if (name === 'revision') {
      renderRevision();
      showPanel('fe-revision-panel');
      updateBackBtn(false);
    } else if (name === 'pomo') {
      showPanel('fe-pomo-panel');
      updateBackBtn(false);
    } else if (name === 'notes') {
      renderNotes();
      showPanel('fe-notes-panel');
      updateBackBtn(false);
    }
  }
  function updateBackBtn(show) {
    const btn = document.getElementById('fe-back-btn');
    if (!btn) return;
    btn.classList.toggle('visible', show);
  }
  function goBack() {
    if (state.week !== null) {
      state.week = null;
      renderWeeks();
      showPanel('fe-weeks-panel');
      updateBackBtn(true);
    } else if (state.level) {
      state.level = null;
      state.week  = null;
      renderLevels();
      showPanel('fe-levels-panel');
      updateBackBtn(false);
    }
  }

  /* ─────────────────────────────────────────
     RENDER: LEVEL SELECTOR
  ───────────────────────────────────────── */
  function renderLevels() {
    const sub = document.getElementById('fe-hdr-sub');
    if (sub) sub.textContent = 'Frontend Roadmap';

    const bPct  = levelProgress('beginner');
    const iPct  = levelProgress('intermediate');
    const aPct  = levelProgress('advanced');

    const cards = [
      { key: 'beginner',     cls: 'fe-lc-beginner',     emoji: '🟢', label: 'Beginner',
        days: 45, hours: 90, goal: 'HTML + CSS + JS Foundations', pct: bPct },
      { key: 'intermediate', cls: 'fe-lc-intermediate',  emoji: '🟡', label: 'Intermediate',
        days: 60, hours: 120, goal: 'JavaScript Deep Dive + Frameworks', pct: iPct },
      { key: 'advanced',     cls: 'fe-lc-advanced',      emoji: '🔴', label: 'Advanced',
        days: 82, hours: 180, goal: 'Performance, Architecture & Production', pct: aPct },
    ];

    const container = document.getElementById('fe-level-cards');
    if (!container) return;
    container.innerHTML = cards.map(c => `
      <button class="fe-level-card ${c.cls}" onclick="FE.selectLevel('${c.key}')">
        <div class="fe-lc-head">
          <span class="fe-lc-badge">${c.emoji} ${c.label.toUpperCase()}</span>
          <span class="fe-lc-arrow">›</span>
        </div>
        <div class="fe-lc-title">${c.label} Frontend</div>
        <div class="fe-lc-goal">${c.goal}</div>
        <div class="fe-lc-stats">
          <div class="fe-lc-stat">
            <span class="fe-lc-stat-val">${c.days}</span>
            <span class="fe-lc-stat-lbl">DAYS</span>
          </div>
          <div class="fe-lc-stat">
            <span class="fe-lc-stat-val">${c.hours}</span>
            <span class="fe-lc-stat-lbl">HOURS</span>
          </div>
          <div class="fe-lc-stat">
            <span class="fe-lc-stat-val">${c.pct}%</span>
            <span class="fe-lc-stat-lbl">DONE</span>
          </div>
        </div>
        <div class="fe-lc-prog-wrap">
          <div class="fe-lc-prog-head">
            <span class="fe-lc-prog-lbl">PROGRESS</span>
            <span class="fe-lc-prog-pct">${c.pct}%</span>
          </div>
          <div class="fe-lc-prog-bar">
            <div class="fe-lc-prog-fill" style="width:${c.pct}%"></div>
          </div>
        </div>
      </button>`).join('');
  }

  function selectLevel(level) {
    state.level = level;
    state.week  = null;
    renderWeeks();
    showPanel('fe-weeks-panel');
    updateBackBtn(true);
    setActiveNavItem('roadmap');
  }

  /* ─────────────────────────────────────────
     RENDER: WEEKS LIST
  ───────────────────────────────────────── */
  const LEVEL_LABELS = {
    beginner: { emoji: '🟢', label: 'Beginner', cls: 'badge-beginner' },
    intermediate: { emoji: '🟡', label: 'Intermediate', cls: 'badge-intermediate' },
    advanced: { emoji: '🔴', label: 'Advanced', cls: 'badge-advanced' },
  };
  const LEVEL_COLORS = {
    beginner: 'var(--c5)',
    intermediate: 'var(--c4)',
    advanced: 'var(--cf)',
  };

  function renderWeeks() {
    const ld = getLevelData(state.level);
    if (!ld) return;
    const meta = LEVEL_LABELS[state.level];
    const color = LEVEL_COLORS[state.level];
    const overallPct = levelProgress(state.level);

    const sub = document.getElementById('fe-hdr-sub');
    if (sub) sub.textContent = meta.label + ' Level';

    // Header
    const hdr = document.getElementById('fe-weeks-header');
    if (hdr) hdr.innerHTML = `
      <div class="fe-weeks-level-badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:${color}">
        ${meta.emoji} ${meta.label.toUpperCase()} · ${ld.days} DAYS · ~${ld.totalHours} HRS
      </div>
      <div class="fe-weeks-header-title">${ld.goal}</div>
      <div class="fe-weeks-overall-prog">
        <div class="fe-wop-bar"><div class="fe-wop-fill" style="width:${overallPct}%;background:${color}"></div></div>
        <span class="fe-wop-label" style="color:${color}">${overallPct}%</span>
      </div>`;

    // Weeks list
    const list = document.getElementById('fe-weeks-list');
    if (!list) return;
    list.innerHTML = ld.weeks.map((week, idx) => {
      const wp = weekProgress(state.level, idx);
      const complete = wp.pct === 100;
      return `
        <div class="fe-week-card ${complete ? 'fe-wc-complete' : ''}" onclick="FE.selectWeek(${idx})">
          <div class="fe-wc-head">
            <div class="fe-wc-num">
              <span class="fe-wc-num-lbl">WK</span>
              <span class="fe-wc-num-val">${week.week}</span>
            </div>
            <div class="fe-wc-info">
              <div class="fe-wc-title">${week.title}</div>
              <div class="fe-wc-meta">
                <span class="fe-wc-time">⏱ ${week.timeRange}</span>
                <span class="fe-wc-done" style="color:${wp.pct===100?'var(--c5)':color}">${wp.done}/${wp.total}</span>
              </div>
            </div>
            <span class="fe-wc-arrow">${complete ? '✓' : '›'}</span>
          </div>
          <div class="fe-wc-prog ${complete ? 'fe-wcp-complete' : ''}">
            <div class="fe-wcp-bar">
              <div class="fe-wcp-fill" style="width:${wp.pct}%;${complete?'background:linear-gradient(90deg,var(--c5),#34d399)':'background:linear-gradient(90deg,'+color+','+color+'aa)'}"></div>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function selectWeek(idx) {
    state.week = idx;
    renderDays();
    showPanel('fe-days-panel');
    updateBackBtn(true);
  }

  /* ─────────────────────────────────────────
     RENDER: DAYS LIST
  ───────────────────────────────────────── */
  function renderDays() {
    const ld   = getLevelData(state.level);
    if (!ld) return;
    const week = ld.weeks[state.week];
    if (!week) return;
    const color = LEVEL_COLORS[state.level];

    const sub = document.getElementById('fe-hdr-sub');
    if (sub) sub.textContent = 'Week ' + week.week;

    const hdr = document.getElementById('fe-days-header');
    if (hdr) hdr.innerHTML = `
      <div class="fe-days-week-title">${week.title}</div>
      <div class="fe-days-week-meta">⏱ ${week.timeRange} &nbsp;·&nbsp; Week ${week.week}</div>`;

    const list = document.getElementById('fe-days-list');
    if (!list) return;

    const dayRows = week.days.map(day => {
      const key       = progressKey(state.level, day.day);
      const done      = !!state.progress[key];
      const revKey    = progressKey(state.level, day.day);
      const inRev     = !!state.revision[revKey];
      return `
        <div class="fe-day-row ${done ? 'completed' : ''}" onclick="FE.openDay(${day.day})">
          <div class="fe-day-check" onclick="FE.toggleDay(event, ${day.day})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="fe-day-info">
            <div class="fe-day-num" style="color:${color}">DAY ${day.day}</div>
            <div class="fe-day-title">${day.title}</div>
            <div class="fe-day-time">⏱ ${day.time}</div>
          </div>
          <button class="fe-day-revision-btn ${inRev ? 'marked' : ''}" onclick="FE.toggleRevFromRow(event, ${day.day})" title="Mark for revision">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>`;
    }).join('');

    // Project card
    const proj      = week.project;
    const projKey   = proj ? proj.id : null;
    const projStatus= projKey ? (state.projects[projKey] || 'not-started') : 'not-started';

    const projCard = proj ? `
      <div class="fe-proj-card">
        <div class="fe-proj-head">
          <div class="fe-proj-ico">🚀</div>
          <div class="fe-proj-info">
            <div class="fe-proj-tag">WEEK ${week.week} PROJECT</div>
            <div class="fe-proj-title">${proj.title}</div>
          </div>
        </div>
        <div class="fe-proj-body">${proj.desc}</div>
        <div class="fe-proj-status-row">
          <button class="fe-proj-status-btn psb-not-started ${projStatus==='not-started'?'active':''}" onclick="FE.setProjectStatus('${projKey}','not-started')">Not Started</button>
          <button class="fe-proj-status-btn psb-in-progress ${projStatus==='in-progress'?'active':''}" onclick="FE.setProjectStatus('${projKey}','in-progress')">In Progress</button>
          <button class="fe-proj-status-btn psb-completed ${projStatus==='completed'?'active':''}" onclick="FE.setProjectStatus('${projKey}','completed')">Completed ✓</button>
        </div>
      </div>` : '';

    list.innerHTML = dayRows + projCard;
  }

  function setProjectStatus(projKey, status) {
    state.projects[projKey] = status;
    saveProjects();
    renderDays(); // re-render to update button states
    showToast(status === 'completed' ? '🎉 Project completed!' : status === 'in-progress' ? '🔨 Project started' : 'Status reset');
  }

  /* ─────────────────────────────────────────
     TOGGLE DAY COMPLETION
  ───────────────────────────────────────── */
  function toggleDay(e, dayNum) {
    e.stopPropagation();
    const key  = progressKey(state.level, dayNum);
    state.progress[key] = !state.progress[key];
    saveProgress();
    if (state.progress[key]) touchStreak();
    renderDays();
    renderLevelProgressPills();
  }
  function toggleRevFromRow(e, dayNum) {
    e.stopPropagation();
    const key = progressKey(state.level, dayNum);
    state.revision[key] = !state.revision[key];
    saveRevision();
    renderDays();
    showToast(state.revision[key] ? '📌 Added to revision' : '🗑 Removed from revision');
  }

  /* ─────────────────────────────────────────
     DAY DETAIL MODAL
  ───────────────────────────────────────── */
  let _currentDay = null;

  function openDay(dayNum) {
    const ld   = getLevelData(state.level);
    if (!ld) return;
    let dayData = null;
    for (const week of ld.weeks) {
      dayData = week.days.find(d => d.day === dayNum);
      if (dayData) break;
    }
    if (!dayData) return;
    _currentDay = { level: state.level, day: dayNum, data: dayData };

    const key   = progressKey(state.level, dayNum);
    const done  = !!state.progress[key];
    const inRev = !!state.revision[key];
    const note  = state.notes[key] || '';
    const color = LEVEL_COLORS[state.level];

    // Populate modal
    set('fe-modal-day-num', 'DAY ' + dayNum + ' · ' + (LEVEL_LABELS[state.level]?.label || '').toUpperCase());
    set('fe-modal-title', dayData.title);

    // Time badge
    const timeBadge = document.getElementById('fe-modal-time-badge');
    if (timeBadge) timeBadge.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      ${dayData.time}`;

    set('fe-modal-goal-text', dayData.goal);
    set('fe-modal-explanation', dayData.explanation);

    // Resources
    const resEl = document.getElementById('fe-modal-resources');
    if (resEl) {
      resEl.innerHTML = (dayData.resources || []).map(r => {
        const isYt  = r.type === 'yt';
        const icon  = isYt
          ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
        return `
          <a class="fe-modal-res-btn ${isYt ? 'yt' : 'web'}" href="${r.url}" target="_blank" rel="noopener noreferrer">
            <div class="fe-modal-res-ico">${icon}</div>
            <span class="fe-modal-res-label">${r.label}</span>
            <span class="fe-modal-res-ext">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </span>
          </a>`;
      }).join('');
    }

    set('fe-modal-practice', dayData.practice);
    set('fe-modal-task', dayData.task);

    // Notes
    const notesArea = document.getElementById('fe-modal-notes-area');
    if (notesArea) notesArea.value = note;
    const notesSaved = document.getElementById('fe-modal-notes-saved');
    if (notesSaved) notesSaved.classList.remove('show');

    // Done button
    const doneBtn = document.getElementById('fe-modal-done-btn');
    if (doneBtn) {
      doneBtn.className = 'fe-modal-done-btn' + (done ? ' done' : '');
      doneBtn.innerHTML = done
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Completed!`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Mark Complete`;
    }

    // Rev button
    const revBtn = document.getElementById('fe-modal-rev-btn');
    if (revBtn) revBtn.classList.toggle('marked', inRev);

    // Open modal
    const modal = document.getElementById('fe-day-modal');
    if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }

  function closeModal() {
    const modal = document.getElementById('fe-day-modal');
    if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
    _currentDay = null;
  }

  function modalToggleDone() {
    if (!_currentDay) return;
    const key = progressKey(_currentDay.level, _currentDay.day);
    state.progress[key] = !state.progress[key];
    saveProgress();
    if (state.progress[key]) touchStreak();
    // Update button
    const done = state.progress[key];
    const btn  = document.getElementById('fe-modal-done-btn');
    if (btn) {
      btn.className = 'fe-modal-done-btn' + (done ? ' done' : '');
      btn.innerHTML = done
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Completed!`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Mark Complete`;
    }
    showToast(done ? '✅ Day completed!' : '↩ Marked incomplete');
    if (state.tab === 'roadmap') renderDays();
    renderLevelProgressPills();
  }

  function modalToggleRev() {
    if (!_currentDay) return;
    const key = progressKey(_currentDay.level, _currentDay.day);
    state.revision[key] = !state.revision[key];
    saveRevision();
    const revBtn = document.getElementById('fe-modal-rev-btn');
    if (revBtn) revBtn.classList.toggle('marked', state.revision[key]);
    showToast(state.revision[key] ? '📌 Added to revision' : '🗑 Removed from revision');
    if (state.tab === 'roadmap') renderDays();
  }

  function modalSaveNote() {
    if (!_currentDay) return;
    const key  = progressKey(_currentDay.level, _currentDay.day);
    const area = document.getElementById('fe-modal-notes-area');
    if (!area) return;
    state.notes[key] = area.value.trim();
    saveNotes();
    const saved = document.getElementById('fe-modal-notes-saved');
    if (saved) {
      saved.classList.add('show');
      setTimeout(() => saved.classList.remove('show'), 2000);
    }
    if (state.tab === 'notes') renderNotes();
  }

  /* ─────────────────────────────────────────
     SEARCH
  ───────────────────────────────────────── */
  function handleSearch(query) {
    const q = (query || '').trim().toLowerCase();
    const results = document.getElementById('fe-search-results');
    const levelCards = document.getElementById('fe-level-cards');

    if (!q) {
      if (results) results.classList.remove('active');
      if (levelCards) levelCards.style.display = '';
      return;
    }
    if (results) results.classList.add('active');
    if (levelCards) levelCards.style.display = 'none';

    const found = [];
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
      const ld = getLevelData(level);
      if (!ld) return;
      ld.weeks.forEach(week => {
        week.days.forEach(day => {
          const haystack = (day.title + ' ' + day.goal + ' ' + day.explanation).toLowerCase();
          if (haystack.includes(q)) {
            found.push({ level, day });
          }
        });
      });
    });

    if (results) {
      if (!found.length) {
        results.innerHTML = '<div style="padding:20px;text-align:center;color:var(--t2);font-size:13px;">No results found</div>';
        return;
      }
      results.innerHTML = found.slice(0, 20).map(({ level, day }) => `
        <div class="fe-search-result-item" onclick="FE.openSearchResult('${level}', ${day.day})">
          <div class="fe-sri-day">DAY ${day.day} · ${(LEVEL_LABELS[level]?.label||'').toUpperCase()}</div>
          <div class="fe-sri-title">${day.title}</div>
          <div class="fe-sri-level">${day.goal}</div>
        </div>`).join('');
    }
  }

  function openSearchResult(level, dayNum) {
    // Clear search
    const inp = document.getElementById('fe-search-input');
    if (inp) inp.value = '';
    handleSearch('');

    // Navigate
    state.level = level;
    state.week  = null;
    // find week containing this day
    const ld = getLevelData(level);
    if (ld) {
      for (let i = 0; i < ld.weeks.length; i++) {
        if (ld.weeks[i].days.find(d => d.day === dayNum)) {
          state.week = i;
          break;
        }
      }
    }
    renderDays();
    showPanel('fe-days-panel');
    updateBackBtn(true);
    setActiveNavItem('roadmap');
    setTimeout(() => openDay(dayNum), 100);
  }

  /* ─────────────────────────────────────────
     RENDER: REVISION
  ───────────────────────────────────────── */
  function renderRevision() {
    const list  = document.getElementById('fe-rev-list');
    const empty = document.getElementById('fe-rev-empty');
    if (!list || !empty) return;

    const items = [];
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
      Object.keys(state.revision).forEach(key => {
        if (!state.revision[key]) return;
        if (!key.startsWith(level + '_d')) return;
        const dayNum = parseInt(key.replace(level + '_d', ''), 10);
        const ld = getLevelData(level);
        if (!ld) return;
        let dayData = null;
        for (const week of ld.weeks) {
          dayData = week.days.find(d => d.day === dayNum);
          if (dayData) break;
        }
        if (dayData) items.push({ level, key, dayNum, dayData });
      });
    });

    if (!items.length) {
      empty.classList.add('show');
      list.innerHTML = '';
      return;
    }
    empty.classList.remove('show');
    list.innerHTML = items.map(({ level, key, dayNum, dayData }) => `
      <div class="fe-rev-item" onclick="FE.openRevDay('${level}', ${dayNum})">
        <div class="fe-rev-item-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div class="fe-rev-item-info">
          <div class="fe-rev-item-day">DAY ${dayNum}</div>
          <div class="fe-rev-item-title">${dayData.title}</div>
          <div class="fe-rev-item-level">${LEVEL_LABELS[level]?.label || ''} Frontend</div>
        </div>
        <button class="fe-rev-remove" onclick="FE.removeRevision(event, '${level}', ${dayNum})" title="Remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
        </button>
      </div>`).join('');
  }

  function openRevDay(level, dayNum) {
    state.level = level;
    const ld = getLevelData(level);
    if (ld) {
      for (let i = 0; i < ld.weeks.length; i++) {
        if (ld.weeks[i].days.find(d => d.day === dayNum)) { state.week = i; break; }
      }
    }
    openDay(dayNum);
  }
  function removeRevision(e, level, dayNum) {
    e.stopPropagation();
    const key = progressKey(level, dayNum);
    delete state.revision[key];
    saveRevision();
    renderRevision();
    showToast('🗑 Removed from revision');
  }

  /* ─────────────────────────────────────────
     RENDER: NOTES
  ───────────────────────────────────────── */
  function renderNotes() {
    const list  = document.getElementById('fe-notes-list');
    const empty = document.getElementById('fe-notes-empty');
    if (!list || !empty) return;

    const items = [];
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
      const ld = getLevelData(level);
      if (!ld) return;
      ld.weeks.forEach(week => {
        week.days.forEach(day => {
          const key  = progressKey(level, day.day);
          const note = state.notes[key];
          if (note && note.trim()) items.push({ level, dayNum: day.day, title: day.title, note });
        });
      });
    });

    if (!items.length) {
      empty.classList.add('show');
      list.innerHTML = '';
      return;
    }
    empty.classList.remove('show');
    list.innerHTML = items.map(({ level, dayNum, title, note }) => `
      <div class="fe-note-card" onclick="FE.openRevDay('${level}', ${dayNum})">
        <div class="fe-note-day">DAY ${dayNum} · ${(LEVEL_LABELS[level]?.label||'').toUpperCase()}</div>
        <div class="fe-note-title">${title}</div>
        <div class="fe-note-preview">${escHtml(note)}</div>
      </div>`).join('');
  }

  /* ─────────────────────────────────────────
     PROGRESS PILLS (for index.html home card)
  ───────────────────────────────────────── */
  function renderLevelProgressPills() {
    // If the home card pill exists (when embedded), sync it
    try {
      const total = 45 + 60 + 82; // all days
      let done = 0;
      ['beginner','intermediate','advanced'].forEach(level => {
        done += allDaysForLevel(level).filter(d => state.progress[progressKey(level, d.day)]).length;
      });
      const pct = Math.round((done / total) * 100);
      const bar = document.getElementById('home-fe-norm-prog');
      if (bar) bar.style.width = pct + '%';
    } catch(e) {}
  }

  /* ─────────────────────────────────────────
     POMODORO FAB
  ───────────────────────────────────────── */
  (function setupPomo() {
    const CIRCUM = 2 * Math.PI * 50; // r=50 on viewBox 116px → r in SVG units ≈50

    const pomo = {
      running : false,
      isBreak : false,
      workMins: 25,
      breakMins: 5,
      seconds : 25 * 60,
      total   : 25 * 60,
      session : 1,
      timer   : null,
    };

    // Try to restore saved duration
    try {
      const saved = parseInt(localStorage.getItem(LS_POMO_DUR) || '25', 10);
      if (saved >= 1 && saved <= 180) {
        pomo.workMins = saved;
        pomo.seconds  = saved * 60;
        pomo.total    = saved * 60;
      }
    } catch(e) {}

    let panelOpen = false;
    let dragActive = false;
    let fabX = null, fabY = null;

    const fabBtn    = document.getElementById('fe-fab-btn');
    const fabPanel  = document.getElementById('fe-fab-panel');
    const closeBtn  = document.getElementById('fe-fab-close-btn');
    const startBtn  = document.getElementById('fe-fab-pomo-start');
    const pauseBtn  = document.getElementById('fe-fab-pomo-pause');
    const resetBtn  = document.getElementById('fe-fab-pomo-reset');
    const timeEl    = document.getElementById('fe-fab-pomo-time');
    const labelEl   = document.getElementById('fe-fab-pomo-label');
    const sessionEl = document.getElementById('fe-fab-pomo-session');
    const arc       = document.getElementById('fe-fab-pomo-arc');

    if (!fabBtn || !fabPanel) return;

    // Set arc circumference
    if (arc) {
      arc.style.strokeDasharray  = CIRCUM;
      arc.style.strokeDashoffset = 0;
    }

    function openPanel() {
      panelOpen = true;
      fabPanel.classList.add('fab-panel-open');
      positionPanel();
    }
    function closePanel() {
      panelOpen = false;
      fabPanel.classList.remove('fab-panel-open');
    }
    function positionPanel() {
      const fr  = fabBtn.getBoundingClientRect();
      const pw  = 280;
      let left  = fr.right - pw;
      let bottom= window.innerHeight - fr.top + 8;
      if (left < 8) left = 8;
      fabPanel.style.left   = left + 'px';
      fabPanel.style.bottom = bottom + 'px';
      fabPanel.style.top    = 'auto';
    }

    tap(fabBtn, function() {
      if (dragActive) return;
      panelOpen ? closePanel() : openPanel();
    });
    if (closeBtn) tap(closeBtn, closePanel);

    // Drag support
    fabBtn.addEventListener('touchstart', function(e) {
      dragActive = false;
      fabX = e.touches[0].clientX;
      fabY = e.touches[0].clientY;
      fabBtn.classList.add('fab-dragging');
    }, { passive: true });
    fabBtn.addEventListener('touchmove', function(e) {
      const dx = Math.abs(e.touches[0].clientX - fabX);
      const dy = Math.abs(e.touches[0].clientY - fabY);
      if (dx > 6 || dy > 6) dragActive = true;
      if (dragActive) {
        const cx = e.touches[0].clientX;
        const cy = e.touches[0].clientY;
        fabBtn.style.right  = '';
        fabBtn.style.bottom = '';
        fabBtn.style.left   = (cx - 26) + 'px';
        fabBtn.style.top    = (cy - 26) + 'px';
        e.preventDefault();
      }
    }, { passive: false });
    fabBtn.addEventListener('touchend', function() {
      fabBtn.classList.remove('fab-dragging');
      if (panelOpen) positionPanel();
    }, { passive: true });

    // Preset chips
    document.querySelectorAll('.fe-fab-preset').forEach(function(btn) {
      tap(btn, function() {
        const m = parseInt(btn.getAttribute('data-m'), 10) || 25;
        document.querySelectorAll('.fe-fab-preset').forEach(b => b.classList.remove('fab-p-active'));
        btn.classList.add('fab-p-active');
        applyDuration(m);
      });
    });

    if (startBtn) tap(startBtn, startPomo);
    if (pauseBtn) tap(pauseBtn, pausePomo);
    if (resetBtn) tap(resetBtn, resetPomo);

    function applyDuration(mins) {
      pomo.workMins = Math.min(Math.max(mins, 1), 180);
      try { localStorage.setItem(LS_POMO_DUR, pomo.workMins); } catch(e) {}
      if (pomo.running) { clearInterval(pomo.timer); pomo.running = false; }
      if (startBtn) startBtn.style.display = 'flex';
      if (pauseBtn) pauseBtn.style.display = 'none';
      pomo.isBreak = false;
      pomo.seconds = pomo.workMins * 60;
      pomo.total   = pomo.workMins * 60;
      document.querySelectorAll('.fe-fab-preset').forEach(b => {
        b.classList.toggle('fab-p-active', parseInt(b.getAttribute('data-m'), 10) === pomo.workMins);
      });
      renderUI();
    }
    function startPomo() {
      if (pomo.running) return;
      pomo.running = true;
      if (startBtn) startBtn.style.display = 'none';
      if (pauseBtn) pauseBtn.style.display = 'flex';
      pomo.timer = setInterval(tick, 1000);
    }
    function pausePomo() {
      pomo.running = false;
      clearInterval(pomo.timer);
      if (startBtn) startBtn.style.display = 'flex';
      if (pauseBtn) pauseBtn.style.display = 'none';
    }
    function resetPomo() {
      pausePomo();
      pomo.isBreak = false;
      pomo.seconds = pomo.workMins * 60;
      pomo.total   = pomo.workMins * 60;
      renderUI();
    }
    function tick() {
      if (pomo.seconds <= 0) {
        clearInterval(pomo.timer);
        pomo.running = false;
        beep();
        openPanel();
        if (!pomo.isBreak) {
          pomo.isBreak  = true;
          const longB   = pomo.session >= 4;
          pomo.breakMins= longB ? 15 : 5;
          if (longB) pomo.session = 1;
          pomo.seconds  = pomo.breakMins * 60;
          pomo.total    = pomo.seconds;
        } else {
          pomo.isBreak  = false;
          pomo.seconds  = pomo.workMins * 60;
          pomo.total    = pomo.seconds;
          if (pomo.session < 4) pomo.session++;
        }
        if (startBtn) startBtn.style.display = 'flex';
        if (pauseBtn) pauseBtn.style.display = 'none';
        renderUI();
        return;
      }
      pomo.seconds--;
      renderUI();
    }
    function renderUI() {
      const m = Math.floor(pomo.seconds / 60), s = pomo.seconds % 60;
      if (timeEl)    timeEl.textContent  = pad(m) + ':' + pad(s);
      if (labelEl)   labelEl.textContent = pomo.isBreak ? 'BREAK' : 'FOCUS';
      if (labelEl)   labelEl.style.color = pomo.isBreak ? 'var(--c2)' : 'var(--cf)';
      if (arc) {
        arc.style.stroke = pomo.isBreak ? 'var(--c2)' : 'var(--cf)';
        const pct = pomo.total > 0 ? pomo.seconds / pomo.total : 0;
        arc.style.strokeDashoffset = CIRCUM * (1 - pct);
      }
      if (sessionEl) sessionEl.textContent = 'Session ' + pomo.session + ' of 4';
    }
    function beep() {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        [0, .3, .6].forEach(function(d) {
          const osc = ctx.createOscillator(), g = ctx.createGain();
          osc.connect(g); g.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.value = 880;
          g.gain.setValueAtTime(.4, ctx.currentTime + d);
          g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + d + .35);
          osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + .35);
        });
      } catch(e) {}
    }

    // Initial render
    renderUI();
    applyDuration(pomo.workMins);
  })();

  /* ─────────────────────────────────────────
     TOAST
  ───────────────────────────────────────── */
  let _toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById('fe-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ─────────────────────────────────────────
     UTILITIES
  ───────────────────────────────────────── */
  function set(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function setActiveNavItem(name) {
    document.querySelectorAll('.fe-nav-item').forEach(n => n.classList.remove('active'));
    const nav = document.getElementById('fe-nav-' + name);
    if (nav) nav.classList.add('active');
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function escHtml(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function tap(el, fn) {
    if (!el) return;
    el.addEventListener('touchend', function(e) { e.preventDefault(); fn(); });
    el.addEventListener('click',    function(e) { e.stopPropagation(); fn(); });
  }

  /* ─────────────────────────────────────────
     PUBLIC API (attached to window.FE)
  ───────────────────────────────────────── */
  window.FE = {
    selectLevel        : selectLevel,
    selectWeek         : selectWeek,
    openDay            : openDay,
    closeModal         : closeModal,
    toggleDay          : toggleDay,
    toggleRevFromRow   : toggleRevFromRow,
    modalToggleDone    : modalToggleDone,
    modalToggleRev     : modalToggleRev,
    modalSaveNote      : modalSaveNote,
    openSearchResult   : openSearchResult,
    openRevDay         : openRevDay,
    removeRevision     : removeRevision,
    setProjectStatus   : setProjectStatus,
    switchTab          : setTab,
    goBack             : goBack,
    handleSearch       : handleSearch,
  };

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    loadState();
    renderStreak();
    renderLevels();
    showPanel('fe-levels-panel');
    updateBackBtn(false);
    setActiveNavItem('roadmap');

    // Search input listener
    const searchInput = document.getElementById('fe-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        handleSearch(this.value);
      });
    }

    // Modal backdrop close
    const backdrop = document.querySelector('.fe-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
      backdrop.addEventListener('touchend', function(e) { e.preventDefault(); closeModal(); });
    }

    // Notes textarea — save on blur
    const notesArea = document.getElementById('fe-modal-notes-area');
    if (notesArea) {
      notesArea.addEventListener('blur', modalSaveNote);
    }

    // Update home card pill
    renderLevelProgressPills();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
