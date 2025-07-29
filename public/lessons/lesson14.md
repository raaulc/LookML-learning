# Lesson 14: Table Calculations

## Summary
Learn how to create table calculations in Looker, which allow you to perform on-the-fly SQL logic directly in the UI. These are powerful tools for dynamic analysis without modifying your LookML.

## What are Table Calculations?

Table calculations are computed fields that are calculated after the main query is executed. They can:
- Perform row-by-row calculations
- Create running totals and percentages
- Calculate rankings and percentiles
- Transform data for visualization
- Create custom aggregations

## Table Calculation Types

### Basic Calculations
- **Difference**: Subtract one column from another
- **Percent**: Calculate percentages
- **Running Total**: Cumulative sums
- **Rank**: Rank values in ascending or descending order

### Advanced Calculations
- **Custom Formula**: Write your own calculation logic
- **Lookup**: Reference values from other rows
- **Window Functions**: Use SQL window functions

## Code Examples

### Basic Table Calculations
```lookml
# These would be created in the UI, but here's the concept

# Running total of sales
table_calculation: running_total {
  type: running_total
  field: sales_amount
}

# Percentage of total
table_calculation: percent_of_total {
  type: percent_of_total
  field: sales_amount
}

# Difference from previous period
table_calculation: sales_growth {
  type: difference
  field: sales_amount
  offset: 1
}
```

### Custom Formula Examples
```lookml
# Custom calculation using SQL-like syntax
table_calculation: profit_margin {
  type: custom
  formula: (${revenue} - ${cost}) / ${revenue} * 100
}

# Conditional calculation
table_calculation: status_score {
  type: custom
  formula: CASE 
    WHEN ${status} = 'active' THEN 100
    WHEN ${status} = 'pending' THEN 50
    ELSE 0
  END
}

# Date-based calculation
table_calculation: days_since_order {
  type: custom
  formula: DATEDIFF(CURRENT_DATE(), ${order_date})
}
```

### Advanced Window Functions
```lookml
# Moving average
table_calculation: moving_avg_7d {
  type: custom
  formula: AVG(${sales_amount}) OVER (
    ORDER BY ${date} 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  )
}

# Rank within groups
table_calculation: rank_by_category {
  type: custom
  formula: RANK() OVER (
    PARTITION BY ${category} 
    ORDER BY ${sales_amount} DESC
  )
}
```

## Instructions

1. Open an explore in Looker
2. Add dimensions and measures to your query
3. Click "Add" and select "Table Calculation"
4. Choose the calculation type
5. Configure the parameters
6. Test the calculation with different data

## Run Challenge

Create table calculations using LookML concepts. Your code should:
- Define at least 1 basic table calculation (running total, percent, etc.)
- Create at least 1 custom formula calculation
- Use proper table calculation syntax
- Include conditional logic or window functions

## Hint

Table calculations are computed after the main query, so they can reference any field in your result set. Use the field names exactly as they appear in your explore, and remember that table calculations are evaluated row by row. 