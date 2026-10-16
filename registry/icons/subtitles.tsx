import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Subtitles({ size = 24, ...props }: IconProps) {
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
      <path d="M5 4H19C20.65685 4 22 5.34315 22 7V17C22 18.65685 20.65685 20 19 20H5C3.34315 20 2 18.65685 2 17V7C2 5.34315 3.34315 4 5 4ZM6 10H8M12 10H18M6 14H12M16 14H18"/>
    </svg>
  )
}
