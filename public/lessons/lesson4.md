# Lesson 4: Measures and Aggregates

Measures are the calculated fields in your LookML model. They represent the "how much" and "how many" of your data - the aggregations and calculations that provide insights.

## What are Measures?

Measures are fields that perform calculations on your data. They can be:
- **Counts**: Number of records
- **Sums**: Total values
- **Averages**: Mean values
- **Custom calculations**: Complex aggregations

## Measure Types

### Count Measures
```lookml
measure: count {
  type: count
  sql: ${TABLE}.id ;;
}
```

### Sum Measures
```lookml
measure: total_sales {
  type: sum
  sql: ${TABLE}.sale_amount ;;
}
```

### Average Measures
```lookml
measure: avg_price {
  type: average
  sql: ${TABLE}.price ;;
}
```

### Custom SQL Measures
```lookml
measure: profit_margin {
  type: number
  sql: (${TABLE}.revenue - ${TABLE}.cost) / ${TABLE}.revenue ;;
}
```

## Your Challenge

Create a view with both dimensions and measures. Include:
- At least one dimension
- At least one measure (count, sum, or average)
- Proper LookML syntax

## Example Structure

```lookml
view: sales {
  dimension: product_name {
    type: string
    sql: ${TABLE}.product_name ;;
  }
  
  dimension: sale_date {
    type: date
    sql: ${TABLE}.sale_date ;;
  }
  
  measure: count {
    type: count
    sql: ${TABLE}.id ;;
  }
  
  measure: total_revenue {
    type: sum
    sql: ${TABLE}.revenue ;;
  }
}
```

## Try It!

Write a view that includes:
1. At least one dimension
2. At least one measure
3. Proper types and SQL definitions
4. Correct LookML syntax

Click "Run" to validate your code! 