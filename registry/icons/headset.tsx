import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Headset({ size = 24, ...props }: IconProps) {
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
      <path d="M4 10C4 8.895431 4.895431 8 6 8L6 8C7.104569 8 8 8.895431 8 10L8 16C8 17.104569 7.104569 18 6 18L6 18C4.895431 18 4 17.104569 4 16ZM16 10C16 8.895431 16.895431 8 18 8L18 8C19.104569 8 20 8.895431 20 10L20 16C20 17.104569 19.104569 18 18 18L18 18C16.895431 18 16 17.104569 16 16ZM4 10C4 5.581722 7.581722 2 12 2C16.418278 2 20 5.581722 20 10M18 18C18 20.209139 16.209139 22 14 22H12"/>
    </svg>
  )
}
