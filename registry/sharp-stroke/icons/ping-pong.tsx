import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PingPong({ size = 24, ...props }: IconProps) {
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
      <path d="M13.849 15.49C15.39 15.35 16.817 14.51 18.069 13.25C20.644 10.68 20.644 6.51 18.069 3.93C15.495 1.36 11.321 1.36 8.747 3.93C7.495 5.18 6.648 6.61 6.514 8.15C6.47 8.65 6.502 9.17 6.62 9.69C6.904 10.95 6.667 12.46 5.52 13.61L2 17.56L4.365 20.5L8.389 16.48C9.536 15.33 10.883 15.06 12.308 15.38C12.832 15.5 13.347 15.53 13.849 15.49ZM6.514 8.15L13.849 15.49M20 22C18.895 22 18 21.1 18 20C18 18.9 18.895 18 20 18C21.105 18 22 18.9 22 20C22 21.1 21.105 22 20 22Z"/>
    </svg>
  )
}
