import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Alt({ size = 24, ...props }: IconProps) {
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
      <path d="M22 2V4H16.651L8.914 21.406C8.753 21.767 8.395 22 8 22H2V20H7.349L15.142 2.467C15.329 2.242 15.698 2 16 2H22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 20V22H12V20H22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 20V22H12V20H22Z" fill="currentColor"/>
    </svg>
  )
}
