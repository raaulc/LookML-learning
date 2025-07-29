# Lesson 9: Timeframes and Date Functions

Timeframes and date functions are essential for time-based analysis in LookML. They help you create meaningful date dimensions and perform time-based calculations.

## What are Timeframes?

Timeframes convert date/timestamp fields into meaningful time periods like days, weeks, months, or quarters.

## Timeframe Types

### Basic Timeframes
```lookml
dimension: created_date {
  type: date
  sql: ${TABLE}.created_at ;;
  timeframes: [date, week, month, quarter, year]
}
```

### Custom Timeframes
```lookml
dimension: created_date {
  type: date
  sql: ${TABLE}.created_at ;;
  timeframes: [date, week, month, quarter, year]
  convert_tz: true
  datatype: date
}
```

## Date Functions

### Date Truncation
```lookml
dimension: month {
  type: date
  sql: DATE_TRUNC('month', ${TABLE}.created_at) ;;
}
```

### Date Extraction
```lookml
dimension: year {
  type: number
  sql: EXTRACT(YEAR FROM ${TABLE}.created_at) ;;
}
```

### Date Arithmetic
```lookml
dimension: days_since_created {
  type: number
  sql: DATEDIFF(CURRENT_DATE, ${TABLE}.created_at) ;;
}
```

## Your Challenge

Create a view with date dimensions and timeframes. Include:
- A date dimension with multiple timeframes
- A custom date calculation
- A date extraction dimension

## Example Structure

```lookml
view: events {
  dimension: event_date {
    type: date
    sql: ${TABLE}.created_at ;;
    timeframes: [date, week, month, quarter, year]
  }
  
  dimension: event_month {
    type: date
    sql: DATE_TRUNC('month', ${TABLE}.created_at) ;;
  }
  
  dimension: event_year {
    type: number
    sql: EXTRACT(YEAR FROM ${TABLE}.created_at) ;;
  }
  
  dimension: days_ago {
    type: number
    sql: DATEDIFF(CURRENT_DATE, ${TABLE}.created_at) ;;
  }
}
```

## Try It!

Write a view that includes:
1. A date dimension with timeframes
2. A custom date calculation
3. A date extraction dimension
4. Proper LookML syntax

Click "Run" to validate your code! 