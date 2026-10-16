import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Building({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1H17C19.20914 1 21 2.79086 21 5V19C21 21.20914 19.20914 23 17 23H7C4.79086 23 3 21.20914 3 19V5C3 2.79086 4.79086 1 7 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 22L10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20L14 22M9 6L9 8M15 6L15 8M9 12L9 14M15 12L15 14"/>
    </svg>
  )
}
