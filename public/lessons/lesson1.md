# Lesson 1: What is LookML?

LookML is a modeling language used in Looker to define dimensions, measures, and views. It provides a way to create a semantic layer that sits between your database and your users, making data exploration more intuitive and consistent.

## Key Concepts

### Views
A `view` is the foundation of LookML. It represents a table or a logical grouping of fields. Views contain dimensions and measures.

### Dimensions
Dimensions are fields that describe your data. They can be used for grouping, filtering, and sorting.

### Measures
Measures are calculations, typically aggregations like sums, counts, or averages.

## Your First LookML

Try writing a `view` block with at least one `dimension`. The basic structure should include:

- A view name
- At least one dimension with a type and SQL definition

## Example Structure

```lookml
view: user {
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
}
```

## Challenge

Write a view that includes:
1. A view name (any name you choose)
2. At least one dimension
3. Proper LookML syntax with curly braces and semicolons

Click "Run" to validate your code! 