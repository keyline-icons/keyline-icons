import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InboxArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M2 13H8L10 16H14L16 13H22V19C22 19.5523 21.552 20 21 20H3C2.448 20 2 19.5523 2 19V13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M18.603 6.6133L22 12.1534V13M22 13V20H2V13M22 13H16L14 16H10L8 13H2M2 13V12.1534L5.398 6.6133M12 3V11M15.293 7.7071L12 11L8.707 7.7071"/>
    </svg>
  )
}
