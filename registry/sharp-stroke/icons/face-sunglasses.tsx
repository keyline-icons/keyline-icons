import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceSunglasses({ size = 24, ...props }: IconProps) {
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
      <path d="M3.3397 7C5.1261 3.906 8.4273 2 12 2C15.5727 2 18.8739 3.906 20.6603 7M21.9843 11.4406C21.9948 11.6268 22 11.8134 22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 11.8134 2.0052 11.6268 2.0157 11.4406M2 7L10 7L10 12L2 12ZM14 7L22 7L22 12L14 12ZM10 8L14 8M8.7071 15.7071L9 16C10 17 11 17.5 12 17.5C13 17.5 14 17 15 16L15.2929 15.7071"/>
    </svg>
  )
}
