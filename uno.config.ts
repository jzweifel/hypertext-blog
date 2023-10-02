import transformerVarientGroup from "@unocss/transformer-variant-group";
import { defineConfig, presetIcons, presetWebFonts, presetWind } from "unocss";

export default defineConfig({
  cli: {
    entry: {
      patterns: ["src/**/*.{ts,tsx}"],
      outFile: "public/dist/unocss.css",
    },
  },
  presets: [
    presetWind(),
    presetIcons(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: ["Lexend Mega"],
      },
    }),
  ],
  theme: {
    colors: {
      ["very-blue"]: "#1e19e3",
      ["dreamy-purple"]: "#61609c",
      ["is-it-grey"]: "#5f5e9d",
      ["almost-white"]: "#feffff",
    },
  },
  rules: [
    [
      /^bg-color-(.*)$/,
      ([, c], { theme }) => {
        console.log(c);
        //   console.log(theme.colors);
        if (c && theme.colors[c])
          return { ["background-color"]: theme.colors[c] };
      },
    ],
    [
      /^border-color-(.*)$/,
      ([, c], { theme }) => {
        if (c && theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
    [
      /^color-(.*)$/,
      ([, c], { theme }) => {
        if (c && theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
    ["brutal-shadow", { ["box-shadow"]: "0.5rem 0.5rem black" }],
  ],
  transformers: [transformerVarientGroup()],
});
