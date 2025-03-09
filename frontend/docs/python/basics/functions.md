# 🛠️ Functions: Reusable Blocks of Code

Functions are like reusable recipes. Instead of rewriting the same code over and over, you can define a function once and call it whenever you need it. This not only saves time but also makes your code cleaner and easier to debug.

## 1. 📝 Defining a Function

A function is defined using the `def` keyword, followed by the function name, parameters (if any), and a block of code that executes when the function is called.

```python
def greet(name: str) -> None:
    print(f"Hello, {name}!")
```

Here, `greet` is a function that takes one parameter, `name`, and prints a greeting message. The `-> None` part is a type hint indicating that the function doesn’t return any value.

## 2. ⚡ Function Parameters and Return Values

Functions can take inputs (parameters) and return outputs (return values). This makes them flexible and powerful.

```python
def add(a: int, b: int) -> int:
    return a + b

result: int = add(3, 5)
print(result)  # Output: 8
```

In this example, the `add` function takes two integers, `a` and `b`, and returns their sum. The `-> int` type hint indicates that the function returns an integer.

## 3. 🎲 Default Arguments

Default arguments allow you to define a function with optional parameters. If the caller doesn’t provide a value for an optional parameter, the default value is used.

```python
def greet(name: str, greeting: str = "Hello") -> None:
    print(f"{greeting}, {name}!")

greet("Alice")  # Output: Hello, Alice!
greet("Bob", "Hi")  # Output: Hi, Bob!
```

Here, the `greeting` parameter has a default value of `"Hello"`. If you call `greet("Alice")`, it uses the default greeting. If you call `greet("Bob", "Hi")`, it overrides the default with `"Hi"`.

## 4. 🔄 Variable-Length Arguments (\*args and \*\*kwargs)

Sometimes, you may not know how many arguments a function will receive. Python allows you to handle this using `*args` (for positional arguments) and `**kwargs` (for keyword arguments).

- `*args` collects extra positional arguments as a tuple.
- `**kwargs` collects extra keyword arguments as a dictionary.

```python
def print_args(*args: int) -> None:
    for arg in args:
        print(arg)

print_args(1, 2, 3)  # Output: 1 2 3

def print_kwargs(**kwargs: str) -> None:
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_kwargs(name="Alice", age="30")  # Output: name: Alice age: 30
```

- `*args` is useful when you want to pass a variable number of arguments, like a list of items.
- `**kwargs` is useful when you want to pass a variable number of key-value pairs, like configuration options.

## 5. ⚡ Lambda Functions (Anonymous Functions)

Lambda functions are small, anonymous functions defined with the `lambda` keyword. They are useful for short, one-time operations.

```python
square = lambda x: x ** 2
print(square(5))  # Output: 25
```

Lambda functions are often used with functions like `map()` or `filter()` for quick transformations or filtering.

```python
numbers = [1, 2, 3, 4]
squared_numbers = list(map(lambda x: x ** 2, numbers))
print(squared_numbers)  # Output: [1, 4, 9, 16]
```

## 6. 🎯 Positional-Only and Keyword-Only Parameters

Python allows you to enforce how arguments are passed to a function using `/` and `*` in the parameter list.

#### **`/` (Forward Slash): Positional-Only Parameters**

Parameters to the left of `/` must be passed as **positional arguments**.

```python
def greet(name, /, greeting="Hello"):
    print(f"{greeting}, {name}!")
```

- **`name`**: Must be positional.
- **`greeting`**: Can be positional or keyword.

```python
greet("Alice")  # Valid: "Hello, Alice!"
greet("Bob", greeting="Hi")  # Valid: "Hi, Bob!"
greet(name="Alice")  # Invalid: TypeError (name cannot be a keyword argument)
```

#### **`*` (Asterisk): Keyword-Only Parameters**

Parameters to the right of `*` must be passed as **keyword arguments**.

