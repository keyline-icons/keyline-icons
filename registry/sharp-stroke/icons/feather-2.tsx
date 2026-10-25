import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Feather2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 22L4 21C4 19.8 4.2919 18.7366 4.5109 17.5453M4.5109 17.5453C5.5566 11.8125 8.4823 3.0471 19.1444 3L20 3.0838L19.9948 3.8963C19.3251 9.7234 9.5166 10.7285 14.5144 10.3551C20.8834 9.8792 12.8956 16.7176 4.5109 17.5453Z" fill="none"/>
    </svg>
  )
}
