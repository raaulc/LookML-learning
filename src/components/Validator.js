// Mini LookML Parser for syntax validation
class LookMLParser {
  constructor(code) {
    this.code = code;
    this.tokens = [];
    this.current = 0;
  }

  parse() {
    try {
      this.tokenize();
      this.validateStructure();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  tokenize() {
    const lines = this.code.split('\n');
    for (let line of lines) {
      line = line.trim();
      if (line === '' || line.startsWith('#')) continue;
      
      // Match LookML patterns
      const patterns = [
        { regex: /^view:\s*(\w+)/, type: 'VIEW_DECLARATION' },
        { regex: /^dimension:\s*(\w+)/, type: 'DIMENSION_DECLARATION' },
        { regex: /^measure:\s*(\w+)/, type: 'MEASURE_DECLARATION' },
        { regex: /^type:\s*(\w+)/, type: 'TYPE_DECLARATION' },
        { regex: /^sql:\s*(.+);;/, type: 'SQL_DECLARATION' },
        { regex: /^explore:\s*(\w+)/, type: 'EXPLORE_DECLARATION' },
        { regex: /^join:\s*(\w+)/, type: 'JOIN_DECLARATION' },
        { regex: /^parameter:\s*(\w+)/, type: 'PARAMETER_DECLARATION' },
        { regex: /^filter:\s*(\w+)/, type: 'FILTER_DECLARATION' },
        { regex: /^set:\s*(\w+)/, type: 'SET_DECLARATION' },
        { regex: /^include:\s*["']([^"']+)["']/, type: 'INCLUDE_DECLARATION' },
        { regex: /^extends:\s*\[([^\]]+)\]/, type: 'EXTENDS_DECLARATION' },
        { regex: /^access_filter:/, type: 'ACCESS_FILTER_DECLARATION' },
        { regex: /^sql_always_where:/, type: 'SQL_ALWAYS_WHERE_DECLARATION' },
        { regex: /^dashboard:\s*(\w+)/, type: 'DASHBOARD_DECLARATION' },
        { regex: /^element:\s*(\w+)/, type: 'ELEMENT_DECLARATION' },
        { regex: /^connection:\s*["']([^"']+)["']/, type: 'CONNECTION_DECLARATION' },
        { regex: /^table_calculation:\s*(\w+)/, type: 'TABLE_CALCULATION_DECLARATION' },
        { regex: /^filters:\s*\[([^\]]+)\]/, type: 'FILTERS_DECLARATION' },
        { regex: /^timeframes:\s*\[([^\]]+)\]/, type: 'TIMEFRAMES_DECLARATION' },
        { regex: /^description:\s*["']([^"']+)["']/, type: 'DESCRIPTION_DECLARATION' },
        { regex: /^label:\s*["']([^"']+)["']/, type: 'LABEL_DECLARATION' },
        { regex: /^hidden:\s*(yes|no)/, type: 'HIDDEN_DECLARATION' },
        { regex: /^value_format:\s*["']([^"']+)["']/, type: 'VALUE_FORMAT_DECLARATION' },
        { regex: /^list_field:\s*(true|false)/, type: 'LIST_FIELD_DECLARATION' },
        { regex: /^relationship:\s*(\w+)/, type: 'RELATIONSHIP_DECLARATION' },
        { regex: /^sql_on:\s*(.+);;/, type: 'SQL_ON_DECLARATION' },
        { regex: /^from:\s*(\w+)/, type: 'FROM_DECLARATION' },
        { regex: /^field:\s*(\w+)/, type: 'FIELD_DECLARATION' },
        { regex: /^formula:\s*(.+)/, type: 'FORMULA_DECLARATION' },
        { regex: /^user_attribute:\s*(\w+)/, type: 'USER_ATTRIBUTE_DECLARATION' },
        { regex: /^position:\s*\{/, type: 'POSITION_DECLARATION' },
        { regex: /^title:\s*["']([^"']+)["']/, type: 'TITLE_DECLARATION' },
        { regex: /^look:\s*(\w+)/, type: 'LOOK_DECLARATION' }
      ];

      let matched = false;
      for (const pattern of patterns) {
        const match = line.match(pattern.regex);
        if (match) {
          this.tokens.push({
            type: pattern.type,
            value: match[1] || match[0],
            line: line
          });
          matched = true;
          break;
        }
      }

      if (!matched && line.trim() !== '' && !line.startsWith('#')) {
        // Check for basic structure
        if (line.includes('{') || line.includes('}') || line.includes(';;')) {
          this.tokens.push({ type: 'STRUCTURE', value: line, line: line });
        }
      }
    }
  }

