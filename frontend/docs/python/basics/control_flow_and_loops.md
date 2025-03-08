# 🚦 Control Flow and Loops: Directing Your Python Program

> [!NOTE]
> Even though Python doesn't enforce type hints, we're going to start using them from now on. Type hints make your code more readable and help you catch potential bugs early. They also make it easier for others (and your future self) to understand what types of data your functions and variables are working with.

Let's dive into **Control Flow and Loops** with type hints in mind!

## 🚦 **Conditional Statements: Making Decisions**

### 1. **The `if` Statement**

```python
age: int = 18

if age >= 18:
    print("You are an adult!")
```

### 2. **The `elif` Statement**

```python
age: int = 15

if age >= 18:
    print("You are an adult!")
elif age >= 13:
    print("You are a teenager!")
else:
    print("You are a child!")
```

### 3. **The `else` Statement**

```python
age: int = 10

if age >= 18:
    print("You are an adult!")
elif age >= 13:
    print("You are a teenager!")
else:
    print("You are a child!")
```

### 4. **Nested Conditionals**

```python
age: int = 20
has_license: bool = True

if age >= 18:
    if has_license:
        print("You can drive!")
    else:
        print("You need a license to drive.")
else:
    print("You are too young to drive.")
```

## 🔄 **Loops: Repeating Actions**

### 1. **The `for` Loop**

```python
# Iterating over a list
fruits: list[str] = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

# Iterating over a string
for letter in "Python":
    print(letter)

# Using range() to generate a sequence of numbers
for i in range(5):  # range(5) generates numbers from 0 to 4
    print(i)
```

### 2. **The `while` Loop**

```python
count: int = 0

while count < 5:
    print(f"Count is {count}")
    count += 1  # Don't forget to increment the counter!
```

### 3. **Loop Control: `break` and `continue`**

```python
# Using break
for i in range(10):
    if i == 5:
        break  # Exit the loop when i is 5
    print(i)

# Using continue
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)
```

### 4. **The `else` Clause in Loops**

Python allows you to add an `else` clause to both `for` and `while` loops. The `else` block executes **only if the loop completes normally** (i.e., without hitting a `break` statement).

#### **`else` in `for` Loops**

```python
numbers: list[int] = [1, 3, 5, 7, 9]

for number in numbers:
    if number % 2 == 0:
        print(f"{number} is even")
        break
else:
    print("No even numbers found!")
```

#### **`else` in `while` Loops**

```python
count: int = 0

while count < 5:
    print(f"Count is {count}")
    count += 1
else:
    print("Loop completed without a break!")
```

## 🎯 **Combining Control Flow and Loops**

Here’s an example of combining conditionals and loops with type hints:

```python
# Example: Finding even numbers in a list
numbers: list[int] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number % 2 == 0:
        print(f"{number} is even")
    else:
        print(f"{number} is odd")
```

## 💡 **Pro Tips**

- Use meaningful variable names in your loops (e.g., `for fruit in fruits` instead of `for x in y`).
- Be careful with infinite loops when using `while`. Always ensure the loop has a way to terminate.
- Use `break` and `continue` sparingly, as they can make your code harder to read if overused.
- The `else` clause in loops is a powerful tool for handling cases where a loop completes without hitting a `break`.

## 🤔 **Common Gotchas**

- Forgetting to increment the counter in a `while` loop can lead to an infinite loop.
- Using `=` instead of `==` in a conditional statement will cause a syntax error.
- Be cautious with floating-point numbers in conditions, as they can lead to unexpected behavior due to precision issues.
- The `else` clause in loops can be confusing at first, but it’s incredibly useful once you understand it.
