import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBoxOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L3 3M21 21L15 21M9 21L3 21L3 15M15 3L21 3L21 9" strokeOpacity="0.4"/>
      <path d="M12 12L13 12L13 17C13 17.3444 12.8228 17.6646 12.5309 17.8474C12.2391 18.0303 11.8737 18.0501 11.5638 17.8998L6.5638 15.4759C6.219 15.3088 6 14.9593 6 14.5761L6 9.4239C6 9.0407 6.219 8.6911 6.5639 8.524L8.1966 7.7328L8.9605 9.3091L12.458 11.1111ZM12.8113 6.282L17.4362 8.5241C17.781 8.6912 18 9.0407 18 9.4239L18 12.3431L16 12.3431L16 10.0504L11.9389 8.0816Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
