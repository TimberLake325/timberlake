"use server";

import { dbConnect } from "@/lib/db";
import { Config } from "@/lib/model";
import { unstable_cache } from "next/cache";

export interface ThemeModeConfig {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    cardBg: string;
}

export interface ThemeConfig {
    light: ThemeModeConfig;
}

export const getThemeConfig = unstable_cache(
    async () => {
        await dbConnect();
        try {
            const config = await Config.findOne({ key: 'themeConfig' }).lean();

            const DEFAULT_THEME = {
                light: {
                    primary: '#7c3aed',
                    secondary: '#e2e0ff',
                    accent: '#06b6d4',
                    background: '#fafaff',
                    foreground: '#13111c',
                    muted: '#f1f5f9',
                    border: '#e2e8f0',
                    cardBg: '#ffffff',
                }
            };

            if (config && config.value) {
                const val = config.value;
                return {
                    light: {
                        ...DEFAULT_THEME.light,
                        ...(val.light || {})
                    }
                };
            }

            return DEFAULT_THEME;
        } catch (error) {
            console.error("Error fetching theme config:", error);
            return null;
        }
    },
    ['theme-config'],
    { tags: ['theme-config'], revalidate: 3600 }
);
