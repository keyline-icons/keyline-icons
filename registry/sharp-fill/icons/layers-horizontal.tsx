import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LayersHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 1C7.865 1 8.2 1.199 8.376 1.519L13.876 11.519C14.041 11.818 14.041 12.182 13.876 12.481L8.376 22.481C8.2 22.801 7.865 23 7.5 23C7.135 23 6.8 22.801 6.624 22.481L1.124 12.481C0.959 12.182 0.959 11.818 1.124 11.519L6.624 1.519L6.697 1.404C6.884 1.152 7.181 1 7.5 1Z" fill="currentColor" stroke="none"/>
      <path d="M11.715 1.482L12 2L17.5 12L12 22L11.715 22.518M16.215 1.482L16.5 2L22 12L16.5 22L16.215 22.518"/>
    </svg>
  )
}
