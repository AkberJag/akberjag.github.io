# 📚 Python Data Structures: A Comprehensive Guide

## 1. 📝 Lists: Dynamic Arrays

Lists are **ordered, mutable sequences** that can hold elements of different types. They're implemented as **dynamic arrays**, which means they can grow or shrink as needed.

### Key Characteristics:

- **Mutable**: Can be modified after creation.
- **Ordered**: Elements maintain their order.
- **Heterogeneous**: Can store elements of different types.

### Common List Operations

```python
# Creating lists
numbers: list[int] = [1, 2, 3, 4, 5]
mixed: list[any] = [1, "hello", 3.14, True]

# Basic Operations (Time Complexity)
numbers.append(6)      # Add to end - O(1) amortized
numbers.pop()         # Remove from end - O(1)
numbers.insert(0, 0)  # Insert at index - O(n)
numbers.pop(0)        # Remove from index - O(n)
numbers.remove(3)     # Remove first occurrence - O(n)

# Accessing and Slicing
first: int = numbers[0]          # Index access - O(1)
subset: list = numbers[1:4]      # Slicing - O(k) where k is slice size
reversed_list = numbers[::-1]    # Reverse slice

# List Methods
numbers.extend([7, 8, 9])        # Add multiple items - O(k)
numbers.sort()                   # Sort in-place - O(n log n)
numbers.reverse()               # Reverse in-place - O(n)
count: int = numbers.count(5)    # Count occurrences - O(n)
index: int = numbers.index(3)    # Find index - O(n)
```

### When to Use Lists:

- When you need an **ordered collection** that allows duplicates.
- When you need **frequent access by index**.
- When you need to **modify the sequence** (add, remove, or update elements).

## 2. 🔒 Tuples: Immutable Sequences

Tuples are **immutable sequences**. Once created, they cannot be modified. They're more **memory-efficient** than lists and can be used as **dictionary keys**.

### Key Characteristics:

- **Immutable**: Cannot be modified after creation.
- **Ordered**: Elements maintain their order.
- **Hashable**: Can be used as dictionary keys.

### Common Tuple Operations

```python
# Creating tuples
point: tuple[float, float] = (3.14, 2.71)
person: tuple[str, int, str] = ("Alice", 25, "New York")

# Basic Operations
x, y = point                     # Tuple unpacking
single_item: tuple[int] = (1,)   # Single-item tuple (note the comma)

# Methods
length: int = len(person)        # Get length - O(1)
count: int = person.count("Alice")  # Count occurrences - O(n)
index: int = person.index(25)    # Find index - O(n)

# Immutability
# These will raise TypeError:
# point[0] = 1.0  # Can't modify tuple
# person.append("USA")  # No append method
```

### When to Use Tuples:

- When you need an **immutable sequence**.
- When you need to use a sequence as a **dictionary key**.
- When returning **multiple values** from a function.

## 3. 🎯 Sets: Unique, Unordered Collections

Sets are **unordered collections of unique elements**. They're implemented using **hash tables**, making them highly efficient for **membership testing**.

### Key Characteristics:

- **Unordered**: Elements do not maintain any order.
- **Unique**: No duplicate elements allowed.
- **Mutable**: Can be modified after creation.

### Common Set Operations

```python
# Creating sets
numbers: set[int] = {1, 2, 3, 4, 5}
fruits: set[str] = {"apple", "banana", "cherry"}

# Basic Operations (All are O(1) average case)
fruits.add("date")              # Add single item
fruits.remove("apple")          # Remove item (raises KeyError if not found)
fruits.discard("apple")         # Remove item (no error if not found)
popped = fruits.pop()           # Remove and return arbitrary item

# Set Operations
# All set operations are O(min(len(s1), len(s2)))
set1: set[int] = {1, 2, 3, 4}
set2: set[int] = {3, 4, 5, 6}

union: set = set1 | set2        # Union: {1, 2, 3, 4, 5, 6}
intersection: set = set1 & set2  # Intersection: {3, 4}
difference: set = set1 - set2    # Difference: {1, 2}
symmetric_diff: set = set1 ^ set2  # Symmetric difference: {1, 2, 5, 6}

# Membership Testing
is_present: bool = "banana" in fruits  # O(1) average case
```

