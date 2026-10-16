import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownUp({ size = 24, ...props }: IconProps) {
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
      <path d="M17 22L17 3M12.7071 7.2929L17 3L21.2929 7.2929" fill="none" strokeOpacity="0.4"/>
      <path d="M7 2L7 21M11.2929 16.7071L7 21L2.7071 16.7071" fill="none"/>
    </svg>
  )
}
