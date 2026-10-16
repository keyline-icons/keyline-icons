import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClockArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 12.5523 22.5523 13 22 13H16C14.3431 13 13 14.3431 13 16V22C13 22.5523 12.5523 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12M12 6V12H17M22 19H16M19 22L16 19L19 16"/>
    </svg>
  )
}
