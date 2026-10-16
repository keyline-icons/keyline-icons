import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ToggleOn({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5 5L21.5 5C22.3284 5 23 5.6716 23 6.5L23 17.5C23 18.3284 22.3284 19 21.5 19L2.5 19C1.6716 19 1 18.3284 1 17.5L1 6.5C1 5.6716 1.6716 5 2.5 5ZM14.5 9L17.5 9C18.3284 9 19 9.6716 19 10.5L19 13.5C19 14.3284 18.3284 15 17.5 15L14.5 15C13.6716 15 13 14.3284 13 13.5L13 10.5C13 9.6716 13.6716 9 14.5 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
