# 📦 Python Code Organization: Modules and Packages

## 1. 📝 Modules

A **module** is simply a Python file (with a `.py` extension) that contains code. It can include functions, classes, variables, and even runnable code. Modules allow you to break your code into reusable and organized components.

### Example: A Simple Module

::: code-group

```python [math_operations.py]
def add(a: int, b: int) -> int:
    return a + b

def subtract(a: int, b: int) -> int:
    return a - b

PI: float = 3.14159
```

:::

You can import and use this module in other files:

::: code-group

```python [main.py]
import math_operations

result: int = math_operations.add(5, 3)
print(result)  # Output: 8
```

:::

## 2. 🔄 **Different Ways to Import**

Python provides several ways to import modules, depending on your needs:

```python
# Import the entire module
import math_operations

# Import specific items from a module
from math_operations import add, subtract

# Import with an alias (useful for long module names)
import math_operations as math_ops

# Import all items from a module (not recommended for production code)
from math_operations import *
```

## 3. 📂 Packages: Organizing Related Modules

A **package** is a directory that contains multiple modules. To make a directory a package, it must include a special file called `__init__.py`. This file can be empty, or it can initialize package-level variables or define what gets exposed when the package is imported.

### Example: Package Structure

```
my_project/
│
├── calculations/
│   ├── __init__.py
│   ├── basic_math.py
│   └── advanced_math.py
│
└── utils/
    ├── __init__.py
    ├── file_handling.py
    └── formatting.py
```

You can import from packages using dot notation:

```python
from calculations.basic_math import add
from utils.formatting import format_number
```

## 4. ⚙️ The `__init__.py` File

The `__init__.py` file is used to initialize a package. It can also define what gets exposed when the package is imported. For example:

```python
# calculations/__init__.py
from .basic_math import add, subtract
from .advanced_math import multiply, divide

__all__ = ['add', 'subtract', 'multiply', 'divide']
```

Now, users can import directly from the package:

```python
from calculations import add, multiply
```

## 5. 🔗 Relative Imports

Within a package, you can use **relative imports** to reference other modules in the same package. This is especially useful for large projects with nested packages.

```python
# calculations/advanced_math.py
from .basic_math import add  # Import from the same directory
from ..utils import format_number  # Import from a parent directory
```

## 6. 🔍 Module Search Path

When you import a module, Python searches for it in the following order:

1. The current directory
2. Directories listed in the `PYTHONPATH` environment variable
3. Standard library directories
4. The `site-packages` directory (for installed third-party packages)

You can view the search path using:

```python
import sys
print(sys.path)
```

## 7. 📚 Best Practices for Code Organization

### Project Structure 🏗️

A well-organized project structure makes your code easier to navigate and maintain. Here's an example:

```
project_name/
├── README.md
├── requirements.txt
├── setup.py
├── project_name/
│   ├── __init__.py
│   ├── core.py
│   ├── helpers.py
│   └── utils.py
└── tests/
    ├── __init__.py
    ├── test_core.py
    └── test_helpers.py
```

### Module-Level Dunder Names ✨

Use `__all__` to specify which symbols should be exported when using `from module import *`:

```python
# helpers.py
__all__ = ['format_data', 'validate_input']

def format_data(data: dict) -> str:
    pass

def validate_input(text: str) -> bool:
    pass

def _internal_helper() -> None:  # Private function (not exported)
    pass
```

## 8. 🌐 Namespace Packages

- Namespace packages allow you to split a single package across multiple directories. Unlike regular packages, they don't require an `__init__.py` file.
- Namespace packages were introduced in Python 3.3 as part of PEP 420.

```
project/
    auth/
        login.py
        signup.py

other_location/
    auth/
        password.py
        security.py
```

Both directories contribute to the same `auth` namespace package.

## 9. 🎯 Why Check `if __name__ == "__main__"`?

In Python, when you import a module, **all code in that module gets executed immediately**. This is a crucial detail that many beginners don't realize. Let's see why this matters and how `if __name__ == "__main__"` helps us control this behavior.

### 🔄 What Happens During Import

When you import a module, Python:

1. Finds the module file
2. Creates a new namespace for it
3. **Executes all code in the module from top to bottom**

This means any executable code (not just function definitions) will run during import!

### ⚠️ The Problem

Let's look at a problematic example:

```python
# calculator.py
def add(a: int, b: int) -> int:
    return a + b

def subtract(a: int, b: int) -> int:
    return a - b

# This code runs immediately when the module is imported!
print("Running calculator operations...")
result = add(5, 3)
print(f"Test calculation: {result}")
```

Now if someone tries to import this module:

```python
# main.py
import calculator  # This will print the test output even though we just wanted the functions!

# Output:
# Running calculator operations...
# Test calculation: 8
```

### ✨ The Solution: `if __name__ == "__main__"`

To prevent code from running during import, we wrap it in an `if __name__ == "__main__"` check:

```python
# calculator.py
def add(a: int, b: int) -> int:
    return a + b

def subtract(a: int, b: int) -> int:
    return a - b

# This code only runs if the file is executed directly
if __name__ == "__main__":
    print("Running calculator operations...")
    result = add(5, 3)
    print(f"Test calculation: {result}")
```

Now:

- When run as a script (`python calculator.py`): The test code executes
- When imported (`import calculator`): Only the functions are defined, no test code runs

### 🎯 Common Use Cases

This pattern is particularly useful for:

1. Including test code in your modules
2. Creating modules that can work both as libraries and command-line tools
3. Running setup or initialization code only when the file is the main program
4. Adding example usage that doesn't interfere with imports

## 💡 Pro Tips

1. 🎯 **Keep Modules Focused**: Each module should have a single, well-defined purpose. If a module grows too large, consider splitting it into smaller modules.

2. 🔍 **Use Absolute Imports**: Prefer absolute imports over relative imports for clarity and to avoid confusion:

   ```python
   # Better
   from myproject.utils import helper
   # Rather than
   from ..utils import helper
   ```

3. 📝 **Follow Python's Import Style**:

   - Standard library imports first
   - Third-party imports second
   - Local application imports third

   ```python
   import os
   import sys

   import requests
   import pandas

   from myproject.utils import helper
   from myproject.core import main
   ```

4. ⚙️ **Initialize Packages Properly**: Use `__init__.py` to expose a clean API and hide implementation details.

5. 🚀 **Use `if __name__ == "__main__"` for Script-Like Behavior**: This ensures that certain code only runs when the file is executed directly, not when it's imported.
