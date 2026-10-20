import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanUser({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L3 3L9 3M15 3L21 3L21 9M21 15L21 21L15 21M9 21L3 21L3 15" fill="none" strokeOpacity="0.4"/>
      <path d="M14.5 7.5C14.5 8.8807 13.3807 10 12 10C10.6193 10 9.5 8.8807 9.5 7.5C9.5 6.1193 10.6193 5 12 5C13.3807 5 14.5 6.1193 14.5 7.5ZM8 12L16 12C16.5523 12 17 12.4477 17 13L17 17C17 17.5523 16.5523 18 16 18L8 18C7.4477 18 7 17.5523 7 17L7 13C7 12.4477 7.4477 12 8 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
