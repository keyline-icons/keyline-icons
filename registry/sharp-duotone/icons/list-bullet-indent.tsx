import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListBulletIndent({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7.5 17.5C8.328 17.5 9 18.17 9 19C9 19.83 8.328 20.5 7.5 20.5C6.672 20.5 6 19.83 6 19C6 18.17 6.672 17.5 7.5 17.5ZM22 18V20H11V18H22ZM5.5 10.5C6.328 10.5 7 11.17 7 12C7 12.83 6.328 13.5 5.5 13.5C4.672 13.5 4 12.83 4 12C4 11.17 4.672 10.5 5.5 10.5Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20 11V13H9V11H20ZM3.5 3.5C4.328 3.5 5 4.17 5 5C5 5.83 4.328 6.5 3.5 6.5C2.672 6.5 2 5.83 2 5C2 4.17 2.672 3.5 3.5 3.5Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18 4V6H7V4H18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7.5 17.5C8.328 17.5 9 18.17 9 19C9 19.83 8.328 20.5 7.5 20.5C6.672 20.5 6 19.83 6 19C6 18.17 6.672 17.5 7.5 17.5ZM5.5 10.5C6.328 10.5 7 11.17 7 12C7 12.83 6.328 13.5 5.5 13.5C4.672 13.5 4 12.83 4 12C4 11.17 4.672 10.5 5.5 10.5ZM3.5 3.5C4.328 3.5 5 4.17 5 5C5 5.83 4.328 6.5 3.5 6.5C2.672 6.5 2 5.83 2 5C2 4.17 2.672 3.5 3.5 3.5Z" fill="currentColor"/>
    </svg>
  )
}
