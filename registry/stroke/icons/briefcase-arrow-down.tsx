import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BriefcaseArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 10L12 14M9 11L12 14L15 11M3 22L21 22M8.5 6L6 6C4.3431 6 3 7.3431 3 9L3 15C3 16.6569 4.3431 18 6 18L18 18C19.6569 18 21 16.6569 21 15L21 9C21 7.3431 19.6569 6 18 6L15.5 6M8.5 6L8.5 5C8.5 3.3431 9.8431 2 11.5 2L12.5 2C14.1569 2 15.5 3.3431 15.5 5L15.5 6M8.5 6L15.5 6" fill="none"/>
    </svg>
  )
}
