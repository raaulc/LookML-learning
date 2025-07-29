# Lesson 10: Advanced LookML Features

Congratulations! You've learned the fundamentals of LookML. Now let's explore some advanced features that will make your models more powerful and maintainable.

## Advanced Features

### Hidden Fields
```lookml
dimension: internal_id {
  type: number
  sql: ${TABLE}.id ;;
  hidden: yes
}
```

### Description and Labels
```lookml
dimension: customer_name {
  type: string
  sql: ${TABLE}.customer_name ;;
  description: "The full name of the customer"
  label: "Customer Name"
}
```

### Value Formatting
```lookml
measure: revenue {
  type: sum
  sql: ${TABLE}.revenue ;;
  value_format: "$#,##0.00"
}
```

### Conditional Logic
```lookml
dimension: customer_status {
  type: string
  sql: CASE 
    WHEN ${TABLE}.total_orders > 10 THEN 'VIP'
    WHEN ${TABLE}.total_orders > 5 THEN 'Regular'
    ELSE 'New'
  END ;;
}
```

## Best Practices

### 1. Use Descriptive Names
```lookml
# Good
dimension: customer_email_address {
  type: string
  sql: ${TABLE}.email ;;
}

# Avoid
dimension: email {
  type: string
  sql: ${TABLE}.email ;;
}
```

### 2. Add Descriptions
```lookml
dimension: customer_email_address {
  type: string
  sql: ${TABLE}.email ;;
  description: "The email address of the customer"
}
```

### 3. Use Sets for Organization
```lookml
view: customer {
  set: customer_contact {
    fields: [customer_email_address, customer_phone_number]
  }
}
```

## Your Final Challenge

Create a comprehensive view that demonstrates advanced features:
- Multiple dimensions with descriptions
- A hidden field
- Value formatting
- Conditional logic
- A set for organization

## Example Structure

```lookml
view: customer {
  set: customer_info {
    fields: [customer_name, customer_email, customer_status]
  }
  
  dimension: customer_name {
    type: string
    sql: ${TABLE}.customer_name ;;
    description: "The full name of the customer"
    label: "Customer Name"
  }
  
  dimension: customer_email {
    type: string
    sql: ${TABLE}.email ;;
    description: "The email address of the customer"
  }
  
  dimension: internal_id {
    type: number
    sql: ${TABLE}.id ;;
    hidden: yes
  }
  
  dimension: customer_status {
    type: string
    sql: CASE 
      WHEN ${TABLE}.total_orders > 10 THEN 'VIP'
      WHEN ${TABLE}.total_orders > 5 THEN 'Regular'
      ELSE 'New'
    END ;;
    description: "Customer tier based on order count"
  }
  
  measure: total_revenue {
    type: sum
    sql: ${TABLE}.revenue ;;
    value_format: "$#,##0.00"
    description: "Total revenue from this customer"
  }
}
```

## Try It!

Write a comprehensive view that includes:
1. Multiple dimensions with descriptions
2. A hidden field
3. Value formatting on a measure
4. Conditional logic in a dimension
5. A set for organization
6. Proper LookML syntax

Click "Run" to validate your code!

---

**Congratulations!** You've completed the LookML learning series. You now have a solid foundation in LookML modeling and are ready to build powerful data models in Looker. 