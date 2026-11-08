import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bridge({ size = 24, ...props }: IconProps) {
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
      <path d="M17 20V17H7V20C7 20.552 6.5523 21 6 21C5.4477 21 5 20.552 5 20V17H2C1.4477 17 1 16.552 1 16C1 15.448 1.4477 15 2 15H5V9.656L4.7119 9.873C4.0248 10.362 3.2246 10.724 2.2422 10.97C1.7065 11.104 1.1642 10.778 1.0303 10.242C0.8965 9.706 1.2221 9.164 1.7578 9.03C2.635 8.811 3.2501 8.494 3.75 8.094C4.2004 7.733 4.588 7.276 5 6.685V4C5 3.448 5.4477 3 6 3C6.5523 3 7 3.448 7 4V6.797C7.8796 8.787 9.9326 10 12 10C14.0674 10 16.1204 8.787 17 6.797V4C17 3.448 17.4477 3 18 3C18.5523 3 19 3.448 19 4V6.685C19.412 7.276 19.7996 7.733 20.25 8.094C20.7499 8.494 21.365 8.811 22.2422 9.03C22.7779 9.164 23.1035 9.706 22.9697 10.242C22.8358 10.778 22.2935 11.104 21.7578 10.97C20.7754 10.724 19.9752 10.362 19.2881 9.873L19 9.656V15H22C22.5523 15 23 15.448 23 16C23 16.552 22.5523 17 22 17H19V20C19 20.552 18.5523 21 18 21C17.4477 21 17 20.552 17 20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 4V7M6 7V16M6 7C7 9.5 9.5 11 12 11M6 7C5 8.5 4 9.5 2 10M6 16V20M6 16H2M6 16H12M12 11C14.5 11 17 9.5 18 7M12 11V16M12 16H18M18 4V7M18 7V16M18 7C19 8.5 20 9.5 22 10M18 16V20M18 16H22"/>
    </svg>
  )
}
