import React, { useCallback, useRef, useEffect, useState } from 'react';

const EditorPane = ({ code, onCodeChange }) => {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleEditorChange = useCallback((event) => {
    const value = event.target.value;
    onCodeChange(value);
  }, [onCodeChange]);

  // Token-based syntax highlighting function
  const highlightSyntax = (text) => {
    if (!text) return '';

    // Define token patterns in order of priority
    const patterns = [
      // Comments (highest priority)
      { regex: /#.*$/gm, className: 'comment' },
      
      // Strings (both single and double quotes)
      { regex: /(["'])((?:(?!\1)[^\\]|\\.)*)\1/g, className: 'string' },
      
      // SQL table references and variables
      { regex: /\$\{[^}]+\}/g, className: 'sql' },
      { regex: /\$\{TABLE\}\.[^;]+;;/g, className: 'sql' },
      
      // Parameter references
      { regex: /\{%\s*parameter[^%]+%\}/g, className: 'parameter' },
      
      // SQL functions
      { regex: /\b(UPPER|LOWER|DATE_TRUNC|EXTRACT|DATEDIFF|CURRENT_DATE)\b/gi, className: 'function' },
      
      // Keywords (LookML specific)
      { regex: /\b(view|dimension|measure|type|sql|explore|join|from|relationship|sql_on|parameter|filter|set|list_field|timeframes|description|label|hidden|value_format|default_value|fields|CASE|WHEN|THEN|ELSE|END)\b/gi, className: 'keyword' },
      
      // Types
      { regex: /\b(string|number|date|time|timestamp|count|sum|average|yes|no)\b/gi, className: 'type' },
      
      // Braces and operators
      { regex: /[{}]/g, className: 'brace' },
      { regex: /[;:]/g, className: 'operator' }
    ];

    // Create a map of character positions to their token class
    const tokenMap = new Map();
    
    // Process each pattern
    patterns.forEach(({ regex, className }) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        for (let i = match.index; i < match.index + match[0].length; i++) {
          // Only set if not already set (priority order)
          if (!tokenMap.has(i)) {
            tokenMap.set(i, className);
          }
        }
      }
    });

    // Build the highlighted HTML
    let result = '';
    let currentClass = null;
    let currentText = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charClass = tokenMap.get(i);

      if (charClass !== currentClass) {
        // Flush current text
        if (currentText) {
          if (currentClass) {
            result += `<span class="${currentClass}">${currentText}</span>`;
          } else {
            result += currentText;
          }
        }
        
        // Start new segment
        currentClass = charClass;
        currentText = char;
      } else {
        currentText += char;
      }
    }

    // Flush remaining text
    if (currentText) {
      if (currentClass) {
        result += `<span class="${currentClass}">${currentText}</span>`;
      } else {
        result += currentText;
      }
    }

    return result;
  };

  // Update highlighting when code changes
  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.innerHTML = highlightSyntax(code);
    }
  }, [code]);

  // Sync scroll between textarea and highlight overlay
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Handle tab key for indentation
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onCodeChange(newCode);
      
      // Set cursor position after the inserted tabs
      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Auto-indent on Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const start = event.target.selectionStart;
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const currentLine = code.substring(lineStart, start);
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      
      // Add extra indent if line ends with {
      const extraIndent = currentLine.trim().endsWith('{') ? '  ' : '';
      const newIndent = currentIndent + extraIndent;
      
      const newCode = code.substring(0, start) + '\n' + newIndent + code.substring(start);
      onCodeChange(newCode);
      
      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd = start + 1 + newIndent.length;
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
        LookML Editor
      </div>
      
      {/* Editor container with overlay */}
      <div className="flex-1 relative bg-gray-900 overflow-hidden">
        {/* Syntax highlighted overlay */}
        <div 
          ref={highlightRef}
          className="absolute inset-0 p-4 font-mono text-sm leading-relaxed pointer-events-none whitespace-pre-wrap overflow-auto"
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineHeight: '1.5',
            tabSize: 2,
            color: '#d1d5db',
            backgroundColor: 'transparent'
          }}
        />
        
        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleEditorChange}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          onScroll={handleScroll}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 bg-transparent text-transparent caret-white p-4 font-mono text-sm resize-none border-0 outline-none"
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineHeight: '1.5',
            tabSize: 2,
            color: isFocused ? 'transparent' : '#d1d5db'
          }}
          spellCheck={false}
          placeholder="Write your LookML code here..."
        />
      </div>

      {/* CSS for syntax highlighting */}
      <style jsx>{`
        .keyword {
          color: #60a5fa !important;
          font-weight: 600;
        }
        .type {
          color: #f59e0b !important;
          font-weight: 500;
        }
        .string {
          color: #10b981 !important;
        }
        .comment {
          color: #6b7280 !important;
          font-style: italic;
        }
        .brace {
          color: #f3f4f6 !important;
          font-weight: 600;
        }
        .operator {
          color: #d1d5db !important;
          font-weight: 500;
        }
        .sql {
          color: #8b5cf6 !important;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-weight: 500;
        }
        .function {
          color: #06b6d4 !important;
          font-weight: 500;
        }
        .parameter {
          color: #ec4899 !important;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default EditorPane; 