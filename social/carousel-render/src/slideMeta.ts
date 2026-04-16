import { z } from "zod";

export const SLIDE_EXPORT_NAMES = [
  "carousel-01-hook",
  "carousel-02-five",
  "carousel-03-xhigh",
  "carousel-04-tokenizer",
  "carousel-05-adaptive",
  "carousel-06-scaffolding",
  "carousel-07-hung-ui",
  "carousel-08-task-budgets",
  "carousel-09-claude-code",
  "carousel-10-cta",
] as const;

export const SlideIndexSchema = z.number().int().min(1).max(10);

export type SlideIndex = z.infer<typeof SlideIndexSchema>;
