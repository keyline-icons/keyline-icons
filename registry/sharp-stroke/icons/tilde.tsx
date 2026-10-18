import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tilde({ size = 24, ...props }: IconProps) {
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
      <path d="M4.9672 13.9812L5 13.8563C5.5395 11.8015 6.5934 10.4402 7.9162 10.0894C9.239 9.7386 10.7149 10.4291 12 12C13.2851 13.5709 14.761 14.2614 16.0838 13.9106C17.4066 13.5598 18.4605 12.1985 19 10.1437L19.0328 10.0188" fill="none"/>
    </svg>
  )
}
