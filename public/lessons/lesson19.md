# Lesson 19: Exploring LookML Dashboards

## Summary
Learn how to create and manage dashboards using LookML. LookML dashboards are different from UI-created dashboards and offer programmatic control over dashboard creation and management.

## What are LookML Dashboards?

LookML dashboards are:
- Defined in LookML files
- Version controlled with Git
- Deployed through the development workflow
- Reusable across environments
- Automatically updated with code changes

## Key Differences from UI Dashboards

### LookML Dashboards
- Defined in code
- Version controlled
- Automated deployment
- Consistent across environments
- Part of the development workflow

### UI Dashboards
- Created in the Looker interface
- Manual updates required
- Environment-specific
- User-created and managed
- Flexible for ad-hoc analysis

## Code Examples

### Basic LookML Dashboard
```lookml
# dashboard.lkml
dashboard: sales_overview {
  title: "Sales Overview Dashboard"
  
  # Dashboard description
  description: "Comprehensive view of sales performance across regions and time periods"
  
  # Dashboard layout
  layout: grid
  
  # Dashboard elements
  element: total_sales_chart {
    title: "Total Sales by Month"
    type: looker_column
    look: sales_by_month
    position: {
      x: 0
      y: 0
      width: 6
      height: 4
    }
  }
  
  element: regional_breakdown {
    title: "Sales by Region"
    type: looker_pie
    look: regional_sales
    position: {
      x: 6
      y: 0
      width: 6
      height: 4
    }
  }
  
  element: top_products {
    title: "Top Products"
    type: looker_table
    look: product_performance
    position: {
      x: 0
      y: 4
      width: 12
      height: 4
    }
  }
}
```

### Dashboard with Filters
```lookml
dashboard: customer_analytics {
  title: "Customer Analytics Dashboard"
  
  # Dashboard filters
  filter: date_range {
    title: "Date Range"
    type: date_filter
    default_value: "30 days"
  }
  
  filter: region_filter {
    title: "Region"
    type: field_filter
    field: region
    default_value: "All"
  }
  
  # Dashboard elements with filter references
  element: customer_growth {
    title: "Customer Growth"
    type: looker_line
    look: customer_growth_trend
    position: {
      x: 0
      y: 0
      width: 8
      height: 4
    }
    filter: [date_range, region_filter]
  }
  
  element: customer_segments {
    title: "Customer Segments"
    type: looker_pie
    look: segment_breakdown
    position: {
      x: 8
      y: 0
      width: 4
      height: 4
    }
    filter: [date_range]
  }
}
```

### Dashboard with Parameters
```lookml
dashboard: dynamic_analytics {
  title: "Dynamic Analytics Dashboard"
  
  # Dashboard parameters
  parameter: analysis_type {
    title: "Analysis Type"
    type: string
    default_value: "revenue"
    allowed_value: [
      { value: "revenue" }
      { value: "orders" }
      { value: "customers" }
    ]
  }
  
  parameter: time_period {
    title: "Time Period"
    type: string
    default_value: "month"
    allowed_value: [
      { value: "day" }
      { value: "week" }
      { value: "month" }
      { value: "quarter" }
    ]
  }
  
  # Dynamic elements based on parameters
  element: main_chart {
    title: "{% parameter analysis_type %} by {% parameter time_period %}"
    type: looker_column
    look: dynamic_analysis
    position: {
      x: 0
      y: 0
      width: 12
      height: 6
    }
  }
}
```

### Dashboard with Multiple Layouts
```lookml
dashboard: executive_summary {
  title: "Executive Summary Dashboard"
  
  # Mobile layout
  layout: mobile {
    element: kpi_summary {
      title: "KPI Summary"
      type: looker_kpi
      look: key_metrics
      position: {
        x: 0
        y: 0
        width: 12
        height: 2
      }
    }
    
    element: trend_chart {
      title: "Monthly Trends"
      type: looker_line
      look: monthly_trends
      position: {
        x: 0
        y: 2
        width: 12
        height: 4
      }
    }
  }
  
  # Desktop layout
  layout: desktop {
    element: kpi_summary {
      title: "KPI Summary"
      type: looker_kpi
      look: key_metrics
      position: {
        x: 0
        y: 0
        width: 4
        height: 2
      }
    }
    
    element: trend_chart {
      title: "Monthly Trends"
      type: looker_line
      look: monthly_trends
      position: {
        x: 4
        y: 0
        width: 8
        height: 4
      }
    }
  }
}
```

## Instructions

1. Create a new `.lkml` file for your dashboard
2. Define the dashboard structure with elements
3. Add filters and parameters as needed
4. Configure layout and positioning
5. Deploy through the development workflow

## Run Challenge

Create a LookML dashboard. Your code should:
- Define a dashboard with a title and description
- Include at least 2 dashboard elements
- Use proper positioning and layout
- Include at least 1 filter or parameter
- Use correct LookML dashboard syntax

## Hint

LookML dashboards are powerful for creating consistent, version-controlled dashboards. They're especially useful for standard reports that need to be deployed across multiple environments. Remember that the looks referenced in dashboard elements must exist in your Looker instance. 