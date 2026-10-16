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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.7365 2.2929L21.7071 7.2635C21.8946 7.451 22 7.7053 22 7.9706C22 8.2358 21.8946 8.4901 21.7071 8.6777L8.6777 21.7071C8.4901 21.8946 8.2358 22 7.9706 22C7.7053 22 7.451 21.8946 7.2635 21.7071L2.2929 16.7365C2.1054 16.549 2 16.2947 2 16.0294C2 15.7642 2.1054 15.5099 2.2929 15.3223L15.3223 2.2929C15.5099 2.1054 15.7642 2 16.0294 2C16.2947 2 16.549 2.1054 16.7365 2.2929Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18.3848 12L12 18.3848L5.6152 12L12 5.6152L18.3848 12Z" fill="currentColor"/>
    </svg>
  )
}
