# Lesson 11: Reusing Code with include

## Summary
Learn how to reuse LookML code across multiple files using the `include` statement. This is essential for maintaining DRY (Don't Repeat Yourself) principles in large LookML projects.

## What is include?

The `include` statement allows you to reference and reuse LookML code from other files. This is particularly useful for:
- Shared dimensions and measures
- Common view definitions
- Standard filters and parameters
- Reusable SQL snippets

## Basic include Syntax

```lookml
include: "filename.view"
```

## Code Examples

### Including a Single File
```lookml
include: "shared_dimensions.view"
```

### Including Multiple Files
```lookml
include: "shared_dimensions.view"
include: "common_measures.view"
include: "standard_filters.view"
```

### Creating a Shared Dimensions File
```lookml
# shared_dimensions.view
view: shared_dimensions {
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: created_date {
    type: date
    sql: ${TABLE}.created_at ;;
  }
  
  dimension: status {
    type: string
    sql: ${TABLE}.status ;;
  }
}
```

### Using Included Code
```lookml
include: "shared_dimensions.view"

view: orders {
  sql_table_name: public.orders ;;
  
  # All dimensions from shared_dimensions.view are now available
  # You can also add new dimensions specific to this view
  
  dimension: order_amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
}
```

## Instructions

1. Create a shared dimensions file with common fields
2. Use `include` to reference the shared file
3. Add view-specific dimensions and measures
4. Test that all included fields are accessible

## Run Challenge

Create a shared dimensions file and include it in a main view. Your code should:
- Include a shared file with at least 2 dimensions
- Add at least 1 new dimension to the main view
- Use proper LookML syntax

## Hint

Remember that included files must be valid LookML files with a `.view` extension. The included code becomes part of your current view, so you can reference all its dimensions and measures. 