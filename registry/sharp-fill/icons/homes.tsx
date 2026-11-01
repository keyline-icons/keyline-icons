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
      <path d="M3 15L3 14L3 6.8909L8 3L10.956 5.3003L11.3419 5.6006"/>
      <path d="M13.3857 7.2108C13.5613 7.0742 13.7775 7 14 7C14.2225 7 14.4387 7.0742 14.6143 7.2108L21.6143 12.6581C21.8577 12.8476 22 13.1387 22 13.4471L22 20.9999C21.9999 21.5521 21.5522 21.9998 21 21.9999L7 21.9999C6.4478 21.9998 6.0001 21.5521 6 20.9999L6 13.4471C6 13.1387 6.1424 12.8476 6.3857 12.6581L13.3857 7.2108ZM12 20L16 20L16 16L12 16L12 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
