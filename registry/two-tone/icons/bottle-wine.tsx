import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleWine({ size = 24, ...props }: IconProps) {
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
      <path d="M22 13C22 14.864 20.7253 16.43 19 16.874V21H21C21.5523 21 22 21.448 22 22C22 22.552 21.5523 23 21 23H15C14.4477 23 14 22.552 14 22C14 21.448 14.4477 21 15 21H17V16.874C15.2747 16.43 14 14.864 14 13V11C14 9.895 14.8954 9 16 9H20C21.1046 9 22 9.895 22 11V13ZM10 6.395C10 6.592 10.0585 6.785 10.168 6.949L11.3281 8.689C11.7661 9.346 12 10.119 12 10.908V20C12 21.657 10.6569 23 9 23H5C3.3431 23 2 21.657 2 20V10.908C2 10.119 2.2339 9.346 2.6719 8.689L3.832 6.949C3.9415 6.785 4 6.592 4 6.395V3C4 1.895 4.8954 1 6 1H8C9.1046 1 10 1.895 10 3V6.395Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 14H11M18 16C19.6569 16 21 14.657 21 13V11C21 10.448 20.5523 10 20 10H16C15.4477 10 15 10.448 15 11V13C15 14.657 16.3431 16 18 16ZM18 16V22M15 22H21M6 2H8C8.5523 2 9 2.448 9 3V6.394C9 6.789 9.1169 7.175 9.3359 7.504L10.4962 9.244C10.8247 9.737 11 10.316 11 10.908V20C11 21.105 10.1046 22 9 22H5C3.8954 22 3 21.105 3 20V10.908C3 10.316 3.1753 9.737 3.5038 9.244L4.6641 7.504C4.8831 7.175 5 6.789 5 6.394V3C5 2.448 5.4477 2 6 2Z"/>
    </svg>
  )
}