  validateStructure() {
    let braceCount = 0;
    let inBlock = false;

    for (const token of this.tokens) {
      switch (token.type) {
        case 'VIEW_DECLARATION':
        case 'EXPLORE_DECLARATION':
        case 'DASHBOARD_DECLARATION':
          if (inBlock) {
            throw new Error(`Nested block declaration found: ${token.value}`);
          }
          inBlock = true;
          break;

        case 'DIMENSION_DECLARATION':
        case 'MEASURE_DECLARATION':
        case 'PARAMETER_DECLARATION':
        case 'FILTER_DECLARATION':
        case 'SET_DECLARATION':
        case 'ELEMENT_DECLARATION':
          if (!inBlock) {
            throw new Error(`${token.type} must be inside a view, explore, or dashboard block`);
          }
          break;

        case 'STRUCTURE':
          if (token.line.includes('{')) braceCount++;
          if (token.line.includes('}')) braceCount--;
          if (braceCount < 0) {
            throw new Error('Unmatched closing brace');
          }
          break;

        default:
          // Handle unexpected token types
          throw new Error(`Unexpected token type: ${token.type}`);
      }
    }

    if (braceCount !== 0) {
      throw new Error('Unmatched braces');
    }

    if (this.tokens.length === 0) {
      throw new Error('No valid LookML code found');
    }
  }
}

