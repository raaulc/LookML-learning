# Lesson 6: Explores

Explores are the entry points for users in Looker. They define how views are joined together and which fields are available for analysis. Think of explores as the "queries" that users can build.

## What are Explores?

Explores combine views to create a data model that users can query. They define:
- Which views to include
- How views are joined together
- Which fields are available
- Default filters and sorts

## Basic Explore Structure

```lookml
explore: sales {
  from: sales
  join: customers {
    relationship: many_to_one
    sql_on: ${sales.customer_id} = ${customers.id} ;;
  }
}
```

## Explore Components

### From Clause
```lookml
explore: sales {
  from: sales
}
```

### Joins
```lookml
explore: sales {
  from: sales
  join: customers {
    relationship: many_to_one
    sql_on: ${sales.customer_id} = ${customers.id} ;;
  }
}
```

### Field Selection
```lookml
explore: sales {
  from: sales
  fields: [sales.customer_name, sales.amount, customers.email]
}
```

## Your Challenge

Create an explore that joins two views together. Include:
- A primary view (from clause)
- A joined view with proper relationship
- Join condition using SQL

## Example Structure

```lookml
explore: orders {
  from: orders
  join: customers {
    relationship: many_to_one
    sql_on: ${orders.customer_id} = ${customers.id} ;;
  }
}
```

## Try It!

Write an explore that includes:
1. A primary view in the from clause
2. A joined view with relationship
3. Proper join condition
4. Correct LookML syntax

Click "Run" to validate your code! 