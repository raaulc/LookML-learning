# Lesson 7: Filters and Parameters

Filters and parameters allow you to make your LookML models dynamic and interactive. They let users control what data they see and how it's calculated.

## What are Filters?

Filters limit the data that's returned by your queries. They can be:
- **Hard-coded**: Always applied
- **User-defined**: Applied by users
- **Parameter-based**: Dynamic based on user input

## Filter Types

### Always Filter
```lookml
view: sales {
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  filter: active_sales {
    type: yesno
    sql: ${TABLE}.status = 'active' ;;
  }
}
```

### User Filter
```lookml
view: sales {
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  filter: status_filter {
    type: string
    sql: ${TABLE}.status = {% parameter status %} ;;
  }
}
```

## Parameters

Parameters are user inputs that control your model behavior.

### String Parameter
```lookml
parameter: customer_name {
  type: string
  default_value: ""
}
```

### Number Parameter
```lookml
parameter: min_amount {
  type: number
  default_value: 0
}
```

### Date Parameter
```lookml
parameter: start_date {
  type: date
  default_value: "2023-01-01"
}
```

## Your Challenge

Create a view with filters and parameters. Include:
- At least one dimension
- A filter that uses a parameter
- A parameter definition

## Example Structure

```lookml
view: sales {
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  parameter: min_amount {
    type: number
    default_value: 0
  }
  
  filter: amount_filter {
    type: number
    sql: ${TABLE}.amount >= {% parameter min_amount %} ;;
  }
}
```

## Try It!

Write a view that includes:
1. At least one dimension
2. A parameter definition
3. A filter that uses the parameter
4. Proper LookML syntax

Click "Run" to validate your code! 