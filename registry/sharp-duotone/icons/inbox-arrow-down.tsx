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
      <path d="M21 13L21 12.4356L17.75 7.1361L19.455 6.0905L22.8525 11.6306C22.9489 11.7879 23 11.9689 23 12.1534L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 12.1534C1 11.9689 1.0511 11.7879 1.1475 11.6306L4.545 6.0905L6.25 7.1361L3 12.4356L3 13L8 13L10 16L14 16L16 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 13L8 13L10 16L14 16L16 13L23 13M12 3L12 11M8.7071 7.7071L12 11L15.2929 7.7071"/>
    </svg>
  )
}
