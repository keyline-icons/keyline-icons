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
      <path d="M1.6141 7.1912L2 6.8909L7 3L10.456 5.6894L10.8419 5.9897M4 5.3346L4 10.7134L4 11.7134" fill="none" strokeOpacity="0.4"/>
      <path d="M13.3857 7.2108C13.5613 7.0742 13.7775 7 14 7C14.2224 7 14.4386 7.0742 14.6142 7.2108L23 13.7362L21.7714 15.3153L21 14.7147L21 20.9999C20.9998 21.5521 20.5522 21.9997 20 21.9999L8 21.9999C7.4478 21.9997 7.0002 21.5521 7 20.9999L7 14.7147L6.2285 15.3153L5 13.7362L13.3857 7.2108ZM12 20L16 20L16 18C16 16.8954 15.1046 16 14 16C12.8954 16 12 16.8954 12 18L12 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
