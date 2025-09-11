import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ExecutionTrace, ExecutionStep } from '../types';
import { executionTraces } from '../data/traces';

interface ExecutionContextType {
  currentTrace: ExecutionTrace | null;
  currentStep: number;
  isPlaying: boolean;
  isLoading: boolean;
  playbackSpeed: number;
  loadTrace: (problemId: string) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setStep: (step: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  getCurrentStep: () => ExecutionStep | null;
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const useExecution = () => {
  const context = useContext(ExecutionContext);
  if (context === undefined) {
    throw new Error('useExecution must be used within an ExecutionProvider');
  }
  return context;
};

export const ExecutionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrace, setCurrentTrace] = useState<ExecutionTrace | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const loadTrace = useCallback((problemId: string) => {
    setIsLoading(true);
    setIsPlaying(false);
    
    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const trace = executionTraces[problemId];
      if (trace) {
        setCurrentTrace(trace);
        setCurrentStep(0);
      } else {
        console.warn(`No execution trace found for problem: ${problemId}`);
        setCurrentTrace(null);
      }
      setIsLoading(false);
    }, 800);
  }, [intervalId]);

  const play = useCallback(() => {
    if (!currentTrace || isPlaying || currentStep >= currentTrace.steps.length - 1) return;
    
    setIsPlaying(true);
    const interval = 1000 / playbackSpeed; // Adjust speed
    
    const id = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= currentTrace.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, interval);
    
    setIntervalId(id);
  }, [currentTrace, isPlaying, currentStep, playbackSpeed]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const stepForward = useCallback(() => {
    if (!currentTrace) return;
    pause();
    setCurrentStep(prev => Math.min(prev + 1, currentTrace.steps.length - 1));
  }, [currentTrace, pause]);

  const stepBackward = useCallback(() => {
    pause();
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, [pause]);

  const reset = useCallback(() => {
    pause();
    setCurrentStep(0);
  }, [pause]);

  const setStep = useCallback((step: number) => {
    if (!currentTrace) return;
    pause();
    setCurrentStep(Math.max(0, Math.min(step, currentTrace.steps.length - 1)));
  }, [currentTrace, pause]);

  const getCurrentStep = useCallback((): ExecutionStep | null => {
    if (!currentTrace || currentStep >= currentTrace.steps.length) return null;
    return currentTrace.steps[currentStep];
  }, [currentTrace, currentStep]);

  // Auto-pause when reaching the end
  useEffect(() => {
    if (currentTrace && currentStep >= currentTrace.steps.length - 1) {
      pause();
    }
  }, [currentStep, currentTrace, pause]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <ExecutionContext.Provider value={{
      currentTrace,
      currentStep,
      isPlaying,
      isLoading,
      playbackSpeed,
      loadTrace,
      play,
      pause,
      stepForward,
      stepBackward,
      reset,
      setStep,
      setPlaybackSpeed,
      getCurrentStep
    }}>
      {children}
    </ExecutionContext.Provider>
  );
};
