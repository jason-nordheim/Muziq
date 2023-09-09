"use client";

import { Root, Track, Range } from "@radix-ui/react-slider";
import { FC } from "react";

const VolumeSlider: FC<{ value?: number; onChange: (value: number) => void }> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <Root
      className="relative flex items-center w-full h-10 select-none touch-none"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <Track className="relative rounded-full bg-neutral-600 grow h-[3px]">
        <Range className="absolute h-full bg-white rounded-full" />
      </Track>
    </Root>
  );
};

export default VolumeSlider;
