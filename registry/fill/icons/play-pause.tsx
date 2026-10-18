import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlayPause({ size = 24, ...props }: IconProps) {
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
      <path d="M1 7.5C1 6.1193 2.1193 5 3.5 5C4.0018 5 4.4919 5.151 4.9067 5.4333L12.1253 10.3466C12.6725 10.7191 13 11.3381 13 12C13 12.6619 12.6725 13.2809 12.1253 13.6534L4.9067 18.5667C4.4919 18.849 4.0018 19 3.5 19C2.1193 19 1 17.8807 1 16.5L1 7.5Z" fill="currentColor" stroke="none"/>
      <path d="M17 6L17 18M22 6L22 18" fill="none"/>
    </svg>
  )
}
