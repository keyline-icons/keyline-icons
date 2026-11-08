import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mosque({ size = 24, ...props }: IconProps) {
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
      <path d="M14 15V23H2C1.448 23 1 22.55 1 22V15H14ZM8 17C6.895 17 6 17.9 6 19V21H10V19C10 17.9 9.105 17 8 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M19.5 1C20.343 1 21.096 1.53 21.382 2.32L22.941 6.66C22.98 6.77 23 6.89 23 7V22C23 22.55 22.552 23 22 23H16V7C16 6.88 16.02 6.77 16.059 6.66L17.618 2.32C17.904 1.53 18.657 1 19.5 1ZM8 3C8.432 3 8.854 3.14 9.2 3.4L11.6 5.2C13.11 6.33 14 8.11 14 10C14 10.91 13.791 11.8 13.406 12.6L13.197 13H2.806C2.308 12.11 2 11.04 2 10C2 8.11 2.889 6.33 4.399 5.2L6.923 3.31C7.213 3.15 7.669 3 8 3Z" fill="currentColor"/>
    </svg>
  )
}
