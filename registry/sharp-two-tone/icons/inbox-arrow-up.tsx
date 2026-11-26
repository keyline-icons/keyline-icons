import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InboxArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M23 13L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 13L8 13L10 16L14 16L16 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18.6996 6.7715L22 12.1534L22 20L2 20L2 12.1534L5.3004 6.7715M2 13L8 13L10 16L14 16L16 13L22 13M12 12L12 4M8.7071 7.2929L12 4L15.2929 7.2929"/>
    </svg>
  )
}