class Validator {
  // Lesson-specific validation rules
  static lessonRules = {
    1: {
      title: "Lesson 1 - What is LookML?",
      starterCode: `view: user {
  dimension: id {
    type: number
    sql: \${TABLE}.id ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'type:', 'sql:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasType: true,
          hasSql: true,
          hasCurlyBraces: true,
          hasSemicolons: true
        },
        hint: "Your code must include a view declaration, at least one dimension with type and SQL definition, curly braces, and double semicolons."
      }
    },
    2: {
      title: "Lesson 2 - Views and Fields",
      starterCode: `view: product {
  dimension: name {
    type: string
    sql: \${TABLE}.product_name ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'type:', 'sql:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasType: true,
          hasSql: true
        },
        hint: "Create a view with at least one dimension that includes type and SQL definition."
      }
    },
    3: {
      title: "Lesson 3 - Dimensions and Types",
      starterCode: `view: customer {
  dimension: name {
    type: string
    sql: \${TABLE}.customer_name ;;
  }
  
  dimension: age {
    type: number
    sql: \${TABLE}.customer_age ;;
  }
  
  dimension: signup_date {
    type: date
    sql: \${TABLE}.signup_date ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'type:'],
        structure: {
          hasView: true,
          hasMultipleDimensions: true,
          hasStringType: true,
          hasNumberType: true,
          hasDateType: true
        },
        hint: "Create a view with at least three dimensions of different types (string, number, date)."
      }
    },
    4: {
      title: "Lesson 4 - Measures and Aggregates",
      starterCode: `view: sales {
  dimension: product_name {
    type: string
    sql: \${TABLE}.product_name ;;
  }
  
  dimension: sale_date {
    type: date
    sql: \${TABLE}.sale_date ;;
  }
  
  measure: count {
    type: count
    sql: \${TABLE}.id ;;
  }
  
  measure: total_revenue {
    type: sum
    sql: \${TABLE}.revenue ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'measure:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasMeasure: true,
          hasCountMeasure: true,
          hasSumMeasure: true
        },
        hint: "Create a view with at least one dimension and one measure (count or sum)."
      }
    },
    5: {
      title: "Lesson 5 - SQL and LookML",
      starterCode: `view: customer {
  dimension: name {
    type: string
    sql: \${TABLE}.customer_name ;;
  }
  
  dimension: upper_name {
    type: string
    sql: UPPER(\${TABLE}.customer_name) ;;
  }
  
  dimension: tier {
    type: string
    sql: CASE 
      WHEN \${TABLE}.spend > 1000 THEN 'Premium'
      ELSE 'Standard'
    END ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'sql:', 'UPPER', 'CASE'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasSqlFunction: true,
          hasCaseStatement: true
        },
        hint: "Create a view with dimensions that use SQL functions (like UPPER) and CASE statements."
      }
    },
    6: {
      title: "Lesson 6 - Explores",
      starterCode: `explore: orders {
  from: orders
  join: customers {
    relationship: many_to_one
    sql_on: \${orders.customer_id} = \${customers.id} ;;
  }
}`,
      validate: {
        required: ['explore:', 'from:', 'join:', 'relationship:', 'sql_on:'],
        structure: {
          hasExplore: true,
          hasFrom: true,
          hasJoin: true,
          hasRelationship: true,
          hasSqlOn: true
        },
        hint: "Create an explore with a from clause and a join with relationship and sql_on."
      }
    },
    7: {
      title: "Lesson 7 - Filters and Parameters",
      starterCode: `view: sales {
  dimension: amount {
    type: number
    sql: \${TABLE}.amount ;;
  }
  
  parameter: min_amount {
    type: number
    default_value: 0
  }
  
  filter: amount_filter {
    type: number
    sql: \${TABLE}.amount >= {% parameter min_amount %} ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'parameter:', 'filter:', '{% parameter'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasParameter: true,
          hasFilter: true,
          hasParameterReference: true
        },
        hint: "Create a view with a dimension, parameter, and filter that uses the parameter."
      }
    },
    8: {
      title: "Lesson 8 - Sets and List Fields",
      starterCode: `view: product {
  set: product_info {
    fields: [name, category, price]
  }
  
  dimension: name {
    type: string
    sql: \${TABLE}.product_name ;;
  }
  
  dimension: category {
    type: string
    sql: \${TABLE}.category ;;
  }
  
  dimension: price {
    type: number
    sql: \${TABLE}.price ;;
  }
  
  dimension: tags {
    type: string
    sql: \${TABLE}.tags ;;
    list_field: true
  }
}`,
      validate: {
        required: ['view:', 'set:', 'dimension:', 'list_field:'],
        structure: {
          hasView: true,
          hasSet: true,
          hasDimension: true,
          hasListField: true
        },
        hint: "Create a view with a set, multiple dimensions, and a list field dimension."
      }
    },
    9: {
      title: "Lesson 9 - Timeframes and Date Functions",
      starterCode: `view: events {
  dimension: event_date {
    type: date
    sql: \${TABLE}.created_at ;;
    timeframes: [date, week, month, quarter, year]
  }
  
  dimension: event_month {
    type: date
    sql: DATE_TRUNC('month', \${TABLE}.created_at) ;;
  }
  
  dimension: event_year {
    type: number
    sql: EXTRACT(YEAR FROM \${TABLE}.created_at) ;;
  }
  
  dimension: days_ago {
    type: number
    sql: DATEDIFF(CURRENT_DATE, \${TABLE}.created_at) ;;
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'timeframes:', 'DATE_TRUNC', 'EXTRACT', 'DATEDIFF'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasTimeframes: true,
          hasDateFunction: true
        },
        hint: "Create a view with date dimensions that use timeframes and date functions."
      }
    },
    10: {
      title: "Lesson 10 - Advanced LookML Features",
      starterCode: `view: customer {
  set: customer_info {
    fields: [customer_name, customer_email, customer_status]
  }
  
  dimension: customer_name {
    type: string
    sql: \${TABLE}.customer_name ;;
    description: "The full name of the customer"
    label: "Customer Name"
  }
  
  dimension: customer_email {
    type: string
    sql: \${TABLE}.email ;;
    description: "The email address of the customer"
  }
  
  dimension: internal_id {
    type: number
    sql: \${TABLE}.id ;;
    hidden: yes
  }
  
  dimension: customer_status {
    type: string
    sql: CASE 
      WHEN \${TABLE}.total_orders > 10 THEN 'VIP'
      WHEN \${TABLE}.total_orders > 5 THEN 'Regular'
      ELSE 'New'
    END ;;
    description: "Customer tier based on order count"
  }
  
  measure: total_revenue {
    type: sum
    sql: \${TABLE}.revenue ;;
    value_format: "$#,##0.00"
    description: "Total revenue from this customer"
  }
}`,
      validate: {
        required: ['view:', 'set:', 'dimension:', 'measure:', 'description:', 'hidden:', 'value_format:', 'CASE'],
        structure: {
          hasView: true,
          hasSet: true,
          hasDimension: true,
          hasMeasure: true,
          hasDescription: true,
          hasHidden: true,
          hasValueFormat: true,
          hasConditionalLogic: true
        },
        hint: "Create a comprehensive view with sets, descriptions, hidden fields, value formatting, and conditional logic."
      }
    },
    11: {
      title: "Lesson 11 - Reusing Code with include",
      starterCode: `include: "shared_dimensions.view"

view: orders {
  dimension: order_amount {
    type: number
    sql: \${TABLE}.amount ;;
  }
}`,
      validate: {
        required: ['include:', 'view:', 'dimension:'],
        structure: {
          hasInclude: true,
          hasView: true,
          hasDimension: true
        },
        hint: "Create a view that includes a shared file and adds at least one new dimension."
      }
    },
    12: {
      title: "Lesson 12 - extends for Views",
      starterCode: `view: base_user {
  dimension: id {
    type: number
    sql: \${TABLE}.id ;;
  }
  
  dimension: email {
    type: string
    sql: \${TABLE}.email ;;
  }
}

view: active_user {
  extends: [base_user]
  
  dimension: last_login {
    type: date
    sql: \${TABLE}.last_login_at ;;
  }
}`,
      validate: {
        required: ['view:', 'extends:', 'dimension:'],
        structure: {
          hasView: true,
          hasExtends: true,
          hasDimension: true
        },
        hint: "Create a base view and a child view that extends it with additional dimensions."
      }
    },
    13: {
      title: "Lesson 13 - Custom Fields",
      starterCode: `view: customer {
  dimension: full_name {
    type: string
    sql: CONCAT(\${first_name}, ' ', \${last_name}) ;;
  }
  
  measure: active_users {
    type: count
    filters: [status: "active"]
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'measure:', 'CONCAT', 'filters:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasMeasure: true,
          hasSqlFunction: true,
          hasFilters: true
        },
        hint: "Create custom dimensions with calculations and measures with filters."
      }
    },
    14: {
      title: "Lesson 14 - Table Calculations",
      starterCode: `# Table calculations would be created in the UI
# This represents the concept

table_calculation: running_total {
  type: running_total
  field: sales_amount
}

table_calculation: profit_margin {
  type: custom
  formula: (\${revenue} - \${cost}) / \${revenue} * 100
}`,
      validate: {
        required: ['table_calculation:', 'type:', 'field:', 'formula:'],
        structure: {
          hasTableCalculation: true,
          hasType: true,
          hasField: true,
          hasFormula: true
        },
        hint: "Create table calculations with different types and custom formulas."
      }
    },
    15: {
      title: "Lesson 15 - access_filter",
      starterCode: `view: orders {
  dimension: id {
    type: number
    sql: \${TABLE}.id ;;
  }
  
  dimension: user_id {
    type: number
    sql: \${TABLE}.user_id ;;
  }
  
  access_filter: {
    field: user_id
    user_attribute: user_id
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'access_filter:', 'field:', 'user_attribute:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasAccessFilter: true,
          hasField: true,
          hasUserAttribute: true
        },
        hint: "Create a view with access filtering based on user attributes."
      }
    },
    16: {
      title: "Lesson 16 - always_filter, sql_always_where",
      starterCode: `view: orders {
  dimension: id {
    type: number
    sql: \${TABLE}.id ;;
  }
  
  dimension: status {
    type: string
    sql: \${TABLE}.status ;;
  }
  
  sql_always_where: \${TABLE}.deleted_at IS NULL
}`,
      validate: {
        required: ['view:', 'dimension:', 'sql_always_where:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasSqlAlwaysWhere: true
        },
        hint: "Create a view with sql_always_where to enforce data quality rules."
      }
    },
    17: {
      title: "Lesson 17 - Exploring Parameters",
      starterCode: `view: orders {
  dimension: id {
    type: number
    sql: \${TABLE}.id ;;
  }
  
  parameter: status_filter {
    type: string
    default_value: "active"
    allowed_value: [
      { value: "active" }
      { value: "pending" }
    ]
  }
  
  dimension: filtered_status {
    type: string
    sql: \${TABLE}.status ;;
    filters: [status: "{% parameter status_filter %}"]
  }
}`,
      validate: {
        required: ['view:', 'parameter:', 'dimension:', 'filters:', '{% parameter'],
        structure: {
          hasView: true,
          hasParameter: true,
          hasDimension: true,
          hasFilters: true,
          hasParameterReference: true
        },
        hint: "Create a view with parameters and use them in filtered dimensions."
      }
    },
    18: {
      title: "Lesson 18 - Measures from Dimensions",
      starterCode: `view: sales {
  dimension: amount {
    type: number
    sql: \${TABLE}.amount ;;
  }
  
  dimension: region {
    type: string
    sql: \${TABLE}.region ;;
  }
  
  measure: total_sales {
    type: sum
    sql: \${amount} ;;
  }
  
  measure: us_sales {
    type: sum
    sql: \${amount} ;;
    filters: [region: "US"]
  }
}`,
      validate: {
        required: ['view:', 'dimension:', 'measure:', 'filters:'],
        structure: {
          hasView: true,
          hasDimension: true,
          hasMeasure: true,
          hasFilters: true
        },
        hint: "Create measures derived from dimensions with and without filters."
      }
    },
    19: {
      title: "Lesson 19 - Exploring LookML Dashboards",
      starterCode: `dashboard: sales_overview {
  title: "Sales Overview Dashboard"
  
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
}`,
      validate: {
        required: ['dashboard:', 'title:', 'element:', 'type:', 'position:'],
        structure: {
          hasDashboard: true,
          hasTitle: true,
          hasElement: true,
          hasType: true,
          hasPosition: true
        },
        hint: "Create a LookML dashboard with elements and proper positioning."
      }
    },
    20: {
      title: "Lesson 20 - Deploying with Git",
      starterCode: `# This represents a Git workflow for LookML
# models/sales.model.lkml
connection: "warehouse"

include: "views/*.view.lkml"

explore: sales {
  from: orders
  join: customers {
    sql_on: \${orders.customer_id} = \${customers.id} ;;
    relationship: many_to_one
  }
}

# views/orders.view.lkml
view: orders {
  sql_table_name: public.orders ;;
  
  dimension: id {
    type: number
    sql: \${TABLE}.id ;;
  }
  
  measure: total_sales {
    type: sum
    sql: \${amount} ;;
  }
}`,
      validate: {
        required: ['connection:', 'include:', 'explore:', 'view:', 'dimension:', 'measure:'],
        structure: {
          hasConnection: true,
          hasInclude: true,
          hasExplore: true,
          hasView: true,
          hasDimension: true,
          hasMeasure: true
        },
        hint: "Create a proper LookML file structure with models, includes, explores, and views."
      }
    }
  };

  static validate(code, lessonNumber = 1) {
    const rules = this.lessonRules[lessonNumber];
    if (!rules) {
      return {
        success: false,
        message: `Lesson ${lessonNumber} validation rules not found.`
      };
    }

    const lowerCode = code.toLowerCase();
    const validation = rules.validate;
    const errors = [];

    // Enhanced validation with mini parser
    const parser = new LookMLParser(code);
    const parseResult = parser.parse();
    
    if (!parseResult.success) {
      errors.push(`Syntax Error: ${parseResult.error}`);
    }

    // Check required keywords
    if (validation.required) {
      for (const keyword of validation.required) {
        if (!lowerCode.includes(keyword.toLowerCase())) {
          errors.push(`Missing required keyword: ${keyword}`);
        }
      }
    }

    // Check structure requirements
    if (validation.structure) {
      const structure = validation.structure;
      
      if (structure.hasView && !lowerCode.includes('view:')) {
        errors.push('Missing view declaration');
      }
      
      if (structure.hasDimension && !lowerCode.includes('dimension:')) {
        errors.push('Missing dimension declaration');
      }
      
      if (structure.hasMeasure && !lowerCode.includes('measure:')) {
        errors.push('Missing measure declaration');
      }
      
      if (structure.hasType && !lowerCode.includes('type:')) {
        errors.push('Missing type declaration');
      }
      
      if (structure.hasSql && !lowerCode.includes('sql:')) {
        errors.push('Missing SQL definition');
      }
      
      if (structure.hasCurlyBraces && (!code.includes('{') || !code.includes('}'))) {
        errors.push('Missing curly braces');
      }
      
      if (structure.hasSemicolons && !code.includes(';;')) {
        errors.push('Missing double semicolons');
      }
      
      if (structure.hasMultipleDimensions) {
        const dimensionMatches = code.match(/dimension:/g);
        if (!dimensionMatches || dimensionMatches.length < 3) {
          errors.push('Need at least 3 dimensions');
        }
      }
      
      if (structure.hasStringType && !lowerCode.includes('type: string')) {
        errors.push('Missing string type dimension');
      }
      
      if (structure.hasNumberType && !lowerCode.includes('type: number')) {
        errors.push('Missing number type dimension');
      }
      
      if (structure.hasDateType && !lowerCode.includes('type: date')) {
        errors.push('Missing date type dimension');
      }
      
      if (structure.hasCountMeasure && !lowerCode.includes('type: count')) {
        errors.push('Missing count measure');
      }
      
      if (structure.hasSumMeasure && !lowerCode.includes('type: sum')) {
        errors.push('Missing sum measure');
      }
      
      if (structure.hasSqlFunction && !lowerCode.includes('upper(') && !lowerCode.includes('lower(')) {
        errors.push('Missing SQL function (like UPPER or LOWER)');
      }
      
      if (structure.hasCaseStatement && !lowerCode.includes('case')) {
        errors.push('Missing CASE statement');
      }
      
      if (structure.hasExplore && !lowerCode.includes('explore:')) {
        errors.push('Missing explore declaration');
      }
      
      if (structure.hasFrom && !lowerCode.includes('from:')) {
        errors.push('Missing from clause');
      }
      
      if (structure.hasJoin && !lowerCode.includes('join:')) {
        errors.push('Missing join clause');
      }
      
      if (structure.hasRelationship && !lowerCode.includes('relationship:')) {
        errors.push('Missing relationship declaration');
      }
      
      if (structure.hasSqlOn && !lowerCode.includes('sql_on:')) {
        errors.push('Missing sql_on clause');
      }
      
      if (structure.hasParameter && !lowerCode.includes('parameter:')) {
        errors.push('Missing parameter declaration');
      }
      
      if (structure.hasFilter && !lowerCode.includes('filter:')) {
        errors.push('Missing filter declaration');
      }
      
      if (structure.hasParameterReference && !code.includes('{% parameter')) {
        errors.push('Missing parameter reference');
      }
      
      if (structure.hasSet && !lowerCode.includes('set:')) {
        errors.push('Missing set declaration');
      }
      
      if (structure.hasListField && !lowerCode.includes('list_field:')) {
        errors.push('Missing list_field declaration');
      }
      
      if (structure.hasTimeframes && !lowerCode.includes('timeframes:')) {
        errors.push('Missing timeframes declaration');
      }
      
      if (structure.hasDateFunction && !lowerCode.includes('date_trunc') && !lowerCode.includes('extract') && !lowerCode.includes('datediff')) {
        errors.push('Missing date function (like DATE_TRUNC, EXTRACT, or DATEDIFF)');
      }
      
      if (structure.hasDescription && !lowerCode.includes('description:')) {
        errors.push('Missing description');
      }
      
      if (structure.hasHidden && !lowerCode.includes('hidden:')) {
        errors.push('Missing hidden field');
      }
      
      if (structure.hasValueFormat && !lowerCode.includes('value_format:')) {
        errors.push('Missing value_format');
      }
      
      if (structure.hasConditionalLogic && !lowerCode.includes('case')) {
        errors.push('Missing conditional logic (CASE statement)');
      }
      
      if (structure.hasInclude && !lowerCode.includes('include:')) {
        errors.push('Missing include statement');
      }
      
      if (structure.hasExtends && !lowerCode.includes('extends:')) {
        errors.push('Missing extends statement');
      }
      
      if (structure.hasTableCalculation && !lowerCode.includes('table_calculation:')) {
        errors.push('Missing table calculation');
      }
      
      if (structure.hasField && !lowerCode.includes('field:')) {
        errors.push('Missing field declaration');
      }
      
      if (structure.hasFormula && !lowerCode.includes('formula:')) {
        errors.push('Missing formula declaration');
      }
      
      if (structure.hasAccessFilter && !lowerCode.includes('access_filter:')) {
        errors.push('Missing access_filter declaration');
      }
      
      if (structure.hasUserAttribute && !lowerCode.includes('user_attribute:')) {
        errors.push('Missing user_attribute declaration');
      }
      
      if (structure.hasSqlAlwaysWhere && !lowerCode.includes('sql_always_where:')) {
        errors.push('Missing sql_always_where declaration');
      }
      
      if (structure.hasDashboard && !lowerCode.includes('dashboard:')) {
        errors.push('Missing dashboard declaration');
      }
      
      if (structure.hasTitle && !lowerCode.includes('title:')) {
        errors.push('Missing title declaration');
      }
      
      if (structure.hasElement && !lowerCode.includes('element:')) {
        errors.push('Missing element declaration');
      }
      
      if (structure.hasPosition && !code.includes('position:')) {
        errors.push('Missing position declaration');
      }
      
      if (structure.hasConnection && !lowerCode.includes('connection:')) {
        errors.push('Missing connection declaration');
      }
    }

    // Enhanced field name validation
    const fieldValidation = this.validateFieldNames(code, lessonNumber);
    if (!fieldValidation.success) {
      errors.push(fieldValidation.error);
    }

    // Lesson-specific advanced validation
    const advancedValidation = this.validateLessonSpecific(code, lessonNumber);
    if (!advancedValidation.success) {
      errors.push(advancedValidation.error);
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: errors.join('. ') + '. ' + (validation.hint || '')
      };
    }

    return {
      success: true,
      message: `Great job! You've successfully completed ${rules.title}.`
    };
  }

