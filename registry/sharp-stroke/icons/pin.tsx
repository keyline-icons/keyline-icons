import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pin({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.4407 3.0001L20.9999 9.5593L18.6248 11.9345L16.8814 10.6054L14.092 13.3948C14.713 15.3514 15.029 17.392 15.029 19.4448C15.029 19.6238 15.0266 19.8028 15.0218 19.9818L13.7433 21.0001L2.9999 10.2567L4.0182 8.9782C4.1972 8.9734 4.3762 8.971 4.5552 8.971C6.608 8.971 8.6486 9.287 10.6052 9.908L13.3946 7.1186L12.0655 5.3752L14.4407 3.0001ZM8.3716 15.6284L3.6875 20.3125" fill="none"/>
    </svg>
  )
}
