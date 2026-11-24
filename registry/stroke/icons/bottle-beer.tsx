import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleBeer({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14H10M5 2H7C7.5523 2 8 2.4477 8 3V7C8 8 10 9 10 11V20C10 21.1046 9.1046 22 8 22H4C2.8954 22 2 21.1046 2 20V11C2 9 4 8 4 7V3C4 2.4477 4.4477 2 5 2ZM21.4468 7.34029L21.4847 7.45411C21.826 8.478 22 9.55023 22 10.6295V10.7639C22 12.2344 21.6576 13.6847 21 15L20.2435 16.513C20.0834 16.8332 20 17.1864 20 17.5445V17.7929C20 18.2456 20.1799 18.6799 20.5 19C20.8201 19.3201 21 19.7544 21 20.2071V21C21 21.5523 20.5523 22 20 22H16C15.4477 22 15 21.5523 15 21V20.2071C15 19.7544 15.1799 19.3201 15.5 19C15.8201 18.6799 16 18.2456 16 17.7929V17.5445C16 17.1864 15.9166 16.8332 15.7565 16.513L15 15C14.3424 13.6847 14 12.2344 14 10.7639V10.6295C14 9.55023 14.174 8.478 14.5153 7.45411L14.5532 7.34029C14.82 6.53988 15.5691 6 16.4128 6H19.5872C20.4309 6 21.18 6.53988 21.4468 7.34029Z"/>
    </svg>
  )
}
