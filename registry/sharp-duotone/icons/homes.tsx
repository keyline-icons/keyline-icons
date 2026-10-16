import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Homes({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15L3 14L3 6.8909L8 3L10.956 5.3003L11.3419 5.6006" fill="none" strokeOpacity="0.4"/>
      <path d="M13.3857 7.2108C13.7469 6.92973 14.2531 6.92973 14.6143 7.2108L21.6143 12.6581C21.8576 12.8475 22 13.1387 22 13.4471V20.9999C21.9999 21.552 21.5522 21.9999 21 21.9999H17V14.9999H11V21.9999H7C6.4478 21.9999 6.00014 21.552 6 20.9999V13.4471C6.00001 13.1387 6.14244 12.8475 6.38574 12.6581L13.3857 7.2108Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
