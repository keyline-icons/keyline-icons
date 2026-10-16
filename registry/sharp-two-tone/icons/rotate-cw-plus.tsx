import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCwPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M20.5727 9.0828L20.7883 10.0593C20.929 10.6966 21 11.3473 21 12C21 16.9706 16.9706 21 12 21C7.0294 21 3 16.9706 3 12C3 7.0294 7.0294 3 12 3C14.4831 3 16.8559 4.0259 18.5568 5.8349L19.0133 6.3204M19.8369 2.1414L19.2001 6.5999L14.7414 5.9631" strokeOpacity="0.4"/>
      <path d="M7 12L17 12M12 7L12 17"/>
    </svg>
  )
}
