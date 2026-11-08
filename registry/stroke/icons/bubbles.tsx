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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.031 15.969C11.3198 15.74 10 14.274 10 12.5C10 10.567 11.567 9 13.5 9C15.274 9 16.7397 10.32 16.9689 12.031M16.9689 12.031C17.1431 12.011 17.3203 12 17.5 12C19.9853 12 22 14.015 22 16.5C22 18.985 19.9853 21 17.5 21C15.0147 21 13 18.985 13 16.5C13 16.32 13.0105 16.143 13.031 15.969C13.2733 13.908 14.9081 12.273 16.9689 12.031ZM9 5.5C9 4.119 7.8807 3 6.5 3C5.1193 3 4 4.119 4 5.5C4 6.881 5.1193 8 6.5 8C7.8807 8 9 6.881 9 5.5ZM6 14C6 12.895 5.1046 12 4 12C2.8954 12 2 12.895 2 14C2 15.105 2.8954 16 4 16C5.1046 16 6 15.105 6 14Z"/>
    </svg>
  )
}
