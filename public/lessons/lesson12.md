# Lesson 12: extends for Views

## Summary
Learn how to use `extends` to inherit from other views, creating a powerful inheritance system in LookML. This allows you to build upon existing views while maintaining clean, modular code.

## What is extends?

The `extends` statement creates an inheritance relationship between views. The child view inherits all dimensions, measures, and other properties from the parent view, and can override or extend them.

## Basic extends Syntax

```lookml
view: child_view {
  extends: [parent_view]
  # Additional properties...
}
```

## Code Examples

### Parent View Definition
```lookml
view: base_user {
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: email {
    type: string
    sql: ${TABLE}.email ;;
  }
  
  dimension: created_date {
    type: date
    sql: ${TABLE}.created_at ;;
  }
  
  measure: count {
    type: count
  }
}
```

### Child View with extends
```lookml
view: active_user {
  extends: [base_user]
  
  # Override the base dimension
  dimension: created_date {
    type: date
    sql: ${TABLE}.created_at ;;
    filters: [created_date: ">= 30 days ago"]
  }
  
  # Add new dimension specific to active users
  dimension: last_login {
    type: date
    sql: ${TABLE}.last_login_at ;;
  }
  
  # Add new measure
  measure: active_count {
    type: count
    filters: [last_login: ">= 7 days ago"]
  }
}
```

### Multiple Inheritance
```lookml
view: premium_user {
  extends: [base_user, active_user]
  
  dimension: subscription_tier {
    type: string
    sql: ${TABLE}.tier ;;
  }
  
  measure: premium_count {
    type: count
    filters: [subscription_tier: "premium"]
  }
}
```

## Instructions

1. Create a base view with common dimensions
2. Create a child view that extends the base view
3. Override at least one dimension from the parent
4. Add new dimensions specific to the child view
5. Test the inheritance relationship

## Run Challenge

Create a view inheritance structure. Your code should:
- Define a base view with at least 2 dimensions
- Create a child view that extends the base view
- Override at least 1 dimension from the parent
- Add at least 1 new dimension to the child
- Use proper extends syntax

## Hint

When extending views, you can override any property from the parent view. The child view will inherit all properties from the parent unless explicitly overridden. Use square brackets `[]` for the extends parameter. 