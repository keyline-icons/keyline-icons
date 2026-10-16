import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailZap({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 10C23 10.5523 22.5523 11 22 11L13 11L13 20C13 20.5523 12.5523 21 12 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13 20L2 20L2 4L22 4L22 11M2 7L11.2929 11C11.7154 11.2817 12.2846 11.2817 12.7071 11L22 7M20.2929 13.7071L17 17L21 17L17.7071 20.2929"/>
    </svg>
  )
}