  static validateFieldNames(code, lessonNumber) {
    const fieldPatterns = {
      1: { required: ['user'], optional: ['id'] },
      2: { required: ['product'], optional: ['name'] },
      3: { required: ['customer'], optional: ['name', 'age', 'signup_date'] },
      4: { required: ['sales'], optional: ['product_name', 'sale_date', 'count', 'total_revenue'] },
      5: { required: ['customer'], optional: ['name', 'upper_name', 'tier'] },
      6: { required: ['orders'], optional: ['customers'] },
      7: { required: ['sales'], optional: ['amount', 'amount_filter', 'min_amount'] },
      8: { required: ['product'], optional: ['name', 'category', 'price', 'tags', 'product_info'] },
      9: { required: ['events'], optional: ['event_date', 'event_month', 'event_year', 'days_ago'] },
      10: { required: ['customer'], optional: ['customer_name', 'customer_email', 'internal_id', 'customer_status', 'total_revenue', 'customer_info'] },
      11: { required: ['orders'], optional: ['order_amount'] },
      12: { required: ['base_user', 'active_user'], optional: ['id', 'email', 'last_login'] },
      13: { required: ['customer'], optional: ['full_name', 'active_users'] },
      14: { required: [], optional: ['running_total', 'profit_margin', 'sales_amount', 'revenue', 'cost'] },
      15: { required: ['orders'], optional: ['id', 'user_id'] },
      16: { required: ['orders'], optional: ['id', 'status'] },
      17: { required: ['orders'], optional: ['id', 'status_filter', 'filtered_status'] },
      18: { required: ['sales'], optional: ['amount', 'region', 'total_sales', 'us_sales'] },
      19: { required: ['sales_overview'], optional: ['total_sales_chart'] },
      20: { required: ['sales'], optional: ['orders', 'customers', 'id', 'total_sales'] }
    };

    const patterns = fieldPatterns[lessonNumber];
    if (!patterns) return { success: true };

    const viewMatches = code.match(/view:\s*(\w+)/g);
    const dimensionMatches = code.match(/dimension:\s*(\w+)/g);
    const measureMatches = code.match(/measure:\s*(\w+)/g);

    const foundFields = [];
    if (viewMatches) {
      viewMatches.forEach(match => {
        const fieldName = match.replace('view:', '').trim();
        foundFields.push(fieldName);
      });
    }
    if (dimensionMatches) {
      dimensionMatches.forEach(match => {
        const fieldName = match.replace('dimension:', '').trim();
        foundFields.push(fieldName);
      });
    }
    if (measureMatches) {
      measureMatches.forEach(match => {
        const fieldName = match.replace('measure:', '').trim();
        foundFields.push(fieldName);
      });
    }

    // Check required fields
    for (const required of patterns.required) {
      if (!foundFields.some(field => field.includes(required))) {
        return {
          success: false,
          error: `Missing required field name containing '${required}'`
        };
      }
    }

    return { success: true };
  }

