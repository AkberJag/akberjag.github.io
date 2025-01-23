# 🧩 Fixtures: The Test Helpers

In testing, a fixture provides a defined, reliable and consistent context for the tests. This could include environment (for example a database configured with known parameters) or content (such as a dataset).

The services, state, or other operating environments set up by fixtures are accessed by test functions through arguments.

_In simple words it is like preparing the tools and materials you need before starting a task. It creates a reliable setup, such as a database with specific data or a controlled environment._

_Tests use this setup by requesting it, like asking for pre-arranged tools to do their job._

Here’s an example:

```python
import pytest

@pytest.fixture
def sample_data():
    return {
        'name': 'Peter Parker',
        'age': 19,
        'email': 'peterp@example.com'
    }

def test_user_name(sample_data):
    assert sample_data['name'] == 'Peter Parker'
```

::: details Output
====================== test session starts ======================

...

collected 1 item

test_sample.py::test_user_name PASSED [100%]

======================= 1 passed in 0.01s =======================
:::

## 🔍 Fixture Scopes

Pytest fixtures have different scopes that control how often they're recreated. The scope can be:

- `function`: Created for each test function (default)
- `class`: Created once per test class
- `module`: Created once per test module (file)
- `package`: Created once per test package
- `session`: Created once per test run

Here's a quick example:

```python
# Function Scope (Default)
@pytest.fixture(scope="function")
def unique_number():
    return random.randint(1, 100)  # New number for each test

# Class Scope
@pytest.fixture(scope="class")
def browser():
    driver = start_browser()
    yield driver
    driver.quit()  # Closes once per test class

# Module Scope
@pytest.fixture(scope="module")
def database():
    db = connect_db()
    yield db
    db.close()  # Closes once per test module

# Session Scope
@pytest.fixture(scope="session")
def api_token():
    return generate_token()  # Created once for all tests

# Package Scope
@pytest.fixture(scope="package")
def config():
    return load_config()  # Once per package
```

### Flags

we can use the `autouse` flag to automatically apply a fixture to all tests

::: details Example 1
Imagine you're testing a function that interacts with a file, and you want to ensure the file is always created and cleaned up automatically for every test.

::: code-group

```python [conftest.py]
import pytest
import sqlite3

# Fixture that sets up and cleans up the file automatically
@pytest.fixture(autouse=True)
def hero_file_setup_and_teardown():
    # Setup: Create a file path
    hero_file = "hero_file.txt"

    # Yield to allow the test to run
    yield hero_file

    # Teardown: Remove the file after the test
    if os.path.exists(hero_file):
        os.remove(hero_file)
```

```python [test_hero.py]
import pytest
import os

# Tests
def test_save_hero_to_file():
    """Test saving superhero information to a file."""
    hero_file = "hero_file.txt"
    save_hero_to_file(hero_file, "Superman: Flight, Strength")
    assert os.path.exists(hero_file)

def test_get_hero_from_file():
    """Test reading superhero information from a file."""
    hero_file = "hero_file.txt"
    save_hero_to_file(hero_file, "Wonder Woman: Lasso of Truth, Strength")
    hero_info = get_hero_from_file(hero_file)
    assert hero_info == "Wonder Woman: Lasso of Truth, Strength"
```

```python [hero.py]
# Function to test
def save_hero_to_file(file_path, hero_info):
    """Saves superhero information to a file."""
    with open(file_path, 'w') as f:
        f.write(hero_info)

def get_hero_from_file(file_path):
    """Reads superhero information from a file."""
    with open(file_path, 'r') as f:
        return f.read()
```

:::

::: details Example 2
Imagine you are testing a function that interacts with an SQLite database.

::: code-group

```python [conftest.py]
import pytest
import sqlite3

# Fixture that sets up and tears down the database
@pytest.fixture(autouse=True)
def db_setup_and_teardown():
    # Setup: Create an in-memory SQLite database and table
    connection = sqlite3.connect(":memory:")  # In-memory database
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE super_heroes (name TEXT, power TEXT)")

    yield connection  # Provide the database connection to tests and the testing happens here

    # Teardown: Close the database connection after test
    connection.close()

```

```python [test_hero.py]
# Tests
def test_add_hero():
    connection = sqlite3.connect(":memory:")  # New test-specific connection
    add_hero(connection, "Superman", "Flight")
    heroes = fetch_heroes(connection)
    assert heroes == [("Superman", "Flight")]
```

```python [hero.py]
# Function to test: Add and fetch super heroes from the database
def add_hero(db_connection, name, power):
    cursor = db_connection.cursor()
    cursor.execute("INSERT INTO super_heroes (name, power) VALUES (?, ?)", (name, power))
    db_connection.commit()

def fetch_heroes(db_connection):
    cursor = db_connection.cursor()
    cursor.execute("SELECT name, power FROM super_heroes")
    return cursor.fetchall()
```

:::

## 📁 conftest.py

The `conftest.py` file is a central place for shared fixtures. Fixtures defined here are automatically available to all test files in the same directory and its subdirectories. No imports needed!

Example conftest.py:

```python
# conftest.py
@pytest.fixture(scope="session")
def app_config():
    return {
        "api_key": "test_key",
        "environment": "testing"
    }

# Any test file can use app_config directly
```

### 📑 Multiple conftest.py Files

You can have multiple conftest.py files in different directories. pytest follows a directory hierarchy to discover and load them. This lets you organize fixtures by module or feature.
Here's how it works:

```
superhero_api/
├── conftest.py          # Global fixtures
├── models/
│   ├── conftest.py      # model specific fixtures
│   └── test_api.py
└── database/
    ├── conftest.py      # Database-specific fixtures
    └── test_db.py
```

in a nutshell, specific test files should contain fixtures that are only relevant to their test cases and store the fixtures which are used across multiple test files.
