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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 8L3 6C3 5.1716 3.3358 4.4216 3.8787 3.8787M16 3L18 3C19.6569 3 21 4.3431 21 6L21 8M20.1213 20.1213C19.5785 20.6642 18.8285 21 18 21L16 21M8 21L6 21C4.3431 21 3 19.6569 3 18L3 16M7.1542 9.5033L12 12M13.0894 7.4325L16.4538 9.1457C16.789 9.3164 17 9.6607 17 10.0369L17 11.3431M12 12L12 17M12 17C11.8445 17 11.6889 16.9637 11.5463 16.8911L7.5463 14.8543C7.2111 14.6836 7 14.3393 7 13.9632L7 10.0369C7 9.6607 7.2111 9.3164 7.5463 9.1457L8.6061 8.6061M2 2L22 22"/>
    </svg>
  )
}
