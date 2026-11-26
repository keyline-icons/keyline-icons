import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceSleep({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2M7 10C7 10.5523 7.6716 11 8.5 11C9.3284 11 10 10.5523 10 10M14 10C14 10.5523 14.6716 11 15.5 11C16.3284 11 17 10.5523 17 10M9 15C10 16 11 16.5 12 16.5C13 16.5 14 16 15 15" strokeOpacity="0.4"/>
      <path d="M16 2H20.3486C20.8433 2 21.0376 2.6416 20.626 2.916L17.374 5.084C16.9624 5.3584 17.1567 6 17.6514 6H22"/>
    </svg>
  )
}
