# Lesson 2: Views and Fields

Views are the foundation of LookML. They represent tables or logical groupings of fields in your data model. Think of a view as a "table" that contains dimensions and measures.

## What is a View?

A view in LookML defines a set of fields that can be used in explores. Views can represent:
- Database tables
- Derived tables (SQL-based)
- Native derived tables (LookML-based)

## Basic View Structure

```lookml
view: user {
  # This is where you define dimensions and measures
}
```

## Fields in Views

Views contain two main types of fields:
- **Dimensions**: Descriptive fields (names, dates, categories)
- **Measures**: Calculated fields (sums, counts, averages)

## Your Challenge

Create a view called `product` with at least one dimension. The dimension should have:
- A descriptive name
- A type (like `string`, `number`, `date`)
- An SQL definition

## Example Structure

```lookml
view: product {
  dimension: name {
    type: string
    sql: ${TABLE}.product_name ;;
  }
}
```

## Try It!

Write a view that includes:
1. A view name (choose any name you like)
2. At least one dimension with proper type and SQL
3. Correct LookML syntax

Click "Run" to validate your code! 