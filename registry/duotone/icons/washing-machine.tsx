import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WashingMachine({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1L17 1C19.2092 1 21 2.7908 21 5L21 19C21 21.2092 19.2092 23 17 23L7 23C4.7908 23 3 21.2092 3 19L3 5C3 2.7908 4.7908 1 7 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 14C17 16.7614 14.7614 19 12 19C9.2386 19 7 16.7614 7 14C7 11.2386 9.2386 9 12 9C14.7614 9 17 11.2386 17 14Z" fill="currentColor" stroke="none"/>
      <path d="M12 6L16 6" fill="none"/>
      <path d="M9 6C9 6.5523 8.5523 7 8 7C7.4477 7 7 6.5523 7 6C7 5.4477 7.4477 5 8 5C8.5523 5 9 5.4477 9 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
