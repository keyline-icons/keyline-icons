import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailX({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3H19C21.2091 3 23 4.79086 23 7V10C23 10.5523 22.5523 11 22 11H16C14.3431 11 13 12.3431 13 14V20C13 20.5523 12.5523 21 12 21H5C2.79086 21 1 19.2091 1 17V7C1 4.79086 2.79086 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 7L11.2929 11C11.7154 11.2817 12.2846 11.2817 12.7071 11L22 7M16 14L22 20M22 14L16 20"/>
    </svg>
  )
}
