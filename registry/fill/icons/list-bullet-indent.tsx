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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 5C5 5.83 4.3284 6.5 3.5 6.5C2.6716 6.5 2 5.83 2 5C2 4.17 2.6716 3.5 3.5 3.5C4.3284 3.5 5 4.17 5 5ZM7 12C7 12.83 6.3284 13.5 5.5 13.5C4.6716 13.5 4 12.83 4 12C4 11.17 4.6716 10.5 5.5 10.5C6.3284 10.5 7 11.17 7 12ZM9 19C9 19.83 8.3284 20.5 7.5 20.5C6.6716 20.5 6 19.83 6 19C6 18.17 6.6716 17.5 7.5 17.5C8.3284 17.5 9 18.17 9 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 19H21M10 12H19M8 5H17"/>
    </svg>
  )
}
