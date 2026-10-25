import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShipOff({ size = 24, ...props }: IconProps) {
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
      <path d="M7 11.3L7 7M7.2083 20.6226L6.5521 20C4.6068 18.1541 3.6017 15.268 4.1928 12.6255C6.1025 11.6215 8.1036 10.6599 10.2269 10.2269M18.6107 18.6107C18.2762 19.1162 17.8863 19.584 17.4479 20L17.2447 20.1928M1.485 20.0623L2 20.3479C4.3679 21.6637 7.179 20.7413 9.5 19.8407C11.671 18.7159 14.2704 18.7635 16.4239 19.8595C17.8386 20.4846 19.3637 20.8993 20.9132 20.9132M9.6569 5L15 5L17 5L17 11.3M12 5L12 2M15.6876 10.7585C17.1117 11.2519 18.4815 11.9285 19.8072 12.6255C20.0074 13.5369 20.0214 14.475 19.8741 15.389M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
