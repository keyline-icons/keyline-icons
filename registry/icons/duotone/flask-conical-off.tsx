import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M8.2661 8.2656L20.8686 20.8691C20.4855 22.1344 19.3196 23 17.9975 23L6.0024 23C4.3456 23 3.0026 21.6568 3.0024 20C3.0024 19.5539 3.1017 19.1128 3.2934 18.71L8.2661 8.2656Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16.0005 1C16.5525 1.00025 17.0005 1.44787 17.0005 2C17.0005 2.55213 16.5525 2.99975 16.0005 3H15.5005V7.77441L16.1694 9.17969C16.4063 9.67799 16.1947 10.2741 15.6967 10.5117C15.1982 10.7491 14.6012 10.5376 14.3637 10.0391L13.6948 8.63379C13.5671 8.36551 13.5005 8.07182 13.5005 7.77441V3H10.5005V3.84277C10.5005 4.39491 10.0525 4.84253 9.50046 4.84277C8.94817 4.84277 8.50046 4.39506 8.50046 3.84277V3H8.00046C7.44817 3 7.00046 2.55228 7.00046 2C7.00046 1.44772 7.44817 1 8.00046 1H16.0005Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
