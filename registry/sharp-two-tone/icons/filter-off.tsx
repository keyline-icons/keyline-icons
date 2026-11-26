import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FilterOff({ size = 24, ...props }: IconProps) {
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
      <path d="M13 20.618L10.447 21.894C9.782 22.227 9 21.743 9 21V14.657H11L13 16.657V13L15 15V19C15 19.379 14.786 19.725 14.447 19.895L13 20.618ZM5.657 2H21C21.845 2 22.309 2.983 21.772 3.636L15.233 11.576L5.657 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 14V19L10 21V14.657M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
