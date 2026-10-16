import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 14C22 16.2091 20.2091 18 18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 6C2 3.7909 3.7909 2 6 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12.4596 7.3123L12.9704 8.5043C13.0716 8.7404 13.2596 8.9284 13.4957 9.0296L14.6877 9.5404C15.0917 9.7136 15.0917 10.2864 14.6877 10.4596L13.4957 10.9704C13.2596 11.0716 13.0716 11.2596 12.9704 11.4957L12.4596 12.6877C12.2864 13.0917 11.7136 13.0917 11.5404 12.6877L11.0296 11.4957C10.9284 11.2596 10.7404 11.0716 10.5043 10.9704L9.3123 10.4596C8.9083 10.2864 8.9083 9.7136 9.3123 9.5404L10.5043 9.0296C10.7404 8.9284 10.9284 8.7404 11.0296 8.5043L11.5404 7.3123C11.7136 6.9083 12.2864 6.9083 12.4596 7.3123Z"/>
    </svg>
  )
}
