import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnRightLine({ size = 24, ...props }: IconProps) {
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
      <path d="M14 19L12 19C9.2386 19 7 16.7614 7 14C7 11.2386 9.2386 9 12 9L20 9M16 5L20.8123 8.6096C21.0625 8.8097 21.0625 9.1903 20.8123 9.3904L16 13M3 4L3 20" fill="none"/>
    </svg>
  )
}
