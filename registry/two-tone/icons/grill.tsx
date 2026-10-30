import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grill({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 5L20 5C21.1045 5 21.9999 5.8954 21.9999 6.9999C21.9999 7.0834 21.9947 7.1667 21.9843 7.2495C21.5005 11.1159 18.8284 14.3557 15.1247 15.5663C14.1162 15.8958 13.0618 16.0636 12.0008 16.0636C9.5478 16.0636 7.1793 15.1674 5.3408 13.5434C3.5006 11.9215 2.3178 9.6822 2.0155 7.248C2.0052 7.1657 2.0001 7.0829 2.0001 6.9999C2.0001 5.8954 2.8955 5 4 5L4.5 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.5 6L4 6C3.4478 6 3 6.4477 3 7C3 7.0415 3.0026 7.0829 3.0078 7.124C3.5746 11.659 7.4297 15.0622 12 15.0622C16.5703 15.0622 20.4254 11.659 20.9922 7.124C20.9974 7.0829 21 7.0415 21 7C21 6.4477 20.5522 6 20 6L19.5 6M7 20C7 21.1046 6.1046 22 5 22C3.8954 22 3 21.1046 3 20C3 18.8954 3.8954 18 5 18C6.1046 18 7 18.8954 7 20ZM5.9923 18.2635L8.2784 14.2628M15 14.5512L18 22M7 20L17.1945 20M8.5 9L8.5 8.8028C8.5 7.6273 8.848 6.4781 9.5 5.5C10.1521 4.5219 10.5 3.3727 10.5 2.1972L10.5 2M13.5 9L13.5 8.8028C13.5 7.6273 13.848 6.4781 14.5 5.5C15.1521 4.5219 15.5 3.3727 15.5 2.1972L15.5 2" fill="none"/>
    </svg>
  )
}
