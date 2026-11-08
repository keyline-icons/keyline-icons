import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightMax({ size = 24, ...props }: IconProps) {
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
      <path d="M17 15V17H7V15H17Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7.414 11L6 12.41L4 10.41L5.414 9L7.414 11ZM20.071 10.41L18.071 12.41L16.657 11L18.657 9L20.071 10.41ZM5 15V17H1V15H5ZM23 15V17H19V15H23ZM13 7V11H11V7H13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
