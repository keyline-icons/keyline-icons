import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V22M2.1293 12.26L7.608 15.96C7.7818 16.08 8 15.93 8 15.7V8.3C8 8.07 7.7818 7.92 7.608 8.04L2.1293 11.74C1.9569 11.86 1.9569 12.14 2.1293 12.26ZM21.8707 12.26L16.392 15.96C16.2182 16.08 16 15.93 16 15.7V8.3C16 8.07 16.2182 7.92 16.392 8.04L21.8707 11.74C22.0431 11.86 22.0431 12.14 21.8707 12.26Z"/>
    </svg>
  )
}
