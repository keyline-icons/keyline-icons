import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Houses({ size = 24, ...props }: IconProps) {
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
      <path d="M13.3857 7.2108C13.7469 6.92973 14.253 6.92973 14.6142 7.2108L23 13.7362L21.7714 15.3153L21 14.7147V20.9999C20.9999 21.5521 20.5522 21.9999 20 21.9999H7.99996C7.44775 21.9998 7.00005 21.5521 6.99996 20.9999V14.7147L6.22848 15.3153L4.99996 13.7362L13.3857 7.2108Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.6141 14.5258L6 14.2255L14 8L22 14.2255L22.3859 14.5258M8 12.6691L8 21L20 21L20 12.6691M1.6141 7.1912L2 6.8909L7 3L10.456 5.6894L10.8419 5.9897M4 5.3346L4 10.7134L4 11.7134M12 21L12 18C12 16.8954 12.8954 16 14 16C15.1046 16 16 16.8954 16 18L16 21"/>
    </svg>
  )
}
