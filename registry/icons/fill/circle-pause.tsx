import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePause({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM8 8L8 8C8 7.447715 8.447715 7 9 7L9 7C9.552285 7 10 7.447715 10 8L10 8L10 16L10 16C10 16.552285 9.552285 17 9 17L9 17C8.447715 17 8 16.552285 8 16L8 16ZM14 8L14 8C14 7.447715 14.447715 7 15 7L15 7C15.552285 7 16 7.447715 16 8L16 8L16 16L16 16C16 16.552285 15.552285 17 15 17L15 17C14.447715 17 14 16.552285 14 16L14 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
