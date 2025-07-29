import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const LessonLoader = ({ lessonNumber }) => {
  const [lessonContent, setLessonContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/lessons/lesson${lessonNumber}.md`);
        if (!response.ok) {
          throw new Error(`Lesson ${lessonNumber} not found`);
        }
        const content = await response.text();
        setLessonContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-lg font-medium mb-2">
          Lesson Not Found
        </div>
        <p className="text-gray-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            return !inline ? (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
              {children}
            </blockquote>
          ),
        }}
      >
        {lessonContent}
      </ReactMarkdown>
    </div>
  );
};

export default LessonLoader; 