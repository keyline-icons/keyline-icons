import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Search({ size = 24, ...props }: IconProps) {
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
      <path d="M18 10C18 14.2802 14.2802 18 10 18C5.7198 18 2 14.2802 2 10C2 5.7198 5.7198 2 10 2C14.2802 2 18 5.7198 18 10Z" fill="currentColor" stroke="none"/>
      <path d="M14.2929 14.2929L21.2929 21.2929"/>
    </svg>
  )
}
