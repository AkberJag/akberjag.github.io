# 🧪 Test-Driven Development (TDD) in Python with Pytest

Let’s dive into **Test-Driven Development (TDD)**—a game-changing approach to writing reliable, maintainable code. Whether you're building a small script or a full-blown application, TDD can help you catch bugs early, write cleaner code, and sleep better at night. 😴

## 🤔 What is TDD?

TDD is a development approach where you write tests **before** writing the actual code. It is like playing a video game: you set a goal (write a test), then figure out how to beat the level (write code), and keep trying until you win (pass the test). It’s a way to code smarter, not harder.
Here's the TDD cycle in a nutshell:

1. <span style="color: red">**Red**</span>: Write a failing test.
2. <span style="color: green">**Green**</span>: Write the minimum code to pass the test.
3. <span style="color: blue">**Refactor**</span>: Improve the code while keeping the tests passing.

This cycle ensures your code is well-tested and designed from the ground up. Plus, it’s a great way to avoid spaghetti code and catch bugs early. 🍝

## 🚀 Let’s See TDD in Action!

Let’s build a simple `Superhero` class using TDD. We’ll start by writing a failing test, then write the code to make it pass, and finally refactor to improve the design.

### 1. **Red Phase: Writing a Failing Test**

First, we write a test for functionality that doesn’t exist yet. This is the **Red Phase**—our test will fail, and that’s okay!

```python
# test_superhero.py

def test_hero_has_power():
    hero = Superhero("Spider-Man")
    hero.add_power("web-slinging")
    assert hero.has_power("web-slinging") == True
```

Running this test will fail because we haven’t created the `Superhero` class yet. That’s exactly what we want in the Red Phase!

### 2. **Green Phase: Making the Test Pass**

Now, we write the minimum code needed to make the test pass. This is the **Green Phase**.

```python
# superhero.py

class Superhero:
    def __init__(self, name):
        self.name = name
        self.powers = []

    def add_power(self, power):
        self.powers.append(power)

    def has_power(self, power):
        return power in self.powers
```

Our test should now pass! 🎉 We’ve implemented just enough code to satisfy the test.

### 3. **Refactor Phase: Improving the Code**

With the test passing, we can safely refactor our code to improve its design. This is the **Refactor Phase**.

```python
# superhero.py

class Superhero:
    def __init__(self, name):
        if not isinstance(name, str):
            raise ValueError("Hero name must be a string")
        self.name = name
        self.powers = set()  # Using a set for unique powers

    def add_power(self, power):
        if not isinstance(power, str):
            raise ValueError("Power must be a string")
        self.powers.add(power.lower())  # Normalize powers to lowercase

    def has_power(self, power):
        if not isinstance(power, str):
            raise ValueError("Power must be a string")
        return power.lower() in self.powers
```

Here’s what we improved:

- Added input validation for `name` and `power`.
- Used a `set` to store powers, ensuring no duplicates.
- Normalized powers to lowercase for case-insensitive comparisons.

### 4. **Adding More Tests**

Now that we’ve refactored, let’s add more tests to verify our improvements.

```python
# test_superhero.py

def test_power_case_insensitive():
    hero = Superhero("Wonder Woman")
    hero.add_power("Flying")
    assert hero.has_power("flying") == True
    assert hero.has_power("FLYING") == True

def test_duplicate_powers_handled():
    hero = Superhero("Superman")
    hero.add_power("flying")
    hero.add_power("Flying")
    hero.add_power("FLYING")
    assert len(hero.powers) == 1

def test_invalid_hero_name():
    with pytest.raises(ValueError):
        Superhero(123)
```

These tests ensure our refactoring works as expected and handles edge cases like:

- Case-insensitive power checks.
- Duplicate powers.
- Invalid input types.

## 🎉 Why TDD Rocks

By following the TDD cycle, you’ll:

- **Catch bugs early**: Tests act as a safety net, catching issues before they become problems.
- **Write cleaner code**: TDD encourages modular, well-designed code.
- **Gain confidence**: With a suite of passing tests, you can refactor fearlessly.
- **Document behavior**: Tests serve as living documentation for your code.