### When to Use Sets:

- When you need to store **unique elements**.
- When you need **fast membership testing**.
- When you need to perform **mathematical set operations** (union, intersection, etc.).

## 4. 🗝️ Dictionaries: Key-Value Pairs

Dictionaries are **hash tables** that store **key-value pairs**. Keys must be **immutable** (strings, numbers, tuples) and **unique**.

### Key Characteristics:

- **Mutable**: Can be modified after creation.
- **Unordered**: Elements do not maintain any order (prior to Python 3.7).
- **Fast Lookups**: Average O(1) time complexity for lookups.

### Common Dictionary Operations

```python
# Creating dictionaries
person: dict[str, any] = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Basic Operations (All average O(1))
person["email"] = "john@example.com"  # Add/update item
del person["city"]                    # Remove item
age = person.get("age", 0)            # Get with default value
person.setdefault("country", "USA")   # Set if key doesn't exist

# Dictionary Methods
keys: list = list(person.keys())      # Get keys
values: list = list(person.values())  # Get values
items: list = list(person.items())    # Get key-value pairs

# Dictionary Comprehension
squares: dict = {x: x**2 for x in range(5)}

# Merging Dictionaries
dict1: dict = {"a": 1, "b": 2}
dict2: dict = {"c": 3, "d": 4}
merged: dict = {**dict1, **dict2}     # Dictionary unpacking
```

### When to Use Dictionaries:

- When you need to store **key-value pairs**.
- When you need **fast lookups** by key.
- When you need to count or map data.

---

Below are less common so can be ignored

## 5. 📊 Arrays: Efficient Number Storage

Arrays are **fixed-type sequences** that are more **memory-efficient** than lists for storing large amounts of numeric data. (better use array from numpy if you are dealing with large amount of numeric data)

### Key Characteristics:

- **Fixed-Type**: All elements must be of the same type.
- **Memory-Efficient**: More efficient than lists for numeric data.
- **Mutable**: Can be modified after creation.

### Common Array Operations

```python
from array import array

# Creating arrays (typecode 'i' for integers, 'd' for doubles etc... (there are more, google it))
numbers: array = array('i', [1, 2, 3, 4, 5])  # Integer array
floats: array = array('d', [1.0, 2.0, 3.0])   # Double array

# Basic Operations
numbers.append(6)        # Add to end - O(1)
numbers.extend([7, 8])   # Add multiple items - O(k)
numbers.pop()           # Remove from end - O(1)
numbers.insert(0, 0)    # Insert at index - O(n)
numbers.remove(3)       # Remove first occurrence - O(n)

# Converting
list_nums: list = numbers.tolist()  # Convert to list
bytes_data: bytes = numbers.tobytes()  # Convert to bytes
```

### When to Use Arrays:

- When you need to store **large sequences of numbers**.
- When you need **memory efficiency**.
- When you need to perform **numeric computations**.

## 6. 🔄 Deque: Double-Ended Queue

Deque (double-ended queue) is optimized for **adding and removing elements from both ends**.

### Key Characteristics:

- **Double-Ended**: Efficient operations on both ends.
- **Mutable**: Can be modified after creation.
- **Optional Max Length**: Can be bounded to a fixed size.

### Common Deque Operations

```python
from collections import deque

# Creating deques
queue: deque = deque([1, 2, 3, 4, 5], maxlen=10)  # Optional max length

# Basic Operations (All O(1))
queue.append(6)         # Add to right
queue.appendleft(0)     # Add to left
queue.pop()            # Remove from right
queue.popleft()        # Remove from left
queue.rotate(1)        # Rotate right
queue.rotate(-1)       # Rotate left
queue.extend([7, 8])   # Extend right
queue.extendleft([9, 10])  # Extend left (9 will be leftmost)
```

### When to Use Deque:

- When you need **fast operations on both ends**.
- When you need a **fixed-size buffer**.
- When implementing **queues or stacks**.

## 7. 🔑 Advanced Dictionary Types

Python’s `collections` module provides specialized dictionary types that extend the functionality of the standard `dict`. These are particularly useful for specific use cases like counting, grouping, or maintaining order.

