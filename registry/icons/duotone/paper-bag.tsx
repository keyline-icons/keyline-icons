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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 20L2 4C2 2.8954 2.8954 2 4 2C4.7573 2 5.4942 2.2456 6.1 2.7C6.3596 2.8947 6.6754 3 7 3C7.3246 3 7.6404 2.8947 7.9 2.7C8.5058 2.2456 9.2427 2 10 2C10.7573 2 11.4942 2.2456 12.1 2.7C12.3596 2.8947 12.6754 3 13 3C13.3246 3 13.6404 2.8947 13.9 2.7C14.5058 2.2456 15.2427 2 16 2C17.0483 2 17.9188 2.8095 17.9947 3.8551L21.9394 19.5114C21.9796 19.6711 22 19.8352 22 20C22 21.1046 21.1046 22 20 22L4 22C2.8954 22 2 21.1046 2 20ZM8 7C7.4477 7 7 7.4477 7 8C7 8.5523 7.4477 9 8 9L12 9C12.5523 9 13 8.5523 13 8C13 7.4477 12.5523 7 12 7L8 7Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18 22L4 22C2.8954 22 2 21.1046 2 20L2 4C2 2.8954 2.8954 2 4 2C4.7573 2 5.4942 2.2456 6.1 2.7C6.3596 2.8947 6.6754 3 7 3C7.3246 3 7.6404 2.8947 7.9 2.7C8.5058 2.2456 9.2427 2 10 2C10.7573 2 11.4942 2.2456 12.1 2.7C12.3596 2.8947 12.6754 3 13 3C13.3246 3 13.6404 2.8947 13.9 2.7C14.5058 2.2456 15.2427 2 16 2C17.0483 2 17.9188 2.8095 17.9947 3.8551L18 3.876ZM8 7C7.4477 7 7 7.4477 7 8C7 8.5523 7.4477 9 8 9L12 9C12.5523 9 13 8.5523 13 8C13 7.4477 12.5523 7 12 7L8 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
