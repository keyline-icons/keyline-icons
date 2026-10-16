import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Leaf({ size = 24, ...props }: IconProps) {
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
      <path d="M7.2784 17.9298C6.0328 15.8736 4.6092 11.144 8.88 8.6765C12.6338 6.5076 15.5004 8.0067 18.9941 3.1908C19.2226 2.8757 19.7335 2.969 19.8579 3.3373C21.2259 7.3899 21.9545 13.7344 18.5503 17.5014C14.2791 22.228 8.5181 20.0005 7.2784 17.9298ZM12.5003 14.0037C10.5004 18.5012 6.2492 17.7512 3.0003 21L2.7075 21.2923" fill="none"/>
    </svg>
  )
}