### 7.1 **`defaultdict`: Auto-Initializing Dictionary**

The `defaultdict` automatically initializes values for missing keys, eliminating the need to check if a key exists before performing operations.

#### Key Features:

- **Auto-Initialization**: Provides a default value for missing keys.
- **Flexible Defaults**: You can specify the default type (e.g., `int`, `list`, `set`).
- **No KeyError**: Avoids `KeyError` exceptions when accessing missing keys.

#### Example Use Cases:

- Counting occurrences of items.
- Grouping items into lists or sets.

#### Example Code:

```python
from collections import defaultdict

# Default to int (initializes to 0)
word_count: defaultdict[str, int] = defaultdict(int)
words = ["apple", "banana", "apple", "cherry", "banana"]

for word in words:
    word_count[word] += 1  # No need to check if key exists

print(word_count)  # Output: {'apple': 2, 'banana': 2, 'cherry': 1}

# Default to list (initializes to empty list)
grouped_data: defaultdict[str, list[int]] = defaultdict(list)
data = [("a", 1), ("b", 2), ("a", 3), ("c", 4)]

for key, value in data:
    grouped_data[key].append(value)  # Automatically creates a list for new keys

print(grouped_data)  # Output: {'a': [1, 3], 'b': [2], 'c': [4]}
```

### 7.2 **`Counter`: Element Counter**

The `Counter` is a specialized dictionary designed for counting hashable objects. It’s incredibly useful for tasks like counting word frequencies or tallying votes.

#### Key Features:

- **Counting**: Automatically counts occurrences of elements.
- **Mathematical Operations**: Supports operations like addition, subtraction, intersection, and union.
- **Most Common**: Easily retrieves the most frequent elements.

#### Example Use Cases:

- Counting word frequencies in a text.
- Tallying votes or survey responses.

#### Example Code:

```python
from collections import Counter

# Counting elements in a list
inventory: Counter[str] = Counter(["apple", "banana", "apple", "cherry"])
print(inventory)  # Output: Counter({'apple': 2, 'banana': 1, 'cherry': 1})

# Counting characters in a string
word_count: Counter[str] = Counter("mississippi")
print(word_count)  # Output: Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})

# Most common elements
print(word_count.most_common(2))  # Output: [('i', 4), ('s', 4)]

# Updating counts
inventory.update(["apple", "date"])
print(inventory)  # Output: Counter({'apple': 3, 'banana': 1, 'cherry': 1, 'date': 1})

# Combining counters
inventory2 = Counter(["apple", "banana", "date"])
combined = inventory + inventory2
print(combined)  # Output: Counter({'apple': 4, 'banana': 2, 'date': 2, 'cherry': 1})
```

### 7.3 **`OrderedDict`: Ordered Dictionary**

The `OrderedDict` maintains the order in which items are inserted. While Python 3.7+ guarantees insertion order for regular dictionaries, `OrderedDict` provides additional methods for reordering items.

#### Key Features:

- **Insertion Order**: Maintains the order of keys as they are added.
- **Reordering**: Supports moving items to the beginning or end.
- **Equality Checks**: Considers order when comparing dictionaries.

#### Example Use Cases:

- Maintaining a specific order of items (e.g., FIFO/LIFO queues).
- Implementing LRU (Least Recently Used) caches. (for large caches, consider using a more optimized library like functools.lru_cache)

#### Example Code:

```python
from collections import OrderedDict

# Creating an OrderedDict
od: OrderedDict[str, int] = OrderedDict()
od["a"] = 1
od["b"] = 2
od["c"] = 3

print(od)  # Output: OrderedDict([('a', 1), ('b', 2), ('c', 3)])

# Moving an item to the end
od.move_to_end("a")
print(od)  # Output: OrderedDict([('b', 2), ('c', 3), ('a', 1)])

# Moving an item to the beginning
od.move_to_end("a", last=False)
print(od)  # Output: OrderedDict([('a', 1), ('b', 2), ('c', 3)])
```

### 7.4 **`ChainMap`: Chaining Multiple Dictionaries**

The `ChainMap` groups multiple dictionaries into a single, updateable view. It’s useful for managing layered configurations or searching through multiple dictionaries efficiently.

