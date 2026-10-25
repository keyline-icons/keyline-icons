import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flashlight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 17C1.4477 17 1 16.5523 1 16L1 8C1 7.4477 1.4477 7 2 7L9.7639 7C11.0792 7 12.3764 6.6938 13.5528 6.1056C15.0069 5.3785 16.6103 5 18.2361 5L22 5C22.5523 5 23 5.4477 23 6L23 18C23 18.5523 22.5523 19 22 19L18.2361 19C16.6104 19 15.0069 18.6215 13.5528 17.8944C12.3764 17.3063 11.0792 17 9.7639 17L2 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 12L13 12M17 7L17 17M2 16L9.76393 16C11.2344 16 12.6847 16.3424 14 17C15.3153 17.6576 16.7656 18 18.2361 18L22 18L22 6L18.2361 6C16.7656 6 15.3153 6.34237 14 7C12.6847 7.65763 11.2344 8 9.76393 8L2 8Z" fill="none"/>
    </svg>
  )
}
