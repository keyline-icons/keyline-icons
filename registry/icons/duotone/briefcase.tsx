import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Briefcase({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5.5L19 5.5C21.2091 5.5 23 7.2909 23 9.5L23 18C23 20.2091 21.2091 22 19 22L5 22C2.7909 22 1 20.2091 1 18L1 9.5C1 7.2909 2.7909 5.5 5 5.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.25 6C8.25 4.3431 9.5931 3 11.25 3L12.75 3C14.4069 3 15.75 4.3431 15.75 6M2 10.5C6 12.75 18 12.75 22 10.5M9.5 12.1132L9.5 13.5C9.5 14.6046 10.3954 15.5 11.5 15.5L12.5 15.5C13.6046 15.5 14.5 14.6046 14.5 13.5L14.5 12.1132"/>
    </svg>
  )
}
