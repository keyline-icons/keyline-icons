import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineInwardVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V22M7.8707 12.26L2.392 15.96C2.2183 16.08 2 15.93 2 15.7V8.3C2 8.07 2.2183 7.92 2.392 8.04L7.8707 11.74C8.0431 11.86 8.0431 12.14 7.8707 12.26ZM16.1293 12.26L21.608 15.96C21.7818 16.08 22 15.93 22 15.7V8.3C22 8.07 21.7818 7.92 21.608 8.04L16.1293 11.74C15.9569 11.86 15.9569 12.14 16.1293 12.26Z"/>
    </svg>
  )
}
