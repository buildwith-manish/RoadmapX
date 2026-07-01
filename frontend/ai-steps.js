// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
//  DATA STRUCTURES — AI_DATA / DSA_DATA / PROFILE
// ═══════════════════════════════════════════════════════
const AI_DATA = {
  levels: {
    beginner:     { weeks: [] },   // 45 days
    intermediate: { weeks: [] },   // 60 days
    advanced:     { weeks: [] },   // 90 days
  },
  pomodoroCount: 0,
};

const DSA_DATA = {
  levels: {
    beginner:     { weeks: [] },
    intermediate: { weeks: [] },
    advanced:     { weeks: [] },
  },
  pomodoroCount: 0,
};

const PROFILE = {
  get totalPomodoro() {
    try {
      const stats = JSON.parse(localStorage.getItem('pomodoroStats') || '{}');
      return ((stats.ai || 0) + (stats.dsa || 0) + (stats.projects || 0) + (stats.extra || 0));
    } catch(e) { return 0; }
  },
};

// Per-section Pomodoro state (fully independent AI and DSA timers)
const _sectionPomoState = {
  ai: {
    running:false, isBreak:false, seconds:25*60, duration:25,
    interval:null, alarmRinging:false, alarmAudio:null, alarmInterval:null,
  },
  dsa: {
    running:false, isBreak:false, seconds:25*60, duration:25,
    interval:null, alarmRinging:false, alarmAudio:null, alarmInterval:null,
  },
};

// ═══════════════════════════════════════════════════════
//  STRUCTURED AI ROADMAP — LEVELS → WEEKS → DAYS
// ═══════════════════════════════════════════════════════
const STRUCTURED_AI_ROADMAP = (function() {

function d(day,title,goal,explanation,resources,practice,task,time){
  return {day,title,goal,explanation,resources,practice,task,time};
}

const beginner = {
  label:"🟢 Beginner",days:45,totalHours:90,goal:"Python + Logic Foundations",
  weeks:[
    {week:1,title:"Python Basics — Hello World to Variables",timeRange:"10–12 hrs",
     days:[
      d(1,"Setting Up Python & First Program","Install Python and run your first Hello World.",
        "Python is beginner-friendly. Install Python 3, set up VS Code. Run your first print('Hello, World!') and learn terminal basics.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+installation+VS+Code+beginners",label:"Python + VS Code Setup"},{type:"web",url:"https://docs.python.org/3/tutorial/",label:"Python Official Docs"}],
        "Open terminal and run: print(\"Hello, World!\") — then print your name and age.",
        "Write a program printing 5 lines: your name, age, favorite color, hobby, and a motivational message.","1.5 hrs"),
      d(2,"Variables & Data Types","Understand int, float, str, bool variables.",
        "Variables store data. Python has 4 main types: int (whole numbers), float (decimal), str (text), bool (True/False). Python is dynamically typed.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+variables+data+types+beginners",label:"Python Variables Tutorial"},{type:"web",url:"https://www.w3schools.com/python/python_variables.asp",label:"W3Schools Variables"}],
        "Create variables of each type and use print(type(var)) to verify.",
        "Build a 'Personal Info Card': store name, age, height, is_student in variables and print them formatted.","1.5 hrs"),
      d(3,"String Operations","Master string indexing, slicing, and methods.",
        "Strings are character sequences. Indexing s[0], slicing s[1:5], methods: .upper(), .lower(), .strip(), .replace(), .split(), .join(). f-strings embed variables: f\"Hello {name}\".",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+strings+complete+guide",label:"Python Strings Guide"},{type:"web",url:"https://realpython.com/python-strings/",label:"Real Python Strings"}],
        "Take 'Hello World Python': practice upper, lower, reverse, split into words, count characters.",
        "Program: input a full name, output initials, character count, uppercase version, and whether it contains a specific letter.","1.5–2 hrs"),
      d(4,"Input, Output & Type Casting","Take user input and convert between data types.",
        "input() reads user input as a string. Convert to number using int() or float(). Type casting prevents TypeError bugs.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+input+output+type+casting",label:"Python Input & Casting"},{type:"web",url:"https://www.w3schools.com/python/python_casting.asp",label:"W3Schools Casting"}],
        "Build an age calculator: input birth year, calculate current age.",
        "BMI Calculator: input weight (kg) and height (m), compute BMI = weight/(height²), print Underweight/Normal/Overweight.","1.5–2 hrs"),
      d(5,"Arithmetic & Comparison Operators","Use Python operators for math and comparisons.",
        "Arithmetic: +, -, *, /, // (floor), % (modulo), ** (power). Comparisons: ==, !=, <, >, <=, >= return True/False. Logical: AND, OR, NOT. Operator precedence matters.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+operators+tutorial",label:"Python Operators"},{type:"web",url:"https://www.w3schools.com/python/python_operators.asp",label:"W3Schools Operators"}],
        "Try: 17%5, 2**8, 15//4. Compare numbers with all comparison operators.",
        "Number Analyzer: input a number, print: even/odd, positive/negative/zero, divisible by 3 and 5, its square and cube.","1.5 hrs"),
      d(6,"If / Elif / Else Conditions","Write decision-making programs.",
        "if checks a condition; elif checks another; else runs when no condition is met. Python uses 4-space indentation to define code blocks — mandatory.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+if+elif+else+tutorial",label:"Python Conditionals"},{type:"web",url:"https://realpython.com/python-conditional-statements/",label:"Real Python Conditions"}],
        "Write a grade classifier: score → A/B/C/D/F based on ranges.",
        "Traffic Light Simulator: input color (red/yellow/green), print the correct driving instruction. Add error handling for invalid input.","1.5 hrs"),
      d(7,"Week 1 Project — Simple Calculator","Build your first complete Python project.",
        "Consolidate Week 1 by building a calculator. Uses variables, input, type casting, operators, and conditionals. Handle +,-,*,/ with error handling for division by zero.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+calculator+project+beginners",label:"Calculator Project Tutorial"},{type:"web",url:"https://realpython.com/python-first-steps/",label:"Real Python First Steps"}],
        "Start with a 2-number calculator, then extend to handle multiple operations in a loop.",
        "🚀 PROJECT: Calculator that: (1) asks for two numbers, (2) asks for operation (+,-,*,/), (3) shows result, (4) handles divide-by-zero, (5) loops until user types 'quit'.","2–2.5 hrs"),
    ],project:{id:'bw1',title:'Personal Info Card Generator',desc:'Build a Python CLI app that collects user info (name, age, height, favourite color, hobby) using input(), applies string methods (upper, lower, strip, f-strings), validates types with type-casting, and prints a beautifully formatted "info card" with borders using print statements. Add a bonus BMI calculator using the collected height/weight data.'}},
    {week:2,title:"Loops — Repeat, Automate, Conquer",timeRange:"10–12 hrs",
     days:[
      d(8,"For Loops","Use for loops to iterate over sequences.",
        "A for loop repeats code for each item in a sequence. range(n): generates 0 to n-1. range(start, stop, step): full control. Works on any iterable: strings, lists, tuples, dicts.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+for+loop+tutorial+beginners",label:"Python For Loops"},{type:"web",url:"https://www.w3schools.com/python/python_for_loops.asp",label:"W3Schools For Loops"}],
        "Print numbers 1–20. Print multiplication table of 7. Print each character in your name.",
        "Write a right triangle pattern: height = 5 → rows of 1, 2, 3, 4, 5 stars. Then upside-down triangle.","1.5 hrs"),
      d(9,"While Loops & Loop Control","Use while loops; control with break and continue.",
        "while loops repeat as long as condition is True. break exits immediately. continue skips current iteration. while True with break is the classic menu/game pattern.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+while+loop+break+continue",label:"Python While Loops"},{type:"web",url:"https://realpython.com/python-while-loop/",label:"Real Python While Loop"}],
        "Count down from 10 to 1 using while. Write a loop asking for input until user types 'stop'.",
        "Number Guessing Game: computer picks random number 1–100, user guesses, program says 'too high'/'too low'/'correct!' and shows attempts.","2 hrs"),
      d(10,"Nested Loops & Patterns","Use loops inside loops for complex patterns.",
        "Nested loops: inner loop runs completely for every outer iteration. Essential for: multiplication tables, 2D patterns, matrix operations.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+nested+loops+patterns",label:"Python Nested Loops"},{type:"web",url:"https://www.w3schools.com/python/python_for_loops.asp",label:"W3Schools Loops"}],
        "Print a full 10×10 multiplication table using nested loops.",
        "Print using nested loops: (1) Full rectangle of *, (2) Right triangle, (3) Diamond shape, (4) Checkerboard pattern.","2 hrs"),
      d(11,"Lists — Python's Most Powerful Collection","Create, access, modify, and iterate lists.",
        "Lists are ordered, mutable collections. Access: index [0], negative [-1]. Slice [start:stop:step]. Methods: append(), insert(), remove(), pop(), sort(), reverse(). The backbone of data processing.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+lists+complete+guide",label:"Python Lists Complete"},{type:"web",url:"https://docs.python.org/3/tutorial/datastructures.html",label:"Python Data Structures"}],
        "Create a list of 10 numbers. Find max, min, sum manually using loops. Sort and reverse.",
        "Student Score Manager: store scores in a list, add/remove scores, find highest/lowest/average, classify performance (A/B/C).","2 hrs"),
      d(12,"List Comprehensions & Filtering","Write concise one-line list processing.",
        "List comprehensions: [expression for item in iterable if condition]. Replace verbose for loops with cleaner, faster syntax. Essential for data science.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+list+comprehension+tutorial",label:"List Comprehensions"},{type:"web",url:"https://realpython.com/list-comprehension-python/",label:"Real Python Comprehensions"}],
        "Using comprehensions: squares of 1–20, filter even numbers, uppercase each word in a list.",
        "Use comprehensions to: (1) Get all prime numbers up to 100, (2) Extract words longer than 4 chars, (3) Convert Celsius list to Fahrenheit.","1.5–2 hrs"),
      d(13,"Tuples, Sets & Dictionaries","Understand use cases for all Python collection types.",
        "Tuples: immutable ordered (coordinates, RGB). Sets: unordered, no duplicates — fast membership testing, set math (union |, intersection &, difference -). Dicts: key-value pairs — the most important Python data structure.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+tuples+sets+dictionaries+tutorial",label:"Python Collections"},{type:"web",url:"https://realpython.com/python-dicts/",label:"Real Python Dicts"}],
        "Create each type: tuple of coordinates, set of unique names, dict of student grades. Operate on each.",
        "Word Frequency Counter: input a sentence, use dict to count each word, find the most common word.","2 hrs"),
      d(14,"Week 2 Project — Number Guessing Game","Build a complete interactive guessing game.",
        "Polished guessing game using Weeks 1–2: loops, conditionals, random numbers, user interaction. Include difficulty levels, best score tracking, and play-again option.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+number+guessing+game+project",label:"Guessing Game Project"},{type:"web",url:"https://realpython.com/python-random/",label:"Python Random Module"}],
        "Start simple (1 guess), then add loop, then difficulty, then scoring.",
        "🚀 PROJECT: Number Guessing Game: (1) 3 difficulty levels (Easy 1–50, Medium 1–100, Hard 1–500), (2) Attempt counter, (3) Best score per session, (4) Play again, (5) Hints when within 10% of answer.","2–2.5 hrs"),
    ],project:{id:'bw2',title:'Word Frequency Analyzer',desc:'Build a Python script using loops, lists, sets and dicts that reads a block of text (multi-line input), uses a for loop to tokenize words, a set to find unique words, and a dictionary to count frequencies. Output: total words, unique count, top-5 most frequent words sorted using a loop, and a simple bar chart made with stars (*) printed via nested loops.'}},
    {week:3,title:"Functions — Reusable Code Blocks",timeRange:"12–14 hrs",
     days:[
      d(15,"Defining & Calling Functions","Create reusable functions with parameters and return values.",
        "Functions are named blocks of code. Define with def function_name(params): and call with function_name(args). return sends back a value. DRY principle: Don't Repeat Yourself.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+functions+tutorial+beginners",label:"Python Functions Guide"},{type:"web",url:"https://realpython.com/defining-your-own-python-function/",label:"Real Python Functions"}],
        "Write: greet(name), add(a,b), is_even(n), celsius_to_fahrenheit(c). Test each.",
        "Math Library: write 10 functions (add, subtract, multiply, divide, square, cube, is_prime, factorial, fibonacci_nth, percent). Test each with 3 inputs.","2 hrs"),
      d(16,"Default Parameters & *args/**kwargs","Use flexible function signatures.",
        "Default params: def greet(name, greeting='Hello'). *args collects extra positional args as tuple. **kwargs collects extra keyword args as dict. Makes functions flexible — used extensively in Python libraries.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+args+kwargs+default+parameters",label:"Args & Kwargs Tutorial"},{type:"web",url:"https://realpython.com/python-kwargs-and-args/",label:"Real Python Args/Kwargs"}],
        "Write sum_all(*numbers) that adds any number of args. Write profile(**info) that prints key-value pairs.",
        "Flexible Report Generator: accepts required title, optional subtitle, *stats (variable statistics), **metadata (extra info). Print a formatted report.","2 hrs"),
      d(17,"Lambda & Higher-Order Functions","Write concise anonymous functions; use map, filter, sorted.",
        "Lambda: anonymous single-expression function: lambda x: x*2. map() applies function to every item. filter() keeps items where function returns True. sorted() with key sorts by custom criteria.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+lambda+map+filter+tutorial",label:"Lambda & HOF Tutorial"},{type:"web",url:"https://realpython.com/python-lambda/",label:"Real Python Lambda"}],
        "Use map to double a list. filter to keep names starting with 'A'. sorted with a lambda key.",
        "Process student dicts [{name, score, grade}]: (1) Sort by score, (2) Filter passed (score≥50), (3) Map to extract names, (4) Find average score.","2 hrs"),
      d(18,"Recursion — Functions Calling Themselves","Implement recursive solutions.",
        "Recursion: function calls itself to solve a smaller version of the same problem. Needs: (1) base case that stops recursion, (2) recursive case moving toward base case. Classic: factorial, Fibonacci, power.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+recursion+explained+beginners",label:"Python Recursion"},{type:"web",url:"https://realpython.com/python-recursion/",label:"Real Python Recursion"}],
        "Write recursive: factorial(n), fibonacci(n), power(base,exp). Draw call stack for factorial(5) on paper.",
        "Implement recursive: (1) Sum of digits, (2) Reverse a string, (3) Palindrome check, (4) Count character occurrences in string.","2–2.5 hrs"),
      d(19,"Scope — Local, Global & Closures","Understand variable scope.",
        "LEGB rule: Local → Enclosing → Global → Built-in. global and nonlocal keywords modify outer scope. Closures remember enclosing scope — fundamental to decorators.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+scope+LEGB+closures+tutorial",label:"Python Scope & Closures"},{type:"web",url:"https://realpython.com/python-scope-legb-rule/",label:"Real Python Scope"}],
        "Create global counter, increment inside function. Create closure that remembers a multiplier.",
        "Counter Factory using closures: make_counter() returns a counter function. Each counter is independent. Demonstrate 3 separate counters.","2 hrs"),
      d(20,"Error Handling — try/except","Write robust programs that handle errors gracefully.",
        "try/except catches exceptions so program continues. except ExceptionType for specific errors; else if no error; finally always runs. Common: ValueError, TypeError, ZeroDivisionError, FileNotFoundError. Raise custom exceptions for professional code.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+exception+handling+try+except",label:"Exception Handling"},{type:"web",url:"https://realpython.com/python-exceptions/",label:"Real Python Exceptions"}],
        "Wrap division function with try/except for ZeroDivisionError and ValueError.",
        "Refactor Day 7 Calculator to be bulletproof: handle division by zero, invalid operator, non-numeric input, add custom 'CalculatorError' exception class.","2 hrs"),
      d(21,"Week 3 Project — To-Do CLI App","Build a command-line to-do list application.",
        "Combines all function knowledge: functions for each action, error handling, list management, menus. CLI apps are the foundation of user interactions before GUIs.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+todo+list+cli+project",label:"Python CLI Todo App"},{type:"web",url:"https://realpython.com/python-command-line-interfaces-python/",label:"Real Python CLI"}],
        "Start with just add/view/remove. Gradually add more features.",
        "🚀 PROJECT: To-Do CLI: (1) Add task with priority (High/Med/Low), (2) View tasks sorted by priority, (3) Mark complete, (4) Delete, (5) View pending tasks, (6) Search by keyword. All in a loop with menu.","2.5–3 hrs"),
    ],project:{id:'bw3',title:'To-Do Manager App',desc:'Build a full-featured To-Do CLI using lists, dicts, functions, and file I/O. Store tasks as a list of dicts with fields: title, priority (High/Med/Low), done, created_date. Functions: add_task(), view_tasks(), mark_done(), delete_task(), search_tasks(). Save and load from tasks.json. Use sorted() with a lambda to order by priority. Add colour output using ANSI escape codes.'}},
    {week:4,title:"Data Structures, File I/O & APIs",timeRange:"12–14 hrs",
     days:[
      d(22,"Dictionaries Deep Dive","Master all dictionary operations.",
        "Dicts map keys to values for O(1) lookup. Methods: .get(), .items(), .keys(), .values(), .update(), .pop(). Dict comprehensions: {k:v for k,v in items}. Nested dicts represent real-world data (JSON, APIs).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+dictionaries+deep+dive",label:"Python Dicts Deep Dive"},{type:"web",url:"https://realpython.com/python-dicts/",label:"Real Python Dicts"}],
        "Create nested student database (dict of dicts). Access, update, delete entries.",
        "Phone Book App: store contacts as nested dicts with name, phone, email, city. Add CRUD operations and search by any field.","2 hrs"),
      d(23,"Advanced String Formatting","Master f-strings and powerful string methods.",
        "f-strings: f'Hello {name}'. Format specifiers: f'{price:.2f}' (2 decimal), f'{num:06d}' (zero-pad). Advanced methods: .join(), .strip(), .split(), .replace(), .find(), .startswith(), .endswith().",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+f-strings+string+formatting+advanced",label:"Python F-Strings Advanced"},{type:"web",url:"https://realpython.com/python-f-strings/",label:"Real Python F-Strings"}],
        "Format a receipt: items, prices (2 decimal places), total, tax — with aligned columns.",
        "Report Card Generator: input student data, print a neatly aligned table with name, scores, average, grade, and comments.","1.5–2 hrs"),
      d(24,"File I/O & JSON","Read/write text files and JSON data.",
        "open(filename, 'r'/'w'/'a') opens files. Always use 'with' statement. json.dumps() converts dict to JSON string; json.loads() parses it. json.dump() writes to file; json.load() reads. Universal data format for APIs and modern applications.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+file+handling+JSON+tutorial",label:"Python File I/O & JSON"},{type:"web",url:"https://realpython.com/python-json/",label:"Real Python JSON"}],
        "Write 10 names to file. Read back. Append 5 more. Save and load a dict as JSON.",
        "Upgrade To-Do app: (1) Save tasks to JSON file, (2) Load on startup, (3) Tasks persist between runs. Add contact-book with CRUD operations saved to JSON.","2 hrs"),
      d(25,"Modules & CSV Data","Use standard library and process CSV files.",
        "Standard library: random, os, sys, datetime, math, csv. csv.reader(), csv.DictReader(), csv.writer(). For Excel: openpyxl. CSV is the most common real-world data format — first step into data world.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+modules+CSV+files+tutorial",label:"Python Modules & CSV"},{type:"web",url:"https://realpython.com/python-csv/",label:"Real Python CSV"}],
        "Create CSV of 20 students. Read it. Calculate average. Write new CSV with grade column.",
        "CSV Grade Processor: read student.csv, compute average and grade, find class topper and lowest scorer, write results to output.csv, print summary statistics.","2 hrs"),
      d(26,"APIs — Fetching Real-World Data","Use requests library to fetch data from public APIs.",
        "requests.get(url) fetches data; .json() parses JSON response. HTTP status codes: 200 OK, 404 Not Found, 500 Error. APIs let your program communicate with external services and real-world data.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+requests+API+tutorial+beginners",label:"Python APIs & Requests"},{type:"web",url:"https://realpython.com/python-requests/",label:"Real Python Requests"}],
        "Fetch weather data from a free API. Parse and display temperature, humidity, description.",
        "World Explorer: (1) Current weather for any city, (2) Random joke from JokeAPI, (3) Country info from REST Countries API, (4) Random inspirational quote.","2–2.5 hrs"),
      d(27,"Decorators, RegEx & Testing","Write decorators, use regex, and test your code.",
        "Decorators extend function behavior: @decorator. Regex: re.search(), re.findall(), re.sub(), patterns: \\d (digit), \\w (word), * (0+), + (1+). unittest: test methods start with test_, assertEqual, assertRaises verify behavior.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+decorators+regex+testing+tutorial",label:"Decorators & Testing"},{type:"web",url:"https://realpython.com/primer-on-python-decorators/",label:"Real Python Decorators"}],
        "Write @timer and @debug decorators. Validate email and phone using regex. Write 3 unit tests for calculator.",
        "Data Validator: validate email, phone (formats), password (min 8, uppercase, number, special char), date. Write unit tests for each validator.","2–2.5 hrs"),
      d(28,"Week 4 Project — Contact Book with JSON","Complete contact management app.",
        "Combines functions, dicts, file I/O, JSON, error handling, and CLI pattern. Contact book demonstrates CRUD and data persistence — core concepts behind every database-driven application.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+contact+book+project+JSON",label:"Contact Book Project"},{type:"web",url:"https://realpython.com/python-application-layouts/",label:"Python App Layout"}],
        "Build incrementally: save first, then load, then CRUD, then search.",
        "🚀 PROJECT: Contact Book CLI: (1) Add contact (name, phone, email, birthday), (2) View alphabetically sorted, (3) Search by name/phone, (4) Edit details, (5) Delete, (6) Show upcoming birthdays in next 30 days. Save to contacts.json.","2.5–3 hrs"),
    ],project:{id:'bw4',title:'Contact Book + Weather CLI',desc:'Build a dual-feature CLI: (1) A contact book (add/edit/delete/search) stored in contacts.json; (2) An integrated weather lookup using the Open-Meteo free API — search a contact, then instantly fetch weather for their city. Use the requests library, handle API errors gracefully, parse JSON responses, and display a formatted weather card with temperature, humidity, and conditions.'}},
    {week:5,title:"OOP — Object-Oriented Programming",timeRange:"12–15 hrs",
     days:[
      d(29,"Classes & Objects","Create classes with attributes and methods.",
        "OOP models objects with properties (attributes) and behaviors (methods). A class is a blueprint; an object is an instance. __init__ is the constructor. self refers to current instance.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+OOP+classes+objects+beginners",label:"Python OOP Basics"},{type:"web",url:"https://realpython.com/python3-object-oriented-programming/",label:"Real Python OOP"}],
        "Create Dog class with name, breed, age and bark(), sit(), roll_over() methods. Create 3 dog objects.",
        "BankAccount class: balance attribute, deposit(amount), withdraw(amount) with balance check, get_balance(), transaction_history list.","2 hrs"),
      d(30,"Inheritance & Dunder Methods","Use inheritance hierarchies and implement Pythonic dunder methods.",
        "Inheritance: child class inherits from parent. super() calls parent's __init__. Method overriding replaces parent's method. Dunder methods: __str__ (print), __repr__ (debug), __len__ (len()), __eq__/__lt__ (comparisons), __add__ (+).",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+inheritance+dunder+methods+OOP",label:"Inheritance & Dunder Methods"},{type:"web",url:"https://realpython.com/python-magic-methods/",label:"Real Python Dunder Methods"}],
        "Create Animal → Dog, Cat, Bird hierarchy. Each makes different sound. Add __str__, __repr__, __eq__ to BankAccount.",
        "Vehicle Fleet: Vehicle base, Car/Truck/Motorcycle subclasses. Fraction class with all arithmetic, auto-simplify using GCD, print as 'numerator/denominator'.","2.5 hrs"),
      d(31,"@property, @staticmethod, @classmethod","Use Python decorators for class methods.",
        "@property: getter/setter with validation. @staticmethod: utility methods without self. @classmethod: alternative constructors receiving cls. These make classes professional and Pythonic.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+property+staticmethod+classmethod",label:"Python Class Decorators"},{type:"web",url:"https://realpython.com/python-property/",label:"Real Python Property"}],
        "Add @property for temperature with validation to Weather class. @classmethod to create from Fahrenheit.",
        "Employee class: @property salary with validation (cannot be negative), @classmethod create_intern() with default salary, @staticmethod tax_bracket(salary).","2 hrs"),
      d(32,"Dataclasses & Generators","Use dataclasses for clean data models and generators for efficiency.",
        "@dataclass auto-generates __init__, __repr__, __eq__. Perfect for data containers — used heavily in ML. Generators: yield produces values one at a time, memory-efficient. Essential for data pipelines processing millions of records.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+dataclasses+generators+tutorial",label:"Dataclasses & Generators"},{type:"web",url:"https://realpython.com/python-data-classes/",label:"Real Python Dataclasses"}],
        "Rewrite Student record as @dataclass. Write Fibonacci generator. Compare memory: list vs generator of 1M numbers.",
        "Library System using @dataclass: Book, Member, Loan classes. Fibonacci generator (stop at N primes). Reading large CSV file line-by-line generator.","2 hrs"),
      d(33,"Algorithms — Searching & Sorting","Implement basic algorithms for problem solving.",
        "Linear search O(n). Binary search O(log n) on sorted data. Bubble sort, selection sort O(n²). Quick sort O(n log n). Big-O measures efficiency. Understanding algorithms builds the problem-solving intuition crucial for ML.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+searching+sorting+algorithms+tutorial",label:"Algorithms Tutorial"},{type:"web",url:"https://realpython.com/sorting-algorithms-python/",label:"Real Python Sorting"}],
        "Implement binary search and bubble sort. Compare speed vs Python's built-in sorted().",
        "Implement from scratch: binary search, bubble sort, selection sort, insertion sort. Time each on 10,000-element list. Which is fastest and why?","2.5 hrs"),
      d(34,"Problem Solving Practice","Solve 10 algorithm challenges.",
        "Problem solving is the most important programming skill. Classic challenges combine: string manipulation, list operations, math, loops, functions. Practice makes pattern recognition automatic — foundation for coding interviews.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+problem+solving+coding+challenges+beginners",label:"Python Challenges"},{type:"web",url:"https://www.hackerrank.com/domains/python",label:"HackerRank Python"}],
        "Solve at least 5 problems on HackerRank Python domain.",
        "Solve: (1) Palindrome check, (2) Anagram check, (3) Find missing number in 1..N, (4) Two sum, (5) FizzBuzz, (6) Count vowels, (7) Remove duplicates preserving order, (8) Most frequent element, (9) Rotate list by K, (10) Check balanced brackets.","3 hrs"),
      d(35,"Week 5 Project — OOP Quiz Game","Build a quiz game using OOP principles.",
        "Applies all OOP: Question class, Quiz class (manages questions), Player class (tracks score), QuizGame (orchestrates). Using classes dramatically improves organization for complex programs.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+OOP+quiz+game+project",label:"OOP Quiz Game Project"},{type:"web",url:"https://realpython.com/python-quiz-application/",label:"Real Python Quiz"}],
        "Start with Question class, then Quiz, then add scoring.",
        "🚀 PROJECT: OOP Quiz Game: Question class (question, choices, correct_answer), Quiz class (loads from JSON, tracks score, randomizes), Player class (name, score, history), 20+ Python questions, timed mode, leaderboard saved to JSON.","3 hrs"),
    ],project:{id:'bw5',title:'OOP Quiz Game with Leaderboard',desc:'Design a fully OOP quiz engine: Question(text, choices, answer, difficulty), Quiz(questions, timer), Player(name, score, history). Load questions from quiz.json. Features: multiple difficulty levels, countdown timer using time module, best-of-3 rounds, leaderboard persisted in leaderboard.json, and a show_stats() method that prints a bar chart of correct/incorrect answers using OOP. Demonstrate inheritance: TimedQuiz extends Quiz.'}},
    {week:6,title:"Advanced Python & Capstone",timeRange:"10–12 hrs",
     days:[
      d(36,"Virtual Environments, pip & Project Structure","Manage Python projects professionally.",
        "Every project needs its own virtual environment. Commands: python -m venv env, pip install package, pip freeze > requirements.txt, pip install -r requirements.txt. Proper project structure: src/, tests/, docs/, requirements.txt, README.md.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+virtual+environment+project+structure",label:"Project Structure Tutorial"},{type:"web",url:"https://realpython.com/python-virtual-environments-a-primer/",label:"Real Python Venv"}],
        "Create venv, activate, install 3 packages, freeze requirements.txt.",
        "Set up professional project structure: project folder with venv, requirements.txt, README.md, main.py, utils/ folder. Document all setup steps.","1.5 hrs"),
      d(37,"Weather CLI App — APIs & Formatting","Build a complete API-powered weather application.",
        "Combines API calls, JSON handling, formatting, error handling, file I/O, and OOP into a real-world useful application. Mirrors how data scientists pull real-world data to analyze.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+weather+app+CLI+project+API",label:"Weather App Project"},{type:"web",url:"https://openweathermap.org/api",label:"OpenWeatherMap API"}],
        "First get the basic GET request working, then parse JSON, then format output.",
        "🚀 Weather CLI App: (1) Fetch current weather for any city, (2) 5-day forecast, (3) Save favorite cities to JSON, (4) Show weather history, (5) ASCII art weather icons (☀️🌧️⛈️), (6) Convert °C/°F. Handle invalid city.","3 hrs"),
      d(38,"Testing & Code Quality","Write unit tests and maintain code quality.",
        "unittest tests prove code works correctly. Test methods start with test_. assertEqual, assertTrue, assertRaises verify behavior. TDD: write tests BEFORE code. flake8 checks style. black autoformats code. Professional Python always has tests.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+unittest+testing+code+quality",label:"Python Testing Tutorial"},{type:"web",url:"https://realpython.com/python-testing/",label:"Real Python Testing"}],
        "Write tests for your calculator: test normal cases, edge cases (zero, negative), error cases.",
        "Complete test suite for BankAccount: test deposit (normal, large), withdrawal (valid, insufficient funds), balance property, transaction history. Achieve 100% function coverage.","2 hrs"),
      d(39,"Capstone Planning & Architecture","Design your Beginner capstone project.",
        "Before building, plan: define the problem, identify components needed, estimate timeline. A well-planned project is half done. The Student Management System is complex enough to show real-world competence.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+student+management+system+OOP+project",label:"Student Management Project"},{type:"web",url:"https://realpython.com/python-application-layouts/",label:"Project Structure Guide"}],
        "Plan on paper first: what classes, methods, data structure. Then implement.",
        "Plan your capstone: write class diagrams, method signatures, data structure design, and feature list. Then start implementation of Student class and Classroom class.","2 hrs"),
      d(40,"Capstone Build — Part 1","Implement core capstone functionality.",
        "Build the foundation: Student class with all attributes and methods, Classroom class managing students, JSON persistence layer. Test each component as you build it.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+OOP+project+build+tutorial",label:"Python OOP Project Build"},{type:"web",url:"https://docs.python.org/3/",label:"Python Documentation"}],
        "Build Student class first, verify it works. Then Classroom class. Then JSON save/load.",
        "Implement: (1) Student class (id, name, subjects, scores with validation), (2) Classroom class (add/remove/find students, calculate averages), (3) JSON persistence (save_to_file, load_from_file), (4) Unit tests for each class.","2.5 hrs"),
      d(41,"Capstone Build — Part 2","Complete and polish the capstone project.",
        "Add remaining features: grade generation, CSV export, search functionality. Polish the CLI interface. Write clean README. Test edge cases. This final project demonstrates everything learned in the Beginner level.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Python+project+polish+documentation",label:"Python Project Polish"},{type:"web",url:"https://www.makeareadme.com/",label:"How to Write a README"}],
        "Test every feature with 5+ test cases. Add comprehensive error handling.",
        "Complete capstone: (1) Report card generator (formatted table), (2) Search by name/subject, (3) Export to CSV, (4) Statistics (class average, highest/lowest scores), (5) Full error handling, (6) Clean README.md.","2.5 hrs"),
      d(42,"GitHub & Beginner Graduation","Deploy your portfolio and celebrate completion.",
        "Your GitHub IS your resume. Each project needs: clear README with screenshots, clean code, requirements.txt. Pinning your best projects makes them visible. Congratulations on completing the Beginner level!",
        [{type:"yt",url:"https://youtube.com/results?search_query=GitHub+portfolio+beginner+tutorial",label:"GitHub Portfolio Tutorial"},{type:"web",url:"https://github.com/",label:"GitHub"}],
        "Write a compelling README: Problem → Approach → Features → How to Run.",
        "🏆 GRADUATION: (1) Create GitHub repo for capstone, (2) Write professional README with screenshots, (3) Push all Week projects to GitHub, (4) Create portfolio README on GitHub profile, (5) Celebrate — you're now a Beginner Python Developer ready for Intermediate! 🎉","2 hrs"),
    ],project:{id:'bw6',title:'Python Capstone — Personal Finance Tracker',desc:'Build your Python Beginner capstone: a Personal Finance Tracker CLI. Use OOP (Transaction and Budget classes), file I/O (finance.json persistence), a free API for currency conversion, list comprehensions for filtering, and robust error handling. Features: add income/expense, monthly summary, category filter, ASCII spending bar chart, and a .txt report export. Showcases every skill from Weeks 1-6.'}},
  ]
};

const intermediate = {
  label:"🟡 Intermediate",days:60,totalHours:120,goal:"Data Science + Machine Learning",
  weeks:[
    {week:1,title:"NumPy, Pandas & EDA",timeRange:"12–14 hrs",
     days:[
      d(1,"NumPy Arrays & Operations","Create and manipulate NumPy arrays — the ML data container.",
        "NumPy ndarray is 100× faster than Python lists (C implementation). Create: np.array(), np.zeros(), np.ones(), np.arange(), np.linspace(). Attributes: .shape, .dtype, .ndim. Broadcasting: operations on arrays of different shapes. Vectorized math without loops.",
        [{type:"yt",url:"https://youtube.com/results?search_query=NumPy+tutorial+beginners+complete",label:"NumPy Complete Tutorial"},{type:"web",url:"https://numpy.org/doc/stable/user/absolute_beginners.html",label:"NumPy Beginners Guide"}],
        "Create: 5×5 random matrix, normalize to 0-1, replace values >50 with 0, find 10th percentile.",
        "NumPy Workout: (1) 5×5 matrix random ints 1–100, (2) Mean/median/std/min/max, (3) Normalize all values to 0–1, (4) Replace values >50 with 0, (5) Reshape to 1D, sort, find 10th percentile. Implement: MSE, sigmoid, softmax using only NumPy.","2 hrs"),
      d(2,"Pandas DataFrames — Foundation","Master DataFrame creation, access, and filtering.",
        "DataFrame: 2D labeled table — primary data science structure. Create from dicts, CSV, arrays. Key ops: .head()/.tail(), .info()/.describe(), .loc[rows,cols], .iloc[rows,cols], .query(). Mirrors real-world datasets.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Pandas+DataFrame+complete+tutorial",label:"Pandas DataFrame Guide"},{type:"web",url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/",label:"Pandas Getting Started"}],
        "Load Titanic dataset. Explore with head, info, describe. Filter survivors, sort by age.",
        "Load any real dataset: (1) View first/last 10 rows, (2) Find missing values per column, (3) Filter by 3 conditions, (4) Sort by 2 columns, (5) Create computed column, (6) Describe statistics for numeric columns.","2 hrs"),
      d(3,"Pandas Data Cleaning","Handle missing values, outliers, and categorical encoding.",
        "Missing values strategies: drop (.dropna()), fill with mean/median/mode (.fillna()), forward fill. Outliers: IQR method, Z-score. Categorical encoding: LabelEncoder (ordinal), OneHotEncoder (nominal), pd.get_dummies(). ML needs all-numeric input.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Pandas+missing+values+data+cleaning+tutorial",label:"Data Cleaning Tutorial"},{type:"web",url:"https://realpython.com/python-data-cleaning-numpy-pandas/",label:"Real Python Data Cleaning"}],
        "Load messy dataset. Count missingness per column. Apply different strategies.",
        "Clean Titanic: (1) Fill missing Age with group median by Pclass, (2) Fill Embarked with mode, (3) Drop Cabin, (4) Verify no remaining NaN, (5) Document every decision.","2 hrs"),
      d(4,"Data Visualization — Matplotlib & Seaborn","Create charts revealing distributions and relationships.",
        "Matplotlib: Figure and Axes API. Plots: line, scatter, bar, hist, pie, boxplot, subplots. Seaborn: statistical visualization on DataFrames — distplot, boxplot, heatmap, pairplot, violinplot. Good visualization is primary tool for understanding data.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Matplotlib+Seaborn+data+visualization+tutorial",label:"Visualization Tutorial"},{type:"web",url:"https://seaborn.pydata.org/tutorial.html",label:"Seaborn Tutorial"}],
        "Create: line chart, scatter plot, bar chart, histogram, correlation heatmap.",
        "Titanic visualization analysis: 6 different plot types, each answering a specific question. Write a 1-sentence finding per chart.","2 hrs"),
      d(5,"Feature Engineering & Preprocessing","Transform raw features for ML.",
        "Feature engineering creates new informative features: combine features, bin continuous values (age → age_group), log transforms for skewed distributions. StandardScaler: Z-score normalization (mean=0, std=1). MinMaxScaler: scales to [0,1]. Never fit scaler on test data (data leakage!).",
        [{type:"yt",url:"https://youtube.com/results?search_query=feature+engineering+scikit+learn+preprocessing",label:"Feature Engineering Guide"},{type:"web",url:"https://scikit-learn.org/stable/modules/preprocessing.html",label:"Scikit-learn Preprocessing"}],
        "Scale Titanic features, split 80/20, verify distributions similar in both splits.",
        "Prepare ML-ready Titanic: (1) Clean missing values, (2) Encode categoricals, (3) Engineer 3 new features, (4) Scale numeric features, (5) Split 80/20 stratified, (6) Verify with printouts.","2 hrs"),
      d(6,"Statistics for Data Science","Apply statistical tests to validate insights.",
        "Descriptive statistics: mean, median, std, variance, skewness, kurtosis. Hypothesis testing: t-test (compare means), chi-square (categorical relationships), ANOVA (multiple groups). p-value interpretation, Type I/II errors, effect size. Correlation: Pearson, Spearman.",
        [{type:"yt",url:"https://youtube.com/results?search_query=statistics+hypothesis+testing+python+scipy",label:"Statistics with Python"},{type:"web",url:"https://www.khanacademy.org/math/statistics-probability",label:"Khan Academy Stats"}],
        "Run t-test: do survived passengers differ in age from non-survivors? Interpret p-value.",
        "Statistical analysis on Titanic: (1) t-test age vs survival, (2) Chi-square gender vs survival, (3) ANOVA: fare vs Pclass, (4) Correlation heatmap with annotations, (5) Write a 200-word data story summarizing findings.","2 hrs"),
      d(7,"Week 1 Project — Full EDA Pipeline","Build end-to-end exploratory data analysis pipeline.",
        "EDA is the first step every data scientist takes. Goal: understand structure, distributions, relationships, quality. A scikit-learn Pipeline chains preprocessing — professional ML engineering practice.",
        [{type:"yt",url:"https://youtube.com/results?search_query=EDA+pipeline+scikit+learn+complete",label:"EDA Pipeline Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/pipeline.html",label:"Pipeline Docs"}],
        "Follow EDA structure: load → shape → types → missing → describe → distributions → correlations.",
        "🚀 PROJECT: Full EDA on any Kaggle dataset: (1) Dataset overview with 8+ visualizations, (2) Missing value heatmap, (3) Outlier detection, (4) Correlation analysis, (5) Build scikit-learn Pipeline with ColumnTransformer, (6) Pipeline takes raw CSV → ML-ready matrix in one step. Push to GitHub.","3 hrs"),
    ],project:{id:'iw1',title:'EDA Report on Real Dataset',desc:'Perform end-to-end EDA on a real Kaggle dataset (Titanic, Housing Prices, or Customer Churn). Deliverables: (1) Pandas cleaning pipeline — nulls, dtypes, duplicates, (2) 8 visualizations: histogram, boxplot, heatmap, pairplot, violin, bar, scatter, pie, (3) Statistical summary: mean/std/skew/kurtosis, (4) 3 key insights written in plain English, (5) scikit-learn ColumnTransformer Pipeline turning raw CSV into ML-ready matrix in one step, (6) Jupyter notebook + GitHub repo.'}},
    {week:2,title:"Machine Learning Fundamentals",timeRange:"12–15 hrs",
     days:[
      d(8,"Linear & Logistic Regression","Build and evaluate core ML models.",
        "Linear regression: y = β₀ + β₁x₁ + ... Evaluate: MSE, RMSE, MAE, R². Logistic regression: sigmoid → probability 0–1 → class by threshold. Evaluate: accuracy, precision, recall, F1, ROC-AUC, confusion matrix. Complete scikit-learn workflow: fit → predict → evaluate.",
        [{type:"yt",url:"https://youtube.com/results?search_query=linear+logistic+regression+scikit+learn+tutorial",label:"Regression Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/linear_model.html",label:"Scikit-learn Linear Models"}],
        "Train LinearRegression on housing data. Train LogisticRegression on Titanic, print confusion matrix.",
        "Dual project: (1) LinearRegression on California housing — predict prices, analyze coefficients, (2) LogisticRegression on Titanic — full confusion matrix, classification report, ROC curve. Compare models with and without feature scaling.","2 hrs"),
      d(9,"Decision Trees & Random Forests","Master tree-based ensemble methods.",
        "Decision tree: information gain / Gini impurity splits. Prone to overfitting — control with max_depth, min_samples_split. Random Forest: bagging + feature randomness → low variance, high accuracy. Feature importance from impurity decrease. Out-of-bag (OOB) error estimate.",
        [{type:"yt",url:"https://youtube.com/results?search_query=decision+tree+random+forest+scikit+learn",label:"Tree Models Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/ensemble.html",label:"Ensemble Methods"}],
        "Train DecisionTree with depth 3. Visualize with plot_tree. Add RandomForest, compare accuracy.",
        "Titanic ensemble: (1) DecisionTree depth 2, 5, 10 — plot accuracy vs depth, (2) RandomForest 100 trees, (3) Plot feature importances bar chart, (4) Compare OOB error to test accuracy, (5) Explain one tree path in plain English.","2 hrs"),
      d(10,"SVM & KNN","Apply kernel-based and distance-based classifiers.",
        "SVM: find hyperplane maximizing margin between classes. Kernel trick: RBF maps non-linear data to higher dimensions. C parameter: margin vs misclassification tradeoff. KNN: classify by k nearest neighbors — distance metric choice matters. k selection via cross-validation.",
        [{type:"yt",url:"https://youtube.com/results?search_query=SVM+KNN+scikit+learn+tutorial",label:"SVM & KNN Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/svm.html",label:"SVM Docs"}],
        "Train SVM with RBF kernel on digits dataset. Plot decision boundary. Try k=3,5,11 for KNN.",
        "Digits dataset (1797 images): (1) SVM with linear vs RBF kernel — compare accuracy, (2) KNN k=1,3,5,11,21 — plot k vs accuracy, (3) Confusion matrix heatmap for best model, (4) Show 5 misclassified digits visually.","2 hrs"),
      d(11,"Cross-Validation & Hyperparameter Tuning","Build robust models with proper evaluation.",
        "K-fold cross-validation: split data k times, train on k-1 folds, test on remaining. Prevents overfitting to one test split. GridSearchCV: exhaustive search over param grid. RandomizedSearchCV: faster random search. Pipeline + GridSearch = clean, leak-free tuning.",
        [{type:"yt",url:"https://youtube.com/results?search_query=cross+validation+GridSearchCV+scikit+learn",label:"Cross-Validation Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/cross_validation.html",label:"Cross-Validation Docs"}],
        "5-fold CV on RandomForest. GridSearch over n_estimators and max_depth. Print best params.",
        "Hyperparameter hunt: (1) 5-fold CV on 3 different models, (2) GridSearchCV for RandomForest: n_estimators=[50,100,200], max_depth=[3,5,None], (3) RandomizedSearchCV for SVM, (4) Plot validation curves, (5) Report best params and final test accuracy.","2 hrs"),
      d(12,"Clustering — K-Means & DBSCAN","Discover hidden structure in unlabeled data.",
        "K-Means: assign points to nearest centroid, update centroids, repeat. Elbow method selects K. Silhouette score measures cluster quality (-1 to 1). DBSCAN: density-based — finds arbitrary shapes, marks noise points as -1. No need to specify K. Great for geospatial data.",
        [{type:"yt",url:"https://youtube.com/results?search_query=K-means+DBSCAN+clustering+scikit+learn",label:"Clustering Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/clustering.html",label:"Clustering Docs"}],
        "K-Means on iris dataset with K=2,3,4. Plot elbow curve. DBSCAN on make_moons dataset.",
        "Clustering challenge: (1) K-Means on customer dataset (or iris) — elbow plot K=1..10, (2) DBSCAN on make_moons (sklearn) — find noise points, (3) PCA to 2D then visualize clusters with colors, (4) Silhouette score for each K.","2 hrs"),
      d(13,"PCA & Dimensionality Reduction","Reduce features while preserving information.",
        "PCA: finds principal components (directions of max variance). explained_variance_ratio_ shows info per component. Scree plot guides component selection. t-SNE: non-linear, for visualization only (not preprocessing). UMAP: faster than t-SNE, preserves global structure better.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PCA+t-SNE+dimensionality+reduction+python",label:"PCA & t-SNE Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/modules/decomposition.html",label:"PCA Docs"}],
        "PCA on digits dataset: 64→2 dimensions. Plot explained variance. Compare accuracy with/without PCA.",
        "Dimensionality lab: (1) PCA on digits 64D→2D — plot digit clusters by color, (2) Scree plot: how many components for 95% variance? (3) t-SNE on same data — compare to PCA, (4) Train SVM on PCA-reduced vs original — accuracy/speed comparison.","2 hrs"),
      d(14,"Week 2 Project — ML Classification Pipeline","Build complete ML pipeline with multiple models.",
        "Professional ML projects compare multiple models, tune hyperparameters, evaluate fairly, and explain results. A scikit-learn Pipeline ensures no data leakage and enables one-line predictions in production.",
        [{type:"yt",url:"https://youtube.com/results?search_query=scikit+learn+pipeline+comparison+project",label:"ML Pipeline Project"},{type:"web",url:"https://kaggle.com/",label:"Kaggle Datasets"}],
        "Pick a binary classification dataset. Build pipelines for 3+ models. Compare with CV.",
        "🚀 PROJECT: Heart Disease or Breast Cancer classifier: (1) Full EDA, (2) Pipeline: imputer+scaler+model for LogReg, RF, SVM, (3) 10-fold CV comparison table, (4) GridSearchCV on best model, (5) Final evaluation: confusion matrix + ROC curve + feature importance, (6) README on GitHub.","3 hrs"),
    ],project:{id:'iw2',title:'Medical Risk Classifier',desc:'Build a production-ready classification model on a medical dataset (Heart Disease or Breast Cancer UCI). Requirements: (1) Full EDA with class balance analysis, (2) scikit-learn Pipeline for 3 models: LogReg, RandomForest, SVM, (3) 10-fold CV comparison table, (4) GridSearchCV on winner, (5) Final report: confusion matrix, ROC curve, precision-recall curve, feature importances, (6) Pickle the best pipeline, (7) GitHub README with methodology and results table.'}},
    {week:3,title:"Advanced ML — Gradient Boosting & Model Evaluation",timeRange:"12–14 hrs",
     days:[
      d(15,"Gradient Boosting — XGBoost","Master the competition-winning algorithm.",
        "Gradient Boosting builds trees sequentially — each corrects errors of previous. XGBoost: regularized GB with column subsampling. Key params: n_estimators, learning_rate, max_depth, subsample, colsample_bytree. Early stopping prevents overfitting. Usually beats Random Forest on tabular data.",
        [{type:"yt",url:"https://youtube.com/results?search_query=XGBoost+tutorial+python+beginners",label:"XGBoost Tutorial"},{type:"web",url:"https://xgboost.readthedocs.io/en/stable/tutorials/",label:"XGBoost Docs"}],
        "Train XGBoost on Titanic. Use early_stopping_rounds=10. Print feature importances.",
        "XGBoost vs Random Forest: (1) XGBoost on Titanic with eval_set for early stopping, (2) Feature importance plot, (3) Learning curves (train vs val score by n_estimators), (4) Tune learning_rate and max_depth with CV, (5) Final comparison table: LogReg vs RF vs XGBoost.","2 hrs"),
      d(16,"LightGBM & CatBoost","Learn fast and category-aware boosting frameworks.",
        "LightGBM: leaf-wise tree growth (vs level-wise) → faster, better accuracy. Handles large datasets efficiently. categorical_feature parameter handles categories natively. CatBoost: no preprocessing needed for categoricals, symmetric trees, ordered boosting to reduce leakage.",
        [{type:"yt",url:"https://youtube.com/results?search_query=LightGBM+CatBoost+tutorial+python",label:"LightGBM & CatBoost Tutorial"},{type:"web",url:"https://lightgbm.readthedocs.io/en/stable/",label:"LightGBM Docs"}],
        "Train LightGBM on a dataset with categorical features. Compare training time vs XGBoost.",
        "Boosting shootout: (1) Same dataset — train XGBoost, LightGBM, CatBoost, (2) Compare: accuracy, training time, memory usage, (3) LightGBM with native categorical features, (4) CatBoost with auto cat handling, (5) Ensemble all three — does it beat individuals?","2 hrs"),
      d(17,"Model Interpretability — SHAP","Explain why your model makes predictions.",
        "SHAP (SHapley Additive exPlanations): game-theory based feature attribution. shap.TreeExplainer for tree models. Summary plot: global feature importance. Force plot: single prediction explanation. Dependence plot: feature vs SHAP value relationship. Essential for production and regulated industries.",
        [{type:"yt",url:"https://youtube.com/results?search_query=SHAP+values+model+interpretability+python",label:"SHAP Tutorial"},{type:"web",url:"https://shap.readthedocs.io/en/latest/",label:"SHAP Docs"}],
        "SHAP on trained XGBoost. Print summary_plot. Explain one prediction with force_plot.",
        "SHAP deep dive: (1) TreeExplainer on XGBoost Titanic model, (2) Summary bar plot (global importance), (3) Summary beeswarm plot (impact direction), (4) Force plot for 3 specific predictions — explain in plain English, (5) Dependence plot for top feature.","2 hrs"),
      d(18,"Imbalanced Data & Advanced Metrics","Handle class imbalance properly.",
        "Imbalanced datasets: 95% negative, 5% positive — accuracy is misleading. Techniques: class_weight='balanced', SMOTE (synthetic minority oversampling), undersampling, threshold tuning. Metrics that matter: precision-recall curve, F1, ROC-AUC, average_precision_score. Never optimize accuracy on imbalanced data.",
        [{type:"yt",url:"https://youtube.com/results?search_query=imbalanced+data+SMOTE+python+scikit",label:"Imbalanced Data Tutorial"},{type:"web",url:"https://imbalanced-learn.org/stable/",label:"imbalanced-learn Docs"}],
        "Create imbalanced dataset (95/5 split). Train without balancing. Compare to SMOTE.",
        "Fraud detection simulation: (1) Create imbalanced dataset, (2) Train without balancing → evaluate properly, (3) Apply SMOTE, (4) class_weight='balanced', (5) Tune classification threshold for max F1, (6) Compare precision-recall curves for all approaches.","2 hrs"),
      d(19,"Time Series Analysis","Analyze and forecast temporal data.",
        "Time series: data ordered by time. Components: trend, seasonality, noise. Decomposition with statsmodels. Stationarity (ADF test). Moving average, exponential smoothing. ARIMA: p (AR), d (differencing), q (MA). Feature engineering for ML: lag features, rolling statistics, date features.",
        [{type:"yt",url:"https://youtube.com/results?search_query=time+series+ARIMA+python+tutorial",label:"Time Series Tutorial"},{type:"web",url:"https://www.statsmodels.org/stable/tsa.html",label:"Statsmodels TSA"}],
        "Load airline passengers dataset. Plot decomposition. Check stationarity with ADF test.",
        "Time series project: (1) Load any time series (stock prices, weather, sales), (2) Plot decomposition, (3) ADF stationarity test + differencing, (4) ARIMA model — find best p,d,q with AIC, (5) Forecast next 30 periods with confidence intervals, (6) Compare ARIMA vs ML (lag features + XGBoost).","2.5 hrs"),
      d(20,"Natural Language Processing Basics","Process and classify text with ML.",
        "NLP pipeline: lowercase → remove punctuation → tokenize → remove stopwords → stem/lemmatize → vectorize. TF-IDF: term frequency × inverse document frequency weights rare-but-important words. sklearn: TfidfVectorizer, CountVectorizer. Text classification: spam detection, sentiment analysis.",
        [{type:"yt",url:"https://youtube.com/results?search_query=NLP+text+classification+scikit+learn+tutorial",label:"NLP Classification Tutorial"},{type:"web",url:"https://scikit-learn.org/stable/tutorial/text_analytics/",label:"Scikit-learn Text"}],
        "Vectorize 10 sentences with TF-IDF. Train Naive Bayes on SMS spam dataset.",
        "Sentiment classifier: (1) Load movie reviews or tweet dataset, (2) Full text preprocessing pipeline, (3) TF-IDF vectorizer + Naive Bayes, (4) Compare: CountVectorizer vs TF-IDF, (5) Naive Bayes vs Logistic Regression vs SVM, (6) Confusion matrix and most predictive words.","2 hrs"),
      d(21,"Week 3 Project — Kaggle Competition Entry","Submit to a real Kaggle competition.",
        "Kaggle competitions are the best ML practice: real datasets, real evaluation, global leaderboard. A good submission combines: EDA, feature engineering, ensemble of models, proper CV. The goal is not to win but to practice the full workflow under constraints.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Kaggle+competition+tutorial+beginners+strategy",label:"Kaggle Strategy Guide"},{type:"web",url:"https://kaggle.com/competitions",label:"Kaggle Competitions"}],
        "Join Titanic or House Prices competition. Read top kernels to understand the problem.",
        "🚀 Kaggle submission: (1) Join Titanic (classification) or House Prices (regression), (2) Full EDA notebook, (3) Feature engineering: 5+ new features, (4) Ensemble: XGBoost + LightGBM + LogReg, (5) Submission to leaderboard, (6) Screenshot your score. Goal: beat baseline.","3–4 hrs"),
    ],project:{id:'iw3',title:'Kaggle Competition Submission',desc:'Enter a Kaggle competition (Titanic or House Prices). Deliverables: (1) Full EDA notebook with insights, (2) Feature engineering: 5+ crafted features (e.g. FamilySize, IsAlone, CabinDeck), (3) SHAP analysis on the best model, (4) Ensemble: XGBoost + LightGBM stacked with a LogReg meta-learner, (5) Handle class imbalance with SMOTE if needed, (6) Kaggle submission + leaderboard screenshot, (7) 300-word reflection: what worked, what did not, what you would do next.'}},
    {week:4,title:"Neural Networks & Deep Learning Intro",timeRange:"12–15 hrs",
     days:[
      d(22,"Neural Network Fundamentals","Understand how neural networks learn.",
        "Artificial neuron: weighted sum + bias → activation function. Layers: input, hidden, output. Forward pass: multiply weights, add bias, apply activation (ReLU, sigmoid, tanh, softmax). Loss function measures error. Backpropagation: chain rule computes gradients. Gradient descent updates weights.",
        [{type:"yt",url:"https://youtube.com/results?search_query=neural+network+from+scratch+python+numpy",label:"Neural Network from Scratch"},{type:"web",url:"https://www.3blue1brown.com/topics/neural-networks",label:"3Blue1Brown Neural Nets"}],
        "Build 2-layer NN in pure NumPy for XOR problem. Forward pass, loss, backprop, update.",
        "NumPy neural network: (1) Implement forward pass (2 layers), (2) Implement MSE loss and sigmoid derivative, (3) Implement backpropagation step, (4) Training loop 1000 epochs on XOR, (5) Plot loss curve — verify it decreases, (6) Compare to sklearn MLPClassifier.","3 hrs"),
      d(23,"Keras & TensorFlow Basics","Build neural networks with Keras.",
        "Keras Sequential API: add layers with model.add(). Dense layer: units, activation. Compile: optimizer (adam), loss (binary_crossentropy, mse), metrics. model.fit(): epochs, batch_size, validation_split. model.evaluate(), model.predict(). save/load with model.save().",
        [{type:"yt",url:"https://youtube.com/results?search_query=Keras+TensorFlow+neural+network+tutorial+beginners",label:"Keras Tutorial"},{type:"web",url:"https://keras.io/getting_started/",label:"Keras Getting Started"}],
        "Build Sequential model: 2 Dense layers, compile with adam, fit 50 epochs. Plot history.",
        "Keras classifier: (1) Build 3-layer model for Titanic survival, (2) Try: ReLU vs sigmoid activation, (3) Plot train/val accuracy and loss per epoch, (4) Add Dropout(0.3) — does it improve val accuracy? (5) Save model, load it, verify predictions match.","2 hrs"),
      d(24,"CNNs for Image Classification","Classify images with convolutional neural networks.",
        "Convolution: filter slides over image extracting features (edges, textures). Feature maps: output of each filter. MaxPooling: downsamples, reducing spatial size. Flatten → Dense for classification. Architecture: Conv→Pool→Conv→Pool→Flatten→Dense→Softmax. Transfer learning: use pretrained feature extractors.",
        [{type:"yt",url:"https://youtube.com/results?search_query=CNN+image+classification+Keras+CIFAR10+tutorial",label:"CNN Tutorial"},{type:"web",url:"https://keras.io/examples/vision/",label:"Keras Vision Examples"}],
        "Build CNN on MNIST: Conv2D(32)→MaxPool→Conv2D(64)→MaxPool→Flatten→Dense(10).",
        "Image classifier: (1) CNN on MNIST or CIFAR-10, (2) Visualize filters from first Conv layer, (3) Plot confusion matrix for all classes, (4) Data augmentation (rotation, flip) — compare accuracy, (5) Try adding BatchNormalization — effect on training speed?","2.5 hrs"),
      d(25,"Transfer Learning with Pretrained Models","Leverage ImageNet-trained models.",
        "Transfer learning: use model trained on ImageNet (MobileNet, VGG16, ResNet50) as feature extractor. Freeze base layers. Add custom Dense head. Fine-tuning: unfreeze last N layers and retrain with low learning rate. Achieves high accuracy with very little data. Standard for real-world CV projects.",
        [{type:"yt",url:"https://youtube.com/results?search_query=transfer+learning+Keras+MobileNet+custom+dataset",label:"Transfer Learning Tutorial"},{type:"web",url:"https://keras.io/guides/transfer_learning/",label:"Keras Transfer Learning"}],
        "Load MobileNetV2, freeze base, add Dense(2) head, fine-tune on cats vs dogs (100 images).",
        "Transfer learning project: (1) Load MobileNetV2 pretrained on ImageNet, (2) Freeze all layers, add GlobalAveragePooling + Dense head, (3) Train on small custom dataset (flowers/dogs/cats), (4) Unfreeze last 20 layers and fine-tune with lr=1e-5, (5) Compare: scratch vs transfer accuracy.","2.5 hrs"),
      d(26,"Recurrent Networks & LSTM","Process sequential data with RNNs.",
        "RNN: hidden state carries memory across time steps. Vanishing gradient: gradients shrink through many steps → LSTM solves this. LSTM gates: forget (what to discard), input (what to add), output (what to expose). GRU: simplified LSTM with 2 gates, faster training. Use for text, time series, audio.",
        [{type:"yt",url:"https://youtube.com/results?search_query=LSTM+RNN+Keras+time+series+tutorial",label:"LSTM Tutorial"},{type:"web",url:"https://colah.github.io/posts/2015-08-Understanding-LSTMs/",label:"Understanding LSTMs"}],
        "Build LSTM for stock price prediction. Use 60-day window to predict next day close.",
        "LSTM predictor: (1) Prepare stock/weather data with sliding window (60 timesteps), (2) Build LSTM(50)→LSTM(50)→Dense(1), (3) Train and plot predictions vs actual, (4) Compare: SimpleRNN vs LSTM vs GRU accuracy, (5) Try bidirectional LSTM — does it improve?","2.5 hrs"),
      d(27,"Model Deployment with Streamlit","Deploy your ML model as a web app.",
        "Streamlit turns Python scripts into interactive web apps in minutes. Key components: st.title, st.write, st.slider, st.selectbox, st.button, st.dataframe, st.pyplot. Load model with pickle/joblib. User inputs features → model predicts → display result. Deploy to Streamlit Cloud free.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Streamlit+machine+learning+deployment+tutorial",label:"Streamlit Tutorial"},{type:"web",url:"https://docs.streamlit.io/",label:"Streamlit Docs"}],
        "Build Streamlit app: sliders for iris features → predict species → show confidence.",
        "Deploy ML app: (1) Train and save best model (pickle/joblib), (2) Streamlit app with input widgets for all features, (3) Show prediction + probability bar chart, (4) Add EDA tab with data visualizations, (5) Deploy to Streamlit Cloud, (6) Share public URL.","2 hrs"),
      d(28,"Week 4 Project — Image Classifier Web App","Deploy a CNN image classifier.",
        "A deployed image classifier demonstrates full ML engineering: data, model, serving. Combining CNN + Streamlit + cloud deployment is a portfolio highlight. Users upload an image, model predicts, app explains the result.",
        [{type:"yt",url:"https://youtube.com/results?search_query=CNN+image+classifier+Streamlit+deployment",label:"Image App Tutorial"},{type:"web",url:"https://huggingface.co/spaces",label:"Hugging Face Spaces"}],
        "Plan: what classes to classify? Collect 50+ images per class. Train CNN. Build app.",
        "🚀 IMAGE CLASSIFIER APP: (1) Collect/download 3-class image dataset (flowers, cats/dogs, food), (2) Train CNN with transfer learning (MobileNetV2), (3) Streamlit app: file uploader → predict → show top-3 probabilities with bar chart, (4) Deploy to HuggingFace Spaces or Streamlit Cloud, (5) GitHub README with live demo link.","3–4 hrs"),
    ],project:{id:'iw4',title:'Deployed Image Classifier App',desc:'Build and deploy an image classifier end to end. Steps: (1) Download a 3-class dataset (flowers, food, or custom), (2) Custom CNN in Keras + MobileNetV2 transfer learning — compare both, (3) Data augmentation pipeline (flip, crop, color jitter), (4) Plot training curves, confusion matrix, and 5 Grad-CAM heatmaps, (5) Wrap in a Streamlit app: image upload → prediction + top-3 confidence bars, (6) Deploy to HuggingFace Spaces (free), (7) GitHub repo with README and live demo link.'}},
    {week:5,title:"Advanced NLP & Transformers",timeRange:"12–15 hrs",
     days:[
      d(29,"Text Classification with Transformers","Fine-tune BERT for classification tasks.",
        "BERT (Bidirectional Encoder Representations from Transformers): pre-trained on masked language modeling. Fine-tuning: add classification head, train all weights on labeled data. Hugging Face: AutoTokenizer handles subword tokenization, AutoModelForSequenceClassification adds head. Trainer API handles training loop.",
        [{type:"yt",url:"https://youtube.com/results?search_query=BERT+fine+tuning+text+classification+Hugging+Face",label:"BERT Fine-Tuning Tutorial"},{type:"web",url:"https://huggingface.co/docs/transformers/training",label:"HF Training Docs"}],
        "Fine-tune distilbert-base-uncased on SST-2 sentiment dataset for 1 epoch. Evaluate accuracy.",
        "Sentiment fine-tuning: (1) Load distilbert-base-uncased, (2) Tokenize IMDB or SST-2 dataset, (3) Fine-tune 2 epochs with Trainer API, (4) Evaluate on test set, (5) Build inference function: string → sentiment + confidence, (6) Compare to TF-IDF + LogReg from week 3.","2.5 hrs"),
      d(30,"Named Entity Recognition & Token Classification","Extract entities from text.",
        "NER: classify each token as person, organization, location, date, etc. IOB tagging: B-PER (begin person), I-PER (inside person), O (outside). Fine-tune BERT for token classification. spaCy: production-ready NER with en_core_web_sm model. Custom NER training with spaCy's training loop.",
        [{type:"yt",url:"https://youtube.com/results?search_query=named+entity+recognition+BERT+spacy+tutorial",label:"NER Tutorial"},{type:"web",url:"https://spacy.io/usage/training",label:"spaCy Training"}],
        "Use spaCy en_core_web_sm to extract all persons and organizations from a news article.",
        "NER system: (1) spaCy NER on 5 news articles — extract PER, ORG, LOC, (2) Visualize with displacy, (3) Count entity frequencies, (4) Fine-tune bert-base-NER on CoNLL-2003 for 1 epoch, (5) Compare spaCy vs BERT NER on same text.","2 hrs"),
      d(31,"Text Generation & GPT","Generate text with language models.",
        "GPT: autoregressive — predicts next token from all previous tokens. Sampling strategies: greedy (always pick max), temperature (controls randomness), top-k (sample from top k tokens), top-p/nucleus (sample from tokens covering p% probability mass). Hugging Face pipeline('text-generation') simplifies this.",
        [{type:"yt",url:"https://youtube.com/results?search_query=GPT+text+generation+Hugging+Face+tutorial",label:"Text Generation Tutorial"},{type:"web",url:"https://huggingface.co/docs/transformers/main_classes/text_generation",label:"HF Text Generation"}],
        "Use gpt2 model to generate 5 completions of a prompt. Vary temperature 0.3, 0.7, 1.0.",
        "Text generation lab: (1) Load gpt2, generate with temperature 0.5 and 1.2 — compare, (2) top_k=50 vs top_p=0.9 — sample 5 outputs each, (3) Fine-tune gpt2 on a small text corpus (song lyrics, poems) for 3 epochs, (4) Generate 10 new samples from fine-tuned model.","2.5 hrs"),
      d(32,"Embeddings & Semantic Search","Build semantic search with sentence transformers.",
        "Word embeddings map words to vectors where similar words are close. Sentence-BERT: encode entire sentences into dense vectors. Cosine similarity finds semantically similar sentences regardless of exact words. FAISS: fast approximate nearest neighbor search for millions of vectors. Foundation for RAG systems.",
        [{type:"yt",url:"https://youtube.com/results?search_query=sentence+transformers+semantic+search+FAISS+tutorial",label:"Semantic Search Tutorial"},{type:"web",url:"https://www.sbert.net/docs/usage/semantic_textual_similarity.html",label:"Sentence-BERT Docs"}],
        "Encode 50 sentences with all-MiniLM-L6-v2. Find top-3 most similar to a query sentence.",
        "Semantic search engine: (1) Encode 100+ sentences/paragraphs with sentence-transformers, (2) Build FAISS index, (3) Query interface: input question → return top-5 similar passages, (4) Compare: cosine similarity vs BM25 keyword search, (5) Try with a Wikipedia article corpus.","2.5 hrs"),
      d(33,"Building a RAG System","Implement Retrieval Augmented Generation.",
        "RAG: retrieve relevant documents → augment prompt → generate grounded answer. Prevents hallucination by giving LLM real context. Components: document loader, text splitter (chunk_size, overlap), embeddings, vector store, retriever, LLM. LangChain RetrievalQA chains all steps. ChromaDB: local vector store.",
        [{type:"yt",url:"https://youtube.com/results?search_query=RAG+LangChain+ChromaDB+tutorial+python",label:"RAG Tutorial"},{type:"web",url:"https://python.langchain.com/docs/use_cases/question_answering/",label:"LangChain RAG Docs"}],
        "Load a PDF, split into chunks, embed with OpenAI or HuggingFace, store in ChromaDB, query.",
        "RAG pipeline: (1) Load 3+ PDFs/text files with LangChain, (2) Split: chunk_size=500, overlap=50, (3) Embed with HuggingFace free embeddings, (4) Store in ChromaDB, (5) Build Q&A chain, (6) Ask 10 questions — evaluate answer quality, (7) Add source citations to answers.","2.5 hrs"),
      d(34,"OpenAI API & Prompt Engineering","Use LLMs via API with effective prompting.",
        "OpenAI API: messages=[system, user, assistant]. Temperature, max_tokens, top_p. System prompt: sets model behavior. Few-shot prompting: provide examples in prompt. Chain-of-thought: ask model to think step by step. JSON mode: force structured output. Function calling: let LLM call your Python functions.",
        [{type:"yt",url:"https://youtube.com/results?search_query=OpenAI+API+prompt+engineering+tutorial+python",label:"OpenAI API Tutorial"},{type:"web",url:"https://platform.openai.com/docs/guides/prompt-engineering",label:"OpenAI Prompt Engineering"}],
        "Zero-shot, few-shot, CoT prompts for same task. Compare output quality.",
        "Prompt engineering lab: (1) Zero-shot classification of 10 sentences, (2) Few-shot with 3 examples — accuracy improvement, (3) Chain-of-thought for math word problems, (4) JSON mode: extract structured data from unstructured text, (5) Function calling: build a calculator tool the LLM can use.","2.5 hrs"),
      d(35,"Week 5 Project — AI Document Q&A App","Build a production-ready document chatbot.",
        "A document Q&A app is one of the most in-demand AI applications. It combines RAG, LLMs, and a polished UI. Users upload PDFs, ask questions, get grounded answers with source references. This is a portfolio-worthy full-stack AI project.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PDF+chat+RAG+Streamlit+LangChain+tutorial",label:"PDF Chat Tutorial"},{type:"web",url:"https://docs.langchain.com/",label:"LangChain Docs"}],
        "Plan: upload PDF → extract text → chunk → embed → store → query → answer with sources.",
        "🚀 DOCUMENT Q&A APP: (1) Streamlit UI: PDF uploader, chat interface, (2) Backend: LangChain + ChromaDB + HuggingFace embeddings, (3) Conversational memory (last 5 turns), (4) Show source chunks with each answer, (5) Deploy to Streamlit Cloud, (6) Test with 3 different documents.","3–4 hrs"),
    ],project:{id:'iw5',title:'RAG Document Q&A App',desc:'Build a Retrieval-Augmented Generation (RAG) chatbot. Stack: LangChain + ChromaDB + HuggingFace sentence-transformers + GPT-3.5 or Claude API. Features: (1) PDF/TXT file upload, (2) Automatic chunking and embedding, (3) Semantic search with top-3 retrieved chunks shown, (4) Conversational memory across 5 turns, (5) Streamlit UI with a chat interface, (6) Deploy to Streamlit Cloud. Test it on 3 different documents and write a short evaluation of answer quality.'}},
    {week:6,title:"MLOps & Production ML",timeRange:"12–14 hrs",
     days:[
      d(36,"Git, GitHub & ML Project Structure","Version control your ML code professionally.",
        "Git essentials: init, add, commit, push, pull, branch, merge. GitHub: pull requests, issues, Actions for CI/CD. ML project structure: src/, notebooks/, data/, models/, tests/, requirements.txt, Makefile. .gitignore for data and model files. Cookiecutter Data Science template.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Git+GitHub+ML+project+structure+tutorial",label:"Git for ML Projects"},{type:"web",url:"https://drivendata.github.io/cookiecutter-data-science/",label:"Cookiecutter Data Science"}],
        "Create ML repo with proper structure. .gitignore for data/models. Write README with badges.",
        "ML repo setup: (1) Create GitHub repo with Cookiecutter DS structure, (2) Add .gitignore (data, models, .env), (3) requirements.txt with pinned versions, (4) Pre-commit hooks: black formatter + flake8 linter, (5) GitHub Actions: CI that runs pytest on every push, (6) Professional README with architecture diagram.","2 hrs"),
      d(37,"Docker for ML","Containerize your ML application.",
        "Docker: package app + dependencies in isolated container. Dockerfile: FROM (base image), RUN (install packages), COPY (source code), CMD (startup command). docker build/run/ps/exec. volumes for data. docker-compose for multi-service apps. Ensures reproducibility: same behavior everywhere.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Docker+machine+learning+tutorial+containerize",label:"Docker for ML Tutorial"},{type:"web",url:"https://docs.docker.com/get-started/",label:"Docker Getting Started"}],
        "Write Dockerfile for a Flask/FastAPI ML app. Build image. Run container. Test endpoint.",
        "Dockerize your app: (1) Write Dockerfile for Streamlit or FastAPI ML app, (2) Multi-stage build for smaller image, (3) docker-compose with app + redis (for caching), (4) Health check endpoint, (5) Push image to Docker Hub, (6) Document docker run command in README.","2 hrs"),
      d(38,"FastAPI for ML Serving","Serve ML models as REST APIs.",
        "FastAPI: modern Python web framework — async, auto OpenAPI docs, Pydantic validation. Load model at startup (not per request). POST /predict endpoint takes JSON input → returns prediction. Background tasks for async jobs. Request/response Pydantic models ensure validation. Uvicorn ASGI server.",
        [{type:"yt",url:"https://youtube.com/results?search_query=FastAPI+machine+learning+model+serving+tutorial",label:"FastAPI ML Serving"},{type:"web",url:"https://fastapi.tiangolo.com/",label:"FastAPI Docs"}],
        "FastAPI app: load sklearn model on startup. POST /predict with features → return prediction + confidence.",
        "ML API: (1) FastAPI app with GET /health and POST /predict, (2) Pydantic model for input validation, (3) Load trained model at startup with lifespan, (4) Return prediction + confidence + model_version, (5) Test with httpx/requests, (6) Swagger UI (/docs) screenshot in README.","2 hrs"),
      d(39,"MLflow — Experiment Tracking","Track experiments and manage models.",
        "MLflow: open-source ML lifecycle platform. Tracking: log params, metrics, artifacts per run. Experiments group related runs. Compare runs in UI. Model Registry: staging, production stages. mlflow.autolog() auto-captures sklearn/XGBoost params. mlflow models serve for deployment.",
        [{type:"yt",url:"https://youtube.com/results?search_query=MLflow+experiment+tracking+tutorial+sklearn",label:"MLflow Tutorial"},{type:"web",url:"https://mlflow.org/docs/latest/tutorials-and-examples/tutorial.html",label:"MLflow Tutorial"}],
        "Run 5 XGBoost experiments with different params. Log to MLflow. Compare in UI.",
        "MLflow experiment: (1) mlflow.set_experiment('titanic-classifier'), (2) Log params (n_estimators, max_depth, lr), (3) Log metrics (accuracy, F1, AUC), (4) Log model as artifact, (5) Compare 5 runs in MLflow UI, (6) Register best model in Model Registry with 'production' tag.","2 hrs"),
      d(40,"Model Monitoring & Data Drift","Detect when models degrade in production.",
        "Model drift: data distribution shifts over time → model performance degrades. Data drift: input feature distributions change. Concept drift: relationship between X and y changes. Detection: statistical tests (KS test, PSI). Evidently AI: generates drift reports. Monitoring: track prediction distributions, feature stats.",
        [{type:"yt",url:"https://youtube.com/results?search_query=model+monitoring+data+drift+evidently+python",label:"Model Monitoring Tutorial"},{type:"web",url:"https://docs.evidentlyai.com/",label:"Evidently AI Docs"}],
        "Simulate drift by changing test data distribution. Detect with KS test. Generate Evidently report.",
        "Drift simulation: (1) Train model on clean data, (2) Create 'drifted' dataset (shift mean/scale features), (3) KS test to detect drift in each feature, (4) Evidently DataDriftPreset report, (5) Set up alerts: if drift detected → log warning, (6) Plot: original vs drifted distributions side by side.","2 hrs"),
      d(41,"CI/CD for ML — GitHub Actions","Automate ML workflows.",
        "CI/CD (Continuous Integration/Deployment): automate testing, linting, and deployment on every code push. GitHub Actions workflows: YAML files in .github/workflows/. ML CI: run tests, lint code, train model on small data, check metrics meet threshold, build Docker image, push to registry.",
        [{type:"yt",url:"https://youtube.com/results?search_query=GitHub+Actions+CI+CD+machine+learning+tutorial",label:"GitHub Actions for ML"},{type:"web",url:"https://docs.github.com/en/actions",label:"GitHub Actions Docs"}],
        "Write GitHub Actions workflow: on push → run pytest → lint → train model → check accuracy > 0.8.",
        "ML CI pipeline: (1) Workflow triggers on push to main, (2) Install deps from requirements.txt, (3) Run pytest unit tests, (4) Flake8 linting, (5) Train model and check accuracy threshold, (6) If pass: build Docker image, push to Docker Hub, (7) Add status badge to README.","2 hrs"),
      d(42,"Week 6 Project — End-to-End MLOps Pipeline","Build a production-grade ML system.",
        "The capstone project combines everything: tracked experiments, versioned models, containerized API, CI/CD pipeline. This demonstrates readiness for a real ML engineering role. A GitHub repo with this project is a strong portfolio piece.",
        [{type:"yt",url:"https://youtube.com/results?search_query=MLOps+end+to+end+project+tutorial",label:"MLOps Project Tutorial"},{type:"web",url:"https://mlops.community/",label:"MLOps Community"}],
        "Outline architecture: data → train (MLflow) → register model → FastAPI → Docker → CI/CD.",
        "🚀 MLOPS PROJECT: (1) Dataset: any classification/regression problem, (2) Experiment tracking with MLflow (5+ runs), (3) Best model registered in Model Registry, (4) FastAPI serving app loads registered model, (5) Dockerized with docker-compose, (6) GitHub Actions CI: test→lint→build→push, (7) Monitoring: log prediction statistics to file.","4 hrs"),
    ],project:{id:'iw6',title:'MLOps End-to-End Pipeline',desc:'Productionize any previous ML model with a full MLOps stack. Requirements: (1) MLflow experiment tracking — log params, metrics, artifacts for 5+ runs, (2) Register best model in MLflow Model Registry, (3) FastAPI app that loads the registered model on startup and serves /predict, (4) Dockerfile + docker-compose.yml, (5) GitHub Actions CI pipeline: pytest → flake8 lint → docker build → push to Docker Hub, (6) Monitoring: log every prediction (input, output, timestamp) to a rolling CSV, alert if accuracy drops.'}},
    {week:7,title:"Computer Vision & Advanced Topics",timeRange:"12–15 hrs",
     days:[
      d(43,"Object Detection with YOLO","Detect and locate objects in images.",
        "Object detection: classify AND localize objects. YOLO (You Only Look Once): single forward pass predicts bounding boxes + class probabilities. YOLOv8 from Ultralytics: best modern detector. IoU (Intersection over Union) measures detection quality. Non-max suppression removes duplicate boxes. Real-time capable.",
        [{type:"yt",url:"https://youtube.com/results?search_query=YOLOv8+object+detection+tutorial+python",label:"YOLOv8 Tutorial"},{type:"web",url:"https://docs.ultralytics.com/",label:"Ultralytics YOLO Docs"}],
        "Run YOLOv8n.detect() on a street photo. Print detected objects and confidence scores.",
        "YOLO detection: (1) Run YOLOv8 on 5 different images, (2) Draw bounding boxes and labels, (3) Fine-tune on custom dataset (50+ labeled images), (4) Evaluate: mAP@0.5 metric, (5) Run on webcam stream or video file, (6) Export to ONNX for deployment.","2.5 hrs"),
      d(44,"Image Segmentation & Keypoints","Segment objects and detect landmarks.",
        "Semantic segmentation: classify each pixel (not just object). Instance segmentation: separate each object instance. SAM (Segment Anything Model): zero-shot segmentation with prompts. Pose estimation: detect human keypoints (nose, shoulders, elbows, wrists, hips, knees, ankles). MediaPipe: production-ready pose/hand/face detection.",
        [{type:"yt",url:"https://youtube.com/results?search_query=image+segmentation+pose+estimation+mediapipe+tutorial",label:"Segmentation Tutorial"},{type:"web",url:"https://mediapipe.dev/",label:"MediaPipe"}],
        "Use MediaPipe Pose on an image. Draw all 33 keypoints. Compute angle at elbow joint.",
        "Vision lab: (1) MediaPipe Pose on 3 yoga/sport images, (2) Draw skeleton with connections, (3) Calculate joint angles (shoulder, hip, knee), (4) YOLOv8-seg for instance segmentation on same images, (5) Compare outputs: detection vs segmentation vs pose.","2.5 hrs"),
      d(45,"Recommendation Systems","Build collaborative and content-based recommenders.",
        "Content-based filtering: recommend similar items based on features (TF-IDF + cosine similarity). Collaborative filtering: learn from user-item interactions. Matrix factorization: SVD decomposes user-item matrix. Neural CF: embeddings for users and items. Surprise library: SVD, KNN for collaborative filtering. Cold start problem.",
        [{type:"yt",url:"https://youtube.com/results?search_query=recommendation+system+python+collaborative+filtering",label:"Recommender Tutorial"},{type:"web",url:"https://surprise.readthedocs.io/en/stable/",label:"Surprise Docs"}],
        "Content-based movie recommender: TF-IDF on movie descriptions, cosine similarity matrix.",
        "Dual recommender: (1) Content-based on MovieLens descriptions (TF-IDF + cosine sim), (2) Collaborative filtering with Surprise SVD, (3) Hybrid: combine both scores, (4) Evaluate with RMSE on held-out ratings, (5) Build simple CLI: 'What movies like Inception?' → top 5 suggestions.","2.5 hrs"),
      d(46,"Reinforcement Learning Basics","Train agents to learn by reward.",
        "RL: agent takes actions in environment to maximize cumulative reward. Key concepts: state (s), action (a), reward (r), policy (π), value function (V), Q-value (Q). Q-Learning: tabular method. Deep Q-Network (DQN): neural network approximates Q-values. OpenAI Gym: standard RL environments. CartPole: balance a pole.",
        [{type:"yt",url:"https://youtube.com/results?search_query=reinforcement+learning+Q+learning+CartPole+python",label:"RL Tutorial"},{type:"web",url:"https://gymnasium.farama.org/",label:"Gymnasium Docs"}],
        "Q-learning on FrozenLake-v1 (tabular). Train 10000 episodes. Plot reward curve.",
        "RL experiment: (1) Q-learning on FrozenLake — tabular Q-table, (2) Train 10K episodes, plot rolling average reward, (3) DQN on CartPole-v1 with PyTorch, (4) Replay buffer + target network, (5) Plot: episode length over training, (6) Show trained agent playing (render or record).","3 hrs"),
      d(47,"Generative AI — GANs & Diffusion","Create images with generative models.",
        "GAN: generator creates fake images, discriminator distinguishes real/fake — adversarial training. Mode collapse: generator produces limited variety. DCGAN: uses Conv layers. Stable Diffusion: adds noise to image (forward process), learns to denoise (reverse process). Hugging Face diffusers: generate images from text prompts.",
        [{type:"yt",url:"https://youtube.com/results?search_query=GAN+stable+diffusion+tutorial+python+huggingface",label:"Generative AI Tutorial"},{type:"web",url:"https://huggingface.co/docs/diffusers/index",label:"Diffusers Docs"}],
        "Generate 5 images with stable-diffusion-v1-5 using different prompts. Vary guidance_scale.",
        "Generative lab: (1) Stable Diffusion text-to-image: generate 10 images with varied prompts, (2) Compare guidance_scale 3, 7, 15 — quality/diversity tradeoff, (3) Image-to-image pipeline: transform an existing image, (4) Inpainting: mask part of image → fill with diffusion, (5) Log all experiments to MLflow.","2.5 hrs"),
      d(48,"Week 7 Project — Full Stack AI App","Build and deploy a complete AI-powered application.",
        "A full-stack AI app demonstrates engineering breadth: model + API + frontend + deployment. This project should be showstopper portfolio material: real users can interact with your AI online.",
        [{type:"yt",url:"https://youtube.com/results?search_query=full+stack+AI+app+FastAPI+React+deployment",label:"Full Stack AI App"},{type:"web",url:"https://huggingface.co/spaces",label:"HuggingFace Spaces"}],
        "Choose: image classifier, document Q&A, or chatbot. Plan architecture before coding.",
        "🚀 FULL STACK AI APP: Choose one: (A) Image classifier with FastAPI backend + Streamlit UI, (B) Document chatbot (RAG + LangChain + Streamlit), (C) Multi-modal app (image + text). Requirements: (1) FastAPI backend with /predict endpoint, (2) Docker containerized, (3) GitHub Actions CI, (4) MLflow tracked, (5) Deployed publicly. Demo link in portfolio.","4 hrs"),
    ],project:{id:'iw7',title:'People Analytics Vision System',desc:'Build a real-time people analytics pipeline using computer vision. Use YOLOv8 (ultralytics) + OpenCV: detect and count people in uploaded images or video, draw bounding boxes with confidence scores, define entry/exit zones and count crossings, blur faces for privacy. Wrap it in a Streamlit UI — upload image/video → see annotated output + stats table. Dockerize with docker-compose and push to GitHub with sample output screenshots.'}},
    {week:8,title:"Capstone, Portfolio & Interview Prep",timeRange:"14–18 hrs",
     days:[
      d(49,"Data Science Interview — Statistics & ML Theory","Master interview theory questions.",
        "Common interview topics: bias-variance tradeoff, overfitting solutions, gradient descent variants, regularization (L1 vs L2), class imbalance handling, evaluation metric selection, feature selection methods, missing data strategies, curse of dimensionality, ensemble methods comparison.",
        [{type:"yt",url:"https://youtube.com/results?search_query=data+science+ML+interview+questions+answers",label:"ML Interview Prep"},{type:"web",url:"https://www.interviewquery.com/",label:"Interview Query"}],
        "Explain bias-variance tradeoff, then when to use precision vs recall. Speak out loud.",
        "Interview prep: (1) Write answers to 20 common ML theory questions, (2) Practice explaining: bias-variance, overfitting, regularization, (3) Compare: L1 vs L2, precision vs recall, bagging vs boosting, (4) Explain gradient descent to a non-technical person, (5) Record yourself — review for clarity.","2 hrs"),
      d(50,"SQL for Data Science","Query databases for ML feature extraction.",
        "Data scientists spend ~40% of time on data wrangling — SQL is essential. SELECT, WHERE, GROUP BY, HAVING, ORDER BY. JOINs: INNER, LEFT, RIGHT, FULL OUTER. Window functions: ROW_NUMBER, RANK, LAG, LEAD, SUM OVER. CTEs (WITH clause) for readable complex queries. CASE WHEN for feature engineering in SQL.",
        [{type:"yt",url:"https://youtube.com/results?search_query=SQL+data+science+tutorial+window+functions",label:"SQL for Data Science"},{type:"web",url:"https://mode.com/sql-tutorial/",label:"Mode SQL Tutorial"}],
        "Write SQL: customer lifetime value, monthly active users, cohort retention rate.",
        "SQL challenge: (1) Customer LTV: JOIN orders + users, GROUP BY customer, SUM revenue, (2) Moving average: 7-day rolling revenue with window functions, (3) Cohort analysis: retention by signup month, (4) Top-N per group: top 3 products per category, (5) Funnel analysis: conversion rate at each step.","2 hrs"),
      d(51,"A/B Testing & Causal Inference","Design and analyze experiments correctly.",
        "A/B test: split users into control/treatment, measure metric difference. Power analysis: calculate sample size needed for statistical significance. p-value and confidence intervals. Multiple testing correction (Bonferroni). Common pitfalls: peeking, survivorship bias, network effects. Causal inference: difference-in-differences, propensity score matching.",
        [{type:"yt",url:"https://youtube.com/results?search_query=A+B+testing+python+statistics+tutorial",label:"A/B Testing Tutorial"},{type:"web",url:"https://www.exp-platform.com/Documents/GuideControlledExperiments.pdf",label:"Controlled Experiments Guide"}],
        "Simulate A/B test with 1000 users per group. t-test. Calculate power and minimum sample size.",
        "A/B experiment: (1) Simulate click-through rates: control 5%, treatment 5.5%, (2) Calculate required sample size for 80% power, (3) Run t-test and chi-square test — interpret results, (4) Simulate sequential testing (peeking) — show inflated false positive rate, (5) Apply Bonferroni correction for 3 simultaneous tests.","2 hrs"),
      d(52,"Kaggle Gold — Advanced Techniques","Learn competition-winning strategies.",
        "Competition winning techniques: target encoding for high-cardinality categoricals, pseudo-labeling, test-time augmentation (TTA), stacking/blending ensembles, out-of-fold predictions, Optuna for Bayesian hyperparameter optimization, feature selection with permutation importance.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Kaggle+advanced+techniques+stacking+ensemble",label:"Kaggle Advanced Techniques"},{type:"web",url:"https://kaggle.com/",label:"Kaggle"}],
        "Implement stacking: level-0 (RF, XGB, LGB) → level-1 (LogReg). Out-of-fold predictions.",
        "Competition toolkit: (1) Optuna: tune XGBoost with 100 trials — compare to GridSearch, (2) Target encoding with cross-validation to prevent leakage, (3) Stacking ensemble: 3 base models → meta-learner, (4) Pseudo-labeling: add confident test predictions to training, (5) Submit to active Kaggle competition.","2.5 hrs"),
      d(53,"Building Your Data Science Portfolio","Create a portfolio that gets you hired.",
        "A strong DS portfolio: 3–5 projects showing breadth (data cleaning, ML, NLP, deployment). Each project needs: clear problem statement, EDA with visuals, model comparison, insights in plain English, GitHub with clean code, README with screenshots/demo. Medium/Towards DS articles show communication skills.",
        [{type:"yt",url:"https://youtube.com/results?search_query=data+science+portfolio+projects+github+tutorial",label:"DS Portfolio Guide"},{type:"web",url:"https://towardsdatascience.com/",label:"Towards Data Science"}],
        "Audit your GitHub: README quality, code cleanliness, project descriptions.",
        "Portfolio sprint: (1) Audit and clean 3 existing projects: better READMEs, docstrings, notebooks, (2) Add Streamlit demos for 2 projects, (3) Write a 500-word Medium article explaining one project's insights, (4) Create GitHub profile README with skills, stats, project links, (5) Record a 2-min demo video.","2 hrs"),
      d(54,"Resume, LinkedIn & Job Applications","Land your first data science job.",
        "DS resume: quantify impact (X% improvement, N models, $Y value). Skills section: Python, SQL, ML frameworks — only what you can defend in interview. LinkedIn: headline 'Data Scientist | ML | Python | NLP'. Cold outreach: personalized message referencing specific work. Target roles: Junior DS, ML Engineer, Data Analyst with ML.",
        [{type:"yt",url:"https://youtube.com/results?search_query=data+science+resume+linkedin+job+search+tips",label:"DS Job Search Guide"},{type:"web",url:"https://www.linkedin.com/",label:"LinkedIn"}],
        "Rewrite resume with quantified bullets. Update LinkedIn headline and about section.",
        "Job search sprint: (1) Rewrite resume — every bullet has a number, (2) LinkedIn: update headline, about, skills endorsements, (3) Apply to 5 entry-level DS/ML roles, (4) Customize cover letter for each, (5) Reach out to 3 alumni/connections at target companies, (6) Track applications in spreadsheet.","2 hrs"),
      d(55,"Mock Technical Interviews","Practice real data science interview formats.",
        "DS interviews: (1) Take-home: 4–8 hour assignment — EDA + modeling + presentation, (2) Technical screen: SQL queries, statistics, ML concepts, (3) Coding: pandas/numpy data manipulation, (4) Case study: open-ended business problem → ML solution design, (5) Behavioral: STAR method for past projects.",
        [{type:"yt",url:"https://youtube.com/results?search_query=data+science+mock+interview+technical+SQL+ML",label:"Mock Interview Practice"},{type:"web",url:"https://www.stratascratch.com/",label:"StrataScratch SQL Practice"}],
        "Do a 45-min mock interview out loud: statistics, coding, and one ML design question.",
        "Interview simulation: (1) 10 SQL questions on StrataScratch, (2) 5 probability/stats questions — write out full solutions, (3) ML system design: design a recommendation system (talk through architecture), (4) Behavioral: STAR for your capstone project, (5) Pandas coding: 5 data manipulation challenges.","2.5 hrs"),
      d(56,"Intermediate Graduation — Showcase Day","Present your work and plan next steps.",
        "Congratulations on completing the Intermediate level! You've built real projects, deployed models, and mastered the full DS/ML workflow. Intermediate graduation = ready for Junior Data Scientist / ML Engineer roles. The Advanced level awaits: deep learning, transformers, and production AI systems.",
        [{type:"yt",url:"https://youtube.com/results?search_query=data+science+portfolio+presentation+tips",label:"Portfolio Presentation"},{type:"web",url:"https://github.com/",label:"GitHub"}],
        "Present your 3 best projects as if interviewing. Time yourself: 3 min per project.",
        "🏆 GRADUATION: (1) Finalize GitHub portfolio — 3 complete projects with demos, (2) Update resume with all new skills and projects, (3) LinkedIn 'Open to Work' with target roles set, (4) Apply to 10 positions, (5) Write a reflection: what you learned, what was hardest, what's next, (6) Celebrate — you are now an Intermediate ML Practitioner! 🎉","2 hrs"),
    ],project:{id:'iw8',title:'Intermediate Capstone — Full-Stack AI App',desc:'Build and deploy a polished full-stack AI application — your Intermediate capstone. Choose: (A) Image classifier with FastAPI backend + Streamlit UI, (B) RAG chatbot with LangChain + ChromaDB + chat UI, or (C) Multi-modal app that accepts image + text. All must include a FastAPI /predict endpoint, Dockerfile, GitHub Actions CI pipeline, MLflow experiment tracking, public deployment (HuggingFace Spaces or Streamlit Cloud), and a GitHub README with a demo GIF. This is your portfolio centerpiece.'}},

    // ── BONUS WEEK 9: Mathematics for AI ──
    {week:9,title:"Mathematics for AI — Linear Algebra, Calculus & Probability",timeRange:"12–14 hrs",
     days:[
      d(57,"Vectors & Matrices for ML","Understand how data and models are represented mathematically.",
        "Every ML model is built on linear algebra. Vectors represent data points. Matrices represent transformations and weights. Understanding dot products, matrix multiplication, transpose, and inverse is essential for reading research papers and understanding neural network math.",
        [{type:"yt",url:"https://youtube.com/results?search_query=linear+algebra+for+machine+learning+3blue1brown",label:"3Blue1Brown Linear Algebra"},{type:"web",url:"https://www.3blue1brown.com/topics/linear-algebra",label:"3Blue1Brown"}],
        "Implement matrix multiplication from scratch in NumPy without np.dot. Then verify with np.dot.",
        "Linear algebra lab: (1) Vector dot product, cosine similarity between 2 sentences (TF-IDF), (2) Matrix multiply: 3x3 by 3x3 by hand then NumPy, (3) Transpose: understand why W.T appears in backprop, (4) Eigenvalues of a 2x2 matrix — visualize stretching direction, (5) Apply to PCA: covariance matrix to eigenvectors to project data.","2 hrs"),
      d(58,"Calculus — Derivatives & Gradient Descent","Understand how neural networks learn.",
        "Calculus powers backpropagation. Derivative = rate of change. Gradient = multi-variable derivative. Gradient descent: move in the direction of steepest descent. Chain rule: how gradients flow backward through layers. Without this, PyTorch autograd is a black box.",
        [{type:"yt",url:"https://youtube.com/results?search_query=gradient+descent+calculus+machine+learning+explained",label:"Gradient Descent Math"},{type:"web",url:"https://ruder.io/optimizing-gradient-descent/",label:"Gradient Descent Overview"}],
        "Implement gradient descent from scratch: minimize f(x) = x squared + 3x + 2. Plot loss vs iterations.",
        "Calculus hands-on: (1) Compute derivative of sigmoid manually, (2) Implement gradient descent on MSE loss — no PyTorch, (3) Visualize loss landscape (3D surface) and gradient steps, (4) Chain rule: compute dL/dW for a 2-layer network by hand, (5) Verify your manual gradient matches PyTorch autograd.","2 hrs"),
      d(59,"Probability & Bayes Theorem","Understand uncertainty and predictions in ML.",
        "ML models output probabilities. Bayes theorem updates beliefs given evidence. Probability distributions describe data. Normal distribution appears everywhere. Understanding entropy, KL divergence, and cross-entropy loss makes loss functions intuitive rather than mysterious.",
        [{type:"yt",url:"https://youtube.com/results?search_query=probability+bayes+theorem+machine+learning",label:"Probability for ML"},{type:"web",url:"https://www.khanacademy.org/math/statistics-probability",label:"Khan Academy Probability"}],
        "Bayes spam filter: compute P(spam | word='money') from a small email dataset.",
        "Probability lab: (1) Simulate coin flips, plot convergence to 0.5, (2) Bayes theorem: medical test problem, (3) Normal distribution: visualize mean/std shifts, (4) Cross-entropy loss: why it penalizes confident wrong predictions so heavily, (5) KL divergence: measure difference between two distributions.","2 hrs"),
      d(60,"Statistics for AI — Inference & Hypothesis Testing","Apply statistics to evaluate AI models.",
        "Statistics lets you make rigorous claims about model performance. Confidence intervals show uncertainty. Hypothesis testing validates improvements. Correlation analysis finds relationships. Without stats, you cannot tell if your model improvement is real or just random variation.",
        [{type:"yt",url:"https://youtube.com/results?search_query=statistics+for+data+science+hypothesis+testing",label:"Statistics for DS"},{type:"web",url:"https://statisticsbyjim.com/",label:"Statistics By Jim"}],
        "Run t-test: is model A significantly better than model B? With 10 cross-validation fold scores each.",
        "Stats lab: (1) Confidence interval for model accuracy (bootstrap), (2) t-test: is your improvement statistically significant? (3) Pearson/Spearman correlation on features vs target, (4) Effect size (Cohen d) — not just p-value, (5) McNemar test: compare two classifiers on same test set.","2 hrs"),
      d(61,"Information Theory — Entropy & Cross-Entropy","Understand the math behind loss functions.",
        "Entropy measures uncertainty in a distribution. Cross-entropy is the loss function for classification. KL divergence measures how different two distributions are. These concepts connect probability to neural network training, NLP (perplexity), and compression.",
        [{type:"yt",url:"https://youtube.com/results?search_query=entropy+cross+entropy+KL+divergence+machine+learning",label:"Information Theory for ML"},{type:"web",url:"https://colah.github.io/posts/2015-09-Visual-Information/",label:"Visual Information Theory"}],
        "Compute entropy of: [0.5, 0.5], [0.9, 0.1], [1.0, 0.0]. Explain what each value means.",
        "Information theory: (1) Compute Shannon entropy for 5 probability distributions, (2) Cross-entropy loss: implement from scratch for multi-class, (3) KL divergence: measure gap between predicted and true distribution, (4) Perplexity: compute for a language model on test sentences, (5) Connect: why does minimizing cross-entropy equal maximizing log-likelihood?","2 hrs"),
      d(62,"Linear Algebra for Deep Learning — Attention Math","Understand the math behind transformers.",
        "Transformer attention is pure linear algebra: Q, K, V matrices, scaled dot-product, softmax. Understanding the shapes and operations makes reading transformer code natural. This directly prepares you for fine-tuning LLMs and building AI features.",
        [{type:"yt",url:"https://youtube.com/results?search_query=attention+mechanism+math+explained+transformer",label:"Attention Math"},{type:"web",url:"https://nlp.seas.harvard.edu/annotated-transformer/",label:"Annotated Transformer"}],
        "Compute attention scores manually for 3 tokens with d_model=4. Apply softmax. Compute output.",
        "Attention math: (1) Implement scaled dot-product attention in NumPy, (2) Verify: attention(Q,K,V) matches PyTorch nn.MultiheadAttention output, (3) Visualize attention matrix as heatmap, (4) Multi-head: split into 2 heads, compute separately, concat, (5) Positional encoding: implement sin/cos and visualize patterns.","2 hrs"),
      d(63,"Math Week Project — Implement Backpropagation","Build a neural network using only math.",
        "The ultimate math challenge: build a working neural network using only NumPy and your math knowledge. No PyTorch. No Keras. Just calculus, linear algebra, and Python. If you can do this, you truly understand how AI works under the hood.",
        [{type:"yt",url:"https://youtube.com/results?search_query=neural+network+numpy+backpropagation+from+scratch",label:"Backprop from Scratch"},{type:"web",url:"https://cs231n.github.io/neural-networks-case-study/",label:"CS231n Case Study"}],
        "Plan: 3-layer network to forward pass to compute loss to backprop to update weights to repeat.",
        "MATH PROJECT: (1) Build 3-layer MLP in pure NumPy (no autograd), (2) Forward: matmul + ReLU + matmul + sigmoid, (3) Binary cross-entropy loss, (4) Backprop: derive and implement dW, db for each layer, (5) Train on XOR dataset — loss should reach <0.01, (6) Plot: loss curve + decision boundary, (7) Verify: matches a PyTorch equivalent model outputs.","2.5 hrs"),
    ],project:{id:'iw9',title:'Math-Powered Neural Network from Scratch',desc:'Build a fully working 2-hidden-layer neural network using ONLY NumPy — no PyTorch, no Keras, no autograd. Implement: forward propagation (matrix multiply + ReLU + sigmoid), binary cross-entropy loss, backpropagation (chain rule, compute dW/db per layer), and gradient descent with momentum. Train on XOR (loss < 0.01) and breast cancer dataset. Plot: loss curve, decision boundary, and gradient norms per layer. GitHub repo with math explanations in comments.'}},

    // ── BONUS WEEK 10: AI API Integration ──
    {week:10,title:"AI API Integration — Gemini, OpenAI & Prompt Engineering",timeRange:"10–12 hrs",
     days:[
      d(64,"Gemini API — Your First AI Integration","Call Google Gemini API and get AI responses.",
        "Gemini API is free to start and beginner-friendly. This is the fastest way to add real AI to your projects. You send a prompt (text, image, or both), Gemini responds. The API uses REST — just like your RoadmapX backend already does. One new route = AI in your app.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Google+Gemini+API+tutorial+python+beginners",label:"Gemini API Tutorial"},{type:"web",url:"https://ai.google.dev/gemini-api/docs",label:"Gemini API Docs"}],
        "Get free API key from Google AI Studio. Send your first prompt. Print the response.",
        "Gemini integration: (1) Get API key from aistudio.google.com, (2) pip install google-generativeai, (3) gemini.GenerativeModel call with generate_content, (4) Build a Q&A loop in terminal, (5) Handle errors: rate limit, empty response, invalid key, (6) Add to Node.js backend via fetch to Gemini REST endpoint.","2 hrs"),
      d(65,"OpenAI API — ChatGPT Integration","Use OpenAI API for powerful AI responses.",
        "OpenAI API is the industry standard. The chat completions endpoint follows a simple pattern: send an array of messages (system + user + assistant history), get back an AI response. Same structure as your RoadmapX backend routes — just a new API call.",
        [{type:"yt",url:"https://youtube.com/results?search_query=OpenAI+API+tutorial+Python+beginners+2024",label:"OpenAI API Tutorial"},{type:"web",url:"https://platform.openai.com/docs/guides/text-generation",label:"OpenAI Docs"}],
        "Call gpt-4o-mini with a system prompt + user message. Print response. Measure tokens used.",
        "OpenAI lab: (1) pip install openai, (2) Chat completion with system + user messages, (3) Maintain conversation history — multi-turn chat, (4) Stream responses for real-time typing effect, (5) Count tokens with tiktoken, (6) Compare: gpt-4o-mini vs gpt-4o — quality and cost difference.","2 hrs"),
      d(66,"Prompt Engineering — Getting Better Answers","Write prompts that get exactly what you need from AI.",
        "Prompt engineering is how you control AI output. The same model gives completely different quality answers depending on how you ask. System prompts set the AI role. Few-shot examples guide format. Chain-of-thought improves reasoning. This is the most practical skill for building AI features fast.",
        [{type:"yt",url:"https://youtube.com/results?search_query=prompt+engineering+tutorial+2024+ChatGPT",label:"Prompt Engineering Guide"},{type:"web",url:"https://platform.openai.com/docs/guides/prompt-engineering",label:"OpenAI Prompt Guide"}],
        "Same question, 3 different prompts. Compare outputs. Which gets the most useful answer?",
        "Prompt lab: (1) Zero-shot vs few-shot vs chain-of-thought — compare on 5 reasoning tasks, (2) System prompt engineering: make AI respond only as a coding tutor, (3) JSON output: prompt AI to always respond in parseable JSON, (4) Constrain length and format, (5) Temperature: 0.0 vs 0.7 vs 1.5 — show creativity vs consistency tradeoff.","2 hrs"),
      d(67,"Structured AI Output — JSON Responses","Make AI return data your code can use.",
        "AI chat responses are text — but your app needs structured data. JSON mode forces the model to respond in valid JSON. This is how you build AI features that work in production: AI generates structured data, your code processes it, your UI displays it.",
        [{type:"yt",url:"https://youtube.com/results?search_query=OpenAI+JSON+mode+structured+output+tutorial",label:"JSON Mode Tutorial"},{type:"web",url:"https://platform.openai.com/docs/guides/structured-outputs",label:"Structured Outputs Docs"}],
        "Prompt AI to return a study plan as JSON: {weeks: [{week, topics, hours}]}. Parse and display it.",
        "Structured output lab: (1) JSON mode: generate quiz questions as array of objects, (2) Pydantic validation: parse AI JSON into typed Python objects, (3) Function calling: define a schema, let AI fill it in, (4) Error handling: what if AI returns invalid JSON? (5) Build: AI generates a learning roadmap in JSON — render it as cards in HTML.","2 hrs"),
      d(68,"Multimodal AI — Send Images to Gemini","Build AI features that understand images.",
        "Gemini Vision can analyze images, describe diagrams, read screenshots, and answer visual questions. This unlocks powerful features: analyze user code screenshots, describe uploaded images, extract text from photos. For RoadmapX: users could upload a code screenshot and get AI feedback.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Gemini+vision+image+analysis+Python+tutorial",label:"Gemini Vision Tutorial"},{type:"web",url:"https://ai.google.dev/gemini-api/docs/vision",label:"Gemini Vision Docs"}],
        "Send an image to Gemini with the question: What code is in this screenshot and what does it do?",
        "Vision API lab: (1) Send local image file to Gemini, (2) Ask: describe, analyze, count objects, read text, (3) Screenshot analyzer: capture screen — send to Gemini — get explanation, (4) Multiple images: compare two code screenshots, (5) Build mini-app: upload any image — get detailed AI description — display result.","2 hrs"),
      d(69,"Rate Limits, Costs & Free Alternatives","Use AI APIs responsibly and economically.",
        "Free API tiers have limits. Production apps need cost management. Gemini has a generous free tier. Caching identical requests saves money. Choosing the right model (small vs large) balances cost and quality. Understanding tokens helps you design efficient prompts.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+API+cost+optimization+rate+limits+tutorial",label:"API Cost Tutorial"},{type:"web",url:"https://ai.google.dev/pricing",label:"Gemini Pricing"}],
        "Log token usage for 10 different prompts. Calculate: if 1000 users/day send these, what is the cost?",
        "Cost lab: (1) Compare: Gemini Free vs Pro vs Flash — quality vs cost tradeoff, (2) Implement simple cache: same prompt returns cached response, (3) Token counting before sending — reject prompts that are too long, (4) Rate limiter: max 10 requests/minute per user, (5) Fallback: if primary API fails switch to backup model.","1.5 hrs"),
      d(70,"AI API Week Project — Add AI Chat to RoadmapX","Build the AI Chat Assistant feature for your own app.",
        "This is the feature planned in your README: AI Chat Assistant. Today you build it. Your Node.js backend already has routes, auth, and MongoDB. Add one new route: POST /api/ai-chat. Frontend already has CSS and JS patterns. Add a chat UI panel. RoadmapX becomes an AI-powered learning platform.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+Gemini+API+chatbot+backend+tutorial",label:"Node.js AI Chat Tutorial"},{type:"web",url:"https://ai.google.dev/gemini-api/docs",label:"Gemini API Docs"}],
        "Start with backend: POST /api/ai-chat calls Gemini and returns response. Test with Postman first.",
        "ROADMAPX AI CHAT: Backend: (1) POST /api/ai-chat in server.js — requires auth session, (2) System prompt: You are an AI learning assistant for RoadmapX. Help users with DSA, Python, and AI concepts, (3) Call Gemini API with user message + system prompt, (4) Return response JSON. Frontend: (5) Add floating chat button to index.html, (6) Chat panel with message history, (7) Streaming response display optional, (8) Rate limit: 20 messages/day per free user.","2.5 hrs"),
    ],project:{id:'iw10',title:'RoadmapX AI Chat Assistant Feature',desc:'Build and ship the AI Chat Assistant into your live RoadmapX app. Backend (Node.js): POST /api/ai-chat endpoint that authenticates the user (session check), reads their message, adds a tutor system prompt, calls Gemini API, and returns the response. Add rate limiting (20 msgs/day) and error handling. Frontend (HTML/CSS/JS): Add a floating chat button, chat panel with message bubbles, loading indicator, and conversation history. Deploy and test on your live RoadmapX URL.'}},

    // ── BONUS WEEK 11: Ship All AI Features for RoadmapX ──
    {week:11,title:"Ship All AI Features — Complete RoadmapX AI Layer",timeRange:"12–14 hrs",
     days:[
      d(71,"AI Notes Summarizer — Plan & Backend","Build the AI-powered notes summarizer feature.",
        "Your README lists Notes and Summarizer as in-progress. Today you build it. User pastes their study notes — AI extracts key points, creates a summary, generates 5 quiz questions. This is real AI value: saving students hours of revision time. Backend first: one new route in server.js.",
        [{type:"yt",url:"https://youtube.com/results?search_query=text+summarization+API+Node.js+tutorial",label:"Summarizer Backend Tutorial"},{type:"web",url:"https://ai.google.dev/gemini-api/docs",label:"Gemini Docs"}],
        "Write the system prompt for the summarizer. Test it on your own DSA notes. Refine until perfect.",
        "Summarizer backend: (1) POST /api/ai-summarize — accepts {text, type: summary or quiz or flashcards}, (2) System prompt: Extract key concepts, create a concise summary, then generate 5 quiz questions with answers, (3) JSON response: {summary, keyPoints, quizQuestions}, (4) Input validation: min 100 chars, max 5000 chars, (5) Save summaries to MongoDB per user.","2 hrs"),
      d(72,"AI Notes Summarizer — Frontend UI","Build the summarizer UI and connect it to backend.",
        "The backend is ready. Now build the UI that students will actually use. It should feel intuitive: paste notes, click summarize, see results clearly. The quiz questions should be interactive — click to reveal answer. This feature alone makes RoadmapX valuable.",
        [{type:"yt",url:"https://youtube.com/results?search_query=text+summarizer+UI+HTML+CSS+JavaScript",label:"Summarizer UI Tutorial"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",label:"Fetch API Docs"}],
        "Wireframe the UI on paper first. Where does the text input go? Where do results appear?",
        "Summarizer UI: (1) notes-summarizer.html — textarea for input, mode selector (summary/quiz/flashcards), (2) Loading state with animation while AI processes, (3) Summary card with key points as bullet list, (4) Quiz section: question shown, click to reveal answer, (5) Flashcard mode: flip animation on click, (6) Save to history button stores in MongoDB.","2.5 hrs"),
      d(73,"Smart Roadmap Generator — AI Creates Custom Plans","Build the feature that generates personalized learning roadmaps.",
        "This is RoadmapX's killer AI feature. User types their goal, their current level, and available hours per day. AI generates a completely personalized week-by-week roadmap in JSON. Your existing custom-roadmap.html page already exists and is ready to render it. This differentiates RoadmapX from any static roadmap tool.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+roadmap+generator+custom+learning+path+tutorial",label:"AI Roadmap Generator Tutorial"},{type:"web",url:"https://ai.google.dev/gemini-api/docs",label:"Gemini Docs"}],
        "Design the JSON schema for a generated roadmap. What fields does each week need?",
        "AI Roadmap Generator: (1) POST /api/ai-roadmap — accepts {goal, level, hoursPerDay, weeks}, (2) Prompt: return JSON matching your existing week schema, (3) Parse and validate AI JSON response, (4) Save generated roadmap to MongoDB — custom-roadmap.html already exists, (5) Frontend form: goal input + level + time leads to loading leads to roadmap display, (6) Save to My Roadmaps button.","2.5 hrs"),
      d(74,"AI Progress Feedback — Personalized Coaching","Add AI that analyzes user progress and gives advice.",
        "Your app already tracks streaks, Pomodoro sessions, and step completion. Feed this data to AI and get personalized feedback: You have been consistent on DSA but skipped AI for 3 days — try 30 minutes on Python today. This turns RoadmapX from a tracker into an actual AI coach.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+coaching+progress+feedback+app+tutorial",label:"AI Coaching Tutorial"},{type:"web",url:"https://ai.google.dev/gemini-api/docs",label:"Gemini Docs"}],
        "Write prompt that takes streak data + completed steps and outputs specific, actionable advice.",
        "AI Feedback: (1) GET /api/ai-feedback — reads user streak, completed steps, Pomodoro count from MongoDB, (2) Builds context string with their progress data, (3) AI prompt: As a learning coach, analyze this student progress and give specific advice for today, (4) Display on profile.html as Your AI Coach card, (5) Refresh daily — new advice each day, (6) Add motivational quote for zero-streak days.","2 hrs"),
      d(75,"AI Leaderboard — Smart Rankings","Build the Leaderboard feature your README lists as in-progress.",
        "Your README shows Leaderboard as in-progress. Build it with an AI twist: not just who did the most Pomodoros, but AI-generated insight about top performers. Real leaderboard = community motivation. AI summary = unique feature no other roadmap app has.",
        [{type:"yt",url:"https://youtube.com/results?search_query=leaderboard+feature+Node.js+MongoDB+tutorial",label:"Leaderboard Tutorial"},{type:"web",url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",label:"JS Sorting Docs"}],
        "Design: what metrics go into the leaderboard? Streak + Pomodoros + completed steps?",
        "Leaderboard: (1) GET /api/leaderboard — aggregate top 20 users by (streak x 3) + (pomodoros x 1) + (steps x 2), (2) MongoDB aggregation pipeline, (3) leaderboard.html — animated rank cards with avatar/name/score, (4) Weekly reset: store weekly snapshots, (5) AI summary: This week top learners focused on... generated from top 5 users activity, (6) Your rank highlighted.","2.5 hrs"),
      d(76,"Polish, Test & Deploy All AI Features","Make all AI features production-ready.",
        "You have built 5 AI features this week. Now polish them: error handling for API failures, loading states, rate limits, mobile responsiveness. Test every feature end-to-end. Deploy the updated backend to Render and frontend to Cloudflare Pages. Your RoadmapX is now a real AI product.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Node.js+production+deployment+Render+tutorial",label:"Render Deployment Tutorial"},{type:"web",url:"https://render.com/docs",label:"Render Docs"}],
        "Test every AI feature with: empty input, very long input, API timeout, no internet. Fix all bugs.",
        "Production polish: (1) Error handling: every AI call wrapped in try/catch with user-friendly messages, (2) Loading skeletons for all AI responses, (3) Mobile test: all AI UIs work on phone screen, (4) Environment variables: GEMINI_API_KEY in Render dashboard, (5) Deploy backend update to Render, (6) Deploy frontend update to Cloudflare Pages, (7) Test live URL end-to-end for all 5 AI features.","2 hrs"),
      d(77,"AI Features Week Project — RoadmapX Full AI Demo","Document and showcase your AI-powered RoadmapX.",
        "You have shipped 5 real AI features into a live deployed app. That is extraordinary. Most developers have never done this. Now document it properly so recruiters, investors, and users understand what you built. A great README and demo video are worth more than the code itself.",
        [{type:"yt",url:"https://youtube.com/results?search_query=product+demo+video+tutorial+loom+screen+record",label:"Demo Video Tutorial"},{type:"web",url:"https://www.loom.com/",label:"Loom Screen Recorder"}],
        "Record a 3-minute demo video showing all 5 AI features working live on your deployed app.",
        "SHOWCASE: (1) Update README: add AI Features section with screenshots of all 5 features, (2) Architecture diagram: show how AI calls flow from frontend to backend to Gemini to response, (3) Record 3-min Loom demo: login, use each AI feature, show results, (4) LinkedIn post: I built an AI-powered learning platform — attach demo video, (5) Update GitHub description and tags: add AI, Gemini, LLM, EdTech.","2 hrs"),
    ],project:{id:'iw11',title:'RoadmapX — Complete AI Feature Suite',desc:'Ship all 5 AI features into your live RoadmapX application: (1) AI Chat Assistant — floating chat button, Gemini-powered tutor, conversation history, 20 msgs/day rate limit. (2) Notes Summarizer — paste notes, get summary + key points + quiz questions + flashcards, saved to MongoDB. (3) Smart Roadmap Generator — enter goal + level + hours, AI generates custom week-by-week roadmap in your existing roadmap UI. (4) AI Progress Feedback — daily AI coach analyzes streak/Pomodoro/step data and gives personalized advice on profile page. (5) Leaderboard — weekly rankings + AI-generated community insight. All features deployed live on Render + Cloudflare Pages. README updated with demo GIF and architecture diagram.'}},
  ]
};


const advanced = {
  label:"🔴 Advanced",days:90,totalHours:180,goal:"Real AI Systems & Deployment",
  weeks:[
    {week:1,title:"Deep Learning — PyTorch Foundations",timeRange:"12–16 hrs",
     days:[
      d(1,"Neural Networks from Scratch (NumPy)","Implement a neural network using only NumPy.",
        "Building from scratch forces complete understanding: forward propagation, loss function, backpropagation (chain rule), gradient descent weight update. Removes the magic from PyTorch/TensorFlow.",
        [{type:"yt",url:"https://youtube.com/results?search_query=neural+network+numpy+from+scratch+backpropagation",label:"Neural Net from Scratch"},{type:"web",url:"https://cs231n.github.io/neural-networks-case-study/",label:"CS231n NumPy NN"}],
        "3-layer network: ReLU hidden, sigmoid output. Train on XOR. Loss should reach <0.01.",
        "NumPy neural net: (1) Forward: linear → ReLU → linear → sigmoid, (2) Binary cross-entropy loss, (3) Backprop: compute dW, db for each layer via chain rule, (4) Train on XOR 10000 steps, (5) Plot loss curve, (6) Verify gradients numerically (gradient check).","3 hrs"),
      d(2,"PyTorch Tensors & Autograd","Master PyTorch's automatic differentiation.",
        "PyTorch tensor: like NumPy array but GPU-capable. requires_grad=True enables gradient tracking. Autograd builds computation graph. loss.backward() computes all gradients. optimizer.step() updates weights. optimizer.zero_grad() clears old gradients. Essential loop: forward → loss → backward → step.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PyTorch+tensors+autograd+tutorial+beginners",label:"PyTorch Autograd Tutorial"},{type:"web",url:"https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html",label:"PyTorch Autograd Docs"}],
        "Create tensors, compute y = x² + 2x. Use .backward() to get dy/dx. Verify analytically.",
        "Autograd lab: (1) Tensor operations with grad tracking, (2) Manual gradient vs autograd — compare, (3) Implement linear regression in raw PyTorch (no nn.Module), (4) Train on Boston housing 100 epochs, (5) Plot gradient flow: track grad norm per layer.","2 hrs"),
      d(3,"PyTorch nn.Module & Training Loop","Build models with PyTorch's neural network API.",
        "nn.Module: base class for all models. Define architecture in __init__, forward pass in forward(). nn.Linear, nn.Conv2d, nn.LSTM built-in layers. DataLoader: batch data, shuffle, parallel loading. Training loop template: for epoch → for batch → predict → loss → backward → step → eval.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PyTorch+nn+Module+training+loop+complete+tutorial",label:"PyTorch nn.Module Tutorial"},{type:"web",url:"https://pytorch.org/tutorials/beginner/nn_tutorial.html",label:"PyTorch nn Tutorial"}],
        "Build MLP for MNIST: 784→256→128→10. Train 5 epochs. Achieve >97% accuracy.",
        "MNIST classifier: (1) Custom Dataset + DataLoader, (2) MLP: 784→512→ReLU→Dropout→256→ReLU→10, (3) Adam optimizer + cross-entropy, (4) Training loop with tqdm progress bar, (5) Validation accuracy per epoch, (6) Save best model checkpoint.","2.5 hrs"),
      d(4,"Convolutional Neural Networks (PyTorch)","Build CNNs for computer vision.",
        "CNN layers in PyTorch: nn.Conv2d(in_channels, out_channels, kernel_size), nn.MaxPool2d, nn.BatchNorm2d. Architecture design: deeper = more abstract features. Skip connections (ResNet idea): add input to output of block. torch.nn.functional for activation functions.",
        [{type:"yt",url:"https://youtube.com/results?search_query=CNN+PyTorch+CIFAR10+tutorial+complete",label:"CNN PyTorch Tutorial"},{type:"web",url:"https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html",label:"PyTorch CIFAR Tutorial"}],
        "Build CNN: Conv→BN→ReLU→Pool ×2 then FC. Train on CIFAR-10. Target: >80% accuracy.",
        "CIFAR-10 CNN: (1) Architecture with 3 conv blocks + 2 FC layers, (2) BatchNorm + Dropout, (3) Data augmentation: RandomCrop, HorizontalFlip, (4) Learning rate scheduler (StepLR), (5) Plot train/val curves, (6) Visualize 10 misclassified images with true/predicted labels.","2.5 hrs"),
      d(5,"Transfer Learning & Fine-Tuning (PyTorch)","Leverage pretrained models effectively.",
        "Torchvision models: ResNet, EfficientNet, ViT — all pretrained on ImageNet. Feature extraction: freeze all, replace final FC layer. Fine-tuning: unfreeze all with different learning rates (backbone: 1e-5, head: 1e-3). torch.optim.lr_scheduler for warm-up. torchvision.transforms for augmentation pipeline.",
        [{type:"yt",url:"https://youtube.com/results?search_query=transfer+learning+PyTorch+ResNet+fine+tuning+tutorial",label:"Transfer Learning PyTorch"},{type:"web",url:"https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",label:"PyTorch Transfer Learning"}],
        "Load ResNet18 pretrained. Freeze backbone. Replace final layer. Fine-tune on flowers dataset.",
        "Fine-tuning pipeline: (1) Load pretrained EfficientNet-B0, (2) Feature extraction phase: freeze backbone, train 5 epochs, (3) Fine-tuning phase: unfreeze all, lr=1e-5, train 10 epochs, (4) Compare accuracy: random init vs feature extract vs fine-tune, (5) Grad-CAM: visualize which regions model uses.","2.5 hrs"),
      d(6,"Sequence Models — LSTM & Transformer (PyTorch)","Build sequence models for NLP and time series.",
        "nn.LSTM(input_size, hidden_size, num_layers, batch_first). Pack padded sequences for variable length. Attention mechanism from scratch: Q, K, V matrices, scaled dot-product. nn.MultiheadAttention module. Positional encoding for transformers. Use for text generation, translation, forecasting.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PyTorch+LSTM+transformer+sequence+model+tutorial",label:"PyTorch Sequence Models"},{type:"web",url:"https://pytorch.org/tutorials/beginner/transformer_tutorial.html",label:"PyTorch Transformer Tutorial"}],
        "LSTM language model: character-level. Train on Shakespeare. Generate new text 200 chars.",
        "Sequence lab: (1) LSTM char-level model trained on text, (2) Generate samples at temperature 0.5 and 1.2, (3) Implement scaled dot-product attention from scratch, (4) nn.Transformer for next-token prediction, (5) Compare: LSTM vs Transformer perplexity.","3 hrs"),
      d(7,"Week 1 Project — Train a Custom Vision System","Build and evaluate a complete CV pipeline.",
        "A custom vision system from scratch tests all PyTorch skills. Collecting your own data, training, evaluating, and analyzing errors mimics real-world AI engineering work. This project demonstrates depth beyond tutorial-following.",
        [{type:"yt",url:"https://youtube.com/results?search_query=custom+image+classifier+PyTorch+dataset+tutorial",label:"Custom Vision System"},{type:"web",url:"https://pytorch.org/vision/stable/",label:"TorchVision Docs"}],
        "Collect 200+ images in 3 classes. Full pipeline: dataset → train → evaluate → error analysis.",
        "🚀 CUSTOM VISION PROJECT: (1) Collect 200+ images (3+ classes) — use web scraping or phone, (2) Custom Dataset class, augmentation pipeline, (3) Fine-tuned EfficientNet-B0, (4) Training with early stopping and LR scheduler, (5) Confusion matrix + per-class accuracy, (6) Grad-CAM on 5 predictions, (7) Export to ONNX, (8) GitHub + demo.","4 hrs"),
    ],project:{id:'aw1',title:'Custom Vision Classifier (End-to-End)',desc:'Build a complete custom image classification system from data collection to deployment. Collect 200+ images across 3 classes (your choice). Custom PyTorch Dataset with augmentation. Fine-tune EfficientNet-B0 with early stopping and CosineAnnealingLR. Evaluate with confusion matrix, per-class accuracy, and Grad-CAM on 5 misclassified images. Export to ONNX and verify outputs match PyTorch. Push to GitHub with a Colab demo notebook and README showing results.'}},
    {week:2,title:"MLOps, Production AI & Deployment",timeRange:"12–15 hrs",
     days:[
      d(8,"Distributed Training & GPU Optimization","Scale training to multiple GPUs.",
        "DataParallel: simple multi-GPU, split batch. DistributedDataParallel (DDP): better — each GPU has full model copy, gradient sync. torch.cuda: .to(device), .cuda(). Mixed precision: torch.autocast + GradScaler → 2× speed, half memory. torch.compile (PyTorch 2.0): kernel fusion speedup.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PyTorch+distributed+training+multi+GPU+tutorial",label:"Distributed Training Tutorial"},{type:"web",url:"https://pytorch.org/tutorials/intermediate/ddp_tutorial.html",label:"DDP Tutorial"}],
        "Profile model: identify bottleneck (data loading? forward? backward?). Add mixed precision.",
        "Optimization lab: (1) Profile training with torch.profiler, (2) Add mixed precision with autocast, (3) DataLoader num_workers optimization, (4) Gradient accumulation for large effective batch size, (5) Benchmark: baseline vs mixed precision vs compiled — report speedups.","2.5 hrs"),
      d(9,"Model Quantization & Pruning","Compress models for edge deployment.",
        "Quantization: convert float32 weights to int8 → 4× smaller, 2-3× faster inference. Post-training quantization: quick but some accuracy loss. Quantization-aware training: simulates int8 during training. Pruning: remove small weights (structured vs unstructured). Knowledge distillation: small student learns from large teacher.",
        [{type:"yt",url:"https://youtube.com/results?search_query=model+quantization+pruning+PyTorch+tutorial",label:"Quantization Tutorial"},{type:"web",url:"https://pytorch.org/docs/stable/quantization.html",label:"PyTorch Quantization"}],
        "Quantize ResNet18: compare size (MB), inference speed (ms), accuracy loss.",
        "Compression pipeline: (1) Baseline: ResNet18 size, speed, accuracy, (2) Post-training dynamic quantization, (3) Static quantization with calibration dataset, (4) Magnitude pruning: 30%, 50%, 70% sparsity, (5) Knowledge distillation: ResNet50 teacher → ResNet18 student, (6) Report: accuracy vs model size tradeoff.","2.5 hrs"),
      d(10,"TensorRT & ONNX Deployment","Deploy models for maximum inference speed.",
        "ONNX: open format to export models from any framework. torch.onnx.export() → .onnx file. ONNX Runtime: optimized inference engine. TensorRT: NVIDIA's inference optimizer — layer fusion, precision calibration, engine serialization. For production: 10-20× speedup over raw PyTorch CPU inference.",
        [{type:"yt",url:"https://youtube.com/results?search_query=ONNX+TensorRT+deployment+PyTorch+tutorial",label:"ONNX & TensorRT Tutorial"},{type:"web",url:"https://onnxruntime.ai/",label:"ONNX Runtime Docs"}],
        "Export trained model to ONNX. Run inference with ONNXRuntime. Compare latency vs PyTorch.",
        "Deployment pipeline: (1) Export PyTorch model to ONNX with dynamic axes, (2) Validate ONNX model outputs match PyTorch, (3) ONNXRuntime inference + benchmark (1000 runs), (4) ONNX simplifier for graph optimization, (5) Build inference class: load ONNX, preprocess, infer, postprocess, (6) REST API wrapper.","2 hrs"),
      d(11,"AWS SageMaker & Cloud ML","Deploy models on cloud infrastructure.",
        "SageMaker: managed ML platform. Training jobs: specify container, instance type, data location (S3). Model artifacts saved to S3. Endpoints: deploy model as REST API with auto-scaling. SageMaker Pipelines: end-to-end workflow automation. Spot instances: 70% cost reduction for training.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AWS+SageMaker+deploy+model+tutorial+beginners",label:"SageMaker Tutorial"},{type:"web",url:"https://docs.aws.amazon.com/sagemaker/latest/dg/getting-started.html",label:"SageMaker Getting Started"}],
        "Deploy sklearn model to SageMaker endpoint. Call endpoint from Python. Test latency.",
        "Cloud deployment: (1) Upload data to S3, (2) SageMaker training job with built-in sklearn container, (3) Deploy trained model to endpoint, (4) Test endpoint with boto3, (5) Set up auto-scaling policy, (6) Monitor with CloudWatch metrics, (7) Clean up to avoid charges — document costs.","2.5 hrs"),
      d(12,"Kubernetes & ML Serving","Orchestrate ML services at scale.",
        "Kubernetes: container orchestration — auto-restart, scaling, load balancing. Pod: smallest unit (1+ containers). Deployment: manages pods. Service: exposes pods to network. Horizontal Pod Autoscaler (HPA): scale based on CPU/memory. Helm: package manager for K8s. Triton Inference Server: NVIDIA's multi-model serving.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Kubernetes+ML+deployment+tutorial+minikube",label:"K8s ML Deployment"},{type:"web",url:"https://kubernetes.io/docs/tutorials/",label:"Kubernetes Tutorials"}],
        "minikube local cluster. Deployment YAML for FastAPI ML app. Service YAML. kubectl apply.",
        "K8s deployment: (1) Minikube cluster, (2) Deployment YAML for FastAPI ML app (3 replicas), (3) Service YAML (LoadBalancer), (4) ConfigMap for environment variables, (5) HPA: scale when CPU > 70%, (6) Simulate load with locust, (7) Watch pods auto-scale.","2.5 hrs"),
      d(13,"LLMOps — Managing Large Language Models","Operate LLMs in production.",
        "LLMOps: challenges unique to LLMs. Prompt versioning: track prompt changes like code. Evaluation: LLM-as-judge, BLEU/ROUGE/BERTScore. Guardrails: block harmful outputs (Guardrails AI, NeMo Guardrails). Cost optimization: caching identical queries, batching, choosing right model size. Observability: LangSmith, Arize Phoenix.",
        [{type:"yt",url:"https://youtube.com/results?search_query=LLMOps+production+LLM+monitoring+tutorial",label:"LLMOps Tutorial"},{type:"web",url:"https://www.langchain.com/langsmith",label:"LangSmith Docs"}],
        "Add LangSmith tracing to a LangChain app. View traces. Identify slow steps.",
        "LLMOps setup: (1) LangSmith integration: trace every LLM call, (2) Implement semantic caching with Redis, (3) Add NeMo guardrails for topic restrictions, (4) LLM-as-judge evaluation: GPT-4 rates outputs 1–5, (5) Cost tracking: log tokens per request, (6) Dashboard: p50/p95 latency, cost per 1K queries.","2.5 hrs"),
      d(14,"Week 2 Project — Production AI Microservice","Deploy a complete AI microservice to cloud.",
        "A production AI microservice with proper MLOps demonstrates senior-level skills. This project combines: optimized model, FastAPI serving, Docker, Kubernetes, monitoring — all deployed to cloud.",
        [{type:"yt",url:"https://youtube.com/results?search_query=production+AI+microservice+FastAPI+Kubernetes+deployment",label:"Production AI Service"},{type:"web",url:"https://www.mlops.community/",label:"MLOps Community"}],
        "Architecture: quantized model → FastAPI → Docker → K8s → cloud + monitoring.",
        "🚀 PRODUCTION MICROSERVICE: (1) Quantized ONNX model, (2) FastAPI: /predict + /health + /metrics endpoints, (3) Redis caching for identical inputs, (4) Docker multi-stage build (final image <500MB), (5) K8s deployment with HPA, (6) Prometheus metrics + Grafana dashboard, (7) Load test with locust: 100 concurrent users.","4 hrs"),
    ],project:{id:'aw2',title:'Production AI Microservice (K8s + Monitoring)',desc:'Deploy a complete production AI microservice. Take a trained ONNX model and build: FastAPI /predict + /health + /metrics endpoints, Redis input caching, multi-stage Docker build (final image <500MB), K8s deployment.yaml (3 replicas) + HPA (scale when CPU>70%), Prometheus /metrics endpoint + Grafana dashboard JSON, Locust load test at 100 concurrent users. Document: p50/p95 latency, throughput (req/s), error rate. Push all infra config to GitHub.'}},
    {week:3,title:"Transformers Deep Dive",timeRange:"14–16 hrs",
     days:[
      d(15,"Transformer Architecture from Scratch","Build a transformer in pure PyTorch.",
        "Implement every component: MultiHeadAttention (split heads, scaled dot-product, concat), PositionalEncoding (sin/cos), TransformerBlock (attention + FFN + layer norm), full Encoder. Understanding the math deeply — Q, K, V projections, attention scores = QK^T/sqrt(d_k), softmax → weighted sum of V.",
        [{type:"yt",url:"https://youtube.com/results?search_query=transformer+from+scratch+PyTorch+attention+tutorial",label:"Transformer from Scratch"},{type:"web",url:"https://nlp.seas.harvard.edu/annotated-transformer/",label:"Annotated Transformer"}],
        "Implement MultiHeadAttention. Verify: for identical Q and K, attention should be near-uniform.",
        "Build it: (1) ScaledDotProductAttention with masking, (2) MultiHeadAttention (8 heads, d_model=512), (3) PositionalEncoding (visualize the sin patterns), (4) TransformerEncoderLayer, (5) Full Encoder (6 layers), (6) Train on simple toy task (sorting sequences) — verify it learns.","3 hrs"),
      d(16,"BERT Fine-Tuning for Production","Fine-tune and optimize BERT for deployment.",
        "BERT fine-tuning: add task-specific head, fine-tune all weights with small lr (~2e-5). Tokenization: [CLS] token captures sentence representation. Dynamic padding + attention masks. LoRA (Low-Rank Adaptation): freeze base, add low-rank matrices — 10× fewer trainable params. PEFT library wraps any HF model.",
        [{type:"yt",url:"https://youtube.com/results?search_query=BERT+fine+tuning+LoRA+PEFT+Hugging+Face+tutorial",label:"BERT + LoRA Tutorial"},{type:"web",url:"https://huggingface.co/docs/peft/index",label:"PEFT Docs"}],
        "Fine-tune distilbert on SST-2. Then apply LoRA — compare: params, memory, speed, accuracy.",
        "BERT production: (1) Full fine-tune distilbert on custom dataset, (2) Apply LoRA with r=16, alpha=32, (3) Compare: full fine-tune vs LoRA — trainable params, GPU memory, accuracy, (4) Quantize fine-tuned model to int8, (5) Benchmark: throughput (samples/sec) for all variants.","2.5 hrs"),
      d(17,"GPT-2 Fine-Tuning & Text Generation","Fine-tune a GPT model for custom text generation.",
        "GPT-2 causal LM: predicts next token. Fine-tuning adapts the distribution to your domain. DataCollatorForLanguageModeling handles token shifting automatically. Generation params: do_sample, temperature, top_k, top_p, repetition_penalty, num_return_sequences. Avoid repetition with repetition_penalty > 1.0.",
        [{type:"yt",url:"https://youtube.com/results?search_query=GPT2+fine+tuning+custom+text+generation+tutorial",label:"GPT-2 Fine-Tuning Tutorial"},{type:"web",url:"https://huggingface.co/docs/transformers/model_doc/gpt2",label:"GPT-2 Docs"}],
        "Fine-tune gpt2 on a text corpus (song lyrics, code, papers). Generate 10 samples.",
        "GPT-2 fine-tune: (1) Prepare domain dataset (min 1MB text), (2) Tokenize with sliding window, (3) Fine-tune 3 epochs — log train perplexity, (4) Generate with: greedy, temperature=0.7, nucleus top_p=0.9, (5) Compute test perplexity: fine-tuned vs base gpt2, (6) LoRA fine-tuning of gpt2-medium.","2.5 hrs"),
      d(18,"Vision Transformers (ViT)","Apply transformers to computer vision.",
        "ViT: split image into 16×16 patches → linear embedding → add position embeddings → transformer encoder → classification head. No convolutions needed. ViT outperforms CNNs at scale. DeiT: data-efficient ViT training with distillation token. CLIP: joint image-text training — zero-shot classification.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Vision+Transformer+ViT+tutorial+PyTorch",label:"ViT Tutorial"},{type:"web",url:"https://huggingface.co/docs/transformers/model_doc/vit",label:"ViT Docs"}],
        "Load ViT-B/16 pretrained. Fine-tune on CIFAR-10. Compare vs ResNet-50 accuracy.",
        "ViT experiments: (1) Fine-tune vit-base-patch16-224 on custom dataset, (2) Visualize attention maps: which patches does model attend to? (3) Compare: ViT vs EfficientNet on same task — accuracy + speed, (4) CLIP zero-shot: classify images without fine-tuning, just text prompts.","2.5 hrs"),
      d(19,"Multimodal AI — Image + Text","Build systems that understand multiple modalities.",
        "Multimodal models process both images and text jointly. CLIP: shared embedding space for images and text. LLaVA: visual instruction tuning — connect vision encoder to LLM. GPT-4V / Claude Vision: send base64 images in API. Multimodal RAG: index images alongside text, retrieve by visual or text query.",
        [{type:"yt",url:"https://youtube.com/results?search_query=multimodal+AI+CLIP+LLaVA+vision+language+tutorial",label:"Multimodal AI Tutorial"},{type:"web",url:"https://openai.com/research/gpt-4v-system-card",label:"GPT-4V System Card"}],
        "CLIP: given 10 images and 10 captions, match each image to its caption using embeddings.",
        "Multimodal system: (1) CLIP image-text retrieval: search image library by text query, (2) Zero-shot image classification with custom text labels, (3) GPT-4V / Claude API: send image, ask questions, (4) Multimodal RAG: combine text chunks + image descriptions in one index, (5) Demo: 'Find images showing a red car.'","2.5 hrs"),
      d(20,"Efficient Fine-Tuning — QLoRA & RLHF","Fine-tune large models efficiently.",
        "QLoRA: quantize base model to 4-bit (NF4) + LoRA adapters. Enables fine-tuning 70B models on single GPU. bitsandbytes: handles 4-bit quantization. trl library: SFTTrainer for instruction fine-tuning. RLHF: (1) SFT on human demonstrations, (2) Train reward model, (3) PPO to optimize policy. DPO: simpler alternative to RLHF.",
        [{type:"yt",url:"https://youtube.com/results?search_query=QLoRA+fine+tuning+LLM+bitsandbytes+tutorial",label:"QLoRA Tutorial"},{type:"web",url:"https://huggingface.co/blog/4bit-transformers-bitsandbytes",label:"4-bit Quantization Blog"}],
        "QLoRA fine-tune Mistral-7B on instruction dataset. Generate 10 responses. Compare to base.",
        "QLoRA pipeline: (1) Load Mistral-7B or Llama-2-7B in 4-bit with bitsandbytes, (2) Add LoRA adapters (r=16), (3) SFTTrainer on Alpaca or custom instruction dataset, (4) Train 500 steps, (5) Merge adapters back, (6) Compare: base model vs fine-tuned on 10 instruction prompts.","3 hrs"),
      d(21,"Week 3 Project — Custom LLM Fine-Tune","Create and deploy a domain-specific language model.",
        "A domain-specific LLM demonstrates advanced AI engineering. Fine-tuning a 7B model with QLoRA, evaluating it properly, and deploying it as an API is a rare and impressive portfolio project.",
        [{type:"yt",url:"https://youtube.com/results?search_query=fine+tune+LLM+deploy+API+tutorial",label:"LLM Fine-Tune & Deploy"},{type:"web",url:"https://huggingface.co/spaces",label:"HuggingFace Spaces"}],
        "Domain: pick one (medical Q&A, code generation, legal, customer service). Collect 500+ examples.",
        "🚀 CUSTOM LLM: (1) Curate 500–1000 instruction pairs in your domain, (2) QLoRA fine-tune 7B model, (3) Evaluate: ROUGE, BERTScore, LLM-as-judge, (4) vLLM or text-generation-inference serving, (5) FastAPI wrapper with streaming support, (6) HuggingFace Spaces demo, (7) Blog post explaining approach.","4 hrs"),
    ],project:{id:'aw3',title:'Fine-Tuned Domain LLM with Streaming API',desc:'Fine-tune an open-source LLM (Mistral-7B or Llama-3-8B) on a domain-specific instruction dataset you curate (500-1000 pairs). Use QLoRA (4-bit) for efficient fine-tuning on a free Colab A100. Evaluate with ROUGE-L, BERTScore, and LLM-as-judge (Claude or GPT-4 rates outputs 1-5). Serve with vLLM: FastAPI streaming endpoint, SSE support. Deploy a HuggingFace Spaces Gradio demo. Write a technical blog post explaining your data curation, training choices, and evaluation results.'}},
    {week:4,title:"AI Agents & Autonomous Systems",timeRange:"12–15 hrs",
     days:[
      d(22,"LangChain Chains & Memory","Build complex LLM pipelines.",
        "LangChain: composable building blocks for LLM apps. LCEL (LangChain Expression Language): chain = prompt | llm | parser. Memory types: ConversationBufferMemory (full history), ConversationSummaryMemory (summarized), VectorStoreRetrieverMemory (semantic). Document loaders: PDF, web, GitHub, CSV. Text splitters: RecursiveCharacterTextSplitter.",
        [{type:"yt",url:"https://youtube.com/results?search_query=LangChain+LCEL+chains+memory+tutorial+2024",label:"LangChain Tutorial"},{type:"web",url:"https://python.langchain.com/docs/expression_language/",label:"LCEL Docs"}],
        "Build LCEL chain: retriever | prompt | gpt-3.5 | StrOutputParser. Add conversation memory.",
        "LangChain mastery: (1) LCEL chain with custom prompt template, (2) ConversationBufferWindowMemory (last 5 turns), (3) ConversationSummaryMemory for long conversations, (4) Streaming output with callbacks, (5) Chain debugging with LangSmith traces.","2.5 hrs"),
      d(23,"AI Agents — Tool Use & ReAct","Build agents that use tools autonomously.",
        "ReAct agent: Reason + Act loop. Agent decides: (1) Think about next step, (2) Choose tool, (3) Observe result, (4) Repeat until done. Tools: Python REPL, web search, calculator, database. LangChain AgentExecutor manages the loop. Function calling (OpenAI/Anthropic): let model call typed functions.",
        [{type:"yt",url:"https://youtube.com/results?search_query=LangChain+AI+agent+tools+ReAct+tutorial",label:"AI Agent Tutorial"},{type:"web",url:"https://python.langchain.com/docs/modules/agents/",label:"LangChain Agents"}],
        "Build ReAct agent with: web search + Python REPL + calculator tools. Ask it a multi-step question.",
        "Agent builder: (1) Define 3 custom tools (web_search, code_executor, file_reader), (2) ReAct agent with tool selection, (3) Streaming intermediate steps to UI, (4) Memory: agent remembers previous conversations, (5) Error handling: agent retries on tool failure, (6) Log all tool calls with timestamps.","2.5 hrs"),
      d(24,"LangGraph — Stateful Agent Workflows","Build complex multi-step agent workflows.",
        "LangGraph: graph-based agent orchestration. Nodes: functions/LLM calls. Edges: conditional routing. StateGraph: persists state between nodes. Checkpointing: resume interrupted workflows. Human-in-the-loop: pause graph for human approval. Cycles: agent loops with termination condition. Better than chains for complex workflows.",
        [{type:"yt",url:"https://youtube.com/results?search_query=LangGraph+tutorial+stateful+agent+workflow",label:"LangGraph Tutorial"},{type:"web",url:"https://langchain-ai.github.io/langgraph/",label:"LangGraph Docs"}],
        "Build research agent: node1=search → node2=summarize → node3=write → conditional: need more info?",
        "Research agent: (1) StateGraph with: planner → researcher → writer → reviewer nodes, (2) Conditional edges: reviewer says 'revise' → loop back to writer, (3) Checkpointing: save state to SQLite, (4) Human-in-the-loop: pause before final output, (5) Streaming: show intermediate steps in Streamlit.","3 hrs"),
      d(25,"Multi-Agent Systems","Coordinate multiple AI agents.",
        "Multi-agent: specialized agents collaborate on complex tasks. Patterns: supervisor (one agent delegates to others), peer-to-peer (agents communicate directly), hierarchical. CrewAI: role-based agents with goals and backstories. AutoGen: conversation-based multi-agent. Key challenge: agent communication protocol and avoiding infinite loops.",
        [{type:"yt",url:"https://youtube.com/results?search_query=multi+agent+CrewAI+AutoGen+tutorial",label:"Multi-Agent Tutorial"},{type:"web",url:"https://docs.crewai.com/",label:"CrewAI Docs"}],
        "CrewAI: researcher agent + writer agent + editor agent. Task: write a technical blog post.",
        "Multi-agent crew: (1) Researcher: searches web, summarizes sources, (2) Analyst: identifies key insights, (3) Writer: drafts content from insights, (4) Editor: reviews and improves, (5) Orchestrator: coordinates the flow, (6) Task: produce a 500-word technical article on a topic. Full pipeline runs autonomously.","2.5 hrs"),
      d(26,"AI Safety & Guardrails","Build safe, reliable AI systems.",
        "AI safety in production: prompt injection attacks, jailbreaks, PII leakage, hallucinations, harmful content generation. Guardrails AI: validate input/output with validators. NeMo Guardrails: colang language for conversation rails. Content moderation: OpenAI Moderation API, custom classifiers. Hallucination detection: SelfCheckGPT, Ragas faithfulness metric.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+guardrails+safety+LLM+production+tutorial",label:"AI Safety Tutorial"},{type:"web",url:"https://www.guardrailsai.com/docs",label:"Guardrails AI Docs"}],
        "Add Guardrails: input validator (no PII, no injection), output validator (no hallucination indicators).",
        "Safety layer: (1) Detect and redact PII with Presidio, (2) Prompt injection detection classifier, (3) Output: topic adherence check (should only answer about X), (4) Hallucination check: compare output to retrieved sources, (5) NeMo Guardrails: restrict topics, (6) Red-team your own app: 10 adversarial prompts.","2.5 hrs"),
      d(27,"Voice AI & Real-Time Inference","Build voice-enabled AI applications.",
        "Whisper: OpenAI's speech recognition model. whisper.transcribe() works on audio files. Real-time: chunk audio stream, transcribe each chunk. TTS (Text-to-Speech): OpenAI TTS API, ElevenLabs, Coqui TTS. Voice pipeline: microphone → VAD (voice activity detection) → Whisper → LLM → TTS → speaker. Latency budget: <500ms for natural conversation.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Whisper+TTS+voice+AI+real+time+tutorial+python",label:"Voice AI Tutorial"},{type:"web",url:"https://openai.com/research/whisper",label:"Whisper Paper"}],
        "Transcribe a 1-min audio file with Whisper. Then synthesize a response with TTS.",
        "Voice assistant: (1) Whisper transcription of audio file (try multiple model sizes), (2) Pipe transcript to LLM for response, (3) TTS response with Coqui or OpenAI TTS, (4) Real-time: pyaudio microphone stream → chunk → transcribe → respond, (5) Measure end-to-end latency.","2.5 hrs"),
      d(28,"Week 4 Project — Autonomous AI Agent","Build a fully autonomous AI agent.",
        "An autonomous agent that can research, plan, and execute multi-step tasks is the frontier of AI engineering. This project demonstrates mastery of agents, tools, safety, and deployment — top 1% portfolio material.",
        [{type:"yt",url:"https://youtube.com/results?search_query=autonomous+AI+agent+project+LangGraph+tutorial",label:"Autonomous Agent Project"},{type:"web",url:"https://langchain-ai.github.io/langgraph/",label:"LangGraph Docs"}],
        "Design agent capabilities: what tools? what tasks? what safety constraints? Then build.",
        "🚀 AUTONOMOUS AGENT: Build one of: (A) Research agent: given topic → web search → analyze → write report → cite sources, (B) Code agent: given task description → write code → execute → debug → deliver, (C) Data analysis agent: given CSV → explore → insights → visualizations → report. Requirements: LangGraph + 3+ tools + guardrails + deployed UI.","4 hrs"),
    ],project:{id:'aw4',title:'Multi-Agent Research System',desc:'Build a LangGraph multi-agent research assistant. Agents: Planner (decomposes query into sub-tasks), Searcher (calls Tavily/Serper web search API), Synthesizer (merges results into coherent answer), Critic (scores output quality 1-5 and requests revision if <4). Use Claude or GPT-4 as backbone. Add ConversationSummaryMemory for multi-turn context. Implement guardrails: block off-topic queries, detect hallucinations. Deploy as a Streamlit app. Log all agent steps with LangSmith.'}},
    {week:5,title:"Computer Vision Production Systems",timeRange:"12–15 hrs",
     days:[
      d(29,"Video Understanding & Action Recognition","Process video data with AI.",
        "Video: sequence of frames + temporal relationships. 3D CNNs: Conv3D captures spatiotemporal features. Two-stream networks: spatial (appearance) + temporal (optical flow). Video transformers: ViViT. Action recognition datasets: Kinetics-400, UCF-101. VideoMAE: masked autoencoding for video pretraining.",
        [{type:"yt",url:"https://youtube.com/results?search_query=video+action+recognition+deep+learning+tutorial",label:"Video Understanding Tutorial"},{type:"web",url:"https://huggingface.co/docs/transformers/model_doc/vivit",label:"ViViT Docs"}],
        "Extract frames from 10-second video. Run VideoMAE for action classification. Top-3 predictions.",
        "Video AI: (1) Extract frames at 5fps from video, (2) Run image classifier per-frame, (3) Load VideoMAE for clip-level action recognition, (4) Compare: per-frame vs clip-level accuracy, (5) Sliding window over long video: detect when action occurs, (6) Visualize with bounding boxes on output frames.","2.5 hrs"),
      d(30,"3D Point Cloud Processing","Process 3D sensor data with deep learning.",
        "Point cloud: set of 3D points (x, y, z) from LiDAR/depth cameras. PointNet: first DL method for point clouds — permutation invariant. PointNet++: hierarchical feature learning. Open3D: 3D data processing library. Applications: autonomous driving, robotics, AR/VR. KITTI dataset: autonomous driving benchmark.",
        [{type:"yt",url:"https://youtube.com/results?search_query=point+cloud+deep+learning+Open3D+tutorial",label:"Point Cloud Tutorial"},{type:"web",url:"http://www.open3d.org/docs/latest/",label:"Open3D Docs"}],
        "Load KITTI point cloud with Open3D. Visualize. Segment ground plane. Cluster objects.",
        "3D vision: (1) Load PLY/PCD file with Open3D, (2) Voxel downsampling, (3) RANSAC ground plane segmentation, (4) DBSCAN object clustering, (5) Bounding box around each cluster, (6) (Optional) PointNet classification on ModelNet40 dataset.","2.5 hrs"),
      d(31,"Generative Models — Stable Diffusion Deep Dive","Master diffusion models in depth.",
        "Diffusion forward: q(x_t|x_{t-1}) = add Gaussian noise. Reverse: p_θ(x_{t-1}|x_t) = learned denoiser. U-Net architecture predicts noise. CLIP text encoder conditions generation. CFG (classifier-free guidance): balance adherence vs diversity. ControlNet: condition on depth, pose, edges. Inpainting, img2img, upscaling variants.",
        [{type:"yt",url:"https://youtube.com/results?search_query=stable+diffusion+deep+dive+ControlNet+tutorial",label:"Stable Diffusion Deep Dive"},{type:"web",url:"https://huggingface.co/docs/diffusers/using-diffusers/controlnet",label:"ControlNet Docs"}],
        "Generate: text2img, img2img, inpainting. Try ControlNet with depth map condition.",
        "Diffusion lab: (1) Text-to-image with guidance_scale 3, 7, 12 comparison, (2) Img2img: transform photo to painting style, (3) Inpainting: remove object from image, (4) ControlNet: pose-conditioned generation, (5) Upscaling with ESRGAN, (6) Generate dataset of 100 images for training a classifier.","2.5 hrs"),
      d(32,"Real-Time Computer Vision","Deploy CV at 30+ FPS on edge.",
        "Real-time constraints: inference must complete within frame time (33ms for 30fps). Optimization: model pruning, quantization, input resolution reduction. ONNX Runtime: CPU-optimized inference. TensorRT: GPU-optimized. Edge devices: Raspberry Pi (tflite), Jetson Nano (TensorRT), mobile (CoreML, TFLite). Batching hurts latency, helps throughput.",
        [{type:"yt",url:"https://youtube.com/results?search_query=real+time+object+detection+OpenCV+YOLO+tutorial",label:"Real-Time CV Tutorial"},{type:"web",url:"https://opencv.org/",label:"OpenCV Docs"}],
        "YOLOv8n on webcam stream. Measure FPS. Optimize to >30 FPS with quantization.",
        "Real-time system: (1) YOLOv8n on webcam or video file, (2) Measure: FPS, latency per frame, (3) Export to ONNX + ONNXRuntime inference, (4) Quantize to INT8, (5) Resolution sweep: 320px vs 640px vs 1280px — FPS vs accuracy tradeoff, (6) Final: annotated video at >30 FPS.","2.5 hrs"),
      d(33,"Medical AI & Specialized Domains","Apply AI to high-stakes domains.",
        "Medical AI: higher stakes — errors cause harm. Regulatory: FDA clearance for clinical use. Datasets: NIH ChestX-ray14, MIMIC-CXR (pneumonia detection), ISIC (skin lesion). Explainability mandatory: Grad-CAM on X-rays. Class imbalance extreme (1% positive). Performance: sensitivity vs specificity tradeoff. Privacy: HIPAA, federated learning.",
        [{type:"yt",url:"https://youtube.com/results?search_query=medical+image+classification+deep+learning+tutorial",label:"Medical AI Tutorial"},{type:"web",url:"https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia",label:"Chest X-Ray Dataset"}],
        "Train CNN on chest X-ray (pneumonia dataset). Sensitivity must be >90%. Explain with Grad-CAM.",
        "Medical classifier: (1) Chest X-ray pneumonia classification, (2) Class imbalance handling (weighted loss), (3) Optimize for sensitivity: tune threshold, (4) Grad-CAM on 5 predictions — verify model looks at lungs, (5) Report: sensitivity, specificity, AUC with 95% CI, (6) Discuss: what would be needed for clinical deployment?","2.5 hrs"),
      d(34,"Week 5 Project — Production Vision System","Deploy a real-time CV system.",
        "A production-grade CV system combining detection, tracking, and real-time processing is a showcase of advanced engineering. This is the type of project that gets ML engineers hired at top companies.",
        [{type:"yt",url:"https://youtube.com/results?search_query=production+computer+vision+system+deployment+tutorial",label:"Production CV System"},{type:"web",url:"https://docs.ultralytics.com/modes/track/",label:"YOLO Tracking"}],
        "System design: input → detect → track → classify action → log → dashboard.",
        "🚀 CV SYSTEM: Build a people/object analytics system: (1) YOLO detection + ByteTrack object tracking, (2) Action recognition per tracked person, (3) Count: entries/exits, dwell time, crowd density, (4) FastAPI streaming endpoint (MJPEG), (5) Dashboard: live stats with Streamlit, (6) Docker + cloud deployment, (7) Privacy: blur faces before storing.","4 hrs"),
    ],project:{id:'aw5',title:'Real-Time Video Analytics Platform',desc:'Build a production-grade video analytics system. Pipeline: YOLOv8 detection → ByteTracker multi-object tracking → zone-based counting (entry/exit/dwell time) → anomaly alerts (crowd density threshold). Backend: FastAPI with MJPEG streaming endpoint + WebSocket for live stats. Frontend: Streamlit dashboard showing live feed + stats charts. Privacy: blur all detected faces with OpenCV before any storage. Dockerize with docker-compose. Deploy to a cloud VM. GitHub repo with architecture diagram.'}},
    {week:6,title:"Data Engineering & Large Scale ML",timeRange:"12–14 hrs",
     days:[
      d(35,"Apache Spark for Big Data ML","Process terabyte-scale data.",
        "Spark: distributed computing framework. RDDs → DataFrames (like pandas but distributed). PySpark: Python API. Spark SQL: SQL queries on DataFrames. MLlib: distributed ML. Transformations (lazy): map, filter, join. Actions (execute): collect, count, save. partitioning affects performance. Works on YARN, Kubernetes, standalone.",
        [{type:"yt",url:"https://youtube.com/results?search_query=PySpark+machine+learning+tutorial+beginners",label:"PySpark ML Tutorial"},{type:"web",url:"https://spark.apache.org/docs/latest/api/python/",label:"PySpark Docs"}],
        "PySpark DataFrame: load 1M-row CSV, group by, aggregate, filter. Join two datasets.",
        "PySpark lab: (1) Local Spark session with 4 cores, (2) Load large CSV as DataFrame, (3) Spark SQL: top 10 analysis query, (4) MLlib: distributed RandomForest on large dataset, (5) Pipeline: StringIndexer + VectorAssembler + classifier, (6) Compare: PySpark vs pandas execution time.","2.5 hrs"),
      d(36,"Apache Kafka & Streaming ML","Process real-time data streams.",
        "Kafka: distributed message queue. Producers publish to topics. Consumers read from topics. Consumer groups enable parallel processing. Kafka Streams for real-time transformations. ML inference on streaming data: consume message → preprocess → predict → publish result. Docker-compose for local Kafka + Zookeeper.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Apache+Kafka+Python+tutorial+streaming+ML",label:"Kafka Tutorial"},{type:"web",url:"https://kafka-python.readthedocs.io/",label:"kafka-python Docs"}],
        "Producer: simulate sensor data stream (1000 msgs/sec). Consumer: predict anomaly, publish alert.",
        "Streaming pipeline: (1) Docker-compose: Kafka + Zookeeper, (2) Producer: synthetic IoT sensor data, (3) Consumer: load trained model, predict per message, (4) Publish anomalies to 'alerts' topic, (5) Dashboard: live predictions with Streamlit + auto-refresh, (6) Measure: messages per second throughput.","2.5 hrs"),
      d(37,"Data Pipelines with Airflow","Orchestrate complex ML workflows.",
        "Airflow: workflow orchestration — schedule and monitor DAGs (Directed Acyclic Graphs). Tasks: Python operators, Bash operators, sensors (wait for data). Dependencies define execution order. XComs: pass data between tasks. Retry logic, SLAs, alerting. Common pattern: extract → transform → validate → train → evaluate → deploy.",
        [{type:"yt",url:"https://youtube.com/results?search_query=Apache+Airflow+ML+pipeline+tutorial+python",label:"Airflow Tutorial"},{type:"web",url:"https://airflow.apache.org/docs/apache-airflow/stable/tutorial/",label:"Airflow Tutorial"}],
        "Build Airflow DAG: download data → validate → train model → evaluate → conditional deploy.",
        "ML DAG: (1) Task 1: download/extract data, (2) Task 2: data validation (schema, missing values), (3) Task 3: feature engineering, (4) Task 4: train model + log to MLflow, (5) Task 5: evaluate — branch: if accuracy > threshold → deploy, else → alert, (6) Schedule: daily at midnight.","2.5 hrs"),
      d(38,"Feature Stores & Data Versioning","Manage ML features and datasets at scale.",
        "Feature store: centralized repository for ML features. Offline store: historical features for training (Parquet/Delta Lake). Online store (Redis/DynamoDB): low-latency lookup for serving. Point-in-time correctness: prevent feature leakage. Feast: open-source feature store. DVC: Git for data — version datasets and models.",
        [{type:"yt",url:"https://youtube.com/results?search_query=feature+store+Feast+DVC+data+versioning+tutorial",label:"Feature Store Tutorial"},{type:"web",url:"https://docs.feast.dev/",label:"Feast Docs"}],
        "DVC: track dataset version, push to remote. Feast: define feature view, materialize, serve online.",
        "Data management: (1) DVC init, track dataset CSV, push to S3/GDrive remote, (2) Versioned experiment: change dataset → new DVC commit → retrain → compare, (3) Feast: define FeatureView for user features, (4) Materialize to online store, (5) Serve features online at inference time.","2 hrs"),
      d(39,"Federated Learning & Privacy-Preserving ML","Train models without sharing sensitive data.",
        "Federated learning: model trains on local devices — only gradients (not data) are shared. Server aggregates gradients (FedAvg). Differential privacy: add calibrated noise to gradients → formal privacy guarantee. PySyft: federated learning framework. Use cases: healthcare, mobile keyboards, financial fraud without data sharing.",
        [{type:"yt",url:"https://youtube.com/results?search_query=federated+learning+differential+privacy+tutorial+python",label:"Federated Learning Tutorial"},{type:"web",url:"https://flower.ai/docs/framework/tutorial-get-started-with-flower-pytorch.html",label:"Flower Federated Learning"}],
        "Flower: simulate 5 clients training on different data shards. FedAvg aggregation. Compare to centralized.",
        "Federated setup: (1) Split MNIST into 5 clients (non-IID distribution), (2) Flower framework: client strategy + server strategy, (3) FedAvg for 10 rounds, (4) Compare: federated vs centralized accuracy, (5) Add DP-SGD (differential privacy): measure accuracy degradation vs privacy budget ε.","2.5 hrs"),
      d(40,"Week 6 Project — End-to-End Data Pipeline","Build a production ML data pipeline.",
        "A production data pipeline handles ingestion, processing, feature engineering, and model retraining automatically. This demonstrates data engineering skills that are increasingly expected from senior ML engineers.",
        [{type:"yt",url:"https://youtube.com/results?search_query=end+to+end+ML+data+pipeline+Airflow+Kafka+tutorial",label:"E2E Pipeline Tutorial"},{type:"web",url:"https://www.databricks.com/",label:"Databricks"}],
        "Design: data source → Kafka stream → Spark processing → Feature Store → model training → serving.",
        "🚀 DATA PIPELINE: (1) Kafka producer: real-time synthetic event stream, (2) Spark consumer: aggregate and feature engineer, (3) Airflow DAG: nightly model retraining, (4) MLflow: track all training runs, (5) Feature Store: online features served at inference, (6) Monitoring: data drift alerts, (7) Full architecture diagram in README.","4 hrs"),
    ],project:{id:'aw6',title:'Distributed ML Data Pipeline',desc:'Build an end-to-end distributed ML data pipeline. Components: (1) Kafka producer emitting synthetic user-event stream, (2) PySpark Structured Streaming consumer — aggregate events + feature engineering, (3) Airflow DAG: nightly ingest → clean → train → evaluate → register, (4) MLflow tracking for all runs + Model Registry, (5) Feast feature store — online features served at inference time, (6) Evidently AI: daily data drift report, email alert if PSI > 0.2. Full architecture diagram in README. Everything in Docker Compose.'}},
    {week:7,title:"Advanced Research Topics",timeRange:"12–14 hrs",
     days:[
      d(41,"Paper Reading & Reproduction","Read and reproduce ML research papers.",
        "Reading research papers: abstract → introduction → results → methodology → related work. ArXiv: preprint server. Papers With Code: implementations. Key papers: Attention Is All You Need, BERT, GPT, ResNet, ViT, CLIP, DALL-E, AlphaFold. Reproducing results builds deep understanding and is a strong portfolio signal.",
        [{type:"yt",url:"https://youtube.com/results?search_query=how+to+read+ML+research+papers+tutorial",label:"Paper Reading Guide"},{type:"web",url:"https://paperswithcode.com/",label:"Papers With Code"}],
        "Read LoRA paper. Implement LoRA from scratch (no PEFT library). Verify it matches PEFT outputs.",
        "Paper reproduction: (1) Choose one: LoRA, MoE, Flash Attention, or DPO, (2) Read paper carefully — write 1-page summary, (3) Implement core algorithm from scratch in PyTorch, (4) Verify numerical match with reference implementation, (5) Write blog post explaining the paper in plain English.","3 hrs"),
      d(42,"Graph Neural Networks","Apply DL to graph-structured data.",
        "Graph: nodes + edges. GNN: update node representation by aggregating neighbor features. GCN (Graph Convolutional Network): spectral convolution. GraphSAGE: sampling-based inductive learning. GAT: attention over neighbors. PyTorch Geometric (PyG): standard GNN library. Applications: social networks, molecules, knowledge graphs, recommendation.",
        [{type:"yt",url:"https://youtube.com/results?search_query=graph+neural+network+GNN+PyTorch+Geometric+tutorial",label:"GNN Tutorial"},{type:"web",url:"https://pytorch-geometric.readthedocs.io/",label:"PyTorch Geometric Docs"}],
        "PyG: load Cora citation network. Train GCN for node classification. Visualize embeddings with t-SNE.",
        "GNN lab: (1) GCN on Cora dataset: node classification accuracy, (2) GAT: attention-based variant — compare, (3) Graph-level classification on molecular dataset (MUTAG), (4) Link prediction: predict missing edges, (5) Visualize learned node embeddings with t-SNE — verify clusters correspond to classes.","2.5 hrs"),
      d(43,"Neural Architecture Search (NAS)","Automate model architecture design.",
        "NAS: automatically find optimal architecture. Methods: (1) Random search baseline, (2) Evolutionary algorithms, (3) Differentiable NAS (DARTS): relax discrete choices to continuous weights. Optuna: efficient hyperparameter and architecture search. AutoML: AutoKeras, Auto-sklearn. EfficientNet was found via NAS.",
        [{type:"yt",url:"https://youtube.com/results?search_query=neural+architecture+search+NAS+Optuna+tutorial",label:"NAS Tutorial"},{type:"web",url:"https://optuna.org/",label:"Optuna Docs"}],
        "Optuna: search for best CNN architecture (num_layers, filters, kernel_size) on CIFAR-10.",
        "Architecture search: (1) Define search space: 1-4 conv blocks, 32-256 filters, 0-0.5 dropout, (2) Optuna: 50 trials, pruning with MedianPruner, (3) Visualize: parallel coordinate plot of hyperparameters, (4) Best architecture vs baseline: accuracy + params + FLOPs, (5) DARTS implementation on toy task.","2.5 hrs"),
      d(44,"Self-Supervised & Contrastive Learning","Learn representations without labels.",
        "Self-supervised: create labels from data itself. Contrastive learning: pull same-class samples together, push different-class apart. SimCLR: augment image twice → maximize agreement. MoCo: momentum contrast with queue. BYOL: no negative pairs needed. MAE (Masked Autoencoders): mask 75% of image patches → reconstruct. Pre-train then fine-tune with few labels.",
        [{type:"yt",url:"https://youtube.com/results?search_query=self+supervised+contrastive+learning+SimCLR+tutorial",label:"Self-Supervised Learning Tutorial"},{type:"web",url:"https://github.com/google-research/simclr",label:"SimCLR GitHub"}],
        "SimCLR on CIFAR-10: pre-train encoder without labels. Fine-tune with 1%, 10%, 100% labels.",
        "Self-supervised lab: (1) SimCLR pretraining: 2 augmented views + NT-Xent loss, (2) Extract representations: t-SNE to verify clustering, (3) Linear evaluation: freeze encoder, train linear head, (4) Few-shot: fine-tune with only 10 labels per class, (5) Compare: supervised vs self-supervised at 10%/100% label fraction.","2.5 hrs"),
      d(45,"Causal ML & Counterfactual Reasoning","Go beyond correlation to causation.",
        "Correlation ≠ causation. Causal graph: variables as nodes, causal relationships as edges. do-calculus: Pearl's framework for interventions. Structural Causal Models (SCMs). Counterfactuals: 'what if X had been different?' DoWhy: Python causal inference library. Applications: healthcare outcomes, policy decisions, A/B test analysis.",
        [{type:"yt",url:"https://youtube.com/results?search_query=causal+inference+dowhy+python+tutorial",label:"Causal Inference Tutorial"},{type:"web",url:"https://www.pywhy.org/dowhy/",label:"DoWhy Docs"}],
        "DoWhy: estimate effect of 'education on income'. Use backdoor adjustment. Refute result.",
        "Causal analysis: (1) Define causal graph for observational dataset, (2) Identify backdoor paths, (3) DoWhy: estimate causal effect with 3 methods (backdoor, IV, DML), (4) Refutation tests: placebo treatment, random subset, (5) Visualize: causal graph + estimated effects + confidence intervals.","2.5 hrs"),
      d(46,"Week 7 Project — Research Reproduction","Reproduce a recent ML paper from scratch.",
        "Reproducing research is the highest form of understanding. Choose a paper from the last 2 years, implement it from scratch, verify results match, and write a clear explanation. This proves deep technical mastery and is a rare portfolio differentiator.",
        [{type:"yt",url:"https://youtube.com/results?search_query=ML+paper+reproduction+tutorial+implementation",label:"Paper Reproduction Guide"},{type:"web",url:"https://arxiv.org/",label:"ArXiv"}],
        "Candidate papers: DPO, Flash Attention (simplified), Mamba (SSM), LoftQ, or any 2023-2024 paper.",
        "🚀 PAPER REPRODUCTION: (1) Select paper — read 3× until fully understood, (2) Write pseudocode before coding, (3) Implement core algorithm in PyTorch from scratch, (4) Verify: compare outputs to official implementation or paper tables, (5) Blog post: explain the paper as if teaching it, (6) GitHub repo with well-documented code + README.","4 hrs"),
    ],project:{id:'aw7',title:'Reproduce an AI Research Paper',desc:'Choose a landmark ML paper published in the last 3 years (suggestions: LoRA, FlashAttention, Mamba, RLHF from InstructGPT, or DPO). Read it 3 times. Write pseudocode. Implement the core algorithm from scratch in PyTorch — no copying official code. Train on a small dataset and reproduce the key metric from the paper (within 5%). Write a technical blog post that explains the paper intuitively, your implementation decisions, and any deviations. Open-source on GitHub with clean code, docstrings, and a README.'}},
    {week:8,title:"AI Systems Design & Leadership",timeRange:"12–15 hrs",
     days:[
      d(47,"ML System Design — End-to-End","Design production ML systems.",
        "ML system design framework: (1) Problem framing, (2) Data collection strategy, (3) Feature engineering, (4) Model selection, (5) Training pipeline, (6) Serving architecture, (7) Monitoring. Common designs: recommendation system, fraud detection, image search, conversational AI, content moderation.",
        [{type:"yt",url:"https://youtube.com/results?search_query=ML+system+design+interview+recommendation+fraud",label:"ML System Design"},{type:"web",url:"https://huyenchip.com/machine-learning-systems-design/toc.html",label:"ML Systems Design Book"}],
        "Design: Twitter feed ranking system. 45 minutes. Cover all 7 components.",
        "System design practice: (1) Design YouTube video recommendation (45 min, written), (2) Design real-time fraud detection (latency < 50ms), (3) Design image similarity search (1B images), (4) For each: data, features, model, serving, monitoring, (5) Peer review: exchange with a study partner.","3 hrs"),
      d(48,"Technical Writing & Communication","Communicate AI work to diverse audiences.",
        "Technical writing: clarity over jargon. Structure: problem → approach → results → implications. Visualizations: always show don't just tell. Writing for executives: lead with business impact, then technical details. GitHub README best practices. Blogging on Medium/Substack builds reputation. Conference papers (NeurIPS, ICML, ICLR) for academic contribution.",
        [{type:"yt",url:"https://youtube.com/results?search_query=technical+writing+ML+blog+communication+tutorial",label:"Technical Writing Guide"},{type:"web",url:"https://developers.google.com/tech-writing",label:"Google Tech Writing"}],
        "Write 3 versions: technical paper, blog post, executive summary — all about the same project.",
        "Communication sprint: (1) Technical paper-style writeup (methods, results, ablations), (2) Blog post for fellow practitioners (Medium-ready), (3) Executive summary (1 page, business focus, no equations), (4) 3-slide deck for demo day, (5) Twitter/LinkedIn thread explaining your best project in 10 tweets.","2 hrs"),
      d(49,"Open Source Contribution","Contribute to the AI ecosystem.",
        "Open source contribution: start small — fix typos, then docs, then bug fixes, then features. GitHub workflow: fork → branch → PR. Good first issues in PyTorch, HuggingFace, LangChain, scikit-learn. Code review skills: read others' code critically. Maintaining your own library: versioning, tests, CI, documentation.",
        [{type:"yt",url:"https://youtube.com/results?search_query=how+to+contribute+open+source+AI+ML+github",label:"Open Source Contribution Guide"},{type:"web",url:"https://github.com/firstcontributions/first-contributions",label:"First Contributions"}],
        "Pick one: fix a bug in an AI library, improve docs, add a tutorial, or create a new feature PR.",
        "Open source sprint: (1) Find a 'good first issue' in HuggingFace or LangChain, (2) Fork, branch, fix, test, (3) Submit PR with clear description and tests, (4) Alternatively: publish your own utility library on PyPI, (5) Create a HuggingFace model card for your fine-tuned model.","2 hrs"),
      d(50,"AI Ethics, Fairness & Responsible Deployment","Deploy AI responsibly.",
        "AI ethics: fairness metrics (demographic parity, equalized odds, individual fairness), bias sources (historical data, sampling, labeling). Explainability for regulated industries. Model cards (HuggingFace standard). Algorithmic auditing. Environmental cost: large model training carbon footprint. EU AI Act: risk-based regulation framework.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+ethics+fairness+bias+mitigation+tutorial",label:"AI Ethics Tutorial"},{type:"web",url:"https://huggingface.co/docs/hub/model-cards",label:"Model Cards"}],
        "Audit a model for demographic bias. Compute demographic parity ratio. Apply fairlearn mitigation.",
        "Ethics audit: (1) Compute demographic parity and equalized odds on a classifier, (2) Fairlearn: ExponentiatedGradient mitigation, (3) Write a Model Card for your best project (HuggingFace format), (4) Carbon footprint: use CodeCarbon to measure training emissions, (5) Risk assessment: map your project to EU AI Act risk levels.","2 hrs"),
      d(51,"Advanced Interview Preparation","Ace senior ML engineer interviews.",
        "Senior ML interviews: (1) ML design (45 min system design), (2) Deep learning theory (gradient flow, batch norm, attention), (3) Coding (efficient PyTorch, numpy), (4) Research discussion (explain recent papers), (5) Leadership (how did you influence technical direction?). FAANG ML roles: emphasis on scale and systems.",
        [{type:"yt",url:"https://youtube.com/results?search_query=senior+ML+engineer+interview+preparation+FAANG",label:"Senior ML Interview Prep"},{type:"web",url:"https://www.interviewquery.com/",label:"Interview Query"}],
        "Full mock interview: 45 min ML design + 30 min theory + 30 min coding. Record yourself.",
        "Senior interview prep: (1) ML system design: recommendation + fraud + content moderation, (2) Deep theory: explain batch norm, layer norm, attention from first principles, (3) Coding: implement k-means, gradient descent, attention in PyTorch from scratch, (4) Research: summarize 3 recent papers, (5) Leadership: STAR stories for 3 technical leadership moments.","2.5 hrs"),
      d(52,"Week 8 Project — Capstone System Design","Design a complete AI-powered product.",
        "The ultimate test: design a real AI product from scratch. Product thinking + ML + engineering + ethics + scalability. This is the type of work you'd do as a senior ML engineer or AI team lead. The design document becomes a portfolio centrepiece.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+product+design+document+ML+system+tutorial",label:"AI Product Design"},{type:"web",url:"https://www.ml.school/",label:"ML School"}],
        "Choose a product idea that solves a real problem. Write full design doc before building anything.",
        "🚀 SYSTEM DESIGN CAPSTONE: Design an AI product: (1) Problem statement & market (1 page), (2) Data strategy: collection, labeling, storage, (3) ML approach: models, training, evaluation, (4) Architecture: serving, API, frontend, (5) MLOps: CI/CD, monitoring, retraining, (6) Ethics & safety: fairness, guardrails, (7) Business metrics: how will you measure success? Present in 20 min.","4 hrs"),
    ],project:{id:'aw8',title:'AI System Design Document',desc:'Produce a comprehensive AI system design document for a real-world product of your choice (recommendation engine, fraud detector, medical image classifier, or AI coding assistant). Deliverables: (1) Problem framing + market sizing (1 page), (2) Data strategy: collection, labeling, storage architecture, (3) Model selection rationale + training pipeline, (4) Serving architecture: latency budget, batching, caching, (5) MLOps: CI/CD, monitoring, drift detection, retraining trigger, (6) Fairness & safety analysis + guardrails, (7) Cost estimate + business metrics. Format as a Notion doc or PDF with draw.io diagrams.'}},
    {week:9,title:"Capstone Projects & Career Launch",timeRange:"16–20 hrs",
     days:[
      d(53,"Capstone Project Planning","Design your signature AI project.",
        "Your capstone is the centrepiece of your portfolio. It should: solve a real problem you care about, demonstrate full-stack AI skills (data → model → deployment → monitoring), have a live demo, and be explainable in 5 minutes to any audience.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+capstone+project+ideas+portfolio+2024",label:"Capstone Ideas"},{type:"web",url:"https://huggingface.co/spaces",label:"HuggingFace Spaces"}],
        "Write a 1-page capstone proposal: problem, approach, dataset, success metrics, timeline.",
        "Capstone kickoff: (1) Identify a real problem you care about (not iris/titanic), (2) Validate: is data available? Is ML the right solution? (3) Define success metrics before building, (4) Technical design doc: architecture diagram, model choice, serving plan, (5) Week timeline: what you'll build each day.","2 hrs"),
      d(54,"Capstone Build — Week 1","Implement the data and model layer.",
        "First build the foundation: data pipeline and trained model. Don't start with the UI. Validate the ML works before engineering the system around it. Log everything to MLflow from day one.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+project+build+end+to+end+tutorial",label:"Project Build Tutorial"},{type:"web",url:"https://mlflow.org/",label:"MLflow"}],
        "By end of day: working data pipeline, trained model with >baseline performance, logged to MLflow.",
        "Build sprint: (1) Data collection and EDA, (2) Baseline model (simple, fast), (3) Improved model with feature engineering, (4) MLflow: track all experiments, (5) Evaluation: proper metrics + error analysis, (6) Model saved and reproducible from seed.","3 hrs"),
      d(55,"Capstone Build — Week 2","Build the serving layer and UI.",
        "Now engineer the system: FastAPI backend, polished frontend, proper error handling. The serving layer must be robust: input validation, error messages, logging, monitoring hooks. UI should be intuitive — test with someone who doesn't know your project.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+app+FastAPI+Streamlit+deployment+build",label:"AI App Build Tutorial"},{type:"web",url:"https://docs.streamlit.io/",label:"Streamlit Docs"}],
        "By end of day: live demo accessible at a public URL. Someone else can use it.",
        "Deploy sprint: (1) FastAPI backend: predict + health + metrics, (2) Input validation + error handling, (3) Streamlit or Gradio frontend, (4) Docker containerize, (5) Deploy: Streamlit Cloud / HuggingFace Spaces / Render, (6) User test: ask 3 people to try it and give feedback.","3 hrs"),
      d(56,"Capstone Polish & Documentation","Make your project shine.",
        "Polish separates good projects from great ones. README must tell the full story: problem → demo GIF → how to run → results. Code quality: docstrings, type hints, tests. Architecture diagram. Performance report. Known limitations section shows maturity. License. Demo video (2 min walkthrough).",
        [{type:"yt",url:"https://youtube.com/results?search_query=GitHub+README+portfolio+project+documentation",label:"Documentation Guide"},{type:"web",url:"https://www.makeareadme.com/",label:"Make a README"}],
        "Share GitHub link with a friend. They should understand and run the project without asking you anything.",
        "Polish checklist: (1) README: GIF demo, architecture diagram, results table, install steps, (2) Code: type hints, docstrings, no magic numbers, (3) Tests: pytest for model loading, API endpoints, (4) GitHub Actions CI: lint + test on PR, (5) HuggingFace model card if applicable, (6) Record 2-min Loom demo video.","2 hrs"),
      d(57,"Senior-Level AI Portfolio Review","Audit and elevate your entire portfolio.",
        "A hiring manager spends 3 minutes on your GitHub. Every project must immediately communicate: what problem, how solved, what results. Pin your 4 best projects. Each should have: live demo, clear README, professional code, quantified results. Remove anything incomplete or poorly documented.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+ML+portfolio+review+github+what+to+include",label:"Portfolio Review Guide"},{type:"web",url:"https://github.com/",label:"GitHub"}],
        "Open your GitHub as if you're a recruiter. What do you see in 30 seconds?",
        "Portfolio audit: (1) Review all projects — cull or improve, (2) Pin 4 best (capstone, vision, NLP, MLOps), (3) GitHub profile README: headline, skills, project links, stats, (4) Update each project: live demo + quantified results in README, (5) HuggingFace profile: model cards for fine-tuned models, (6) Personal website (optional but impressive).","2 hrs"),
      d(58,"Career Strategy — Senior Roles & Negotiation","Land a senior ML engineering role.",
        "Target roles: Senior ML Engineer, Research Engineer, Staff ML Engineer, AI Product Engineer. Salary negotiation: research market rate (levels.fyi, blind), never give first number, counter with 10–20% above target. Interview process: phone screen → technical screen → system design → coding → leadership → offer. Timeline: apply broadly, multiple offers create leverage.",
        [{type:"yt",url:"https://youtube.com/results?search_query=ML+engineer+salary+negotiation+senior+job+offer",label:"Career & Negotiation Guide"},{type:"web",url:"https://www.levels.fyi/",label:"Levels.fyi Salaries"}],
        "Research 10 target companies. Find their ML job postings. List your gaps. Make a plan.",
        "Job search strategy: (1) Target list: 10 companies (3 stretch, 4 target, 3 backup), (2) Gaps analysis: what skills do they require that you're weak in? (3) Resume: quantify every bullet (X% improvement, $Y impact, N scale), (4) LinkedIn: 'Open to Work' + DMs to recruiters at target companies, (5) Referrals: reach out to 5 people you know at target companies.","2 hrs"),
      d(59,"Networking, Speaking & Community","Build your professional reputation.",
        "Technical reputation compounds: blog posts → conference talks → open source → consulting → advisory. Networking: quality > quantity. Contribute on Twitter/X, LinkedIn, HuggingFace, Kaggle. Attend: NeurIPS, ICML, local ML meetups. Speak at meetups before conferences. Teaching solidifies your own understanding.",
        [{type:"yt",url:"https://youtube.com/results?search_query=ML+engineer+networking+community+career+growth",label:"Networking Guide"},{type:"web",url:"https://www.meetup.com/",label:"Meetup"}],
        "Post a LinkedIn article about your most interesting project. Share in 3 relevant communities.",
        "Community sprint: (1) Publish Medium/Substack article about your capstone (400+ words), (2) LinkedIn post: share project + 3 key learnings, (3) Submit talk proposal to a local ML meetup, (4) HuggingFace: share your fine-tuned model + demo, (5) Find an ML study group or accountability partner, (6) DM 5 ML engineers you admire.","2 hrs"),
      d(60,"Advanced Graduation — Launch Day","Celebrate completion and launch your career.",
        "Congratulations! You have completed the Advanced AI Roadmap. In 90 days (beginner), 60 days (intermediate), and 90 days (advanced), you've gone from learner to full-stack AI engineer. You now have: production deployments, a research contribution, end-to-end ML systems, and a portfolio that speaks for itself. The journey doesn't end — it accelerates.",
        [{type:"yt",url:"https://youtube.com/results?search_query=AI+ML+engineer+career+day+1+celebration",label:"Career Launch"},{type:"web",url:"https://huggingface.co/",label:"HuggingFace"}],
        "Share your portfolio publicly. Commit to your first job application today.",
        "🏆 GRADUATION DAY: (1) Finalize capstone — it's live and public, (2) Submit 5 job applications TODAY, (3) Post graduation on LinkedIn: share your journey + portfolio, (4) Write a personal reflection: what changed, what was hardest, what you're proud of, (5) Set 90-day career goals, (6) Celebrate — you are now an Advanced AI Engineer. The world needs you. 🚀🎉","2 hrs"),
    ]},
  ]
};



return {beginner, intermediate, advanced};
})();

// ═══════════════════════════════════════════════════════
//  ROADMAP DATA DEFINITIONS
// ═══════════════════════════════════════════════════════
const AI_ROADMAP_DATA = (function() {
  const phases = [
    {
      name:"Python Fundamentals",days:30,
      topics:[
        {title:"Python Setup & Syntax",exp:"Install Python, understand indentation, variables, data types (int, float, str, bool), operators, and basic I/O with print() and input().",
         yt:["https://youtube.com/results?search_query=Python+basics+for+beginners"],
         web:["https://docs.python.org/3/tutorial/","https://w3schools.com/python"]},
        {title:"Control Flow",exp:"Master if/elif/else, for loops, while loops, break, continue, and pass statements. Write programs that make decisions and repeat operations.",
         yt:["https://youtube.com/results?search_query=Python+control+flow+tutorial"],
         web:["https://realpython.com/python-conditional-statements/"]},
        {title:"Functions & Scope",exp:"Define functions with def, understand parameters vs arguments, return values, *args/**kwargs, lambda functions, closures, and variable scope (LEGB rule).",
         yt:["https://youtube.com/results?search_query=Python+functions+complete+guide"],
         web:["https://realpython.com/defining-your-own-python-function/"]},
        {title:"Lists, Tuples, Sets",exp:"Understand mutable vs immutable sequences. List comprehensions, slicing, common methods (append, pop, sort). Set operations (union, intersection). Tuple unpacking.",
         yt:["https://youtube.com/results?search_query=Python+lists+tuples+sets+tutorial"],
         web:["https://docs.python.org/3/tutorial/datastructures.html"]},
        {title:"Dictionaries & JSON",exp:"Key-value pairs, nested dicts, dict comprehensions, .get()/.items()/.keys()/.values(). Load/save JSON data with the json module.",
         yt:["https://youtube.com/results?search_query=Python+dictionaries+json+tutorial"],
         web:["https://realpython.com/python-dicts/"]},
        {title:"File I/O & OS Module",exp:"Read and write text/binary files, context managers (with statement), pathlib, os.path, shutil for file operations.",
         yt:["https://youtube.com/results?search_query=Python+file+handling+tutorial"],
         web:["https://realpython.com/working-with-files-in-python/"]},
        {title:"OOP — Classes & Objects",exp:"Define classes, __init__, instance vs class attributes, methods, self. Understand encapsulation principles and why OOP matters for large projects.",
         yt:["https://youtube.com/results?search_query=Python+OOP+classes+tutorial"],
         web:["https://realpython.com/python3-object-oriented-programming/"]},
        {title:"OOP — Inheritance & Polymorphism",exp:"Single and multiple inheritance, super(), method overriding, abstract classes with ABC, @staticmethod, @classmethod, @property.",
         yt:["https://youtube.com/results?search_query=Python+inheritance+polymorphism"],
         web:["https://realpython.com/inheritance-composition-python/"]},
        {title:"Error Handling & Exceptions",exp:"try/except/else/finally blocks, raising exceptions, custom exceptions, context managers for resource management, logging basics.",
         yt:["https://youtube.com/results?search_query=Python+exception+handling+tutorial"],
         web:["https://realpython.com/python-exceptions/"]},
        {title:"Modules, Packages & pip",exp:"import system, creating packages with __init__.py, virtual environments (venv), pip install, requirements.txt, understanding the Python standard library.",
         yt:["https://youtube.com/results?search_query=Python+modules+packages+pip"],
         web:["https://realpython.com/python-modules-packages/"]},
      ]
    },
    {
      name:"NumPy & Data Structures",days:20,
      topics:[
        {title:"NumPy Arrays",exp:"ndarray creation (np.array, np.zeros, np.ones, np.arange, np.linspace), array attributes (.shape, .dtype, .ndim), reshape, flatten.",
         yt:["https://youtube.com/results?search_query=NumPy+arrays+tutorial+beginners"],
         web:["https://numpy.org/doc/stable/user/absolute_beginners.html"]},
        {title:"NumPy Operations",exp:"Broadcasting rules, element-wise operations, matrix multiplication (@, np.dot), axis operations (sum, mean, std, max along axes), boolean indexing.",
         yt:["https://youtube.com/results?search_query=NumPy+operations+broadcasting"],
         web:["https://numpy.org/doc/stable/user/basics.broadcasting.html"]},
        {title:"Pandas Series & DataFrames",exp:"Create Series and DataFrames, select data with .loc/.iloc, add/remove columns, handle missing values with .fillna()/.dropna(), basic info/describe.",
         yt:["https://youtube.com/results?search_query=Pandas+DataFrame+tutorial"],
         web:["https://pandas.pydata.org/docs/getting_started/intro_tutorials/"]},
        {title:"Pandas Data Cleaning",exp:"String operations, apply/map, merge/join/concat, groupby aggregations, pivot tables, datetime handling, resample for time-series data.",
         yt:["https://youtube.com/results?search_query=Pandas+data+cleaning+tutorial"],
         web:["https://realpython.com/pandas-dataframe/"]},
      ]
    },
    {
      name:"Mathematics for ML",days:40,
      topics:[
        {title:"Linear Algebra — Vectors",exp:"Vector notation, addition, subtraction, scalar multiplication, dot product, magnitude (norm), unit vectors, angle between vectors, vector projection.",
         yt:["https://youtube.com/results?search_query=linear+algebra+vectors+for+machine+learning"],
         web:["https://www.3blue1brown.com/topics/linear-algebra","https://Khan Academy linear algebra"]},
        {title:"Linear Algebra — Matrices",exp:"Matrix operations (add, multiply), identity matrix, transpose, inverse, determinant, rank, trace, eigenvalues and eigenvectors explained visually.",
         yt:["https://youtube.com/results?search_query=matrix+operations+machine+learning"],
         web:["https://betterexplained.com/articles/linear-algebra-guide/"]},
        {title:"Calculus — Derivatives",exp:"Limits, derivative definition, power/chain/product rule, partial derivatives, gradient as multi-variable derivative direction, concept of local minima.",
         yt:["https://youtube.com/results?search_query=calculus+derivatives+machine+learning"],
         web:["https://www.khanacademy.org/math/ap-calculus-ab"]},
        {title:"Calculus — Gradient Descent",exp:"Cost function landscape, gradient descent algorithm step by step, learning rate intuition, SGD, mini-batch GD. Implement from scratch in Python.",
         yt:["https://youtube.com/results?search_query=gradient+descent+explained+visually"],
         web:["https://ruder.io/optimizing-gradient-descent/"]},
        {title:"Probability Basics",exp:"Sample space, events, conditional probability, Bayes' theorem, probability distributions (Bernoulli, Binomial, Normal/Gaussian), expected value, variance.",
         yt:["https://youtube.com/results?search_query=probability+statistics+machine+learning"],
         web:["https://www.khanacademy.org/math/statistics-probability"]},
        {title:"Statistics for ML",exp:"Mean, median, mode, standard deviation, z-score, correlation vs causation, hypothesis testing, p-value, confidence intervals, Central Limit Theorem.",
         yt:["https://youtube.com/results?search_query=statistics+for+machine+learning+beginners"],
         web:["https://statisticsbyjim.com/"]},
      ]
    },
    {
      name:"Data Visualization",days:15,
      topics:[
        {title:"Matplotlib Fundamentals",exp:"Figure and axes, plt.plot/scatter/bar/hist/pie, labels, titles, legends, subplots, saving figures. Understand the object-oriented API vs pyplot.",
         yt:["https://youtube.com/results?search_query=Matplotlib+tutorial+complete"],
         web:["https://matplotlib.org/stable/tutorials/"]},
        {title:"Seaborn for Statistics",exp:"distplot, boxplot, heatmap, pairplot, violin plots, categorical plots. Seaborn integrates with Pandas for clean statistical visualizations.",
         yt:["https://youtube.com/results?search_query=Seaborn+tutorial+data+visualization"],
         web:["https://seaborn.pydata.org/tutorial.html"]},
        {title:"Plotly Interactive Charts",exp:"Create interactive visualizations with plotly.express, scatter_mapbox for geo data, time-series animation, export to HTML for sharing.",
         yt:["https://youtube.com/results?search_query=Plotly+Python+interactive+charts"],
         web:["https://plotly.com/python/getting-started/"]},
      ]
    },
    {
      name:"Machine Learning Fundamentals",days:60,
      topics:[
        {title:"ML Concepts & Terminology",exp:"Supervised vs unsupervised vs reinforcement learning, training/validation/test splits, bias-variance tradeoff, overfitting vs underfitting, cross-validation.",
         yt:["https://youtube.com/results?search_query=machine+learning+concepts+beginners"],
         web:["https://developers.google.com/machine-learning/crash-course"]},
        {title:"Linear Regression",exp:"Simple and multiple linear regression, cost function (MSE), normal equation, gradient descent implementation, R² score, residual analysis.",
         yt:["https://youtube.com/results?search_query=linear+regression+machine+learning+scratch"],
         web:["https://scikit-learn.org/stable/modules/linear_model.html"]},
        {title:"Logistic Regression",exp:"Binary classification, sigmoid function, decision boundary, log loss / binary cross-entropy, multi-class via softmax, one-vs-rest strategy.",
         yt:["https://youtube.com/results?search_query=logistic+regression+explained+from+scratch"],
         web:["https://realpython.com/logistic-regression-python/"]},
        {title:"Decision Trees",exp:"Information gain, Gini impurity, entropy, tree splitting, depth control, pruning (pre/post), feature importance, visualizing decision boundaries.",
         yt:["https://youtube.com/results?search_query=decision+tree+algorithm+explained"],
         web:["https://scikit-learn.org/stable/modules/tree.html"]},
        {title:"Random Forests & Ensemble",exp:"Bagging concept, random subspace method, out-of-bag error, boosting vs bagging, AdaBoost, Gradient Boosting, XGBoost overview.",
         yt:["https://youtube.com/results?search_query=random+forest+algorithm+explained"],
         web:["https://scikit-learn.org/stable/modules/ensemble.html"]},
        {title:"SVM — Support Vector Machines",exp:"Hyperplane, support vectors, margin maximization, kernel trick (RBF, polynomial), soft margin (C parameter), SVR for regression.",
         yt:["https://youtube.com/results?search_query=SVM+support+vector+machine+explained"],
         web:["https://scikit-learn.org/stable/modules/svm.html"]},
        {title:"K-Nearest Neighbors",exp:"Distance metrics (Euclidean, Manhattan), K selection, curse of dimensionality, KD-tree for efficiency, KNN for classification and regression.",
         yt:["https://youtube.com/results?search_query=KNN+algorithm+explained"],
         web:["https://scikit-learn.org/stable/modules/neighbors.html"]},
        {title:"K-Means & Clustering",exp:"K-Means algorithm step by step, inertia/elbow method, K-Means++, DBSCAN for density-based clustering, hierarchical clustering, silhouette score.",
         yt:["https://youtube.com/results?search_query=K-means+clustering+explained"],
         web:["https://scikit-learn.org/stable/modules/clustering.html"]},
        {title:"PCA & Dimensionality Reduction",exp:"Curse of dimensionality, PCA via SVD, explained variance ratio, scree plot, t-SNE for visualization, UMAP, feature selection vs extraction.",
         yt:["https://youtube.com/results?search_query=PCA+dimensionality+reduction+explained"],
         web:["https://scikit-learn.org/stable/modules/decomposition.html"]},
        {title:"Model Evaluation & Metrics",exp:"Confusion matrix, precision, recall, F1-score, ROC-AUC, RMSE, MAE for regression. Cross-validation strategies (k-fold, stratified, LOOCV).",
         yt:["https://youtube.com/results?search_query=ML+model+evaluation+metrics+explained"],
         web:["https://scikit-learn.org/stable/modules/model_evaluation.html"]},
      ]
    },
    {
      name:"Deep Learning Foundations",days:80,
      topics:[
        {title:"Neural Network Basics",exp:"Biological neuron analogy, artificial neuron, perceptron, activation functions (ReLU, sigmoid, tanh, softmax), forward propagation, network architecture.",
         yt:["https://youtube.com/results?search_query=neural+networks+from+scratch+explained"],
         web:["https://www.3blue1brown.com/topics/neural-networks","https://playground.tensorflow.org"]},
        {title:"Backpropagation",exp:"Chain rule applied to neural networks, computing gradients layer by layer, vanishing/exploding gradients, gradient checking, computational graphs.",
         yt:["https://youtube.com/results?search_query=backpropagation+explained+visually"],
         web:["https://cs231n.github.io/optimization-2/"]},
        {title:"Optimizers — Adam, SGD, RMSprop",exp:"SGD with momentum, RMSprop adaptive learning rates, Adam combining momentum and RMSProp, learning rate schedules, warmup strategies.",
         yt:["https://youtube.com/results?search_query=Adam+optimizer+explained+deep+learning"],
         web:["https://ruder.io/optimizing-gradient-descent/"]},
        {title:"Regularization Techniques",exp:"L1/L2 weight regularization, dropout (train vs inference mode), batch normalization, layer normalization, early stopping, data augmentation.",
         yt:["https://youtube.com/results?search_query=deep+learning+regularization+dropout+batch+norm"],
         web:["https://cs231n.github.io/neural-networks-2/"]},
        {title:"PyTorch Basics",exp:"Tensors, autograd for automatic differentiation, creating nn.Module models, forward pass, loss computation, optimizer.step(), training loop template.",
         yt:["https://youtube.com/results?search_query=PyTorch+tutorial+beginners+complete"],
         web:["https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html"]},
        {title:"CNN — Convolutional Neural Networks",exp:"Convolution operation, feature maps, pooling (max/average), receptive field, AlexNet/VGG/ResNet architectures, skip connections, transfer learning.",
         yt:["https://youtube.com/results?search_query=CNN+convolutional+neural+network+explained"],
         web:["https://cs231n.github.io/convolutional-networks/"]},
        {title:"RNN & LSTM",exp:"Recurrent networks, vanishing gradient in RNNs, LSTM cell (forget/input/output gates), GRU simplified LSTM, sequence-to-sequence basics, bidirectional RNN.",
         yt:["https://youtube.com/results?search_query=LSTM+explained+visually+deep+learning"],
         web:["https://colah.github.io/posts/2015-08-Understanding-LSTMs/"]},
        {title:"Transfer Learning & Fine-tuning",exp:"Feature extraction vs fine-tuning, freezing layers, learning rate differences for pretrained vs new layers, domain adaptation, few-shot learning overview.",
         yt:["https://youtube.com/results?search_query=transfer+learning+fine+tuning+PyTorch"],
         web:["https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"]},
      ]
    },
    {
      name:"NLP & Transformers",days:90,
      topics:[
        {title:"Text Preprocessing",exp:"Tokenization (word, subword, BPE), lowercasing, stopword removal, stemming vs lemmatization, regular expressions for text, vocabulary building.",
         yt:["https://youtube.com/results?search_query=NLP+text+preprocessing+Python"],
         web:["https://www.nltk.org/","https://spacy.io/usage/spacy-101"]},
        {title:"Word Embeddings",exp:"One-hot encoding limitations, Word2Vec (CBOW & Skip-gram), GloVe, FastText for subword info, embedding space visualization with t-SNE, semantic similarity.",
         yt:["https://youtube.com/results?search_query=word+embeddings+Word2Vec+explained"],
         web:["https://jalammar.github.io/illustrated-word2vec/"]},
        {title:"Attention Mechanism",exp:"The problem attention solves, query-key-value framework, scaled dot-product attention, attention weights visualization, multi-head attention intuition.",
         yt:["https://youtube.com/results?search_query=attention+mechanism+deep+learning+explained"],
         web:["https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/"]},
        {title:"Transformer Architecture",exp:"Encoder-decoder structure, positional encoding, layer normalization placement, feed-forward sublayers, residual connections, full architecture walkthrough.",
         yt:["https://youtube.com/results?search_query=transformer+architecture+explained+attention+is+all+you+need"],
         web:["https://jalammar.github.io/illustrated-transformer/"]},
        {title:"BERT & GPT Overview",exp:"BERT masked language modeling vs GPT causal LM, [CLS]/[SEP] tokens, pre-training objectives, encoder-only vs decoder-only vs encoder-decoder models.",
         yt:["https://youtube.com/results?search_query=BERT+GPT+explained+transformers"],
         web:["https://jalammar.github.io/illustrated-bert/"]},
        {title:"Hugging Face Transformers",exp:"AutoModel, AutoTokenizer, pipeline API for common tasks, fine-tuning with Trainer API, datasets library, model hub, pushing models to Hub.",
         yt:["https://youtube.com/results?search_query=Hugging+Face+transformers+tutorial"],
         web:["https://huggingface.co/docs/transformers/index"]},
        {title:"Fine-tuning LLMs",exp:"Task-specific vs instruction fine-tuning, LoRA/QLoRA for efficient fine-tuning, PEFT library, dataset formatting, training hyperparameters, evaluation.",
         yt:["https://youtube.com/results?search_query=fine+tuning+LLM+LoRA+PEFT"],
         web:["https://huggingface.co/docs/peft/index"]},
        {title:"Prompt Engineering",exp:"Zero-shot, few-shot, chain-of-thought, tree-of-thought, ReAct pattern, system prompts, temperature/top-p sampling, prompt injection awareness.",
         yt:["https://youtube.com/results?search_query=prompt+engineering+techniques+LLM"],
         web:["https://www.promptingguide.ai/"]},
        {title:"RAG — Retrieval Augmented Generation",exp:"Why RAG? Document loading, chunking strategies, embeddings for retrieval, vector stores (FAISS/ChromaDB), similarity search, reranking, LangChain RAG pipeline.",
         yt:["https://youtube.com/results?search_query=RAG+retrieval+augmented+generation+tutorial"],
         web:["https://python.langchain.com/docs/use_cases/question_answering/"]},
        {title:"Vector Databases",exp:"Embeddings as coordinates, approximate nearest neighbor (ANN), HNSW index, FAISS flat vs IVF, ChromaDB local setup, Pinecone/Weaviate cloud overview.",
         yt:["https://youtube.com/results?search_query=vector+database+explained+FAISS+ChromaDB"],
         web:["https://www.pinecone.io/learn/vector-database/"]},
      ]
    },
    {
      name:"LLM Applications & Agents",days:60,
      topics:[
        {title:"LangChain Framework",exp:"Chains, memory types, document loaders, text splitters, retrievers, output parsers, LCEL (LangChain Expression Language) for composable pipelines.",
         yt:["https://youtube.com/results?search_query=LangChain+tutorial+complete+beginners"],
         web:["https://python.langchain.com/docs/get_started/introduction"]},
        {title:"LangGraph for Agents",exp:"State machines for AI workflows, nodes and edges, conditional routing, persistence/checkpointing, human-in-the-loop, multi-agent coordination.",
         yt:["https://youtube.com/results?search_query=LangGraph+tutorial+AI+agents"],
         web:["https://langchain-ai.github.io/langgraph/"]},
        {title:"AI Agents & Tool Use",exp:"ReAct agent loop, function/tool calling in OpenAI/Anthropic APIs, planning agents, memory architectures, multi-agent frameworks (AutoGen, CrewAI).",
         yt:["https://youtube.com/results?search_query=AI+agents+tool+use+tutorial"],
         web:["https://www.anthropic.com/research/building-effective-agents"]},
        {title:"OpenAI API Integration",exp:"Chat completions API, streaming responses, function calling, JSON mode, vision inputs, embeddings API, token counting with tiktoken, cost optimization.",
         yt:["https://youtube.com/results?search_query=OpenAI+API+tutorial+Python"],
         web:["https://platform.openai.com/docs/api-reference"]},
        {title:"Building Chatbots",exp:"Conversation history management, context window limits, system prompt design, streaming UI, session management, multi-turn reasoning, guardrails.",
         yt:["https://youtube.com/results?search_query=build+AI+chatbot+Python+LangChain"],
         web:["https://python.langchain.com/docs/use_cases/chatbots/"]},
        {title:"Multimodal AI",exp:"Vision-language models (GPT-4V, LLaVA, Gemini), image-text tasks, audio transcription with Whisper, text-to-speech, multimodal RAG, structured extraction.",
         yt:["https://youtube.com/results?search_query=multimodal+AI+vision+language+models"],
         web:["https://openai.com/research/gpt-4v-system-card"]},
      ]
    },
    {
      name:"MLOps & Deployment",days:60,
      topics:[
        {title:"Git & Version Control",exp:"git init/add/commit/push/pull, branching (feature branches), merge vs rebase, pull requests, .gitignore, GitHub Actions basics, semantic versioning.",
         yt:["https://youtube.com/results?search_query=Git+GitHub+complete+tutorial"],
         web:["https://www.atlassian.com/git/tutorials"]},
        {title:"Docker for ML",exp:"Dockerfile, images vs containers, docker build/run/ps/exec, volumes for data persistence, docker-compose for multi-service apps, NVIDIA GPU Docker for ML.",
         yt:["https://youtube.com/results?search_query=Docker+tutorial+machine+learning"],
         web:["https://docs.docker.com/get-started/"]},
        {title:"FastAPI for ML Serving",exp:"Path operations, Pydantic models for validation, async endpoints, background tasks, serving ML models, health checks, OpenAPI docs auto-generation.",
         yt:["https://youtube.com/results?search_query=FastAPI+machine+learning+model+serving"],
         web:["https://fastapi.tiangolo.com/"]},
        {title:"MLflow Experiment Tracking",exp:"Log parameters/metrics/artifacts, run comparison, model registry, model signatures, serving with mlflow models serve, integrations with cloud.",
         yt:["https://youtube.com/results?search_query=MLflow+tutorial+experiment+tracking"],
         web:["https://mlflow.org/docs/latest/tutorials-and-examples/tutorial.html"]},
        {title:"Cloud Deployment (AWS/GCP)",exp:"EC2/GCE instances for training, S3/GCS for data storage, SageMaker/Vertex AI managed training, Lambda/Cloud Functions for inference endpoints.",
         yt:["https://youtube.com/results?search_query=AWS+GCP+machine+learning+deployment"],
         web:["https://docs.aws.amazon.com/sagemaker/","https://cloud.google.com/vertex-ai"]},
        {title:"Model Monitoring & Drift",exp:"Data drift vs concept drift, statistical tests (KS, PSI), monitoring latency/throughput/error rates, Evidently AI, Grafana dashboards for ML.",
         yt:["https://youtube.com/results?search_query=ML+model+monitoring+data+drift"],
         web:["https://evidentlyai.com/blog/ml-monitoring-guide"]},
      ]
    },
    {
      name:"Advanced AI & Specialization",days:60,
      topics:[
        {title:"Reinforcement Learning Basics",exp:"Agent-environment loop, states/actions/rewards, policy vs value function, Q-learning, Deep Q-Network (DQN), policy gradient (REINFORCE), OpenAI Gym.",
         yt:["https://youtube.com/results?search_query=reinforcement+learning+explained+beginners"],
         web:["https://spinningup.openai.com/en/latest/"]},
        {title:"Generative Models — GANs",exp:"Generator vs discriminator, adversarial training, mode collapse problem, DCGAN, StyleGAN, conditional GAN, evaluation with FID/IS scores.",
         yt:["https://youtube.com/results?search_query=GAN+generative+adversarial+network+explained"],
         web:["https://www.tensorflow.org/tutorials/generative/dcgan"]},
        {title:"Diffusion Models",exp:"Forward diffusion (adding noise), reverse denoising process, DDPM/DDIM, U-Net architecture, classifier-free guidance, Stable Diffusion pipeline, ControlNet.",
         yt:["https://youtube.com/results?search_query=diffusion+models+explained+stable+diffusion"],
         web:["https://huggingface.co/docs/diffusers/index"]},
        {title:"AI System Design",exp:"Latency vs throughput tradeoffs, batching inference, caching strategies, model quantization (INT8/FP16), distillation, edge deployment with ONNX/TensorRT.",
         yt:["https://youtube.com/results?search_query=AI+system+design+interview+ML+design"],
         web:["https://huyenchip.com/machine-learning-systems-design/toc.html"]},
        {title:"Responsible AI & Ethics",exp:"Fairness metrics (demographic parity, equalized odds), bias sources (data, label, historical), explainability (LIME, SHAP), privacy (differential privacy, federated learning).",
         yt:["https://youtube.com/results?search_query=responsible+AI+ethics+fairness+explainability"],
         web:["https://ai.google/responsibility/responsible-ai-practices/"]},
        {title:"AI Engineering Portfolio",exp:"GitHub portfolio with 5+ projects, Hugging Face model/space demos, technical blog writing, contributing to open-source, networking in AI community.",
         yt:["https://youtube.com/results?search_query=AI+engineer+portfolio+projects"],
         web:["https://huggingface.co/spaces","https://www.kaggle.com/"]},
      ]
    },
  ];

  const days = [];
  let dayNum = 1;
  phases.forEach(phase => {
    const topicsPerDay = Math.ceil(phase.topics.length / Math.min(phase.topics.length, phase.days));
    let topicIdx = 0;
    let dayInPhase = 0;
    for (let d = 0; d < phase.days; d++, dayNum++, dayInPhase++) {
      const topic = phase.topics[topicIdx % phase.topics.length];
      days.push({
        day: dayNum,
        phase: phase.name,
        title: topic.title + (d > 0 && topicIdx % phase.topics.length === 0 ? ' — Review & Practice' :
               d > 0 ? ' — Practice & Exercises' : ''),
        explanation: topic.exp,
        youtube: topic.yt,
        websites: topic.web,
        hours: 2,
        isProject: false,
      });
      if ((d + 1) % Math.ceil(phase.days / phase.topics.length) === 0) topicIdx++;

      // Insert a project day every 7 topic days
      if (dayInPhase > 0 && dayInPhase % 7 === 0) {
        dayNum++;
        const projLevel = dayNum < 150 ? 'Beginner' : dayNum < 400 ? 'Intermediate' : 'Advanced';
        const projTitle = dayNum < 150
          ? ['Simple Python Calculator App', 'Data Analysis Mini Project', 'Number Guessing Game', 'Contact Book CLI App'][Math.floor(dayNum/30)%4]
          : dayNum < 400
          ? ['ML Classification Project', 'Regression with Real Dataset', 'Data Visualization Dashboard', 'NLP Text Classifier'][Math.floor(dayNum/60)%4]
          : ['AI Chatbot with RAG', 'Recommendation System', 'Computer Vision App', 'LLM Fine-Tune Project', 'FastAPI ML Deployment'][Math.floor(dayNum/60)%5];
        days.push({
          day: dayNum,
          phase: phase.name,
          title: projTitle,
          explanation: `🚀 PROJECT DAY! Apply what you've learned in ${phase.name}. Build: ${projTitle}. Focus on end-to-end implementation, clean code, and documentation. Push to GitHub when done.`,
          youtube: [`https://youtube.com/results?search_query=${encodeURIComponent(projTitle + ' python tutorial')}`],
          websites: ['https://github.com/', 'https://replit.com/'],
          hours: 3,
          isProject: true,
          level: projLevel,
        });
      }
    }
  });

  return days;
})();

// Flat DSA data kept for revision/calendar compatibility
const DSA_ROADMAP_DATA = (function() {
  const topics = [
    {title:"C++ Setup & STL Intro",exp:"Install GCC, configure IDE (VS Code/CLion), compile your first program. Understand namespaces, cin/cout, and overview of the C++ Standard Template Library.",yt:["https://youtube.com/results?search_query=C%2B%2B+setup+beginners+competitive+programming"],web:["https://cplusplus.com/doc/tutorial/","https://codeforces.com/"]},
    {title:"Arrays — 1D & 2D",exp:"Declare, initialize, traverse arrays. Prefix sums, sliding window technique, Kadane's algorithm for max subarray, 2D array traversal, rotation, transpose.",yt:["https://youtube.com/results?search_query=arrays+C%2B%2B+DSA+tutorial"],web:["https://leetcode.com/tag/array/","https://geeksforgeeks.org/array-data-structure/"]},
    {title:"Strings & String Manipulation",exp:"std::string methods, character arrays, palindrome check, anagram detection, string hashing, KMP pattern matching, Z-algorithm, Rabin-Karp.",yt:["https://youtube.com/results?search_query=strings+C%2B%2B+DSA+problems"],web:["https://leetcode.com/tag/string/","https://cp-algorithms.com/string/prefix-function.html"]},
    {title:"Sorting Algorithms",exp:"Bubble, Selection, Insertion (O(n²)), Merge Sort (O(n log n) stable), Quick Sort (avg O(n log n)), Counting/Radix/Bucket sort. std::sort and custom comparators.",yt:["https://youtube.com/results?search_query=sorting+algorithms+C%2B%2B+visualized"],web:["https://visualgo.net/en/sorting","https://cp-algorithms.com/"]},
    {title:"Binary Search",exp:"Classic binary search template, search on answer technique, lower_bound/upper_bound in STL, binary search on rotated array, finding peak element variants.",yt:["https://youtube.com/results?search_query=binary+search+C%2B%2B+complete+guide"],web:["https://leetcode.com/tag/binary-search/","https://codeforces.com/blog/entry/9901"]},
    {title:"Two Pointers & Sliding Window",exp:"Two pointer technique (sorted array, pair sum), sliding window for subarray problems (fixed/variable window), fast-slow pointers, Dutch National Flag.",yt:["https://youtube.com/results?search_query=two+pointers+sliding+window+C%2B%2B"],web:["https://leetcode.com/tag/two-pointers/","https://geeksforgeeks.org/window-sliding-technique/"]},
    {title:"Linked Lists",exp:"Singly/doubly linked list implementation, insertion/deletion at head/tail/position, reverse a linked list (iterative & recursive), Floyd's cycle detection, merge sorted lists.",yt:["https://youtube.com/results?search_query=linked+list+C%2B%2B+DSA+complete"],web:["https://leetcode.com/tag/linked-list/","https://visualgo.net/en/list"]},
    {title:"Stack",exp:"Array and linked-list stack implementation, std::stack STL. Applications: balanced parentheses, next greater element, largest rectangle in histogram, monotonic stack.",yt:["https://youtube.com/results?search_query=stack+data+structure+C%2B%2B"],web:["https://leetcode.com/tag/stack/","https://geeksforgeeks.org/stack-data-structure/"]},
    {title:"Queue & Deque",exp:"FIFO queue implementation, std::queue/deque. Circular queue, sliding window maximum with deque, BFS with queue, priority_queue (max/min heap) in STL.",yt:["https://youtube.com/results?search_query=queue+deque+C%2B%2B+DSA"],web:["https://leetcode.com/tag/queue/","https://cp-algorithms.com/data_structures/stack_queue_modification.html"]},
    {title:"Recursion & Backtracking",exp:"Recursion fundamentals (call stack, base case), tail recursion, memoization intro. Backtracking pattern: N-Queens, Sudoku solver, subsets, permutations, combinations.",yt:["https://youtube.com/results?search_query=recursion+backtracking+C%2B%2B+problems"],web:["https://leetcode.com/tag/backtracking/","https://www.geeksforgeeks.org/introduction-to-backtracking-2/"]},
    {title:"Hashing & Hash Maps",exp:"Hash function concepts, collision handling (chaining, open addressing), std::unordered_map/unordered_set, two-sum pattern, frequency counting, group anagrams.",yt:["https://youtube.com/results?search_query=hashing+hash+map+C%2B%2B+DSA"],web:["https://leetcode.com/tag/hash-table/","https://cp-algorithms.com/string/string-hashing.html"]},
    {title:"Binary Trees",exp:"Tree terminology, recursive traversals (inorder/preorder/postorder), level-order BFS, height/diameter/path sum, LCA (Lowest Common Ancestor), serialization.",yt:["https://youtube.com/results?search_query=binary+tree+C%2B%2B+DSA+complete"],web:["https://leetcode.com/tag/tree/","https://visualgo.net/en/bst"]},
    {title:"Binary Search Trees",exp:"BST property, insertion/deletion/search, inorder gives sorted sequence, balanced BSTs (AVL/Red-Black overview), std::set/map internals, range queries.",yt:["https://youtube.com/results?search_query=BST+binary+search+tree+C%2B%2B"],web:["https://leetcode.com/tag/binary-search-tree/","https://visualgo.net/en/bst"]},
    {title:"Heaps & Priority Queue",exp:"Min/max heap property, heapify, heap sort, std::priority_queue, K largest/smallest elements, median in data stream, merge K sorted lists.",yt:["https://youtube.com/results?search_query=heap+priority+queue+C%2B%2B+DSA"],web:["https://leetcode.com/tag/heap-priority-queue/","https://cp-algorithms.com/data_structures/heap.html"]},
    {title:"Graphs — Basics & Representation",exp:"Graph terminology, adjacency matrix vs list, directed vs undirected, weighted edges. DFS and BFS implementation, connected components, topological sort.",yt:["https://youtube.com/results?search_query=graph+algorithms+C%2B%2B+beginners"],web:["https://cp-algorithms.com/graph/","https://visualgo.net/en/graphds"]},
    {title:"Shortest Path Algorithms",exp:"Dijkstra (single-source, non-negative weights), Bellman-Ford (handles negative weights, detects negative cycles), Floyd-Warshall (all-pairs).",yt:["https://youtube.com/results?search_query=Dijkstra+Bellman-Ford+C%2B%2B"],web:["https://cp-algorithms.com/graph/dijkstra.html","https://leetcode.com/tag/shortest-path/"]},
    {title:"Minimum Spanning Tree",exp:"Kruskal's algorithm (sort edges + Union-Find), Prim's algorithm (greedy vertex expansion), applications in network design, Union-Find with path compression.",yt:["https://youtube.com/results?search_query=MST+Kruskal+Prim+C%2B%2B"],web:["https://cp-algorithms.com/graph/mst_kruskal.html","https://visualgo.net/en/mst"]},
    {title:"Dynamic Programming — 1D",exp:"DP mindset (optimal substructure + overlapping subproblems), memoization vs tabulation, Fibonacci, climbing stairs, house robber, coin change, longest increasing subsequence.",yt:["https://youtube.com/results?search_query=dynamic+programming+C%2B%2B+beginners"],web:["https://leetcode.com/tag/dynamic-programming/","https://cp-algorithms.com/dynamic_programming/"]},
    {title:"Dynamic Programming — 2D",exp:"Grid DP (unique paths, minimum path sum), knapsack 0/1 and unbounded, subset sum, partition equal subset, edit distance, longest common subsequence.",yt:["https://youtube.com/results?search_query=2D+dynamic+programming+knapsack+C%2B%2B"],web:["https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns","https://cp-algorithms.com/"]},
    {title:"Advanced — Trie & Segment Tree",exp:"Trie for prefix matching (insert/search/startsWith), auto-complete application. Segment tree for range queries (sum/min/max), lazy propagation for range updates.",yt:["https://youtube.com/results?search_query=Trie+Segment+Tree+C%2B%2B+advanced"],web:["https://cp-algorithms.com/data_structures/segment_tree.html","https://leetcode.com/tag/trie/"]},
  ];

  return topics.map((t, i) => ({
    day: i + 1,
    phase: getDSAPhase(i),
    hours: 2,
    isProject: false,
    ...t
  }));

  function getDSAPhase(i) {
    if (i < 6) return "Arrays & Strings";
    if (i < 10) return "Linear Data Structures";
    if (i < 14) return "Trees & Heaps";
    if (i < 17) return "Graphs";
    return "DP & Advanced";
  }
})();

// ═══════════════════════════════════════════════════════
//  DSA WEEK-STRUCTURED DATA
// ═══════════════════════════════════════════════════════
const DSA_WEEK_DATA = (function(){
  function t(id, title, exp, practice, task, resources) {
    return {id, title, exp, practice, task, resources: resources||[]};
  }
  function p(id, title, desc) {
    return {id, title, desc};
  }
  return [
    {
      week: 1, title: "Arrays, Strings & Sorting",
      phase: "Arrays & Strings", timeRange: "12–14 hrs",
      topics: [
        t(1, "C++ Setup & STL Intro",
          "Install GCC, configure IDE (VS Code/CLion), compile your first program. Understand namespaces, cin/cout, and overview of the C++ Standard Template Library.",
          "Write 'Hello World', use cin/cout to read name and age, explore #include<bits/stdc++.h>.",
          "🚀 TASK: Write a C++ program that reads N numbers from input, stores them in a vector, and prints min, max, sum, and average.",
          [{type:"yt",url:"https://youtube.com/results?search_query=C%2B%2B+setup+beginners+competitive+programming",label:"C++ Setup Guide"},{type:"web",url:"https://cplusplus.com/doc/tutorial/",label:"cplusplus.com Tutorial"}]),
        t(2, "Arrays — 1D & 2D",
          "Declare, initialize, traverse arrays. Prefix sums, sliding window technique, Kadane's algorithm for max subarray, 2D array traversal, rotation, transpose.",
          "Implement prefix sum array, find max subarray sum using Kadane's, transpose a 3×3 matrix.",
          "🚀 TASK: Given an array of N integers, find: (1) max subarray sum, (2) subarray with given sum using sliding window, (3) rotate the array by K positions.",
          [{type:"yt",url:"https://youtube.com/results?search_query=arrays+C%2B%2B+DSA+tutorial",label:"Arrays C++ Tutorial"},{type:"web",url:"https://leetcode.com/tag/array/",label:"LeetCode Array Problems"}]),
        t(3, "Strings & String Manipulation",
          "std::string methods, character arrays, palindrome check, anagram detection, string hashing, KMP pattern matching, Z-algorithm, Rabin-Karp.",
          "Check if a string is palindrome, detect if two strings are anagrams, count vowels and consonants.",
          "🚀 TASK: Implement (1) reverse words in a sentence, (2) longest palindromic substring (brute force), (3) check if string B is a rotation of string A.",
          [{type:"yt",url:"https://youtube.com/results?search_query=strings+C%2B%2B+DSA+problems",label:"C++ Strings DSA"},{type:"web",url:"https://leetcode.com/tag/string/",label:"LeetCode String Problems"}]),
        t(4, "Sorting Algorithms",
          "Bubble, Selection, Insertion (O(n²)), Merge Sort (O(n log n) stable), Quick Sort (avg O(n log n)), Counting/Radix/Bucket sort. std::sort and custom comparators.",
          "Implement merge sort and quick sort from scratch. Use std::sort with a custom comparator to sort structs.",
          "🚀 TASK: Sort an array of students by (1) name alphabetically, (2) score descending, (3) name then score. Use std::sort with lambdas.",
          [{type:"yt",url:"https://youtube.com/results?search_query=sorting+algorithms+C%2B%2B+visualized",label:"Sorting Algorithms Visualized"},{type:"web",url:"https://visualgo.net/en/sorting",label:"VisuAlgo Sorting"}]),
      ],
      project: p("w1", "Student Leaderboard System",
        "Build a C++ console app that reads student records (name, score) from input, sorts them using multiple criteria (by score descending, then name alphabetically), detects and removes duplicates using a hash set, finds the top-K students, and prints a formatted leaderboard table. Apply arrays, strings, sorting, and STL together in one cohesive program.")
    },
    {
      week: 2, title: "Binary Search & Two Pointers",
      phase: "Arrays & Strings", timeRange: "10–12 hrs",
      topics: [
        t(5, "Binary Search",
          "Classic binary search template, search on answer technique, lower_bound/upper_bound in STL, binary search on rotated array, finding peak element variants.",
          "Implement binary search iteratively and recursively. Use lower_bound/upper_bound on sorted arrays.",
          "🚀 TASK: Solve (1) find first and last position of element in sorted array, (2) search in rotated sorted array, (3) find minimum in rotated array.",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+search+C%2B%2B+complete+guide",label:"Binary Search Complete Guide"},{type:"web",url:"https://leetcode.com/tag/binary-search/",label:"LeetCode Binary Search"}]),
        t(6, "Two Pointers & Sliding Window",
          "Two pointer technique (sorted array, pair sum), sliding window for subarray problems (fixed/variable window), fast-slow pointers, Dutch National Flag.",
          "Find pair with target sum in sorted array using two pointers. Find max sum subarray of fixed size K.",
          "🚀 TASK: Solve (1) 3Sum problem, (2) minimum window substring, (3) longest substring without repeating characters using sliding window.",
          [{type:"yt",url:"https://youtube.com/results?search_query=two+pointers+sliding+window+C%2B%2B",label:"Two Pointers & Sliding Window"},{type:"web",url:"https://leetcode.com/tag/two-pointers/",label:"LeetCode Two Pointers"}]),
      ],
      project: p("w2", "Inventory Search Engine",
        "Build a product inventory system in C++ where items have a name, price, and quantity. Implement: (1) binary search to find a product by price range, (2) two-pointer technique to find two products whose combined price equals a budget, (3) sliding window to find the maximum total value of K consecutive items. Output formatted search results with match details.")
    },
    {
      week: 3, title: "Linked Lists & Stack",
      phase: "Linear Data Structures", timeRange: "12–14 hrs",
      topics: [
        t(7, "Linked Lists",
          "Singly/doubly linked list implementation, insertion/deletion at head/tail/position, reverse a linked list (iterative & recursive), Floyd's cycle detection, merge sorted lists.",
          "Implement singly linked list with insert/delete/print. Write iterative reversal. Detect cycle with Floyd's.",
          "🚀 TASK: Implement (1) reverse linked list in groups of K, (2) find middle node, (3) merge two sorted linked lists, (4) detect and remove a cycle.",
          [{type:"yt",url:"https://youtube.com/results?search_query=linked+list+C%2B%2B+DSA+complete",label:"Linked Lists C++ Complete"},{type:"web",url:"https://leetcode.com/tag/linked-list/",label:"LeetCode Linked List"}]),
        t(8, "Stack",
          "Array and linked-list stack implementation, std::stack STL. Applications: balanced parentheses, next greater element, largest rectangle in histogram, monotonic stack.",
          "Implement a stack using array. Solve balanced parentheses. Find next greater element for each array element.",
          "🚀 TASK: Solve (1) largest rectangle in histogram, (2) daily temperatures using monotonic stack, (3) implement a stack that supports min() in O(1).",
          [{type:"yt",url:"https://youtube.com/results?search_query=stack+data+structure+C%2B%2B",label:"Stack Data Structure C++"},{type:"web",url:"https://leetcode.com/tag/stack/",label:"LeetCode Stack Problems"}]),
      ],
      project: p("w3", "Browser History Manager",
        "Simulate a browser's back/forward history using a doubly linked list for page history and a stack for the back-button navigation. Features: visit a URL (add to list), go back (push to forward stack, pop from back), go forward, delete a visited page from history anywhere in the list, and detect if the user navigated in a loop using Floyd's cycle detection concept. Print the full history and current position after each operation.")
    },
    {
      week: 4, title: "Queue, Recursion & Hashing",
      phase: "Linear Data Structures", timeRange: "12–14 hrs",
      topics: [
        t(9, "Queue & Deque",
          "FIFO queue implementation, std::queue/deque. Circular queue, sliding window maximum with deque, BFS with queue, priority_queue (max/min heap) in STL.",
          "Implement circular queue. Solve sliding window maximum using deque. Implement BFS using std::queue.",
          "🚀 TASK: (1) Implement a deque (double-ended queue) from scratch, (2) find first non-repeating character in a stream, (3) rotten oranges BFS problem.",
          [{type:"yt",url:"https://youtube.com/results?search_query=queue+deque+C%2B%2B+DSA",label:"Queue & Deque C++"},{type:"web",url:"https://leetcode.com/tag/queue/",label:"LeetCode Queue Problems"}]),
        t(10, "Recursion & Backtracking",
          "Recursion fundamentals (call stack, base case), tail recursion, memoization intro. Backtracking pattern: N-Queens, Sudoku solver, subsets, permutations, combinations.",
          "Write recursive factorial, Fibonacci, power function. Generate all subsets and permutations of an array.",
          "🚀 TASK: Solve (1) N-Queens problem, (2) Word Search in a grid, (3) generate all valid parentheses combinations for N pairs.",
          [{type:"yt",url:"https://youtube.com/results?search_query=recursion+backtracking+C%2B%2B+problems",label:"Recursion & Backtracking"},{type:"web",url:"https://leetcode.com/tag/backtracking/",label:"LeetCode Backtracking"}]),
        t(11, "Hashing & Hash Maps",
          "Hash function concepts, collision handling (chaining, open addressing), std::unordered_map/unordered_set, two-sum pattern, frequency counting, group anagrams.",
          "Solve two-sum using unordered_map. Count word frequencies in a sentence. Find duplicates in array using hash set.",
          "🚀 TASK: Solve (1) group anagrams, (2) longest consecutive sequence, (3) subarray with zero sum — all using hash maps.",
          [{type:"yt",url:"https://youtube.com/results?search_query=hashing+hash+map+C%2B%2B+DSA",label:"Hashing & Hash Maps C++"},{type:"web",url:"https://leetcode.com/tag/hash-table/",label:"LeetCode Hash Table"}]),
      ],
      project: p("w4", "Task Scheduler with Priority & Deduplication",
        "Build a task management system: use a queue for FIFO task processing (tasks arrive and are executed in order), a deque for a sliding window to track the peak load in the last K seconds, a hash map to deduplicate tasks by name (skip already-queued tasks), and backtracking to generate all valid orderings of a set of dependent tasks. Output: next task to execute, current peak load window, and all valid task execution orders.")
    },
    {
      week: 5, title: "Trees & BST",
      phase: "Trees & Heaps", timeRange: "12–14 hrs",
      topics: [
        t(12, "Binary Trees",
          "Tree terminology, recursive traversals (inorder/preorder/postorder), level-order BFS, height/diameter/path sum, LCA (Lowest Common Ancestor), serialization.",
          "Implement all 4 traversals recursively. Find height of tree. Check if two trees are identical.",
          "🚀 TASK: Solve (1) maximum path sum in binary tree, (2) zigzag level order traversal, (3) serialize and deserialize binary tree.",
          [{type:"yt",url:"https://youtube.com/results?search_query=binary+tree+C%2B%2B+DSA+complete",label:"Binary Trees C++ Complete"},{type:"web",url:"https://leetcode.com/tag/tree/",label:"LeetCode Tree Problems"}]),
        t(13, "Binary Search Trees",
          "BST property, insertion/deletion/search, inorder gives sorted sequence, balanced BSTs (AVL/Red-Black overview), std::set/map internals, range queries.",
          "Implement BST insert, delete, search. Verify if a given tree is a valid BST using inorder traversal.",
          "🚀 TASK: Solve (1) kth smallest element in BST, (2) lowest common ancestor of BST, (3) convert sorted array to height-balanced BST.",
          [{type:"yt",url:"https://youtube.com/results?search_query=BST+binary+search+tree+C%2B%2B",label:"BST C++ Tutorial"},{type:"web",url:"https://leetcode.com/tag/binary-search-tree/",label:"LeetCode BST Problems"}]),
      ],
      project: p("w5", "File System Directory Tree",
        "Model a file system using a binary tree (or N-ary tree). Implement: insert a file/folder at any path, delete a node, search for a file by name using DFS, print the entire directory in a tree-like format (preorder), find the deepest nested folder (height), and find the LCA of two files (their common parent directory). Serialize the tree to a string and deserialize it back, simulating save/load of directory structure.")
    },
    {
      week: 6, title: "Heaps & Graphs",
      phase: "Trees & Heaps / Graphs", timeRange: "14–16 hrs",
      topics: [
        t(14, "Heaps & Priority Queue",
          "Min/max heap property, heapify, heap sort, std::priority_queue, K largest/smallest elements, median in data stream, merge K sorted lists.",
          "Build a min-heap manually. Use priority_queue to find K largest elements. Implement heap sort.",
          "🚀 TASK: Solve (1) merge K sorted lists using min-heap, (2) find median from data stream, (3) top K frequent elements.",
          [{type:"yt",url:"https://youtube.com/results?search_query=heap+priority+queue+C%2B%2B+DSA",label:"Heaps & Priority Queue"},{type:"web",url:"https://leetcode.com/tag/heap-priority-queue/",label:"LeetCode Heap Problems"}]),
        t(15, "Graphs — Basics & Representation",
          "Graph terminology, adjacency matrix vs list, directed vs undirected, weighted edges. DFS and BFS implementation, connected components, topological sort.",
          "Build a graph using adjacency list. Implement DFS and BFS iteratively and recursively. Find connected components.",
          "🚀 TASK: Solve (1) number of islands (DFS/BFS), (2) topological sort using Kahn's algorithm, (3) detect cycle in directed graph.",
          [{type:"yt",url:"https://youtube.com/results?search_query=graph+algorithms+C%2B%2B+beginners",label:"Graph Algorithms C++"},{type:"web",url:"https://cp-algorithms.com/graph/",label:"CP-Algorithms Graphs"}]),
      ],
      project: p("w6", "Hospital Emergency Room Simulator",
        "Simulate an ER triage system: use a max-heap (priority_queue) where patients arrive with a severity score and must be treated in priority order. Simultaneously track the live median severity across all waiting patients. Model the hospital's room network as a graph (rooms = nodes, corridors = edges) and use BFS to find the nearest available treatment room. Use DFS to detect if any room routing creates a dead-end cycle. Output the treatment order and room assignments.")
    },
    {
      week: 7, title: "Shortest Paths & MST",
      phase: "Graphs", timeRange: "12–14 hrs",
      topics: [
        t(16, "Shortest Path Algorithms",
          "Dijkstra (single-source, non-negative weights), Bellman-Ford (handles negative weights, detects negative cycles), Floyd-Warshall (all-pairs).",
          "Implement Dijkstra using priority_queue. Run Bellman-Ford on a graph with negative edges. Trace Floyd-Warshall on a 4×4 matrix.",
          "🚀 TASK: Solve (1) network delay time (Dijkstra), (2) cheapest flights within K stops (Bellman-Ford), (3) find city with smallest number of neighbors (Floyd-Warshall).",
          [{type:"yt",url:"https://youtube.com/results?search_query=Dijkstra+Bellman-Ford+C%2B%2B",label:"Shortest Path Algorithms"},{type:"web",url:"https://cp-algorithms.com/graph/dijkstra.html",label:"CP-Algorithms Dijkstra"}]),
        t(17, "Minimum Spanning Tree",
          "Kruskal's algorithm (sort edges + Union-Find), Prim's algorithm (greedy vertex expansion), applications in network design, Union-Find with path compression.",
          "Implement Union-Find with path compression and union by rank. Run Kruskal's on a sample graph.",
          "🚀 TASK: (1) Implement Kruskal's MST, (2) implement Prim's MST, (3) solve the 'connecting cities with minimum cost' problem on LeetCode.",
          [{type:"yt",url:"https://youtube.com/results?search_query=MST+Kruskal+Prim+C%2B%2B",label:"MST Kruskal & Prim"},{type:"web",url:"https://cp-algorithms.com/graph/mst_kruskal.html",label:"CP-Algorithms MST"}]),
      ],
      project: p("w7", "City Navigation & Infrastructure Planner",
        "Model a city as a weighted graph (intersections = nodes, roads = edges with travel time). Build a navigation system that: (1) finds the fastest route between two locations using Dijkstra, (2) detects negative-cost shortcuts (e.g. toll refunds) using Bellman-Ford, (3) computes the all-pairs travel time matrix using Floyd-Warshall, and (4) designs the minimum cable/pipe network connecting all districts using Kruskal's MST. Print route details, total cost, and the MST connections.")
    },
    {
      week: 8, title: "Dynamic Programming",
      phase: "DP & Advanced", timeRange: "14–16 hrs",
      topics: [
        t(18, "Dynamic Programming — 1D",
          "DP mindset (optimal substructure + overlapping subproblems), memoization vs tabulation, Fibonacci, climbing stairs, house robber, coin change, longest increasing subsequence.",
          "Solve Fibonacci with memoization vs tabulation. Solve coin change and compare recursion vs DP.",
          "🚀 TASK: Solve (1) longest increasing subsequence (O(n²) DP), (2) word break problem, (3) decode ways — all using bottom-up DP with space optimization.",
          [{type:"yt",url:"https://youtube.com/results?search_query=dynamic+programming+C%2B%2B+beginners",label:"DP C++ Beginners"},{type:"web",url:"https://leetcode.com/tag/dynamic-programming/",label:"LeetCode DP Problems"}]),
        t(19, "Dynamic Programming — 2D",
          "Grid DP (unique paths, minimum path sum), knapsack 0/1 and unbounded, subset sum, partition equal subset, edit distance, longest common subsequence.",
          "Solve unique paths in a grid. Trace 0/1 knapsack on paper. Compute LCS of two strings manually.",
          "🚀 TASK: Solve (1) edit distance (LCS variant), (2) 0/1 knapsack problem, (3) minimum path sum in a grid — implement both memoization and tabulation.",
          [{type:"yt",url:"https://youtube.com/results?search_query=2D+dynamic+programming+knapsack+C%2B%2B",label:"2D DP & Knapsack"},{type:"web",url:"https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns",label:"DP Patterns Guide"}]),
        t(20, "Advanced — Trie & Segment Tree",
          "Trie for prefix matching (insert/search/startsWith), auto-complete application. Segment tree for range queries (sum/min/max), lazy propagation for range updates.",
          "Implement Trie with insert/search/startsWith. Build a segment tree for range sum queries.",
          "🚀 TASK: (1) Implement Trie for autocomplete with a word list, (2) solve 'word search II' using Trie + backtracking, (3) range sum query with updates using segment tree.",
          [{type:"yt",url:"https://youtube.com/results?search_query=Trie+Segment+Tree+C%2B%2B+advanced",label:"Trie & Segment Tree"},{type:"web",url:"https://cp-algorithms.com/data_structures/segment_tree.html",label:"CP-Algorithms Segment Tree"}]),
      ],
      project: p("w8", "Full DSA Capstone — Smart Text Editor",
        "Build a feature-rich text editor backend in C++: (1) Autocomplete suggestions using a Trie on a dictionary, (2) minimum edit distance between two words using 2D DP (spell-check), (3) longest common subsequence to diff two document versions, (4) range character frequency queries using a Segment Tree (how many vowels between index i and j?), (5) word break to validate a sentence against a dictionary. This capstone combines every Week 8 topic into a real-world application.")
    },
  ];
})();

// ═══════════════════════════════════════════════════════
//  APP CORE — Storage, State, Utilities
// ═══════════════════════════════════════════════════════
const APP = (function() {
  'use strict';

  // ── PWA deferred install prompt (must be declared here for strict mode) ──
  let deferredPrompt = null;

  // ── Storage Keys ──
  const KEYS = {
    AI_PROGRESS:  'roadmapAI',
    DSA_PROGRESS: 'roadmapDSA',
    REVISIONS:    'revisions',
    POMO_STATS:   'pomodoroStats',
    STREAKS:      'streaks',
    PROJECTS:     'projects',
    NOTES:        'extraNotes',
    AI_NOTES:     'aiNotes',
    DSA_NOTES:    'dsaNotes',
    FILES:        'fileStorage',
    LAST_TAB:     'lastTab',
    ATTENDANCE:   'attendance',
    POMO_DURATION:'pomoDuration',
  };

  // ── Storage helpers ──
  function load(key, def = {}) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch(e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.error('Storage error:', e); }
  }

  // ── Date helpers ──
  function today() {
    // FIX: Build YYYY-MM-DD purely from local date parts.
    // The original used new Date(y,m,d).toISOString() which converts to UTC
    // and can return the previous calendar day in UTC+ timezones at midnight.
    const now = new Date();
    const y  = now.getFullYear();
    const m  = String(now.getMonth() + 1).padStart(2, '0');
    const d  = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  function dateStr(y, m, d) {
    return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }
  function addDays(dateStr, n) {
    // FIX: Parse as local midnight, add days, return local YYYY-MM-DD.
    // Avoids DST edge-case and UTC shift from toISOString().
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function daysDiff(a, b) {
    const da = new Date(a + 'T00:00:00'), db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
  }
  function fmtDate(d) {
    if (!d) return '—';
    const [y, m, day] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
  }

  // ── UI helpers ──
  let toastTimer;
  function toast(msg, type='info') {
    const el = document.getElementById('toast');
    el.textContent = msg; el.className = `show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.className = '', 2800);
  }
  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function openModal(id) { document.getElementById(id).classList.add('show'); }
  function closeModal(id) { document.getElementById(id).classList.remove('show'); }

  // ── State ──
  let state = {
    currentTab: 'ai',
    aiFilter: 'all',
    dsaFilter: 'all',
    revFilter: 'all',
    aiSearch: '',
    dsaSearch: '',
    pomoType: 'ai',
    pomoRunning: false,
    pomoBreak: false,
    pomoAlarmRinging: false,
    pomoSeconds: 25 * 60,
    pomoInterval: null,
    pomoDuration: 25,
    alarmAudio: null,
    alarmInterval: null,
    editProjectId: null,
    editProjectSource: null,
    notesTimer: null,
  };

  // ═══════════════════════════════════════════════════════
  //  HOME SCREEN
  // ═══════════════════════════════════════════════════════
  function renderHome() {
    // Progress bars
    const aiProg  = load(KEYS.AI_PROGRESS,  {});
    const dsaProg = load(KEYS.DSA_PROGRESS, {});
    const pomStats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    const streaks  = load(KEYS.STREAKS, {});

    const aiDone  = Object.values(aiProg).filter(v => v.done).length;
    // DSA now uses 't1','t2'... keys matching DSA_WEEK_DATA topic ids
    const dsaAllTopics = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
    const dsaDone = dsaAllTopics.filter(t => dsaProg['t'+t.id]?.done).length;

    // AI uses actual roadmap data length, DSA uses week topic count
    const aiTotal  = typeof AI_ROADMAP_DATA  !== 'undefined' ? AI_ROADMAP_DATA.length  : 0;
    const dsaTotal = dsaAllTopics.length || 20;

    const aiPct  = aiTotal  ? Math.round(aiDone  / aiTotal  * 100) : 0;
    const dsaPct = dsaTotal ? Math.round(dsaDone / dsaTotal * 100) : 0;

    const el = (id) => document.getElementById(id);

    // Progress bars
    const aiFill = el('home-ai-prog');
    if (aiFill) aiFill.style.width = aiPct + '%';
    const dsaFill = el('home-dsa-prog');
    if (dsaFill) dsaFill.style.width = dsaPct + '%';

    // FE progress bar (driven by frontend-roadmap.js updateFEProgress, also update here)
    try {
      if (typeof updateFEProgress === 'function') updateFEProgress();
    } catch(e) {}

    // Stats strip
    const maxStreak = Math.max(streaks.ai?.current || 0, streaks.dsa?.current || 0);
    const revisions = load(KEYS.REVISIONS, []);
    const revDue = revisions.filter(r => !r.done && r.date <= today()).length;
    if (el('home-stat-ai'))     el('home-stat-ai').textContent     = aiDone;
    if (el('home-stat-dsa'))    el('home-stat-dsa').textContent    = dsaDone;
    if (el('home-stat-streak')) el('home-stat-streak').textContent = maxStreak + '🔥';
    if (el('home-stat-rev'))    el('home-stat-rev').textContent    = revDue;

    // Continue last session button
    const lastTab = load(KEYS.LAST_TAB, null);
    // ai/dsa are now home-only; only offer continue for other tabs
    const validTabs = ['revision','pomo','streak','projects','extra','files','profile'];
    const contBtn   = el('home-continue-btn');
    const contLabel = el('home-continue-label');
    if (contBtn && lastTab && validTabs.includes(lastTab)) {
      const tabNames = {
        revision:'Revision', pomo:'Pomodoro', streak:'Streaks',
        projects:'Projects', extra:'Notes', files:'Files',
        profile:'Profile'
      };
      if (contLabel) contLabel.textContent = `Continue → ${tabNames[lastTab] || lastTab}`;
      contBtn.style.display = 'flex';
    } else if (contBtn) {
      contBtn.style.display = 'none';
    }
  }

  function continueLastSession() {
    const lastTab = load(KEYS.LAST_TAB, null);
    const validTabs = ['revision','pomo','streak','projects','extra','files','profile'];
    switchTab(validTabs.includes(lastTab) ? lastTab : 'home');
  }

  // ═══════════════════════════════════════════════════════
  //  TAB NAVIGATION
  // ═══════════════════════════════════════════════════════
  function switchTab(name) {
    // Deactivate all
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    // Activate new
    document.getElementById('tab-' + name)?.classList.add('active');
    // Nav button is optional (ai/dsa have no nav buttons) — safe fallback
    const navEl = document.getElementById('nav-' + name);
    if (navEl) {
      navEl.classList.add('active');
      navEl.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    } else if (name === 'ai' || name === 'dsa') {
      // Highlight Home as "active" in nav when on a roadmap tab
      document.getElementById('nav-home')?.classList.add('active');
    }
    state.currentTab = name;
    // Only persist non-home, non-roadmap tabs as "last tab"
    if (name !== 'home' && name !== 'ai' && name !== 'dsa') save(KEYS.LAST_TAB, name);
    // Tab-specific refresh
    if (name === 'home')       renderHome();
    if (name === 'dsa')        renderDSAWeeks();
    if (name === 'revision')   renderRevisions();
    if (name === 'streak')     renderStreaks();
    if (name === 'projects')   renderProjects();
    if (name === 'profile')    { renderProfile(); }
    if (name === 'files')      renderFiles();
    if (name === 'extra')      renderExtraNotes();
    if (name === 'pomo')       renderPomoStats();
  }

  // ═══════════════════════════════════════════════════════
  //  HOURS HELPERS
  // ═══════════════════════════════════════════════════════
  function getTopicHours(d) {
    // Each day has an estimated time. Project days = 3hrs, else 2hrs default.
    return d.isProject ? 3 : (d.hours || 2);
  }

  // ═══════════════════════════════════════════════════════
  //  SMART PROGRESSION
  // ═══════════════════════════════════════════════════════
  function renderNextTopic(type, progress, data) {
    if (type !== 'ai') return;
    const el = document.getElementById('ai-next-topic');
    if (!el) return;
    const doneDays = Object.keys(progress).filter(k => progress[k]?.done).map(Number).sort((a,b)=>a-b);
    const lastDone = doneDays[doneDays.length - 1] || 0;
    const nextDay = data.find(d => !progress[d.day]?.done);
    if (!nextDay) { el.innerHTML = `<div class="next-topic-card"><div class="next-topic-label">🎉 All Done!</div><div class="next-topic-title">You've completed the entire roadmap!</div></div>`; return; }

    // Detect skipped days
    let skippedCount = 0;
    for (let i = 1; i < lastDone; i++) {
      if (!progress[i]?.done) skippedCount++;
    }

    let html = `<div class="next-topic-card">
      <div class="next-topic-label">🎯 Next Best Topic</div>
      <div class="next-topic-title">${esc(nextDay.isProject ? '🚀 ' + nextDay.title : nextDay.title)}</div>
      <div class="next-topic-sub">Day ${nextDay.day} · ${esc(nextDay.phase)} · ~${getTopicHours(nextDay)}h</div>
    </div>`;
    if (skippedCount > 0) {
      html += `<div class="recovery-card">
        <div style="font-size:10px;font-weight:700;color:var(--c3);letter-spacing:.8px;text-transform:uppercase;font-family:var(--font-mono)">⚠️ Recovery Plan</div>
        <div style="font-size:12px;color:var(--t1);margin-top:4px">You have ${skippedCount} skipped day${skippedCount>1?'s':''}. Try to complete them before moving ahead to strengthen your foundation.</div>
      </div>`;
    }
    el.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════════
  //  INLINE REVISION PANEL (shown inside AI/DSA roadmaps)
  // ═══════════════════════════════════════════════════════
  function renderInlineRevisions(containerId, source) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();

    // Only show due/overdue revisions for this source
    const relevant = revs.filter(r => {
      if (r.source !== source) return false;
      return !r.done && r.date <= todayStr;
    }).sort((a, b) => a.date.localeCompare(b.date));

    if (!relevant.length) {
      el.innerHTML = '';
      return;
    }

    const panelId = containerId + '-panel';
    const bodyId  = containerId + '-body';

    el.innerHTML = `
    <div class="inline-rev-panel" id="${panelId}">
      <div class="inline-rev-toggle" onclick="
        var p=document.getElementById('${panelId}');
        p.classList.toggle('open');
      ">
        <div class="inline-rev-toggle-left">
          <span style="font-size:14px">🔁</span>
          <span class="inline-rev-label">REVISIONS DUE</span>
          <span class="inline-rev-count">${relevant.length}</span>
        </div>
        <span class="inline-rev-arrow">▾</span>
      </div>
      <div class="inline-rev-body" id="${bodyId}">
        <div class="inline-rev-body-inner">
          ${relevant.map(r => {
            const overdue = r.date < todayStr;
            const dueColor = overdue ? 'var(--c3)' : 'var(--c4)';
            const dueText  = overdue ? `⚠️ ${daysDiff(r.date, todayStr)}d overdue` : '📌 Due today';
            return `
            <div class="inline-rev-item" id="irev-${r.id}">
              <div class="inline-rev-day">${r.topicDay}</div>
              <div class="inline-rev-info">
                <div class="inline-rev-topic">${esc(r.topicTitle)}</div>
                <div class="inline-rev-due" style="color:${dueColor}">${dueText}</div>
              </div>
              <button class="inline-rev-done-btn ${r.done?'done':''}"
                onclick="APP.markInlineRevDone('${r.id}','${containerId}','${source}')">
                ${r.done ? '✓' : 'Done'}
              </button>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }

  function markInlineRevDone(id, containerId, source) {
    const revs = load(KEYS.REVISIONS, []);
    const idx = revs.findIndex(r => r.id === id);
    if (idx < 0) return;
    revs[idx].done = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderInlineRevisions(containerId, source);
    // Also refresh the dedicated section revision sub-tab if visible
    const secRevEl = document.getElementById(source + '-revision-list');
    if (secRevEl) renderSectionRevisions(source);
    updateHeader();
    toast(revs[idx].done ? '✅ Revision marked complete!' : '↩️ Revision unmarked', 'success');
  }

  // ═══════════════════════════════════════════════════════
  //  STRUCTURED AI ROADMAP — LEVEL / WEEK / DAY NAVIGATION
  // ═══════════════════════════════════════════════════════
  let aiCurrentLevel = null;
  let aiCurrentWeek = null;

  function showScreen(screenId) {
    ['ai-screen-levels','ai-screen-weeks','ai-screen-days'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const target = document.getElementById(screenId);
    if (target) target.style.display = 'block';
  }

  function selectAILevel(levelKey) {
    aiCurrentLevel = levelKey;
    aiCurrentWeek = null;
    const levelData = STRUCTURED_AI_ROADMAP[levelKey];
    if (!levelData) return;

    // Update title
    const titleEl = document.getElementById('ai-weeks-title');
    if (titleEl) titleEl.textContent = levelData.label + ' (' + levelData.days + ' Days)';

    // Render level summary bar
    const sumEl = document.getElementById('ai-level-summary');
    if (sumEl) {
      const cls = levelKey === 'beginner' ? 'beginner-summary' : levelKey === 'intermediate' ? 'intermediate-summary' : 'advanced-summary';
      const valClass = levelKey === 'beginner' ? '' : levelKey === 'intermediate' ? 'yellow' : 'red';
      sumEl.innerHTML = `<div class="ai-level-summary-bar ${cls}">
        <div class="ai-sum-left">
          <div class="ai-sum-title">${esc(levelData.label)}</div>
          <div class="ai-sum-sub">${esc(levelData.goal)}</div>
        </div>
        <div class="ai-sum-stats">
          <div class="ai-sum-stat"><div class="ai-sum-val ${valClass}">${levelData.days}</div><div class="ai-sum-lbl">Days</div></div>
          <div class="ai-sum-stat"><div class="ai-sum-val ${valClass}">${levelData.totalHours}h</div><div class="ai-sum-lbl">Total</div></div>
        </div>
      </div>`;
    }

    // Render weeks list
    const weeksEl = document.getElementById('ai-weeks-list');
    if (!weeksEl) return;
    const progKey = 'ai_struct_' + levelKey;
    const progress = load(progKey, {});

    let html = '';
    levelData.weeks.forEach(week => {
      const totalDays = week.days.length;
      const doneDays = week.days.filter(d => progress['w' + week.week + 'd' + d.day]?.done).length;
      const pct = Math.round((doneDays / totalDays) * 100);
      const isComplete = doneDays === totalDays;

      html += `<div class="ai-week-card ${isComplete ? 'week-complete' : ''}" onclick="APP.selectAIWeek(${week.week})">
        <div class="ai-week-header">
          <div class="ai-week-num">
            <div class="ai-week-num-lbl">WK</div>
            <div class="ai-week-num-val">${week.week}</div>
          </div>
          <div class="ai-week-info">
            <div class="ai-week-title">${esc(week.title)}</div>
            <div class="ai-week-sub">${totalDays} days</div>
            <span class="ai-week-time-badge">⏱️ ${esc(week.timeRange)}</span>
          </div>
          <div class="ai-week-right">
            <div class="ai-week-prog-txt">${doneDays}/${totalDays}</div>
            <div class="ai-week-mini-prog"><div class="ai-week-mini-fill" style="width:${pct}%"></div></div>
          </div>
        </div>
      </div>`;
    });
    weeksEl.innerHTML = html;
    showScreen('ai-screen-weeks');
    renderInlineRevisions('ai-inline-rev-weeks', 'ai');
  }

  function selectAIWeek(weekNum) {
    aiCurrentWeek = weekNum;
    const levelData = STRUCTURED_AI_ROADMAP[aiCurrentLevel];
    if (!levelData) return;
    const weekData = levelData.weeks.find(w => w.week === weekNum);
    if (!weekData) return;

    // Update title
    const titleEl = document.getElementById('ai-days-title');
    if (titleEl) titleEl.textContent = 'Week ' + weekNum + ' — ' + weekData.title;

    // Week summary bar
    const wSumEl = document.getElementById('ai-week-summary');
    if (wSumEl) {
      const progKey = 'ai_struct_' + aiCurrentLevel;
      const progress = load(progKey, {});
      const totalDays = weekData.days.length;
      const doneDays = weekData.days.filter(d => progress['w' + weekNum + 'd' + d.day]?.done).length;
      wSumEl.innerHTML = `<div class="ai-week-summary-bar">
        <div class="ai-wsb-left">
          <div class="ai-wsb-title">Week ${weekNum}</div>
          <div class="ai-wsb-sub">${esc(weekData.title)}</div>
        </div>
        <div class="ai-wsb-right">
          <div class="ai-wsb-stat"><div class="ai-wsb-val">${esc(weekData.timeRange)}</div><div class="ai-wsb-lbl">⏱️ Week Time</div></div>
          <div class="ai-wsb-stat"><div class="ai-wsb-val">${doneDays}/${totalDays}</div><div class="ai-wsb-lbl">Days Done</div></div>
        </div>
      </div>`;
    }

    // Render days
    const daysEl = document.getElementById('ai-structured-days-list');
    if (!daysEl) return;
    const progKey = 'ai_struct_' + aiCurrentLevel;
    const progress = load(progKey, {});

    let html = '';
    weekData.days.forEach(d => {
      const progKey2 = 'w' + weekNum + 'd' + d.day;
      const isDone = !!(progress[progKey2]?.done);
      // Revision badge for this day
      const revs = load(KEYS.REVISIONS, []);
      const todayRevStr = today();
      const dayRevs = revs.filter(r => r.source === 'ai' && r.topicDay === d.day && !r.done);
      const hasDueRev = dayRevs.some(r => r.date <= todayRevStr);
      const hasUpcomingRev = !hasDueRev && dayRevs.length > 0;
      const revBadgeHtml = hasDueRev
        ? `<span class="topic-rev-badge rev-due">🔁 Revision Due</span>`
        : hasUpcomingRev
        ? `<span class="topic-rev-badge rev-upcoming">⏳ Upcoming</span>`
        : '';
      const resHtml = (d.resources || []).map(r => {
        const ico = r.type === 'yt' ? '▶' : '🌐';
        const bg = r.type === 'yt' ? 'rgba(255,0,0,.15)' : 'rgba(0,245,212,.1)';
        return `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:${bg}">${ico}</div><span>${esc(r.label)}</span></a>`;
      }).join('');

      html += `<div class="ai-s-day-card ${isDone ? 's-done' : ''} ${hasDueRev ? 'topic-rev-due' : ''}" id="ai-sday-${weekNum}-${d.day}">
        <div class="ai-s-day-header" onclick="APP.toggleStructuredDay(${weekNum},${d.day})">
          <div class="ai-s-day-num">
            <div class="ai-s-day-lbl">DAY</div>
            <div class="ai-s-day-val">${d.day}</div>
          </div>
          <div class="ai-s-day-info">
            <div class="ai-s-day-title">${esc(d.title)}</div>
            <div class="ai-s-day-meta">
              <span class="ai-s-time-badge">⏱️ ${esc(d.time)}</span>
              ${isDone ? '<span style="font-size:9px;padding:1px 6px;border-radius:9999px;background:rgba(6,214,160,.15);border:1px solid rgba(6,214,160,.3);color:var(--c5);font-weight:700">✓ Done</span>' : ''}
              ${revBadgeHtml}
            </div>
          </div>
          <div class="ai-s-day-right">
            <div class="cb ${isDone ? 'checked' : ''}" onclick="event.stopPropagation();APP.toggleStructuredDone(${weekNum},${d.day})">${isDone ? '✓' : ''}</div>
            <div class="expand-btn">▾</div>
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
            ${resHtml ? `<div class="ai-s-section"><div class="ai-s-section-title">📺 Resources</div>${resHtml}</div>` : ''}
            <div class="ai-s-section">
              <div class="ai-s-section-title">💻 Practice</div>
              <div class="ai-s-practice">${esc(d.practice)}</div>
            </div>
            <div class="ai-s-section">
              <div class="ai-s-section-title">🚀 Task</div>
              <div class="ai-s-task">${esc(d.task)}</div>
            </div>
            <div class="ai-s-section">
              <div class="ai-s-time-box">
                <span class="ai-s-time-ico">⏱️</span>
                <span class="ai-s-time-text">${esc(d.time)} estimated for today</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
    // ── WEEK PROJECT CARD ──
    const proj = weekData.project;
    if (proj) {
      const progKey3 = 'ai_struct_' + aiCurrentLevel;
      const prog3 = load(progKey3, {});
      const projStatus = prog3['proj_' + proj.id] || 'not-started';
      const projStatusPillClass = projStatus === 'completed' ? 'status-completed' : projStatus === 'in-progress' ? 'status-in-progress' : 'status-not-started';
      const projStatusLabel = projStatus === 'completed' ? '✓ Completed' : projStatus === 'in-progress' ? '⚡ In Progress' : '○ Not Started';
      const projCardClass = projStatus === 'completed' ? 'ai-proj-status-completed' : projStatus === 'in-progress' ? 'ai-proj-status-in-progress' : '';

      html += `
      <div class="ai-proj-divider">
        <div class="ai-proj-divider-line"></div>
        <div class="ai-proj-divider-label">🚀 Week ${weekNum} Project</div>
        <div class="ai-proj-divider-line right"></div>
      </div>
      <div class="ai-proj-card ${projCardClass}" id="ai-proj-${proj.id}">
        <div class="ai-proj-header" onclick="APP.toggleAIProject('${proj.id}')">
          <div class="ai-proj-icon">🚀</div>
          <div class="ai-proj-info">
            <div class="ai-proj-badge">✦ Week Project</div>
            <div class="ai-proj-title">${esc(proj.title)}</div>
            <div class="ai-proj-meta">Applies all Week ${weekNum} concepts</div>
          </div>
          <div class="ai-proj-status-pill">
            <div class="ai-proj-status ${projStatusPillClass}" id="ai-proj-status-pill-${proj.id}">${projStatusLabel}</div>
            <div class="ai-proj-chevron" id="ai-proj-chev-${proj.id}">▾</div>
          </div>
        </div>
        <div class="ai-proj-body" id="ai-proj-body-${proj.id}">
          <div class="ai-proj-body-inner">
            <div class="ai-proj-desc-box">
              <div class="ai-proj-desc-label">📋 Project Description</div>
              <div class="ai-proj-desc-text">${esc(proj.desc)}</div>
            </div>
            <div class="ai-proj-status-label">Update Status:</div>
            <div class="ai-proj-status-row">
              <button class="dsa-proj-status-btn spb-not-started ${projStatus === 'not-started' ? 'active' : ''}"
                onclick="event.stopPropagation();APP.setAIProjectStatus('${proj.id}',${weekNum},'not-started')">○ Not Started</button>
              <button class="dsa-proj-status-btn spb-in-progress ${projStatus === 'in-progress' ? 'active' : ''}"
                onclick="event.stopPropagation();APP.setAIProjectStatus('${proj.id}',${weekNum},'in-progress')">⚡ In Progress</button>
              <button class="dsa-proj-status-btn spb-completed ${projStatus === 'completed' ? 'active' : ''}"
                onclick="event.stopPropagation();APP.setAIProjectStatus('${proj.id}',${weekNum},'completed')">✓ Completed</button>
            </div>
          </div>
        </div>
      </div>`;
    }

    daysEl.innerHTML = html;
    showScreen('ai-screen-days');
    renderInlineRevisions('ai-inline-rev-days', 'ai');
  }

  function toggleAIProject(projId) {
    const card = document.getElementById('ai-proj-' + projId);
    const chev = document.getElementById('ai-proj-chev-' + projId);
    if (!card) return;
    const isOpen = card.classList.contains('ai-proj-open');
    card.classList.toggle('ai-proj-open', !isOpen);
    if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
  }

  function setAIProjectStatus(projId, weekNum, status) {
    const progKey = 'ai_struct_' + aiCurrentLevel;
    const prog = load(progKey, {});
    prog['proj_' + projId] = status;
    save(progKey, prog);

    const card = document.getElementById('ai-proj-' + projId);
    if (card) {
      card.classList.remove('ai-proj-status-completed', 'ai-proj-status-in-progress');
      if (status === 'completed')   card.classList.add('ai-proj-status-completed');
      if (status === 'in-progress') card.classList.add('ai-proj-status-in-progress');
    }

    const pill = document.getElementById('ai-proj-status-pill-' + projId);
    if (pill) {
      pill.className = 'ai-proj-status ' + (status === 'completed' ? 'status-completed' : status === 'in-progress' ? 'status-in-progress' : 'status-not-started');
      pill.textContent = status === 'completed' ? '✓ Completed' : status === 'in-progress' ? '⚡ In Progress' : '○ Not Started';
    }

    // Update all status buttons inside the card
    const body = document.getElementById('ai-proj-body-' + projId);
    if (body) {
      body.querySelectorAll('.dsa-proj-status-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((status === 'not-started' && btn.classList.contains('spb-not-started')) ||
            (status === 'in-progress' && btn.classList.contains('spb-in-progress')) ||
            (status === 'completed'   && btn.classList.contains('spb-completed'))) {
          btn.classList.add('active');
        }
      });
    }

    if (status === 'completed') {
      toast('🚀 Project completed! Outstanding work!', 'success');
      if (typeof XP !== 'undefined') { XP.showXPToast(100); XP.checkNewBadges(XP.getStats()); }
    } else if (status === 'in-progress') {
      toast('⚡ Project marked in progress. Keep building!', 'info');
    } else {
      toast('↩️ Project status reset', 'info');
    }
  }

  function toggleStructuredDay(weekNum, dayNum) {
    const el = document.getElementById('ai-sday-' + weekNum + '-' + dayNum);
    if (el) el.classList.toggle('s-open');
  }

  function toggleStructuredDone(weekNum, dayNum) {
    const progKey = 'ai_struct_' + aiCurrentLevel;
    const prog = load(progKey, {});
    const key = 'w' + weekNum + 'd' + dayNum;
    if (!prog[key]) prog[key] = {};
    const wasDone = !!prog[key].done;
    prog[key].done = !wasDone;
    if (prog[key].done) {
      prog[key].completedDate = prog[key].completedDate || today();
    }
  save(progKey, prog);
if (prog[key].done) {
  const levelData = STRUCTURED_AI_ROADMAP[aiCurrentLevel];
  const weekData = levelData ? levelData.weeks.find(function(w){ return w.week === weekNum;}) : null;
  const dayData = weekData ? weekData.days.find(function(d){ return d.day === dayNum; }) : null;
  const title = dayData ? dayData.title : ('Day ' + dayNum);
  scheduleRevisions('ai', dayNum, prog[key].completedDate, title);
  updateStreak('ai', true);
  updateHeader();
  selectAIWeek(weekNum);
  renderInlineRevisions('ai-inline-rev-days', 'ai');
  const aiRevEl = document.getElementById('ai-revision-list');
  if (aiRevEl) renderSectionRevisions('ai');
  toast('✅ Day ' + dayNum + ' completed! Revisions scheduled 🔁', 'success');
} else {
  selectAIWeek(weekNum);
  updateHeader();
  toast('↩️ Day ' + dayNum + ' marked incomplete', 'info');
}
  }

  function backToLevels() {
    showScreen('ai-screen-levels');
    aiCurrentLevel = null;
    aiCurrentWeek = null;
  }

  function backToWeeks() {
    if (aiCurrentLevel) {
      selectAILevel(aiCurrentLevel);
    } else {
      showScreen('ai-screen-levels');
      aiCurrentLevel = null;
      aiCurrentWeek = null;
    }
  }

  // ═══════════════════════════════════════════════════════
  //  DSA WEEK-WISE RENDER SYSTEM
  // ═══════════════════════════════════════════════════════
  function showDSAScreen(id) {
    ['dsa-screen-weeks','dsa-screen-detail'].forEach(sid => {
      const el = document.getElementById(sid);
      if (el) el.style.display = sid === id ? 'block' : 'none';
    });
  }

  function renderDSAWeeks() {
    const prog = load(KEYS.DSA_PROGRESS, {});
    // Overall stats
    const allTopics = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
    const totalHrs = allTopics.length * 2;
    const doneCount = allTopics.filter(t => prog['t' + t.id]?.done).length;
    const doneHrs = doneCount * 2;
    const remHrs = totalHrs - doneHrs;
    const pct = allTopics.length ? Math.round(doneCount / allTopics.length * 100) : 0;

    const totalEl = document.getElementById('dsa-hrs-total');
    const doneEl  = document.getElementById('dsa-hrs-done');
    const remEl   = document.getElementById('dsa-hrs-rem');
    const fillEl  = document.getElementById('dsa-prog-fill');
    const textEl  = document.getElementById('dsa-prog-text');
    const pctEl   = document.getElementById('dsa-prog-pct');
    if (totalEl) totalEl.textContent = totalHrs;
    if (doneEl)  doneEl.textContent  = doneHrs;
    if (remEl)   remEl.textContent   = remHrs;
    if (fillEl)  fillEl.style.width  = pct + '%';
    if (textEl)  textEl.textContent  = doneCount + '/' + allTopics.length + ' topics';
    if (pctEl)   pctEl.textContent   = pct + '%';

    const listEl = document.getElementById('dsa-weeks-list');
    if (!listEl) return;

    let html = '';
    DSA_WEEK_DATA.forEach(week => {
      const total = week.topics.length;
      const done  = week.topics.filter(t => prog['t' + t.id]?.done).length;
      const wpct  = total ? Math.round(done / total * 100) : 0;
      const complete = done === total;

      // Project status
      const projStatus = week.project ? (prog['proj_' + week.project.id] || 'not-started') : null;
      const projStatusClass = projStatus === 'completed' ? 'proj-status-completed' : projStatus === 'in-progress' ? 'proj-status-in-progress' : '';
      const projStatusPillClass = projStatus === 'completed' ? 'status-completed' : projStatus === 'in-progress' ? 'status-in-progress' : 'status-not-started';
      const projStatusLabel = projStatus === 'completed' ? '✓ Completed' : projStatus === 'in-progress' ? '⚡ In Progress' : '○ Not Started';

      html += `<div class="dsa-week-card ${complete ? 'dsa-week-complete' : ''}" id="dsa-wk-${week.week}">
        <div class="dsa-week-header" onclick="APP.toggleDSAWeek(${week.week})">
          <div class="dsa-wk-num">
            <div class="dsa-wk-lbl">WK</div>
            <div class="dsa-wk-val">${week.week}</div>
          </div>
          <div class="dsa-wk-info">
            <div class="dsa-wk-title">${esc(week.title)}</div>
            <div class="dsa-wk-meta">${total} topics · ⏱️ ${esc(week.timeRange)}</div>
            <div class="dsa-wk-phase">${esc(week.phase)}</div>
          </div>
          <div class="dsa-wk-right">
            <div class="dsa-wk-prog-txt">${done}/${total}</div>
            <div class="dsa-wk-mini-prog"><div class="dsa-wk-mini-fill" style="width:${wpct}%"></div></div>
            <div class="dsa-wk-chevron">▾</div>
          </div>
        </div>
        <div class="dsa-week-body">
          <div class="dsa-week-body-inner">
            <!-- Week progress bar -->
            <div class="dsa-wk-full-prog">
              <div class="dsa-wk-full-track"><div class="dsa-wk-full-fill" id="dsa-wk-fill-${week.week}" style="width:${wpct}%"></div></div>
              <div class="dsa-wk-prog-row"><span>${done} of ${total} topics done</span><span>${wpct}%</span></div>
            </div>
            <!-- Topics -->
            <div class="dsa-topic-section">
              <div class="dsa-topic-section-title">📚 Topics</div>
              ${week.topics.map(t => {
                const isDone = !!(prog['t' + t.id]?.done);
                const revs = load(KEYS.REVISIONS, []);
                const todayRevStr = today();
                const topicRevs = revs.filter(r => r.source === 'dsa' && r.topicDay === t.id && !r.done);
                const hasDueRev = topicRevs.some(r => r.date <= todayRevStr);
                const hasUpcomingRev = !hasDueRev && topicRevs.length > 0;
                const revBadge = hasDueRev ? `<span class="topic-rev-badge rev-due">🔁 Revision Due</span>` : hasUpcomingRev ? `<span class="topic-rev-badge rev-upcoming">⏳ Upcoming</span>` : '';
                const resHtml = (t.resources||[]).map(r => {
                  const ico = r.type === 'yt' ? '▶' : '🌐';
                  const bg  = r.type === 'yt' ? 'rgba(255,0,0,.15)' : 'rgba(0,245,212,.1)';
                  return `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:${bg}">${ico}</div><span>${esc(r.label)}</span></a>`;
                }).join('');
                return `<div class="dsa-topic-item ${isDone ? 'dsa-topic-done' : ''} ${hasDueRev ? 'topic-rev-due' : ''}" id="dsa-t-${t.id}">
                  <div class="dsa-topic-header" onclick="APP.toggleDSATopic(${t.id})">
                    <div class="dsa-topic-dot"></div>
                    <div class="dsa-topic-info">
                      <div class="dsa-topic-name">${esc(t.title)}</div>
                      ${revBadge ? `<div style="margin-top:3px">${revBadge}</div>` : ''}
                    </div>
                    <div class="dsa-topic-cb ${isDone ? 'checked' : ''}" onclick="event.stopPropagation();APP.toggleDSATopicDone(${week.week},${t.id})">${isDone ? '✓' : ''}</div>
                    <div class="dsa-topic-expand">▾</div>
                  </div>
                  <div class="dsa-topic-body">
                    <div class="dsa-topic-body-inner">
                      <div class="dsa-t-section">
                        <div class="dsa-t-section-title">📖 Explanation</div>
                        <div class="dsa-t-text">${esc(t.exp)}</div>
                      </div>
                      ${resHtml ? `<div class="dsa-t-section"><div class="dsa-t-section-title">📺 Resources</div>${resHtml}</div>` : ''}
                      <div class="dsa-t-section">
                        <div class="dsa-t-section-title">💻 Practice</div>
                        <div class="dsa-t-practice">${esc(t.practice)}</div>
                      </div>
                      <div class="dsa-t-section">
                        <div class="dsa-t-section-title">🚀 Task</div>
                        <div class="dsa-t-task">${esc(t.task)}</div>
                      </div>
                    </div>
                  </div>
                </div>`;
              }).join('')}
            </div>

            ${week.project ? `
            <!-- ── WEEK PROJECT ── -->
            <div class="dsa-proj-divider">
              <div class="dsa-proj-divider-line"></div>
              <div class="dsa-proj-divider-label">🏗️ Week ${week.week} Project</div>
              <div class="dsa-proj-divider-line right"></div>
            </div>
            <div class="dsa-proj-card ${projStatusClass}" id="dsa-proj-${week.project.id}">
              <div class="dsa-proj-header" onclick="APP.toggleDSAProject('${week.project.id}')">
                <div class="dsa-proj-icon">🏗️</div>
                <div class="dsa-proj-info">
                  <div class="dsa-proj-badge">⚡ Week Project</div>
                  <div class="dsa-proj-title">${esc(week.project.title)}</div>
                  <div class="dsa-proj-meta">Applies all Week ${week.week} concepts</div>
                </div>
                <div class="dsa-proj-status-pill">
                  <div class="dsa-proj-status ${projStatusPillClass}" id="dsa-proj-status-pill-${week.project.id}">${projStatusLabel}</div>
                  <div class="dsa-proj-chevron" id="dsa-proj-chev-${week.project.id}">▾</div>
                </div>
              </div>
              <div class="dsa-proj-body" id="dsa-proj-body-${week.project.id}">
                <div class="dsa-proj-body-inner">
                  <div class="dsa-proj-desc-box">
                    <div class="dsa-proj-desc-label">📋 Project Description</div>
                    <div class="dsa-proj-desc-text">${esc(week.project.desc)}</div>
                  </div>
                  <div class="dsa-proj-status-label" style="margin-bottom:8px">Update Status:</div>
                  <div class="dsa-proj-status-row">
                    <button class="dsa-proj-status-btn spb-not-started ${projStatus === 'not-started' ? 'active' : ''}"
                      onclick="event.stopPropagation();APP.setDSAProjectStatus('${week.project.id}',${week.week},'not-started')">○ Not Started</button>
                    <button class="dsa-proj-status-btn spb-in-progress ${projStatus === 'in-progress' ? 'active' : ''}"
                      onclick="event.stopPropagation();APP.setDSAProjectStatus('${week.project.id}',${week.week},'in-progress')">⚡ In Progress</button>
                    <button class="dsa-proj-status-btn spb-completed ${projStatus === 'completed' ? 'active' : ''}"
                      onclick="event.stopPropagation();APP.setDSAProjectStatus('${week.project.id}',${week.week},'completed')">✓ Completed</button>
                  </div>
                </div>
              </div>
            </div>` : ''}

          </div>
        </div>
      </div>`;
    });
    listEl.innerHTML = html;
    showDSAScreen('dsa-screen-weeks');
    renderInlineRevisions('dsa-inline-rev-overview', 'dsa');
  }

  function toggleDSAProject(projId) {
    const card = document.getElementById('dsa-proj-' + projId);
    const body = document.getElementById('dsa-proj-body-' + projId);
    const chev = document.getElementById('dsa-proj-chev-' + projId);
    if (!card || !body) return;
    const isOpen = card.classList.contains('dsa-proj-open');
    card.classList.toggle('dsa-proj-open', !isOpen);
    if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
  }

  function setDSAProjectStatus(projId, weekNum, status) {
    const prog = load(KEYS.DSA_PROGRESS, {});
    prog['proj_' + projId] = status;
    save(KEYS.DSA_PROGRESS, prog);

    // Update card class
    const card = document.getElementById('dsa-proj-' + projId);
    if (card) {
      card.classList.remove('proj-status-completed', 'proj-status-in-progress');
      if (status === 'completed')   card.classList.add('proj-status-completed');
      if (status === 'in-progress') card.classList.add('proj-status-in-progress');
    }

    // Update pill text + class
    const pill = document.getElementById('dsa-proj-status-pill-' + projId);
    if (pill) {
      pill.className = 'dsa-proj-status ' + (status === 'completed' ? 'status-completed' : status === 'in-progress' ? 'status-in-progress' : 'status-not-started');
      pill.textContent = status === 'completed' ? '✓ Completed' : status === 'in-progress' ? '⚡ In Progress' : '○ Not Started';
    }

    // Update status buttons active state
    const body = document.getElementById('dsa-proj-body-' + projId);
    if (body) {
      body.querySelectorAll('.dsa-proj-status-btn').forEach(btn => {
        const s = btn.classList.contains('spb-not-started') ? 'not-started'
                : btn.classList.contains('spb-in-progress') ? 'in-progress' : 'completed';
        btn.classList.toggle('active', s === status);
      });
    }

    const labels = {'not-started':'marked Not Started','in-progress':'started! Keep building 🔨','completed':'completed! Great work! 🎉'};
    toast(`🏗️ Project ${labels[status] || 'updated'}`, status === 'completed' ? 'success' : 'info');
    if (status === 'completed') updateStreak('dsa', true);
  }

  function toggleDSAWeek(weekNum) {
    const card = document.getElementById('dsa-wk-' + weekNum);
    if (!card) return;
    card.classList.toggle('dsa-wk-open');
    // Smooth fill animation on open
    if (card.classList.contains('dsa-wk-open')) {
      const prog = load(KEYS.DSA_PROGRESS, {});
      const week = DSA_WEEK_DATA.find(w => w.week === weekNum);
      if (week) {
        const done = week.topics.filter(t => prog['t' + t.id]?.done).length;
        const pct  = week.topics.length ? Math.round(done / week.topics.length * 100) : 0;
        requestAnimationFrame(() => {
          const fill = document.getElementById('dsa-wk-fill-' + weekNum);
          if (fill) fill.style.width = pct + '%';
        });
      }
    }
  }

  function toggleDSATopic(topicId) {
    const el = document.getElementById('dsa-t-' + topicId);
    if (el) el.classList.toggle('dsa-t-open');
  }

  function toggleDSATopicDone(weekNum, topicId) {
    const prog = load(KEYS.DSA_PROGRESS, {});
    const key = 't' + topicId;
    if (!prog[key]) prog[key] = {};
    prog[key].done = !prog[key].done;
    // Store completion date when first marked done
    if (prog[key].done && !prog[key].completedDate) {
      prog[key].completedDate = today();
    }
    save(KEYS.DSA_PROGRESS, prog);

    // Update UI without full re-render
    const item = document.getElementById('dsa-t-' + topicId);
    const isDone = prog[key].done;
    if (item) {
      item.classList.toggle('dsa-topic-done', isDone);
      const cb = item.querySelector('.dsa-topic-cb');
      if (cb) { cb.classList.toggle('checked', isDone); cb.textContent = isDone ? '✓' : ''; }
      const dot = item.querySelector('.dsa-topic-dot');
      if (dot) dot.style.cssText = isDone ? 'background:var(--c5);border-color:var(--c5);box-shadow:0 0 8px rgba(6,214,160,.4)' : '';
      const name = item.querySelector('.dsa-topic-name');
      if (name) name.style.cssText = isDone ? 'color:var(--t2);text-decoration:line-through' : '';
    }

    // Update week card stats
    const week = DSA_WEEK_DATA.find(w => w.week === weekNum);
    if (week) {
      const done = week.topics.filter(t => prog['t' + t.id]?.done).length;
      const pct  = week.topics.length ? Math.round(done / week.topics.length * 100) : 0;
      const complete = done === week.topics.length;
      const card = document.getElementById('dsa-wk-' + weekNum);
      if (card) {
        card.classList.toggle('dsa-week-complete', complete);
        const ptxt = card.querySelector('.dsa-wk-prog-txt');
        if (ptxt) { ptxt.textContent = done + '/' + week.topics.length; }
        const miniF = card.querySelector('.dsa-wk-mini-fill');
        if (miniF) miniF.style.width = pct + '%';
        const fullF = document.getElementById('dsa-wk-fill-' + weekNum);
        if (fullF) fullF.style.width = pct + '%';
        const progRow = card.querySelector('.dsa-wk-prog-row');
        if (progRow) progRow.innerHTML = `<span>${done} of ${week.topics.length} topics done</span><span>${pct}%</span>`;
      }
    }

    // Update overall header stats
    const allTopics = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
    const doneCount = allTopics.filter(t => prog['t' + t.id]?.done).length;
    const pct2 = allTopics.length ? Math.round(doneCount / allTopics.length * 100) : 0;
    const totalHrs = allTopics.length * 2;
    const doneHrs  = doneCount * 2;
    const totalEl = document.getElementById('dsa-hrs-total');
    const doneEl  = document.getElementById('dsa-hrs-done');
    const remEl   = document.getElementById('dsa-hrs-rem');
    const fillEl  = document.getElementById('dsa-prog-fill');
    const textEl  = document.getElementById('dsa-prog-text');
    const pctEl   = document.getElementById('dsa-prog-pct');
    if (totalEl) totalEl.textContent = totalHrs;
    if (doneEl)  doneEl.textContent  = doneHrs;
    if (remEl)   remEl.textContent   = totalHrs - doneHrs;
    if (fillEl)  fillEl.style.width  = pct2 + '%';
    if (textEl)  textEl.textContent  = doneCount + '/' + allTopics.length + ' topics';
    if (pctEl)   pctEl.textContent   = pct2 + '%';

    updateHeader();
    if (isDone) {
      // Schedule spaced repetition revisions for DSA topic
      const allTopicsFlat = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
      const topicData = allTopicsFlat.find(t => t.id === topicId);
      const topicTitle = topicData ? (topicData.title || topicData.name) : ('Topic ' + topicId);
      if (!prog[key].completedDate) {
        prog[key].completedDate = today();
        save(KEYS.DSA_PROGRESS, prog);
      }
      scheduleRevisions('dsa', topicId, prog[key].completedDate, topicTitle);
      // Refresh DSA section revision sub-tab if loaded
      const dsaRevEl = document.getElementById('dsa-revision-list');
      if (dsaRevEl) renderSectionRevisions('dsa');
      // Refresh inline revision panels
      renderInlineRevisions('dsa-inline-rev-overview', 'dsa');
      renderInlineRevisions('dsa-inline-rev', 'dsa');
      toast('✅ Topic completed! Keep going! 🚀', 'success');
      updateStreak('dsa', true);
    } else {
      toast('↩️ Topic marked incomplete', 'info');
    }
  }

  function dsaBackToWeeks() {
    showDSAScreen('dsa-screen-weeks');
  }

  // ═══════════════════════════════════════════════════════
  //  AI ROADMAP RENDERING
  // ═══════════════════════════════════════════════════════
  function renderRoadmap(type) {
    const data = type === 'ai' ? AI_ROADMAP_DATA : DSA_ROADMAP_DATA;
    const progress = load(type === 'ai' ? KEYS.AI_PROGRESS : KEYS.DSA_PROGRESS, {});
    const search = (type === 'ai' ? state.aiSearch : state.dsaSearch).toLowerCase();
    const filter = type === 'ai' ? state.aiFilter : state.dsaFilter;
    const todayStr = today();
    const revisions = load(KEYS.REVISIONS, []);
    const listEl = document.getElementById(type + '-days-list');
    if (!listEl) return;

    // Smart next topic
    if (type === 'ai') renderNextTopic(type, progress, data);

    let filtered = data.filter(d => {
      const matchSearch = !search || d.title.toLowerCase().includes(search) || (d.phase||'').toLowerCase().includes(search);
      const done = progress[d.day]?.done;
      const dueRev = revisions.some(r => r.source === type && r.topicDay === d.day && r.date <= todayStr && !r.done);
      if (filter === 'completed' && !done) return false;
      if (filter === 'pending' && done) return false;
      if (filter === 'revision' && !dueRev) return false;
      return matchSearch;
    });

    // Hours tracking
    const totalHrs = data.reduce((s, d) => s + getTopicHours(d), 0);
    const doneHrs = data.filter(d => progress[d.day]?.done).reduce((s, d) => s + getTopicHours(d), 0);
    const remHrs = totalHrs - doneHrs;
    const totalEl = document.getElementById(type + '-hrs-total');
    const doneEl = document.getElementById(type + '-hrs-done');
    const remEl = document.getElementById(type + '-hrs-rem');
    if (totalEl) totalEl.textContent = totalHrs;
    if (doneEl) doneEl.textContent = doneHrs;
    if (remEl) remEl.textContent = remHrs;

    // Progress update
    const done = data.filter(d => progress[d.day]?.done).length;
    const pct = Math.round(done / data.length * 100);
    const fillEl = document.getElementById(type + '-prog-fill');
    const textEl = document.getElementById(type + '-prog-text');
    const pctEl = document.getElementById(type + '-prog-pct');
    if (fillEl) fillEl.style.width = pct + '%';
    if (textEl) textEl.textContent = `${done}/${data.length} days`;
    if (pctEl) pctEl.textContent = pct + '%';

    if (!filtered.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">${filter==='completed'?'🎯':filter==='revision'?'🔁':'🔍'}</div><div class="empty-title">No topics found</div><div class="empty-sub">Try changing filters or search terms</div></div>`;
      return;
    }

    // Lazy render: build HTML in chunks to avoid DOM freeze
    let html = '';
    let lastPhase = '';
    filtered.forEach(d => {
      const prog = progress[d.day] || {};
      const isDone = !!prog.done;
      const dueRev = revisions.some(r => r.source === type && r.topicDay === d.day && r.date <= todayStr && !r.done);
      const isProject = !!d.isProject;
      let cardClass = 'day-card';
      if (isDone) cardClass += ' completed';
      else if (dueRev) cardClass += ' revision-due';
      if (isProject) cardClass += ' project-day';

      if (d.phase !== lastPhase) {
        html += `<div style="font-size:10px;font-weight:700;color:var(--c2);letter-spacing:.8px;text-transform:uppercase;padding:10px 2px 4px;font-family:var(--font-mono)">— ${esc(d.phase)} —</div>`;
        lastPhase = d.phase;
      }

      const ytLinks = (d.youtube||[]).map(u => `<a class="resource-link" href="${esc(u)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:rgba(255,0,0,.15)">▶</div><span>${esc(u.length > 50 ? u.slice(0,50)+'...' : u)}</span></a>`).join('');
      const webLinks = (d.websites||[]).map(u => `<a class="resource-link" href="${esc(u)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:rgba(0,245,212,.1)">🌐</div><span>${esc(u.replace('https://','').slice(0,45))}</span></a>`).join('');

      const dp = prog.completedDate || '';
      const [cy,cm,cday] = dp ? dp.split('-') : ['','',''];
      const hrs = getTopicHours(d);
      const projBadge = isProject ? `<span class="project-tag">🚀 Project</span>` : '';
      const revBadge = dueRev && !isDone ? `<span style="font-size:9px;padding:2px 6px;border-radius:var(--rfull);background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.25);color:var(--c3);font-weight:700">🔁 Rev Due</span>` : '';

      html += `
      <div class="${cardClass}" id="${type}-day-${d.day}">
        <div class="day-card-header" onclick="APP.toggleDayCard('${type}',${d.day})">
          <div class="day-num"><div class="day-num-label">DAY</div><div class="day-num-val">${d.day}</div></div>
          <div class="day-info">
            <div class="day-title">${esc(d.title)}</div>
            <div class="day-meta" style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-top:3px">
              ${projBadge}${revBadge}
              <span style="color:var(--t2);font-size:10px">${esc(d.phase)} · ⏱️ ${hrs}h${isDone && dp ? ' · ✓ ' + fmtDate(dp) : ''}</span>
            </div>
          </div>
          <div class="day-right">
            <div class="cb ${isDone?'checked':''}" onclick="event.stopPropagation();APP.toggleDone('${type}',${d.day})">${isDone?'✓':''}</div>
            <div class="expand-btn">▾</div>
          </div>
        </div>
        <div class="day-card-body">
          <div class="day-body-inner">
            <div class="body-section">
              <div class="body-section-title">📘 Explanation</div>
              <div class="body-text">${esc(d.explanation)}</div>
            </div>
            ${ytLinks ? `<div class="body-section"><div class="body-section-title">▶ YouTube Resources</div>${ytLinks}</div>` : ''}
            ${webLinks ? `<div class="body-section"><div class="body-section-title">🌐 Website Resources</div>${webLinks}</div>` : ''}
            <div class="body-section">
              <div class="body-section-title">📅 Completion Date</div>
              <div class="date-picker-wrap">
                <div class="date-picker">
                  <div>
                    <select class="dp-select" id="${type}-dp-d-${d.day}">${getDayOptions(cday)}</select>
                    <div class="dp-label">Day</div>
                  </div>
                  <div>
                    <select class="dp-select" id="${type}-dp-m-${d.day}">${getMonthOptions(cm)}</select>
                    <div class="dp-label">Month</div>
                  </div>
                  <div>
                    <select class="dp-select" id="${type}-dp-y-${d.day}">${getYearOptions(cy)}</select>
                    <div class="dp-label">Year</div>
                  </div>
                </div>
                <button class="save-date-btn" onclick="APP.saveDate('${type}',${d.day})">💾 Save Completion Date</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
    listEl.innerHTML = html;
  }

  function getDayOptions(sel) {
    let h = '<option value="">--</option>';
    for (let i=1;i<=31;i++) h += `<option value="${i}" ${String(sel)===String(i)?'selected':''}>${i}</option>`;
    return h;
  }
  function getMonthOptions(sel) {
    const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let h = '<option value="">--</option>';
    m.forEach((n,i) => h += `<option value="${i+1}" ${String(sel)===String(i+1)?'selected':''}>${n}</option>`);
    return h;
  }
  function getYearOptions(sel) {
    let h = '<option value="">--</option>';
    const cur = new Date().getFullYear();
    for (let y=cur;y>=cur-3;y--) h += `<option value="${y}" ${String(sel)===String(y)?'selected':''}>${y}</option>`;
    return h;
  }

  function toggleDayCard(type, day) {
    const el = document.getElementById(type + '-day-' + day);
    el?.classList.toggle('open');
  }

  function toggleDone(type, day) {
    const key = type === 'ai' ? KEYS.AI_PROGRESS : KEYS.DSA_PROGRESS;
    const prog = load(key, {});
    const wasDone = !!prog[day]?.done;
    if (!prog[day]) prog[day] = {};
    prog[day].done = !wasDone;
    if (!wasDone) {
      prog[day].completedDate = prog[day].completedDate || today();
      scheduleRevisions(type, day, prog[day].completedDate);
      updateStreak(type, true);
      toast('✅ Day ' + day + ' completed! Revisions scheduled.', 'success');
    } else {
      toast('↩️ Day ' + day + ' marked incomplete', 'info');
    }
    save(key, prog);
    renderRoadmap(type);
    updateHeader();
  }

  function saveDate(type, day) {
    const d = document.getElementById(type + '-dp-d-' + day)?.value;
    const m = document.getElementById(type + '-dp-m-' + day)?.value;
    const y = document.getElementById(type + '-dp-y-' + day)?.value;
    if (!d || !m || !y) { toast('⚠️ Select day, month, and year', 'error'); return; }
    const key = type === 'ai' ? KEYS.AI_PROGRESS : KEYS.DSA_PROGRESS;
    const prog = load(key, {});
    if (!prog[day]) prog[day] = {};
    prog[day].completedDate = dateStr(y, m, d);
    save(key, prog);
    toast('📅 Date saved: ' + fmtDate(prog[day].completedDate), 'success');
    renderRoadmap(type);
  }

  function filterRoadmap(type) {
    if (type === 'ai') state.aiSearch = document.getElementById('ai-search').value;
    else state.dsaSearch = document.getElementById('dsa-search').value;
    renderRoadmap(type);
  }

  function setFilter(type, filter, btn) {
    if (type === 'ai') state.aiFilter = filter;
    else state.dsaFilter = filter;
    const container = document.getElementById(type + '-filters');
    container?.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn?.classList.add('active');
    renderRoadmap(type);
  }

  // ═══════════════════════════════════════════════════════
  //  SPACED REVISION SYSTEM
  // ═══════════════════════════════════════════════════════
  const REVISION_INTERVALS = [1, 3, 7, 14, 30];

  // Generate all 5 spaced-repetition revision dates from a completion date
  // Intervals: +1 (Day 2), +3 (Day 4), +7 (Day 8), +14 (Day 15), +30 (Day 31)
  function generateRevisionDates(completedDate) {
    return REVISION_INTERVALS.map(n => addDays(completedDate, n));
  }

  // Returns the human-readable day label for a revision interval
  // e.g. interval=1 → "Day 2", interval=3 → "Day 4", etc.
  function getRevisionDayLabel(interval) {
    return 'Day ' + (interval + 1);
  }

  function scheduleRevisions(source, topicDay, completedDate, topicTitleOverride) {
    const revs = load(KEYS.REVISIONS, []);
    // Remove old revisions for this topic (re-schedule if re-completed)
    const filtered = revs.filter(r => !(r.source === source && r.topicDay === topicDay));

    // Resolve topic title — use override (from structured AI roadmap) or look up from flat data
    var topicTitle = topicTitleOverride;
    if (!topicTitle) {
      // Try structured AI roadmap first
      if (source === 'ai' && typeof STRUCTURED_AI_ROADMAP !== 'undefined') {
        const levels = Object.values(STRUCTURED_AI_ROADMAP);
        for (const level of levels) {
          if (!level || !level.weeks) continue;
          for (const week of level.weeks) {
            const dayData = week.days.find(d => d.day === topicDay);
            if (dayData) { topicTitle = dayData.title; break; }
          }
          if (topicTitle) break;
        }
      }
      // Fallback to flat roadmap data
      if (!topicTitle) {
        const data = source === 'ai' ? AI_ROADMAP_DATA : DSA_ROADMAP_DATA;
        const topic = data ? data.find(d => d.day === topicDay) : null;
        if (!topic && source === 'dsa') {
          // Try DSA week data topic id lookup
          if (typeof DSA_WEEK_DATA !== 'undefined') {
            const allTopics = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
            const t = allTopics.find(t => t.id === topicDay);
            if (t) topicTitle = t.name;
          }
        } else if (topic) {
          topicTitle = topic.title;
        }
      }
      if (!topicTitle) topicTitle = 'Day ' + topicDay;
    }

    // Schedule all 5 spaced-repetition intervals: +1, +3, +7, +14, +30 days
    const revisionDates = generateRevisionDates(completedDate);
    REVISION_INTERVALS.forEach((interval, idx) => {
      filtered.push({
        id: source + '_' + topicDay + '_' + interval,
        source,
        topicDay,
        topicTitle: topicTitle,
        completedDate,
        date: revisionDates[idx],
        interval,
        done: false,
        doneDate: null,
      });
    });
    save(KEYS.REVISIONS, filtered);
  }

  function renderRevisions() {
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    const listEl = document.getElementById('revision-list');
    if (!listEl) return;
    const f = state.revFilter;

    // Filter — revisions are always at least +1 day from completion, so no same-day check needed
    let filtered = revs.filter(r => {
      if (f === 'ai') return r.source === 'ai';
      if (f === 'dsa') return r.source === 'dsa';
      if (f === 'due') return r.date === todayStr && !r.done;
      if (f === 'overdue') return r.date < todayStr && !r.done;
      if (f === 'pending') return !r.done;
      if (f === 'done') return r.done;
      return true;
    });

    filtered.sort((a,b) => {
      // Overdue first, then due today, then future, then done
      if (!a.done && !b.done) return a.date.localeCompare(b.date);
      if (!a.done) return -1;
      if (!b.done) return 1;
      return b.doneDate?.localeCompare(a.doneDate || '') || 0;
    });

    if (!filtered.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🔁</div><div class="empty-title">No revisions here</div><div class="empty-sub">Complete topics in the roadmap to auto-schedule revisions</div></div>`;
      return;
    }

    listEl.innerHTML = filtered.map(r => {
      const overdue = r.date < todayStr && !r.done;
      const dueToday = r.date === todayStr && !r.done;
      const future = r.date > todayStr && !r.done;

      // Status badge
      let statusText = future ? `📅 Due ${fmtDate(r.date)}` : dueToday ? '📌 Due Today' : overdue ? `⚠️ ${daysDiff(r.date, todayStr)}d Overdue` : '✅ Done';
      let statusColor = future ? 'var(--t2)' : dueToday ? 'var(--c4)' : overdue ? 'var(--c3)' : 'var(--c5)';

      // Quick notes preview — pull from AI/DSA roadmap explanation
      const data = r.source === 'ai' ? AI_ROADMAP_DATA : DSA_ROADMAP_DATA;
      const topic = data.find(d => d.day === r.topicDay);
      const preview = topic?.explanation ? topic.explanation.slice(0, 120) + '…' : '';

      return `
      <div class="rev-card" id="revc-${r.id}" style="${r.done?'opacity:.55':''}${overdue?';border-color:rgba(255,107,107,.3)':''}${dueToday?';border-color:rgba(255,209,102,.3)':''}">
        <div class="rev-header">
          <div class="rev-date-badge" style="${dueToday?'background:rgba(255,209,102,.1);color:var(--c4)':overdue?'background:rgba(255,107,107,.1);color:var(--c3)':''}">
            ${getRevisionDayLabel(r.interval)}
          </div>
          <div class="rev-info">
            <div class="rev-topic">${esc(r.topicTitle)}</div>
            <div class="rev-source" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:3px">
              <span style="padding:1px 6px;border-radius:var(--rfull);font-size:9px;font-weight:700;background:${r.source==='ai'?'rgba(0,245,212,.1)':'rgba(123,47,255,.1)'};color:${r.source==='ai'?'var(--c1)':'var(--c2)'};border:1px solid ${r.source==='ai'?'rgba(0,245,212,.2)':'rgba(123,47,255,.2)'}">${r.source.toUpperCase()}</span>
              <span style="font-size:10px;color:${statusColor};font-weight:600">${statusText}</span>
              <span style="font-size:10px;color:var(--t2)">Day ${r.topicDay}</span>
            </div>
            ${preview ? `<button class="rev-expand-btn" onclick="APP.toggleRevNotes('${r.id}')">📝 Quick Notes ▾</button>` : ''}
          </div>
          <div class="rev-status">
            <button class="rev-done-btn ${r.done?'completed':''}" onclick="APP.markRevisionDone('${r.id}')">
              ${r.done ? '✓' : 'Done'}
            </button>
          </div>
        </div>
        ${preview ? `<div class="rev-notes-preview" id="rnp-${r.id}"><div style="font-size:10px;font-weight:700;color:var(--c2);margin-bottom:4px;font-family:var(--font-mono)">QUICK NOTES</div>${esc(preview)}</div>` : ''}
      </div>`;
    }).join('');
  }

  function toggleRevNotes(id) {
    const card = document.getElementById('revc-' + id);
    const preview = document.getElementById('rnp-' + id);
    if (!card || !preview) return;
    const isOpen = preview.style.display === 'block';
    preview.style.display = isOpen ? 'none' : 'block';
    // Update button text
    const btn = card.querySelector('.rev-expand-btn');
    if (btn) btn.textContent = isOpen ? '📝 Quick Notes ▾' : '📝 Quick Notes ▴';
  }

  function markRevisionDone(id) {
    const revs = load(KEYS.REVISIONS, []);
    const idx = revs.findIndex(r => r.id === id);
    if (idx < 0) return;
    revs[idx].done = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderRevisions();
    toast(revs[idx].done ? '✅ Revision marked complete!' : '↩️ Revision unmarked', 'success');
  }

  function setRevFilter(f, btn) {
    state.revFilter = f;
    document.querySelector('#tab-revision .filter-row')?.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderRevisions();
  }

  // ═══════════════════════════════════════════════════════
  //  POMODORO TIMER
  // ═══════════════════════════════════════════════════════
  const BREAK_DURATION = 5 * 60;

  function getPomoDuration() {
    return (load(KEYS.POMO_DURATION, 25) || 25) * 60;
  }

  function setCustomDuration() {
    const input = document.getElementById('pomo-dur-input');
    const mins = parseInt(input?.value) || 25;
    const clamped = Math.max(1, Math.min(120, mins));
    save(KEYS.POMO_DURATION, clamped);
    state.pomoDuration = clamped;
    if (!state.pomoRunning && !state.pomoBreak) {
      state.pomoSeconds = clamped * 60;
      updatePomoDisplay();
    }
    toast(`⏱️ Focus duration set to ${clamped} min`, 'success');
  }

  function playAlarm() {
    stopAlarm(); // clear any existing
    // Beep alarm using Web Audio API — no CORS, works offline
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const beep = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      };
      beep();
      state.alarmAudio = ctx;
      state.alarmInterval = setInterval(beep, 600);
      const stopBtn = document.getElementById('pomo-alarm-stop');
      if (stopBtn) stopBtn.style.display = 'inline-flex';
    } catch(e) { console.log('Audio error:', e); }
  }

  function stopAlarm() {
    const wasRinging = state.pomoAlarmRinging;
    try {
      if (state.alarmInterval) { clearInterval(state.alarmInterval); state.alarmInterval = null; }
      if (state.alarmAudio) { state.alarmAudio.close(); state.alarmAudio = null; }
    } catch(e) {}
    const stopBtn = document.getElementById('pomo-alarm-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    // Remove alarm-ringing class from ring
    const ring = document.getElementById('pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    state.pomoAlarmRinging = false;
    // If alarm was ringing after a focus session → auto-start break
    if (wasRinging) {
      state.pomoBreak = true;
      state.pomoSeconds = BREAK_DURATION;
      const modeEl  = document.getElementById('pomo-mode');
      const startBtn = document.getElementById('pomo-start-btn');
      if (modeEl)  modeEl.textContent  = 'BREAK';
      if (startBtn) startBtn.textContent = '⏸ Pause';
      updatePomoDisplay();
      toast('☕ Break started! Relax for a bit.', 'info');
      // Auto-run the break countdown
      state.pomoRunning = true;
      state.pomoInterval = setInterval(() => {
        state.pomoSeconds--;
        updatePomoDisplay();
        if (state.pomoSeconds <= 0) {
          clearInterval(state.pomoInterval);
          state.pomoRunning = false;
          state.pomoBreak = false;
          state.pomoSeconds = getPomoDuration();
          const me = document.getElementById('pomo-mode');
          const sb = document.getElementById('pomo-start-btn');
          if (me) me.textContent = 'FOCUS';
          if (sb) sb.textContent = '▶ Start';
          updatePomoDisplay();
          toast('💪 Break over! Ready to focus again?', 'info');
        }
      }, 1000);
    }
  }

  function selectPomoType(type, btn) {
    state.pomoType = type;
    document.querySelectorAll('.pomo-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderPomoStats();
  }

  function pomodoroToggle() {
    // If alarm is ringing, treat toggle as stop-alarm
    if (state.pomoAlarmRinging) {
      stopAlarm();
      return;
    }
    if (state.pomoRunning) {
      clearInterval(state.pomoInterval);
      state.pomoRunning = false;
      const btn = document.getElementById('pomo-start-btn');
      if (btn) btn.textContent = '▶ Resume';
    } else {
      state.pomoRunning = true;
      const btn = document.getElementById('pomo-start-btn');
      if (btn) btn.textContent = '⏸ Pause';
      state.pomoInterval = setInterval(() => {
        state.pomoSeconds--;
        updatePomoDisplay();
        if (state.pomoSeconds <= 0) {
          clearInterval(state.pomoInterval);
          state.pomoRunning = false;
          if (!state.pomoBreak) {
            // Focus session complete — save stats, play alarm, WAIT for user to stop
            const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
            stats[state.pomoType] = (stats[state.pomoType] || 0) + 1;
            save(KEYS.POMO_STATS, stats);
            updateStreak(state.pomoType === 'ai' ? 'ai' : state.pomoType === 'dsa' ? 'dsa' : state.pomoType === 'projects' ? 'proj' : null, true);
            renderPomoStats();
            // Log to history for analytics
            try { if (typeof PomoEnhancer !== 'undefined') PomoEnhancer.logSession(state.pomoType, state.pomoDuration); } catch(e) {}
            // Play alarm continuously — user must click STOP
            state.pomoAlarmRinging = true;
            playAlarm();
            // Flash the ring red
            const ring = document.getElementById('pomo-ring');
            if (ring) ring.classList.add('alarm-ringing');
            // Update UI
            const modeEl = document.getElementById('pomo-mode');
            const startBtn = document.getElementById('pomo-start-btn');
            if (modeEl) modeEl.textContent = '⏰ DONE!';
            if (startBtn) startBtn.textContent = '🔔 Stop Alarm';
            toast('⏰ Time\'s up! Click Stop Alarm to start your break.', 'success');
          } else {
            // Break over
            stopAlarm();
            state.pomoBreak = false;
            state.pomoSeconds = getPomoDuration();
            const modeEl = document.getElementById('pomo-mode');
            const startBtn = document.getElementById('pomo-start-btn');
            if (modeEl) modeEl.textContent = 'FOCUS';
            if (startBtn) startBtn.textContent = '▶ Start';
            toast('☕ Break over! Ready to focus?', 'info');
          }
          updatePomoDisplay();
        }
      }, 1000);
    }
  }

  function pomodoroReset() {
    clearInterval(state.pomoInterval);
    stopAlarm();
    state.pomoRunning = false;
    state.pomoBreak = false;
    state.pomoSeconds = getPomoDuration();
    const btn = document.getElementById('pomo-start-btn');
    const mode = document.getElementById('pomo-mode');
    if (btn) btn.textContent = '▶ Start';
    if (mode) mode.textContent = 'FOCUS';
    updatePomoDisplay();
  }

  function pomodoroSkip() {
    clearInterval(state.pomoInterval);
    stopAlarm();
    state.pomoRunning = false;
    state.pomoBreak = !state.pomoBreak;
    state.pomoSeconds = state.pomoBreak ? BREAK_DURATION : getPomoDuration();
    const mode = document.getElementById('pomo-mode');
    const btn = document.getElementById('pomo-start-btn');
    if (mode) mode.textContent = state.pomoBreak ? 'BREAK' : 'FOCUS';
    if (btn) btn.textContent = '▶ Start';
    updatePomoDisplay();
  }

  function updatePomoDisplay() {
    const m = Math.floor(state.pomoSeconds / 60);
    const s = state.pomoSeconds % 60;
    const timeEl = document.getElementById('pomo-time');
    if (timeEl) timeEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    const pomoDur = getPomoDuration();
    const total = state.pomoBreak ? BREAK_DURATION : pomoDur;
    const progress = ((total - state.pomoSeconds) / total) * 360;
    const color = state.pomoBreak ? 'var(--c5)' : 'var(--c1)';
    const ring = document.getElementById('pomo-ring');
    if (ring) {
      ring.style.background = `conic-gradient(${color} ${progress}deg, var(--bg3) ${progress}deg)`;
      ring.style.boxShadow = `0 0 40px rgba(${state.pomoBreak ? '6,214,160' : '0,245,212'},.15)`;
    }
  }

  function renderPomoStats() {
    const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    ['ai','dsa','projects','extra'].forEach(k => {
      const el = document.getElementById('ps-' + k);
      if (el) el.textContent = stats[k] || 0;
    });
    const dotsEl = document.getElementById('pomo-dots');
    if (dotsEl) {
      const current = stats[state.pomoType] || 0;
      const dots = current % 4 || (current > 0 ? 4 : 0);
      dotsEl.innerHTML = Array(4).fill(0).map((_,i) => `<div class="pomo-dot ${i < dots ? 'filled' : ''}"></div>`).join('');
    }
    // Total focus hours
    const pomoDurMins = load(KEYS.POMO_DURATION, 25) || 25;
    const totalSessions = (stats.ai||0) + (stats.dsa||0) + (stats.projects||0) + (stats.extra||0);
    const focusHrs = ((totalSessions * pomoDurMins) / 60).toFixed(1);
    const fhEl = document.getElementById('pomo-focus-hours');
    if (fhEl) fhEl.textContent = focusHrs;
  }

  // ═══════════════════════════════════════════════════════
  //  STREAK SYSTEM
  // ═══════════════════════════════════════════════════════
  function updateStreak(type, studied) {
    if (!type) return;
    const streaks = load(KEYS.STREAKS, {});
    if (!streaks[type]) streaks[type] = {current:0, longest:0, lastDate:null, history:[]};
    const s = streaks[type];
    const todayStr = today();
    // If already studied today, don't increment again — just update header
    if (s.lastDate === todayStr && studied) { updateHeader(); return; }
    if (!studied && s.lastDate === todayStr) { save(KEYS.STREAKS, streaks); return; }
    if (studied) {
      const yesterday = addDays(todayStr, -1);
      if (s.lastDate === yesterday) s.current++;
      else s.current = 1;
      s.longest = Math.max(s.longest, s.current);
      s.lastDate = todayStr;
      if (!s.history) s.history = [];
      s.history.push(todayStr);
      if (s.history.length > 30) s.history = s.history.slice(-30);
    }
    save(KEYS.STREAKS, streaks);
    updateHeader();
  }

  function renderStreaks() {
    const streaks = load(KEYS.STREAKS, {});
    const types = [
      {key:'ai', name:'AI Roadmap', icon:'🤖', color:'var(--c1)'},
      {key:'dsa', name:'DSA Practice', icon:'💻', color:'var(--c2)'},
      {key:'proj', name:'Projects', icon:'🚀', color:'var(--c4)'},
    ];
    const container = document.getElementById('streak-cards');
    if (!container) return;
    const todayStr = today();

    container.innerHTML = types.map(t => {
      const s = streaks[t.key] || {current:0,longest:0,lastDate:null,history:[]};
      const isActiveToday = s.lastDate === todayStr;
      const history = s.history || [];
      // Get last 7 days
      const last7 = Array(7).fill(0).map((_,i) => addDays(todayStr, -(6-i)));
      const weekDots = last7.map(d => {
        const done = history.includes(d);
        const isToday = d === todayStr;
        return `<div class="week-dot ${done?'done':''} ${isToday?'today':''}"></div>`;
      }).join('');

      return `
      <div class="streak-card" style="border-color:${isActiveToday?'rgba(0,245,212,.2)':''}">
        <div class="streak-top">
          <div>
            <div class="streak-name" style="color:${t.color}">${t.icon} ${t.name}</div>
            <div style="font-size:10px;color:var(--t2);margin-top:2px">${isActiveToday ? '✅ Studied today!' : '⚠️ Study today to keep streak!'}</div>
          </div>
          <div class="streak-flame" style="${s.current > 0 ? '' : 'opacity:.3'}">${s.current > 6 ? '🔥' : s.current > 2 ? '🔥' : '💤'}</div>
        </div>
        <div class="streak-nums">
          <div class="streak-num"><div class="streak-num-val" style="color:${t.color}">${s.current}</div><div class="streak-num-lbl">Current</div></div>
          <div class="streak-num"><div class="streak-num-val" style="color:var(--c4)">${s.longest}</div><div class="streak-num-lbl">Longest</div></div>
          <div class="streak-num"><div class="streak-num-val" style="color:var(--c5)">${history.length}</div><div class="streak-num-lbl">Total Days</div></div>
        </div>
        <div class="week-dots">${weekDots}</div>
        <div style="font-size:9px;color:var(--t3c);margin-top:4px;text-align:center">Last 7 days activity</div>
        ${!isActiveToday ? `<button class="streak-action" style="margin-top:10px" onclick="APP.markStudiedToday('${t.key}')">✅ Mark ${t.name} as Studied Today</button>` : '<div style="margin-top:10px;text-align:center;font-size:12px;color:var(--c5);font-weight:600">🎯 Keep it up!</div>'}
      </div>`;
    }).join('');
  }

  function markStudiedToday(type) {
    updateStreak(type, true);
    renderStreaks();
    toast('🔥 Streak updated for ' + type.toUpperCase() + '!', 'success');
  }

  // ═══════════════════════════════════════════════════════
  //  PROJECTS
  // ═══════════════════════════════════════════════════════
  function openProjectModal(idOrSource) {
    // idOrSource can be: project id (string like "1234567890"),
    //   source tag ('ai' or 'dsa'), or undefined for general
    let id = null, source = '';
    if (idOrSource === 'ai' || idOrSource === 'dsa') {
      source = idOrSource;
    } else if (idOrSource) {
      id = idOrSource;
    }
    state.editProjectId = id;
    state.editProjectSource = source || null;
    const srcEl = document.getElementById('proj-source');
    if (srcEl) srcEl.value = source;
    const titleEl = document.getElementById('proj-modal-title');
    if (id) {
      const projects = load(KEYS.PROJECTS, []);
      const p = projects.find(x => x.id === id);
      if (p) {
        const setVal = (elId, val) => { const el = document.getElementById(elId); if (el) el.value = val; };
        setVal('proj-name', p.name);
        setVal('proj-files', p.filesCount);
        setVal('proj-notes', p.notes);
        setVal('proj-tags', p.tags || '');
        setVal('proj-progress', p.progressPct || 0);
        if (srcEl) srcEl.value = p.source || '';
        if (titleEl) titleEl.textContent = 'Edit Project';
      }
    } else {
      ['proj-name','proj-files','proj-notes','proj-tags','proj-progress'].forEach(fid => {
        const el = document.getElementById(fid); if (el) el.value = '';
      });
      const label = source === 'ai' ? '🤖 Add AI Project' : source === 'dsa' ? '💻 Add DSA Project' : 'Add Project';
      if (titleEl) titleEl.textContent = label;
    }
    openModal('modal-project');
  }

  function saveProject() {
    const name = document.getElementById('proj-name')?.value.trim();
    if (!name) { toast('⚠️ Project name is required', 'error'); return; }
    const projects = load(KEYS.PROJECTS, []);
    const existing = state.editProjectId ? projects.find(x=>x.id===state.editProjectId) : null;
    const srcEl = document.getElementById('proj-source');
    const source = srcEl ? srcEl.value : (state.editProjectSource || existing?.source || '');
    const p = {
      id: state.editProjectId || Date.now().toString(),
      name,
      source,
      filesCount: parseInt(document.getElementById('proj-files')?.value) || 0,
      notes: document.getElementById('proj-notes')?.value.trim() || '',
      tags: document.getElementById('proj-tags')?.value.trim() || '',
      progressPct: parseInt(document.getElementById('proj-progress')?.value) || (existing?.progressPct || 0),
      pomoSessions: existing?.pomoSessions || 0,
      streak: existing?.streak || 0,
      lastPomoDate: existing?.lastPomoDate || null,
      createdAt: existing?.createdAt || today(),
      updatedAt: today(),
    };
    if (state.editProjectId) {
      const idx = projects.findIndex(x => x.id === state.editProjectId);
      if (idx >= 0) projects[idx] = p; else projects.push(p);
    } else {
      projects.push(p);
    }
    save(KEYS.PROJECTS, projects);
    closeModal('modal-project');
    renderProjects();
    renderSectionProjects('ai');
    renderSectionProjects('dsa');
    toast(state.editProjectId ? '✏️ Project updated!' : '🚀 Project added!', 'success');
    updateStreak('proj', true);
  }

  function renderProjects() {
    const projects = load(KEYS.PROJECTS, []);
    const pomStats = load(KEYS.POMO_STATS, {});
    const listEl = document.getElementById('projects-list');
    if (!listEl) return;
    if (!projects.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🚀</div><div class="empty-title">No projects yet</div><div class="empty-sub">Add your AI engineering projects to track progress</div></div>`;
      return;
    }
    listEl.innerHTML = projects.map(p => {
      const progressPct = Math.min(100, Math.round((p.progressPct || 0)));
      const projPomos = p.pomoSessions || 0;
      return `
      <div class="proj-card">
        <div class="flex items-center gap6" style="margin-bottom:6px">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(0,245,212,.1),rgba(123,47,255,.1));border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">🚀</div>
          <div style="flex:1;min-width:0">
            <div class="proj-name">${esc(p.name)}</div>
            <div class="proj-meta">📁 ${p.filesCount} files · Created ${fmtDate(p.createdAt)}</div>
          </div>
        </div>
        ${p.tags ? `<div style="font-size:10px;color:var(--c1);font-family:var(--font-mono);margin-bottom:6px">${esc(p.tags)}</div>` : ''}
        ${p.notes ? `<div style="font-size:11px;color:var(--t2);line-height:1.6;background:var(--bg3);padding:8px;border-radius:var(--r8);border:1px solid rgba(255,255,255,.05);margin-bottom:8px">${esc(p.notes)}</div>` : ''}
        <div class="proj-progress-label"><span>Progress</span><span>${progressPct}%</span></div>
        <div class="proj-progress-bar"><div class="proj-progress-fill" style="width:${progressPct}%"></div></div>
        <div class="proj-sessions">🍅 ${projPomos} Pomodoro sessions · 🔥 Streak: ${p.streak||0} days</div>
        <div class="proj-actions">
          <button class="proj-btn" onclick="APP.openProjectModal('${p.id}')">✏️ Edit</button>
          <button class="proj-btn" onclick="APP.logPomoToProject('${p.id}')">🍅 +Pomo</button>
          <button class="proj-btn del" onclick="APP.deleteProject('${p.id}')">🗑️</button>
        </div>
      </div>`;
    }).join('');
  }

  function logPomoToProject(id) {
    const projects = load(KEYS.PROJECTS, []);
    const idx = projects.findIndex(p => p.id === id);
    if (idx < 0) return;
    projects[idx].pomoSessions = (projects[idx].pomoSessions || 0) + 1;
    // Update streak
    const todayStr = today();
    if (projects[idx].lastPomoDate !== todayStr) {
      const yesterday = addDays(todayStr, -1);
      if (projects[idx].lastPomoDate === yesterday) projects[idx].streak = (projects[idx].streak || 0) + 1;
      else projects[idx].streak = 1;
      projects[idx].lastPomoDate = todayStr;
    }
    save(KEYS.PROJECTS, projects);
    renderProjects();
    toast('🍅 Pomodoro logged to project!', 'success');
  }

  function deleteProject(id) {
    confirmAction('Delete Project?', 'This will permanently remove the project and cannot be undone.', () => {
      const projects = load(KEYS.PROJECTS, []);
      save(KEYS.PROJECTS, projects.filter(p => p.id !== id));
      renderProjects();
      toast('🗑️ Project deleted', 'info');
    });
  }

  // ═══════════════════════════════════════════════════════
  //  EXTRA NOTES
  // ═══════════════════════════════════════════════════════
  let notesAutoSaveTimer;

  function autoSaveNotes() {
    const ta = document.getElementById('extra-notes-ta');
    if (!ta) return;
    const text = ta.value.trim();
    const wc = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const wcEl = document.getElementById('notes-wc');
    if (wcEl) wcEl.textContent = wc + ' words';
    clearTimeout(notesAutoSaveTimer);
    notesAutoSaveTimer = setTimeout(saveNotes, 2500);
  }

  function saveNotes() {
    const ta = document.getElementById('extra-notes-ta');
    if (!ta) return;
    const content = ta.value.trim();
    if (!content) { toast('⚠️ Nothing to save', 'error'); return; }
    const notes = load(KEYS.NOTES, []);
    const todayStr = today();
    const stats = load(KEYS.POMO_STATS, {});
    const wc = content.split(/\s+/).filter(Boolean).length;
    const ts = new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
    const todayIdx = notes.findIndex(n => n.date === todayStr);
    const entry = {
      id: todayIdx >= 0 ? notes[todayIdx].id : Date.now().toString(),
      date: todayStr,
      content,
      wordCount: wc,
      lastSaved: ts,
      pomosToday: stats.extra || 0,
    };
    if (todayIdx >= 0) notes[todayIdx] = entry; else notes.unshift(entry);
    save(KEYS.NOTES, notes);
    toast('💾 Notes saved!', 'success');
    renderExtraNotes();
  }

  function renderExtraNotes() {
    const notes = load(KEYS.NOTES, []);
    const stats = load(KEYS.POMO_STATS, {});
    const badgeEl = document.getElementById('extra-pomo-badge');
    if (badgeEl) badgeEl.textContent = '🍅 ' + (stats.extra || 0);
    const ta = document.getElementById('extra-notes-ta');
    const todayNote = notes.find(n => n.date === today());
    if (todayNote && ta && !ta.value) {
      ta.value = todayNote.content;
      const wcEl = document.getElementById('notes-wc');
      if (wcEl) wcEl.textContent = (todayNote.wordCount || 0) + ' words';
    }
    const listEl = document.getElementById('extra-notes-list');
    if (!listEl) return;
    if (!notes.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">📝</div><div class="empty-title">No notes yet</div><div class="empty-sub">Start writing to track your daily study sessions</div></div>`;
      return;
    }
    listEl.innerHTML = notes.slice(0,20).map(n => `
      <div class="card" style="margin-bottom:8px">
        <div class="card-header">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span style="font-size:12px;font-weight:700;color:var(--c1);font-family:var(--font-mono)">${fmtDate(n.date)}</span>
            <span style="font-size:9px;color:var(--t2)">${n.wordCount||0} words · Saved ${n.lastSaved||'—'}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="card-badge badge-done">🍅 ${n.pomosToday||0}</span>
            <button onclick="APP.deleteNote('${n.id}')" style="font-size:12px;color:var(--c3);padding:2px 6px;border-radius:6px;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">✕</button>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.7;white-space:pre-wrap">${esc(n.content.slice(0,200))}${n.content.length>200?'<span style="color:var(--t3c)"> …</span>':''}</div>
      </div>
    `).join('');
  }

  function deleteNote(id) {
    const notes = load(KEYS.NOTES, []);
    save(KEYS.NOTES, notes.filter(n => n.id !== id));
    renderExtraNotes();
    toast('🗑️ Note deleted', 'info');
  }

  // ═══════════════════════════════════════════════════════
  //  FILE STORAGE
  // ═══════════════════════════════════════════════════════
  function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    const fileData = load(KEYS.FILES, []);
    let count = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        fileData.unshift({
          id: Date.now().toString() + Math.random().toString(36).slice(2),
          name: file.name,
          size: file.size,
          type: file.type,
          data: e.target.result,
          date: today(),
        });
        count++;
        if (count === files.length) {
          save(KEYS.FILES, fileData);
          renderFiles();
          toast(`📎 ${count} file(s) uploaded!`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  }

  function renderFiles() {
    const files = load(KEYS.FILES, []);
    const listEl = document.getElementById('files-list');
    if (!files.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">📂</div><div class="empty-title">No files stored</div><div class="empty-sub">Upload PDFs and documents to access them offline</div></div>`;
      return;
    }
    function fmt(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB';
      return (bytes/1048576).toFixed(1) + ' MB';
    }
    listEl.innerHTML = files.map(f => {
      const ext = f.name.split('.').pop().toUpperCase();
      const icons = {PDF:'📄',PNG:'🖼️',JPG:'🖼️',JPEG:'🖼️',TXT:'📝',DOC:'📃',DOCX:'📃'};
      return `
      <div class="file-item">
        <div class="file-icon">${icons[ext] || '📎'}</div>
        <div class="file-info">
          <div class="file-name">${esc(f.name)}</div>
          <div class="file-meta">${fmt(f.size)} · ${fmtDate(f.date)}</div>
        </div>
        <button class="file-dl-btn" onclick="APP.downloadFile('${f.id}')">⬇ Open</button>
        <button class="file-del-btn" onclick="APP.deleteFile('${f.id}')">✕</button>
      </div>`;
    }).join('');
  }

  function downloadFile(id) {
    const files = load(KEYS.FILES, []);
    const f = files.find(x => x.id === id);
    if (!f) return;
    const a = document.createElement('a');
    a.href = f.data;
    a.download = f.name;
    a.click();
    toast('⬇️ Downloading ' + f.name, 'info');
  }

  function deleteFile(id) {
    confirmAction('Delete File?', 'This will remove the file from storage. This cannot be undone.', () => {
      const files = load(KEYS.FILES, []);
      save(KEYS.FILES, files.filter(f => f.id !== id));
      renderFiles();
      toast('🗑️ File removed', 'info');
    });
  }

  // ═══════════════════════════════════════════════════════
  //  PROFILE
  // ═══════════════════════════════════════════════════════
  function renderProfile() {
    const aiProg = load(KEYS.AI_PROGRESS, {});
    const dsaProg = load(KEYS.DSA_PROGRESS, {});
    const streaks = load(KEYS.STREAKS, {});
    const pomStats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    const projects = load(KEYS.PROJECTS, []);
    const notes = load(KEYS.NOTES, []);
    const pomoDurMins = load(KEYS.POMO_DURATION, 25) || 25;

    const aiDone = Object.values(aiProg).filter(v => v.done).length;
    const dsaAllTopics2 = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
    const dsaDone = dsaAllTopics2.filter(t => dsaProg['t'+t.id]?.done).length;
    const aiStreak = streaks.ai?.current || 0;
    const dsaStreak = streaks.dsa?.current || 0;
    const total = (pomStats.ai||0) + (pomStats.dsa||0) + (pomStats.projects||0) + (pomStats.extra||0);
    const focusHrs = ((total * pomoDurMins) / 60).toFixed(1);

    const startDate = Object.values(aiProg).filter(v=>v.completedDate).map(v=>v.completedDate).sort()[0];
    const subEl = document.getElementById('profile-sub');
    if (subEl) subEl.textContent = startDate ? `Started ${fmtDate(startDate)}` : 'Start your journey today!';

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('p-ai-done', aiDone);
    set('p-dsa-done', dsaDone);
    set('p-proj-count', projects.length);
    set('p-notes-count', notes.length);
    set('p-ai-streak', aiStreak);
    set('p-dsa-streak', dsaStreak);
    set('p-pom-ai', pomStats.ai || 0);
    set('p-pom-dsa', pomStats.dsa || 0);
    set('p-pom-proj', pomStats.projects || 0);
    set('p-pom-extra', pomStats.extra || 0);
    set('p-pom-total', total);
    set('p-focus-hours', focusHrs);

    // Hours tracking
    const aiTotalHrs = AI_ROADMAP_DATA.reduce((s, d) => s + getTopicHours(d), 0);
    const aiDoneHrs = AI_ROADMAP_DATA.filter(d => aiProg[d.day]?.done).reduce((s, d) => s + getTopicHours(d), 0);
    set('p-hrs-total', aiTotalHrs);
    set('p-hrs-done', aiDoneHrs);
    set('p-hrs-rem', aiTotalHrs - aiDoneHrs);

    // Render graphs after a tick (so DOM is ready)
    setTimeout(() => {
      renderGraphs(aiProg, pomStats, streaks);
    }, 50);
  }

  // ═══════════════════════════════════════════════════════
  //  MINI CANVAS GRAPHS (pure JS, no libraries)
  // ═══════════════════════════════════════════════════════
  function drawMiniChart(canvasId, labels, values, color, fillColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth || 300;
    const H = 80;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const max = Math.max(...values, 1);
    const pad = { top: 8, right: 8, bottom: 20, left: 28 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;
    const step = values.length > 1 ? cw / (values.length - 1) : cw;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    [0, 0.5, 1].forEach(r => {
      const y = pad.top + ch * (1 - r);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    });

    // Fill area
    if (values.length > 1) {
      ctx.beginPath();
      ctx.moveTo(pad.left, pad.top + ch);
      values.forEach((v, i) => {
        const x = pad.left + i * step;
        const y = pad.top + ch - (v / max) * ch;
        i === 0 ? ctx.lineTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.left + (values.length - 1) * step, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    // Line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    values.forEach((v, i) => {
      const x = pad.left + i * step;
      const y = pad.top + ch - (v / max) * ch;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    values.forEach((v, i) => {
      const x = pad.left + i * step;
      const y = pad.top + ch - (v / max) * ch;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // X labels (every other)
    ctx.fillStyle = 'rgba(144,144,184,0.7)';
    ctx.font = `${9 * window.devicePixelRatio / window.devicePixelRatio}px system-ui`;
    ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      if (i % Math.ceil(labels.length / 6) === 0) {
        ctx.fillText(l, pad.left + i * step, H - 4);
      }
    });

    // Y axis label
    ctx.textAlign = 'right';
    ctx.fillText(max, pad.left - 2, pad.top + 8);
  }

  function drawBarChart(canvasId, labels, values, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth || 300;
    const H = 80;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const max = Math.max(...values, 1);
    const pad = { top: 8, right: 8, bottom: 20, left: 28 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;
    const barW = (cw / values.length) * 0.65;
    const gap = (cw / values.length) * 0.35;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    [0, 0.5, 1].forEach(r => {
      const y = pad.top + ch * (1 - r);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    });

    values.forEach((v, i) => {
      const x = pad.left + i * (barW + gap) + gap / 2;
      const barH = (v / max) * ch;
      const y = pad.top + ch - barH;
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]) : ctx.rect(x, y, barW, barH);
      ctx.fill();
      ctx.fillStyle = 'rgba(144,144,184,0.7)';
      ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW / 2, H - 4);
    });

    ctx.textAlign = 'right';
    ctx.fillText(max, pad.left - 2, pad.top + 8);
  }

  function renderGraphs(aiProg, pomStats, streaks) {
    const todayStr = today();

    // Graph 1: Daily study consistency (last 14 days)
    const last14 = Array(14).fill(0).map((_,i) => addDays(todayStr, -(13-i)));
    const aiHistory = (streaks.ai?.history) || [];
    const dsaHistory = (streaks.dsa?.history) || [];
    const consistencyVals = last14.map(d => (aiHistory.includes(d) ? 1 : 0) + (dsaHistory.includes(d) ? 1 : 0));
    const consistencyLabels = last14.map(d => { const parts = d.split('-'); return parts[2]; });
    drawMiniChart('chart-consistency', consistencyLabels, consistencyVals, '#00f5d4', 'rgba(0,245,212,0.08)');

    // Graph 2: Pomodoro by category (bar chart)
    drawBarChart('chart-pomo',
      ['AI', 'DSA', 'Proj', 'Extra'],
      [pomStats.ai||0, pomStats.dsa||0, pomStats.projects||0, pomStats.extra||0],
      ['#00f5d4','#7b2fff','#ffd166','#ff6b6b']
    );

    // Graph 3: Progress over time (completion dates)
    const completedWithDates = Object.values(aiProg)
      .filter(v => v.done && v.completedDate)
      .sort((a,b) => a.completedDate.localeCompare(b.completedDate));

    if (completedWithDates.length >= 2) {
      const first = completedWithDates[0].completedDate;
      const last = completedWithDates[completedWithDates.length-1].completedDate;
      const totalDays = Math.max(daysDiff(first, last), 1);
      const points = 10;
      const progLabels = [], progVals = [];
      for (let i = 0; i <= points; i++) {
        const checkDate = addDays(first, Math.round(i * totalDays / points));
        const cnt = completedWithDates.filter(v => v.completedDate <= checkDate).length;
        progLabels.push(checkDate.slice(5));
        progVals.push(cnt);
      }
      drawMiniChart('chart-progress', progLabels, progVals, '#7b2fff', 'rgba(123,47,255,0.08)');
    } else {
      drawMiniChart('chart-progress', ['No data yet'], [0], '#7b2fff', 'rgba(123,47,255,0.08)');
    }
  }

  // ═══════════════════════════════════════════════════════
  //  HEADER UPDATE
  // ═══════════════════════════════════════════════════════
  function updateHeader() {
    const aiProg = load(KEYS.AI_PROGRESS, {});
    const done = Object.values(aiProg).filter(v => v.done).length;
    const hdrSub = document.getElementById('hdr-sub');
    if (hdrSub) hdrSub.textContent = ``;
    // streak display removed — shown only on home page
  }

  // Theme is permanently dark — toggleTheme removed

  // ═══════════════════════════════════════════════════════
  //  DATA MANAGEMENT
  // ═══════════════════════════════════════════════════════
  function exportData() {
    const data = {};
    Object.values(KEYS).forEach(k => {
      try { const v = localStorage.getItem(k); if (v) data[k] = JSON.parse(v); } catch(e){}
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roadmapx-backup-' + today() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('💾 Data exported successfully!', 'success');
  }

  function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      confirmAction('Import Data?', 'This will OVERWRITE all existing data with the backup. Continue?', () => {
        try {
          const data = JSON.parse(e.target.result);
          Object.entries(data).forEach(([k,v]) => localStorage.setItem(k, JSON.stringify(v)));
          location.reload();
        } catch(err) {
          toast('⚠️ Invalid backup file!', 'error');
        }
      });
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function resetAllData() {
    confirmAction('⚠️ Reset ALL Data?', 'This will permanently delete ALL your progress, streaks, notes, and projects. This CANNOT be undone!', () => {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
      location.reload();
    });
  }

  // ═══════════════════════════════════════════════════════
  //  ATTENDANCE SYSTEM
  // ═══════════════════════════════════════════════════════
  // Returns sorted array of dates the user was active (marked 'present').
  function getAttendance() {
    const att = load(KEYS.ATTENDANCE, {});
    return Object.keys(att)
      .filter(d => att[d] === 'present')
      .sort();
  }

  function markAttendance(status) {
    const att = load(KEYS.ATTENDANCE, {});
    const todayStr = today();
    att[todayStr] = status;
    save(KEYS.ATTENDANCE, att);
    renderAttendance();
    toast(status === 'present' ? '✅ Marked Present!' : '❌ Marked Absent', status === 'present' ? 'success' : 'info');
  }

  // Renders the Attendance section inside the Profile tab.
  function renderAttendance() {
    const list = document.getElementById("attendance-list");
    if (!list) return;
    const totalEl = document.getElementById('attendance-total');
    const emptyEl = document.getElementById('attendance-empty');

    const dates = getAttendance();

    list.innerHTML = '';
    dates.slice().reverse().forEach(date => {
      const li = document.createElement('li');
      li.textContent = fmtDate(date);
      li.style.cssText =
        'padding:10px 14px;margin:4px 0;border-radius:8px;' +
        'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);' +
        'font-family:var(--font-mono);font-size:13px;color:var(--t1);';
      list.appendChild(li);
    });

    if (totalEl) totalEl.textContent = String(dates.length);
    if (emptyEl) emptyEl.style.display = dates.length === 0 ? 'block' : 'none';
  }

  // ═══════════════════════════════════════════════════════
  //  CONFIRM DIALOG
  // ═══════════════════════════════════════════════════════
  let confirmCallback = null;

  function confirmAction(title, text, cb) {
    const titleEl = document.getElementById('confirm-title');
    const textEl  = document.getElementById('confirm-text');
    const okBtn   = document.getElementById('confirm-ok');
    if (!titleEl || !textEl || !okBtn) {
      // Modal not present on this page — fall back to native confirm
      if (window.confirm(title + '\n' + text)) cb();
      return;
    }
    titleEl.textContent = title;
    textEl.textContent  = text;
    confirmCallback = cb;
    okBtn.onclick = () => {
      closeModal('modal-confirm');
      if (confirmCallback) confirmCallback();
    };
    openModal('modal-confirm');
  }

  // ═══════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════
  function init() {
    // App always runs in dark mode — no theme toggle

    // Restore custom pomo duration
    const savedDur = load(KEYS.POMO_DURATION, 25) || 25;
    state.pomoDuration = savedDur;
    state.pomoSeconds = savedDur * 60;
    const durInput = document.getElementById('pomo-dur-input');
    if (durInput) durInput.value = savedDur;
    updatePomoDisplay();

    // Render roadmaps
    try { renderRoadmap('ai'); } catch(e) { console.error('AI roadmap error:', e); }
    // DSA now uses week-wise render (called when tab opens)

    // Always start on Home screen
    switchTab('home');

    // Update header
    updateHeader();

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
    });

    // Daily reminder check
    const todayStr = today();
    const lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit && lastVisit !== todayStr) {
      setTimeout(() => toast('👋 Welcome back! Ready to study?', 'info'), 1000);
    }
    localStorage.setItem('lastVisit', todayStr);

    // Register service worker (inline blob)
    if ('serviceWorker' in navigator) {
      const swCode = `
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open('roadmapx-v3').then(cache =>
      cache.match(e.request).then(cached => {
        const networkFetch = fetch(e.request).then(resp => {
          if (resp.ok) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});`.trim();
      try {
        const blob = new Blob([swCode], {type:'text/javascript'});
        navigator.serviceWorker.register(URL.createObjectURL(blob)).catch(()=>{});
      } catch(e) {}
    }

    console.log('✅ RoadmapX v2 initialized');
  }

  // ═══════════════════════════════════════════════════════
  //  AI / DSA SUB-TAB SWITCHING
  // ═══════════════════════════════════════════════════════
  function switchAISub(sub, btn) {
    const subs = ['roadmap','revision','pomo','notes','projects'];
    subs.forEach(s => {
      const el = document.getElementById('ai-sub-' + s);
      if (el) el.style.display = s === sub ? '' : 'none';
    });
    document.querySelectorAll('#ai-subtab-bar .section-subtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else {
      const b = document.getElementById('ai-subtab-' + sub);
      if (b) b.classList.add('active');
    }
    if (sub === 'notes')    { renderAINotes(); }
    if (sub === 'projects') { renderSectionProjects('ai'); }
    if (sub === 'pomo')     { updateSectionPomoDisplay('ai'); renderSectionPomoStats('ai'); }
    if (sub === 'revision') { renderSectionRevisions('ai'); }
  }

  function switchDSASub(sub, btn) {
    const subs = ['roadmap','revision','pomo','notes','projects'];
    subs.forEach(s => {
      const el = document.getElementById('dsa-sub-' + s);
      if (el) el.style.display = s === sub ? '' : 'none';
    });
    document.querySelectorAll('#dsa-subtab-bar .section-subtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else {
      const b = document.getElementById('dsa-subtab-' + sub);
      if (b) b.classList.add('active');
    }
    if (sub === 'notes')    { renderDSANotes(); }
    if (sub === 'projects') { renderSectionProjects('dsa'); }
    if (sub === 'pomo')     { updateSectionPomoDisplay('dsa'); renderSectionPomoStats('dsa'); }
    if (sub === 'revision') { renderSectionRevisions('dsa'); }
  }

  // ═══════════════════════════════════════════════════════
  //  AI NOTES (separate from general notes)
  // ═══════════════════════════════════════════════════════
  function aiAutoSaveNotes() {
    const ta = document.getElementById('ai-notes-ta');
    if (!ta) return;
    const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
    const wcEl = document.getElementById('ai-notes-wc');
    if (wcEl) wcEl.textContent = wc + ' words';
    clearTimeout(state._aiNotesTimer);
    state._aiNotesTimer = setTimeout(() => {
      const draft = load(KEYS.AI_NOTES, {});
      draft._draft = ta.value;
      save(KEYS.AI_NOTES, draft);
    }, 800);
  }

  function aiSaveNotes() {
    const ta = document.getElementById('ai-notes-ta');
    if (!ta || !ta.value.trim()) { toast('⚠️ Nothing to save', 'error'); return; }
    const data = load(KEYS.AI_NOTES, {});
    if (!data.entries) data.entries = [];
    const pomStats = load(KEYS.POMO_STATS, {});
    data.entries.unshift({
      id: Date.now().toString(),
      text: ta.value.trim(),
      date: today(),
      pomoCount: pomStats.ai || 0,
    });
    if (data.entries.length > 100) data.entries = data.entries.slice(0,100);
    data._draft = '';
    save(KEYS.AI_NOTES, data);
    ta.value = '';
    const wcEl = document.getElementById('ai-notes-wc');
    if (wcEl) wcEl.textContent = '0 words';
    renderAINotes();
    toast('📝 AI note saved!', 'success');
  }

  function renderAINotes() {
    const data = load(KEYS.AI_NOTES, {});
    const ta = document.getElementById('ai-notes-ta');
    if (ta && data._draft && !ta.value) ta.value = data._draft;
    const listEl = document.getElementById('ai-notes-list');
    if (!listEl) return;
    const entries = data.entries || [];
    if (!entries.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-ico">📝</div><div class="empty-title">No AI notes yet</div><div class="empty-sub">Save your first AI study note above</div></div>';
      return;
    }
    listEl.innerHTML = entries.slice(0,30).map(e => `
      <div class="card" style="margin-bottom:8px">
        <div class="card-header">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span style="font-size:12px;font-weight:700;color:var(--c1);font-family:var(--font-mono)">${fmtDate(e.date)}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="card-badge badge-done">🍅 ${e.pomoCount||0}</span>
            <button onclick="APP.deleteAINote('${e.id}')" style="font-size:12px;color:var(--c3);padding:2px 6px;border-radius:6px;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">✕</button>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.7;white-space:pre-wrap">${esc(e.text.slice(0,200))}${e.text.length>200?'<span style="color:var(--t3c)"> …</span>':''}</div>
      </div>`).join('');
  }

  function deleteAINote(id) {
    const data = load(KEYS.AI_NOTES, {});
    data.entries = (data.entries || []).filter(e => e.id !== id);
    save(KEYS.AI_NOTES, data);
    renderAINotes();
    toast('🗑️ AI note deleted', 'info');
  }

  // ═══════════════════════════════════════════════════════
  //  DSA NOTES (separate state)
  // ═══════════════════════════════════════════════════════
  function dsaAutoSaveNotes() {
    const ta = document.getElementById('dsa-notes-ta');
    if (!ta) return;
    const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
    const wcEl = document.getElementById('dsa-notes-wc');
    if (wcEl) wcEl.textContent = wc + ' words';
    clearTimeout(state._dsaNotesTimer);
    state._dsaNotesTimer = setTimeout(() => {
      const draft = load(KEYS.DSA_NOTES, {});
      draft._draft = ta.value;
      save(KEYS.DSA_NOTES, draft);
    }, 800);
  }

  function dsaSaveNotes() {
    const ta = document.getElementById('dsa-notes-ta');
    if (!ta || !ta.value.trim()) { toast('⚠️ Nothing to save', 'error'); return; }
    const data = load(KEYS.DSA_NOTES, {});
    if (!data.entries) data.entries = [];
    const pomStats = load(KEYS.POMO_STATS, {});
    data.entries.unshift({
      id: Date.now().toString(),
      text: ta.value.trim(),
      date: today(),
      pomoCount: pomStats.dsa || 0,
    });
    if (data.entries.length > 100) data.entries = data.entries.slice(0,100);
    data._draft = '';
    save(KEYS.DSA_NOTES, data);
    ta.value = '';
    const wcEl = document.getElementById('dsa-notes-wc');
    if (wcEl) wcEl.textContent = '0 words';
    renderDSANotes();
    toast('📝 DSA note saved!', 'success');
  }

  function renderDSANotes() {
    const data = load(KEYS.DSA_NOTES, {});
    const ta = document.getElementById('dsa-notes-ta');
    if (ta && data._draft && !ta.value) ta.value = data._draft;
    const listEl = document.getElementById('dsa-notes-list');
    if (!listEl) return;
    const entries = data.entries || [];
    if (!entries.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-ico">📝</div><div class="empty-title">No DSA notes yet</div><div class="empty-sub">Save your first DSA study note above</div></div>';
      return;
    }
    listEl.innerHTML = entries.slice(0,30).map(e => `
      <div class="card" style="margin-bottom:8px">
        <div class="card-header">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span style="font-size:12px;font-weight:700;color:var(--c2);font-family:var(--font-mono)">${fmtDate(e.date)}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="card-badge badge-done">🍅 ${e.pomoCount||0}</span>
            <button onclick="APP.deleteDSANote('${e.id}')" style="font-size:12px;color:var(--c3);padding:2px 6px;border-radius:6px;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">✕</button>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.7;white-space:pre-wrap">${esc(e.text.slice(0,200))}${e.text.length>200?'<span style="color:var(--t3c)"> …</span>':''}</div>
      </div>`).join('');
  }

  function deleteDSANote(id) {
    const data = load(KEYS.DSA_NOTES, {});
    data.entries = (data.entries || []).filter(e => e.id !== id);
    save(KEYS.DSA_NOTES, data);
    renderDSANotes();
    toast('🗑️ DSA note deleted', 'info');
  }

  // ═══════════════════════════════════════════════════════
  //  SECTION REVISION SYSTEM (AI & DSA dedicated revision panels)
  // ═══════════════════════════════════════════════════════
  const _sectionRevState = { ai: 'all', dsa: 'all' };

  function renderSectionRevisions(source) {
    const listEl = document.getElementById(source + '-revision-list');
    if (!listEl) return;
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    const f = _sectionRevState[source] || 'all';

    // Filter to this source only
    let filtered = revs.filter(r => {
      if (r.source !== source) return false;
      if (f === 'due')     return r.date === todayStr && !r.done;
      if (f === 'overdue') return r.date < todayStr && !r.done;
      if (f === 'pending') return r.date > todayStr && !r.done;
      if (f === 'done')    return r.done;
      return true; // 'all'
    });

    filtered.sort((a, b) => {
      if (!a.done && !b.done) return a.date.localeCompare(b.date);
      if (!a.done) return -1;
      if (!b.done) return 1;
      return (b.doneDate || '').localeCompare(a.doneDate || '');
    });

    if (!filtered.length) {
      const emptyMsg = f === 'all'
        ? 'No revisions yet. Complete topics in the roadmap to auto-schedule revisions.'
        : 'No revisions in this category.';
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🔁</div><div class="empty-title">Nothing here</div><div class="empty-sub">${emptyMsg}</div></div>`;
      return;
    }

    listEl.innerHTML = filtered.map(r => {
      const overdue  = r.date < todayStr && !r.done;
      const dueToday = r.date === todayStr && !r.done;
      const future   = r.date > todayStr && !r.done;

      let statusText, statusColor, statusBg;
      if (r.done) {
        statusText  = '✅ Done';
        statusColor = 'var(--c5)';
        statusBg    = 'rgba(6,214,160,.08)';
      } else if (overdue) {
        const daysOver = daysDiff(r.date, todayStr);
        statusText  = `⚠️ ${daysOver}d Overdue`;
        statusColor = 'var(--c3)';
        statusBg    = 'rgba(255,107,107,.06)';
      } else if (dueToday) {
        statusText  = '📌 Due Today';
        statusColor = 'var(--c4)';
        statusBg    = 'rgba(255,209,102,.06)';
      } else {
        statusText  = `📅 ${fmtDate(r.date)}`;
        statusColor = 'var(--t2)';
        statusBg    = '';
      }

      const intervalLabel = getRevisionDayLabel(r.interval);
      const sourceColor = source === 'ai' ? 'var(--c1)' : 'var(--c2)';
      const sourceBorder = source === 'ai' ? 'rgba(0,245,212,.2)' : 'rgba(123,47,255,.2)';
      const sourceBg = source === 'ai' ? 'rgba(0,245,212,.08)' : 'rgba(123,47,255,.08)';

      return `
      <div class="rev-card" id="srcrev-${r.id}" style="${r.done ? 'opacity:.55;' : ''}${overdue ? 'border-color:rgba(255,107,107,.3);' : dueToday ? 'border-color:rgba(255,209,102,.3);' : ''}">
        <div class="rev-header">
          <div class="rev-date-badge" style="${dueToday ? 'background:rgba(255,209,102,.12);color:var(--c4)' : overdue ? 'background:rgba(255,107,107,.12);color:var(--c3)' : r.done ? 'background:rgba(6,214,160,.12);color:var(--c5)' : ''}">
            ${intervalLabel}
          </div>
          <div class="rev-info">
            <div class="rev-topic">${esc(r.topicTitle)}</div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:3px">
              <span style="padding:1px 6px;border-radius:var(--rfull);font-size:9px;font-weight:700;background:${sourceBg};color:${sourceColor};border:1px solid ${sourceBorder}">Day ${r.topicDay}</span>
              <span style="font-size:10px;color:${statusColor};font-weight:600">${statusText}</span>
            </div>
          </div>
          <div class="rev-status">
            <button class="rev-done-btn ${r.done ? 'completed' : ''}" onclick="APP.markSectionRevDone('${r.id}','${source}')">
              ${r.done ? '✓' : 'Done'}
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function markSectionRevDone(id, source) {
    const revs = load(KEYS.REVISIONS, []);
    const idx = revs.findIndex(r => r.id === id);
    if (idx < 0) return;
    revs[idx].done = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderSectionRevisions(source);
    // Keep global revision tab in sync
    try { renderRevisions(); } catch(e) {}
    // Refresh inline revision panels
    renderInlineRevisions('ai-inline-rev-days', 'ai');
    renderInlineRevisions('ai-inline-rev-weeks', 'ai');
    renderInlineRevisions('dsa-inline-rev-overview', 'dsa');
    renderInlineRevisions('dsa-inline-rev', 'dsa');
    toast(revs[idx].done ? '✅ Revision marked complete!' : '↩️ Revision unmarked', 'success');
  }

  function setAIRevFilter(f, btn) {
    _sectionRevState.ai = f;
    document.querySelectorAll('#ai-sub-revision .filter-row .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderSectionRevisions('ai');
  }

  function setDSARevFilter(f, btn) {
    _sectionRevState.dsa = f;
    document.querySelectorAll('#dsa-sub-revision .filter-row .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderSectionRevisions('dsa');
  }

  // ═══════════════════════════════════════════════════════
  //  SECTION PROJECTS (AI / DSA filtered views)
  // ═══════════════════════════════════════════════════════
  function renderSectionProjects(section) {
    const listEl = document.getElementById(section + '-projects-list');
    if (!listEl) return;
    const projects = load(KEYS.PROJECTS, []).filter(p => p.source === section);
    if (!projects.length) {
      const label = section === 'ai' ? 'AI' : 'DSA';
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🚀</div><div class="empty-title">No ${label} projects yet</div><div class="empty-sub">Add your first ${label} project above</div></div>`;
      return;
    }
    listEl.innerHTML = projects.map(p => {
      const progressPct = Math.min(100, Math.round(p.progressPct || 0));
      return `
      <div class="proj-card">
        <div class="flex items-center gap6" style="margin-bottom:6px">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(0,245,212,.1),rgba(123,47,255,.1));border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${section==='ai'?'🤖':'💻'}</div>
          <div style="flex:1;min-width:0">
            <div class="proj-name">${esc(p.name)}</div>
            <div class="proj-meta">Created ${fmtDate(p.createdAt)}</div>
          </div>
          <button onclick="APP.openProjectModal('${p.id}')" style="font-size:16px;background:none;border:none;color:var(--c4);cursor:pointer;padding:4px 6px;border-radius:6px">✏️</button>
        </div>
        ${p.tags ? `<div style="font-size:10px;color:var(--c1);font-family:var(--font-mono);margin-bottom:6px">${esc(p.tags)}</div>` : ''}
        ${p.notes ? `<div style="font-size:11px;color:var(--t2);line-height:1.6;background:var(--bg3);padding:8px;border-radius:var(--r8);border:1px solid rgba(255,255,255,.05);margin-bottom:8px">${esc(p.notes)}</div>` : ''}
        <div class="proj-progress-label"><span>Progress</span><span>${progressPct}%</span></div>
        <div class="proj-progress-bar"><div class="proj-progress-fill" style="width:${progressPct}%"></div></div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px">
          <button class="note-del-btn" onclick="APP.deleteProject('${p.id}')">🗑️ Delete</button>
        </div>
      </div>`;
    }).join('');
  }

  // ═══════════════════════════════════════════════════════
  //  SECTION POMODORO (independent AI & DSA timers)
  // ═══════════════════════════════════════════════════════
  const SECTION_BREAK = 5 * 60;

  function _sectionPlayAlarm(section) {
    _sectionStopAlarmRaw(section);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const beep = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'square'; osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
      };
      beep();
      _sectionPomoState[section].alarmAudio = ctx;
      _sectionPomoState[section].alarmInterval = setInterval(beep, 600);
      const stopBtn = document.getElementById(section + '-pomo-alarm-stop');
      if (stopBtn) stopBtn.style.display = 'inline-flex';
      const ring = document.getElementById(section + '-pomo-ring');
      if (ring) ring.classList.add('alarm-ringing');
    } catch(e) {}
  }

  function _sectionStopAlarmRaw(section) {
    const s = _sectionPomoState[section];
    try {
      if (s.alarmInterval) { clearInterval(s.alarmInterval); s.alarmInterval = null; }
      if (s.alarmAudio) { s.alarmAudio.close(); s.alarmAudio = null; }
    } catch(e) {}
  }

  function stopSectionAlarm(section) {
    const s = _sectionPomoState[section];
    const wasRinging = s.alarmRinging;
    _sectionStopAlarmRaw(section);
    s.alarmRinging = false;
    const stopBtn = document.getElementById(section + '-pomo-alarm-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    const ring = document.getElementById(section + '-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    if (wasRinging) {
      s.isBreak = true;
      s.seconds = SECTION_BREAK;
      _updateSectionMode(section, 'BREAK', '⏸ Pause');
      updateSectionPomoDisplay(section);
      toast('☕ Break started! Relax.', 'info');
      s.running = true;
      s.interval = setInterval(() => {
        s.seconds--;
        updateSectionPomoDisplay(section);
        if (s.seconds <= 0) {
          clearInterval(s.interval); s.interval = null;
          s.running = false; s.isBreak = false;
          s.seconds = s.duration * 60;
          _updateSectionMode(section, 'FOCUS', '▶ Start');
          updateSectionPomoDisplay(section);
          toast('💪 Break over! Start another focus session.', 'info');
        }
      }, 1000);
    }
  }

  function _updateSectionMode(section, mode, btnText) {
    const modeEl   = document.getElementById(section + '-pomo-mode');
    const startBtn = document.getElementById(section + '-pomo-start-btn');
    if (modeEl) modeEl.textContent = mode;
    if (startBtn) startBtn.textContent = btnText;
  }

  function updateSectionPomoDisplay(section) {
    const s = _sectionPomoState[section];
    const m = Math.floor(s.seconds / 60);
    const sec = s.seconds % 60;
    const timeEl = document.getElementById(section + '-pomo-time');
    if (timeEl) timeEl.textContent = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    const total = s.isBreak ? SECTION_BREAK : s.duration * 60;
    const progress = ((total - s.seconds) / total) * 360;
    const color = s.isBreak ? 'var(--c5)' : (section === 'ai' ? 'var(--c1)' : 'var(--c2)');
    const ringEl = document.getElementById(section + '-pomo-ring');
    if (ringEl && !ringEl.classList.contains('alarm-ringing')) {
      ringEl.style.background = `conic-gradient(${color} ${progress}deg, var(--bg3) ${progress}deg)`;
    }
  }

  function renderSectionPomoStats(section) {
    const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    const sessions = stats[section] || 0;
    const s = _sectionPomoState[section];
    const hrs = ((sessions * s.duration) / 60).toFixed(1);
    const sessEl = document.getElementById(section + '-ps-sessions');
    const hrsEl  = document.getElementById(section + '-ps-hours');
    const focEl  = document.getElementById(section + '-pomo-focus-hours');
    const dotsEl = document.getElementById(section + '-pomo-dots');
    if (sessEl) sessEl.textContent = sessions;
    if (hrsEl)  hrsEl.textContent  = hrs;
    if (focEl)  focEl.textContent  = hrs;
    if (dotsEl) {
      const dots = sessions % 4 || (sessions > 0 ? 4 : 0);
      dotsEl.innerHTML = Array(4).fill(0).map((_,i) => `<div class="pomo-dot ${i < dots ? 'filled' : ''}"></div>`).join('');
    }
  }

  function sectionPomoToggle(section) {
    const s = _sectionPomoState[section];
    if (s.alarmRinging) { stopSectionAlarm(section); return; }
    if (s.running) {
      clearInterval(s.interval); s.interval = null;
      s.running = false;
      _updateSectionMode(section, s.isBreak ? 'BREAK' : 'FOCUS', '▶ Resume');
    } else {
      s.running = true;
      _updateSectionMode(section, s.isBreak ? 'BREAK' : 'FOCUS', '⏸ Pause');
      s.interval = setInterval(() => {
        s.seconds--;
        updateSectionPomoDisplay(section);
        if (s.seconds <= 0) {
          clearInterval(s.interval); s.interval = null;
          s.running = false;
          if (!s.isBreak) {
            const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
            stats[section] = (stats[section] || 0) + 1;
            save(KEYS.POMO_STATS, stats);
            updateStreak(section, true);
            renderSectionPomoStats(section);
            renderPomoStats();
            try { if (typeof PomoEnhancer !== 'undefined') PomoEnhancer.logSession(section, s.duration); } catch(e) {}
            s.alarmRinging = true;
            _sectionPlayAlarm(section);
            _updateSectionMode(section, '⏰ DONE!', '🔔 Stop Alarm');
            toast(`⏰ ${section === 'ai' ? 'AI' : 'DSA'} session complete! Stop alarm to start break.`, 'success');
          } else {
            s.isBreak = false;
            s.seconds = s.duration * 60;
            _updateSectionMode(section, 'FOCUS', '▶ Start');
            updateSectionPomoDisplay(section);
            toast('💪 Break over! Start another focus session.', 'info');
          }
        }
      }, 1000);
    }
  }

  function sectionPomoReset(section) {
    const s = _sectionPomoState[section];
    clearInterval(s.interval); s.interval = null;
    _sectionStopAlarmRaw(section);
    s.running = false; s.isBreak = false; s.alarmRinging = false;
    s.seconds = s.duration * 60;
    const stopBtn = document.getElementById(section + '-pomo-alarm-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    const ring = document.getElementById(section + '-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    _updateSectionMode(section, 'FOCUS', '▶ Start');
    updateSectionPomoDisplay(section);
  }

  function sectionPomoSkip(section) {
    const s = _sectionPomoState[section];
    clearInterval(s.interval); s.interval = null;
    _sectionStopAlarmRaw(section);
    s.running = false; s.alarmRinging = false;
    s.isBreak = !s.isBreak;
    s.seconds = s.isBreak ? SECTION_BREAK : s.duration * 60;
    const ring = document.getElementById(section + '-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    _updateSectionMode(section, s.isBreak ? 'BREAK' : 'FOCUS', '▶ Start');
    updateSectionPomoDisplay(section);
  }

  function setSectionPomoDuration(section) {
    const input = document.getElementById(section + '-pomo-dur-input');
    const val = input ? (parseInt(input.value) || 25) : 25;
    const clamped = Math.max(1, Math.min(120, val));
    if (input) input.value = clamped;
    const s = _sectionPomoState[section];
    s.duration = clamped;
    if (!s.running && !s.isBreak) { s.seconds = clamped * 60; updateSectionPomoDisplay(section); }
    toast(`⏱️ ${section.toUpperCase()} focus set to ${clamped} min`, 'success');
  }

  // Public API
  return {
    switchTab, filterRoadmap, setFilter, toggleDayCard, toggleDone, saveDate,
    selectPomoType, pomodoroToggle, pomodoroReset, pomodoroSkip,
    setCustomDuration, stopAlarm,
    renderRevisions, setRevFilter, markRevisionDone, toggleRevNotes,
    renderStreaks, markStudiedToday,
    openProjectModal, saveProject, deleteProject, logPomoToProject,
    autoSaveNotes, saveNotes, deleteNote,
    handleFileUpload, downloadFile, deleteFile,
    renderProfile,
    markAttendance, renderAttendance, getAttendance,
    continueLastSession,
    exportData, importData, resetAllData,
    closeModal, init,
    // Structured AI Roadmap
    selectAILevel, selectAIWeek, backToLevels, backToWeeks,
    toggleStructuredDay, toggleStructuredDone,
    // DSA Week-wise Roadmap
    renderDSAWeeks, toggleDSAWeek, toggleDSATopic, toggleDSATopicDone, dsaBackToWeeks,
    toggleDSAProject, setDSAProjectStatus,
    // AI Week Projects
    toggleAIProject, setAIProjectStatus,
    // Inline Revision
    markInlineRevDone,
    // Sub-tab navigation
    switchAISub, switchDSASub,
    // AI Notes
    aiAutoSaveNotes, aiSaveNotes, renderAINotes, deleteAINote,
    // DSA Notes
    dsaAutoSaveNotes, dsaSaveNotes, renderDSANotes, deleteDSANote,
    // Section Projects
    renderSectionProjects,
    // Section Pomodoro
    sectionPomoToggle, sectionPomoReset, sectionPomoSkip,
    setSectionPomoDuration, stopSectionAlarm,
    updateSectionPomoDisplay, renderSectionPomoStats,
    // Section Revision
    renderSectionRevisions, markSectionRevDone,
    setAIRevFilter, setDSARevFilter,
    // Revision scheduling (used by roadmap_bridge and SpacedRep)
    scheduleRevisions,
    // Direct screen navigation (used by nav stack)
    showAILevels: function() {
      showScreen('ai-screen-levels');
      aiCurrentLevel = null;
      aiCurrentWeek = null;
    },
  };
})();

// ── Start the app ──
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof APP !== 'undefined' && APP.init) APP.init();
  } catch(e) {
    console.error('Init Error:', e);
  }
});


// ═══════════════════════════════════════════════════════
//  ROADMAPX v3 — FEATURE UPGRADES
//  All new modules injected here. Extends APP without
//  breaking existing functionality.
// ═══════════════════════════════════════════════════════

(function() {
'use strict';

// ── Helpers (local shortcuts) ──
const $ = id => document.getElementById(id);
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
function lsGet(k, def) {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
  catch(e) { return def; }
}
function lsSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {}
}

// ═══════════════════════════════════════════════════════
//  MODULE 1: XP + GAMIFICATION SYSTEM
// ═══════════════════════════════════════════════════════
const XP = (function() {
  const LEVELS = [
    {min:0,    max:499,   name:'Beginner',     ico:'🌱', color:'#06d6a0'},
    {min:500,  max:1499,  name:'Explorer',     ico:'🔍', color:'#00f5d4'},
    {min:1500, max:2999,  name:'Learner',      ico:'📚', color:'#118ab2'},
    {min:3000, max:5999,  name:'Practitioner', ico:'⚙️',  color:'#7b2fff'},
    {min:6000, max:9999,  name:'Developer',    ico:'💻', color:'#ffd166'},
    {min:10000,max:14999, name:'Engineer',     ico:'🛠️',  color:'#ff6b6b'},
    {min:15000,max:24999, name:'Expert',       ico:'🚀', color:'#ef476f'},
    {min:25000,max:Infinity,name:'Master AI Engineer',ico:'🤖',color:'#00f5d4'},
  ];

  const BADGES_DEF = [
    {id:'first_day',    name:'First Step',     ico:'👣', desc:'Complete Day 1',           check: (s)=> s.aiDone >= 1 || s.dsaDone >= 1},
    {id:'week1',        name:'Week 1 Done',    ico:'🗓️', desc:'Complete 7 days',           check: (s)=> s.totalDone >= 7},
    {id:'streak7',      name:'On Fire',        ico:'🔥', desc:'7-day streak',              check: (s)=> s.maxStreak >= 7},
    {id:'streak30',     name:'Unstoppable',    ico:'⚡', desc:'30-day streak',             check: (s)=> s.maxStreak >= 30},
    {id:'pomo10',       name:'Focus Master',   ico:'⏱️', desc:'10 Pomodoro sessions',     check: (s)=> s.totalPomo >= 10},
    {id:'pomo100',      name:'Deep Worker',    ico:'🧠', desc:'100 Pomodoro sessions',    check: (s)=> s.totalPomo >= 100},
    {id:'beginner_ai',  name:'AI Beginner',    ico:'🟢', desc:'Complete AI Beginner',     check: (s)=> s.aiDone >= 42},
    {id:'intermediate', name:'AI Intermediate',ico:'🟡', desc:'Complete AI Intermediate', check: (s)=> s.aiDone >= 100},
    {id:'advanced',     name:'AI Advanced',    ico:'🔴', desc:'Complete AI Advanced',     check: (s)=> s.aiDone >= 171},
    {id:'dsa_done',     name:'DSA Complete',   ico:'💻', desc:'Complete DSA Roadmap',     check: (s)=> s.dsaDone >= 20},
    {id:'notes10',      name:'Note Taker',     ico:'📝', desc:'Save 10 notes',            check: (s)=> s.notesSaved >= 10},
    {id:'projects3',    name:'Builder',        ico:'🏗️', desc:'Add 3 projects',           check: (s)=> s.projects >= 3},
    {id:'projects10',   name:'Portfolio Pro',  ico:'🌟', desc:'Add 10 projects',          check: (s)=> s.projects >= 10},
    {id:'revision20',   name:'Reviser',        ico:'🔁', desc:'Complete 20 revisions',    check: (s)=> s.revisionsDone >= 20},
    {id:'attendance90', name:'Consistent',     ico:'📋', desc:'90% attendance (30 days)',  check: (s)=> s.attendance >= 0.9},
  ];

  function getStats() {
    const aiProg  = lsGet('roadmapAI', {});
    const dsaProg = lsGet('roadmapDSA', {});
    const pomStats= lsGet('pomodoroStats', {ai:0,dsa:0,projects:0,extra:0});
    const streaks = lsGet('streaks', {});
    const notes   = lsGet('extraNotes', []);
    const projects= lsGet('projects', []);
    const att     = lsGet('attendance', {});
    // FIX: revisions are stored as a flat array with .done flags under 'revisions' key.
    const revData = lsGet('revisions', []);
    const revDone = Array.isArray(revData)
      ? revData.filter(r => r && r.done).length
      : Object.values(revData).flat().filter(r => r && r.done).length;

    const aiDone  = Object.values(aiProg).filter(v=>v.done).length;
    const dsaAllT = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
    const dsaDone = dsaAllT.filter(t=>dsaProg['t'+t.id]?.done).length;
    const totalPomo = (pomStats.ai||0)+(pomStats.dsa||0)+(pomStats.projects||0)+(pomStats.extra||0);
    const maxStreak = Math.max(streaks.ai?.longest || 0, streaks.dsa?.longest || 0, streaks.ai?.current || 0, streaks.dsa?.current || 0);
    const notesSaved = Array.isArray(notes) ? notes.length : 0;
    const projCount  = Array.isArray(projects) ? projects.length : 0;

    // Attendance rate
    const last30 = Array(30).fill(0).map((_,i)=>{
      const d = new Date(); d.setDate(d.getDate()-i);
      return d.toISOString().slice(0,10);
    });
    const markedDays = last30.filter(d=>att[d]);
    const presentDays= last30.filter(d=>att[d]==='present').length;
    const attRate = markedDays.length ? presentDays/markedDays.length : 0;

    return {
      aiDone, dsaDone, totalDone: aiDone+dsaDone,
      totalPomo, maxStreak,
      notesSaved, projects: projCount,
      revisionsDone: revDone,
      attendance: attRate,
    };
  }

  function computeXP(stats) {
    // XP formula
    let xp = 0;
    xp += stats.aiDone * 30;
    xp += stats.dsaDone * 30;
    xp += stats.totalPomo * 5;
    xp += stats.maxStreak * 20;
    xp += stats.notesSaved * 10;
    xp += stats.projects * 50;
    xp += stats.revisionsDone * 15;
    // Bonus for attendance
    if (stats.attendance > 0.9) xp += 500;
    else if (stats.attendance > 0.7) xp += 200;
    return xp;
  }

  function getLevel(xp) {
    return LEVELS.find(l => xp >= l.min && xp <= l.max) || LEVELS[LEVELS.length-1];
  }

  function getLevelProgress(xp) {
    const lvl = getLevel(xp);
    if (lvl.max === Infinity) return 100;
    const range = lvl.max - lvl.min;
    return Math.round(((xp - lvl.min) / range) * 100);
  }

  function checkNewBadges(stats) {
    const earned = lsGet('earnedBadges', []);
    const newBadges = [];
    BADGES_DEF.forEach(b => {
      if (!earned.includes(b.id) && b.check(stats)) {
        earned.push(b.id);
        newBadges.push(b);
      }
    });
    if (newBadges.length) {
      lsSet('earnedBadges', earned);
      newBadges.forEach(b => showBadgeToast(b));
    }
    return earned;
  }

  function showXPToast(amount) {
    const el = $('xp-toast');
    if (!el) return;
    el.textContent = '+' + amount + ' XP 🎉';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  }

  function showBadgeToast(badge) {
    const el = $('xp-toast');
    if (!el) return;
    el.textContent = '🏆 ' + badge.name + ' unlocked!';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }

  function render() {
    const stats = getStats();
    const xp = computeXP(stats);
    const lvl = getLevel(xp);
    const pct = getLevelProgress(xp);
    const earned = checkNewBadges(stats);

    // Update level display in header-like area
    if ($('xp-level-ico'))  $('xp-level-ico').textContent = lvl.ico;
    if ($('xp-level-name')) $('xp-level-name').textContent = lvl.name;
    if ($('xp-points-text')) $('xp-points-text').textContent = xp.toLocaleString() + ' XP';
    if ($('xp-bar-fill'))   $('xp-bar-fill').style.width = pct + '%';

    // Render badges grid
    const grid = $('badges-grid');
    if (!grid) return;
    grid.innerHTML = BADGES_DEF.map(b => {
      const isEarned = earned.includes(b.id);
      return `<div class="badge-item ${isEarned?'earned':'locked'}">
        <div class="badge-ico">${b.ico}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
      </div>`;
    }).join('');
  }

  return { render, getStats, computeXP, showXPToast, checkNewBadges, getLevel };
})();

// Expose to APP namespace
window._XP = XP;

// ═══════════════════════════════════════════════════════
//  MODULE 2: AI MENTOR SYSTEM (Uses Anthropic API via artifact)
// ═══════════════════════════════════════════════════════
const AIMentor = (function() {
  let currentDay = null;
  let currentMode = 'explain';
  let isLoading = false;

  function open(dayData) {
    currentDay = dayData;
    currentMode = 'explain';
    // Reset UI
    const resp = $('ai-response-area');
    const noteArea = $('ai-note-area');
    const saveBtn = $('ai-save-note-btn');
    if (resp) {
      resp.textContent = `Ready to help with: "${dayData.title}"

Tap "Ask AI" to get a simple explanation.`;
      resp.style.display = 'block';
    }
    if (noteArea) noteArea.style.display = 'none';
    if (saveBtn) saveBtn.style.display = 'none';
    // Reset tab buttons
    document.querySelectorAll('.ai-tab-btn').forEach((b,i) => b.classList.toggle('active', i===0));
    $('ai-modal-overlay')?.classList.add('show');
  }

  function close() {
    $('ai-modal-overlay')?.classList.remove('show');
  }

  function setTab(mode, btn) {
    currentMode = mode;
    document.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');
    const resp = $('ai-response-area');
    const noteArea = $('ai-note-area');
    const saveBtn = $('ai-save-note-btn');
    if (!resp) return;
    const prompts = {
      explain: `Explain "${currentDay?.title}" in simple, beginner-friendly terms.`,
      notes: `Generate structured study notes for "${currentDay?.title}".`,
      practice: `Give me 5 practice questions for "${currentDay?.title}".`,
      project: `Suggest a mini-project idea to practice "${currentDay?.title}".`,
    };
    resp.textContent = prompts[mode] || '';
    if (mode === 'notes') {
      noteArea.style.display = 'block';
      saveBtn.style.display = 'inline-flex';
    } else {
      noteArea.style.display = 'none';
      saveBtn.style.display = 'none';
    }
  }

  async function ask() {
    if (!currentDay || isLoading) return;
    isLoading = true;
    const resp = $('ai-response-area');
    const btn = $('ai-ask-btn');
    if (btn) btn.textContent = '⏳ Thinking...';
    if (resp) {
      resp.innerHTML = '<span class="ai-loading-dots">Generating response</span>';
    }

    const dayInfo = `
Topic: ${currentDay.title}
Goal: ${currentDay.goal || ''}
Explanation: ${currentDay.explanation || ''}
    `.trim();

    const prompts = {
      explain: `You are an expert AI tutor. Explain this topic in simple, clear terms for a learner:

${dayInfo}

Use analogies, examples, and keep it under 250 words. Format with short paragraphs.`,
      notes: `Generate concise, structured study notes for this topic:

${dayInfo}

Format: Key concept → explanation. Use bullet points. Max 300 words.`,
      practice: `Create 5 progressive practice questions for:

${dayInfo}

Q1 easy, Q5 hard. Include the key skill each tests. Keep it concise.`,
      project: `Suggest ONE specific mini-project to practice:

${dayInfo}

Include: what to build, key skills practiced, rough time estimate (hrs). Be concrete and inspiring.`,
    };

    const prompt = prompts[currentMode] || prompts.explain;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(c => c.text || '').join('') || 'No response. Try again.';

      if (resp) resp.textContent = text;
      if (currentMode === 'notes') {
        const noteArea = $('ai-note-area');
        if (noteArea) noteArea.value = text;
      }
      // Award XP for using AI
      const xpKey = 'aiUsedToday_' + todayStr();
      if (!lsGet(xpKey, false)) {
        lsSet(xpKey, true);
        XP.showXPToast(10);
      }
    } catch(e) {
      if (resp) resp.textContent = '⚠️ AI unavailable. Check your connection.\n\nTip: Review the topic explanation in the day card instead!';
    }

    isLoading = false;
    if (btn) btn.textContent = '🤖 Ask Again';
  }

  function saveNote() {
    const noteArea = $('ai-note-area');
    if (!noteArea || !noteArea.value.trim()) return;
    const notes = lsGet('extraNotes', []);
    const note = {
      id: Date.now(),
      date: todayStr(),
      title: 'AI Notes: ' + (currentDay?.title || 'Topic'),
      content: noteArea.value.trim(),
      aiGenerated: true,
    };
    notes.unshift(note);
    lsSet('extraNotes', notes);
    // Show feedback
    const saveBtn = $('ai-save-note-btn');
    if (saveBtn) {
      saveBtn.textContent = '✅ Saved!';
      setTimeout(() => saveBtn.textContent = '💾 Save Note', 1500);
    }
    XP.showXPToast(10);
  }

  return { open, close, setTab, ask, saveNote };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 3: ANALYTICS DASHBOARD
// ═══════════════════════════════════════════════════════
const Analytics = (function() {
  function getStudyHoursLast14() {
    const att = lsGet('attendance', {});
    const aiProg = lsGet('roadmapAI', {});
    const pomo = lsGet('pomodoroHistory', []);
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      // Estimate hours: pomo sessions that day × 0.5hrs + attendance
      const dayPomos = pomo.filter(p => p.date === ds).length;
      const studied = att[ds] === 'present' ? 1 : 0;
      days.push({ date: ds, label: d.toLocaleDateString('en',{weekday:'short'}), hours: dayPomos * 0.5 + studied * 1.5 });
    }
    return days;
  }

  function getWeakTopics() {
    const revisions = lsGet('revisions', []);
    const weak = [];
    const todayISO = new Date().toISOString().slice(0,10);
    const revArr = Array.isArray(revisions) ? revisions : [];
    // Group by topicDay and count overdue
    const grouped = {};
    revArr.forEach(r => {
      if (!r || r.done) return;
      if (r.date && r.date <= todayISO) {
        const key = r.source + '_' + r.topicDay;
        if (!grouped[key]) grouped[key] = { name: r.topicTitle || ('Day ' + r.topicDay), overdueCount: 0 };
        grouped[key].overdueCount++;
      }
    });
    Object.values(grouped).forEach(g => { if (g.overdueCount > 0) weak.push(g); });
    return weak.sort((a,b) => b.overdueCount - a.overdueCount).slice(0, 5);
  }

  function getInsights() {
    const stats = XP.getStats();
    const insights = [];

    if (stats.maxStreak >= 7) insights.push({ icon:'🔥', text:`<strong>You're on a ${stats.maxStreak}-day streak!</strong> Incredible consistency.` });
    if (stats.totalPomo > 10) insights.push({ icon:'⏱️', text:`<strong>${stats.totalPomo} Pomodoro sessions</strong> completed. That's serious focus time!` });
    if (stats.aiDone > 0) {
      const pct = Math.round((stats.aiDone / 171) * 100);
      insights.push({ icon:'🤖', text:`AI Roadmap: <strong>${stats.aiDone} days done (${pct}%)</strong>. Keep the momentum!` });
    }
    if (stats.dsaDone > 0) insights.push({ icon:'💻', text:`DSA Roadmap: <strong>${stats.dsaDone}/20 topics</strong> mastered.` });
    if (stats.maxStreak === 0) insights.push({ icon:'💡', text:`Start your streak today! <strong>Study for just 30 minutes</strong> to begin Day 1.` });
    if (stats.attendance < 0.5 && stats.totalDone > 5) insights.push({ icon:'⚠️', text:`Attendance is below 50%. <strong>Consistency beats intensity</strong> — try to show up daily.` });

    return insights.length ? insights : [{ icon:'📊', text:'Complete some study sessions to unlock insights!' }];
  }

  function render() {
    // Insights
    const insightsEl = $('analytics-insights');
    if (insightsEl) {
      const insights = getInsights();
      insightsEl.innerHTML = insights.map(i =>
        `<div class="analytics-insight-card"><div class="insight-row"><span class="insight-icon">${i.icon}</span><div class="insight-text">${i.text}</div></div></div>`
      ).join('');
    }

    // Study Hours Chart (last 14 days)
    const hoursEl = $('study-hours-chart');
    if (hoursEl) {
      const data = getStudyHoursLast14();
      const maxH = Math.max(...data.map(d => d.hours), 1);
      hoursEl.innerHTML = data.map(d => {
        const pct = Math.round((d.hours / maxH) * 100);
        const color = d.hours >= 2 ? 'var(--c5)' : d.hours >= 1 ? 'var(--c4)' : 'var(--c3)';
        return `<div class="bar-chart-row">
          <div class="bar-chart-label">${d.label}</div>
          <div class="bar-chart-track"><div class="bar-chart-fill" style="width:${pct}%;background:${color}"></div></div>
          <div class="bar-chart-val">${d.hours.toFixed(1)}h</div>
        </div>`;
      }).join('');
    }

    // Completion chart (by level)
    const compEl = $('completion-chart');
    if (compEl) {
      const aiProg = lsGet('roadmapAI', {});
      const aiDone = Object.values(aiProg).filter(v=>v.done).length;
      const dsaProg = lsGet('roadmapDSA', {});
      const dsaAllTopicsForAnalytics = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
      const dsaDone = dsaAllTopicsForAnalytics.filter(t => dsaProg['t'+t.id]?.done).length;
      const items = [
        { label:'AI', done: aiDone, total: typeof AI_ROADMAP_DATA !== 'undefined' ? AI_ROADMAP_DATA.length : aiDone, color:'var(--c1)' },
        { label:'DSA (20)', done: dsaDone, total: 20, color:'var(--c2)' },
      ];
      compEl.innerHTML = items.map(item => {
        const pct = item.total ? Math.round((item.done/item.total)*100) : 0;
        return `<div class="bar-chart-row">
          <div class="bar-chart-label" style="width:60px;font-size:9px">${item.label}</div>
          <div class="bar-chart-track"><div class="bar-chart-fill" style="width:${pct}%;background:${item.color}"></div></div>
          <div class="bar-chart-val">${pct}%</div>
        </div>`;
      }).join('');
    }

    // Weak topics
    const weakEl = $('weak-topics');
    if (weakEl) {
      const weak = getWeakTopics();
      if (weak.length === 0) {
        weakEl.innerHTML = '<div style="font-size:12px;color:var(--c5);padding:8px">✅ No weak topics detected! Great work.</div>';
      } else {
        weakEl.innerHTML = weak.map(w =>
          `<div class="weak-topic-item"><div class="weak-topic-dot"></div><div class="weak-topic-name">${w.name}</div><div class="weak-topic-badge">${w.overdueCount} overdue</div></div>`
        ).join('');
      }
    }
  }

  return { render };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 4: CALENDAR VIEW
// ═══════════════════════════════════════════════════════
const Calendar = (function() {
  let viewDate = new Date();

  // ── Local date helper (no UTC drift) ──
  function localISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // ── Save attendance to localStorage + backend ──
  function saveAttendance(att) {
    lsSet('attendance', att);
    if (window.HybridData && HybridData.isLoggedIn()) {
      HybridData.saveUserData({ attendance: att });
    }
  }

  // ── Update attendance stats bar ──
  function renderStats(att) {
    const vals    = Object.values(att);
    const present = vals.filter(v => v === 'present').length;
    const absent  = vals.filter(v => v === 'absent').length;
    const total   = present + absent;
    const pct     = total > 0 ? Math.round((present / total) * 100) : null;
    const pEl = document.getElementById('att-cal-present');
    const aEl = document.getElementById('att-cal-absent');
    const rEl = document.getElementById('att-cal-pct');
    if (pEl) pEl.textContent = present;
    if (aEl) aEl.textContent = absent;
    if (rEl) rEl.textContent = pct !== null ? pct + '%' : '—%';
  }

  // ════════════════════════════════════════════════════
  //  SPACED REPETITION HELPERS
  // ════════════════════════════════════════════════════

  // Generate revision dates from a completion date (+1,+3,+7,+14,+30 days).
  // Completion day itself is NEVER included.
  function generateRevisionDates(completedDate) {
    const INTERVALS = [1, 3, 7, 14, 30];
    const seen = new Set();
    return INTERVALS.map(n => {
      const d = new Date(completedDate + 'T00:00:00');
      d.setDate(d.getDate() + n);
      const y = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const dy = String(d.getDate()).padStart(2, '0');
      return `${y}-${mo}-${dy}`;
    }).filter(ds => {
      // Guard against duplicates (shouldn't happen with fixed intervals)
      if (seen.has(ds) || ds === completedDate) return false;
      seen.add(ds);
      return true;
    });
  }

  // Build a map: date → { completed: [{id,title,source}], revision: [{id,title,source,interval}] }
  // from ALL progress stores + revisions list.
  function buildDateMap() {
    const map = {};

    function ensure(ds) {
      if (!map[ds]) map[ds] = { completed: [], revision: [] };
      return map[ds];
    }

    // ── AI progress ──
    const aiProg = lsGet('roadmapAI', {});
    Object.entries(aiProg).forEach(([key, v]) => {
      if (!v) return;
      const title = v.title || ('AI Day ' + key);
      if (v.completedDate) {
        ensure(v.completedDate).completed.push({ id: 'ai_' + key, title, source: 'ai' });
        // Generate revision dates on-the-fly for AI topics
        generateRevisionDates(v.completedDate).forEach((rd, i) => {
          ensure(rd).revision.push({ id: 'ai_' + key, title, source: 'ai', interval: [1,3,7,14,30][i] });
        });
      }
    });

    // ── DSA progress ──
    const dsaProg = lsGet('roadmapDSA', {});
    Object.entries(dsaProg).forEach(([key, v]) => {
      if (!v) return;
      const title = v.title || ('DSA ' + key);
      if (v.completedDate) {
        ensure(v.completedDate).completed.push({ id: 'dsa_' + key, title, source: 'dsa' });
        generateRevisionDates(v.completedDate).forEach((rd, i) => {
          ensure(rd).revision.push({ id: 'dsa_' + key, title, source: 'dsa', interval: [1,3,7,14,30][i] });
        });
      }
    });

    // ── Revisions list (authoritative — covers scheduled entries) ──
    const revisions = lsGet('revisions', []);
    const revArr = Array.isArray(revisions)
      ? revisions
      : Object.values(revisions).reduce((a, v) => a.concat(Array.isArray(v) ? v : []), []);

    revArr.forEach(r => {
      if (!r || !r.date) return;
      const ds = map[r.date] ? map[r.date] : ensure(r.date);
      // Avoid duplicate revision entries (already added from progress above for AI/DSA)
      const alreadyHas = ds.revision.some(x => x.id === (r.source + '_' + r.topicDay));
      if (!alreadyHas) {
        ds.revision.push({
          id: r.source + '_' + r.topicDay,
          title: r.topicTitle || ('Day ' + r.topicDay),
          source: r.source || 'ai',
          interval: r.interval,
          done: r.done,
        });
      }
    });

    return map;
  }

  // Get data for a specific date — returns { completed, revision, attendance }
  function getDateData(ds) {
    const map = buildDateMap();
    const att = lsGet('attendance', {});
    return {
      completed:  (map[ds] || {}).completed  || [],
      revision:   (map[ds] || {}).revision   || [],
      attendance: att[ds] || null,
    };
  }

  // ════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════
  function render() {
    const year  = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today    = new Date();
    const todayISO = localISO(today);

    const att    = lsGet('attendance', {});
    const dateMap = buildDateMap();

    // Month title
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if ($('cal-month-title')) $('cal-month-title').textContent = `${months[month]} ${year}`;

    const grid = $('cal-grid');
    if (!grid) return;
    let html = '';
    for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';

    for (let day = 1; day <= daysInMonth; day++) {
      const ds      = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const dateObj = new Date(year, month, day);
      const isFuture = dateObj > today && ds !== todayISO;
      const isToday  = ds === todayISO;
      const attStatus   = att[ds];
      const dayData     = dateMap[ds] || { completed: [], revision: [] };
      const hasCompleted = dayData.completed.length > 0;
      const hasRevision  = dayData.revision.length > 0;

      // Priority order for class:
      // att-present / att-absent override study classes (attendance is primary)
      // Within study: both > completed > revision
      let cls = 'cal-day';
      if (isFuture) {
        cls += ' future';
        // Still show revision dots on future dates
        if (hasRevision) cls += ' revision';
      } else if (attStatus === 'present') {
        cls += ' att-present';
        if (hasCompleted) cls += ' completed-dot';
        if (hasRevision)  cls += ' revision-dot';
      } else if (attStatus === 'absent') {
        cls += ' att-absent';
        if (hasRevision)  cls += ' revision-dot';
      } else if (hasCompleted && hasRevision) {
        cls += ' cal-both';
      } else if (hasCompleted) {
        cls += ' completed';
      } else if (hasRevision) {
        cls += ' revision';
      }
      if (isToday) cls += ' today';

      // Build dot indicators
      let dots = '';
      if (hasCompleted) dots += '<span class="cal-dot dot-done"></span>';
      if (hasRevision)  dots += '<span class="cal-dot dot-rev"></span>';

      html += `<div class="${cls}" data-date="${ds}" onclick="APP.calDayClick('${ds}')">
        <span class="cal-day-num">${day}</span>
        ${dots ? `<span class="cal-dots">${dots}</span>` : ''}
      </div>`;
    }
    grid.innerHTML = html;
    renderStats(att);
  }

  function prev() { viewDate.setMonth(viewDate.getMonth() - 1); render(); }
  function next() { viewDate.setMonth(viewDate.getMonth() + 1); render(); }

  // ════════════════════════════════════════════════════
  //  DAY CLICK — shows completed + revision for that date
  // ════════════════════════════════════════════════════
  function dayClick(ds) {
    const detail = $('cal-day-detail');
    const todayISO = localISO(new Date());
    const isToday = ds === todayISO;

    if (detail) {
      const { completed, revision, attendance } = getDateData(ds);

      // ── Header ──
      const dateLabel = new Date(ds + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      let html = `<div style="margin-bottom:10px">
        <strong style="color:var(--c1);font-size:13px">${dateLabel}</strong>`;

      if (isToday) html += ` <span style="font-size:10px;background:var(--c1);color:#000;padding:2px 6px;border-radius:4px;font-weight:700;margin-left:6px">TODAY</span>`;
      html += `</div>`;

      // ── Attendance ──
      if (attendance) {
        const attColor = attendance === 'present' ? 'var(--c5)' : 'var(--c3)';
        const attIcon  = attendance === 'present' ? '✅' : '❌';
        html += `<div style="margin-bottom:10px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
          <span style="color:var(--t2);font-size:11px">Attendance: </span>
          <span style="color:${attColor};font-weight:700;font-size:11px">${attIcon} ${attendance.charAt(0).toUpperCase() + attendance.slice(1)}</span>
        </div>`;
      }

      // ── Today banners ──
      if (isToday && completed.length > 0) {
        html += `<div style="margin-bottom:8px;padding:6px 10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:6px;font-size:11px;color:var(--c5);font-weight:700">
          🎉 Completed Today — great work!
        </div>`;
      }
      if (isToday && revision.length > 0) {
        html += `<div style="margin-bottom:8px;padding:6px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:6px;font-size:11px;color:var(--c4);font-weight:700">
          🔔 Revision Due Today!
        </div>`;
      }

      // ── Completed topics ──
      if (completed.length > 0) {
        html += `<div style="margin-bottom:8px">
          <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--c5);margin-bottom:6px;text-transform:uppercase">✅ Completed (${completed.length})</div>`;
        completed.forEach(t => {
          const badge = t.source === 'dsa'
            ? `<span style="font-size:9px;background:rgba(124,58,237,0.2);color:#a78bfa;padding:1px 5px;border-radius:3px;margin-left:4px">DSA</span>`
            : `<span style="font-size:9px;background:rgba(0,229,200,0.15);color:var(--c1);padding:1px 5px;border-radius:3px;margin-left:4px">AI</span>`;
          html += `<div style="padding:6px 8px;margin-bottom:4px;background:rgba(16,185,129,0.07);border-left:2px solid var(--c5);border-radius:0 4px 4px 0;font-size:12px;color:var(--t1)">
            ${t.title}${badge}
          </div>`;
        });
        html += `</div>`;
      }

      // ── Revision topics ──
      if (revision.length > 0) {
        html += `<div style="margin-bottom:4px">
          <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--c4);margin-bottom:6px;text-transform:uppercase">🔁 Revision Due (${revision.length})</div>`;
        revision.forEach(t => {
          const intervalLabel = t.interval ? `+${t.interval}d` : '';
          const doneStyle = t.done
            ? 'opacity:0.5;text-decoration:line-through;'
            : '';
          const badge = t.source === 'dsa'
            ? `<span style="font-size:9px;background:rgba(124,58,237,0.2);color:#a78bfa;padding:1px 5px;border-radius:3px;margin-left:4px">DSA</span>`
            : `<span style="font-size:9px;background:rgba(0,229,200,0.15);color:var(--c1);padding:1px 5px;border-radius:3px;margin-left:4px">AI</span>`;
          const intervalBadge = intervalLabel
            ? `<span style="font-size:9px;background:rgba(245,158,11,0.15);color:var(--c4);padding:1px 5px;border-radius:3px;margin-left:4px">${intervalLabel}</span>`
            : '';
          html += `<div style="padding:6px 8px;margin-bottom:4px;background:rgba(245,158,11,0.07);border-left:2px solid var(--c4);border-radius:0 4px 4px 0;font-size:12px;color:var(--t1);${doneStyle}">
            ${t.title}${badge}${intervalBadge}
          </div>`;
        });
        html += `</div>`;
      }

      // ── Empty state ──
      if (!completed.length && !revision.length && !attendance) {
        html += `<div style="color:var(--t2);font-size:12px;text-align:center;padding:8px 0">No activities logged for this day.</div>`;
      }

      detail.innerHTML = html;
    }

    // Open the attendance action modal
    AttModal.open(ds);
  }

  return { render, prev, next, dayClick, saveAttendance, renderStats, getDateData, generateRevisionDates };
})();

// ═══════════════════════════════════════════════════════
//  ATTENDANCE MODAL
// ═══════════════════════════════════════════════════════
const AttModal = (function() {
  let _currentDate = null;

  function _toast(msg) {
    const el = document.getElementById('toast');
    if (el) { el.textContent = msg; el.className = 'show info'; setTimeout(() => el.className = '', 2800); }
  }

  function open(ds) {
    _currentDate = ds;
    const att = lsGet('attendance', {});
    const existing = att[ds];

    // Populate modal
    const dateEl    = document.getElementById('att-modal-date');
    const curEl     = document.getElementById('att-modal-current');
    const resetBtn  = document.getElementById('att-modal-reset-btn');
    if (dateEl) dateEl.textContent = ds;
    if (curEl) {
      if (existing) {
        curEl.innerHTML = `Currently: <span class="${existing}">${existing === 'present' ? '✅ Present' : '❌ Absent'}</span>`;
      } else {
        curEl.textContent = 'Not marked yet';
      }
    }
    // Show/hide reset button
    if (resetBtn) resetBtn.style.display = existing ? '' : 'none';

    const overlay = document.getElementById('att-modal-overlay');
    if (overlay) overlay.classList.add('open');
  }

  function close() {
    const overlay = document.getElementById('att-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    _currentDate = null;
  }

  function bgClose(e) {
    if (e.target === document.getElementById('att-modal-overlay')) close();
  }

  function mark(status) {
    if (!_currentDate) return;
    const att = lsGet('attendance', {});
    const existing = att[_currentDate];

    const doMark = () => {
      att[_currentDate] = status;
      Calendar.saveAttendance(att);
      Calendar.render();
      close();
      _toast(status === 'present' ? '✅ Marked Present!' : '❌ Marked Absent');
    };

    if (existing && existing !== status) {
      // Already marked with a different status — ask before overwriting
      if (confirm(`This day is already marked as "${existing}". Change to "${status}"?`)) {
        doMark();
      }
    } else {
      doMark();
    }
  }

  function reset() {
    if (!_currentDate) return;
    const att = lsGet('attendance', {});
    if (!att[_currentDate]) { close(); return; }
    if (confirm(`Remove attendance record for ${_currentDate}?`)) {
      delete att[_currentDate];
      Calendar.saveAttendance(att);
      Calendar.render();
      close();
      _toast('🗑 Attendance removed');
    }
  }

  return { open, close, bgClose, mark, reset };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 5: GOALS SYSTEM
// ═══════════════════════════════════════════════════════
const Goals = (function() {
  function save() {
    const daily  = parseFloat($('goal-daily')?.value) || 2;
    const weekly = parseFloat($('goal-weekly')?.value) || 10;
    const days   = parseInt($('goal-days')?.value) || 20;
    lsSet('userGoals', { daily, weekly, days });
    render();
    // Toast feedback
    // Show a simple toast
    const toastEl = document.getElementById('toast');
    if (toastEl) { toastEl.textContent = '🎯 Goals saved!'; toastEl.className = 'show success'; setTimeout(() => { toastEl.className = ''; }, 2800); }
    XP.showXPToast(5);
  }

  function getActuals() {
    const att = lsGet('attendance', {});
    const pomo = lsGet('pomodoroHistory', []);
    const now = new Date();

    // Today's hours (pomo sessions × 0.5)
    const todayKey = now.toISOString().slice(0,10);
    const todayPomos = pomo.filter(p => p.date === todayKey).length;
    const dailyHours = todayPomos * 0.5;

    // This week's hours
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay());
    const weekPomos = pomo.filter(p => new Date(p.date) >= weekStart).length;
    const weeklyHours = weekPomos * 0.5;

    // This month's study days
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthDays = Object.entries(att)
      .filter(([d, s]) => s === 'present' && new Date(d) >= monthStart)
      .length;

    return { dailyHours, weeklyHours, monthDays };
  }

  function render() {
    const goals = lsGet('userGoals', { daily: 2, weekly: 10, days: 20 });
    if ($('goal-daily'))  $('goal-daily').value  = goals.daily;
    if ($('goal-weekly')) $('goal-weekly').value = goals.weekly;
    if ($('goal-days'))   $('goal-days').value   = goals.days;

    const actual = getActuals();
    const grid = $('goals-grid');
    if (!grid) return;

    const items = [
      { title:'Daily Goal',   goal: goals.daily,   actual: actual.dailyHours,   unit:'hrs',  color:'var(--c1)' },
      { title:'Weekly Goal',  goal: goals.weekly,  actual: actual.weeklyHours,  unit:'hrs',  color:'var(--c2)' },
      { title:'Monthly Days', goal: goals.days,    actual: actual.monthDays,    unit:'days', color:'var(--c4)' },
    ];

    grid.innerHTML = items.map(item => {
      const pct = Math.min(100, item.goal > 0 ? Math.round((item.actual / item.goal) * 100) : 0);
      const status = pct >= 100 ? 'on-track' : pct >= 60 ? 'partial' : 'off-track';
      const strokeDasharray = 2 * Math.PI * 28; // r=28
      const strokeDashoffset = strokeDasharray * (1 - pct / 100);
      const ringColor = pct >= 100 ? 'var(--c5)' : pct >= 60 ? 'var(--c4)' : 'var(--c3)';

      return `<div class="goal-card ${status}">
        <div class="goal-card-title">${item.title}</div>
        <div class="goal-ring-wrap">
          <svg class="goal-ring-svg" width="72" height="72" viewBox="0 0 72 72">
            <circle class="goal-ring-bg" cx="36" cy="36" r="28"/>
            <circle class="goal-ring-fill" cx="36" cy="36" r="28"
              stroke="${ringColor}"
              stroke-dasharray="${strokeDasharray.toFixed(1)}"
              stroke-dashoffset="${strokeDashoffset.toFixed(1)}"/>
          </svg>
          <div class="goal-ring-text" style="color:${ringColor}">${pct}%</div>
        </div>
        <div class="goal-card-val">${item.actual.toFixed(1)} / ${item.goal} ${item.unit}</div>
      </div>`;
    }).join('');
  }

  return { save, render };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 6: ENHANCED POMODORO HISTORY + AUTO-NEXT
// ═══════════════════════════════════════════════════════
const PomoEnhancer = (function() {
  function logSession(type, durationMin) {
    // Save to history for analytics
    const history = lsGet('pomodoroHistory', []);
    history.unshift({ date: todayStr(), time: new Date().toLocaleTimeString(), type, duration: durationMin });
    if (history.length > 200) history.length = 200; // cap
    lsSet('pomodoroHistory', history);
    // XP
    XP.showXPToast(15);
    XP.checkNewBadges(XP.getStats());
  }

  function getBestStudyTime() {
    const history = lsGet('pomodoroHistory', []);
    if (history.length < 5) return null;
    const hourCounts = {};
    history.forEach(h => {
      const hr = h.time ? parseInt(h.time.split(':')[0]) : null;
      if (hr !== null) hourCounts[hr] = (hourCounts[hr] || 0) + 1;
    });
    const best = Object.entries(hourCounts).sort((a,b)=>b[1]-a[1])[0];
    if (!best) return null;
    const hr = parseInt(best[0]);
    const label = hr === 0 ? '12 AM' : hr < 12 ? hr + ' AM' : hr === 12 ? '12 PM' : (hr-12) + ' PM';
    return label;
  }

  function renderBestTime() {
    const bestEl = $('pomo-best-study-time');
    if (!bestEl) return;
    const best = getBestStudyTime();
    if (best) {
      bestEl.innerHTML = `<div class="pomo-best-time"><span class="pomo-best-ico">🌟</span><div class="pomo-best-text">Your best study time is <strong>${best}</strong> based on your session history.</div></div>`;
    }
  }

  function renderHistory() {
    const el = $('pomo-history-list');
    if (!el) return;
    const history = lsGet('pomodoroHistory', []).slice(0, 10);
    if (!history.length) { el.innerHTML = '<div style="font-size:11px;color:var(--t2);text-align:center;padding:12px">No sessions yet. Start your first Pomodoro!</div>'; return; }
    el.innerHTML = history.map(h => {
      const ico = h.type === 'ai' ? '🤖' : h.type === 'dsa' ? '💻' : h.type === 'projects' ? '🚀' : '📚';
      return `<div class="pomo-history-item">
        <span class="pomo-hist-ico">${ico}</span>
        <div class="pomo-hist-info">
          <div class="pomo-hist-title">${h.type?.toUpperCase() || 'Study'} Session</div>
          <div class="pomo-hist-time">${h.date} ${h.time || ''} · ${h.duration || 25} min</div>
        </div>
      </div>`;
    }).join('');
  }

  return { logSession, getBestStudyTime, renderBestTime, renderHistory };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 7: PWA / SERVICE WORKER INSTALLER
// ═══════════════════════════════════════════════════════
const PWA = (function() {
  let deferredPrompt = null;

  function init() {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show banner after 10s if not dismissed
      setTimeout(() => {
        if (deferredPrompt && !lsGet('pwaDismissed', false)) {
          $('pwa-banner')?.classList.add('show');
        }
      }, 10000);
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      // Inline service worker via blob URL
      const swCode = `
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open('roadmapx-v3').then(cache =>
      cache.match(e.request).then(cached => {
        const networkFetch = fetch(e.request).then(resp => {
          if (resp.ok) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});
      `.trim();
      try {
        const blob = new Blob([swCode], {type:'text/javascript'});
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl).catch(()=>{});
      } catch(e) {}
    }
  }

  function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      $('pwa-banner')?.classList.remove('show');
    });
  }

  function dismiss() {
    $('pwa-banner')?.classList.remove('show');
    lsSet('pwaDismissed', true);
  }

  return { init, install, dismiss };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 8: SPACED REPETITION SCHEDULER
// ═══════════════════════════════════════════════════════
const SpacedRep = (function() {
  // Schedule: Day 1, 3, 7, 14, 30 after completion
  const INTERVALS = [1, 3, 7, 14, 30];

  function scheduleRevision(dayNum, title, completedDate) {
    // SpacedRep module uses APP's flat revisions array — delegate to APP.scheduleRevisions
    if (typeof APP !== 'undefined' && APP.scheduleRevisions) {
      // Already handled by APP core on toggleDone
    }
  }

  function getOverdue() {
    const revisions = lsGet('revisions', []);
    const today = new Date().toISOString().slice(0,10);
    const overdue = [];
    if (Array.isArray(revisions)) {
      revisions.forEach(r => {
        if (r && !r.done && r.date <= today) overdue.push(r);
      });
    }
    return overdue.sort((a,b) => a.date.localeCompare(b.date));
  }

  function getRevisionBadgeHTML(dayNum, completedDate) {
    const revisions = lsGet('revisions', []);
    const today = new Date().toISOString().slice(0,10);
    const topicRevs = Array.isArray(revisions)
      ? revisions.filter(r => r && (r.topicDay === dayNum || r.topicDay === String(dayNum)))
      : [];
    if (!topicRevs.length) return '';
    const next = topicRevs.find(r => !r.done);
    if (!next) return '<span class="spaced-rep-badge done">✅ All Reviews Done</span>';
    if (next.date <= today) return `<span class="spaced-rep-badge due">🔁 Review Due</span>`;
    return `<span class="spaced-rep-badge upcoming">📅 Review ${next.date}</span>`;
  }

  function getOverdueCount() {
    return getOverdue().length;
  }

  return { scheduleRevision, getOverdue, getRevisionBadgeHTML, getOverdueCount };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 9: EXTENDED PROJECT SAVE (adds GitHub, Demo fields)
// ═══════════════════════════════════════════════════════
const ProjectEnhancer = (function() {
  function getSaveData() {
    return {
      github: $('proj-github')?.value?.trim() || '',
      demo:   $('proj-demo')?.value?.trim()   || '',
    };
  }

  function populateModal(project) {
    if ($('proj-github')) $('proj-github').value = project.github || '';
    if ($('proj-demo'))   $('proj-demo').value   = project.demo   || '';
  }

  function renderLinks(project) {
    let html = '<div class="proj-links-row">';
    if (project.github) html += `<a href="${project.github}" target="_blank" class="proj-link-btn github">🐙 GitHub</a>`;
    if (project.demo)   html += `<a href="${project.demo}"   target="_blank" class="proj-link-btn demo">🌐 Live Demo</a>`;
    html += '</div>';
    if (project.tags) {
      const tags = project.tags.split(',').map(t => t.trim()).filter(Boolean);
      html += '<div class="proj-tech-tags">' + tags.map(t => `<span class="proj-tech-tag">${t}</span>`).join('') + '</div>';
    }
    return html;
  }

  return { getSaveData, populateModal, renderLinks };
})();

// ═══════════════════════════════════════════════════════
//  WIRE UP: Extend APP's public API
// ═══════════════════════════════════════════════════════

// Store originals
const _origSwitchTab     = APP.switchTab.bind(APP);
const _origInit          = APP.init.bind(APP);
const _origSaveProject   = APP.saveProject.bind(APP);
const _origOpenProjModal = APP.openProjectModal.bind(APP);

// Override saveProject to include new fields
APP.saveProject = function() {
  const extra = ProjectEnhancer.getSaveData();
  // Temporarily set extra fields on elements the original saveProject reads
  const origSave = _origSaveProject;
  // Patch: inject github/demo into the project data after save
  const projects = lsGet('projects', []);
  origSave(); // original save
  // Now update the last-saved project with extra fields
  const updatedProjects = lsGet('projects', []);
  if (updatedProjects.length) {
    const last = updatedProjects[0]; // most recent
    last.github = extra.github;
    last.demo   = extra.demo;
    lsSet('projects', updatedProjects);
  }
  XP.showXPToast(50);
  XP.checkNewBadges(XP.getStats());
};

// Override openProjectModal to populate new fields
APP.openProjectModal = function(idOrSource) {
  _origOpenProjModal(idOrSource);
  // Only look up project data if this is a real project ID (not a source tag)
  const isSourceTag = (idOrSource === 'ai' || idOrSource === 'dsa');
  if (idOrSource && !isSourceTag) {
    const projects = lsGet('projects', []);
    const proj = projects.find(p => p.id === idOrSource);
    if (proj) ProjectEnhancer.populateModal(proj);
  } else {
    if ($('proj-github')) $('proj-github').value = '';
    if ($('proj-demo'))   $('proj-demo').value = '';
  }
};

// New methods exposed on APP
APP.closeAIModal    = AIMentor.close.bind(AIMentor);
APP.setAITab        = AIMentor.setTab.bind(AIMentor);
APP.askAI           = AIMentor.ask.bind(AIMentor);
APP.saveAINote      = AIMentor.saveNote.bind(AIMentor);
APP.openAIMentor    = AIMentor.open.bind(AIMentor);

APP.calPrev              = Calendar.prev.bind(Calendar);
APP.calNext              = Calendar.next.bind(Calendar);
APP.calDayClick          = Calendar.dayClick.bind(Calendar);
APP.calGetDateData       = Calendar.getDateData.bind(Calendar);
APP.calGenRevisionDates  = Calendar.generateRevisionDates.bind(Calendar);
window.AttModal          = AttModal;

APP.saveGoals       = Goals.save.bind(Goals);
APP.installPWA      = PWA.install.bind(PWA);
APP.dismissPWA      = PWA.dismiss.bind(PWA);

// ═══════════════════════════════════════════════════════
//  PATCH: Inject "Ask AI" button into day cards
//  We override the day card render to add the AI button
// ═══════════════════════════════════════════════════════
(function patchDayCards() {
  // After DOM is ready, add mutation observer to inject AI buttons
  function injectAIButtons() {
    document.querySelectorAll('.day-body-inner').forEach(body => {
      if (body.querySelector('.ai-ask-btn')) return; // already injected
      // Get day data from parent card
      const card = body.closest('.day-card, .ai-s-day-card');
      if (!card) return;
      // Create button
      const btn = document.createElement('button');
      btn.className = 'ai-ask-btn';
      btn.innerHTML = '🤖 Ask AI Mentor';
      btn.style.marginTop = '10px';
      btn.onclick = function(e) {
        e.stopPropagation();
        // Try to get day data from card's data attributes
        const dayTitle = card.querySelector('.day-title, .ai-s-day-title')?.textContent || 'This topic';
        const dayGoal  = card.querySelector('.day-meta, .ai-s-day-meta')?.textContent || '';
        const dayExp   = body.querySelector('.body-text, .ai-s-text')?.textContent || '';
        AIMentor.open({ title: dayTitle, goal: dayGoal, explanation: dayExp });
      };
      body.appendChild(btn);
    });
  }

  const observer = new MutationObserver(() => {
    injectAIButtons();
  });
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.getElementById('content') || document.body, { childList: true, subtree: true });
    injectAIButtons();
  });
})();

// ═══════════════════════════════════════════════════════
//  PATCH: Hook into toggleDone to award XP + schedule revision
// ═══════════════════════════════════════════════════════
const _origToggleDone = APP.toggleDone.bind(APP);
APP.toggleDone = function(type, dayNum, cb) {
  _origToggleDone(type, dayNum, cb);
  // Check if just marked done — award XP and ensure revisions are scheduled
  setTimeout(() => {
    const prog = lsGet(type === 'ai' ? 'roadmapAI' : 'roadmapDSA', {});
    if (prog[dayNum]?.done) {
      XP.showXPToast(30);
      XP.checkNewBadges(XP.getStats());
      // Revisions are already scheduled by toggleDone inside APP core
      // Refresh section revision panels if visible
      const secRevEl = document.getElementById(type + '-revision-list');
      if (secRevEl) try { APP.renderSectionRevisions(type); } catch(e) {}
    }
  }, 100);
};

// ═══════════════════════════════════════════════════════
//  INIT ALL NEW MODULES
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // Init PWA
    PWA.init();

    // Revision nav removed — revisions now appear inline in AI/DSA roadmaps

    // Add pomo history placeholder to pomo tab
    const pomoTab = document.getElementById('tab-pomo');
    if (pomoTab && !document.getElementById('pomo-best-study-time')) {
      const wrap = document.createElement('div');
      wrap.id = 'pomo-best-study-time';
      const histWrap = document.createElement('div');
      histWrap.id = 'pomo-history-list';
      histWrap.className = 'pomo-history-list';
      // Find a good insertion point
      const lastSection = pomoTab.querySelector('.section:last-child');
      if (lastSection) {
        const title = document.createElement('div');
        title.className = 'section';
        title.innerHTML = '<div class="section-title">⏱️ Session History</div>';
        pomoTab.appendChild(title);
        pomoTab.appendChild(wrap);
        pomoTab.appendChild(histWrap);
        PomoEnhancer.renderBestTime();
        PomoEnhancer.renderHistory();
      }
    }

    // Auto-check badges on init
    XP.checkNewBadges(XP.getStats());

  }, 500);
});

// ═══════════════════════════════════════════════════════
//  NAVIGATION STACK + BACK BUTTON + BROWSER HISTORY
// ═══════════════════════════════════════════════════════

// Each entry is a full state object:
//   { tab: 'home' }
//   { tab: 'ai', view: 'levels' }
//   { tab: 'ai', view: 'weeks',  level: 'beginner' }
//   { tab: 'ai', view: 'days',   level: 'beginner', week: 3 }
let navStack = [{ tab: 'home' }];
let __navSuppress = false;

function __hideBottomNavIf(tab) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  nav.style.display = (tab === 'ai' || tab === 'dsa') ? 'none' : '';
}

// Push a full state object — collapses identical consecutive states
function __pushNavState(s) {
  if (__navSuppress) return;
  const top = navStack[navStack.length - 1];
  if (top && top.tab === s.tab && top.view === s.view &&
      top.level === s.level && top.week === s.week) return;
  navStack.push(s);
  try {
    history.pushState({ __nav: true, ...s }, '', '#' + s.tab);
  } catch (e) { /* ignore */ }
}
// Expose for use by switchTab overrides in index.html
window.__pushNavState = __pushNavState;

// Restore a full state object without touching the stack
function __applyNavState(s) {
  __navSuppress = true;
  try {
    if (s.tab === 'ai' && s.view === 'weeks' && s.level) {
      APP.switchTab('ai');
      const fn = APP.__origSelectAILevel || APP.selectAILevel;
      if (fn) fn.call(APP, s.level);
    } else if (s.tab === 'ai' && s.view === 'days' && s.level && s.week != null) {
      APP.switchTab('ai');
      const fnL = APP.__origSelectAILevel || APP.selectAILevel;
      if (fnL) fnL.call(APP, s.level);
      const fnW = APP.__origSelectAIWeek || APP.selectAIWeek;
      if (fnW) fnW.call(APP, s.week);
    } else if (s.tab === 'ai' && s.view === 'levels') {
      APP.switchTab('ai');
      if (APP.showAILevels) APP.showAILevels();
    } else if (s.tab === 'ai-rm') {
      // Go to AI Visual Roadmap
      const panels = document.querySelectorAll('.tab-panel');
      panels.forEach(p => { p.classList.remove('active'); });
      const aiRmPanel = document.getElementById('tab-ai-rm');
      if (aiRmPanel) { aiRmPanel.classList.add('active'); aiRmPanel.style.display = 'flex'; }
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = '';
      if (typeof aiRmApplyProgress === 'function') aiRmApplyProgress();
    } else if (s.tab === 'dsa-rm') {
      const panels = document.querySelectorAll('.tab-panel');
      panels.forEach(p => { p.classList.remove('active'); if (p.id === 'tab-dsa-rm') p.style.display = 'none'; });
      const dsaRmPanel = document.getElementById('tab-dsa-rm');
      if (dsaRmPanel) { dsaRmPanel.classList.add('active'); dsaRmPanel.style.display = 'flex'; }
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = '';
      if (typeof dsaRmApplyProgress === 'function') dsaRmApplyProgress();
    } else if (s.tab === 'fe') {
      const panels = document.querySelectorAll('.tab-panel');
      panels.forEach(p => { p.classList.remove('active'); });
      const dsaRm = document.getElementById('tab-dsa-rm');
      if (dsaRm) dsaRm.style.display = 'none';
      const fePanel = document.getElementById('tab-fe');
      if (fePanel) fePanel.classList.add('active');
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = '';
      if (typeof feRmApplyProgress === 'function') feRmApplyProgress();
    } else {
      APP.switchTab(s.tab);
    }
  } finally {
    __navSuppress = false;
  }
  __hideBottomNavIf(s.tab);
}

// ── Single, consolidated APP.switchTab override ──────────────────────────────
APP.switchTab = function (name) {
  if (['calendar', 'goals', 'badges'].includes(name)) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const panel = document.getElementById('tab-' + name);
    if (panel) panel.classList.add('active');
    const nav = document.getElementById('nav-' + name);
    if (nav) { nav.classList.add('active'); nav.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
    if (name === 'analytics') Analytics.render();
    if (name === 'calendar')  Calendar.render();
    if (name === 'goals')     Goals.render();
    if (name === 'badges')    XP.render();
  } else {
    _origSwitchTab(name);
    if (name === 'pomo') {
      setTimeout(() => { PomoEnhancer.renderBestTime(); PomoEnhancer.renderHistory(); }, 100);
    }
    if (name === 'profile') {
      setTimeout(() => { if (typeof APP.renderAttendance === 'function') APP.renderAttendance(); }, 150);
    }
  }

  __hideBottomNavIf(name);
  if (!__navSuppress) {
    const view = (name === 'ai') ? 'levels' : undefined;
    __pushNavState({ tab: name, view });
  }
};

// ── goBack — step back through nav stack ─────────────────────────────────────
APP.goBack = function () {
  if (navStack.length > 1) {
    navStack.pop();
    const prev = navStack[navStack.length - 1];
    __applyNavState(prev);
  } else {
    // Fall through to home if stack is empty or on first entry
    APP.switchTab('home');
  }
};

// ── Wrap selectAILevel — records { tab:'ai', view:'weeks', level } ────────────
if (APP.selectAILevel) {
  const __origLvl = APP.selectAILevel.bind(APP);
  APP.__origSelectAILevel = __origLvl;
  APP.selectAILevel = function (level) {
    __origLvl(level);
    if (!__navSuppress) __pushNavState({ tab: 'ai', view: 'weeks', level: level });
  };
}

// ── Wrap selectAIWeek — records { tab:'ai', view:'days', level, week } ────────
if (APP.selectAIWeek) {
  const __origWk = APP.selectAIWeek.bind(APP);
  APP.__origSelectAIWeek = __origWk;
  APP.selectAIWeek = function (week) {
    const topState = navStack[navStack.length - 1];
    const level = (topState && topState.level) ? topState.level : null;
    __origWk(week);
    if (!__navSuppress) __pushNavState({ tab: 'ai', view: 'days', level: level, week: week });
  };
}

// ── Phone / browser hardware back button ─────────────────────────────────────
window.addEventListener('popstate', function () {
  if (navStack.length > 1) {
    navStack.pop();
    const prev = navStack[navStack.length - 1];
    __applyNavState(prev);
  } else if (navStack.length === 1) {
    __applyNavState(navStack[0]);
  }
});

// ── Seed nav stack once the app has initialised ───────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    // state is private inside APP IIFE — always seed from home
    navStack = [{ tab: 'home' }];
    __hideBottomNavIf('home');
  }, 700);
});

})(); // end IIFE

// ═══════════════════════════════════════════════════════
//  PUBLIC ATTENDANCE WRAPPERS (called from Profile HTML)
// ═══════════════════════════════════════════════════════
APP.markPresent = function () {
  APP.markAttendance('present');
};

APP.markAbsent = function () {
  APP.markAttendance('absent');
};




// ==========================
// 🔥 STREAK + FILES HELPERS
// ==========================
// (No-op: all streak/file logic is handled by APP above.
//  This section is intentionally empty to avoid overriding APP.switchTab.)
// ══════════════════════════════════════════════════════
//  AI-STEPS PAGE FIX
//  Problem: APP.init() calls switchTab('home') which hides
//  the only tab on this page (#tab-ai) since there is no
//  #tab-home element here.
//  Fix: Patch APP.switchTab so 'home' maps to 'ai' on this
//  page, and always force #tab-ai visible after init.
// ══════════════════════════════════════════════════════

// 1. Patch switchTab BEFORE init runs so 'home' → 'ai'
(function patchSwitchTab() {
  if (typeof APP === 'undefined') return;
  var _orig = APP.switchTab;
  APP.switchTab = function(name) {
    // On this page there is no tab-home — redirect to tab-ai
    if (name === 'home') name = 'ai';
    if (typeof _orig === 'function') _orig.call(APP, name);
    // Always ensure tab-ai is visible
    var panel = document.getElementById('tab-ai');
    if (panel) {
      panel.classList.add('active');
      panel.style.display = '';
    }
  };
  // Also fix goBack to go to index.html (there are no other tabs here)
  APP.goBack = function() {
    window.location.href = 'index.html';
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  // 2. Force #tab-ai visible (init may have hidden it)
  var panel = document.getElementById('tab-ai');
  if (panel) {
    panel.classList.add('active');
    panel.style.display = '';
  }

  // 3. Restore previously selected level/week from localStorage
  try {
    var savedLevel = localStorage.getItem('aiCurrentLevel');
    if (savedLevel && typeof APP !== 'undefined' && APP.selectAILevel) {
      APP.selectAILevel(savedLevel);
      var savedWeek = localStorage.getItem('aiCurrentWeek');
      if (savedWeek !== null && APP.selectAIWeek) {
        APP.selectAIWeek(parseInt(savedWeek));
      }
    }
  } catch(e) {}

  // 4. Update streak display in header
  try {
    var streak = parseInt(localStorage.getItem('streak') || '0');
    var el = document.getElementById('hdr-streak');
    if (el) el.textContent = '🔥 ' + streak;
  } catch(e) {}
});