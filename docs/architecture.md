# Architecture

## Params

- Category
- Subcategory

## SearchParams

- Filering
- Pagination
- Sorting

## Behaviour

### /[category]

- Returns all products matching the category

### /[category]/[subcategory]

- Returns all products matching the category and the subcategory

### Filtering

- Applied to the right of the route.

```
/[category]/[subcategory]?color=["Red"]&size=["UK 8"]
```

### Pagination

- Applied after all filters

#### Page 1

```
/[category]/[subcategory]?color=["Red"]&size=["UK 8"]
```

#### Page N

```
/[category]/[subcategory]?color=["Red"]&size=["UK 8"]&page=n
```

### Sorting

- Applied after pagination

```
/[category]/[subcategory]?color=["Red"]&size=["UK 8"]&page=n&price=asc
```
