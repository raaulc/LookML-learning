# Lesson 16: always_filter, sql_always_where

## Summary
Learn how to use `always_filter` and `sql_always_where` to force filters in Looker explores. These are powerful tools for ensuring data quality and enforcing business rules.

## What are always_filter and sql_always_where?

### always_filter
- Forces a filter to always be applied
- Users cannot remove or modify the filter
- Ensures data quality and business rules
- Applied at the explore level

### sql_always_where
- Adds SQL conditions that are always applied
- More flexible than always_filter
- Can include complex logic
- Applied at the view level

## Basic Syntax

```lookml
# In explore
always_filter: [dimension_name: "value"]

# In view
sql_always_where: ${TABLE}.status = 'active'
```

## Code Examples

### always_filter in Explores
```lookml
explore: orders {
  from: orders
  
  # Always filter to active orders only
  always_filter: [status: "active"]
  
  # Always filter to current year
  always_filter: [created_date: ">= 2024-01-01"]
  
  # Multiple always filters
  always_filter: [
    status: "active",
    region: "US"
  ]
}
```

### sql_always_where in Views
```lookml
view: orders {
  sql_table_name: public.orders ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: status {
    type: string
    sql: ${TABLE}.status ;;
  }
  
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  # Always exclude deleted orders
  sql_always_where: ${TABLE}.deleted_at IS NULL
  
  # Always filter to active orders
  sql_always_where: ${TABLE}.status = 'active'
}
```

### Complex sql_always_where Logic
```lookml
view: sales_data {
  sql_table_name: public.sales ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: region {
    type: string
    sql: ${TABLE}.region ;;
  }
  
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  # Complex always where conditions
  sql_always_where: 
    ${TABLE}.status = 'completed'
    AND ${TABLE}.amount > 0
    AND ${TABLE}.created_at >= '2020-01-01'
}
```

### Combining with Parameters
```lookml
view: filtered_data {
  sql_table_name: public.data ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: category {
    type: string
    sql: ${TABLE}.category ;;
  }
  
  # Use parameter in always where
  sql_always_where: ${TABLE}.category IN ({% parameter allowed_categories %})
}
```

### Multiple sql_always_where Conditions
```lookml
view: secure_data {
  sql_table_name: public.sensitive_data ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: department {
    type: string
    sql: ${TABLE}.dept ;;
  }
  
  # Multiple conditions (AND logic)
  sql_always_where: ${TABLE}.active = true
  sql_always_where: ${TABLE}.security_level <= 3
  sql_always_where: ${TABLE}.created_at >= '2023-01-01'
}
```

## Instructions

1. Identify the business rule to enforce
2. Choose between always_filter (explore level) or sql_always_where (view level)
3. Add the appropriate filter condition
4. Test that the filter cannot be removed by users
5. Verify the data is properly filtered

## Run Challenge

Create a view with forced filtering. Your code should:
- Define a view with at least 2 dimensions
- Add at least 1 sql_always_where condition
- Use proper sql_always_where syntax
- Include a meaningful business rule filter

## Hint

Use `always_filter` when you want to force specific dimension values, and use `sql_always_where` when you need more complex SQL logic. Multiple `sql_always_where` conditions are combined with AND logic. 