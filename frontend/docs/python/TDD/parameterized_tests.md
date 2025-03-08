# 🧪 Parameterized Testing in Pytest

## 🔍 What is Parameterized Testing?

Parameterized testing lets you run the same test with different inputs and expected outputs. It's like having a template for your tests that you can fill with different data!

## 1. Basic Parameterized Tests

Instead of writing multiple similar tests, use `@pytest.mark.parametrize` to run the same test with different values.

```python
@pytest.mark.parametrize("hero_name, expected_power", [
    ("Superman", "flight"),
    ("Spider-Man", "web-slinging"),
    ("Flash", "super-speed")
])
def test_hero_default_power():
    """
    GIVEN a superhero name
    WHEN we create the hero
    THEN they should have their signature power
    """
    # GIVEN & WHEN: Create a hero
    hero = Superhero(hero_name)

    # THEN: Verify they have their signature power
    assert hero.has_power(expected_power)
```

::: details Output

====================== test session starts ======================

...

collected 3 items

test_superhero.py::test_hero_default_power[Superman-flight] PASSED [ 33%]
test_superhero.py::test_hero_default_power[Spider-Man-web-slinging] PASSED [ 66%]
test_superhero.py::test_hero_default_power[Flash-super-speed] PASSED [100%]

====================== 3 passed in 0.01s ======================
:::

## 2. Testing Multiple Parameters

You can test combinations of parameters to cover more scenarios:

```python
@pytest.mark.parametrize("hero_name, power, is_active", [
    ("Batman", "martial-arts", True),
    ("Retired-Man", "napping", False),
    ("Wonder Woman", "super-strength", True)
])
def test_hero_status(hero_name, power, is_active):
    """
    GIVEN a hero with specific powers and status
    WHEN we check their details
    THEN all properties should match expected values
    """
    # GIVEN & WHEN: Create a hero with specific attributes
    hero = Superhero(name=hero_name, active=is_active)
    hero.add_power(power)

    # THEN: Verify all properties
    assert hero.name == hero_name
    assert hero.has_power(power)
    assert hero.is_active == is_active
```

here the @pytest.mark.parametrize decorator defines three test cases

- ("Batman", "martial-arts", True)
- ("Retired-Man", "napping", False)
- ("Wonder Woman", "super-strength", True)

Each test case will be executed independently.

## 3. Testing Edge Cases

Use parameterized tests to easily check edge cases and error conditions:

```python
@pytest.mark.parametrize("invalid_power, expected_error", [
    ("", ValueError),
    (None, TypeError),
    ("   ", ValueError)
])
def test_invalid_power_addition():
    """
    GIVEN a hero and invalid power
    WHEN we try to add the invalid power
    THEN it should raise the expected error
    """
    hero = Superhero("Iron Man")

    with pytest.raises(expected_error):
        hero.add_power(invalid_power)
```

## 4. Using IDs for Clear Test Reports

Add descriptive IDs to make test reports more readable:

```python
@pytest.mark.parametrize(
    "team_name, heroes, expected_size",
    [
        ("Avengers", ["Iron Man", "Thor"], 2),
        ("Solo Act", ["Deadpool"], 1),
        ("Empty Team", [], 0)
    ],
    ids=["multiple_heroes", "single_hero", "empty_team"]
)
def test_team_size():
    """
    GIVEN a team with a specific set of heroes
    WHEN we check the team size
    THEN it should return the correct count
    """

    team = SuperheroTeam(team_name)
    for hero in heroes:
        team.add_hero(hero)

    assert team.size() == expected_size
```

::: details Output
====================== test session starts ======================

....

collected 3 items

test_superhero_team.py::test_team_size[multiple_heroes] PASSED [ 33%]
test_superhero_team.py::test_team_size[single_hero] PASSED [ 66%]
test_superhero_team.py::test_team_size[empty_team] PASSED [100%]

====================== 3 passed in 0.03s ======================
:::

### 💡 Best Practices

1. Keep test cases **readable** with clear parameter names
2. Include **edge cases** and boundary conditions
3. Use **descriptive IDs** for complex test cases
4. Add **docstrings** with GIVEN-WHEN-THEN structure
5. Group **related test cases** together

### ⚠️ Common Pitfalls to Avoid

1. Don't create overly complex parameter combinations
2. Avoid dependencies between parameters
3. Keep the number of parameters manageable
4. Don't forget to test edge cases
