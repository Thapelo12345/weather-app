// MainContext.tsx
"use client"
import { createContext } from "react";
export type LoadingContextType = {load: boolean;};
export const LoadingContext = createContext<LoadingContextType>({load: false});
