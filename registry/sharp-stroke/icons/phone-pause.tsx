import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PhonePause({ size = 24, ...props }: IconProps) {
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
      <path d="M18 1V9M22 1V9M2 4C2 2.9 2.895 2 4 2H9V8L7.739 8.95C7.487 9.13 7.339 9.43 7.339 9.75C7.339 9.9 7.374 10.05 7.442 10.19C8.805 12.96 11.045 15.19 13.812 16.56C13.95 16.63 14.101 16.66 14.254 16.66C14.569 16.66 14.865 16.51 15.054 16.26L16 15H22V20C22 21.1 21.105 22 20 22C10.059 22 2 13.94 2 4Z"/>
    </svg>
  )
}
