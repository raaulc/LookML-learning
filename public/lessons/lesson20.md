# Lesson 20: Deploying with Git

## Summary
Learn how to deploy LookML changes using Git and the Looker development workflow. This is essential for real-world LookML development and maintaining code quality across environments.

## What is Git Deployment in Looker?

Git deployment in Looker involves:
- Version controlling your LookML code
- Using development branches for changes
- Code review and approval processes
- Automated deployment to production
- Rollback capabilities

## Development Workflow

### 1. Development Environment
- Make changes in a development branch
- Test your LookML changes
- Validate syntax and logic
- Create pull requests for review

### 2. Code Review Process
- Peer review of LookML changes
- Testing in development environment
- Approval from team members
- Documentation updates

### 3. Production Deployment
- Merge approved changes to main branch
- Automated deployment to production
- Validation of deployed changes
- Monitoring for issues

## Code Examples

### Git Configuration
```bash
# Initialize Git repository
git init

# Add LookML files
git add *.lkml

# Commit changes
git commit -m "Add new sales dimensions and measures"

# Create development branch
git checkout -b feature/sales-analytics

# Push to remote repository
git push origin feature/sales-analytics
```

### LookML File Structure
```lookml
# models/sales.model.lkml
connection: "warehouse"

include: "views/*.view.lkml"

explore: sales {
  from: orders
  join: customers {
    sql_on: ${orders.customer_id} = ${customers.id} ;;
    relationship: many_to_one
  }
  join: products {
    sql_on: ${orders.product_id} = ${products.id} ;;
    relationship: many_to_one
  }
}

# views/orders.view.lkml
view: orders {
  sql_table_name: public.orders ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  
  measure: total_sales {
    type: sum
    sql: ${amount} ;;
  }
}
```

### Development Branch Workflow
```bash
# Start new feature
git checkout -b feature/new-dimensions

# Make changes to LookML files
# Edit views/orders.view.lkml

# Test changes in development environment
# Validate LookML syntax

# Commit changes
git add views/orders.view.lkml
git commit -m "Add customer tier dimension and related measures"

# Push to remote
git push origin feature/new-dimensions

# Create pull request
# Request code review
# Address feedback
# Merge to main branch
```

### Deployment Configuration
```yaml
# .github/workflows/lookml-deploy.yml
name: LookML Deployment

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Validate LookML
        run: |
          # Validate LookML syntax
          lookml-validator *.lkml
      
      - name: Deploy to Production
        run: |
          # Deploy to Looker production
          looker-deploy --environment=production
```

### Rollback Process
```bash
# Identify the commit to rollback to
git log --oneline

# Create rollback branch
git checkout -b hotfix/rollback-sales-changes

# Revert to previous commit
git revert HEAD~1

# Deploy rollback
git push origin hotfix/rollback-sales-changes

# Merge rollback to main
git checkout main
git merge hotfix/rollback-sales-changes
git push origin main
```

## Best Practices

### Code Organization
```lookml
# Organize files by feature or domain
models/
  sales.model.lkml
  marketing.model.lkml
  finance.model.lkml

views/
  sales/
    orders.view.lkml
    customers.view.lkml
    products.view.lkml
  marketing/
    campaigns.view.lkml
    events.view.lkml
  shared/
    common_dimensions.view.lkml
    common_measures.view.lkml
```

### Documentation
```lookml
# Add documentation to your LookML
view: orders {
  # View description
  description: "Order data including customer and product information"
  
  dimension: id {
    description: "Unique order identifier"
    type: number
    sql: ${TABLE}.id ;;
  }
  
  dimension: amount {
    description: "Order total amount in USD"
    type: number
    sql: ${TABLE}.amount ;;
  }
}
```

## Instructions

1. Set up Git repository for your LookML project
2. Create development branch for new features
3. Make changes and test in development environment
4. Create pull request for code review
5. Deploy approved changes to production
6. Monitor deployment and validate changes

## Run Challenge

Create a Git workflow for LookML deployment. Your code should:
- Define a proper LookML file structure
- Include at least 1 view with dimensions and measures
- Add documentation to your LookML
- Use proper Git workflow practices
- Include deployment configuration

## Hint

Git deployment ensures code quality and provides a safety net for your LookML changes. Always test in development before deploying to production, and use meaningful commit messages to track changes over time. 