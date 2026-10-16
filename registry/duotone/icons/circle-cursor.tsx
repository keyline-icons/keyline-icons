import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.3877 17.1457L7.52471 8.16244C7.39855 7.76656 7.77689 7.39543 8.1725 7.52702L17.1515 10.5135C17.5987 10.6623 17.6212 11.2838 17.1859 11.4643L13.4526 13.0116C13.3352 13.0602 13.2403 13.1508 13.1865 13.2654L11.3359 17.2071C11.1392 17.6262 10.5282 17.5866 10.3877 17.1457Z"/>
    </svg>
  )
}
