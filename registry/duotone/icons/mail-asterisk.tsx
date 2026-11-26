import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailAsterisk({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3L19 3C21.2091 3 23 4.7909 23 7L23 10C23 10.5523 22.5523 11 22 11L16 11C14.3431 11 13 12.3431 13 14L13 20C13 20.5523 12.5523 21 12 21L5 21C2.7909 21 1 19.2091 1 17L1 7C1 4.7909 2.7909 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 7L11.2929 11C11.7154 11.2817 12.2846 11.2817 12.7071 11L22 7M19 14L19 20M16.6 18.8L21.4 15.2M16.6 15.2L21.4 18.8"/>
    </svg>
  )
}
