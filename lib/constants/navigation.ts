import { Icons } from "@/components/icons";

export type NavigationItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  description?: string;
  disabled?: boolean;
};

export const navigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "home",
    description: "Return to home page"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
    description: "Manage your settings"
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: "docs",
    description: "View documentation"
  },
  {
    title: "Prompts",
    href: "/prompts",
    icon: "prompt",
    description: "Manage and organize your AI prompts"
  }
] as const; 