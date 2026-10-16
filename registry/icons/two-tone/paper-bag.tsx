import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PaperBag({ size = 24, ...props }: IconProps) {
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
      <path d="M2 20L2 4C2 2.8954 2.8954 2 4 2C4.7573 2 5.4942 2.2456 6.1 2.7C6.3596 2.8947 6.6754 3 7 3C7.3246 3 7.6404 2.8947 7.9 2.7C8.5058 2.2456 9.2427 2 10 2C10.7573 2 11.4942 2.2456 12.1 2.7C12.3596 2.8947 12.6754 3 13 3C13.3246 3 13.6404 2.8947 13.9 2.7C14.5058 2.2456 15.2427 2 16 2C17.0483 2 17.9188 2.8095 17.9947 3.8551L21.9394 19.5114C21.9796 19.6711 22 19.8352 22 20C22 21.1046 21.1046 22 20 22L4 22C2.8954 22 2 21.1046 2 20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 20L3 4C3 3.4477 3.4477 3 4 3C4.5409 3 5.0673 3.1754 5.5 3.5C5.9327 3.8246 6.4591 4 7 4C7.5409 4 8.0673 3.8246 8.5 3.5C8.9327 3.1754 9.4591 3 10 3C10.5409 3 11.0673 3.1754 11.5 3.5C11.9327 3.8246 12.4591 4 13 4C13.5409 4 14.0673 3.8246 14.5 3.5C14.9327 3.1754 15.4591 3 16 3C16.5523 3 17 3.4477 17 4L20.9697 19.7557C21.1288 20.3873 20.6513 21 20 21L4 21C3.4477 21 3 20.5523 3 20ZM17 4L17 21M8 8L12 8"/>
    </svg>
  )
}
