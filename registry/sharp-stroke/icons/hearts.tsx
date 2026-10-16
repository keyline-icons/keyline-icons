import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hearts({ size = 24, ...props }: IconProps) {
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
      <path d="M8 21C5.2626 18.662 2 16.65 2 13.65C2 11.7446 3.6117 10.2 5.6 10.2C6.5 10.2 7.3056 10.5275 8 11.1C8.6944 10.5275 9.5 10.2 10.4 10.2C12.3883 10.2 14 11.7446 14 13.65C14 16.65 10.7374 18.662 8 21ZM9.942 7.1385L10.0086 6.21C10.1372 4.4166 11.6959 3 13.6 3C14.5 3 15.3056 3.3275 16 3.9C16.6944 3.3275 17.5 3 18.4 3C20.3883 3 22 4.5446 22 6.45C22 8.7806 20.031 10.5149 17.8689 12.2689L17.4989 12.5691" fill="none"/>
    </svg>
  )
}
