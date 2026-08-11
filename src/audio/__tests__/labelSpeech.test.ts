/**
 * The read-aloud seam must be single-stream and non-evaluative
 * (docs/ux/EMERGENT-READER-SUPPORT.md).
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

import { speakLabel, stopLabel } from "@/audio/labelSpeech";

const cancel = vi.fn();
const speak = vi.fn();

beforeEach(() => {
  cancel.mockClear();
  speak.mockClear();
  vi.stubGlobal("speechSynthesis", { cancel, speak, getVoices: () => [], speaking: false });
  vi.stubGlobal(
    "SpeechSynthesisUtterance",
    class {
      text: string;
      lang = "";
      rate = 1;
      pitch = 1;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    },
  );
});

describe("label read-aloud", () => {
  it("speaks exactly the visible text", () => {
    speakLabel("Seres vivos");
    expect(speak).toHaveBeenCalledTimes(1);
    expect(speak.mock.calls[0]?.[0].text).toBe("Seres vivos");
  });

  it("replaces the previous spoken label instead of stacking", () => {
    speakLabel("a água");
    speakLabel("uma pedra");
    expect(cancel).toHaveBeenCalled();
    expect(speak).toHaveBeenCalledTimes(2);
    expect(speak.mock.calls[1]?.[0].text).toBe("uma pedra");
  });

  it("ignores empty text and can be stopped safely", () => {
    speakLabel("   ");
    expect(speak).not.toHaveBeenCalled();
    expect(() => stopLabel()).not.toThrow();
  });
});
