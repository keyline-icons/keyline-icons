import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bubbles({ size = 24, ...props }: IconProps) {
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
      <path d="M13.031 15.969C11.32 15.74 10 14.274 10 12.5C10 10.567 11.567 9 13.5 9C15.274 9 16.74 10.32 16.969 12.031M16.969 12.031C17.143 12.011 17.32 12 17.5 12C19.985 12 22 14.015 22 16.5C22 18.985 19.985 21 17.5 21C15.015 21 13 18.985 13 16.5C13 16.32 13.011 16.143 13.031 15.969C13.273 13.908 14.908 12.273 16.969 12.031ZM9 5.5C9 4.119 7.881 3 6.5 3C5.119 3 4 4.119 4 5.5C4 6.881 5.119 8 6.5 8C7.881 8 9 6.881 9 5.5ZM6 14C6 12.895 5.105 12 4 12C2.895 12 2 12.895 2 14C2 15.105 2.895 16 4 16C5.105 16 6 15.105 6 14Z"/>
    </svg>
  )
}
