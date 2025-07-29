# Lesson 5: SQL and LookML

LookML and SQL work together seamlessly. The SQL parameter in LookML allows you to write custom SQL expressions while maintaining the benefits of LookML's semantic layer.

## SQL in LookML

Every dimension and measure has a `sql` parameter that defines the underlying SQL expression. This is where you write the actual database query.

## SQL Parameter Syntax

```lookml
dimension: field_name {
  type: string
  sql: ${TABLE}.column_name ;;
}
```

## Table References

- `${TABLE}` refers to the current table/view
- Use this to reference columns in your table
- Always end SQL expressions with `;;`

## Common SQL Patterns

### Basic Column Reference
```lookml
dimension: customer_name {
  type: string
  sql: ${TABLE}.customer_name ;;
}
```

### SQL Functions
```lookml
dimension: upper_name {
  type: string
  sql: UPPER(${TABLE}.customer_name) ;;
}
```

### Case Statements
```lookml
dimension: customer_tier {
  type: string
  sql: CASE 
    WHEN ${TABLE}.total_spend > 1000 THEN 'Premium'
    WHEN ${TABLE}.total_spend > 500 THEN 'Gold'
    ELSE 'Silver'
  END ;;
}
```

### Date Functions
```lookml
dimension: year {
  type: number
  sql: EXTRACT(YEAR FROM ${TABLE}.created_date) ;;
}
```

## Your Challenge

Create a view with dimensions that use different SQL patterns:
- A basic column reference
- A SQL function (like UPPER, LOWER, TRIM)
- A CASE statement

## Example Structure

```lookml
view: customer {
  dimension: name {
    type: string
    sql: ${TABLE}.customer_name ;;
  }
  
  dimension: upper_name {
    type: string
    sql: UPPER(${TABLE}.customer_name) ;;
  }
  
  dimension: tier {
    type: string
    sql: CASE 
      WHEN ${TABLE}.spend > 1000 THEN 'Premium'
      ELSE 'Standard'
    END ;;
  }
}
```

## Try It!

Write a view with dimensions that demonstrate:
1. Basic column reference
2. SQL function usage
3. CASE statement logic
4. Proper SQL syntax with `;;`

Click "Run" to validate your code! 