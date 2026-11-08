import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronsCompactFourDirections({ size = 24, ...props }: IconProps) {
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
      <path d="M9.108 18.87L11.998 20.8L14.889 18.87L15.999 20.53L12.554 22.83C12.218 23.06 11.78 23.06 11.444 22.83L8 20.53L9.108 18.87ZM20.535 7.99L22.868 11.49C23.001 11.76 23.001 12.21 22.874 12.49L20.535 16L18.87 14.88L20.798 11.99L18.87 9.1L20.535 7.99ZM3.463 7.99L5.127 9.1L3.201 11.99L5.127 14.88L3.464 15.99L1.168 12.55C0.944 12.21 0.944 11.77 1.168 11.44L3.463 7.99ZM11.517 1.1C11.83 0.96 12.261 0.96 12.554 1.15L16 3.45L14.89 5.11L11.998 3.19L9.107 5.11L8 3.45L11.517 1.1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20.536 7.99L22.832 11.44C23.056 11.77 23.056 12.21 22.832 12.55L20.535 15.99L18.87 14.88L20.798 11.99L18.87 9.1L20.536 7.99ZM5.127 9.1L3.201 11.99L5.128 14.88L3.464 15.99L1.168 12.55C0.944 12.21 0.944 11.77 1.168 11.44L3.464 7.99L5.127 9.1Z" fill="currentColor"/>
    </svg>
  )
}
