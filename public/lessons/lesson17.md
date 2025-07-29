# Lesson 17: Exploring Parameters

## Summary
Learn how to create and use parameters in LookML for dynamic filtering. Parameters allow users to input values that control the behavior of your LookML code, creating interactive and flexible analyses.

## What are Parameters?

Parameters are user-defined inputs that can control:
- Filter values
- SQL logic
- Field behavior
- Dynamic calculations
- Conditional logic

## Parameter Types

### String Parameters
- Text input for filtering
- Dropdown selections
- Multi-select options

### Number Parameters
- Numeric input for calculations
- Range selections
- Threshold values

### Date Parameters
- Date picker inputs
- Date range selections
- Relative date options

## Code Examples

### Basic String Parameter
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
  
  # String parameter for status filtering
  parameter: status_filter {
    type: string
    default_value: "active"
    allowed_value: [
      { value: "active" }
      { value: "pending" }
      { value: "cancelled" }
    ]
  }
  
  # Use parameter in dimension
  dimension: filtered_status {
    type: string
    sql: ${TABLE}.status ;;
    filters: [status: "{% parameter status_filter %}"]
  }
}
```

### Number Parameter with Range
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
  
  # Number parameter for amount threshold
  parameter: min_amount {
    type: number
    default_value: "100"
    min_value: "0"
    max_value: "10000"
  }
  
  # Use parameter in measure
  measure: filtered_sales {
    type: sum
    sql: ${TABLE}.amount ;;
    filters: [amount: ">= {% parameter min_amount %}"]
  }
}
```

### Date Parameter
```lookml
view: events {
  sql_table_name: public.events ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: event_date {
    type: date
    sql: ${TABLE}.date ;;
  }
  
  dimension: event_type {
    type: string
    sql: ${TABLE}.type ;;
  }
  
  # Date parameter
  parameter: start_date {
    type: date
    default_value: "2024-01-01"
  }
  
  parameter: end_date {
    type: date
    default_value: "2024-12-31"
  }
  
  # Use parameters in dimension
  dimension: filtered_events {
    type: string
    sql: ${TABLE}.type ;;
    filters: [
      event_date: ">= {% parameter start_date %}",
      event_date: "<= {% parameter end_date %}"
    ]
  }
}
```

### Multi-Select Parameter
```lookml
view: products {
  sql_table_name: public.products ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: category {
    type: string
    sql: ${TABLE}.category ;;
  }
  
  dimension: price {
    type: number
    sql: ${TABLE}.price ;;
  }
  
  # Multi-select parameter
  parameter: selected_categories {
    type: string
    default_value: "electronics"
    allowed_value: [
      { value: "electronics" }
      { value: "clothing" }
      { value: "books" }
      { value: "home" }
    ]
  }
  
  # Use parameter in dimension
  dimension: filtered_category {
    type: string
    sql: ${TABLE}.category ;;
    filters: [category: "{% parameter selected_categories %}"]
  }
}
```

### Parameter in SQL Logic
```lookml
view: dynamic_data {
  sql_table_name: public.data ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: value {
    type: number
    sql: ${TABLE}.value ;;
  }
  
  # Parameter for calculation logic
  parameter: calculation_type {
    type: string
    default_value: "sum"
    allowed_value: [
      { value: "sum" }
      { value: "average" }
      { value: "count" }
    ]
  }
  
  # Dynamic measure based on parameter
  measure: dynamic_measure {
    type: {% parameter calculation_type %}
    sql: ${TABLE}.value ;;
  }
}
```

## Instructions

1. Identify what user input you need
2. Choose the appropriate parameter type
3. Define the parameter with default values and constraints
4. Use the parameter in your dimensions or measures
5. Test with different parameter values

## Run Challenge

Create a view with parameters. Your code should:
- Define at least 1 parameter (string, number, or date)
- Use the parameter in at least 1 dimension or measure
- Include default values and constraints
- Use proper parameter syntax

## Hint

Parameters are powerful for creating interactive dashboards. Use them when you want users to be able to control the analysis dynamically. Remember to provide meaningful default values and clear allowed values for better user experience. 