# Lesson 15: access_filter

## Summary
Learn how to use `access_filter` to implement user-level filtering in LookML. This is essential for row-level security and ensuring users only see data they're authorized to access.

## What is access_filter?

`access_filter` is a LookML feature that automatically applies filters based on user attributes. It's used for:
- Row-level security (RLS)
- Multi-tenant data isolation
- User-specific data access
- Compliance and data governance

## Basic access_filter Syntax

```lookml
access_filter: {
  field: dimension_name
  user_attribute: user_attribute_name
}
```

## Code Examples

### Simple User-Based Filtering
```lookml
view: orders {
  sql_table_name: public.orders ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: user_id {
    type: number
    sql: ${TABLE}.user_id ;;
  }
  
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  # Filter orders to only show current user's data
  access_filter: {
    field: user_id
    user_attribute: user_id
  }
}
```

### Multi-Value User Attributes
```lookml
view: sales {
  sql_table_name: public.sales ;;
  
  dimension: region {
    type: string
    sql: ${TABLE}.region ;;
  }
  
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  # Filter by multiple regions the user has access to
  access_filter: {
    field: region
    user_attribute: allowed_regions
  }
}
```

### Complex Filtering Logic
```lookml
view: customer_data {
  sql_table_name: public.customers ;;
  
  dimension: customer_id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: account_manager {
    type: string
    sql: ${TABLE}.manager ;;
  }
  
  dimension: tier {
    type: string
    sql: ${TABLE}.tier ;;
  }
  
  # Multiple access filters
  access_filter: {
    field: account_manager
    user_attribute: manager_id
  }
  
  access_filter: {
    field: tier
    user_attribute: allowed_tiers
  }
}
```

### Using SQL for Complex Logic
```lookml
view: secure_data {
  sql_table_name: public.sensitive_data ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: department {
    type: string
    sql: ${TABLE}.dept ;;
  }
  
  dimension: security_level {
    type: string
    sql: ${TABLE}.security_level ;;
  }
  
  # Complex access filter with SQL
  access_filter: {
    field: id
    user_attribute: user_id
    sql: ${TABLE}.owner_id = {% user_attribute user_id %}
    OR ${TABLE}.security_level <= {% user_attribute max_security_level %}
  }
}
```

## Instructions

1. Identify the field to filter on (user_id, region, etc.)
2. Determine the user attribute to use for filtering
3. Add the access_filter to your view
4. Test with different user attributes
5. Verify that data is properly filtered

## Run Challenge

Create a view with access filtering. Your code should:
- Define a view with at least 2 dimensions
- Add at least 1 access_filter
- Use proper access_filter syntax
- Include a user_attribute reference

## Hint

Access filters are applied automatically when users query the data. The user attribute values are set in the Looker admin panel or through SSO integration. Test your filters by switching between different user contexts. 