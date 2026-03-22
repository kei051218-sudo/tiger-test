import Head from "next/head";
import { useState, useCallback } from "react";
import type { AppState } from "@/lib/data";
import {
  META, ONBOARDING, QUESTIONS, TIGER_TYPES, OFFERINGS, calcTigerType
} from "@/lib/data";
import MainScreen from "@/components/MainScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import TestScreen from "@/components/TestScreen";
import OfferingScreen from "@/components/OfferingScreen";
import ResultScreen from "@/components/ResultScreen";

const INITIAL_STATE: AppState = {
  screen: "main",
  onboardStep: 0,
  currentQ: 0,
  answers: [],
  tigerType: null,
  offering: null,
};

export default function Home() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const goTo = useCallback((screen: AppState["screen"]) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const startOnboarding = useCallback(() => {
    setState((s) => ({ ...s, screen: "onboarding", onboardStep: 0 }));
  }, []);

  const nextOnboard = useCallback(() => {
    setState((s) => {
      if (s.onboardStep < ONBOARDING.length - 1) {
        return { ...s, onboardStep: s.onboardStep + 1 };
      }
      return { ...s, screen: "test", currentQ: 0, answers: [] };
    });
  }, []);

  const answerQuestion = useCallback((type: number) => {
    setState((s) => {
      const newAnswers = [...s.answers, { qId: s.currentQ + 1, type }];
      if (s.currentQ < QUESTIONS.length - 1) {
        return { ...s, answers: newAnswers, currentQ: s.currentQ + 1 };
      }
      const tigerType = calcTigerType(newAnswers);
      return { ...s, answers: newAnswers, tigerType, screen: "offering" };
    });
  }, []);

  const selectOffering = useCallback((id: number) => {
    setState((s) => ({ ...s, offering: id, screen: "result" }));
  }, []);

  const restart = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return (
    <>
      <Head>
        <title>{META.title} | 카마 〈세심굿 - 응공이야기〉</title>
        <meta name="description" content={META.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.subtitle} />
        <meta name="theme-color" content="#1a1410" />
      </Head>

      {state.screen === "main" && (
        <MainScreen onStart={startOnboarding} />
      )}
      {state.screen === "onboarding" && (
        <OnboardingScreen
          step={state.onboardStep}
          onNext={nextOnboard}
        />
      )}
      {state.screen === "test" && (
        <TestScreen
          currentQ={state.currentQ}
          onAnswer={answerQuestion}
        />
      )}
      {state.screen === "offering" && state.tigerType && (
        <OfferingScreen
          tigerType={state.tigerType}
          onSelect={selectOffering}
        />
      )}
      {state.screen === "result" && state.tigerType && state.offering && (
        <ResultScreen
          tigerType={state.tigerType}
          offering={state.offering}
          onRestart={restart}
        />
      )}
    </>
  );
}
