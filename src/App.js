import React, { useState, useEffect } from 'react';
import LessonLoader from './components/LessonLoader';
import EditorPane from './components/EditorPane';
import Validator from './components/Validator';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [code, setCode] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  // Load starter code when lesson changes
  useEffect(() => {
    const starterCode = Validator.getStarterCode(currentLesson);
    setCode(starterCode);
    setValidationResult(null);
  }, [currentLesson]);

  const handleRunValidation = () => {
    const result = Validator.validate(code, currentLesson);
    setValidationResult(result);
  };

  const handleNextLesson = () => {
    if (currentLesson < 20) {
      setCurrentLesson(prev => prev + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">LookML Code Camp</h1>
              <div className="text-sm text-gray-500">
                {Validator.getLessonTitle(currentLesson)}
              </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Left Pane - Lesson Content */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6 h-full overflow-y-auto">
              <ErrorBoundary>
                <LessonLoader lessonNumber={currentLesson} />
              </ErrorBoundary>
            </div>
          </div>

          {/* Right Pane - Code Editor */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
            <div className="flex-1">
              <ErrorBoundary>
                <EditorPane 
                  code={code} 
                  onCodeChange={setCode}
                />
              </ErrorBoundary>
            </div>
            
            {/* Bottom Controls */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleRunValidation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Run
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handlePreviousLesson}
                    disabled={currentLesson <= 1}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextLesson}
                    disabled={currentLesson >= 20}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Lesson
                  </button>
                </div>
              </div>
              
              {/* Feedback Area */}
              {validationResult && (
                <div className={`mt-4 p-3 rounded-md ${
                  validationResult.success 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      validationResult.success ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium">
                      {validationResult.success ? 'Success!' : 'Try Again'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">
                    {validationResult.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 