import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pitcher({ size = 24, ...props }: IconProps) {
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
      <path d="M9.9344 3L16.8672 3C18.0702 3 19.001 4.0543 18.8518 5.248L17.2113 18.3721C17.0236 19.8734 15.7474 21 14.2344 21L9.7656 21C8.2526 21 6.9764 19.8734 6.7887 18.3721L5.572 8.6383L2.0602 6.7646C1.6236 6.5317 1.3111 6.1728 1.1429 5.7548C0.9785 5.3461 0.9627 4.9095 1.0613 4.5148C1.16 4.1201 1.3795 3.7423 1.7169 3.4592C2.0621 3.1695 2.5068 3 3.0016 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.0016 4H16.8672C17.4687 4 17.9341 4.5272 17.8595 5.124L16.219 18.2481C16.0939 19.2489 15.2431 20 14.2344 20H9.7656C8.7569 20 7.9061 19.2489 7.781 18.2481L6.5643 8.5143C6.524 8.1918 6.3295 7.909 6.0427 7.756L2.5309 5.8823C1.6125 5.3923 1.9606 4 3.0016 4ZM17.5 8H18C20.2091 8 22 9.7909 22 12C22 14.2091 20.2091 16 18 16H16.5M7 12H17"/>
    </svg>
  )
}
