import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bandage({ size = 24, ...props }: IconProps) {
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
      <path d="M16.7365 2.2929L21.7071 7.2635C21.8946 7.451 22 7.7053 22 7.9706C22 8.2358 21.8946 8.4901 21.7071 8.6777L8.6777 21.7071C8.4901 21.8946 8.2358 22 7.9706 22C7.7053 22 7.451 21.8946 7.2635 21.7071L2.2929 16.7365C2.1054 16.549 2 16.2947 2 16.0294C2 15.7642 2.1054 15.5099 2.2929 15.3223L15.3223 2.2929C15.5099 2.1054 15.7642 2 16.0294 2C16.2947 2 16.549 2.1054 16.7365 2.2929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16.0294 3L21 7.9706L7.9706 21L3 16.0294L16.0294 3ZM12 7.0294L16.9706 12M7.0294 12L12 16.9706" fill="none"/>
    </svg>
  )
}
