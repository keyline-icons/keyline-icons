import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlusForwardSlashMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M20.118 2.15L5.521 23L3.883 21.85L18.48 1L20.118 2.15Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6.999 5H11V7H6.999L6.997 11L4.997 11L4.999 7H1V5H4.999L5 1H7L6.999 5ZM23 19H13V17H23V19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
