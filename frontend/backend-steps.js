'use strict';

// ── Day builder helper ──────────────────────────────────────
function d(num, title, goal, explanation, resources, practice, task, time) {
  return { num, title, goal, explanation, resources, practice, task, time };
}

// ── STRUCTURED BACKEND ROADMAP ─────────────────────────────
const STRUCTURED_BACKEND_ROADMAP = (function() {

// ════════════════════════════════════════════════════════════
// BEGINNER — 60 Days, 8 Weeks
// ════════════════════════════════════════════════════════════
const beginner = {
  label: "🟢 Beginner", days: 60, totalHours: 120,
  goal: "Core Backend Foundations",
  weeks: [

  // ── Week 1 ───────────────────────────────────────────────
  { week:1, title:"HTTP & Node.js Foundations", timeRange:"10–12 hrs",
    days:[
      d(1,"How the Web Works",
        "Understand the full HTTP request/response cycle from browser to server.",
        "When you type a URL, the browser first performs a DNS lookup to resolve the hostname to an IP address. A TCP connection is then established (3-way handshake: SYN, SYN-ACK, ACK). The browser sends an HTTP request with a method (GET/POST/PUT/DELETE/PATCH), headers (Host, Content-Type, Authorization), and optionally a body. The server responds with a status code (200 OK, 301 Redirect, 404 Not Found, 500 Server Error), response headers, and a body. HTTP/1.1 uses persistent connections; HTTP/2 adds multiplexing over a single TCP connection. Tools like curl and Postman let you inspect raw requests and responses. Understanding status codes is critical: 2xx success, 3xx redirect, 4xx client error, 5xx server error.",
        [{type:"yt",url:"https://youtube.com/results?search_query=how+the+web+works+HTTP+request+response+cycle+explained",label:"HTTP Request/Response Cycle"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",label:"MDN: HTTP Overview"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",label:"MDN: HTTP Status Codes"}],
        "On paper, draw the full journey of a GET request to https://api.example.com/users/1 — DNS, TCP, HTTP request headers, server processing, response headers and body.",
        "🚀 TASK: (1) Use curl -v to make a GET request to https://httpbin.org/get and label every part of the output (request line, headers, body, status), (2) use curl -X POST https://httpbin.org/post -H 'Content-Type: application/json' -d '{\"name\":\"test\"}' and inspect the response, (3) use curl -I to fetch only headers from three different websites, (4) identify the status codes for a 404 page and a redirect, (5) install Postman and replicate all three curl requests in its UI.",
        "2 hrs"),
      d(2,"Node.js Basics",
        "Set up Node.js and understand its event-driven, non-blocking I/O architecture.",
        "Node.js is a JavaScript runtime built on V8. Unlike thread-per-request servers, Node uses a single-threaded event loop — I/O operations are offloaded to the OS and callbacks fire when complete, allowing Node to handle thousands of concurrent connections with minimal threads. The module system uses require() and module.exports (CommonJS). Core modules include fs (filesystem), path (path manipulation), os (system info), and events (EventEmitter). npm init creates package.json which tracks dependencies and scripts. Node version management: use nvm to switch between versions. Run scripts with node file.js or via npm scripts.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+tutorial+for+beginners+event+loop+modules",label:"Node.js Beginners Tutorial"},{type:"web",url:"https://nodejs.org/en/docs/",label:"Node.js Official Docs"},{type:"web",url:"https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",label:"Node.js Event Loop"}],
        "Draw the event loop: call stack, Web APIs (I/O), callback queue, and how the loop checks the queue. Trace what happens when fs.readFile() is called.",
        "🚀 TASK: (1) Install Node.js via nvm and verify with node -v and npm -v, (2) write a script using the fs module to read a file and print its contents, (3) use the path module to build cross-platform file paths with path.join and path.resolve, (4) use os.cpus(), os.totalmem(), os.freemem() to print system info, (5) create a package.json with npm init, add a start script, and run it with npm start.",
        "2 hrs"),
      d(3,"Node.js HTTP Module",
        "Build a raw HTTP server without frameworks using Node's built-in http module.",
        "Node's http.createServer(callback) returns a server object. The callback receives req (IncomingMessage) and res (ServerResponse). req.url gives the request path, req.method gives GET/POST etc., req.headers gives all request headers. For routing, use if/else or switch on req.url and req.method. To send a response: res.writeHead(statusCode, headersObject) then res.end(body). For JSON responses, set Content-Type: application/json and call JSON.stringify(). Reading POST body requires accumulating chunks: req.on('data', chunk => ...) and req.on('end', () => ...). server.listen(port) starts the server.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+http+module+create+server+routing+tutorial",label:"Node.js HTTP Server Tutorial"},{type:"web",url:"https://nodejs.org/api/http.html",label:"Node.js http Module Docs"}],
        "On paper, write pseudocode for a router that handles GET /users (return list), POST /users (create), GET /users/:id (return one). How would you parse the ID from the URL string?",
        "🚀 TASK: (1) Create an HTTP server that responds with 'Hello World' on GET /, (2) add routing so GET /users returns a JSON array and GET /about returns a plain text response, (3) handle POST /users by reading the body, parsing JSON, and echoing it back, (4) return 404 JSON for unknown routes, (5) add basic request logging (method + url + timestamp) for every request using console.log.",
        "2 hrs"),
      d(4,"Express.js Setup",
        "Install Express and build a structured REST API with route parameters and middleware.",
        "Express is a minimal Node.js web framework. Install with npm install express. Create an app with const app = express(). Routes: app.get(path, handler), app.post, app.put, app.delete, app.patch. Handler receives (req, res). req.params accesses URL parameters (/users/:id → req.params.id). req.query accesses query strings (/search?q=foo → req.query.q). req.body accesses parsed request body — requires express.json() middleware added first with app.use(express.json()). Start server with app.listen(port, callback). Express wraps Node's http module with a clean routing API.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Express.js+tutorial+for+beginners+REST+API+2024",label:"Express.js Beginners Tutorial"},{type:"web",url:"https://expressjs.com/en/guide/routing.html",label:"Express Routing Guide"},{type:"web",url:"https://expressjs.com/en/4x/api.html",label:"Express API Reference"}],
        "Design routes for a /products resource on paper: list all, get one by ID, create, update, delete. Write out each HTTP method and path.",
        "🚀 TASK: (1) Install Express and create an app.js that listens on port 3000, (2) add GET /api/v1/products returning a hardcoded JSON array, (3) add GET /api/v1/products/:id returning a single product or 404 if not found, (4) add POST /api/v1/products that reads req.body and pushes to the array, (5) add PUT /api/v1/products/:id and DELETE /api/v1/products/:id, (6) test all routes with Postman or curl.",
        "2 hrs"),
      d(5,"Express Middleware",
        "Understand the middleware chain and build custom middleware for logging and error handling.",
        "Middleware functions have signature (req, res, next). Calling next() passes control to the next middleware. app.use() registers middleware globally; placing it before routes makes it run for every request. Order matters: middleware registered first runs first. morgan is a logging middleware — npm install morgan, then app.use(morgan('dev')). cors middleware handles Cross-Origin Resource Sharing — npm install cors, app.use(cors()). Error-handling middleware has four parameters (err, req, res, next) and must be registered last. Custom middleware example: authentication, request ID injection, response time tracking.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Express.js+middleware+tutorial+custom+error+handling",label:"Express Middleware Deep Dive"},{type:"web",url:"https://expressjs.com/en/guide/using-middleware.html",label:"Express Middleware Guide"},{type:"web",url:"https://expressjs.com/en/guide/error-handling.html",label:"Express Error Handling"}],
        "Draw a middleware chain diagram: incoming request → morgan logger → cors → auth check → route handler → error handler → response. Show where next() is called.",
        "🚀 TASK: (1) Add morgan('dev') logging to your Express app, (2) add cors() to allow all origins, (3) write a custom requestTime middleware that adds req.requestTime = Date.now() and logs it, (4) write an auth middleware that checks for an Authorization header and calls next() if present or responds 401 if missing, (5) write a global error handler (err, req, res, next) that returns {error: err.message} with status 500, (6) test that the error handler catches errors thrown inside route handlers.",
        "2 hrs"),
      d(6,"REST API Design",
        "Design clean, versioned RESTful APIs following industry conventions.",
        "REST (Representational State Transfer) uses HTTP methods to perform operations on resources. Resources are nouns, not verbs — /users not /getUsers. Use plural nouns: /users, /products, /orders. Nested routes express relationships: /users/:userId/orders. HTTP verbs map to CRUD: GET=read, POST=create, PUT=replace, PATCH=update, DELETE=delete. Always version your API: /api/v1/. Response envelope: { data: ..., meta: { page, total } }. HTTP status codes must be accurate: 201 for created, 204 for no content (delete), 400 for bad input, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict, 422 validation error. Use consistent JSON field naming (camelCase or snake_case).",
        [{type:"yt",url:"https://youtube.com/results?search_query=REST+API+design+best+practices+naming+conventions",label:"REST API Design Best Practices"},{type:"web",url:"https://restfulapi.net/",label:"RESTful API Tutorial"},{type:"web",url:"https://jsonapi.org/",label:"JSON:API Specification"}],
        "Design a complete API spec on paper for an e-commerce system with users, products, orders, and order items. Write out every endpoint, method, request body shape, and expected response status.",
        "🚀 TASK: (1) Redesign your products API to follow REST conventions strictly with /api/v1/ prefix, (2) add pagination to GET /api/v1/products with ?page=1&limit=10 query params, (3) return 201 status on POST and include Location header pointing to new resource, (4) return 204 with no body on DELETE, (5) add input validation and return 422 with descriptive error messages when required fields are missing, (6) document all endpoints in a README.md with example requests and responses.",
        "2 hrs"),
      d(7,"Week 1 Review — In-Memory REST API",
        "Build a complete in-memory REST API consolidating all Week 1 concepts.",
        "An in-memory API stores data in JavaScript arrays/objects (no database). This is excellent for learning routing, middleware, and REST design before adding DB complexity. For this project, implement full CRUD for two resources (e.g., users and posts). Use proper REST conventions: versioned routes, correct HTTP methods, accurate status codes. Add middleware: morgan logging, cors, request validation, error handling. Auto-increment IDs by tracking a counter. Implement basic filtering via query params (e.g., GET /posts?userId=1). This solidifies the full request lifecycle.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Express.js+REST+API+in-memory+CRUD+project+tutorial",label:"Express REST API Project"},{type:"web",url:"https://expressjs.com/en/starter/basic-routing.html",label:"Express Basic Routing"}],
        "Plan your API on paper first: two resource types, all endpoints, middleware order, error scenarios. Write down edge cases: what happens with invalid ID, empty body, missing required fields?",
        "🚀 TASK: Build a complete Express app with (1) full CRUD for /api/v1/users (id, name, email, createdAt) with all validations, (2) full CRUD for /api/v1/posts (id, userId, title, body, createdAt) with validation and user existence check, (3) GET /api/v1/users/:id/posts returns all posts for a user, (4) morgan + cors + custom request-time middleware, (5) global error handler, (6) test every endpoint thoroughly with Postman and verify all status codes are correct.",
        "2 hrs"),
    ],
    project:{ id:"bw1", title:"In-Memory REST API Server",
      desc:"A full Express.js REST API with complete CRUD for two resources (users and posts), middleware stack (morgan, cors, validation, error handling), nested routes (user's posts), pagination, proper HTTP status codes, and a README with example curl commands. No database — data persists in memory." }
  },

  // ── Week 2 ───────────────────────────────────────────────
  { week:2, title:"File I/O, Async Patterns & npm Ecosystem", timeRange:"10–12 hrs",
    days:[
      d(8,"Callbacks & EventEmitter",
        "Master the callback pattern and Node.js EventEmitter for custom event-driven code.",
        "Callbacks are functions passed as arguments and called when an async operation completes — the foundation of Node.js async. Convention: first argument is error (err-first callback). Node's EventEmitter class is the backbone of its async model. Create emitters with const emitter = new EventEmitter(). Register listeners with emitter.on('event', handler) or emitter.once('event', handler) for one-time listeners. Fire events with emitter.emit('event', data). Remove listeners with emitter.removeListener or emitter.off. Always listen for 'error' events to prevent crashes. Many Node.js core classes (Stream, http.Server) extend EventEmitter.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+callbacks+EventEmitter+tutorial+async+patterns",label:"Node.js Callbacks & EventEmitter"},{type:"web",url:"https://nodejs.org/api/events.html",label:"Node.js Events Docs"}],
        "Trace a callback chain: readFile → parse JSON → writefile. Draw what happens if readFile errors. How does err-first callback prevent you from ignoring errors?",
        "🚀 TASK: (1) Write a readFileCallback(path, cb) function that reads a file and calls cb(err, data), (2) chain three callbacks: read file → transform content → write to new file, (3) create a custom EventEmitter class Logger with events: 'log', 'warn', 'error', (4) emit events from your Express middleware and listen with the Logger, (5) use emitter.once() to do a one-time setup action, (6) always attach an error listener and test it by emitting 'error'.",
        "2 hrs"),
      d(9,"Promises & async/await",
        "Convert callback-based code to Promises and master async/await for clean async logic.",
        "A Promise represents a future value with states: pending, fulfilled, rejected. Create with new Promise((resolve, reject) => {...}). Chain with .then(onFulfilled).catch(onRejected).finally(cleanup). Promise.all([p1,p2]) resolves when all resolve or rejects on first rejection. Promise.race([p1,p2]) resolves/rejects with the first to settle. Promise.allSettled([p1,p2]) always resolves with all results. Promise.any([p1,p2]) resolves with first success. async functions always return Promises. await pauses execution inside async until Promise settles. Wrap await in try/catch for error handling. util.promisify converts err-first callbacks to Promises.",
        [{type:"yt",url:"https://youtube.com/results?search_query=JavaScript+Promises+async+await+tutorial+2024",label:"Promises & async/await Tutorial"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",label:"MDN: Promise"},{type:"web",url:"https://nodejs.org/api/util.html#utilpromisifyoriginal",label:"Node.js util.promisify"}],
        "Compare callback vs Promise vs async/await for the same operation: read file → transform → write. Write all three versions on paper and compare readability.",
        "🚀 TASK: (1) Convert readFileCallback to readFilePromise returning a Promise, (2) use util.promisify on fs.readFile and chain with .then().catch(), (3) rewrite using async/await with try/catch, (4) use Promise.all to read three files concurrently and combine results, (5) use Promise.allSettled to handle partial failures gracefully, (6) write an async route handler in Express using async/await and proper error forwarding to next(err).",
        "2 hrs"),
      d(10,"Streams",
        "Use Node.js Streams to process large data without loading everything into memory.",
        "Streams process data in chunks rather than loading it all at once — essential for large files, HTTP responses, and real-time data. Four types: Readable (source), Writable (destination), Duplex (both), Transform (modify data). Readable events: 'data' (chunk arrives), 'end' (finished), 'error'. Writable methods: write(chunk), end(). pipe() connects a Readable to a Writable automatically handling backpressure — when the writable is slow, pipe pauses the readable. readline module creates line-by-line interfaces over Readable streams. Transform streams modify data in-flight (e.g., compression with zlib.createGzip()). Streams are memory-efficient: piping a 10GB file uses constant memory.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+streams+pipe+transform+tutorial+beginners",label:"Node.js Streams Tutorial"},{type:"web",url:"https://nodejs.org/api/stream.html",label:"Node.js Stream Docs"},{type:"web",url:"https://nodejs.org/en/learn/modules/backpressuring-in-streams",label:"Node.js Backpressure"}],
        "Draw the pipe chain: fs.createReadStream → zlib.createGzip → fs.createWriteStream. Show how backpressure works when the write buffer is full.",
        "🚀 TASK: (1) Read a large file using fs.createReadStream and count lines without loading it all into memory, (2) pipe a readable stream through zlib.createGzip() to a writable stream to compress a file, (3) use readline.createInterface to process a CSV file line by line, (4) create a custom Transform stream that converts text to uppercase, (5) pipe a file through your transform stream, (6) time the difference between fs.readFile (fully in memory) and stream-based processing on a large file.",
        "2 hrs"),
      d(11,"File System Deep Dive",
        "Master Node.js fs module for all file and directory operations.",
        "fs module provides both synchronous (blocking) and async (non-blocking) versions of every operation. Prefer async in production. fs.readFile(path, encoding, cb) reads entire file. fs.writeFile(path, data, cb) overwrites. fs.appendFile adds to end. fs.mkdir(path, {recursive:true}) creates directory (recursive avoids errors if exists). fs.readdir(path, cb) lists directory contents. fs.stat(path, cb) returns file metadata (size, mtime, isDirectory()). fs.unlink deletes a file, fs.rmdir removes directory. fs.watch(path, callback) watches for changes. path.join combines segments cross-platform. path.resolve gives absolute path. path.dirname gets parent directory. path.extname gets extension.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+fs+module+file+system+tutorial+readFile+writeFile",label:"Node.js fs Module Tutorial"},{type:"web",url:"https://nodejs.org/api/fs.html",label:"Node.js fs Docs"},{type:"web",url:"https://nodejs.org/api/path.html",label:"Node.js path Docs"}],
        "Sketch a function that recursively lists all files in a directory tree. What edge cases exist: symlinks, permission errors, empty dirs?",
        "🚀 TASK: (1) Write readFileSafe(path) that returns file contents or null on error (no throwing), (2) write a function that creates a directory structure recursively, (3) write a function that recursively lists all .js files in a folder and its subfolders, (4) use fs.watch to monitor a directory and log when files are added or changed, (5) use fs.stat to build a file info object {name, size, modified, isDir} for every item in a folder, (6) write a safe writeJSON(path, data) function that creates parent dirs if needed.",
        "2 hrs"),
      d(12,"npm & Package Management",
        "Master npm for dependency management, scripts, environment variables, and package publishing.",
        "npm (Node Package Manager) hosts 2M+ packages. package.json tracks dependencies, devDependencies, scripts, version, and metadata. Semantic versioning: MAJOR.MINOR.PATCH — ^ prefix allows minor/patch updates, ~ allows only patch updates. package-lock.json locks exact versions for reproducible installs. devDependencies (jest, nodemon) are not installed in production with npm install --production. npm scripts: 'start', 'test', 'build', 'dev' run with npm run <name>. npx runs a package without installing globally. dotenv (npm install dotenv) loads .env files into process.env — require('dotenv').config() at top of entry file. Never commit .env files — add to .gitignore.",
        [{type:"yt",url:"https://youtube.com/results?search_query=npm+package.json+tutorial+dotenv+environment+variables+Node.js",label:"npm & dotenv Tutorial"},{type:"web",url:"https://docs.npmjs.com/",label:"npm Official Docs"},{type:"web",url:"https://www.npmjs.com/package/dotenv",label:"dotenv Package"}],
        "Write out a package.json for a production API project. What goes in dependencies vs devDependencies? What npm scripts would you include?",
        "🚀 TASK: (1) Create a .env file with PORT, NODE_ENV, and DB_URL variables and load with dotenv, (2) access process.env.PORT in your Express app and fall back to 3000 if not set, (3) add npm scripts: start (node), dev (nodemon), test (jest --coverage), (4) install nodemon as devDependency and verify it's not in dependencies, (5) use npx to run a package without installing it globally, (6) add a .gitignore that excludes node_modules and .env.",
        "2 hrs"),
      d(13,"Error Handling Patterns",
        "Build robust error handling with custom error classes and global handlers.",
        "Errors in Node.js: operational errors (network, filesystem) are expected and should be handled gracefully; programmer errors (bugs) should crash and be fixed. Custom error classes extend Error: class AppError extends Error { constructor(message, statusCode) { super(message); this.statusCode = statusCode; } }. For async/await, always use try/catch. For unhandled promise rejections, listen with process.on('unhandledRejection', (reason) => {...}). For synchronous throws, process.on('uncaughtException', (err) => {...}) — log and exit, never silently swallow. In Express, centralised error middleware catches errors passed to next(err). Domain-specific error types: ValidationError, NotFoundError, AuthError.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+error+handling+custom+error+classes+async+await",label:"Node.js Error Handling Patterns"},{type:"web",url:"https://nodejs.org/api/errors.html",label:"Node.js Errors Docs"},{type:"web",url:"https://www.joyent.com/node-js/production/design/errors",label:"Joyent: Error Design"}],
        "Design an error hierarchy on paper: AppError → ValidationError, NotFoundError, AuthError. What properties does each need? How does Express's error handler use statusCode?",
        "🚀 TASK: (1) Create AppError, ValidationError, NotFoundError, AuthError classes that extend Error, (2) update Express routes to throw AppError subclasses instead of generic errors, (3) update the global error handler to use err.statusCode and err.isOperational, (4) add process.on('unhandledRejection') and process.on('uncaughtException') handlers that log and exit gracefully, (5) write an asyncHandler(fn) wrapper that wraps async route handlers to forward errors to next() automatically.",
        "2 hrs"),
      d(14,"Review — File Processing CLI",
        "Build a Node.js CLI tool combining streams, fs, async patterns, and error handling.",
        "CLI tools use process.argv to receive command-line arguments. process.argv[0] is 'node', [1] is the script path, [2]+ are user arguments. A well-designed CLI: validates arguments, provides usage instructions on error, streams large file processing to avoid memory issues, reports progress, and handles errors gracefully. Combine readline for line-by-line processing, Transform streams for data manipulation, and async/await for clean control flow. Add a shebang #!/usr/bin/env node at the top to make the file directly executable on Unix.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+CLI+tool+command+line+arguments+streams+tutorial",label:"Node.js CLI Tool Tutorial"},{type:"web",url:"https://nodejs.org/api/process.html#processargv",label:"Node.js process.argv"}],
        "Design your CLI tool's interface on paper: what command-line arguments does it accept? What does it output? What errors can occur and how will you surface them to the user?",
        "🚀 TASK: Build a CLI tool that (1) accepts input file path and output file path as arguments with usage instructions if missing, (2) reads a CSV file line by line using streams without loading it all into memory, (3) transforms data (e.g., filter rows where a column meets a condition, or add a computed column), (4) writes the result to the output file, (5) prints a progress report at the end (rows read, rows written, time taken), (6) handles all errors gracefully with meaningful messages.",
        "2 hrs"),
    ],
    project:{ id:"bw2", title:"File Processing CLI",
      desc:"A Node.js CLI tool that reads large CSV/JSON files using streams, applies a configurable transformation (filter/map/aggregate), and writes results to an output file. Uses readline for line-by-line processing, custom Transform streams, async/await patterns, custom error classes, and process.argv argument parsing." }
  },

  // ── Week 3 ───────────────────────────────────────────────
  { week:3, title:"Databases: SQL & PostgreSQL", timeRange:"12–14 hrs",
    days:[
      d(15,"Relational DB Concepts",
        "Understand the relational model, normalization, and ACID properties.",
        "A relational database organises data into tables (relations) with rows (records) and columns (attributes). Primary key: uniquely identifies each row — must be unique and not null. Foreign key: references a primary key in another table, enforcing referential integrity. Normalisation reduces data redundancy: 1NF (atomic values, no repeating groups), 2NF (no partial dependencies on composite key), 3NF (no transitive dependencies). ACID: Atomicity (transaction fully completes or fully rolls back), Consistency (data always in valid state), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). RDBMS examples: PostgreSQL, MySQL, SQLite. When to use relational: structured data, complex queries, strong consistency requirements.",
        [{type:"yt",url:"https://youtube.com/results?search_query=relational+database+concepts+normalization+ACID+properties+tutorial",label:"Relational DB Concepts"},{type:"web",url:"https://www.postgresql.org/docs/current/intro-whatis.html",label:"PostgreSQL Intro"},{type:"web",url:"https://www.w3schools.com/sql/sql_ref_acid.asp",label:"ACID Properties"}],
        "Design a database schema for a blog on paper: users, posts, comments, tags. Draw entity-relationship diagram. Apply 3NF — where would denormalization make sense for performance?",
        "🚀 TASK: (1) Design a fully normalised schema for an e-commerce system: users, products, categories, orders, order_items — draw the ER diagram, (2) identify all primary and foreign keys, (3) ensure 3NF by checking for transitive dependencies, (4) explain in comments why each relationship is one-to-many or many-to-many, (5) identify which tables need indexes for common queries (user by email, order by userId), (6) write the CREATE TABLE SQL statements with appropriate data types and constraints.",
        "2 hrs"),
      d(16,"SQL Basics",
        "Write foundational SQL queries for all CRUD operations.",
        "SQL (Structured Query Language) is the universal language for relational databases. DDL (Data Definition Language): CREATE TABLE, ALTER TABLE, DROP TABLE. DML (Data Manipulation Language): INSERT INTO, SELECT, UPDATE, DELETE. SELECT anatomy: SELECT columns FROM table WHERE condition ORDER BY column ASC/DESC LIMIT n OFFSET n. Data types: VARCHAR(n), TEXT, INTEGER, BIGINT, DECIMAL(p,s), BOOLEAN, TIMESTAMP, DATE, UUID. Constraints: NOT NULL, UNIQUE, DEFAULT, CHECK. WHERE operators: =, !=, >, <, >=, <=, BETWEEN, IN, LIKE, IS NULL. String functions: UPPER, LOWER, TRIM, CONCAT, LENGTH. Date functions: NOW(), CURRENT_DATE, EXTRACT.",
        [{type:"yt",url:"https://youtube.com/results?search_query=SQL+tutorial+beginners+SELECT+INSERT+UPDATE+DELETE+PostgreSQL",label:"SQL Basics Tutorial"},{type:"web",url:"https://www.postgresql.org/docs/current/sql-commands.html",label:"PostgreSQL SQL Commands"},{type:"web",url:"https://www.w3schools.com/sql/",label:"W3Schools SQL"}],
        "Write SQL for these operations on paper: find all users who signed up in the last 30 days; update a user's email; delete all posts older than 1 year; insert a new order with multiple items.",
        "🚀 TASK: Using psql or a SQL tool on a test database: (1) create a users table (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW()), (2) insert 10 users with different creation dates, (3) write SELECT queries with WHERE, ORDER BY, LIMIT, and OFFSET for pagination, (4) update specific users' emails, (5) write a query finding users whose name starts with 'A' using LIKE, (6) delete users created more than 1 year ago.",
        "2 hrs"),
      d(17,"SQL Joins & Aggregates",
        "Master JOIN operations and aggregate functions for multi-table queries.",
        "INNER JOIN returns rows where the join condition matches in both tables. LEFT JOIN returns all rows from the left table, with nulls for unmatched right rows. RIGHT JOIN is the mirror of LEFT JOIN. FULL OUTER JOIN returns all rows from both tables. Self JOIN joins a table to itself (e.g., employees and their managers). Aggregate functions: COUNT(*), SUM(col), AVG(col), MAX(col), MIN(col). GROUP BY groups rows by a column value — aggregates apply per group. HAVING filters groups (WHERE filters rows before grouping, HAVING filters after). DISTINCT removes duplicate rows. Subqueries: SELECT inside SELECT — can be used in WHERE, FROM (derived tables), or SELECT clause.",
        [{type:"yt",url:"https://youtube.com/results?search_query=SQL+JOIN+types+aggregate+functions+GROUP+BY+tutorial",label:"SQL JOINs & Aggregates"},{type:"web",url:"https://www.postgresql.org/docs/current/queries-table-expressions.html",label:"PostgreSQL JOINs"},{type:"web",url:"https://www.postgresql.org/docs/current/functions-aggregate.html",label:"PostgreSQL Aggregate Functions"}],
        "Draw a Venn diagram of INNER, LEFT, RIGHT, FULL OUTER JOIN. Then on paper, write the query to find all users who have never placed an order (hint: LEFT JOIN + IS NULL).",
        "🚀 TASK: (1) INNER JOIN users and orders to find all orders with user names, (2) LEFT JOIN users and orders to find users who have never ordered, (3) GROUP BY user_id to count orders per user with COUNT(*), (4) use HAVING COUNT(*) > 5 to find users with more than 5 orders, (5) write a subquery to find users whose total spending exceeds the average, (6) use a self JOIN on a categories table to find parent/child category pairs.",
        "2 hrs"),
      d(18,"PostgreSQL Setup & pg Module",
        "Connect Node.js to PostgreSQL using the pg module with connection pooling and parameterized queries.",
        "PostgreSQL is the most capable open-source relational database. Install locally or use Docker. Connect with the pg npm package. Pool is preferred over Client — it manages a pool of connections, reusing them for efficiency. const pool = new Pool({ host, port, database, user, password, max: 10 }) — max sets pool size. pool.query(sql, [params]) returns a Promise with { rows, rowCount }. CRITICAL: always use parameterized queries ($1, $2, $3...) — NEVER string interpolation — to prevent SQL injection. pg automatically handles type conversion between JavaScript and PostgreSQL types. Use pool.connect() for transactions where you need a dedicated connection.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+PostgreSQL+pg+module+connection+pool+tutorial",label:"Node.js + PostgreSQL Tutorial"},{type:"web",url:"https://node-postgres.com/",label:"node-postgres (pg) Docs"},{type:"web",url:"https://www.postgresql.org/docs/current/tutorial-start.html",label:"PostgreSQL Getting Started"}],
        "Why are parameterized queries essential? Write an example of a SQL injection attack using string interpolation, then show how parameterized queries prevent it.",
        "🚀 TASK: (1) Install PostgreSQL and create a database, (2) install pg and create a pool.js module that exports a configured Pool, (3) write a db.js helper with query(sql, params) that wraps pool.query and logs errors, (4) rewrite your in-memory users API to use real PostgreSQL queries, (5) use parameterized queries for ALL queries — never string template literals, (6) handle db errors gracefully and return appropriate HTTP status codes.",
        "2.5 hrs"),
      d(19,"Database Design",
        "Design production-quality schemas with ER diagrams, indexes, and foreign key constraints.",
        "Entity-Relationship (ER) diagrams show entities (tables), attributes (columns), and relationships. One-to-many: a user has many posts — store userId as foreign key in posts. Many-to-many: posts have many tags and tags belong to many posts — requires a junction table (post_tags: post_id, tag_id). Indexes speed up reads at the cost of write overhead and storage. CREATE INDEX idx_users_email ON users(email) — makes WHERE email = '...' fast. EXPLAIN ANALYZE shows query execution plan and actual timing. Composite indexes: INDEX ON orders(user_id, created_at) — useful for queries filtering by user AND sorting by date. Partial indexes: INDEX ON users(email) WHERE active = true — smaller, faster index.",
        [{type:"yt",url:"https://youtube.com/results?search_query=database+design+ER+diagram+indexes+PostgreSQL+tutorial",label:"Database Design & Indexing"},{type:"web",url:"https://www.postgresql.org/docs/current/indexes.html",label:"PostgreSQL Indexes"},{type:"web",url:"https://www.postgresql.org/docs/current/using-explain.html",label:"PostgreSQL EXPLAIN ANALYZE"}],
        "Design the blog database schema fully: draw ER diagram, identify all relationships, decide which columns need indexes. Use EXPLAIN ANALYZE on a query without an index, add the index, and compare.",
        "🚀 TASK: (1) Create a fully normalised blog schema: users, posts, comments, tags, post_tags junction table with all foreign keys and constraints, (2) add appropriate indexes (users.email, posts.user_id, posts.created_at), (3) run EXPLAIN ANALYZE on a JOIN query before and after adding an index to see the difference, (4) add a many-to-many relationship between posts and tags using a junction table, (5) write a query that retrieves posts with their tags using a JOIN on the junction table.",
        "2 hrs"),
      d(20,"Migrations & Seeds",
        "Manage database schema changes with migrations and populate test data with seeds.",
        "Migrations are version-controlled SQL files that evolve the database schema. Each migration has an up (apply change) and down (rollback). This allows teams to track schema changes in Git, apply them consistently across environments (dev, staging, production), and roll back if needed. node-pg-migrate is a popular migration library for PostgreSQL with Node.js. Alternatively, maintain raw numbered SQL files: 001_create_users.sql, 002_add_posts.sql. Seeds populate the database with initial or test data — users, sample products, etc. In production: only run seeds for lookup tables (categories, roles); in development/test: full seed data. Never seed with real user data.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+database+migrations+node-pg-migrate+tutorial",label:"Database Migrations Tutorial"},{type:"web",url:"https://github.com/salsita/node-pg-migrate",label:"node-pg-migrate Docs"},{type:"web",url:"https://www.postgresql.org/docs/current/ddl-alter.html",label:"PostgreSQL ALTER TABLE"}],
        "Plan a series of migrations for your blog: migration 1 creates users, migration 2 creates posts, migration 3 adds tags system, migration 4 adds a 'published' column to posts. Write the up and down SQL for each.",
        "🚀 TASK: (1) Install node-pg-migrate and configure database-url in package.json scripts, (2) create migration for users table with up and down, (3) create migration for posts table with foreign key to users, (4) create migration for comments with foreign keys to both users and posts, (5) write a seeds/seed.js script that inserts 5 test users and 10 posts using your db.js helper, (6) add npm scripts: 'db:migrate', 'db:rollback', 'db:seed'.",
        "2 hrs"),
      d(21,"Review — Express + PostgreSQL API",
        "Wire Express routes to real PostgreSQL queries, completing the full backend stack.",
        "Connecting the web layer (Express) to the data layer (PostgreSQL) is the core pattern of backend development. Organise code using MVC or layered architecture: routes define HTTP endpoints, controllers contain request/response logic, services contain business logic, and repositories/models contain database queries. This separation makes code testable and maintainable. Use transactions for operations that span multiple queries (e.g., creating an order with multiple items — either all rows insert or none). Always close the pg pool on process exit. Configure pool size based on PostgreSQL's max_connections setting.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Express+PostgreSQL+REST+API+MVC+architecture+tutorial",label:"Express + PostgreSQL MVC API"},{type:"web",url:"https://node-postgres.com/guides/project-structure",label:"pg Project Structure Guide"}],
        "Draw the layered architecture: routes → controllers → services → repositories → pg Pool → PostgreSQL. What logic belongs in each layer? Where do transactions go?",
        "🚀 TASK: Build a blog API with PostgreSQL backend: (1) layered architecture (routes/controllers/services/repositories), (2) GET /api/v1/posts with pagination, returning posts with author name via JOIN, (3) POST /api/v1/posts creating post and its initial tags in a transaction, (4) DELETE /api/v1/posts/:id that cascades correctly with foreign keys, (5) GET /api/v1/users/:id/posts returning all posts for a user, (6) proper error handling for DB errors vs validation errors.",
        "2 hrs"),
    ],
    project:{ id:"bw3", title:"Blog API with PostgreSQL",
      desc:"A fully functional blog REST API backed by PostgreSQL. Features: users/posts/comments/tags tables with migrations, full CRUD via Express routes in MVC architecture, parameterized queries preventing SQL injection, JOIN-based queries for nested data, transactions for multi-step operations, indexes for performance, seed data, and comprehensive error handling." }
  },

  // ── Week 4 ───────────────────────────────────────────────
  { week:4, title:"Authentication & Security", timeRange:"12–14 hrs",
    days:[
      d(22,"Hashing & Passwords",
        "Securely hash and verify passwords using bcrypt.",
        "Never store plaintext passwords. bcrypt is the gold standard for password hashing — it's slow by design, making brute-force attacks expensive. bcrypt generates a unique random salt per password and embeds it in the hash, defeating rainbow table attacks. The cost factor (salt rounds) controls computational work — 12 is a good default in 2024. bcrypt.hash(plaintext, saltRounds) returns a Promise resolving to the hash string. bcrypt.compare(plaintext, hash) returns true/false — use this for login verification. Never use MD5 or SHA for passwords — they're too fast. Argon2 is an alternative, winner of the Password Hashing Competition. npm install bcrypt.",
        [{type:"yt",url:"https://youtube.com/results?search_query=bcrypt+password+hashing+Node.js+tutorial+salt+rounds",label:"bcrypt Password Hashing Tutorial"},{type:"web",url:"https://www.npmjs.com/package/bcrypt",label:"bcrypt npm Package"},{type:"web",url:"https://auth0.com/blog/hashing-passwords-one-way-road-to-security/",label:"Auth0: Hashing Passwords"}],
        "Explain why bcrypt's slowness is a feature. What is a rainbow table? Draw how salt prevents it. Why is bcrypt.compare safer than comparing hashes manually?",
        "🚀 TASK: (1) Install bcrypt and hash a test password with saltRounds=12, (2) write hashPassword(plain) and verifyPassword(plain, hash) helper functions, (3) add a POST /api/v1/auth/register route that hashes the password before saving to DB, (4) add a POST /api/v1/auth/login route that retrieves user by email and uses bcrypt.compare to verify password, (5) never return the password hash in any API response — use SELECT id, name, email (exclude password), (6) test timing: verify that hashing takes ~100-200ms at saltRounds=12.",
        "2 hrs"),
      d(23,"JWT Authentication",
        "Implement stateless authentication using JSON Web Tokens.",
        "JWT (JSON Web Token) is a compact, URL-safe token format: header.payload.signature, each base64url-encoded. Header: {alg:'HS256', typ:'JWT'}. Payload (claims): {sub: userId, iat: issuedAt, exp: expiry}. Signature: HMACSHA256(base64(header)+'.'+base64(payload), secret). The server signs tokens with a secret; clients send them in Authorization: Bearer <token> header. jwt.sign(payload, secret, options) creates a token. jwt.verify(token, secret) decodes and validates — throws if expired or tampered. Access tokens should be short-lived (15min–1hr). Refresh tokens are long-lived (7–30 days) and used to obtain new access tokens. Store refresh tokens in DB so they can be revoked. npm install jsonwebtoken.",
        [{type:"yt",url:"https://youtube.com/results?search_query=JWT+authentication+Node.js+Express+access+refresh+token+tutorial",label:"JWT Auth Tutorial"},{type:"web",url:"https://jwt.io/",label:"JWT.io Debugger"},{type:"web",url:"https://www.npmjs.com/package/jsonwebtoken",label:"jsonwebtoken Package"}],
        "Decode a JWT by hand: split on '.', base64url-decode header and payload. Why can't you forge the signature without the secret? Why should JWTs be kept short-lived?",
        "🚀 TASK: (1) Install jsonwebtoken and write generateTokens(userId) returning {accessToken, refreshToken}, (2) sign access token with 15m expiry and refresh token with 7d expiry using different secrets, (3) update /auth/login to return both tokens on success, (4) write authenticateToken middleware that extracts Bearer token from Authorization header, verifies it, and attaches req.user, (5) add POST /auth/refresh that verifies refresh token and issues new access token, (6) protect a route with authenticateToken middleware and test with expired/invalid tokens.",
        "2 hrs"),
      d(24,"Auth Middleware & Role-Based Access",
        "Protect routes and implement role-based access control (RBAC).",
        "Middleware-based auth is the Express pattern: authenticateToken runs before the route handler, attaches user info to req.user, or responds 401 if invalid. Role-based access control (RBAC) restricts routes based on user roles (user, admin, moderator). Implement an authorize(...roles) middleware factory that checks req.user.role against the allowed roles. Route protection: app.get('/admin/dashboard', authenticateToken, authorize('admin'), handler). Store role in JWT payload and/or fetch from DB for the most up-to-date value. For sensitive operations, always fetch fresh user data from DB to check role — JWT payload can be stale. Return 401 for unauthenticated, 403 for authenticated but unauthorized.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Express.js+JWT+middleware+role+based+access+control+RBAC",label:"Express Auth Middleware & RBAC"},{type:"web",url:"https://expressjs.com/en/guide/using-middleware.html",label:"Express Middleware Guide"}],
        "Design the RBAC system on paper: what roles exist, what actions can each role perform? Map out which routes need which roles.",
        "🚀 TASK: (1) Add a role column to users table (default 'user', can be 'admin'/'moderator'), (2) include role in JWT payload when generating tokens, (3) write authorize(...roles) middleware that checks req.user.role and responds 403 if not included, (4) create an admin-only DELETE /api/v1/admin/users/:id route, (5) create a moderator+admin DELETE /api/v1/posts/:id route, (6) test all combinations: no token (401), wrong role (403), correct role (200).",
        "2 hrs"),
      d(25,"Sessions & Cookies",
        "Implement session-based authentication as an alternative to JWT.",
        "Session-based auth: server creates a session object (userId, metadata) stored in memory or a store (Redis, DB), and sends a session ID to the client as a cookie. On each request, the server looks up the session by ID. express-session middleware handles this automatically. Cookie options: httpOnly prevents JavaScript access (XSS protection), secure ensures HTTPS-only, sameSite='strict' prevents CSRF in most cases, maxAge sets expiry. Session stores: MemoryStore (default, not for production), connect-redis, connect-pg-simple. CSRF (Cross-Site Request Forgery) attacks trick the browser into sending authenticated requests — use csurf middleware or double-submit cookie pattern. Sessions vs JWT: sessions are revocable, JWTs are stateless.",
        [{type:"yt",url:"https://youtube.com/results?search_query=express-session+cookies+CSRF+protection+Node.js+tutorial",label:"Sessions & Cookies Tutorial"},{type:"web",url:"https://www.npmjs.com/package/express-session",label:"express-session Package"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies",label:"MDN: HTTP Cookies"}],
        "Compare sessions vs JWT: fill a table with pros/cons for stateless vs stateful, scalability, revocation, storage. When would you choose each?",
        "🚀 TASK: (1) Install express-session and configure with a strong secret and httpOnly+secure+sameSite cookies, (2) implement POST /auth/session/login that creates a session with userId after verifying credentials, (3) implement POST /auth/session/logout that destroys the session, (4) write a requireSession middleware that checks req.session.userId, (5) protect a route with requireSession, (6) explain in a README comment why you'd use sessions for a traditional web app but JWT for a mobile API.",
        "2 hrs"),
      d(26,"Input Validation & Sanitization",
        "Validate and sanitize all user input to prevent injection attacks and ensure data integrity.",
        "Never trust user input. Validation checks that data meets requirements (required, type, format, range). Sanitization transforms input to be safe (trim whitespace, escape HTML). Three popular libraries: express-validator (middleware-based), joi (schema-based, returns validated object), zod (TypeScript-first, type inference). With express-validator: body('email').isEmail().normalizeEmail(), body('age').isInt({min:0,max:120}), validationResult(req) to check errors. With joi: const schema = Joi.object({ email: Joi.string().email().required() }), const { error, value } = schema.validate(req.body). Validate all inputs: body, params, query, headers. Return 422 Unprocessable Entity for validation failures with descriptive messages.",
        [{type:"yt",url:"https://youtube.com/results?search_query=express-validator+joi+zod+input+validation+Node.js+tutorial",label:"Input Validation Tutorial"},{type:"web",url:"https://express-validator.github.io/docs/",label:"express-validator Docs"},{type:"web",url:"https://joi.dev/api/",label:"Joi API Docs"}],
        "Write validation schemas for: user registration (name, email, password with strength rules), post creation (title max 200 chars, body required), and product creation (name, price positive number, category from enum).",
        "🚀 TASK: (1) Install express-validator and add validation to POST /auth/register: email format, password min 8 chars with number and special char, name required non-empty, (2) return 422 with array of error messages on validation failure, (3) install joi and rewrite the same validation as a Joi schema, (4) write a validate(schema) middleware factory that wraps Joi validation, (5) add sanitization: trim whitespace, normalise email to lowercase, (6) test with edge cases: empty body, extra unexpected fields, SQL injection strings as input.",
        "2 hrs"),
      d(27,"Security Headers & Rate Limiting",
        "Harden your API with security headers, rate limiting, and safe secret management.",
        "helmet npm package sets security headers automatically: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security (HSTS), X-XSS-Protection. express-rate-limit: const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 }) — 100 requests per 15 minutes per IP. Apply globally with app.use(limiter) or specifically to auth routes. CORS should be configured explicitly: cors({ origin: ['https://myapp.com'], credentials: true }) — never use * with credentials. Secrets: use environment variables, never hardcode. HTTPS in production: use certificates (Let's Encrypt), redirect HTTP → HTTPS. SQL/NoSQL injection: parameterized queries (already done). npm audit to check for known vulnerabilities.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+API+security+helmet+rate+limiting+CORS+tutorial",label:"API Security Best Practices"},{type:"web",url:"https://www.npmjs.com/package/helmet",label:"helmet Package"},{type:"web",url:"https://www.npmjs.com/package/express-rate-limit",label:"express-rate-limit Package"}],
        "Run a security audit mentally on your API: list all potential attack vectors (XSS, CSRF, injection, brute force, CORS misconfiguration). Map each to a mitigation.",
        "🚀 TASK: (1) Install helmet and add app.use(helmet()) — verify headers in browser DevTools, (2) install express-rate-limit and apply strict limit (5 req/15min) to /auth/login and /auth/register, (3) apply general limit (100 req/15min) to all other routes, (4) configure cors() with explicit origin allowlist, (5) run npm audit and fix any high-severity vulnerabilities, (6) add an /api/v1/health endpoint that returns status/uptime without authentication.",
        "2 hrs"),
      d(28,"Week 4 Review — Full Auth System",
        "Integrate all authentication and security concepts into a complete auth API.",
        "A production-ready auth system combines: bcrypt password hashing, JWT access + refresh tokens, role-based access control, input validation, security headers, rate limiting, and proper error responses. Refresh token rotation: when a client uses a refresh token to get a new access token, issue a new refresh token and invalidate the old one (prevents token theft). Store refresh tokens in the DB with an 'isValid' flag. Token blacklisting for logout: add the access token JTI (JWT ID) to a blacklist (Redis) until it expires. CSRF tokens for cookie-based flows.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+JWT+refresh+token+rotation+complete+auth+system+tutorial",label:"Complete Auth System Tutorial"},{type:"web",url:"https://hasura.io/blog/best-practices-of-using-jwt-with-graphql",label:"JWT Best Practices"}],
        "Design the full auth flow on paper: register → login → access protected route → access token expires → use refresh token → logout. Include all error scenarios.",
        "🚀 TASK: Build a complete auth system: (1) POST /auth/register with validation, bcrypt, return user (no password), (2) POST /auth/login returning access + refresh token pair with tokens stored in httpOnly cookies, (3) POST /auth/refresh implementing token rotation (new refresh + invalidate old), (4) POST /auth/logout invalidating refresh token in DB, (5) GET /auth/me returning current user from req.user (requires authenticateToken), (6) all routes protected with rate limiting, helmet, validation, and proper error responses.",
        "2 hrs"),
    ],
    project:{ id:"bw4", title:"Auth API",
      desc:"A production-ready authentication REST API with bcrypt password hashing, JWT access + refresh token rotation, role-based access control (user/admin), session support, input validation (Joi), security headers (helmet), rate limiting, CSRF protection, and complete test coverage via Postman collection." }
  },


// ============================================================
// backend-steps-p2.js — BEGINNER WEEKS 5–8
// Continuation of STRUCTURED_BACKEND_ROADMAP beginner section
// Paste after backend-steps-p1.js (before intermediate block)
// ============================================================

  // ── Week 5 ───────────────────────────────────────────────
  { week:5, title:"MongoDB & Mongoose", timeRange:"10–12 hrs",
    days:[
      d(29,"NoSQL Concepts & MongoDB Intro",
        "Understand the document model and when to use NoSQL over relational databases.",
        "NoSQL (Not Only SQL) databases store data as documents (MongoDB), key-value pairs (Redis), wide columns (Cassandra), or graphs (Neo4j). MongoDB stores data as BSON (Binary JSON) documents in collections — analogous to rows in tables, but schema-less. Each document has a unique _id field (ObjectId by default). Documents in a collection can have different shapes. CAP theorem: a distributed system can guarantee at most two of Consistency, Availability, Partition Tolerance. MongoDB prioritises AP. Use NoSQL when: schema changes frequently, data is hierarchical/nested, horizontal scaling is needed, or speed of reads matters more than ACID guarantees. Use SQL when: data is highly relational, transactions are critical, or you need strong consistency.",
        [{type:"yt",url:"https://youtube.com/results?search_query=MongoDB+vs+SQL+NoSQL+concepts+explained+tutorial",label:"NoSQL vs SQL Explained"},{type:"web",url:"https://www.mongodb.com/docs/manual/introduction/",label:"MongoDB Introduction"},{type:"web",url:"https://www.mongodb.com/nosql-explained",label:"MongoDB: What is NoSQL?"}],
        "Draw a comparison table: SQL (table, row, column, schema, JOIN) vs MongoDB (collection, document, field, flexible, $lookup). Sketch a blog post document with nested comments array.",
        "🚀 TASK: (1) Install MongoDB locally or sign up for MongoDB Atlas free tier, (2) connect with mongosh and create a database called 'learningdb', (3) insert 5 user documents with different fields to see schema flexibility, (4) explain in a README when you'd use MongoDB vs PostgreSQL for three different app types, (5) list 3 real-world apps that use MongoDB and 3 that use PostgreSQL and explain why each chose its DB.",
        "1.5 hrs"),
      d(30,"MongoDB CRUD Operations",
        "Master all MongoDB CRUD operations and query operators.",
        "MongoDB CRUD via the Node.js driver or mongosh: insertOne({ field: value }) / insertMany([...]). find(filter) returns a cursor — iterate with .toArray() or .forEach(). findOne(filter) returns first match or null. Filters use operators: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $exists, $regex. updateOne(filter, {$set: {field: value}}) modifies matched fields. $push appends to array, $pull removes from array, $inc increments a number, $unset removes a field. deleteOne(filter) / deleteMany(filter). findOneAndUpdate returns the document before or after update. Projection: find({}, {name:1, email:1, _id:0}) returns only specified fields. sort({createdAt:-1}), limit(10), skip(20) for pagination.",
        [{type:"yt",url:"https://youtube.com/results?search_query=MongoDB+CRUD+operations+tutorial+Node.js+driver",label:"MongoDB CRUD Tutorial"},{type:"web",url:"https://www.mongodb.com/docs/manual/crud/",label:"MongoDB CRUD Operations"},{type:"web",url:"https://www.mongodb.com/docs/manual/reference/operator/query/",label:"MongoDB Query Operators"}],
        "Practice mentally: how would you query all posts where likes > 100 AND category is 'tech' OR 'science'? How would you add a tag to every post where author is 'alice'?",
        "🚀 TASK: (1) Insert 10 product documents with name, price, category, stock fields, (2) find all products where price is between 10 and 50 using $gte/$lte, (3) find all products in category 'electronics' OR 'books' using $in, (4) update stock of one product using $inc, push a 'review' object into a reviews array using $push, (5) delete all products where stock equals 0, (6) write a paginated query: skip 5 documents, limit 5, sort by price descending.",
        "2 hrs"),
      d(31,"Mongoose — Schemas, Models & Validation",
        "Define structured schemas with Mongoose and leverage built-in validation.",
        "Mongoose is an ODM (Object Document Mapper) for MongoDB in Node.js. A Schema defines the shape: new mongoose.Schema({ name: { type: String, required: true, trim: true }, age: { type: Number, min: 0 } }). Schema types: String, Number, Boolean, Date, Buffer, ObjectId, Array, Map, Mixed. Model: const User = mongoose.model('User', userSchema) — maps to a 'users' collection. Built-in validators: required, min, max, minlength, maxlength, enum, match (regex). Custom validators: validate: { validator: fn, message: 'msg' }. Virtuals: computed properties not stored in DB. Pre/post hooks: userSchema.pre('save', async function() { this.password = await bcrypt.hash(...) }). Instance methods: userSchema.methods.comparePassword = function(...). Static methods: userSchema.statics.findByEmail = function(...).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Mongoose+schema+model+validation+Node.js+tutorial+2024",label:"Mongoose Complete Tutorial"},{type:"web",url:"https://mongoosejs.com/docs/guide.html",label:"Mongoose Schema Guide"},{type:"web",url:"https://mongoosejs.com/docs/validation.html",label:"Mongoose Validation Docs"}],
        "Design a Mongoose schema for a social media post: author (ref to User), title, body, tags array, likes count, isPublished, createdAt. What validators would you add to each field?",
        "🚀 TASK: (1) Install mongoose and connect to MongoDB, (2) create a User schema with name (required, trim), email (required, unique, lowercase), password (required, minlength 8), role (enum ['user','admin'], default 'user'), createdAt, (3) add a pre-save hook that hashes the password with bcrypt if modified, (4) add an instance method comparePassword(candidatePw), (5) add a static method findByEmail(email), (6) create and save 3 users, then query using your static method.",
        "2.5 hrs"),
      d(32,"Mongoose Advanced — Populate, Aggregation & Indexes",
        "Master document references, aggregation pipelines, and performance indexing in Mongoose.",
        "References (population): store ObjectId references between collections. authorSchema has posts: [{ type: ObjectId, ref: 'Post' }] or post has author: { type: ObjectId, ref: 'User' }. Post.find().populate('author', 'name email') — Mongoose performs a second query to fetch referenced docs. lean() returns plain JS objects instead of Mongoose documents — faster, use when you don't need methods. Aggregation pipeline: Model.aggregate([{ $match: { isPublished: true } }, { $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]). $lookup performs a left join: { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'author' } }. Indexes: postSchema.index({ createdAt: -1 }), compound index: postSchema.index({ author: 1, createdAt: -1 }). Use explain() to verify index usage.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Mongoose+populate+aggregation+pipeline+indexes+tutorial",label:"Mongoose Advanced Tutorial"},{type:"web",url:"https://mongoosejs.com/docs/populate.html",label:"Mongoose Populate Docs"},{type:"web",url:"https://www.mongodb.com/docs/manual/aggregation/",label:"MongoDB Aggregation Pipeline"}],
        "Trace a populate query: Post.find().populate('author'). How many DB queries does this make? How does $lookup in aggregation differ? When would you use each?",
        "🚀 TASK: (1) Create Post schema with author (ObjectId ref User), title, body, tags array, likesCount, createdAt, (2) create 5 posts assigned to different users, (3) use populate to fetch posts with author name and email, (4) write an aggregation pipeline that counts posts per author and returns top 3, (5) add compound index on {author, createdAt} and use .explain('executionStats') to verify it's used in a query, (6) compare query time with lean() vs without.",
        "2 hrs"),
      d(33,"File Uploads with Multer",
        "Handle multipart file uploads, validate file types, and manage storage.",
        "HTTP file uploads use Content-Type: multipart/form-data. Multer is Express middleware for handling multipart data: npm install multer. const upload = multer({ dest: 'uploads/' }) — stores files in local directory. For memory storage: multer({ storage: multer.memoryStorage() }) — file available at req.file.buffer. File object: req.file.originalname, req.file.mimetype, req.file.size, req.file.buffer. Multiple files: upload.array('photos', 5) → req.files. File type validation via fileFilter: (req, file, cb) => { if (file.mimetype.startsWith('image/')) cb(null, true) else cb(new Error('Only images')) }. Size limits: multer({ limits: { fileSize: 5 * 1024 * 1024 } }). For production, upload to cloud storage (AWS S3, Cloudinary) instead of local disk. Cloudinary: npm install cloudinary, upload buffer via cloudinary.uploader.upload_stream.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Multer+file+upload+Node.js+Express+Cloudinary+tutorial",label:"Multer File Upload Tutorial"},{type:"web",url:"https://www.npmjs.com/package/multer",label:"Multer Package Docs"},{type:"web",url:"https://cloudinary.com/documentation/node_integration",label:"Cloudinary Node.js Docs"}],
        "Design the file upload flow: client sends multipart form → multer parses → validate type/size → store locally or upload to cloud → save URL to DB. What errors can occur at each step?",
        "🚀 TASK: (1) Install multer and add POST /api/v1/upload that accepts a single image file, (2) validate that file is image/* and under 2MB, returning 400 if invalid, (3) save the file to an /uploads directory and return the file path in the response, (4) add avatar field to User schema and update it on upload, (5) serve uploaded files statically with express.static(), (6) write an endpoint that accepts up to 5 files and returns an array of uploaded filenames.",
        "2 hrs"),
      d(34,"Email Sending with Nodemailer",
        "Send transactional emails from Node.js using Nodemailer with HTML templates.",
        "Nodemailer is the standard Node.js email library: npm install nodemailer. Create a transporter with SMTP config: nodemailer.createTransport({ host: 'smtp.gmail.com', port: 587, secure: false, auth: { user, pass } }). For development, use Mailtrap (sandbox) or Ethereal (fake SMTP). transporter.sendMail({ from, to, subject, html, text }) returns a promise with messageId. HTML emails: inline CSS only (many email clients strip <style> tags), use table layout for compatibility. Template approach: store HTML templates as strings with {{placeholder}} syntax, use replace() or a library like handlebars. Email types: welcome email on registration, password reset link (include a signed token valid for 1 hour), order confirmation, notification digest. Queue concept: sending email inline in request handler blocks the response — use a queue (Bull) to send async. Always handle errors: catch SMTP failures and log, don't expose SMTP errors to clients.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Nodemailer+Node.js+email+template+tutorial+Mailtrap",label:"Nodemailer Tutorial"},{type:"web",url:"https://nodemailer.com/about/",label:"Nodemailer Official Docs"},{type:"web",url:"https://mailtrap.io/",label:"Mailtrap Email Testing"}],
        "Design the password reset flow: user requests reset → generate signed token → store hash in DB with expiry → send email with link → user clicks → verify token → allow password change → invalidate token.",
        "🚀 TASK: (1) Install nodemailer and set up a Mailtrap transporter in development, (2) write a sendEmail(to, subject, html) helper function, (3) implement POST /auth/forgot-password: find user by email, generate a random token, store its SHA-256 hash in DB with 1hr expiry, send reset email with link, (4) implement POST /auth/reset-password: find user by hashed token, verify not expired, update password, clear reset fields, (5) create a welcome email HTML template with the user's name, (6) trigger the welcome email after successful registration.",
        "2 hrs"),
      d(35,"Week 5 Review — Social Post API",
        "Build a content API combining MongoDB, Mongoose, file uploads, and email.",
        "This review project integrates Weeks 4–5: authentication system from Week 4 plus MongoDB/Mongoose data layer. Replace the PostgreSQL users/posts from previous weeks with MongoDB collections. Add avatar upload on profile update. Send welcome email on registration. Key integration points: JWT auth middleware works with Mongoose user lookup (req.user populated from DB). File uploads tied to user profile. Posts reference users via ObjectId. Pagination via skip/limit. The goal is to have all these pieces working together as a coherent API.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+Express+MongoDB+Mongoose+REST+API+complete+project",label:"Express + MongoDB API Project"},{type:"web",url:"https://mongoosejs.com/docs/guide.html",label:"Mongoose Guide"}],
        "Plan the schema relationships: User → Posts (1:many), Post → Comments (1:many embedded or referenced). Which data should be embedded vs referenced? Consider query patterns.",
        "🚀 TASK: Build a Social Post API with (1) User model (Mongoose) with avatar upload on PUT /api/v1/profile, (2) Post model with title, body, tags, author ref, likesCount — full CRUD with auth, (3) Comment model embedded in posts or separate collection — POST /api/v1/posts/:id/comments, (4) GET /api/v1/posts with pagination (page/limit query params) and populate author name, (5) POST /api/v1/posts/:id/like to increment likesCount, (6) send welcome email on register, (7) protect create/update/delete routes with JWT auth middleware.",
        "2 hrs"),
    ],
    project:{ id:"bw5", title:"Social Post API",
      desc:"A MongoDB-backed REST API with Mongoose schemas for Users, Posts, and Comments. Features: JWT authentication, avatar file upload (Multer), welcome and password-reset emails (Nodemailer+Mailtrap), nested comment creation, post likes, pagination with populate, and compound indexes for query performance." }
  },

  // ── Week 6 ───────────────────────────────────────────────
  { week:6, title:"Caching, Queues & Real-Time", timeRange:"12–14 hrs",
    days:[
      d(36,"Redis Basics",
        "Learn Redis data structures and how to use Redis as a key-value store from Node.js.",
        "Redis is an in-memory data store used for caching, sessions, queues, and pub/sub. Key commands: SET key value, GET key, DEL key, EXISTS key, EXPIRE key seconds, TTL key (time to live). Data structures: Strings (SET/GET), Lists (LPUSH/RPUSH/LRANGE/LPOP), Hashes (HSET/HGET/HGETALL), Sets (SADD/SMEMBERS/SISMEMBER), Sorted Sets (ZADD/ZRANGE/ZRANGEBYSCORE). npm install redis (v4) — createClient({ url: 'redis://localhost:6379' }), await client.connect(). client.set('key', 'value', { EX: 3600 }) sets with 60min expiry. client.get('key') returns null if not found. Use client.hSet / hGet for hash fields. Keys should be namespaced: 'user:123:profile', 'session:abc'. Redis is single-threaded and extremely fast: sub-millisecond latency for most operations.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Redis+tutorial+for+beginners+Node.js+data+structures",label:"Redis Basics Tutorial"},{type:"web",url:"https://redis.io/docs/",label:"Redis Official Docs"},{type:"web",url:"https://www.npmjs.com/package/redis",label:"redis npm Package"}],
        "Draw a cheat sheet: for each Redis data structure (string, list, hash, set, sorted set) write 3 key commands and one real-world use case.",
        "🚀 TASK: (1) Install Redis locally or use Redis Cloud free tier, install npm redis package and connect, (2) use SET/GET to store and retrieve a simple counter, use EXPIRE and TTL, (3) use LPUSH/LRANGE to maintain a list of recent activity events (keep last 10), (4) use HSET/HGETALL to store user session data (userId, role, lastSeen), (5) use ZADD/ZRANGEBYSCORE to maintain a leaderboard with scores, retrieve top 5, (6) use SET with EX to cache an API response for 5 minutes and verify it expires.",
        "2 hrs"),
      d(37,"Caching Strategies",
        "Implement cache-aside and other caching patterns to reduce database load.",
        "Cache-aside (lazy loading): check cache first → if miss, query DB → store result in cache → return data. Write-through: write to cache and DB simultaneously. Write-behind: write to cache immediately, persist to DB asynchronously. TTL (Time To Live): balance freshness vs performance — short TTL for frequently changing data, long TTL for static data. Cache invalidation: hardest problem in CS. Strategies: TTL expiry, event-driven invalidation (delete cache on update), cache tags. Caching API responses: create cacheMiddleware(ttlSeconds) Express middleware that uses req.url as cache key, returns cached response if hit, otherwise calls next() and caches the response. Redis for sessions: configure express-session with connect-redis store so sessions survive restarts. Cache key design: 'api:/users?page=1', 'user:42:profile'. Monitor cache hit/miss ratio for effectiveness.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Redis+caching+strategies+cache-aside+Node.js+Express+tutorial",label:"Redis Caching Patterns"},{type:"web",url:"https://redis.io/docs/manual/patterns/",label:"Redis Patterns"},{type:"web",url:"https://www.npmjs.com/package/connect-redis",label:"connect-redis Package"}],
        "Trace the cache-aside pattern for GET /api/v1/products?page=1: first request (cold cache) vs second request (warm cache). How many DB queries happen in each case? What happens when a product is updated?",
        "🚀 TASK: (1) Write a cacheMiddleware(ttl) Express middleware that caches GET responses in Redis by URL, (2) apply it to GET /api/v1/products with 5min TTL and verify second request is faster, (3) invalidate the products cache when a product is created/updated/deleted, (4) install connect-redis and configure express-session to use Redis as session store, (5) store user preferences in a Redis hash with 30-day TTL, (6) implement a rate limiter using Redis INCR and EXPIRE to track requests per IP.",
        "2 hrs"),
      d(38,"WebSockets & Socket.io",
        "Build real-time bidirectional communication between server and clients.",
        "HTTP is request-response — the client always initiates. WebSockets provide a persistent bidirectional connection. The WebSocket handshake is an HTTP upgrade request. Once connected, both sides can send messages at any time. Socket.io is a library wrapping WebSockets with fallbacks (long-polling) and additional features: rooms, namespaces, auto-reconnect. Server: const io = new Server(httpServer, { cors: { origin: '*' } }). io.on('connection', socket => { ... }) fires for each new client. socket.emit('event', data) sends to that client. io.emit('event', data) broadcasts to all. socket.to('roomName').emit(...) sends to room members except sender. io.to('roomName').emit(...) sends to all in room including sender. socket.join('room') / socket.leave('room'). socket.on('disconnect', ...) cleanup. Client: io('http://localhost:3000') connects.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Socket.io+tutorial+Node.js+real-time+chat+app+2024",label:"Socket.io Complete Tutorial"},{type:"web",url:"https://socket.io/docs/v4/",label:"Socket.io Docs"},{type:"web",url:"https://socket.io/docs/v4/rooms/",label:"Socket.io Rooms"}],
        "Design a chat app event flow on paper: user joins room → server confirms → user sends message → server broadcasts to room → other users receive. List every socket.emit and socket.on needed on both sides.",
        "🚀 TASK: (1) Install socket.io, create an http server and attach Socket.io to it, (2) handle connection event, log socket.id for each new client, handle disconnect, (3) implement a chat room: socket.on('join-room', roomId) calls socket.join(roomId), (4) implement socket.on('message', {roomId, text}) that broadcasts to the room with sender info and timestamp, (5) implement socket.on('typing', roomId) that emits 'user-typing' to others in the room, (6) build a minimal HTML client page (no framework) that connects, joins a room, sends messages, and displays received messages.",
        "2.5 hrs"),
      d(39,"Message Queues with Bull",
        "Implement background job processing with Bull queues backed by Redis.",
        "A message queue decouples producers (who create jobs) from consumers (workers who process them). Bull is a Node.js queue library backed by Redis. npm install bull. const emailQueue = new Bull('email', { redis: { host, port } }). Add job: emailQueue.add({ to, subject, html }, { attempts: 3, backoff: { type: 'exponential', delay: 2000 } }). Process jobs: emailQueue.process(async (job) => { await sendEmail(job.data) }). Bull handles retries, delays, priorities, and concurrency. Queue events: queue.on('completed', job => ...), queue.on('failed', (job, err) => ...). Delayed jobs: queue.add(data, { delay: 60000 }) runs after 60 seconds. Repeatable jobs: queue.add(data, { repeat: { cron: '0 9 * * *' } }). Bull Dashboard: npm install bull-board for a visual UI. Use queues for: email sending, image processing, report generation, notifications — anything that shouldn't block the HTTP response.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Bull+queue+Redis+Node.js+background+jobs+tutorial",label:"Bull Queue Tutorial"},{type:"web",url:"https://optimalbits.github.io/bull/",label:"Bull Queue Docs"},{type:"web",url:"https://github.com/felixmosh/bull-board",label:"Bull Board Dashboard"}],
        "Compare: sending email directly in POST /auth/register vs queuing it. What happens to response time? What happens if the email service is down? How does the queue help in each scenario?",
        "🚀 TASK: (1) Install bull and create an emailQueue connected to Redis, (2) move all sendEmail calls to queue jobs — add job in the route handler, (3) create a separate worker file that processes emailQueue jobs and calls nodemailer, (4) configure 3 retry attempts with exponential backoff, (5) create an imageProcessingQueue with a job that simulates resizing (setTimeout 2s), (6) install bull-board and mount it at /admin/queues to visualise jobs.",
        "2 hrs"),
      d(40,"Server-Sent Events & Real-Time Patterns",
        "Use Server-Sent Events for push notifications and compare with WebSockets.",
        "Server-Sent Events (SSE) is a one-way server-to-client push over HTTP. Response headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive. Each event is text: 'data: {json}\\n\\n'. Client: const es = new EventSource('/events'); es.onmessage = e => JSON.parse(e.data). SSE vs WebSockets: SSE is simpler (plain HTTP, no upgrade), automatic reconnect, text-only; WebSockets are bidirectional, binary support, need explicit reconnect logic. SSE suits: live feeds, notifications, progress updates, dashboards. WebSockets suit: chat, games, collaborative editing. For SSE with multiple servers, use Redis pub/sub: server A publishes event to Redis channel, all servers subscribed to channel push to their connected clients. Scaling real-time: sticky sessions (same server per user) or shared state (Redis pub/sub).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Server-Sent+Events+SSE+Node.js+Express+tutorial+vs+WebSockets",label:"SSE Tutorial"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events",label:"MDN: Server-Sent Events"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/API/EventSource",label:"MDN: EventSource"}],
        "Decide: would you use SSE or WebSockets for (1) live sports score updates, (2) a multiplayer game, (3) a CI/CD build log stream, (4) a collaborative document editor? Justify each choice.",
        "🚀 TASK: (1) Create GET /api/v1/notifications/stream that sets SSE headers and holds the connection open, (2) maintain a Set of connected response objects and clear on client disconnect, (3) create POST /api/v1/notify that writes an SSE event to all connected clients, (4) subscribe to a Redis pub/sub channel and push Redis messages to all SSE clients, (5) build an HTML page using EventSource to display notifications in real time, (6) test by posting to /notify and seeing it appear in all open browser tabs.",
        "2 hrs"),
      d(41,"Redis Rate Limiting & API Throttling",
        "Implement production-grade rate limiting with sliding window algorithm using Redis.",
        "IP-based rate limiting with express-rate-limit stores counters in memory (per process). Redis-based rate limiting works across all Node processes. Sliding window log: store timestamps of requests in a Redis sorted set (ZADD key timestamp timestamp), remove old entries (ZREMRANGEBYSCORE), count remaining (ZCARD). If count >= limit: reject. This algorithm is precise but memory-intensive. Sliding window counter approximation: blend current and previous window counts. Token bucket: replenish tokens at fixed rate, consume on each request — smoother than fixed window. Per-user limits: use 'ratelimit:user:42' key instead of IP. Tiered limits: free users 100 req/hr, premium 1000 req/hr. Rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset (Unix timestamp when window resets), Retry-After. Return 429 Too Many Requests when limit exceeded.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Redis+rate+limiting+sliding+window+Node.js+tutorial",label:"Redis Rate Limiting Tutorial"},{type:"web",url:"https://redis.io/glossary/rate-limiting/",label:"Redis Rate Limiting Guide"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429",label:"MDN: 429 Too Many Requests"}],
        "Trace the sliding window algorithm for 5 req/10s limit: requests arrive at t=0,2,4,6,8,10,11. When is request 6 rejected? When does the window slide to allow request 7?",
        "🚀 TASK: (1) Write a Redis sliding window rate limiter: rateLimiter(key, limit, windowSeconds) using ZADD/ZREMRANGEBYSCORE/ZCARD, (2) create Express middleware that applies the limiter using req.ip as key, (3) add X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers to every response, (4) return 429 with Retry-After header when limit exceeded, (5) implement per-user limits: authenticated users get 500/hr, unauthenticated 50/hr, (6) apply strict limits (10/min) to login and register endpoints.",
        "2 hrs"),
      d(42,"Week 6 Review — Real-Time Chat + Queue System",
        "Build a real-time system combining Socket.io, Redis caching, Bull queues, and SSE.",
        "This project integrates all Week 6 concepts. The chat system uses Socket.io for room-based messaging, Redis for caching recent messages and session storage, Bull for async notification emails when mentioned (@username). SSE streams live user-count updates. The architecture demonstrates how these technologies work together: Socket.io handles real-time events, Redis caches hot data and backs the queue, Bull workers handle background processing, SSE delivers one-way push for dashboards. Key challenges: how to persist messages (MongoDB), how to deliver offline notifications (email queue), how to show live online user counts (SSE + Redis counter).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Socket.io+Redis+Bull+real-time+chat+Node.js+project+tutorial",label:"Real-Time Chat Project"},{type:"web",url:"https://socket.io/docs/v4/rooms/",label:"Socket.io Rooms Docs"}],
        "Design the architecture: draw boxes for Socket.io server, Redis, Bull worker, MongoDB. Draw arrows showing data flow for: user sends message → mentions @bob → bob is offline → email notification sent.",
        "🚀 TASK: Build a real-time chat app with (1) Socket.io rooms — users join named rooms, messages broadcast to room members, (2) persist messages in MongoDB with author, room, text, timestamp, (3) cache last 50 messages per room in Redis list (LPUSH/LTRIM/LRANGE) for fast history load, (4) Bull queue: detect @username mentions in messages, queue email notification job, (5) SSE endpoint /api/v1/rooms/:id/stats that pushes live online user count every 5 seconds, (6) Redis-based rate limiter: max 10 messages per minute per user.",
        "2 hrs"),
    ],
    project:{ id:"bw6", title:"Real-Time Chat + Queue System",
      desc:"A real-time chat application with Socket.io rooms, Redis-cached message history, MongoDB persistence, Bull job queues for async email notifications on @mentions, Server-Sent Events for live user-count dashboards, and Redis-backed sliding window rate limiting." }
  },

  // ── Week 7 ───────────────────────────────────────────────
  { week:7, title:"Testing, Logging & DevOps Basics", timeRange:"10–12 hrs",
    days:[
      d(43,"Unit Testing with Jest",
        "Write unit tests for pure functions and utilities using Jest.",
        "Jest is the most popular JavaScript testing framework. npm install --save-dev jest. Test files: *.test.js or *.spec.js, or in __tests__ folder. Structure: describe('group', () => { it('should...', () => { expect(value).toBe(expected) }) }). Matchers: toBe (===), toEqual (deep equal), toBeNull, toBeUndefined, toBeTruthy, toBeFalsy, toContain, toThrow, toHaveBeenCalled. Mocking: jest.fn() creates a mock function. jest.spyOn(obj, 'method') wraps an existing method. mockFn.mockReturnValue(x), mockFn.mockResolvedValue(x) for async. jest.mock('./module') auto-mocks entire module. Test isolation: beforeEach / afterEach reset state. Unit tests test one function in isolation — mock all dependencies. Test coverage: jest --coverage generates Istanbul report.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Jest+unit+testing+tutorial+Node.js+beginners+2024",label:"Jest Testing Tutorial"},{type:"web",url:"https://jestjs.io/docs/getting-started",label:"Jest Getting Started"},{type:"web",url:"https://jestjs.io/docs/expect",label:"Jest Expect API"}],
        "Before writing a test, write 3 test cases on paper for a formatCurrency(amount, currency) function: happy path, zero amount, negative amount. What edge cases could break it?",
        "🚀 TASK: (1) Install Jest, add test script to package.json, create a utils.js with functions: formatCurrency, capitaliseWords, validateEmail, slugify — write unit tests for all, (2) test edge cases: empty strings, null input, special characters, (3) mock a dependency: write a test for a function that calls Date.now() — mock it to return a fixed timestamp, (4) test async functions: write a test for a function that calls a mocked API using mockResolvedValue, (5) aim for 100% coverage on utils.js using jest --coverage, (6) fix any bugs you find while writing tests.",
        "2 hrs"),
      d(44,"Integration Testing with Supertest",
        "Test Express routes end-to-end using Supertest with a test database.",
        "Integration tests test multiple units working together — typically a full HTTP request through your Express app. Supertest: npm install --save-dev supertest. const request = require('supertest'); const app = require('./app'). await request(app).get('/api/v1/users').expect(200). Check body: .expect('Content-Type', /json/).then(res => expect(res.body.data).toHaveLength(3)). Test database isolation: use a separate test DB (TEST_DATABASE_URL env var). beforeAll: connect to test DB, seed data. afterAll: disconnect, drop test DB. beforeEach: clear and re-seed specific collections/tables. Jest config: set testEnvironment: 'node' and globalSetup/globalTeardown. Test auth: generate a test JWT in beforeAll and include in Authorization header. Test all happy paths AND error paths (invalid input, 404, 401, 403).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Supertest+Express+integration+testing+Jest+Node.js+tutorial",label:"Supertest Integration Tests"},{type:"web",url:"https://github.com/ladjs/supertest",label:"Supertest GitHub"},{type:"web",url:"https://jestjs.io/docs/configuration",label:"Jest Configuration Docs"}],
        "Plan your test suite for the Auth API: list every endpoint and every test case — happy path, missing fields, wrong password, expired token, wrong role. You should have 20+ test cases.",
        "🚀 TASK: (1) Create a test config that uses a separate MongoDB test database, (2) write tests for POST /auth/register: success, duplicate email (409), missing fields (422), (3) write tests for POST /auth/login: success with token in response, wrong password (401), non-existent user (401), (4) write tests for a protected GET /auth/me: success with valid token, no token (401), expired token (401), (5) write tests for admin-only route: admin token (200), user token (403), (6) add a package.json script 'test:integration' that sets TEST_DATABASE_URL and runs Jest.",
        "2.5 hrs"),
      d(45,"Test Coverage & TDD",
        "Understand TDD workflow, achieve meaningful coverage, and use snapshot testing.",
        "TDD (Test-Driven Development) cycle: Red → Green → Refactor. Write a failing test first, write minimal code to pass it, then refactor without breaking the test. This forces clear thinking about what code should do before writing it. Coverage metrics: Statements (% of statements executed), Branches (% of if/else paths taken), Functions (% of functions called), Lines. 80%+ coverage is a common goal — 100% is often impractical. Istanbul (built into Jest) generates HTML coverage reports: jest --coverage --coverageDirectory=coverage. Meaningful coverage vs gaming coverage: covering every line is not the same as testing every behaviour. Snapshot testing: expect(component).toMatchSnapshot() saves rendered output to a .snap file and detects unexpected changes — useful for response shapes. jest.config.js: coverageThreshold forces CI failure below thresholds.",
        [{type:"yt",url:"https://youtube.com/results?search_query=TDD+test+driven+development+Node.js+Jest+tutorial",label:"TDD with Jest Tutorial"},{type:"web",url:"https://jestjs.io/docs/configuration#coveragethreshold-object",label:"Jest Coverage Threshold"},{type:"web",url:"https://jestjs.io/docs/snapshot-testing",label:"Jest Snapshot Testing"}],
        "Pick one new function to build: a password strength checker returning { score: 0-4, feedback: [...] }. Write 6 test cases BEFORE writing the implementation. Include all score levels.",
        "🚀 TASK: (1) Use TDD to build validatePassword(password): write all tests first, then implement, (2) run jest --coverage and identify uncovered branches, write tests to cover them, (3) add coverageThreshold to jest.config.js: statements/branches/functions/lines all at 80%, (4) write snapshot tests for the response body of GET /api/v1/users and POST /auth/login success, (5) break the snapshot intentionally then run jest --updateSnapshot to update it, (6) add 'test:coverage' script to package.json that fails if thresholds not met.",
        "2 hrs"),
      d(46,"Structured Logging with Winston",
        "Implement production-grade logging with structured JSON, log levels, and correlation IDs.",
        "console.log is not suitable for production: no levels, no structure, no rotation. Winston is the most popular Node.js logging library: npm install winston. Log levels (low to high): error, warn, info, http, verbose, debug, silly. Create logger: winston.createLogger({ level: 'info', format: winston.format.combine(winston.format.timestamp(), winston.format.json()), transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'error.log', level: 'error' })] }). Structured JSON logs: { timestamp, level, message, userId, requestId, duration }. Correlation ID (request ID): generate a UUID per request (uuid npm package), attach to req.requestId via middleware, include in all log messages. Log rotation: winston-daily-rotate-file npm package — new log file each day, keep 30 days. morgan integration: use morgan with stream: { write: msg => logger.http(msg) }.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Winston+logging+Node.js+structured+JSON+tutorial",label:"Winston Logging Tutorial"},{type:"web",url:"https://github.com/winstonjs/winston",label:"Winston GitHub"},{type:"web",url:"https://www.npmjs.com/package/winston-daily-rotate-file",label:"winston-daily-rotate-file"}],
        "Design your log format: for an HTTP request log entry, what fields would you include? For an error log? For a user action log (e.g. user created a post)? Think about what you'd need to debug a production issue.",
        "🚀 TASK: (1) Install winston and create a logger.js module with Console + File transports, debug level in dev/info in prod, (2) add a requestId middleware using crypto.randomUUID() that attaches to req and res headers (X-Request-Id), (3) integrate morgan to use winston's stream for HTTP access logs, (4) replace all console.log in your codebase with logger calls at appropriate levels, (5) install winston-daily-rotate-file and configure daily rotation keeping 14 days, (6) add logger.error(err.message, { stack: err.stack, requestId }) in your global error handler.",
        "2 hrs"),
      d(47,"Docker Basics",
        "Containerise your Node.js application with Docker.",
        "Docker packages an app and its dependencies into a container — runs identically everywhere. Dockerfile: FROM node:20-alpine (base image), WORKDIR /app, COPY package*.json ./, RUN npm ci --production, COPY . ., EXPOSE 3000, CMD ['node', 'src/index.js']. .dockerignore: node_modules, .env, *.log — prevents bloating the image. docker build -t myapp:1.0 . builds the image. docker run -p 3000:3000 -e NODE_ENV=production --name myapp myapp:1.0 starts a container. docker ps lists running containers. docker logs myapp tails logs. docker stop myapp, docker rm myapp. Multi-stage builds: stage 1 installs all deps + compiles, stage 2 copies only production artifacts — smaller final image. ENV variables: pass with -e KEY=VALUE or --env-file .env.production. Never bake secrets into the image.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Docker+tutorial+Node.js+Dockerfile+beginners+2024",label:"Docker for Node.js Tutorial"},{type:"web",url:"https://docs.docker.com/language/nodejs/",label:"Docker Node.js Guide"},{type:"web",url:"https://docs.docker.com/engine/reference/builder/",label:"Dockerfile Reference"}],
        "List every file and folder in your project. Which should be in .dockerignore? Why would including node_modules in the image be wrong? What would happen if you baked a DB password into the image?",
        "🚀 TASK: (1) Write a Dockerfile for your Express API using node:20-alpine, (2) create .dockerignore excluding node_modules, .env, coverage, test files, (3) build the image and run it — verify it responds on localhost:3000, (4) pass environment variables with --env-file and verify process.env reads them, (5) write a multi-stage Dockerfile: stage 1 npm install, stage 2 copies only src and prod node_modules, (6) compare image sizes between the single-stage and multi-stage builds.",
        "2 hrs"),
      d(48,"Docker Compose",
        "Orchestrate multi-container environments with Docker Compose.",
        "Docker Compose defines and runs multi-container applications from a YAML file. docker-compose.yml structure: version, services, networks, volumes. Each service: image or build path, ports, environment, volumes, depends_on, networks. Example services: app (your Node server), postgres (official postgres image), redis (official redis image). depends_on ensures services start in order but doesn't wait for readiness — use health checks or wait-for-it scripts. Volumes persist data: postgres_data:/var/lib/postgresql/data. Networks: services on the same network can reach each other by service name (postgres instead of localhost). Environment variables: use env_file: .env.docker. Commands: docker-compose up -d (detached), docker-compose down, docker-compose logs -f app, docker-compose exec app sh (shell into container). docker-compose down -v removes volumes too.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Docker+Compose+Node.js+Postgres+Redis+tutorial+2024",label:"Docker Compose Tutorial"},{type:"web",url:"https://docs.docker.com/compose/compose-file/",label:"Compose File Reference"},{type:"web",url:"https://docs.docker.com/compose/",label:"Docker Compose Overview"}],
        "Design a docker-compose.yml for your app: what services do you need? What environment variables does each service need? What volumes ensure data persists across restarts?",
        "🚀 TASK: (1) Create docker-compose.yml with three services: app, postgres, redis, (2) configure app to depend on postgres and redis, set DATABASE_URL and REDIS_URL environment variables using service names as hostnames, (3) add a named volume postgres_data for data persistence, (4) run docker-compose up and verify all three services start and app connects to DB and Redis, (5) run docker-compose exec app sh and inspect the running container, (6) run docker-compose down then up again and verify database data persists.",
        "2 hrs"),
      d(49,"Week 7 Review — Dockerised API with Tests",
        "Containerise the auth API with a full test suite and Docker Compose stack.",
        "This review brings together Jest/Supertest testing and Docker containerisation. The goal is a production-like local dev environment: docker-compose up starts everything (app, Postgres, Redis), and npm test runs the full test suite against a test database container. CI/CD readiness: the Dockerfile and test suite together enable automated pipelines. Key challenge: integration tests need a real database — either spin up a test DB container in Compose or use a separate jest-compose setup. Test the full app: auth routes, protected routes, file uploads, cache behaviour, queue job creation. Code quality: ESLint catches common errors, Prettier enforces formatting — both run in CI before tests.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Docker+Compose+Jest+integration+testing+Node.js+CI+tutorial",label:"Docker + Testing Tutorial"},{type:"web",url:"https://docs.docker.com/compose/startup-order/",label:"Docker Compose Startup Order"}],
        "Plan your test database strategy: should tests use the same Docker Postgres service or a separate in-memory option? How do you reset data between test runs? Write the beforeAll/afterAll setup plan.",
        "🚀 TASK: (1) Add a test service to docker-compose.yml that uses the same postgres image with a separate test DB, (2) write a jest.config.js that sets globalSetup to connect to test DB and globalTeardown to close connection, (3) write integration tests covering all auth API endpoints from Week 4, (4) install ESLint + eslint-plugin-node and add a lint script, fix all lint errors, (5) add a package.json script 'ci' that runs lint then test then coverage check in sequence, (6) verify docker-compose up && npm run ci passes cleanly from a fresh clone.",
        "2 hrs"),
    ],
    project:{ id:"bw7", title:"Dockerised API with Tests",
      desc:"A complete Jest test suite (unit + integration with Supertest) covering all auth endpoints, utility functions, and error paths. Structured Winston logging with correlation IDs and daily rotation. Full Docker Compose stack with Node app + PostgreSQL + Redis. ESLint configured for code quality. CI script: lint → test → coverage threshold check." }
  },

  // ── Week 8 ───────────────────────────────────────────────
  { week:8, title:"Capstone: Production-Ready REST API", timeRange:"12–14 hrs",
    days:[
      d(50,"API Documentation with Swagger",
        "Auto-generate interactive API documentation using swagger-jsdoc and swagger-ui-express.",
        "OpenAPI Specification (OAS) is the standard for describing REST APIs. swagger-jsdoc reads JSDoc comments and generates an OpenAPI 3.0 spec. swagger-ui-express serves an interactive UI at a route like /api/docs. Setup: npm install swagger-jsdoc swagger-ui-express. swaggerDefinition: { openapi: '3.0.0', info: { title, version, description }, servers: [{ url }] }. Annotate routes with JSDoc: /** @swagger /users: get: summary: 'Get all users' responses: 200: description: 'Success' */. Document request bodies, parameters, responses, and authentication (bearerAuth security scheme). Components/schemas define reusable response shapes. Every endpoint should document: path, method, summary, parameters (path/query), requestBody schema, all response status codes and shapes. Good documentation is part of the product — treat it as a first-class deliverable.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Swagger+OpenAPI+Node.js+Express+swagger-jsdoc+tutorial",label:"Swagger API Docs Tutorial"},{type:"web",url:"https://swagger.io/specification/",label:"OpenAPI Specification"},{type:"web",url:"https://www.npmjs.com/package/swagger-jsdoc",label:"swagger-jsdoc Package"}],
        "Open any public API's Swagger UI (e.g. petstore.swagger.io). Navigate the endpoints. Notice how schemas are reused across endpoints. Plan the same structure for your own API.",
        "🚀 TASK: (1) Install swagger-jsdoc and swagger-ui-express, configure swaggerDefinition with your API info and bearer auth scheme, (2) document all 6 auth endpoints with full JSDoc annotations including request/response schemas, (3) document all product/post CRUD endpoints with path params, query params, and response shapes, (4) define reusable schemas in components: User, Post, Error, Pagination, (5) add /api/docs route serving swagger-ui and verify all documented endpoints work from the UI, (6) add a /api/docs.json route returning raw JSON spec for programmatic use.",
        "2 hrs"),
      d(51,"Environment Config & Secrets Management",
        "Manage environment-specific configuration safely across development, staging, and production.",
        "Never hardcode secrets or environment-specific values. The 12-factor app methodology: store config in environment variables. dotenv for local dev: require('dotenv').config() loads .env into process.env. .env is gitignored; .env.example documents all required variables with placeholders. config package: creates config/default.js, config/production.js that merge based on NODE_ENV — avoids scattered process.env references. Validate required env vars on startup: if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET required'). convict npm package: defines a schema with types, defaults, and validation for all config values. Secrets in production: never use .env files on servers — use platform-specific secrets management (Railway Variables, Render Environment, AWS Parameter Store, HashiCorp Vault). Secret rotation: design your app to reload secrets without restarting (Redis-cached config, periodic refresh). Log config on startup (excluding secret values) for debugging.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+environment+variables+config+secrets+management+tutorial",label:"Config & Secrets Management"},{type:"web",url:"https://12factor.net/config",label:"12-Factor: Config"},{type:"web",url:"https://www.npmjs.com/package/convict",label:"convict Package"}],
        "Audit your current project: find every process.env reference. Are all required vars validated on startup? Is there an .env.example? What would break if a secret was wrong at runtime vs startup?",
        "🚀 TASK: (1) Create a config.js module that reads all env vars, validates required ones on startup, and exports a config object, (2) create .env.example with all variables (values as placeholders), add .env to .gitignore, (3) add a NODE_ENV-based config: development uses verbose logging, production uses info level only, (4) install convict and rewrite config.js using its schema validation, (5) add startup validation: if any required config is missing, log a clear error and process.exit(1), (6) document all config options in README.md.",
        "2 hrs"),
      d(52,"Performance & Load Testing",
        "Profile your API, identify bottlenecks, and load test with autocannon.",
        "Performance begins with measurement — never optimise without data. Node.js cluster module: os.cpus().length workers, each handling requests, master manages them via IPC. PM2 process manager: npm install -g pm2, pm2 start app.js -i max (cluster mode), pm2 monit (live dashboard), pm2 logs, pm2 ecosystem.config.js. Load testing: autocannon -c 100 -d 10 http://localhost:3000/api/v1/users (100 concurrent connections for 10 seconds), reports req/sec, latency percentiles (p50/p95/p99). k6 is a modern alternative with JavaScript test scripts. N+1 query problem: fetching 10 posts then making 10 separate DB queries for each post's author — fix with JOIN or populate. Profiling: node --inspect starts a Chrome DevTools session, node --cpu-prof generates a CPU profile. clinic.js doctor: npx clinic doctor -- node app.js — visualises event loop blocking, I/O issues, memory leaks.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+PM2+cluster+load+testing+autocannon+performance+tutorial",label:"Node.js Performance Tutorial"},{type:"web",url:"https://pm2.keymetrics.io/docs/usage/quick-start/",label:"PM2 Quick Start"},{type:"web",url:"https://github.com/mcollina/autocannon",label:"autocannon GitHub"}],
        "Identify potential N+1 queries in your API. For each: what's the naïve implementation, and how would you fix it with a JOIN or populate? What would 1000 req/s look like to your database?",
        "🚀 TASK: (1) Install autocannon globally and load test GET /api/v1/posts at 50 concurrent connections for 30 seconds, record baseline req/sec, (2) identify an N+1 query in your API and fix it — re-run the load test to measure improvement, (3) install PM2 and start your app in cluster mode, re-run load test and compare throughput, (4) run node --inspect and profile a slow endpoint in Chrome DevTools' Performance tab, (5) install clinic.js and run npx clinic doctor -- node src/index.js with a load test — review the report, (6) add response time logging to identify slowest endpoints.",
        "2 hrs"),
      d(53,"CI/CD with GitHub Actions",
        "Automate testing and deployment with a GitHub Actions pipeline.",
        "CI (Continuous Integration) automatically runs tests on every push. CD (Continuous Deployment) automatically deploys passing builds. GitHub Actions: workflow defined in .github/workflows/ci.yml. Trigger: on: push: branches: [main] and on: pull_request. Jobs: lint, test, build, deploy run in sequence or parallel. Steps use actions: actions/checkout@v4, actions/setup-node@v4 with node-version. Environment variables: secrets stored in GitHub Secrets, referenced as ${{ secrets.JWT_SECRET }}. Services block spins up Docker containers (postgres, redis) for integration tests. Cache dependencies: actions/cache@v3 with key based on package-lock.json hash. Deploy job: only runs on main branch after test passes, uses railway-deploy or fly deploy or render deploy action. Pipeline: checkout → install deps (cached) → lint → unit tests → integration tests (with DB) → build → deploy.",
        [{type:"yt",url:"https://youtube.com/results?search_query=GitHub+Actions+CI+CD+Node.js+deploy+tutorial+2024",label:"GitHub Actions CI/CD Tutorial"},{type:"web",url:"https://docs.github.com/en/actions",label:"GitHub Actions Docs"},{type:"web",url:"https://docs.github.com/en/actions/using-containerized-services/about-service-containers",label:"GH Actions Service Containers"}],
        "Design your pipeline stages on paper: what runs on every PR? What only runs on merge to main? What should block a merge? What happens if the deploy step fails?",
        "🚀 TASK: (1) Create .github/workflows/ci.yml that triggers on push/PR to main, (2) add a lint job: checkout, setup-node, npm ci, npm run lint, (3) add a test job with postgres and redis services matching your docker-compose versions, run npm test, (4) add coverage check: fail if below 70%, upload coverage report as artifact, (5) add a deploy job that runs only on push to main, uses a cloud platform's deploy action, (6) push to GitHub, verify the pipeline runs, and check the Actions tab.",
        "2 hrs"),
      d(54,"Monitoring & Health Checks",
        "Implement health check endpoints and expose Prometheus metrics.",
        "Health checks let load balancers and orchestrators know if your service is healthy. /health endpoint (no auth): { status: 'ok', uptime: process.uptime(), timestamp: Date.now() }. Liveness probe: is the process running? Readiness probe: is it ready to serve traffic (DB connected, dependencies up)? Kubernetes uses both. Prometheus is an open-source metrics system. prom-client npm package: Counter (monotonically increasing), Gauge (can go up and down), Histogram (distribution of values — latency buckets), Summary (quantiles). Expose at GET /metrics in Prometheus text format. Collect default metrics: collectDefaultMetrics() captures event loop lag, memory, CPU. Custom metrics: httpRequestDuration histogram tracking p50/p95/p99 latency per route. Grafana: connect to Prometheus and build dashboards. Alertmanager: notify on metric thresholds (e.g. error rate > 1% for 5 min).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+Prometheus+prom-client+Grafana+monitoring+tutorial",label:"Prometheus + Grafana Tutorial"},{type:"web",url:"https://github.com/siimon/prom-client",label:"prom-client GitHub"},{type:"web",url:"https://prometheus.io/docs/introduction/overview/",label:"Prometheus Overview"}],
        "Design your monitoring strategy: what metrics matter most for your API? Request rate, error rate, latency (p50/p95), DB connection pool usage, queue depth. What alerts would wake you up at 3am?",
        "🚀 TASK: (1) Install prom-client and call collectDefaultMetrics(), expose GET /metrics route, (2) create an httpRequestDuration Histogram and add middleware that times each request and records method+route+status labels, (3) create an httpRequestTotal Counter and increment per request, (4) create an activeConnections Gauge that increments on connect and decrements on disconnect (Socket.io), (5) implement GET /health returning uptime, version, DB status (try a simple query), Redis status (PING), (6) pull Prometheus + Grafana via docker-compose and build a dashboard showing req/sec and p95 latency.",
        "2 hrs"),
      d(55,"Capstone Day 1 — Architecture & Planning",
        "Design the complete production-ready REST API from scratch before writing a line of code.",
        "Great software starts with great design. Architecture decision record (ADR): document why you chose each technology and pattern. For the capstone API — a Task Management system — define all entities: User, Workspace, Project, Task, Comment, Label, File. Define all relationships and whether they're 1:1, 1:many, or many:many. Plan the database schema: tables/collections, indexes, foreign keys. API surface: list every endpoint with method, path, request shape, response shape, auth requirements. Middleware stack order: cors → helmet → rate limiter → requestId → morgan → routes → 404 handler → error handler. Auth strategy: JWT + refresh tokens. Storage: MongoDB for tasks/comments, Redis for caching + sessions, Bull for background jobs. Choose folder structure: feature-based (src/users/, src/tasks/) vs layer-based (src/controllers/, src/services/, src/models/).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+REST+API+architecture+design+patterns+tutorial",label:"API Architecture Planning"},{type:"web",url:"https://github.com/goldbergyoni/nodebestpractices",label:"Node.js Best Practices"}],
        "Write out the complete data model and API surface on paper before opening your editor. Every field, every endpoint. This planning prevents wasted implementation time.",
        "🚀 TASK: (1) Write a detailed README.md with: project description, tech stack with justifications, folder structure, (2) define all Mongoose schemas with fields and indexes, (3) write an API surface table in README (method, path, auth, description for every endpoint), (4) initialise the project: git init, npm init, install all dependencies, set up folder structure, (5) set up docker-compose.yml with MongoDB + Redis + app services, (6) write the app.js bootstrap: all middleware registered, route files imported (empty), error handlers.",
        "2 hrs"),
      d(56,"Capstone Day 2 — Auth & User Management",
        "Implement the complete authentication and user management layer.",
        "Day 2 focuses on the identity layer: registration, login, JWT tokens, refresh rotation, profile management, and avatar upload. This builds on all of Week 4's auth concepts but now integrates into the capstone architecture. Key additions: workspace creation on registration (every user gets a default workspace), email verification flow (send verification email, verify token endpoint), password change endpoint (requires current password), user profile update with avatar upload to local storage. Apply all security best practices: bcrypt, JWT, httpOnly cookies, rate limiting on auth routes, input validation with Joi, helmet headers.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+complete+auth+system+JWT+refresh+tokens+production",label:"Complete Auth System"},{type:"web",url:"https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",label:"OWASP Auth Cheat Sheet"}],
        "Review your Week 4 auth implementation. What would you do differently now? Is your token rotation correct? Is the email verification flow secure (hint: hash the token before storing)?",
        "🚀 TASK: (1) Implement User schema with all fields including emailVerified, refreshTokens array, avatarUrl, (2) POST /auth/register with Joi validation, bcrypt, create default workspace, queue welcome email, (3) POST /auth/login returning JWT pair in httpOnly cookies, (4) POST /auth/refresh with token rotation, (5) POST /auth/logout invalidating refresh token, (6) PUT /auth/profile updating name/avatar, (7) POST /auth/change-password requiring current password, (8) GET /auth/me returning populated user.",
        "2 hrs"),
      d(57,"Capstone Day 3 — Core CRUD Resources",
        "Build the main task management resources: workspaces, projects, and tasks.",
        "Day 3 implements the core business logic. Workspace: users can belong to multiple workspaces, invite members by email, roles (owner/admin/member). Project: belongs to workspace, has colour and status. Task: belongs to project and workspace, assigned to a user, has priority (low/medium/high/urgent), status (todo/in-progress/review/done), dueDate, labels array, attachments array. Key patterns: resource ownership checks — before any operation, verify the authenticated user has access to the workspace. Soft deletes: tasks get deletedAt timestamp rather than being removed, so history is preserved. Pagination on task lists: page + limit with total count in response meta. Filtering: by status, priority, assignee, label, due date range. Sorting: by dueDate, priority, createdAt.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+Express+MongoDB+task+management+API+tutorial",label:"Task Management API Tutorial"},{type:"web",url:"https://mongoosejs.com/docs/queries.html",label:"Mongoose Query Docs"}],
        "Design the access control logic: for each endpoint, what checks are needed? Who can create a task? Who can delete it? What if the assignee is from a different workspace?",
        "🚀 TASK: (1) Implement Workspace model with members array [{userId, role}] and full CRUD + invite by email endpoint, (2) implement Project model with workspace ref and full CRUD with workspace access check, (3) implement Task model with all fields and full CRUD with pagination, filtering (status, priority, assignee), sorting, (4) POST /tasks/:id/assign to change assignee with workspace membership check, (5) PATCH /tasks/:id/status to move through workflow, triggering a Bull job for assignee notification, (6) add Redis caching for GET /projects/:id/tasks with cache invalidation on mutation.",
        "2 hrs"),
      d(58,"Capstone Day 4 — Comments, Files & Real-Time",
        "Add comments, file attachments, and real-time updates to the task management API.",
        "Day 4 adds collaboration features. Comments: embedded in tasks (for simplicity) or separate collection (for querying all comments by user). Add @mention parsing: scan comment body for @username patterns, look up each mentioned user, queue notification emails, emit Socket.io events. File attachments: use multer to accept files on POST /tasks/:id/attachments, store locally (or Cloudinary), save attachment metadata (filename, mimetype, size, url) in task's attachments array. Real-time: when a task status changes, a comment is added, or a task is assigned, emit Socket.io events to all users in the same workspace room. Users join workspace rooms on Socket.io connect. This gives collaborators instant updates without polling.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Socket.io+real-time+collaboration+Node.js+MongoDB+tutorial",label:"Real-Time Collaboration Tutorial"},{type:"web",url:"https://socket.io/docs/v4/emit-cheatsheet/",label:"Socket.io Emit Cheatsheet"}],
        "Design the real-time event schema: for each action (task updated, comment added, file attached, member invited), what event name do you emit? What data payload? Who receives it?",
        "🚀 TASK: (1) Add comments subdocument to Task — POST/DELETE /tasks/:id/comments, (2) parse @mentions in comment body and queue notification email for each mentioned user, (3) emit 'comment:added' Socket.io event to the task's workspace room, (4) implement POST /tasks/:id/attachments with multer, validate type+size, save metadata to task, (5) on task status change, emit 'task:updated' to workspace room with updated task data, (6) on Socket.io connect, join workspace rooms for all workspaces the user belongs to.",
        "2 hrs"),
      d(59,"Capstone Day 5 — Tests, Docker & CI",
        "Write a full test suite, finalise Docker Compose, and set up the CI pipeline.",
        "Day 5 is about quality assurance and deployment infrastructure. Write integration tests for every new endpoint added in Days 2–4. Unit tests for: comment @mention parser, task filtering logic, JWT utilities, validation schemas. Test real-time events: emit a socket event in tests and assert the correct event fires. Docker Compose: final multi-service compose file with app + mongo + redis + worker (Bull job processor runs separately). The worker imports the same queue definitions and processes jobs. GitHub Actions CI: lint → test (with mongo + redis services) → coverage check → build Docker image → push to GitHub Container Registry.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Jest+Socket.io+testing+Node.js+GitHub+Actions+Docker+tutorial",label:"Testing + CI/CD Tutorial"},{type:"web",url:"https://jestjs.io/docs/configuration#globalsetup-string",label:"Jest Global Setup"}],
        "Audit your test coverage: what's not tested? List the 10 most important missing tests. For each, write the test description and what you'd expect. Then implement them.",
        "🚀 TASK: (1) Write integration tests for all workspace/project/task CRUD endpoints, (2) write unit tests for @mention parser and task filter builder, (3) add socket.io-client to dev deps and write a test that connects, joins a workspace room, and verifies task:updated event fires on status change, (4) add worker service to docker-compose.yml running the Bull job processor, (5) write GitHub Actions CI workflow with mongo:7 and redis:7 service containers, (6) verify npm run ci passes cleanly from a fresh clone.",
        "2 hrs"),
      d(60,"Capstone Day 6 — Deploy & Launch",
        "Deploy the production-ready API with monitoring, documentation, and a README.",
        "Final day: deploy to a cloud platform and add production polish. Choose platform: Railway (simplest for Node + Mongo + Redis), Render, or Fly.io. Environment variables: set all secrets in platform dashboard, never in code. Ensure your app binds to process.env.PORT. Add /health and /metrics endpoints. Deploy MongoDB Atlas (cloud MongoDB) and Redis Cloud (cloud Redis) as managed services — easier than managing your own. Swagger documentation: ensure all endpoints are fully documented and /api/docs is accessible. Final README: project description, tech stack, local setup (docker-compose up), running tests, API documentation link, architecture diagram, deployment notes. Performance check: run one last autocannon load test against the deployed API and record baseline numbers.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Deploy+Node.js+API+Railway+Render+MongoDB+Atlas+tutorial",label:"Deploy Node.js API Tutorial"},{type:"web",url:"https://docs.railway.app/",label:"Railway Docs"},{type:"web",url:"https://fly.io/docs/languages-and-frameworks/node/",label:"Fly.io Node.js Guide"}],
        "Final review: go through your API endpoint by endpoint and ask: is auth enforced? Is input validated? Are errors handled? Is the response shape consistent? Is the endpoint documented in Swagger?",
        "🚀 TASK: (1) Deploy to Railway/Render: connect GitHub repo, set all env vars, verify deployment succeeds, (2) connect MongoDB Atlas and Redis Cloud as production data stores — update connection strings, (3) verify /health returns status:ok and /api/docs loads on the deployed URL, (4) run autocannon against the deployed URL with 20 concurrent connections for 30 seconds, (5) write the final README with all sections: description, quickstart, architecture, API docs link, (6) do a final review pass: check every endpoint has auth, validation, error handling, and Swagger doc.",
        "2 hrs"),
    ],
    project:{ id:"bw8", title:"Production REST API",
      desc:"A full-stack Task Management REST API with User/Workspace/Project/Task/Comment resources, JWT auth with refresh rotation, MongoDB + Redis + Bull queue stack, Socket.io real-time updates, file uploads, email notifications, Swagger documentation, Prometheus metrics, Docker Compose, GitHub Actions CI/CD, and deployment to Railway/Render. Comprehensive Jest + Supertest test suite with 80%+ coverage." }
  },

  ] // end beginner.weeks
};
const intermediate = {
  label: "🟡 Intermediate", days: 50, totalHours: 100,
  goal: "Production Backend Engineering",
  weeks: [

  { week:1, title:"Advanced Node.js Internals", timeRange:"14–16 hrs",
    days:[
      d(1,"V8 & Event Loop Deep Dive","Master the Node.js event loop phases and microtask queue.","Node.js runs on V8 (JavaScript engine) and libuv (async I/O library). Event loop phases: timers (setTimeout/setInterval), pending callbacks (deferred I/O), idle/prepare, poll (incoming I/O), check (setImmediate), close callbacks. process.nextTick() runs after current operation completes, before I/O — highest priority. Promise microtasks run after nextTick. setImmediate() runs in the check phase — after I/O. setTimeout(fn, 0) and setImmediate() order is non-deterministic outside I/O callbacks.",[{type:"yt",url:"https://youtube.com/results?search_query=Node.js+event+loop+phases+deep+dive+libuv+tutorial",label:"Event Loop Deep Dive"},{type:"web",url:"https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",label:"Node.js Event Loop Docs"},{type:"web",url:"https://libuv.org/",label:"libuv Docs"}],"Run: setTimeout(()=>console.log('timeout'),0); Promise.resolve().then(()=>console.log('promise')); process.nextTick(()=>console.log('nextTick')); console.log('sync'). Predict and verify the output order.","🚀 TASK: (1) Demonstrate process.nextTick vs setImmediate vs setTimeout(0) ordering with experiments, (2) show how a CPU-blocking sync operation starves the event loop, (3) implement a setImmediateBatch(fns) that runs array of tasks in setImmediate chunks to avoid blocking, (4) measure event loop lag using setInterval + hrtime, (5) use clinic.js doctor to visualise event loop blockage.","2 hrs"),
      d(2,"Worker Threads","Offload CPU-bound work to worker threads.","worker_threads module: const { Worker, isMainThread, parentPort, workerData } = require('worker_threads'). Main creates worker: new Worker('./worker.js', { workerData: {input} }). Worker sends back: parentPort.postMessage(result). Main listens: worker.on('message', cb). worker.on('error'), worker.on('exit'). SharedArrayBuffer + Atomics allows shared memory between threads — Atomics.add, Atomics.compareExchange for lock-free operations. Worker pool pattern: maintain N workers and distribute tasks. Use cases: image resizing, parsing large files, cryptographic operations.",[{type:"yt",url:"https://youtube.com/results?search_query=Node.js+worker+threads+CPU+bound+tutorial",label:"Worker Threads Tutorial"},{type:"web",url:"https://nodejs.org/api/worker_threads.html",label:"Node.js Worker Threads API"}],"Benchmark: calculate 10 million prime numbers (a) in main thread, (b) across 4 worker threads. Predict speedup. What limits it?","🚀 TASK: (1) Implement a worker that calculates Fibonacci(45) — compare time with main thread, (2) build a worker pool with 4 workers distributing prime calculation tasks, (3) use SharedArrayBuffer to share a counter between main and workers using Atomics.add, (4) implement a streaming worker that processes a large file chunk by chunk, (5) handle worker errors with worker.on('error').","2.5 hrs"),
      d(3,"Cluster & Child Processes","Scale Node.js with the cluster module and spawn child processes.","cluster.fork() creates child processes — each runs a copy of your app. Master process receives connections and distributes to workers. cluster.isMaster / cluster.isWorker branching. IPC: worker.send(msg), process.on('message') for master-worker communication. Child processes: child_process.spawn executes external commands, exec for simpler commands, execFile for binary, fork for Node.js scripts with IPC. PM2 internally uses cluster. Worker replacement: master.on('exit', (worker) => cluster.fork()).",[{type:"yt",url:"https://youtube.com/results?search_query=Node.js+cluster+module+child+process+scaling+tutorial",label:"Cluster & Child Processes"},{type:"web",url:"https://nodejs.org/api/cluster.html",label:"Node.js Cluster API"}],"Cluster forks N workers. What happens when a worker crashes? What's the master's role? How does IPC differ from shared memory?","🚀 TASK: (1) Cluster your Express server with cluster.fork() per CPU, (2) log which worker handled each request (worker.process.pid), (3) implement auto-restart when a worker exits, (4) use IPC to broadcast a config update to all workers, (5) benchmark single process vs clustered — compare req/sec with autocannon.","2 hrs"),
      d(4,"Memory Management & Leak Detection","Profile Node.js memory, find leaks with heap snapshots.","V8 heap: objects allocated in young generation (minor GC), surviving objects promoted to old generation (major GC). v8.getHeapStatistics() returns heap sizes. process.memoryUsage() returns rss, heapTotal, heapUsed, external. Memory leaks: global variable accumulation, uncleaned event listeners (addListener without removeListener), closure holding references, uncleaned timers/intervals. Detection: --inspect flag → Chrome DevTools → Memory → Take Heap Snapshot. Compare snapshots before/after suspected leak.",[{type:"yt",url:"https://youtube.com/results?search_query=Node.js+memory+leak+detection+heap+snapshot+tutorial",label:"Memory Leak Detection"},{type:"web",url:"https://nodejs.org/api/v8.html",label:"Node.js V8 API"}],"Write code with a deliberate memory leak (accumulating array). Identify it using heap snapshots. How would you find it in production?","🚀 TASK: (1) Use v8.getHeapStatistics() and process.memoryUsage() to log memory before/after operations, (2) create a deliberate memory leak and take heap snapshots to identify it, (3) fix the leak (remove event listener or clear timer) and verify heap stabilises, (4) use --max-old-space-size to limit heap and observe OOM behaviour, (5) implement a memory health endpoint exposing heap stats.","2 hrs"),
      d(5,"Advanced Streams & Pipeline","Build complex stream pipelines with Transform, object mode, and error handling.","Transform stream: extends stream.Transform, implement _transform(chunk, encoding, callback) and optional _flush(callback). Object mode: { objectMode: true } passes JS objects instead of Buffers — useful for JSON pipelines. stream.pipeline(src, transform1, transform2, dest, callback) — handles backpressure and error propagation automatically. PassThrough: a Transform that passes data unchanged — useful for logging/monitoring. Writable.write() returns false when buffer full — backpressure signal — wait for 'drain' event.",[{type:"yt",url:"https://youtube.com/results?search_query=Node.js+advanced+streams+Transform+pipeline+tutorial",label:"Advanced Streams Tutorial"},{type:"web",url:"https://nodejs.org/api/stream.html#implementing-a-transform-stream",label:"Node.js Transform Streams"}],"Design a JSON processing pipeline: read NDJSON file → parse each line → filter by criteria → transform fields → write to output. What Transform streams do you need?","🚀 TASK: (1) Build a CSV-to-JSON Transform stream that handles headers and type coercion, (2) create an object-mode pipeline: parse NDJSON → filter → transform → stringify → write, (3) implement a progress tracking PassThrough that emits progress events, (4) demonstrate backpressure: write to a slow writable and monitor 'drain' events, (5) use stream.pipeline for error-safe multi-step file transformation.","2.5 hrs"),
      d(6,"Performance Profiling","Profile Node.js apps to find bottlenecks using built-in tools and clinic.js.","--prof flag generates V8 profiler output (isolate-*.log). node --prof-process isolate-*.log parses it. --cpu-prof generates JSON for DevTools. Flame graphs visualise call stacks over time — wide bars = time spent. clinic.js: npx clinic doctor -- node app.js + load test → health report. clinic flame → flame graph. clinic bubbleprof → async profiling. Look for: synchronous operations blocking event loop, high GC pressure (memory), N+1 DB queries, unneeded JSON.parse/stringify in hot paths.",[{type:"yt",url:"https://youtube.com/results?search_query=Node.js+performance+profiling+clinic.js+flame+graph+tutorial",label:"Node.js Performance Profiling"},{type:"web",url:"https://clinicjs.org/",label:"clinic.js Docs"}],"What does a wide plateau in a flame graph indicate? What does a tall thin spike indicate? How do you identify a hot path?","🚀 TASK: (1) Load test your API with autocannon, then use --prof to profile it, (2) run node --prof-process to read the profiler output — identify the top 5 hot functions, (3) run npx clinic doctor and read the health report, (4) generate a flame graph with clinic flame and identify the widest bars, (5) fix one performance issue you identified and re-benchmark.","2 hrs"),
      d(7,"TypeScript Setup for Backend","Configure TypeScript for a Node.js backend project.","tsconfig.json: { compilerOptions: { target: 'ES2022', module: 'commonjs', strict: true, outDir: './dist', rootDir: './src', esModuleInterop: true } }. ts-node for development (no compile step). tsc for production build. Path aliases: paths: { '@/*': ['src/*'] } + tsconfig-paths. Declaration files: @types/node, @types/express. Type-only imports: import type. Strict mode enables: strictNullChecks, noImplicitAny, strictFunctionTypes, strictPropertyInitialization.",[{type:"yt",url:"https://youtube.com/results?search_query=TypeScript+Node.js+Express+setup+tsconfig+strict+tutorial",label:"TypeScript Node.js Setup"},{type:"web",url:"https://www.typescriptlang.org/tsconfig",label:"TypeScript tsconfig Reference"}],"What errors does TypeScript catch that JavaScript misses? List 5 runtime errors that TypeScript's strict mode prevents.","🚀 TASK: (1) Add TypeScript to existing Express project: npm install typescript @types/node @types/express ts-node, (2) create tsconfig.json with strict mode, (3) rename *.js files to *.ts and fix all TypeScript errors, (4) add path aliases, (5) update npm scripts: dev uses ts-node, build runs tsc, start runs compiled dist/.","2 hrs"),
      d(8,"TypeScript with Express","Type Express requests, responses, and middleware.","Type the route handler: (req: Request<Params, ResBody, ReqBody, Query>, res: Response, next: NextFunction) => void. Generic typed params: Request<{ id: string }> for path params. Declaration merging to extend Express types: declare global { namespace Express { interface Request { user?: JWTPayload; } } }. Typed middleware: RequestHandler. Return types: res.json(data) type-safe. Environment variables: process.env.PORT is string | undefined — validate and cast at startup.",[{type:"yt",url:"https://youtube.com/results?search_query=TypeScript+Express+typed+middleware+request+user+tutorial",label:"TypeScript + Express Tutorial"},{type:"web",url:"https://expressjs.com/en/guide/using-middleware.html",label:"Express Middleware Guide"}],"What is declaration merging and why is it needed to type req.user? Write the global declaration for req.user with userId, email, and role.","🚀 TASK: (1) Type all route handlers with proper Request/Response generics, (2) extend Express Request to include req.user: JWTPayload, (3) create typed API response interface: ApiResponse<T>, (4) type all service functions with explicit return types, (5) run tsc --noEmit to check for type errors with no compilation.","2.5 hrs"),
      d(9,"SQL Deep Dive — CTEs & Window Functions","Master advanced SQL with CTEs, window functions, and query optimisation.","Common Table Expressions (CTEs): WITH cte AS (SELECT ...) SELECT * FROM cte. Recursive CTEs for hierarchical data. Window functions: ROW_NUMBER() OVER (PARTITION BY author_id ORDER BY created_at DESC). RANK(), DENSE_RANK(). LAG(column, offset) / LEAD — access previous/next row. SUM() OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) — running total. LATERAL JOIN: per-row subquery. EXPLAIN ANALYZE: Seq Scan vs Index Scan, cost estimation.",[{type:"yt",url:"https://youtube.com/results?search_query=PostgreSQL+window+functions+CTEs+advanced+SQL+tutorial",label:"Advanced SQL Window Functions"},{type:"web",url:"https://www.postgresql.org/docs/current/tutorial-window.html",label:"PostgreSQL Window Functions"},{type:"web",url:"https://www.postgresql.org/docs/current/queries-with.html",label:"PostgreSQL CTEs"}],"Write SQL to get the top 3 posts by likes per user using (a) a CTE approach and (b) a LATERAL approach.","🚀 TASK: (1) Use ROW_NUMBER() to rank posts by likes per user, (2) use LAG() to calculate day-over-day change in counts, (3) use recursive CTE to traverse a category tree, (4) write a running total of signups using SUM() OVER, (5) use EXPLAIN ANALYZE before/after adding an index and note cost reduction.","2.5 hrs"),
      d(10,"Prisma ORM & Connection Pooling","Use Prisma for type-safe database access and manage connection pools.","Prisma: next-generation ORM. schema.prisma: model User { id Int @id @default(autoincrement()) email String @unique }. npx prisma generate creates the client. npx prisma migrate dev creates migrations. prisma.user.findMany({ where: { role: 'admin' }, include: { posts: true } }). prisma.user.create({ data: { ... } }). Raw SQL escape hatch: prisma.$queryRaw. Connection pooling: Prisma uses its own pool — configure in connection string. PgBouncer: external connection pooler — transaction mode for serverless.",[{type:"yt",url:"https://youtube.com/results?search_query=Prisma+ORM+Node.js+TypeScript+tutorial+2024",label:"Prisma ORM Tutorial"},{type:"web",url:"https://www.prisma.io/docs/",label:"Prisma Docs"},{type:"web",url:"https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-pool",label:"Prisma Connection Pool"}],"When would you use Prisma over raw pg queries? What does Prisma add and what does it cost (overhead, flexibility)?","🚀 TASK: (1) Add Prisma to your project — define schema for all models, (2) run prisma migrate dev to create tables, (3) replace raw pg queries with Prisma client calls, (4) use include for relations instead of JOIN, (5) use prisma.$transaction for atomic operations.","3 hrs"),
    ],
    project:{ id:"iw1", title:"High-Performance TypeScript API",
      desc:"TypeScript Express API. Worker Threads for CPU tasks. Cluster mode. Prisma ORM with migrations. Advanced SQL: CTEs, window functions. Memory profiling report. clinic.js flame graph. autocannon benchmark before/after optimizations." }
  },

  { week:2, title:"Microservices & Message Queues", timeRange:"14–16 hrs",
    days:[
      d(11,"Microservices Architecture","Understand microservices principles and service decomposition strategies.","Monolith: one deployable unit — easy to develop, hard to scale independently. Microservices: independently deployable services — each owns its data, deployed separately. Conway's Law: system architecture mirrors communication structure. Bounded contexts: DDD concept — each service has its own domain model. Decomposition strategies: by business capability, by subdomain, by team. When NOT to use microservices: early stage products, small teams, unclear domains. Challenges: network latency, distributed transactions, operational complexity.",[{type:"yt",url:"https://youtube.com/results?search_query=microservices+architecture+Node.js+tutorial+2024",label:"Microservices Architecture Tutorial"},{type:"web",url:"https://microservices.io/patterns/",label:"Microservices Patterns"},{type:"web",url:"https://martinfowler.com/articles/microservices.html",label:"Fowler: Microservices"}],"Take your monolithic API and identify 3 bounded contexts that could be separate services. What data does each own? How do they communicate?","🚀 TASK: (1) Analyse your current API — identify bounded contexts (auth, users, content, notifications), (2) design the service decomposition: what each service owns, (3) identify shared data — what becomes an API call between services, (4) draw the service interaction diagram, (5) write pros/cons of microservices for your specific use case.","2 hrs"),
      d(12,"Inter-Service Communication","Implement sync REST and async message-based service communication.","Sync communication: REST (HTTP) or gRPC. Simple but creates temporal coupling — both services must be available. Service discovery: hardcode URLs (simple) or use Consul/K8s DNS. Async communication: message queues — services decouple in time. Producer sends message and continues; consumer processes when available. Patterns: request/reply (RPC over queue), publish/subscribe (events), point-to-point (task queue). Circuit breaker: stop calling a failing service to prevent cascade failures. opossum npm package implements circuit breaker.",[{type:"yt",url:"https://youtube.com/results?search_query=microservices+communication+REST+message+queue+Node.js",label:"Service Communication Tutorial"},{type:"web",url:"https://microservices.io/patterns/communication-style/messaging.html",label:"Messaging Pattern"},{type:"web",url:"https://github.com/nodeshift/opossum",label:"opossum Circuit Breaker"}],"When is async messaging better than sync REST calls between services? Design the communication between user-service and notification-service.","🚀 TASK: (1) Create two separate Express services: user-service (port 3001) and notification-service (port 3002), (2) user-service calls notification-service via REST after registration, (3) add circuit breaker with opossum on the service call, (4) implement service health checks: each service exposes /health, (5) simulate notification-service being down — verify circuit breaker prevents cascade failure.","3 hrs"),
      d(13,"RabbitMQ Fundamentals","Implement message queuing with RabbitMQ for async service communication.","RabbitMQ: AMQP message broker. amqplib npm package. Connect: amqp.connect(RABBITMQ_URL). Create channel: conn.createChannel(). Exchange types: direct (routing key match), fanout (broadcast), topic (pattern match), headers. Queue: ch.assertQueue('notifications'). Publish: ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg))). Consume: ch.consume(queue, (msg) => { ... ch.ack(msg) }). Acknowledgements: ack (processed), nack (requeue), reject. Dead letter exchange: messages that fail N times go to DLX for manual inspection. Prefetch: ch.prefetch(1) — process one message at a time.",[{type:"yt",url:"https://youtube.com/results?search_query=RabbitMQ+Node.js+tutorial+amqplib+exchanges",label:"RabbitMQ Tutorial"},{type:"web",url:"https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html",label:"RabbitMQ Node.js Tutorials"},{type:"web",url:"https://www.npmjs.com/package/amqplib",label:"amqplib Docs"}],"Design the exchange topology: what exchange type for (1) broadcast to all services, (2) route to specific service, (3) route by event type pattern?","🚀 TASK: (1) Run RabbitMQ in Docker, connect with amqplib, (2) implement producer that sends user.registered events to a fanout exchange, (3) implement two consumers (email-service, analytics-service) that receive from the exchange, (4) add dead letter queue for failed messages, (5) implement prefetch(1) and test behaviour under load.","3 hrs"),
      d(14,"Apache Kafka Fundamentals","Set up Kafka and implement producers and consumers.","Kafka: distributed event streaming platform. Concepts: topics (named stream), partitions (parallel lanes), offsets (position in partition), producers (write), consumers (read), consumer groups (parallel consumption). Each consumer group gets all messages; within a group, each partition is consumed by one consumer. Retention: messages kept for 7 days by default — replay possible. kafkajs npm package. const kafka = new Kafka({ clientId, brokers }). producer.send({ topic, messages }). consumer.subscribe({ topic }). consumer.run({ eachMessage: async ({ message }) => {...} }).",[{type:"yt",url:"https://youtube.com/results?search_query=Apache+Kafka+Node.js+kafkajs+tutorial",label:"Kafka Node.js Tutorial"},{type:"web",url:"https://kafka.js.org/docs/",label:"KafkaJS Docs"},{type:"web",url:"https://kafka.apache.org/documentation/",label:"Kafka Docs"}],"How does Kafka differ from RabbitMQ? When would you choose Kafka? (Hint: think event log vs task queue.)","🚀 TASK: (1) Run Kafka in Docker (with Zookeeper or KRaft), (2) create a topic user-events with 3 partitions, (3) produce events { type: 'user.registered', payload: {...} }, (4) create two consumer groups (notifications, analytics) — each gets all messages, (5) demonstrate consumer group load balancing: two consumers in notifications group share partitions.","3 hrs"),
      d(15,"API Gateway Pattern","Build an API Gateway for routing, auth, and aggregation.","API Gateway: single entry point for all clients. Routes requests to appropriate microservices. Responsibilities: authentication/authorization (validate JWT before forwarding), rate limiting, request aggregation (combine multiple service calls into one response), protocol translation, logging/tracing. In Node.js: http-proxy-middleware for reverse proxy. express-http-proxy for simple proxying. Custom gateway: route matching, header forwarding, error handling. Service mesh alternative: sidecar proxy (Istio/Linkerd) handles cross-cutting concerns.",[{type:"yt",url:"https://youtube.com/results?search_query=API+Gateway+Node.js+microservices+tutorial",label:"API Gateway Tutorial"},{type:"web",url:"https://www.npmjs.com/package/http-proxy-middleware",label:"http-proxy-middleware"},{type:"web",url:"https://microservices.io/patterns/apigateway.html",label:"API Gateway Pattern"}],"Design your API Gateway: what routes go to which service? What cross-cutting concerns does it handle? What does it NOT do?","🚀 TASK: (1) Create a gateway service that routes /users/* to user-service and /notifications/* to notification-service, (2) add JWT validation in the gateway — services trust the forwarded X-User-ID header, (3) add rate limiting per user at the gateway level, (4) implement request aggregation: GET /profile fetches from user-service + notification-service in parallel, (5) add gateway-level logging with requestId propagation.","2.5 hrs"),
      d(16,"OAuth 2.0 & Social Login","Implement OAuth 2.0 authorization code flow with Google/GitHub.","OAuth 2.0: authorization framework. Flows: Authorization Code (web apps), Client Credentials (server-to-server), Implicit (deprecated), Device. Authorization Code flow: redirect user to provider → user grants permission → provider redirects with code → exchange code for access+id tokens → use tokens to get user info. passport.js: passport-google-oauth20, passport-github2. PKCE: Proof Key for Code Exchange — prevents CSRF. Scopes: request minimum permissions. Store provider ID and link to local user account.",[{type:"yt",url:"https://youtube.com/results?search_query=OAuth+2.0+Node.js+Google+GitHub+login+tutorial",label:"OAuth 2.0 Tutorial"},{type:"web",url:"https://oauth.net/2/",label:"OAuth 2.0 Docs"},{type:"web",url:"https://www.passportjs.org/",label:"Passport.js Docs"}],"Trace the OAuth Authorization Code flow step by step. What is exchanged at each step? Why is the code short-lived?","🚀 TASK: (1) Install passport + passport-google-oauth20, (2) implement GET /auth/google and GET /auth/google/callback, (3) create or link user account on first OAuth login, (4) implement GitHub OAuth as a second provider, (5) handle edge cases: user cancels, email already registered with password.","2 hrs"),
      d(17,"Advanced Auth — 2FA & API Keys","Add two-factor authentication and API key management.","TOTP (Time-based One-Time Password): speakeasy npm. speakeasy.generateSecret() creates a secret. speakeasy.totp.generate(secret) generates current 6-digit code. speakeasy.totp.verify({ secret, token }) validates. QR code: qrcode npm — generate URI for authenticator apps. Backup codes: generate 10 random codes, store hashed. API Keys: generate 32-byte random key, prefix with 'rmap_'. Store only the hash. Scoped keys: read-only, write, admin. Usage tracking: log key usage. Rotation: create new key, deprecation period, then revoke old.",[{type:"yt",url:"https://youtube.com/results?search_query=2FA+TOTP+speakeasy+Node.js+tutorial",label:"2FA TOTP Tutorial"},{type:"web",url:"https://www.npmjs.com/package/speakeasy",label:"speakeasy Docs"},{type:"web",url:"https://www.npmjs.com/package/qrcode",label:"qrcode Docs"}],"What happens if a TOTP secret is stolen? How do backup codes work? What's the UX flow for recovering access when you lose your authenticator?","🚀 TASK: (1) Implement POST /auth/2fa/setup: generate secret, return QR code URI, (2) POST /auth/2fa/verify: validate TOTP code to enable 2FA, (3) require 2FA code on login if enabled, (4) generate 10 backup codes — hash and store, allow one-time use, (5) implement API key creation endpoint: return key once, store hash, scope permissions.","3 hrs"),
      d(18,"GraphQL","Build a GraphQL API with Apollo Server and N+1 query solving.","GraphQL: query language for APIs. Schema: type Query { user(id: ID!): User }. type User { id: ID! name: String! posts: [Post!]! }. Resolvers: functions that return data for each field. apollo-server-express: ApolloServer({ typeDefs, resolvers }). Mutations: type Mutation { createUser(input: CreateUserInput!): User }. Input types. N+1 problem: querying posts for a list of users executes N+1 DB queries. DataLoader: batches and caches DB calls. const userLoader = new DataLoader(async (ids) => ...). Subscriptions: real-time with WebSockets.",[{type:"yt",url:"https://youtube.com/results?search_query=GraphQL+Apollo+Server+Node.js+tutorial+2024",label:"GraphQL Tutorial"},{type:"web",url:"https://www.apollographql.com/docs/apollo-server/",label:"Apollo Server Docs"},{type:"web",url:"https://github.com/graphql/dataloader",label:"DataLoader Docs"}],"Write a GraphQL query to get users with their posts and comments. Without DataLoader, how many DB queries execute? With DataLoader, how many?","🚀 TASK: (1) Add Apollo Server to Express app with User + Post types, (2) implement query resolvers connecting to PostgreSQL, (3) implement mutations: createUser, createPost, (4) add DataLoader for batching user queries, (5) add authentication middleware: context: ({ req }) => { return { user: verifyToken(req) } }.","3 hrs"),
      d(19,"Observability — OpenTelemetry","Instrument services with traces, metrics, and logs using OpenTelemetry.","OpenTelemetry: vendor-neutral observability framework. Three pillars: traces (request journeys across services), metrics (counts, gauges, histograms), logs (structured events). @opentelemetry/api: the API package. @opentelemetry/sdk-node: Node.js SDK. Traces: spans form a tree — root span + child spans. Span attributes: http.method, http.url, db.statement. Context propagation: traceparent header carries trace context between services. Exporters: OTLP (to Jaeger, Zipkin, or any backend). Auto-instrumentation: @opentelemetry/auto-instrumentations-node instruments Express, pg, redis automatically.",[{type:"yt",url:"https://youtube.com/results?search_query=OpenTelemetry+Node.js+tutorial+distributed+tracing",label:"OpenTelemetry Tutorial"},{type:"web",url:"https://opentelemetry.io/docs/instrumentation/js/",label:"OpenTelemetry JS Docs"},{type:"web",url:"https://www.jaegertracing.io/",label:"Jaeger Tracing"}],"Draw a trace through your microservices: API Gateway → user-service → DB. What spans would you see? What attributes on each span?","🚀 TASK: (1) Install @opentelemetry/auto-instrumentations-node and configure SDK, (2) start Jaeger in Docker and configure OTLP exporter, (3) make a request to your API and view the trace in Jaeger UI, (4) add custom span attributes: user ID, query type, cache hit/miss, (5) propagate trace context between user-service and notification-service.","2.5 hrs"),
      d(20,"Week 2 Project — 3-Service Microservices System","Build a 3-service microservices system with API Gateway and message queue.","Build: user-service (auth + users), order-service (CRUD), notification-service (email via queue). Communication: Gateway routes HTTP. Async: RabbitMQ for order.created → notification-service. All services instrumented with OpenTelemetry.",[{type:"yt",url:"https://youtube.com/results?search_query=microservices+Node.js+complete+project+tutorial",label:"Microservices Project Tutorial"},{type:"web",url:"https://microservices.io/patterns/",label:"Microservices Patterns"}],"Review service boundaries: is each service truly independent? Can user-service be deployed without restarting order-service?","🚀 TASK: Build 3-service system: (1) user-service: register/login/profile, (2) order-service: CRUD orders, emits order.created to RabbitMQ, (3) notification-service: consumes from RabbitMQ, sends email, (4) API Gateway: JWT auth + routing, (5) Docker Compose with all 4 services + RabbitMQ + PostgreSQL + Redis.","4 hrs"),
    ],
    project:{ id:"iw2", title:"Microservices System",
      desc:"3-service microservices: user-service, order-service, notification-service. API Gateway with JWT auth. RabbitMQ async messaging. OAuth 2.0 Google login. 2FA with TOTP. GraphQL endpoint. OpenTelemetry distributed tracing to Jaeger. Docker Compose full stack." }
  },

  { week:3, title:"Advanced Databases & Caching", timeRange:"14–16 hrs",
    days:[
      d(21,"PostgreSQL Advanced — Transactions & Locking","Master ACID transactions, isolation levels, and row-level locking.","Transaction: atomic unit of work. BEGIN; ... COMMIT; or ROLLBACK; Isolation levels: Read Uncommitted (dirty reads), Read Committed (default — no dirty reads), Repeatable Read (no non-repeatable reads), Serializable (full isolation). SELECT FOR UPDATE: locks rows until transaction ends — prevents race conditions. SELECT FOR UPDATE SKIP LOCKED: skip locked rows — useful for job queues. Deadlocks: two transactions wait for each other. PostgreSQL detects and aborts one. pg client: const client = await pool.connect(); try { await client.query('BEGIN'); ... await client.query('COMMIT'); } finally { client.release(); }.",[{type:"yt",url:"https://youtube.com/results?search_query=PostgreSQL+transactions+isolation+levels+SELECT+FOR+UPDATE+tutorial",label:"PostgreSQL Transactions"},{type:"web",url:"https://www.postgresql.org/docs/current/transaction-iso.html",label:"PostgreSQL Isolation Levels"},{type:"web",url:"https://www.postgresql.org/docs/current/explicit-locking.html",label:"PostgreSQL Explicit Locking"}],"Two users simultaneously try to book the last seat in an event. Trace what happens at each isolation level. Which prevents double-booking?","🚀 TASK: (1) Implement a bank transfer function that uses a transaction to debit one account and credit another atomically, (2) simulate a race condition without transactions — show the bug, (3) fix it with SELECT FOR UPDATE, (4) implement a job queue using SELECT FOR UPDATE SKIP LOCKED, (5) deliberately cause a deadlock and observe PostgreSQL's error response.","3 hrs"),
      d(22,"Redis Advanced — Streams & Pub/Sub","Master Redis Streams and Pub/Sub for real-time event distribution.","Redis Pub/Sub: SUBSCRIBE channel, PUBLISH channel message — ephemeral, no persistence. Redis Streams: XADD stream * field value — persistent, ordered log. XREAD COUNT 10 STREAMS stream 0 — read from stream. Consumer groups: XGROUP CREATE stream group $ MKSTREAM. XREADGROUP GROUP group consumer COUNT 10 STREAMS stream >. XACK stream group messageId — acknowledge. Use Streams over Pub/Sub when: persistence needed, multiple consumers, retry on failure. Lua scripting: EVAL 'script' numkeys key [key ...] arg [arg ...] — atomic multi-command operations.",[{type:"yt",url:"https://youtube.com/results?search_query=Redis+Streams+pubsub+Node.js+tutorial",label:"Redis Streams Tutorial"},{type:"web",url:"https://redis.io/docs/data-types/streams/",label:"Redis Streams Docs"},{type:"web",url:"https://redis.io/docs/manual/pubsub/",label:"Redis Pub/Sub Docs"}],"Compare Pub/Sub vs Streams: what happens if a consumer is offline? How do Streams solve this? When is Pub/Sub still useful?","🚀 TASK: (1) Implement Redis Pub/Sub for real-time notifications across multiple server instances (solves Socket.io multi-instance problem), (2) implement a Redis Stream as an audit log: XADD every API call, (3) create a consumer group with two consumers reading from the stream, (4) implement XACK and failed message handling, (5) write a Lua script for atomic check-and-set (test-and-increment pattern).","3 hrs"),
      d(23,"Elasticsearch — Full-Text Search","Add full-text search to your API with Elasticsearch.","Elasticsearch: distributed search and analytics engine. Inverted index: maps terms to document IDs — enables fast full-text search. @elastic/elasticsearch npm package. const client = new Client({ node: 'http://localhost:9200' }). Index a document: client.index({ index: 'posts', document: { title, body } }). Search: client.search({ index: 'posts', query: { match: { body: 'search term' } } }). Bool query: must, should, must_not, filter. fuzzy: handles typos. Aggregations: bucket by category, date histogram. Update, delete by ID. Mappings: define field types (text, keyword, date, integer).",[{type:"yt",url:"https://youtube.com/results?search_query=Elasticsearch+Node.js+full+text+search+tutorial",label:"Elasticsearch Tutorial"},{type:"web",url:"https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/",label:"Elasticsearch JS Client"},{type:"web",url:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html",label:"Elasticsearch Query DSL"}],"Design a search feature for a blog: what fields are searchable? What boost weights? What filters? How do you handle partial matches and typos?","🚀 TASK: (1) Run Elasticsearch in Docker and connect with JS client, (2) index all posts from PostgreSQL into Elasticsearch, (3) implement GET /api/v1/search?q=term using match query, (4) add fuzzy matching (fuzziness: 'AUTO'), (5) add aggregation: search results grouped by category with counts.","3 hrs"),
      d(24,"Database Sharding & Replication","Understand horizontal scaling patterns for databases.","Sharding: horizontal partitioning — split data across multiple DB servers. Shard key: determines which server holds a record. Hash-based sharding: consistent hashing ensures even distribution. Range-based: date or ID ranges per shard. Challenges: cross-shard queries, distributed transactions, resharding. Replication: primary-replica setup. Primary: handles writes. Replicas: handle reads — read scaling. Synchronous replication: replica confirms before primary commits — strong consistency, higher latency. Asynchronous: eventual consistency, lower latency. Replication lag: replicas may be seconds behind. PgBouncer: connection pooler that sits in front of PostgreSQL.",[{type:"yt",url:"https://youtube.com/results?search_query=database+sharding+replication+PostgreSQL+tutorial",label:"Database Sharding Tutorial"},{type:"web",url:"https://www.postgresql.org/docs/current/high-availability.html",label:"PostgreSQL High Availability"},{type:"web",url:"https://www.pgbouncer.org/",label:"PgBouncer Docs"}],"For a social network with 100M users: how would you shard by user_id? What queries become hard to do efficiently after sharding?","🚀 TASK: (1) Set up a PostgreSQL primary + replica using Docker Compose, (2) configure your app to write to primary and read from replica, (3) simulate replication lag: write then immediately read from replica — observe stale data, (4) implement read-your-writes: route reads to primary for 1 second after writes, (5) add PgBouncer in front of primary as connection pooler.","2.5 hrs"),
      d(25,"Intermediate Capstone Prep","Plan and scaffold the intermediate capstone: production SaaS backend.","Design a production SaaS project management platform with all intermediate concepts. Architecture: microservices (user-service, project-service, notification-service), TypeScript, OAuth2 + 2FA auth, CQRS for project domain, Kafka event bus, Elasticsearch search, Redis + Bull, K8s deployment, full OpenTelemetry observability.",[{type:"yt",url:"https://youtube.com/results?search_query=SaaS+backend+architecture+design+Node.js+microservices",label:"SaaS Backend Architecture"},{type:"web",url:"https://github.com/",label:"GitHub"}],"Draw the full system diagram: all services, databases, message queues, observability stack, deployment infrastructure.","🚀 TASK: (1) Create the monorepo structure with services/, shared/, infrastructure/ directories, (2) scaffold each microservice with TypeScript + Express + Dockerfile, (3) write the domain model: entities, aggregates, value objects, (4) define all Kafka topics and events, (5) write the API contract between services.","2 hrs"),
    ],
    project:{ id:"iw3", title:"Production SaaS Backend",
      desc:"Multi-service TypeScript backend. OAuth2 + 2FA. Kafka event bus. Elasticsearch full-text search. Redis Streams for audit log. PostgreSQL primary-replica with read routing. PgBouncer connection pooling. Full OpenTelemetry instrumentation. GraphQL endpoint with DataLoader." }
  },



  // ── Week 4 — Microservices Architecture (iw) ─────────────
  { week:4, title:"Microservices Architecture", timeRange:"16–18 hrs",
    days:[
      d(26,"Monolith vs Microservices","Understand when and how to decompose a monolith into microservices.","Conway's Law: organisations design systems mirroring their communication structure. A monolith is a single deployable unit — fast to develop initially but hard to scale teams and components independently. Microservices: independently deployable services, each owning its data store and domain. Decomposition strategies: by business capability (orders, inventory, payments), by DDD bounded context, by team ownership. When NOT to use microservices: early-stage products, small teams, unclear domain boundaries — the distributed system tax is high. Challenges: network latency, distributed transactions, service discovery, operational complexity, debugging across service boundaries.",[{type:"yt",url:"https://youtube.com/results?search_query=monolith+vs+microservices+when+to+decompose+tutorial",label:"Monolith vs Microservices"},{type:"web",url:"https://microservices.io/patterns/",label:"Microservices.io Patterns"},{type:"web",url:"https://martinfowler.com/articles/microservices.html",label:"Fowler: Microservices"}],"Take your capstone API and identify 3 bounded contexts. What data does each own? Which domain events cross boundaries? Draw the context map.","🚀 TASK: (1) Analyse your current API — identify bounded contexts (auth, users, content, notifications), (2) design the service decomposition with clear ownership of each data entity, (3) identify shared data that becomes inter-service API calls, (4) draw the service interaction diagram with sync/async labels on each arrow, (5) write a pros/cons ADR for microservices vs monolith for your specific use case.","2 hrs"),
      d(27,"gRPC & Protocol Buffers","Build high-performance inter-service communication with gRPC.","gRPC: high-performance RPC framework using Protocol Buffers (protobuf) for serialisation. Protobuf: binary format — 3-10x smaller than JSON, faster to serialise/deserialise. Define .proto file: service UserService { rpc GetUser (GetUserRequest) returns (UserResponse); }. message GetUserRequest { string id = 1; }. @grpc/grpc-js: Node.js gRPC library. @grpc/proto-loader: loads .proto at runtime. Streaming RPCs: server-side (server streams responses), client-side (client streams requests), bidirectional. gRPC vs REST: gRPC wins on performance and type safety; REST wins on browser support and tooling. gRPC-Web: allows browser clients via a proxy.",[{type:"yt",url:"https://youtube.com/results?search_query=gRPC+Node.js+protocol+buffers+tutorial+2024",label:"gRPC Node.js Tutorial"},{type:"web",url:"https://grpc.io/docs/languages/node/",label:"gRPC Node.js Docs"},{type:"web",url:"https://protobuf.dev/getting-started/",label:"Protocol Buffers Guide"}],"Design a .proto file for a user-service: define GetUser, CreateUser, ListUsers RPCs with request/response messages. What field types do you need?","🚀 TASK: (1) Create users.proto with UserService definition and User/GetUserRequest/CreateUserRequest messages, (2) implement a gRPC server with @grpc/grpc-js serving GetUser from in-memory store, (3) implement a gRPC client that calls GetUser and CreateUser, (4) add server-side streaming: ListUsers streams User messages one by one, (5) benchmark gRPC vs REST JSON for 10k requests — measure throughput and latency difference.","3 hrs"),
      d(28,"Service Discovery & Health Checks","Implement service discovery and health check patterns for microservices.","Service discovery: how services find each other's addresses without hardcoding. Client-side discovery: service queries a registry (Consul, etcd) to find instances. Server-side discovery: load balancer queries registry and routes traffic. DNS-based discovery: Kubernetes services are reachable by DNS name (user-service.default.svc.cluster.local). Health checks: liveness (is the process running?) and readiness (is it ready to serve traffic?). /health endpoint: { status: 'ok', uptime, version, dependencies: { db: 'ok', redis: 'ok' } }. Circuit breaker with opossum: on repeated failures, circuit opens — calls return fallback immediately instead of waiting for timeout.",[{type:"yt",url:"https://youtube.com/results?search_query=service+discovery+health+checks+microservices+Node.js+tutorial",label:"Service Discovery Tutorial"},{type:"web",url:"https://github.com/nodeshift/opossum",label:"opossum Circuit Breaker"},{type:"web",url:"https://www.consul.io/docs/intro",label:"Consul Docs"}],"Draw the circuit breaker state machine: Closed → Open → Half-Open. What triggers each transition? What does the fallback return?","🚀 TASK: (1) Implement GET /health endpoint returning uptime, version, and async DB/Redis ping status, (2) implement GET /ready endpoint that returns 503 until DB connection is established, (3) add opossum circuit breaker wrapping your notification-service HTTP call, (4) configure: volumeThreshold:5, errorThresholdPercentage:50, timeout:3000, (5) simulate notification-service being down — verify circuit opens and fallback fires after 5 failures.","2.5 hrs"),
      d(29,"Distributed Tracing Across Services","Propagate OpenTelemetry trace context across microservice boundaries.","Distributed tracing: a single user request spans multiple services — tracing stitches together the full journey. W3C Trace Context standard: traceparent header (version-traceId-parentSpanId-flags) propagates context. @opentelemetry/auto-instrumentations-node auto-injects traceparent into outgoing HTTP requests. Each service creates child spans under the same traceId. Span attributes: http.method, http.url, db.statement (sanitised), user.id. Jaeger: open-source distributed tracing backend — stores and visualises traces. Sampling: head-based (decide at trace start), tail-based (decide after seeing full trace — catches errors).",[{type:"yt",url:"https://youtube.com/results?search_query=OpenTelemetry+distributed+tracing+microservices+Node.js+Jaeger",label:"Distributed Tracing Tutorial"},{type:"web",url:"https://opentelemetry.io/docs/instrumentation/js/",label:"OTel JS Docs"},{type:"web",url:"https://www.jaegertracing.io/docs/",label:"Jaeger Docs"}],"Trace a PlaceOrder request: API Gateway → order-service → user-service → notification-service. Draw every span with its parent. What attributes on each?","🚀 TASK: (1) Install @opentelemetry/auto-instrumentations-node in all 3 services and configure OTLP exporter, (2) start Jaeger via docker run -p 16686:16686 jaegertracing/all-in-one, (3) make a cross-service request and find the trace in Jaeger UI — verify all spans appear under one traceId, (4) add custom span attributes to order-service: userId, orderId, item count, (5) implement baggage propagation: set request-source in gateway, read it in order-service spans.","2.5 hrs"),
      d(30,"Docker Compose for Microservices","Orchestrate a multi-service development environment with Docker Compose.","Docker Compose v2: docker compose (no hyphen). services block defines each container. Each service needs: image or build, ports, environment, depends_on with condition: service_healthy. Health check: test: ['CMD', 'pg_isready'], interval: 5s, retries: 5. Networks: all services on the same network reach each other by service name. Named volumes persist data between compose down/up. Environment variables via env_file: .env.dev. Profiles: docker compose --profile debug up starts optional debug services. docker compose watch: hot-reloads on file changes (v2.22+).",[{type:"yt",url:"https://youtube.com/results?search_query=Docker+Compose+microservices+Node.js+multiple+services+2024",label:"Docker Compose Microservices"},{type:"web",url:"https://docs.docker.com/compose/compose-file/",label:"Compose File Reference"},{type:"web",url:"https://docs.docker.com/compose/how-tos/startup-order/",label:"Compose Startup Order"}],"Design the docker-compose.yml for your 3-service system: list every service, its dependencies, health checks, env vars, and volumes.","🚀 TASK: (1) Write docker-compose.yml with: postgres (health check), redis, rabbitmq (management UI on 15672), user-service, order-service, notification-service, (2) add health check depends_on so services only start when DB is healthy, (3) add named volume postgres_data and verify data persists after compose down/up, (4) use env_file: .env.dev for each service, (5) run docker compose logs -f --tail=50 and verify inter-service communication.","3 hrs"),
    ],
    project:{ id:"iw4", title:"3-Service Microservices System",
      desc:"user-service, order-service, notification-service with gRPC inter-service calls. opossum circuit breakers with fallbacks. OpenTelemetry distributed tracing to Jaeger. /health and /ready endpoints. Full Docker Compose stack with PostgreSQL, Redis, RabbitMQ with health-check startup ordering." }
  },

  // ── Week 5 — Advanced Auth & Security ────────────────────
  { week:5, title:"Advanced Auth & Security", timeRange:"14–16 hrs",
    days:[
      d(31,"OAuth 2.0 & OpenID Connect","Implement OAuth 2.0 authorization code flow with PKCE and OpenID Connect.","OAuth 2.0 Authorization Code flow with PKCE: (1) generate code_verifier (128-char random) and code_challenge (SHA-256 of verifier), (2) redirect to provider with code_challenge, (3) provider redirects back with code, (4) exchange code + code_verifier for tokens. PKCE prevents authorization code interception. OpenID Connect: identity layer on OAuth — ID token (JWT) contains user claims (sub, email, name). /.well-known/openid-configuration: auto-discovery endpoint. jwks_uri: fetch public keys for ID token verification. passport.js: passport-google-oauth20, passport-github2 implement the flow.",[{type:"yt",url:"https://youtube.com/results?search_query=OAuth+2.0+PKCE+OpenID+Connect+Node.js+tutorial",label:"OAuth 2.0 PKCE Tutorial"},{type:"web",url:"https://oauth.net/2/pkce/",label:"OAuth 2.0 PKCE Spec"},{type:"web",url:"https://openid.net/connect/",label:"OpenID Connect Spec"}],"Trace the OAuth Authorization Code + PKCE flow step by step. What prevents an attacker who intercepts the code from using it?","🚀 TASK: (1) Install passport + passport-google-oauth20, configure strategy with clientID/clientSecret/callbackURL, (2) implement GET /auth/google and GET /auth/google/callback — link Google account to existing user by email, (3) implement PKCE: generate code_verifier, hash to code_challenge, verify on token exchange, (4) implement GitHub OAuth as second provider, (5) handle edge cases: user cancels OAuth, email collision with password user, account already linked to different provider.","3 hrs"),
      d(32,"Two-Factor Authentication","Add TOTP-based 2FA with QR codes and backup codes to your auth system.","TOTP (Time-based One-Time Password): RFC 6238 standard. speakeasy.generateSecret({ length: 20 }) returns { base32, otpauthUrl }. The otpauthUrl encodes as a QR code — user scans with Google Authenticator or Authy. speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 }) — window: 1 allows 30 second clock drift. Backup codes: generate 10 × crypto.randomBytes(4).toString('hex'). Store hashed with bcrypt, mark as used — one-time only. 2FA login flow: password check → if twoFactorEnabled → require TOTP → issue full JWT only after verification. Store: twoFactorEnabled flag, twoFactorSecret (AES-256-GCM encrypted at rest).",[{type:"yt",url:"https://youtube.com/results?search_query=2FA+TOTP+speakeasy+Node.js+authentication+tutorial",label:"2FA TOTP Tutorial"},{type:"web",url:"https://www.npmjs.com/package/speakeasy",label:"speakeasy Docs"},{type:"web",url:"https://github.com/soldair/node-qrcode",label:"qrcode npm"}],"Map the 2FA setup flow: user enables 2FA → what endpoints are called → what is stored in the DB → what happens on next login?","🚀 TASK: (1) POST /auth/2fa/setup: generate TOTP secret, store encrypted, return QR code data URL via qrcode.toDataURL(otpauthUrl), (2) POST /auth/2fa/verify: verify TOTP token to confirm setup, set twoFactorEnabled=true, (3) update POST /auth/login: if twoFactorEnabled, return { requiresMfa: true, mfaToken } (short-lived JWT), (4) POST /auth/2fa/validate: verify TOTP against stored secret, issue full access + refresh tokens, (5) generate 10 backup codes — hash and store — POST /auth/2fa/backup to use one (mark used, cannot reuse).","3 hrs"),
      d(33,"API Keys & Secrets Management","Implement hashed API keys with scopes and integrate HashiCorp Vault.","API Keys: generate with crypto.randomBytes(32).toString('hex') — prefix with your app name (e.g. 'rmap_'). Never store raw key — store SHA-256 hash. Return raw key once on creation. Scoped permissions: key.scopes = ['read:posts', 'write:posts'] — middleware checks scope before allowing. Usage tracking: log keyId, timestamp, endpoint, IP per request. Rotation: create new key, overlap period, revoke old. HashiCorp Vault: secrets as a service — vault kv put secret/db password=xyz. node-vault npm: const vault = require('node-vault')(); const { data } = await vault.read('secret/data/db'). Dynamic secrets: Vault generates time-limited PostgreSQL credentials — more secure than static passwords.",[{type:"yt",url:"https://youtube.com/results?search_query=API+key+management+Node.js+HashiCorp+Vault+secrets+tutorial",label:"API Keys & Vault Tutorial"},{type:"web",url:"https://developer.hashicorp.com/vault/docs/secrets/kv",label:"Vault KV Docs"},{type:"web",url:"https://www.npmjs.com/package/node-vault",label:"node-vault npm"}],"Compare storing API keys as plaintext vs hashed: what is the threat model in each case? What happens if your DB is breached?","🚀 TASK: (1) POST /api-keys: generate key, hash with SHA-256, store { hash, name, scopes, userId, lastUsed }, return raw key once, (2) implement apiKeyAuth middleware: hash incoming key, look up by hash, attach to req.apiKey, (3) add scope checking: requireScope('write:posts') → 403 if missing, (4) log each API key usage to api_key_logs table with timestamp and endpoint, (5) run Vault in dev mode, store DB password in Vault, fetch with node-vault on startup.","3 hrs"),
      d(34,"Advanced Security — OWASP Top 10","Defend against the OWASP Top 10 most critical security risks.","OWASP Top 10: Injection (SQL/NoSQL/command), Broken Access Control (always check ownership), Cryptographic Failures (use bcrypt/argon2, AES-256-GCM, HTTPS), Security Misconfiguration (helmet headers, disable X-Powered-By), SSRF (validate/block private IP ranges before fetch), Mass Assignment (allowlist fields on update), Insecure Deserialization (validate JSON shape with Zod), Logging failures (log access events, alert on anomalies). NoSQL injection: MongoDB operators in user input — { $where: 'malicious JS' } — sanitize with mongo-sanitize. Content-Security-Policy via helmet.contentSecurityPolicy() prevents XSS. helmet.hsts({ maxAge: 31536000 }) enforces HTTPS.",[{type:"yt",url:"https://youtube.com/results?search_query=OWASP+Top+10+Node.js+Express+security+fixes+tutorial",label:"OWASP Top 10 Node.js"},{type:"web",url:"https://owasp.org/www-project-top-ten/",label:"OWASP Top 10"},{type:"web",url:"https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html",label:"OWASP Node.js Cheat Sheet"}],"Audit your API: for each OWASP Top 10 category, find one real vulnerability in your codebase and plan the fix.","🚀 TASK: (1) Install mongo-sanitize and sanitize all req.body/params before MongoDB queries, (2) add ownership check to every resource route: verify resource.userId === req.user.id before mutating, (3) configure helmet with strict CSP, HSTS maxAge:31536000, X-Content-Type-Options:nosniff, (4) implement SSRF protection: parse user-supplied URLs, reject private ranges (10.x, 172.16.x, 192.168.x, 127.x) before fetch, (5) add mass assignment protection: create explicit allowlist of updatable fields per model — never spread req.body directly.","2 hrs"),
      d(35,"Security CI & Penetration Testing","Automate OWASP ZAP scanning and dependency auditing in your CI pipeline.","DAST (Dynamic Application Security Testing): OWASP ZAP scans a running application. docker run -t owasp/zap2docker-stable zap-api-scan.py -t http://host.docker.internal:3000/api/openapi.json -f openapi. ZAP finds: SQL injection, XSS, CSRF, open redirects, insecure headers, path traversal. SAST: eslint-plugin-security — static analysis for common Node.js security mistakes. npm audit --audit-level=high: checks dependencies against known CVE database. Snyk: deeper dependency scanning — identifies transitive vulnerabilities, provides fix PRs. git-secrets or truffleHog: prevent committing API keys, AWS credentials, JWT secrets. GitHub Actions: fail PR if HIGH findings in ZAP report or npm audit.",[{type:"yt",url:"https://youtube.com/results?search_query=OWASP+ZAP+automated+security+scan+GitHub+Actions+Node.js+CI",label:"OWASP ZAP CI Pipeline"},{type:"web",url:"https://www.zaproxy.org/docs/docker/api-scan/",label:"ZAP API Scan Docs"},{type:"web",url:"https://snyk.io/",label:"Snyk"}],"What vulnerabilities can DAST (ZAP) find that SAST cannot? What can SAST find that ZAP cannot? Where does npm audit fit?","🚀 TASK: (1) Run npm audit --audit-level=high and fix all HIGH/CRITICAL vulnerabilities, (2) run OWASP ZAP API scan against local API — fix at least 2 HIGH findings from the HTML report, (3) add ZAP scan to GitHub Actions: run on PRs, upload report as artifact, fail if HIGH issues found, (4) install eslint-plugin-security and fix all reported security issues, (5) install git-secrets with pre-commit hook blocking AWS keys and JWT secrets from being committed.","2.5 hrs"),
    ],
    project:{ id:"iw5", title:"Identity Service",
      desc:"OAuth 2.0 with Google + GitHub (PKCE). TOTP 2FA with QR code setup and backup codes. Hashed API keys with scopes and usage logging. Vault-backed secrets management. OWASP ZAP automated scan in GitHub Actions CI. helmet CSP + HSTS. Mass assignment protection and SSRF prevention across all routes." }
  },

  // ── Week 6 — Advanced Databases ──────────────────────────
  { week:6, title:"Advanced Databases", timeRange:"14–16 hrs",
    days:[
      d(36,"PostgreSQL Advanced — Transactions & Locking","Master ACID transactions, isolation levels, and row-level locking.","Isolation levels: Read Committed (default — prevents dirty reads), Repeatable Read (prevents non-repeatable reads — same query returns same data within transaction), Serializable (full isolation — detects write-write conflicts between concurrent transactions). SELECT FOR UPDATE: acquires a row-level lock until transaction commits or rolls back — prevents concurrent modification. SELECT FOR UPDATE SKIP LOCKED: skips already-locked rows — ideal for job queues where multiple workers claim different jobs without blocking each other. Deadlock: two transactions each wait for the other's lock — PostgreSQL detects and aborts one, returning error code 40P01. pg pool: const client = await pool.connect(); then client.query('BEGIN') → work → client.query('COMMIT') → client.release() in finally.",[{type:"yt",url:"https://youtube.com/results?search_query=PostgreSQL+transactions+isolation+levels+SELECT+FOR+UPDATE+tutorial",label:"PostgreSQL Transactions"},{type:"web",url:"https://www.postgresql.org/docs/current/transaction-iso.html",label:"PostgreSQL Isolation Levels"},{type:"web",url:"https://www.postgresql.org/docs/current/explicit-locking.html",label:"PostgreSQL Locking"}],"Two users simultaneously book the last seat. Trace what happens at Read Committed vs Serializable isolation. Which prevents double-booking?","🚀 TASK: (1) Implement bank transfer using a transaction: BEGIN → debit A → credit B → COMMIT, rollback on any error, (2) reproduce a race condition (concurrent requests both pass stock check), fix it with SELECT FOR UPDATE, (3) implement job queue: workers use SELECT FOR UPDATE SKIP LOCKED to claim one job at a time without blocking each other, (4) deliberately cause a deadlock — two connections locking rows in opposite order — observe PostgreSQL error 40P01, (5) implement idempotent endpoint using pg_try_advisory_lock(hashKey) to prevent duplicate submissions.","3 hrs"),
      d(37,"ClickHouse & Time-Series Analytics","Build analytical queries with columnar storage for metrics and event data.","ClickHouse: open-source columnar database — stores columns separately, reads only relevant columns for a query. MergeTree engine: data sorted by primary key ORDER BY (date, userId), merged in background compaction. INSERT batching: optimised for thousands of rows per insert, not single-row INSERTs — batch with a local buffer. @clickhouse/client npm package. toStartOfHour(timestamp) — time bucketing function. SELECT toStartOfHour(created_at) hour, count() cnt FROM events GROUP BY hour ORDER BY hour runs 10-100x faster than PostgreSQL. TimescaleDB: PostgreSQL extension for time-series — CREATE TABLE AS hypertable, time_bucket('1 hour', created_at) — familiar SQL syntax.",[{type:"yt",url:"https://youtube.com/results?search_query=ClickHouse+Node.js+analytics+tutorial+columnar+database",label:"ClickHouse Tutorial"},{type:"web",url:"https://clickhouse.com/docs/en/getting-started/quick-start",label:"ClickHouse Quick Start"},{type:"web",url:"https://docs.timescale.com/",label:"TimescaleDB Docs"}],"For 'hourly signups by country over 7 days': compare query plans in PostgreSQL (row store) vs ClickHouse (columnar). Why is ClickHouse 50x faster for this query?","🚀 TASK: (1) Run ClickHouse in Docker and connect with @clickhouse/client, (2) create events table with ENGINE=MergeTree() ORDER BY (toDate(created_at), user_id), (3) bulk-insert 100k synthetic rows, (4) run GROUP BY aggregation (hourly counts by event_type) and compare time vs identical PostgreSQL query, (5) implement GET /analytics/events?from=&to= querying ClickHouse and returning time-bucketed counts.","3 hrs"),
      d(38,"GraphQL with DataLoader","Build a production GraphQL API with N+1 query elimination using DataLoader.","GraphQL: clients specify exact fields needed — no over-fetching or under-fetching. apollo-server-express: const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ user: verifyToken(req), loaders: createLoaders() }) }). N+1 problem: fetching 10 users + their posts naively fires 11 queries (1 for users, 10 for posts). DataLoader: collects all IDs during a tick → fires one batched query → maps results back. const postsByUserLoader = new DataLoader(async (userIds) => { const posts = await db.query('SELECT * FROM posts WHERE user_id = ANY($1)', [userIds]); return userIds.map(id => posts.filter(p => p.userId === id)); }). Subscriptions: real-time via WebSocket — graphql-ws or subscriptions-transport-ws.",[{type:"yt",url:"https://youtube.com/results?search_query=GraphQL+Apollo+Server+DataLoader+N+1+Node.js+tutorial",label:"GraphQL DataLoader Tutorial"},{type:"web",url:"https://www.apollographql.com/docs/apollo-server/",label:"Apollo Server Docs"},{type:"web",url:"https://github.com/graphql/dataloader",label:"DataLoader GitHub"}],"Count DB queries: 5 users with their posts — naïve vs DataLoader. Draw the query timeline for each. What DB feature enables the batched query?","🚀 TASK: (1) Add Apollo Server to Express — define User, Post, Comment types with relations, (2) implement resolvers using DataLoader for User.posts and Post.comments — verify only 1 batch query per type, (3) implement mutations: createPost, updatePost, deletePost with auth context check, (4) add input validation with graphql-shield: @authenticated, @hasRole('admin') directives, (5) add GraphQL subscription: POST_CREATED event pushed to subscribers via WebSocket.","3 hrs"),
      d(39,"Distributed Caching Strategies","Implement cache-aside, write-through, and cache stampede prevention.","Cache-aside (lazy loading): check cache → miss → query DB → store in cache → return. Write-through: write to cache and DB simultaneously — cache always up to date, write latency doubles. TTL-based invalidation: simple but allows stale reads. Event-driven invalidation: on mutation, DELETE cache key immediately — complex but consistent. Cache stampede (thundering herd): many requests simultaneously miss cache and all hit DB. Prevention: (1) probabilistic early expiration — re-cache before TTL expires based on computation time, (2) distributed lock — SET key value NX PX 5000 — only one process refreshes, others retry. ioredis Cluster mode: connects to multiple Redis nodes for horizontal scale.",[{type:"yt",url:"https://youtube.com/results?search_query=Redis+cache+aside+stampede+prevention+Node.js+tutorial",label:"Advanced Caching Patterns"},{type:"web",url:"https://redis.io/docs/manual/patterns/",label:"Redis Patterns Docs"},{type:"web",url:"https://redis.io/docs/management/scaling/",label:"Redis Cluster Docs"}],"For GET /products (list) and GET /products/:id: what are the cache keys? How do you invalidate the list cache when one product changes?","🚀 TASK: (1) Implement cache-aside middleware: check Redis → cache hit returns JSON, miss queries DB and stores with TTL, (2) implement event-driven invalidation: on POST/PUT/DELETE /products, use SCAN + pipeline to delete matching cache keys, (3) implement stampede protection: on cache miss, SET NX lock key — one process refreshes, others retry after 50ms, (4) track cache hit/miss ratio with prom-client Counter, expose via /metrics, (5) configure ioredis in Cluster mode targeting a 3-node Redis Cluster in Docker Compose.","2.5 hrs"),
      d(40,"Week 6 Review — Search & Analytics API","Build an integrated search and analytics API using Elasticsearch, ClickHouse, and Redis.","Combine Week 6 concepts: Elasticsearch for full-text product and post search, ClickHouse for aggregated analytics, Redis for hot-data caching. Write path: PostgreSQL mutation → Bull queue job → worker indexes to Elasticsearch + inserts event to ClickHouse. Read path: search hits Elasticsearch (cached in Redis), analytics hits ClickHouse (result cached 5 min), user data hits PostgreSQL (cached in Redis 1 min). GraphQL as unified query layer: single endpoint combining search, analytics, and CRUD. Key design: sync pipeline via Bull queue ensures write-side failures don't block HTTP responses.",[{type:"yt",url:"https://youtube.com/results?search_query=Elasticsearch+ClickHouse+Redis+analytics+search+Node.js+project",label:"Search & Analytics Project"},{type:"web",url:"https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html",label:"Elasticsearch Reference"}],"When a user creates a post, trace the full data flow to Elasticsearch and ClickHouse. What happens if Elasticsearch is down at sync time?","🚀 TASK: Build Search & Analytics API: (1) Elasticsearch: full-text search with fuzzy matching, category filter, date range filter — GET /search?q=term&category=tech, (2) ClickHouse: analytics endpoint — posts per hour, top tags by count, user activity heatmap — GET /analytics/summary?from=&to=, (3) Redis: cache top-10 search results by query for 60s, cache analytics response for 5 minutes, (4) GraphQL: unified query combining search + analytics + user data with DataLoader, (5) Bull sync worker: on post creation, index to Elasticsearch and insert event to ClickHouse — retry 3 times on failure.","4 hrs"),
    ],
    project:{ id:"iw6", title:"Search & Analytics API",
      desc:"Elasticsearch full-text search with fuzzy matching and aggregations. ClickHouse columnar analytics with time-bucketed hourly queries. PostgreSQL SELECT FOR UPDATE job queue. GraphQL with DataLoader (zero N+1 queries). Redis cache-aside with stampede prevention. Bull sync pipeline from PostgreSQL to Elasticsearch and ClickHouse." }
  },

  // ── Week 7 — Cloud & Infrastructure ──────────────────────
  { week:7, title:"Cloud & Infrastructure", timeRange:"14–16 hrs",
    days:[
      d(41,"AWS Core Services","Master IAM, EC2, VPC, S3, and Route 53 for production deployments.","IAM: users, roles, policies — least privilege. Attach policies to roles, assign roles to EC2/Lambda/ECS. Never use root credentials — create an admin IAM user. EC2: virtual machines — choose instance type (t3.micro for dev, c6i.large for compute), AMIs, security groups (stateful firewall — inbound/outbound rules). VPC: isolated virtual network — public subnets (internet gateway route), private subnets (no direct internet access). NAT Gateway: lets private subnet instances reach internet for software updates without being publicly reachable. S3: object storage — presigned URLs (getSignedUrl for download, createPresignedPost for browser uploads), bucket policies, lifecycle rules (transition to Glacier after 90 days). Route 53: DNS — A records, CNAME, alias records, health checks, failover routing.",[{type:"yt",url:"https://youtube.com/results?search_query=AWS+IAM+EC2+VPC+S3+Route53+tutorial+2024",label:"AWS Core Services"},{type:"web",url:"https://docs.aws.amazon.com/vpc/latest/userguide/",label:"AWS VPC Docs"},{type:"web",url:"https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html",label:"S3 Presigned Upload"}],"Design the AWS network for your API: VPC with public/private subnets, internet gateway, NAT gateway, security groups. What lives in each subnet?","🚀 TASK: (1) Create a VPC with Terraform: public + private subnets, internet gateway, NAT gateway, route tables, (2) deploy EC2 in private subnet — verify it reaches internet via NAT but is not directly reachable, (3) implement S3 presigned upload: POST /upload/presign returns presigned URL, client uploads directly to S3, (4) configure bucket policy: allow presigned uploads, block all public access, (5) set up Route 53 A record pointing to your application load balancer.","3 hrs"),
      d(42,"AWS Serverless — Lambda & API Gateway","Build and deploy serverless functions with Lambda, API Gateway, and SQS.","Lambda: function-as-a-service. Node.js 20.x runtime. Handler: exports.handler = async (event, context) => { return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }; }. event.body: request body string (JSON.parse it). event.pathParameters: path params from API Gateway. Cold start: 100-500ms runtime initialisation on first invocation — keep dependencies minimal, avoid heavy imports at top level. Provisioned concurrency: pre-warms N instances. API Gateway: HTTP trigger — configure routes, CORS, authorizers. SQS trigger: Lambda invokes on SQS messages — batchSize: 10. Dead letter queue: failed invocations routed to DLQ. SAM: template.yaml defines resources — sam local start-api for local testing.",[{type:"yt",url:"https://youtube.com/results?search_query=AWS+Lambda+API+Gateway+SQS+Node.js+serverless+tutorial",label:"Lambda + API Gateway Tutorial"},{type:"web",url:"https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html",label:"Lambda Node.js Handler"},{type:"web",url:"https://docs.aws.amazon.com/serverless-application-model/",label:"AWS SAM Docs"}],"Compare Lambda cold start vs warm start. What initialisation runs only on cold start? What is the minimum memory setting that minimises Node.js cold start?","🚀 TASK: (1) Create a Lambda function via SAM template.yaml — handle GET /users and POST /users, (2) configure API Gateway HTTP trigger with CORS headers in Lambda response, (3) add SQS trigger: Lambda processes email notification jobs from SQS queue in batches of 10, (4) configure DLQ on Lambda — trigger a failure and verify message lands in DLQ, (5) measure cold start (invoke cold) vs warm start latency — enable provisioned concurrency: 1 and re-measure.","3 hrs"),
      d(43,"Kubernetes Basics","Deploy containerised services to Kubernetes with Deployments, Services, and probes.","Kubernetes objects: Pod (1+ containers sharing network/storage — never create directly), Deployment (desired state — spec.replicas, spec.strategy: RollingUpdate, spec.template), Service (stable DNS + load balancing — ClusterIP for internal, NodePort/LoadBalancer for external), ConfigMap (non-sensitive config as env vars or mounted files), Secret (base64-encoded sensitive values). kubectl: apply -f manifest.yaml, get pods -w, describe pod, logs -f, exec -it, rollout status, rollout undo. Resource requests/limits: resources.requests.cpu:'100m' resources.limits.memory:'256Mi' — prevents noisy neighbour problems. Liveness probe: httpGet /health — restart pod if failing. Readiness probe: httpGet /ready — remove pod from service until ready.",[{type:"yt",url:"https://youtube.com/results?search_query=Kubernetes+tutorial+Deployment+Service+ConfigMap+Secrets+2024",label:"Kubernetes Basics Tutorial"},{type:"web",url:"https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",label:"K8s Deployment Docs"},{type:"web",url:"https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",label:"K8s Probes"}],"Design K8s manifests for user-service: Deployment spec, Service type, what comes from ConfigMap vs Secret, liveness vs readiness probe differences.","🚀 TASK: (1) Install minikube — create Deployment manifest for user-service: 2 replicas, resource limits, liveness + readiness probes, (2) create ClusterIP Service and verify pods are reachable within cluster, (3) store DB credentials in a Secret — mount as env vars in Deployment, (4) create ConfigMap for LOG_LEVEL and PORT, (5) perform rolling update: change image tag, apply, watch kubectl rollout status — then rollout undo.","3 hrs"),
      d(44,"Terraform Infrastructure as Code","Provision cloud infrastructure reproducibly with Terraform modules and remote state.","Terraform HCL: resource, data, variable, output, module blocks. resource 'aws_db_instance' 'main' { engine='postgres' instance_class='db.t3.micro' }. terraform init downloads providers. terraform plan shows diff. terraform apply provisions. State: stored in terraform.tfstate — for teams use S3 backend with DynamoDB locking: terraform { backend 's3' { bucket='tf-state' key='prod/terraform.tfstate' region='us-east-1' } }. Variables: var.environment — set via .tfvars file or TF_VAR_environment env var. Outputs expose values to other configs. Modules: reusable components — module 'vpc' { source='./modules/vpc' cidr='10.0.0.0/16' }. Workspace: terraform workspace new staging creates isolated state.",[{type:"yt",url:"https://youtube.com/results?search_query=Terraform+AWS+infrastructure+modules+remote+state+tutorial",label:"Terraform Tutorial"},{type:"web",url:"https://developer.hashicorp.com/terraform/docs",label:"Terraform Docs"},{type:"web",url:"https://registry.terraform.io/providers/hashicorp/aws/latest/docs",label:"Terraform AWS Provider"}],"List every AWS resource your API needs. Group into modules: networking, compute, database, cache. What does each module output for others to consume?","🚀 TASK: (1) Write main.tf with VPC module: VPC, 2 public + 2 private subnets, internet gateway, NAT gateway, (2) add RDS PostgreSQL in private subnet — security group allows only app subnet traffic, (3) add ElastiCache Redis in private subnet, (4) configure S3 backend with DynamoDB lock table, (5) create staging and production workspaces — apply to staging, verify all resources created correctly.","2.5 hrs"),
      d(45,"CI/CD to Kubernetes","Build a complete GitHub Actions pipeline that deploys to EKS on every merge.","GitHub Actions workflow for K8s deployment: on push to main → checkout → configure AWS credentials (aws-actions/configure-aws-credentials) → build Docker image → push to ECR (docker/build-push-action) → update kubeconfig (aws eks update-kubeconfig) → kubectl rollout restart deployment/user-service. Kustomize: overlays for staging/production — kustomization.yaml patches image tags. Image tagging: use commit SHA as tag — never use latest in production. Rollback: kubectl rollout undo deployment/user-service or push a revert commit. HPA: kubectl autoscale deployment user-service --min=2 --max=10 --cpu-percent=70 — test by generating load with k6.",[{type:"yt",url:"https://youtube.com/results?search_query=GitHub+Actions+AWS+EKS+deploy+Node.js+Kubernetes+tutorial",label:"GitHub Actions EKS Deploy"},{type:"web",url:"https://docs.github.com/en/actions",label:"GitHub Actions Docs"},{type:"web",url:"https://kustomize.io/",label:"Kustomize Docs"}],"Map the deployment pipeline: git push main → every step → final verification. What fails the pipeline? What triggers a rollback?","🚀 TASK: (1) Provision EKS with Terraform (managed node group, t3.medium, min:2 max:5), (2) write GitHub Actions workflow: build image → push ECR with SHA tag → kubectl apply -k overlays/production, (3) deploy all 3 services with Kustomize overlays patching image tags per environment, (4) configure HPA on user-service at 70% CPU, (5) run k6 load test — watch kubectl get hpa -w and verify pods scale up then down.","3 hrs"),
    ],
    project:{ id:"iw7", title:"Kubernetes Deployment",
      desc:"3 services deployed to EKS via Terraform. ECR image registry with GitHub Actions CI/CD using SHA tags and Kustomize overlays. nginx Ingress with path routing. HPA autoscaling tested with k6 load. S3 presigned URL file uploads. Lambda + SQS for async email processing. Terraform remote state in S3 + DynamoDB locking." }
  },

  // ── Week 8 — Observability & SRE ─────────────────────────
  { week:8, title:"Observability & SRE Practices", timeRange:"12–14 hrs",
    days:[
      d(46,"OpenTelemetry & Distributed Tracing","Instrument Node.js services with OTel and visualise traces in Jaeger.","OpenTelemetry: vendor-neutral observability SDK. @opentelemetry/sdk-node + @opentelemetry/auto-instrumentations-node: auto-instruments Express routes, pg queries, redis commands, and outgoing HTTP calls — zero manual code changes. Initialize OTel before any other require: const sdk = new NodeSDK({ traceExporter: new OTLPTraceExporter({ url }), instrumentations: [getNodeAutoInstrumentations()] }); sdk.start(). Custom spans: const tracer = trace.getTracer('order-service'); const span = tracer.startActiveSpan('process-order', span => { span.setAttribute('orderId', id); ... span.end(); }). Sampling: AlwaysOnSampler for dev, TraceIdRatioBased(0.1) for production. Jaeger all-in-one: single Docker container for local dev.",[{type:"yt",url:"https://youtube.com/results?search_query=OpenTelemetry+Node.js+auto+instrumentation+Jaeger+tutorial+2024",label:"OTel Node.js Tutorial"},{type:"web",url:"https://opentelemetry.io/docs/languages/js/getting-started/nodejs/",label:"OTel Node.js Docs"},{type:"web",url:"https://www.jaegertracing.io/docs/",label:"Jaeger Docs"}],"Draw a trace for POST /orders: what spans exist across all services? What is the waterfall timeline? Where is the most latency?","🚀 TASK: (1) Initialize OTel SDK before any imports in all 3 services with OTLP exporter pointing to Jaeger, (2) run Jaeger all-in-one in Docker Compose, make requests, verify full traces in UI at localhost:16686, (3) add custom spans in business logic: start span before DB call, set db.statement attribute, end span after, (4) confirm cross-service propagation: one traceId spans gateway → user-service → DB, (5) implement 10% sampling in production using TraceIdRatioBased(0.1) sampling config.","2.5 hrs"),
      d(47,"Prometheus Metrics & Grafana Dashboards","Expose prom-client metrics and build RED method dashboards in Grafana.","prom-client: Prometheus metrics for Node.js. collectDefaultMetrics() — automatically collects: event loop lag, GC duration, active handles, heap memory, file descriptors. Counter: httpRequestTotal.inc({ method, route, status }). Histogram: httpRequestDuration.observe({ method, route, status }, durationSeconds). Gauge: activeConnections.set(count). GET /metrics: Prometheus scrapes every 15s. PromQL: rate(http_requests_total[5m]) → requests/sec. histogram_quantile(0.95, rate(http_request_duration_bucket[5m])) → p95 latency. Grafana: add Prometheus datasource, create dashboard with RED method panels — Rate (req/sec), Errors (error rate %), Duration (p50/p95/p99 latency).",[{type:"yt",url:"https://youtube.com/results?search_query=Prometheus+prom-client+Grafana+Node.js+RED+dashboard+tutorial",label:"Prometheus + Grafana Tutorial"},{type:"web",url:"https://github.com/siimon/prom-client",label:"prom-client Docs"},{type:"web",url:"https://prometheus.io/docs/prometheus/latest/querying/basics/",label:"PromQL Basics"}],"Design your Grafana dashboard: what panels show? What PromQL expressions for each? What alert thresholds would indicate a real problem?","🚀 TASK: (1) Install prom-client, call collectDefaultMetrics(), expose /metrics endpoint without auth, (2) create httpRequestDuration Histogram — add Express middleware timing requests from start to finish with method/route/status labels, (3) create httpRequestTotal Counter and activeConnections Gauge (increment on request, decrement on finish), (4) run Prometheus + Grafana in Docker Compose, add Prometheus datasource in Grafana, (5) build dashboard: req/sec, error rate, p95 latency, event loop lag — all via PromQL.","2.5 hrs"),
      d(48,"Log Aggregation & Alerting","Centralise logs with Loki and configure multi-channel Alertmanager rules.","Loki: log aggregation system — stores logs as compressed chunks indexed by labels (no full-text index like Elasticsearch). Promtail: scrapes Docker container logs and ships to Loki — config: scrape_configs with docker_sd_configs. LogQL: {service='user-service'} |= 'ERROR' | json | line_format '{{.msg}}'. Correlation: include traceId in every log entry via AsyncLocalStorage or req.locals — query {service='user-service'} | json | traceId='abc123'. Alertmanager: receives firing alerts from Prometheus, routes based on labels, sends to Slack/PagerDuty/email. Alert rule: alert:HighErrorRate, expr: rate(http_requests_total{status=~'5..'}[5m]) / rate(http_requests_total[5m]) > 0.01, for: 5m.",[{type:"yt",url:"https://youtube.com/results?search_query=Grafana+Loki+Promtail+log+aggregation+Node.js+Docker+tutorial",label:"Loki Log Aggregation"},{type:"web",url:"https://grafana.com/docs/loki/latest/",label:"Grafana Loki Docs"},{type:"web",url:"https://prometheus.io/docs/alerting/latest/alertmanager/",label:"Alertmanager Docs"}],"Design your alerting strategy: what fires an immediate page vs a Slack warning vs just appears in dashboard? How do you prevent alert fatigue?","🚀 TASK: (1) Add Loki + Promtail + Alertmanager to Docker Compose — Promtail scrapes Docker container logs via /var/run/docker.sock, (2) query logs in Grafana LogQL: find all ERROR logs for user-service in last hour, (3) add requestId to every Winston log entry — query LogQL to find all logs for a specific request, (4) write alert rule: error rate > 1% for 5 minutes → Alertmanager → Slack webhook, (5) write recording rule: request_success_rate:ratio_rate5m = rate(http_requests_total{status!~'5..'}[5m]) / rate(http_requests_total[5m]).","2.5 hrs"),
      d(49,"Chaos Engineering & Circuit Breakers","Inject faults and validate graceful degradation with chaostoolkit and opossum.","Chaos engineering: turn unknown weaknesses into known ones before users find them. Hypothesis: 'If notification-service is unavailable for 30s, order creation still returns 201 and notification is queued for retry.' chaostoolkit: JSON/YAML experiment definition — steady-state hypothesis → method (inject fault) → rollback. Bulkhead: separate connection pools per downstream service — exhausting one pool doesn't affect others. opossum states: Closed (normal operation), Open (failing — return fallback immediately, no real call), Half-Open (test one call after resetTimeout). Fallback options: return cached data, return empty/default, queue for retry, return 503 with Retry-After header.",[{type:"yt",url:"https://youtube.com/results?search_query=chaos+engineering+circuit+breaker+opossum+Node.js+resilience",label:"Chaos Engineering Tutorial"},{type:"web",url:"https://chaostoolkit.org/reference/api/experiment/",label:"chaostoolkit Experiment Docs"},{type:"web",url:"https://nodeshift.dev/opossum/",label:"opossum Docs"}],"For each downstream dependency of order-service: write the hypothesis, describe the fault to inject, and define the expected fallback behaviour.","🚀 TASK: (1) Wrap every inter-service HTTP call with opossum: configure volumeThreshold:5, timeout:3000, errorThresholdPercentage:50, (2) implement fallback for notification-service: on circuit open, push to Bull queue — process when service recovers, (3) add bulkhead: separate axios instances with independent limits per downstream service, (4) use chaostoolkit to run experiment: kill notification-service → verify order creation succeeds → check circuit opens, (5) add a Gauge metric 'circuit_state' per circuit: 0=closed, 1=open, 2=half-open — display in Grafana.","3 hrs"),
      d(50,"Week 8 Review — Fully Observable System","Correlate traces, metrics, and logs into a unified observability platform.","Full observability: answer any question about system behaviour without deploying new code. Correlation: include OTel traceId in Winston log entries (via context.active().getValue(traceKey)), link prom-client Histogram exemplars to trace IDs. SLI: measurable indicator — request success rate, p99 latency. SLO: target — 99.9% success, p99 < 200ms. Error budget: 0.1% of requests can fail per month (43.2 minutes). Burn rate: current failure rate / (1 - SLO). Multi-window alerting (Google SRE Workbook): alert when short window (1h) burn rate > 14.4 AND long window (6h) burn rate > 6 — catches fast burns without false positives.",[{type:"yt",url:"https://youtube.com/results?search_query=SLO+SLI+error+budget+observability+Node.js+Grafana+tutorial",label:"SLO Engineering Tutorial"},{type:"web",url:"https://sre.google/workbook/alerting-on-slos/",label:"Google SRE Alerting on SLOs"},{type:"web",url:"https://opentelemetry.io/docs/concepts/observability-primer/",label:"OTel Observability Primer"}],"Define SLIs and SLOs for your 3 services. Calculate monthly error budget for 99.9% SLO. At current error rate, when is the budget exhausted?","🚀 TASK: Build fully observable stack: (1) include traceId from OTel active context in every Winston log entry using AsyncLocalStorage, (2) add prom-client exemplars on Histogram observations linking sample to its traceId, (3) build Grafana composite dashboard: traces (Jaeger), metrics (Prometheus), logs (Loki) — all filterable by requestId, (4) implement multi-window SLO burn-rate alert: fire when 1h burn rate > 14.4 AND 6h burn rate > 6, (5) run a chaos experiment while watching dashboard — verify error rate spike appears simultaneously in traces, metrics, and logs.","3 hrs"),
    ],
    project:{ id:"iw8", title:"Fully Observable System",
      desc:"OTel auto-instrumentation with OTLP export to Jaeger. prom-client RED metrics with exemplars in Grafana. Loki log aggregation with LogQL correlation ID queries. Alertmanager Slack alerts for error rate > 1%. opossum circuit breakers with Bull queue fallbacks. chaostoolkit chaos experiment runbook. Multi-window SLO burn-rate alerting." }
  },

  // ── Week 9 — Intermediate Capstone ───────────────────────
  { week:9, title:"Intermediate Capstone", timeRange:"14–16 hrs",
    days:[
      d(51,"Capstone Architecture & Planning","Design the complete production SaaS platform before writing a single line of code.","The intermediate capstone is a production SaaS project management platform. Services: user-service (auth, OAuth, 2FA), project-service (CRUD, Kafka events), notification-service (email via Bull), search-service (Elasticsearch). Infrastructure: Terraform-provisioned EKS + RDS + ElastiCache + MSK (managed Kafka) + OpenSearch. Auth: JWT + refresh rotation, OAuth2 Google, TOTP 2FA, API keys. Observability: OTel → Jaeger, Prometheus → Grafana, Winston → Loki, Alertmanager → Slack. CI/CD: GitHub Actions per service — lint → test → build → ECR push → kubectl rollout. Write ADRs documenting every major technology choice.",[{type:"yt",url:"https://youtube.com/results?search_query=SaaS+backend+architecture+microservices+Node.js+production+design",label:"SaaS Architecture Design"},{type:"web",url:"https://adr.github.io/",label:"Architecture Decision Records"},{type:"web",url:"https://github.com/goldbergyoni/nodebestpractices",label:"Node.js Best Practices"}],"Draw the full system diagram. For each service list: tech stack, database owned, API surface, Kafka topics produced, Kafka topics consumed.","🚀 TASK: (1) Write ADRs for: Kafka over RabbitMQ, PostgreSQL over MongoDB, Elasticsearch over pg full-text, (2) create monorepo with packages/shared-types, packages/logger, packages/auth-middleware — and services: user-service, project-service, notification-service, search-service, (3) scaffold each service: TypeScript + Express + OTel + Dockerfile + tsconfig + jest config, (4) define all Kafka topics: project.created, project.updated, task.created, task.completed, member.invited, (5) write OpenAPI specs for all service endpoints.","3 hrs"),
      d(52,"Capstone Core Implementation","Build auth, project CRUD, Kafka event pipeline, and Elasticsearch search.","Core business logic: user-service implements full JWT auth with OAuth and 2FA, user profiles with avatar upload to S3. project-service implements project + task CRUD — on every mutation emits Kafka event (project.created, task.completed). search-service is a Kafka consumer that upserts project/task data into Elasticsearch on each event. notification-service is a Bull queue processor that sends emails via nodemailer when tasks are assigned. Shared packages: packages/logger exports buildLogger(serviceName) returning a Winston logger. packages/auth-middleware exports jwtAuth() and requireRole() middleware.",[{type:"yt",url:"https://youtube.com/results?search_query=production+TypeScript+microservices+Kafka+implementation+Node.js",label:"TypeScript Microservices"},{type:"web",url:"https://kafka.js.org/docs/getting-started",label:"KafkaJS Getting Started"}],"For project-service: list all commands (CreateProject, AddMember, CreateTask, CompleteTask) and the Kafka event each emits. What invariants does each command enforce?","🚀 TASK: (1) user-service: register/login/refresh/logout, Google OAuth, TOTP 2FA, GET /me — full TypeScript with Zod validation and 90%+ test coverage, (2) project-service: CRUD for projects and tasks — emit project.created and task.completed to Kafka on mutation, (3) search-service: KafkaJS consumer subscribes to project.* topics — upserts Elasticsearch document on each event — exposes GET /search?q=term, (4) notification-service: Bull processor sends email to task assignee on task.created event — 3 retries with exponential backoff, (5) shared logger package: buildLogger(service) returns Winston logger with service name, traceId from OTel context.","4 hrs"),
      d(53,"Capstone Testing, CI/CD & Deployment","Write comprehensive tests, build CI/CD pipeline, and deploy full stack to Kubernetes.","Testing strategy: integration tests per service using dedicated Docker Compose with postgres + redis + kafka + elasticsearch. Unit tests for command handlers, Kafka event builders, Zod schemas. GitHub Actions: on PR — run only affected services (Turborepo affected); on push to main — build Docker images → push ECR → kubectl rollout. Kubernetes: each service has Deployment + Service + HPA + ConfigMap + ExternalSecret (external-secrets-operator pulls from AWS Secrets Manager). Terraform: provision EKS + RDS + ElastiCache + MSK + OpenSearch. End-to-end smoke test: create project → verify indexed in Elasticsearch → verify email queued.",[{type:"yt",url:"https://youtube.com/results?search_query=microservices+Jest+integration+testing+CI+CD+Kubernetes+tutorial",label:"Testing + CI/CD Tutorial"},{type:"web",url:"https://turbo.build/repo/docs/core-concepts/monorepos/filtering",label:"Turborepo Affected Builds"},{type:"web",url:"https://external-secrets.io/latest/",label:"External Secrets Operator"}],"List the 10 most critical test cases across all services. For each: precondition, action, assertion. Label each as unit, integration, or E2E.","🚀 TASK: (1) Write integration tests for each service: 5+ Supertest tests covering happy path and error cases (validation errors, auth errors, not found), (2) write unit tests for Kafka event builders, Zod schemas, and command handlers with jest.mock, (3) GitHub Actions CI: on PR — lint + test + coverage check (>70%); on push to main — build + push ECR with SHA tag + kubectl rollout, (4) write K8s manifests for all services with HPA (CPU 70%) + ExternalSecret pulling from AWS Secrets Manager, (5) run end-to-end smoke test: create project via API → query Elasticsearch → verify project appears in search results within 10s.","3 hrs"),
    ],
    project:{ id:"iw9", title:"Production SaaS Backend",
      desc:"Multi-service TypeScript platform: user-service (OAuth2 Google + 2FA + API keys), project-service (Kafka events), notification-service (Bull email queue), search-service (Elasticsearch). Shared logger and auth-middleware packages. Full OTel tracing + Prometheus + Grafana + Loki + Alertmanager. Terraform EKS + RDS + ElastiCache + MSK. GitHub Actions CI/CD with Turborepo affected builds. Kustomize overlays per environment." }
  },


  ] // end intermediate.weeks
};

// ── ADVANCED (120 days) ──────────────────────────────────────
const advanced = {
  label: "🔴 Advanced", days: 120, totalHours: 240,
  goal: "Distributed Systems & Cloud-Native Backend",
  weeks: [

  { week:1, title:"Distributed Systems Theory", timeRange:"16–18 hrs",
    days:[
      d(1,"CAP Theorem & Consistency Models","Understand the fundamental trade-offs in distributed systems.","CAP Theorem: a distributed system can guarantee at most two of Consistency (all nodes see the same data), Availability (every request gets a non-error response), Partition Tolerance (system continues when messages are dropped). In practice, partition tolerance is required — choice is between CP and AP. PACELC extends CAP: even when no partition, trade-off between latency and consistency. Consistency models: strong consistency (linearizability — all reads reflect latest write), eventual consistency (replicas converge over time), causal consistency (causally related operations are seen in order), read-your-writes, monotonic reads.",[{type:"yt",url:"https://youtube.com/results?search_query=CAP+theorem+distributed+systems+consistency+availability+partition",label:"CAP Theorem Explained"},{type:"web",url:"https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html",label:"Kleppmann on CAP"},{type:"web",url:"https://jepsen.io/consistency",label:"Jepsen Consistency Models"}],"Classify these systems as CP or AP: (1) PostgreSQL with synchronous replication, (2) Cassandra, (3) MongoDB with default write concern, (4) Redis Cluster. Justify each.","🚀 TASK: (1) Demonstrate eventual consistency: write to primary, immediately read from replica — observe stale data, (2) implement read-your-writes consistency: track write timestamps, route reads to primary for 1s after write, (3) implement optimistic locking with a version field: UPDATE ... WHERE version=N — detect concurrent updates, (4) implement compare-and-swap in Redis using WATCH/MULTI/EXEC, (5) write a design doc explaining the consistency model you'd choose for 3 different app types.","3 hrs"),
      d(2,"Distributed Consensus — Raft Algorithm","Implement leader election using the Raft consensus algorithm.","Raft: consensus algorithm designed for understandability. Three server states: follower, candidate, leader. Leader election: followers wait for heartbeat; if timeout, become candidate and request votes. A node wins with majority votes. Log replication: leader receives client request, appends to log, replicates to followers, commits when majority acknowledge. Safety: committed entries are never lost. Terms: monotonically increasing — prevents old leaders from causing confusion. Split-brain: two leaders in different partitions — Raft prevents this with quorum requirement.",[{type:"yt",url:"https://youtube.com/results?search_query=Raft+consensus+algorithm+distributed+systems+tutorial",label:"Raft Algorithm Tutorial"},{type:"web",url:"https://raft.github.io/",label:"Raft Visualization"},{type:"web",url:"https://raft.github.io/raft.pdf",label:"Raft Paper"}],"Walk through a Raft election: 5 nodes, leader fails. Which nodes can become leader? What happens to uncommitted entries on the old leader?","🚀 TASK: (1) Implement Raft leader election in Node.js: follower/candidate/leader state machine with timeouts, (2) implement vote request and vote response RPCs between nodes, (3) implement heartbeat: leader sends periodic pings, followers reset timeout, (4) simulate leader failure: stop the leader process and observe re-election in logs, (5) implement basic log replication: leader distributes entries, followers apply when majority acknowledge.","4 hrs"),
      d(3,"CRDTs & Conflict Resolution","Implement Conflict-free Replicated Data Types for distributed state.","CRDTs (Conflict-free Replicated Data Types): data structures that can be updated independently on multiple nodes and merged without conflicts. Types: state-based (CvRDT) — merge by combining states; operation-based (CmRDT) — broadcast operations. G-Counter: grow-only counter. Each node increments its own slot; merge by taking max per slot; value = sum of all slots. LWW-Register (Last Write Wins): each value tagged with timestamp; merge takes highest timestamp. OR-Set (Observed-Remove Set): add with unique tag; remove by recording tag; merge unions adds and removes. Use in: collaborative editors, shopping carts, presence.",[{type:"yt",url:"https://youtube.com/results?search_query=CRDT+distributed+data+structures+tutorial",label:"CRDT Tutorial"},{type:"web",url:"https://crdt.tech/",label:"CRDT Research"},{type:"web",url:"https://github.com/automerge/automerge",label:"Automerge CRDT Library"}],"Two users offline add items to a shared shopping cart, then reconnect. How does OR-Set CRDT merge without losing either's additions?","🚀 TASK: (1) Implement G-Counter CRDT in JavaScript with increment() and value() methods, (2) implement G-Set (grow-only set) with add() and has() methods, (3) implement 2P-Set (two-phase set) that supports add and remove, (4) implement LWW-Register with timestamp-based merge, (5) simulate 3 nodes making concurrent updates then merging — verify convergence.","3 hrs"),
      d(4,"Vector Clocks & Causality","Track causality in distributed systems with vector clocks.","Vector clocks: track causal ordering of events. Each node maintains a vector [v1, v2, ..., vn] — one slot per node. On local event: increment own slot. On send: include current vector. On receive: merge (take max of each slot) then increment own slot. Causality: event A happened-before event B if A's vector is component-wise ≤ B's vector. Concurrent events: neither happened-before the other. Lamport timestamps: scalar clock — simpler but only partial order, can't detect concurrency. Version vectors: variant used in DynamoDB for object versioning.",[{type:"yt",url:"https://youtube.com/results?search_query=vector+clocks+distributed+systems+causality+tutorial",label:"Vector Clocks Tutorial"},{type:"web",url:"https://en.wikipedia.org/wiki/Vector_clock",label:"Vector Clock Wikipedia"},{type:"web",url:"https://lamport.azurewebsites.net/pubs/time-clocks.pdf",label:"Lamport Time-Clocks Paper"}],"Three nodes A, B, C exchange messages. Draw the vector clock progression. Identify which events are concurrent and which are causally ordered.","🚀 TASK: (1) Implement VectorClock class: increment(nodeId), update(received), compare(a, b) returning 'before'/'after'/'concurrent', (2) simulate 3 nodes sending messages — attach vector clocks and log ordering, (3) detect concurrent updates and trigger conflict resolution, (4) implement Lamport timestamps alongside vector clocks — compare their information, (5) use vector clock to implement optimistic concurrency control in a distributed key-value store.","3 hrs"),
      d(5,"FLP Impossibility & Failure Detectors","Understand the theoretical limits of distributed consensus.","FLP Impossibility (Fischer, Lynch, Paterson 1985): in an asynchronous distributed system, no consensus protocol can guarantee termination in the presence of even a single crash failure. Implications: real systems must relax assumptions — either require partial synchrony (Raft, Paxos) or use probabilistic termination. Failure detectors: abstract mechanisms to detect crashed nodes. Properties: completeness (eventually detect all crashes), accuracy (don't suspect correct nodes). Perfect failure detector: impossible in async networks. Eventually perfect: eventually stops falsely suspecting. Phi Accrual: Akka's adaptive failure detector using arrival time statistics.",[{type:"yt",url:"https://youtube.com/results?search_query=FLP+impossibility+theorem+distributed+systems+tutorial",label:"FLP Impossibility Tutorial"},{type:"web",url:"https://en.wikipedia.org/wiki/Consensus_(computer_science)#Impossibility_of_consensus_with_one_faulty_process",label:"Consensus Impossibility"},{type:"web",url:"https://www.cl.cam.ac.uk/~ms705/pub/papers/2015-osr-raft.pdf",label:"Raft in Practice"}],"Why can't you distinguish a crashed node from a very slow node in an async network? How does Raft handle this with election timeouts?","🚀 TASK: (1) Implement a simple failure detector using periodic heartbeats and timeouts, (2) demonstrate false positives: a slow-responding node gets suspected as crashed, (3) implement adaptive timeout that increases when network is slow, (4) simulate Phi Accrual detection: track heartbeat intervals, compute phi value, suspect when phi > threshold, (5) compare fixed timeout vs adaptive timeout false-positive rates under different network conditions.","3 hrs"),
      d(6,"Event Sourcing","Implement event sourcing for an order management system.","Event Sourcing: store all changes as immutable events rather than current state. EventStore: append-only log of events. Each event: { id, type, aggregateId, data, timestamp, version }. Rebuild state by replaying events. Snapshots: periodically snapshot state to avoid replaying entire history. Event versioning: events are permanent — handle schema changes with upcasting. Benefits: full audit log, time travel, event replay for new features. CQRS + Event Sourcing: command side writes events; projections build read models from events asynchronously.",[{type:"yt",url:"https://youtube.com/results?search_query=event+sourcing+Node.js+tutorial+CQRS",label:"Event Sourcing Tutorial"},{type:"web",url:"https://martinfowler.com/eaaDev/EventSourcing.html",label:"Fowler: Event Sourcing"},{type:"web",url:"https://eventstore.com/docs/",label:"EventStoreDB Docs"}],"Design the order aggregate: what events does an order emit over its lifecycle? (Created, ItemAdded, Confirmed, Shipped, Delivered, Refunded) What state does each event change?","🚀 TASK: (1) Implement EventStore class with appendEvents(aggregateId, events) and getEvents(aggregateId, fromVersion), (2) implement Order aggregate with applyEvent(event) that rebuilds state from events, (3) implement snapshots: save state every 10 events, load snapshot + subsequent events on read, (4) implement time travel: rebuild state as of any past timestamp, (5) add a projection that builds a read model (orders by status count) by consuming events.","4 hrs"),
      d(7,"CQRS Pattern","Implement Command Query Responsibility Segregation.","CQRS: separate command model (writes) from query model (reads). Commands: PlaceOrder, CancelOrder — mutate state, go through business logic, produce events. Queries: GetOrderStatus, ListOrders — read from optimised read models, no business logic. Read models (projections): denormalised, pre-aggregated data optimised for specific queries. Updated asynchronously from events. Benefits: read and write models scale independently; read models can be in different DB types (PostgreSQL for writes, Elasticsearch for search, Redis for cache). Eventual consistency between write and read sides.",[{type:"yt",url:"https://youtube.com/results?search_query=CQRS+event+sourcing+Node.js+tutorial",label:"CQRS Tutorial"},{type:"web",url:"https://martinfowler.com/bliki/CQRS.html",label:"Fowler: CQRS"},{type:"web",url:"https://microservices.io/patterns/data/cqrs.html",label:"CQRS Pattern"}],"For GetOrdersByUser query: how does the read model differ from the write model? What data does the projection pre-compute to make this query fast?","🚀 TASK: (1) Implement CommandBus: registerHandler(commandType, handler) and execute(command), (2) implement QueryBus: separate from commands, queries never write to event store, (3) build a ProjectionBuilder that rebuilds read models from event stream, (4) demonstrate eventual consistency: command side updates, read model is stale for milliseconds, (5) run two separate read models from same events: one in PostgreSQL, one in Redis.","4 hrs"),
    ],
    project:{ id:"aw1", title:"Raft + Event-Sourced Order System",
      desc:"Raft consensus implementation with leader election and log replication. CRDT G-Counter and OR-Set implementations. Vector clock causality tracking. Event-sourced order aggregate with snapshots and time travel. CQRS with separate command/query buses and multiple read model projections." }
  },

  { week:2, title:"Cloud-Native & Kubernetes", timeRange:"16–18 hrs",
    days:[
      d(8,"Kubernetes Fundamentals","Deploy containerised services to Kubernetes.","Kubernetes: container orchestration platform. Core concepts: Pod (smallest deployable unit — 1+ containers), Deployment (manages pod replicas, rolling updates), Service (stable network endpoint for pods), ConfigMap (non-sensitive config), Secret (sensitive config — base64 encoded). kubectl commands: apply -f manifest.yaml, get pods, describe pod, logs, exec. Deployment manifest: spec.replicas, spec.selector, spec.template, spec.containers[].image, spec.containers[].resources.limits. Service types: ClusterIP (internal), NodePort (external via port), LoadBalancer (cloud LB).",[{type:"yt",url:"https://youtube.com/results?search_query=Kubernetes+tutorial+beginners+2024+pods+deployments",label:"Kubernetes Fundamentals"},{type:"web",url:"https://kubernetes.io/docs/tutorials/kubernetes-basics/",label:"K8s Basics Tutorial"},{type:"web",url:"https://kubernetes.io/docs/concepts/",label:"K8s Concepts"}],"Design the Kubernetes manifests for your 3-service system: what Deployments, Services, and ConfigMaps do you need?","🚀 TASK: (1) Install minikube or use a free cloud K8s (k3s, Kind), (2) create Deployment and Service manifests for user-service, (3) create a ConfigMap for app config and a Secret for DB credentials, (4) deploy all 3 services to K8s, (5) scale user-service to 3 replicas and verify load balancing with kubectl exec requests.","3 hrs"),
      d(9,"Kubernetes Advanced — Ingress & HPA","Set up Ingress routing, persistent storage, and autoscaling.","Ingress: HTTP routing to services by path/hostname. nginx-ingress or Traefik as controller. Ingress resource: rules: - host: api.example.com http: paths: - path: /users backend: service: name: user-service port: number: 80. TLS: reference a Secret with the cert. HPA (Horizontal Pod Autoscaler): scale based on CPU/memory. kubectl autoscale deployment user-service --min=2 --max=10 --cpu-percent=70. PersistentVolume (PV): storage. PersistentVolumeClaim (PVC): request storage. StatefulSet: for stateful apps (databases) — stable network identities, ordered deployment.",[{type:"yt",url:"https://youtube.com/results?search_query=Kubernetes+Ingress+HPA+autoscaling+tutorial",label:"K8s Ingress & HPA Tutorial"},{type:"web",url:"https://kubernetes.io/docs/concepts/services-networking/ingress/",label:"K8s Ingress Docs"},{type:"web",url:"https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",label:"HPA Docs"}],"When does HPA scale up vs scale down? What's the danger of scaling down too fast? What metrics beyond CPU would you scale on?","🚀 TASK: (1) Install nginx-ingress controller in minikube, (2) create Ingress routing /api/users to user-service and /api/orders to order-service, (3) set up HPA for user-service — trigger scale-up with k6 load test, (4) deploy PostgreSQL as a StatefulSet with PVC for persistent data, (5) verify data persists when the PostgreSQL pod is deleted and recreated.","3 hrs"),
      d(10,"Terraform Infrastructure as Code","Provision cloud infrastructure with Terraform.","Terraform: infrastructure as code. HCL syntax. Providers: AWS, GCP, Azure. Resources: aws_instance, aws_s3_bucket, aws_rds_instance. Variables: var.region. Outputs: output.db_endpoint. State: stored in terraform.tfstate — keep remote (S3 + DynamoDB lock). terraform init, plan, apply, destroy. Modules: reusable infrastructure components. Workspace: multiple environments (staging, production) from same config. Import existing resources. Don't store state in Git.",[{type:"yt",url:"https://youtube.com/results?search_query=Terraform+tutorial+AWS+infrastructure+as+code+2024",label:"Terraform Tutorial"},{type:"web",url:"https://developer.hashicorp.com/terraform/docs",label:"Terraform Docs"},{type:"web",url:"https://registry.terraform.io/",label:"Terraform Registry"}],"What infrastructure components does your API need? List every resource: VPC, subnets, security groups, RDS, ElastiCache, ECS/EKS, load balancer.","🚀 TASK: (1) Write Terraform to create a VPC with public/private subnets, (2) provision an RDS PostgreSQL instance in the private subnet, (3) provision an ElastiCache Redis cluster, (4) create an EKS cluster or ECS service for your API, (5) store Terraform state in S3 with DynamoDB locking.","3 hrs"),
      d(11,"AWS Services Deep Dive","Master core AWS services for production backend systems.","IAM: users, roles, policies — least privilege principle. EC2: virtual machines. VPC: isolated network. Security Groups: stateful firewall. S3: object storage — presigned URLs for direct browser upload. Route 53: DNS with health checks and failover. Lambda: serverless functions. API Gateway: HTTP trigger for Lambda. RDS: managed relational DB — Multi-AZ for HA. ElastiCache: managed Redis/Memcached. SQS: managed message queue. SNS: pub/sub notifications. EventBridge: event routing and scheduling.",[{type:"yt",url:"https://youtube.com/results?search_query=AWS+core+services+tutorial+EC2+RDS+S3+Lambda+2024",label:"AWS Core Services Tutorial"},{type:"web",url:"https://docs.aws.amazon.com/",label:"AWS Docs"},{type:"web",url:"https://aws.amazon.com/architecture/",label:"AWS Architecture Center"}],"Design the AWS architecture for your production API: which services do you use? Draw the network diagram with VPC, subnets, security groups.","🚀 TASK: (1) Deploy your API to ECS Fargate with an Application Load Balancer, (2) move file uploads to S3 with presigned URLs, (3) use RDS PostgreSQL Multi-AZ for the database, (4) use ElastiCache Redis for session storage and caching, (5) set up CloudWatch logging and alarms for error rate and latency.","3 hrs"),
      d(12,"Platform Engineering","Build an Internal Developer Platform with service catalog and GitOps.","Internal Developer Platform (IDP): tooling that lets developers self-serve infrastructure and deployments. Backstage (Spotify): open-source IDP. Service catalog: register services with ownership, runbooks, API docs, SLOs. Software templates: scaffold new services with TypeScript + Docker + K8s manifests + CI/CD. TechDocs: documentation-as-code. GitOps: ArgoCD syncs K8s cluster state to Git — declarative, auditable. ArgoCD: watches Git repo, applies changes automatically. Drift detection: alerts when cluster state diverges from Git.",[{type:"yt",url:"https://youtube.com/results?search_query=Backstage+ArgoCD+GitOps+platform+engineering+tutorial",label:"Platform Engineering Tutorial"},{type:"web",url:"https://backstage.io/docs/",label:"Backstage Docs"},{type:"web",url:"https://argo-cd.readthedocs.io/",label:"ArgoCD Docs"}],"Design your IDP: what golden paths (pre-approved service templates) would you create? What guardrails prevent teams from deviating?","🚀 TASK: (1) Set up Backstage with a service catalog — register all your microservices, (2) create a software template for a new TypeScript microservice that scaffolds Dockerfile + K8s manifests + GitHub Actions CI, (3) set up ArgoCD pointing to a Git repo — push a change and verify ArgoCD syncs K8s, (4) implement drift detection alert when manual kubectl apply is detected, (5) write TechDocs for one service and view in Backstage.","3 hrs"),
      d(13,"Security Engineering","Implement zero-trust architecture and supply chain security.","Zero Trust: never trust, always verify. mTLS: both sides of every service-to-service call present certificates. SPIFFE/SPIRE: workload identity — each pod gets a cryptographic identity (SVID) used for mTLS. cert-manager: K8s operator that issues and rotates TLS certs. Supply chain security: SBOM (Software Bill of Materials) lists all dependencies and their versions. syft generates SBOM. grype scans for CVEs. Sigstore/Cosign: sign container images with keyless signatures — verify in CI. SLSA (Supply chain Levels for Software Artifacts): framework of security levels.",[{type:"yt",url:"https://youtube.com/results?search_query=zero+trust+mTLS+SPIFFE+SPIRE+Kubernetes+security+tutorial",label:"Zero Trust Security"},{type:"web",url:"https://spiffe.io/",label:"SPIFFE Docs"},{type:"web",url:"https://slsa.dev/",label:"SLSA Framework"}],"Map the attack surface of your microservices: what could an attacker do with access to one pod? How does mTLS + SPIFFE limit blast radius?","🚀 TASK: (1) Install cert-manager in Kubernetes — issue TLS cert for your services, (2) configure Istio to enforce mTLS between all services, (3) generate SBOM for your Docker image with syft — check for CVEs with grype, (4) sign a container image with Cosign and verify the signature in GitHub Actions, (5) set up OPA admission controller: reject K8s deployments without resource limits.","3 hrs"),
      d(14,"Event-Driven Architecture Deep Dive","Master Kafka Streams, CQRS projections, and the Outbox pattern at scale.","Kafka Streams: stream processing in Java/Scala (conceptually adapted for Node via kafkajs). KTable: changelog stream representing latest state per key. Windowing: time-based aggregations (tumbling 1min, sliding 5min). CDC (Change Data Capture): Debezium reads PostgreSQL WAL → Kafka. Every DB change becomes a Kafka event. Outbox pattern with Debezium: write to outbox table → Debezium picks up change → publishes to Kafka. CQRS projections: Kafka consumer updating read models asynchronously.",[{type:"yt",url:"https://youtube.com/results?search_query=Kafka+CDC+Debezium+CQRS+event+sourcing+Node.js+tutorial",label:"Kafka CDC Tutorial"},{type:"web",url:"https://debezium.io/documentation/",label:"Debezium Docs"},{type:"web",url:"https://kafka.js.org/docs/",label:"KafkaJS Docs"}],"For a high-traffic write path (10k writes/sec), why is synchronous Elasticsearch indexing a problem? How does async CDC solve it?","🚀 TASK: (1) Set up Debezium with Docker connecting PostgreSQL WAL to Kafka, (2) implement CDC pipeline: PostgreSQL write → Debezium → Kafka → Elasticsearch sync, (3) implement a Kafka Streams-style windowed aggregation using kafkajs, (4) build a CQRS read model updated by Kafka consumer, (5) implement exactly-once delivery using Kafka transactions.","3 hrs"),
      d(15,"Advanced Architecture Project","Build the advanced capstone infrastructure.","Design and begin building the Expert Backend Platform: multi-region, event-sourced, fully observable, zero-trust, cloud-native.",[{type:"yt",url:"https://youtube.com/results?search_query=distributed+systems+cloud+native+backend+platform+Node.js",label:"Distributed Platform Tutorial"},{type:"web",url:"https://www.cncf.io/",label:"CNCF Landscape"}],"Design the system's failure modes: what happens if a region goes down? If Kafka is unavailable? Document recovery procedures.","🚀 TASK: Build 'Expert Backend Platform' (multi-day): (1) multi-region active-active K8s deployment across 2 regions with global load balancing, (2) event sourcing + CQRS for the order domain, (3) Kafka + Debezium CDC pipeline, (4) zero-trust mTLS between all services with SPIFFE, (5) OTel traces + Prometheus + Grafana + Alertmanager, (6) GitOps with ArgoCD, (7) SLSA-compliant CI/CD pipeline, (8) chaos testing with k6 simulating region failure.","6 hrs"),
    ],
    project:{ id:"aw3", title:"Expert Backend Platform",
      desc:"Multi-region active-active deployment. Event sourcing + CQRS for order domain. Kafka + Debezium CDC. Zero-trust mTLS with SPIFFE/SPIRE. OTel traces + Prometheus + Grafana + Alertmanager. ML anomaly detection. GitOps with ArgoCD. SLSA-compliant CI/CD. SBOM generation and CVE scanning." }
  },


  // ── Week 4 — Event-Driven Architecture ───────────────────
  { week:4, title:"Event-Driven Architecture", timeRange:"16–18 hrs",
    days:[
      d(31,"Event Sourcing Fundamentals","Understand event sourcing — storing state as an immutable sequence of events.",
        "Event sourcing replaces the traditional approach of storing current state with storing every state-changing event. The current state is derived by replaying events from the beginning (or from a snapshot). An event store is an append-only log: OrderCreated, ItemAdded, OrderShipped are persisted events — never UPDATE or DELETE. Snapshots: after N events, save a snapshot of the aggregate state to speed up replay. EventStoreDB is a purpose-built event store; alternatively use PostgreSQL with an events table (aggregate_id, event_type, payload JSONB, sequence, created_at). Aggregates: the consistency boundary — an Order aggregate processes commands and emits events. Commands are validated before events are written; events are facts that have already happened.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=event+sourcing+explained+node.js+EventStoreDB",label:"Event Sourcing Tutorial"},{type:"web",url:"https://eventstore.com/docs/",label:"EventStoreDB Docs"},{type:"web",url:"https://martinfowler.com/eaaDev/EventSourcing.html",label:"Fowler: Event Sourcing"}],
        "On paper, model an Order lifecycle as events: OrderPlaced, PaymentConfirmed, ItemsPicked, Shipped, Delivered, Refunded. What state can you reconstruct from replaying these? What's in each event payload?",
        "🚀 TASK: (1) Create a PostgreSQL events table with aggregate_id, aggregate_type, event_type, payload JSONB, sequence INT, created_at — add UNIQUE(aggregate_id, sequence), (2) implement an EventStore class with append(aggregateId, events, expectedVersion) that does optimistic concurrency check, (3) implement load(aggregateId) that fetches and orders all events, (4) build an Order aggregate: apply(event) method updates in-memory state, (5) implement a snapshot store: save snapshot every 20 events, load from snapshot + replay only newer events.",
        "3 hrs"),
      d(32,"CQRS — Command and Query Responsibility Segregation","Separate write and read models for independently scalable, optimised data access.",
        "CQRS splits an application into two models: the command side handles writes and enforces business rules via aggregates; the query side serves reads from denormalised, optimised read models. Commands are intentions (PlaceOrder, CancelOrder); queries are questions (GetOrderById, ListOrdersByUser). The read model is updated asynchronously by consuming events from the write side — this creates eventual consistency. Benefits: each side can be scaled, cached, and optimised independently. The read model can be a simple flat SQL table, Elasticsearch index, or Redis hash — whatever best serves the query. Multiple read models can exist for different clients (mobile app, analytics dashboard).",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=CQRS+pattern+Node.js+event+sourcing+tutorial",label:"CQRS Tutorial"},{type:"web",url:"https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs",label:"Microsoft CQRS Pattern"},{type:"web",url:"https://microservices.io/patterns/data/cqrs.html",label:"Microservices.io CQRS"}],
        "Design read models for an e-commerce system: what flat table structure serves GET /orders/:id fastest? What structure serves GET /users/:id/orders with total spent?",
        "🚀 TASK: (1) Create a command handler: PlaceOrderCommand validates stock, creates Order aggregate, appends OrderPlaced event, (2) create a read model projector: consume OrderPlaced, OrderShipped events → upsert into order_summary table (flat, denormalised), (3) implement a query service that reads exclusively from order_summary — never from the event store, (4) add a second read model: orders_by_user table for listing, (5) demonstrate stale read: show that command completes before projector updates and explain the trade-off.",
        "3 hrs"),
      d(33,"Saga Pattern — Distributed Transactions","Coordinate multi-service business transactions without distributed locks using sagas.",
        "A saga is a sequence of local transactions, each publishing an event or message that triggers the next step. If any step fails, compensating transactions undo the previous steps. Two styles: choreography (services react to events with no central coordinator — simple but hard to track) and orchestration (a saga orchestrator sends commands to services and handles failures centrally — better for complex flows). Node Sagas or custom state machine. Example: PlaceOrder saga: reserve inventory (InventoryService) → charge payment (PaymentService) → create shipment (ShipmentService). If payment fails: compensate with release inventory. Idempotency keys are critical — saga steps must be safe to retry.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=saga+pattern+microservices+choreography+orchestration+tutorial",label:"Saga Pattern Tutorial"},{type:"web",url:"https://microservices.io/patterns/data/saga.html",label:"Microservices.io Saga"},{type:"web",url:"https://docs.particular.net/nservicebus/sagas/",label:"NServiceBus Sagas Guide"}],
        "Design the PlaceOrder saga as a state machine: draw every state (PendingInventory, PendingPayment, PendingShipment, Completed, Cancelled) and every transition including compensations.",
        "🚀 TASK: (1) Implement PlaceOrder orchestration saga with states stored in a sagas table (saga_id, state, payload, updated_at), (2) implement step 1: send ReserveInventory command — handle InventoryReserved and InventoryFailed events, (3) implement step 2: send ChargePayment — handle PaymentCharged and PaymentFailed with compensation (ReleaseInventory), (4) implement compensation flow: any failure triggers compensating commands in reverse order, (5) make all saga steps idempotent using idempotency keys — retry a step twice and verify it only executes once.",
        "3 hrs"),
      d(34,"Outbox Pattern — Guaranteed Event Delivery","Achieve atomic database writes and event publishing using the transactional outbox pattern.",
        "The dual-write problem: writing to a database and publishing to Kafka in the same transaction is impossible without distributed coordination — one can succeed while the other fails. The outbox pattern solves this by writing to an outbox table in the same database transaction as the business data. A separate process (relay) reads from the outbox and publishes to Kafka, then marks rows as published. Debezium eliminates the need for a custom relay by reading directly from the PostgreSQL WAL (Write-Ahead Log) via the logical replication protocol. Configure PostgreSQL: wal_level = logical. Debezium connector config: plugin.name = pgoutput, slot.name = debezium, table.include.list = public.outbox. The outbox row has: id, aggregate_type, aggregate_id, event_type, payload, created_at.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=outbox+pattern+Debezium+PostgreSQL+Kafka+tutorial",label:"Outbox Pattern Tutorial"},{type:"web",url:"https://debezium.io/documentation/reference/stable/connectors/postgresql.html",label:"Debezium PostgreSQL Connector"},{type:"web",url:"https://microservices.io/patterns/data/transactional-outbox.html",label:"Transactional Outbox Pattern"}],
        "Trace a PlaceOrder request: the DB transaction writes to orders and outbox in one commit. Debezium reads the WAL. Kafka receives the event. The notification-service consumes it. What happens if Kafka is down when Debezium tries to publish?",
        "🚀 TASK: (1) Set wal_level=logical in PostgreSQL config and create replication slot, (2) create outbox table with aggregate_type, aggregate_id, event_type, payload JSONB, published BOOLEAN DEFAULT false, (3) write a service that inserts to orders and outbox in a single BEGIN/COMMIT transaction, (4) run Debezium in Docker connecting to PostgreSQL WAL → Kafka topic outbox.events, (5) implement a Kafka consumer that processes outbox events and marks them processed — verify no duplicates with idempotency check.",
        "3 hrs"),
      d(35,"Kafka Streams & Event Processing","Process streaming data with windowed aggregations and stateful stream operations.",
        "Kafka Streams is a Java library for stream processing — for Node.js, use kafkajs with manual state management or KsqlDB. Key concepts: KStream (unbounded event stream), KTable (latest value per key — like a database table). Windowing: tumbling window (fixed, non-overlapping 1-min buckets), hopping window (overlapping), session window (grouped by activity gap). Aggregations: count events per key in a window. State stores: RocksDB-backed local store for stateful operations. Exactly-once semantics: enable.idempotence=true on producer, transactional.id for cross-partition atomicity. Dead letter topics: failed-to-process events routed to a DLT for inspection.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Kafka+Streams+KsqlDB+stream+processing+tutorial",label:"Kafka Streams Tutorial"},{type:"web",url:"https://kafka.apache.org/documentation/streams/",label:"Kafka Streams Docs"},{type:"web",url:"https://ksqldb.io/",label:"KsqlDB Docs"}],
        "Design a real-time analytics pipeline: order events → compute orders-per-minute per region → alert when rate drops 50% below rolling average. What Kafka primitives do you need?",
        "🚀 TASK: (1) Implement a 1-minute tumbling window counter using kafkajs: consume order.created, accumulate counts per productId in a Map, flush to Redis every 60s, (2) create a dead letter topic: wrap consumers to catch errors and produce failed messages to orders.DLT, (3) set up KsqlDB with Docker — create a stream over the orders topic and run a windowed COUNT query, (4) implement a stateful join: enrich order events with user data from a compacted users topic, (5) enable producer idempotence (enable.idempotence: true) and transactions — verify exactly-once delivery.",
        "3 hrs"),
      d(36,"Event-Driven Architecture Review & Project","Integrate event sourcing, CQRS, saga, outbox, and Kafka into a cohesive system.",
        "The event-driven stack comes together: commands flow in via REST → command handlers update aggregates and write events to the outbox → Debezium relays events to Kafka → projectors update read models → sagas coordinate cross-service flows. A complete event-driven system is auditable (full history in event store), resilient (retryable, idempotent), and scalable (read side scales independently). Integration testing: use Testcontainers to spin up PostgreSQL, Kafka, and Debezium in tests.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=event+driven+architecture+complete+project+Node.js+Kafka",label:"Event-Driven System Project"},{type:"web",url:"https://testcontainers.com/guides/getting-started-with-testcontainers-for-nodejs/",label:"Testcontainers Node.js"},{type:"web",url:"https://www.confluent.io/blog/event-driven-microservices-with-kafka/",label:"Confluent: Event-Driven Microservices"}],
        "Audit your system: can you replay all events to rebuild any read model from scratch? Is every saga step idempotent? Can you add a new read model without touching the write side?",
        "🚀 TASK: Build the Event-Sourced Order System: (1) Order aggregate with full lifecycle events stored in EventStoreDB or PostgreSQL, (2) PlaceOrder saga orchestrating inventory, payment, shipment services via RabbitMQ commands, (3) Outbox + Debezium pipeline streaming events to Kafka, (4) three CQRS read models: order_detail (per order), user_orders (per user), sales_summary (windowed analytics), (5) Kafka Streams windowed sales counter with KsqlDB dashboard, (6) Testcontainers integration test: place order, verify all read models update within 5s.",
        "4 hrs"),
    ],
    project:{ id:"aw4", title:"Event-Sourced Order System",
      desc:"Complete event-driven order lifecycle: REST commands → Order aggregate → PostgreSQL event store → Outbox → Debezium → Kafka. PlaceOrder orchestration saga with compensating transactions. Three CQRS read models (detail, per-user, windowed analytics). KsqlDB streaming queries. Testcontainers integration tests. Full event replay capability." }
  },

  // ── Week 5 — Database Internals & Scaling ────────────────
  { week:5, title:"Database Internals & Scaling", timeRange:"16–18 hrs",
    days:[
      d(37,"B-Tree Internals & PostgreSQL Storage","Understand how PostgreSQL stores data, manages WAL, and implements MVCC.",
        "PostgreSQL stores data in 8KB pages on disk. The B-tree index structure: root → branch → leaf pages, each containing key/pointer pairs sorted for O(log n) lookup. The Write-Ahead Log (WAL) ensures durability: every change is written to the WAL before the actual data page is modified. On crash recovery, PostgreSQL replays the WAL from the last checkpoint. MVCC (Multi-Version Concurrency Control): instead of locking, PostgreSQL keeps multiple row versions (tuples) with xmin (created by transaction ID) and xmax (deleted by transaction ID). Readers see a consistent snapshot without blocking writers. VACUUM reclaims dead tuple space. ANALYZE updates statistics for the query planner. pg_stat_user_tables shows dead tuple counts.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=PostgreSQL+internals+MVCC+WAL+B-tree+tutorial",label:"PostgreSQL Internals"},{type:"web",url:"https://www.postgresql.org/docs/current/storage-page-layout.html",label:"PostgreSQL Page Layout"},{type:"web",url:"https://www.postgresql.org/docs/current/mvcc.html",label:"PostgreSQL MVCC Docs"}],
        "Run EXPLAIN (ANALYZE, BUFFERS) on a query before and after VACUUM ANALYZE. What changes in the plan? Where do you see buffer hits vs disk reads?",
        "🚀 TASK: (1) Run EXPLAIN (ANALYZE, BUFFERS) on a JOIN query — identify Seq Scan vs Index Scan, shared hits vs reads, (2) use pg_stat_user_tables to find tables with high n_dead_tup — run VACUUM ANALYZE and re-check, (3) use pageinspect extension to inspect a B-tree index leaf page: SELECT * FROM bt_page_items(get_raw_page('users_email_idx',1)), (4) create a table without indexes, insert 100k rows, measure query time, add indexes, re-measure — explain the difference, (5) set wal_level=logical, enable pg_wal_lsn_diff to measure WAL generated by a bulk insert.",
        "3 hrs"),
      d(38,"LSM Trees & RocksDB","Understand Log-Structured Merge trees — the engine behind Cassandra, RocksDB, and LevelDB.",
        "LSM (Log-Structured Merge) trees optimise for write-heavy workloads by never updating in place. Writes go to an in-memory MemTable (sorted by key). When the MemTable fills, it's flushed to disk as an immutable SSTable (Sorted String Table). Background compaction merges and sorts SSTables into larger levels (Level 0 → Level 1 → Level 2). Bloom filter: a probabilistic structure per SSTable that answers 'does this key definitely NOT exist?' — avoids unnecessary disk reads. Read amplification: a read may check MemTable + L0 + L1 + L2. Write amplification: compaction rewrites data multiple times. RocksDB (C++ library used by CockroachDB, TiKV): options.level_compaction_dynamic_level_bytes, options.compression = kLZ4Compression. Node.js access via rocksdb or leveldown npm packages.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=LSM+tree+RocksDB+internals+explained+tutorial",label:"LSM Tree Explained"},{type:"web",url:"https://github.com/facebook/rocksdb/wiki/RocksDB-Overview",label:"RocksDB Wiki"},{type:"web",url:"https://www.scylladb.com/glossary/log-structured-merge-tree/",label:"ScyllaDB: LSM Trees"}],
        "Compare a write to B-tree (PostgreSQL) vs LSM (RocksDB): trace the exact I/O operations for each. Which wins on write throughput? Which wins on read latency? When would you choose each?",
        "🚀 TASK: (1) Install leveldown npm package — open a LevelDB database, write 10k key-value pairs, benchmark writes vs reads, (2) implement a simple LSM MemTable in Node.js: a sorted Map that flushes to a JSON file when size > 1000, (3) implement a Bloom filter from scratch: k hash functions, m-bit array, test false positive rate at different m/n ratios, (4) profile RocksDB read amplification: insert 1M keys, measure how many SSTable lookups a random read requires (use perf stats), (5) compare LevelDB vs PostgreSQL write throughput: insert 100k rows in each and measure time.",
        "3 hrs"),
      d(39,"Distributed SQL — CockroachDB & Global Transactions","Run SQL databases across multiple nodes with serializable distributed transactions.",
        "CockroachDB: distributed SQL database built on top of RocksDB. Data is sharded into ranges (64MB by default) distributed across nodes. Each range has a Raft consensus group for replication. Serializable isolation by default — stronger than PostgreSQL's default (Read Committed). Geo-partitioning: pin data rows to specific regions to comply with data residency requirements. The CockroachDB wire protocol is PostgreSQL-compatible — use the pg driver. Key difference from sharding: CockroachDB handles cross-shard joins and transactions transparently. Spanner (Google): similar architecture — TrueTime (bounded clock uncertainty) enables external consistency. YugabyteDB: another distributed SQL option, closer to PostgreSQL feature parity.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=CockroachDB+distributed+SQL+tutorial+beginners",label:"CockroachDB Tutorial"},{type:"web",url:"https://www.cockroachlabs.com/docs/stable/",label:"CockroachDB Docs"},{type:"web",url:"https://cloud.google.com/spanner/docs/",label:"Cloud Spanner Docs"}],
        "Explain why a distributed transaction across 3 nodes is slower than a local transaction. What is the minimum number of network round-trips for a 2-node transaction in Raft?",
        "🚀 TASK: (1) Run CockroachDB locally with Docker (3-node cluster) — connect with psql using postgres driver, (2) create a multi-region table with PARTITION BY LIST (region) — insert rows and verify they land in the correct region using SHOW RANGES, (3) run a cross-region transaction — measure latency vs same-region, (4) simulate node failure: stop one CockroachDB node, verify reads/writes continue on remaining nodes, (5) use EXPLAIN (DISTSQL) to visualise how a JOIN is distributed across nodes.",
        "3 hrs"),
      d(40,"Database Sharding Strategies","Design and implement horizontal sharding for databases that outgrow a single node.",
        "Sharding splits data across multiple database instances (shards) to distribute load. Shard key selection is critical: a user_id shard key distributes load evenly but makes cross-user queries span shards; a region shard key enables geo-locality but creates hotspots. Range-based sharding: shard 1 handles user_id 1–1M, shard 2 handles 1M–2M — easy range queries but uneven if new users cluster. Hash-based sharding: hash(user_id) % num_shards — even distribution but no range queries. Consistent hashing: adding a shard only moves 1/n of keys — used by Redis Cluster and Cassandra. Cross-shard queries require scatter-gather: query all shards in parallel, merge results. Node.js: manual sharding with a shardForKey(key) function routing queries to the correct pg.Pool.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=database+sharding+explained+strategies+tutorial",label:"Database Sharding Tutorial"},{type:"web",url:"https://www.citusdata.com/blog/2017/08/09/principles-of-sharding-for-relational-databases/",label:"Citus: Sharding Principles"},{type:"web",url:"https://redis.io/docs/management/scaling/",label:"Redis Cluster Sharding"}],
        "You have 100M users. Design a sharding scheme: what's the shard key? How many shards? How do you handle a query like 'top 10 users by revenue' that requires aggregating all shards?",
        "🚀 TASK: (1) Implement a ShardRouter class: given a userId, compute hash(userId) % 4 to select one of 4 PostgreSQL connection pools, (2) implement scatter-gather: query all shards in parallel with Promise.all, merge and sort results, (3) implement consistent hashing with a virtual node ring — add a fifth shard and verify only 1/5 of keys need to move, (4) use Citus extension on PostgreSQL to create a distributed table: SELECT create_distributed_table('orders', 'user_id'), (5) benchmark single-shard vs 4-shard scatter-gather for a COUNT query on 10M rows.",
        "3 hrs"),
      d(41,"Data Warehousing & Analytics","Build analytical data pipelines with columnar storage, dbt, and OLAP queries.",
        "OLTP (Online Transaction Processing): optimised for many small reads/writes — row-oriented storage. OLAP (Online Analytical Processing): optimised for full-table scans and aggregations — columnar storage. Columnar databases (BigQuery, Redshift, ClickHouse): store each column separately — reading one column doesn't load irrelevant columns. Parquet: open columnar file format — used in data lakes. dbt (Data Build Tool): SQL-first transformation framework — define transformations as .sql files with Jinja templating, dbt run applies them. ClickHouse: open-source columnar DB — 10x–100x faster than PostgreSQL for aggregations. Node.js + ClickHouse: @clickhouse/client npm package. ETL pipeline: Extract (Debezium CDC from PostgreSQL), Transform (dbt models), Load (into ClickHouse).",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=dbt+ClickHouse+data+warehouse+analytics+tutorial",label:"dbt + ClickHouse Tutorial"},{type:"web",url:"https://docs.getdbt.com/docs/introduction",label:"dbt Docs"},{type:"web",url:"https://clickhouse.com/docs/en/intro",label:"ClickHouse Docs"}],
        "For the query 'monthly revenue by product category over the last 2 years', compare the execution plan in PostgreSQL (row) vs ClickHouse (columnar). What makes ClickHouse 100x faster?",
        "🚀 TASK: (1) Run ClickHouse in Docker — create a table with ENGINE = MergeTree() ORDER BY (created_date, user_id), (2) insert 1M synthetic order rows — run aggregation queries and compare vs PostgreSQL with same data, (3) install dbt-core and dbt-postgres — create a dbt project with a staging model cleaning raw orders, (4) create a dbt mart model: monthly_revenue_by_category joining orders + products, (5) schedule dbt run via a Node.js cron job — serve the mart results via an API endpoint.",
        "3 hrs"),
    ],
    project:{ id:"aw5", title:"Analytics Data Pipeline",
      desc:"Full ETL pipeline: PostgreSQL (OLTP) → Debezium CDC → Kafka → ClickHouse (OLAP). dbt transformation models for staging and mart layers. Monthly revenue by category mart model. Node.js analytics API reading from ClickHouse. Performance comparison report: OLTP vs OLAP query times. Bloom filter implementation for membership testing." }
  },

  // ── Week 6 — Platform Engineering ────────────────────────
  { week:6, title:"Platform Engineering", timeRange:"16–18 hrs",
    days:[
      d(42,"Internal Developer Platform with Backstage","Build a self-service developer portal using Backstage with service catalog and templates.",
        "An Internal Developer Platform (IDP) is the tooling layer between infrastructure teams and product engineers — it lets developers self-serve: create services, view dependencies, access runbooks, and trigger deployments. Backstage (Spotify open-source): the most widely adopted IDP framework. Core concepts: software catalog (register all services, APIs, teams), software templates (golden paths — scaffolders for new services), TechDocs (documentation-as-code using MkDocs). catalog-info.yaml in each repo registers the service. A template uses Nunjucks to scaffold files. The Backstage backend is a Node.js app — plugins extend it. EntityProvider: fetch catalog entries from external sources (GitHub org scan).",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Backstage+developer+portal+tutorial+service+catalog+2024",label:"Backstage Tutorial"},{type:"web",url:"https://backstage.io/docs/overview/what-is-backstage",label:"Backstage Docs"},{type:"web",url:"https://backstage.io/docs/features/software-templates/",label:"Backstage Software Templates"}],
        "Design your service catalog: list all services, their owners, dependencies, SLOs, and on-call contacts. What golden-path templates would you create to enforce standards?",
        "🚀 TASK: (1) Run Backstage locally with npx @backstage/create-app — start the dev server, (2) add catalog-info.yaml to all your microservices repositories — register them in Backstage, (3) create a software template that scaffolds: TypeScript Express service + Dockerfile + K8s deployment manifest + GitHub Actions CI workflow, (4) install the GitHub Actions plugin — view CI status for each service directly in Backstage, (5) enable GitHub org auto-discovery: configure GitHubOrgEntityProvider to scan your GitHub org and auto-register all repos with catalog-info.yaml.",
        "3 hrs"),
      d(43,"Policy as Code with OPA","Enforce organisational policies in Kubernetes using Open Policy Agent and Rego.",
        "Open Policy Agent (OPA): a general-purpose policy engine. Rego: OPA's declarative query language. OPA takes input (a JSON document), evaluates a policy (Rego rules), and returns a decision. In Kubernetes: OPA Gatekeeper acts as an admission webhook — every resource create/update is sent to OPA for policy evaluation before being stored. Constraint Template: defines the Rego policy. Constraint: applies the template with parameters to specific resource kinds. Example policies: all Deployments must have resource limits; container images must come from an approved registry; no privileged containers. opa eval tests policies locally. conftest validates Kubernetes YAML files against OPA policies in CI.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=OPA+Gatekeeper+Kubernetes+policy+as+code+Rego+tutorial",label:"OPA Gatekeeper Tutorial"},{type:"web",url:"https://www.openpolicyagent.org/docs/latest/",label:"OPA Docs"},{type:"web",url:"https://open-policy-agent.github.io/gatekeeper/website/docs/",label:"Gatekeeper Docs"}],
        "Write Rego pseudocode for: 'deny any Deployment that sets containers[].securityContext.privileged = true'. Trace the policy evaluation against a non-compliant manifest.",
        "🚀 TASK: (1) Install OPA CLI — write a Rego policy that denies Kubernetes Deployments without resource limits.requests and limits.limits, (2) test with opa eval using compliant and non-compliant JSON inputs, (3) install OPA Gatekeeper in minikube — create a ConstraintTemplate and Constraint for the resource limits policy, (4) try applying a Deployment without limits — verify it's rejected with a descriptive error, (5) add conftest to your CI pipeline: validate K8s manifests against OPA policies before kubectl apply.",
        "3 hrs"),
      d(44,"GitOps with ArgoCD","Implement GitOps — declarative, Git-driven Kubernetes deployments with ArgoCD.",
        "GitOps: the desired state of your system is declared in Git. An operator (ArgoCD) continuously syncs the cluster to match Git. Benefits: full audit trail (Git history), rollback (git revert), pull-based deployments (cluster pulls from Git, not CI pushing to cluster). ArgoCD: Kubernetes-native GitOps controller. Application CRD: defines the Git repo, path, target cluster, and sync policy. Sync: ArgoCD compares live cluster state with desired state in Git — shows diffs and syncs on change. App of Apps pattern: one ArgoCD Application manages multiple sub-applications. Image updater: automatically updates the image tag in Git when a new image is pushed to the registry. Kustomize and Helm: ArgoCD supports both for templating.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=ArgoCD+GitOps+Kubernetes+tutorial+2024",label:"ArgoCD GitOps Tutorial"},{type:"web",url:"https://argo-cd.readthedocs.io/en/stable/",label:"ArgoCD Docs"},{type:"web",url:"https://www.gitops.tech/",label:"GitOps Principles"}],
        "Trace a deployment: developer pushes a new Docker image → CI builds and tags it → what happens next in a GitOps workflow? Contrast with traditional CI/CD that kubectl applies directly.",
        "🚀 TASK: (1) Install ArgoCD in minikube — access the UI and log in with admin credentials, (2) create an ArgoCD Application pointing to a Git repo containing K8s manifests for your user-service, (3) push a change to the manifests repo (e.g. bump replica count) — verify ArgoCD detects drift and syncs, (4) configure automated sync with self-heal: argocd app set user-service --sync-policy automated --self-heal, (5) implement the App of Apps pattern: one root application in ArgoCD manages user-service, order-service, and notification-service applications.",
        "3 hrs"),
      d(45,"Istio Service Mesh","Control traffic, enforce mTLS, and observe inter-service communication with Istio.",
        "A service mesh moves cross-cutting concerns (mTLS, retries, circuit breaking, observability) out of application code and into a sidecar proxy (Envoy). Istio injects an Envoy sidecar into every pod. mTLS: Istio's PeerAuthentication CRD enforces mutual TLS between all services — no code changes needed. Traffic management: VirtualService — route 90% of traffic to v1, 10% to v2 (canary). DestinationRule — configure load balancing, connection pool, circuit breaking. Fault injection: HTTPFaultInjection can inject delays or HTTP errors for chaos testing. Kiali: Istio's observability UI — shows the service mesh graph with traffic, error rates, and latencies.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Istio+service+mesh+tutorial+mTLS+traffic+management+2024",label:"Istio Service Mesh Tutorial"},{type:"web",url:"https://istio.io/latest/docs/",label:"Istio Docs"},{type:"web",url:"https://kiali.io/docs/",label:"Kiali Docs"}],
        "Explain the difference between a Kubernetes Service (L4 TCP routing) and an Istio VirtualService (L7 HTTP routing). What traffic management is impossible with just Kubernetes Services?",
        "🚀 TASK: (1) Install Istio in minikube with istioctl install --set profile=demo — enable automatic sidecar injection on the default namespace, (2) apply a PeerAuthentication resource in STRICT mode — verify that non-mTLS traffic is rejected, (3) deploy two versions of user-service (v1 and v2) — create a VirtualService that sends 80% to v1 and 20% to v2, (4) configure a DestinationRule with circuit breaking: outlierDetection { consecutiveErrors: 3, interval: 10s, baseEjectionTime: 30s }, (5) use fault injection to add a 3-second delay to 50% of requests to order-service — observe the effect in Kiali.",
        "3 hrs"),
      d(46,"Platform Engineering Capstone","Integrate Backstage, OPA, ArgoCD, and Istio into a complete Internal Developer Platform.",
        "A production-grade IDP ties together: Backstage (developer portal and golden paths), OPA Gatekeeper (policy enforcement), ArgoCD (GitOps deployments), and Istio (service mesh). The developer workflow: create service from Backstage template → scaffold code + manifests pushed to Git → ArgoCD auto-syncs to K8s → OPA validates manifests before apply → Istio handles mTLS and traffic shaping → Backstage shows service health, docs, CI status. This is the platform-as-a-product model adopted by Netflix, Spotify, and Airbnb.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=platform+engineering+IDP+Backstage+ArgoCD+Istio+complete",label:"Platform Engineering Complete"},{type:"web",url:"https://platformengineering.org/",label:"Platform Engineering Community"},{type:"web",url:"https://tag-app-delivery.cncf.io/whitepapers/platforms/",label:"CNCF Platforms White Paper"}],
        "Identify the three biggest developer pain points in your current workflow (slow CI, manual deployments, unclear ownership). Map each to a platform capability that eliminates it.",
        "🚀 TASK: Build the complete IDP: (1) Backstage service catalog with all microservices registered, CI status plugin, TechDocs for each service, (2) Backstage software template that scaffolds a new TypeScript Express service with Dockerfile, Helm chart, ArgoCD Application, and catalog-info.yaml — one-click creates a deployable service, (3) OPA Gatekeeper policies: require resource limits, require specific labels (team, service, version), ban privileged containers, (4) ArgoCD App of Apps managing all services with automated sync and image updater, (5) Istio mTLS STRICT mode across all services with Kiali dashboard showing the mesh topology.",
        "4 hrs"),
    ],
    project:{ id:"aw6", title:"Internal Developer Platform",
      desc:"Backstage portal with service catalog, CI status, TechDocs, and a software template for new TypeScript microservices. OPA Gatekeeper policies enforcing resource limits and label requirements. ArgoCD App of Apps with automated sync and self-heal. Istio mTLS STRICT mode across all services with canary routing via VirtualService. Kiali mesh dashboard." }
  },

  // ── Week 7 — Security Engineering ────────────────────────
  { week:7, title:"Security Engineering", timeRange:"14–16 hrs",
    days:[
      d(47,"Zero Trust Architecture & SPIFFE/SPIRE","Implement workload identity and mutual TLS for zero-trust inter-service authentication.",
        "Zero Trust: 'never trust, always verify' — even traffic inside the cluster must be authenticated. Traditional perimeter security assumed internal traffic was safe; zero trust does not. SPIFFE (Secure Production Identity Framework For Everyone): an open standard for workload identity. Each workload gets a SPIFFE Verifiable Identity Document (SVID) — an X.509 certificate with a URI SAN: spiffe://trust-domain/service/user-service. SPIRE (SPIFFE Runtime Environment): the reference implementation. SPIRE Server issues SVIDs; SPIRE Agent runs on each node, attests workloads, and delivers SVIDs via the Workload API. cert-manager: Kubernetes operator that automates certificate issuance and rotation. mTLS: both the client and server present their SVID — neither side is trusted without a valid cert.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=SPIFFE+SPIRE+zero+trust+workload+identity+tutorial",label:"SPIFFE/SPIRE Tutorial"},{type:"web",url:"https://spiffe.io/docs/latest/spiffe-about/overview/",label:"SPIFFE Docs"},{type:"web",url:"https://spiffe.io/docs/latest/deploying/",label:"SPIRE Deployment Guide"}],
        "Map your microservices' trust relationships: which service needs to call which? Write the SPIFFE attestation policy for each: what proof does a workload present to get its SVID?",
        "🚀 TASK: (1) Deploy SPIRE Server and SPIRE Agent in Kubernetes using the SPIRE Helm chart, (2) register workload entries: spire-server entry create -spiffeID spiffe://example.org/user-service -selector k8s:ns:default -selector k8s:sa:user-service, (3) fetch an SVID from the Workload API in a Node.js sidecar using spiffe-endpoint-socket — inspect the X.509 cert, (4) implement mTLS between user-service and order-service using the SPIRE-issued SVIDs — verify the connection rejects unregistered workloads, (5) set up cert rotation: verify SPIRE automatically renews SVIDs before expiry and services reload the new cert without restart.",
        "3 hrs"),
      d(48,"Supply Chain Security — SBOM & Sigstore","Secure your software supply chain with image signing, SBOM generation, and CVE scanning.",
        "Supply chain attacks target the build and distribution process rather than the application itself (SolarWinds, Log4Shell). SBOM (Software Bill of Materials): a machine-readable inventory of all software components in an artifact. syft: generates SBOMs in SPDX or CycloneDX format. grype: scans an SBOM or image for known CVEs using NVD and GitHub Advisory databases. Sigstore/Cosign: keyless image signing using OIDC identity (GitHub Actions JWT) — the signature is stored in a transparency log (Rekor) and in the OCI registry. SLSA (Supply-chain Levels for Software Artifacts): framework with four levels — L2 requires all builds to run in a hosted build platform with provenance; L3 requires non-forgeable provenance. In-toto: framework for supply chain integrity — defines a software supply chain as a series of steps with signed metadata.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Sigstore+Cosign+SBOM+syft+grype+supply+chain+security+tutorial",label:"Supply Chain Security"},{type:"web",url:"https://docs.sigstore.dev/",label:"Sigstore Docs"},{type:"web",url:"https://anchore.com/syft/",label:"syft Docs"}],
        "List all external dependencies your Docker image includes (base OS, apt packages, npm packages). For each category, describe the supply chain risk and the mitigation.",
        "🚀 TASK: (1) Install syft and generate an SBOM for your Docker image: syft user-service:latest -o spdx-json > sbom.json, (2) run grype against the SBOM: grype sbom:sbom.json — list all HIGH and CRITICAL CVEs and identify which npm packages are affected, (3) add Cosign to your GitHub Actions workflow: after docker build, sign the image with cosign sign --key cosign.key, (4) add a Cosign verification step before any kubectl apply: cosign verify --key cosign.pub, (5) add a GitHub Actions SLSA provenance generator: use slsa-framework/slsa-github-generator to produce L3 provenance for your image.",
        "3 hrs"),
      d(49,"Threat Modelling & Penetration Testing","Systematically identify threats with STRIDE and run automated security scans.",
        "Threat modelling: a structured approach to identifying, categorising, and mitigating threats before they are exploited. STRIDE: Spoofing (impersonating another entity), Tampering (modifying data), Repudiation (denying an action), Information Disclosure (leaking data), Denial of Service (making unavailable), Elevation of Privilege (gaining higher access). For each component in your data flow diagram, apply each STRIDE category. Microsoft Threat Modeling Tool or OWASP Threat Dragon automate this. OWASP ZAP (Zed Attack Proxy): automated web scanner — active scan sends payloads to find SQL injection, XSS, CSRF, open redirects, path traversal. restler-fuzzer: learns your API from OpenAPI spec and generates fuzzing sequences. sqlmap: automated SQL injection detection.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=STRIDE+threat+modeling+OWASP+ZAP+API+security+testing",label:"Threat Modelling & ZAP Tutorial"},{type:"web",url:"https://owasp.org/www-project-zap/",label:"OWASP ZAP"},{type:"web",url:"https://owasp.org/www-community/Threat_Modeling",label:"OWASP Threat Modelling"}],
        "Draw the data flow diagram for your login endpoint: browser → API Gateway → auth-service → PostgreSQL. Apply all 6 STRIDE categories. What mitigations do you already have? What's missing?",
        "🚀 TASK: (1) Install OWASP Threat Dragon — create a threat model for your order placement flow, identify at least 10 threats across STRIDE categories, (2) run OWASP ZAP as a Docker container against your local API: docker run -t owasp/zap2docker-stable zap-api-scan.py -t http://host.docker.internal:3000/api/openapi.json -f openapi, (3) fix at least 3 HIGH findings from the ZAP report — document what was vulnerable and how you fixed it, (4) install sqlmap — run against your API's search endpoint with a parameterised query and verify no injection is possible, (5) add ZAP scan to GitHub Actions CI — fail the pipeline if any HIGH severity findings exist.",
        "2 hrs"),
      d(50,"Compliance Engineering — SOC2 & GDPR","Implement technical controls required for SOC2 compliance and GDPR data handling.",
        "SOC2 (Service Organization Control 2): an auditing standard for SaaS companies covering Security, Availability, Processing Integrity, Confidentiality, and Privacy. Key technical controls: access logging (who accessed what, when), encryption at rest and in transit, vulnerability management (regular scans), change management (Git history + code review), incident response (runbooks, alerting). GDPR (General Data Protection Regulation): data subjects have the right to access (export their data), rectification (correct it), and erasure (delete it — 'right to be forgotten'). PII (Personally Identifiable Information) must be identified, inventoried, and protected. Data lineage: track where PII flows across services. Audit logs must be immutable — append-only with cryptographic integrity.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=SOC2+GDPR+compliance+engineering+developer+tutorial",label:"SOC2 & GDPR for Developers"},{type:"web",url:"https://www.vanta.com/resources/soc-2-compliance",label:"SOC2 Compliance Guide"},{type:"web",url:"https://gdpr.eu/what-is-gdpr/",label:"GDPR Overview"}],
        "Inventory all PII your API handles: what fields are collected, where are they stored, which services access them, how long are they retained? This is your data map — the foundation of GDPR compliance.",
        "🚀 TASK: (1) Implement an immutable audit log table: INSERT-only with trigger that prevents UPDATE/DELETE, log every authentication event and sensitive data access with actor, action, resource, timestamp, (2) implement GDPR right-to-erasure endpoint: DELETE /users/:id/data — pseudonymise PII (replace name/email with hashed placeholder) rather than deleting to preserve referential integrity, (3) implement GDPR data export endpoint: GET /users/:id/export — returns all data held about the user across all tables as JSON, (4) add field-level encryption for sensitive PII (SSN, credit card last 4) using AES-256-GCM before storing, (5) generate a SOC2 evidence package: export 90 days of audit logs, access review list, and vulnerability scan results.",
        "2 hrs"),
    ],
    project:{ id:"aw7", title:"Secure API Platform",
      desc:"SPIRE-issued SVID mTLS between all services. Cosign-signed Docker images with SLSA L3 provenance. syft SBOM generation and grype CVE scanning in CI. OWASP ZAP automated scan in GitHub Actions. STRIDE threat model for order placement flow. Immutable audit log. GDPR erasure and export endpoints. Field-level AES-256-GCM encryption for PII." }
  },

  // ── Week 8 — ML Serving & Data Engineering ────────────────
  { week:8, title:"ML Serving & Data Engineering", timeRange:"14–16 hrs",
    days:[
      d(51,"ML Model Serving with ONNX & TensorFlow.js","Serve machine learning models from Node.js using ONNX Runtime and TensorFlow.js.",
        "ONNX (Open Neural Network Exchange): an open format for ML models — train in Python (PyTorch/sklearn), export to ONNX, run inference anywhere. onnxruntime-node npm package provides Node.js bindings to the ONNX Runtime C++ library. const session = await InferenceSession.create('./model.onnx'); const output = await session.run({ input: tensor }). TensorFlow.js: run TensorFlow models in Node.js (@tensorflow/tfjs-node uses native bindings; @tensorflow/tfjs-node-gpu for GPU). Model warmup: run a dummy inference on startup to JIT-compile kernels. Batching: queue individual requests, run inference in batches (better GPU utilisation). Triton Inference Server (NVIDIA): production-grade model serving with dynamic batching, model ensemble, and gRPC/REST endpoints.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=ONNX+Runtime+Node.js+machine+learning+inference+tutorial",label:"ONNX Runtime Node.js"},{type:"web",url:"https://onnxruntime.ai/docs/get-started/with-nodejs.html",label:"ONNX Runtime Node.js Docs"},{type:"web",url:"https://www.tensorflow.org/js/guide/nodejs",label:"TensorFlow.js Node.js Guide"}],
        "For a text classification model with 100ms inference time, design a batching system that handles 1000 req/s with max 50ms queuing delay. What batch size and flush interval?",
        "🚀 TASK: (1) Export a scikit-learn RandomForest model to ONNX with skl2onnx — inspect input/output tensor shapes with Netron, (2) load and run inference with onnxruntime-node: create an InferenceSession, construct input Tensor, run session.run(), (3) build a batching queue: collect individual requests for 10ms, run batch inference, resolve each request's promise, (4) build a REST endpoint POST /predict that accepts JSON features and returns predictions — measure p50/p99 latency, (5) load a TensorFlow.js pre-trained MobileNet model — run image classification on a local image file with @tensorflow/tfjs-node.",
        "3 hrs"),
      d(52,"Vector Databases & Semantic Search","Store embeddings and run similarity search for RAG and recommendation systems.",
        "Embeddings: dense vector representations of text, images, or items that capture semantic meaning — similar things have similar vectors. Cosine similarity and dot product measure semantic closeness. pgvector: PostgreSQL extension that adds a vector column type and HNSW/IVFFlat indexes for approximate nearest-neighbour search. CREATE EXTENSION vector; CREATE TABLE documents (id SERIAL, content TEXT, embedding vector(1536)). SELECT content FROM documents ORDER BY embedding <=> query_embedding LIMIT 5. Pinecone: managed vector database — handles sharding and replication. HNSW index (Hierarchical Navigable Small World): logarithmic-time approximate nearest-neighbour — add the ivfflat index for recall/speed trade-off. RAG (Retrieval-Augmented Generation): embed user query → find top-k similar documents → include them in LLM prompt context.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=pgvector+PostgreSQL+vector+search+RAG+Node.js+tutorial",label:"pgvector RAG Tutorial"},{type:"web",url:"https://github.com/pgvector/pgvector",label:"pgvector Docs"},{type:"web",url:"https://www.pinecone.io/learn/",label:"Pinecone Learning Center"}],
        "Design a semantic search system for a 1M-document knowledge base: what embedding model? What index type? What's the recall/latency trade-off of IVFFlat vs HNSW?",
        "🚀 TASK: (1) Install pgvector: CREATE EXTENSION vector — create a documents table with an embedding vector(1536) column, (2) generate embeddings for 100 text documents using the OpenAI embeddings API (or a local sentence-transformers model via Python subprocess), (3) insert embeddings into PostgreSQL — create an HNSW index: CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops) WITH (m=16, ef_construction=64), (4) implement a Node.js semantic search endpoint: embed the query, run SELECT ... ORDER BY embedding <=> $1 LIMIT 5, (5) implement a minimal RAG pipeline: search retrieves top-3 relevant docs → format as context → call an LLM API with the context — measure answer quality vs without retrieval.",
        "3 hrs"),
      d(53,"Feature Stores & Data Pipelines","Build feature stores for ML model serving and design robust data ingestion pipelines.",
        "A feature store is a central repository for ML features — computed offline (batch) and served online (low-latency). Problem it solves: training/serving skew — the feature computation logic diverges between offline training and online serving. Feast (open-source): define features as FeatureView objects in Python — materialise to online store (Redis) for low-latency serving. Point-in-time joins: for training datasets, features must be retrieved as they appeared at the time of the label — not the current value. Node.js can call the Feast online server via gRPC or REST. Apache Airflow DAGs: Python-defined workflow orchestration — tasks depend on each other, retries, backfill. Data quality checks: Great Expectations or dbt tests — assert feature value ranges, null rates, distribution shifts.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=feature+store+Feast+machine+learning+data+pipeline+tutorial",label:"Feature Store Tutorial"},{type:"web",url:"https://docs.feast.dev/",label:"Feast Docs"},{type:"web",url:"https://airflow.apache.org/docs/",label:"Apache Airflow Docs"}],
        "For a fraud detection model, list 10 features (e.g. num_transactions_last_hour, account_age_days). For each, identify: can it be computed at request time? Or does it require pre-computed batch aggregation?",
        "🚀 TASK: (1) Install Feast and define a user_features FeatureView: num_orders_7d, avg_order_value, days_since_last_order — materialize to Redis with feast materialize, (2) serve features online from a Node.js endpoint: call the Feast online serving API with feast.get_online_features(), (3) create an Airflow DAG that computes user features daily from PostgreSQL and materializes to Feast, (4) implement a point-in-time join: given a training dataset of (user_id, event_timestamp), fetch features as they were at that timestamp from the offline store, (5) add a Great Expectations data quality check: assert no nulls, avg_order_value > 0 — fail the Airflow DAG if checks fail.",
        "3 hrs"),
      d(54,"ML Engineering Review & Serving System","Build a complete ML serving backend integrating models, vector search, and feature stores.",
        "Production ML systems require: low-latency model inference (ONNX Runtime + batching), feature freshness (feature store with online serving), semantic retrieval (vector database for RAG), model versioning (track model versions with their performance metrics), and monitoring (input drift detection, prediction distribution shifts). Shadow mode: route a percentage of production traffic to a new model candidate without returning its results to users — compare predictions vs production model to validate before full rollout.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=ML+serving+backend+Node.js+complete+system+tutorial",label:"ML Serving System"},{type:"web",url:"https://mlops.community/",label:"MLOps Community"},{type:"web",url:"https://www.tecton.ai/blog/what-is-a-feature-store/",label:"Tecton: Feature Stores"}],
        "For your ML serving system, define the SLA: max inference latency (p99), feature freshness tolerance, model update frequency. How do these constraints drive your architecture choices?",
        "🚀 TASK: Build complete ML serving backend: (1) POST /recommendations endpoint: fetch user features from Feast → run collaborative filtering ONNX model → return top-5 recommended products, (2) POST /semantic-search endpoint: embed query → pgvector ANN search → rerank with a cross-encoder ONNX model, (3) model registry: store model metadata (version, accuracy metrics, feature schema) in PostgreSQL — load specific version by querying registry, (4) shadow mode: 10% of /recommendations traffic runs through model-v2 — log both predictions to comparison_log table without returning v2 predictions to users, (5) drift detection: hourly job computes mean/std of incoming features — alert if deviation exceeds 3 sigma from training distribution.",
        "4 hrs"),
    ],
    project:{ id:"aw8", title:"ML-Serving Backend",
      desc:"ONNX Runtime model serving with request batching. pgvector semantic search with HNSW index. Minimal RAG pipeline with top-k retrieval and LLM context injection. Feast feature store with Redis online serving and Airflow materialisation DAG. Shadow mode A/B testing for model candidates. Input drift detection alerting. All endpoints benchmarked to p99 < 200ms." }
  },

  // ── Week 9 — Multi-Region & Geo-Distribution ──────────────
  { week:9, title:"Multi-Region & Geo-Distribution", timeRange:"16–18 hrs",
    days:[
      d(55,"Multi-Region Architecture Patterns","Design active-active and active-passive multi-region deployments.",
        "Multi-region deployments protect against full cloud region outages (which happen several times per year) and reduce latency for globally distributed users. Active-passive: one primary region handles all writes; the secondary region is a standby — fast failover but wasted capacity and no write latency improvement. Active-active: multiple regions accept writes simultaneously — highest availability and lowest latency but requires conflict resolution. Global load balancing: AWS Global Accelerator, Cloudflare Load Balancer, or GCP Global HTTP LB route users to the nearest healthy region. Latency-based routing: Route 53 LATENCY records route each user to the lowest-latency region. Health check failover: if the primary region's /health endpoint fails, DNS automatically routes to the secondary. RTO (Recovery Time Objective) and RPO (Recovery Point Objective) define acceptable outage and data loss windows.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=multi-region+active-active+architecture+AWS+tutorial",label:"Multi-Region Architecture"},{type:"web",url:"https://aws.amazon.com/builders-library/static-stability-using-availability-zones/",label:"AWS: Static Stability"},{type:"web",url:"https://www.cockroachlabs.com/blog/multi-region-database/",label:"CockroachDB Multi-Region"}],
        "For your order service, define RTO and RPO targets. Then design the failover mechanism: how does traffic shift from region A to B? How much data could be lost? How do you test it?",
        "🚀 TASK: (1) Deploy your API to two AWS regions (us-east-1, eu-west-1) using Terraform — identical ECS services with separate RDS instances, (2) configure Route 53 latency-based routing: latency records point to each region's ALB — verify users in Europe hit eu-west-1, (3) set up Route 53 health checks on /health endpoints — configure DNS failover to switch all traffic to us-east-1 if eu-west-1 is unhealthy, (4) configure PostgreSQL streaming replication: us-east-1 as primary, eu-west-1 as read replica — measure replication lag, (5) simulate region failure: stop eu-west-1 API, measure time until Route 53 failover completes (target < 60s).",
        "4 hrs"),
      d(56,"CRDT Conflict Resolution","Handle concurrent writes in distributed systems using Conflict-free Replicated Data Types.",
        "In active-active deployments, the same data can be written concurrently in two regions — creating conflicts. CRDTs (Conflict-free Replicated Data Types) are data structures that can be merged automatically without coordination. G-Counter: grow-only counter — each node has its own counter slot [node1: 5, node2: 3] — total is the sum — merging takes max per slot. LWW-Register (Last-Write-Wins): the write with the highest timestamp wins — simple but loses updates. OR-Set (Observe-Remove Set): add operations are tagged with unique IDs — removes only affect tagged adds — concurrent add and remove results in the element being present. Vector clocks: track causality — each node increments its own counter — compare vectors to determine if events are concurrent or ordered. Automerge and Yjs are JavaScript CRDT libraries used in collaborative editing.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=CRDT+conflict+free+replicated+data+types+explained+tutorial",label:"CRDTs Explained"},{type:"web",url:"https://automerge.org/docs/",label:"Automerge Docs"},{type:"web",url:"https://crdt.tech/",label:"CRDT Resources"}],
        "Simulate a conflict: user updates their profile picture in region A and their display name in region B simultaneously. With LWW, one update is lost. With CRDTs, how would a per-field LWW-Register preserve both updates?",
        "🚀 TASK: (1) Implement a G-Counter in Node.js: { nodeId, counts: {[nodeId]: number} } — implement increment(nodeId), value(), merge(other) — merge takes max per node slot, (2) implement an LWW-Register: { value, timestamp, nodeId } — merge selects the entry with the highest timestamp (break ties by nodeId), (3) implement an OR-Set: addElement(item, tag), removeElement(item), merge(other) — demonstrate concurrent add/remove results in item being present, (4) use the Automerge library to create a shared document: two nodes make concurrent edits to a JSON object — merge and verify both edits are preserved, (5) benchmark CRDT merge performance: merge two G-Counters with 1000 node slots — measure time and memory.",
        "3 hrs"),
      d(57,"Global CDN & Edge Caching","Accelerate global API performance with Cloudflare Workers and strategic edge caching.",
        "A CDN (Content Delivery Network) caches content at edge PoPs (Points of Presence) close to users. For APIs, edge caching requires careful cache-control headers: Cache-Control: public, max-age=60, s-maxage=300 lets CDNs cache for 300s while browsers cache for 60s. Cloudflare Workers: V8 isolate-based edge compute running at 300+ PoPs — run JavaScript at the edge with <1ms cold start. Use cases: request coalescing (multiple concurrent cache misses fetch origin only once), A/B testing by region (set a cookie at edge), geolocation-based routing (caches.default, request.cf.country). stale-while-revalidate: serve stale content immediately while fetching fresh content in the background. Cache invalidation via Cloudflare API: purge by tag (Cache-Tag header groups related resources).",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Cloudflare+Workers+edge+caching+API+acceleration+tutorial",label:"Cloudflare Workers Tutorial"},{type:"web",url:"https://developers.cloudflare.com/workers/",label:"Cloudflare Workers Docs"},{type:"web",url:"https://developers.cloudflare.com/cache/",label:"Cloudflare Cache Docs"}],
        "Design edge caching for your product catalog API: which endpoints are cacheable? What TTL? How do you invalidate cache when a product price changes? What cannot be cached at the edge?",
        "🚀 TASK: (1) Deploy a Cloudflare Worker using Wrangler CLI that proxies your API — add Cache-Control: public, max-age=60 headers to GET /products responses, (2) implement request coalescing: use the Cloudflare Cache API (caches.default.match/put) — verify that 10 simultaneous cache misses result in only 1 origin request, (3) implement edge geolocation: read request.cf.country — redirect EU users to eu-west-1 and US users to us-east-1 origin at the edge, (4) implement stale-while-revalidate: serve the cached response and trigger a background fetch to refresh the cache asynchronously, (5) implement cache tag-based invalidation: tag product responses with Cache-Tag: product-{id} — call the Cloudflare API to purge all cached responses for a product on update.",
        "3 hrs"),
      d(58,"Chaos Engineering & Resilience Testing","Validate system resilience by deliberately injecting failures in production-like environments.",
        "Chaos engineering: intentionally introducing failures to discover weaknesses before they cause incidents. Principles of Chaos (Netflix): start with a hypothesis, run experiments in production (or staging), minimise blast radius, automate experiments. Common experiments: terminate random pods (pod failure), inject network latency between services (network partition simulation), saturate CPU/memory, kill a database connection pool, expire TLS certificates. Tools: chaostoolkit (Python CLI), chaos-mesh (Kubernetes CRD-based), Gremlin (SaaS). Circuit breaker with opossum: when a service fails repeatedly, open the circuit — fail fast and return a fallback rather than waiting for timeout. Bulkhead pattern: isolate resource pools — if one service's thread pool is exhausted, it doesn't starve other services.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=chaos+engineering+Kubernetes+chaos-mesh+circuit+breaker+tutorial",label:"Chaos Engineering Tutorial"},{type:"web",url:"https://chaos-mesh.org/docs/",label:"Chaos Mesh Docs"},{type:"web",url:"https://nodeshift.dev/opossum/",label:"opossum Circuit Breaker"}],
        "For each dependency in your order service (PostgreSQL, Redis, notification-service), write a hypothesis: 'If [dependency] is unavailable for 30s, then orders can still be placed and notifications are queued.' How do you verify this?",
        "🚀 TASK: (1) Install chaos-mesh in Kubernetes — run a PodChaos experiment that kills 50% of user-service pods — verify load balancing keeps the service available, (2) inject NetworkChaos: add 200ms latency between order-service and notification-service — verify circuit breaker opens and orders still complete without waiting for notification, (3) implement opossum circuit breaker for the notification-service call: fallback queues the notification to Redis for later delivery, (4) run a memory pressure experiment with StressChaos — inject 500MB memory stress on order-service pods — verify OOMKilled pod is restarted by K8s and traffic resumes in <30s, (5) write a Game Day runbook: simulate a region failure drill — document each step, expected behaviour, and rollback procedure.",
        "3 hrs"),
    ],
    project:{ id:"aw9", title:"Multi-Region Active-Active API",
      desc:"Two-region active-active ECS deployment (us-east-1, eu-west-1). Route 53 latency routing with health-check failover. PostgreSQL streaming replication with replication lag monitoring. CRDT G-Counter and LWW-Register implementations. Cloudflare Worker with edge caching, stale-while-revalidate, and cache tag invalidation. opossum circuit breaker with Redis fallback. Chaos Mesh experiment runbook." }
  },

  // ── Week 10 — Advanced Observability & AIOps ─────────────
  { week:10, title:"Advanced Observability & AIOps", timeRange:"14–16 hrs",
    days:[
      d(59,"OpenTelemetry Deep Dive — Custom Exporters & Baggage","Build custom OTel exporters, propagate baggage, and add semantic conventions.",
        "OpenTelemetry's export pipeline: SDK → SpanProcessor → Exporter. SimpleSpanProcessor sends spans synchronously (for development); BatchSpanProcessor buffers and exports in batches (for production). Custom exporter: implement the SpanExporter interface with export(spans) and shutdown() methods — useful for writing to proprietary backends. Context propagation: the W3C Trace Context standard (traceparent, tracestate headers) propagates trace IDs across HTTP boundaries. Baggage: arbitrary key-value pairs attached to the context that propagate across service boundaries — carry user-tier, A/B test variant, feature flags. Semantic conventions: OTel defines standard attribute names — http.method, http.url, db.system, db.statement, messaging.system — using these enables vendor tooling to understand spans. Exemplars: link a trace to a Prometheus metric sample — click a spike on a Grafana graph and jump to the trace.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=OpenTelemetry+custom+exporter+baggage+semantic+conventions+Node.js",label:"OTel Advanced Tutorial"},{type:"web",url:"https://opentelemetry.io/docs/instrumentation/js/exporters/",label:"OTel JS Exporters"},{type:"web",url:"https://opentelemetry.io/docs/concepts/semantic-conventions/",label:"OTel Semantic Conventions"}],
        "Trace a request from Cloudflare Worker → API Gateway → order-service → PostgreSQL. What traceparent header is passed at each hop? What span attributes would you add at each layer?",
        "🚀 TASK: (1) Implement a custom OTel exporter that writes spans to a local file as NDJSON — useful for debugging and testing, (2) configure BatchSpanProcessor with maxExportBatchSize=512 and scheduledDelayMillis=2000 — measure the difference in overhead vs SimpleSpanProcessor under load, (3) add OTel Baggage propagation: set user.tier and ab_variant in the API Gateway — read them in order-service to tag all spans and log lines, (4) add semantic convention attributes to all database spans: db.system='postgresql', db.statement (sanitised), db.name, db.user — verify Jaeger groups spans correctly, (5) enable OTel exemplars on a Prometheus histogram — correlate a latency spike in Grafana with the exact trace in Jaeger.",
        "3 hrs"),
      d(60,"ML-Based Anomaly Detection on Metrics","Detect anomalies in system metrics using statistical models and integrate alerts.",
        "Traditional alerting uses static thresholds (alert if error_rate > 1%) — these miss gradual degradation and generate false positives for seasonal traffic. ML-based anomaly detection uses historical patterns to establish normal ranges. Isolation Forest: unsupervised algorithm that isolates anomalies by randomly partitioning feature space — few partitions needed → anomaly. Prophet (Facebook): time-series forecasting with trend, seasonality, and holiday components — forecast expected metric value, alert if actual deviates by > N sigma. @tensorflow/tfjs-node autoencoder: train on normal metric windows, high reconstruction error indicates anomaly. Grafana anomaly detection: grafana-ml plugin uses Prophet internally. Node.js anomaly pipeline: collect metrics from Prometheus API → run isolation forest with ml-js → emit alert to PagerDuty via API.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=anomaly+detection+time+series+Prophet+machine+learning+metrics",label:"Anomaly Detection Tutorial"},{type:"web",url:"https://facebook.github.io/prophet/docs/",label:"Prophet Docs"},{type:"web",url:"https://grafana.com/docs/grafana/latest/alerting/",label:"Grafana Alerting Docs"}],
        "For your API's request rate, identify the seasonal patterns (daily, weekly). Design a detection strategy: what constitutes an anomaly — sudden spike, gradual decline, pattern shift? What's your acceptable false positive rate?",
        "🚀 TASK: (1) Query Prometheus HTTP API from Node.js: fetch query_range for http_requests_total over 7 days — transform to time series array, (2) implement a sliding window z-score detector: for each new data point, compute z-score against the last 24h window — alert if |z| > 3, (3) install the ml-js npm package — run IsolationForest on a multivariate metric dataset (CPU, memory, error rate) — evaluate precision and recall using injected synthetic anomalies, (4) integrate Prophet via Python subprocess: train on 30 days of request rate, forecast next 24h, alert if actual deviates > 2 sigma from forecast, (5) route anomaly alerts to a webhook endpoint — format as PagerDuty event API payload and trigger a test incident.",
        "3 hrs"),
      d(61,"SLO Engineering & Error Budgets","Define SLOs, track error budgets, and implement multi-window burn-rate alerting.",
        "SRE (Site Reliability Engineering) formalises reliability as SLIs, SLOs, and error budgets. SLI (Service Level Indicator): the actual measurement — request success rate, latency p99. SLO (Service Level Objective): the target — 99.9% of requests succeed. Error budget: 100% − SLO — for 99.9% SLO, you have 0.1% of requests (43.8 minutes/month) available to fail. Burn rate: how fast you're consuming the error budget — burn rate of 1 means you'll exactly exhaust the budget in the SLO window. Multi-window alerting (Google SRE Workbook): alert when burn rate is high over both a short window (1h) and a long window (6h) simultaneously — catches fast burns early while avoiding false positives from brief spikes. Prom rule example: rate(http_requests_total{status=~'5..'}[1h]) / rate(http_requests_total[1h]) > 14.4 * (1 - 0.999).",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=SLO+SLI+error+budget+burn+rate+alerting+Prometheus+tutorial",label:"SLO Engineering Tutorial"},{type:"web",url:"https://sre.google/workbook/alerting-on-slos/",label:"Google SRE: Alerting on SLOs"},{type:"web",url:"https://prometheus.io/docs/practices/alerting/",label:"Prometheus Alerting Best Practices"}],
        "Define SLOs for your order API: availability SLO, latency SLO (p99 < 500ms for 99% of requests). Calculate error budgets for monthly and weekly windows. At current error rate, when will the monthly budget be exhausted?",
        "🚀 TASK: (1) Define a Prometheus recording rule: job:request_success_rate:ratio_rate5m = rate(http_requests_total{status!~'5..'}[5m]) / rate(http_requests_total[5m]), (2) implement multi-window burn-rate alerting: alert fires when both 1h burn rate > 14.4 and 6h burn rate > 6 (for a 99.9% SLO), (3) build an error budget dashboard in Grafana: show remaining error budget as a percentage and time until exhaustion at current burn rate, (4) implement an error budget policy: when budget < 10%, send a Slack notification and automatically disable non-critical feature flags, (5) add latency SLO tracking: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) — alert when p99 > 500ms for 10+ minutes.",
        "3 hrs"),
      d(62,"eBPF for Zero-Overhead Observability","Use eBPF to observe Node.js processes without instrumentation overhead.",
        "eBPF (extended Berkeley Packet Filter): a Linux kernel technology that lets you run sandboxed programs in the kernel — triggered by system calls, network events, or hardware counters — with near-zero overhead. Traditional profiling adds overhead (sample rate, heap snapshots). eBPF profiling reads CPU stack traces directly from the kernel — no application changes needed. Tools: bpftrace (high-level scripting language for eBPF), bcc (Python library for eBPF programs), Pixie (Kubernetes-native auto-observability using eBPF). Pixie automatically captures full-body HTTP requests, database queries, gRPC calls, and CPU flame graphs without any instrumentation. Node.js V8 profiling via eBPF: uprobes attach to V8 internal functions — capture JavaScript stack traces.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=eBPF+observability+Node.js+bpftrace+Pixie+tutorial",label:"eBPF Observability Tutorial"},{type:"web",url:"https://ebpf.io/what-is-ebpf/",label:"eBPF.io"},{type:"web",url:"https://docs.px.dev/",label:"Pixie Docs"}],
        "Compare eBPF profiling vs V8 --prof: what information can eBPF capture that V8's profiler cannot? What are the kernel version requirements and security implications of eBPF in production?",
        "🚀 TASK: (1) Install bpftrace on a Linux VM — run a one-liner to count syscalls by type for a running Node.js process: bpftrace -e 'tracepoint:syscalls:sys_enter_* /pid == target/ { @[probe] = count(); }', (2) install Pixie in minikube: px deploy — run px run px/http_data to capture live HTTP request/response bodies from your API with zero code changes, (3) use bpftrace to build a custom latency histogram for PostgreSQL queries: attach to the pg library's socket write/read — measure query round-trip time, (4) generate a Pixie CPU flame graph for your Node.js API under load — identify the hottest functions, (5) compare Pixie-captured query latency vs your manual OTel DB spans — verify they match within 1ms.",
        "2 hrs"),
    ],
    project:{ id:"aw10", title:"AIOps Observability Platform",
      desc:"Custom OTel BatchSpanProcessor with NDJSON file exporter. OTel Baggage propagation of user.tier and ab_variant across all services. ML anomaly detection pipeline: Prophet forecast + z-score sliding window, routing alerts to PagerDuty. Multi-window burn-rate alerting for 99.9% availability and p99 latency SLOs. Grafana error budget dashboard. Pixie auto-observability with zero-instrumentation HTTP and DB tracing." }
  },

  // ── Week 11 — Systems Programming & Performance ───────────
  { week:11, title:"Systems Programming & Performance", timeRange:"16–18 hrs",
    days:[
      d(63,"Raw TCP & Custom Protocol Design","Build a TCP server from scratch and design a binary application protocol.",
        "Node.js net module provides raw TCP access. net.createServer(socket => { ... }) — socket is a Duplex stream. socket.on('data', chunk => ...) receives raw bytes. socket.write(buffer) sends bytes. Framing: TCP is a stream — messages don't have built-in boundaries. Length-prefixed framing: write a 4-byte uint32 header indicating the payload length, then the payload. Protocol Buffer encoding without Protobuf: manually encode fields as (field_number << 3 | wire_type) followed by the encoded value. Binary protocol advantages over JSON: smaller payloads (no field name repetition), faster serialisation/deserialisation, schema enforcement. Custom protocol example: RESP (Redis Serialization Protocol) — line-oriented text protocol used by Redis — implement a RESP encoder/decoder. TLS from scratch: tls.createServer({ key, cert }) wraps a TCP server with TLS termination.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Node.js+TCP+server+raw+socket+custom+protocol+tutorial",label:"Node.js TCP Server Tutorial"},{type:"web",url:"https://nodejs.org/api/net.html",label:"Node.js net Module Docs"},{type:"web",url:"https://redis.io/docs/reference/protocol-spec/",label:"RESP Protocol Spec"}],
        "Design a binary protocol for a chat system: define the frame header (magic bytes, message type, payload length), message types (CONNECT, MESSAGE, ACK, DISCONNECT), and the ACK mechanism for reliable delivery.",
        "🚀 TASK: (1) Build a TCP echo server with net.createServer — send raw bytes with netcat and verify round-trip, (2) implement length-prefix framing: write a Frame class with encode(buffer) that prepends a 4-byte length header and decode(stream) that buffers until the full frame arrives, (3) implement a RESP protocol encoder/decoder: encode arrays, bulk strings, integers, and errors — verify with a real Redis client connecting to your server, (4) wrap your TCP server in TLS using tls.createServer with a self-signed cert — verify with openssl s_client, (5) benchmark: send 100k messages over your framed TCP server vs HTTP/1.1 — measure throughput and latency difference.",
        "3 hrs"),
      d(64,"Custom HTTP/1.1 Parser","Build an HTTP/1.1 request parser from scratch to understand the protocol internals.",
        "HTTP/1.1 is a text protocol over TCP. A request is: request-line (METHOD SP path SP HTTP/1.1 CRLF) + headers (name: value CRLF)* + CRLF + optional body. Parsing strategy: state machine with states REQUEST_LINE, HEADERS, BODY. llhttp (used by Node.js core): a fast HTTP parser written in C — parse incrementally as data arrives. Building a parser in Node.js: maintain a Buffer for incomplete data, scan for CRLF sequences, extract tokens. Content-Length body reading: once headers are parsed, read exactly Content-Length bytes. Transfer-Encoding: chunked: parse chunk-size (hex) CRLF chunk-data CRLF repeatedly until chunk-size 0. HTTP pipelining: multiple requests can be sent before receiving responses — require sequential response ordering. Keep-alive: reuse the TCP connection for subsequent requests — avoid TCP handshake overhead.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=HTTP+parser+from+scratch+state+machine+Node.js+tutorial",label:"HTTP Parser Tutorial"},{type:"web",url:"https://www.rfc-editor.org/rfc/rfc7230",label:"RFC 7230: HTTP/1.1 Message Syntax"},{type:"web",url:"https://github.com/nodejs/llhttp",label:"llhttp Parser"}],
        "Trace byte-by-byte parsing of: 'POST /api/orders HTTP/1.1\\r\\nContent-Length: 25\\r\\nContent-Type: application/json\\r\\n\\r\\n{\"product\":\"x\",\"qty\":1}'. Draw the state machine transitions.",
        "🚀 TASK: (1) Implement an HTTP/1.1 request parser as a state machine: states [REQUEST_LINE, HEADER_NAME, HEADER_VALUE, BODY] — handle incomplete chunks by buffering, (2) add chunked transfer-encoding decoding: parse hex chunk sizes, concatenate chunk bodies, detect trailing CRLF 0 CRLF, (3) build a minimal HTTP server on top of your parser and TCP server — serve static JSON responses — test with curl, (4) implement HTTP keep-alive: reuse the TCP connection for 10 sequential requests — measure latency vs new connection per request, (5) benchmark your parser vs a standard HTTP server — measure requests/second — identify the bottleneck.",
        "3 hrs"),
      d(65,"N-API Native Addons","Write C++ Node.js native addons with N-API for CPU-intensive operations.",
        "Node.js N-API: a stable C API for building native addons — ABI-stable across Node.js versions (unlike the old nan). Use cases: CPU-bound operations (image resizing, cryptography, parsing large binary formats), wrapping existing C/C++ libraries, accessing OS APIs not exposed in Node.js. node-gyp: the build tool for native addons. binding.gyp: build configuration. Napi::Env, Napi::Value, Napi::Function: core N-API types. Async addon: Napi::AsyncWorker offloads work to the libuv thread pool — doesn't block the event loop. node-addon-api: C++ wrapper over raw N-API — reduces boilerplate. Benchmarking: native addons are typically 3–10x faster than pure JS for CPU-bound work — but overhead of JS ↔ C++ boundary calls adds latency for small payloads.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=Node.js+native+addon+N-API+C%2B%2B+tutorial+node-gyp",label:"N-API Native Addon Tutorial"},{type:"web",url:"https://nodejs.org/api/n-api.html",label:"Node.js N-API Docs"},{type:"web",url:"https://github.com/nodejs/node-addon-api",label:"node-addon-api Docs"}],
        "When is a native addon justified vs a child_process calling a C program vs WebAssembly? Compare startup time, communication overhead, and maintenance cost for each approach.",
        "🚀 TASK: (1) Create a native addon with node-addon-api: implement a synchronous sum(Int32Array) function in C++ — benchmark vs pure JavaScript for arrays of 1M integers, (2) implement an async addon: SHA-256 hash of a large buffer computed in the libuv thread pool with AsyncWorker — verify the event loop stays responsive during computation, (3) wrap a C library (zlib.h) in a native addon: expose compress(buffer) and decompress(buffer) — compare speed vs Node.js built-in zlib, (4) implement SIMD operations using SSE2 intrinsics in C++: vectorised float32 dot product — benchmark vs JavaScript loop, (5) publish your addon as an npm package with prebuilt binaries for linux-x64 and darwin-arm64 using node-pre-gyp.",
        "3 hrs"),
      d(66,"In-Memory Query Engine","Build a SQL-like query engine with a parser, planner, and executor.",
        "A query engine processes structured queries against data. Components: Lexer (tokenise SQL string into tokens), Parser (build Abstract Syntax Tree from tokens), Planner (convert AST to logical plan, optimise), Executor (run the plan against data). Recursive descent parser: each SQL clause is a function that consumes tokens. Logical plan nodes: Scan(table), Filter(expr), Project(cols), Join(left, right, on), Aggregate(groupBy, agg). The volcano (iterator) model: each plan node implements next() → yields one tuple at a time — pull-based. Cost-based optimiser: estimate row counts and I/O cost for each plan alternative — choose the lowest cost plan. This is the same architecture used by PostgreSQL, SQLite, and DuckDB.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=SQL+query+engine+parser+AST+executor+from+scratch+tutorial",label:"Query Engine Tutorial"},{type:"web",url:"https://duckdb.org/why_duckdb",label:"DuckDB Architecture"},{type:"web",url:"https://www.sqlite.org/queryplanner.html",label:"SQLite Query Planner"}],
        "Trace the query SELECT name, SUM(amount) FROM orders WHERE status='paid' GROUP BY name through your query engine: what AST nodes are created? What logical plan nodes? What does the executor iterate?",
        "🚀 TASK: (1) Implement a lexer that tokenises a SQL subset: SELECT, FROM, WHERE, GROUP BY, ORDER BY, LIMIT, identifiers, string literals, integers, operators (=, >, <, AND, OR), (2) implement a recursive descent parser that produces an AST for SELECT-FROM-WHERE queries, (3) implement the volcano executor: Scan reads all rows from an in-memory array, Filter wraps Scan and yields only matching rows, Project maps rows to specified columns, (4) add Aggregate executor: consume all rows from child, group by key, compute SUM/COUNT/AVG, (5) benchmark: run a GROUP BY query with SUM over 1M rows — compare your engine vs equivalent JavaScript reduce — identify the bottleneck.",
        "4 hrs"),
    ],
    project:{ id:"aw11", title:"Custom Query Engine",
      desc:"TCP server with length-prefix framing and RESP protocol encoder/decoder. HTTP/1.1 parser state machine handling chunked transfer encoding and keep-alive. N-API native addon: async SHA-256 hasher, vectorised float32 dot product with SSE2. SQL query engine: recursive-descent parser, volcano executor supporting SELECT-FROM-WHERE-GROUP BY. All benchmarked against production alternatives." }
  },

  // ── Week 12 — Advanced Capstone ──────────────────────────
  { week:12, title:"Advanced Capstone — Expert Backend Platform", timeRange:"16–18 hrs",
    days:[
      d(67,"Capstone Day 1 — Architecture Design & Scaffolding","Design the complete Expert Backend Platform architecture and scaffold all repositories.",
        "The capstone integrates every advanced concept: multi-region active-active deployment, event sourcing + CQRS for the order domain, Kafka + Debezium CDC pipeline, zero-trust mTLS with SPIFFE/SPIRE, full OpenTelemetry observability, GitOps with ArgoCD, SLSA-compliant CI/CD, and ML-powered anomaly detection. Day 1 is architecture and scaffolding — no working code yet, only decisions, diagrams, and repository structure. Architecture Decision Records (ADRs): document every significant decision with context, decision, and consequences. Monorepo with Turborepo or Nx: shared TypeScript types, shared OpenTelemetry setup, shared testing utilities.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=system+design+expert+backend+platform+architecture+tutorial",label:"Expert Platform Architecture"},{type:"web",url:"https://adr.github.io/",label:"Architecture Decision Records"},{type:"web",url:"https://turbo.build/repo/docs",label:"Turborepo Docs"}],
        "Draw the complete system architecture: all services, databases, message brokers, CDN, load balancers, K8s clusters (two regions), Kafka, Debezium, feature store, and observability stack. Identify the critical path for an order placement.",
        "🚀 TASK: (1) Create a monorepo with Turborepo: packages/shared-types, packages/otel-setup, packages/test-utils — services: user-service, order-service, notification-service, analytics-service, (2) write ADRs for: choice of event store (PostgreSQL vs EventStoreDB), choice of message broker (Kafka), CRDT strategy for multi-region conflict resolution, (3) scaffold each service: TypeScript + Express + OTel auto-instrumentation + Docker multi-stage build + Helm chart, (4) set up the GitHub monorepo with branch protection, CODEOWNERS, and GitHub Actions CI that runs only affected packages (Turborepo affected), (5) design and document the domain model: Order aggregate events, Kafka topic schema (Avro or JSON Schema), service API contracts.",
        "3 hrs"),
      d(68,"Capstone Day 2 — Event Sourcing & Multi-Region Data","Implement the Order aggregate with event sourcing and set up multi-region PostgreSQL replication.",
        "The Order domain is the core of the system. Event sourcing means every state change is an event: OrderPlaced, PaymentConfirmed, ItemsPicked, OrderShipped, OrderDelivered, OrderRefunded. The OrderCommandHandler validates commands against the current aggregate state and appends new events to the event store. The ProjectionBuilder subscribes to the event store and updates CQRS read models. Multi-region: the primary PostgreSQL (with event store + outbox) is in us-east-1; a streaming replica in eu-west-1 serves read-only queries. Debezium reads the WAL from us-east-1 and publishes events to Kafka — consumers in both regions process events.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=event+sourcing+CQRS+multi-region+PostgreSQL+replication+tutorial",label:"Event Sourcing Multi-Region"},{type:"web",url:"https://www.postgresql.org/docs/current/warm-standby.html",label:"PostgreSQL Streaming Replication"},{type:"web",url:"https://debezium.io/documentation/reference/stable/",label:"Debezium Reference"}],
        "Identify all invariants your Order aggregate must enforce: what commands are invalid given certain states? (e.g. cannot ship an unpaid order) Write these as guard clauses in the command handler.",
        "🚀 TASK: (1) Implement Order aggregate: state machine with transitions (Pending → Paid → Picking → Shipped → Delivered) — apply(event) updates state, processCommand(cmd) validates and returns new events, (2) implement EventStore.append(aggregateId, events, expectedVersion) with optimistic concurrency — reject if version mismatch, (3) build the outbox relay: poll outbox table every 100ms — publish to Kafka — mark published — make it idempotent, (4) implement three CQRS projectors as Kafka consumers: order_detail (full order), user_order_summary (per-user list), daily_revenue (windowed aggregation), (5) set up PostgreSQL streaming replication between two Docker instances — measure replication lag under load with pg_stat_replication.",
        "4 hrs"),
      d(69,"Capstone Day 3 — Zero Trust & Security","Implement SPIFFE/SPIRE workload identity, mTLS, and supply chain security.",
        "Zero-trust security is not a product but an architecture: every request must be authenticated and authorised regardless of network location. SPIRE issues cryptographic identities to workloads; Istio enforces mTLS using those identities; OPA enforces fine-grained authorisation policies. Supply chain security closes the loop: signed container images, SBOM-attested artifacts, and SLSA L3 provenance ensure that what runs in production is exactly what was reviewed and built in CI.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=zero+trust+SPIFFE+mTLS+Istio+supply+chain+complete+tutorial",label:"Zero Trust Complete Tutorial"},{type:"web",url:"https://cloud.google.com/architecture/zero-trust-api-access",label:"Google: Zero Trust API Access"},{type:"web",url:"https://slsa.dev/spec/v1.0/",label:"SLSA v1.0 Spec"}],
        "Perform a threat model review of your current implementation: which STRIDE categories are addressed by SPIFFE mTLS? By OPA? By Cosign image signing? What gaps remain?",
        "🚀 TASK: (1) Deploy SPIRE in Kubernetes — register all service workloads — verify each pod receives an SVID with the correct SPIFFE URI, (2) configure Istio PeerAuthentication STRICT mode — verify that a pod without a valid SVID cannot connect to any other service, (3) implement OPA policy: order-service can only be called by user-service and api-gateway — all other callers receive 403, (4) add Cosign signing to all GitHub Actions workflows — add a Kyverno policy that rejects K8s Deployments with unsigned images, (5) generate SLSA L3 provenance for all service images using slsa-framework/slsa-github-generator — verify provenance with cosign verify-attestation.",
        "3 hrs"),
      d(70,"Capstone Day 4 — Observability & AIOps","Instrument the full platform with OTel, build SLO dashboards, and deploy ML anomaly detection.",
        "Observability in a distributed system means being able to ask arbitrary questions about system behaviour without deploying new code. The combination of traces (what happened), metrics (how often and how fast), and logs (detailed context) with cross-referencing (exemplars, trace IDs in logs) enables rapid diagnosis. AIOps layers ML-driven insights on top: anomaly detection catches degradation before users notice, SLO burn-rate alerts give time to react before the error budget is exhausted.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=OpenTelemetry+Prometheus+Grafana+SLO+complete+observability+tutorial",label:"Complete Observability Stack"},{type:"web",url:"https://grafana.com/docs/grafana/latest/dashboards/",label:"Grafana Dashboards"},{type:"web",url:"https://opentelemetry.io/docs/collector/",label:"OTel Collector Docs"}],
        "Define SLIs and SLOs for each service. For order-service: availability SLO, order placement latency SLO (p99 < 500ms), event processing lag SLO (< 5s). Calculate monthly error budgets.",
        "🚀 TASK: (1) Deploy OTel Collector with receivers (OTLP), processors (batch, memory_limiter), and exporters (Jaeger, Prometheus) — route all service traces through the collector, (2) build Grafana dashboards: per-service RED metrics (Rate, Errors, Duration), Kafka consumer lag, PostgreSQL replication lag, multi-region request distribution, (3) implement multi-window burn-rate alerting for all three SLOs — wire alerts to a Slack webhook, (4) deploy the Prophet anomaly detector from Week 10 as a Kubernetes CronJob — runs every 5 minutes, queries Prometheus, posts anomalies to the Slack alert channel, (5) use Pixie to capture 10 minutes of production traffic — generate a flame graph and identify the top CPU consumer without any code changes.",
        "3 hrs"),
      d(71,"Capstone Day 5 — GitOps, CI/CD & Platform Engineering","Complete the GitOps pipeline, SLSA CI, and Backstage IDP for the full platform.",
        "GitOps with ArgoCD completes the deployment story: every change flows through Git — reviewed, approved, and automatically applied to the cluster. The Backstage IDP makes the entire platform self-service for developers: one click creates a new service with all the wiring (CI, ArgoCD, Helm chart, OTel, SPIRE registration, Backstage catalog entry). The combination of ArgoCD (desired state), OPA (policy enforcement), Istio (traffic management), and Backstage (developer experience) forms the golden-path platform.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=GitOps+ArgoCD+Backstage+platform+engineering+complete+tutorial",label:"GitOps + Backstage Complete"},{type:"web",url:"https://argo-cd.readthedocs.io/en/stable/user-guide/app-of-apps/",label:"ArgoCD App of Apps"},{type:"web",url:"https://backstage.io/docs/features/software-templates/writing-templates",label:"Backstage Template Writing"}],
        "Map your complete deployment pipeline: code merge → what triggers → what validates → what deploys → what verifies → what rolls back automatically. Identify every manual step and plan to eliminate it.",
        "🚀 TASK: (1) Set up ArgoCD App of Apps: root app manages four service apps + infrastructure app (Kafka, PostgreSQL operators) — all with automated sync and self-heal, (2) configure ArgoCD Image Updater: when a new image is pushed to ghcr.io, automatically update the image tag in the Helm values file and commit to Git, (3) complete the SLSA CI pipeline: lint → test → build → sign → push → provenance → ArgoCD sync → smoke test — all in GitHub Actions, (4) create a Backstage software template that scaffolds a new TypeScript microservice with: Express + OTel + Dockerfile + Helm chart + ArgoCD Application + SPIRE workload registration + catalog-info.yaml — test by creating a real new service end-to-end, (5) implement a Rollback runbook in Backstage TechDocs: document the steps to roll back any service using ArgoCD — automate: write a GitHub Actions workflow triggered manually that rolls back a given service to a specified version.",
        "3 hrs"),
      d(72,"Capstone Day 6 — Chaos Testing & Launch","Run chaos experiments, load test the full system, and produce the final architecture documentation.",
        "A system is only as resilient as it has been tested to be. Chaos engineering is the discipline of turning unknown weaknesses into known ones. Game days: planned chaos experiments with the full team — everyone knows the experiments but not exactly when they run. Disaster recovery drills: quarterly exercises simulating region failure, database corruption, or key compromise. SLO tracking during chaos: if the error budget survives the chaos experiment, the system is resilient enough. The final deliverable is not just code — it's a runbook, architecture diagram, ADR log, performance benchmark report, and security scan results: documentation that lets a new team member understand, operate, and extend the platform.",
        [{type:"yt",url:"https://www.youtube.com/results?search_query=chaos+engineering+game+day+kubernetes+load+testing+tutorial",label:"Chaos Engineering Game Day"},{type:"web",url:"https://principlesofchaos.org/",label:"Principles of Chaos Engineering"},{type:"web",url:"https://k6.io/docs/",label:"k6 Load Testing Docs"}],
        "Write your chaos experiment hypotheses before running them: 'If we kill 50% of order-service pods, we expect latency to increase by < 100ms and no orders to be lost.' After each experiment, document whether the hypothesis held and what you learned.",
        "🚀 TASK: (1) Run k6 load test: 500 concurrent users placing orders for 10 minutes — capture p50/p95/p99 latency, throughput, and error rate — establish the performance baseline, (2) chaos experiment 1: kill 50% of order-service pods with chaos-mesh PodChaos — verify SLO holds, orders complete, Kafka consumer catches up within 60s, (3) chaos experiment 2: inject 500ms latency between order-service and PostgreSQL — verify circuit breaker opens, orders queue to Redis, and drain successfully when latency resolves, (4) chaos experiment 3: simulate region failover — stop all eu-west-1 pods — verify Route 53 health check triggers DNS failover within 60s and all traffic moves to us-east-1, (5) produce the final launch documentation: C4 architecture diagrams (Context, Container, Component), performance benchmark report, security scan results (ZAP, grype, SLSA), runbooks for common failure scenarios, ADR log.",
        "5 hrs"),
    ],
    project:{ id:"aw12", title:"Expert Backend Platform",
      desc:"Complete multi-region active-active platform: two-region ECS/K8s deployment with Route 53 latency routing and health-check failover. Event-sourced Order domain with PostgreSQL event store, Outbox + Debezium CDC, and three CQRS projectors. Zero-trust mTLS via SPIFFE/SPIRE + Istio STRICT mode. SLSA L3 CI pipeline with Cosign signing and Kyverno admission policy. ArgoCD App of Apps with image updater. Backstage IDP with one-click service scaffold. OTel Collector → Jaeger + Prometheus → Grafana with SLO burn-rate alerts. Prophet ML anomaly detection CronJob. Chaos Mesh experiments with documented hypotheses and results. k6 baseline: 500 concurrent users, p99 < 500ms." }
  },

  ] // end advanced.weeks
};

return { beginner, intermediate, advanced };
})();


// ════════════════════════════════════════════════════════════
// APP — BACKEND ROADMAP APPLICATION LOGIC
const BACKEND_APP = (function() {
  'use strict';

  // ── Storage Keys ──────────────────────────────────────────
  const KEYS = {
    REVISIONS:      'revisions',
    POMO_STATS:     'pomodoroStats',
    STREAKS:        'streaks',
    PROJECTS:       'projects',
    BACKEND_NOTES:  'backendNotes',
    POMO_DURATION:  'pomoDuration',
  };

  const REVISION_INTERVALS = [1, 3, 7, 14, 30];

  // ── State ─────────────────────────────────────────────────
  let backendCurrentLevel = null;
  let backendCurrentWeek  = null;
  let _backendRevFilter   = 'all';
  let _backendNotesTimer  = null;

  const _backendPomoState = {
    running: false, isBreak: false, seconds: 25 * 60, duration: 25,
    interval: null, alarmRinging: false, alarmAudio: null, alarmInterval: null,
  };
  const BREAK_SECONDS = 5 * 60;

  // ── Storage helpers ───────────────────────────────────────
  function load(key, def) {
    if (def === undefined) def = {};
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch(e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch(e) { console.error('Storage error:', e); }
  }

  // ── Date helpers ──────────────────────────────────────────
  function today() {
    const now = new Date();
    const y   = now.getFullYear();
    const m   = String(now.getMonth() + 1).padStart(2, '0');
    const d   = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  function addDays(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function daysDiff(a, b) {
    return Math.round((new Date(b+'T00:00:00') - new Date(a+'T00:00:00')) / 86400000);
  }
  function fmtDate(d) {
    if (!d) return '—';
    const [y, m, day] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
  }

  // ── UI helpers ────────────────────────────────────────────
  let _toastTimer;
  function toast(msg, type) {
    if (!type) type = 'info';
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'show ' + type;
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function() { el.className = ''; }, 2800);
  }
  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function openModal(id)  { const el = document.getElementById(id); if (el) el.classList.add('show'); }
  function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('show'); }

  // ── Screen navigation ─────────────────────────────────────
  function showBackendScreen(screenId) {
    ['backend-screen-levels', 'backend-screen-weeks', 'backend-screen-days'].forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = id === screenId ? 'block' : 'none';
    });
  }

  // ── Sub-tab navigation ────────────────────────────────────
  function switchBackendSub(sub, btn) {
    var subs = ['roadmap','revision','pomo','notes','projects'];
    subs.forEach(function(s) {
      const el = document.getElementById('backend-sub-' + s);
      if (el) el.style.display = s === sub ? '' : 'none';
    });
    // sync bottom nav
    document.querySelectorAll('#backend-bottom-nav .backend-nav-item').forEach(function(b) {
      b.classList.remove('active');
    });
    var navBtn = document.getElementById('backend-nav-' + sub);
    if (navBtn) navBtn.classList.add('active');
    // sync subtab bar (if present)
    document.querySelectorAll('#backend-subtab-bar .backend-sub-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    if (btn && btn.classList && btn.classList.contains('backend-sub-btn')) {
      btn.classList.add('active');
    } else {
      const b = document.getElementById('backend-subtab-' + sub);
      if (b) b.classList.add('active');
    }
    if (sub === 'revision') renderBackendRevisions();
    if (sub === 'pomo')     { updateBackendPomoDisplay(); renderBackendPomoStats(); }
    if (sub === 'notes')    renderBackendNotes();
    if (sub === 'projects') renderBackendProjects();
  }

  // ── Level selection ───────────────────────────────────────
  function selectBackendLevel(levelKey) {
    backendCurrentLevel = levelKey;
    backendCurrentWeek  = null;
    save('backendCurrentLevel', levelKey);
    localStorage.removeItem('backendCurrentWeek');
    renderBackendWeeks();
    showBackendScreen('backend-screen-weeks');
    renderInlineRevisions('backend-inline-rev-weeks', 'backend');
  }

  function renderBackendLevelSummary(level) {
    const el = document.getElementById('backend-level-summary');
    if (!el || !level) return;
    const prog = load('backend_struct_' + backendCurrentLevel, {});
    let totalDays = 0, doneDays = 0;
    (level.weeks || []).forEach(function(w) {
      (w.days || []).forEach(function(day) {
        totalDays++;
        const key = 'w' + w.week + 'd' + day.num;
        if (prog[key] && prog[key].done) doneDays++;
      });
    });
    const pct = totalDays ? Math.round(doneDays / totalDays * 100) : 0;
    el.innerHTML = `
      <div class="${backendCurrentLevel}-summary ai-level-summary-bar">
        <div class="ai-sum-stat"><span class="ai-sum-val" style="color:var(--c6)">${doneDays}</span><span class="ai-sum-lbl">Done</span></div>
        <div class="ai-sum-stat"><span class="ai-sum-val" style="color:var(--c6)">${totalDays - doneDays}</span><span class="ai-sum-lbl">Left</span></div>
        <div class="ai-sum-stat"><span class="ai-sum-val" style="color:var(--c6)">${pct}%</span><span class="ai-sum-lbl">Progress</span></div>
        <div class="ai-sum-prog-wrap">
          <div class="ai-sum-prog-bar">
            <div class="ai-sum-prog-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--c6),var(--c4))"></div>
          </div>
        </div>
      </div>`;
  }

  function renderBackendWeeks() {
    const level = STRUCTURED_BACKEND_ROADMAP[backendCurrentLevel];
    if (!level) { showBackendScreen('backend-screen-levels'); return; }
    const titleEl = document.getElementById('backend-weeks-title');
    if (titleEl) titleEl.textContent = level.label + ' (' + level.days + ' Days)';
    renderBackendLevelSummary(level);
    const prog = load('backend_struct_' + backendCurrentLevel, {});
    const listEl = document.getElementById('backend-weeks-list');
    if (!listEl) return;
    listEl.innerHTML = renderBackendWeeksList(level, prog);
  }

  function renderBackendWeeksList(levelData, prog) {
    let html = '';
    (levelData.weeks || []).forEach(function(w) {
      let weekTotal = w.days ? w.days.length : 0;
      let weekDone = 0;
      (w.days || []).forEach(function(day) {
        const key = 'w' + w.week + 'd' + day.num;
        if (prog[key] && prog[key].done) weekDone++;
      });
      const weekPct = weekTotal ? Math.round(weekDone / weekTotal * 100) : 0;
      const complete = weekDone === weekTotal && weekTotal > 0;
      html += `
        <div class="ai-week-card${complete ? ' week-complete' : ''}" onclick="APP.selectBackendWeek(${w.week})">
          <div class="ai-week-header">
            <div class="ai-week-num">
              <span class="ai-week-num-lbl">WK</span>
              <span class="ai-week-num-val" style="color:var(--c6)">${w.week}</span>
            </div>
            <div class="ai-week-info">
              <div class="ai-week-title">${esc(w.title)}</div>
              <div class="ai-week-sub">${esc(w.timeRange || '')}</div>
              ${w.project ? `<span class="ai-week-time-badge" style="color:var(--c6)">🏗️ ${esc(w.project.title)}</span>` : ''}
              <span class="ai-week-time-badge">${weekDone}/${weekTotal} days</span>
            </div>
            <div class="ai-week-right">
              <div class="ai-week-prog-txt">${weekPct}%</div>
              <div class="ai-week-mini-prog"><div class="ai-week-mini-fill" style="width:${weekPct}%;background:linear-gradient(90deg,var(--c6),var(--c4))"></div></div>
            </div>
          </div>
        </div>`;
    });
    return html || '<div class="empty-state"><div class="empty-ico">📚</div><div class="empty-title">No weeks found</div></div>';
  }

  function filterBackendRoadmap() {
    const q = (document.getElementById('backend-search') || {}).value || '';
    const lower = q.toLowerCase().trim();
    const level = STRUCTURED_BACKEND_ROADMAP[backendCurrentLevel];
    if (!level) return;
    const prog = load('backend_struct_' + backendCurrentLevel, {});
    const listEl = document.getElementById('backend-weeks-list');
    if (!listEl) return;
    const filtered = {
      weeks: (level.weeks || []).filter(function(w) {
        if (!lower) return true;
        return w.title.toLowerCase().includes(lower) ||
               (w.days || []).some(function(d) { return d.title.toLowerCase().includes(lower); });
      })
    };
    listEl.innerHTML = renderBackendWeeksList(filtered, prog) ||
      '<div class="empty-state"><div class="empty-ico">🔍</div><div class="empty-title">No matches</div></div>';
  }

  function selectBackendWeek(weekNum) {
    backendCurrentWeek = weekNum;
    save('backendCurrentWeek', String(weekNum));
    const level = STRUCTURED_BACKEND_ROADMAP[backendCurrentLevel];
    if (!level) return;
    const weekData = (level.weeks || []).find(function(w) { return w.week === weekNum; });
    if (!weekData) return;
    const titleEl = document.getElementById('backend-days-title');
    if (titleEl) titleEl.textContent = 'Week ' + weekNum + ' — ' + weekData.title;

    const prog = load('backend_struct_' + backendCurrentLevel, {});
    let totalDays = weekData.days ? weekData.days.length : 0;
    let doneDays = 0;
    (weekData.days || []).forEach(function(day) {
      const key = 'w' + weekNum + 'd' + day.num;
      if (prog[key] && prog[key].done) doneDays++;
    });
    const pct = totalDays ? Math.round(doneDays / totalDays * 100) : 0;

    const wkSumEl = document.getElementById('backend-week-summary');
    if (wkSumEl) {
      wkSumEl.innerHTML = `
        <div class="ai-week-summary-bar">
          <div class="ai-wsum-stat"><span class="ai-wsum-val" style="color:var(--c6)">${doneDays}</span><span class="ai-wsum-lbl">Done</span></div>
          <div class="ai-wsum-stat"><span class="ai-wsum-val" style="color:var(--c6)">${totalDays - doneDays}</span><span class="ai-wsum-lbl">Left</span></div>
          <div class="ai-wsum-stat"><span class="ai-wsum-val" style="color:var(--c6)">${pct}%</span><span class="ai-wsum-lbl">Week</span></div>
          <div class="ai-wsum-prog-wrap">
            <div class="ai-wsum-prog-bar">
              <div class="ai-wsum-prog-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--c6),var(--c4))"></div>
            </div>
          </div>
        </div>`;
    }

    const listEl = document.getElementById('backend-structured-days-list');
    if (listEl) listEl.innerHTML = renderBackendDayCards(weekData, prog, weekNum);

    showBackendScreen('backend-screen-days');
    renderInlineRevisions('backend-inline-rev-days', 'backend');
  }

  function renderBackendDays(week) {
    const prog = load('backend_struct_' + backendCurrentLevel, {});
    const listEl = document.getElementById('backend-structured-days-list');
    if (listEl) listEl.innerHTML = renderBackendDayCards(week, prog, backendCurrentWeek);
  }

  function renderBackendWeekSummary(weekData) {
    if (!weekData || !backendCurrentLevel) return;
    const prog = load('backend_struct_' + backendCurrentLevel, {});
    const weekNum = weekData.week;
    let totalDays = weekData.days ? weekData.days.length : 0;
    let doneDays = 0;
    (weekData.days || []).forEach(function(day) {
      const key = 'w' + weekNum + 'd' + day.num;
      if (prog[key] && prog[key].done) doneDays++;
    });
    const pct = totalDays ? Math.round(doneDays / totalDays * 100) : 0;
    const wkSumEl = document.getElementById('backend-week-summary');
    if (wkSumEl) {
      wkSumEl.innerHTML =
        '<div class="ai-week-summary-bar">' +
          '<div class="ai-wsum-stat"><span class="ai-wsum-val" style="color:var(--c6)">' + doneDays + '</span><span class="ai-wsum-lbl">Done</span></div>' +
          '<div class="ai-wsum-stat"><span class="ai-wsum-val" style="color:var(--c6)">' + (totalDays - doneDays) + '</span><span class="ai-wsum-lbl">Left</span></div>' +
          '<div class="ai-wsum-stat"><span class="ai-wsum-val" style="color:var(--c6)">' + pct + '%</span><span class="ai-wsum-lbl">Week</span></div>' +
          '<div class="ai-wsum-prog-wrap"><div class="ai-wsum-prog-bar"><div class="ai-wsum-prog-fill" style="width:' + pct + '%;background:linear-gradient(90deg,var(--c6),var(--c4))"></div></div></div>' +
        '</div>';
    }
  }

  function renderBackendDayCards(weekData, prog, weekNum) {
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    let html = '';
    (weekData.days || []).forEach(function(day) {
      const key = 'w' + weekNum + 'd' + day.num;
      const state = prog[key] || {};
      const isDone = !!state.done;
      const isRevDue = revs.some(function(r) {
        return r.source === 'backend' && !r.done && r.date <= todayStr && r.topicDay == day.num;
      });

      html += `
        <div class="ai-s-day-card${isDone ? ' s-done' : ''}${isRevDue ? ' topic-rev-due' : ''}" id="backend-sday-${weekNum}-${day.num}">
          <div class="ai-s-day-header" onclick="APP.toggleBackendDay(${weekNum},${day.num})">
            <div class="ai-s-day-num">
              <span class="ai-s-day-lbl">DAY</span>
              <span class="ai-s-day-val" style="color:var(--c6)">${day.num}</span>
            </div>
            <div class="ai-s-day-info">
              <div class="ai-s-day-title">${esc(day.title)}</div>
              <div class="ai-s-day-meta">
                ${day.time ? `<span class="ai-s-time-badge">⏱ ${esc(day.time)}</span>` : ''}
                ${isDone ? '<span class="ai-s-done-badge">✓ Done</span>' : ''}
                ${isRevDue ? '<span class="ai-s-rev-badge">📖 Review Due</span>' : ''}
              </div>
            </div>
            <div class="ai-s-day-right">
              <div class="cb${isDone ? ' cb-checked' : ''}" onclick="event.stopPropagation();APP.toggleBackendDone(${weekNum},${day.num})" title="${isDone ? 'Mark incomplete' : 'Mark complete'}">
                ${isDone ? '✓' : ''}
              </div>
              <div class="ai-s-expand-btn">›</div>
            </div>
          </div>
          <div class="ai-s-day-body">
            <div class="ai-s-body-inner">
              <div class="ai-s-section">
                <div class="ai-s-section-title">🎯 Goal</div>
                <div class="ai-s-text">${esc(day.goal)}</div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">📖 Explanation</div>
                <div class="ai-s-text">${esc(day.explanation)}</div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">🔗 Resources</div>
                <div class="ai-s-text">
                  ${(day.resources||[]).map(function(r) { return `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`; }).join('')}
                </div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">🧠 Practice First</div>
                <div class="ai-s-practice ai-s-text">${esc(day.practice)}</div>
              </div>
              <div class="ai-s-section">
                <div class="ai-s-section-title">⚡ Task</div>
                <div class="ai-s-task ai-s-text">${esc(day.task)}</div>
              </div>
              ${day.time ? `<div class="ai-s-time-box"><span class="ai-s-time-ico">⏱</span><span class="ai-s-time-text">Estimated: ${esc(day.time)}</span></div>` : ''}
            </div>
          </div>
        </div>`;
    });

    // Project card — same structure as DSA
    if (weekData.project) {
      const p = weekData.project;
      const projStatus = prog['proj_' + p.id] || 'not-started';
      html += `
        <div class="ai-proj-divider"><div class="ai-proj-divider-line"></div><div class="ai-proj-divider-label">Week Project</div><div class="ai-proj-divider-line"></div></div>
        <div class="ai-proj-card ai-proj-status-${projStatus}" id="backend-proj-${esc(p.id)}">
          <div class="ai-proj-header" onclick="APP.toggleBackendProject('${esc(p.id)}')">
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
                <button class="dsa-proj-status-btn spb-not-started${projStatus==='not-started'?' active':''}" onclick="APP.setBackendProjectStatus('${esc(p.id)}','not-started')">Not Started</button>
                <button class="dsa-proj-status-btn spb-in-progress${projStatus==='in-progress'?' active':''}" onclick="APP.setBackendProjectStatus('${esc(p.id)}','in-progress')">In Progress</button>
                <button class="dsa-proj-status-btn spb-completed${projStatus==='completed'?' active':''}" onclick="APP.setBackendProjectStatus('${esc(p.id)}','completed')">Completed</button>
              </div>
            </div>
          </div>
        </div>`;
    }
    return html;
  }

  function toggleBackendDay(weekNum, dayNum) {
    const el = document.getElementById('backend-sday-' + weekNum + '-' + dayNum);
    if (el) el.classList.toggle('s-open');
  }

  function toggleBackendDone(weekNum, dayNum) {
    const level = STRUCTURED_BACKEND_ROADMAP[backendCurrentLevel];
    if (!level) return;
    const weekData = (level.weeks || []).find(function(w) { return w.week === weekNum; });
    if (!weekData) return;
    const dayData = (weekData.days || []).find(function(d) { return d.num === dayNum; });
    if (!dayData) return;

    const progKey = 'backend_struct_' + backendCurrentLevel;
    const prog = load(progKey, {});
    const key = 'w' + weekNum + 'd' + dayNum;
    if (!prog[key]) prog[key] = {};
    const wasDone = !!prog[key].done;
    prog[key].done = !wasDone;
    if (prog[key].done) {
      prog[key].completedDate = prog[key].completedDate || today();
      scheduleRevisions('backend', dayNum, prog[key].completedDate, dayData.title);
      updateStreak('backend', true);
      toast('✅ Day ' + dayNum + ' completed! Revisions scheduled 🔁', 'success');
    } else {
      toast('↩️ Day ' + dayNum + ' marked incomplete', 'info');
    }
    save(progKey, prog);
    selectBackendWeek(weekNum);
    updateHeader();
  }

  function toggleBackendProject(projId) {
    const card = document.getElementById('backend-proj-' + projId);
    if (card) card.classList.toggle('s-open');
  }

    // ── Navigation back ───────────────────────────────────────
  function backendGoBack() {
    const levels   = document.getElementById('backend-screen-levels');
    const weeksEl  = document.getElementById('backend-screen-weeks');
    const daysEl   = document.getElementById('backend-screen-days');
    const levVis   = levels  && levels.style.display  !== 'none';
    const wksVis   = weeksEl && weeksEl.style.display !== 'none';
    const daysVis  = daysEl  && daysEl.style.display  !== 'none';
    if (daysVis) {
      backendCurrentWeek = null;
      renderBackendWeeks();
      showBackendScreen('backend-screen-weeks');
    } else if (wksVis) {
      backendCurrentLevel = null;
      showBackendScreen('backend-screen-levels');
    } else {
      window.location.href = 'index.html';
    }
  }

  // ── Inline revision panel ─────────────────────────────────
  function renderInlineRevisions(containerId, source) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const revs     = load(KEYS.REVISIONS, []);
    const todayStr = today();
    var relevant = revs.filter(function(r) {
      return r.source === source && !r.done && r.date <= todayStr;
    }).sort(function(a, b) { return a.date.localeCompare(b.date); });
    if (!relevant.length) { el.innerHTML = ''; return; }
    el.innerHTML = `<div class="inline-rev-panel" id="${containerId}-panel">
      <div class="inline-rev-toggle" onclick="document.getElementById('${containerId}-panel').classList.toggle('open')">
        <div class="inline-rev-toggle-left">
          <span style="font-size:14px">🔁</span>
          <span class="inline-rev-label">REVISIONS DUE</span>
          <span class="inline-rev-count">${relevant.length}</span>
        </div>
        <span class="inline-rev-arrow">▾</span>
      </div>
      <div class="inline-rev-body" id="${containerId}-body">
        <div class="inline-rev-body-inner">
          ${relevant.map(function(r) {
            var overdue  = r.date < todayStr;
            var dueColor = overdue ? 'var(--c3)' : 'var(--c4)';
            var dueText  = overdue ? ('⚠️ ' + daysDiff(r.date, todayStr) + 'd overdue') : '📌 Due today';
            return `<div class="inline-rev-item" id="irev-${r.id}">
              <div class="inline-rev-day">${r.topicDay}</div>
              <div class="inline-rev-info">
                <div class="inline-rev-topic">${esc(r.topicTitle)}</div>
                <div class="inline-rev-due" style="color:${dueColor}">${dueText}</div>
              </div>
              <button class="inline-rev-done-btn" onclick="APP.markBackendInlineRevDone('${r.id}','${containerId}')">Done</button>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }

  function markBackendInlineRevDone(id, containerId) {
    var revs = load(KEYS.REVISIONS, []);
    var idx  = revs.findIndex(function(r) { return r.id === id; });
    if (idx < 0) return;
    revs[idx].done     = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderInlineRevisions(containerId, 'backend');
    renderBackendRevisions();
    updateHeader();
    toast(revs[idx].done ? '✅ Revision complete!' : '↩️ Revision unmarked', 'success');
  }

  // ── Revisions ─────────────────────────────────────────────
  function scheduleRevisions(source, topicDay, completedDate, topicTitle) {
    var revs = load(KEYS.REVISIONS, []);
    var filtered = revs.filter(function(r) { return !(r.source === source && r.topicDay === topicDay); });
    REVISION_INTERVALS.forEach(function(interval, idx) {
      filtered.push({
        id:            source + '_' + topicDay + '_' + interval,
        source:        source,
        topicDay:      topicDay,
        topicTitle:    topicTitle || ('Day ' + topicDay),
        completedDate: completedDate,
        date:          addDays(completedDate, interval),
        interval:      interval,
        done:          false,
        doneDate:      null,
      });
    });
    save(KEYS.REVISIONS, filtered);
  }

  function renderBackendRevisions() {
    var listEl = document.getElementById('backend-revision-list');
    if (!listEl) return;
    var revs     = load(KEYS.REVISIONS, []);
    var todayStr = today();
    var f        = _backendRevFilter;
    var filtered = revs.filter(function(r) {
      if (r.source !== 'backend') return false;
      if (f === 'due')     return r.date === todayStr && !r.done;
      if (f === 'overdue') return r.date < todayStr && !r.done;
      if (f === 'pending') return r.date > todayStr && !r.done;
      if (f === 'done')    return r.done;
      return true;
    }).sort(function(a, b) {
      if (!a.done && !b.done) return a.date.localeCompare(b.date);
      if (!a.done) return -1;
      if (!b.done) return 1;
      return (b.doneDate || '').localeCompare(a.doneDate || '');
    });
    if (!filtered.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-ico">🔁</div><div class="empty-title">Nothing here</div><div class="empty-sub">Complete backend days to auto-schedule revisions.</div></div>';
      return;
    }
    listEl.innerHTML = filtered.map(function(r) {
      var overdue  = r.date < todayStr && !r.done;
      var dueToday = r.date === todayStr && !r.done;
      var statusText, statusColor;
      if (r.done) { statusText = '✅ Done'; statusColor = 'var(--c5)'; }
      else if (overdue) { statusText = '⚠️ ' + daysDiff(r.date, todayStr) + 'd Overdue'; statusColor = 'var(--c3)'; }
      else if (dueToday) { statusText = '📌 Due Today'; statusColor = 'var(--c4)'; }
      else { statusText = '📅 ' + fmtDate(r.date); statusColor = 'var(--t2)'; }
      return `<div class="rev-card" id="brev-${r.id}" style="${r.done ? 'opacity:.55;' : ''}${overdue ? 'border-color:rgba(255,107,107,.3);' : dueToday ? 'border-color:rgba(255,209,102,.3);' : ''}">
        <div class="rev-header">
          <div class="rev-date-badge">Day ${r.interval + 1}</div>
          <div class="rev-info">
            <div class="rev-topic">${esc(r.topicTitle)}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px;flex-wrap:wrap">
              <span style="padding:1px 6px;border-radius:var(--rfull);font-size:9px;font-weight:700;background:rgba(234,88,12,.1);color:var(--c6);border:1px solid rgba(234,88,12,.2)">Day ${r.topicDay}</span>
              <span style="font-size:10px;color:${statusColor};font-weight:600">${statusText}</span>
            </div>
          </div>
          <button class="rev-done-btn ${r.done ? 'completed' : ''}" onclick="APP.markBackendRevDone('${r.id}')">
            ${r.done ? '✓' : 'Done'}
          </button>
        </div>
      </div>`;
    }).join('');
  }

  function markBackendRevDone(id) {
    var revs = load(KEYS.REVISIONS, []);
    var idx  = revs.findIndex(function(r) { return r.id === id; });
    if (idx < 0) return;
    revs[idx].done     = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderBackendRevisions();
    renderInlineRevisions('backend-inline-rev-weeks', 'backend');
    renderInlineRevisions('backend-inline-rev-days', 'backend');
    toast(revs[idx].done ? '✅ Revision complete!' : '↩️ Revision unmarked', 'success');
  }

  function setBackendRevFilter(f, btn) {
    _backendRevFilter = f;
    document.querySelectorAll('#backend-sub-revision .filter-chip').forEach(function(c) { c.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    renderBackendRevisions();
  }

  // ── Streak ────────────────────────────────────────────────
  function updateStreak(type, studied) {
    if (!type) return;
    var streaks = load(KEYS.STREAKS, {});
    if (!streaks[type]) streaks[type] = { current: 0, longest: 0, lastDate: null, history: [] };
    var s        = streaks[type];
    var todayStr = today();
    if (s.lastDate === todayStr && studied) { save(KEYS.STREAKS, streaks); updateHeader(); return; }
    if (studied) {
      var yesterday = addDays(todayStr, -1);
      s.current = s.lastDate === yesterday ? s.current + 1 : 1;
      s.longest = Math.max(s.longest, s.current);
      s.lastDate = todayStr;
      if (!s.history) s.history = [];
      s.history.push(todayStr);
      if (s.history.length > 30) s.history = s.history.slice(-30);
    }
    save(KEYS.STREAKS, streaks);
    updateHeader();
  }

  // ── Header ────────────────────────────────────────────────
  function updateHeader() {
    // streak display removed — shown only on home page
  }

  // ── Pomodoro ──────────────────────────────────────────────
  function _playBackendAlarm() {
    _stopBackendAlarmRaw();
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();
      var beep = function() {
        var osc  = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'square'; osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
      };
      beep();
      _backendPomoState.alarmAudio    = ctx;
      _backendPomoState.alarmInterval = setInterval(beep, 600);
      var ring = document.getElementById('backend-pomo-ring');
      if (ring) ring.classList.add('alarm-ringing');
    } catch(e) {}
  }

  function _stopBackendAlarmRaw() {
    if (_backendPomoState.alarmAudio) {
      try { _backendPomoState.alarmAudio.close(); } catch(e){}
      _backendPomoState.alarmAudio = null;
    }
    clearInterval(_backendPomoState.alarmInterval);
    _backendPomoState.alarmInterval = null;
    _backendPomoState.alarmRinging  = false;
  }

  function stopBackendAlarm() {
    _stopBackendAlarmRaw();
    var s = _backendPomoState;
    var ring = document.getElementById('backend-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    s.isBreak = true;
    s.seconds = BREAK_SECONDS;
    _updateBackendPomoMode('BREAK', '⏸ Pause');
    updateBackendPomoDisplay();
    toast('☕ Break started!', 'info');
    s.running = true;
    s.interval = setInterval(function() {
      s.seconds--;
      updateBackendPomoDisplay();
      if (s.seconds <= 0) {
        clearInterval(s.interval); s.interval = null;
        s.running = false; s.isBreak = false;
        s.seconds = s.duration * 60;
        _updateBackendPomoMode('FOCUS', '▶ Start');
        updateBackendPomoDisplay();
        toast('💪 Break over! Start another session.', 'info');
      }
    }, 1000);
  }

  function _updateBackendPomoMode(mode, btnText) {
    var modeEl = document.getElementById('backend-pomo-mode');
    var startBtn = document.getElementById('backend-pomo-start-btn');
    if (modeEl)   modeEl.textContent   = mode;
    if (startBtn) startBtn.textContent = btnText;
  }

  function updateBackendPomoDisplay() {
    var s   = _backendPomoState;
    var m   = Math.floor(s.seconds / 60);
    var sec = s.seconds % 60;
    var timeEl = document.getElementById('backend-pomo-time');
    if (timeEl) timeEl.textContent = String(m).padStart(2,'0') + ':' + String(sec).padStart(2,'0');
    var total    = s.isBreak ? BREAK_SECONDS : s.duration * 60;
    var progress = ((total - s.seconds) / total) * 360;
    var ringEl   = document.getElementById('backend-pomo-ring');
    if (ringEl && !ringEl.classList.contains('alarm-ringing')) {
      ringEl.style.background = 'conic-gradient(var(--c6) ' + progress + 'deg, var(--bg3) ' + progress + 'deg)';
    }
  }

  function renderBackendPomoStats() {
    var stats    = load(KEYS.POMO_STATS, { backend: 0 });
    var sessions = stats.backend || 0;
    var hrs      = ((sessions * _backendPomoState.duration) / 60).toFixed(1);
    var sessEl = document.getElementById('backend-ps-sessions');
    var hrsEl  = document.getElementById('backend-ps-hours');
    var focEl  = document.getElementById('backend-pomo-focus-hours');
    var dotsEl = document.getElementById('backend-pomo-dots');
    if (sessEl) sessEl.textContent = sessions;
    if (hrsEl)  hrsEl.textContent  = hrs;
    if (focEl)  focEl.textContent  = hrs;
    if (dotsEl) {
      var dots = sessions % 4 || (sessions > 0 ? 4 : 0);
      dotsEl.innerHTML = [0,1,2,3].map(function(i) {
        return '<div class="pomo-dot ' + (i < dots ? 'filled' : '') + '"></div>';
      }).join('');
    }
  }

  function backendPomoToggle() {
    var s = _backendPomoState;
    if (s.alarmRinging) { stopBackendAlarm(); return; }
    if (s.running) {
      clearInterval(s.interval); s.interval = null;
      s.running = false;
      _updateBackendPomoMode(s.isBreak ? 'BREAK' : 'FOCUS', '▶ Resume');
    } else {
      s.running = true;
      _updateBackendPomoMode(s.isBreak ? 'BREAK' : 'FOCUS', '⏸ Pause');
      s.interval = setInterval(function() {
        s.seconds--;
        updateBackendPomoDisplay();
        if (s.seconds <= 0) {
          clearInterval(s.interval); s.interval = null;
          s.running = false;
          if (!s.isBreak) {
            var pomStats = load(KEYS.POMO_STATS, { backend: 0 });
            pomStats.backend = (pomStats.backend || 0) + 1;
            save(KEYS.POMO_STATS, pomStats);
            updateStreak('backend', true);
            renderBackendPomoStats();
            s.alarmRinging = true;
            _playBackendAlarm();
            _updateBackendPomoMode('⏰ DONE!', '🔔 Stop Alarm');
            toast('⏰ Backend session complete! Stop alarm to start break.', 'success');
          } else {
            s.isBreak = false;
            s.seconds = s.duration * 60;
            _updateBackendPomoMode('FOCUS', '▶ Start');
            updateBackendPomoDisplay();
            toast('💪 Break over! Start another session.', 'info');
          }
        }
      }, 1000);
    }
  }

  function backendPomoReset() {
    var s = _backendPomoState;
    clearInterval(s.interval); s.interval = null;
    _stopBackendAlarmRaw();
    s.running = false; s.isBreak = false; s.alarmRinging = false;
    s.seconds = s.duration * 60;
    var ring = document.getElementById('backend-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    _updateBackendPomoMode('FOCUS', '▶ Start');
    updateBackendPomoDisplay();
  }

  function backendPomoSkip() {
    var s = _backendPomoState;
    clearInterval(s.interval); s.interval = null;
    _stopBackendAlarmRaw();
    s.running = false; s.alarmRinging = false;
    s.isBreak = !s.isBreak;
    s.seconds = s.isBreak ? BREAK_SECONDS : s.duration * 60;
    var ring = document.getElementById('backend-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    _updateBackendPomoMode(s.isBreak ? 'BREAK' : 'FOCUS', '▶ Start');
    updateBackendPomoDisplay();
  }

  function setBackendPomoDuration() {
    var input   = document.getElementById('backend-pomo-dur-input');
    var val     = input ? (parseInt(input.value) || 25) : 25;
    var clamped = Math.max(1, Math.min(120, val));
    if (input) input.value = clamped;
    _backendPomoState.duration = clamped;
    if (!_backendPomoState.running && !_backendPomoState.isBreak) {
      _backendPomoState.seconds = clamped * 60;
      updateBackendPomoDisplay();
    }
    toast('⏱️ Backend focus set to ' + clamped + ' min', 'success');
  }

  // ── Notes ─────────────────────────────────────────────────
  function backendAutoSaveNotes() {
    var ta = document.getElementById('backend-notes-ta');
    if (!ta) return;
    var wc   = ta.value.trim().split(/\s+/).filter(Boolean).length;
    var wcEl = document.getElementById('backend-notes-wc');
    if (wcEl) wcEl.textContent = wc + ' words';
    clearTimeout(_backendNotesTimer);
    _backendNotesTimer = setTimeout(function() {
      var draft = load(KEYS.BACKEND_NOTES, {});
      draft._draft = ta.value;
      save(KEYS.BACKEND_NOTES, draft);
    }, 800);
  }

  function backendSaveNotes() {
    var ta = document.getElementById('backend-notes-ta');
    if (!ta || !ta.value.trim()) { toast('⚠️ Nothing to save', 'error'); return; }
    var data     = load(KEYS.BACKEND_NOTES, {});
    var pomStats = load(KEYS.POMO_STATS, {});
    if (!data.entries) data.entries = [];
    data.entries.unshift({
      id:        Date.now().toString(),
      text:      ta.value.trim(),
      date:      today(),
      pomoCount: pomStats.backend || 0,
    });
    if (data.entries.length > 100) data.entries = data.entries.slice(0, 100);
    data._draft = '';
    save(KEYS.BACKEND_NOTES, data);
    ta.value = '';
    var wcEl = document.getElementById('backend-notes-wc');
    if (wcEl) wcEl.textContent = '0 words';
    renderBackendNotes();
    toast('📝 Backend note saved!', 'success');
  }

  function renderBackendNotes() {
    var data   = load(KEYS.BACKEND_NOTES, {});
    var ta     = document.getElementById('backend-notes-ta');
    if (ta && data._draft && !ta.value) ta.value = data._draft;
    var listEl = document.getElementById('backend-notes-list');
    if (!listEl) return;
    var entries = data.entries || [];
    if (!entries.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-ico">📝</div><div class="empty-title">No backend notes yet</div><div class="empty-sub">Save your first study note above</div></div>';
      return;
    }
    listEl.innerHTML = entries.slice(0, 30).map(function(e) {
      return `<div class="card" style="margin-bottom:8px">
        <div class="card-header">
          <span style="font-size:12px;font-weight:700;color:var(--c6);font-family:var(--font-mono)">${fmtDate(e.date)}</span>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="card-badge badge-done">🍅 ${e.pomoCount || 0}</span>
            <button onclick="APP.deleteBackendNote('${e.id}')" style="font-size:12px;color:var(--c3);padding:2px 6px;border-radius:6px;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">✕</button>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.7;white-space:pre-wrap">${esc(e.text.slice(0, 200))}${e.text.length > 200 ? '<span style="color:var(--t3c)"> …</span>' : ''}</div>
      </div>`;
    }).join('');
  }

  function setBackendProjectStatus(id, status) {
    var projects = load(KEYS.PROJECTS, []);
    var idx = projects.findIndex(function(p) { return p.id === id; });
    if (idx < 0) return;
    projects[idx].status = status;
    save(KEYS.PROJECTS, projects);
    renderBackendProjects();
    toast('\u2705 Status updated', 'success');
  }

  function deleteBackendNote(id) {
    var data = load(KEYS.BACKEND_NOTES, {});
    data.entries = (data.entries || []).filter(function(e) { return e.id !== id; });
    save(KEYS.BACKEND_NOTES, data);
    renderBackendNotes();
    toast('🗑️ Note deleted', 'info');
  }

  // ── Projects ──────────────────────────────────────────────
  var _editProjectId     = null;
  var _editProjectSource = null;
  var _confirmCallback   = null;

  function renderBackendProjects() {
    var listEl   = document.getElementById('backend-projects-list');
    if (!listEl) return;
    var projects = load(KEYS.PROJECTS, []).filter(function(p) { return p.source === 'backend'; });
    if (!projects.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-ico">🚀</div><div class="empty-title">No backend projects yet</div><div class="empty-sub">Add your first backend project above</div></div>';
      return;
    }
    listEl.innerHTML = projects.map(function(p) {
      var pct = Math.min(100, Math.round(p.progressPct || 0));
      return `<div class="proj-card">
        <div class="flex items-center gap6" style="margin-bottom:6px">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(234,88,12,.1),rgba(251,146,60,.1));border:1px solid rgba(234,88,12,.2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">⚙️</div>
          <div style="flex:1;min-width:0">
            <div class="proj-name">${esc(p.name)}</div>
            <div class="proj-meta">Created ${fmtDate(p.createdAt)}</div>
          </div>
          <button onclick="APP.openProjectModal('${p.id}')" style="font-size:16px;background:none;border:none;color:var(--c4);cursor:pointer;padding:4px 6px;border-radius:6px">✏️</button>
        </div>
        ${p.tags ? `<div style="font-size:10px;color:var(--c6);font-family:var(--font-mono);margin-bottom:6px">${esc(p.tags)}</div>` : ''}
        ${p.notes ? `<div style="font-size:11px;color:var(--t2);line-height:1.6;background:var(--bg3);padding:8px;border-radius:var(--r8);border:1px solid rgba(255,255,255,.05);margin-bottom:8px">${esc(p.notes)}</div>` : ''}
        <div class="proj-progress-label"><span>Progress</span><span>${pct}%</span></div>
        <div class="proj-progress-bar"><div class="proj-progress-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--c6),var(--c4))"></div></div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px">
          <button class="note-del-btn" onclick="APP.deleteProject('${p.id}')">🗑️ Delete</button>
        </div>
      </div>`;
    }).join('');
  }

  function openProjectModal(idOrSource) {
    var id = null, source = '';
    if (idOrSource === 'backend') {
      source = 'backend';
    } else if (idOrSource) {
      id = idOrSource;
    }
    _editProjectId     = id;
    _editProjectSource = source || null;
    var srcEl   = document.getElementById('proj-source');
    if (srcEl) srcEl.value = source;
    var titleEl = document.getElementById('proj-modal-title');
    if (id) {
      var projects = load(KEYS.PROJECTS, []);
      var p = projects.find(function(x) { return x.id === id; });
      if (p) {
        var setVal = function(elId, val) { var el = document.getElementById(elId); if (el) el.value = val || ''; };
        setVal('proj-name', p.name);
        setVal('proj-files', p.filesCount);
        setVal('proj-notes', p.notes);
        setVal('proj-tags', p.tags);
        setVal('proj-progress', p.progressPct || 0);
        if (srcEl) srcEl.value = p.source || '';
        if (titleEl) titleEl.textContent = 'Edit Project';
      }
    } else {
      ['proj-name','proj-files','proj-notes','proj-tags','proj-progress'].forEach(function(fid) {
        var el = document.getElementById(fid); if (el) el.value = '';
      });
      if (titleEl) titleEl.textContent = '⚙️ Add Backend Project';
    }
    openModal('modal-project');
  }

  function saveProject() {
    var name = (document.getElementById('proj-name') || {}).value;
    if (!name || !name.trim()) { toast('⚠️ Project name is required', 'error'); return; }
    name = name.trim();
    var projects = load(KEYS.PROJECTS, []);
    var existing = _editProjectId ? projects.find(function(x) { return x.id === _editProjectId; }) : null;
    var srcEl = document.getElementById('proj-source');
    var source = srcEl ? srcEl.value : (_editProjectSource || (existing && existing.source) || 'backend');
    var p = {
      id:          _editProjectId || Date.now().toString(),
      name:        name,
      source:      source,
      filesCount:  parseInt((document.getElementById('proj-files') || {}).value) || 0,
      notes:       ((document.getElementById('proj-notes') || {}).value || '').trim(),
      tags:        ((document.getElementById('proj-tags') || {}).value || '').trim(),
      progressPct: parseInt((document.getElementById('proj-progress') || {}).value) || (existing ? existing.progressPct : 0) || 0,
      pomoSessions:existing ? existing.pomoSessions : 0,
      createdAt:   existing ? existing.createdAt : today(),
      updatedAt:   today(),
    };
    if (_editProjectId) {
      var idx = projects.findIndex(function(x) { return x.id === _editProjectId; });
      if (idx >= 0) projects[idx] = p; else projects.push(p);
    } else {
      projects.push(p);
    }
    save(KEYS.PROJECTS, projects);
    closeModal('modal-project');
    renderBackendProjects();
    toast(_editProjectId ? '✏️ Project updated!' : '🚀 Backend project added!', 'success');
  }

  function deleteProject(id) {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    var projects = load(KEYS.PROJECTS, []);
    save(KEYS.PROJECTS, projects.filter(function(p) { return p.id !== id; }));
    renderBackendProjects();
    toast('🗑️ Project deleted', 'info');
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    // Restore saved duration
    var savedDur = localStorage.getItem(KEYS.POMO_DURATION + '_backend');
    if (savedDur) {
      var dur = parseInt(savedDur) || 25;
      _backendPomoState.duration = dur;
      _backendPomoState.seconds  = dur * 60;
      var durInput = document.getElementById('backend-pomo-dur-input');
      if (durInput) durInput.value = dur;
    }
    updateBackendPomoDisplay();
    updateHeader();
    // Restore last level/week
    var savedLevel = localStorage.getItem('backendCurrentLevel');
    var savedWeek  = localStorage.getItem('backendCurrentWeek');
    if (savedLevel && STRUCTURED_BACKEND_ROADMAP[savedLevel]) {
      backendCurrentLevel = savedLevel;
      renderBackendWeeks();
      if (savedWeek) {
        var weekNum = parseInt(savedWeek);
        backendCurrentWeek = weekNum;
        var level = STRUCTURED_BACKEND_ROADMAP[backendCurrentLevel];
        var week  = level && level.weeks.find(function(w) { return w.week === weekNum; });
        if (week) {
          var titleEl = document.getElementById('backend-days-title');
          if (titleEl) titleEl.textContent = 'Week ' + weekNum + ' — ' + week.title;
          renderBackendWeekSummary(week);
          renderBackendDays(week);
          showBackendScreen('backend-screen-days');
          renderInlineRevisions('backend-inline-rev-days', 'backend');
          return;
        }
      }
      showBackendScreen('backend-screen-weeks');
      renderInlineRevisions('backend-inline-rev-weeks', 'backend');
    } else {
      showBackendScreen('backend-screen-levels');
    }
    // Activate first sub-tab
    switchBackendSub('roadmap', null);
  }

  // ── Public API ────────────────────────────────────────────
  return {
    // Navigation
    selectBackendLevel:   selectBackendLevel,
    selectBackendWeek:    selectBackendWeek,
    backendGoBack:        backendGoBack,
    showBackendLevels:    function() { showBackendScreen('backend-screen-levels'); backendCurrentLevel = null; backendCurrentWeek = null; },
    switchBackendSub:     switchBackendSub,
    // Roadmap interactions
    toggleBackendDay:     toggleBackendDay,
    toggleBackendDone:    toggleBackendDone,
    setBackendProjectStatus: setBackendProjectStatus,
    filterBackendRoadmap: filterBackendRoadmap,
    // Inline revisions
    markBackendInlineRevDone: markBackendInlineRevDone,
    // Revisions
    renderBackendRevisions: renderBackendRevisions,
    setBackendRevFilter:  setBackendRevFilter,
    markBackendRevDone:   markBackendRevDone,
    // Pomodoro
    backendPomoToggle:    backendPomoToggle,
    backendPomoReset:     backendPomoReset,
    backendPomoSkip:      backendPomoSkip,
    setBackendPomoDuration: setBackendPomoDuration,
    stopBackendAlarm:     stopBackendAlarm,
    updateBackendPomoDisplay: updateBackendPomoDisplay,
    renderBackendPomoStats: renderBackendPomoStats,
    // Notes
    backendAutoSaveNotes: backendAutoSaveNotes,
    backendSaveNotes:     backendSaveNotes,
    renderBackendNotes:   renderBackendNotes,
    deleteBackendNote:    deleteBackendNote,
    // Projects
    renderBackendProjects: renderBackendProjects,
    openProjectModal:     openProjectModal,
    saveProject:          saveProject,
    deleteProject:        deleteProject,
    // Modal helpers
    openModal:            openModal,
    closeModal:           closeModal,
    // AI Mentor stubs (referenced in HTML)
    closeAIModal: function() { closeModal('ai-modal-overlay'); },
    setAITab: function(tab, btn) {
      document.querySelectorAll('.ai-tab-btn').forEach(function(b){ b.classList.remove('active'); });
      if(btn) btn.classList.add('active');
    },
    askAI: function() {
      var el = document.getElementById('ai-response-area');
      if(el) el.textContent = 'AI Mentor: use the resource links on each day card.';
    },
    saveAINote: function() {},
    // Init
    init:                 init,
    // Aliases for HTML onclick compatibility (sectionPomoToggle pattern)
    sectionPomoToggle:    function(s) { if (s === 'backend') backendPomoToggle(); },
    sectionPomoReset:     function(s) { if (s === 'backend') backendPomoReset(); },
    sectionPomoSkip:      function(s) { if (s === 'backend') backendPomoSkip(); },
    setSectionPomoDuration: function(s) { if (s === 'backend') setBackendPomoDuration(); },
    stopSectionAlarm:     function(s) { if (s === 'backend') stopBackendAlarm(); },
    goBack:               backendGoBack,
  };

})();

// ── Bootstrap ─────────────────────────────────────────────────
// Expose BACKEND_APP methods on window.APP so all HTML onclick="APP.xyz()" calls work.
// - If script.js loaded first, APP already exists: merge backend methods into it.
// - If backend-steps.js is the only script: create window.APP from BACKEND_APP.
(function() {
  if (typeof window.APP === 'undefined') {
    window.APP = {};
  }
  Object.keys(BACKEND_APP).forEach(function(key) {
    window.APP[key] = BACKEND_APP[key];
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  try {
    BACKEND_APP.init();
  } catch(e) { console.error('Backend APP init error:', e); }
});