  static validateLessonSpecific(code, lessonNumber) {
    const specificTests = {
      1: () => {
        // Lesson 1: Basic view with dimension
        const hasView = /view:\s*\w+/.test(code);
        const hasDimension = /dimension:\s*\w+/.test(code);
        const hasType = /type:\s*\w+/.test(code);
        const hasSql = /sql:\s*.+;;/.test(code);
        const hasBraces = code.includes('{') && code.includes('}');
        
        if (!hasView || !hasDimension || !hasType || !hasSql || !hasBraces) {
          return { success: false, error: 'Lesson 1 requires a complete view with dimension, type, SQL, and braces' };
        }
        return { success: true };
      },
      2: () => {
        // Lesson 2: Views and fields
        const hasView = /view:\s*\w+/.test(code);
        const hasDimension = /dimension:\s*\w+/.test(code);
        const hasType = /type:\s*string/.test(code);
        
        if (!hasView || !hasDimension || !hasType) {
          return { success: false, error: 'Lesson 2 requires a view with string dimension' };
        }
        return { success: true };
      },
      3: () => {
        // Lesson 3: Multiple dimensions with different types
        const dimensionCount = (code.match(/dimension:/g) || []).length;
        const hasString = /type:\s*string/.test(code);
        const hasNumber = /type:\s*number/.test(code);
        const hasDate = /type:\s*date/.test(code);
        
        if (dimensionCount < 3 || !hasString || !hasNumber || !hasDate) {
          return { success: false, error: 'Lesson 3 requires at least 3 dimensions with string, number, and date types' };
        }
        return { success: true };
      },
      4: () => {
        // Lesson 4: Measures and aggregates
        const hasDimension = /dimension:/g.test(code);
        const hasMeasure = /measure:/g.test(code);
        const hasCount = /type:\s*count/.test(code);
        const hasSum = /type:\s*sum/.test(code);
        
        if (!hasDimension || !hasMeasure || (!hasCount && !hasSum)) {
          return { success: false, error: 'Lesson 4 requires dimensions and measures (count or sum)' };
        }
        return { success: true };
      },
      5: () => {
        // Lesson 5: SQL functions and CASE statements
        const hasSqlFunction = /UPPER\(|LOWER\(|DATE_TRUNC\(|EXTRACT\(/.test(code.toUpperCase());
        const hasCase = /CASE\s+WHEN/.test(code.toUpperCase());
        
        if (!hasSqlFunction || !hasCase) {
          return { success: false, error: 'Lesson 5 requires SQL functions (UPPER, LOWER, etc.) and CASE statements' };
        }
        return { success: true };
      },
      6: () => {
        // Lesson 6: Explores and joins
        const hasExplore = /explore:/g.test(code);
        const hasJoin = /join:/g.test(code);
        const hasRelationship = /relationship:/g.test(code);
        const hasSqlOn = /sql_on:/g.test(code);
        
        if (!hasExplore || !hasJoin || !hasRelationship || !hasSqlOn) {
          return { success: false, error: 'Lesson 6 requires explore with join, relationship, and sql_on' };
        }
        return { success: true };
      },
      7: () => {
        // Lesson 7: Parameters and filters
        const hasParameter = /parameter:/g.test(code);
        const hasFilter = /filter:/g.test(code);
        const hasParameterRef = /{%\s*parameter/.test(code);
        
        if (!hasParameter || !hasFilter || !hasParameterRef) {
          return { success: false, error: 'Lesson 7 requires parameter, filter, and parameter reference' };
        }
        return { success: true };
      },
      8: () => {
        // Lesson 8: Sets and list fields
        const hasSet = /set:/g.test(code);
        const hasListField = /list_field:/g.test(code);
        
        if (!hasSet || !hasListField) {
          return { success: false, error: 'Lesson 8 requires set and list_field declarations' };
        }
        return { success: true };
      },
      9: () => {
        // Lesson 9: Timeframes and date functions
        const hasTimeframes = /timeframes:/g.test(code);
        const hasDateFunction = /DATE_TRUNC\(|EXTRACT\(|DATEDIFF\(/.test(code.toUpperCase());
        
        if (!hasTimeframes || !hasDateFunction) {
          return { success: false, error: 'Lesson 9 requires timeframes and date functions' };
        }
        return { success: true };
      },
      10: () => {
        // Lesson 10: Advanced features
        const hasSet = /set:/g.test(code);
        const hasDescription = /description:/g.test(code);
        const hasHidden = /hidden:/g.test(code);
        const hasValueFormat = /value_format:/g.test(code);
        const hasCase = /CASE\s+WHEN/.test(code.toUpperCase());
        
        if (!hasSet || !hasDescription || !hasHidden || !hasValueFormat || !hasCase) {
          return { success: false, error: 'Lesson 10 requires set, description, hidden, value_format, and CASE statement' };
        }
        return { success: true };
      },
      11: () => {
        // Lesson 11: Include statements
        const hasInclude = /include:/g.test(code);
        const hasView = /view:/g.test(code);
        
        if (!hasInclude || !hasView) {
          return { success: false, error: 'Lesson 11 requires include statement and view' };
        }
        return { success: true };
      },
      12: () => {
        // Lesson 12: Extends
        const hasExtends = /extends:/g.test(code);
        const viewCount = (code.match(/view:/g) || []).length;
        
        if (!hasExtends || viewCount < 2) {
          return { success: false, error: 'Lesson 12 requires extends and at least 2 views' };
        }
        return { success: true };
      },
      13: () => {
        // Lesson 13: Custom fields
        const hasSqlFunction = /CONCAT\(|UPPER\(|LOWER\(/.test(code.toUpperCase());
        const hasFilters = /filters:/g.test(code);
        
        if (!hasSqlFunction || !hasFilters) {
          return { success: false, error: 'Lesson 13 requires SQL functions and filters' };
        }
        return { success: true };
      },
      14: () => {
        // Lesson 14: Table calculations
        const hasTableCalc = /table_calculation:/g.test(code);
        const hasType = /type:/g.test(code);
        const hasField = /field:/g.test(code);
        const hasFormula = /formula:/g.test(code);
        
        if (!hasTableCalc || !hasType || (!hasField && !hasFormula)) {
          return { success: false, error: 'Lesson 14 requires table_calculation with type and field/formula' };
        }
        return { success: true };
      },
      15: () => {
        // Lesson 15: Access filters
        const hasAccessFilter = /access_filter:/g.test(code);
        const hasField = /field:/g.test(code);
        const hasUserAttribute = /user_attribute:/g.test(code);
        
        if (!hasAccessFilter || !hasField || !hasUserAttribute) {
          return { success: false, error: 'Lesson 15 requires access_filter with field and user_attribute' };
        }
        return { success: true };
      },
      16: () => {
        // Lesson 16: Always filters
        const hasSqlAlwaysWhere = /sql_always_where:/g.test(code);
        
        if (!hasSqlAlwaysWhere) {
          return { success: false, error: 'Lesson 16 requires sql_always_where' };
        }
        return { success: true };
      },
      17: () => {
        // Lesson 17: Parameters
        const hasParameter = /parameter:/g.test(code);
        const hasParameterRef = /{%\s*parameter/.test(code);
        const hasFilters = /filters:/g.test(code);
        
        if (!hasParameter || !hasParameterRef || !hasFilters) {
          return { success: false, error: 'Lesson 17 requires parameter, parameter reference, and filters' };
        }
        return { success: true };
      },
      18: () => {
        // Lesson 18: Measures from dimensions
        const hasDimension = /dimension:/g.test(code);
        const hasMeasure = /measure:/g.test(code);
        const hasFilters = /filters:/g.test(code);
        
        if (!hasDimension || !hasMeasure || !hasFilters) {
          return { success: false, error: 'Lesson 18 requires dimensions, measures, and filters' };
        }
        return { success: true };
      },
      19: () => {
        // Lesson 19: Dashboards
        const hasDashboard = /dashboard:/g.test(code);
        const hasTitle = /title:/g.test(code);
        const hasElement = /element:/g.test(code);
        const hasPosition = /position:/g.test(code);
        
        if (!hasDashboard || !hasTitle || !hasElement || !hasPosition) {
          return { success: false, error: 'Lesson 19 requires dashboard with title, element, and position' };
        }
        return { success: true };
      },
      20: () => {
        // Lesson 20: Git deployment structure
        const hasConnection = /connection:/g.test(code);
        const hasInclude = /include:/g.test(code);
        const hasExplore = /explore:/g.test(code);
        const hasView = /view:/g.test(code);
        
        if (!hasConnection || !hasInclude || !hasExplore || !hasView) {
          return { success: false, error: 'Lesson 20 requires connection, include, explore, and view' };
        }
        return { success: true };
      }
    };

    const test = specificTests[lessonNumber];
    if (test) {
      return test();
    }
    
    return { success: true };
  }

  static getStarterCode(lessonNumber = 1) {
    const rules = this.lessonRules[lessonNumber];
    return rules ? rules.starterCode : '';
  }

  static getLessonTitle(lessonNumber = 1) {
    const rules = this.lessonRules[lessonNumber];
    return rules ? rules.title : `Lesson ${lessonNumber}`;
  }
}

export default Validator;