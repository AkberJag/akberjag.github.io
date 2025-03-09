# 🧩 Variables, Data Types, and Strings: The Essentials of Python

## 🔤 Variables & Data Types

In Python, variables are like boxes where we store stuff. The cool part? Python is smart enough to figure out what type of stuff we're storing!

```python
# Numbers (integers and floats)
age = 25                  # integer
height = 1.75            # float

# Strings (text)
name = "Python Learner"  # can use single or double quotes
message = 'Hello World!'

# Booleans (True/False)
is_learning = True
is_expert = False

# None (Python's way of saying "nothing here!")
future_knowledge = None
```

## 🧮 Basic Operations

Python can do math! (And it's actually pretty good at it)

```python
# Arithmetic
sum = 10 + 5        # Addition
difference = 10 - 5  # Subtraction
product = 10 * 5    # Multiplication
quotient = 10 / 5   # Division (returns float)
power = 2 ** 3      # Exponentiation (2 to the power of 3)
remainder = 10 % 3  # Modulus (remainder after division)

# String operations
first_name = "Python"
last_name = "Learner"
full_name = first_name + " " + last_name  # String concatenation
```

## 📝 String Magic: Formatting and Manipulation

Strings in Python are super powerful! Let's look at different ways to format them:

### 1. F-Strings (The Modern Way - Python 3.6+)

```python
name = "Alice"
age = 25
# f-strings: The newest and most readable way
message = f"Hello, {name}! You are {age} years old."
# You can even put expressions inside the brackets
price = 49.95
message = f"The price is ${price:.2f}"  # Format with 2 decimal places

# You can use expressions
result = f"2 + 2 = {2 + 2}"
```

### 2. str.format() Method

```python
# Using position
message = "Hello, {}! You are {} years old.".format(name, age)

# Using numbered indexes
message = "Hello, {0}! You are {1} years old. Bye, {0}!".format(name, age)

# Using named parameters
message = "Hello, {n}! You are {a} years old.".format(n=name, a=age)

# Format specifications
price = 49.95
message = "The price is ${:.2f}".format(price)
```

### 3. % Operator (Old School, but You Might See It)

```python
# Old style formatting (still works but not recommended for new code)
message = "Hello, %s! You are %d years old." % (name, age)
```

### Common String Operations

```python
text = "Python is Amazing!"

# Basic Methods
print(text.upper())          # PYTHON IS AMAZING!
print(text.lower())          # python is amazing!
print(text.title())          # Python Is Amazing!
print(text.replace("is", "was"))  # Python was Amazing!
print(len(text))            # 18 (length of the string)
print(text.split())         # ['Python', 'is', 'Amazing!']

# String slicing
print(text[0:6])            # Python
print(text[-8:])            # Amazing!
print(text[::-1])           # !gnizamA si nohtyP (reverse)

# Useful checks
print(text.startswith("Python"))  # True
print(text.endswith("!"))         # True
print("is" in text)               # True
print(text.isalpha())            # False (contains spaces)
```

## 🎯 Type Conversion

Sometimes we need to convert between different types. Python makes it pretty straightforward:

```python
# Converting between types
age_str = "25"
age_num = int(age_str)    # String to integer
price = 19.99
price_int = int(price)    # Float to integer (drops decimal)
age_float = float(age_num)  # Integer to float
str_num = str(age_num)    # Number to string
```

## 💡 Pro Tips

- Variable names should be descriptive (don't use `x`, `y`, `z` unless you're doing geometry!)
- Python convention is to use snake_case for variable names (words_separated_by_underscores)
- Use f-strings for string formatting - they're more readable and less error-prone
- You can use type hints (but Python doesn't enforce them):

  ```python
  age: int = 25
  name: str = "Python Learner"

  def calculate_average(numbers: List[float]) -> float: # '-> float' shows the return type of the function
    return sum(numbers) / len(numbers)
  ```

## 🤔 Common Gotchas

- Division (`/`) always returns a float in Python 3. Use `//` for integer division
- Strings are immutable (you can't change individual characters)
- String indices start at 0, not 1
- Be careful with floating-point arithmetic (0.1 + 0.2 might not be exactly 0.3)
- When using f-strings, the expressions inside {} must be valid Python expressions
