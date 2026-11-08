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
      <path d="M22 2V4H16.65L8.914 21.406C8.754 21.767 8.395 22 8 22H2V20H7.35L15.115 2.529C15.296 2.242 15.654 2 16 2H22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 20V22H12V20H22Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
