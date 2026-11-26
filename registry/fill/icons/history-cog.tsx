import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HistoryCog({ size = 24, ...props }: IconProps) {
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
      <path d="M10 21.798C5.3441 20.8476 2 16.7519 2 12C2 8.8524 3.4819 5.8886 6 4M21.798 10C20.8476 5.3441 16.7519 2 12 2C11.666 2 11.3322 2.0167 10.9999 2.0501M12 6V12H7M20.6667 18C20.6667 19.4728 19.4728 20.6667 18 20.6667C16.5272 20.6667 15.3333 19.4728 15.3333 18C15.3333 16.5272 16.5272 15.3333 18 15.3333C19.4728 15.3333 20.6667 16.5272 20.6667 18ZM21.5417 18L22 18M20.5043 20.5043L20.8284 20.8284M18 21.5417L18 22M15.4957 20.5043L15.1716 20.8284M14.4583 18L14 18M15.4957 15.4957L15.1716 15.1716M18 14.4583L18 14M20.5043 15.4957L20.8284 15.1716M3.0454 3L6.0617 3.86C6.3273 3.94 6.4811 4.21 6.4054 4.48L5.5451 7.49"/>
    </svg>
  )
}
