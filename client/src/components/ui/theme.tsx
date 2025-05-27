import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { originTheme } from '@/lib/realm-themes';

interface ThemeContainerProps {
  children: ReactNode;
  className?: string;
}

export function ThemeContainer({ children, className }: ThemeContainerProps) {
  return (
    <div
      className={cn("min-h-screen", className)}
      style={{
        backgroundColor: originTheme?.colors?.background || "#3E1E00",
        color: originTheme?.colors?.textLight || "#FBF4D2",
        backgroundImage: originTheme?.patterns?.adinkra || 'none'
      }}
    >
      {children}
    </div>
  );
}

interface ThemeCardProps {
  children: ReactNode;
  className?: string;
}

export function ThemeCard({ children, className }: ThemeCardProps) {
  return (
    <div
      className={cn("p-6 rounded-xl shadow-lg", className)}
      style={{
        backgroundColor: originTheme?.colors?.cardBackground || "#FBF4D2",
        color: originTheme?.colors?.textDark || "#3E1E00",
        boxShadow: originTheme?.shadows?.card || 'none'
      }}
    >
      {children}
    </div>
  );
}

interface ThemeHeadingProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ThemeHeading({ children, className, level = 2 }: ThemeHeadingProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const fontSize = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm"
  }[level];
  
  return (
    <HeadingTag
      className={cn(`${fontSize} font-bold`, className)}
      style={{
        color: originTheme?.colors?.primary || "#EE720B"
      }}
    >
      {children}
    </HeadingTag>
  );
}

interface GradientButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function GradientButton({ 
  children, 
  className, 
  type = "button", 
  disabled = false,
  onClick
}: GradientButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full py-3 px-4 rounded-lg font-medium text-white transition-all",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 active:scale-98",
        className
      )}
      style={{
        background: originTheme?.gradients?.sunset || "linear-gradient(to right, #EE720B, #FFC567)",
        boxShadow: originTheme?.shadows?.button || "0 2px 4px rgba(238, 114, 11, 0.3)"
      }}
    >
      {children}
    </button>
  );
}

interface OutlineButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function OutlineButton({ 
  children, 
  className, 
  type = "button", 
  disabled = false,
  onClick
}: OutlineButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full py-3 px-4 rounded-lg font-medium transition-all border-2",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/10 active:scale-98",
        className
      )}
      style={{
        borderColor: originTheme?.colors?.primary || "#EE720B",
        color: originTheme?.colors?.primary || "#EE720B"
      }}
    >
      {children}
    </button>
  );
}