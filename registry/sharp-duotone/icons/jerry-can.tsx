import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function JerryCan({ size = 24, ...props }: IconProps) {
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
      <path d="M19 1C19.552 1 20 1.45 20 2V5H21C21.552 5 22 5.45 22 6V22C22 22.55 21.552 23 21 23H3C2.448 23 2 22.55 2 22V11C2 10.66 2.177 10.34 2.47 10.15L10.47 5.15C10.629 5.05 10.813 5 11 5H12V2C12 1.45 12.448 1 13 1H19ZM14 3V5H18V3H14Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M15.999 12.41L14.999 13.41V16.59L15.999 17.59L14.585 19L13.585 18H10.413L9.413 19L7.999 17.59L8.999 16.59V13.41L7.999 12.41L9.413 11L10.413 12H13.585L14.585 11L15.999 12.41ZM10.999 14V16H12.999V14H10.999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M7.97 1.85L8.998 3.57L3.027 7.15L2 5.43L7.97 1.85Z" fill="currentColor"/>
    </svg>
  )
}
