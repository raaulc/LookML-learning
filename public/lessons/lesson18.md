# Lesson 18: Measures from Dimensions

## Summary
Learn how to derive measures from dimensions in LookML. This powerful technique allows you to create aggregated calculations based on existing dimensions, enabling complex analytical capabilities.

## What are Measures from Dimensions?

Measures from dimensions allow you to:
- Create aggregations from existing dimensions
- Build complex calculations
- Generate derived metrics
- Create conditional aggregations
- Build ratio and percentage calculations

## Basic Syntax

```lookml
measure: measure_name {
  type: aggregation_type
  sql: ${dimension_name} ;;
}
```

## Code Examples

### Basic Count Measures
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
  
  # Count of all orders
  measure: total_orders {
    type: count
  }
  
  # Count of orders by status
  measure: active_orders {
    type: count
    filters: [status: "active"]
  }
  
  # Count distinct customers
  measure: unique_customers {
    type: count_distinct
    sql: ${customer_id} ;;
  }
}
```

### Sum and Average Measures
```lookml
view: sales {
  sql_table_name: public.sales ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  dimension: region {
    type: string
    sql: ${TABLE}.region ;;
  }
  
  # Sum of all sales
  measure: total_sales {
    type: sum
    sql: ${amount} ;;
  }
  
  # Average order value
  measure: avg_order_value {
    type: average
    sql: ${amount} ;;
  }
  
  # Sum with filter
  measure: us_sales {
    type: sum
    sql: ${amount} ;;
    filters: [region: "US"]
  }
}
```

### Conditional Measures
```lookml
view: customer_data {
  sql_table_name: public.customers ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: tier {
    type: string
    sql: ${TABLE}.tier ;;
  }
  
  dimension: revenue {
    type: number
    sql: ${TABLE}.revenue ;;
  }
  
  # Count premium customers
  measure: premium_customers {
    type: count
    filters: [tier: "premium"]
  }
  
  # Revenue from premium customers
  measure: premium_revenue {
    type: sum
    sql: ${revenue} ;;
    filters: [tier: "premium"]
  }
  
  # Average revenue by tier
  measure: avg_premium_revenue {
    type: average
    sql: ${revenue} ;;
    filters: [tier: "premium"]
  }
}
```

### Ratio and Percentage Measures
```lookml
view: conversion_data {
  sql_table_name: public.conversions ;;
  
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
  
  # Conversion rate
  measure: conversion_rate {
    type: number
    sql: ${converted_count} / NULLIF(${total_count}, 0) ;;
  }
  
  # Percentage of successful conversions
  measure: success_rate {
    type: number
    sql: ${success_count} / NULLIF(${total_count}, 0) * 100 ;;
  }
  
  # Average order value for conversions
  measure: avg_conversion_value {
    type: average
    sql: ${amount} ;;
    filters: [status: "converted"]
  }
}
```

### Complex Derived Measures
```lookml
view: analytics {
  sql_table_name: public.analytics ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: event_type {
    type: string
    sql: ${TABLE}.event_type ;;
  }
  
  dimension: user_id {
    type: number
    sql: ${TABLE}.user_id ;;
  }
  
  dimension: session_id {
    type: number
    sql: ${TABLE}.session_id ;;
  }
  
  # Unique users
  measure: unique_users {
    type: count_distinct
    sql: ${user_id} ;;
  }
  
  # Unique sessions
  measure: unique_sessions {
    type: count_distinct
    sql: ${session_id} ;;
  }
  
  # Events per user
  measure: events_per_user {
    type: number
    sql: ${total_events} / NULLIF(${unique_users}, 0) ;;
  }
  
  # Sessions per user
  measure: sessions_per_user {
    type: number
    sql: ${unique_sessions} / NULLIF(${unique_users}, 0) ;;
  }
}
```

## Instructions

1. Identify the dimension you want to aggregate
2. Choose the appropriate measure type (count, sum, average, etc.)
3. Add filters if needed for conditional aggregation
4. Use the dimension reference in the measure SQL
5. Test the measure with different data scenarios

## Run Challenge

Create measures from dimensions. Your code should:
- Define at least 2 dimensions
- Create at least 2 measures derived from dimensions
- Include at least 1 filtered measure
- Use proper measure syntax and dimension references

## Hint

When creating measures from dimensions, use `${dimension_name}` to reference the dimension. For conditional measures, use filters to limit the aggregation. Remember that measures are aggregated values, while dimensions are individual data points. 