import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Salad({ size = 24, ...props }: IconProps) {
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
      <path d="M3 13H2C3.0523 17.68 7.206 21 12 21M3 13H9M3 13C3 11.34 4.3431 10 6 10C7.6569 10 9 11.34 9 13M12 21C16.794 21 20.9477 17.68 22 13H18.2003M12 21H5M12 21H19M9 13H13.2026M13.2026 13H14.9557M13.2026 13C12.9409 11.89 12.9091 10.73 13.1149 9.6C13.3986 8.04 14.1223 6.59 15.2009 5.43C16.2794 4.26 17.6678 3.43 19.2028 3.03C19.4373 2.97 19.6861 3 19.9029 3.11C20.1197 3.21 20.2897 3.4 20.3814 3.62C20.9814 5.09 21.1495 6.7 20.8657 8.26C20.582 9.82 19.8583 11.27 18.7798 12.43C18.5954 12.63 18.402 12.82 18.2003 13M14.9557 13H18.2003M14.9557 13L17.6389 7.63M15.7551 4.32C13.5 3.4 10.9 3.9 10.2 6.9C8.9 6 6.029 5.87 5 9.73"/>
    </svg>
  )
}
