# Lesson 13: Custom Fields

## Summary
Learn how to create custom fields directly in Looker using the Looker UI. These are fields that don't require SQL and can be created by business users for quick analysis.

## What are Custom Fields?

Custom fields are dimensions and measures that can be created directly in the Looker interface without writing LookML. They're perfect for:
- Quick calculations
- Simple transformations
- Business user self-service
- Prototyping before moving to LookML

## Types of Custom Fields

### Custom Dimensions
- **String**: Text transformations and concatenations
- **Number**: Mathematical calculations
- **Date**: Date formatting and calculations
- **Yes/No**: Boolean logic

### Custom Measures
- **Count**: Counting records
- **Sum**: Summing numeric values
- **Average**: Calculating averages
- **Min/Max**: Finding minimum/maximum values

## Code Examples

### Custom Dimension Examples
```lookml
# These would be created in the UI, but here's the equivalent LookML

# String concatenation
dimension: full_name {
  type: string
  sql: CONCAT(${first_name}, ' ', ${last_name}) ;;
}

# Number calculation
dimension: profit_margin {
  type: number
  sql: (${revenue} - ${cost}) / ${revenue} ;;
}

# Date formatting
dimension: month_year {
  type: string
  sql: DATE_FORMAT(${created_date}, '%Y-%m') ;;
}

# Boolean logic
dimension: is_premium {
  type: yesno
  sql: ${subscription_tier} = 'premium' ;;
}
```

### Custom Measure Examples
```lookml
# Count with filter
measure: active_users {
  type: count
  filters: [status: "active"]
}

# Sum with calculation
measure: total_revenue_usd {
  type: sum
  sql: ${amount} * ${exchange_rate} ;;
}

# Average
measure: avg_order_value {
  type: average
  sql: ${order_amount} ;;
}
```

## Instructions

1. Open an existing explore in Looker
2. Click "Add" next to Dimensions or Measures
3. Choose "Custom Field"
4. Select the field type (String, Number, Date, etc.)
5. Write your calculation or transformation
6. Save and test the field

## Run Challenge

Create custom fields using LookML syntax. Your code should:
- Create at least 1 custom dimension with a calculation
- Create at least 1 custom measure with aggregation
- Use proper LookML syntax for custom fields
- Include at least 1 filter or condition

## Hint

Custom fields are great for quick calculations, but for complex logic or reusable fields, consider moving them to LookML files. Custom fields created in the UI can be converted to LookML later. 