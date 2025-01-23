# 🧩 Key Concepts in TDD

## 1. Unit Tests

Unit tests are the building blocks of TDD. They test individual components (or "units") of code in isolation. Think of them as tiny experiments to verify that each piece of code works as expected.

#### The **GIVEN-WHEN-THEN** Structure

To write clear and effective tests, use the **GIVEN-WHEN-THEN** structure:

- **GIVEN**: Set up the initial conditions for the test.
- **WHEN**: Execute the behavior you’re testing.
- **THEN**: Verify the expected outcome.

For example:

```python
def test_hero_has_power():
    """
    GIVEN a Superhero with a specific power added to them
    WHEN we check if the hero has the power
    THEN it should confirm the power exists
    """
    # GIVEN: A superhero and a specific power added to them
    hero = Superhero("Spider-Man")
    hero.add_power("web-slinging")

    # WHEN: We check if the hero has the power
    has_power = hero.has_power("web-slinging")

    # THEN: It should confirm the power exists
    assert has_power == True
```

## 2. Test Independence

Each test should be independent of others. This means:

- No shared state between tests.
- Each test should focus on one specific behavior.
- Tests should pass or fail on their own, without relying on other tests.

For example:

```python
def test_hero_has_power():
    """
    GIVEN a Superhero with a specific power added to them
    WHEN we check if the hero has the power
    THEN it should confirm the power exists
    """
    hero = Superhero("Spider-Man")
    hero.add_power("web-slinging")
    assert hero.has_power("web-slinging") == True

def test_hero_remove_power():
    """
    GIVEN a Superhero with a specific power
    WHEN the power is removed
    THEN the hero should no longer have that power
    """
    hero = Superhero("Thor")
    hero.add_power("lightning control")
    hero.remove_power("lightning control")
    assert hero.has_power("lightning control") == False
```

## 3. Keep Tests Short and Focused

Tests should be small, fast, and easy to understand. If a test is too long or complex, it’s a sign that your code might need refactoring.

For example:

```python
def test_add_hero_to_team():
    """
    GIVEN a superhero team
    WHEN a hero is added
    THEN the team should include that hero
    """
    team = SuperheroTeam("Avengers")
    team.add_hero("Hulk")
    assert "Hulk" in team.members

def test_team_size():
    """
    GIVEN a superhero team with multiple heroes
    WHEN we check the team size
    THEN it should return the correct number of members
    """
    team = SuperheroTeam("X-Men")
    team.add_hero("Wolverine")
    team.add_hero("Storm")
    assert team.size() == 2
```

## _FIRST_ Principles for Tests

- **Fast:** Tests should run quickly
- **Independent:** Tests shouldn't depend on each other
- **Repeatable:** Tests should give the same results each time
- **Self-validating**: Tests should automatically determine if they pass or fail
- **Timely:** Tests should be written just before the production code

### Key Takeaway

- Write **independent tests** that don’t rely on each other.
- Keep tests **short and focused** on one specific behavior at a time. This makes debugging easier and ensures your tests are maintainable.