#### Key Features:

- **Layered Lookup**: Searches through multiple dictionaries in order.
- **Updateable**: Changes to the `ChainMap` affect the first dictionary.
- **Memory Efficient**: Doesn’t create a new dictionary.

#### Example Use Cases:

- Managing configuration settings (e.g., defaults vs. user settings).
- Simulating nested scopes (e.g., local vs. global variables).

#### Example Code:

```python
from collections import ChainMap

# Creating ChainMaps
defaults = {"theme": "light", "language": "en"}
user_settings = {"theme": "dark"}

settings = ChainMap(user_settings, defaults)

# Lookup (searches user_settings first, then defaults)
print(settings["theme"])  # Output: dark (from user_settings)
print(settings["language"])  # Output: en (from defaults)

# Updating (affects the first dictionary)
settings["language"] = "fr"
print(user_settings)  # Output: {'theme': 'dark', 'language': 'fr'}
```

### 7.5 **`UserDict`: Custom Dictionary-Like Objects**

The `UserDict` is a wrapper class for creating custom dictionary-like objects. It’s useful when you need to extend or modify dictionary behavior.

#### Key Features:

- **Custom Behavior**: Override methods like `__getitem__`, `__setitem__`, etc.
- **Backed by a Dictionary**: Stores data in a `data` attribute.
- **Flexible**: Easier to subclass than `dict`.

#### Example Use Cases:

- Creating dictionaries with custom validation.
- Implementing case-insensitive dictionaries.

#### Example Code:

```python
from collections import UserDict

# Custom dictionary that logs accesses
class LoggingDict(UserDict):
    def __getitem__(self, key):
        print(f"Accessing key: {key}")
        return super().__getitem__(key)

    def __setitem__(self, key, value):
        print(f"Setting key: {key} to {value}")
        super().__setitem__(key, value)

log_dict = LoggingDict({"a": 1, "b": 2})
log_dict["c"] = 3  # Logs: Setting key: c to 3
print(log_dict["a"])  # Logs: Accessing key: a, Output: 1
```

## 💡 Pro Tips for Choosing Data Structures

1. 🎯 Use **Lists** when you need:

   - Ordered collection with duplicates
   - Frequent access by index
   - Need to modify the sequence

2. 🔒 Use **Tuples** when you need:

   - Immutable sequences
   - Dictionary keys
   - Returning multiple values from functions

3. 🎯 Use **Sets** when you need:

   - Unique elements
   - Fast membership testing
   - Mathematical set operations

4. 🗝️ Use **Dictionaries** when you need:

   - Key-value associations
   - Fast lookup by key
   - Counting or mapping data

5. 📊 Use **Arrays** when you need:

   - Large sequences of numbers
   - Memory efficiency
   - Numeric computations

6. 🔄 Use **Deque** when you need:

   - Fast operations on both ends
   - Fixed-size buffer
   - Queue or stack functionality

7. 🔑 Use **Advanced Dictionary Types** when you need:
   - Auto-initialization (`defaultdict`)
   - Counting elements (`Counter`)
   - Maintaining insertion order (`OrderedDict`)
   - Layered lookups (`ChainMap`)
   - Custom dictionary behavior (`UserDict`)

## 🤔 Common Gotchas and Best Practices

1. ⚠️ **Mutable Default Arguments**

```python
# Bad
def add_to_list(item, lst=[]):  # lst will be shared between calls!
    lst.append(item)
    return lst

# Good
def add_to_list(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```

2. 🔍 **Dictionary Key Requirements**

```python
# This works (immutable keys)
good_dict = {
    "string": 1,
    (1, 2): 2,
    frozenset([1, 2]): 3
}

# This raises TypeError (mutable keys)
bad_dict = {
    [1, 2]: 1,  # Lists can't be keys
    {1, 2}: 2   # Sets can't be keys
}
```

3. 📝 **Copying Collections**

```python
# Shallow copy vs Deep copy
import copy

original = [1, [2, 3], 4]
shallow = original.copy()  # or list(original)
deep = copy.deepcopy(original)

original[1][0] = 5
# shallow[1][0] is also 5
# deep[1][0] is still 2
```
