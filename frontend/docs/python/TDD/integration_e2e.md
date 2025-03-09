## 🧩 Integration Tests

Integration tests are designed to verify that multiple units or components of our application work together as expected. Unlike unit tests, which focus on individual components in isolation, `integration tests ensure that these components interact correctly when combined`.

### Example: Testing Two Units Working Together

Let’s say we have two units: a Database class that handles database operations and a SuperheroService class that uses the Database class to fetch superhero details. We want to test how these two units work together.

**Unit 1: Database Class**

```python
class Database:
    def __init__(self):
        self.data = {
            1: {"id": 1, "name": "Superman", "power": "Flight"},
            2: {"id": 2, "name": "Batman", "power": "Rich"}
        }

    def get_superhero(self, superhero_id):
        return self.data.get(superhero_id)
```

**Unit 2: SuperheroService Class**

```python
class SuperheroService:
    def __init__(self, database):
        self.database = database

    def get_superhero_details(self, superhero_id):
        return self.database.get_superhero(superhero_id)
```

### Integration Test: Testing Database and SuperheroService Together

```python
def test_superhero_service_with_database():
    """
    GIVEN: A Database and SuperheroService instance
    WHEN: Fetching a superhero's details using SuperheroService
    THEN: The correct superhero details should be returned
    """
    # GIVEN: A Database and SuperheroService instance
    database = Database()
    superhero_service = SuperheroService(database)

    # WHEN: Fetching a superhero's details using SuperheroService
    superhero_details = superhero_service.get_superhero_details(1)

    # THEN: The correct superhero details should be returned
    assert superhero_details == {"id": 1, "name": "Superman", "power": "Flight"}
```

In this example:

1. The Database class is responsible for storing and retrieving superhero data.
1. The SuperheroService class uses the Database class to fetch superhero details.
1. The integration test verifies that these two units work together correctly by ensuring that the SuperheroService can fetch the correct superhero details from the Database.

## 🚀 End-to-End (E2E) Tests

End-to-End (E2E) tests simulate real user scenarios by testing the entire application from start to finish. These tests are crucial for verifying that all parts of our application work together in a real-world scenario. Unlike unit or integration tests, E2E tests focus on the user’s perspective and test the entire workflow of the application.

### Example: Testing a Superhero Workflow\*\*

Let’s say we have a simple application where a user can:

1. Add a superhero to a team.
1. Fetch the details of the superhero from the team.
1. Remove the superhero from the team.

We’ll simulate this entire workflow in an E2E test.
