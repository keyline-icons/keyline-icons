import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bridge({ size = 24, ...props }: IconProps) {
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
      <path d="M7.001 3V6.795C7.886 8.771 9.941 10 12.001 10C14.06 10 16.116 8.771 17.001 6.795V3H19.001V6.684L19.306 7.102C19.609 7.497 19.913 7.824 20.251 8.094C20.751 8.493 21.366 8.811 22.243 9.03L23.001 9.219L22.515 11.159L21.759 10.97C20.9 10.755 20.178 10.45 19.551 10.05L19.287 9.872L19.001 9.654V15H23.001V17H19.001V21H17.001V17H7.001V21H5.001V17H1.001V15H5.001V9.655L4.761 9.837C4.074 10.326 3.225 10.724 2.243 10.97L1.486 11.159L1 9.219L1.759 9.03C2.636 8.811 3.251 8.493 3.751 8.094C4.194 7.74 4.597 7.26 5.001 6.683V3H7.001Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 3V21H5V3H7ZM19 3V21H17V3H19Z" fill="currentColor"/>
    </svg>
  )
}