```python
def calculate(*, x, y, operation="add"):
    if operation == "add":
        return x + y
    elif operation == "subtract":
        return x - y
    else:
        raise ValueError("Invalid operation")
```

- **`x` and `y`**: Must be keyword arguments.
- **`operation`**: Optional keyword argument.

```python
calculate(x=5, y=3)  # Valid: 8
calculate(x=5, y=3, operation="subtract")  # Valid: 2
calculate(5, 3)  # Invalid: TypeError (x and y must be keyword arguments)
```

#### **Combining `/` and `*`**

You can use both `/` and `*` in a single function to define positional-only, regular, and keyword-only parameters.

```python
def example(a, b, /, c, d=10, *, e, f=20):
    print(f"a: {a}, b: {b}, c: {c}, d: {d}, e: {e}, f: {f}")
```

- **`a` and `b`**: Positional-only.
- **`c` and `d`**: Can be positional or keyword.
- **`e` and `f`**: Keyword-only.

```python
example(1, 2, 3, e=5)  # Valid: a:1, b:2, c:3, d:10, e:5, f:20
example(1, 2, c=3, e=5)  # Valid: a:1, b:2, c:3, d:10, e:5, f:20
example(a=1, b=2, c=3, e=5)  # Invalid: a and b must be positional
```

::: details Extras

### **Why Use Positional-Only Parameters?**

#### **a. Enforcing API Stability**

- If you’re designing a library or API, you might want to ensure that certain parameters are always passed positionally. This prevents users from relying on parameter names, which might change in future versions of your code.

Example:

```python
def calculate(a, b, /, operation="add"):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
```

Here:

- `a` and `b` must be positional, so their names can be changed without affecting existing code.

#### **b. Improving Performance**

- Positional-only arguments can be slightly faster to process than keyword arguments because Python doesn’t need to look up the parameter name in the function’s namespace.

#### **c. Avoiding Confusion**

- For functions with many parameters, forcing some arguments to be positional can make the function call more predictable and less error-prone.
- Example:
  ```python
  def connect(database, /, user, password):
      print(f"Connecting to {database} as {user}")
  ```
  Here, `database` must be passed positionally, ensuring it’s always the first argument.

### **When to Use `/`**

- Use `/` when you want to enforce that certain parameters **must be positional**.
- This is particularly useful for parameters that are unlikely to change or are part of the function’s core behavior.

### **Keyword-Only Parameters (`*`)**

#### **a. Improving Readability**

- For functions with many parameters, using keyword arguments makes the function call more readable and self-documenting.
- Example:

  ```python
  def create_user(*, username, email, password):
      print(f"Creating user {username} with email {email}")
  ```

  Here, all arguments must be passed as keywords, making the function call clear:

  ```python
  create_user(username="Alice", email="alice@example.com", password="1234")
  ```

#### **b. Preventing Errors**

- Keyword-only arguments reduce the risk of passing arguments in the wrong order, especially when the function has many parameters.
- Example:
  ```python
  def plot(x, y, *, title="Graph", xlabel="X", ylabel="Y"):
      print(f"Plotting {x} vs {y} with title '{title}'")
  ```
  Here, `title`, `xlabel`, and `ylabel` must be passed as keyword arguments, avoiding confusion about their order.

#### **c. Adding Flexibility**

- Keyword-only arguments are often used for optional parameters with default values. This allows users to override defaults without worrying about the order of arguments.
- Example:
  ```python
  def send_email(to, *, subject="No Subject", body=""):
      print(f"Sending email to {to} with subject '{subject}'")
  ```
  Here, `subject` and `body` are optional and must be passed as keyword arguments.

:::

## 💡 **Pro Tips**

1. **Use Descriptive Names**: Name your functions and modules clearly to make your code self-explanatory. For example, `calculate_area()` is better than `calc()`.
2. **Keep Functions Small**: Each function should do one thing and do it well. This makes your code easier to test and debug.

3. **Use Type Hints**: Type hints (e.g., `def add(a: int, b: int) -> int`) make your code more readable and help catch errors early.
