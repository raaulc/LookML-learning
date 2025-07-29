# Lesson 8: Sets and List Fields

Sets and list fields allow you to group related dimensions together and create more organized, user-friendly data models.

## What are Sets?

Sets group related dimensions together. They help organize your model and make it easier for users to find related fields.

## Set Structure

```lookml
view: customer {
  set: customer_info {
    fields: [name, email, phone, address]
  }
  
  dimension: name {
    type: string
    sql: ${TABLE}.customer_name ;;
  }
  
  dimension: email {
    type: string
    sql: ${TABLE}.email ;;
  }
}
```

## List Fields

List fields create comma-separated lists of values. They're useful for displaying multiple related values in a single field.

### Basic List Field
```lookml
dimension: tags {
  type: string
  sql: ${TABLE}.tags ;;
  list_field: true
}
```

### List Field with Delimiter
```lookml
dimension: categories {
  type: string
  sql: ${TABLE}.categories ;;
  list_field: true
  list_delimiter: ","
}
```

## Your Challenge

Create a view with sets and list fields. Include:
- A set that groups related dimensions
- A list field dimension
- Multiple dimensions of different types

## Example Structure

```lookml
view: product {
  set: product_info {
    fields: [name, category, price]
  }
  
  dimension: name {
    type: string
    sql: ${TABLE}.product_name ;;
  }
  
  dimension: category {
    type: string
    sql: ${TABLE}.category ;;
  }
  
  dimension: price {
    type: number
    sql: ${TABLE}.price ;;
  }
  
  dimension: tags {
    type: string
    sql: ${TABLE}.tags ;;
    list_field: true
  }
}
```

## Try It!

Write a view that includes:
1. A set with multiple fields
2. At least one list field dimension
3. Multiple dimensions of different types
4. Proper LookML syntax

Click "Run" to validate your code! 