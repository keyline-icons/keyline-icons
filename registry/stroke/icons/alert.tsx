import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Alert({ size = 24, ...props }: IconProps) {
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
      <path d="M12 5V15"/>
      <path d="M13 19C13 19.55228 12.55228 20 12 20C11.44772 20 11 19.55228 11 19C11 18.44772 11.44772 18 12 18C12.55228 18 13 18.44772 13 19Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
