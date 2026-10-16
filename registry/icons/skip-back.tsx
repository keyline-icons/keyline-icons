import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SkipBack({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19 16.9941C19 18.728898 16.942447 19.641025 15.656974 18.476086L9.328487 12.740993C8.890504 12.344078 8.890504 11.655922 9.328487 11.259007L15.656974 5.523914C16.942447 4.358975 19 5.271102 19 7.0059ZM5 5V19"/>
    </svg>
  )
}
