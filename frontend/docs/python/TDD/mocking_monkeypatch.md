# 🎭 Mocking & Monkeypatching in Pytest

## 🔍 What is Mocking?

Mocking creates fake objects that pretend to be real ones during testing. It's like having a stunt double for our code - looks the same, but safer to work with!

## 💡 Why Use Mocking?

- **Faster Tests:** No waiting for real API calls
- **Reliable Tests:** No dependency on external services
- **Cost-Effective:** No API usage charges during testing
- **Predictable:** We control the test data
- **Isolated:** Tests one piece of code at a time

## 🐒 What is Monkeypatch?

Pytest's built-in monkeypatch fixture is all we need for mocking! it is the act of dynamically changing a piece of code at runtime. Essentially, it allows we to override the default behavior of a module, object, method, or function without changing its source code.

::: code-group

```python [test_superhero.py]
from superhero_app.api import get_hero

def test_get_hero_api(monkeypatch):
    """
    GIVEN a monkeypatched get_hero_from_api function
    WHEN we call get_hero_from_api
    THEN it should return our mock superhero data
    """
    def mock_get_hero():
        return {
            "name": "Spider-Man",
            "powers": ["web-slinging", "spider-sense"]
        }

    monkeypatch.setattr(get_hero, "get_hero_from_api", mock_get_hero)

    result = get_hero.get_hero_from_api()
    assert result["name"] == "Spider-Man"
    assert "web-slinging" in result["powers"]
```

```python [get_hero.py]
# superhero_app/api/get_hero.py
import requests

def get_hero_from_api():
    """
    Fetches superhero data from the very expensive 'expensive_api_example.com' API.

    Returns:
        dict: A dictionary containing the superhero's name and powers.
    """
    url = "https://expensive_api_example.com/api/hero"

    response = requests.get(url)
    hero_data = response.json()
    return hero_data
```

:::

We don't need to import _monkeypatch_. It's a built-in pytest fixture, so we just need to add it as a parameter to our test function and pytest will automatically inject it.

During a test run, `mock_get_hero` gets called rather than the real `get_hero_from_api` function. This not only decreases the amount of time it will take for the test to run, but it also makes the test more predictable since it is not affected by network connectivity issues, outages in the expensive superhero API (expensive_api_example.com), or rate limiting issues.

## 🛠️ Common Monkeypatch Methods

```python
# Replace attributes
monkeypatch.setattr(obj, name, value)

# Set dictionary entries
monkeypatch.setitem(dict, key, value)

# Set environment variables
monkeypatch.setenv(name, value)

# Delete environment variables
monkeypatch.delenv(name, raising=True)
```

## ⚠️ Best Practices

- Mock at the right level: Mock the smallest unit possible
- Use meaningful test data: Our mock data should represent realistic scenarios
- Clean up after yourself: Pytest's monkeypatch automatically restores original values after each test
- Document our mocks: Good docstrings explain what's being mocked and why

## 🎯 When to Use Monkeypatch vs Other Mocking Tools

- Use monkeypatch for simple attribute/function replacement
- Consider `unittest.mock` for more complex scenarios (like tracking call counts)

## 📚 References

- <a href="https://docs.pytest.org/en/stable/monkeypatch.html" target="_blank">Pytest Monkeypatch Documentation</a>
- <a href="https://docs.pytest.org/en/stable/how-to/monkeypatch.html" target="_blank">Pytest Monkeypatch How-To Guide</a>

<style>
.references-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.references-footer h3 {
  margin-bottom: 1rem;
}

.references-footer ul {
  list-style: none;
  padding: 0;
}

.references-footer li {
  margin-bottom: 0.5rem;
}

.references-footer a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.references-footer a:hover {
  text-decoration: underline;
}
</style>
