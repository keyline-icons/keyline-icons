import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleJapaneseYen({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.9372 1 23 6.0628 23 12C23 17.9372 17.9372 23 12 23C6.0628 23 1 17.9372 1 12C1 6.0628 6.0628 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.2526 5.7172L8.5 6L12 10L15.5 6L15.7474 5.7172M12 9L12 10L12 18L12 19M7.5 13L8.5 13L15.5 13L16.5 13M7.5 16L8.5 16L15.5 16L16.5 16" fill="none"/>
    </svg>
  )
}
