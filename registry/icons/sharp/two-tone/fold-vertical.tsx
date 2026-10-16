import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FoldVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M4 12L20 12" fill="none" strokeOpacity="0.4"/>
      <path d="M12 1L12 8M8.7071 4.7071L12 8L15.2929 4.7071M12 23L12 16M8.7071 19.2929L12 16L15.2929 19.2929" fill="none"/>
    </svg>
  )
}
