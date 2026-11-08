import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightMin({ size = 24, ...props }: IconProps) {
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
      <path d="M17 17H7V15H17V17Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M2 15C2.552 15 3 15.45 3 16C3 16.55 2.552 17 2 17C1.448 17 1 16.55 1 16C1 15.45 1.448 15 2 15ZM22 15C22.552 15 23 15.45 23 16C23 16.55 22.552 17 22 17C21.448 17 21 16.55 21 16C21 15.45 21.448 15 22 15ZM6.5 9.5C7.052 9.5 7.5 9.95 7.5 10.5C7.5 11.05 7.052 11.5 6.5 11.5C5.948 11.5 5.5 11.05 5.5 10.5C5.5 9.95 5.948 9.5 6.5 9.5ZM17.5 9.5C18.052 9.5 18.5 9.95 18.5 10.5C18.5 11.05 18.052 11.5 17.5 11.5C16.948 11.5 16.5 11.05 16.5 10.5C16.5 9.95 16.948 9.5 17.5 9.5ZM12 7C12.552 7 13 7.45 13 8C13 8.55 12.552 9 12 9C11.448 9 11 8.55 11 8C11 7.45 11.448 7 12 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
