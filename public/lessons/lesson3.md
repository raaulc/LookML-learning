# Lesson 3: Dimensions and Types

Dimensions are the descriptive fields in your LookML model. They represent the "what" and "when" of your data - the attributes you use for grouping, filtering, and sorting.

## What are Dimensions?

Dimensions are fields that describe your data. They can be:
- **Primary keys**: Unique identifiers
- **Descriptive fields**: Names, categories, labels
- **Date/time fields**: Timestamps, dates
- **Geographic fields**: Locations, addresses

## Dimension Types

LookML supports several dimension types:

### String Types
```lookml
dimension: name {
  type: string
  sql: ${TABLE}.customer_name ;;
}
```

### Number Types
```lookml
dimension: age {
  type: number
  sql: ${TABLE}.customer_age ;;
}
```

### Date Types
```lookml
dimension: created_date {
  type: date
  sql: ${TABLE}.created_at ;;
}
```

### Time Types
```lookml
dimension: created_time {
  type: time
  sql: ${TABLE}.created_at ;;
}
```

### Timestamp Types
```lookml
dimension: created_timestamp {
  type: timestamp
  sql: ${TABLE}.created_at ;;
}
```

## Your Challenge

Create a view with multiple dimensions of different types. Include:
- A string dimension
- A number dimension  
- A date dimension

## Example Structure

```lookml
view: customer {
  dimension: name {
    type: string
    sql: ${TABLE}.customer_name ;;
  }
  
  dimension: age {
    type: number
    sql: ${TABLE}.customer_age ;;
  }
  
  dimension: signup_date {
    type: date
    sql: ${TABLE}.signup_date ;;
  }
}
```

## Try It!

Write a view with at least three dimensions of different types. Make sure each dimension has:
1. A descriptive name
2. An appropriate type
3. A proper SQL definition

Click "Run" to validate your code! 