import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GlobeX({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12L8 12C8 15.5 9.3333 19 12 22L12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12M2 12H22M12 2C14.6667 5 16 8.5 16 12M12 2C9.33333 5 8 8.5 8 12C8 15.5 9.33333 19 12 22M22 16L16 22M16 16L22 22"/>
    </svg>
  )
}
